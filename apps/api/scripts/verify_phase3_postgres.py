"""Phase 3 PostgreSQL Live Verification Script.

Executes end-to-end legal PDF ingestion directly against configured PostgreSQL (Neon),
verifying schema integrity, foreign key cascades, and structure-aware chunk persistence.
Follows ADR-003 (PostgreSQL Primary DB) and ADR-014 (Strict credential isolation).
"""

import io
from pathlib import Path
import sys
import uuid

import pymupdf
from sqlalchemy import func, inspect, select

# Ensure apps/api is in python path
BASE_DIR = Path(__file__).resolve().parent.parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from app.core.config import get_settings
from app.db.base import Base
from app.db.models.document import Document, DocumentChunk, DocumentVersion
from app.db.session import check_database_connection, get_engine, get_session_factory
from app.services.document_service import DocumentService
from app.services.storage_service import StorageService


def create_verification_pdf() -> bytes:
    """Generate a multi-page statutory PDF fixture."""
    doc = pymupdf.open()
    p1 = doc.new_page()
    p1.insert_text(
        (50, 50),
        "PART IVA - LABOUR TRIBUNALS\n"
        "Section 31B. Application for relief or redress to Labour Tribunal.\n"
        "(1) A workman or a trade union on behalf of a workman may make an application to a Labour Tribunal.\n"
        "(2) An application under subsection (1) shall be submitted within six months of termination.",
    )
    p2 = doc.new_page()
    p2.insert_text(
        (50, 50),
        "Section 31B. Continued.\n"
        "(3) The Tribunal shall conduct inquiries into the application expeditiously.\n"
        "Section 31C. Duties and powers of Labour Tribunal.\n"
        "(1) Where an application is made under section 31B, the Tribunal shall conduct an inquiry.",
    )
    doc.set_metadata({
        "title": "Industrial Disputes Act Live Verification",
        "author": "LegalLens Verification Suite",
    })
    pdf_bytes = doc.tobytes()
    doc.close()
    return pdf_bytes


def run_verification() -> bool:
    settings = get_settings()
    engine = get_engine(settings)
    masked_url = engine.url.render_as_string(hide_password=True)

    print("=" * 70)
    print("LEGALLENS AI — PHASE 3 POSTGRESQL LIVE VERIFICATION")
    print("=" * 70)
    print(f"Target Database: {masked_url}")
    print(f"Dialect: {engine.dialect.name}")

    if not check_database_connection(engine):
        print("ERROR: Could not establish connection to PostgreSQL.")
        return False

    print("Connectivity check: SUCCESS")

    # 1. Verify schema tables in PostgreSQL
    inspector = inspect(engine)
    existing_tables = set(inspector.get_table_names())
    required_tables = {"documents", "document_versions", "document_chunks", "alembic_version"}
    missing = required_tables - existing_tables
    if missing:
        print(f"ERROR: Missing required tables in PostgreSQL: {missing}")
        return False

    print(f"Database schema tables verified: {sorted(list(existing_tables))}")

    # 2. Ingest document via DocumentService against live PostgreSQL
    session_factory = get_session_factory(engine)
    session = session_factory()
    storage = StorageService(settings=settings)
    doc_service = DocumentService(storage_service=storage)

    pdf_bytes = create_verification_pdf()
    test_title = f"PostgreSQL Verification Act {uuid.uuid4().hex[:8]}"
    created_doc_id = None

    try:
        print("\nIngesting multi-page statutory PDF...")
        result = doc_service.ingest_document(
            session=session,
            file_obj=io.BytesIO(pdf_bytes),
            original_filename="live_verification.pdf",
            title=test_title,
            document_type="statute",
            jurisdiction="Sri Lanka",
            legal_domain="Employment Law",
            source_authenticity="SyntheticDemo",
            description="Live PostgreSQL integration verification artifact.",
        )

        created_doc_id = result.document_id
        print("Ingestion API Response:")
        print(f"  - Document ID:     {result.document_id}")
        print(f"  - Version ID:      {result.version_id}")
        print(f"  - Version Number:  {result.version_number}")
        print(f"  - Page Count:      {result.page_count}")
        print(f"  - Extraction Status: {result.extraction_status}")
        print(f"  - Chunk Count:     {result.chunk_count}")
        print(f"  - File Hash:       {result.file_hash[:16]}...")

        # 3. Direct SQL assertions in PostgreSQL
        doc_row = session.execute(
            select(Document).where(Document.id == created_doc_id)
        ).scalar_one()
        assert doc_row.title == test_title
        assert doc_row.source_authenticity == "SyntheticDemo"
        assert len(doc_row.versions) == 1

        version_row = doc_row.versions[0]
        assert version_row.version_number == 1
        assert version_row.page_count == 2
        assert len(version_row.chunks) == result.chunk_count

        # Check chunk content in PostgreSQL
        chunks = session.execute(
            select(DocumentChunk)
            .where(DocumentChunk.document_version_id == version_row.id)
            .order_by(DocumentChunk.chunk_index)
        ).scalars().all()

        print(f"\nExtracted Chunks in PostgreSQL ({len(chunks)} total):")
        for c in chunks:
            page_span = f"Page {c.page_number} -> {c.page_end}" if c.page_end else f"Page {c.page_number}"
            print(
                f"  [Chunk {c.chunk_index}] Span: {page_span} | "
                f"Part: {c.part_reference} | Sec: {c.section_reference} | "
                f"Hash: {c.content_hash[:12]}..."
            )

        # 4. Test Cascade Deletion in PostgreSQL
        print("\nVerifying Foreign Key Cascade Deletion...")
        stored_path = version_row.storage_path
        session.delete(doc_row)
        session.commit()

        # Clean up storage file
        storage.delete_file(stored_path)

        # Verify all children are gone in PostgreSQL
        v_count = session.execute(
            select(func.count(DocumentVersion.id)).where(DocumentVersion.document_id == created_doc_id)
        ).scalar_one()
        c_count = session.execute(
            select(func.count(DocumentChunk.id)).where(DocumentChunk.document_version_id == version_row.id)
        ).scalar_one()

        assert v_count == 0
        assert c_count == 0
        print(f"Cascade deletion verified: remaining versions={v_count}, remaining chunks={c_count}.")

        print("\n" + "=" * 70)
        print("ALL POSTGRESQL LIVE VERIFICATION CHECKS PASSED SUCCESSFULLY!")
        print("=" * 70)
        return True

    except Exception as exc:
        session.rollback()
        print(f"ERROR during verification: {exc}")
        import traceback
        traceback.print_exc()
        return False
    finally:
        session.close()


if __name__ == "__main__":
    success = run_verification()
    sys.exit(0 if success else 1)
