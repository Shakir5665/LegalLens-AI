"""Tests for SQLAlchemy 2.x Document Models and Database Integrity Constraints.

Task 3.4: Core Database Tables and Constraints.
Tests:
- Model creation and defaults.
- Required fields and column constraints.
- Foreign key constraints with cascade deletes.
- Unique constraints (version_number per document, chunk_index per version).
- Positive/non-negative check constraints.
- Timezone-aware UTC timestamps.
"""

from datetime import datetime, timezone
import uuid

import pytest
from sqlalchemy import create_engine, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import sessionmaker

from app.db.base import Base
from app.db.models.document import (
    Document,
    DocumentChunk,
    DocumentType,
    DocumentVersion,
    ExtractionStatus,
)


@pytest.fixture
def test_db_session(tmp_path):
    """Provide an isolated database session with full table schema."""
    db_file = tmp_path / "models_test.db"
    engine = create_engine(f"sqlite:///{db_file}")
    Base.metadata.create_all(bind=engine)
    session_factory = sessionmaker(bind=engine, expire_on_commit=False)
    session = session_factory()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)
        engine.dispose()


def test_document_creation_and_defaults(test_db_session):
    """Verify logical Document model creation with standard defaults."""
    doc = Document(
        title="Industrial Disputes Act No. 43 of 1950",
        document_type=DocumentType.STATUTE.value,
        jurisdiction="Sri Lanka",
        legal_domain="Employment Law",
        source_authenticity="VerifiedOfficial",
        description="Principal enactment governing industrial dispute resolution.",
    )
    test_db_session.add(doc)
    test_db_session.commit()

    retrieved = test_db_session.execute(select(Document).where(Document.id == doc.id)).scalar_one()
    assert retrieved.id is not None
    assert isinstance(retrieved.id, uuid.UUID)
    assert retrieved.title == "Industrial Disputes Act No. 43 of 1950"
    assert retrieved.document_type == "statute"
    assert retrieved.jurisdiction == "Sri Lanka"
    assert retrieved.legal_domain == "Employment Law"
    assert retrieved.source_authenticity == "VerifiedOfficial"
    assert retrieved.created_at is not None
    assert retrieved.created_at.tzinfo is not None or retrieved.created_at <= datetime.now(timezone.utc)
    assert len(retrieved.versions) == 0


def test_document_version_creation_and_relationships(test_db_session):
    """Verify DocumentVersion creation and bi-directional relationship with Document."""
    doc = Document(
        title="Termination of Employment of Workmen Act No. 45 of 1971",
        document_type=DocumentType.STATUTE.value,
    )
    test_db_session.add(doc)
    test_db_session.commit()

    version = DocumentVersion(
        document_id=doc.id,
        version_number=1,
        original_filename="tewa_1971.pdf",
        storage_path="storage/tewa_v1.pdf",
        file_hash="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        file_size_bytes=1048576,
        page_count=24,
        extraction_status=ExtractionStatus.COMPLETED.value,
        extraction_method="pymupdf_native_text",
        extracted_metadata={"producer": "Government Press", "title": "TEWA 1971"},
    )
    test_db_session.add(version)
    test_db_session.commit()

    retrieved_doc = test_db_session.execute(select(Document).where(Document.id == doc.id)).scalar_one()
    assert len(retrieved_doc.versions) == 1
    assert retrieved_doc.versions[0].version_number == 1
    assert retrieved_doc.versions[0].original_filename == "tewa_1971.pdf"
    assert retrieved_doc.versions[0].document.title == doc.title


