# LegalLens AI – System Architecture

## 1. Project Overview

**LegalLens AI – Evidence before Answers** is an evidence-grounded agentic AI platform designed to assist with legal research in Sri Lanka, initially focusing on Employment Law.

The system combines legal document management, hybrid information retrieval, AI-assisted legal investigation, citation verification and structured report generation.

Its central principle is that important legal claims must be traceable to relevant source evidence.

LegalLens AI is a legal research assistance tool, not a replacement for qualified legal professionals or a provider of definitive legal advice.

## 2. Architecture Style

LegalLens AI follows a **modular monolithic backend architecture**.

The application uses one Python FastAPI backend containing logically separated modules. The frontend and backend are maintained in a single Git repository.

This approach provides clear module boundaries without introducing the operational complexity of multiple microservices.

### Main applications

- **Frontend:** React, TypeScript and Tailwind CSS.
- **Backend:** Python and FastAPI.
- **Database:** Neon PostgreSQL with pgvector.
- **AI model:** Gemini API.
- **Workflow orchestration:** LangGraph.

## 3. Four Logical Architecture Layers

### 3.1 Application Layer

Responsible for user interaction and application-level operations.

Components:
- React frontend.
- TypeScript.
- Tailwind CSS.
- FastAPI endpoints.
- Authentication and authorisation.
- Research project management.
- Document upload.
- Research question submission.
- Investigation progress and result presentation.

### 3.2 Agent Orchestration Layer

Responsible for coordinating the legal research workflow.

Components:
- LangGraph workflow.
- Research Orchestrator.
- Question analysis.
- Research planning and routing.
- Evidence retrieval coordination.
- Legal analysis coordination.
- Case comparison coordination.
- Claim verification coordination.

The workflow is controlled and bounded rather than an unrestricted autonomous agent system.

### 3.3 Legal Intelligence Layer

Responsible for legal knowledge storage, document processing and evidence retrieval.

Components:
- PostgreSQL.
- pgvector.
- PostgreSQL Full-Text Search.
- Legal document ingestion.
- Metadata extraction.
- Text extraction and chunking.
- Hosted embedding generation.
- Semantic retrieval.
- Keyword retrieval.
- Hybrid ranking.
- Evidence and citation lookup.

Keyword and semantic retrieval are combined to improve the identification of relevant legal passages.

### 3.4 Harness and Governance Layer

Responsible for controlling execution, enforcing system rules and improving reliability.

Components:
- Input and output validation.
- Evidence requirements.
- Permission checks.
- Execution limits.
- Cost monitoring.
- Logging and observability.
- Error handling and recovery.
- Audit traces.
- Untrusted-document handling.

This layer ensures that AI workflows operate within defined constraints.

## 4. High-Level System Architecture

The system consists of a React frontend, one modular FastAPI backend, a controlled LangGraph investigation workflow and a PostgreSQL-based legal knowledge layer.

The four logical layers describe responsibilities within the application. They are not separate microservices.

## 5. Research Investigation Workflow

The expected research workflow is:

1. A user submits a legal research question through the React frontend.
2. FastAPI authenticates the user and validates the request.
3. The Research Orchestrator initiates the investigation workflow.
4. Question analysis identifies the research intent and relevant legal context.
5. The workflow plans the necessary research steps.
6. The retrieval components search the legal knowledge base using keyword and semantic retrieval.
7. Retrieved results are ranked and supplied as evidence for legal analysis.
8. Relevant legislation and judicial decisions are examined.
9. Important claims and citations are checked against source documents.
10. The evidence gate evaluates whether the investigation has sufficient support.
11. Validated structured results are passed to the report renderer.
12. The user receives the research report, evidence references and relevant limitations.

If sufficient evidence cannot be found, the system should communicate the limitation rather than present unsupported conclusions as established facts.

## 6. Retrieval Architecture

LegalLens AI uses a hybrid retrieval approach.

### Keyword Retrieval

Uses PostgreSQL Full-Text Search to identify exact or closely matching terms, statutory section references, legal terminology and case references.

### Semantic Retrieval

Uses hosted embedding models and pgvector to identify passages with conceptually similar meanings, even when the wording differs.

### Hybrid Retrieval

Combines keyword and semantic retrieval results using a ranking strategy.

The purpose is to improve retrieval coverage and relevance by using both exact-term matching and semantic similarity.

