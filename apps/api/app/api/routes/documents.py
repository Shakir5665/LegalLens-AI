"""Legal Document Management and Ingestion API Endpoints.

Tasks 3.5, 3.8, 3.9, 3.10 and Tasks 3.A-3.G:
- PDF upload and ingestion.
- Catalog listing and inspection.
- Presigned download URL generation.
- Signed local file streaming.
- Soft deletion and restoration.
- Manual failure retry.
"""

from typing import Annotated
import uuid

from fastapi import APIRouter, Depends, File, Form, HTTPException, Query, UploadFile, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_document_service
from app.db.models.document import DocumentType
from app.schemas.document import (
    DocumentDetailResponse,
    DocumentListResponse,
    DocumentUploadResponse,
    DocumentVersionChunksResponse,
    DocumentVersionRestoreResponse,
    DocumentVersionRetryResponse,
    DocumentVersionSoftDeleteResponse,
    PresignedDownloadResponse,
)
from app.schemas.legal_source import SourceAuthenticity
from app.services.document_service import DocumentService
from app.storage.local import LocalStorageProvider

router = APIRouter(prefix="/documents", tags=["Legal Documents"])


@router.post(
    "",
    response_model=DocumentUploadResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Upload and ingest a legal PDF document",
    description=(
        "Upload a legal PDF document with metadata. Performs content-based validation, "
        "safe cloud/local object storage, page-by-page text extraction, technical metadata harvesting, "
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
    description="Retrieve a paginated catalog of all ingested legal documents and their active version counts.",
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
    "/download-file",
    summary="Download local file via signed URL",
    description="Stream a locally stored PDF object if the signature and expiration timestamp are valid.",
)
def download_local_file(
    key: Annotated[str, Query(description="Storage object key")],
    expires: Annotated[int, Query(description="Expiration timestamp")],
    signature: Annotated[str, Query(description="HMAC signature")],
    filename: Annotated[str | None, Query(description="Optional download filename")] = None,
    service: DocumentService = Depends(get_document_service),
) -> FileResponse:
    """Verify signed token and stream the requested file from local disk."""
    provider = service.storage.provider
    if not isinstance(provider, LocalStorageProvider):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Direct local file streaming is only available when STORAGE_PROVIDER=local.",
        )
    if not provider.verify_signed_url_token(key, expires, signature):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid or expired download link signature.",
        )
    target_path = provider._resolve_key(key)
    if not target_path.is_file():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Requested file does not exist on storage disk.",
        )
    return FileResponse(
        path=str(target_path),
        filename=filename or target_path.name,
        media_type="application/pdf",
    )


@router.get(
    "/{document_id}",
    response_model=DocumentDetailResponse,
    status_code=status.HTTP_200_OK,
    summary="Inspect logical legal document metadata and version history",
    description="Retrieve logical legal document metadata and summaries of all associated uploaded versions.",
)
def get_document(
    document_id: uuid.UUID,
    include_deleted: Annotated[bool, Query(description="Include soft-deleted versions")] = False,
    db: Session = Depends(get_db),
    service: DocumentService = Depends(get_document_service),
) -> DocumentDetailResponse:
    """Retrieve document metadata and all version summaries."""
    return service.get_document(session=db, document_id=document_id, include_deleted=include_deleted)


@router.get(
    "/{document_id}/versions/{version_number}/download",
    response_model=PresignedDownloadResponse,
    status_code=status.HTTP_200_OK,
    summary="Get presigned download URL for a document version",
    description="Generate a secure, short-lived presigned URL to download the original PDF without exposing cloud credentials.",
)
def get_presigned_download_url(
    document_id: uuid.UUID,
    version_number: int,
    expires_in: Annotated[int, Query(ge=60, le=3600, description="Validity lifetime in seconds (1m - 1h)")] = 600,
    db: Session = Depends(get_db),
    service: DocumentService = Depends(get_document_service),
) -> PresignedDownloadResponse:
    """Generate short-lived presigned URL for downloading the original PDF."""
    return service.get_presigned_download_url(
        session=db,
        document_id=document_id,
        version_number=version_number,
        expires_in_seconds=expires_in,
    )


@router.delete(
    "/{document_id}/versions/{version_number}",
    response_model=DocumentVersionSoftDeleteResponse,
    status_code=status.HTTP_200_OK,
    summary="Soft-delete a document version",
    description=(
        "Mark a document version as deleted, purge its chunks from active retrieval, "
        "and preserve the underlying PDF object for audit or administrative restoration."
    ),
)
def soft_delete_version(
    document_id: uuid.UUID,
    version_number: int,
    db: Session = Depends(get_db),
    service: DocumentService = Depends(get_document_service),
) -> DocumentVersionSoftDeleteResponse:
    """Soft-delete a document version and purge its chunks from active search."""
    return service.soft_delete_version(
        session=db,
        document_id=document_id,
        version_number=version_number,
    )


@router.post(
    "/{document_id}/versions/{version_number}/restore",
    response_model=DocumentVersionRestoreResponse,
    status_code=status.HTTP_200_OK,
    summary="Restore a soft-deleted document version",
    description="Restore a soft-deleted document version by recovering its record and re-extracting its chunks.",
)
def restore_version(
    document_id: uuid.UUID,
    version_number: int,
    db: Session = Depends(get_db),
    service: DocumentService = Depends(get_document_service),
) -> DocumentVersionRestoreResponse:
    """Restore a soft-deleted document version."""
    return service.restore_version(
        session=db,
        document_id=document_id,
        version_number=version_number,
    )


@router.post(
    "/{document_id}/versions/{version_number}/retry",
    response_model=DocumentVersionRetryResponse,
    status_code=status.HTTP_200_OK,
    summary="Retry a failed document version extraction",
    description="Re-trigger text extraction and legal chunking on a previously failed document version.",
)
def retry_failed_version(
    document_id: uuid.UUID,
    version_number: int,
    db: Session = Depends(get_db),
    service: DocumentService = Depends(get_document_service),
) -> DocumentVersionRetryResponse:
    """Manually retry processing for a failed document version."""
    return service.retry_failed_version(
        session=db,
        document_id=document_id,
        version_number=version_number,
    )


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
