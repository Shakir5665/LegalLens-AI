"""Official Gemini API pricing registry and deterministic token cost estimation.

Rates are documented from the official Google Gemini API pricing guide:
Source: https://ai.google.dev/pricing
Effective Date: November 2026
"""

from dataclasses import dataclass
from typing import Final


@dataclass(frozen=True)
class ModelPricing:
    """Documented pricing rates for a specific LLM model tier."""

    model_id: str
    input_cost_per_million: float
    output_cost_per_million: float
    effective_date: str
    cached_cost_per_million: float = 0.03
    source_url: str = "https://ai.google.dev/pricing"

    @property
    def input_cost_per_token(self) -> float:
        """Cost in USD per single non-cached input token."""
        return self.input_cost_per_million / 1_000_000.0

    @property
    def output_cost_per_token(self) -> float:
        """Cost in USD per single output token (including thinking tokens)."""
        return self.output_cost_per_million / 1_000_000.0

    @property
    def cached_cost_per_token(self) -> float:
        """Cost in USD per single cached input token."""
        return self.cached_cost_per_million / 1_000_000.0


# Official Google Gemini API Paid Tier Pricing (as of November 2026)
DEFAULT_PRICING_REGISTRY: Final[dict[str, ModelPricing]] = {
    "gemini-2.5-flash": ModelPricing(
        model_id="gemini-2.5-flash",
        input_cost_per_million=0.30,
        output_cost_per_million=2.50,
        cached_cost_per_million=0.03,
        effective_date="2026-11-01",
    ),
    "gemini-2.0-flash": ModelPricing(
        model_id="gemini-2.0-flash",
        input_cost_per_million=0.10,
        output_cost_per_million=0.40,
        cached_cost_per_million=0.025,
        effective_date="2026-11-01",
    ),
}


def estimate_cost(
    model_id: str,
    input_tokens: int | None,
    output_tokens: int | None,
    thinking_tokens: int | None = None,
    cached_tokens: int | None = None,
    registry: dict[str, ModelPricing] | None = None,
) -> tuple[float | None, str]:
    """Calculate the estimated API cost in USD based on documented pricing.

    Rules:
    - If either input_tokens or output_tokens is None, returns (None, assumption_note)
      because true cost cannot be derived safely from incomplete data.
    - Zero usage (0 tokens) computes deterministically to 0.0 USD.
    - Thinking tokens (such as Gemini 2.5 Flash internal reasoning) are billed as
      part of standard output generation (official Gemini pricing schedule).
    - If cached_tokens are reported, they are billed at the discounted cached input rate.
    - If the model is not found in the registry, returns (None, assumption_note).
    - Always returns a human-readable pricing assumption explanation for auditing.

    Returns:
        tuple[float | None, str]: (estimated_cost_usd, pricing_assumption)
    """
    active_registry = registry or DEFAULT_PRICING_REGISTRY
    pricing = active_registry.get(model_id.lower().strip())

    if pricing is None:
        return (
            None,
            f"No documented pricing rates for model '{model_id}' in registry.",
        )

    if input_tokens is None or output_tokens is None:
        return (
            None,
            f"Incomplete token counts (input={input_tokens}, output={output_tokens}); cost not estimated.",
        )

    if (
        input_tokens < 0
        or output_tokens < 0
        or (thinking_tokens is not None and thinking_tokens < 0)
        or (cached_tokens is not None and cached_tokens < 0)
    ):
        return (
            None,
            f"Invalid negative token counts (input={input_tokens}, output={output_tokens}, thinking={thinking_tokens}).",
        )

    # Input token calculation (accounting for cached tokens if applicable)
    if cached_tokens and cached_tokens > 0:
        cached_count = min(cached_tokens, input_tokens)
        regular_input = input_tokens - cached_count
        input_cost = (regular_input * pricing.input_cost_per_token) + (
            cached_count * pricing.cached_cost_per_token
        )
    else:
        input_cost = input_tokens * pricing.input_cost_per_token

    # Output token calculation: visible output + thinking tokens
    billable_output = output_tokens + (thinking_tokens or 0)
    output_cost = billable_output * pricing.output_cost_per_token

    total_cost = round(input_cost + output_cost, 8)

    thinking_note = f" incl. {thinking_tokens} thinking tokens" if thinking_tokens else ""
    assumption = (
        f"{pricing.model_id} rate (${pricing.input_cost_per_million}/1M in, "
        f"${pricing.output_cost_per_million}/1M out{thinking_note}, effective {pricing.effective_date})"
    )

    return total_cost, assumption
