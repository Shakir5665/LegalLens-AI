from typing import Annotated
from fastapi import APIRouter, Depends, Query, status

from app.api.deps import get_legal_source_service, get_request_id
from app.schemas.legal_source import (
    LegalSourceCategory,
    LegalSourceListResponse,
    LegalSourceResponse,
    StatuteReferenceQuery,
    StatuteReferenceValidationResponse,
)
from app.services.legal_source_service import LegalSourceService

router = APIRouter(prefix="/sources", tags=["Legal Sources"])


@router.get(
    "",
    response_model=LegalSourceListResponse,
    status_code=status.HTTP_200_OK,
    summary="List Sri Lankan Legal Sources (Demonstration Catalog)",
)
async def list_sources(
    source_service: Annotated[LegalSourceService, Depends(get_legal_source_service)],
    category: Annotated[
        LegalSourceCategory | None,
        Query(description="Filter sources by category (statute, judicial_decision)"),
    ] = None,
) -> LegalSourceListResponse:
    """Retrieve catalogued Sri Lankan legal sources from the in-memory demonstration service.

    Note: This endpoint is an in-memory demonstration for Phase 1 backend engineering
    and does not connect to external legal databases or perform authoritative search.
    """
    sources = source_service.get_all_sources(category=category)
    return LegalSourceListResponse(total=len(sources), items=sources)


@router.get(
    "/{source_id}",
    response_model=LegalSourceResponse,
    status_code=status.HTTP_200_OK,
    summary="Get Legal Source by ID (Demonstration Catalog)",
)
async def get_source(
    source_id: str,
    source_service: Annotated[LegalSourceService, Depends(get_legal_source_service)],
) -> LegalSourceResponse:
    """Retrieve details for a specific Sri Lankan legal source from the in-memory catalog."""
    return source_service.get_source_by_id(source_id)


@router.post(
    "/validate-reference",
    response_model=StatuteReferenceValidationResponse,
    status_code=status.HTTP_200_OK,
    summary="Validate Statutory Reference (Demonstration Endpoint)",
)
async def validate_reference(
    query: StatuteReferenceQuery,
    source_service: Annotated[LegalSourceService, Depends(get_legal_source_service)],
    request_id: Annotated[str, Depends(get_request_id)],
) -> StatuteReferenceValidationResponse:
    """Validate section reference structure against the in-memory legal source catalog.

    Demonstration endpoint for Phase 1 Pydantic validation and dependency injection.
    Does not constitute authoritative legal advice or official citation verification.
    """
    return source_service.validate_reference(query)
