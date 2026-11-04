# ⚖️ LegalLens AI — Complete Development Roadmap

> **Tagline:** _Evidence before Answers_
> An Evidence-Grounded Agentic AI Platform for Sri Lankan Legal Research, Case Analysis and Citation Verification

---

<p align="center">
  <img src="https://img.shields.io/badge/Status-Phase%202%20Completed-success?style=for-the-badge&logo=checkmarx" alt="Status" />
  <img src="https://img.shields.io/badge/Next%20Phase-Phase%203%20Database%20%26%20Document%20Intelligence-blue?style=for-the-badge&logo=postgresql" alt="Next Phase" />
  <img src="https://img.shields.io/badge/Progress-3%20of%2013%20Phases%20(23%25)-blueviolet?style=for-the-badge" alt="Progress" />
  <img src="https://img.shields.io/badge/Python-3.12.10-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python Version" />
  <img src="https://img.shields.io/badge/Duration-12%20Weeks-blue?style=for-the-badge&logo=calendar" alt="Duration" />
  <img src="https://img.shields.io/badge/Effort-240%20Hours-indigo?style=for-the-badge&logo=clock" alt="Effort" />
</p>

Your project, **LegalLens AI — Evidence before Answers**, should be developed as an actual AI engineering product, not simply as a chatbot with RAG.

I recommend following a 12-week, 240-hour development roadmap, based on your proposal. We will build it incrementally, learn each technology before using it, and make sure every phase produces something functional.

> [!IMPORTANT]
> ### The Most Important Principle
> $$\mathbf{Learn} \longrightarrow \mathbf{Design} \longrightarrow \mathbf{Implement} \longrightarrow \mathbf{Test} \longrightarrow \mathbf{Evaluate} \longrightarrow \mathbf{Document} \longrightarrow \mathbf{Integrate}$$

---

## Current Project Status

