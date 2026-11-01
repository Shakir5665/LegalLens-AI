# LEGALLENS AI
### An Evidence-Grounded Agentic AI Platform for Sri Lankan Legal Research, Case Analysis and Citation Verification

---

## PROJECT PROPOSAL REPORT

| Project Attribute | Details |
| :--- | :--- |
| **Tagline** | *Evidence before Answers* |
| **Prepared by** | Mohamed Shakir |
| **Project Type** | AI Engineering / LegalTech |
| **Initial Jurisdiction** | Sri Lanka |
| **Initial Legal Domain** | Employment Law |
| **Proposed Duration** | 12 Weeks |
| **Estimated Development Effort** | 240 Hours |
| **Document Version** | 2.0 |
| **Date** | 1 November 2026 |

---

## Abstract

Legal research requires the examination of legislation, judicial decisions and other legal documents to identify applicable legal principles and evaluate how they relate to a particular research question. This process can be time-consuming because relevant information is distributed across multiple sources, and researchers must carefully verify the authority, relevance and accuracy of each reference.

Although Large Language Models (LLMs) can understand natural-language questions and generate explanations, using them directly for legal research introduces significant risks. These include hallucinated legal references, unsupported conclusions, incorrect interpretation of statutory provisions, jurisdictional confusion and failure to account for legislative amendments.

This project proposes LegalLens AI, an evidence-grounded, agentic AI platform designed to assist users with legal research within the Sri Lankan legal context. The initial implementation will focus on Employment Law, including selected legislation, judicial decisions and legal documents.

The proposed platform combines Retrieval-Augmented Generation (RAG), hybrid information retrieval, structured AI workflows, citation verification and controlled tool integration. LangGraph will coordinate the investigation workflow, while Python and FastAPI will provide the backend and AI services. PostgreSQL with pgvector will support document storage, metadata management and vector retrieval. A hosted embedding service will be used instead of resource-intensive local embedding models.

A central feature of LegalLens AI is its claim-level evidence verification mechanism. Important statements generated during an investigation will be linked to retrieved source passages and assessed for evidential support. The platform will also incorporate agent guardrails, Harness Engineering, execution limits, cost monitoring and structured evaluation to improve reliability and operational efficiency.

The expected outcome is a working web-based prototype that demonstrates how AI engineering techniques can be applied to a specialised research domain while maintaining source traceability, controlled execution and transparency about uncertainty.

