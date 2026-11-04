"""Integration and End-to-End Tests for Legal Document Ingestion and Inspection APIs.

Tasks 3.5, 3.6, 3.7, 3.8, 3.9, 3.10 and Task 16.
Section 18.3 (API integration tests) and Section 18.4 (End-to-End verification).
"""

from collections.abc import Generator
import io
from pathlib import Path
import uuid

from fastapi.testclient import TestClient
import pytest
import pymupdf
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.api.deps import get_db, get_storage_service
from app.core.config import Settings
from app.db.base import Base
from app.main import app
from app.services.storage_service import StorageService


def build_pdf_bytes(pages: list[str], title: str = "Test Legal Statute") -> bytes:
    """Helper generating an in-memory test PDF using PyMuPDF."""
    doc = pymupdf.open()
    for text in pages:
        page = doc.new_page()
        if text:
            page.insert_text((50, 50), text)
    doc.set_metadata({"title": title, "author": "Legal Draftsman", "producer": "PyMuPDF"})
    pdf_bytes = doc.tobytes()
    doc.close()
    return pdf_bytes


def build_scanned_pdf_bytes() -> bytes:
    """Helper generating a scanned image-only PDF with zero text."""
    doc = pymupdf.open()
    page = doc.new_page()
    pix = pymupdf.Pixmap(pymupdf.csRGB, (0, 0, 80, 80), 1)
    pix.clear_with(255)
    page.insert_image(pymupdf.Rect(50, 50, 200, 200), pixmap=pix)
    pdf_bytes = doc.tobytes()
    doc.close()
    return pdf_bytes


@pytest.fixture
def api_test_env(tmp_path):
    """Set up an isolated test database and storage directory for API integration tests."""
    db_path = tmp_path / "api_test.db"
    storage_path = tmp_path / "test_storage"
    storage_path.mkdir(parents=True, exist_ok=True)

    engine = create_engine(f"sqlite:///{db_path}", connect_args={"check_same_thread": False})
    Base.metadata.create_all(bind=engine)
    TestingSessionLocal = sessionmaker(bind=engine, expire_on_commit=False)

    settings = Settings(
        storage_dir=str(storage_path),
        max_upload_size_bytes=5 * 1024 * 1024,
    )
    test_storage = StorageService(settings=settings)

    def override_get_db() -> Generator[Session, None, None]:
        session = TestingSessionLocal()
        try:
            yield session
        finally:
            session.close()

    def override_get_storage() -> StorageService:
        return test_storage

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_storage_service] = override_get_storage

    with TestClient(app) as client:
        yield client, TestingSessionLocal

    app.dependency_overrides.clear()
    Base.metadata.drop_all(bind=engine)
    engine.dispose()


def test_upload_valid_document_success(api_test_env):
    """Verify successful upload, extraction, chunking, and persistence of a legal PDF."""
    client, _ = api_test_env

    pdf_bytes = build_pdf_bytes(
        [
            "PART IVA - LABOUR TRIBUNALS\nSection 31B. Application to Labour Tribunal.\n(1) A workman may apply for relief.",
        ],
        title="Industrial Disputes Act",
    )

    response = client.post(
        "/api/v1/documents",
        data={
            "title": "Industrial Disputes Act No. 43 of 1950",
            "document_type": "statute",
            "jurisdiction": "Sri Lanka",
            "legal_domain": "Employment Law",
            "source_authenticity": "Unverified",
            "description": "Principal industrial disputes statute.",
        },
        files={"file": ("ida_1950.pdf", io.BytesIO(pdf_bytes), "application/pdf")},
    )

    assert response.status_code == 201
    payload = response.json()
    assert payload["title"] == "Industrial Disputes Act No. 43 of 1950"
    assert payload["document_type"] == "statute"
    assert payload["version_number"] == 1
    assert payload["extraction_status"] in ["processed", "completed"]
    assert payload["page_count"] == 1
    assert payload["chunk_count"] >= 1
    assert len(payload["file_hash"]) == 64
    assert uuid.UUID(payload["document_id"])
    assert uuid.UUID(payload["version_id"])


def test_upload_cannot_self_certify_verified_official(api_test_env):
    """Review Point 1: Verify that an ordinary upload cannot self-certify as VerifiedOfficial."""
    client, _ = api_test_env

    pdf_bytes = build_pdf_bytes(["Section 1. Short title."])

    response = client.post(
        "/api/v1/documents",
        data={
            "title": "Self Certified Act",
            "source_authenticity": "VerifiedOfficial",
        },
        files={"file": ("doc.pdf", io.BytesIO(pdf_bytes), "application/pdf")},
    )

    assert response.status_code == 422
    payload = response.json()
    assert payload["error_code"] == "VALIDATION_ERROR"
    assert "cannot be self-certified" in payload["message"].lower()


