"""Legal Document Management and Ingestion Orchestration Service.

Tasks 3.5, 3.6, 3.7, 3.8, 3.9, 3.10 and Task 16.
Follows ADR-001 (Modular Monolith), ADR-009 (Deterministic operations),
and ADR-010 (Native-Text PDF Extraction).
"""

from typing import BinaryIO
import uuid

from sqlalchemy import func, select
from sqlalchemy.orm import Session, selectinload

from app.core.errors import (
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
    DocumentVersionSummary,
)
from app.schemas.legal_source import SourceAuthenticity
from app.services.legal_chunking_service import LegalChunkingService
from app.services.pdf_extraction_service import PDFExtractionService
from app.services.storage_service import StorageService

logger = get_logger("app.services.document")


class DocumentService:
    """Coordinates file validation, storage, PDF extraction, legal chunking, and version management."""

    def __init__(
        self,
        storage_service: StorageService | None = None,
        pdf_extractor: PDFExtractionService | None = None,
        chunker: LegalChunkingService | None = None,
    ) -> None:
        self.storage = storage_service or StorageService()
        self.extractor = pdf_extractor or PDFExtractionService()
        self.chunker = chunker or LegalChunkingService()

    def ingest_document(
        self,
        session: Session,
        file_obj: BinaryIO,
        original_filename: str,
        title: str,
        document_type: str = DocumentType.STATUTE.value,
        jurisdiction: str = "Sri Lanka",
        legal_domain: str = "Employment Law",
        source_authenticity: str = "Unverified",
        description: str | None = None,
        document_id: uuid.UUID | None = None,
        declared_mime: str | None = None,
        allow_verified: bool = False,
    ) -> DocumentUploadResponse:
        """Execute end-to-end legal document ingestion pipeline.

        1. Validate file stream & compute SHA-256.
        2. Enforce source authenticity non-self-certification gate.
        3. Identify target logical document and enforce duplicate rules.
        4. Store original PDF securely.
        5. Extract text and technical metadata page-by-page.
        6. Check for scanned-only PDF (commit status & return 422 if unsupported).
        7. Generate structure-aware legal chunks.
        8. Persist document, version, and chunk records transactionally.
        """
        # Step 0: Enforce Source Authenticity Gate (Review Point 1)
        # Ordinary uploads must not self-certify as VerifiedOfficial or VerifiedSecondary.
        # Authentic legal classification requires authoritative verification workflow.
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
            # Query existing document
            stmt = select(Document).where(Document.id == document_id)
            # Use row-level locking when available (PostgreSQL) to avoid concurrent version races
            if session.bind and session.bind.dialect.name == "postgresql":
                stmt = stmt.with_for_update()
            target_document = session.execute(stmt).scalar_one_or_none()

            if not target_document:
                raise EntityNotFoundException("Document", str(document_id))

            # Duplicate detection policy (Section 13.2):
            # Same logical document & same SHA-256: return existing version and avoid duplication
            existing_version = session.execute(
                select(DocumentVersion).where(
                    DocumentVersion.document_id == target_document.id,
                    DocumentVersion.file_hash == file_hash,
                )
            ).scalar_one_or_none()

            if existing_version is not None:
                logger.info(
                    "Duplicate upload for document '%s': Version %d with identical hash %s exists.",
                    target_document.id,
                    existing_version.version_number,
                    file_hash[:12],
                )
                chunk_count = session.execute(
                    select(func.count(DocumentChunk.id)).where(
                        DocumentChunk.document_version_id == existing_version.id
                    )
                ).scalar_one()

                return DocumentUploadResponse(
                    document_id=target_document.id,
                    version_id=existing_version.id,
                    version_number=existing_version.version_number,
                    title=target_document.title,
                    document_type=target_document.document_type,
                    page_count=existing_version.page_count,
                    extraction_status=existing_version.extraction_status,
                    chunk_count=chunk_count,
                    file_hash=existing_version.file_hash,
                    created_at=existing_version.created_at,
                )

            # Same logical document & different SHA-256: determine next version number
            max_v = session.execute(
                select(func.coalesce(func.max(DocumentVersion.version_number), 0)).where(
                    DocumentVersion.document_id == target_document.id
                )
            ).scalar_one()
            target_version_number = max_v + 1

        stored_file_path: str | None = None

        try:
            # Step 3: Store original file safely
            stored_info = self.storage.store_file(
                file_obj=file_obj,
                original_filename=original_filename,
                declared_mime=declared_mime,
            )
            stored_file_path = stored_info.storage_path
            resolved_file_path = self.storage.resolve_path(stored_file_path)

            # Step 4: Extract text page-by-page & extract technical metadata
            extraction_result = self.extractor.extract(resolved_file_path)

            # Create or update logical Document entity
            if target_document is None:
                target_document = Document(
                    id=document_id or uuid.uuid4(),
                    title=title.strip(),
                    document_type=document_type,
                    jurisdiction=jurisdiction,
                    legal_domain=legal_domain,
                    source_authenticity=source_authenticity,
                    description=description,
                )
                session.add(target_document)
                session.flush()

            # Step 5: Check Scanned PDF status (Task 3.7)
            if extraction_result.is_scanned_only:
                version_record = DocumentVersion(
                    id=uuid.uuid4(),
                    document_id=target_document.id,
                    version_number=target_version_number,
                    original_filename=stored_info.original_filename,
                    storage_path=stored_info.storage_path,
                    file_hash=stored_info.file_hash,
                    mime_type=stored_info.mime_type,
                    file_size_bytes=stored_info.file_size_bytes,
                    page_count=extraction_result.page_count,
                    extraction_status=ExtractionStatus.SCANNED_ONLY.value,
                    extraction_method=extraction_result.extraction_method,
                    extracted_metadata=extraction_result.technical_metadata,
                )
                session.add(version_record)
                # Commit deliberately so the scanned_only record is preserved as required
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

            # Step 6: Generate structure-aware legal chunks (Task 3.10)
            chunks = self.chunker.chunk_document(extraction_result)

            # Step 7: Persist DocumentVersion and DocumentChunks
            version_record = DocumentVersion(
                id=uuid.uuid4(),
                document_id=target_document.id,
                version_number=target_version_number,
                original_filename=stored_info.original_filename,
                storage_path=stored_info.storage_path,
                file_hash=stored_info.file_hash,
                mime_type=stored_info.mime_type,
                file_size_bytes=stored_info.file_size_bytes,
                page_count=extraction_result.page_count,
                extraction_status=ExtractionStatus.COMPLETED.value,
                extraction_method=extraction_result.extraction_method,
                extracted_metadata=extraction_result.technical_metadata,
            )
            session.add(version_record)
            session.flush()

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
            # Re-raise scanned PDF exception directly (its DB state is already committed)
            raise
        except Exception as exc:
            session.rollback()
            # Clean up stored file if persistence failed (compensation strategy)
            if stored_file_path:
                self.storage.delete_file(stored_file_path)
            logger.error("Ingestion failed: %s", exc)
            if isinstance(exc, (FileValidationError, EntityNotFoundException)):
                raise
            raise

    def get_document(self, session: Session, document_id: uuid.UUID) -> DocumentDetailResponse:
        """Retrieve logical legal document metadata and its complete version history."""
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
                created_at=v.created_at,
            )
            for v in doc.versions
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
        # Verify document exists
        doc = session.execute(select(Document).where(Document.id == document_id)).scalar_one_or_none()
        if not doc:
            raise EntityNotFoundException("Document", str(document_id))

        # Query version
        version = session.execute(
            select(DocumentVersion).where(
                DocumentVersion.document_id == document_id,
                DocumentVersion.version_number == version_number,
            )
        ).scalar_one_or_none()
        if not version:
            raise EntityNotFoundException("DocumentVersion", f"{document_id}/v{version_number}")

        # Query chunks ordered by chunk_index
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
        """List catalogued legal documents with total version counts."""
        # Query total count
        total = session.execute(select(func.count(Document.id))).scalar_one()

        # Query documents with subquery count of versions
        stmt = (
            select(
                Document,
                func.count(DocumentVersion.id).label("version_count"),
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
