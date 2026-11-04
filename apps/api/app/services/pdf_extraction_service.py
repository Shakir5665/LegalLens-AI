"""PDF Text Extraction and Metadata Extraction Service using PyMuPDF.

Tasks 3.7 & 3.8: PDF text extraction and technical metadata extraction.
Follows ADR-010 (Native-Text PDF Extraction Initially).
"""

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import pymupdf

from app.core.errors import FileValidationError
from app.core.logging import get_logger

logger = get_logger("app.services.pdf_extraction")


@dataclass(frozen=True)
class PageExtraction:
    """Text extracted from a single physical page of a PDF document."""

    page_number: int  # 1-based physical page number
    text: str
    char_count: int
    is_blank: bool


@dataclass
class PDFExtractionResult:
    """Complete structured extraction result across all document pages."""

    pages: list[PageExtraction]
    page_count: int
    total_char_count: int
    is_scanned_only: bool
    technical_metadata: dict[str, Any] = field(default_factory=dict)
    extraction_method: str = "pymupdf_native_text"


class PDFExtractionService:
    """Extracts text and technical metadata page-by-page using PyMuPDF."""

    def extract(self, file_path_or_bytes: Path | str | bytes) -> PDFExtractionResult:
        """Extract text page-by-page and harvest embedded technical metadata.

        Args:
            file_path_or_bytes: Filesystem path to PDF or raw PDF bytes.

        Returns:
            PDFExtractionResult with physical 1-based page numbering and metadata.

        Raises:
            FileValidationError: If PDF cannot be opened or parsed.
        """
        try:
            if isinstance(file_path_or_bytes, bytes):
                doc = pymupdf.open(stream=file_path_or_bytes, filetype="pdf")
            else:
                doc = pymupdf.open(str(file_path_or_bytes))
        except Exception as exc:
            logger.error("PyMuPDF failed to open PDF document: %s", exc)
            raise FileValidationError(
                message="PDF could not be opened for extraction.",
                details={"error": str(exc)},
            ) from exc

        with doc:
            page_count = len(doc)
            if page_count == 0:
                raise FileValidationError(message="PDF contains zero pages.")

            # 1. Extract technical metadata (Task 3.8)
            # Never fabricate missing metadata; leave missing fields as None.
            raw_meta = doc.metadata or {}
            technical_metadata: dict[str, Any] = {
                "format": raw_meta.get("format") or None,
                "title": raw_meta.get("title") or None,
                "author": raw_meta.get("author") or None,
                "subject": raw_meta.get("subject") or None,
                "keywords": raw_meta.get("keywords") or None,
                "creator": raw_meta.get("creator") or None,
                "producer": raw_meta.get("producer") or None,
                "creation_date": raw_meta.get("creationDate") or None,
                "mod_date": raw_meta.get("modDate") or None,
                "page_count": page_count,
            }

            # 2. Extract text page-by-page (Task 3.7)
            pages: list[PageExtraction] = []
            total_chars = 0
            has_embedded_images = False

            for idx in range(page_count):
                page = doc[idx]
                page_number = idx + 1  # Mandatory 1-based physical page number

                # Extract plain text preserving reading order
                # sort=True ensures left-to-right, top-to-bottom reading order
                page_text = page.get_text("text", sort=True)
                cleaned_text = page_text.strip()
                char_count = len(cleaned_text)
                total_chars += char_count

                if not has_embedded_images:
                    images = page.get_images()
                    if images:
                        has_embedded_images = True

                pages.append(
                    PageExtraction(
                        page_number=page_number,
                        text=cleaned_text,
                        char_count=char_count,
                        is_blank=(char_count == 0),
                    )
                )

            # 3. Scanned PDF Detection (Task 3.7)
            # If total extractable text across all pages is zero or extremely negligible
            # while the document contains pages/images, classify as scanned_only.
            is_scanned_only = False
            if total_chars == 0:
                is_scanned_only = True
            elif (total_chars / page_count) < 20 and has_embedded_images:
                # Average fewer than 20 characters per page with embedded images
                is_scanned_only = True

            return PDFExtractionResult(
                pages=pages,
                page_count=page_count,
                total_char_count=total_chars,
                is_scanned_only=is_scanned_only,
                technical_metadata=technical_metadata,
                extraction_method="pymupdf_native_text",
            )