def test_upload_scanned_pdf_returns_422(api_test_env):
    """Verify that uploading a scanned-only PDF returns HTTP 422 with clear OCR explanation."""
    client, _ = api_test_env

    scanned_bytes = build_scanned_pdf_bytes()

    response = client.post(
        "/api/v1/documents",
        data={
            "title": "Scanned Employment Gazette",
            "document_type": "gazette",
        },
        files={"file": ("scanned_gazette.pdf", io.BytesIO(scanned_bytes), "application/pdf")},
    )

    assert response.status_code == 422
    payload = response.json()
    assert payload["error_code"] == "SCANNED_PDF_UNSUPPORTED"
    assert "ocr is not supported" in payload["message"].lower() or "scanned-only" in payload["message"].lower()


def test_upload_duplicate_same_document_rejected_409(api_test_env):
    """Verify Task 3.D duplicate detection: uploading identical PDF to same document is rejected with HTTP 409."""
    client, _ = api_test_env

    pdf_bytes = build_pdf_bytes(["Section 1. Short title."])

    # First upload
    resp1 = client.post(
        "/api/v1/documents",
        data={"title": "Duplicate Test Statute"},
        files={"file": ("statute.pdf", io.BytesIO(pdf_bytes), "application/pdf")},
    )
    assert resp1.status_code == 201
    doc_id = resp1.json()["document_id"]

    # Second upload with same document_id and identical file bytes -> HTTP 409
    resp2 = client.post(
        "/api/v1/documents",
        data={"title": "Duplicate Test Statute", "document_id": doc_id},
        files={"file": ("statute.pdf", io.BytesIO(pdf_bytes), "application/pdf")},
    )
    assert resp2.status_code == 409
    payload2 = resp2.json()
    assert payload2["error_code"] == "DUPLICATE_DOCUMENT_VERSION"
    assert "already exists" in payload2["message"].lower()


def test_upload_subsequent_new_version(api_test_env):
    """Verify uploading a genuinely different file to an existing document increments version to 2."""
    client, _ = api_test_env

    pdf_v1 = build_pdf_bytes(["Section 1. Version one original text."])
    pdf_v2 = build_pdf_bytes(["Section 1. Version two amended text."])

    # Upload v1
    resp1 = client.post(
        "/api/v1/documents",
        data={"title": "TEWA Act"},
        files={"file": ("tewa_v1.pdf", io.BytesIO(pdf_v1), "application/pdf")},
    )
    assert resp1.status_code == 201
    doc_id = resp1.json()["document_id"]
    assert resp1.json()["version_number"] == 1

    # Upload v2 to same document_id
    resp2 = client.post(
        "/api/v1/documents",
        data={"title": "TEWA Act", "document_id": doc_id},
        files={"file": ("tewa_v2.pdf", io.BytesIO(pdf_v2), "application/pdf")},
    )
    assert resp2.status_code == 201
    payload2 = resp2.json()
    assert payload2["document_id"] == doc_id
    assert payload2["version_number"] == 2  # Incremented to 2!
    assert payload2["version_id"] != resp1.json()["version_id"]


def test_upload_unknown_document_id_returns_404(api_test_env):
    """Verify that uploading with a non-existent document_id returns HTTP 404."""
    client, _ = api_test_env

    pdf_bytes = build_pdf_bytes(["Section 1. Test text."])
    non_existent_id = str(uuid.uuid4())

    response = client.post(
        "/api/v1/documents",
        data={"title": "Non-existent", "document_id": non_existent_id},
        files={"file": ("doc.pdf", io.BytesIO(pdf_bytes), "application/pdf")},
    )
    assert response.status_code == 404
    assert response.json()["error_code"] == "RESOURCE_NOT_FOUND"


def test_upload_corrupt_file_returns_422(api_test_env):
    """Verify that uploading a corrupted or non-PDF file returns HTTP 422."""
    client, _ = api_test_env

    response = client.post(
        "/api/v1/documents",
        data={"title": "Corrupt Upload"},
        files={"file": ("fake.pdf", io.BytesIO(b"Not a PDF"), "application/pdf")},
    )
    assert response.status_code == 422
    assert response.json()["error_code"] == "FILE_VALIDATION_ERROR"


