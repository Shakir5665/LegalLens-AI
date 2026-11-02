import uuid
from typing import Annotated
from fastapi import Header

from app.core.config import Settings, get_settings
from app.services.legal_source_service import LegalSourceService

# Singleton service instance for in-memory Phase 1 dependency injection
_legal_source_service = LegalSourceService()


def get_app_settings() -> Settings:
    """Dependency providing cached application configuration."""
    return get_settings()


def get_legal_source_service() -> LegalSourceService:
    """Dependency providing the legal source domain service."""
    return _legal_source_service


def get_request_id(
    x_request_id: Annotated[str | None, Header(description="Optional client request correlation ID")] = None,
) -> str:
    """Dependency returning client request ID or generating a fresh UUID."""
    return x_request_id or str(uuid.uuid4())
