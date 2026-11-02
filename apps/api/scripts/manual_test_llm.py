"""Manual developer testing script for real Google Gemini API integration.

Invokes the production LLMService using real GeminiProvider credentials and
observes the structured legal query analysis and telemetry.

Usage:
    # From repository root (with virtual environment activated):
    python apps/api/scripts/manual_test_llm.py

    # Or pass a custom query:
    python apps/api/scripts/manual_test_llm.py --query "Your query here" --context "Optional context"
"""

import argparse
import json
from pathlib import Path
import sys
import uuid

# Ensure apps/api directory is on sys.path so 'app' package resolves cleanly
API_DIR = Path(__file__).resolve().parent.parent
if str(API_DIR) not in sys.path:
    sys.path.insert(0, str(API_DIR))

from app.core.config import get_settings
from app.core.llm_errors import (
    LLMConfigurationError,
    LLMProviderError,
    LLMRateLimitError,
    LLMResponseValidationError,
    LLMTimeoutError,
)
from app.providers.gemini_provider import GeminiProvider
from app.services.llm_service import LLMService

DEFAULT_SAMPLE_QUERY = (
    "A commercial clerk with 6 years of continuous service was terminated immediately "
    "without any prior notice, compensation, or formal inquiry. The employer claims closure "
    "of a specific department. What statutory procedures and relief apply under Sri Lankan law?"
)
DEFAULT_SAMPLE_CONTEXT = "Private commercial enterprise in Colombo, scheduled employment, 25 total workmen."


def run_manual_test(query: str, context: str) -> int:
    """Execute live Gemini LLMService inquiry and print results."""
    print("=" * 72)
    print("  LEGAL LENS AI — MANUAL LLM SERVICE INTEGRATION TEST (PHASE 2)")
    print("=" * 72)
    print("\n[!] WARNING: This script makes a live API call to Google Gemini.")
    print("    Standard per-token billing will apply against your Google GenAI quota.\n")

    settings = get_settings()

    print("[*] Active Configuration:")
    print(f"    - Model Identifier   : {settings.gemini_model}")
    print(f"    - Timeout Threshold  : {settings.llm_timeout_seconds}s")
    print(f"    - Max Retries        : {settings.llm_max_retries} attempts")
    print(f"    - Temperature        : {settings.llm_temperature}")
    print(f"    - API Key Configured : {'Yes (Protected)' if (settings.gemini_api_key and settings.gemini_api_key != 'your-gemini-api-key-here') else 'NO / PLACEHOLDER'}")

    print("\n[*] Input Legal Inquiry:")
    print(f"    - Query   : {query}")
    print(f"    - Context : {context}")

    correlation_id = f"manual-test-{uuid.uuid4().hex[:8]}"
    print(f"\n[*] Initiating LLMService request (Correlation ID: {correlation_id})...")

    try:
        # Initialize production GeminiProvider with environment credentials
        provider = GeminiProvider(
            api_key=settings.gemini_api_key,
            model=settings.gemini_model,
            timeout_seconds=settings.llm_timeout_seconds,
            temperature=settings.llm_temperature,
        )

        # Initialize domain LLMService
        service = LLMService(provider=provider, settings=settings)

        # Execute structured analysis workflow
        response = service.analyze_legal_query(
            query=query,
            context=context,
            correlation_id=correlation_id,
        )

    except LLMConfigurationError as exc:
        print("\n[X] CONFIGURATION ERROR:")
        print(f"    {exc.message}")
        print("    Remediation:")
        print("    Set your real Gemini API key in your environment or apps/api/.env:")
        print("    PowerShell: $env:GEMINI_API_KEY=\"your_actual_key_here\"")
        return 1

    except LLMTimeoutError as exc:
        print("\n[X] TIMEOUT ERROR:")
        print(f"    The request timed out after {settings.llm_timeout_seconds}s: {exc.message}")
        return 1

    except LLMRateLimitError as exc:
        print("\n[X] RATE LIMIT / QUOTA EXCEEDED:")
        print(f"    Provider rate limit or quota exhausted: {exc.message}")
        return 1

    except LLMResponseValidationError as exc:
        print("\n[X] PYDANTIC VALIDATION ERROR:")
        print(f"    Model output failed Pydantic schema constraints: {exc.message}")
        if exc.details:
            print("    Validation details:")
            print(json.dumps(exc.details, indent=6))
        return 1

    except LLMProviderError as exc:
        print("\n[X] PROVIDER ERROR:")
        print(f"    Gemini provider returned error: {exc.message}")
        if exc.details:
            print("    Diagnostic details:")
            print(json.dumps(exc.details, indent=6))
        return 1

    except Exception as exc:
        print(f"\n[X] UNEXPECTED SYSTEM ERROR: {exc.__class__.__name__}: {exc}")
        return 1

    # Print validated domain analysis
    print("\n" + "-" * 72)
    print("  [✓] VALIDATED STRUCTURED ANALYSIS (Pydantic LegalQueryAnalysisResult)")
    print("-" * 72)
    print(response.analysis.model_dump_json(indent=2))

    # Print structured telemetry metadata
    telemetry = response.telemetry
    print("\n" + "-" * 72)
    print("  [✓] MODEL-CALL TELEMETRY (LLMCallTelemetry)")
    print("-" * 72)
    print(f"  • Correlation ID     : {telemetry.correlation_id}")
    print(f"  • Model Used         : {telemetry.model}")
    print(f"  • Operation          : {telemetry.operation}")
    print(f"  • Execution Latency  : {telemetry.duration_ms:.2f} ms ({telemetry.duration_ms / 1000.0:.2f} s)")
    print(f"  • Input Tokens       : {telemetry.input_tokens if telemetry.input_tokens is not None else 'Unavailable'}")
    print(f"  • Output Tokens      : {telemetry.output_tokens if telemetry.output_tokens is not None else 'Unavailable'}")
    print(f"  • Thinking Tokens    : {telemetry.thinking_tokens if telemetry.thinking_tokens is not None else '0 / None'}")
    if telemetry.cached_tokens:
        print(f"  • Cached Tokens      : {telemetry.cached_tokens}")
    print(f"  • Total Tokens       : {telemetry.total_tokens if telemetry.total_tokens is not None else 'Unavailable'}")
    print(f"  • Estimated Cost     : ${telemetry.estimated_cost_usd:.8f} USD" if telemetry.estimated_cost_usd is not None else "  • Estimated Cost     : Unavailable")
    print(f"  • Pricing Assumption : {telemetry.pricing_assumption or 'N/A'}")
    print(f"  • Retry Count        : {telemetry.retry_count}")
    print(f"  • Call Status        : {'SUCCESS' if telemetry.success else 'FAILED'}")
    print(f"  • Error Category     : {telemetry.error_category or 'None'}")
    print("=" * 72)
    print("  MANUAL TEST COMPLETED SUCCESSFULLY")
    print("=" * 72)

    return 0


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Manual Developer Test for LegalLens AI Gemini LLM Service"
    )
    parser.add_argument(
        "--query",
        type=str,
        default=DEFAULT_SAMPLE_QUERY,
        help="Sample legal query to analyze",
    )
    parser.add_argument(
        "--context",
        type=str,
        default=DEFAULT_SAMPLE_CONTEXT,
        help="Optional legal or factual context",
    )
    args = parser.parse_args()

    sys.exit(run_manual_test(query=args.query, context=args.context))


if __name__ == "__main__":
    main()
