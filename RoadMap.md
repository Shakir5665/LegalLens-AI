# LegalLens AI --- Complete Development Roadmap

**Project:** LegalLens AI\
**Purpose:** Evidence-Grounded Agentic AI Platform for Sri Lankan Legal
Research, Case Analysis and Citation Verification\
**Roadmap basis:** The 35-page LegalLens AI Project Proposal and the
Master Engineering & Architecture Teaching Guide supplied for this
project.

------------------------------------------------------------------------

## 1. Purpose and guiding principles

This roadmap translates the original project proposal and the documented
implementation guide into an ordered development plan for completing
LegalLens AI.

LegalLens AI is intended to be an AI-assisted legal research
environment, not a general-purpose legal chatbot. It should help users:

-   Understand a legal research question and identify missing facts.
-   Find relevant legislation and judicial decisions.
-   Retrieve exact supporting passages.
-   Analyze and compare judgments.
-   Verify citations and claim-to-source support.
-   Identify insufficient, conflicting, or uncertain evidence.
-   Produce structured research reports with traceable sources.
-   Preserve research activity and agent execution traces.
-   Support human review where important findings require oversight.

**Central engineering principle:** Important legal claims must be
supported by traceable evidence or explicitly labelled as unsupported or
uncertain.

### Important implementation discipline

The teaching guide documents substantial foundation work, including the
monorepo, frontend views, domain contracts, agent responsibilities, MCP
tool catalogue, Docker infrastructure, and synthetic-data safeguards.
However, a guide describing an implementation is not the same as a
repository audit proving that every feature works end to end.

Therefore:

1.  Treat documented work as *reported progress*, not automatically
    verified completion.
2.  Audit the repository and run the application before deciding that a
    phase is complete.
3.  Distinguish implemented, partially implemented, mocked, hardcoded,
    and missing functionality.
4.  Preserve the proposal's scope and technology decisions unless a
    deliberate, documented change is approved.
5.  Do not claim real-world legal accuracy from a synthetic dataset.

------------------------------------------------------------------------

## 2. Documented foundation and initial status

The engineering guide reports work in the following areas:

-   Requirements and source-of-truth analysis.
-   Monorepo topology:
    -   `apps/web` --- React 19, TypeScript, Vite and Tailwind CSS.
    -   `apps/api` --- .NET 10 Web API.
    -   `apps/ai-service` --- Python, FastAPI, LangGraph and MCP SDK.
    -   `infrastructure` --- Docker Compose and database infrastructure.
    -   `docs` --- architecture and project documentation.
-   Frontend shell, design tokens, navigation and 13 application views.
-   TypeScript legal-domain interfaces and synthetic-data flags.
-   Responsibilities for eight specialized agents and one orchestrator.
-   A catalogue of ten legal research MCP tools.
-   Removal of a duplicate Node.js MCP implementation in favour of the
    Python implementation.
-   PostgreSQL with pgvector as the proposed hybrid retrieval
    foundation.
-   Synthetic-data disclaimers and evidence-gating concepts.

These items must still be checked against the current source code,
configuration, database and running application.

------------------------------------------------------------------------

# 3. Complete development roadmap

## Phase 1 --- Audit and stabilize the existing implementation

**Objective:** Establish a reliable, evidence-based picture of the
current repository before adding features.

### Tasks

-   [ ] Inspect the complete monorepo structure.
-   [ ] Read the root README and service-specific setup instructions.
-   [ ] Review environment-variable templates and configuration.
-   [ ] Install dependencies for the frontend, backend and AI service.
-   [ ] Start PostgreSQL and verify database connectivity.
-   [ ] Run database migrations and verify the resulting schema.
-   [ ] Start the .NET API and inspect its health endpoints.
-   [ ] Start the Python FastAPI service and inspect its health
    endpoints.
-   [ ] Start the React application.
-   [ ] Verify that the .NET API can communicate with the AI service.
-   [ ] Verify that the AI service can communicate with PostgreSQL.
-   [ ] Verify that Docker Compose starts the required services.
-   [ ] Test authentication and protected routes.
-   [ ] Identify mocked, hardcoded, incomplete and disconnected
    features.