## 7. Evidence and Citation Verification

Citation verification has two distinct responsibilities:

1. **Reference existence validation:** Determines whether a cited legal source or referenced provision can be located in the available knowledge base.
2. **Evidence-support assessment:** Determines whether the retrieved source passage actually supports the associated legal claim.

Claim-support outcomes:

- Supported
- Partially supported
- Unsupported
- Contradicted
- Ambiguous

Important claims should be linked to inspectable source passages.

The existence of a citation alone does not establish that a claim is legally correct or supported.

## 8. Report Generation

The research workflow produces structured, validated data.

Python report templates will render the final report deterministically.

The report renderer is responsible for formatting and presenting validated findings. It must not introduce new legal claims.

Expected report sections include:

1. Research question.
2. Quick answer.
3. Detailed legal explanation.
4. Relevant legislation.
5. Relevant judicial decisions.
6. Case comparison, where applicable.
7. Supporting evidence and citations.
8. Claim verification results.
9. Missing facts and limitations.
10. Suggested next research steps.

## 9. Technology Stack

| Area | Technology |
|---|---|
| Frontend | React |
| Frontend language | TypeScript |
| Styling | Tailwind CSS |
| Backend | Python |
| API framework | FastAPI |
| Data validation | Pydantic |
| LLM provider | Gemini API |
| Workflow orchestration | LangGraph |
| Database | Neon PostgreSQL |
| Vector search | pgvector |
| Keyword search | PostgreSQL Full-Text Search |
| PDF extraction | PyMuPDF |
| Embeddings | Hosted embedding API |
| External tool interoperability | Python MCP SDK |
| Report generation | Deterministic Python templates |
| Progress updates | Server-Sent Events (SSE) |
| Deployment | Docker Compose |

## 10. Important Architecture Constraints

- Maintain one modular FastAPI backend.
- Do not introduce microservices without a justified requirement.
- Use deterministic code for database operations, permissions, reference validation, ranking and report rendering.
- Use LLMs for tasks requiring language understanding and reasoning.
- Treat retrieved legal documents as untrusted input.
- Enforce evidence requirements before presenting claims as supported.
- Keep workflow execution bounded and observable.
- Use MCP for approved external interoperability.
- Call internal Python retrieval and verification modules directly rather than unnecessarily exposing them through MCP.
- Begin with native-text PDFs; OCR is deferred.
- Introduce additional complexity only when evaluation demonstrates a need.

## 11. Current Implementation Status

### 11.1 Phase 0: Project Foundation — Completed
Completed 1 November 2026. Monorepo directory hierarchy established (`apps/web/`, `apps/api/`, `docs/`, `infrastructure/`, `tests/`), Python 3.12.10 virtual environment isolated, `.gitignore` rules active, and initial architectural decisions (ADR-001 through ADR-014) documented.

### 11.2 Phase 1: Backend Engineering Fundamentals — Completed
Completed 2 November 2026. Modular FastAPI application structure, typed Pydantic v2 schemas, domain-driven error handling, and in-memory Sri Lankan legal source catalog implemented and validated with 22 automated tests.

### 11.3 Phase 2: LLM Engineering — Completed
Completed 3 November 2026. Production-grade Gemini integration via official `google-genai` SDK (`google-genai==1.2.0`), decoupled `LLMProvider` Protocol, `GeminiProvider`, `FakeLLMProvider`, `PromptTemplate` architecture, native structured JSON generation, Pydantic response validation (`LegalQueryAnalysisResult`), bounded retries with jitter (`execute_with_retry`), thinking-token accounting, deterministic token pricing, privacy-safe telemetry logging, and developer CLI verification script implemented and validated with 73 automated tests (72 passed, 1 skipped).

### 11.4 Next Milestone & Implementation Boundary
- **Phase 3 (Database & Document Intelligence):** The next milestone to be implemented, covering PostgreSQL, pgvector, SQLAlchemy 2.0, Alembic, and PyMuPDF PDF extraction.
- **Phases 4 through 12:** Core application modules described in this document—including pgvector semantic search, hybrid retrieval pipelines, LangGraph multi-agent investigation workflows, citation verification engines, and React web frontend—represent the **agreed target architecture** and remain strictly **unimplemented**. Implementation proceeds sequentially phase-by-phase.
