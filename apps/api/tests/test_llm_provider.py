"""Unit tests for the LLM provider abstraction, Gemini provider, and fake provider."""

import os
from unittest.mock import MagicMock
import pytest
from pydantic import BaseModel
import requests.exceptions

from app.core.config import Settings
from app.core.llm_errors import (
    LLMConfigurationError,
    LLMProviderError,
    LLMRateLimitError,
    LLMTimeoutError,
)
from app.providers.base import LLMProvider, ProviderResponse, TokenUsage
from app.providers.fake_provider import FakeLLMProvider
from app.providers.gemini_provider import GeminiProvider


class DemoStructuredSchema(BaseModel):
    summary: str
    key_points: list[str]


def test_provider_protocol_runtime_checkable() -> None:
    """Verify that FakeLLMProvider satisfies the LLMProvider protocol."""
    fake = FakeLLMProvider()
    assert isinstance(fake, LLMProvider)


def test_fake_provider_generate() -> None:
    """Verify fake provider generates text and tracks usage metadata."""
    fake = FakeLLMProvider(
        default_response="Mock legal summary",
        input_tokens=120,
        output_tokens=60,
    )
    response = fake.generate(prompt="Explain Section 31B", system_instruction="You are a legal assistant")

    assert response.content == "Mock legal summary"
    assert response.usage.input_tokens == 120
    assert response.usage.output_tokens == 60
    assert response.usage.total_tokens == 180
    assert response.latency_ms > 0
    assert len(fake.calls) == 1
    assert fake.calls[0]["prompt"] == "Explain Section 31B"


def test_fake_provider_structured_generate() -> None:
    """Verify fake provider handles structured generation calls."""
    fake = FakeLLMProvider(default_response='{"summary": "Test", "key_points": ["p1"]}')
    response = fake.generate_structured(
        prompt="Analyze query",
        response_schema=DemoStructuredSchema,
    )
    assert response.content == '{"summary": "Test", "key_points": ["p1"]}'
    assert fake.calls[0]["response_schema"] is DemoStructuredSchema


def test_fake_provider_transient_failure_simulation() -> None:
    """Verify fake provider can simulate transient failures and recover."""
    fake = FakeLLMProvider(default_response="Success after retry")
    fake.set_transient_failure(LLMTimeoutError("Temporary timeout"), failure_count=2)

    with pytest.raises(LLMTimeoutError):
        fake.generate(prompt="attempt 1")

    with pytest.raises(LLMTimeoutError):
        fake.generate(prompt="attempt 2")

    # Third attempt succeeds
    response = fake.generate(prompt="attempt 3")
    assert response.content == "Success after retry"


def test_gemini_provider_missing_credentials_raises_configuration_error(monkeypatch) -> None:
    """Verify GeminiProvider raises LLMConfigurationError if key is missing or dummy placeholder."""
    # Test with placeholder dummy key
    with pytest.raises(LLMConfigurationError) as exc_info:
        GeminiProvider(api_key="your-gemini-api-key-here")
    assert "Gemini API key is missing" in str(exc_info.value.message)

    # Test with empty whitespace
    with pytest.raises(LLMConfigurationError):
        GeminiProvider(api_key="   ")

    # Test with None when settings also has None
    monkeypatch.setattr("app.providers.gemini_provider.get_settings", lambda: Settings(gemini_api_key=None))
    with pytest.raises(LLMConfigurationError):
        GeminiProvider(api_key=None)


def test_gemini_provider_successful_generate_with_mocked_sdk() -> None:
    """Verify GeminiProvider extracts content, tokens, and latency from SDK response."""
    provider = GeminiProvider(api_key="valid-dummy-test-key")

    mock_response = MagicMock()
    mock_response.text = "Authoritative statutory interpretation"
    mock_response.usage_metadata.prompt_token_count = 140
    mock_response.usage_metadata.candidates_token_count = 80
    mock_response.usage_metadata.total_token_count = 220
    candidate_mock = MagicMock()
    candidate_mock.finish_reason = "STOP"
    mock_response.candidates = [candidate_mock]

    provider._client.models.generate_content = MagicMock(return_value=mock_response)

    response = provider.generate(
        prompt="Explain Section 31B of IDA 1950",
        system_instruction="Strict legal analysis",
        temperature=0.1,
    )

    assert isinstance(response, ProviderResponse)
    assert response.content == "Authoritative statutory interpretation"
    assert response.usage.input_tokens == 140
    assert response.usage.output_tokens == 80
    assert response.usage.total_tokens == 220
    assert response.finish_reason == "STOP"
    assert response.latency_ms >= 0


def test_gemini_provider_timeout_translation() -> None:
    """Verify requests Timeout exception is mapped to LLMTimeoutError."""
    provider = GeminiProvider(api_key="valid-dummy-test-key", timeout_seconds=15.0)
    provider._client.models.generate_content = MagicMock(
        side_effect=requests.exceptions.Timeout("Read timed out")
    )

    with pytest.raises(LLMTimeoutError) as exc_info:
        provider.generate(prompt="Test prompt")
    assert exc_info.value.status_code == 504
    assert exc_info.value.error_code == "LLM_TIMEOUT"
    assert "timed out after 15.0 seconds" in str(exc_info.value.message)


