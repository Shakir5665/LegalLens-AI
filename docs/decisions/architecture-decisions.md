# LegalLens AI — Architecture Decision Records

**Project:** LegalLens AI
**Status:** Accepted for MVP architecture
**Last Updated:** 3 November 2026

This document records the major architectural and technology decisions for LegalLens AI. These decisions establish the technical direction for the initial MVP and should be revisited only when implementation evidence, evaluation results, or genuine project requirements justify a change.

---

## ADR-001: Use a Modular Monolithic Backend

**Status:** Accepted

**Decision**

Use one unified Python backend built with FastAPI. Organize the backend into clearly separated modules rather than maintaining separate microservices or splitting responsibilities across different backend languages. Specifically, the previously considered split between a .NET application backend and a Python AI service is formally rejected in favor of a single modular Python FastAPI backend.

**Context**

LegalLens AI requires API handling, authentication, document processing, legal retrieval, AI orchestration, citation verification, and report generation. Early architectural explorations considered separating core web APIs into a .NET backend and offloading AI/RAG tasks to a secondary Python service. However, running two disparate runtimes introduces unnecessary integration overhead, cross-boundary serialization latency, dual deployment pipelines, and redundant data models for the initial MVP.

**Rationale**

- Reduces deployment and infrastructure complexity to a single runtime environment.
- Eliminates cross-language serialization and communication overhead.
- Simplifies local development, debugging, and continuous integration.
- Allows AI orchestration (LangGraph), data validation (Pydantic), and database operations to communicate directly through native Python interfaces.
- Keeps the architecture manageable for the initial 12-week development scope without prematurely introducing distributed systems complexity.

**Consequences**

- Modules within `apps/api/app/` (`api`, `core`, `db`, `schemas`, `services`) must maintain rigorous domain boundaries and explicit interfaces.
- The backend is deployed and scaled as one cohesive unit.
- Separate microservices or secondary runtimes may be re-evaluated post-MVP only if concrete, measurable performance or organisational requirements emerge.

---

## ADR-002: Use React, TypeScript, and Tailwind CSS for the Frontend

**Status:** Accepted

**Decision**

Build the web frontend using React, TypeScript, and Tailwind CSS.

**Context**

The platform needs an interactive interface for managing research projects, uploading documents, submitting legal questions, inspecting evidence, viewing investigation progress, and reading reports.

**Rationale**

- React supports reusable and maintainable UI components.
- TypeScript provides static type checking.
- Tailwind CSS supports consistent and efficient UI development.

**Consequences**

- Frontend code should use explicit types.
- Reusable components should be introduced where they provide genuine value.
- Frontend API communication must follow the backend's defined contracts.

---

## ADR-003: Use PostgreSQL as the Primary Database

**Status:** Accepted

**Decision**

Use PostgreSQL through Neon as the primary relational database.

**Context**

The platform needs to store users, research projects, legal documents, document metadata, extracted passages, investigation records, verification results, and report information.

**Rationale**

- PostgreSQL provides reliable relational data management.
- It supports structured queries and full-text search.
- pgvector can support vector similarity search within the same database.
- Keeping relational and retrieval data together reduces infrastructure complexity.

**Consequences**

- PostgreSQL is the primary source of persistent application data.
- Database schema changes must be managed carefully.
- Database access should be isolated behind appropriate backend modules.

---

## ADR-004: Use Hybrid Retrieval — PostgreSQL Full-Text Search and pgvector

**Status:** Accepted

**Decision**

Use PostgreSQL Full-Text Search for keyword retrieval and pgvector for semantic vector retrieval. Combine their results through a hybrid retrieval strategy.

**Context**

Legal research requires finding relevant passages even when users do not use the exact wording found in legislation or judicial decisions.

Keyword retrieval and semantic retrieval provide complementary capabilities.

**Rationale**

- Keyword retrieval helps identify exact legal terms, phrases, and references.
- Semantic retrieval helps identify passages with conceptually related meaning.
- Hybrid retrieval can improve evidence discovery compared with relying on only one retrieval method.
- Both approaches can operate within PostgreSQL.

**Consequences**

- Documents must be processed into searchable passages.
- Embeddings must be generated and stored for semantic retrieval.
- Retrieval quality must be evaluated using a curated test dataset.
- PostgreSQL Full-Text Search provides a retrieval fallback when hosted embeddings are unavailable or unsuitable.

---

## ADR-005: Use Gemini as the Initial LLM Provider

**Status:** Accepted

**Decision**

Use the Gemini API for language-model tasks in the initial MVP.

**Context**

LegalLens AI needs language-model capabilities for question analysis, investigation planning, evidence-grounded synthesis, case comparison, and structured output generation.

**Rationale**

- Provides the language-model capabilities required by the project.
- Avoids the operational complexity of hosting a model locally.
- Allows the project to focus on retrieval quality, evidence verification, and workflow reliability.