-   [ ] Record startup errors, failing tests, warnings and known
    limitations.

### Completion criteria

-   The development environment can be started using documented
    instructions.
-   All required services start and communicate.
-   Critical configuration and migration issues are resolved.
-   A written audit distinguishes working, partial, mocked and missing
    functionality.

**Deliverable:** Repository audit and stable development environment.

------------------------------------------------------------------------

## Phase 2 --- Complete database and domain implementation

**Objective:** Ensure the application has persistent, well-defined data
structures for users, documents, research and evidence.

### Candidate domain entities

The following entities are a practical implementation checklist derived
from the proposal's data and workflow requirements. Confirm the exact
schema against the original database design before implementation.

-   [ ] Users
-   [ ] Research projects
-   [ ] Research runs
-   [ ] Legal documents
-   [ ] Document versions
-   [ ] Legal passages
-   [ ] Citations
-   [ ] Research sources
-   [ ] Research claims
-   [ ] Claim-evidence relationships
-   [ ] Agent executions
-   [ ] Agent events
-   [ ] Document uploads
-   [ ] Human reviews
-   [ ] Audit logs

### Tasks

-   [ ] Define entity relationships and cardinalities.
-   [ ] Define primary keys, foreign keys and unique constraints.
-   [ ] Add indexes for common lookup and filtering operations.
-   [ ] Implement EF Core entities and migrations in the .NET API.
-   [ ] Implement Python database models and access patterns.
-   [ ] Define transaction boundaries and persistence ownership.
-   [ ] Persist research runs and their statuses.
-   [ ] Persist documents, passages and source metadata.
-   [ ] Persist claims and their supporting evidence records.
-   [ ] Persist agent execution events and workflow checkpoints.
-   [ ] Implement user-level data isolation and authorization checks.
-   [ ] Test persistence across service and database restarts.

### Completion criteria

-   The database schema is reproducible from migrations.
-   Research, documents, evidence and execution history persist.
-   Relationships and access boundaries are enforced.
-   Backend and AI-service data contracts are consistent.

**Deliverable:** A persistent database and verified domain model.

------------------------------------------------------------------------

## Phase 3 --- Build the synthetic Sri Lankan legal knowledge base

**Objective:** Create the controlled research corpus required to
demonstrate retrieval, analysis and citation verification.

The proposal selects Sri Lankan employment law as the initial bounded
domain. It proposes an AI-augmented synthetic dataset for the MVP, with
authentic legal materials considered for a later stage subject to source
verification, access and licensing.

### Dataset targets from the proposal

  Dataset component           Proposed target
  ------------------------- -----------------
  Synthetic legislation                15--20
  Synthetic judgments                  30--50
  Research documents                   10--15
  Employment contracts                 10--15
  Research questions                  50--100
  Claim-evidence examples             50--100

These are planning targets, not evidence that the dataset already
exists.

### Tasks

-   [ ] Define schemas for legislation, judgments, contracts, documents,
    passages and citations.
-   [ ] Define required metadata fields and controlled vocabularies.
-   [ ] Generate synthetic legislation and provisions.
-   [ ] Generate fictional judicial decisions and case metadata.
-   [ ] Generate synthetic employment contracts and legal documents.
-   [ ] Generate research questions across the required categories.
-   [ ] Generate expected source IDs and relevant passage IDs for
    benchmark questions.
-   [ ] Create controlled relationships between cases, statutes,
    concepts and passages.
-   [ ] Validate document structure and metadata completeness.
-   [ ] Validate that all internal references resolve.
-   [ ] Assign unique IDs to documents, passages and citations.
-   [ ] Mark every synthetic document and example explicitly as
    synthetic.
-   [ ] Ensure synthetic references cannot be mistaken for genuine
    reported judgments.
-   [ ] Store dataset version and generation metadata.

### Completion criteria

-   The corpus meets the agreed MVP scope.
-   Every document and relationship has valid internal references.
-   Synthetic content is visibly and structurally labelled.
-   Benchmark questions have expected supporting document and passage
    IDs.

**Deliverable:** Versioned synthetic legal research corpus.

