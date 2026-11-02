"""Custom application exceptions for LLM operations.

All exceptions inherit from AppException to ensure uniform HTTP status mapping
and sanitized error response payloads (ADR-014).
"""

from typing import Any
from fastapi import status
from app.core.errors import AppException


class LLMException(AppException):
    """Base exception for all LLM-related failures."""

    def __init__(
        self,
        message: str,
        status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR,
        error_code: str = "LLM_ERROR",
        details: Any = None,
    ) -> None:
        super().__init__(
            message=message,
            status_code=status_code,
            error_code=error_code,
            details=details,
        )


class LLMConfigurationError(LLMException):
    """Raised when required LLM configuration or credentials are missing or invalid."""

    def __init__(self, message: str = "LLM provider is not configured properly.") -> None:
        super().__init__(
            message=message,
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            error_code="LLM_CONFIGURATION_ERROR",
            details={"hint": "Ensure GEMINI_API_KEY is configured in your environment or .env file."},
        )


class LLMProviderError(LLMException):
    """Raised when the LLM provider returns an unrecoverable or unexpected error."""

    def __init__(
        self,
        message: str,
        status_code: int = status.HTTP_502_BAD_GATEWAY,
        error_code: str = "LLM_PROVIDER_ERROR",
        details: Any = None,
    ) -> None:
        super().__init__(
            message=message,
            status_code=status_code,
            error_code=error_code,
            details=details,
        )


class LLMTimeoutError(LLMProviderError):
    """Raised when an LLM request exceeds the configured timeout threshold."""

    def __init__(
        self,
        message: str = "LLM provider request timed out.",
        timeout_seconds: float | None = None,
    ) -> None:
        super().__init__(
            message=message,
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            error_code="LLM_TIMEOUT",
            details={"timeout_seconds": timeout_seconds} if timeout_seconds else None,
        )


class LLMRateLimitError(LLMProviderError):
    """Raised when LLM requests exceed provider rate limits or quotas."""

    def __init__(self, message: str = "LLM rate limit or quota exceeded. Please retry later.") -> None:
        super().__init__(
            message=message,
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            error_code="LLM_RATE_LIMIT_EXCEEDED",
        )


class LLMResponseValidationError(LLMException):
    """Raised when LLM output violates domain schema constraints or is malformed."""

    def __init__(self, message: str, details: Any = None) -> None:
        super().__init__(
            message=message,
            status_code=status.HTTP_502_BAD_GATEWAY,
            error_code="LLM_INVALID_RESPONSE",
            details=details,
        )
