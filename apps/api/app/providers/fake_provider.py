"""Deterministic fake LLM provider for automated unit testing.

Enables 100% offline, zero-network verification of application services,
validation pipelines, error handling, and retry logic.
"""

from pydantic import BaseModel
from app.providers.base import LLMProvider, ProviderResponse, TokenUsage


class FakeLLMProvider(LLMProvider):
    """Test double implementing LLMProvider protocol with controllable behavior."""

    def __init__(
        self,
        default_response: str = "Fake generated response",
        model: str = "fake-gemini-model",
        input_tokens: int | None = 100,
        output_tokens: int | None = 50,
        thinking_tokens: int | None = None,
        cached_tokens: int | None = None,
        total_tokens: int | None = None,
        latency_ms: float = 25.0,
        finish_reason: str | None = "STOP",
    ) -> None:
        self.default_response = default_response
        self.model = model
        self.input_tokens = input_tokens
        self.output_tokens = output_tokens
        self.thinking_tokens = thinking_tokens
        self.cached_tokens = cached_tokens
        self.total_tokens = total_tokens
        self.latency_ms = latency_ms
        self.finish_reason = finish_reason

        # Call recording
        self.calls: list[dict] = []

        # Error simulation hooks
        self.next_error: Exception | None = None
        self.transient_errors_remaining: int = 0
        self.transient_error_to_raise: Exception | None = None

    def _build_usage(self) -> TokenUsage:
        tot = self.total_tokens
        if tot is None and self.input_tokens is not None and self.output_tokens is not None:
            tot = self.input_tokens + self.output_tokens + (self.thinking_tokens or 0)

        return TokenUsage(
            input_tokens=self.input_tokens,
            output_tokens=self.output_tokens,
            thinking_tokens=self.thinking_tokens,
            cached_tokens=self.cached_tokens,
            total_tokens=tot,
        )

    def set_transient_failure(self, error: Exception, failure_count: int = 1) -> None:
        """Simulate transient failures that succeed after failure_count attempts."""
        self.transient_error_to_raise = error
        self.transient_errors_remaining = failure_count

    def _handle_simulated_errors(self) -> None:
        if self.next_error is not None:
            err = self.next_error
            self.next_error = None
            raise err

        if self.transient_errors_remaining > 0:
            self.transient_errors_remaining -= 1
            if self.transient_error_to_raise is not None:
                raise self.transient_error_to_raise

    def generate(
        self,
        prompt: str,
        system_instruction: str | None = None,
        temperature: float | None = None,
    ) -> ProviderResponse:
        """Simulate natural language generation."""
        self.calls.append({
            "type": "generate",
            "prompt": prompt,
            "system_instruction": system_instruction,
            "temperature": temperature,
        })
        self._handle_simulated_errors()
        return ProviderResponse(
            content=self.default_response,
            usage=self._build_usage(),
            model=self.model,
            latency_ms=self.latency_ms,
            finish_reason=self.finish_reason,
        )

    def generate_structured(
        self,
        prompt: str,
        response_schema: type[BaseModel],
        system_instruction: str | None = None,
        temperature: float | None = None,
    ) -> ProviderResponse:
        """Simulate structured output generation."""
        self.calls.append({
            "type": "generate_structured",
            "prompt": prompt,
            "response_schema": response_schema,
            "system_instruction": system_instruction,
            "temperature": temperature,
        })
        self._handle_simulated_errors()

        return ProviderResponse(
            content=self.default_response,
            usage=self._build_usage(),
            model=self.model,
            latency_ms=self.latency_ms,
            finish_reason=self.finish_reason,
        )