------------------------------------------------------------------------

## Phase 4 --- Implement the document ingestion pipeline

**Objective:** Allow users to upload legal documents and convert them
into structured, searchable content.

### Supported formats

-   PDF
-   DOCX
-   TXT

### Tasks

-   [ ] Implement authenticated document upload.
-   [ ] Validate file extensions, MIME types and file sizes.
-   [ ] Store original files securely.
-   [ ] Extract PDF text using PyMuPDF.
-   [ ] Add OCR using Tesseract for scanned PDFs where required.
-   [ ] Extract DOCX content using python-docx.
-   [ ] Extract TXT content safely.
-   [ ] Identify document type and available metadata.
-   [ ] Extract parties, dates, clauses and legal references where
    applicable.
-   [ ] Detect headings, sections, subsections and paragraphs.
-   [ ] Implement structure-aware chunking.
-   [ ] Preserve page, section and paragraph references.
-   [ ] Assign stable document and passage identifiers.
-   [ ] Store extracted text and structured metadata.
-   [ ] Track processing status and failures.
-   [ ] Handle malformed, encrypted, empty and unsupported files.
-   [ ] Prevent uploaded document content from being treated as trusted
    instructions.
-   [ ] Test extraction against representative documents.

### Completion criteria

-   A user can upload a supported file.
-   The system extracts and persists its content.
-   Passage references can be traced back to the original document
    location.
-   Processing failures are visible and recoverable.

**Deliverable:** Working document upload, extraction, structuring and
storage pipeline.

------------------------------------------------------------------------

## Phase 5 --- Implement the Hybrid RAG pipeline

**Objective:** Retrieve relevant legal documents and passages using both
semantic and exact-term search.

### Tasks

-   [ ] Select and configure an embedding model.
-   [ ] Generate embeddings for indexed passages.
-   [ ] Store vectors in PostgreSQL using pgvector.
-   [ ] Configure PostgreSQL full-text search.
-   [ ] Implement semantic vector retrieval.
-   [ ] Implement keyword/full-text retrieval.
-   [ ] Add metadata filters for jurisdiction, document type, court and
    dates where available.
-   [ ] Handle document versions and effective dates where the corpus
    provides them.
-   [ ] Combine retrieval rankings using Reciprocal Rank Fusion (RRF).
-   [ ] Implement cross-encoder reranking if justified by evaluation.
-   [ ] Return structured evidence objects.
-   [ ] Preserve document ID, passage ID, page/section reference and
    source metadata.
-   [ ] Handle empty and insufficient retrieval results.
-   [ ] Add retrieval logging and latency measurements.
-   [ ] Build a small labelled retrieval benchmark.

### Intended retrieval flow

1.  Receive a legal research query.
2.  Apply relevant query and metadata constraints.
3.  Run semantic vector search.
4.  Run keyword/full-text search.
5.  Merge rankings using RRF.
6.  Rerank candidate passages where configured.
7.  Return ranked passages with provenance.
8.  Report when evidence is insufficient.

### Completion criteria

-   Both semantic and keyword retrieval work.
-   Results include traceable source and passage identifiers.
-   Retrieval can be measured using a labelled benchmark.
-   Filters and empty-result behaviour are tested.

**Deliverable:** Hybrid legal retrieval API.

------------------------------------------------------------------------

## Phase 6 --- Complete the LangGraph multi-agent workflow

**Objective:** Turn the documented agent responsibilities into a
functioning, controlled research workflow.

### Eight specialized agents

  -----------------------------------------------------------------------
  Agent                               Responsibility
  ----------------------------------- -----------------------------------
  Question Analysis Agent             Understand the question, identify
                                      issues and missing facts

  Document Analysis Agent             Extract structured information from
                                      uploaded documents

  Legislation Research Agent          Find relevant legislation and
                                      statutory passages

  Case Discovery Agent                Discover relevant judgments

  Case Comparison Agent               Compare facts, issues, reasoning
                                      and outcomes

  Citation Verification Agent         Verify citations, passages and
                                      claim support

  Legal Synthesis Agent               Synthesize findings from verified
                                      evidence

  Report Generation Agent             Produce a structured research
                                      report
  -----------------------------------------------------------------------

