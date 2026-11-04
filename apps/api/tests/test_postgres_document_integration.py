"""Automated PostgreSQL Integration Tests for LegalLens AI Document Persistences.

Runs against configured PostgreSQL when available, or skips if not configured.
Validates ADR-003 (PostgreSQL primary DB) and Task 3.4 / 3.9 / 3.10 live DB behavior.
"""

import io
import uuid

import pytest
import pymupdf
from sqlalchemy import func, select

from app.core.config import get_settings
from app.db.models.document import Document, DocumentChunk, DocumentVersion
from app.db.session import check_database_connection, get_engine, get_session_factory
from app.services.document_service import DocumentService
from app.services.storage_service import StorageService


@pytest.fixture(scope="module")
def postgres_session():
    """Yield a database session connected to PostgreSQL if available."""
    settings = get_settings()
    engine = get_engine(settings)
    if engine.dialect.name != "postgresql" or not check_database_connection(engine):
        pytest.skip("PostgreSQL database is not available or not configured.")

    session_factory = get_session_factory(engine)
    session = session_factory()
    try:
        yield session, settings
    finally:
        session.close()


def test_postgres_live_document_lifecycle(postgres_session):
    """Verify live PostgreSQL ingestion, querying, and cascade cleanup."""
    session, settings = postgres_session
    storage = StorageService(settings=settings)
    doc_service = DocumentService(storage_service=storage)

    # Build test PDF
    doc = pymupdf.open()
    p1 = doc.new_page()
    p1.insert_text((50, 50), "PART I - PRELIMINARY\nSection 1. Short title.")
    pdf_bytes = doc.tobytes()
    doc.close()

    test_title = f"PostgreSQL Automated Test {uuid.uuid4().hex[:8]}"

    # Ingest
    res = doc_service.ingest_document(
        session=session,
        file_obj=io.BytesIO(pdf_bytes),
        original_filename="pg_test.pdf",
        title=test_title,
        document_type="statute",
    )

    doc_id = res.document_id

    try:
        # Assert in PostgreSQL
        db_doc = session.execute(select(Document).where(Document.id == doc_id)).scalar_one()
        assert db_doc.title == test_title
        assert len(db_doc.versions) == 1
        assert len(db_doc.versions[0].chunks) >= 1

        v = db_doc.versions[0]
        stored_path = v.storage_path
        assert v.chunks[0].section_reference == "Section 1"
        assert v.chunks[0].page_number == 1

        # Delete document to verify DB cascade
        session.delete(db_doc)
        session.commit()
        storage.delete_file(stored_path)

        # Assert cascade in PostgreSQL
        v_count = session.execute(
            select(func.count(DocumentVersion.id)).where(DocumentVersion.document_id == doc_id)
        ).scalar_one()
        assert v_count == 0
    finally:
        # Guarantee cleanup
        session.rollback()
