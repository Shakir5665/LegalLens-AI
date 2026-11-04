"""Legal Document Management and Ingestion API Endpoints.

Tasks 3.5, 3.8, 3.9, 3.10 and Task 16.
Follows ADR-001 (Modular Monolith) and standard FastAPI REST patterns.
"""

from typing import Annotated
import uuid

from fastapi import APIRouter, Depends, File, Form, Query, UploadFile, status
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_document_service
from app.db.models.document import DocumentType
from app.schemas.document import (
    DocumentDetailResponse,
    DocumentListResponse,
    DocumentUploadResponse,
    DocumentVersionChunksResponse,
)
from app.schemas.legal_source import SourceAuthenticity
from app.services.document_service import DocumentService

router = APIRouter(prefix="/documents", tags=["Legal Documents"])


@router.post(
    "",
    response_model=DocumentUploadResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Upload and ingest a legal PDF document",
    description=(
        "Upload a legal PDF document with metadata. Performs content-based validation, "
        "safe local storage, page-by-page text extraction, technical metadata harvesting, "
        "and structure-aware legal chunking with complete evidence traceability."
    ),
)
async def upload_document(
    file: Annotated[UploadFile, File(description="Legal PDF file to ingest")],
    title: Annotated[str, Form(min_length=2, max_length=255, description="Legal document title")],
    document_type: Annotated[str, Form(description="Document type")] = DocumentType.STATUTE.value,
    jurisdiction: Annotated[str, Form(description="Legal jurisdiction")] = "Sri Lanka",
    legal_domain: Annotated[str, Form(description="Legal subject domain")] = "Employment Law",
    source_authenticity: Annotated[
        SourceAuthenticity, Form(description="Authenticity classification")
    ] = SourceAuthenticity.UNVERIFIED,
    description: Annotated[str | None, Form(description="Optional summary or notes")] = None,
    document_id: Annotated[
        uuid.UUID | None,
        Form(description="Optional existing document UUID to ingest a new sequential version"),
    ] = None,
    db: Session = Depends(get_db),
    service: DocumentService = Depends(get_document_service),
) -> DocumentUploadResponse:
    """Ingest a legal PDF document and persist its versions and structure-aware chunks."""
    return service.ingest_document(
        session=db,
        file_obj=file.file,
        original_filename=file.filename or "uploaded_document.pdf",
        title=title,
        document_type=document_type,
        jurisdiction=jurisdiction,
        legal_domain=legal_domain,
        source_authenticity=source_authenticity.value,
        description=description,
        document_id=document_id,
        declared_mime=file.content_type,
    )


@router.get(
    "",
    response_model=DocumentListResponse,
    status_code=status.HTTP_200_OK,
    summary="List ingested legal documents",
    description="Retrieve a paginated catalog of all ingested legal documents and their version counts.",
)
def list_documents(
    skip: Annotated[int, Query(ge=0, description="Offset")] = 0,
    limit: Annotated[int, Query(ge=1, le=100, description="Page limit")] = 50,
    db: Session = Depends(get_db),
    service: DocumentService = Depends(get_document_service),
) -> DocumentListResponse:
    """Retrieve catalog of ingested documents."""
    return service.list_documents(session=db, skip=skip, limit=limit)


@router.get(
    "/{document_id}",
    response_model=DocumentDetailResponse,
    status_code=status.HTTP_200_OK,
    summary="Inspect logical legal document metadata and version history",
    description="Retrieve logical legal document metadata and summaries of all associated uploaded versions.",
)
def get_document(
    document_id: uuid.UUID,
    db: Session = Depends(get_db),
    service: DocumentService = Depends(get_document_service),
) -> DocumentDetailResponse:
    """Retrieve document metadata and all version summaries."""
    return service.get_document(session=db, document_id=document_id)


@router.get(
    "/{document_id}/versions/{version_number}/chunks",
    response_model=DocumentVersionChunksResponse,
    status_code=status.HTTP_200_OK,
    summary="Inspect extracted chunks for a document version",
    description=(
        "Retrieve all structure-aware legal passages extracted from a specific document version, "
        "including exact section, subsection, and physical page boundary references."
    ),
)
def get_version_chunks(
    document_id: uuid.UUID,
    version_number: int,
    db: Session = Depends(get_db),
    service: DocumentService = Depends(get_document_service),
) -> DocumentVersionChunksResponse:
    """Retrieve all chunks with legal structure and physical page references."""
    return service.get_version_chunks(
        session=db,
        document_id=document_id,
        version_number=version_number,
    )