**Consequences**

- API credentials must be managed securely through environment variables.
- Model calls must have appropriate error handling and execution limits.
- Token usage, latency, and cost should be monitored.
- Model output must be validated and checked against retrieved evidence.

---

## ADR-006: Use LangGraph for Controlled Investigation Orchestration

**Status:** Accepted

**Decision**

Use LangGraph to coordinate the legal investigation workflow through a controlled, stateful process.

**Context**

A legal investigation may involve several dependent operations, including question analysis, legislation retrieval, case discovery, evidence-grounded analysis, citation verification, and report generation.

Executing these operations as one unrestricted model interaction would make the workflow difficult to control and evaluate.

**Rationale**

- Supports explicit workflow stages and transitions.
- Allows shared investigation state.
- Supports conditional routing and controlled execution.
- Makes the investigation process easier to inspect and debug.

**Consequences**

- Investigation stages must have clearly defined inputs and outputs.
- Workflow transitions must be controlled.
- Execution limits and failure handling must be implemented.
- Unrestricted autonomous agent behaviour is not part of the MVP.

---

## ADR-007: Use a Hosted Embedding API

**Status:** Accepted

**Decision**

Use a hosted embedding API for generating document and query embeddings. Do not use a locally hosted BGE-M3 model in the initial MVP.

**Context**

Semantic retrieval requires vector representations of legal document passages and user queries.

**Rationale**

- Avoids local model deployment and hardware requirements.
- Reduces infrastructure and maintenance complexity.
- Keeps the initial implementation focused on retrieval and evaluation.

**Consequences**

- Embedding API credentials and availability must be managed.
- Embedding generation costs must be monitored.
- Embedding failures must not unnecessarily prevent keyword-based retrieval.
- Local embedding models may be evaluated later if justified by measured cost, performance, or availability requirements.

---

## ADR-008: Use MCP for External Tool Interoperability

**Status:** Accepted

**Decision**

Use the Python MCP SDK to expose approved LegalLens AI capabilities to compatible external MCP clients.

**Context**

The project includes controlled MCP integration as an interoperability capability.

**Rationale**

- Provides a standardized way to expose selected capabilities.
- Allows external compatible clients to interact with approved tools.
- Keeps interoperability separate from the internal investigation architecture.

**Consequences**

- MCP tools must expose narrowly defined capabilities.
- Tool inputs and outputs must be validated.
- Access to sensitive operations must be controlled.
- Internal Python modules should be called directly by the application and orchestration layers. MCP should not be used unnecessarily for internal function calls.

---

## ADR-009: Keep Critical Operations Deterministic

**Status:** Accepted

**Decision**

Use conventional Python code for operations that do not require language-model reasoning.

**Operations include**

- Authentication and permission checks.
- Database operations.
- Document metadata validation.
- Reference existence validation.
- Retrieval ranking and result handling.
- Claim verification result handling and validation.
- Execution limits and workflow controls.
- Report rendering and PDF generation.

**Context**

Legal research requires predictable, testable, and auditable system behaviour.

**Rationale**

- Reduces unnecessary LLM calls.
- Makes critical operations easier to test.
- Improves reliability and reproducibility.
- Prevents the language model from making decisions that should be enforced by application logic.

**Consequences**

- LLM output must be validated before being accepted.
- Deterministic operations should have automated tests.
- The system must distinguish model-generated analysis from application-validated results.

---

## ADR-010: Use Native-Text PDF Extraction Initially

**Status:** Accepted

**Decision**

Use PyMuPDF for initial PDF text extraction. Prioritize native-text PDFs. OCR is deferred from the initial MVP.

**Context**

The platform needs to ingest legal documents and extract their contents into searchable passages.

**Rationale**

- Native-text PDF extraction is simpler to implement and validate.
- PyMuPDF provides the required initial PDF-processing capability.
- Deferring OCR keeps the first implementation within the project's scope.

**Consequences**

- Scanned PDFs without extractable text may not be supported initially.
- Extraction quality must be checked.
- Unsupported or poor-quality documents must be reported clearly rather than silently treated as successfully processed.
- OCR may be considered in a later phase if justified.

---

## ADR-011: Use Server-Sent Events for Investigation Progress

**Status:** Accepted

**Decision**

Use Server-Sent Events (SSE) to communicate investigation progress from the backend to the frontend.

**Context**

Legal investigations may involve multiple retrieval and verification stages. Users need visibility into execution progress.

**Rationale**

- Supports server-to-client progress updates.
- Avoids unnecessary polling for progress information.
- Fits the requirement for a backend-controlled investigation workflow.

**Consequences**

- Progress events must have a consistent structure.
- The frontend must handle connection interruptions.
- Investigation execution must remain independent of the frontend connection.

---

## ADR-012: Use Docker Compose for Deployment

**Status:** Accepted

**Decision**

Use Docker Compose to define and run the initial application environment.

**Context**