The Research Orchestrator coordinates these specialized agents.

### Tasks

-   [ ] Define a typed shared `LegalResearchState`.
-   [ ] Define Pydantic input and output schemas for each agent.
-   [ ] Implement and test each agent independently.
-   [ ] Give each agent only the tools and context it needs.
-   [ ] Implement the question-analysis and research-planning stage.
-   [ ] Implement legislation and case retrieval stages.
-   [ ] Implement document analysis when uploads are present.
-   [ ] Implement case comparison.
-   [ ] Implement citation and evidence verification.
-   [ ] Implement legal synthesis from verified evidence.
-   [ ] Implement structured report generation.
-   [ ] Build the LangGraph StateGraph.
-   [ ] Add conditional routing for optional document analysis and
    review.
-   [ ] Add evidence-sufficiency routing.
-   [ ] Add bounded additional-retrieval loops.
-   [ ] Add workflow checkpoint persistence.
-   [ ] Add recovery from interrupted workflows.
-   [ ] Add human-in-the-loop interrupts for important review cases.
-   [ ] Test successful, incomplete, conflicting and failed research
    paths.

### Completion criteria

-   Agents execute their assigned responsibilities.
-   Shared state is validated and persisted appropriately.
-   The graph routes correctly and does not loop indefinitely.
-   Insufficient evidence is handled explicitly.
-   Workflow progress and outputs can be inspected.

**Deliverable:** Working multi-agent legal research workflow.

------------------------------------------------------------------------

## Phase 7 --- Complete MCP server and client integration

**Objective:** Provide standardized, controlled access to legal research
tools.

The teaching guide lists ten initial tools:

1.  `search_legislation`
2.  `get_legislation_section`
3.  `search_judgments`
4.  `get_judgment_details`
5.  `verify_case_citation`
6.  `verify_statutory_reference`
7.  `verify_evidence_passage`
8.  `check_claim_support`
9.  `get_uploaded_document`
10. `extract_document_clauses`

### Tasks

-   [ ] Implement the MCP server using the Python MCP SDK.
-   [ ] Register the ten tools with explicit input schemas.
-   [ ] Define structured tool outputs and error responses.
-   [ ] Implement tool argument validation.
-   [ ] Implement authorization and user-scoped access.
-   [ ] Connect the LangGraph application through an MCP client.
-   [ ] Test tool discovery and invocation.
-   [ ] Test invalid arguments and unavailable resources.
-   [ ] Enforce timeouts and bounded retries.
-   [ ] Record tool invocations and outcomes.
-   [ ] Verify that tools cannot access unauthorized documents.
-   [ ] Document the MCP server and tool contracts.

**Important distinction:** REST endpoints that expose tool-like
operations do not, by themselves, establish a standards-compliant MCP
server. Verify actual MCP protocol operation and client integration.

### Completion criteria

-   The MCP server starts and exposes the intended tools.
-   The AI workflow can discover and invoke authorized tools.
-   Invalid and unauthorized calls fail safely.
-   Tool activity is observable.

**Deliverable:** Working MCP server and LangGraph MCP client
integration.

------------------------------------------------------------------------

## Phase 8 --- Implement the legal knowledge graph

**Objective:** Represent and retrieve relationships between cases,
legislation, provisions and legal concepts.

The proposal identifies Neo4j for the knowledge graph. Confirm whether
it is included in the current implementation and infrastructure before
proceeding.

### Candidate graph entities

-   Case
-   Court
-   Judge
-   Act
-   Section
-   Regulation
-   Legal concept
-   Party
-   Document

### Candidate relationships

-   `CITES`
-   `INTERPRETS`
-   `APPLIES`
-   `AMENDS`
-   `DISTINGUISHES`
-   `OVERRULES`
-   `HEARD_BY`
-   `CONTAINS_SECTION`

### Tasks

