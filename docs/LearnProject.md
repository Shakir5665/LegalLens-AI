# Master Engineering & Architecture Teaching Guide: LegalLens AI

> **Author**: Lead System Architect, Senior Full-Stack Engineer & AI Systems Lead  
> **Audience**: Junior / Associate Engineers, Freshers, and Architects-in-Training  
> **Document Role**: Complete Knowledge Transfer & Project Replication Manual  
> **Repository Target**: `LegalLens AI` (Evidence-Grounded Agentic AI Platform)

---

## Table of Contents
1. [Introduction: Welcome to Enterprise AI Engineering](#1-introduction-welcome-to-enterprise-ai-engineering)
2. [Phase 0: Analyzing Requirements & The Source of Truth](#2-phase-0-analyzing-requirements--the-source-of-truth)
3. [Phase 1: Monorepo Architecture & Topology Design](#3-phase-1-monorepo-architecture--topology-design)
4. [Phase 2: Frontend Engineering (React 19, TypeScript, Design Tokens)](#4-phase-2-frontend-engineering-react-19-typescript-design-tokens)
5. [Phase 3: Domain Modeling & Data Contracts](#5-phase-3-domain-modeling--data-contracts)
6. [Phase 4: Agentic AI Engineering vs. Naive Chatbots](#6-phase-4-agentic-ai-engineering-vs-naive-chatbots)
7. [Phase 5: LangGraph Multi-Agent State Machine Architecture](#7-phase-5-langgraph-multi-agent-state-machine-architecture)
8. [Phase 6: Model Context Protocol (MCP) & Tool Architecture](#8-phase-6-model-context-protocol-mcp--tool-architecture)
9. [Phase 7: Eliminating Architectural Redundancy & Technical Debt](#9-phase-7-eliminating-architectural-redundancy--technical-debt)
10. [Phase 8: Multi-Container Infrastructure (Docker & pgvector)](#10-phase-8-multi-container-infrastructure-docker--pgvector)
11. [Phase 9: Responsible AI, Synthetic Data, & Hallucination Control](#11-phase-9-responsible-ai-synthetic-data--hallucination-control)
12. [Step-by-Step Blueprint: How to Replicate This on Any Project](#12-step-by-step-blueprint-how-to-replicate-this-on-any-project)

---

## 1. Introduction: Welcome to Enterprise AI Engineering

When junior developers hear "AI project", they usually think of a simple chat interface that sends a prompt to OpenAI's ChatGPT and prints the response. 

In enterprise environments—especially in high-stakes domains like **law, medicine, finance, and aviation**—that naive approach causes catastrophic failures:
- **Hallucinations**: The LLM invents nonexistent statutes, case citations, or drug dosages with complete confidence.
- **No Evidence Traceability**: Users cannot verify which exact paragraph of which document backed a particular claim.
- **Uncontrolled Execution**: Chatbots loop aimlessly or output unstructured text that cannot be consumed by other services.

**LegalLens AI** is not a chatbot. It is a **multi-agent research and citation-verification platform** for Sri Lankan employment law.

In this guide, you will learn every single step we took, why we made each decision, and how to apply these architectural patterns to any enterprise project.

---

## 2. Phase 0: Analyzing Requirements & The Source of Truth

### The Engineering Problem
Before writing any code, an architect must establish the **Source of Truth**. In this project, the source of truth is the **35-page Project Proposal**.

### The Mistake Many Freshers Make
Jumping into coding immediately without reading the specification leads to:
1. Building features the customer never asked for.
2. Using the wrong tech stack.
3. Making unsupported marketing claims (e.g., claiming "100% zero hallucinations" or claiming "50,000 indexed cases" when the dataset is actually a synthetic research benchmark).

### What We Did & The Architectural Rationale
1. **Extracted Core Constraints from the Proposal**:
   - **Target Audience**: Law students, legal researchers, practicing lawyers, academics. (Not exclusively Supreme Court advocates).
   - **Target Legal Domain**: Sri Lankan Employment & Labour Law (e.g., Industrial Disputes Act No. 43 of 1950, TEWA No. 45 of 1971).
   - **Dataset Approach**: Synthetic / simulated research benchmark (Section 13). We cannot pretend synthetic case examples are authentic Supreme Court rulings.
   - **Architecture Requirements**:
     - Frontend: React 19 + TypeScript
     - Application Backend: .NET 10 Web API
     - AI Intelligence Service: Python FastAPI + LangGraph
     - Database: PostgreSQL with `pgvector`
     - Tool Integration: Model Context Protocol (MCP)

> **Key Rule**: *Always align code and UI terminology strictly with the approved project specification. Never invent claims that your system cannot mathematically or empirically verify.*

---

## 3. Phase 1: Monorepo Architecture & Topology Design

### The Engineering Problem
Modern applications are distributed systems composed of frontend clients, application gateways, AI microservices, and databases. If you keep them in disconnected repositories, managing shared contracts, Docker environments, and synchronized versioning becomes a nightmare.

### The Solution: Clean Monorepo Structure
We established a clean monorepo topology:

```text
LegalLens/
├── apps/
│   ├── web/               # React 19 + TypeScript + Vite + Tailwind CSS
│   ├── api/               # .NET 10 Web API (Application Gateway & Auth)
│   └── ai-service/        # Python FastAPI + LangGraph + MCP SDK
├── infrastructure/
│   └── docker-compose.yml # PostgreSQL + pgvector + Multi-service orchestration
├── docs/                  # Architecture specs, diagrams, and teaching manuals
└── README.md              # Root setup and run instructions
```

### Why This Separation of Concerns Matters:
- **`apps/web` (Presentation Layer)**: Focuses purely on rendering UI, user interactions, and accessible design. It has zero knowledge of database credentials or LLM API keys.
- **`apps/api` (Application & Business Layer)**: Built in .NET 10. Handles relational entities, authentication, user management, and enterprise security.
- **`apps/ai-service` (Intelligence Layer)**: Built in Python. Python is the premier ecosystem for AI, LangGraph, vector embeddings, and PyMuPDF document extraction.
- **`infrastructure/` (DevOps & Data Layer)**: Encapsulates container configurations so any developer can run `docker compose up` and have the entire ecosystem running locally.

---

## 4. Phase 2: Frontend Engineering (React 19, TypeScript, Design Tokens)

### 4.1 Modern Tech Stack Selection
- **React 19**: Leverages modern React capabilities and future-proof component lifecycle.
- **TypeScript**: Strict compile-time safety. In enterprise systems, `any` is forbidden.
- **Vite**: Ultra-fast build tool and development server using native ES modules.
- **Tailwind CSS 3.4**: Utility-first CSS configured with custom enterprise design tokens.

### 4.2 Design Token System (Google Stitch Inspired)
In professional UI/UX, colors, paddings, and font sizes are not random hex codes (`#123456`) scattered across CSS files. They are **design tokens** defined in a centralized configuration.

In `apps/web/tailwind.config.js`, we codified:
- **Editorial Legal Colors**:
  - `primary`: `#005c55` (Deep Teal / Pine green, conveying authority and legal trust)
  - `primary-container`: `#0f766e`
  - `surface`: `#f6f9ff` (Soft off-white / light slate)
  - `on-surface`: `#101d27` (High-contrast charcoal for readability)
  - `secondary`: `#455f87` (Appellate navy)
- **Typography**:
  - Headings & Citations: `Newsreader` (Editorial serif font for legal solemnity)
  - Body & UI Controls: `Inter` (Clean, highly legible sans-serif)
- **Elevation / Shadows**:
  - `level-1`, `level-2`, `level-3` soft ambient shadows matching modern Material Design.

### 4.3 Component & Shell Architecture
We implemented the **Shell / Layout Pattern**:
- `ChambersShell.tsx`: A persistent layout container containing the global navigation sidebar (`ChambersSidebar.tsx`) and the top bar (`GlobalHeader.tsx`), with React Router's `<Outlet />` rendering child views dynamically.
- **13 Complete Application Views**:
  - Landing page with evidence-grounded capabilities overview.
  - Sign In & Register pages.
  - Research Dashboard (New and Returning states).
  - New Research Investigation Input.
  - Live Research Execution & Progress view.
  - Research Synthesis Dossier (Findings, Statutes, Ratios, Confidence metrics).
  - Side-by-side Case Comparison matrix.
  - Document Vault & Document Clause Viewer.
  - Structured Reports Library.
  - Research History and Profile Settings.

---

## 5. Phase 3: Domain Modeling & Data Contracts

### The Engineering Problem
If the frontend expects `{ case_title: string }` but the backend sends `{ caseName: string }`, the UI crashes. If a field can be null, the frontend might throw `Cannot read properties of undefined`.

### The Solution: Strict TypeScript Interfaces
In `apps/web/src/types/jurisprudence.ts`, we codified domain models matching the legal domain:

```typescript
export interface PrecedentItem {
  id: string;
  caseName: string;
  citation: string;
  year: number;
  court: string;
  bench: string;
  ratio: string;
  verbatimQuote: string;
  pageReference: string;
  status: 'Verified' | 'Procedural Rule' | 'Caution' | 'Overruled';
  isSynthetic?: boolean;
}

export interface ResearchDossier {
  id: string;
  docketId: string;
  title: string;
  jurisdiction: string;
  indexedCount: number;
  findings: SubstantiveFinding[];
  statutes: StatutoryFrameworkItem[];
  precedents: PrecedentItem[];
  caveatTitle: string;
  caveatText: string;
  isSyntheticDataset: boolean;
}
```

### Why `isSynthetic` Flags Matter:
Every legal precedent and statute carries an explicit `isSynthetic?: boolean` flag. This guarantees that at any point in the UI, mock or benchmark items can be rendered with clear badges and disclaimers, preventing any misrepresentation.

---

## 6. Phase 4: Agentic AI Engineering vs. Naive Chatbots

### What is an "Agent"?
In AI engineering, an **Agent** is not just an LLM prompt. An agent is an autonomous unit of execution that:
1. Receives a specific state and objective.
2. Has access to a restricted set of **Tools** (e.g., database search, document parser).
3. Produces a validated, structured output (e.g., a Pydantic object).
4. Can trigger decisions, transitions, or retries.

### The Single-Agent Fallacy
Trying to build one massive prompt:  
*"You are a legal assistant. Search statutes, find cases, parse uploaded contracts, compare precedents, verify citations, and write a report."*  
**This fails 90% of the time.** The prompt becomes too long, the LLM loses attention, hallucinates citations, and ignores instructions.

### The Multi-Agent Solution (Specialization of Labor)
Just like a real legal research team has specialized roles (junior researcher, statutory researcher, case clerk, citation checker, senior counsel), our software architecture separates responsibilities into **8 Specialized Agents coordinated by 1 Orchestrator**.

---

## 7. Phase 5: LangGraph Multi-Agent State Machine Architecture

### Why LangGraph?
LangGraph is a Python framework designed to model multi-agent workflows as a **StateGraph (Directed Graph / State Machine)**. 

Unlike linear chains (like LangChain's basic chains), LangGraph allows:
- **Shared State**: All agents read from and write to a single typed state object (`LegalResearchState`).
- **Cycles & Loops**: If the evidence gathered is insufficient, the graph can loop back and perform additional retrieval.
- **Conditional Branching**: The graph can route to different agents depending on whether contracts were uploaded or whether citations were verified.
- **Human-in-the-Loop Interrupts**: The workflow can halt and wait for human review if statutory ambiguity is detected.

### The 8 Specialized Agents in `apps/ai-service/workflow.py`:

```mermaid
graph TD
    Start([User Research Query]) --> QA[1. Question Analysis Agent]
    QA --> LR[2. Legislation Research Agent]
    LR --> CD[3. Case Discovery Agent]
    CD --> DA[4. Document Analysis Agent]
    DA --> CC[5. Case Comparison Agent]
    CC --> CV[6. Citation Verification Agent]
    CV --> LS[7. Legal Synthesis Agent]
    
    LS --> Gate{Evidence Sufficiency Gate}
    Gate -- Insufficient & Retries < 2 --\> Retry[Additional Retrieval Node]
    Retry --> CD
    Gate -- Evidence Verified --\> RG[8. Report Generation Agent]
    RG --> Finish([Structured Research Report])
```

#### Detailed Breakdown of Each Agent Node:

1. **Question Analysis Agent (Section 9.2)**:
   - Takes the raw query.
   - Extracts legal domain, core issues, relevant parties, and missing factual context.
   - *Rule*: Never invent missing facts. Always flag missing context explicitly.

2. **Legislation Research Agent (Section 9.4)**:
   - Invokes statutory search tools via MCP.
   - Retrieves sections from the Industrial Disputes Act (IDA) and TEWA.

3. **Case Discovery Agent (Section 9.5)**:
   - Queries hybrid search (semantic vector + keyword FTS) for relevant judicial precedents.
   - Extracts case ratios and relevant passage IDs.

4. **Document Analysis Agent (Section 9.3)**:
   - Parses uploaded employment contracts or dispute letters.
   - Extracts remuneration clauses, termination terms, and statutory references.

5. **Case Comparison Agent (Section 9.6)**:
   - Compares multiple discovered precedents across factual matrices and legal defenses.
   - Identifies conflicting judicial authorities.

6. **Citation Verification Agent (Section 9.7 — The Signature Component)**:
   - Verifies whether every cited case exists in the indexed corpus.
   - Checks whether the claimed proposition is actually supported by the source passage.

7. **Legal Synthesis Agent (Section 9.8)**:
   - Synthesizes an executive legal ratio from only verified evidence.
   - Evaluates **evidence sufficiency** (requires at least 2 verified sources).

8. **Report Generation Agent (Section 9.9)**:
   - Generates a finalized, audit-ready structured report with clear evidence traceability and human review flags.

### The Fallback Architecture
In `workflow.py`, notice how we wrapped LangGraph compilation in a graceful try/except block:
If `langgraph` is available, it compiles a true `CompiledStateGraph`. If not, a deterministic sequential `FallbackRunner` executes the exact same nodes. This guarantees that your service never crashes even during lightweight testing environments.

---

## 8. Phase 6: Model Context Protocol (MCP) & Tool Architecture

### What is the Model Context Protocol (MCP)?
MCP is an open standard created by Anthropic that allows AI applications and LLM agents to securely discover, inspect, and invoke tools and data sources.

### Why MCP Instead of Raw Python Functions?
- **Standardized Schema**: Tools provide JSON schema definitions (`MCP_TOOL_DEFINITIONS`) containing parameter types and descriptions.
- **Security & Sandboxing**: Agents cannot execute arbitrary database queries. They can only execute authorized, audited tools.
- **Client/Server Decoupling**: Any MCP client (LangGraph, Claude Desktop, or custom microservices) can connect to the tool server.

### The 10 LegalLens MCP Tools in `apps/ai-service/mcp_tools.py`:
1. `search_legislation`: Search statutory provisions by Act and section.
2. `get_legislation_section`: Fetch full text of a statutory section.
3. `search_judgments`: Search judgments by query or factual matrix.
4. `get_judgment_details`: Retrieve case metadata, bench, and passages.
5. `verify_case_citation`: Verify citation existence in official reports.
6. `verify_statutory_reference`: Verify that a referenced Act is currently in force.
7. `verify_evidence_passage`: Validate verbatim existence of quoted text in the source.
8. `check_claim_support`: Compare a legal claim against a specific passage.
9. `get_uploaded_document`: Access an authorized user document.
10. `extract_document_clauses`: Extract structured contractual clauses.

---

## 9. Phase 7: Eliminating Architectural Redundancy & Technical Debt

### The Discovery: Duplicate Node.js MCP Service
During our architectural audit, we found:
- `apps/ai-service/mcp_tools.py` (Python MCP implementation)
- `services/mcp-server/index.js` (Node.js MCP implementation)

Both files were trying to implement the same tools. The Node.js service was unmaintained, had duplicate code, and added another Node runtime to Docker.

### The Senior Architect Decision: De-duplicate Cleanly
1. We audited dependencies across `apps/web` and `apps/api`. Neither had any dependency on `services/mcp-server`.
2. The Project Proposal explicitly specified the **Python MCP SDK**.
3. We cleanly deleted `services/mcp-server/` and removed it from `docker-compose.yml`.
4. We centralized all 10 tools in `apps/ai-service/mcp_tools.py` and exposed them via clean REST endpoints (`/api/v1/mcp/tools` and `/api/v1/mcp/call`) in FastAPI.

> **Architectural Lesson**: *Two implementations of the same responsibility is not redundancy—it is technical debt. Always identify the single authoritative service and eliminate the duplicate.*

---

## 10. Phase 8: Multi-Container Infrastructure (Docker & pgvector)

### Why PostgreSQL + pgvector?
- We need **hybrid search**:
  1. **Keyword Search (BM25 / Full-Text Search)**: Crucial for finding exact legal terms like "Section 31B" or "Constructive Dismissal".
  2. **Vector Search (Cosine Similarity)**: Crucial for semantic concept discovery (e.g., "cutting salary without agreement" matching "unilateral remuneration variation").
- Instead of running two separate databases (e.g., Elasticsearch + Pinecone), PostgreSQL with the `pgvector` extension provides both relational safety and high-performance vector indexing in a single ACID-compliant database.

### The `infrastructure/docker-compose.yml` Architecture:

```yaml
version: '3.8'

services:
  web:
    build: ./apps/web
    ports: ["3000:3000"]
    depends_on: [api]

  api:
    build: ./apps/api
    ports: ["5000:8080"]
    environment:
      - AIService__BaseUrl=http://ai-service:8000
      - ConnectionStrings__DefaultConnection=Host=postgres;Port=5432;Database=legallens;Username=postgres;Password=postgres
    depends_on: [ai-service, postgres]

  ai-service:
    build: ./apps/ai-service
    ports: ["8000:8000"]
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/legallens
    depends_on: [postgres]

  postgres:
    image: pgvector/pgvector:pg16
    ports: ["5432:5432"]
    environment:
      - POSTGRES_DB=legallens
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

Every service connects through internal Docker networking, ensuring isolation and production readiness.

---

## 11. Phase 9: Responsible AI, Synthetic Data, & Hallucination Control

### 11.1 The Danger of "Fake Numbers"
In early prototypes, developers often put flashy marketing claims: *"100% Zero Hallucinations"*, *"98.4% Confidence Score"*, *"50,000 Supreme Court Cases Indexed"*.

In an enterprise legal system, this is unethical and dangerous:
1. LLMs cannot provide calibrated statistical probability scores simply by generating a percentage.
2. Claiming real-world case counts when the database contains synthetic test cases violates academic and professional integrity.

### 11.2 What We Fixed:
1. **Replaced Subjective Sliders with Discrete Evidence Rules**:
   - In `ProfileSettingsPage.tsx`, we eliminated the arbitrary "Confidence %" slider.
   - We replaced it with concrete, verifiable engineering rules:
     - `[x] Require exact verbatim passage match before marking citation as supported.`
     - `[x] Flag report for human review whenever statutory ambiguity or conflicting precedents are detected.`
2. **Prominent Synthetic Data Disclaimers**:
   - Added persistent, clear notice banners across the Landing Page, Dashboard, and Reports:  
     `"Notice: Prototype environment utilizing a simulated Sri Lankan employment law dataset for technical validation and agentic workflow demonstration. Not authentic legal authority."`
3. **Evidence Gating in LangGraph**:
   - If the Citation Verification Agent cannot match a claim to an exact passage ID, `evidence_sufficient` evaluates to `False`, forcing the system into additional retrieval or requiring human sign-off.

---

## 12. Step-by-Step Blueprint: How to Replicate This on Any Project

Follow this 10-step blueprint to build any high-integrity AI platform from scratch:

```text
Step 1: Read the requirements specification and document all constraints.
Step 2: Scaffold a monorepo (apps/web, apps/api, apps/ai-service, infrastructure/).
Step 3: Establish design tokens in Tailwind CSS (colors, typography, spacing).
Step 4: Define strict domain data contracts (TypeScript interfaces & Pydantic models).
Step 5: Build UI shell and views with realistic mock data to validate user journeys.
Step 6: Decompose the AI problem into 5–8 specialized tasks (Agents).
Step 7: Build the LangGraph StateGraph with shared state, conditional edges, and retries.
Step 8: Define and register MCP tools with strict JSON schemas.
Step 9: Configure PostgreSQL + pgvector in Docker Compose for hybrid search.
Step 10: Enforce citation verification gates, synthetic data labeling, and human-in-the-loop controls.
```

By following this guide, you understand not just **what** was done, but **why** every line of code was placed where it is. You are now equipped to architect, inspect, and build enterprise-grade agentic AI systems with confidence.

