"""Gemini LLM Provider implementation using the official Google GenAI SDK.

Isolates all Google GenAI SDK-specific objects, parameters, and error mappings
behind the lightweight LLMProvider protocol (ADR-005, Decision A).
"""

import time
from typing import Any
from google import genai
from google.genai import errors, types
from pydantic import BaseModel
import requests.exceptions

from app.core.config import get_settings
from app.core.llm_errors import (
    LLMConfigurationError,
    LLMProviderError,
    LLMRateLimitError,
    LLMTimeoutError,
)
from app.core.logging import get_logger
from app.providers.base import LLMProvider, ProviderResponse, TokenUsage

logger = get_logger("app.providers.gemini")

_DUMMY_KEY_PLACEHOLDER = "your-gemini-api-key-here"


class GeminiProvider(LLMProvider):
    """Google Gemini implementation of the LLMProvider protocol."""

    def __init__(
        self,
        api_key: str | None = None,
        model: str | None = None,
        timeout_seconds: float | None = None,
        temperature: float | None = None,
    ) -> None:
        settings = get_settings()

        # Resolve credentials securely
        raw_key = api_key if api_key is not None else settings.gemini_api_key
        if not raw_key or not raw_key.strip() or raw_key.strip() == _DUMMY_KEY_PLACEHOLDER:
            raise LLMConfigurationError(
                "Gemini API key is missing or not configured. "
                "Please configure a valid GEMINI_API_KEY in your environment or .env file."
            )

        self.api_key = raw_key.strip()
        self.model = model or settings.gemini_model
        self.timeout_seconds = timeout_seconds or settings.llm_timeout_seconds
        self.default_temperature = temperature or settings.llm_temperature

        # Initialize the official Google GenAI Client with explicit timeout.
        # Note: Google GenAI HttpOptions timeout is passed in milliseconds.
        timeout_ms = int(self.timeout_seconds * 1000)
        self._client = genai.Client(
            api_key=self.api_key,
            http_options=types.HttpOptions(timeout=timeout_ms),
        )

    def generate(
        self,
        prompt: str,
        system_instruction: str | None = None,
        temperature: float | None = None,
    ) -> ProviderResponse:
        """Execute natural language text generation via Gemini."""
        config = types.GenerateContentConfig(
            system_instruction=system_instruction,
            temperature=temperature if temperature is not None else self.default_temperature,
        )
        return self._execute_call(prompt=prompt, config=config)

    def generate_structured(
        self,
        prompt: str,
        response_schema: type[BaseModel],
        system_instruction: str | None = None,
        temperature: float | None = None,
    ) -> ProviderResponse:
        """Execute structured JSON generation conforming to the given Pydantic schema."""
        config = types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=response_schema,
            system_instruction=system_instruction,
            temperature=temperature if temperature is not None else self.default_temperature,
        )
        return self._execute_call(prompt=prompt, config=config)

    def _execute_call(
        self,
        prompt: str,
        config: types.GenerateContentConfig,
    ) -> ProviderResponse:
        """Internal execution helper capturing latency, tokens, and translating errors."""
        start_time = time.perf_counter()

        try:
            response = self._client.models.generate_content(
                model=self.model,
                contents=prompt,
                config=config,
            )
        except requests.exceptions.Timeout as exc:
            raise LLMTimeoutError(
                message=f"Gemini API request timed out after {self.timeout_seconds} seconds.",
                timeout_seconds=self.timeout_seconds,
            ) from exc
        except requests.exceptions.ConnectionError as exc:
            raise LLMProviderError(
                message="Network connection to Gemini API failed.",
                details={"cause": "connection_error"},
            ) from exc
        except errors.APIError as exc:
            self._handle_api_error(exc)
        except Exception as exc:
            logger.exception("Unexpected exception in Gemini provider call")
            raise LLMProviderError(
                message="An unexpected error occurred during Gemini model execution.",
                details={"error_type": exc.__class__.__name__},
            ) from exc

        duration_ms = (time.perf_counter() - start_time) * 1000.0

        # Extract provider token usage metadata
        usage = TokenUsage()
        if hasattr(response, "usage_metadata") and response.usage_metadata:
            um = response.usage_metadata
            in_tok = getattr(um, "prompt_token_count", None)
            out_tok = getattr(um, "candidates_token_count", None)
            tot_tok = getattr(um, "total_token_count", None)
            cached_tok = getattr(um, "cached_content_token_count", None)

            # Check if thoughts_token_count is explicitly exposed as an integer
            thinking_tok = getattr(um, "thoughts_token_count", None)
            if not isinstance(thinking_tok, int):
                thinking_tok = getattr(um, "thoughtsTokenCount", None)
            if not isinstance(thinking_tok, int):
                thinking_tok = None

            # If not explicitly exposed as an attribute in this SDK version,
            # but total_token_count exceeds (prompt_token_count + candidates_token_count),
            # the delta represents internal reasoning/thinking tokens
            if thinking_tok is None and tot_tok is not None and in_tok is not None and out_tok is not None:
                delta = tot_tok - (in_tok + out_tok)
                if delta > 0:
                    thinking_tok = delta

            usage = TokenUsage(
                input_tokens=in_tok,
                output_tokens=out_tok,
                thinking_tokens=thinking_tok,
                cached_tokens=cached_tok,
                total_tokens=tot_tok,
            )

        # Extract finish reason
        finish_reason: str | None = None
        if hasattr(response, "candidates") and response.candidates:
            first_candidate = response.candidates[0]
            if hasattr(first_candidate, "finish_reason") and first_candidate.finish_reason:
                finish_reason = str(first_candidate.finish_reason)

        content_text = response.text or ""

        return ProviderResponse(
            content=content_text,
            usage=usage,
            model=self.model,
            latency_ms=duration_ms,
            finish_reason=finish_reason,
        )

    def _handle_api_error(self, exc: errors.APIError) -> None:
        """Translate Google GenAI SDK APIError into application domain exceptions."""
        code = getattr(exc, "code", None)
        message = getattr(exc, "message", str(exc))

        if code in (401, 403) or (code == 400 and "API key not valid" in message):
            raise LLMConfigurationError(
                message="Gemini API authentication failed. Verify that GEMINI_API_KEY is valid."
            ) from exc

        if code == 429:
            raise LLMRateLimitError(
                message="Gemini API rate limit or quota exceeded."
            ) from exc

        if code in (503, 504):
            raise LLMProviderError(
                message=f"Gemini API service temporarily unavailable (HTTP {code}).",
                details={"status_code": code},
            ) from exc

        raise LLMProviderError(
            message=f"Gemini API request failed with status HTTP {code}.",
            details={"status_code": code, "error_message": message},
        ) from exc