-   [ ] Define the graph schema.
-   [ ] Define stable IDs linking graph nodes to source documents.
-   [ ] Extract relationships from the synthetic corpus.
-   [ ] Validate relationships against source content.
-   [ ] Populate the graph.
-   [ ] Implement graph traversal queries.
-   [ ] Integrate graph retrieval with Case Discovery.
-   [ ] Combine graph results with hybrid retrieval where useful.
-   [ ] Display related cases and statutory provisions.
-   [ ] Test incorrect, missing and conflicting relationships.

Do not infer that one judgment overrules another merely because it cites
or discusses it.

### Completion criteria

-   Graph nodes and edges map to traceable source records.
-   Relevant relationships can be queried.
-   Graph results can contribute to research workflows.
-   Unsupported relationships are not presented as verified facts.

**Deliverable:** Searchable legal relationship graph.

------------------------------------------------------------------------

## Phase 9 --- Complete citation verification and evidence governance

**Objective:** Make citation and claim-to-source verification the
signature reliability capability of LegalLens AI.

### Verification stages

1.  **Source existence:** Does the referenced document exist in the
    available corpus?
2.  **Metadata verification:** Do title, case number, court and date
    match the source record?
3.  **Passage verification:** Does the cited passage exist in the
    source?
4.  **Claim support:** Does the passage support the associated claim?
5.  **Jurisdiction verification:** Is the source appropriate for the
    requested jurisdiction?
6.  **Version verification:** Is the correct document version being
    used, where version data is available?

### Tasks

-   [ ] Define a structured citation record.
-   [ ] Implement source-existence checks.
-   [ ] Implement citation metadata checks.
-   [ ] Implement passage-ID and verbatim passage checks.
-   [ ] Implement claim-to-passage support evaluation.
-   [ ] Detect unsupported claims.
-   [ ] Detect conflicting evidence.
-   [ ] Track jurisdiction and document-version information.
-   [ ] Store verification results and reasons.
-   [ ] Link every material report claim to evidence records.
-   [ ] Prevent unverified citations from being labelled verified.
-   [ ] Add human-review flags for ambiguity and conflicting evidence.
-   [ ] Test false acceptance and false rejection cases.

### Suggested evidence statuses

-   Supported
-   Partially supported
-   Unsupported
-   Unverified
-   Conflicting evidence

**Important:** An exact quotation match proves that text exists in a
source; it does not, by itself, prove that the source legally supports
the generated proposition.

### Completion criteria

-   Verification checks are independently measurable.
-   Claims have explicit evidence links or uncertainty labels.
-   Citation status is based on source checks, not solely on an LLM
    assertion.
-   Unsupported claims are detected and surfaced.

**Deliverable:** Citation verification and claim-evidence governance
service.

------------------------------------------------------------------------

## Phase 10 --- Complete frontend and backend integration

**Objective:** Replace mock or hardcoded data with real application and
AI-service functionality.

### Application areas to integrate

  Frontend area                Required integration
  ---------------------------- --------------------------------------------
  Sign In and Register         .NET authentication APIs
  Research Dashboard           Persisted projects and research statistics
  New Research                 Research submission API
  Live Research Execution      Workflow status and agent events
  Research Synthesis Dossier   Actual research findings
  Statutes                     Retrieved legislation and passages
  Precedents                   Retrieved judgments and source metadata
  Case Comparison              Case Comparison Agent output
  Document Vault               Upload, processing and document APIs
  Clause Viewer                Document Analysis Agent output
  Reports Library              Persisted reports and export
  Research History             Previous research runs
  Profile Settings             User preferences and security settings

### Tasks

-   [ ] Audit every view for mock and hardcoded data.
-   [ ] Define API contracts for each integrated view.
-   [ ] Connect authentication and authorization.
-   [ ] Connect research creation and retrieval.
-   [ ] Connect background workflow execution.
-   [ ] Display agent progress and execution status.
-   [ ] Connect findings, statutes and precedents.
-   [ ] Connect case comparisons.
-   [ ] Connect document uploads and extracted clauses.
-   [ ] Connect citation verification results.
-   [ ] Connect human-review actions.
-   [ ] Persist and display research history.
-   [ ] Implement report export.
-   [ ] Add loading, empty, error and retry states.
-   [ ] Add evidence inspection and source navigation.
-   [ ] Display synthetic-data notices consistently.
-   [ ] Test complete user journeys.

