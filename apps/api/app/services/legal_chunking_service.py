"""Structure-aware legal chunking service for Sri Lankan legal documents.

Task 3.10: Structure-aware legal chunking with fallback.
Follows ADR-009 (Deterministic operations) and preserves evidence & page traceability.
"""

from dataclasses import dataclass, field
import hashlib
import re
from typing import Any

from app.core.logging import get_logger
from app.services.pdf_extraction_service import PDFExtractionResult, PageExtraction

logger = get_logger("app.services.chunking")

# Sri Lankan legal structural regular expressions
PART_REGEX = re.compile(r"^\s*PART\s+([0-9IVXLCDM]+[A-Z]?)\b", re.IGNORECASE)
CHAPTER_REGEX = re.compile(r"^\s*CHAPTER\s+([0-9IVXLCDM]+[A-Z]?)\b", re.IGNORECASE)
SECTION_HEADING_REGEX = re.compile(
    r"^\s*(?:(?:Section|SECTION)\s+([0-9]+[A-Z]?)|([0-9]+[A-Z]?)\.)\s*(.*)$"
)
SUBSECTION_REGEX = re.compile(r"^\s*(\([0-9]+\))\s*(.*)$")
PARAGRAPH_REGEX = re.compile(r"^\s*(\([a-z]\)|\([ivxlcdm]+\))\s*(.*)$")


@dataclass
class LegalChunk:
    """A traceable passage of legal text with exact page bounds and hierarchical references."""

    chunk_index: int
    chunk_text: str
    part_reference: str | None = None
    chapter_reference: str | None = None
    section_reference: str | None = None
    subsection_reference: str | None = None
    paragraph_reference: str | None = None
    page_number: int = 1
    page_end: int | None = None
    structural_metadata: dict[str, Any] = field(default_factory=dict)
    content_hash: str = ""


