# LegalLens AI — Architecture Decision Records

**Project:** LegalLens AI
**Status:** Accepted for MVP architecture
**Last Updated:** 4 November 2026

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

## ADR-015: Introduce a Version-Aware, Application-Level Caching Layer

**Status:** Accepted as a future design; implementation deferred to relevant roadmap phases.

**Decision**

Establish a centralized, version-aware, application-level caching architecture managed within the modular FastAPI backend through a logical Cache Manager. The implementation is governed by these core tenets:
1. **Logical Cache Manager:** Keep caching logic encapsulated within the FastAPI backend monolith (ADR-001), presenting a uniform caching contract across application services.
2. **PostgreSQL as Primary Durable Cache Store:** Store durable cache metadata, document extraction artifacts, and fingerprint registries natively in PostgreSQL, eliminating redundant storage infrastructure.
3. **pgvector for Vector Caching:** Retain embedding vectors and index structures natively in pgvector (ADR-004), avoiding dedicated third-party vector cache services.
4. **Optional Self-Hosted Valkey for Shared Transient Caching:** Defer shared high-throughput caching to Phase 11 (Production Engineering) and evaluate self-hosted Valkey solely if multi-worker concurrent throughput benchmarks justify it. Valkey is strictly optional; no paid Redis or proprietary SaaS cache is mandated.
5. **Bounded In-Process Cache for Development:** Provide a thread-safe, bounded in-process memory cache for local development and test suite isolation.
6. **Incremental Phase-Based Implementation:** Introduce cache mechanisms strictly aligned with roadmap milestones (Phase 2 prompt immutability, Phase 3 extraction artifacts, Phase 4 embeddings, Phase 5 retrieval candidate sets, Phase 7 LangGraph nodes, Phase 8 citation verification, Phase 11 Cache Manager & exact LLM responses, Phase 12 evaluation).
7. **Semantic Caching Disabled by Default:** Strictly forbid semantic caching of final legal answers and research conclusions. Semantically similar legal questions often hinge on different facts, effective dates, statutory thresholds, or procedural postures; answer-level semantic reuse introduces severe legal liability and hallucination risks.
8. **Strict Security, Authorization, and Freshness Gates:** Prioritize version-aware invalidation and authorization verification over cache hit ratios. Cached responses must never be returned across tenants or without checking user permissions, statutory as-of dates, and source amendments.

**Context**

LegalLens AI performs compute-intensive and latency-sensitive operations: native-text PDF extraction, dense embedding generation, hybrid lexical/semantic retrieval, iterative LangGraph agentic reasoning, claim-level citation verification, and structured Gemini LLM generation. Repeated queries or identical statutory lookups can lead to redundant external API token spend and CPU overhead.

However, legal research software cannot treat caching as a generic key-value optimization. Legal data carries strict correctness requirements:
- Legal statutes and judicial precedents are amended, repealed, or overruled over time.
- Research questions that appear superficially similar can have diametrically opposed legal answers depending on minute factual variations (such as length of service or scheduled employment status).
- User documents and case notes are confidential and tenant-isolated.
- Cached LLM outputs are AI-generated assistive text, not authoritative legal truth.

**Rationale**

- **Cost and Latency Control:** Avoids wasteful Google Gemini token consumption and repetitive PDF extraction while maintaining rapid response times for identical, validated workflows.
- **Legal Correctness & Freshness:** Explicit composite cache keys—incorporating legal as-of dates, statutory version hashes, prompt version tags, schema versions, and tenant scopes—guarantee that cached data is never returned in an obsolete or improper legal context.
- **Free-First Infrastructure Discipline:** Leveraging PostgreSQL and pgvector avoids the cost and operational footprint of external paid caching SaaS (e.g., Upstash, Redis Cloud, Pinecone). If a transient shared cache is later required for multi-worker deployments in Phase 11, open-source self-hosted Valkey provides high performance without vendor lock-in or licensing fees.
- **Maintainable Modularity:** Encapsulating caching logic in a Cache Manager abstraction maintains clean domain boundaries and allows graceful degradation (fail-open) if the caching backend encounters an error.

**Consequences**

- Caching code must not be implemented prematurely; implementation is deferred strictly to the corresponding roadmap phase for each workload.
- Cache invalidation logic must be rigorously defined for all stored entities (statutory updates, re-indexing, permission changes).
- Cache keys must be composite and comprehensive; raw user question text alone is strictly forbidden as a cache key.
- Sensitive query parameters and confidential document content in cache keys must be hashed using keyed HMAC-SHA-256 to prevent information leakage in cache logs.
- Cache misses, hits, invalidations, avoided Gemini API calls, avoided tokens, and estimated cost savings must be tracked in telemetry (Phase 11/12) without falsifying cached results as fresh API calls.

**Rejected Alternatives**

1. **Deploying Redis or Valkey Immediately in Phase 2/3:** Rejected as premature overengineering. Phase 2 LLM engineering and Phase 3 document ingestion do not possess concurrent multi-worker throughput demands justifying an external distributed cache server.
2. **Semantic Caching of Legal Conclusions:** Formally evaluated and rejected. Vector similarity search over legal questions inevitably conflates legally distinct scenarios (e.g., probationers vs. non-probationers), leading to invalid legal conclusions and hallucinated authorities.
3. **Unbounded In-Memory Python Caching in Production:** Rejected. In-memory dictionaries lack cross-process sharing across multi-worker Uvicorn processes and create memory-leak risks under production workloads.
4. **Cache-Aside Without Version Awareness:** Rejected. Standard TTL-only caching without source version and legal as-of date invalidation would serve superseded statutes and overruled case law to legal practitioners.

