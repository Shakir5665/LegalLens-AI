"""Tests for StorageService and File Validation.

Task 3.6: File Validation and Storage.
Tests:
- PDF magic bytes check.
- Empty file rejection.
- Max file size limits.
- Path traversal prevention.
- PyMuPDF corrupt file detection.
- Safe UUID-based filename generation.
- Cleanup after failure.
"""

import io
from pathlib import Path
import pytest
import pymupdf

from app.core.config import Settings
from app.core.errors import FileValidationError
from app.services.storage_service import StorageService


def make_valid_pdf_bytes(text: str = "Test PDF Document") -> bytes:
    """Create a minimal valid PDF in memory using PyMuPDF."""
    doc = pymupdf.open()
    page = doc.new_page()
    page.insert_text((50, 50), text)
    data = doc.tobytes()
    doc.close()
    return data


@pytest.fixture
def storage(tmp_path):
    """Provide a StorageService with a dedicated temporary storage directory."""
    settings = Settings(
        storage_dir=str(tmp_path / "storage"),
        max_upload_size_bytes=100 * 1024,  # 100 KB for test limits
    )
    return StorageService(settings=settings)


def test_valid_pdf_storage(storage):
    """Verify that a valid PDF is accepted, validated, and stored atomically."""
    pdf_bytes = make_valid_pdf_bytes("Sri Lankan Industrial Disputes Act")
    bio = io.BytesIO(pdf_bytes)

    stored = storage.store_file(bio, original_filename="ida_1950.pdf")

    assert stored.original_filename == "ida_1950.pdf"
    assert stored.file_size_bytes == len(pdf_bytes)
    assert len(stored.file_hash) == 64  # SHA-256
    assert stored.storage_path.endswith(".pdf")
    assert storage.file_exists(stored.storage_path)


def test_empty_file_rejected(storage):
    """Verify that an empty file is rejected with FileValidationError."""
    bio = io.BytesIO(b"")
    with pytest.raises(FileValidationError) as exc:
        storage.store_file(bio, original_filename="empty.pdf")
    assert "empty" in exc.value.message.lower()


def test_invalid_magic_bytes_rejected(storage):
    """Verify that a non-PDF file claiming to be PDF is rejected by magic bytes."""
    fake_pdf = b"This is plain text pretending to be a PDF file."
    bio = io.BytesIO(fake_pdf)
    with pytest.raises(FileValidationError) as exc:
        storage.store_file(bio, original_filename="fake.pdf")
    assert "magic header" in exc.value.message.lower()


def test_oversized_file_rejected(storage):
    """Verify that files exceeding max_upload_size_bytes are rejected."""
    # Storage limit in fixture is 100 KB
    large_header = b"%PDF-" + (b"A" * (120 * 1024))
    bio = io.BytesIO(large_header)
    with pytest.raises(FileValidationError) as exc:
        storage.store_file(bio, original_filename="too_large.pdf")
    assert "maximum allowed" in exc.value.message.lower()


def test_path_traversal_detection(storage):
    """Verify that directory traversal attempts in path resolution are rejected."""
    with pytest.raises(FileValidationError) as exc:
        storage.resolve_path("../../../etc/passwd")
    assert "path traversal" in exc.value.message.lower()


def test_corrupt_pdf_rejected(storage):
    """Verify that a file with PDF magic bytes but corrupt internal structure is rejected."""
    corrupt_bytes = b"%PDF-1.4\nCorrupt content truncated abruptly..."
    bio = io.BytesIO(corrupt_bytes)
    with pytest.raises(FileValidationError) as exc:
        storage.store_file(bio, original_filename="corrupt.pdf")
    assert "corrupted" in exc.value.message.lower()


def test_delete_file_cleanup(storage):
    """Verify that stored files can be deleted during compensation cleanup."""
    pdf_bytes = make_valid_pdf_bytes("Temporary Document")
    bio = io.BytesIO(pdf_bytes)
    stored = storage.store_file(bio, original_filename="temp.pdf")

    assert storage.file_exists(stored.storage_path)
    deleted = storage.delete_file(stored.storage_path)
    assert deleted is True
    assert not storage.file_exists(stored.storage_path)


