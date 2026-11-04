import uuid
from collections.abc import Generator
from typing import Annotated
from fastapi import Depends, Header
from sqlalchemy.orm import Session

from app.core.config import Settings, get_settings
from app.db.session import get_engine, get_session_factory
from app.providers.base import LLMProvider
from app.providers.gemini_provider import GeminiProvider
from app.services.legal_source_service import LegalSourceService
from app.services.llm_service import LLMService

# Singleton service instance for in-memory Phase 1 dependency injection
_legal_source_service = LegalSourceService()


def get_app_settings() -> Settings:
    """Dependency providing cached application configuration."""
    return get_settings()


def get_legal_source_service() -> LegalSourceService:
    """Dependency providing the legal source domain service."""
    return _legal_source_service


def get_llm_provider(
    settings: Annotated[Settings, Depends(get_app_settings)],
) -> LLMProvider:
    """Dependency providing the production Gemini LLM provider.

    Instantiated lazily to ensure other routes operate independently of LLM keys.
    """
    return GeminiProvider(
        api_key=settings.gemini_api_key,
        model=settings.gemini_model,
        timeout_seconds=settings.llm_timeout_seconds,
        temperature=settings.llm_temperature,
    )


def get_llm_service(
    provider: Annotated[LLMProvider, Depends(get_llm_provider)],
    settings: Annotated[Settings, Depends(get_app_settings)],
) -> LLMService:
    """Dependency providing the domain LLM orchestration service."""
    return LLMService(provider=provider, settings=settings)


def get_request_id(
    x_request_id: Annotated[str | None, Header(description="Optional client request correlation ID")] = None,
) -> str:
    """Dependency returning client request ID or generating a fresh UUID."""
    return x_request_id or str(uuid.uuid4())


def get_db(
    settings: Annotated[Settings, Depends(get_app_settings)],
) -> Generator[Session, None, None]:
    """Dependency providing a SQLAlchemy database session with automatic lifecycle cleanup."""
    engine = get_engine(settings=settings)
    session_factory = get_session_factory(engine)
    session = session_factory()
    try:
        yield session
    finally:
        session.close()