---

## ADR-016: Cloud Object Storage Abstraction, Neon S3 Compatibility, and Private Presigned Access Control

**Status:** Accepted and Implemented (4 November 2026)

**Decision**

1. **Storage Provider Abstraction:** Establish an abstract `StorageProvider` interface defining uniform binary lifecycle operations (`store_file`, `get_file_bytes`, `delete_file`, `file_exists`, `generate_presigned_download_url`).
2. **Dual Providers:**
   - `LocalStorageProvider`: Default for local development, CI/CD, and offline testing. Enforces strict path traversal confinement and generates backend-verified HMAC-SHA256 signed URLs.
   - `NeonStorageProvider`: For production cloud deployments using Neon S3-compatible Object Storage in AWS Singapore (`ap-southeast-1`). Configured using `boto3` with path-style addressing (`Config(s3={"addressing_style": "path"}, signature_version="s3v4")`).
3. **Strict Private Storage & Presigned Downloads:** All storage containers remain strictly private. Frontend clients never receive long-lived cloud credentials; downloads are authorized and served via short-lived presigned URLs (default 10-minute expiry).
4. **Backend-Mediated Uploads:** All document uploads pass through FastAPI endpoints for content-based magic-byte validation, streaming size limits (25 MB default), SHA-256 checksum calculation, and transactional database recording. Direct client-to-cloud bypass is rejected.
5. **Immutable Structured Keys:** Uploaded PDFs are persisted under deterministic, non-overwritable keys: `documents/{document_id}/versions/{version_id}/{uuid}.pdf`.
6. **Duplicate Rejection Policy:** Uploading an identical PDF (by SHA-256) to the same logical legal document is rejected with `HTTP 409 Conflict` (`DUPLICATE_DOCUMENT_VERSION`).
7. **Soft Deletion & Chunk Suppression:** Soft-deleting a version marks `is_deleted=True`, `deleted_at=now`, and purges all `DocumentChunk` records from the database to remove them from active search/RAG pipelines, while retaining the PDF object in storage for potential administrative recovery.
8. **Synchronous Lifecycle & Failure Recovery:** Document versions transition through `processing`, `processed`, `failed`, or `scanned_only`. Failures during extraction or chunking preserve the PDF object and record diagnostic metadata, enabling manual re-processing via a dedicated `/retry` endpoint without file re-upload.

**Context**

LegalLens AI requires durable, cost-effective, and secure PDF storage for Sri Lankan legal instruments. Neon provides managed PostgreSQL in AWS Singapore (`ap-southeast-1`) alongside S3-compatible object storage. Development and local testing must remain fully functional offline without mandatory cloud infrastructure.

**Rationale**

- Provider abstraction decouples application services from specific cloud storage vendors.
- Path-style S3 addressing ensures full compatibility with Neon object storage.
- Private presigned URLs satisfy strict legal evidence security and zero-credential frontend exposure.
- Soft-deletion with chunk purging guarantees search integrity while preserving raw legal evidence.

**Consequences**

- Storage provider is selectable via `STORAGE_PROVIDER=local|neon`.
- `boto3` is included in backend dependencies.
- Local storage remains the zero-configuration default for development and automated tests.

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
* **Phase 3 — Database & Document Intelligence:** **COMPLETED** (4 November 2026)
  * Tasks 3.1 through 3.10 and Tasks 3.A through 3.G fully implemented and verified against live Neon PostgreSQL (127 passed, 1 skipped).
  * Implemented: PostgreSQL connectivity, connection pooling, SQLAlchemy 2.x models (`Document`, `DocumentVersion`, `DocumentChunk`), Alembic migrations, PyMuPDF extraction, structure-aware legal chunking with multi-page section tracing, storage provider abstraction (`LocalStorageProvider` and S3-compatible `NeonStorageProvider`), presigned download URLs, immutable key paths, HTTP 409 duplicate rejection, soft-deletion with chunk purge/restoration, failure recovery lifecycle, and `/retry` endpoint.
* **ADR-015 (Caching Architecture):** **ACCEPTED AS FUTURE DESIGN** (4 November 2026)
  * Version-aware application-level caching strategy accepted; implementation deferred to relevant roadmap phases (Phases 3, 4, 5, 7, 8, 11, 12).
* **ADR-016 (Cloud Object Storage & Presigned Access):** **ACCEPTED AND IMPLEMENTED** (4 November 2026)
  * StorageProvider interface, Local and Neon S3 implementations, private presigned URLs, immutable version keys, and soft deletion.
* **Phase 4 through Phase 12:** **PLANNED TARGET ROADMAP**
  * **Phase 4:** Dense Vector Embeddings & pgvector Integration (Semantic Chunk Embeddings & Indexing).
  * **Phase 5:** Hybrid Legal Retrieval (Reciprocal Rank Fusion over pgvector and BM25/Full-Text Search).
  * **Phase 6:** Agentic Workflow Design & State Graph Modeling.
  * **Phase 7:** Multi-Agent Legal Investigation Implementation (LangGraph).
  * **Phase 8:** Grounded Citation Verification & Hallucination Guardrails.
  * **Phase 9:** Optical Character Recognition (OCR) for Scanned Historical Legal Documents.
  * **Phase 10:** Multi-Tenant Isolation, User Identity, Ownership & Research Projects.
  * **Phase 11:** Production Engineering, Storage Hardening, Advanced Caching & Governance.
  * **Phase 12:** Empirical Evaluation, Benchmarking & Deployment.
