from app.core.errors import EntityNotFoundException
from app.schemas.legal_source import (
    LegalSourceCategory,
    LegalSourceResponse,
    SourceAuthenticity,
    StatuteReferenceQuery,
    StatuteReferenceValidationResponse,
)


class LegalSourceService:
    """Service providing legal source catalog and statutory reference validation.

    Maintains the authoritative Sri Lankan Employment Law corpus established in Phase 0.
    In-memory implementation for Phase 1 backend engineering fundamentals.
    """

    def __init__(self) -> None:
        self._sources: dict[str, LegalSourceResponse] = {
            "ida-1950": LegalSourceResponse(
                id="ida-1950",
                title="Industrial Disputes Act No. 43 of 1950",
                citation="Cap. 130, Legislative Enactments of Ceylon",
                year=1950,
                category=LegalSourceCategory.STATUTE,
                authenticity=SourceAuthenticity.VERIFIED_OFFICIAL,
                description="Primary Sri Lankan legislation providing for the prevention, investigation and settlement of industrial disputes.",
            ),
            "tewa-1971": LegalSourceResponse(
                id="tewa-1971",
                title="Termination of Employment of Workmen (Special Provisions) Act No. 45 of 1971",
                citation="Act No. 45 of 1971",
                year=1971,
                category=LegalSourceCategory.STATUTE,
                authenticity=SourceAuthenticity.VERIFIED_OFFICIAL,
                description="Governs the termination of workmen in scheduled employments with prior written consent of the Commissioner of Labour.",
            ),
            "pga-1983": LegalSourceResponse(
                id="pga-1983",
                title="Payment of Gratuity Act No. 12 of 1983",
                citation="Act No. 12 of 1983",
                year=1983,
                category=LegalSourceCategory.STATUTE,
                authenticity=SourceAuthenticity.VERIFIED_OFFICIAL,
                description="Statutory provision for the payment of gratuity to employees with 5 or more years of continuous service.",
            ),
        }

    def get_all_sources(
        self,
        category: LegalSourceCategory | None = None,
    ) -> list[LegalSourceResponse]:
        """Return all catalogued legal sources, optionally filtered by category."""
        sources = list(self._sources.values())
        if category:
            sources = [s for s in sources if s.category == category]
        return sources

    def get_source_by_id(self, source_id: str) -> LegalSourceResponse:
        """Retrieve a specific legal source by identifier or raise EntityNotFoundException."""
        source = self._sources.get(source_id.lower().strip())
        if not source:
            raise EntityNotFoundException(resource_type="LegalSource", identifier=source_id)
        return source

    def validate_reference(
        self,
        query: StatuteReferenceQuery,
    ) -> StatuteReferenceValidationResponse:
        """Validate whether a queried section reference is valid for the specified source.

        Note: This is an in-memory demonstration implementation for Phase 1 backend
        fundamentals and does not constitute authoritative legal verification.
        """
        source = self.get_source_by_id(query.source_id)
        cleaned_section = query.section.strip()

        return StatuteReferenceValidationResponse(
            source_id=source.id,
            source_title=source.title,
            section=cleaned_section,
            is_valid=True,
            status_note=f"In-memory demonstration validation: Section '{cleaned_section}' matched against {source.title}. Not authoritative legal verification.",
        )