| Metric | Status | Details |
| :--- | :--- | :--- |
| **Current Milestone** | **Phase 2 — LLM Engineering** | **Completed** (3 November 2026) |
| **Next Milestone** | **Phase 3 — Database & Document Intelligence** | **Currently in progress** (Tasks 3.1–3.10) |
| **Overall Progress** | **23%** | 3 of 13 development phases completed (Phase 0, 1, 2 completed; Phase 3 in progress) |
| **Repository Baseline** | Stable | Public Monorepo on `main` ([github.com/Shakir5665/LegalLens-AI](https://github.com/Shakir5665/LegalLens-AI)) |
| **Backend Runtime** | Operational | Python 3.12.10, FastAPI, Pydantic v2, Google GenAI SDK (Gemini), Pytest suite (72 passed, 1 skipped) |

> [!NOTE]
> **Implementation Boundary:** Phase 0 (Project Foundation), Phase 1 (Backend Engineering Fundamentals), and Phase 2 (LLM Engineering) are **completed**. Phase 3 (Database & Document Intelligence) is **currently in progress**. Future capabilities—including vector embeddings, hybrid retrieval, LangGraph agent workflows, citation verification, and the React frontend—remain planned target architecture and are strictly not yet implemented.

---

## 📑 Table of Contents

- [Current Project Status](#current-project-status)
- [1. Complete Development Roadmap](#1-complete-development-roadmap)
- [2. What Exactly Will We Build in Each Phase?](#2-what-exactly-will-we-build-in-each-phase)
  - [Phase 0 — Project Foundation (Completed)](#phase-0--project-foundation)
  - [Phase 1 — Backend Engineering Fundamentals (Completed)](#phase-1--backend-engineering-fundamentals)
  - [Phase 2 — LLM Engineering (Completed)](#phase-2--llm-engineering)
  - [Phase 3 — Database & Document Intelligence (In Progress)](#phase-3--database--document-intelligence)
  - [Phase 4 — Embeddings & Basic RAG](#phase-4--embeddings--basic-rag)
  - [Phase 5 — Hybrid Retrieval Engineering](#phase-5--hybrid-retrieval-engineering)
  - [Phase 6 — Retrieval Evaluation](#phase-6--retrieval-evaluation)
  - [Phase 7 — Agentic AI Engineering](#phase-7--agentic-ai-engineering)
  - [Phase 8 — Legal Analysis & Citation Verification](#phase-8--legal-analysis--citation-verification)
  - [Phase 9 — Advanced AI Engineering](#phase-9--advanced-ai-engineering)
  - [Phase 10 — Frontend & Full-Stack Integration](#phase-10--frontend--full-stack-integration)
  - [Phase 11 — Production Engineering](#phase-11--production-engineering)
  - [Phase 12 — Evaluation & Release](#phase-12--evaluation--release)
- [3. Recommended Development Architecture](#3-recommended-development-architecture)
- [4. How We Should Approach Learning and Implementation](#4-how-we-should-approach-learning-and-implementation)
- [5. Our Project Completion Tracker](#5-our-project-completion-tracker)
- [6. A Few Important Engineering Decisions](#6-a-few-important-engineering-decisions)
- [7. High-Level Architecture](#7-high-level-architecture)
- [8. Caching Architecture (Planned)](#8-caching-architecture-planned)
- [9. Repository Structure](#9-repository-structure)
- [10. Development Environment](#10-development-environment)
  - [Prerequisites](#prerequisites)
  - [Backend Environment Setup](#backend-environment-setup)
  - [Running the Application](#running-the-application)
  - [Running Tests](#running-tests)
  - [Environment Variables](#environment-variables)
- [11. Project Documentation](#11-project-documentation)
- [12. Development Roadmap](#12-development-roadmap)

---

## 1. Complete Development Roadmap

**12 WEEKS · APPROX. 240 HOURS · 20 HOURS/WEEK**

| Phase                                     | Duration | Main focus                                                             | Expected outcome                    |
| :---------------------------------------- | :------- | :--------------------------------------------------------------------- | :---------------------------------- |
| **0. Project Foundation**                 | 2 days   | Requirements, architecture, GitHub, development environment            | Development-ready repository        |
| **1. Backend Engineering Fundamentals**   | Week 1   | Python, FastAPI, Pydantic, REST APIs, async programming                | Working backend foundation          |
| **2. LLM Engineering**                    | Week 2   | Gemini API, prompting, structured outputs, token usage, error handling | Validated LLM integration           |
| **3. Database & Document Intelligence**   | Week 3   | PostgreSQL, SQL, SQLAlchemy, PyMuPDF, document ingestion               | Working document ingestion pipeline |
| **4. Embeddings & Basic RAG**             | Week 4   | Embeddings, vector databases, pgvector, similarity search, chunking    | Initial semantic RAG system         |
| **5. Hybrid Retrieval Engineering**       | Week 5   | PostgreSQL FTS, semantic search, hybrid retrieval, RRF                 | Hybrid search engine                |
| **6. Retrieval Evaluation**               | Week 6   | Reranking, metadata filtering, Precision@K, Recall@K, MRR              | Evaluated retrieval system          |
| **7. Agentic AI Engineering**             | Week 7   | LangGraph, state management, nodes, edges, conditional workflows       | Controlled research agent           |
| **8. Legal Analysis & Verification**      | Week 8   | Claim extraction, evidence mapping, citation verification, guardrails  | Evidence-grounded legal analysis    |
| **9. Advanced AI Engineering**            | Week 9   | Case comparison, MCP, Harness Engineering, observability               | Advanced AI capabilities            |
| **10. Frontend & Full-Stack Integration** | Week 10  | React, TypeScript, Tailwind, SSE, API integration                      | Complete web application            |
| **11. Production Engineering**            | Week 11  | PDF reports, security, caching, cost optimisation, Docker              | Deployable prototype                |
| **12. Evaluation & Release**              | Week 12  | Testing, benchmarking, documentation, deployment, demonstration        | Final LegalLens AI release          |

---

## 2. What Exactly Will We Build in Each Phase?

This is the more important part. I want you to understand the actual engineering work behind every phase.

---

### Phase 0 — Project Foundation

> **Status:** ✅ **Completed** (1 November 2026)
> **Milestone Goal:** Establish a clean, maintainable, and development-ready engineering environment.

**Objective:** Establish a clean, maintainable engineering environment.

|  Task   | What you will do                                    | Status |
| :-----: | :-------------------------------------------------- | :----: |
| **0.1** | Finalise MVP requirements and acceptance criteria   | ✅ Completed |
| **0.2** | Understand the proposed system architecture         | ✅ Completed |
| **0.3** | Create GitHub repository                            | ✅ Completed |
| **0.4** | Establish frontend and backend project structure    | ✅ Completed |
| **0.5** | Configure Python virtual environment                | ✅ Completed |
| **0.6** | Configure environment variables and .env.example    | ✅ Completed |
| **0.7** | Set up Git workflow and .gitignore                  | ✅ Completed |
| **0.8** | Write initial README and architecture documentation | ✅ Completed |

**Deliverable:** A clean project repository ready for development.

#### Phase 0 Verified Execution & Task Completion Summary

| Task | Title | Verified Execution & Completion Details |
| :---: | :--- | :--- |
| **0.1** | **Finalize MVP Scope** | Selected Complete Functional MVP. Bounded the legal corpus strictly to Sri Lankan Employment Law (*Industrial Disputes Act*, *Termination of Employment of Workmen Act No. 45 of 1971*, *Payment of Gratuity Act No. 12 of 1983*, and selected judicial decisions). Established 20 functional requirements (`FR-01` to `FR-20`) and non-functional requirements. Defined 4 source authenticity classifications (`VerifiedOfficial`, `VerifiedSecondary`, `SyntheticDemo`, `Unverified`) and 5 citation verification outcomes (`Supported`, `Partially supported`, `Unsupported`, `Contradicted`, `Ambiguous`). Confirmed that knowledge graph functionality is not a mandatory MVP dependency and is deferred to post-MVP. |
| **0.2** | **Finalize System Architecture** | Selected a single modular Python FastAPI backend, formally evaluating and rejecting the previously considered .NET + FastAPI dual-backend split ([ADR-001](docs/decisions/architecture-decisions.md#adr-001-use-a-modular-monolithic-backend)). Defined 4 logical layers (Application, Agent Orchestration, Legal Intelligence, Harness and Governance). Mapped the 7-stage sequential investigation workflow. Established controlled LangGraph orchestration, direct Python module calls for internal retrieval/verification, Python MCP SDK for external client interoperability ([ADR-008](docs/decisions/architecture-decisions.md#adr-008-use-mcp-for-external-tool-interoperability)), and deterministic report templates ([ADR-009](docs/decisions/architecture-decisions.md#adr-009-keep-critical-operations-deterministic)). |
| **0.3** | **Create GitHub Repository** | Created public GitHub repository at [`https://github.com/Shakir5665/LegalLens-AI`](https://github.com/Shakir5665/LegalLens-AI) with default branch `main`. Public visibility was approved as an explicit architectural decision ([ADR-014](docs/decisions/architecture-decisions.md#adr-014-maintain-public-repository-with-strict-credential-isolation)), mandating strict defense-in-depth secret isolation across all tooling, configuration files, and documentation. |
| **0.4** | **Establish Project Structure** | Established monorepo layout: `apps/web/`, `apps/api/`, `docs/architecture/`, `docs/decisions/`, `infrastructure/`, and `tests/`. The backend modular package structure includes `apps/api/app/` (`api/`, `core/`, `db/`, `schemas/`, `services/`) with a baseline `/health` FastAPI endpoint in `apps/api/app/main.py`. *(Foundational skeleton only; domain logic, database models, and service implementations remain unimplemented).* |
| **0.5** | **Configure Python Environment** | Standardized on Python 3.12 (specifically Python 3.12.10) managed via a dedicated virtual environment (`venv/`) at repository root ([ADR-013](docs/decisions/architecture-decisions.md#adr-013-select-python-312-as-the-core-backend-runtime)), resolving coexistence with system Python 3.14.3. Verified Python and pip operate strictly through the virtual environment. Windows PowerShell activation: `.\venv\Scripts\Activate.ps1`. |
| **0.6** | **Configure Environment Variables** | Created configuration template `apps/api/.env.example` and local placeholder file `apps/api/.env` containing sanitized dummy values for application settings, database connection URL, Gemini API key, and frontend CORS origins. Ensured no actual credentials or secrets are committed. |
| **0.7** | **Configure Git Workflow and .gitignore** | Configured root `.gitignore` covering environment files and secrets (`.env*` except `!.env.example`), virtual environments (`venv/`, `.venv/`), Python cache files (`__pycache__/`, `*.pyc`), test/tool caches (`.pytest_cache/`, `.coverage`), frontend dependencies (`node_modules/`), build outputs (`dist/`, `build/`), and OS/IDE files. Verified `.env` exclusion. |
| **0.8** | **Create Initial Documentation** | Authored and published initial documentation: `README.md`, `docs/architecture/system-architecture.md`, and `docs/decisions/architecture-decisions.md` (recording ADR-001 through ADR-014). |

> [!WARNING]
> **Implementation Boundary:** Phase 0 delivered structural and architectural readiness. Core backend API endpoints (auth, projects, documents, investigations), database schemas and migrations, pgvector semantic search, LangGraph stateful agents, citation verification engines, and React UI components are **not yet implemented**. They will be engineered systematically starting in Phase 1.

---

### Phase 1 — Backend Engineering Fundamentals

> **Status:** ✅ **Completed** (2 November 2026)
> **Milestone Goal:** Build a robust, modular, and fully tested FastAPI backend foundation implementing core application architecture patterns.

**Objective:** Learn how to build a proper backend using Python and FastAPI.

|  Task   | What you will learn/build                            | Status |
| :-----: | :--------------------------------------------------- | :----: |
| **1.1** | Python fundamentals required for backend engineering | ✅ Completed |
| **1.2** | Python project structure and modular architecture    | ✅ Completed |
| **1.3** | FastAPI application and routing                      | ✅ Completed |
| **1.4** | REST API design and HTTP fundamentals                | ✅ Completed |
| **1.5** | Pydantic models and data validation                  | ✅ Completed |
| **1.6** | Dependency injection                                 | ✅ Completed |
| **1.7** | Async programming and error handling                 | ✅ Completed |
| **1.8** | Logging and configuration management                 | ✅ Completed |
| **1.9** | Unit testing using pytest                            | ✅ Completed |

**Deliverable:** A functional FastAPI backend with validated endpoints.

#### Phase 1 Verified Execution & Task Completion Summary

| Task | Title | Verified Execution & Completion Details |
| :---: | :--- | :--- |
| **1.1** | **Python Fundamentals** | Standardized on Python 3.12.10 in root `venv/`, establishing type annotations, protocols, immutable Pydantic models, and clean OOP separation. |
| **1.2** | **Project Structure & Architecture** | Implemented modular architecture in `apps/api/app/` separating `core/` (config, logging, errors), `schemas/` (Pydantic models), `services/` (domain logic), and `api/` (routes & dependencies). |
| **1.3** | **FastAPI Application & Routing** | Configured `main.py` mounting unversioned `/health` and versioned `/api/v1` routes with OpenAPI documentation at `/docs` and `/redoc`. |
| **1.4** | **REST API Design** | Implemented representative endpoints (`GET /health`, `GET /api/v1/health`, `GET /api/v1/sources`, `GET /api/v1/sources/{source_id}`, `POST /api/v1/sources/validate-reference`) following standard HTTP methods, status codes, and resource naming. |
| **1.5** | **Pydantic Validation** | Built typed request and response schemas in `app/schemas/` with boundary constraints, regex slug patterns, year ranges, and enums (`SourceAuthenticity`, `LegalSourceCategory`). |
| **1.6** | **Dependency Injection** | Implemented reusable dependencies in `app/api/deps.py` for application settings, domain service instances, and client correlation IDs. Verified override capability in tests. |
| **1.7** | **Async & Error Handling** | Implemented custom application exceptions (`AppException`, `EntityNotFoundException`, `ValidationException`) and uniform `ErrorResponse` schema. Middleware masks unhandled 500 tracebacks. |
| **1.8** | **Logging & Configuration** | Implemented centralized `Settings` using `pydantic-settings` cached via `@lru_cache`, and structured Python logging with standard formatters. |
| **1.9** | **Automated Testing** | Developed a 22-test automated test suite using `pytest` and `httpx` in `apps/api/tests/` covering configuration, dependencies, schemas, error handling, and API endpoints (100% passing). |

---

### Phase 2 — LLM Engineering

> **Status:** ✅ **Completed** (3 November 2026)  
> **Milestone Goal:** Build a reliable Gemini-powered LLM service capable of producing validated structured responses with predictable error handling, deterministic token cost accounting, and lightweight observability.

**Objective:** Understand how to integrate LLMs into reliable software applications.

|  Task   | What you will learn/build                    | Status |
| :-----: | :------------------------------------------- | :----: |
| **2.1** | LLM fundamentals and tokenisation            | ✅ Completed |
| **2.2** | Gemini API integration                       | ✅ Completed |
| **2.3** | System prompts and prompt design             | ✅ Completed |
| **2.4** | Structured output generation                 | ✅ Completed |
| **2.5** | Pydantic-based LLM response validation       | ✅ Completed |
| **2.6** | Model errors, retries and timeouts           | ✅ Completed |
| **2.7** | Token usage and cost tracking                | ✅ Completed |
| **2.8** | Model configuration and provider abstraction | ✅ Completed |

**Deliverable:** A reusable LLM service capable of producing validated structured responses through Gemini, with predictable error handling and basic observability.

#### Phase 2 Verified Execution & Task Completion Summary

| Task | Title | Verified Execution & Completion Details |
| :---: | :--- | :--- |
| **2.1** | **LLM Fundamentals & Tokenisation** | Established token consumption principles, distinguishing input (prompt) tokens from output (generation) tokens. Configured `gemini-2.5-flash` model defaults and documented official pricing rates. Ensured missing token usage is preserved as `None` rather than false zeros. |
| **2.2** | **Gemini API Integration** | Installed official `google-genai` SDK (`google-genai==1.2.0`). Implemented `GeminiProvider` utilizing `genai.Client` with secure credentials sourced from `Settings`. Validates API keys upfront and isolates SDK-specific types from the application layer. Discovered and resolved SDK millisecond timeout requirements (`types.HttpOptions(timeout=int(timeout_seconds * 1000))`). |
| **2.3** | **System Prompts & Prompt Design** | Created immutable `PromptTemplate` abstraction in `app/prompts/base.py`. Defined authoritative `LEGAL_QUERY_ANALYSIS_PROMPT` (v1.0.0) with explicit ethical constraints against unsupported legal conclusions or hallucinated citations. |
| **2.4** | **Structured Output Generation** | Leveraged Gemini's native structured JSON mode via `response_mime_type="application/json"` and `response_schema` in `GenerateContentConfig`. |
| **2.5** | **Pydantic Response Validation** | Built typed `LegalQueryAnalysisResult` schema with `PotentialStatute` and `LegalUrgencyLevel` enums. Implemented `validate_structured_response()` using Pydantic v2 `model_validate_json()` to treat model output as untrusted input. Ensured compatibility with Google GenAI schema compiler (all fields required; no `default` values or `extra="forbid"` which inject unsupported OpenAPI properties). |
| **2.6** | **Model Errors, Retries & Timeouts** | Built custom `LLMException` hierarchy (`LLMTimeoutError`, `LLMRateLimitError`, `LLMProviderError`, `LLMResponseValidationError`, `LLMConfigurationError`). Implemented `execute_with_retry()` with bounded retries (`llm_max_retries=2` allowing up to 3 total attempts), exponential backoff with full jitter, provider `Retry-After` delay respect, and fail-fast behavior for non-retryable errors. Explicit timeout configured (30s). |
| **2.7** | **Token Usage, Cost Tracking & Staged Observability** | Implemented `LLMCallTelemetry` capturing correlation ID, latency, input/output/thinking/total tokens, estimated cost (based on documented $0.30/1M in, $2.50/1M out rates for `gemini-2.5-flash`), retry count, and sanitized error categories. Standard Python logging emits operational telemetry while strictly forbidding raw prompts, legal documents, or secrets from logs ([ADR-014](docs/decisions/architecture-decisions.md#adr-014-maintain-public-repository-with-strict-credential-isolation)). |
| **2.8** | **Model Configuration & Provider Abstraction** | Defined lightweight `LLMProvider` Protocol. Implemented production `GeminiProvider` and zero-network `FakeLLMProvider` test double. Wired `get_llm_provider` and `get_llm_service` via FastAPI dependency injection with lazy instantiation. |

#### 14 Completed Phase 2 Engineering Capabilities

1. **Official Google GenAI SDK Integration:** Integrated `google-genai` (v1.2.0) isolated strictly within the provider layer.
2. **Lightweight Provider Contract:** Defined `@runtime_checkable class LLMProvider(Protocol)` with standard `generate()` and `generate_structured()` interfaces.
3. **GeminiProvider Implementation:** Secure client lifecycle, millisecond timeout translation, and SDK error mapping.
4. **Zero-Network FakeLLMProvider:** Test double supporting controllable responses, custom token usage, call recording, and transient failure simulation.
5. **PromptTemplate Architecture:** Immutable templates encapsulating versioned system instructions and dynamic user keyword interpolation.
6. **Native Structured JSON Generation:** Gemini SDK configuration utilizing `response_mime_type="application/json"` and Pydantic schema passing.
7. **Strict Pydantic v2 Output Validation:** Model outputs validated as untrusted input via `model_validate_json()`, raising `LLMResponseValidationError` (HTTP 502) on malformed output.
8. **Predictable Domain Error Hierarchy:** Typed application exceptions inheriting from `AppException` (`LLMTimeoutError`, `LLMRateLimitError`, `LLMProviderError`, `LLMConfigurationError`).
9. **Bounded Retries with Jitter:** Deterministic `execute_with_retry` loop with exponential backoff, randomized jitter, and fail-fast non-retryable error filters.
10. **Explicit Timeout Enforcement:** 30s client-level timeout mapped to `LLMTimeoutError` (HTTP 504).
11. **Thinking-Token Accounting:** Captures internal reasoning tokens (`thoughtsTokenCount`) generated by Gemini 2.5 Flash, billing them at the official standard output rate ($2.50/1M tokens).
12. **Model-Call Telemetry & Privacy-Safe Logging:** Emits structured metadata (correlation ID, tokens, latency, cost, retries) while strictly omitting confidential legal text or API keys from logs.
13. **Domain LLMService Orchestration:** Unified high-level service (`LLMService`) orchestrating prompt rendering, provider calls, response validation, and telemetry.
14. **Developer Manual Integration Testing:** Created `apps/api/scripts/manual_test_llm.py` enabling real-world verification without exposing public API endpoints.

#### Staged Observability Roadmap

- **Phase 2 (Completed):** Model-call telemetry (per-call latency, token counts, thinking tokens, cost estimate, retries, sanitized error codes). Zero external APM dependencies.
- **Phase 7 (Planned):** Agent & workflow observability (LangGraph execution traces, node-level transitions, investigation checkpointing).
- **Phase 9 (Planned):** Advanced observability & Harness Engineering (centralized tracing, runtime budgets, cost caps, execution audits).

#### Automated Test Suite Verification

```text
============================= test session starts =============================
platform win32 -- Python 3.12.10, pytest-8.4.2 -- rootdir: LegalLens-AI
collected 73 items

apps/api/tests/test_config.py ......................... [ 2%]
apps/api/tests/test_dependencies.py .................... [ 6%]
apps/api/tests/test_error_handling.py .................. [ 10%]
apps/api/tests/test_health_api.py ...................... [ 13%]
apps/api/tests/test_llm_config_and_pricing.py .......... [ 28%]
apps/api/tests/test_llm_provider.py .................... [ 43%] (1 skipped)
apps/api/tests/test_llm_retries_and_errors.py .......... [ 58%]
apps/api/tests/test_llm_service.py ..................... [ 71%]
apps/api/tests/test_llm_validation.py .................. [ 83%]
apps/api/tests/test_schemas.py ......................... [ 90%]
apps/api/tests/test_sources_api.py ..................... [100%]

======================== 72 passed, 1 skipped in 0.23s ========================
```

- **Tests Collected:** 73
- **Passed:** 72 (100% of runnable offline tests)
- **Skipped:** 1 (`test_real_gemini_api_integration`, skipped by design when `REAL_GEMINI_API_KEY` is not set to maintain zero-network determinism)
- **Failed:** 0
- **Regression:** Zero regression; all 22 original Phase 1 tests remain passing.

#### Real-World Live Verification Records

Two successful live executions of `manual_test_llm.py` were performed against the Google Gemini API:

| Metric | Live Execution 1 | Live Execution 2 | Notes |
| :--- | :--- | :--- | :--- |
| **Model** | `gemini-2.5-flash` | `gemini-2.5-flash` | Default production model |
| **Input Tokens** | 319 | 319 | Prompt text + system instruction tokens |
| **Candidate Output Tokens** | 248 | 229 | Visible generated structured JSON text |
| **Thinking Tokens** | 451 | 1,084 | Internal reasoning tokens (`thoughtsTokenCount`) |
| **Total Tokens** | 1,018 | 1,632 | Exact aggregate reported by Gemini API |
| **Total Billable Output** | 699 tokens | 1,313 tokens | Candidate tokens + Thinking tokens |
| **Estimated Cost (USD)** | **$0.00184320** | **$0.00337820** | Calculated via documented rates ($0.30/1M in, $2.50/1M out) |
| **Roundtrip Latency** | 5.57 seconds | 7.96 seconds | Network latency + reasoning + JSON generation |
| **Execution Status** | `SUCCESS` | `SUCCESS` | Pydantic validation: **PASSED** |

> [!IMPORTANT]
> **Cost Accounting Clarification:** The costs reported above are mathematical estimates derived from official rate cards ($0.30 per 1M input tokens, $2.50 per 1M output/thinking tokens effective November 2026). They do not represent official Google Cloud invoice statements. Not all possible model edge-cases or transient failure behaviors have been tested live; live calls were performed strictly for verification. Automated unit tests remain completely decoupled from live network availability via `FakeLLMProvider`.

#### Known Limitations & Deferred Capabilities

- **Thinking Budget Controls:** Gemini 2.5 Flash operates with a dynamic internal reasoning budget by default. Direct thinking budget limits via `types.ThinkingConfig` may be tuned in later agentic phases if lower latency is required.
- **Multimodal & Audio Accounting:** Multimodal tokens (audio/video) and long-term cached storage costs are not modeled as they are outside the current text-based legal research scope.
- **Multi-Turn Context Caching:** Prompt caching is supported in the pricing registry ($0.03/1M cached tokens) but automated cache creation is deferred to Phase 3/4 when large legal statutes are ingested.
- **Workflow-Level Tracing:** Multi-step agent execution tracing is deferred to Phase 7 (LangGraph).

---

### Phase 3 — Database & Document Intelligence

> **Status:** ⏳ **In Progress**  
> **Milestone Goal:** Build the legal document management and ingestion foundation with PostgreSQL, SQLAlchemy, and PyMuPDF.

**Objective:** Build the legal document management and ingestion foundation.

|   Task   | What you will learn/build          |
| :------: | :--------------------------------- |
| **3.1**  | PostgreSQL fundamentals            |
| **3.2**  | Database schema design             |
| **3.3**  | SQLAlchemy and database migrations |
| **3.4**  | Core database tables               |
| **3.5**  | Document upload API                |
| **3.6**  | File validation and storage        |
| **3.7**  | PDF text extraction using PyMuPDF  |
| **3.8**  | Document metadata extraction       |
| **3.9**  | Legal document version management  |
| **3.10** | Structure-aware legal chunking     |

**Deliverable:** Upload a legal PDF, extract its text, preserve its structure and store it in PostgreSQL.

---

### Phase 4 — Embeddings & Basic RAG

**Objective:** Understand and implement the fundamental RAG architecture.

|  Task   | What you will learn/build                           |
| :-----: | :-------------------------------------------------- |
| **4.1** | What embeddings are and how they work               |
| **4.2** | Evaluate hosted embedding providers                 |
| **4.3** | Generate document embeddings                        |
| **4.4** | Understand vector similarity                        |
| **4.5** | Configure PostgreSQL pgvector                       |
| **4.6** | Store passage embeddings                            |
| **4.7** | Generate query embeddings                           |
| **4.8** | Implement semantic similarity search                |
| **4.9** | Build the first retrieval-augmented answer pipeline |

**Deliverable:** Ask a question and retrieve relevant legal passages using semantic search.

---

### Phase 5 — Hybrid Retrieval Engineering

**Objective:** Improve retrieval quality beyond basic vector search.

|  Task   | What you will learn/build                            |
| :-----: | :--------------------------------------------------- |
| **5.1** | Information retrieval fundamentals                   |
| **5.2** | PostgreSQL Full-Text Search                          |
| **5.3** | Lexical versus semantic retrieval                    |
| **5.4** | Implement keyword search                             |
| **5.5** | Implement metadata filtering                         |
| **5.6** | Combine keyword and vector results                   |
| **5.7** | Reciprocal Rank Fusion (RRF)                         |
| **5.8** | Implement hybrid retrieval API                       |
| **5.9** | Compare keyword-only, vector-only and hybrid results |

**Deliverable:** A hybrid retrieval engine that combines keyword and semantic search.

---

### Phase 6 — Retrieval Evaluation

**Objective:** Learn how professional AI engineers measure retrieval quality.

|  Task   | What you will learn/build                   |
| :-----: | :------------------------------------------ |
| **6.1** | Build a manually labelled retrieval dataset |
| **6.2** | Precision@K                                 |
| **6.3** | Recall@K                                    |
| **6.4** | Mean Reciprocal Rank                        |
| **6.5** | nDCG@K                                      |
| **6.6** | Implement reranking                         |
| **6.7** | Compare retrieval configurations            |
| **6.8** | Record evaluation results                   |

**Deliverable:** An evaluated retrieval system with measurable performance.

---

### Phase 7 — Agentic AI Engineering

**Objective:** Transform the RAG pipeline into a controlled legal investigation workflow.

|   Task   | What you will learn/build                |
| :------: | :--------------------------------------- |
| **7.1**  | Agentic AI fundamentals                  |
| **7.2**  | LangGraph fundamentals                   |
| **7.3**  | Graph nodes and edges                    |
| **7.4**  | StateGraph and workflow state            |
| **7.5**  | Query Router                             |
| **7.6**  | Research Planner                         |
| **7.7**  | Retrieval node integration               |
| **7.8**  | Conditional workflow execution           |
| **7.9**  | State persistence and recovery           |
| **7.10** | Maximum iterations and bounded execution |

**Deliverable:** A controlled LangGraph investigation workflow.

---

### Phase 8 — Legal Analysis & Citation Verification

> _Core differentiating feature_

**Objective:** Implement the most important capability of LegalLens AI.

|   Task   | What you will learn/build                                                |
| :------: | :----------------------------------------------------------------------- |
| **8.1**  | Structured legal analysis                                                |
| **8.2**  | Atomic legal claim extraction                                            |
| **8.3**  | Claim and evidence data modelling                                        |
| **8.4**  | Reference existence validation                                           |
| **8.5**  | Document, section and passage validation                                 |
| **8.6**  | Claim-level evidence mapping                                             |
| **8.7**  | Evidence-support classification                                          |
| **8.8**  | Supported / Partially Supported / Unsupported / Contradicted / Ambiguous |
| **8.9**  | Handle missing and conflicting evidence                                  |
| **8.10** | Implement output guardrails                                              |

**Deliverable:** LegalLens AI can produce legal claims and assess whether the retrieved evidence supports them.

---

### Phase 9 — Advanced AI Engineering

**Objective:** Introduce interoperability, observability and runtime control.

|   Task   | What you will learn/build                |
| :------: | :--------------------------------------- |
| **9.1**  | Structured case comparison               |
| **9.2**  | MCP fundamentals                         |
| **9.3**  | Build Python MCP server                  |
| **9.4**  | Expose approved legal research tools     |
| **9.5**  | Implement tool permissions               |
| **9.6**  | Harness Engineering architecture         |
| **9.7**  | Execution controller and context manager |
| **9.8**  | Runtime budgets and cost limits          |
| **9.9**  | Workflow observability and tracing       |
| **9.10** | Failure recovery and execution audit     |

**Deliverable:** A controlled, observable and externally accessible AI research system.

---

### Phase 10 — Frontend & Full-Stack Integration

**Objective:** Build the actual user-facing LegalLens AI application.

|   Task    | What you will learn/build                  |
| :-------: | :----------------------------------------- |
| **10.1**  | React and TypeScript project setup         |
| **10.2**  | Tailwind CSS                               |
| **10.3**  | Authentication and protected routes        |
| **10.4**  | Research project management                |
| **10.5**  | Legal document management interface        |
| **10.6**  | Research question submission               |
| **10.7**  | Investigation workspace                    |
| **10.8**  | SSE investigation progress                 |
| **10.9**  | Evidence and citation inspection interface |
| **10.10** | Case comparison interface                  |

**Deliverable:** A functional web application connected to the AI backend.

---

### Phase 11 — Production Engineering

**Objective:** Make the prototype reliable, secure and deployable.

|   Task    | What you will learn/build                  |
| :-------: | :----------------------------------------- |
| **11.1**  | Deterministic report generation            |
| **11.2**  | PDF export                                 |
| **11.3**  | Authentication and authorisation hardening |
| **11.4**  | File upload security                       |
| **11.5**  | Prompt injection protection                |
| **11.6**  | Caching strategies                         |
| **11.7**  | Token and cost optimisation                |
| **11.8**  | Docker and Docker Compose                  |
| **11.9**  | Environment and deployment configuration   |
| **11.10** | Integration and security testing           |

**Deliverable:** A deployable LegalLens AI prototype.

---

### Phase 12 — Evaluation & Release

**Objective:** Prove that the system works and prepare it for professional demonstration.

|   Task    | What you will learn/build                |
| :-------: | :--------------------------------------- |
| **12.1**  | Prepare 30–50 legal evaluation questions |
| **12.2**  | Evaluate retrieval quality               |
| **12.3**  | Evaluate citation verification           |
| **12.4**  | Evaluate workflow reliability            |
| **12.5**  | Evaluate security behaviour              |
| **12.6**  | Measure latency and API costs            |
| **12.7**  | Fix identified weaknesses                |
| **12.8**  | Complete technical documentation         |
| **12.9**  | Prepare architecture diagrams            |
| **12.10** | Deploy and demonstrate the final product |

**Deliverable:** A tested, documented and demonstrable AI engineering project.

---

## 3. Recommended Development Architecture

This is the architecture we should gradually build, rather than implementing everything at once.

```text
+--------------------------------------------------------------------------+
|                     React + TypeScript + Tailwind CSS                    |
|             Frontend · User interaction · Research workspace             |
+--------------------------------------------------------------------------+
                                     |
                                     v
+--------------------------------------------------------------------------+
|                              Python + FastAPI                            |
|       Authentication · Projects · Documents · Investigations · Reports    |
+--------------------------------------------------------------------------+
                                     |
                                     v
+--------------------------------------------------------------------------+
|                    LangGraph — Investigation Workflow                     |
|                                                                          |
|   +-------------------+                     +-------------------+        |
|   |   Query Router    |                     | Research Planner  |        |
|   +-------------------+                     +-------------------+        |
|             |                                         |                  |
|             v                                         v                  |
|   +-------------------+                     +-------------------+        |
|   | Evidence Retrieval|                     |   Legal Analysis  |        |
|   +-------------------+                     +-------------------+        |
|             |                                         |                  |
|             v                                         v                  |
|   +-------------------+                     +-------------------+        |
|   |Claim Verification |                     |  Case Comparison  |        |
|   +-------------------+                     +-------------------+        |
+--------------------------------------------------------------------------+
                |                                         |
                v                                         v
+-------------------------------+         +--------------------------------+
|        PostgreSQL FTS         |         |            pgvector            |
|        Keyword search         |         |         Semantic search        |
+-------------------------------+         +--------------------------------+
                \                                         /
                 \                                       /
                  v                                     v
+--------------------------------------------------------------------------+
|                      Evidence & Verification Engine                      |
|         Claim mapping · Citation validation · Evidence assessment        |
+--------------------------------------------------------------------------+
                                     |
                                     v
+--------------------------------------------------------------------------+
|                       Deterministic Research Report                      |
|                 Validated findings · Citations · PDF export              |
+--------------------------------------------------------------------------+
```

```text
============================================================================
                         CROSS-CUTTING COMPONENTS
----------------------------------------------------------------------------
 * Harness Engineering   * Security          * Observability
 * Cost Monitoring       * MCP               * Evaluation
============================================================================
```

---

## 4. How We Should Approach Learning and Implementation

I strongly recommend that we don't simply ask AI to generate an entire phase's code.

For every task, follow this process:

| Step  | Activity                       | Expected result                     |
| :---: | :----------------------------- | :---------------------------------- |
| **1** | **Understand the concept**     | You can explain the technology      |
| **2** | **Study the architecture**     | You understand where it belongs     |
| **3** | **Define requirements**        | You know exactly what to implement  |
| **4** | **Implement incrementally**    | Small, maintainable code changes    |
| **5** | **Reproduce and debug errors** | Understand the root cause           |
| **6** | **Write automated tests**      | Verify correctness                  |
| **7** | **Review the implementation**  | Understand every important decision |
| **8** | **Update documentation**       | Record what you learned             |

For example, when we reach RAG, we won't immediately implement LangGraph, MCP, reranking and multiple agents.

First, you will understand embeddings, implement semantic retrieval, test it, and then progressively introduce hybrid retrieval.

That is how you develop actual AI engineering skills rather than just assembling libraries.

---

## 5. Our Project Completion Tracker

We can use this as our master roadmap throughout development.

### LegalLens AI progress

**`[██████░░░░░░░░░░░░░░░░░░]` 23%**
*3 of 13 phases completed*

- [x] **Phase 0:** Project Foundation *(Completed — 1 November 2026)*
- [x] **Phase 1:** Backend Engineering Fundamentals *(Completed — 2 November 2026)*
- [x] **Phase 2:** LLM Engineering *(Completed — 3 November 2026)*
- [ ] **Phase 3:** Database & Document Intelligence *(In Progress)*
- [ ] **Phase 4:** Embeddings & Basic RAG
- [ ] **Phase 5:** Hybrid Retrieval Engineering
- [ ] **Phase 6:** Retrieval Evaluation
- [ ] **Phase 7:** Agentic AI Engineering
- [ ] **Phase 8:** Legal Analysis & Citation Verification
- [ ] **Phase 9:** Advanced AI Engineering
- [ ] **Phase 10:** Frontend & Full-Stack Integration
- [ ] **Phase 11:** Production Engineering
- [ ] **Phase 12:** Evaluation & Release

*(Reset progress)*

---

## 6. A Few Important Engineering Decisions

I want us to maintain these boundaries throughout the project, as formalized in our [Architecture Decision Records](docs/decisions/architecture-decisions.md) (ADR-001 through ADR-015):

1. **Modular Monolithic Backend ([ADR-001](docs/decisions/architecture-decisions.md#adr-001-use-a-modular-monolithic-backend)):** One unified, modular FastAPI backend in Python. The previously considered .NET + FastAPI dual-backend split was formally evaluated and rejected to eliminate cross-runtime overhead, serialization latency, and redundant data models.
2. **Deterministic First ([ADR-009](docs/decisions/architecture-decisions.md#adr-009-keep-critical-operations-deterministic)):** Database operations, permissions, reference existence checks, search ranking, and report rendering use conventional Python code. LLMs are reserved for language understanding and semantic reasoning.
3. **Evidence Traceability is Mandatory:** A legal claim without traceable supporting evidence must never silently appear as verified. All claims must map to explicit source passages with clear authenticity classifications (`VerifiedOfficial`, `VerifiedSecondary`, `SyntheticDemo`, `Unverified`).
4. **Hybrid Retrieval with Deterministic Fallback ([ADR-004](docs/decisions/architecture-decisions.md#adr-004-use-hybrid-retrieval--postgresql-full-text-search-and-pgvector), [ADR-007](docs/decisions/architecture-decisions.md#adr-007-use-a-hosted-embedding-api)):** Combine PostgreSQL Full-Text Search (lexical) with pgvector (semantic) using Reciprocal Rank Fusion. Hosted embeddings replace resource-intensive local BGE-M3 models, with PostgreSQL FTS serving as an immediate deterministic fallback.
5. **Direct Internal Execution vs External Interoperability ([ADR-008](docs/decisions/architecture-decisions.md#adr-008-use-mcp-for-external-tool-interoperability)):** Internal workflow nodes directly invoke Python modules. The Python MCP SDK is reserved exclusively for exposing approved legal research tools to external AI clients.
6. **Controlled Orchestration ([ADR-006](docs/decisions/architecture-decisions.md#adr-006-use-langgraph-for-controlled-investigation-orchestration)):** LangGraph coordinates a stateful, bounded, and inspectable investigation lifecycle. Unrestricted autonomous agents are strictly out of scope.
7. **Security from Day One ([ADR-014](docs/decisions/architecture-decisions.md#adr-014-maintain-public-repository-with-strict-credential-isolation)):** Retrieved documents and user uploads are treated as untrusted input. LLM prompts are never treated as security boundaries. Credentials and secrets are strictly isolated from the public GitHub repository.
8. **Test Before Adding Complexity:** Evaluate basic semantic RAG before introducing rerankers, multi-step agent graphs, or advanced query transformations. Native-text PDF parsing ([ADR-010](docs/decisions/architecture-decisions.md#adr-010-use-native-text-pdf-extraction-initially)) is prioritized; OCR is deferred.
9. **Measure Everything:** Systematically measure and benchmark retrieval quality (Precision@K, Recall@K, MRR), citation verification accuracy, workflow reliability, latency, token usage, and cost per investigation.

These principles follow the architecture, ADRs, and engineering constraints in your proposal.

---

## 7. High-Level Architecture

LegalLens AI follows a modular monolithic architecture with one FastAPI backend.

The architecture is organized into four logical layers:

* **Application Layer** — Handles frontend interaction, API requests, authentication, projects, uploads, and research results.
* **Agent Orchestration Layer** — Coordinates the investigation workflow using LangGraph and Gemini.
* **Legal Intelligence Layer** — Manages legal documents, metadata, passages, embeddings, retrieval, and evidence.
* **Harness and Governance Layer** — Enforces validation, access control, evidence requirements, execution limits, and observability.

The investigation workflow follows this general sequence:

```text
User Question ──► Question Analysis ──► Legal Retrieval ──► Evidence-Grounded Analysis ──► Citation and Claim Verification ──► Evidence Gate ──► Research Report
```

See [System Architecture](docs/architecture/system-architecture.md) for the detailed architecture and [Architecture Decisions](docs/decisions/architecture-decisions.md) for the rationale behind the major technology choices.

---

## 8. Caching Architecture (Planned)

> **Status:** Proposed Architecture — Documentation Only / Implementation Deferred to Roadmap Phases  
> Detailed Specification: [`docs/architecture/caching-strategy.md`](docs/architecture/caching-strategy.md)

LegalLens AI incorporates a staged, version-aware caching architecture designed to optimize latency and minimize external LLM token expenditure while strictly preventing stale, ungrounded, or cross-tenant legal inaccuracies.

### 8.1 Proposed Caching Layers Across Roadmap Phases

| Phase | Cache Layer | Target Workload | Cache Identity & Scope |
| :---: | :--- | :--- | :--- |
| **Phase 2** | **Prompt Immutability & Versioning** | Prompt templates & settings | Frozen dataclass templates (`PromptTemplate`), version tags, `@lru_cache` settings singleton. *(Completed)* |
| **Phase 3** | **Document Extraction Cache** | PyMuPDF text & structure artifacts | Source file SHA-256, document version, parser version, extraction options. Preserves offsets, page numbers, and provenance. |
| **Phase 4** | **Embedding Cache** | Chunk vector representations | Normalized text hash, embedding model/version, vector dimensionality, preprocessing version. |
| **Phase 5** | **Retrieval & Hybrid Search Cache** | PostgreSQL FTS & pgvector candidate sets | Short-lived (TTL up to 15m), query fingerprint, tenant/user scope, metadata filters, ranking parameters, index snapshot. |
| **Phase 7** | **LangGraph Node-Level Cache** | Pure deterministic graph steps | Node input hash, execution context, model version. Strictly distinguished from LangGraph checkpointing (workflow recovery state). |
| **Phase 8** | **Citation Verification Cache** | Claim-to-passage grounding results | Source version, passage hash, claim hash, verification algorithm version. |
| **Phase 11** | **Exact LLM Response Cache & Cache Manager** | Repeated identical Gemini inquiries | Full multi-dimensional key: canonical query, legal as-of date, tenant scope, prompt version, model identifier, schema version. |
| **Phase 12** | **Evaluation & Benchmark Suite** | Caching telemetry & evaluation | Cache hit/miss/bypass rates, avoided Gemini API calls, avoided tokens, estimated cost savings, freshness audits. |

### 8.2 Free-First Infrastructure Strategy

The caching architecture adheres to a **free-first** infrastructure philosophy:
- **Durable Metadata & Extraction Artifacts:** Stored natively in **PostgreSQL**.
- **Vector Storage:** Maintained natively in **pgvector** without requiring standalone vector databases.
- **Optional High-Throughput Shared Cache:** Evaluated for **self-hosted Valkey** in Phase 11 only if multi-worker concurrent throughput demands it. Valkey is strictly optional; no paid Redis or cache SaaS is mandated.
- **Development Fallback:** Bounded in-process Python memory cache for local development and offline unit testing.
- *Clarification:* "Free-first" means zero mandatory subscription fees for managed cache SaaS (e.g., Upstash, Redis Cloud). It does not imply that cloud compute, database hosting, or Gemini API token consumption are free.

### 8.3 Semantic Caching Policy: Disabled by Default

> [!CAUTION]
> **Semantic caching of final legal answers is strictly disabled by default and deferred.**
> In legal research, questions that appear semantically identical often turn on subtle factual differences (such as employee tenure, scheduled enterprise status, or statutory limitation dates) leading to contradictory legal outcomes. Answer-level semantic reuse presents unacceptable legal malpractice risks. Semantic candidate reuse may only be evaluated post-MVP for low-risk, internal similarity operations under rigorous false-positive verification.

For complete architectural details, key formulas, invalidation rules, and security controls, refer to [`docs/architecture/caching-strategy.md`](docs/architecture/caching-strategy.md).

---

## 9. Repository Structure

```text
LegalLens-AI/
├── apps/
│   ├── web/
│   │   └── src/
│   │       ├── components/
│   │       ├── features/
│   │       ├── pages/
│   │       └── lib/
│   │
│   └── api/
│       ├── app/
│       │   ├── api/
│       │   ├── core/
│       │   ├── db/
│       │   ├── schemas/
│       │   └── services/
│       ├── tests/
│       └── .env.example
│
├── docs/
│   ├── architecture/
│   │   └── system-architecture.md
│   └── decisions/
│       └── architecture-decisions.md
│
├── infrastructure/
├── tests/
├── PROJECT_PROPOSAL_REPORT.md
├── README.md
└── .gitignore
```

---

## 10. Development Environment

### Prerequisites

* **Python 3.12**
* **Node.js and npm** (for frontend development)
* **Git**
* **A PostgreSQL database** (Neon is the selected database provider)
* **Gemini API credentials**

Additional dependencies will be installed as the corresponding development tasks begin.

### Backend Environment Setup

The project uses a Python virtual environment.

From the repository root, activate the existing environment:

**Windows PowerShell**

```powershell
.\venv\Scripts\Activate.ps1
```

Verify the Python version:

```powershell
python --version
```

The expected version is `Python 3.12.x`.

### Running the Application

From repository root:

```powershell
.\venv\Scripts\uvicorn.exe app.main:app --app-dir apps/api --reload --port 8000
```

### Running Tests

From repository root:

```powershell
.\venv\Scripts\python.exe -m pytest -v
```

### Environment Variables

The backend environment-variable template is located at:

`apps/api/.env.example`

Create a local `.env` file in `apps/api/` using that template when configuring the application.

> [!WARNING]
> Keep actual credentials and secrets out of version control. Never commit `.env` files or expose API keys in source code.

---

## 11. Project Documentation

| Document | Purpose |
| :--- | :--- |
| [`PROJECT_PROPOSAL_REPORT.md`](PROJECT_PROPOSAL_REPORT.md) | Project proposal, objectives, scope, requirements, and evaluation strategy. |
| [`README.md`](README.md) | Project overview, architecture summary, setup guidance, and development roadmap. |
| [`docs/architecture/system-architecture.md`](docs/architecture/system-architecture.md) | Detailed system architecture and investigation workflow. |
| [`docs/architecture/backend-architecture.md`](docs/architecture/backend-architecture.md) | Phase 1 backend architecture, request lifecycle, endpoints, and testing guide. |
| [`docs/architecture/caching-strategy.md`](docs/architecture/caching-strategy.md) | Comprehensive version-aware caching architecture, layer definitions, invalidation policies, and roadmap alignment. |
| [`docs/decisions/architecture-decisions.md`](docs/decisions/architecture-decisions.md) | Accepted architecture and technology decisions (ADR-001 through ADR-015). |

---

## 12. Development Roadmap

The detailed development roadmap, including phases, tasks, acceptance criteria, and implementation progress, is maintained below.

<!-- Keep the existing development roadmap below this line. Do not remove its task descriptions or acceptance criteria. -->