### Completion criteria

A user can authenticate, submit a research question, follow the
investigation, inspect evidence, review the result and access the saved
report.

**Deliverable:** Fully integrated LegalLens AI application.

------------------------------------------------------------------------

## Phase 11 --- Complete Harness Engineering, security and observability

**Objective:** Control agent execution, permissions, validation,
recovery and monitoring.

### Reliability mechanisms

-   [ ] Evidence gate: important claims require evidence or an explicit
    unsupported/uncertain label.
-   [ ] Citation gate: citations must be checked against indexed or
    accessible sources.
-   [ ] Retrieval sufficiency gate: insufficient evidence triggers
    bounded retrieval or an insufficient-evidence response.
-   [ ] Execution budget: agent iterations, tool calls and execution
    time are limited.
-   [ ] Recovery: interrupted workflows resume from persisted
    checkpoints.

### Initial execution budgets from the proposal

  Control                         Initial MVP limit
  ----------------------------- -------------------
  Specialist agent iterations                     3
  Research retrieval rounds                       3
  Tools per research task                        20
  Agent execution timeout                60 seconds
  Total workflow timeout                 10 minutes
  Automatic retry attempts                        2

These are starting configuration values, not established optimal limits.

### Security and governance tasks

-   [ ] Validate user inputs and agent outputs.
-   [ ] Enforce role-based access control.
-   [ ] Enforce user-level document isolation.
-   [ ] Restrict agents to authorized tools.
-   [ ] Treat uploaded and retrieved content as untrusted data.
-   [ ] Defend against prompt injection in documents and retrieved
    passages.
-   [ ] Avoid arbitrary database access from agents.
-   [ ] Protect API keys and database credentials.
-   [ ] Avoid logging confidential document content unnecessarily.
-   [ ] Implement audit records for important actions.
-   [ ] Implement human approval and rejection workflows.
-   [ ] Test unauthorized access and failure recovery.

### Observability tasks

-   [ ] Record workflow start and completion.
-   [ ] Record agent transitions and execution times.
-   [ ] Record MCP tool invocations and outcomes.
-   [ ] Record retrieval queries and result identifiers.
-   [ ] Record verification outcomes.
-   [ ] Track errors, retries and timeouts.
-   [ ] Integrate OpenTelemetry.
-   [ ] Integrate Langfuse where appropriate.
-   [ ] Store structured application and execution logs.

### Completion criteria

-   Execution is bounded and recoverable.
-   Tool permissions and user data boundaries are enforced.
-   Important workflow events can be traced.
-   Confidential information is not unnecessarily exposed in logs.

**Deliverable:** Controlled, secure and observable agentic execution
environment.

------------------------------------------------------------------------

## Phase 12 --- Testing and evaluation

**Objective:** Demonstrate measurable technical performance and
reliability.

The proposal defines five evaluation dimensions.

### 12.1 Retrieval evaluation

Measure:

-   Precision@K
-   Recall@K
-   Mean Reciprocal Rank (MRR)
-   Normalized Discounted Cumulative Gain (nDCG@K)

Use labelled questions with expected relevant documents and passages.

### 12.2 Citation verification evaluation

Measure:

-   Citation existence accuracy.
-   Citation metadata accuracy.
-   Passage existence accuracy.
-   Claim-to-source support precision.
-   Unsupported claim detection.
-   False acceptance rate.

Report source existence, metadata correctness and semantic support
separately. Do not combine them into a misleading single accuracy
figure.

### 12.3 Answer quality evaluation

Use a human evaluation rubric, ideally reviewed by a legal academic or
qualified legal professional.

  Dimension            Evaluation question
  -------------------- ------------------------------------------------
  Legal relevance      Does the answer address the research question?
  Source correctness   Are the cited sources valid?
  Evidence support     Do sources support the claims?
  Jurisdiction         Is the answer grounded in Sri Lankan law?
  Completeness         Are important issues omitted?
  Clarity              Is the explanation understandable?
  Uncertainty          Are limitations disclosed appropriately?

Use a 1--5 rating scale. Do not use an LLM judge as the only evaluator
for legal correctness.

