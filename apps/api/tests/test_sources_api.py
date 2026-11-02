from fastapi.testclient import TestClient


def test_list_sources(client: TestClient) -> None:
    """Verify listing Sri Lankan legal sources."""
    response = client.get("/api/v1/sources")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] >= 3
    assert len(data["items"]) == data["total"]
    ids = [item["id"] for item in data["items"]]
    assert "ida-1950" in ids
    assert "tewa-1971" in ids
    assert "pga-1983" in ids


def test_list_sources_filter_by_category(client: TestClient) -> None:
    """Verify filtering legal sources by valid category query parameter."""
    response = client.get("/api/v1/sources?category=statute")
    assert response.status_code == 200
    data = response.json()
    for item in data["items"]:
        assert item["category"] == "statute"


def test_get_source_by_id_success(client: TestClient) -> None:
    """Verify retrieving a known legal source by identifier."""
    response = client.get("/api/v1/sources/ida-1950")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == "ida-1950"
    assert "Industrial Disputes Act" in data["title"]
    assert data["authenticity"] == "VerifiedOfficial"


def test_get_source_by_id_not_found(client: TestClient) -> None:
    """Verify 404 response for non-existent source identifier."""
    response = client.get("/api/v1/sources/non-existent-statute")
    assert response.status_code == 404
    data = response.json()
    assert data["error_code"] == "RESOURCE_NOT_FOUND"
    assert "identifier" in data["details"]


def test_validate_statutory_reference_success(client: TestClient) -> None:
    """Verify statutory reference validation with valid payload."""
    payload = {
        "source_id": "ida-1950",
        "section": "Section 31B",
        "context_keyword": "termination of employment",
    }
    response = client.post("/api/v1/sources/validate-reference", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["source_id"] == "ida-1950"
    assert data["section"] == "Section 31B"
    assert data["is_valid"] is True


def test_validate_statutory_reference_source_not_found(client: TestClient) -> None:
    """Verify 404 when referencing a well-formed but non-existent source id."""
    payload = {
        "source_id": "unknown-act-999",
        "section": "Section 1",
    }
    response = client.post("/api/v1/sources/validate-reference", json=payload)
    assert response.status_code == 404
    data = response.json()
    assert data["error_code"] == "RESOURCE_NOT_FOUND"


def test_validate_statutory_reference_invalid_payload(client: TestClient) -> None:
    """Verify 422 error response when request payload violates validation rules."""
    payload = {
        "source_id": "INVALID SLUG WITH SPACES",
        "section": "",
    }
    response = client.post("/api/v1/sources/validate-reference", json=payload)
    assert response.status_code == 422
    data = response.json()
    assert data["error_code"] == "VALIDATION_ERROR"
    assert isinstance(data["details"], list)