def test_document_inspection_endpoints(api_test_env):
    """Verify GET /documents/{id} and GET /documents/{id}/versions/{v}/chunks."""
    client, _ = api_test_env

    pdf_bytes = build_pdf_bytes(
        [
            "PART I - PRELIMINARY\nSection 1. Short title.\nThis Act may be cited as the Test Act.",
            "Section 2. Interpretation.\nIn this Act, unless the context otherwise requires...",
        ],
        title="Inspection Test Act",
    )

    upload_resp = client.post(
        "/api/v1/documents",
        data={"title": "Inspection Test Act", "document_type": "statute"},
        files={"file": ("inspection.pdf", io.BytesIO(pdf_bytes), "application/pdf")},
    )
    assert upload_resp.status_code == 201
    doc_id = upload_resp.json()["document_id"]

    # Endpoint 1: GET /api/v1/documents/{document_id}
    detail_resp = client.get(f"/api/v1/documents/{doc_id}")
    assert detail_resp.status_code == 200
    detail = detail_resp.json()
    assert detail["id"] == doc_id
    assert detail["title"] == "Inspection Test Act"
    assert len(detail["versions"]) == 1
    assert detail["versions"][0]["version_number"] == 1
    assert detail["versions"][0]["page_count"] == 2

    # Endpoint 2: GET /api/v1/documents/{document_id}/versions/1/chunks
    chunks_resp = client.get(f"/api/v1/documents/{doc_id}/versions/1/chunks")
    assert chunks_resp.status_code == 200
    chunks_data = chunks_resp.json()
    assert chunks_data["document_id"] == doc_id
    assert chunks_data["version_number"] == 1
    assert chunks_data["total_chunks"] >= 2
    assert len(chunks_data["chunks"]) >= 2
    assert chunks_data["chunks"][0]["section_reference"] in ["Section 1", "Section 2"]
    assert chunks_data["chunks"][0]["page_number"] in [1, 2]

    # Test 404 for unknown document inspection
    random_id = str(uuid.uuid4())
    assert client.get(f"/api/v1/documents/{random_id}").status_code == 404
    assert client.get(f"/api/v1/documents/{random_id}/versions/1/chunks").status_code == 404
    assert client.get(f"/api/v1/documents/{doc_id}/versions/99/chunks").status_code == 404


def test_catalog_list_documents(api_test_env):
    """Verify GET /api/v1/documents listing."""
    client, _ = api_test_env

    # Upload two separate documents
    pdf1 = build_pdf_bytes(["Section 1. First doc."])
    pdf2 = build_pdf_bytes(["Section 1. Second doc."])

    client.post(
        "/api/v1/documents",
        data={"title": "Catalog Statute A"},
        files={"file": ("a.pdf", io.BytesIO(pdf1), "application/pdf")},
    )
    client.post(
        "/api/v1/documents",
        data={"title": "Catalog Statute B"},
        files={"file": ("b.pdf", io.BytesIO(pdf2), "application/pdf")},
    )

    list_resp = client.get("/api/v1/documents")
    assert list_resp.status_code == 200
    catalog = list_resp.json()
    assert catalog["total"] >= 2
    titles = [item["title"] for item in catalog["items"]]
    assert "Catalog Statute A" in titles
    assert "Catalog Statute B" in titles


