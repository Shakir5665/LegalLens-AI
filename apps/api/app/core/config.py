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

    # AI Model Configuration (Phase 2 LLM Engineering)
    gemini_api_key: str | None = None
    gemini_model: str = "gemini-2.5-flash"
    llm_timeout_seconds: float = 30.0
    llm_max_retries: int = 2
    llm_temperature: float = 0.2

    # Database Configuration (Phase 3 Database & Document Intelligence)
    database_url: str | None = None
    db_pool_size: int = 5
    db_max_overflow: int = 10
    db_pool_timeout: float = 30.0
    db_pool_recycle: int = 1800
    db_echo: bool = False
    db_connect_timeout: float = 10.0

    # Storage Configuration (Phase 3 Document Storage & Ingestion)
    storage_dir: str = "storage"
    max_upload_size_bytes: int = 25 * 1024 * 1024  # 25 MB default

    # Frontend Placeholders (Phase 10)
    cors_origins: str = "http://localhost:5173"


@lru_cache
def get_settings() -> Settings:
    """Return cached application settings singleton."""
    return Settings()
