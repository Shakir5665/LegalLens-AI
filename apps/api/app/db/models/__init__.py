"""LegalLens AI Database Models."""

from app.db.base import Base
from app.db.models.document import (
    Document,
    DocumentChunk,
    DocumentType,
    DocumentVersion,
    ExtractionStatus,
)

__all__ = [
    "Base",
    "Document",
    "DocumentChunk",
    "DocumentType",
    "DocumentVersion",
    "ExtractionStatus",
]
