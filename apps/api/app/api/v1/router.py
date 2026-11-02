from fastapi import APIRouter

from app.api.routes.health import v1_health_router
from app.api.routes.sources import router as sources_router

api_v1_router = APIRouter()

# Mount versioned sub-routers
api_v1_router.include_router(v1_health_router)
api_v1_router.include_router(sources_router)
