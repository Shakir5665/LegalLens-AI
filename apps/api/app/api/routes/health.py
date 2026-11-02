from typing import Annotated
from fastapi import APIRouter, Depends

from app.api.deps import get_app_settings
from app.core.config import Settings
from app.schemas.health import HealthResponse, SystemStatusResponse

# Root unversioned health router
health_router = APIRouter(tags=["Health"])

# Versioned health & diagnostics router
v1_health_router = APIRouter(prefix="/health", tags=["Health"])


@health_router.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    """Unversioned liveness endpoint confirming the API server is reachable."""
    return HealthResponse(status="healthy")


@v1_health_router.get("", response_model=SystemStatusResponse)
async def system_status(
    settings: Annotated[Settings, Depends(get_app_settings)],
) -> SystemStatusResponse:
    """Versioned diagnostics endpoint returning operational status and environment metadata."""
    return SystemStatusResponse(
        app_name=settings.app_name,
        environment=settings.app_env,
        version="0.1.0",
        status="operational",
        api_prefix=settings.api_v1_prefix,
    )