class LegalChunkingService:
    """Produces structure-aware legal chunks preserving Sri Lankan statutory hierarchy and page bounds."""

    def __init__(self, fallback_chunk_size: int = 1000, fallback_chunk_overlap: int = 150) -> None:
        self.fallback_chunk_size = fallback_chunk_size
        self.fallback_chunk_overlap = fallback_chunk_overlap

    @staticmethod
    def compute_content_hash(text: str) -> str:
        """Compute deterministic SHA-256 hash of normalized text."""
        normalized = " ".join(text.strip().split())
        return hashlib.sha256(normalized.encode("utf-8")).hexdigest()

    def chunk_document(self, extraction_result: PDFExtractionResult) -> list[LegalChunk]:
        """Process page-by-page extraction and generate structure-aware legal chunks.

        If recognizable statutory headings (sections) are detected, produces structural chunks.
        Otherwise, falls back to deterministic page-aware sliding window chunking.
        """
        # Filter out completely blank pages while preserving page list
        pages = extraction_result.pages
        if not pages or all(p.is_blank for p in pages):
            return []

        # 1. First pass: detect whether the document exhibits statutory sections
        has_sections = self._detect_statutory_structure(pages)

        if has_sections:
            logger.info("Statutory structure detected; executing structure-aware legal chunking.")
            chunks = self._chunk_statutory_text(pages)
            if chunks:
                return chunks

        # 2. Fallback pass: unstructured or generic legal text
        logger.info("Executing deterministic fallback chunking (window size=%d).", self.fallback_chunk_size)
        return self._chunk_fallback(pages)

    def _detect_statutory_structure(self, pages: list[PageExtraction]) -> bool:
        """Check if pages contain statutory section markers."""
        section_count = 0
        for page in pages:
            for line in page.text.splitlines():
                if SECTION_HEADING_REGEX.match(line):
                    section_count += 1
                    if section_count >= 1:
                        return True
        return False

    def _chunk_statutory_text(self, pages: list[PageExtraction]) -> list[LegalChunk]:
        """Chunk text by Section boundaries while tracking Part, Chapter, and Page bounds."""
        chunks: list[LegalChunk] = []
        current_part: str | None = None
        current_chapter: str | None = None
        current_section: str | None = None
        current_subsection: str | None = None
        current_paragraph: str | None = None

        current_lines: list[str] = []
        start_page: int | None = None
        end_page: int | None = None
        chunk_idx = 0

        def flush_current_chunk() -> None:
            nonlocal chunk_idx, current_lines, start_page, end_page
            if not current_lines:
                return
            passage_text = "\n".join(current_lines).strip()
            if not passage_text:
                current_lines = []
                return

            c_hash = self.compute_content_hash(passage_text)
            p_end = end_page if (end_page and start_page and end_page > start_page) else None
            meta: dict[str, Any] = {
                "strategy": "structural",
                "part": current_part,
                "chapter": current_chapter,
                "section": current_section,
                "subsection": current_subsection,
                "paragraph": current_paragraph,
                "start_page": start_page or 1,
                "end_page": end_page or start_page or 1,
            }

            chunks.append(
                LegalChunk(
                    chunk_index=chunk_idx,
                    chunk_text=passage_text,
                    part_reference=current_part,
                    chapter_reference=current_chapter,
                    section_reference=current_section,
                    subsection_reference=current_subsection,
                    paragraph_reference=current_paragraph,
                    page_number=start_page or 1,
                    page_end=p_end,
                    structural_metadata=meta,
                    content_hash=c_hash,
                )
            )
            chunk_idx += 1
            current_lines = []
            start_page = None
            end_page = None

        for page in pages:
            if page.is_blank:
                continue

            lines = page.text.splitlines()
            for line in lines:
                raw_line = line.strip()
                if not raw_line:
                    continue

                # Check Part marker
                part_match = PART_REGEX.match(raw_line)
                if part_match:
                    current_part = f"Part {part_match.group(1).upper()}"
                    continue

                # Check Chapter marker
                chapter_match = CHAPTER_REGEX.match(raw_line)
                if chapter_match:
                    current_chapter = f"Chapter {chapter_match.group(1).upper()}"
                    continue

                # Check Section marker
                sec_match = SECTION_HEADING_REGEX.match(raw_line)
                if sec_match:
                    sec_num = sec_match.group(1) or sec_match.group(2)
                    candidate_section = f"Section {sec_num}"

                    # If this is an explicit continuation marker of the current section
                    is_continuation = (
                        current_section == candidate_section
                        and any(w in raw_line.lower() for w in ["continued", "contd", "cont."])
                    )
                    if is_continuation:
                        end_page = page.page_number
                        current_lines.append(raw_line)
                        continue

                    # Flush accumulated section
                    flush_current_chunk()
                    current_section = candidate_section
                    current_subsection = None
                    current_paragraph = None
                    start_page = page.page_number
                    end_page = page.page_number
                    current_lines.append(raw_line)
                    continue

                # Check Subsection marker
                sub_match = SUBSECTION_REGEX.match(raw_line)
                if sub_match and current_section:
                    current_subsection = sub_match.group(1)

                # Check Paragraph marker
                para_match = PARAGRAPH_REGEX.match(raw_line)
                if para_match and current_section:
                    current_paragraph = para_match.group(1)

                if start_page is None:
                    start_page = page.page_number
                end_page = page.page_number
                current_lines.append(raw_line)

        # Flush final section
        flush_current_chunk()
        return chunks

    def _chunk_fallback(self, pages: list[PageExtraction]) -> list[LegalChunk]:
        """Deterministic sliding-window fallback chunking preserving page references and words."""
        chunks: list[LegalChunk] = []
        chunk_idx = 0

        for page in pages:
            if page.is_blank:
                continue

            text = page.text.strip()
            if not text:
                continue

            # Split into paragraphs / double newlines
            paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
            if not paragraphs:
                paragraphs = [text]

            current_window: list[str] = []
            current_len = 0

            for para in paragraphs:
                para_len = len(para)
                if current_len + para_len > self.fallback_chunk_size and current_window:
                    # Flush window
                    window_text = "\n\n".join(current_window).strip()
                    if window_text:
                        chunks.append(
                            LegalChunk(
                                chunk_index=chunk_idx,
                                chunk_text=window_text,
                                part_reference=None,
                                chapter_reference=None,
                                section_reference=None,
                                subsection_reference=None,
                                paragraph_reference=None,
                                page_number=page.page_number,
                                page_end=None,
                                structural_metadata={
                                    "strategy": "fallback",
                                    "page": page.page_number,
                                },
                                content_hash=self.compute_content_hash(window_text),
                            )
                        )
                        chunk_idx += 1
                    current_window = [para]
                    current_len = para_len
                else:
                    current_window.append(para)
                    current_len += para_len

            if current_window:
                window_text = "\n\n".join(current_window).strip()
                if window_text:
                    chunks.append(
                        LegalChunk(
                            chunk_index=chunk_idx,
                            chunk_text=window_text,
                            part_reference=None,
                            chapter_reference=None,
                            section_reference=None,
                            subsection_reference=None,
                            paragraph_reference=None,
                            page_number=page.page_number,
                            page_end=None,
                            structural_metadata={
                                "strategy": "fallback",
                                "page": page.page_number,
                            },
                            content_hash=self.compute_content_hash(window_text),
                        )
                    )
                    chunk_idx += 1

        return chunks