def test_end_to_end_multi_page_legal_ingestion_verification(api_test_env):
    """Section 18.4 End-to-End Verification.

    Create a controlled legal-style multi-page PDF fixture containing:
    - Multiple pages (3 pages)
    - Part heading ('PART IVA - LABOUR TRIBUNALS')
    - Chapter heading ('CHAPTER II - TERMINATION OF WORKMEN')
    - Multiple sections ('Section 31B', 'Section 31C')
    - Subsections ('(1)', '(2)') and paragraphs ('(a)', '(b)')
    - A section spanning two pages (starts on page 1, continues to page 2).
    Verify that:
    1. Logical document is stored.
    2. Version is stored.
    3. Technical and legal metadata are stored correctly.
    4. Text is extracted from each page.
    5. Chunks are generated.
    6. Legal references are preserved where identifiable.
    7. Page references are correct.
    8. Chunk relationships point to correct version.
    9. Inspection endpoints return expected information.
    """
    client, _ = api_test_env

    page_1 = (
        "PART IVA - LABOUR TRIBUNALS\n"
        "CHAPTER II - TERMINATION OF WORKMEN\n"
        "Section 31B. Applications for relief or redress to Labour Tribunal.\n"
        "(1) A workman or a trade union on behalf of a workman may make an application to a Labour Tribunal.\n"
        "(2) Every application under subsection (1) shall be in writing and shall set out:\n"
        "(a) the name and address of the workman and employer;\n"
        "(b) the grounds on which relief or redress is sought;\n"
        "and shall be submitted within six months of termination of service."
    )
    page_2 = (
        "Section 31B. Continued.\n"
        "(3) The Tribunal shall conduct inquiries into the application expeditiously.\n"
        "Section 31C. Duties and powers of Labour Tribunal.\n"
        "(1) Where an application is made under section 31B, it shall be the duty of the Tribunal"
    )
    page_3 = (
        "to make all such inquiries as it may consider necessary and make just and equitable order.\n"
        "(2) An order of the Labour Tribunal shall be binding on all parties."
    )

    e2e_pdf = build_pdf_bytes([page_1, page_2, page_3], title="Industrial Disputes Act Amendment")

    # Upload document
    resp = client.post(
        "/api/v1/documents",
        data={
            "title": "Industrial Disputes Act No. 43 of 1950 (Consolidated)",
            "document_type": "statute",
            "jurisdiction": "Sri Lanka",
            "legal_domain": "Employment Law",
            "source_authenticity": "SyntheticDemo",
            "description": "Statutory provisions governing Labour Tribunal applications.",
        },
        files={"file": ("ida_consolidated.pdf", io.BytesIO(e2e_pdf), "application/pdf")},
    )

    assert resp.status_code == 201
    upload_data = resp.json()

    doc_id = upload_data["document_id"]
    version_id = upload_data["version_id"]
    assert upload_data["version_number"] == 1
    assert upload_data["page_count"] == 3
    assert upload_data["extraction_status"] in ["processed", "completed"]
    assert upload_data["chunk_count"] >= 2

    # Verification Step 1 & 2: Check logical document and version via GET /documents/{id}
    doc_resp = client.get(f"/api/v1/documents/{doc_id}")
    assert doc_resp.status_code == 200
    doc_detail = doc_resp.json()
    assert doc_detail["id"] == doc_id
    assert doc_detail["title"] == "Industrial Disputes Act No. 43 of 1950 (Consolidated)"
    assert doc_detail["jurisdiction"] == "Sri Lanka"
    assert doc_detail["legal_domain"] == "Employment Law"
    assert doc_detail["source_authenticity"] == "SyntheticDemo"
    assert len(doc_detail["versions"]) == 1
    v_summary = doc_detail["versions"][0]
    assert v_summary["id"] == version_id
    assert v_summary["version_number"] == 1
    assert v_summary["original_filename"] == "ida_consolidated.pdf"
    assert v_summary["page_count"] == 3
    assert v_summary["extraction_status"] in ["processed", "completed"]

    # Verification Step 3: Check chunks via GET /documents/{id}/versions/1/chunks
    chunks_resp = client.get(f"/api/v1/documents/{doc_id}/versions/1/chunks")
    assert chunks_resp.status_code == 200
    chunks_payload = chunks_resp.json()
    assert chunks_payload["document_id"] == doc_id
    assert chunks_payload["version_number"] == 1
    chunks = chunks_payload["chunks"]
    assert len(chunks) == 2

    # Check structural preservation
    sections_found = [c["section_reference"] for c in chunks if c["section_reference"]]
    assert "Section 31B" in sections_found
    assert "Section 31C" in sections_found

    # Check multi-page span traceability (Review Point 2)
    sec_31b_chunk = next(c for c in chunks if c["section_reference"] == "Section 31B")
    assert sec_31b_chunk["part_reference"] == "Part IVA"
    assert sec_31b_chunk["page_number"] == 1
    assert sec_31b_chunk["page_end"] == 2  # Proves multi-page span: Page 1 -> 2
    assert "Labour Tribunal" in sec_31b_chunk["chunk_text"]

    sec_31c_chunk = next(c for c in chunks if c["section_reference"] == "Section 31C")
    assert sec_31c_chunk["page_number"] == 2
    assert sec_31c_chunk["page_end"] == 3  # Proves multi-page span: Page 2 -> 3
    assert len(sec_31c_chunk["content_hash"]) == 64


