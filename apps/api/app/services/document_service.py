"""Document ingestion, versioning, and lifecycle management service for LegalLens AI.

Tasks 3.5, 3.8, 3.9, 3.10 and Tasks 3.A-3.G:
- Ingestion pipeline orchestration.
- Structure-aware legal chunking.
- Document and version persistence.
- Failure recovery and manual retry.
- Soft-deletion and restoration.
- Presigned download generation.
- Duplicate detection & rejection (HTTP 409).
- Source authenticity governance.
"""

from datetime import datetime, timezone
from typing import BinaryIO
import uuid

from sqlalchemy import delete, func, select
from sqlalchemy.orm import Session, selectinload

from app.core.errors import (
    DuplicateDocumentError,
    EntityNotFoundException,
    FileValidationError,
    ScannedPDFException,
    ValidationException,
)
from app.core.logging import get_logger
from app.db.models.document import (
    Document,
    DocumentChunk,
    DocumentType,
    DocumentVersion,
    ExtractionStatus,
)
from app.schemas.document import (
    ChunkResponse,
    DocumentDetailResponse,
    DocumentListItem,
    DocumentListResponse,
    DocumentUploadResponse,
    DocumentVersionChunksResponse,
    DocumentVersionRestoreResponse,
    DocumentVersionRetryResponse,
    DocumentVersionSoftDeleteResponse,
    DocumentVersionSummary,
    PresignedDownloadResponse,
)
from app.schemas.legal_source import SourceAuthenticity
from app.services.legal_chunking_service import LegalChunkingService
from app.services.pdf_extraction_service import PDFExtractionService
from app.services.storage_service import StorageService

logger = get_logger("app.services.document")


def utc_now() -> datetime:
    """Return timezone-aware current UTC datetime."""
    return datetime.now(timezone.utc)


