"""LegalLens AI Database Package."""

from app.db.base import Base
from app.db.models.document import (
    Document,
    DocumentChunk,
    DocumentType,
    DocumentVersion,
    ExtractionStatus,
)
from app.db.session import (
    check_database_connection,
    create_db_engine,
    db_session_scope,
    get_db_session,
    get_engine,
    get_session_factory,
    reset_engine,
    verify_database_connection,
)

__all__ = [
    "Base",
    "Document",
    "DocumentChunk",
    "DocumentType",
    "DocumentVersion",
    "ExtractionStatus",
    "check_database_connection",
    "create_db_engine",
    "db_session_scope",
    "get_db_session",
    "get_engine",
    "get_session_factory",
    "reset_engine",
    "verify_database_connection",
]