def test_presigned_download_url_and_local_stream(api_test_env):
    """Task 3.B: Verify generating presigned download URL and streaming the PDF object."""
    client, _ = api_test_env

    pdf_bytes = build_pdf_bytes(["Section 1. Presigned download test."])
    resp = client.post(
        "/api/v1/documents",
        data={"title": "Download Test Document"},
        files={"file": ("download_test.pdf", io.BytesIO(pdf_bytes), "application/pdf")},
    )
    assert resp.status_code == 201
    doc_id = resp.json()["document_id"]

    # 1. Generate presigned download URL
    dl_resp = client.get(f"/api/v1/documents/{doc_id}/versions/1/download?expires_in=600")
    assert dl_resp.status_code == 200
    dl_data = dl_resp.json()
    assert "download_url" in dl_data
    assert dl_data["expires_in"] == 600
    assert dl_data["filename"] == "download_test.pdf"

    # 2. Fetch the file via the returned signed URL
    download_url = dl_data["download_url"]
    file_resp = client.get(download_url)
    assert file_resp.status_code == 200
    assert file_resp.headers["content-type"] == "application/pdf"
    assert file_resp.content == pdf_bytes

    # 3. Forged signature must return 403 Forbidden
    tampered_url = download_url.replace("signature=", "signature=tampered_")
    forbidden_resp = client.get(tampered_url)
    assert forbidden_resp.status_code == 403


def test_soft_delete_and_restore_document_version(api_test_env):
    """Task 3.F: Verify soft-deletion purges chunks from DB while retaining storage object, and restore recovers chunks."""
    client, _ = api_test_env

    pdf_bytes = build_pdf_bytes(["Section 1. Soft deletion lifecycle test."])
    resp = client.post(
        "/api/v1/documents",
        data={"title": "Soft Delete Statute"},
        files={"file": ("soft_del.pdf", io.BytesIO(pdf_bytes), "application/pdf")},
    )
    assert resp.status_code == 201
    doc_id = resp.json()["document_id"]

    # Chunks are initially present
    chunks_before = client.get(f"/api/v1/documents/{doc_id}/versions/1/chunks")
    assert chunks_before.status_code == 200
    assert chunks_before.json()["total_chunks"] >= 1

    # 1. Soft-delete version 1
    del_resp = client.delete(f"/api/v1/documents/{doc_id}/versions/1")
    assert del_resp.status_code == 200
    del_payload = del_resp.json()
    assert del_payload["is_deleted"] is True
    assert del_payload["chunks_removed"] >= 1

    # 2. Assert chunks are no longer retrievable (HTTP 404)
    chunks_after = client.get(f"/api/v1/documents/{doc_id}/versions/1/chunks")
    assert chunks_after.status_code == 404

    # 3. Assert document detail hides soft-deleted version by default
    doc_detail = client.get(f"/api/v1/documents/{doc_id}").json()
    assert len(doc_detail["versions"]) == 0

    # But shows it when include_deleted=True
    doc_detail_all = client.get(f"/api/v1/documents/{doc_id}?include_deleted=true").json()
    assert len(doc_detail_all["versions"]) == 1
    assert doc_detail_all["versions"][0]["is_deleted"] is True

    # 4. Restore the soft-deleted version
    restore_resp = client.post(f"/api/v1/documents/{doc_id}/versions/1/restore")
    assert restore_resp.status_code == 200
    restore_payload = restore_resp.json()
    assert restore_payload["is_deleted"] is False
    assert restore_payload["chunk_count"] >= 1

    # 5. Chunks are active again
    chunks_restored = client.get(f"/api/v1/documents/{doc_id}/versions/1/chunks")
    assert chunks_restored.status_code == 200
    assert chunks_restored.json()["total_chunks"] >= 1


def test_retry_failed_document_version(api_test_env):
    """Task 3.E: Verify manual retry endpoint re-processes a failed document version."""
    client, session_factory = api_test_env
    from app.db.models.document import DocumentVersion, ExtractionStatus

    pdf_bytes = build_pdf_bytes(["Section 1. Retry test."])
    resp = client.post(
        "/api/v1/documents",
        data={"title": "Retry Test Document"},
        files={"file": ("retry.pdf", io.BytesIO(pdf_bytes), "application/pdf")},
    )
    assert resp.status_code == 201
    doc_id = resp.json()["document_id"]

    # Simulate an extraction failure by forcing the version status to FAILED in the DB
    with session_factory() as session:
        version = session.query(DocumentVersion).filter_by(document_id=uuid.UUID(doc_id), version_number=1).first()
        version.extraction_status = ExtractionStatus.FAILED.value
        session.commit()

    # Trigger retry endpoint
    retry_resp = client.post(f"/api/v1/documents/{doc_id}/versions/1/retry")
    assert retry_resp.status_code == 200
    retry_payload = retry_resp.json()
    assert retry_payload["extraction_status"] in ["processed", "completed"]
    assert retry_payload["chunk_count"] >= 1