class DocumentService:
    """Coordinates file validation, storage, PDF extraction, legal chunking, and version management."""

    def __init__(
        self,
        storage_service: StorageService | None = None,
        pdf_extractor: PDFExtractionService | None = None,
        extraction_service: PDFExtractionService | None = None,
        chunker: LegalChunkingService | None = None,
        chunking_service: LegalChunkingService | None = None,
    ) -> None:
        self.storage = storage_service or StorageService()
        self.extractor = pdf_extractor or extraction_service or PDFExtractionService()
        self.chunker = chunker or chunking_service or LegalChunkingService()

    def ingest_document(
        self,
        session: Session,
        file_obj: BinaryIO,
        original_filename: str,
        title: str,
        document_type: str = DocumentType.STATUTE.value,
        jurisdiction: str = "Sri Lanka",
        legal_domain: str = "Employment Law",
        source_authenticity: str = SourceAuthenticity.UNVERIFIED.value,
        description: str | None = None,
        document_id: uuid.UUID | None = None,
        declared_mime: str | None = None,
        allow_verified: bool = False,
    ) -> DocumentUploadResponse:
        """Execute the end-to-end PDF ingestion pipeline.

        Pipeline Stages:
        0. Enforce Source Authenticity Gate (prevent self-certification).
        1. Pre-validate stream, size limits, and compute SHA-256.
        2. Enforce Duplicate Detection policy:
           - Same logical document & same SHA-256: Reject with HTTP 409 DuplicateDocumentError.
        3. Store original file safely in storage provider under an immutable key.
        4. Create DocumentVersion record in DB with status PROCESSING.
        5. Extract text page-by-page & extract technical metadata with PyMuPDF.
        6. Check for scanned-only PDF (update status to SCANNED_ONLY & return 422).
        7. Generate structure-aware legal chunks.
        8. Persist chunks and update version status to PROCESSED.
        """
        # Step 0: Enforce Source Authenticity Gate
        if not allow_verified and source_authenticity in [
            SourceAuthenticity.VERIFIED_OFFICIAL.value,
            SourceAuthenticity.VERIFIED_SECONDARY.value,
        ]:
            raise ValidationException(
                message=(
                    f"Source authenticity '{source_authenticity}' cannot be self-certified on document upload. "
                    "Public uploads must enter the system as 'Unverified' (or 'SyntheticDemo' for test fixtures) "
                    "pending authoritative legal verification workflow certification."
                ),
                details={"provided_authenticity": source_authenticity},
            )

        # Step 1: Pre-validation and stream hash
        file_hash, file_size = self.storage.validate_pdf_stream(
            file_obj=file_obj,
            original_filename=original_filename,
            declared_mime=declared_mime,
        )

        target_document: Document | None = None
        target_version_number = 1

        # Step 2: Handle logical document & version duplicate detection
        if document_id is not None:
            stmt = select(Document).where(Document.id == document_id)
            if session.bind and session.bind.dialect.name == "postgresql":
                stmt = stmt.with_for_update()
            target_document = session.execute(stmt).scalar_one_or_none()

            if not target_document:
                raise EntityNotFoundException("Document", str(document_id))

            # Task 3.D Duplicate rejection policy:
            # The same PDF uploaded for the same logical legal document must be rejected as a duplicate.
            existing_version = session.execute(
                select(DocumentVersion).where(
                    DocumentVersion.document_id == target_document.id,
                    DocumentVersion.file_hash == file_hash,
                    DocumentVersion.is_deleted == False,
                )
            ).scalar_one_or_none()

            if existing_version is not None:
                logger.warning(
                    "Duplicate upload rejected for document '%s': Version %d with identical hash %s already exists.",
                    target_document.id,
                    existing_version.version_number,
                    file_hash[:12],
                )
                raise DuplicateDocumentError(
                    message=(
                        f"Document version duplicate conflict: An identical file version (version "
                        f"{existing_version.version_number}) with SHA-256 hash '{file_hash}' already exists "
                        f"for document '{target_document.title}'."
                    ),
                    details={
                        "document_id": str(target_document.id),
                        "existing_version_number": existing_version.version_number,
                        "file_hash": file_hash,
                    },
                )

            max_v = session.execute(
                select(func.coalesce(func.max(DocumentVersion.version_number), 0)).where(
                    DocumentVersion.document_id == target_document.id
                )
            ).scalar_one()
            target_version_number = max_v + 1
        else:
            target_document = Document(
                id=uuid.uuid4(),
                title=title.strip(),
                document_type=document_type,
                jurisdiction=jurisdiction,
                legal_domain=legal_domain,
                source_authenticity=source_authenticity,
                description=description,
            )
            session.add(target_document)
            session.flush()
            target_version_number = 1

        version_id = uuid.uuid4()
        stored_file_path: str | None = None
        version_record: DocumentVersion | None = None

        try:
            # Step 3: Store original file safely under immutable hierarchical key
            stored_info = self.storage.store_file(
                file_obj=file_obj,
                original_filename=original_filename,
                document_id=target_document.id,
                version_id=version_id,
                declared_mime=declared_mime,
            )
            stored_file_path = stored_info.storage_path

            # Step 4: Record DocumentVersion in PROCESSING state
            version_record = DocumentVersion(
                id=version_id,
                document_id=target_document.id,
                version_number=target_version_number,
                original_filename=stored_info.original_filename,
                storage_path=stored_info.storage_path,
                file_hash=stored_info.file_hash,
                mime_type=stored_info.mime_type,
                file_size_bytes=stored_info.file_size_bytes,
                page_count=0,
                extraction_status=ExtractionStatus.PROCESSING.value,
                extraction_method=None,
                extracted_metadata={},
            )
            session.add(version_record)
            session.commit()

            # Step 5: Extract text page-by-page & extract technical metadata
            if hasattr(self.storage.provider, "_resolve_key"):
                file_target = self.storage.resolve_path(stored_file_path)
            else:
                file_target = self.storage.get_file_bytes(stored_file_path)

            extraction_result = self.extractor.extract(file_target)

            # Step 6: Check Scanned PDF status (Task 3.7 / 3.E)
            if extraction_result.is_scanned_only:
                version_record.page_count = extraction_result.page_count
                version_record.extraction_status = ExtractionStatus.SCANNED_ONLY.value
                version_record.extraction_method = extraction_result.extraction_method
                version_record.extracted_metadata = extraction_result.technical_metadata
                session.commit()
                logger.warning(
                    "Persisted scanned-only version %d for document '%s'. Raising HTTP 422.",
                    target_version_number,
                    target_document.id,
                )
                raise ScannedPDFException(
                    message=(
                        "Scanned-only PDF detected. The document contains no extractable native text. "
                        "Optical Character Recognition (OCR) is outside Phase 3 scope."
                    ),
                    details={
                        "document_id": str(target_document.id),
                        "version_number": target_version_number,
                        "page_count": extraction_result.page_count,
                    },
                )

            # Step 7: Generate structure-aware legal chunks (Task 3.10 / 3.G)
            chunks = self.chunker.chunk_document(extraction_result)

            # Step 8: Persist DocumentChunks and transition to PROCESSED
            chunk_records = [
                DocumentChunk(
                    id=uuid.uuid4(),
                    document_version_id=version_record.id,
                    chunk_index=chunk.chunk_index,
                    chunk_text=chunk.chunk_text,
                    part_reference=chunk.part_reference,
                    chapter_reference=chunk.chapter_reference,
                    section_reference=chunk.section_reference,
                    subsection_reference=chunk.subsection_reference,
                    paragraph_reference=chunk.paragraph_reference,
                    page_number=chunk.page_number,
                    page_end=chunk.page_end,
                    structural_metadata=chunk.structural_metadata,
                    content_hash=chunk.content_hash,
                )
                for chunk in chunks
            ]
            session.add_all(chunk_records)
            version_record.page_count = extraction_result.page_count
            version_record.extraction_status = ExtractionStatus.PROCESSED.value
            version_record.extraction_method = extraction_result.extraction_method
            version_record.extracted_metadata = extraction_result.technical_metadata
            session.commit()

            logger.info(
                "Ingestion completed for document '%s' (v%d): %d chunks persisted.",
                target_document.id,
                version_record.version_number,
                len(chunk_records),
            )

            return DocumentUploadResponse(
                document_id=target_document.id,
                version_id=version_record.id,
                version_number=version_record.version_number,
                title=target_document.title,
                document_type=target_document.document_type,
                page_count=version_record.page_count,
                extraction_status=version_record.extraction_status,
                chunk_count=len(chunk_records),
                file_hash=version_record.file_hash,
                created_at=version_record.created_at,
            )

        except ScannedPDFException:
            # Scanned PDF state is already committed to DB
            raise
        except Exception as exc:
            logger.error("Ingestion failed: %s", exc)
            if version_record is not None:
                # Mark as FAILED and record error metadata while preserving stored PDF for recovery
                try:
                    version_record.extraction_status = ExtractionStatus.FAILED.value
                    version_record.extracted_metadata = {"error": str(exc), "stage": "processing"}
                    session.commit()
                except Exception as db_err:
                    session.rollback()
                    logger.error("Failed to mark version as FAILED: %s", db_err)
            else:
                # If failed before DB record creation, clean up storage object
                session.rollback()
                if stored_file_path:
                    self.storage.delete_file(stored_file_path)

            if isinstance(exc, (FileValidationError, EntityNotFoundException, DuplicateDocumentError, ValidationException)):
                raise
            raise

    def get_document(
        self,
        session: Session,
        document_id: uuid.UUID,
        include_deleted: bool = False,
    ) -> DocumentDetailResponse:
        """Retrieve logical legal document metadata and its version history."""
        stmt = (
            select(Document)
            .where(Document.id == document_id)
            .options(selectinload(Document.versions))
        )
        doc = session.execute(stmt).scalar_one_or_none()
        if not doc:
            raise EntityNotFoundException("Document", str(document_id))

        versions_summary = [
            DocumentVersionSummary(
                id=v.id,
                version_number=v.version_number,
                original_filename=v.original_filename,
                file_hash=v.file_hash,
                file_size_bytes=v.file_size_bytes,
                page_count=v.page_count,
                extraction_status=v.extraction_status,
                extraction_method=v.extraction_method,
                is_deleted=v.is_deleted,
                deleted_at=v.deleted_at,
                created_at=v.created_at,
            )
            for v in doc.versions
            if include_deleted or not v.is_deleted
        ]

        return DocumentDetailResponse(
            id=doc.id,
            title=doc.title,
            document_type=doc.document_type,
            jurisdiction=doc.jurisdiction,
            legal_domain=doc.legal_domain,
            source_authenticity=doc.source_authenticity,
            description=doc.description,
            created_at=doc.created_at,
            updated_at=doc.updated_at,
            versions=versions_summary,
        )

    def get_version_chunks(
        self,
        session: Session,
        document_id: uuid.UUID,
        version_number: int,
    ) -> DocumentVersionChunksResponse:
        """Retrieve extracted traceable chunks for a specific document version."""
        doc = session.execute(select(Document).where(Document.id == document_id)).scalar_one_or_none()
        if not doc:
            raise EntityNotFoundException("Document", str(document_id))

        version = session.execute(
            select(DocumentVersion).where(
                DocumentVersion.document_id == document_id,
                DocumentVersion.version_number == version_number,
            )
        ).scalar_one_or_none()
        if not version or version.is_deleted:
            raise EntityNotFoundException("DocumentVersion", f"{document_id}/v{version_number}")

        chunks = session.execute(
            select(DocumentChunk)
            .where(DocumentChunk.document_version_id == version.id)
            .order_by(DocumentChunk.chunk_index)
        ).scalars().all()

        chunk_responses = [
            ChunkResponse(
                id=c.id,
                chunk_index=c.chunk_index,
                chunk_text=c.chunk_text,
                part_reference=c.part_reference,
                chapter_reference=c.chapter_reference,
                section_reference=c.section_reference,
                subsection_reference=c.subsection_reference,
                paragraph_reference=c.paragraph_reference,
                page_number=c.page_number,
                page_end=c.page_end,
                structural_metadata=c.structural_metadata,
                content_hash=c.content_hash,
                created_at=c.created_at,
            )
            for c in chunks
        ]

        return DocumentVersionChunksResponse(
            document_id=doc.id,
            document_title=doc.title,
            version_id=version.id,
            version_number=version.version_number,
            total_chunks=len(chunk_responses),
            chunks=chunk_responses,
        )

    def list_documents(
        self,
        session: Session,
        skip: int = 0,
        limit: int = 50,
    ) -> DocumentListResponse:
        """List catalogued legal documents with total active version counts."""
        total = session.execute(select(func.count(Document.id))).scalar_one()

        stmt = (
            select(
                Document,
                func.count(DocumentVersion.id).filter(DocumentVersion.is_deleted == False).label("version_count"),
            )
            .outerjoin(DocumentVersion, Document.id == DocumentVersion.document_id)
            .group_by(Document.id)
            .order_by(Document.created_at.desc())
            .offset(skip)
            .limit(limit)
        )
        rows = session.execute(stmt).all()

        items = [
            DocumentListItem(
                id=doc.id,
                title=doc.title,
                document_type=doc.document_type,
                jurisdiction=doc.jurisdiction,
                legal_domain=doc.legal_domain,
                source_authenticity=doc.source_authenticity,
                version_count=v_count,
                created_at=doc.created_at,
                updated_at=doc.updated_at,
            )
            for doc, v_count in rows
        ]

        return DocumentListResponse(total=total, items=items)

    def get_presigned_download_url(
        self,
        session: Session,
        document_id: uuid.UUID,
        version_number: int,
        expires_in_seconds: int = 600,
    ) -> PresignedDownloadResponse:
        """Generate a time-limited presigned download URL for a specific document version."""
        version = session.execute(
            select(DocumentVersion).where(
                DocumentVersion.document_id == document_id,
                DocumentVersion.version_number == version_number,
                DocumentVersion.is_deleted == False,
            )
        ).scalar_one_or_none()

        if not version:
            raise EntityNotFoundException("DocumentVersion", f"{document_id}/v{version_number}")

        url = self.storage.generate_presigned_download_url(
            storage_path=version.storage_path,
            expires_in_seconds=expires_in_seconds,
            original_filename=version.original_filename,
        )

        return PresignedDownloadResponse(
            download_url=url,
            expires_in=expires_in_seconds,
            filename=version.original_filename,
            document_id=document_id,
            version_number=version_number,
        )

    def soft_delete_version(
        self,
        session: Session,
        document_id: uuid.UUID,
        version_number: int,
    ) -> DocumentVersionSoftDeleteResponse:
        """Soft-delete a document version.

        Sets is_deleted=True, deleted_at=now, removes chunks from database so they are no longer
        searchable or retrievable, and retains the PDF object in storage for potential recovery.
        """
        version = session.execute(
            select(DocumentVersion).where(
                DocumentVersion.document_id == document_id,
                DocumentVersion.version_number == version_number,
            )
        ).scalar_one_or_none()

        if not version:
            raise EntityNotFoundException("DocumentVersion", f"{document_id}/v{version_number}")

        if version.is_deleted:
            return DocumentVersionSoftDeleteResponse(
                message="Document version is already soft-deleted.",
                document_id=document_id,
                version_number=version_number,
                is_deleted=True,
                deleted_at=version.deleted_at or utc_now(),
                chunks_removed=0,
            )

        chunk_count = session.execute(
            select(func.count(DocumentChunk.id)).where(
                DocumentChunk.document_version_id == version.id
            )
        ).scalar_one()

        session.execute(
            delete(DocumentChunk).where(DocumentChunk.document_version_id == version.id)
        )

        deleted_timestamp = utc_now()
        version.is_deleted = True
        version.deleted_at = deleted_timestamp
        session.commit()

        logger.info(
            "Soft-deleted document version %s/v%d. Removed %d chunks from active DB.",
            document_id,
            version_number,
            chunk_count,
        )

        return DocumentVersionSoftDeleteResponse(
            document_id=document_id,
            version_number=version_number,
            is_deleted=True,
            deleted_at=deleted_timestamp,
            chunks_removed=chunk_count,
        )

    def restore_version(
        self,
        session: Session,
        document_id: uuid.UUID,
        version_number: int,
    ) -> DocumentVersionRestoreResponse:
        """Restore a soft-deleted document version.

        Sets is_deleted=False, deleted_at=None, re-extracts and re-chunks from the preserved PDF.
        """
        version = session.execute(
            select(DocumentVersion).where(
                DocumentVersion.document_id == document_id,
                DocumentVersion.version_number == version_number,
            )
        ).scalar_one_or_none()

        if not version:
            raise EntityNotFoundException("DocumentVersion", f"{document_id}/v{version_number}")

        if not version.is_deleted:
            chunk_count = session.execute(
                select(func.count(DocumentChunk.id)).where(
                    DocumentChunk.document_version_id == version.id
                )
            ).scalar_one()
            return DocumentVersionRestoreResponse(
                message="Document version is already active.",
                document_id=document_id,
                version_number=version_number,
                is_deleted=False,
                chunk_count=chunk_count,
                extraction_status=version.extraction_status,
            )

        file_bytes = self.storage.get_file_bytes(version.storage_path)
        extraction_result = self.extractor.extract(file_bytes)

        if extraction_result.is_scanned_only:
            version.is_deleted = False
            version.deleted_at = None
            version.extraction_status = ExtractionStatus.SCANNED_ONLY.value
            session.commit()
            return DocumentVersionRestoreResponse(
                message="Restored scanned-only version (no chunks generated).",
                document_id=document_id,
                version_number=version_number,
                is_deleted=False,
                chunk_count=0,
                extraction_status=version.extraction_status,
            )

        chunks = self.chunker.chunk_document(extraction_result)
        chunk_records = [
            DocumentChunk(
                id=uuid.uuid4(),
                document_version_id=version.id,
                chunk_index=chunk.chunk_index,
                chunk_text=chunk.chunk_text,
                part_reference=chunk.part_reference,
                chapter_reference=chunk.chapter_reference,
                section_reference=chunk.section_reference,
                subsection_reference=chunk.subsection_reference,
                paragraph_reference=chunk.paragraph_reference,
                page_number=chunk.page_number,
                page_end=chunk.page_end,
                structural_metadata=chunk.structural_metadata,
                content_hash=chunk.content_hash,
            )
            for chunk in chunks
        ]
        session.add_all(chunk_records)
        version.is_deleted = False
        version.deleted_at = None
        version.extraction_status = ExtractionStatus.PROCESSED.value
        session.commit()

        logger.info(
            "Restored document version %s/v%d with %d regenerated chunks.",
            document_id,
            version_number,
            len(chunk_records),
        )

        return DocumentVersionRestoreResponse(
            document_id=document_id,
            version_number=version_number,
            is_deleted=False,
            chunk_count=len(chunk_records),
            extraction_status=version.extraction_status,
        )

    def retry_failed_version(
        self,
        session: Session,
        document_id: uuid.UUID,
        version_number: int,
    ) -> DocumentVersionRetryResponse:
        """Manually re-process a failed document version without re-uploading."""
        version = session.execute(
            select(DocumentVersion).where(
                DocumentVersion.document_id == document_id,
                DocumentVersion.version_number == version_number,
                DocumentVersion.is_deleted == False,
            )
        ).scalar_one_or_none()

        if not version:
            raise EntityNotFoundException("DocumentVersion", f"{document_id}/v{version_number}")

        # Fetch stored PDF bytes
        file_bytes = self.storage.get_file_bytes(version.storage_path)

        # Set status to processing
        version.extraction_status = ExtractionStatus.PROCESSING.value
        session.execute(
            delete(DocumentChunk).where(DocumentChunk.document_version_id == version.id)
        )
        session.commit()

        try:
            extraction_result = self.extractor.extract(file_bytes)
            if extraction_result.is_scanned_only:
                version.extraction_status = ExtractionStatus.SCANNED_ONLY.value
                version.page_count = extraction_result.page_count
                version.extracted_metadata = extraction_result.technical_metadata
                session.commit()
                raise ScannedPDFException(
                    message="Scanned-only PDF detected during retry. Native text extraction could not find readable text.",
                    details={"document_id": str(document_id), "version_number": version_number},
                )

            chunks = self.chunker.chunk_document(extraction_result)
            chunk_records = [
                DocumentChunk(
                    id=uuid.uuid4(),
                    document_version_id=version.id,
                    chunk_index=chunk.chunk_index,
                    chunk_text=chunk.chunk_text,
                    part_reference=chunk.part_reference,
                    chapter_reference=chunk.chapter_reference,
                    section_reference=chunk.section_reference,
                    subsection_reference=chunk.subsection_reference,
                    paragraph_reference=chunk.paragraph_reference,
                    page_number=chunk.page_number,
                    page_end=chunk.page_end,
                    structural_metadata=chunk.structural_metadata,
                    content_hash=chunk.content_hash,
                )
                for chunk in chunks
            ]
            session.add_all(chunk_records)
            version.page_count = extraction_result.page_count
            version.extraction_status = ExtractionStatus.PROCESSED.value
            version.extraction_method = extraction_result.extraction_method
            version.extracted_metadata = extraction_result.technical_metadata
            session.commit()

            return DocumentVersionRetryResponse(
                document_id=document_id,
                version_number=version_number,
                extraction_status=version.extraction_status,
                chunk_count=len(chunk_records),
            )
        except Exception as exc:
            version.extraction_status = ExtractionStatus.FAILED.value
            version.extracted_metadata = {"error": str(exc), "retry_failed": True}
            session.commit()
            raise
