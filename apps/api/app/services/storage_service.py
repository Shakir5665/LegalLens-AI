"""Local file validation and storage management service for LegalLens AI.

Task 3.6: File Validation and Storage.
Follows ADR-009 (Deterministic operations) and ADR-014 (Strict security & data isolation).
"""

from dataclasses import dataclass
import hashlib
from pathlib import Path
import shutil
import tempfile
from typing import BinaryIO
import uuid

import pymupdf

from app.core.config import Settings, get_settings
from app.core.errors import FileValidationError, StorageError
from app.core.logging import get_logger

logger = get_logger("app.services.storage")

PDF_MAGIC_BYTES = b"%PDF-"


@dataclass(frozen=True)
class StoredFileInfo:
    """Metadata describing a validated and stored original PDF document."""

    storage_path: str  # Safe relative or filename path within storage_dir
    file_hash: str  # Hexadecimal SHA-256 checksum
    file_size_bytes: int
    original_filename: str
    mime_type: str = "application/pdf"


class StorageService:
    """Manages secure local filesystem storage and content-based validation for PDF uploads."""

    def __init__(self, settings: Settings | None = None, storage_dir: Path | str | None = None) -> None:
        self.settings = settings or get_settings()
        if storage_dir is not None:
            self.base_dir = Path(storage_dir).resolve()
        else:
            self.base_dir = Path(self.settings.storage_dir).resolve()
        self.max_upload_size = self.settings.max_upload_size_bytes
        self._ensure_storage_dir()

    def _ensure_storage_dir(self) -> None:
        """Create the storage directory tree securely if not already existing."""
        try:
            self.base_dir.mkdir(parents=True, exist_ok=True)
        except OSError as exc:
            logger.error("Failed to create storage directory at '%s': %s", self.base_dir, exc)
            raise StorageError(
                message="Storage directory could not be initialized.",
                details={"storage_dir": str(self.base_dir)},
            ) from exc

    def resolve_path(self, relative_path: str) -> Path:
        """Resolve a relative storage path and ensure it does not escape base_dir."""
        target = (self.base_dir / relative_path).resolve()
        try:
            target.relative_to(self.base_dir)
        except ValueError as exc:
            logger.warning("Path traversal attempt detected: '%s'", relative_path)
            raise FileValidationError(
                message="Security violation: Invalid file path traversal detected.",
                details={"path": relative_path},
            ) from exc
        return target

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
        declared_mime: str | None = None,
    ) -> StoredFileInfo:
        """Validate and atomically store a PDF file into the managed storage directory.

        Returns:
            StoredFileInfo containing the safe relative storage path and SHA-256.
        """
        file_hash, file_size = self.validate_pdf_stream(
            file_obj=file_obj,
            original_filename=original_filename,
            declared_mime=declared_mime,
        )

        # Generate a safe UUID-based storage filename to prevent collisions and path injection
        storage_filename = f"{uuid.uuid4().hex}.pdf"
        target_path = self.resolve_path(storage_filename)

        # Write to a temporary file in the storage directory, then atomically rename
        temp_file = None
        try:
            with tempfile.NamedTemporaryFile(
                dir=self.base_dir,
                delete=False,
                prefix="tmp_upload_",
                suffix=".pdf",
            ) as tmp:
                temp_file = Path(tmp.name)
                file_obj.seek(0)
                shutil.copyfileobj(file_obj, tmp)

            # Atomic rename / replace
            temp_file.replace(target_path)
            logger.info(
                "Stored file '%s' (hash: %s, %d bytes) as '%s'",
                Path(original_filename).name,
                file_hash[:12],
                file_size,
                storage_filename,
            )

            return StoredFileInfo(
                storage_path=storage_filename,
                file_hash=file_hash,
                file_size_bytes=file_size,
                original_filename=Path(original_filename).name,
                mime_type="application/pdf",
            )
        except Exception as exc:
            logger.error("Failed to persist file '%s' to storage: %s", original_filename, exc)
            if temp_file and temp_file.exists():
                try:
                    temp_file.unlink()
                except OSError:
                    pass
            if target_path.exists():
                try:
                    target_path.unlink()
                except OSError:
                    pass
            raise StorageError(
                message="Failed to persist uploaded document to filesystem.",
                details={"error": str(exc)},
            ) from exc

    def delete_file(self, relative_path: str) -> bool:
        """Safely remove a file from the managed storage directory during rollback/cleanup.

        Returns:
            True if deleted, False if file did not exist.
        """
        try:
            target = self.resolve_path(relative_path)
            if target.is_file():
                target.unlink()
                logger.info("Successfully deleted stored file: %s", relative_path)
                return True
            return False
        except Exception as exc:
            logger.warning("Error deleting stored file '%s': %s", relative_path, exc)
            return False

    def file_exists(self, relative_path: str) -> bool:
        """Verify whether a stored file exists within the storage directory."""
        try:
            target = self.resolve_path(relative_path)
            return target.is_file()
        except Exception:
            return False
