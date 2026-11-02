"""Unit tests for bounded retry logic, backoff calculation, and error classification."""

from unittest.mock import MagicMock
import pytest
import requests.exceptions

from app.core.llm_errors import (
    LLMConfigurationError,
    LLMProviderError,
    LLMRateLimitError,
    LLMResponseValidationError,
    LLMTimeoutError,
)
from app.core.retries import (
    calculate_backoff_delay,
    execute_with_retry,
    is_retryable_llm_error,
)
from app.providers.fake_provider import FakeLLMProvider


def test_is_retryable_llm_error_classification() -> None:
    """Verify exact retryability classification across exception types."""
    # Retryable transient failures
    assert is_retryable_llm_error(LLMTimeoutError("Timeout")) is True
    assert is_retryable_llm_error(LLMRateLimitError("Quota reached")) is True
    assert is_retryable_llm_error(LLMProviderError("502", status_code=502)) is True
    assert is_retryable_llm_error(LLMProviderError("503", status_code=503)) is True
    assert is_retryable_llm_error(LLMProviderError("504", status_code=504)) is True
    assert is_retryable_llm_error(LLMProviderError("Conn", details={"cause": "connection_error"})) is True
    assert is_retryable_llm_error(requests.exceptions.Timeout("Read timeout")) is True
    assert is_retryable_llm_error(requests.exceptions.ConnectionError("Conn dropped")) is True

    # Non-retryable permanent failures
    assert is_retryable_llm_error(LLMConfigurationError("Bad key")) is False
    assert is_retryable_llm_error(LLMResponseValidationError("Schema fail")) is False
    assert is_retryable_llm_error(LLMProviderError("400 Bad Request", status_code=400)) is False
    assert is_retryable_llm_error(ValueError("Programming error")) is False


def test_calculate_backoff_delay_exponential_growth() -> None:
    """Verify exponential backoff progression without jitter."""
    d0 = calculate_backoff_delay(attempt=0, base_delay=1.0, backoff_factor=2.0, jitter=False)
    d1 = calculate_backoff_delay(attempt=1, base_delay=1.0, backoff_factor=2.0, jitter=False)
    d2 = calculate_backoff_delay(attempt=2, base_delay=1.0, backoff_factor=2.0, jitter=False)

    assert d0 == 1.0
    assert d1 == 2.0
    assert d2 == 4.0


def test_calculate_backoff_delay_caps_at_max() -> None:
    """Verify backoff never exceeds max_delay."""
    delay = calculate_backoff_delay(attempt=10, base_delay=1.0, max_delay=5.0, jitter=False)
    assert delay == 5.0


def test_calculate_backoff_delay_respects_provider_retry_after() -> None:
    """Verify provider suggested delay is respected up to max_delay."""
    delay = calculate_backoff_delay(attempt=0, max_delay=10.0, suggested_retry_after=4.5)
    assert delay == 4.5

    # Capped when suggested exceeds max_delay
    delay_capped = calculate_backoff_delay(attempt=0, max_delay=10.0, suggested_retry_after=60.0)
    assert delay_capped == 10.0


def test_calculate_backoff_delay_jitter_range() -> None:
    """Verify jitter stays within [0.5 * capped, capped]."""
    for _ in range(50):
        delay = calculate_backoff_delay(attempt=1, base_delay=2.0, jitter=True)
        # raw is 2.0 * 2.0 = 4.0. Jitter should be in [2.0, 4.0]
        assert 2.0 <= delay <= 4.0


def test_execute_with_retry_succeeds_first_attempt() -> None:
    """Verify operation succeeding on attempt 0 incurs zero retries and zero sleep."""
    mock_op = MagicMock(return_value="success_result")
    mock_sleep = MagicMock()

    result, retry_count = execute_with_retry(
        mock_op,
        max_retries=2,
        sleep_fn=mock_sleep,
    )

    assert result == "success_result"
    assert retry_count == 0
    assert mock_op.call_count == 1
    assert mock_sleep.call_count == 0


def test_execute_with_retry_recovers_after_transient_failure() -> None:
    """Verify operation recovering on retry attempt 1 succeeds with retry_count=1."""
    # Fails once with timeout, then succeeds
    mock_op = MagicMock(side_effect=[LLMTimeoutError("Transient timeout"), "recovered_data"])
    mock_sleep = MagicMock()

    result, retry_count = execute_with_retry(
        mock_op,
        max_retries=2,
        base_delay=1.0,
        jitter=False,
        sleep_fn=mock_sleep,
    )

    assert result == "recovered_data"
    assert retry_count == 1
    assert mock_op.call_count == 2
    assert mock_sleep.call_count == 1
    mock_sleep.assert_called_once_with(1.0)


def test_execute_with_retry_exhausts_bounded_attempts() -> None:
    """Verify failure after max_retries=2 raises last exception after 3 total attempts."""
    mock_op = MagicMock(side_effect=LLMTimeoutError("Persistent timeout"))
    mock_sleep = MagicMock()

    with pytest.raises(LLMTimeoutError):
        execute_with_retry(
            mock_op,
            max_retries=2,
            sleep_fn=mock_sleep,
        )

    # 1 initial attempt + 2 retries = 3 calls
    assert mock_op.call_count == 3
    assert mock_sleep.call_count == 2


def test_execute_with_retry_fails_immediately_on_non_retryable_error() -> None:
    """Verify non-retryable errors fail fast without sleeping or retrying."""
    # LLMConfigurationError must not be retried
    mock_op_config = MagicMock(side_effect=LLMConfigurationError("Invalid key"))
    mock_sleep = MagicMock()

    with pytest.raises(LLMConfigurationError):
        execute_with_retry(mock_op_config, max_retries=2, sleep_fn=mock_sleep)

    assert mock_op_config.call_count == 1
    assert mock_sleep.call_count == 0

    # LLMResponseValidationError must not be retried
    mock_op_val = MagicMock(side_effect=LLMResponseValidationError("Malformed JSON"))
    with pytest.raises(LLMResponseValidationError):
        execute_with_retry(mock_op_val, max_retries=2, sleep_fn=mock_sleep)

    assert mock_op_val.call_count == 1
    assert mock_sleep.call_count == 0


def test_execute_with_retry_with_fake_llm_provider() -> None:
    """Verify integration of execute_with_retry with FakeLLMProvider transient failure hook."""
    fake = FakeLLMProvider(default_response="Retried fake response")
    fake.set_transient_failure(LLMRateLimitError("Simulated 429"), failure_count=2)
    mock_sleep = MagicMock()

    result, retry_count = execute_with_retry(
        lambda: fake.generate(prompt="Explain Section 31B"),
        max_retries=2,
        sleep_fn=mock_sleep,
    )

    assert result.content == "Retried fake response"
    assert retry_count == 2
    assert len(fake.calls) == 3
    assert mock_sleep.call_count == 2
