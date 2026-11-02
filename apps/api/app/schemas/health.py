from datetime import datetime, timezone
from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    """Basic health check status."""

    status: str = Field(default="healthy", description="Operational status of the service")


class SystemStatusResponse(BaseModel):
    """Detailed system diagnostic status."""

    app_name: str = Field(..., description="Application name")
    environment: str = Field(..., description="Running environment (development, test, production)")
    version: str = Field(..., description="Application version")
    status: str = Field(default="operational", description="System operational status")
    api_prefix: str = Field(..., description="Root API route prefix")
    timestamp: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        description="Timestamp of the health check in UTC",
    )
