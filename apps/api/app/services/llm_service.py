"""LLM Domain Application Service for LegalLens AI.

Orchestrates prompt formatting, bounded provider retries, Pydantic response
validation, token pricing calculations, and privacy-safe observability telemetry.
"""

import time
from typing import Any, Callable, TypeVar
import uuid
from pydantic import BaseModel

from app.core.config import Settings, get_settings
from app.core.logging import get_logger
from app.core.pricing import estimate_cost
from app.core.retries import execute_with_retry
from app.prompts.base import PromptTemplate
from app.prompts.legal_prompts import LEGAL_QUERY_ANALYSIS_PROMPT
from app.providers.base import LLMProvider, ProviderResponse
from app.schemas.llm import (
    LegalQueryAnalysisResponse,
    LegalQueryAnalysisResult,
    LLMCallTelemetry,
    validate_structured_response,
)

logger = get_logger("app.services.llm")

T = TypeVar("T", bound=BaseModel)


class LLMService:
    """Domain service orchestrating structured LLM workflows with telemetry."""

    def __init__(
        self,
        provider: LLMProvider,
        settings: Settings | None = None,
        sleep_fn: Callable[[float], None] = time.sleep,
    ) -> None:
        self.provider = provider
        self.settings = settings or get_settings()
        self.sleep_fn = sleep_fn

    def analyze_legal_query(
        self,
        query: str,
        context: str = "",
        correlation_id: str | None = None,
    ) -> LegalQueryAnalysisResponse:
        """Analyze and classify a Sri Lankan legal inquiry into structured dimensions.

        Args:
            query: The user's factual legal question or scenario.
            context: Optional contextual details (e.g. employment industry, prior proceedings).
            correlation_id: Optional client request or trace ID.

        Returns:
            LegalQueryAnalysisResponse: Validated structured analysis and execution telemetry.
        """
        cleaned_query = query.strip()
        if not cleaned_query:
            raise ValueError("Query cannot be empty for legal query analysis.")

        template_kwargs = {
            "user_query": cleaned_query,
            "inquiry_context": context.strip() if context.strip() else "General employment inquiry",
        }

        result, telemetry = self.execute_structured_workflow(
            template=LEGAL_QUERY_ANALYSIS_PROMPT,
            template_kwargs=template_kwargs,
            response_schema=LegalQueryAnalysisResult,
            operation_name="legal_query_analysis",
            correlation_id=correlation_id,
        )

        return LegalQueryAnalysisResponse(
            analysis=result,
            telemetry=telemetry,
        )

    def execute_structured_workflow(
        self,
        template: PromptTemplate,
        template_kwargs: dict[str, Any],
        response_schema: type[T],
        operation_name: str,
        correlation_id: str | None = None,
    ) -> tuple[T, LLMCallTelemetry]:
        """Execute a generalized structured LLM workflow with retries, validation, and telemetry.

        Adheres strictly to privacy rules (ADR-014):
        - Prompts and generated text are never written to logs.
        - Telemetry captures only operational indicators, token counts, and cost estimates.
        """
        cid = correlation_id or str(uuid.uuid4())
        system_instruction, user_prompt = template.render(**template_kwargs)
        start_time = time.perf_counter()

        def _provider_call() -> ProviderResponse:
            return self.provider.generate_structured(
                prompt=user_prompt,
                response_schema=response_schema,
                system_instruction=system_instruction,
            )

        try:
            provider_response, retry_count = execute_with_retry(
                _provider_call,
                max_retries=self.settings.llm_max_retries,
                sleep_fn=self.sleep_fn,
            )

            # Validate model-generated JSON strictly with Pydantic v2
            validated_output = validate_structured_response(
                content=provider_response.content,
                schema=response_schema,
            )

            duration_ms = round((time.perf_counter() - start_time) * 1000.0, 2)
            input_tokens = provider_response.usage.input_tokens
            output_tokens = provider_response.usage.output_tokens
            thinking_tokens = provider_response.usage.thinking_tokens
            cached_tokens = provider_response.usage.cached_tokens
            total_tokens = provider_response.usage.total_tokens

            # Calculate estimated cost using documented pricing registry
            estimated_cost, pricing_assumption = estimate_cost(
                model_id=provider_response.model,
                input_tokens=input_tokens,
                output_tokens=output_tokens,
                thinking_tokens=thinking_tokens,
                cached_tokens=cached_tokens,
            )

            telemetry = LLMCallTelemetry(
                correlation_id=cid,
                model=provider_response.model,
                operation=operation_name,
                duration_ms=duration_ms,
                input_tokens=input_tokens,
                output_tokens=output_tokens,
                thinking_tokens=thinking_tokens,
                cached_tokens=cached_tokens,
                total_tokens=total_tokens,
                estimated_cost_usd=estimated_cost,
                pricing_assumption=pricing_assumption,
                retry_count=retry_count,
                success=True,
                error_category=None,
            )

            # Structured privacy-safe logging (operational indicators only)
            logger.info(
                "LLM call succeeded: correlation_id=%s model=%s op=%s duration_ms=%.1f "
                "tokens(in=%s,out=%s,thinking=%s,total=%s) cost_usd=%s retries=%d",
                cid,
                telemetry.model,
                telemetry.operation,
                telemetry.duration_ms,
                telemetry.input_tokens,
                telemetry.output_tokens,
                telemetry.thinking_tokens,
                telemetry.total_tokens,
                telemetry.estimated_cost_usd,
                telemetry.retry_count,
            )

            return validated_output, telemetry

        except Exception as exc:
            duration_ms = round((time.perf_counter() - start_time) * 1000.0, 2)
            error_cat = getattr(exc, "error_code", exc.__class__.__name__)
            retry_count = getattr(exc, "retry_count", 0)

            failure_telemetry = LLMCallTelemetry(
                correlation_id=cid,
                model=getattr(self.provider, "model", self.settings.gemini_model),
                operation=operation_name,
                duration_ms=duration_ms,
                input_tokens=None,
                output_tokens=None,
                total_tokens=None,
                estimated_cost_usd=None,
                pricing_assumption=None,
                retry_count=retry_count,
                success=False,
                error_category=str(error_cat),
            )

            # Structured failure logging (sanitized error category only; no sensitive data)
            logger.warning(
                "LLM call failed: correlation_id=%s model=%s op=%s duration_ms=%.1f "
                "retries=%d error_category=%s",
                cid,
                failure_telemetry.model,
                failure_telemetry.operation,
                failure_telemetry.duration_ms,
                failure_telemetry.retry_count,
                failure_telemetry.error_category,
            )

            # Attach telemetry to exception instance if possible for caller inspection
            try:
                setattr(exc, "telemetry", failure_telemetry)
            except Exception:
                pass

            raise exc
