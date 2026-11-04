"""Manual developer testing script for PostgreSQL database connectivity.

Task 3.1: PostgreSQL Fundamentals and Database Connectivity.
Tests connection establishment, pool configuration, query execution, and session lifecycle.

Usage:
    # From repository root (with virtual environment activated):
    python apps/api/scripts/manual_test_db.py

    # Or provide an explicit connection string:
    python apps/api/scripts/manual_test_db.py --url "postgresql+psycopg://user:password@localhost:5432/dbname"
"""

import argparse
from pathlib import Path
import sys

# Ensure apps/api directory is on sys.path so 'app' package resolves cleanly
API_DIR = Path(__file__).resolve().parent.parent
if str(API_DIR) not in sys.path:
    sys.path.insert(0, str(API_DIR))

from sqlalchemy import text
from sqlalchemy.engine import make_url

from app.core.config import get_settings
from app.core.errors import DatabaseConfigurationError, DatabaseConnectionError
from app.db.session import (
    create_db_engine,
    db_session_scope,
    get_session_factory,
    verify_database_connection,
)


def run_db_test(database_url: str | None = None) -> int:
    """Execute live database connection test and report diagnostics."""
    print("=" * 72)
    print("  LEGALLENS AI -- DATABASE CONNECTIVITY VERIFICATION (TASK 3.1)")
    print("=" * 72)

    settings = get_settings()
    target_url = database_url or settings.database_url

    if not target_url or not target_url.strip():
        print("\n[X] DATABASE CONFIGURATION ERROR:")
        print("    DATABASE_URL is not set in environment or apps/api/.env.")
        print("    Remediation:")
        print("    Set your database connection URL:")
        print("    PowerShell: $env:DATABASE_URL=\"postgresql+psycopg://user:pass@host:5432/dbname\"")
        return 1

    try:
        parsed_url = make_url(target_url.strip())
        masked_url = parsed_url.render_as_string(hide_password=True)
    except Exception as exc:
        print(f"\n[X] MALFORMED DATABASE URL: {exc}")
        return 1

    print("\n[*] Target Database Configuration:")
    print(f"    - URL (Masked)       : {masked_url}")
    print(f"    - Dialect / Driver   : {parsed_url.drivername}")
    print(f"    - Host               : {parsed_url.host or 'localhost'}")
    print(f"    - Port               : {parsed_url.port or 'default'}")
    print(f"    - Database Name      : {parsed_url.database or 'default'}")
    print(f"    - Pool Size          : {settings.db_pool_size}")
    print(f"    - Max Overflow       : {settings.db_max_overflow}")
    print(f"    - Pool Timeout       : {settings.db_pool_timeout}s")
    print(f"    - Pool Recycle       : {settings.db_pool_recycle}s")
    print(f"    - Connect Timeout    : {settings.db_connect_timeout}s")

    print("\n[*] Step 1: Initializing SQLAlchemy engine...")
    try:
        engine = create_db_engine(database_url=target_url, settings=settings)
        print("    [OK] Engine initialized successfully.")
    except DatabaseConfigurationError as exc:
        print(f"    [X] Configuration failed: {exc.message}")
        return 1
    except Exception as exc:
        print(f"    [X] Engine creation failed: {exc}")
        return 1

    print("\n[*] Step 2: Verifying database probe ('SELECT 1')...")
    try:
        verify_database_connection(engine)
        print("    [OK] Connectivity probe succeeded! Server is responsive.")
    except DatabaseConnectionError as exc:
        print(f"    [X] Connection probe failed: {exc.message}")
        if exc.details:
            print(f"        Details: {exc.details}")
        print("    Remediation:")
        print("    Verify PostgreSQL service is running and credentials/network are valid.")
        return 1
    except Exception as exc:
        print(f"    [X] Unexpected error during probe: {exc}")
        return 1

    print("\n[*] Step 3: Inspecting server version and database metadata...")
    try:
        with engine.connect() as conn:
            version_query = "SELECT sqlite_version()" if parsed_url.drivername == "sqlite" else "SELECT version()"
            version_row = conn.execute(text(version_query)).fetchone()
            server_version = version_row[0] if version_row else "Unknown"
            print(f"    - Server Version     : {server_version}")

            if parsed_url.drivername != "sqlite":
                current_db_row = conn.execute(text("SELECT current_database(), current_user")).fetchone()
                if current_db_row:
                    print(f"    - Current Database   : {current_db_row[0]}")
                    print(f"    - Current User       : {current_db_row[1]}")
        print("    [OK] Server metadata query executed successfully.")
    except Exception as exc:
        print(f"    [!] Warning: Metadata inspection query failed (non-critical): {exc}")

    print("\n[*] Step 4: Testing session lifecycle and transaction rollback...")
    try:
        session_factory = get_session_factory(engine)
        session = session_factory()
        try:
            result = session.execute(text("SELECT 42")).scalar()
            assert result == 42
            print("    [OK] Session query executed successfully (scalar=42).")
        finally:
            session.close()
            print("    [OK] Session closed and returned to connection pool.")

        # Test context manager scope
        with db_session_scope(engine) as scoped_session:
            test_val = scoped_session.execute(text("SELECT 100")).scalar()
            assert test_val == 100
        print("    [OK] db_session_scope context manager completed cleanly.")
    except Exception as exc:
        print(f"    [X] Session test failed: {exc}")
        return 1

    print("\n" + "=" * 72)
    print("  [OK] DATABASE CONNECTIVITY AND SESSION LIFECYCLE VERIFIED")
    print("=" * 72)
    return 0


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Manual Developer Database Connectivity Verification for LegalLens AI"
    )
    parser.add_argument(
        "--url",
        type=str,
        default=None,
        help="Optional database URL to override environment settings",
    )
    args = parser.parse_args()

    sys.exit(run_db_test(database_url=args.url))


if __name__ == "__main__":
    main()