def test_gemini_provider_connection_error_translation() -> None:
    """Verify connection error is mapped to LLMProviderError."""
    provider = GeminiProvider(api_key="valid-dummy-test-key")
    provider._client.models.generate_content = MagicMock(
        side_effect=requests.exceptions.ConnectionError("Connection refused")
    )

    with pytest.raises(LLMProviderError) as exc_info:
        provider.generate(prompt="Test prompt")
    assert exc_info.value.status_code == 502
    assert "Network connection to Gemini API failed" in str(exc_info.value.message)


def test_gemini_provider_api_error_translation() -> None:
    """Verify Gemini APIError codes (401, 429, 503) are properly mapped."""
    from google.genai import errors

    provider = GeminiProvider(api_key="valid-dummy-test-key")

    # 401 Unauthorized -> LLMConfigurationError
    err_401 = errors.APIError(code=401, response=MagicMock())
    err_401.message = "API key not valid"
    provider._client.models.generate_content = MagicMock(side_effect=err_401)
    with pytest.raises(LLMConfigurationError) as exc_401:
        provider.generate(prompt="Test")
    assert "authentication failed" in str(exc_401.value.message).lower()

    # 429 Rate Limit -> LLMRateLimitError
    err_429 = errors.APIError(code=429, response=MagicMock())
    provider._client.models.generate_content = MagicMock(side_effect=err_429)
    with pytest.raises(LLMRateLimitError):
        provider.generate(prompt="Test")

    # 503 Service Unavailable -> LLMProviderError
    err_503 = errors.APIError(code=503, response=MagicMock())
    provider._client.models.generate_content = MagicMock(side_effect=err_503)
    with pytest.raises(LLMProviderError) as exc_503:
        provider.generate(prompt="Test")
    assert exc_503.value.status_code == 502
    assert "temporarily unavailable" in str(exc_503.value.message)


def test_gemini_provider_derives_thinking_tokens_from_discrepancy() -> None:
    """Verify GeminiProvider derives thinking tokens when total exceeds (prompt + candidate).

    Observed live metadata:
    prompt_token_count = 319, candidates_token_count = 248, total_token_count = 1018.
    Derived thinking_tokens = 1018 - (319 + 248) = 451.
    Billable output tokens = 248 + 451 = 699.
    """
    provider = GeminiProvider(api_key="valid-dummy-test-key")

    mock_response = MagicMock()
    mock_response.text = "Analysis text"
    mock_response.usage_metadata.prompt_token_count = 319
    mock_response.usage_metadata.candidates_token_count = 248
    mock_response.usage_metadata.total_token_count = 1018
    mock_response.usage_metadata.cached_content_token_count = None
    # No explicit thoughts_token_count attribute on mock
    del mock_response.usage_metadata.thoughts_token_count

    candidate_mock = MagicMock()
    candidate_mock.finish_reason = "STOP"
    mock_response.candidates = [candidate_mock]

    provider._client.models.generate_content = MagicMock(return_value=mock_response)

    response = provider.generate(prompt="Sri Lankan employment inquiry")
    usage = response.usage

    assert usage.input_tokens == 319
    assert usage.output_tokens == 248
    assert usage.thinking_tokens == 451
    assert usage.total_tokens == 1018
    assert usage.billable_output_tokens == 699


def test_gemini_provider_reads_explicit_thoughts_token_count() -> None:
    """Verify GeminiProvider reads thoughts_token_count directly if exposed by SDK."""
    provider = GeminiProvider(api_key="valid-dummy-test-key")

    mock_response = MagicMock()
    mock_response.text = "Analysis text"
    mock_response.usage_metadata.prompt_token_count = 300
    mock_response.usage_metadata.candidates_token_count = 200
    mock_response.usage_metadata.thoughts_token_count = 400
    mock_response.usage_metadata.total_token_count = 900
    mock_response.usage_metadata.cached_content_token_count = 50

    candidate_mock = MagicMock()
    candidate_mock.finish_reason = "STOP"
    mock_response.candidates = [candidate_mock]

    provider._client.models.generate_content = MagicMock(return_value=mock_response)

    response = provider.generate(prompt="Inquiry")
    usage = response.usage

    assert usage.input_tokens == 300
    assert usage.output_tokens == 200
    assert usage.thinking_tokens == 400
    assert usage.cached_tokens == 50
    assert usage.total_tokens == 900
    assert usage.billable_output_tokens == 600


@pytest.mark.skipif(
    not os.getenv("REAL_GEMINI_API_KEY"),
    reason="Live Gemini API key not provided in REAL_GEMINI_API_KEY environment variable.",
)
def test_real_gemini_api_integration() -> None:
    """Live integration test verifying real Google Gemini API network connectivity.

    Executed only when REAL_GEMINI_API_KEY is explicitly supplied in the environment.
    Ordinary test runs skip this test to maintain zero-network determinism.
    """
    real_key = os.getenv("REAL_GEMINI_API_KEY")
    provider = GeminiProvider(api_key=real_key)
    response = provider.generate(
        prompt="Respond with the exact single word: 'TEST_PASSED'",
        temperature=0.0,
    )
    assert "TEST_PASSED" in response.content
    assert response.usage.input_tokens is not None and response.usage.input_tokens > 0
    assert response.usage.output_tokens is not None and response.usage.output_tokens > 0
