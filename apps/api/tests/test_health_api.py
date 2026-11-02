from fastapi.testclient import TestClient


def test_unversioned_health_check(client: TestClient) -> None:
    """Verify that unversioned /health endpoint returns healthy status code and payload."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data == {"status": "healthy"}


def test_versioned_system_status(client: TestClient) -> None:
    """Verify that versioned /api/v1/health returns detailed diagnostic metadata."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "operational"
    assert "app_name" in data
    assert "environment" in data
    assert "version" in data
    assert "api_prefix" in data
    assert "timestamp" in data