The project requires a reproducible environment for development and deployment.

**Rationale**

- Simplifies environment setup.
- Makes application components easier to run consistently.
- Avoids introducing unnecessary orchestration infrastructure for the MVP.

**Consequences**

- Container configuration must be maintained.
- Secrets must not be hardcoded into images or committed configuration.
- More advanced orchestration is outside the initial scope.

---

## ADR-013: Select Python 3.12 as the Core Backend Runtime

**Status:** Accepted

**Decision**

Standardize on Python 3.12 (specifically Python 3.12.10) for all backend development, environment management, and dependency execution via a dedicated root virtual environment (`venv/`).

**Context**

The development workstation contains multiple Python versions (including system-level Python 3.14.3). Core dependencies for LegalLens AI—including FastAPI, Pydantic v2, LangGraph, SQLAlchemy, and psycopg/pgvector—require stable ecosystem support and binary wheel availability.

**Rationale**

- Python 3.12 offers proven runtime performance improvements, enhanced error reporting, and robust typing syntax.
- Cutting-edge or non-LTS releases (e.g., Python 3.14) encounter compatibility and binary wheel installation issues with machine learning and scientific packages.
- A project-local virtual environment (`venv/`) isolates dependencies from global interpreter states.

**Consequences**

- All backend commands, tests, and scripts must execute within the activated virtual environment (`.\venv\Scripts\Activate.ps1`).
- The Python version must be verified (`python --version` confirming 3.12.x).
- Python 3.14 or unapproved interpreter versions must not be used for backend dependency installation.

---

## ADR-014: Maintain Public Repository with Strict Credential Isolation

**Status:** Accepted

**Decision**

Maintain the project in a public GitHub repository (`https://github.com/Shakir5665/LegalLens-AI`) while enforcing an uncompromising zero-leakage security boundary for credentials, secrets, and environment configurations.

**Context**

LegalLens AI is designed to demonstrate professional AI engineering and legal technology practices publicly. However, backend operations connect to external cloud services (Neon PostgreSQL, Google Gemini API).

**Rationale**

- Public repository visibility enables transparent verification, open portfolio demonstration, and peer review.
- Security cannot rely on repository privacy; defense-in-depth credential management must be enforced from Day 1.

**Consequences**

- The root `.gitignore` strictly ignores `.env` and all `.env.*` variants, permitting only `.env.example`.
- Secrets, database passwords, and API keys must never be committed to git, recorded in documentation, or logged at runtime.
- Pre-commit reviews and CI verification must ensure local placeholder configurations remain completely decoupled from public version control.

---

## General Decision Principles

All future technical decisions should follow these principles:

1. **Evidence before complexity:** Introduce additional components only when requirements or evaluation results justify them.
2. **Deterministic where possible:** Do not use an LLM for operations that conventional code can perform reliably.
3. **Traceability:** Important legal claims and conclusions must be linked to identifiable evidence.
4. **Security by design:** Treat uploaded documents and retrieved content as untrusted input.
5. **Measurable quality:** Evaluate retrieval, verification, reliability, latency, and cost.
6. **Controlled orchestration:** Keep AI investigation workflows bounded, inspectable, and testable.
7. **Scope discipline:** Do not introduce deferred features into the MVP without a documented reason.

---

## Implementation Status

* **Phase 0 — Project Foundation:** **COMPLETED** (1 November 2026)
  * ADR-001 through ADR-014 formally reviewed, accepted, and recorded.
  * Baseline monorepo structure, Python 3.12.10 virtual environment, environment variable templates, root `.gitignore`, and documentation assets established.
* **Phase 1 — Backend Engineering Fundamentals:** **COMPLETED** (2 November 2026)
  * Modular FastAPI architecture, Pydantic v2 schemas, custom error handling, and in-memory Sri Lankan legal source catalog implemented and validated (22 unit tests passing).
* **Phase 2 — LLM Engineering:** **COMPLETED** (3 November 2026)
  * Gemini integration via official `google-genai` SDK, `LLMProvider` Protocol, `GeminiProvider`, `FakeLLMProvider`, `PromptTemplate`, native structured JSON output, Pydantic response validation, bounded retries with jitter (`execute_with_retry`), thinking-token accounting, deterministic cost estimation, privacy-safe telemetry logging, and developer CLI verification script implemented (72 passed, 1 skipped).
* **Phase 3 — Database & Document Intelligence:** **NEXT UP** (Pending Implementation)
  * Tasks 3.1 through 3.10 covering PostgreSQL, pgvector, SQLAlchemy 2.0, Alembic, and PyMuPDF PDF extraction.
* **Phase 4 through Phase 12:** **PLANNED TARGET ARCHITECTURE**
  * Core capabilities scheduled for Phase 4 and later (vector embeddings, hybrid retrieval, LangGraph multi-agent workflows, citation verification engine, React frontend) remain planned target designs and are strictly not yet implemented.