### 12.4 Agent reliability evaluation

Measure:

-   Task completion rate.
-   Tool invocation success rate.
-   Invalid tool-call rate.
-   Average agent iterations.
-   Workflow timeout rate.
-   Recovery success rate.
-   Human-review rejection rate.
-   Duplicate tool invocation rate.

### 12.5 Performance evaluation

Measure:

-   Average research completion time.
-   Retrieval latency.
-   Embedding processing time.
-   Token consumption.
-   Cost per research task.
-   Database query performance.

### Proposed initial targets

These are development targets from the proposal, not achieved results.

  Metric                                      Initial target
  ----------------------------------------- ----------------
  Precision@5                                         ≥ 0.80
  Recall@10                                           ≥ 0.80
  Citation source verification                         ≥ 95%
  Unsupported claims correctly flagged                 ≥ 90%
  Invalid MCP tool calls                                ≤ 2%
  Successful workflow completion                       ≥ 90%
  Source traceability for material claims               100%

### Evaluation dataset

The proposal recommends 100 manually reviewed questions.

  Question category            Number
  ------------------------- ---------
  Direct statutory lookup          20
  Legal concept research           20
  Case discovery                   20
  Multi-case comparison            15
  Document-based research          15
  Citation verification            10
  **Total**                   **100**

### Evaluation tasks

-   [ ] Create the 100-question benchmark.
-   [ ] Define expected answers, source IDs and passage IDs.
-   [ ] Have a legal-domain reviewer validate gold sources and passages.
-   [ ] Split tuning and held-out evaluation data.
-   [ ] Implement automated retrieval metrics.
-   [ ] Implement citation verification test cases.
-   [ ] Implement agent reliability tests.
-   [ ] Measure latency and cost.
-   [ ] Conduct human answer-quality evaluation.
-   [ ] Record actual results.
-   [ ] Compare results with proposed targets.
-   [ ] Document failures, limitations and future improvements.

**Deliverable:** Reproducible evaluation benchmark and results report.

------------------------------------------------------------------------

## Phase 13 --- Deployment and final documentation

**Objective:** Deliver a reproducible, demonstrable working prototype.

### Deployment tasks

-   [ ] Finalize Dockerfiles and multi-stage builds.
-   [ ] Verify Docker Compose service dependencies.
-   [ ] Verify internal service networking.
-   [ ] Configure production environment variables.
-   [ ] Remove development credentials and hardcoded secrets.
-   [ ] Configure database migrations.
-   [ ] Configure persistent database and document storage.
-   [ ] Configure service health checks.
-   [ ] Configure application logging.
-   [ ] Verify restart and recovery behaviour.
-   [ ] Test deployment from a clean environment.
-   [ ] Run end-to-end smoke tests.
-   [ ] Deploy the working prototype.

### Documentation tasks

-   [ ] Update root README with setup and run instructions.
-   [ ] Document system architecture.
-   [ ] Document database schema.
-   [ ] Document API endpoints.
-   [ ] Document MCP server and tools.
-   [ ] Document agent responsibilities and workflow.
-   [ ] Document dataset generation and limitations.
-   [ ] Document citation verification behaviour.
-   [ ] Document security and execution controls.
-   [ ] Document evaluation methodology and actual results.
-   [ ] Document known limitations and future work.

### Final demonstration scenario

Prepare one end-to-end demonstration that shows:

1.  A user signs in.
2.  The user creates a legal research investigation.
3.  The user submits an employment-law question.
4.  The Question Analysis Agent identifies the issue and missing facts.
5.  Research agents retrieve relevant synthetic legislation and
    judgments.
6.  The system retrieves supporting passages through Hybrid RAG.
7.  The Case Comparison Agent compares selected judgments.
8.  The Citation Verification Agent checks citations and claim support.
9.  The evidence gate detects insufficient or conflicting evidence where
    applicable.
10. The system generates a structured research dossier.
11. The user inspects source passages and verification statuses.
12. The user reviews and approves or rejects findings where required.
13. The report is saved and available in research history.

The demonstration must clearly state that the MVP uses synthetic legal
data and does not provide authoritative legal advice.

