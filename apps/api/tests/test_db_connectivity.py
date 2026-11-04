"""Tests for PostgreSQL database connectivity, configuration, and session lifecycle.

Task 3.1: PostgreSQL Fundamentals and Database Connectivity.
Validates ADR-001 (Modular Monolith), ADR-003 (PostgreSQL primary DB), and
ADR-014 (Strict credential isolation).
"""

from collections.abc import Generator
import pytest
from fastapi import Depends, FastAPI, status
from fastapi.testclient import TestClient
from sqlalchemy import text
from sqlalchemy.orm import Session
from sqlalchemy.pool import QueuePool, StaticPool

from app.api.deps import get_app_settings, get_db
from app.core.config import Settings
from app.core.errors import (
    DatabaseConfigurationError,
    DatabaseConnectionError,
    register_exception_handlers,
)
from app.db.session import (
    check_database_connection,
    create_db_engine,
    db_session_scope,
    get_db_session,
    get_engine,
    get_session_factory,
    reset_engine,
    verify_database_connection,
)


@pytest.fixture(autouse=True)
def cleanup_engine() -> Generator[None, None, None]:
    """Ensure engine singletons are disposed after each test."""
    yield
    reset_engine()


# ---------------------------------------------------------------------------
# 1. Database Configuration Tests
# ---------------------------------------------------------------------------


def test_valid_database_config() -> None:
    """Verify Settings properly parses database URL and pool configuration defaults."""
    settings = Settings(
        database_url="postgresql+psycopg://app_user:secret_pass@localhost:5432/legallens_db",
        db_pool_size=8,
        db_max_overflow=15,
        db_pool_timeout=25.0,
        db_pool_recycle=1200,
        db_echo=True,
        db_connect_timeout=5.0,
    )

    assert settings.database_url == "postgresql+psycopg://app_user:secret_pass@localhost:5432/legallens_db"
    assert settings.db_pool_size == 8
    assert settings.db_max_overflow == 15
    assert settings.db_pool_timeout == 25.0
    assert settings.db_pool_recycle == 1200
    assert settings.db_echo is True
    assert settings.db_connect_timeout == 5.0


def test_database_config_default_pool_values() -> None:
    """Verify default connection pooling and timeout values adhere to architecture specs."""
    settings = Settings(
        database_url="postgresql+psycopg://user:pass@localhost:5432/db",
    )
    assert settings.db_pool_size == 5
    assert settings.db_max_overflow == 10
    assert settings.db_pool_timeout == 30.0
    assert settings.db_pool_recycle == 1800
    assert settings.db_echo is False
    assert settings.db_connect_timeout == 10.0


def test_missing_database_config_raises_typed_error() -> None:
    """Verify create_db_engine raises DatabaseConfigurationError when URL is missing."""
    empty_settings = Settings(database_url=None)
    with pytest.raises(DatabaseConfigurationError) as exc_info:
        create_db_engine(settings=empty_settings)

    assert exc_info.value.status_code == status.HTTP_500_INTERNAL_SERVER_ERROR
    assert exc_info.value.error_code == "DATABASE_CONFIGURATION_ERROR"
    assert "DATABASE_URL is not configured" in exc_info.value.message


def test_empty_string_database_config_raises_typed_error() -> None:
    """Verify empty or whitespace-only database_url raises DatabaseConfigurationError."""
    with pytest.raises(DatabaseConfigurationError):
        create_db_engine(database_url="   ")


def test_malformed_database_url_raises_typed_error() -> None:
    """Verify malformed database URL string raises DatabaseConfigurationError."""
    with pytest.raises(DatabaseConfigurationError) as exc_info:
        create_db_engine(database_url="not-a-valid-database-url-:::://")

    assert exc_info.value.error_code == "DATABASE_CONFIGURATION_ERROR"


# ---------------------------------------------------------------------------
# 2. Engine and Session Factory Configuration Tests
# ---------------------------------------------------------------------------


def test_engine_configuration_postgresql() -> None:
    """Verify engine constructed with PostgreSQL parameters uses QueuePool and settings."""
    settings = Settings(
        database_url="postgresql+psycopg://test_user:test_pass@localhost:5432/test_db",
        db_pool_size=7,
        db_max_overflow=12,
        db_pool_timeout=20.0,
        db_pool_recycle=900,
        db_echo=False,
    )
    engine = create_db_engine(settings=settings)

    assert engine.dialect.name == "postgresql"
    assert engine.dialect.driver == "psycopg"
    assert isinstance(engine.pool, QueuePool)
    assert engine.pool.size() == 7
    assert engine.pool.timeout() == 20.0


def test_engine_configuration_sqlite_memory() -> None:
    """Verify in-memory SQLite engine for tests uses StaticPool."""
    settings = Settings(database_url="sqlite:///:memory:")
    engine = create_db_engine(settings=settings)

    assert engine.dialect.name == "sqlite"
    assert isinstance(engine.pool, StaticPool)


def test_session_factory_lifecycle_settings() -> None:
    """Verify session factory enforces non-autocommit, non-autoflush, non-expire."""
    settings = Settings(database_url="sqlite:///:memory:")
    engine = create_db_engine(settings=settings)
    factory = get_session_factory(engine)

    session = factory()
    try:
        assert isinstance(session, Session)
        assert session.autoflush is False
        assert session.expire_on_commit is False
    finally:
        session.close()


def test_get_engine_singleton_and_reset() -> None:
    """Verify get_engine caches singleton and reset_engine disposes properly."""
    settings = Settings(database_url="sqlite:///:memory:")
    engine1 = get_engine(settings=settings)
    engine2 = get_engine(settings=settings)
    assert engine1 is engine2

    reset_engine()
    engine3 = get_engine(settings=settings)
    assert engine3 is not engine1


