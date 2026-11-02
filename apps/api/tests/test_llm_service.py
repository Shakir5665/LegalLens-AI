"""Unit tests for the LLM domain service, observability telemetry, and DI."""

import logging
from unittest.mock import MagicMock
import pytest
from pydantic import BaseModel

from app.api.deps import get_app_settings, get_llm_provider, get_llm_service
from app.core.config import Settings
from app.core.llm_errors import (
    LLMConfigurationError,
    LLMResponseValidationError,
    LLMTimeoutError,
)
from app.main import app
from app.providers.fake_provider import FakeLLMProvider
from app.schemas.llm import (
    LegalQueryAnalysisResponse,
    LegalQueryAnalysisResult,
    LegalUrgencyLevel,
    PotentialStatute,
)
from app.services.llm_service import LLMService

_SAMPLE_VALID_JSON = """{
    "primary_legal_issue": "Termination of employment without Labour Commissioner consent under TEWA",
    "potential_statutes": ["termination_of_employment_workmen_act"],
    "key_factual_elements": ["15 workers employed", "Immediate termination", "No prior written consent"],
    "requires_clarification": false,
    "clarification_questions": [],
    "urgency_assessment": "TIME_SENSITIVE",
    "statutory_grounding_note": "Preliminary query classification only. Not authoritative legal advice."
}"""


def test_llm_service_analyze_query_success() -> None:
    """Verify end-to-end execution of legal query analysis with accurate telemetry."""
    fake_provider = FakeLLMProvider(
        default_response=_SAMPLE_VALID_JSON,
        model="gemini-2.5-flash",
        input_tokens=250,
        output_tokens=120,
    )
    service = LLMService(provider=fake_provider)

    response = service.analyze_legal_query(
        query="Can an employer terminate 15 employees without Labour Department approval?",
        context="Manufacturing factory in Colombo",
        correlation_id="test-cid-100",
    )

    assert isinstance(response, LegalQueryAnalysisResponse)
    assert response.analysis.primary_legal_issue.startswith("Termination of employment")
    assert PotentialStatute.TERMINATION_OF_EMPLOYMENT_WORKMEN_ACT in response.analysis.potential_statutes
    assert response.analysis.urgency_assessment == LegalUrgencyLevel.TIME_SENSITIVE

    # Telemetry verification
    telemetry = response.telemetry
    assert telemetry.correlation_id == "test-cid-100"
    assert telemetry.model == "gemini-2.5-flash"
    assert telemetry.operation == "legal_query_analysis"
    assert telemetry.success is True
    assert telemetry.retry_count == 0
    assert telemetry.input_tokens == 250
    assert telemetry.output_tokens == 120
    assert telemetry.total_tokens == 370
    assert telemetry.duration_ms >= 0.0
    assert telemetry.estimated_cost_usd is not None and telemetry.estimated_cost_usd > 0
    assert "gemini-2.5-flash rate" in str(telemetry.pricing_assumption)
    assert telemetry.error_category is None


def test_llm_service_captures_thinking_tokens_telemetry() -> None:
    """Verify service captures thinking tokens and accurately reflects them in estimated cost."""
    # Using the real observed values: 319 in, 248 out, 451 thinking, 1018 total
    fake_provider = FakeLLMProvider(
        default_response=_SAMPLE_VALID_JSON,
        model="gemini-2.5-flash",
        input_tokens=319,
        output_tokens=248,
        thinking_tokens=451,
        total_tokens=1018,
    )
    service = LLMService(provider=fake_provider)
    response = service.analyze_legal_query(
        query="Statutory review for 6 years service",
        correlation_id="thinking-test-cid",
    )

    t = response.telemetry
    assert t.input_tokens == 319
    assert t.output_tokens == 248
    assert t.thinking_tokens == 451
    assert t.total_tokens == 1018
    # 319 * 0.0000003 + (248 + 451) * 0.0000025 = 0.0018432 USD
    assert t.estimated_cost_usd == pytest.approx(0.0018432, rel=1e-5)
    assert "incl. 451 thinking tokens" in str(t.pricing_assumption)


def test_llm_service_retry_recovery_telemetry() -> None:
    """Verify service tracks retry attempts in telemetry when transient error occurs."""
    fake_provider = FakeLLMProvider(
        default_response=_SAMPLE_VALID_JSON,
        model="gemini-2.5-flash",
    )
    fake_provider.set_transient_failure(LLMTimeoutError("Gateway timeout"), failure_count=1)
    mock_sleep = MagicMock()

    service = LLMService(provider=fake_provider, sleep_fn=mock_sleep)
    response = service.analyze_legal_query(
        query="What is the statutory gratuity formula for 7 years of service?",
        correlation_id="retry-trace-1",
    )

    assert response.telemetry.success is True
    assert response.telemetry.retry_count == 1
    assert mock_sleep.call_count == 1


