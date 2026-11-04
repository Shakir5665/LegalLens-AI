"""Tests for Structure-Aware Legal Chunking Service.

Task 3.10: Structure-Aware Legal Chunking.
Tests:
- Identification of statutory Part, Chapter, Section, Subsection.
- Multi-page spanning section handling (page_number to page_end).
- Content hash computation (deterministic SHA-256).
- Deterministic chunk indexing.
- Preservation of preamble and non-section text.
- Fallback chunking on unstructured documents.
"""

import pytest

from app.services.legal_chunking_service import LegalChunkingService
from app.services.pdf_extraction_service import PDFExtractionResult, PageExtraction


@pytest.fixture
def chunker():
    return LegalChunkingService(fallback_chunk_size=500, fallback_chunk_overlap=50)


def test_statutory_heading_and_section_chunking(chunker):
    """Verify structure-aware chunking on statutory text with Part and Sections."""
    page_1 = PageExtraction(
        page_number=1,
        text=(
            "PART IVA - LABOUR TRIBUNALS\n"
            "Section 31A. Application of Part.\n"
            "(1) The provisions of this Part shall apply to every workman.\n"
            "Section 31B. Applications to Labour Tribunal.\n"
            "(1) A workman may make an application in writing to a Labour Tribunal for relief."
        ),
        char_count=210,
        is_blank=False,
    )
    result = PDFExtractionResult(
        pages=[page_1],
        page_count=1,
        total_char_count=210,
        is_scanned_only=False,
    )

    chunks = chunker.chunk_document(result)

    assert len(chunks) == 2
    # First chunk: Section 31A
    assert chunks[0].chunk_index == 0
    assert chunks[0].section_reference == "Section 31A"
    assert chunks[0].part_reference == "Part IVA"
    assert chunks[0].page_number == 1
    assert chunks[0].page_end is None
    assert len(chunks[0].content_hash) == 64

    # Second chunk: Section 31B
    assert chunks[1].chunk_index == 1
    assert chunks[1].section_reference == "Section 31B"
    assert chunks[1].part_reference == "Part IVA"
    assert chunks[1].page_number == 1
    assert "(1) A workman may make an application" in chunks[1].chunk_text


def test_section_spanning_multiple_pages(chunker):
    """Verify that a section spanning across page boundaries captures page_number and page_end."""
    page_1 = PageExtraction(
        page_number=1,
        text=(
            "Section 5. Termination by employer.\n"
            "(1) An employer shall not terminate employment without prior written approval.\n"
            "(2) Where application is made under subsection (1), the Commissioner shall"
        ),
        char_count=190,
        is_blank=False,
    )
    page_2 = PageExtraction(
        page_number=2,
        text=(
            "conduct an inquiry and make an order within two months.\n"
            "(3) Any order made by the Commissioner shall be final."
        ),
        char_count=110,
        is_blank=False,
    )
    result = PDFExtractionResult(
        pages=[page_1, page_2],
        page_count=2,
        total_char_count=300,
        is_scanned_only=False,
    )

    chunks = chunker.chunk_document(result)

    assert len(chunks) == 1
    chunk = chunks[0]
    assert chunk.section_reference == "Section 5"
    assert chunk.page_number == 1
    assert chunk.page_end == 2  # Spans across page 1 and page 2
    assert "conduct an inquiry" in chunk.chunk_text
    assert chunk.structural_metadata["start_page"] == 1
    assert chunk.structural_metadata["end_page"] == 2


def test_fallback_chunking_on_unstructured_text(chunker):
    """Verify fallback chunking executes on text lacking statutory section markers."""
    text_p1 = (
        "This is a legal gazette notification issued by the Ministry of Labour.\n\n"
        "All employers in the manufacturing sector must submit quarterly reports.\n\n"
        "Failure to submit reports may result in inspection by authorized officers."
    )
    page_1 = PageExtraction(page_number=1, text=text_p1, char_count=len(text_p1), is_blank=False)
    result = PDFExtractionResult(
        pages=[page_1],
        page_count=1,
        total_char_count=len(text_p1),
        is_scanned_only=False,
    )

    chunks = chunker.chunk_document(result)

    assert len(chunks) >= 1
    assert all(c.section_reference is None for c in chunks)
    assert all(c.page_number == 1 for c in chunks)
    assert all(len(c.content_hash) == 64 for c in chunks)
    assert chunks[0].structural_metadata["strategy"] == "fallback"


def test_deterministic_content_hash(chunker):
    """Verify that identical text yields deterministic SHA-256 hashes regardless of trailing spaces."""
    h1 = chunker.compute_content_hash("Section 31B.   Application to tribunal.")
    h2 = chunker.compute_content_hash("Section 31B. Application to tribunal.  ")
    assert h1 == h2
    assert len(h1) == 64