# ---------------------------------------------------------------------------
# 3. Connectivity Verification and Failure Handling Tests
# ---------------------------------------------------------------------------


def test_successful_database_connectivity_isolated() -> None:
    """Verify check_database_connection and verify_database_connection with isolated DB."""
    settings = Settings(database_url="sqlite:///:memory:")
    engine = create_db_engine(settings=settings)

    assert check_database_connection(engine) is True
    # Should not raise exception
    verify_database_connection(engine)


def test_connection_failure_handling_and_credential_masking() -> None:
    """Verify connection failure raises DatabaseConnectionError without leaking credentials."""
    unreachable_settings = Settings(
        database_url="postgresql+psycopg://sensitive_user:secret_password_123@127.0.0.1:59998/test_db",
        db_connect_timeout=1.0,
    )
    engine = create_db_engine(settings=unreachable_settings)

    # 1. check_database_connection returns False cleanly
    assert check_database_connection(engine) is False

    # 2. verify_database_connection raises DatabaseConnectionError
    with pytest.raises(DatabaseConnectionError) as exc_info:
        verify_database_connection(engine)

    err = exc_info.value
    assert err.status_code == status.HTTP_503_SERVICE_UNAVAILABLE
    assert err.error_code == "DATABASE_CONNECTION_ERROR"

    # Strict credential isolation check (ADR-014)
    assert "secret_password_123" not in err.message
    assert "secret_password_123" not in str(err.details)
    assert "***" in err.message


# ---------------------------------------------------------------------------
# 4. Session Lifecycle and Dependency Injection Tests
# ---------------------------------------------------------------------------


def test_db_session_scope_commit() -> None:
    """Verify db_session_scope commits changes upon normal exit."""
    settings = Settings(database_url="sqlite:///:memory:")
    engine = create_db_engine(settings=settings)

    # Create a test table
    with engine.connect() as conn:
        conn.execute(text("CREATE TABLE test_items (id INT PRIMARY KEY, name TEXT)"))
        conn.commit()

    with db_session_scope(engine) as session:
        session.execute(text("INSERT INTO test_items VALUES (1, 'item1')"))

    # Verify committed in separate session
    with db_session_scope(engine) as session:
        result = session.execute(text("SELECT name FROM test_items WHERE id = 1")).scalar()
        assert result == "item1"


def test_db_session_scope_rollback_on_exception() -> None:
    """Verify db_session_scope rolls back changes when exception occurs."""
    settings = Settings(database_url="sqlite:///:memory:")
    engine = create_db_engine(settings=settings)

    with engine.connect() as conn:
        conn.execute(text("CREATE TABLE test_rollback (id INT PRIMARY KEY, val TEXT)"))
        conn.commit()

    with pytest.raises(RuntimeError):
        with db_session_scope(engine) as session:
            session.execute(text("INSERT INTO test_rollback VALUES (1, 'should_rollback')"))
            raise RuntimeError("Simulated transaction crash")

    # Verify data was rolled back
    with db_session_scope(engine) as session:
        count = session.execute(text("SELECT count(*) FROM test_rollback")).scalar()
        assert count == 0


def test_get_db_session_generator_lifecycle() -> None:
    """Verify get_db_session yields an active session and closes it in finally."""
    settings = Settings(database_url="sqlite:///:memory:")
    engine = create_db_engine(settings=settings)

    gen = get_db_session(engine)
    session = next(gen)
    assert isinstance(session, Session)

    # Attach spy to verify close is called
    close_called: list[bool] = []
    original_close = session.close

    def tracking_close() -> None:
        close_called.append(True)
        original_close()

    session.close = tracking_close  # type: ignore[method-assign]

    # Verify query works
    val = session.execute(text("SELECT 99")).scalar()
    assert val == 99

    # Close generator and check session cleanup
    with pytest.raises(StopIteration):
        next(gen)

    # Session close was executed in generator's finally block
    assert len(close_called) == 1
    assert session.get_transaction() is None


def test_fastapi_dependency_injection_session_cleanup() -> None:
    """Verify FastAPI route using get_db closes database session on success and failure."""
    test_settings = Settings(database_url="sqlite:///:memory:")

    app = FastAPI()
    register_exception_handlers(app)

    sessions_closed: list[bool] = []

    @app.get("/test-db-success")
    def route_success(db: Session = Depends(get_db)) -> dict[str, int]:
        orig_close = db.close

        def tracking_close() -> None:
            sessions_closed.append(True)
            orig_close()

        db.close = tracking_close  # type: ignore[method-assign]
        val = db.execute(text("SELECT 10")).scalar()
        return {"result": val or 0}

    @app.get("/test-db-error")
    def route_error(db: Session = Depends(get_db)) -> None:
        orig_close = db.close

        def tracking_close() -> None:
            sessions_closed.append(True)
            orig_close()

        db.close = tracking_close  # type: ignore[method-assign]
        raise RuntimeError("Endpoint error trigger")

    # Override get_app_settings to return test_settings
    app.dependency_overrides[get_app_settings] = lambda: test_settings

    client = TestClient(app, raise_server_exceptions=False)

    # 1. Success case
    resp1 = client.get("/test-db-success")
    assert resp1.status_code == status.HTTP_200_OK
    assert resp1.json() == {"result": 10}
    assert len(sessions_closed) == 1

    # 2. Failure case (500 sanitized)
    resp2 = client.get("/test-db-error")
    assert resp2.status_code == status.HTTP_500_INTERNAL_SERVER_ERROR
    # Verify session was closed even when unhandled exception occurred in route
    assert len(sessions_closed) == 2
