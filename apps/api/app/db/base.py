"""SQLAlchemy Declarative Base for LegalLens AI models.

Follows ADR-001 (Modular Monolith) and ADR-003 (PostgreSQL Primary DB).
"""

from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """Declarative base class for all SQLAlchemy 2.x ORM models."""

    pass
