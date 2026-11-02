"""Bounded retry execution engine with exponential backoff and jitter.

Pure standard-library implementation adhering to deterministic-first architecture (ADR-009).
Ensures safe, bounded handling of transient provider faults while failing fast on permanent errors.
"""

import random
import time
from typing import Callable, TypeVar
import requests.exceptions

from app.core.llm_errors import (
    LLMConfigurationError,
    LLMException,
    LLMProviderError,
    LLMRateLimitError,
    LLMResponseValidationError,
    LLMTimeoutError,
)
from app.core.logging import get_logger

logger = get_logger("app.core.retries")

T = TypeVar("T")


def is_retryable_llm_error(exc: Exception) -> bool:
    """Determine whether an exception represents a retryable transient failure.

    Retryable:
    - LLMTimeoutError (timeouts)
    - LLMRateLimitError (HTTP 429 quota/rate limit)
    - Transient LLMProviderError (HTTP 502, 503, 504 or network drops)
    - Low-level network connection drops or read timeouts

    Non-retryable (Fail Fast):
    - LLMConfigurationError (missing or invalid API key, 401, 403)
    - LLMResponseValidationError (malformed JSON or schema constraint failures)
    - Client errors (HTTP 400, 422)
    - Any non-transient application exceptions
    """
    if isinstance(exc, (LLMConfigurationError, LLMResponseValidationError)):
        return False

    if isinstance(exc, (LLMTimeoutError, LLMRateLimitError)):
        return True

    if isinstance(exc, LLMProviderError):
        # 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout
        if exc.status_code in (502, 503, 504):
            return True
        if exc.details and isinstance(exc.details, dict):
            if exc.details.get("cause") == "connection_error":
                return True
        return False

    if isinstance(exc, (requests.exceptions.Timeout, requests.exceptions.ConnectionError)):
        return True

    return False


def calculate_backoff_delay(
    attempt: int,
    base_delay: float = 0.5,
    max_delay: float = 10.0,
    backoff_factor: float = 2.0,
    jitter: bool = True,
    suggested_retry_after: float | None = None,
) -> float:
    """Calculate the backoff wait duration in seconds.

    If the provider specified a suggested delay (e.g. from Retry-After header),
    that duration is respected (subject to max_delay). Otherwise, exponential backoff
    with full randomized jitter is applied.
    """
    if suggested_retry_after is not None and suggested_retry_after > 0:
        return min(suggested_retry_after, max_delay)

    raw_delay = base_delay * (backoff_factor**attempt)
    capped_delay = min(raw_delay, max_delay)

    if jitter:
        # Full jitter: uniformly distributed between 50% and 100% of capped delay
        return random.uniform(capped_delay * 0.5, capped_delay)

    return capped_delay


def execute_with_retry(
    operation: Callable[[], T],
    max_retries: int = 2,
    base_delay: float = 0.5,
    max_delay: float = 10.0,
    backoff_factor: float = 2.0,
    jitter: bool = True,
    sleep_fn: Callable[[float], None] = time.sleep,
    is_retryable_fn: Callable[[Exception], bool] = is_retryable_llm_error,
) -> tuple[T, int]:
    """Execute a callable with bounded retries upon retryable exceptions.

    Args:
        operation: Zero-argument callable to execute.
        max_retries: Number of retries permitted AFTER the initial attempt.
                     (e.g., max_retries=2 allows 1 initial attempt + up to 2 retries = 3 attempts total).
        base_delay: Initial backoff duration in seconds.
        max_delay: Maximum delay ceiling in seconds.
        backoff_factor: Multiplier for exponential backoff.
        jitter: Whether to add random variance to backoff intervals.
        sleep_fn: Sleeping function (injectable for instant unit tests).
        is_retryable_fn: Predicate determining if an exception can be retried.

    Returns:
        tuple[T, int]: (operation_result, retry_count)

    Raises:
        Exception: The last encountered exception if all attempts fail,
                   or immediately if the exception is non-retryable.
    """
    attempt = 0
    while True:
        try:
            result = operation()
            return result, attempt
        except Exception as exc:
            # Check if this error is retryable and attempts remain
            is_retryable = is_retryable_fn(exc)
            if not is_retryable or attempt >= max_retries:
                # Attach attempt count for caller telemetry accounting
                try:
                    setattr(exc, "retry_count", attempt)
                except Exception:
                    pass

                if attempt > 0:
                    logger.warning(
                        "Operation failed after %d retries. Propagating exception: %s",
                        attempt,
                        exc,
                    )
                raise

            # Extract provider-suggested delay if present
            suggested_delay: float | None = None
            if hasattr(exc, "details") and isinstance(exc.details, dict):
                suggested_delay = exc.details.get("retry_after")

            delay = calculate_backoff_delay(
                attempt=attempt,
                base_delay=base_delay,
                max_delay=max_delay,
                backoff_factor=backoff_factor,
                jitter=jitter,
                suggested_retry_after=suggested_delay,
            )

            logger.info(
                "Transient error [%s] on attempt %d/%d. Retrying in %.2fs: %s",
                exc.__class__.__name__,
                attempt + 1,
                max_retries + 1,
                delay,
                getattr(exc, "message", str(exc)),
            )

            sleep_fn(delay)
            attempt += 1
