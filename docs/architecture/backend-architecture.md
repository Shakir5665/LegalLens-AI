# LegalLens AI — Backend Architecture & Engineering Guide

**Module:** `apps/api`  
**Runtime:** Python 3.12.10 | FastAPI | Pydantic v2 | Google GenAI SDK (`google-genai==1.2.0`)  
**Status:** Phase 2 Complete (LLM Engineering)  
**Last Updated:** 3 November 2026

---

## 1. Overview & Architectural Boundaries

The LegalLens AI backend is designed as a **Modular Monolith** ([ADR-001](file:///C:/Users/shaki/Desktop/LegalLense/docs/decisions/architecture-decisions.md#adr-001-use-a-modular-monolithic-backend)) executed within a single Python runtime ([ADR-013](file:///C:/Users/shaki/Desktop/LegalLense/docs/decisions/architecture-decisions.md#adr-013-select-python-312-as-the-core-backend-runtime)).

Phase 1 (Backend Engineering Fundamentals) and Phase 2 (LLM Engineering) establish the foundational backend services, data modeling, error handling, and Gemini-powered LLM capabilities:
- **Centralized Configuration:** Type-safe settings loaded from `.env` via `pydantic-settings` with singleton caching (`gemini_model`, timeouts, retries, temperature).
- **Domain-Driven Error Hierarchy:** Uniform, sanitized error responses inheriting from `AppException` and `LLMException` with traceback masking.
- **Strict Data Validation:** Typed Pydantic v2 schemas for HTTP transport and structured LLM JSON outputs.
- **Decoupled Architecture:** Provider abstraction (`LLMProvider` Protocol), Prompt templates (`PromptTemplate`), and application services (`LLMService`, `LegalSourceService`).
- **Resilient Model Invocation:** Bounded retries with exponential backoff and jitter (`execute_with_retry`), `Retry-After` header respect, and strict 30s timeouts.
- **Deterministic Token Accounting:** Full capture of input, output, and native Gemini 2.5 Flash thinking tokens (`thoughtsTokenCount`) with mathematical cost estimation ($0.30/1M in, $2.50/1M out).
- **Privacy-Safe Telemetry:** Structured model-call logging compliant with [ADR-014](file:///C:/Users/shaki/Desktop/LegalLense/docs/decisions/architecture-decisions.md#adr-014-maintain-public-repository-with-strict-credential-isolation) (no prompts, document text, or secrets in logs).
- **100% Deterministic Testing:** 73 automated pytest tests (72 passed, 1 skipped offline integration test; 0 failed) with zero regression on Phase 1 tests.

---

## 2. Directory Structure & Responsibilities

```text
apps/api/
├── app/
│   ├── api/                     # HTTP transport & routing layer
│   │   ├── deps.py              # Reusable FastAPI dependency injection (Settings, Services, Providers)
│   │   ├── routes/              # Route endpoints grouped by domain resource
│   │   │   ├── health.py        # /health and /api/v1/health endpoints
│   │   │   └── sources.py       # /api/v1/sources (Sri Lankan legal source catalog)
│   │   └── v1/
│   │       └── router.py        # Centralized v1 router aggregating all domain sub-routers
│   ├── core/                    # Foundational utilities & cross-cutting concerns
│   │   ├── config.py            # Pydantic Settings loading and caching from .env
│   │   ├── errors.py            # Custom exceptions, handlers, and uniform ErrorResponse
│   │   ├── llm_errors.py        # LLM exception hierarchy (timeout, rate limit, validation)
│   │   ├── logging.py           # Standard Python logging configuration
│   │   ├── pricing.py           # Documented Gemini pricing rates & cost estimator
│   │   └── retries.py           # Bounded retry engine with exponential backoff & jitter
│   ├── db/                      # Database placeholders (preserved for Phase 3 PostgreSQL/pgvector)
│   ├── prompts/                 # Prompt management & templating
│   │   ├── base.py              # Reusable PromptTemplate abstraction
│   │   └── legal_prompts.py     # Authoritative legal query analysis prompt (v1.0.0)
│   ├── providers/               # LLM Provider abstraction & implementations
│   │   ├── base.py              # LLMProvider Protocol, TokenUsage, ProviderResponse
│   │   ├── fake_provider.py     # Deterministic fake provider for offline testing
│   │   └── gemini_provider.py   # Official Google GenAI SDK implementation
│   ├── schemas/                 # Data validation and serialization models (Pydantic v2)
│   │   ├── health.py            # HealthResponse and SystemStatusResponse schemas
│   │   ├── legal_source.py      # LegalSource, Authenticity, and Reference validation models
│   │   └── llm.py               # LLMCallTelemetry, structured outputs, validation helper
│   ├── services/                # Business logic decoupled from transport/framework
│   │   ├── legal_source_service.py # Sri Lankan legal source catalog and reference checks
│   │   └── llm_service.py       # LLM orchestration, structured workflow, telemetry logging
│   └── main.py                  # FastAPI application entrypoint and router mounting
├── scripts/
│   └── manual_test_llm.py       # Developer-only CLI script for real Gemini API integration testing
├── tests/                       # Automated pytest suite (72 passed, 1 skipped)
│   ├── conftest.py              # TestClient fixtures and setup
│   ├── test_config.py           # Configuration loading and singleton caching tests
│   ├── test_dependencies.py     # FastAPI dependency injection & override tests
│   ├── test_error_handling.py   # Uniform error response and traceback masking tests
│   ├── test_health_api.py       # Health and system status endpoint tests
│   ├── test_llm_config_and_pricing.py # Model settings, pricing registry, and telemetry tests
│   ├── test_llm_provider.py     # Provider protocol, GeminiProvider, and FakeLLMProvider tests
│   ├── test_llm_retries_and_errors.py # Retry engine, backoff, and transient error classification tests
│   ├── test_llm_service.py      # LLMService lifecycle, recovery, failure telemetry, and privacy tests
│   ├── test_llm_validation.py   # Prompt rendering, Pydantic schema validation, and error tests
│   ├── test_schemas.py          # Pydantic model validation and boundary constraint tests
│   └── test_sources_api.py      # REST endpoint functionality and HTTP status tests
├── .env                         # Local environment settings (sanitized, git-ignored)
├── .env.example                 # Environment template with dummy placeholders
├── pytest.ini                   # Pytest configuration for apps/api
└── requirements.txt             # Pinned Python dependencies (including google-genai)
```

---

## 3. Lifecycles & Sequence Workflows

### 3.1 HTTP Request Lifecycle (Phase 1)

```mermaid
sequenceDiagram
    autonumber
    actor Client
    participant Main as FastAPI (main.py)
    participant Middleware as Error Middleware
    participant Router as API Router (/api/v1)
    participant Deps as Dependency Injection (deps.py)
    participant Service as Domain Service (services/)
    participant Handler as Exception Handlers (errors.py)

    Client->>Main: HTTP Request (e.g. POST /api/v1/sources/validate-reference)
    Main->>Middleware: Pass through middleware stack
    Middleware->>Router: Match route & validate JSON against Pydantic schema
    alt Request Payload Fails Validation
        Router-->>Handler: RequestValidationError
        Handler-->>Client: 422 Unprocessable Entity (Uniform ErrorResponse)
    else Request Valid
        Router->>Deps: Resolve dependencies (Settings, Service, Request ID)
        Deps->>Service: Call domain method (validate_reference)
        alt Business Resource Missing
            Service-->>Handler: EntityNotFoundException
            Handler-->>Client: 404 Not Found (Uniform ErrorResponse)
        else Unexpected Crash
            Service-->>Middleware: Unhandled Exception
            Middleware-->>Client: 500 Internal Server Error (Sanitized ErrorResponse)
        else Success
            Service-->>Router: Validated Domain Result
            Router-->>Client: 200 OK + JSON Response Model
        end
    end
```

### 3.2 LLM Service & Model Execution Lifecycle (Phase 2)

```mermaid
sequenceDiagram
    autonumber
    actor Caller as Service Caller / Script
    participant LLMService as LLMService (services/llm_service.py)
    participant Prompt as PromptTemplate (prompts/legal_prompts.py)
    participant Retries as execute_with_retry (core/retries.py)
    participant Provider as GeminiProvider (providers/gemini_provider.py)
    participant GenAI as Google GenAI Client (google.genai)
    participant GeminiAPI as Gemini 2.5 Flash API
    participant Validation as validate_structured_response (schemas/llm.py)
    participant Pricing as estimate_cost (core/pricing.py)

    Caller->>LLMService: analyze_legal_query(user_query, correlation_id)
    LLMService->>Prompt: render(user_query=user_query)
    Prompt-->>LLMService: Rendered Prompt String (System Instructions + User Text)

    LLMService->>Retries: execute_with_retry(operation, max_retries=2, base_delay=1.0)
    loop Up to 3 attempts (initial + 2 retries) on transient errors
        Retries->>Provider: generate_structured(prompt, schema=LegalQueryAnalysisResult, temperature=0.2)
        Provider->>GenAI: models.generate_content(model="gemini-2.5-flash", contents=prompt, config=...)
        GenAI->>GeminiAPI: HTTPS POST /v1beta/models/gemini-2.5-flash:generateContent
        alt Transient Failure (429 / 503 / Timeout)
            GeminiAPI-->>GenAI: HTTP 429 / 503 / Timeout
            GenAI-->>Provider: APIError / Timeout
            Provider-->>Retries: LLMRateLimitError / LLMTimeoutError (Retryable)
            Retries->>Retries: sleep(delay = 2^attempt + jitter)
        else Non-Retryable Error (401 / 400)
            GeminiAPI-->>GenAI: HTTP 401 Unauthorized
            GenAI-->>Provider: APIError (401)
            Provider-->>Retries: LLMProviderError (Non-retryable)
            Retries-->>LLMService: Fail immediately (No retries)
        else Success
            GeminiAPI-->>GenAI: HTTP 200 OK (JSON text + usage_metadata with thoughtsTokenCount)
            GenAI-->>Provider: GenerateContentResponse
            Provider->>Provider: Extract text, input/output/thinking tokens
            Provider-->>Retries: ProviderResponse(text, TokenUsage)
            Retries-->>LLMService: ProviderResponse(text, TokenUsage)
        end
    end

    LLMService->>Validation: validate_structured_response(response.text, LegalQueryAnalysisResult)
    alt Malformed JSON or Missing Required Fields
        Validation-->>LLMService: LLMResponseValidationError
        LLMService->>LLMService: Log sanitized telemetry (status="failed")
        LLMService-->>Caller: Raise LLMResponseValidationError (HTTP 502)
    else Validation Successful
        Validation-->>LLMService: LegalQueryAnalysisResult (Typed Pydantic Model)
    end

    LLMService->>Pricing: estimate_cost(model="gemini-2.5-flash", usage=TokenUsage)
    Pricing-->>LLMService: Estimated Cost (USD)

    LLMService->>LLMService: Construct LLMCallTelemetry (correlation_id, latency, tokens, cost, retries)
    LLMService->>LLMService: Privacy-safe logging (ADR-014: no prompt text, no secrets)
    LLMService-->>Caller: (LegalQueryAnalysisResult, LLMCallTelemetry)
```

---

## 4. LLM Engineering Architecture (Phase 2 Core)

### 4.1 Provider Abstraction Layer

The provider abstraction decouples application logic from vendor SDK internals using a lightweight Python Protocol ([ADR-001](file:///C:/Users/shaki/Desktop/LegalLense/docs/decisions/architecture-decisions.md#adr-001-use-a-modular-monolithic-backend)):

```python
# apps/api/app/providers/base.py
@runtime_checkable
class LLMProvider(Protocol):
    def generate(self, prompt: str, temperature: float = 0.2) -> ProviderResponse: ...
    def generate_structured(
        self, prompt: str, response_schema: type[T], temperature: float = 0.2
    ) -> ProviderResponse: ...
```

#### TokenUsage & Thinking-Token Accounting
Gemini 2.5 Flash is a native reasoning model that generates internal reasoning tokens (`thoughtsTokenCount`) in addition to candidate output tokens (`candidatesTokenCount`).

```python
# apps/api/app/providers/base.py
@dataclass(frozen=True)
class TokenUsage:
    input_tokens: int | None
    output_tokens: int | None
    thinking_tokens: int | None
    total_tokens: int | None
```

- **Extraction Logic:** In `GeminiProvider`, `input_tokens` is read from `prompt_token_count`, `output_tokens` from `candidates_token_count`, and `thinking_tokens` from `thoughts_token_count`.
- **Discrepancy Resolution:** If `thoughts_token_count` is omitted but `total_tokens > input_tokens + output_tokens`, the difference is assigned to `thinking_tokens`.
- **Missing Data:** If usage metadata is unavailable, values remain `None` rather than assuming false zeros.

#### GeminiProvider (`apps/api/app/providers/gemini_provider.py`)
- Sourced exclusively through `google-genai` SDK (`google.genai.Client`).
- Translates floating-point seconds into integer milliseconds for `HttpOptions(timeout=int(timeout_seconds * 1000))`.
- Catches SDK-specific exceptions (`google.genai.errors.APIError`) and maps them to domain exceptions (`LLMRateLimitError`, `LLMTimeoutError`, `LLMProviderError`).

#### FakeLLMProvider (`apps/api/app/providers/fake_provider.py`)
- Provides deterministic, zero-network test double for unit testing.
- Features controllable canned responses, custom token usage, call tracking, and transient error simulation (`simulate_transient_failures`).

### 4.2 Prompt Engineering Architecture

Prompts are managed through the immutable `PromptTemplate` class (`apps/api/app/prompts/base.py`), enforcing complete separation between static system instructions and dynamic user inputs:

```python
# apps/api/app/prompts/base.py
@dataclass(frozen=True)
class PromptTemplate:
    template: str
    version: str
    system_instruction: str = ""
    def render(self, **kwargs: Any) -> str: ...
```

#### Legal Query Analysis Prompt (`LEGAL_QUERY_ANALYSIS_PROMPT`, v1.0.0)
Located in `apps/api/app/prompts/legal_prompts.py`, this prompt guides the model to analyze Sri Lankan employment law inquiries with explicit anti-hallucination guardrails:
1. Identify primary legal domain and sub-domains.
2. Formulate 1–4 specific legal issues.
3. Suggest potential statutory references strictly from Sri Lankan law (e.g., *Industrial Disputes Act*, *TEWA 1971*, *Payment of Gratuity Act 1983*).
4. Assess urgency level (`low`, `medium`, `high`, `critical`).
5. **Guardrail:** Strictly forbids generating unsupported legal conclusions, speculative factual claims, or non-existent statutory sections.

### 4.3 Structured Output Generation & Pydantic Validation

Structured JSON generation is enforced at the model level via `response_mime_type="application/json"` and `response_schema` in `GenerateContentConfig`.

#### Schema Compiler Constraints for Gemini OpenAPI
Google GenAI SDK compiles Pydantic models into OpenAPI schemas via `types.Schema`. To prevent compiler exceptions:
1. **No Defaults:** All fields must be explicitly required (`Field(...)`). The Gemini schema compiler rejects models with default values (`ValueError: Default value is not supported in the response schema`).
2. **No `extra="forbid"`:** Pydantic's `extra="forbid"` injects `additionalProperties: False`, which Google GenAI rejects. Models use `ConfigDict(frozen=True)` without `extra="forbid"`.

#### Output Validation Helper (`validate_structured_response`)
Located in `apps/api/app/schemas/llm.py`, this helper treats raw LLM output as untrusted text:
- Validates via Pydantic v2 `schema.model_validate_json(raw_text)`.
- Distinguishes syntax errors (`json_invalid`) from schema structure errors.
- Raises `LLMResponseValidationError` (HTTP 502) on validation failure.

### 4.4 Fault Tolerance: Bounded Retries & Timeouts

The retry utility `execute_with_retry()` (`apps/api/app/core/retries.py`) enforces strict boundaries:
- **Retry Budget:** `llm_max_retries=2` allows 2 retries after the initial attempt (up to 3 total attempts).
- **Exponential Backoff with Jitter:**
  $$\text{delay} = \min(\text{max\_delay}, \text{base\_delay} \times 2^{\text{attempt}} + \text{random\_jitter})$$
- **Transient Error Classification:**
  - *Retryable:* `LLMTimeoutError`, `LLMRateLimitError`, transient HTTP 502/503/504 errors, network connection failures.
  - *Non-Retryable (Fail Fast):* `LLMConfigurationError`, authentication errors (HTTP 401/403), client request errors (HTTP 400), and `LLMResponseValidationError`.
- **Provider Delay Awareness:** Honors upstream `Retry-After` headers where provided, bounded by a safe upper limit (60s).
- **Test Speed:** Injectable `sleep_fn` parameter allows unit tests to execute backoff logic instantly with zero real sleep.

### 4.5 Pricing Registry & Cost Estimation

LegalLens AI implements deterministic, centrally configured token cost estimation in `apps/api/app/core/pricing.py`.

#### Documented Rate Card (Google Gemini Paid Tier — Effective November 2026)
| Model | Input Rate (per 1M tokens) | Output Rate (per 1M tokens) | Thinking Rate (per 1M tokens) |
| :--- | :---: | :---: | :---: |
| `gemini-2.5-flash` | **$0.30** ($0.00000030/tok) | **$2.50** ($0.00000250/tok) | **$2.50** ($0.00000250/tok) |
| `gemini-2.0-flash` | **$0.10** ($0.00000010/tok) | **$0.40** ($0.00000040/tok) | N/A |
| `gemini-1.5-flash` | **$0.075** ($0.000000075/tok) | **$0.30** ($0.00000030/tok) | N/A |
| `gemini-1.5-pro` | **$1.25** ($0.00000125/tok) | **$5.00** ($0.00000500/tok) | N/A |

#### Cost Formulation
$$\text{Cost} = (\text{Input Tokens} \times \text{Input Rate}) + ((\text{Candidate Tokens} + \text{Thinking Tokens}) \times \text{Output Rate})$$

> [!NOTE]
> Thinking tokens generated by Gemini 2.5 Flash are billed at the standard output rate according to Google Cloud terms. If `total_tokens` is reported and exceeds the sum of input and candidate tokens, the remainder is counted as billable output.

### 4.6 Exception Hierarchy

All application exceptions inherit from `AppException` (`apps/api/app/core/errors.py`), providing consistent HTTP status codes and error responses:

```text
AppException (HTTP status code, message, error_code)
├── EntityNotFoundException (404)
├── ValidationException (422)
└── LLMException (500)
    ├── LLMConfigurationError (500)
    ├── LLMProviderError (502)
    ├── LLMTimeoutError (504)
    ├── LLMRateLimitError (429)
    └── LLMResponseValidationError (502)
```

### 4.7 Observability & Telemetry Architecture

LegalLens AI adopts a staged observability roadmap:
- **Phase 2 (Completed):** Model-call telemetry. Per-call metadata is captured via immutable `LLMCallTelemetry` records and logged via standard Python logging.
- **Phase 7 (Planned):** Agent & workflow observability (LangGraph step traces, node transitions, checkpointing).
- **Phase 9 (Planned):** Advanced observability & Harness Engineering (runtime budgets, cost caps, execution audits).

#### Privacy-Safe Operational Logging ([ADR-014](file:///C:/Users/shaki/Desktop/LegalLense/docs/decisions/architecture-decisions.md#adr-014-maintain-public-repository-with-strict-credential-isolation))
Logs emit structured operational metrics but strictly forbid sensitive user inputs:
- **Logged:** Correlation ID, model name, provider, latency (seconds), input tokens, output tokens, thinking tokens, total tokens, estimated cost (USD), retry count, success status, and sanitized error categories.
- **Forbidden from Logs:** Raw prompt text, user queries, full model responses, legal document contents, API keys, or provider authorization headers.

### 4.8 FastAPI Dependency Injection

FastAPI dependency injection in `apps/api/app/api/deps.py` provides clean provider and service lifecycles:

```python
# apps/api/app/api/deps.py
def get_llm_provider(settings: Annotated[Settings, Depends(get_settings)]) -> LLMProvider:
    return GeminiProvider(
        api_key=settings.gemini_api_key,
        model=settings.gemini_model,
        timeout_seconds=settings.llm_timeout_seconds,
    )

def get_llm_service(
    provider: Annotated[LLMProvider, Depends(get_llm_provider)],
    settings: Annotated[Settings, Depends(get_settings)],
) -> LLMService:
    return LLMService(
        provider=provider,
        max_retries=settings.llm_max_retries,
        default_temperature=settings.llm_temperature,
    )
```

---

## 5. Developer Manual Integration Testing & Live Verification

To verify the Gemini integration without creating premature public API endpoints, a developer-only CLI script is provided.

### 5.1 Manual Testing Script (`apps/api/scripts/manual_test_llm.py`)

Run the script from the repository root:

```powershell
# Windows PowerShell
$env:GEMINI_API_KEY="your-gemini-api-key"
.\venv\Scripts\python.exe apps/api/scripts/manual_test_llm.py --query "My employer terminated me without notice after 5 years. Is this legal?"
```

Supported options:
- `--query`: The legal research inquiry text to analyze.
- `--model`: Override the model name (default: `gemini-2.5-flash`).
- `--temperature`: Override generation temperature (default: `0.2`).
- `--dry-run`: Use `FakeLLMProvider` offline without network calls or API credentials.

### 5.2 Real-World Live Verification Records

Two live end-to-end executions were performed against Google Gemini 2.5 Flash:

| Metric | Live Execution 1 | Live Execution 2 | Analysis & Explanation |
| :--- | :--- | :--- | :--- |
| **Model** | `gemini-2.5-flash` | `gemini-2.5-flash` | Configured default model |
| **Input Tokens** | 319 | 319 | Stable prompt template + user query |
| **Candidate Output Tokens** | 248 | 229 | Visible structured JSON response text |
| **Thinking Tokens** | 451 | 1,084 | Internal reasoning tokens (`thoughtsTokenCount`) |
| **Total Tokens** | 1,018 | 1,632 | Exact aggregate reported by Gemini API |
| **Total Billable Output** | 699 tokens | 1,313 tokens | Candidate tokens + Thinking tokens |
| **Estimated Cost (USD)** | **$0.00184320** | **$0.00337820** | Formula: $(319 \times \$0.30 + \text{Output} \times \$2.50) / 10^6$ |
| **Roundtrip Latency** | 5.57 seconds | 7.96 seconds | Network latency + reasoning + generation |
| **Retry Count** | 0 | 0 | First-attempt success on both executions |
| **Pydantic Validation** | **PASSED** | **PASSED** | Successfully validated into `LegalQueryAnalysisResult` |

#### Understanding the Token Discrepancy & Reasoning Tokens
During live testing, initial observation showed prompt tokens (319) + candidate tokens (248) = 567 tokens, yet total tokens was reported as 1,018. Investigation revealed that **Gemini 2.5 Flash generates internal reasoning thoughts** prior to emitting structured output. The Google GenAI SDK returns these under `usage_metadata.thoughts_token_count` (451 tokens in Run 1; 1,084 tokens in Run 2). The sum $(319 + 248 + 451 = 1,018)$ accounts for 100% of the reported tokens.

> [!IMPORTANT]
> **Cost Accounting Clarification:** All reported costs are mathematical estimates derived from official rate cards ($0.30/1M input, $2.50/1M output/thinking effective November 2026). They do not represent official Google Cloud invoice statements. Live calls were performed strictly for verification; offline automated test suites use `FakeLLMProvider` and remain 100% decoupled from external network availability.

---

## 6. Implemented Endpoints (HTTP Transport)

| Method | Endpoint | Description | Status Codes | Response Model |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/health` | Unversioned operational liveness check | `200` | `{"status": "healthy"}` |
| `GET` | `/api/v1/health` | Versioned system diagnostics & metadata | `200` | `SystemStatusResponse` |
| `GET` | `/api/v1/sources` | List authoritative Sri Lankan legal sources (optional `?category=` filter) | `200` | `LegalSourceListResponse` |
| `GET` | `/api/v1/sources/{source_id}` | Retrieve specific legal source by slug | `200`, `404` | `LegalSourceResponse` |
| `POST` | `/api/v1/sources/validate-reference` | Validate statutory section reference format | `200`, `404`, `422` | `StatuteReferenceValidationResponse` |
| `GET` | `/docs` | Interactive Swagger / OpenAPI documentation | `200` | HTML UI |
| `GET` | `/redoc` | Interactive ReDoc documentation | `200` | HTML UI |

---

## 7. Setup & Execution Commands

### 7.1 Environment Activation
From repository root:
```powershell
.\venv\Scripts\Activate.ps1
python --version   # Must be Python 3.12.x
```

### 7.2 Running Automated Tests
```powershell
.\venv\Scripts\python.exe -m pytest -v
```
Expected output:
```text
======================== 72 passed, 1 skipped in 0.28s ========================
```

### 7.3 Running the Development Server
```powershell
.\venv\Scripts\uvicorn.exe app.main:app --app-dir apps/api --reload --port 8000
```

### 7.4 Running the Manual LLM Test Script
```powershell
$env:GEMINI_API_KEY="your-api-key"
.\venv\Scripts\python.exe apps/api/scripts/manual_test_llm.py --query "Unfair dismissal claim under TEWA"
```

---

## 8. Important Architectural Decisions & Trade-offs

1. **Pure Standard Library Logging:** We utilized standard Python `logging` with structured formatting instead of introducing heavyweight external logging frameworks (`loguru`, `structlog`).
2. **Pydantic Settings with Singleton Caching:** Configuration is validated via `pydantic-settings` and memoized with `@lru_cache`, ensuring zero parsing overhead per request.
3. **Traceback Masking Middleware:** To enforce [ADR-014](file:///C:/Users/shaki/Desktop/LegalLense/docs/decisions/architecture-decisions.md#adr-014-maintain-public-repository-with-strict-credential-isolation), unhandled 500 errors are trapped by an outer HTTP middleware and sanitized into `ErrorResponse`.
4. **Single-Provider Architecture with Protocol:** In adherence to Phase 2 guidelines, we integrated Gemini exclusively via `GeminiProvider` while maintaining a lightweight `LLMProvider` Protocol, intentionally avoiding premature multi-provider complexity.
5. **Strict Pydantic v2 Output Validation:** Model output is treated as untrusted text. We parse and validate via `model_validate_json()`, raising typed `LLMResponseValidationError` on syntax or schema errors.
6. **Thinking-Token Accounting in Cost Calculations:** To prevent under-reporting operational costs on reasoning models (Gemini 2.5 Flash), `thoughtsTokenCount` is explicitly tracked and billed at standard output rates.
7. **Developer Manual Testing Script over Public Endpoint:** In accordance with project requirements, no public `/analyze-query` HTTP endpoint was added. Testing is conducted via unit tests (`FakeLLMProvider`) and developer CLI (`manual_test_llm.py`).

---

## 9. Known Limitations & Roadmap Boundaries

- **Thinking Budget Control:** `thinking_budget` configuration parameter is deferred to Phase 7 (Agentic AI Engineering) when agent workflow budgets are introduced.
- **Context Caching:** Gemini context caching requires a minimum token threshold (32,768 tokens) and is deferred to Phase 3 and Phase 4 when full legal document corpuses are ingested.
- **In-Memory Catalog:** Legal source catalog remains in-memory until Phase 3 (Database & Document Intelligence) introduces PostgreSQL and pgvector.
- **Implementation Boundary:** Phase 3 (Database & Document Intelligence) is strictly the next unstarted phase. No database tables, SQLAlchemy models, pgvector extensions, embeddings, or LangGraph agents have been introduced.
