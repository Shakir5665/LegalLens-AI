# ⚖️ LegalLens AI — Complete Development Roadmap

> **Tagline:** _Evidence before Answers_  
> An Evidence-Grounded Agentic AI Platform for Sri Lankan Legal Research, Case Analysis and Citation Verification

---

<p align="center">
  <img src="https://img.shields.io/badge/Duration-12%20Weeks-blue?style=for-the-badge&logo=calendar" alt="Duration" />
  <img src="https://img.shields.io/badge/Effort-240%20Hours-indigo?style=for-the-badge&logo=clock" alt="Effort" />
  <img src="https://img.shields.io/badge/Commitment-20%20Hours%2FWeek-violet?style=for-the-badge" alt="Commitment" />
  <img src="https://img.shields.io/badge/Status-Phase%200%20Ready-success?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Phases-13%20Total-orange?style=for-the-badge" alt="Phases" />
</p>

Your project, **LegalLens AI — Evidence before Answers**, should be developed as an actual AI engineering product, not simply as a chatbot with RAG.

I recommend following a 12-week, 240-hour development roadmap, based on your proposal. We will build it incrementally, learn each technology before using it, and make sure every phase produces something functional.

> [!IMPORTANT]
>
> ### The Most Important Principle
>
> $$\mathbf{Learn} \longrightarrow \mathbf{Design} \longrightarrow \mathbf{Implement} \longrightarrow \mathbf{Test} \longrightarrow \mathbf{Evaluate} \longrightarrow \mathbf{Document} \longrightarrow \mathbf{Integrate}$$

---

## 📑 Table of Contents

