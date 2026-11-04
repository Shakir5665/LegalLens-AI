"""PostgreSQL Database Engine, Session Management, and Connectivity Verification.

Task 3.1: PostgreSQL Fundamentals and Database Connectivity.
Follows ADR-001 (Modular Monolith), ADR-003 (PostgreSQL primary DB), and
ADR-014 (Strict credential isolation).
"""

from collections.abc import Generator
from contextlib import contextmanager
from typing import Any

from sqlalchemy import Engine, create_engine, text
from sqlalchemy.engine import make_url
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.config import Settings, get_settings
from app.core.errors import DatabaseConfigurationError, DatabaseConnectionError
from app.core.logging import get_logger

logger = get_logger("app.db.session")

_engine: Engine | None = None
_session_factory: sessionmaker[Session] | None = None


def create_db_engine(
    database_url: str | None = None,
    settings: Settings | None = None,
) -> Engine:
    """Create a new SQLAlchemy engine configured according to application settings.

    Args:
        database_url: Explicit database connection string, overriding settings.
        settings: Application settings instance; defaults to cached singleton.

    Returns:
        Configured SQLAlchemy Engine instance.

    Raises:
        DatabaseConfigurationError: If no database URL is configured or format is invalid.
    """
    active_settings = settings or get_settings()
    raw_url = database_url or active_settings.database_url

    if not raw_url or not raw_url.strip():
        raise DatabaseConfigurationError(
            message="DATABASE_URL is not configured. Set the DATABASE_URL environment variable or update application settings."
        )

    try:
        url = make_url(raw_url.strip())
    except Exception as exc:
        raise DatabaseConfigurationError(
            message="Invalid DATABASE_URL format.",
            details={"error": str(exc)},
        ) from exc

    masked_url = url.render_as_string(hide_password=True)
    logger.info("Configuring database engine for %s", masked_url)

    engine_kwargs: dict[str, Any] = {
        "echo": active_settings.db_echo,
    }

    backend = url.get_backend_name()

    if backend == "postgresql":
        engine_kwargs.update(
            {
                "pool_size": active_settings.db_pool_size,
                "max_overflow": active_settings.db_max_overflow,
                "pool_timeout": active_settings.db_pool_timeout,
                "pool_recycle": active_settings.db_pool_recycle,
                "pool_pre_ping": True,
                "connect_args": {
                    "connect_timeout": int(active_settings.db_connect_timeout),
                },
            }
        )
    elif backend == "sqlite":
        # Isolated test environment support
        if url.database == ":memory:" or not url.database or ":memory:" in raw_url:
            engine_kwargs["poolclass"] = StaticPool
            engine_kwargs["connect_args"] = {"check_same_thread": False}
        else:
            engine_kwargs["connect_args"] = {"check_same_thread": False}
    else:
        logger.warning(
            "Configuring database engine for non-PostgreSQL backend '%s'. Specialized pooling skipped.",
            backend,
        )

    return create_engine(url, **engine_kwargs)


def get_engine(settings: Settings | None = None) -> Engine:
    """Return the global cached database engine singleton, instantiating if needed."""
    global _engine
    if _engine is None:
        _engine = create_db_engine(settings=settings)
    return _engine


def reset_engine() -> None:
    """Dispose of the cached engine and reset global singletons.

    Primarily used in test suites and configuration reloads.
    """
    global _engine, _session_factory
    if _engine is not None:
        try:
            _engine.dispose()
        except Exception as exc:
            logger.warning("Error disposing database engine: %s", exc)
        _engine = None
    _session_factory = None


def get_session_factory(engine: Engine | None = None) -> sessionmaker[Session]:
    """Return a SQLAlchemy sessionmaker configured with appropriate lifecycle flags."""
    global _session_factory
    target_engine = engine or get_engine()

    if engine is not None:
        return sessionmaker(
            bind=target_engine,
            autocommit=False,
            autoflush=False,
            expire_on_commit=False,
            class_=Session,
        )

    if _session_factory is None:
        _session_factory = sessionmaker(
            bind=target_engine,
            autocommit=False,
            autoflush=False,
            expire_on_commit=False,
            class_=Session,
        )
    return _session_factory


def check_database_connection(engine: Engine | None = None) -> bool:
    """Test database connectivity with a lightweight probe.

    Returns:
        True if the database responds successfully, False otherwise.
    """
    target_engine = engine or get_engine()
    masked_url = target_engine.url.render_as_string(hide_password=True)
    try:
        with target_engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        logger.info("Database connectivity check succeeded for %s", masked_url)
        return True
    except Exception as exc:
        logger.warning("Database connectivity check failed for %s: %s", masked_url, exc)
        return False


def verify_database_connection(engine: Engine | None = None) -> None:
    """Assert database connectivity, raising a typed DatabaseConnectionError on failure.

    Ensures no passwords or sensitive connection parameters are leaked in exceptions.
    """
    target_engine = engine or get_engine()
    masked_url = target_engine.url.render_as_string(hide_password=True)
    try:
        with target_engine.connect() as connection:
            connection.execute(text("SELECT 1"))
    except SQLAlchemyError as exc:
        logger.error("Database connection verification error on %s: %s", masked_url, exc)
        raise DatabaseConnectionError(
            message=f"Database connection to '{masked_url}' failed.",
            details={"dialect": target_engine.dialect.name},
        ) from exc
    except Exception as exc:
        logger.error("Unexpected error during database connectivity verification: %s", exc)
        raise DatabaseConnectionError(
            message=f"Unexpected failure connecting to database '{masked_url}'.",
            details={"error_type": type(exc).__name__},
        ) from exc


def get_db_session(engine: Engine | None = None) -> Generator[Session, None, None]:
    """Yield a database session and guarantee cleanup after request/task completion."""
    factory = get_session_factory(engine)
    session = factory()
    try:
        yield session
    finally:
        session.close()


@contextmanager
def db_session_scope(engine: Engine | None = None) -> Generator[Session, None, None]:
    """Context manager providing an atomic transactional database session scope."""
    factory = get_session_factory(engine)
    session = factory()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()