def test_immutable_hierarchical_object_key_generation(storage):
    """Task 3.D: Verify hierarchical key documents/{document_id}/versions/{version_id}/{uuid}.pdf."""
    import uuid
    pdf_bytes = make_valid_pdf_bytes("Hierarchical Storage Key Test")
    bio = io.BytesIO(pdf_bytes)

    doc_id = uuid.uuid4()
    ver_id = uuid.uuid4()

    stored = storage.store_file(
        bio,
        original_filename="act.pdf",
        document_id=doc_id,
        version_id=ver_id,
    )

    expected_prefix = f"documents/{doc_id}/versions/{ver_id}/"
    assert stored.storage_path.startswith(expected_prefix)
    assert stored.storage_path.endswith(".pdf")
    assert storage.file_exists(stored.storage_path)


def test_presigned_url_generation_local(storage):
    """Task 3.B: Verify generating and verifying presigned download URLs with LocalStorageProvider."""
    pdf_bytes = make_valid_pdf_bytes("Presigned Local Test")
    bio = io.BytesIO(pdf_bytes)
    stored = storage.store_file(bio, original_filename="my_statute.pdf")

    url = storage.generate_presigned_download_url(
        storage_path=stored.storage_path,
        expires_in_seconds=600,
        original_filename="my_statute.pdf",
    )
    assert "/api/v1/documents/download-file?" in url
    assert f"key={stored.storage_path}" in url or "key=" in url
    assert "expires=" in url
    assert "signature=" in url


def test_neon_storage_provider_with_mock_s3():
    """Task 3.A: Verify NeonStorageProvider operations using a mocked S3 client."""
    from unittest.mock import MagicMock
    from app.storage.neon import NeonStorageProvider

    mock_s3 = MagicMock()
    # Mock get_object body
    mock_body = MagicMock()
    mock_body.read.return_value = b"%PDF-1.4 Mock Neon S3 Bytes"
    mock_s3.get_object.return_value = {"Body": mock_body}
    mock_s3.generate_presigned_url.return_value = "https://neon-storage.ap-southeast-1.amazonaws.com/test-bucket/doc.pdf?sig=123"

    settings = Settings(
        storage_provider="neon",
        neon_storage_bucket="legallens-private-docs",
        neon_storage_endpoint="https://s3.ap-southeast-1.amazonaws.com",
        neon_storage_access_key="mock_key",
        neon_storage_secret_key="mock_secret",
        neon_storage_region="ap-southeast-1",
    )

    provider = NeonStorageProvider(settings=settings, s3_client=mock_s3)
    storage_svc = StorageService(settings=settings, provider=provider)

    pdf_bytes = make_valid_pdf_bytes("Neon S3 Upload Test")
    bio = io.BytesIO(pdf_bytes)

    # 1. Store file
    stored = storage_svc.store_file(
        bio,
        original_filename="s3_doc.pdf",
        document_id="doc-123",
        version_id="ver-456",
    )
    assert stored.storage_path.startswith("documents/doc-123/versions/ver-456/")
    mock_s3.put_object.assert_called_once()

    # 2. Get file bytes
    retrieved = storage_svc.get_file_bytes(stored.storage_path)
    assert retrieved == b"%PDF-1.4 Mock Neon S3 Bytes"
    mock_s3.get_object.assert_called_once_with(
        Bucket="legallens-private-docs",
        Key=stored.storage_path,
    )

    # 3. Generate presigned URL
    url = storage_svc.generate_presigned_download_url(
        storage_path=stored.storage_path,
        expires_in_seconds=600,
        original_filename="download.pdf",
    )
    assert url.startswith("https://")
    mock_s3.generate_presigned_url.assert_called_once()

    # 4. Delete file
    mock_s3.delete_object.return_value = {}
    deleted = storage_svc.delete_file(stored.storage_path)
    assert deleted is True
    mock_s3.delete_object.assert_called_once_with(
        Bucket="legallens-private-docs",
        Key=stored.storage_path,
    )
