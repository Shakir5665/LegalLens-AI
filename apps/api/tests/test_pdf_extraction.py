"""Tests for PDF Text and Technical Metadata Extraction using PyMuPDF.

Tasks 3.7 & 3.8: PDF text extraction and technical metadata extraction.
Tests:
- Single-page extraction.
- Multi-page extraction with 1-based page numbering.
- Page boundary and blank page preservation.
- Technical PDF metadata extraction (without fabrication).
- Scanned-only PDF detection.
"""

import pytest
import pymupdf

from app.core.errors import FileValidationError
from app.services.pdf_extraction_service import PDFExtractionService


def create_in_memory_pdf(pages_text: list[str], metadata: dict | None = None) -> bytes:
    """Helper creating an in-memory PDF with specified text per page."""
    doc = pymupdf.open()
    for text in pages_text:
        page = doc.new_page()
        if text.strip():
            page.insert_text((50, 50), text)
    if metadata:
        doc.set_metadata(metadata)
    data = doc.tobytes()
    doc.close()
    return data


def create_scanned_image_pdf() -> bytes:
    """Helper creating a scanned-only PDF containing an image but zero extractable text."""
    doc = pymupdf.open()
    page = doc.new_page()
    pix = pymupdf.Pixmap(pymupdf.csRGB, (0, 0, 100, 100), 1)
    pix.clear_with(255)
    page.insert_image(pymupdf.Rect(50, 50, 200, 200), pixmap=pix)
    data = doc.tobytes()
    doc.close()
    return data


@pytest.fixture
def extractor():
    return PDFExtractionService()


def test_single_page_pdf_extraction(extractor):
    """Verify text extraction from a single-page PDF."""
    pdf_bytes = create_in_memory_pdf(["Industrial Disputes Act No. 43 of 1950."])
    result = extractor.extract(pdf_bytes)

    assert result.page_count == 1
    assert len(result.pages) == 1
    assert result.pages[0].page_number == 1  # 1-based page numbering
    assert "Industrial Disputes Act" in result.pages[0].text
    assert not result.pages[0].is_blank
    assert not result.is_scanned_only


def test_multi_page_pdf_extraction_and_page_numbering(extractor):
    """Verify multi-page physical boundary preservation and numbering."""
    pages = [
        "Part I - Preliminary\nSection 1. Short title.",
        "Part II - Conciliation\nSection 2. Functions of Commissioner.",
        "Part III - Arbitration\nSection 3. Settlement by arbitration.",
    ]
    pdf_bytes = create_in_memory_pdf(pages)
    result = extractor.extract(pdf_bytes)

    assert result.page_count == 3
    assert len(result.pages) == 3
    for idx, page in enumerate(result.pages):
        assert page.page_number == idx + 1
        assert not page.is_blank
    assert "Section 1" in result.pages[0].text
    assert "Section 2" in result.pages[1].text
    assert "Section 3" in result.pages[2].text


def test_blank_page_preservation(extractor):
    """Verify that blank pages are preserved in sequence with is_blank=True."""
    pages = [
        "First Page Text",
        "",  # Blank page
        "Third Page Text",
    ]
    pdf_bytes = create_in_memory_pdf(pages)
    result = extractor.extract(pdf_bytes)

    assert result.page_count == 3
    assert result.pages[0].page_number == 1
    assert not result.pages[0].is_blank
    assert result.pages[1].page_number == 2
    assert result.pages[1].is_blank
    assert result.pages[1].text == ""
    assert result.pages[2].page_number == 3
    assert not result.pages[2].is_blank


def test_technical_metadata_extraction(extractor):
    """Verify extraction of available PDF technical metadata without fabrication."""
    meta_in = {
        "title": "Industrial Disputes Act",
        "author": "Legal Draftsman",
        "subject": "Sri Lankan Labor Law",
        "producer": "LegalLens PyMuPDF Engine",
    }
    pdf_bytes = create_in_memory_pdf(["Some statute text"], metadata=meta_in)
    result = extractor.extract(pdf_bytes)

    meta = result.technical_metadata
    assert meta["title"] == "Industrial Disputes Act"
    assert meta["author"] == "Legal Draftsman"
    assert meta["subject"] == "Sri Lankan Labor Law"
    assert meta["page_count"] == 1
    assert result.extraction_method == "pymupdf_native_text"


def test_scanned_only_pdf_detection(extractor):
    """Verify that an image-only PDF with zero extractable text is flagged as is_scanned_only=True."""
    pdf_bytes = create_scanned_image_pdf()
    result = extractor.extract(pdf_bytes)

    assert result.page_count == 1
    assert result.total_char_count == 0
    assert result.is_scanned_only is True


def test_corrupt_pdf_raises_file_validation_error(extractor):
    """Verify that corrupt byte input raises FileValidationError."""
    with pytest.raises(FileValidationError):
        extractor.extract(b"Not a real pdf at all.")
