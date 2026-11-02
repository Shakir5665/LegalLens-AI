from enum import Enum
from pydantic import BaseModel, ConfigDict, Field


class SourceAuthenticity(str, Enum):
    """Source authenticity classification defined in Phase 0 specifications."""

    VERIFIED_OFFICIAL = "VerifiedOfficial"
    VERIFIED_SECONDARY = "VerifiedSecondary"
    SYNTHETIC_DEMO = "SyntheticDemo"
    UNVERIFIED = "Unverified"


class LegalSourceCategory(str, Enum):
    """Category of Sri Lankan legal authority."""

    STATUTE = "statute"
    JUDICIAL_DECISION = "judicial_decision"


class LegalSourceResponse(BaseModel):
    """Schema representing an authentic Sri Lankan legal source."""

    model_config = ConfigDict(frozen=True)

    id: str = Field(..., description="Unique slug identifier (e.g. 'ida-1950')")
    title: str = Field(..., min_length=3, max_length=200, description="Official title of the statute or case")
    citation: str = Field(..., min_length=3, max_length=150, description="Formal statutory or law report citation")
    year: int = Field(..., ge=1800, le=2100, description="Year of enactment or decision")
    category: LegalSourceCategory = Field(..., description="Type of legal source")
    authenticity: SourceAuthenticity = Field(..., description="Authenticity verification level")
    description: str | None = Field(default=None, max_length=500, description="Brief summary of domain coverage")


class LegalSourceListResponse(BaseModel):
    """Schema for paginated or listed legal sources."""

    total: int = Field(..., ge=0, description="Total count of matching sources")
    items: list[LegalSourceResponse] = Field(..., description="List of legal sources")


class StatuteReferenceQuery(BaseModel):
    """Request model validating reference checks for a Sri Lankan statute section."""

    source_id: str = Field(
        ...,
        min_length=3,
        max_length=50,
        pattern=r"^[a-z0-9-]+$",
        description="Hyphenated alphanumeric source identifier",
        examples=["ida-1950"],
    )
    section: str = Field(
        ...,
        min_length=1,
        max_length=20,
        description="Statutory section identifier, e.g. 'Section 31B' or 'Part IVA'",
        examples=["Section 31B"],
    )
    context_keyword: str | None = Field(
        default=None,
        min_length=2,
        max_length=100,
        description="Optional search context keyword",
        examples=["termination"],
    )


class StatuteReferenceValidationResponse(BaseModel):
    """Response model for a validated statute reference."""

    source_id: str = Field(..., description="Queried source identifier")
    source_title: str = Field(..., description="Queried legal source title")
    section: str = Field(..., description="Queried section")
    is_valid: bool = Field(..., description="Whether the section format and source are valid")
    status_note: str = Field(..., description="Validation outcome explanation")
