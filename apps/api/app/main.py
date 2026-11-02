from fastapi import FastAPI

from app.api.routes.health import health_router
from app.api.v1.router import api_v1_router
from app.core.config import get_settings
from app.core.errors import register_exception_handlers
from app.core.logging import setup_logging

settings = get_settings()
setup_logging(settings.log_level)

app = FastAPI(
    title=settings.app_name,
    description="Evidence-Grounded Agentic AI Platform for Sri Lankan Legal Research",
    version="0.1.0",
    debug=settings.debug,
)

# Register uniform error handlers
register_exception_handlers(app)

# Unversioned operational health endpoint (/health)
app.include_router(health_router)

# Versioned API v1 routes (/api/v1)
app.include_router(api_v1_router, prefix=settings.api_v1_prefix)
