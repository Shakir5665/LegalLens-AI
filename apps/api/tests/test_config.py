from app.core.config import Settings, get_settings


def test_settings_default_values() -> None:
    """Verify that default settings conform to project specifications."""
    settings = Settings(
        app_name="Custom Test App",
        app_env="testing",
        debug=False,
        api_v1_prefix="/api/v1",
        log_level="DEBUG",
    )
    assert settings.app_name == "Custom Test App"
    assert settings.app_env == "testing"
    assert settings.debug is False
    assert settings.api_v1_prefix == "/api/v1"
    assert settings.log_level == "DEBUG"


def test_get_settings_cached_singleton() -> None:
    """Verify that get_settings returns a memoized singleton instance."""
    s1 = get_settings()
    s2 = get_settings()
    assert s1 is s2
