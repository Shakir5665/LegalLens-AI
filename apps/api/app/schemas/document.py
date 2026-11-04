"""Pydantic v2 schemas for Document Management and Inspection APIs.

Tasks 3.5, 3.8, 3.9, 3.10 and Task 16.
Follows ADR-009 (Deterministic operations) and uniform API serialization contracts.
"""

from datetime import datetime
from typing import Any
import uuid

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.legal_source import SourceAuthenticity


class DocumentUploadResponse(BaseModel):
    """Structured response payload returned upon PDF document upload & ingestion."""

    model_config = ConfigDict(from_attributes=True, frozen=True)

    document_id: uuid.UUID = Field(..., description="Logical legal document UUID")
    version_id: uuid.UUID = Field(..., description="Document version UUID")
    version_number: int = Field(..., description="Sequential version number (1, 2, ...)")
    title: str = Field(..., description="Legal document title")
    document_type: str = Field(..., description="Document category (statute, regulation, etc.)")
    page_count: int = Field(..., description="Total physical pages in PDF")
    extraction_status: str = Field(..., description="Extraction state (completed, scanned_only, failed)")
    chunk_count: int = Field(..., description="Number of structure-aware chunks generated")
    file_hash: str = Field(..., description="SHA-256 checksum of original uploaded PDF")
    created_at: datetime = Field(..., description="UTC creation timestamp")


class DocumentVersionSummary(BaseModel):
    """Summary of a specific uploaded file version of a document."""

    model_config = ConfigDict(from_attributes=True, frozen=True)

    id: uuid.UUID = Field(..., description="Version UUID")
    version_number: int = Field(..., description="Sequential version number")
    original_filename: str = Field(..., description="Original client upload filename")
    file_hash: str = Field(..., description="SHA-256 checksum")
    file_size_bytes: int = Field(..., description="File size in bytes")
    page_count: int = Field(..., description="Physical page count")
    extraction_status: str = Field(..., description="Extraction lifecycle status")
    extraction_method: str | None = Field(default=None, description="Extraction engine used")
    is_deleted: bool = Field(default=False, description="Soft-deletion status")
    deleted_at: datetime | None = Field(default=None, description="Timestamp of soft-deletion")
    created_at: datetime = Field(..., description="Version creation timestamp")


class DocumentDetailResponse(BaseModel):
    """Full detail of a logical legal document, including version history summaries."""

    model_config = ConfigDict(from_attributes=True, frozen=True)

    id: uuid.UUID = Field(..., description="Document UUID")
    title: str = Field(..., description="Document title")
    document_type: str = Field(..., description="Document category")
    jurisdiction: str = Field(..., description="Applicable jurisdiction")
    legal_domain: str = Field(..., description="Legal domain")
    source_authenticity: str = Field(..., description="Source authenticity classification")
    description: str | None = Field(default=None, description="Document description or context")
    created_at: datetime = Field(..., description="Created UTC timestamp")
    updated_at: datetime = Field(..., description="Last updated UTC timestamp")
    versions: list[DocumentVersionSummary] = Field(
        default_factory=list, description="Ordered list of historical and current document versions"
    )


class ChunkResponse(BaseModel):
    """Traceable passage extracted from a legal document version."""

    model_config = ConfigDict(from_attributes=True, frozen=True)

    id: uuid.UUID = Field(..., description="Chunk UUID")
    chunk_index: int = Field(..., description="Zero-based deterministic chunk sequence index")
    chunk_text: str = Field(..., description="Passage text")
    part_reference: str | None = Field(default=None, description="Identified Part reference (e.g. 'Part IVA')")
    chapter_reference: str | None = Field(default=None, description="Identified Chapter reference")
    section_reference: str | None = Field(default=None, description="Identified Section reference (e.g. 'Section 31B')")
    subsection_reference: str | None = Field(default=None, description="Identified Subsection (e.g. '(1)')")
    paragraph_reference: str | None = Field(default=None, description="Identified Paragraph (e.g. '(a)')")
    page_number: int = Field(..., description="Physical start page (1-based)")
    page_end: int | None = Field(default=None, description="Physical end page if multi-page span")
    structural_metadata: dict[str, Any] = Field(default_factory=dict, description="Structural extraction details")
    content_hash: str = Field(..., description="SHA-256 hash of normalized chunk text")
    created_at: datetime = Field(..., description="UTC creation timestamp")


class DocumentVersionChunksResponse(BaseModel):
    """Collection of chunks belonging to a specific document version."""

    model_config = ConfigDict(from_attributes=True, frozen=True)

    document_id: uuid.UUID = Field(..., description="Document UUID")
    document_title: str = Field(..., description="Document title")
    version_id: uuid.UUID = Field(..., description="Version UUID")
    version_number: int = Field(..., description="Version number")
    total_chunks: int = Field(..., description="Total count of extracted chunks")
    chunks: list[ChunkResponse] = Field(default_factory=list, description="List of legal chunks")


class DocumentListItem(BaseModel):
    """Summary item for document catalog listing."""

    model_config = ConfigDict(from_attributes=True, frozen=True)

    id: uuid.UUID
    title: str
    document_type: str
    jurisdiction: str
    legal_domain: str
    source_authenticity: str
    version_count: int
    created_at: datetime
    updated_at: datetime


class DocumentListResponse(BaseModel):
    """Paginated or listed legal documents."""

    model_config = ConfigDict(from_attributes=True, frozen=True)

    total: int = Field(..., ge=0)
    items: list[DocumentListItem]


class PresignedDownloadResponse(BaseModel):
    """Presigned time-limited download URL response for a document version."""

    model_config = ConfigDict(from_attributes=True, frozen=True)

    download_url: str = Field(..., description="Presigned temporary download URL")
    expires_in: int = Field(..., description="URL validity lifetime in seconds")
    filename: str = Field(..., description="Original filename of the document")
    document_id: uuid.UUID = Field(..., description="Logical document UUID")
    version_number: int = Field(..., description="Document version number")


class DocumentVersionSoftDeleteResponse(BaseModel):
    """Response payload for soft-deleting a document version."""

    model_config = ConfigDict(from_attributes=True, frozen=True)

    message: str = Field(default="Document version soft-deleted successfully.")
    document_id: uuid.UUID
    version_number: int
    is_deleted: bool = True
    deleted_at: datetime
    chunks_removed: int


class DocumentVersionRestoreResponse(BaseModel):
    """Response payload for restoring a soft-deleted document version."""

    model_config = ConfigDict(from_attributes=True, frozen=True)

    message: str = Field(default="Document version restored successfully.")
    document_id: uuid.UUID
    version_number: int
    is_deleted: bool = False
    chunk_count: int
    extraction_status: str


class DocumentVersionRetryResponse(BaseModel):
    """Response payload for retrying a failed document version extraction."""

    model_config = ConfigDict(from_attributes=True, frozen=True)

    message: str = Field(default="Document version extraction re-processed successfully.")
    document_id: uuid.UUID
    version_number: int
    extraction_status: str
    chunk_count: int
