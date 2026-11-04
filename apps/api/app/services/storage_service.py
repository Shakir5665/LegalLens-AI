"""Storage service integrating configurable storage providers for LegalLens AI.

Tasks 3.A, 3.6, 3.D: File Validation, Provider Abstraction, and Immutable Version Storage.
Follows ADR-003, ADR-009, and ADR-014.
"""

from dataclasses import dataclass
import hashlib
from pathlib import Path
from typing import BinaryIO
import uuid

import pymupdf

from app.core.config import Settings, get_settings
from app.core.errors import FileValidationError, StorageError
from app.core.logging import get_logger
from app.storage.base import StorageProvider
from app.storage.factory import create_storage_provider
from app.storage.local import LocalStorageProvider

logger = get_logger("app.services.storage")

PDF_MAGIC_BYTES = b"%PDF-"


@dataclass(frozen=True)
class StoredFileInfo:
    """Metadata describing a validated and stored original PDF document."""

    storage_path: str  # Immutable object key / path within storage provider
    file_hash: str  # Hexadecimal SHA-256 checksum
    file_size_bytes: int
    original_filename: str
    mime_type: str = "application/pdf"


class StorageService:
    """Manages content-based PDF validation and delegates persistence to a StorageProvider."""

    def __init__(
        self,
        settings: Settings | None = None,
        provider: StorageProvider | None = None,
        storage_dir: Path | str | None = None,
    ) -> None:
        self.settings = settings or get_settings()
        if provider is not None:
            self.provider = provider
        elif storage_dir is not None:
            self.provider = LocalStorageProvider(settings=self.settings, base_dir=storage_dir)
        else:
            self.provider = create_storage_provider(self.settings)

        self.max_upload_size = self.settings.max_upload_size_bytes

    def resolve_path(self, relative_path: str) -> Path:
        """Resolve a storage path for local operations, asserting strict containment."""
        if hasattr(self.provider, "_resolve_key"):
            return self.provider._resolve_key(relative_path)
        normalized = relative_path.replace("\\", "/").lstrip("/")
        if ".." in normalized.split("/"):
            raise FileValidationError(
                message="Security violation: Invalid file path traversal detected.",
                details={"path": relative_path},
            )
        return Path(normalized)

    def validate_pdf_stream(
        self,
        file_obj: BinaryIO,
        original_filename: str,
        declared_mime: str | None = None,
    ) -> tuple[str, int]:
        """Validate an open binary stream for PDF integrity, size, and magic bytes.

        Returns:
            Tuple of (sha256_hash, file_size_bytes).

        Raises:
            FileValidationError: If the file is empty, oversize, lacks PDF magic bytes,
                                 or cannot be parsed by PyMuPDF.
        """
        # 1. Check filename
        clean_filename = Path(original_filename).name.strip()
        if not clean_filename:
            raise FileValidationError(message="Uploaded file has an empty or invalid filename.")

        # Read first 1024 bytes to check magic signature and emptiness
        header = file_obj.read(1024)
        if not header:
            raise FileValidationError(message="Uploaded file is empty (0 bytes).")

        if not header.startswith(PDF_MAGIC_BYTES):
            raise FileValidationError(
                message="File content validation failed: Expected valid PDF magic header (%PDF-)."
            )

        # Compute SHA-256 and size in streaming chunks to prevent unbounded memory consumption
        sha256 = hashlib.sha256()
        sha256.update(header)
        total_size = len(header)

        chunk_size = 64 * 1024  # 64 KB
        while True:
            chunk = file_obj.read(chunk_size)
            if not chunk:
                break
            total_size += len(chunk)
            if total_size > self.max_upload_size:
                raise FileValidationError(
                    message=f"File exceeds maximum allowed upload size ({self.max_upload_size} bytes).",
                    details={"file_size": total_size, "max_allowed": self.max_upload_size},
                )
            sha256.update(chunk)

        # Rewind stream for subsequent PyMuPDF validation
        file_obj.seek(0)

        # Validate with PyMuPDF to detect corrupt or unreadable PDF files
        try:
            sample_bytes = file_obj.read()
            file_obj.seek(0)
            with pymupdf.open(stream=sample_bytes, filetype="pdf") as doc:
                if doc.is_encrypted:
                    raise FileValidationError(
                        message="Encrypted or password-protected PDFs are not supported."
                    )
                if len(doc) == 0:
                    raise FileValidationError(
                        message="PDF structure validation failed: Document contains 0 pages."
                    )
        except FileValidationError:
            raise
        except Exception as exc:
            logger.warning("PyMuPDF failed to parse upload '%s': %s", clean_filename, exc)
            raise FileValidationError(
                message="Uploaded file is corrupted or not a valid PDF document.",
                details={"error": str(exc)},
            ) from exc

        return sha256.hexdigest(), total_size

    def store_file(
        self,
        file_obj: BinaryIO,
        original_filename: str,
        document_id: str | uuid.UUID | None = None,
        version_id: str | uuid.UUID | None = None,
        declared_mime: str | None = None,
    ) -> StoredFileInfo:
        """Validate and atomically store a PDF file into the managed storage provider.

        Uses immutable structured object keys:
        `documents/{document_id}/versions/{version_id}/{safe_uuid}.pdf`
        """
        file_hash, file_size = self.validate_pdf_stream(
            file_obj=file_obj,
            original_filename=original_filename,
            declared_mime=declared_mime,
        )

        safe_uuid = uuid.uuid4().hex
        if document_id is not None and version_id is not None:
            object_key = f"documents/{document_id}/versions/{version_id}/{safe_uuid}.pdf"
        elif document_id is not None:
            object_key = f"documents/{document_id}/{safe_uuid}.pdf"
        else:
            object_key = f"{safe_uuid}.pdf"

        file_obj.seek(0)
        persisted_key = self.provider.store_file(
            file_obj=file_obj,
            object_key=object_key,
            content_type="application/pdf",
        )

        return StoredFileInfo(
            storage_path=persisted_key,
            file_hash=file_hash,
            file_size_bytes=file_size,
            original_filename=Path(original_filename).name,
            mime_type="application/pdf",
        )

    def get_file_bytes(self, storage_path: str) -> bytes:
        """Retrieve binary bytes of the stored PDF."""
        return self.provider.get_file_bytes(storage_path)

    def delete_file(self, storage_path: str) -> bool:
        """Safely remove a file from the managed storage provider during rollback/cleanup."""
        return self.provider.delete_file(storage_path)

    def file_exists(self, storage_path: str) -> bool:
        """Verify whether a stored file exists within the storage provider."""
        return self.provider.file_exists(storage_path)

    def generate_presigned_download_url(
        self,
        storage_path: str,
        expires_in_seconds: int = 600,
        original_filename: str | None = None,
    ) -> str:
        """Generate a secure, time-limited presigned download URL."""
        return self.provider.generate_presigned_download_url(
            object_key=storage_path,
            expires_in_seconds=expires_in_seconds,
            original_filename=original_filename,
        )