def test_llm_service_exhausted_retries_emits_failure_telemetry() -> None:
    """Verify exhausted retries record failure telemetry and sanitized error category."""
    fake_provider = FakeLLMProvider(default_response=_SAMPLE_VALID_JSON)
    fake_provider.set_transient_failure(LLMTimeoutError("Persistent timeout"), failure_count=3)
    mock_sleep = MagicMock()

    service = LLMService(provider=fake_provider, sleep_fn=mock_sleep)

    with pytest.raises(LLMTimeoutError) as exc_info:
        service.analyze_legal_query(
            query="Inquiry triggering timeout",
            correlation_id="fail-cid-404",
        )

    # Telemetry attached to exception
    failure_telemetry = getattr(exc_info.value, "telemetry", None)
    assert failure_telemetry is not None
    assert failure_telemetry.correlation_id == "fail-cid-404"
    assert failure_telemetry.success is False
    assert failure_telemetry.retry_count == 2
    assert failure_telemetry.error_category == "LLM_TIMEOUT"
    assert failure_telemetry.estimated_cost_usd is None


def test_llm_service_invalid_response_schema_failure() -> None:
    """Verify schema validation error fails fast and produces failure telemetry."""
    # Returns JSON missing primary_legal_issue
    fake_provider = FakeLLMProvider(
        default_response='{"key_factual_elements": ["partial data"]}',
    )
    service = LLMService(provider=fake_provider)

    with pytest.raises(LLMResponseValidationError) as exc_info:
        service.analyze_legal_query(
            query="Testing schema validation failure",
            correlation_id="val-fail-cid",
        )

    failure_telemetry = getattr(exc_info.value, "telemetry", None)
    assert failure_telemetry is not None
    assert failure_telemetry.success is False
    assert failure_telemetry.retry_count == 0
    assert failure_telemetry.error_category == "LLM_INVALID_RESPONSE"


def test_llm_service_missing_token_usage_preserves_none() -> None:
    """Verify missing provider token metadata preserves None rather than inventing zero."""
    fake_provider = FakeLLMProvider(
        default_response=_SAMPLE_VALID_JSON,
        input_tokens=None,
        output_tokens=None,
    )
    service = LLMService(provider=fake_provider)
    response = service.analyze_legal_query(query="Sample inquiry")

    assert response.telemetry.input_tokens is None
    assert response.telemetry.output_tokens is None
    assert response.telemetry.total_tokens is None
    assert response.telemetry.estimated_cost_usd is None


def test_llm_service_empty_query_raises_value_error() -> None:
    """Verify empty whitespace query is rejected before calling the provider."""
    fake_provider = FakeLLMProvider()
    service = LLMService(provider=fake_provider)

    with pytest.raises(ValueError) as exc:
        service.analyze_legal_query("   ")
    assert "Query cannot be empty" in str(exc.value)
    assert len(fake_provider.calls) == 0


def test_privacy_safe_structured_logging(caplog: pytest.LogCaptureFixture) -> None:
    """Verify logging emits execution telemetry but NEVER logs prompt or legal inquiry text."""
    secret_inquiry = "Confidential query regarding dispute with ABC Company"
    fake_provider = FakeLLMProvider(default_response=_SAMPLE_VALID_JSON)
    service = LLMService(provider=fake_provider)

    with caplog.at_level(logging.INFO):
        service.analyze_legal_query(
            query=secret_inquiry,
            context="Secret corporate context",
            correlation_id="privacy-trace-999",
        )

    all_logs = " ".join([record.getMessage() for record in caplog.records])

    # Telemetry metadata MUST be logged
    assert "privacy-trace-999" in all_logs
    assert "legal_query_analysis" in all_logs
    assert "tokens(in=" in all_logs

    # Sensitive query text MUST NOT appear in logs (ADR-014)
    assert secret_inquiry not in all_logs
    assert "Secret corporate context" not in all_logs


def test_dependency_injection_resolution() -> None:
    """Verify that get_llm_service can be injected and overridden cleanly via FastAPI DI."""
    fake_provider = FakeLLMProvider(default_response=_SAMPLE_VALID_JSON)

    # Override get_llm_provider in app dependency overrides
    app.dependency_overrides[get_llm_provider] = lambda: fake_provider
    try:
        settings = Settings()
        provider = app.dependency_overrides[get_llm_provider]()
        service = get_llm_service(provider=provider, settings=settings)

        assert isinstance(service, LLMService)
        assert service.provider is fake_provider
    finally:
        app.dependency_overrides.clear()
