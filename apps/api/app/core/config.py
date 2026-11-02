from functools import lru_cache
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict


# Determine path to apps/api/.env
API_DIR = Path(__file__).resolve().parent.parent.parent
ENV_FILE = API_DIR / ".env"


class Settings(BaseSettings):
    """Central application settings loaded from environment variables and .env file."""

    model_config = SettingsConfigDict(
        env_file=str(ENV_FILE) if ENV_FILE.exists() else ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "LegalLens AI API"
    app_env: str = "development"
    debug: bool = True
    api_v1_prefix: str = "/api/v1"
    log_level: str = "INFO"

    # Placeholders for future phases (Phase 2 & Phase 3)
    database_url: str | None = None
    gemini_api_key: str | None = None
    cors_origins: str = "http://localhost:5173"


@lru_cache
def get_settings() -> Settings:
    """Return cached application settings singleton."""
    return Settings()