**Deliverable:** Deployed prototype, complete documentation and
reproducible final demonstration.

------------------------------------------------------------------------

# 4. Recommended execution order

The phases above describe the complete scope. For implementation, use
the following dependency-aware order to reduce rework.

  -----------------------------------------------------------------------
  Execution stage         Phases                  Main outcome
  ----------------------- ----------------------- -----------------------
  Foundation              1--2                    Stable services and
                                                  persistent domain model

  Knowledge               3--5                    Synthetic corpus,
  infrastructure                                  ingestion and Hybrid
                                                  RAG

  AI intelligence         6--8                    Agents, MCP and
                                                  Knowledge Graph

  Evidence and            9--10                   Citation verification
  integration                                     and connected
                                                  application

  Reliability             11                      Harness Engineering and
                                                  observability

  Validation              12                      Measured system quality

  Delivery                13                      Deployment and final
                                                  demonstration
  -----------------------------------------------------------------------

Some work can proceed in parallel after its dependencies are stable. For
example, frontend integration can progress alongside agent
implementation once API contracts are agreed.

------------------------------------------------------------------------

# 5. Highest-priority capabilities

For a strong portfolio demonstration, prioritize the following
capabilities over adding more screens or superficial features:

1.  **Real document ingestion:** Upload documents and extract
    structured, traceable legal content.
2.  **Hybrid RAG:** Retrieve relevant passages using semantic and
    keyword search.
3.  **Multi-agent orchestration:** Demonstrate specialized agents
    coordinating an actual research task.
4.  **Citation verification:** Demonstrate source, passage and
    claim-to-evidence checks.
5.  **Harness Engineering:** Demonstrate bounded execution, evidence
    gates, recovery and human review.

These capabilities collectively demonstrate the technical identity of
LegalLens AI.

------------------------------------------------------------------------

# 6. Project completion criteria

LegalLens AI should not be considered complete merely because all
frontend pages exist or all agents have been named.

The MVP is ready for its final demonstration when:

-   [ ] All required services run reliably.
-   [ ] Users can authenticate and manage research projects.
-   [ ] Synthetic legal documents can be ingested and searched.
-   [ ] Hybrid retrieval returns traceable evidence passages.
-   [ ] The multi-agent workflow completes a research task.
-   [ ] MCP tools are discoverable and usable through actual MCP
    integration.
-   [ ] Citation and claim-evidence verification operate against indexed
    sources.
-   [ ] Insufficient and conflicting evidence are handled explicitly.
-   [ ] Research results and execution history persist.
-   [ ] The frontend displays real backend and AI-service results.
-   [ ] Execution limits, permissions, logging and recovery are
    implemented.
-   [ ] Evaluation benchmarks produce actual measurements.
-   [ ] The deployment and setup process is reproducible.
-   [ ] Synthetic-data limitations are clearly disclosed.

------------------------------------------------------------------------

# 7. How to work through this roadmap

For each phase, follow this engineering cycle:

1.  **Inspect:** Identify the existing implementation and its
    dependencies.
2.  **Understand:** Read the relevant source files and contracts before
    changing code.
3.  **Plan:** Define the smallest coherent implementation task.
4.  **Implement:** Make focused changes without unnecessary
    architectural expansion.
5.  **Test:** Reproduce expected behaviour and test failure paths.
6.  **Verify:** Run the relevant automated tests and inspect the actual
    application.
7.  **Document:** Record design decisions, commands, limitations and
    results.
8.  **Mark complete:** Only mark a task complete when its acceptance
    criteria are demonstrated.

Do not start a dependent phase while a critical prerequisite remains
unresolved.

------------------------------------------------------------------------

## 8. Final project principle

> **LegalLens AI must prioritize verifiable evidence over
> confident-sounding answers.**

A successful implementation is not simply a chatbot connected to legal
documents. It is a controlled research workflow that can show what it
searched, what it retrieved, which evidence supports each important
claim, what remains uncertain, and how its result was produced.

This roadmap is intended to preserve the original proposal's vision
while turning the documented foundation into a functional, testable and
demonstrable system.