- [1. Complete Development Roadmap](#1-complete-development-roadmap)
- [2. What Exactly Will We Build in Each Phase?](#2-what-exactly-will-we-build-in-each-phase)
  - [Phase 0 — Project Foundation](#phase-0--project-foundation)
  - [Phase 1 — Backend Engineering Fundamentals](#phase-1--backend-engineering-fundamentals)
  - [Phase 2 — LLM Engineering](#phase-2--llm-engineering)
  - [Phase 3 — Database & Document Intelligence](#phase-3--database--document-intelligence)
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
- [8. Repository Structure](#8-repository-structure)
- [9. Development Environment](#9-development-environment)
  - [Prerequisites](#prerequisites)
  - [Backend Environment Setup](#backend-environment-setup)
  - [Environment Variables](#environment-variables)
- [10. Project Documentation](#10-project-documentation)
- [11. Development Roadmap](#11-development-roadmap)

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

> _Start here_

**Objective:** Establish a clean, maintainable engineering environment.

|  Task   | What you will do                                    |
| :-----: | :-------------------------------------------------- |
| **0.1** | Finalise MVP requirements and acceptance criteria   |
| **0.2** | Understand the proposed system architecture         |
| **0.3** | Create GitHub repository                            |
| **0.4** | Establish frontend and backend project structure    |
| **0.5** | Configure Python virtual environment                |
| **0.6** | Configure environment variables and .env.example    |
| **0.7** | Set up Git workflow and .gitignore                  |
| **0.8** | Write initial README and architecture documentation |

**Deliverable:** A clean project repository ready for development.

---

### Phase 1 — Backend Engineering Fundamentals

**Objective:** Learn how to build a proper backend using Python and FastAPI.

|  Task   | What you will learn/build                            |
| :-----: | :--------------------------------------------------- |
| **1.1** | Python fundamentals required for backend engineering |
| **1.2** | Python project structure and modular architecture    |
| **1.3** | FastAPI application and routing                      |
| **1.4** | REST API design and HTTP fundamentals                |
| **1.5** | Pydantic models and data validation                  |
| **1.6** | Dependency injection                                 |
| **1.7** | Async programming and error handling                 |
| **1.8** | Logging and configuration management                 |
| **1.9** | Unit testing using pytest                            |

**Deliverable:** A functional FastAPI backend with validated endpoints.

---

### Phase 2 — LLM Engineering

**Objective:** Understand how to integrate LLMs into reliable software applications.

|  Task   | What you will learn/build                    |
| :-----: | :------------------------------------------- |
| **2.1** | LLM fundamentals and tokenisation            |
| **2.2** | Gemini API integration                       |
| **2.3** | System prompts and prompt design             |
| **2.4** | Structured output generation                 |
| **2.5** | Pydantic-based LLM response validation       |
| **2.6** | Model errors, retries and timeouts           |
| **2.7** | Token usage and cost tracking                |
| **2.8** | Model configuration and provider abstraction |

**Deliverable:** A reliable LLM service capable of producing validated structured responses.

---

### Phase 3 — Database & Document Intelligence

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

**`[░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]` 0%**  
_0 of 13 phases completed_

- [ ] **Phase 0:** Project Foundation
- [ ] **Phase 1:** Backend Engineering Fundamentals
- [ ] **Phase 2:** LLM Engineering
- [ ] **Phase 3:** Database & Document Intelligence
- [ ] **Phase 4:** Embeddings & Basic RAG
- [ ] **Phase 5:** Hybrid Retrieval Engineering
- [ ] **Phase 6:** Retrieval Evaluation
- [ ] **Phase 7:** Agentic AI Engineering
- [ ] **Phase 8:** Legal Analysis & Citation Verification
- [ ] **Phase 9:** Advanced AI Engineering
- [ ] **Phase 10:** Frontend & Full-Stack Integration
- [ ] **Phase 11:** Production Engineering
- [ ] **Phase 12:** Evaluation & Release

_(Reset progress)_

---

## 6. A Few Important Engineering Decisions

I want us to maintain these boundaries throughout the project:

1. **Don't over-engineer:** One modular FastAPI backend, not separate microservices.
2. **Deterministic first:** Database operations, access control, reference validation, ranking and report rendering should use normal code.
3. **LLM only where needed:** Use Gemini for language understanding and legal analysis, not every operation.
4. **Evidence is mandatory:** A legal claim without traceable supporting evidence must not silently appear as verified.
5. **Test before adding complexity:** Evaluate basic RAG before adding reranking or advanced agent workflows.
6. **Security from day one:** Retrieved documents are untrusted input; LLM prompts are not security boundaries.
7. **Measure everything:** Retrieval quality, verification accuracy, latency, token usage and cost.

These principles follow the architecture and engineering constraints in your proposal.

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

See [System Architecture](file:///C:/Users/shaki/Desktop/LegalLense/docs/architecture/system-architecture.md) for the detailed architecture and [Architecture Decisions](file:///C:/Users/shaki/Desktop/LegalLense/docs/decisions/architecture-decisions.md) for the rationale behind the major technology choices.

---

## 8. Repository Structure

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

## 9. Development Environment

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

### Environment Variables

The backend environment-variable template is located at:

`apps/api/.env.example`

Create a local `.env` file in `apps/api/` using that template when configuring the application.

> [!WARNING]
> Keep actual credentials and secrets out of version control. Never commit `.env` files or expose API keys in source code.

---

## 10. Project Documentation

| Document | Purpose |
| :--- | :--- |
| [`PROJECT_PROPOSAL_REPORT.md`](file:///C:/Users/shaki/Desktop/LegalLense/PROJECT_PROPOSAL_REPORT.md) | Project proposal, objectives, scope, requirements, and evaluation strategy. |
| [`README.md`](file:///C:/Users/shaki/Desktop/LegalLense/README.md) | Project overview, architecture summary, setup guidance, and development roadmap. |
| [`docs/architecture/system-architecture.md`](file:///C:/Users/shaki/Desktop/LegalLense/docs/architecture/system-architecture.md) | Detailed system architecture and investigation workflow. |
| [`docs/decisions/architecture-decisions.md`](file:///C:/Users/shaki/Desktop/LegalLense/docs/decisions/architecture-decisions.md) | Accepted architecture and technology decisions. |

---

## 11. Development Roadmap

The detailed development roadmap, including phases, tasks, acceptance criteria, and implementation progress, is maintained below.

<!-- Keep the existing development roadmap below this line. Do not remove its task descriptions or acceptance criteria. -->
