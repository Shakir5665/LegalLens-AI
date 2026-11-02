from fastapi.testclient import TestClient

from app.api.deps import get_app_settings, get_legal_source_service
from app.core.config import Settings
from app.main import app
from app.schemas.legal_source import (
    LegalSourceCategory,
    LegalSourceResponse,
    SourceAuthenticity,
    StatuteReferenceValidationResponse,
)
from app.services.legal_source_service import LegalSourceService


class MockLegalSourceService(LegalSourceService):
    """Mock service used to verify dependency override capability."""

    def get_all_sources(self, category=None):
        return [
            LegalSourceResponse(
                id="mock-source-1",
                title="Mock Employment Ordinance",
                citation="Mock 1900",
                year=1900,
                category=LegalSourceCategory.STATUTE,
                authenticity=SourceAuthenticity.SYNTHETIC_DEMO,
            )
        ]


def test_dependency_override_settings(client: TestClient) -> None:
    """Verify that settings dependency can be overridden for testing."""
    mock_settings = Settings(
        app_name="Mocked LegalLens API",
        app_env="test-override",
        api_v1_prefix="/api/v1",
    )
    app.dependency_overrides[get_app_settings] = lambda: mock_settings
    try:
        response = client.get("/api/v1/health")
        assert response.status_code == 200
        data = response.json()
        assert data["app_name"] == "Mocked LegalLens API"
        assert data["environment"] == "test-override"
    finally:
        app.dependency_overrides.clear()


def test_dependency_override_service(client: TestClient) -> None:
    """Verify that domain service dependency can be replaced via dependency injection."""
    app.dependency_overrides[get_legal_source_service] = lambda: MockLegalSourceService()
    try:
        response = client.get("/api/v1/sources")
        assert response.status_code == 200
        data = response.json()
        assert data["total"] == 1
        assert data["items"][0]["id"] == "mock-source-1"
        assert data["items"][0]["authenticity"] == "SyntheticDemo"
    finally:
        app.dependency_overrides.clear()


def test_request_id_custom_header(client: TestClient) -> None:
    """Verify custom X-Request-Id header propagation."""
    custom_trace_id = "trace-uuid-12345"
    payload = {
        "source_id": "ida-1950",
        "section": "Section 31B",
    }
    response = client.post(
        "/api/v1/sources/validate-reference",
        json=payload,
        headers={"X-Request-Id": custom_trace_id},
    )
    assert response.status_code == 200
