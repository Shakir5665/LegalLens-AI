"""SQLAlchemy 2.x declarative models for Legal Document Management.

Tasks 3.2, 3.3, 3.4:
- Document: Logical legal authority (title, type, jurisdiction, authenticity).
- DocumentVersion: Specific file ingestion artifact (version number, hash, metadata).
- DocumentChunk: Traceable legal passage with structural hierarchy and page bounds.
"""

from datetime import datetime, timezone
from enum import Enum
from typing import Any
import uuid

from sqlalchemy import (
    BigInteger,
    Boolean,
    CheckConstraint,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    JSON,
    String,
    Text,
    UniqueConstraint,
    Uuid,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


def utc_now() -> datetime:
    """Return timezone-aware current UTC datetime."""
    return datetime.now(timezone.utc)


class DocumentType(str, Enum):
    """Categorization of legal documents supported by LegalLens AI."""

    STATUTE = "statute"
    REGULATION = "regulation"
    JUDICIAL_DECISION = "judicial_decision"
    GAZETTE = "gazette"
    OTHER_LEGAL_DOCUMENT = "other_legal_document"


class ExtractionStatus(str, Enum):
    """Extraction lifecycle state for a document version."""

    PENDING = "pending"
    PROCESSING = "processing"
    PROCESSED = "processed"
    COMPLETED = "completed"
    FAILED = "failed"
    SCANNED_ONLY = "scanned_only"


class Document(Base):
    """Logical legal document representing an authoritative legal instrument."""

    __tablename__ = "documents"

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid,
        primary_key=True,
        default=uuid.uuid4,
    )
    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        index=True,
    )
    document_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        index=True,
        default=DocumentType.STATUTE.value,
    )
    jurisdiction: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        default="Sri Lanka",
    )
    legal_domain: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        default="Employment Law",
    )
    source_authenticity: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        default="Unverified",
    )
    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
        server_default=func.now(),
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
        server_default=func.now(),
        onupdate=utc_now,
    )

    # One-to-many relationship: Document -> DocumentVersion
    versions: Mapped[list["DocumentVersion"]] = relationship(
        "DocumentVersion",
        back_populates="document",
        cascade="all, delete-orphan",
        order_by="DocumentVersion.version_number",
    )

    def __repr__(self) -> str:
        return f"<Document(id={self.id}, title='{self.title}', type='{self.document_type}')>"


class DocumentVersion(Base):
    """Individual uploaded file version of a logical legal document."""

    __tablename__ = "document_versions"

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid,
        primary_key=True,
        default=uuid.uuid4,
    )
    document_id: Mapped[uuid.UUID] = mapped_column(
        Uuid,
        ForeignKey("documents.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    version_number: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )
    original_filename: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )
    storage_path: Mapped[str] = mapped_column(
        String(512),
        nullable=False,
    )
    file_hash: Mapped[str] = mapped_column(
        String(64),
        nullable=False,
        index=True,
    )
    mime_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        default="application/pdf",
    )
    file_size_bytes: Mapped[int] = mapped_column(
        BigInteger,
        nullable=False,
    )
    page_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )
    extraction_status: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        default=ExtractionStatus.PENDING.value,
        index=True,
    )
    extraction_method: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )
    extracted_metadata: Mapped[dict[str, Any]] = mapped_column(
        JSON,
        nullable=False,
        default=dict,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
        server_default=func.now(),
    )
    is_deleted: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        server_default="false",
        index=True,
    )
    deleted_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    # Relationships
    document: Mapped["Document"] = relationship(
        "Document",
        back_populates="versions",
    )
    chunks: Mapped[list["DocumentChunk"]] = relationship(
        "DocumentChunk",
        back_populates="document_version",
        cascade="all, delete-orphan",
        order_by="DocumentChunk.chunk_index",
    )

    __table_args__ = (
        UniqueConstraint(
            "document_id",
            "version_number",
            name="uq_document_versions_document_id_version_number",
        ),
        CheckConstraint(
            "version_number > 0",
            name="ck_document_versions_positive_version_number",
        ),
        CheckConstraint(
            "file_size_bytes >= 0",
            name="ck_document_versions_non_negative_file_size",
        ),
        CheckConstraint(
            "page_count >= 0",
            name="ck_document_versions_non_negative_page_count",
        ),
        Index("ix_document_versions_doc_hash", "document_id", "file_hash"),
    )

    def __repr__(self) -> str:
        return (
            f"<DocumentVersion(id={self.id}, doc_id={self.document_id}, "
            f"v={self.version_number}, status='{self.extraction_status}')>"
        )


class DocumentChunk(Base):
    """Meaningful passage extracted from a document version with legal hierarchy traceability."""

    __tablename__ = "document_chunks"

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid,
        primary_key=True,
        default=uuid.uuid4,
    )
    document_version_id: Mapped[uuid.UUID] = mapped_column(
        Uuid,
        ForeignKey("document_versions.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    chunk_index: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )
    chunk_text: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )
    part_reference: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
        index=True,
    )
    chapter_reference: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
        index=True,
    )
    section_reference: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
        index=True,
    )
    subsection_reference: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )
    paragraph_reference: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )
    page_number: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )
    page_end: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )
    structural_metadata: Mapped[dict[str, Any]] = mapped_column(
        JSON,
        nullable=False,
        default=dict,
    )
    content_hash: Mapped[str] = mapped_column(
        String(64),
        nullable=False,
        index=True,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
        server_default=func.now(),
    )

    # Relationships
    document_version: Mapped["DocumentVersion"] = relationship(
        "DocumentVersion",
        back_populates="chunks",
    )

    __table_args__ = (
        UniqueConstraint(
            "document_version_id",
            "chunk_index",
            name="uq_document_chunks_version_id_chunk_index",
        ),
        CheckConstraint(
            "chunk_index >= 0",
            name="ck_document_chunks_non_negative_chunk_index",
        ),
        CheckConstraint(
            "length(chunk_text) > 0",
            name="ck_document_chunks_non_empty_chunk_text",
        ),
        CheckConstraint(
            "page_number >= 1",
            name="ck_document_chunks_positive_page_number",
        ),
        Index("ix_document_chunks_version_page", "document_version_id", "page_number"),
    )

    def __repr__(self) -> str:
        return (
            f"<DocumentChunk(id={self.id}, v_id={self.document_version_id}, "
            f"idx={self.chunk_index}, p={self.page_number}, sec='{self.section_reference}')>"
        )
