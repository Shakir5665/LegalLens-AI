from fastapi import APIRouter
from fastapi.testclient import TestClient

from app.core.errors import AppException, ValidationException
from app.main import app

# Create a simulated error router to trigger specific error scenarios
error_simulation_router = APIRouter(prefix="/test-errors")


@error_simulation_router.get("/trigger-app-exception")
async def trigger_app_exception():
    raise AppException(
        message="Simulated domain failure",
        status_code=400,
        error_code="SIMULATED_DOMAIN_ERROR",
        details={"hint": "Check business constraints"},
    )


@error_simulation_router.get("/trigger-validation-exception")
async def trigger_validation_exception():
    raise ValidationException(
        message="Domain validation failed",
        details={"field": "invalid_value"},
    )


@error_simulation_router.get("/trigger-unhandled-exception")
async def trigger_unhandled_exception():
    # Simulate a bug such as ZeroDivisionError or unexpected crash
    return 1 / 0


# Register test router on app
app.include_router(error_simulation_router)


def test_custom_app_exception_handling(client: TestClient) -> None:
    """Verify custom AppException returns expected HTTP status and uniform schema."""
    response = client.get("/test-errors/trigger-app-exception")
    assert response.status_code == 400
    data = response.json()
    assert data["error_code"] == "SIMULATED_DOMAIN_ERROR"
    assert data["message"] == "Simulated domain failure"
    assert data["details"] == {"hint": "Check business constraints"}


def test_domain_validation_exception_handling(client: TestClient) -> None:
    """Verify ValidationException produces 422 status code with uniform schema."""
    response = client.get("/test-errors/trigger-validation-exception")
    assert response.status_code == 422
    data = response.json()
    assert data["error_code"] == "VALIDATION_ERROR"
    assert data["details"] == {"field": "invalid_value"}


def test_unhandled_exception_sanitized_500() -> None:
    """Verify unhandled 500 exceptions do not leak stack traces or internals."""
    with TestClient(app, raise_server_exceptions=False) as no_raise_client:
        response = no_raise_client.get("/test-errors/trigger-unhandled-exception")
        assert response.status_code == 500
        data = response.json()
        assert data["error_code"] == "INTERNAL_SERVER_ERROR"
        assert "division by zero" not in data["message"].lower()
        assert data["details"] is None