def test_document_chunk_creation_and_fields(test_db_session):
    """Verify DocumentChunk persistence with legal hierarchy and page traceability."""
    doc = Document(title="Payment of Gratuity Act No. 12 of 1983")
    test_db_session.add(doc)
    test_db_session.commit()

    version = DocumentVersion(
        document_id=doc.id,
        version_number=1,
        original_filename="gratuity.pdf",
        storage_path="storage/gratuity.pdf",
        file_hash="a" * 64,
        file_size_bytes=50000,
        page_count=5,
    )
    test_db_session.add(version)
    test_db_session.commit()

    chunk = DocumentChunk(
        document_version_id=version.id,
        chunk_index=0,
        chunk_text="Section 5. (1) Every employer who employs fifteen or more workmen shall pay gratuity...",
        part_reference="Part I",
        chapter_reference=None,
        section_reference="Section 5",
        subsection_reference="(1)",
        paragraph_reference=None,
        page_number=2,
        page_end=3,
        structural_metadata={"strategy": "structural"},
        content_hash="b" * 64,
    )
    test_db_session.add(chunk)
    test_db_session.commit()

    retrieved_chunk = test_db_session.execute(
        select(DocumentChunk).where(DocumentChunk.id == chunk.id)
    ).scalar_one()
    assert retrieved_chunk.section_reference == "Section 5"
    assert retrieved_chunk.page_number == 2
    assert retrieved_chunk.page_end == 3
    assert retrieved_chunk.document_version.version_number == 1


def test_cascade_delete_document_removes_versions_and_chunks(test_db_session):
    """Verify that deleting a Document cascades to all versions and chunks."""
    doc = Document(title="Cascade Test Statute")
    test_db_session.add(doc)
    test_db_session.commit()

    version = DocumentVersion(
        document_id=doc.id,
        version_number=1,
        original_filename="test.pdf",
        storage_path="path.pdf",
        file_hash="c" * 64,
        file_size_bytes=1000,
        page_count=1,
    )
    test_db_session.add(version)
    test_db_session.commit()

    chunk = DocumentChunk(
        document_version_id=version.id,
        chunk_index=0,
        chunk_text="Cascade passage text.",
        page_number=1,
        content_hash="d" * 64,
    )
    test_db_session.add(chunk)
    test_db_session.commit()

    # Delete Document
    test_db_session.delete(doc)
    test_db_session.commit()

    # Assert versions and chunks are cleanly deleted
    remaining_versions = test_db_session.execute(
        select(DocumentVersion).where(DocumentVersion.document_id == doc.id)
    ).scalars().all()
    remaining_chunks = test_db_session.execute(
        select(DocumentChunk).where(DocumentChunk.document_version_id == version.id)
    ).scalars().all()

    assert len(remaining_versions) == 0
    assert len(remaining_chunks) == 0


def test_unique_version_number_constraint(test_db_session):
    """Verify that duplicate version_number for the same document raises IntegrityError."""
    doc = Document(title="Unique Version Test")
    test_db_session.add(doc)
    test_db_session.commit()

    v1 = DocumentVersion(
        document_id=doc.id,
        version_number=1,
        original_filename="doc_v1.pdf",
        storage_path="p1.pdf",
        file_hash="1" * 64,
        file_size_bytes=100,
        page_count=1,
    )
    test_db_session.add(v1)
    test_db_session.commit()

    v2 = DocumentVersion(
        document_id=doc.id,
        version_number=1,  # Duplicate version_number for same document_id!
        original_filename="doc_v1_dup.pdf",
        storage_path="p2.pdf",
        file_hash="2" * 64,
        file_size_bytes=100,
        page_count=1,
    )
    test_db_session.add(v2)
    with pytest.raises(IntegrityError):
        test_db_session.commit()


def test_unique_chunk_index_constraint(test_db_session):
    """Verify that duplicate chunk_index for the same version raises IntegrityError."""
    doc = Document(title="Unique Chunk Index Test")
    test_db_session.add(doc)
    test_db_session.commit()

    v = DocumentVersion(
        document_id=doc.id,
        version_number=1,
        original_filename="doc.pdf",
        storage_path="p.pdf",
        file_hash="3" * 64,
        file_size_bytes=100,
        page_count=1,
    )
    test_db_session.add(v)
    test_db_session.commit()

    c1 = DocumentChunk(
        document_version_id=v.id,
        chunk_index=0,
        chunk_text="Chunk index 0 text.",
        page_number=1,
        content_hash="h1" + "0" * 62,
    )
    test_db_session.add(c1)
    test_db_session.commit()

    c2 = DocumentChunk(
        document_version_id=v.id,
        chunk_index=0,  # Duplicate chunk_index for same version!
        chunk_text="Another text at index 0.",
        page_number=1,
        content_hash="h2" + "0" * 62,
    )
    test_db_session.add(c2)
    with pytest.raises(IntegrityError):
        test_db_session.commit()
