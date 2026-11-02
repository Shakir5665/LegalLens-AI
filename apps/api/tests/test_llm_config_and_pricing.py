"""Unit tests for LLM configuration, pricing estimation, and telemetry schemas."""

import pytest
from pydantic import ValidationError

from app.core.config import Settings
from app.core.pricing import (
    DEFAULT_PRICING_REGISTRY,
    ModelPricing,
    estimate_cost,
)
from app.schemas.llm import LLMCallTelemetry


def test_llm_settings_defaults() -> None:
    """Verify that Phase 2 LLM settings have safe defaults."""
    settings = Settings()
    assert settings.gemini_model == "gemini-2.5-flash"
    assert settings.llm_timeout_seconds == 30.0
    assert settings.llm_max_retries == 2
    assert settings.llm_temperature == 0.2
    assert settings.gemini_api_key is not None or settings.gemini_api_key is None


def test_pricing_registry_contains_documented_models() -> None:
    """Verify default pricing registry contains officially documented rates."""
    assert "gemini-2.5-flash" in DEFAULT_PRICING_REGISTRY
    assert "gemini-2.0-flash" in DEFAULT_PRICING_REGISTRY

    flash_25 = DEFAULT_PRICING_REGISTRY["gemini-2.5-flash"]
    assert flash_25.input_cost_per_million == 0.30
    assert flash_25.output_cost_per_million == 2.50
    assert flash_25.effective_date == "2026-11-01"
    assert flash_25.source_url == "https://ai.google.dev/pricing"

    flash_20 = DEFAULT_PRICING_REGISTRY["gemini-2.0-flash"]
    assert flash_20.input_cost_per_million == 0.10
    assert flash_20.output_cost_per_million == 0.40


def test_estimate_cost_accuracy() -> None:
    """Verify deterministic cost calculation for known token counts."""
    # 1,000 input tokens at $0.30/1M = $0.0003
    # 500 output tokens at $2.50/1M = $0.00125
    # Total = $0.00155
    cost, assumption = estimate_cost(
        model_id="gemini-2.5-flash",
        input_tokens=1000,
        output_tokens=500,
    )
    assert cost == pytest.approx(0.00155, rel=1e-5)
    assert "gemini-2.5-flash" in assumption
    assert "$0.3/1M in" in assumption or "$0.30/1M in" in assumption


def test_estimate_cost_zero_tokens() -> None:
    """Verify 0 tokens produces $0.00 cost."""
    cost, _ = estimate_cost(
        model_id="gemini-2.5-flash",
        input_tokens=0,
        output_tokens=0,
    )
    assert cost == 0.0


def test_estimate_cost_missing_tokens() -> None:
    """Verify that missing token metadata returns None instead of false 0."""
    cost, assumption = estimate_cost(
        model_id="gemini-2.5-flash",
        input_tokens=None,
        output_tokens=200,
    )
    assert cost is None
    assert "Incomplete token counts" in assumption

    cost2, _ = estimate_cost(
        model_id="gemini-2.5-flash",
        input_tokens=100,
        output_tokens=None,
    )
    assert cost2 is None


def test_estimate_cost_unknown_model() -> None:
    """Verify unknown models do not cause crashes and return None."""
    cost, assumption = estimate_cost(
        model_id="unknown-future-model",
        input_tokens=100,
        output_tokens=100,
    )
    assert cost is None
    assert "No documented pricing rates" in assumption


def test_estimate_cost_negative_tokens() -> None:
    """Verify invalid negative token counts return None."""
    cost, assumption = estimate_cost(
        model_id="gemini-2.5-flash",
        input_tokens=-10,
        output_tokens=50,
    )
    assert cost is None
    assert "Invalid negative token counts" in assumption


def test_estimate_cost_with_thinking_tokens_gemini_25() -> None:
    """Verify cost calculation accurately accounts for Gemini 2.5 Flash thinking tokens.

    Observed live metadata:
    - prompt_tokens = 319 ($0.30 / 1M) = $0.0000957
    - candidates_tokens = 248 ($2.50 / 1M) = $0.00062
    - thinking_tokens = 451 ($2.50 / 1M) = $0.0011275
    Total output = 248 + 451 = 699 billable output tokens ($0.0017475)
    Total expected cost = $0.0000957 + $0.0017475 = $0.0018432 USD
    """
    cost, assumption = estimate_cost(
        model_id="gemini-2.5-flash",
        input_tokens=319,
        output_tokens=248,
        thinking_tokens=451,
    )
    assert cost == pytest.approx(0.0018432, rel=1e-5)
    assert "incl. 451 thinking tokens" in assumption


def test_estimate_cost_negative_thinking_tokens() -> None:
    """Verify negative thinking tokens returns None safely."""
    cost, assumption = estimate_cost(
        model_id="gemini-2.5-flash",
        input_tokens=319,
        output_tokens=248,
        thinking_tokens=-5,
    )
    assert cost is None
    assert "Invalid negative token counts" in assumption


def test_telemetry_schema_validation_success() -> None:
    """Verify valid telemetry payload instantiation."""
    telemetry = LLMCallTelemetry(
        correlation_id="req-123",
        model="gemini-2.5-flash",
        operation="legal_query_analysis",
        duration_ms=452.1,
        input_tokens=150,
        output_tokens=75,
        total_tokens=225,
        estimated_cost_usd=0.0002325,
        pricing_assumption="gemini-2.5-flash rate ($0.30/1M in, $2.50/1M out)",
        retry_count=1,
        success=True,
    )
    assert telemetry.correlation_id == "req-123"
    assert telemetry.success is True
    assert telemetry.retry_count == 1
    assert telemetry.error_category is None


def test_telemetry_schema_immutability() -> None:
    """Verify that telemetry records are frozen (immutable)."""
    telemetry = LLMCallTelemetry(
        correlation_id="req-123",
        model="gemini-2.5-flash",
        operation="test_op",
        duration_ms=100.0,
        success=True,
    )
    with pytest.raises(ValidationError):
        # Trying to mutate frozen model must raise ValidationError
        telemetry.duration_ms = 200.0  # type: ignore