**Keywords:** Agentic AI, Retrieval-Augmented Generation, LegalTech, Hybrid Search, LangGraph, Model Context Protocol, Harness Engineering, Citation Verification, Sri Lankan Employment Law.

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Background and Motivation](#2-background-and-motivation)
3. [Problem Statement](#3-problem-statement)
4. [Project Aim and Objectives](#4-project-aim-and-objectives)
5. [Project Scope](#5-project-scope)
6. [Proposed System and Main Modules](#6-proposed-system-and-main-modules)
7. [Functional Requirements](#7-functional-requirements)
8. [Non-Functional Requirements](#8-non-functional-requirements)
9. [Proposed System Architecture](#9-proposed-system-architecture)
10. [Agent Design and Workflow](#10-agent-design-and-workflow)
11. [Retrieval-Augmented Generation and Knowledge Management](#11-retrieval-augmented-generation-and-knowledge-management)
12. [Citation and Evidence Verification](#12-citation-and-evidence-verification)
13. [Agent Guardrails and Harness Engineering](#13-agent-guardrails-and-harness-engineering)
14. [Technology Stack](#14-technology-stack)
15. [Database and Data Management](#15-database-and-data-management)
16. [Security, Privacy and Responsible AI](#16-security-privacy-and-responsible-ai)
17. [Cost Optimisation Strategy](#17-cost-optimisation-strategy)
18. [Testing and Evaluation Strategy](#18-testing-and-evaluation-strategy)
19. [Project Methodology and Development Timeline](#19-project-methodology-and-development-timeline)
20. [Expected Deliverables](#20-expected-deliverables)
21. [Risks and Mitigation Strategies](#21-risks-and-mitigation-strategies)
22. [Limitations and Future Enhancements](#22-limitations-and-future-enhancements)
23. [Conclusion](#23-conclusion)
24. [References and Technical Documentation](#24-references-and-technical-documentation)

---

## 1. Introduction

Artificial Intelligence has created new opportunities to improve information retrieval, document analysis and knowledge-intensive workflows. In particular, Large Language Models can interpret natural-language questions, summarise complex documents and generate structured explanations.

However, legal research requires more than generating a plausible answer. A useful legal research system must identify relevant legal authorities, retrieve accurate source passages, distinguish applicable legal principles from assumptions and provide references that users can independently inspect.

LegalLens AI is proposed as an AI-assisted legal research platform that performs structured investigations rather than acting as a conventional chatbot.

The platform will allow users to:
* Submit legal research questions.
* Search relevant legislation and judicial decisions.
* Retrieve supporting passages from legal sources.
* Analyse relevant statutory provisions and judgments.
* Compare judicial decisions.
* Verify important legal claims against source evidence.
* Identify missing information and research limitations.
* Generate structured legal research reports.

The central design principle is **Evidence before Answers**. The system should prioritise the quality and traceability of its evidence rather than simply producing fluent responses.

LegalLens AI is intended to support legal research and learning. It is not a replacement for qualified legal professionals and will not provide definitive legal advice.

---

## 2. Background and Motivation

Sri Lankan legal information is distributed across legislation, official publications, judicial decisions and other legal resources. Researchers must locate relevant documents, identify applicable provisions, understand legal terminology and examine how courts have interpreted particular legal issues.

This process introduces several challenges.

### 2.1 Fragmented legal information
Relevant legal information may be distributed across different publications and repositories. Researchers may need to examine multiple documents before identifying the material relevant to a particular question.

### 2.2 Time-consuming research
Finding relevant statutory provisions and judicial decisions requires keyword searching, document examination and comparison of legal reasoning.

### 2.3 Citation reliability
A citation may refer to an existing legal document but still fail to support the statement associated with it. Therefore, checking whether a reference exists is different from checking whether the referenced passage supports a legal claim.

### 2.4 Limitations of general-purpose LLMs
LLMs can generate convincing explanations even when they lack reliable supporting evidence. In legal applications, this can result in fabricated references, incorrect statutory interpretations or unsupported conclusions.

### 2.5 Need for traceability
Users should be able to inspect the original source passage behind an important statement and understand whether the system considers that statement supported, partially supported, contradicted or uncertain.

These challenges motivate the development of an integrated research platform combining document retrieval, AI-assisted analysis and evidence verification.

---

## 3. Problem Statement

Legal researchers working within the Sri Lankan legal context must identify relevant legislation, locate judicial decisions, interpret legal provisions and verify the accuracy of legal references. These activities can be time-consuming because legal information is distributed across multiple sources and requires careful examination.

General-purpose Large Language Models can assist with legal explanations but cannot independently guarantee that their statements are supported by authoritative legal sources. They may generate inaccurate citations, overlook relevant provisions or present uncertain interpretations as established facts.

Consequently, there is a need for an AI-assisted research system that combines structured legal document management, hybrid retrieval, controlled agent workflows and evidence verification.

**Proposed research problem:**

> *How can an evidence-grounded agentic AI architecture integrating hybrid Retrieval-Augmented Generation, structured workflow orchestration, citation verification and Harness Engineering improve the traceability, retrieval quality and reliability of legal research within the Sri Lankan Employment Law domain?*

---

## 4. Project Aim and Objectives

### 4.1 Main Aim
To design and develop an evidence-grounded agentic AI platform that assists users in conducting Sri Lankan legal research through intelligent document retrieval, legal analysis, case comparison, citation verification and structured research report generation.

### 4.2 Specific Objectives

| ID | Objective |
| :--- | :--- |
| **RO1** | Develop a curated knowledge base of Sri Lankan employment legislation, judicial decisions and legal reference documents. |
| **RO2** | Implement a hybrid Retrieval-Augmented Generation pipeline combining semantic and keyword-based retrieval. |
| **RO3** | Develop controlled AI workflow components for legal question analysis, research planning, evidence retrieval and legal analysis. |
| **RO4** | Implement citation and evidence verification to assess whether generated claims are supported by retrieved source passages. |
| **RO5** | Implement case comparison functionality based on material facts, legal issues, reasoning and outcomes. |
| **RO6** | Implement an MCP server that exposes approved legal research capabilities to external AI clients. |
| **RO7** | Implement Harness Engineering mechanisms for execution control, permissions, validation, observability and recovery. |
| **RO8** | Evaluate retrieval quality, citation verification, workflow reliability, latency and operational cost using a structured evaluation dataset. |

---

## 5. Project Scope

### 5.1 Initial Legal Domain
The initial implementation will focus on Sri Lankan Employment Law.

The proposed starting corpus includes:

| Legal source | Research focus |
| :--- | :--- |
| Industrial Disputes Act | Employment disputes and industrial relations |
| Termination of Employment of Workmen (Special Provisions) Act No. 45 of 1971 | Termination requirements and employee protections |
| Payment of Gratuity Act No. 12 of 1983 | Gratuity eligibility and payment |

Selected judicial decisions and legal reference documents will supplement the legislation.

The availability, authenticity and usability of the selected documents must be confirmed before they are added to the verified knowledge base.

### 5.2 In-Scope Features
The initial system will include:
* User registration and authentication.
* Research project management.
* Legal research question submission.
* Legal document ingestion and metadata extraction.
* Native-text PDF processing.
* Keyword and semantic retrieval.
* Hybrid search and result ranking.
* Structured AI-assisted legal investigation.
* Relevant case discovery and comparison.
* Citation existence and evidence-support verification.
* Investigation history and execution traces.
* Structured research report generation.
* PDF report export.
* Controlled external tool access through MCP.
* Agent guardrails and cost monitoring.

### 5.3 Initial Development Constraints
To keep the project achievable within the available development time and hardware constraints:
1. The initial version will use a single Python/FastAPI backend instead of maintaining separate .NET and Python application backends.
2. Local BGE-M3 embeddings will not be used.
3. A hosted embedding API will be evaluated for semantic retrieval.
4. PostgreSQL full-text search will provide a fallback retrieval mode if hosted embeddings are unavailable or unsuitable.
5. Native-text PDFs will be prioritised before scanned-document OCR.
6. AI workflow components will operate within a controlled LangGraph workflow rather than as unrestricted autonomous agents.
7. The system will begin with a small number of model calls and introduce additional calls only when evaluation demonstrates a clear benefit.
8. The knowledge graph will be treated as a later enhancement unless the initial corpus and use cases justify implementing it earlier.

### 5.4 Out of Scope for the Initial Version
* Providing definitive legal advice.
* Predicting court decisions or case outcomes.
* Covering every area of Sri Lankan law.
* Real-time crawling of all legal websites.
* Full-scale legal practice management.
* Advanced multilingual OCR without a validated dataset.
* Unrestricted autonomous legal agents.
* Mobile applications.
* Payment and subscription systems.
* Enterprise-scale collaboration features.

---

## 6. Proposed System and Main Modules

LegalLens AI will consist of six main functional modules.

### 6.1 Legal Knowledge Base
This module manages the legal documents used by the platform.

**Responsibilities:**
* Store legislation, judgments and legal reference documents.
* Extract text and document metadata.
* Maintain document versions.
* Split documents into searchable passages.
* Store section, paragraph and page references where available.
* Generate and store document embeddings.
* Support keyword and semantic retrieval.
* Maintain source authenticity classifications.

Each document will have a source classification:

| Classification | Meaning |
| :--- | :--- |
| **VerifiedOfficial** | Checked against an authoritative official publication. |
| **VerifiedSecondary** | Checked against a recognised secondary source. |
| **SyntheticDemo** | Artificially created material for testing and demonstration. |
| **Unverified** | Not yet sufficiently verified for authoritative use. |

These classifications must remain visible in the research interface and exported reports.

### 6.2 Agentic Legal Investigation
This is the primary functionality of LegalLens AI.

It coordinates a structured research workflow:
1. Understand the user's question.
2. Identify the relevant legal domain and research issues.
3. Create a research plan.
4. Retrieve relevant legal passages.
5. Analyse the retrieved evidence.
6. Compare relevant judgments where appropriate.
7. Verify material claims.
8. Generate structured findings.

The workflow will use LangGraph to manage state, transitions and conditional execution.

### 6.3 Citation Verification Engine
This module evaluates the reliability of generated legal claims.

It performs two distinct checks:
* **Reference validation:** Does the cited document, section or passage exist in the stored knowledge base?
* **Evidence-support assessment:** Does the retrieved passage actually support, partially support or contradict the associated claim?

**Verification outcomes:**
* Supported
* Partially supported
* Unsupported
* Contradicted
* Ambiguous

A reference must not be considered reliable merely because the document or section exists.

### 6.4 Case Comparison
This module compares selected judicial decisions using structured dimensions:
* Material facts.
* Legal issues.
* Relevant statutory provisions.
* Judicial reasoning.
* Final outcomes.
* Supporting passages.
* Important similarities and differences.

The system should avoid forcing a comparison when there is insufficient evidence.

### 6.5 Document Intelligence
This module supports the ingestion and analysis of legal documents.

**Initial supported formats:**
* PDF.
* DOCX.
* TXT.

Initial processing will prioritise digitally generated PDFs with extractable text.

The system will distinguish extracted document content from AI-generated interpretations. OCR for scanned documents will be introduced in a later development phase after the core retrieval and verification pipeline is stable.

### 6.6 Research Report Generation
The report generator converts verified investigation results into a structured research document.

**A report will contain:**
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

The report renderer will use deterministic Python templates. It will format validated investigation results without introducing additional legal claims.

---

## 7. Functional Requirements

| ID | Functional requirement |
| :--- | :--- |
| **FR-01** | Users can register, authenticate and manage research projects. |
| **FR-02** | Users can submit legal research questions. |
| **FR-03** | The system identifies the requested jurisdiction and legal domain. |
| **FR-04** | Users can upload supported legal documents. |
| **FR-05** | The system extracts document text and available metadata. |
| **FR-06** | The system stores document versions and source authenticity labels. |
| **FR-07** | The system retrieves relevant legislation. |
| **FR-08** | The system retrieves relevant judicial decisions. |
| **FR-09** | The system performs keyword and semantic retrieval where configured. |
| **FR-10** | The system combines retrieval results using hybrid ranking. |
| **FR-11** | The system compares selected judicial decisions. |
| **FR-12** | The system validates document, section and passage references. |
| **FR-13** | The system evaluates whether important claims are supported by evidence. |
| **FR-14** | The system maps material claims to supporting or contradicting passages. |
| **FR-15** | The system generates structured legal research reports. |
| **FR-16** | Users can inspect original supporting passages. |
| **FR-17** | Users can view investigation progress and relevant execution information. |
| **FR-18** | Users can export completed reports. |
| **FR-19** | The system records model usage, retrieval activity and workflow execution traces. |
| **FR-20** | Approved legal research functions can be exposed through MCP tools. |

---

## 8. Non-Functional Requirements

### 8.1 Security
* Authentication must be enforced for protected operations.
* User-uploaded documents must be protected by ownership and access controls.
* API keys and secrets must remain on the backend.
* Database queries must enforce document permissions.
* External tool access must use explicit permissions.

### 8.2 Reliability
* The system must handle model and retrieval failures safely.
* Invalid structured model responses must not be treated as successful results.
* Workflow retries must be bounded.
* The system must stop when execution or cost limits are exceeded.
* Incomplete investigations must be clearly identified.

### 8.3 Traceability
* Important claims must be linked to source passages.
* Document titles and source classifications must be visible.
* Page, section and paragraph references must be retained where available.
* Investigation outputs must preserve the evidence used to generate them.

### 8.4 Performance
* Retrieval should avoid loading entire legal documents unnecessarily.
* The system should retrieve a limited set of relevant passages for analysis.
* Document embeddings should be generated incrementally.
* Repeated work should use safe caching mechanisms where appropriate.

### 8.5 Usability
* The interface should present legal findings in a structured format.
* Users should be able to inspect supporting evidence.
* Unsupported or uncertain claims should be clearly distinguished.
* Investigation progress should be visible.

### 8.6 Maintainability
* Application modules should have clear responsibilities.
* AI outputs should use validated schemas.
* Retrieval, verification and report rendering should remain independently testable.
* Model providers and configurations should be replaceable without redesigning the entire application.

---

## 9. Proposed System Architecture

### 9.1 Architectural Overview
LegalLens AI will use a modular architecture with four logical layers.

1. **Application Layer**  
   Responsible for user interaction, authentication, document management, research projects and report presentation.
2. **Agent Orchestration Layer**  
   Responsible for research planning, workflow execution, state management and controlled coordination of AI tasks.
3. **Legal Intelligence Layer**  
   Responsible for document processing, hybrid retrieval, evidence management, legal analysis and citation verification.
4. **Harness and Governance Layer**  
   Responsible for execution policies, permissions, output validation, resource limits, observability, testing and recovery.

These are logical architecture boundaries. They do not need to become separate microservices.

### 9.2 Proposed Architecture

```text
                  USER
                    |
                    v
          React + TypeScript Web App
                    |
                    v
             Python FastAPI
       Authentication / API / Projects
       Documents / Investigations / Reports
                    |
                    v
           LANGGRAPH WORKFLOW
                    |
          +---------+----------+
          |                    |
          v                    v
    Query Router          Workflow State
    and Planner           and Controller
          |
          v
   DETERMINISTIC RETRIEVAL
          |
     +----+-------------------+
     |                        |
     v                        v
 PostgreSQL FTS          pgvector Search
     |                        |
     +-----------+------------+
                 |
                 v
          Hybrid Ranking
          RRF + Reranking
                 |
                 v
        Relevant Evidence
                 |
                 v
        LEGAL ANALYSIS
        Structured Output
                 |
                 v
       CLAIM VERIFICATION
       Reference Validation
       Evidence Support Check
                 |
                 v
       DETERMINISTIC REPORT
          GENERATION
                 |
                 v
        RESEARCH REPORT
                 |
                 v
          React Interface
```

**Supporting services:**
* Gemini API
* Hosted embedding API
* PostgreSQL + pgvector
* MCP external tool interface
* Observability and evaluation

### 9.3 Architecture Decisions

**Single Python backend**  
FastAPI will initially handle application APIs and AI workflows. This avoids the additional integration and maintenance overhead of operating separate .NET and Python backends.

**LangGraph for orchestration**  
LangGraph will coordinate the investigation lifecycle and conditional execution. Retrieval and verification functions will be called directly from Python modules rather than unnecessarily routing internal database operations through MCP.

**MCP for interoperability**  
The MCP server will expose selected legal research functions to external AI clients. It will reuse the same application logic as the internal workflow.

**Deterministic-first processing**  
Database access, reference validation, ranking, permissions and report formatting will be handled through normal application code wherever possible. LLM calls will be reserved for tasks requiring language understanding or semantic reasoning.

**Hosted embeddings**  
The system will use a hosted embedding service instead of local BGE-M3. The selected provider will be evaluated based on language quality, price, quotas, privacy requirements and integration support.

If hosted embeddings are unsuitable, the system will retain a PostgreSQL full-text-search mode while the embedding approach is evaluated.

---

## 10. Agent Design and Workflow

LegalLens AI will use specialised workflow components rather than creating numerous independent autonomous chatbots.

### 10.1 Query Router and Research Planner
**Responsibility:** Understand the user's request and produce a structured research plan.

It identifies:
* Jurisdiction.
* Legal domain.
* Main research question.
* Relevant legal issues.
* Search terms.
* Statutory filters.
* Required research tasks.
* Missing information.

The planner will return a validated Pydantic structure.

### 10.2 Legal Retrieval Component
**Responsibility:** Retrieve relevant legal evidence.

This component uses:
* PostgreSQL full-text search.
* pgvector semantic search.
* Metadata filters.
* Reciprocal Rank Fusion.
* Optional reranking.

It returns passages with document identifiers, source classifications and location metadata.

Retrieval itself should not require an LLM call.

### 10.3 Legal Analysis Component
**Responsibility:** Analyse the supplied legal evidence.

It produces a structured output containing:
* Quick answer.
* Detailed explanation.
* Atomic legal claims.
* Supporting evidence references.
* Relevant case comparison data.
* Missing facts.
* Research limitations.

The analysis component must not treat unsupported assumptions as established facts.

### 10.4 Case Comparison Component
**Responsibility:** Compare relevant judgments where sufficient source material exists.

It examines facts, issues, applicable provisions, reasoning and outcomes. It can operate as a reusable analysis component within the investigation workflow.

### 10.5 Claim Verification Component
**Responsibility:** Verify important claims.

It first checks whether the cited source references exist. It then assesses the relationship between each claim and its supporting passages.

A lightweight local Natural Language Inference model may be evaluated as an optional first-pass classifier if it runs acceptably on the available hardware. It will not be treated as an authoritative legal reasoning engine. Uncertain cases can be escalated to a hosted model or marked ambiguous.

### 10.6 Report Rendering Component
**Responsibility:** Produce the final report from validated structured data.

This component will use Python templates and deterministic formatting rather than another mandatory LLM generation call.

### 10.7 Target Model-Call Strategy

The initial workflow aims to use two main reasoning calls:

| Stage | Method | LLM call |
| :--- | :--- | :--- |
| Query understanding and planning | Structured model output | Call 1 |
| Evidence retrieval | Keyword and vector search | No |
| Ranking and filtering | Deterministic Python | No |
| Legal analysis and case comparison | Structured model output | Call 2 |
| Reference validation | Database and Python | No |
| Evidence verification | Deterministic checks, optional NLI and selective model fallback | Conditional |
| Report rendering | Python templates | No |

Two calls are a design target, not a rigid limit. Additional model calls will be introduced only when evaluation demonstrates that they improve reliability or research quality sufficiently to justify their cost.

---

## 11. Retrieval-Augmented Generation and Knowledge Management

### 11.1 Document Ingestion
The document ingestion process will follow these stages:
1. Receive a supported document.
2. Validate the file type and size.
3. Inspect the document.
4. Extract native text.
5. Identify document metadata.
6. Preserve page and section references where available.
7. Split text into meaningful passages.
8. Store passages and metadata.
9. Generate embeddings where enabled.
10. Index the passages for retrieval.

PyMuPDF will initially be used for native-text PDF extraction.

Scanned PDFs and OCR will be introduced after the native-text pipeline has been tested. OCR output will be labelled with its extraction method and quality information.

### 11.2 Chunking Strategy
Legal documents require structure-aware chunking.

The system should preserve:
* Act and document titles.
* Chapters and parts.
* Section numbers.
* Subsections.
* Paragraphs.
* Page numbers.
* Source document identifiers.

Where possible, passages should follow legal document boundaries rather than arbitrary character limits.

Overlapping passages may be used when necessary to preserve context across adjacent sections.

### 11.3 Embedding Strategy
Because the available development hardware cannot comfortably run BGE-M3, LegalLens AI will not depend on local BGE-M3 inference.

A hosted embedding API will be evaluated.

The same embedding model and compatible configuration must be used for both document and query embeddings.

The system will store:
* Embedding model identifier.
* Embedding dimensions.
* Document version.
* Passage content hash.
* Embedding generation status.

When a document changes, only affected passages should be reprocessed.

External embedding services receive the text submitted for embedding. Therefore, only public or approved documents should be sent to such services until privacy and data-handling requirements have been reviewed.

### 11.4 Hybrid Retrieval
The retrieval pipeline will combine two approaches.

**Keyword retrieval**  
PostgreSQL full-text search will identify passages containing relevant legal terminology and exact expressions.

**Semantic retrieval**  
pgvector will identify passages that are semantically related to the research question.

**Result fusion**  
Reciprocal Rank Fusion (RRF) will combine the ranked results.

$$
\text{RRF}(d) = \sum_{r \in R} \frac{1}{k + \text{rank}_r(d)}
$$

Here, $d$ represents a document passage, $R$ represents the retrieval result sets and $k$ is a ranking constant.

A reranking stage may then refine the candidate list.

The initial objective is to provide a small, relevant evidence set to the legal analysis component rather than passing entire documents or large collections of unrelated passages.

---

## 12. Citation and Evidence Verification

Citation verification is the main differentiating capability of LegalLens AI.

### 12.1 Reference Existence Validation
The system will check:
* Whether the document identifier exists.
* Whether the document title matches the stored record.
* Whether the requested section or passage exists.
* Whether the reference belongs to the correct document version.
* Whether the source classification is available.

### 12.2 Claim-Level Evidence Mapping
Legal analysis will produce atomic claims rather than one large unstructured explanation.

Each claim should contain:
* Claim identifier.
* Claim text.
* One or more evidence references.
* Verification status.
* Verification explanation.

A claim may require multiple evidence passages. The data model must therefore support multiple references for a single claim.

### 12.3 Verification Outcomes

| Status | Meaning |
| :--- | :--- |
| **Supported** | Available evidence supports the claim. |
| **Partially supported** | Evidence supports only part of the claim. |
| **Unsupported** | No sufficient supporting evidence was found. |
| **Contradicted** | Available evidence conflicts with the claim. |
| **Ambiguous** | Evidence is incomplete or does not allow a confident assessment. |

The system must distinguish reference existence from evidential support.

For example, a genuine statutory section may exist but may not establish the complete statement made by the AI.

---

## 13. Agent Guardrails and Harness Engineering

Reliable AI applications require more than prompts. They require a controlled environment that determines what an AI component can access, what actions it can perform and when execution must stop.

### 13.1 Agent Guardrails
LegalLens AI will implement guardrails across five areas.

#### 1. Input Guardrails
* Validate question length and structure.
* Identify unsupported research domains.
* Detect missing essential information.
* Treat uploaded document content as untrusted input.
* Avoid following instructions embedded in retrieved documents.

#### 2. Workflow Guardrails
* Define permitted workflow transitions.
* Set maximum graph iterations.
* Limit retries and execution time.
* Validate intermediate outputs.
* Stop workflows when evidence is insufficient.

#### 3. Tool and Permission Guardrails
* Use an allowlist of approved tools.
* Enforce user and document permissions in application code.
* Restrict access to private documents.
* Prevent unrestricted database or external tool access.
* Require approval for sensitive operations where applicable.

#### 4. Output Guardrails
* Require structured Pydantic outputs.
* Validate claim and evidence relationships.
* Require source references for material legal claims.
* Preserve uncertainty and limitations.
* Prevent synthetic demonstration cases from being presented as real judgments.

#### 5. Runtime Guardrails
* Enforce token and cost budgets.
* Apply request timeouts.
* Limit concurrent operations.
* Use bounded retries.
* Record execution failures.
* Return a clear incomplete or degraded result when necessary.

LLM instructions alone are not security boundaries. Access control, permissions and validation must be enforced by the application and database layers.

### 13.2 Runtime Harness Engineering
The runtime harness is the control environment surrounding the AI workflow.

It will include:

| Component | Responsibility |
| :--- | :--- |
| **Execution controller** | Controls workflow steps, limits and stopping conditions. |
| **Context manager** | Controls what instructions, evidence and history are supplied to models. |
| **Tool registry** | Defines approved tools, schemas and permissions. |
| **State manager** | Maintains investigation state and intermediate results. |
| **Policy engine** | Enforces access, source and execution policies. |
| **Verification engine** | Validates schemas, references and evidence relationships. |
| **Observability** | Records model calls, tool calls, errors, latency and token usage. |
| **Evaluation layer** | Measures quality, reliability, safety and cost. |

These are logical components within the Python application, not separate services that must all be deployed independently.

### 13.3 Repository-Level Harness Engineering
The project repository will also be designed to support reliable development and AI-assisted coding.

It will include:
* Clear repository instructions.
* Architecture and module documentation.
* Defined coding conventions.
* Automated unit and integration tests.
* Evaluation datasets and expected results.
* Reproducible development commands.
* Configuration examples.
* CI checks and linting.
* Architecture boundary tests where useful.

The objective is to make the codebase understandable, testable and maintainable by both developers and AI coding tools.

---

## 14. Technology Stack

| Layer | Proposed technology | Responsibility |
| :--- | :--- | :--- |
| **Frontend** | React + TypeScript | User interface |
| **Styling** | Tailwind CSS | Interface styling |
| **Backend** | Python + FastAPI | Application APIs and backend logic |
| **Data validation** | Pydantic | Structured request and model output validation |
| **LLM** | Gemini API | Language understanding and legal analysis |
| **Workflow orchestration** | LangGraph | Controlled investigation workflow |
| **Tool interoperability** | Python MCP SDK | External tool integration |
| **Database** | Neon PostgreSQL | Application and legal document data |
| **Vector search** | pgvector | Semantic retrieval |
| **Keyword search** | PostgreSQL Full-Text Search | Lexical retrieval |
| **PDF processing** | PyMuPDF | Native-text extraction |
| **Embeddings** | Hosted embedding API | Document and query embeddings |
| **Optional verification** | Lightweight NLI model or selective hosted-model fallback | First-pass evidence-support classification |
| **Report generation** | Python templates | Deterministic report rendering |
| **Real-time progress** | Server-Sent Events | Investigation progress updates |
| **Deployment** | Docker Compose | Local and prototype deployment |

Exact model identifiers and embedding providers will be selected after checking current availability, pricing, quotas, privacy conditions and measured quality.

---

## 15. Database and Data Management

PostgreSQL will store application data, legal documents, passages, embeddings and investigation results.

**Proposed core tables:**

| Table | Purpose |
| :--- | :--- |
| **Users** | User accounts and authentication information |
| **ResearchProjects** | User research projects |
| **Documents** | Legal and uploaded documents |
| **DocumentVersions** | Document version history |
| **DocumentChunks** | Extracted passages and source locations |
| **DocumentEmbeddings** | Passage embedding records |
| **Investigations** | Legal research sessions |
| **ResearchTasks** | Planner-generated research tasks |
| **RetrievedEvidence** | Passages used during investigations |
| **CaseComparisons** | Structured case comparison results |
| **Claims** | Atomic legal claims |
| **ClaimEvidence** | Relationships between claims and evidence passages |
| **ClaimVerifications** | Claim verification results |
| **ResearchReports** | Generated research reports |
| **ModelUsage** | Model usage and cost records |
| **WorkflowEvents** | Investigation execution events |

The database must preserve the relationship between every material claim and its supporting or contradicting evidence.

Private document permissions must be checked before retrieval. Hiding documents in the frontend is not sufficient protection.

---

## 16. Security, Privacy and Responsible AI

LegalLens AI may eventually process documents containing personal or confidential information. Security and privacy must therefore be considered from the beginning.

The proposed controls include:
1. Backend-enforced authentication and authorisation.
2. Document ownership and access checks.
3. Secure storage of credentials and API keys.
4. Validation of uploaded file types and sizes.
5. Protection against malicious document content and prompt injection.
6. Avoiding unnecessary transmission of entire documents to external AI services.
7. Using only relevant passages when external model processing is required.
8. Avoiding sensitive information in application logs.
9. Reviewing provider data-use, retention and privacy terms.
10. Clear source authenticity labels.
11. Clear disclosure that AI-generated findings require professional review.
12. Visible distinction between verified legal sources and synthetic demonstration material.

The initial development and demonstration environment will prioritise public legal sources and synthetic cases.

The platform will not claim that an AI-generated answer is legally authoritative merely because it includes citations.

---

## 17. Cost Optimisation Strategy

The system will optimise for cost per verified investigation, not simply for the smallest number of model calls.

### 17.1 Deterministic-First Design
Use ordinary application code for:
* Database queries.
* Document permissions.
* Reference existence checks.
* Metadata filtering.
* Search ranking.
* Report formatting.
* Workflow limits.
* Cache management.

Use LLMs only where language understanding and semantic reasoning provide measurable value.

### 17.2 Model Routing
A smaller model may be used for query routing and simple structured tasks, while a stronger model may be used for the main legal analysis.

The exact model selection will be based on measured quality, latency and cost rather than assumptions about model capability.

### 17.3 Context Management
Only relevant evidence should be passed to the analysis model.

The system will avoid:
* Sending entire legislation documents unnecessarily.
* Repeating the same passages.
* Including unrelated conversation history.
* Supplying unnecessary tool descriptions.
* Passing large intermediate outputs when compact structured data is sufficient.

### 17.4 Caching
The initial implementation will prioritise safe caching opportunities:
* Document extraction cache.
* Embedding cache.
* Exact query cache.
* Retrieval cache.
* Reusable model context where supported.

Semantic caching may be introduced later with strict checks for document versions, user permissions, model versions and research context. Similar-looking legal questions must not automatically share answers because small differences in facts or wording may change their implications.

### 17.5 Incremental Processing
Only changed documents and passages should be reprocessed. Batch embedding and indexing will reduce unnecessary API requests.

### 17.6 Execution Budgets
The harness will enforce configurable limits on:
* Model calls.
* Graph iterations.
* Retrieval candidates.
* Output tokens.
* Retry attempts.
* Execution duration.
* Estimated investigation cost.

Initial limits will be treated as experimental settings and adjusted using evaluation results.

### 17.7 Cost Observability
For each model operation, record:
* Model identifier.
* Operation type.
* Input and output tokens.
* Cached tokens, where available.
* Latency.
* Estimated cost.
* Investigation identifier.
* Retry and fallback information.

The system will measure cost per investigation, retrieval cache hit rate, model fallback frequency and average completion time.

---

## 18. Testing and Evaluation Strategy

The quality of LegalLens AI must be measured rather than assumed.

### 18.1 Evaluation Dataset
A manually reviewed evaluation dataset of approximately 30–50 legal research questions will be prepared.

Each evaluation item should include:
* Research question.
* Expected legal domain.
* Relevant source documents.
* Relevant sections or passages.
* Expected evidence.
* Example claims.
* Expected verification outcomes.

Synthetic cases may be used to test case comparison and workflow behaviour. They must be labelled `SyntheticDemo` and must never be presented as genuine judicial decisions.

### 18.2 Retrieval Evaluation
**Measure:**
* Precision@K.
* Recall@K.
* Mean Reciprocal Rank (MRR).
* nDCG@K where appropriate.
* Relevant passage retrieval rate.

Compare keyword-only, semantic-only and hybrid retrieval.

### 18.3 Citation Verification Evaluation
**Measure:**
* Reference existence accuracy.
* Claim-support classification accuracy.
* False-supported rate.
* False-unsupported rate.
* Performance on contradicted and ambiguous claims.

Reference existence and evidence support must be evaluated separately.

### 18.4 Workflow Evaluation
**Test:**
* Successful investigation completion.
* Invalid model output handling.
* Missing evidence scenarios.
* Workflow retry behaviour.
* Maximum iteration enforcement.
* Timeout handling.
* Safe failure behaviour.

### 18.5 Security Evaluation
**Test:**
* Access to private documents by unauthorised users.
* Malicious file uploads.
* Prompt injection in retrieved documents.
* Unapproved tool invocation.
* Exposure of API keys or confidential content in logs.
* Source authenticity labelling.

### 18.6 Performance and Cost Evaluation
**Measure:**
* Average investigation latency.
* Model calls per investigation.
* Input and output tokens.
* Estimated API cost.
* Cache hit rate.
* Embedding processing cost.
* Workflow failure rate.

### 18.7 Initial Quality Targets

The following are proposed evaluation targets, not existing performance claims.

| Evaluation area | Initial target |
| :--- | :--- |
| Relevant evidence retrieval | 85% or higher |
| Reference existence validation | 100% on the curated test set |
| Claim verification accuracy | 85% or higher |
| Successful report generation | 95% or higher |
| End-to-end investigation completion | 90% or higher |

Results will be reported with the dataset size, test methodology and observed limitations.

---

## 19. Project Methodology and Development Timeline

The project will follow an iterative development methodology. Each phase will produce a working component that can be tested before additional complexity is introduced.

**Estimated commitment:** 20 hours per week for 12 weeks, approximately 240 development hours.

| Week | Main focus | Expected deliverable |
| :---: | :--- | :--- |
| **1** | Python, FastAPI, Pydantic, environment setup and API fundamentals | Working backend foundation |
| **2** | Gemini API integration, structured outputs and error handling | Validated LLM integration |
| **3** | PostgreSQL, document storage and native PDF extraction | Document ingestion pipeline |
| **4** | Hosted embeddings, pgvector and basic RAG | Initial semantic retrieval |
| **5** | PostgreSQL full-text search and hybrid retrieval | Hybrid search pipeline |
| **6** | RRF, reranking, source metadata and retrieval evaluation | Evaluated retrieval component |
| **7** | LangGraph, research planning and workflow state | Controlled investigation workflow |
| **8** | Legal analysis, claim extraction, verification and guardrails | Evidence-grounded analysis |
| **9** | Case comparison, MCP integration and harness observability | Extended research capabilities |
| **10** | React integration, investigation workspace and SSE | Integrated web application |
| **11** | Report export, security, cost optimisation and deployment | Deployable prototype |
| **12** | Evaluation, documentation, portfolio preparation and demonstration | Final project release |

### 19.1 Development Principles
The project will follow these principles:
* Build and test one component at a time.
* Understand each technology before introducing it into the system.
* Prefer simple implementations over unnecessary abstraction.
* Use structured outputs and deterministic validation.
* Record implementation decisions and trade-offs.
* Measure retrieval quality and model behaviour.
* Keep the architecture modular without prematurely creating microservices.
* Maintain a working end-to-end application throughout development.

---

## 20. Expected Deliverables

At the end of the project, the expected deliverables are:

* **D1 — Web Application**  
  A React-based legal research interface with authentication, research projects, document management and investigation results.
* **D2 — Legal Knowledge Base**  
  A curated collection of Sri Lankan employment legislation, selected judicial decisions and legal reference documents with structured metadata.
* **D3 — Document Processing Pipeline**  
  A native-text PDF ingestion and indexing pipeline that preserves available source locations.
* **D4 — Hybrid RAG Pipeline**  
  A retrieval system combining PostgreSQL full-text search, semantic retrieval and ranking.
* **D5 — Agentic Investigation Workflow**  
  A controlled LangGraph workflow for research planning, evidence retrieval and legal analysis.
* **D6 — Citation Verification Engine**  
  A claim-level verification system that validates references and evaluates evidence support.
* **D7 — Case Comparison Module**  
  A structured comparison capability for selected judicial decisions.
* **D8 — MCP Integration**  
  A controlled MCP interface exposing selected legal research tools to external clients.
* **D9 — Harness Engineering Implementation**  
  Runtime controls, permissions, execution budgets, validation, observability and recovery mechanisms.
* **D10 — Evaluation Dataset and Results**  
  A manually reviewed test dataset and documented retrieval, verification, reliability and cost measurements.
* **D11 — Research Report Generation**  
  A structured report generation and PDF export capability.
* **D12 — Technical Documentation**  
  Project README, architecture documentation, API documentation, setup instructions, evaluation methodology and design decisions.

---

## 21. Risks and Mitigation Strategies

| Risk | Potential impact | Mitigation |
| :--- | :--- | :--- |
| **Unavailable or incomplete legal sources** | Weak research coverage | Confirm corpus availability and authenticity before indexing. |
| **Incorrect or outdated legal documents** | Misleading research results | Store source metadata, version information and verification status. |
| **LLM hallucinations** | Unsupported legal claims | Use evidence-grounded generation and claim-level verification. |
| **Poor retrieval quality** | Relevant legal passages may be missed | Benchmark keyword, semantic and hybrid retrieval. |
| **Embedding API cost or quota limitations** | Increased operational cost | Monitor usage and retain a full-text-search fallback. |
| **External provider privacy concerns** | Confidential information exposure | Start with public sources and review provider data terms before processing private documents. |
| **Prompt injection in documents** | Unsafe agent behaviour | Treat retrieved content as untrusted data and enforce tool permissions in code. |
| **Excessive model calls** | High latency and cost | Use deterministic processing, context limits and selective model fallback. |
| **Limited local hardware** | Inability to run large local models | Use hosted embeddings and evaluate smaller local models only when practical. |
| **OCR inaccuracies** | Incorrect extracted legal wording | Defer OCR and flag low-confidence extraction for review. |
| **Scope expansion** | Delayed completion | Maintain a bounded employment-law MVP and defer advanced features. |
| **Workflow failures** | Incomplete investigations | Use bounded retries, state persistence and safe failure handling. |

---

## 22. Limitations and Future Enhancements

### 22.1 Initial Limitations
The initial version will have a limited legal corpus and will not cover every area of Sri Lankan law.

Its performance will depend on the availability and quality of the indexed legal documents. Retrieval may miss relevant material, and automated evidence verification may not fully capture complex legal interpretation.

The platform will not guarantee that a generated conclusion represents the complete or current state of the law.

OCR, advanced multilingual processing and broader legal coverage will remain outside the initial implementation unless the core system is completed ahead of schedule.

### 22.2 Future Enhancements
Possible future improvements include:
1. Expansion into additional areas of Sri Lankan law.
2. Improved OCR for scanned legal documents.
3. Sinhala and Tamil document processing and retrieval.
4. A legal knowledge graph linking legislation, cases and legal provisions.
5. Advanced temporal legal analysis and amendment tracking.
6. More extensive case-law discovery.
7. Human review and feedback workflows.
8. Advanced document comparison.
9. Improved multilingual embeddings and retrieval.
10. Deployment with stronger access controls and enterprise privacy requirements.
11. Integration with additional external legal research tools through MCP.
12. More advanced evaluation of legal reasoning and evidence consistency.

These enhancements will be prioritised according to user value, technical feasibility and measured improvements.

---

## 23. Conclusion

LegalLens AI proposes an evidence-grounded approach to applying Agentic AI and Retrieval-Augmented Generation to Sri Lankan legal research.

Rather than relying on a general-purpose chatbot to generate legal explanations, the platform will follow a controlled investigation process that identifies research issues, retrieves relevant legal evidence, analyses source material, verifies important claims and produces structured research reports.

The proposed architecture combines React, Python FastAPI, PostgreSQL, pgvector, Gemini, LangGraph and MCP. It also incorporates agent guardrails, Harness Engineering, structured outputs, cost controls and systematic evaluation.

A key architectural decision is to use deterministic processing wherever possible and reserve LLM calls for tasks that require language understanding and semantic reasoning. Hosted embeddings will avoid dependence on resource-intensive local embedding models, while PostgreSQL full-text search will provide a practical fallback.

The project will be developed incrementally over twelve weeks, prioritising a working end-to-end research workflow before introducing advanced capabilities.

The expected result is not simply another AI chatbot, but a demonstrable AI engineering system that makes its research process, supporting evidence, limitations and verification results visible to the user.

**LegalLens AI — Evidence before Answers.**

---

## 24. References and Technical Documentation

The following official technical documentation will guide implementation. Exact API versions, model identifiers, pricing and feature availability will be checked during development.

1. FastAPI Documentation — [https://fastapi.tiangolo.com/](https://fastapi.tiangolo.com/)
2. Python Documentation — [https://docs.python.org/3/](https://docs.python.org/3/)
3. Pydantic Documentation — [https://docs.pydantic.dev/](https://docs.pydantic.dev/)
4. Google Gemini API Documentation — [https://ai.google.dev/gemini-api/docs](https://ai.google.dev/gemini-api/docs)
5. Gemini Embeddings Documentation — [https://ai.google.dev/gemini-api/docs/embeddings](https://ai.google.dev/gemini-api/docs/embeddings)
6. LangGraph Documentation — [https://docs.langchain.com/oss/python/langgraph/overview](https://docs.langchain.com/oss/python/langgraph/overview)
7. Model Context Protocol Documentation — [https://modelcontextprotocol.io/](https://modelcontextprotocol.io/)
8. PostgreSQL Documentation — [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)
9. pgvector Documentation — [https://github.com/pgvector/pgvector](https://github.com/pgvector/pgvector)
10. PyMuPDF Documentation — [https://pymupdf.readthedocs.io/](https://pymupdf.readthedocs.io/)
11. React Documentation — [https://react.dev/](https://react.dev/)
12. OWASP Top 10 for Large Language Model Applications — [https://genai.owasp.org/](https://genai.owasp.org/)
13. OpenAI, Harness Engineering: Leveraging Codex in an Agent-First World — [https://openai.com/index/harness-engineering/](https://openai.com/index/harness-engineering/)

---

*End of Project Proposal Report*
