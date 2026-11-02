import pytest
from pydantic import ValidationError

from app.schemas.legal_source import (
    LegalSourceCategory,
    LegalSourceResponse,
    SourceAuthenticity,
    StatuteReferenceQuery,
)


def test_statute_reference_query_valid() -> None:
    """Verify valid statutory reference query parsing."""
    query = StatuteReferenceQuery(
        source_id="ida-1950",
        section="Section 31B",
        context_keyword="termination",
    )
    assert query.source_id == "ida-1950"
    assert query.section == "Section 31B"
    assert query.context_keyword == "termination"


def test_statute_reference_query_invalid_slug_pattern() -> None:
    """Verify that uppercase or spaces in slug identifier fail validation."""
    with pytest.raises(ValidationError) as exc_info:
        StatuteReferenceQuery(
            source_id="IDA 1950",
            section="Section 31B",
        )
    errors = exc_info.value.errors()
    assert any("pattern" in e["type"] for e in errors)


def test_statute_reference_query_empty_section() -> None:
    """Verify that an empty section string fails min_length constraint."""
    with pytest.raises(ValidationError) as exc_info:
        StatuteReferenceQuery(
            source_id="ida-1950",
            section="",
        )
    errors = exc_info.value.errors()
    assert any("too_short" in e["type"] for e in errors)


def test_legal_source_response_year_constraints() -> None:
    """Verify year boundaries on LegalSourceResponse."""
    with pytest.raises(ValidationError) as exc_info:
        LegalSourceResponse(
            id="ancient-statute",
            title="Ancient Law",
            citation="Vol 1",
            year=1799,  # Below ge=1800
            category=LegalSourceCategory.STATUTE,
            authenticity=SourceAuthenticity.VERIFIED_OFFICIAL,
        )
    errors = exc_info.value.errors()
    assert any("greater_than_equal" in e["type"] for e in errors)


def test_legal_source_response_immutability() -> None:
    """Verify that LegalSourceResponse instances are frozen/immutable."""
    source = LegalSourceResponse(
        id="ida-1950",
        title="Industrial Disputes Act No. 43 of 1950",
        citation="Cap. 130",
        year=1950,
        category=LegalSourceCategory.STATUTE,
        authenticity=SourceAuthenticity.VERIFIED_OFFICIAL,
    )
    with pytest.raises(ValidationError):
        source.year = 1955  # type: ignore[misc]
