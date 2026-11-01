# LegalLens AI — Architecture Decision Records

**Project:** LegalLens AI  
**Status:** Accepted for MVP architecture  
**Last Updated:** 1 November 2026

This document records the major architectural and technology decisions for LegalLens AI. These decisions establish the technical direction for the initial MVP and should be revisited only when implementation evidence, evaluation results, or genuine project requirements justify a change.

---

## ADR-001: Use a Modular Monolithic Backend

**Status:** Accepted

**Decision**

Use one Python backend built with FastAPI. Organize the backend into clearly separated modules rather than deploying separate microservices.

**Context**

LegalLens AI requires API handling, authentication, document processing, legal retrieval, AI orchestration, citation verification, and report generation. These capabilities need clear boundaries, but the initial MVP does not require independently deployed services.

**Rationale**

- Reduces deployment and infrastructure complexity.
- Makes local development and debugging easier.
- Allows modules to communicate directly through Python interfaces.
- Keeps the architecture manageable for the initial development scope.

**Consequences**

- Modules must maintain clear responsibilities and interfaces.
- The backend is deployed as one application.
- Separate services may be considered later only if measurable requirements justify them.

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

## General Decision Principles

All future technical decisions should follow these principles:

1. **Evidence before complexity:** Introduce additional components only when requirements or evaluation results justify them.
2. **Deterministic where possible:** Do not use an LLM for operations that conventional code can perform reliably.
3. **Traceability:** Important legal claims and conclusions must be linked to identifiable evidence.
4. **Security by design:** Treat uploaded documents and retrieved content as untrusted input.
5. **Measurable quality:** Evaluate retrieval, verification, reliability, latency, and cost.
6. **Controlled orchestration:** Keep AI investigation workflows bounded, inspectable, and testable.
7. **Scope discipline:** Do not introduce deferred features into the MVP without a documented reason.

## Implementation Status

These records document the accepted MVP architecture. They do not imply that every technology or capability has already been implemented or tested.

Implementation status must be updated only after the relevant functionality has been developed and verified.