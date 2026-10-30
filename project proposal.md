<div align="center">

<img src="docs/assets/banner.svg" alt="LegalLens AI - Project Proposal Cover" width="100%">

<br>

**Prepared by: Mohamed Shakir**  
**30 October 2026**

![Agentic AI](https://img.shields.io/badge/Agentic_AI-Multi--Agent-5B6EE1?style=for-the-badge) ![RAG](https://img.shields.io/badge/Hybrid_RAG-Evidence_Retrieval-0E9F9A?style=for-the-badge) ![MCP](https://img.shields.io/badge/MCP-Tool_Integration-D97706?style=for-the-badge) ![Harness](https://img.shields.io/badge/Harness_Engineering-Reliability-9333EA?style=for-the-badge)

</div>

---

> [!IMPORTANT]
> **Core principle:** LegalLens AI must demonstrate why it produced an answer, which sources support it, and whether those sources have been verified.

## Table of contents

---

1. [1. Executive summary](#1-executive-summary)
2. [2. Project identity](#2-project-identity)
3. [3. Problem statement](#3-problem-statement)
4. [4. Project aim and objectives](#4-project-aim-and-objectives)
5. [4. Scope and functional requirements](#4-scope-and-functional-requirements)
6. [8. Complete system architecture](#8-complete-system-architecture)
7. [9. Detailed agent design](#9-detailed-agent-design)
8. [10. RAG pipeline — Detailed engineering design](#10-rag-pipeline-detailed-engineering-design)
9. [11. MCP architecture and tool integration](#11-mcp-architecture-and-tool-integration)
10. [12. Harness Engineering - Reliability and control infrastructure](#12-harness-engineering---reliability-and-control-infrastructure)
11. [13. Dataset Strategy and Knowledge Base Development](#13-dataset-strategy-and-knowledge-base-development)
12. [14. Database design](#14-database-design)
13. [15. Recommended technology stack](#15-recommended-technology-stack)
14. [17. Evaluation methodology](#17-evaluation-methodology)

---

## 1. Executive summary

---

Legal research is a complex information-intensive process. Legal professionals, researchers and law students must examine legislation, judicial decisions, regulations and legal documents to understand how the law applies to a particular set of facts.

Although Large Language Models (LLMs) can explain legal concepts and summarize documents, relying on them for legal research introduces serious challenges:

- Legal hallucinations: generating nonexistent or inaccurate cases.
- Citation inaccuracies: referencing genuine judgments that do not support the generated claims.
- Jurisdiction confusion: applying foreign legal principles to Sri Lankan legal questions.
- Temporal inaccuracies: using outdated legislation or overlooking amendments.
- Fragmented information: legal sources are distributed across different repositories.
- Weak traceability: users cannot easily establish where a generated conclusion originated.
LegalLens AI proposes an evidence-grounded multi-agent research platform that combines:

1. Agentic AI for autonomous research planning and coordinated investigation.
1. Hybrid RAG for retrieving legislation, judgments and legal documents.
1. Model Context Protocol (MCP) for standardized integration with legal research tools and external services.
1. Knowledge Graphs for identifying relationships between cases, statutes, legal provisions and judicial references.
1. Harness Engineering for controlling agent execution, enforcing permissions, verifying outputs and measuring reliability.
1. Human-in-the-Loop for professional oversight of important findings.
The platform will allow users to ask legal research questions, upload documents, discover relevant cases, compare judicial decisions and generate research reports with traceable evidence.

The central engineering principle: LegalLens AI must be able to demonstrate why it produced an answer, which sources support it and whether those sources have been verified.

## 2. Project identity

---

<table style="width:100%;border-collapse:collapse;border:2px solid #244B7A;font-family:Arial,sans-serif;font-size:14px">
<thead><tr><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Item</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Description</th></tr></thead>
<tbody>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Project name</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">LegalLens AI</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Project category</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Agentic AI / LegalTech</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Domain</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Legal research and document intelligence</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Initial jurisdiction</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Sri Lanka</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Target users</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Law students, legal researchers, lawyers and academics</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Application type</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Web-based intelligent research platform</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">AI architecture</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Multi-agent orchestration</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Knowledge architecture</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Hybrid RAG + Knowledge Graph</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Integration architecture</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">MCP</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Reliability architecture</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Harness Engineering</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Development duration</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">8 - 2 weeks</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Deliverable</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Deployed, demonstrable working prototype</td></tr>
</tbody></table>

### 🔹 Proposed project positioning

LegalLens AI is not intended to be another legal chatbot.

It is an AI-assisted legal research environment that performs structured investigations.

A chatbot answers a question.

LegalLens AI should:

- Understand the research problem.
- Develop a research plan.
- Find authoritative legal sources.
- Retrieve supporting passages.
- Compare relevant judicial decisions.
- Verify citations.
- Identify conflicting evidence and uncertainty.
- Produce a traceable research report.
That distinction should be visible in your implementation and final demonstration.

## 3. Problem statement

---

Sri Lankan legal information is distributed across legislation, official publications, judicial decisions and other legal resources.

Legal researchers must identify relevant sources, interpret legal terminology, locate previous judgments, compare judicial reasoning and verify legal citations.

This process can be time-consuming and requires careful attention to jurisdiction, legal authority and the validity of legal sources.

General-purpose LLMs can assist with natural-language explanations, but they are not inherently reliable legal research systems. They may generate unsupported legal statements, misrepresent judicial decisions or overlook legislative amendments.

There is therefore an engineering opportunity to develop an integrated AI-assisted legal research system that combines structured legal retrieval, coordinated agent-based investigation, source verification and controlled execution.

### 🔹 Proposed problem statement:

How can a multi-agent AI architecture integrating hybrid Retrieval-Augmented Generation, legal knowledge graphs, Model Context Protocol and Harness Engineering improve the traceability, retrieval quality and reliability of legal research within the Sri Lankan legal context?

This gives the project a technical direction that can be evaluated rather than simply claiming that AI makes legal research faster.

## 4. Project aim and objectives

---

### 🔹 4.1 Main aim

To design and develop an evidence-grounded, multi-agent AI platform that assists users in conducting Sri Lankan legal research through intelligent document retrieval, legal case analysis, citation verification and structured research report generation.

### 🔹 4.2 Specific objectives

<table style="width:100%;border-collapse:collapse;border:2px solid #244B7A;font-family:Arial,sans-serif;font-size:14px">
<thead><tr><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">ID</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Objective</th></tr></thead>
<tbody>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">RO1</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Develop a curated knowledge base of Sri Lankan legislation, judgments and legal documents.</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">RO2</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Implement a hybrid RAG pipeline combining semantic and keyword retrieval.</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">RO3</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Develop specialized AI agents for legal question analysis, legislation retrieval, case discovery and document analysis.</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">RO4</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Implement automated citation and evidence verification.</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">RO5</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Develop a legal knowledge graph representing relationships between cases and legislation.</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">RO6</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Implement an MCP server exposing controlled legal research tools.</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">RO7</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Implement Harness Engineering mechanisms for execution control, validation, observability and recovery.</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">RO8</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Evaluate the system using retrieval benchmarks, citation verification tests and comparative experiments.</td></tr>
</tbody></table>

## 4. Scope and functional requirements

---

Sri Lankan employment law research and document analysis.

Why?

- It provides a bounded research domain.
- It supports meaningful statutory and case-law retrieval.
- It gives you realistic document-analysis use cases.
- It allows you to build a smaller but carefully validated corpus.
- It avoids the complexity of indexing every area of Sri Lankan law.
Corpus availability should be confirmed before this domain is finalized.

### 🔹 7.1 Functional requirements

<table style="width:100%;border-collapse:collapse;border:2px solid #244B7A;font-family:Arial,sans-serif;font-size:14px">
<thead><tr><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">ID</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Requirement</th></tr></thead>
<tbody>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">FR-01</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Users can register, authenticate and manage research projects.</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">FR-02</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Users can submit legal research questions.</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">FR-03</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">The system identifies the jurisdiction and legal domain.</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">FR-04</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Users can upload legal documents.</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">FR-05</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">The system extracts text and structured document metadata.</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">FR-06</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">The system retrieves relevant legislation.</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">FR-07</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">The system retrieves relevant judgments.</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">FR-08</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">The system performs hybrid legal retrieval.</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">FR-09</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">The system compares selected judgments.</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">FR-10</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">The system verifies case citations and statutory references.</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">FR-11</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">The system maps claims to supporting passages.</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">FR-12</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">The system generates structured research reports.</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">FR-13</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Users can inspect original source passages.</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">FR-14</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">The system records research activity and agent execution traces.</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">FR-15</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Users can export research reports.</td></tr>
</tbody></table>

### 🔹 7.2 Non-functional requirements

- Security and privacy of uploaded documents.
- Role-based access control.
- Source traceability.
- Reproducible research workflows.
- Low hallucination rates.
- Fault-tolerant execution.
- Document processing reliability.
- Scalable retrieval.
- Clear separation of legal information and professional legal advice.
## 8. Complete system architecture

---

The project team recommends a modular architecture with four major layers:

1. Application layer.
1. Agent orchestration layer.
1. Legal intelligence layer.
1. Harness and governance layer.
**LegalLens AI ****-**** System architecture**

```mermaid
%%{init: {'theme':'base','themeVariables': {'fontFamily':'Arial, sans-serif','fontSize':'16px','primaryColor':'#DCEBFF','primaryTextColor':'#102A43','primaryBorderColor':'#2563EB','lineColor':'#5277A8','secondaryColor':'#D9F7F0','tertiaryColor':'#FFE8CC','clusterBkg':'#EEF4FF','clusterBorder':'#7397C7','edgeLabelBackground':'#FFF7DB','nodeBorder':'#2563EB','mainBkg':'#DCEBFF','textColor':'#102A43','titleColor':'#173B70'}}}%%
flowchart TB
  subgraph P["01. Presentation layer"]
    UI["React 19 + TypeScript<br/>Research workspace · Document viewer · Dashboards"]
  end
  subgraph B["02. Application backend"]
    API[".NET Web API<br/>Authentication · Research management · Document management · API services"]
  end
  subgraph A["03. Agentic intelligence layer"]
    ORCH["LangGraph Agent Orchestrator<br/>Planning · Workflow state · Task routing · Checkpointing"]
    QA["Question Analysis Agent"]
    DA["Document Analysis Agent"]
    LA["Legislation Research Agent"]
    CD["Case Discovery Agent"]
    CC["Case Comparison Agent"]
    CV["Citation Verification Agent"]
    LS["Legal Synthesis Agent"]
    RG["Report Generation Agent"]
    ORCH --> QA
    ORCH --> DA
    ORCH --> LA
    ORCH --> CD
    LA --> CC
    CD --> CC
    CC --> CV
    CV --> LS
    LS --> RG
  end
  subgraph M["04. MCP integration layer"]
    MCP["LegalLens MCP Server<br/>Legal search · Citation lookup · Document access · Research tools"]
  end
  subgraph L["05. Legal intelligence infrastructure"]
    RAG["Hybrid RAG<br/>Vector search + BM25"]
    KG["Knowledge Graph<br/>Cases · Statutes · Relationships"]
    CORPUS["Legal Corpus<br/>Documents · Passages"]
    EVID["Evidence Store<br/>Claims · Citations · Sources"]
  end
  subgraph H["06. Harness engineering & governance"]
    GOV["Agent reliability and control framework<br/>Policy enforcement · Validation · Observability · Evaluation · Human approval · Recovery"]
  end
  UI --> API --> ORCH
  ORCH <--> MCP
  MCP <--> RAG
  MCP <--> KG
  MCP <--> CORPUS
  MCP <--> EVID
  GOV -. controls .-> ORCH
  GOV -. validates .-> MCP

  %% Colorful node palette; bold labels
  classDef color1 fill:#DCEBFF,stroke:#2563EB,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color2 fill:#D9F7F0,stroke:#0F9D85,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color3 fill:#FFE8CC,stroke:#D97706,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color4 fill:#F0E4FF,stroke:#7C3AED,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color5 fill:#FFE0E7,stroke:#DB4777,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color6 fill:#DDF3FF,stroke:#0284C7,stroke-width:2.5px,color:#14213D,font-weight:bold;
  class P color1;
  class UI color2;
  class B color3;
  class API color4;
  class A color5;
  class ORCH color6;
  class QA color1;
  class DA color2;
  class LA color3;
  class CD color4;
  class CC color5;
  class CV color6;
  class LS color1;
  class RG color2;
  class M color3;
  class MCP color4;
  class L color5;
  class RAG color6;
  class KG color1;
  class CORPUS color2;
  class EVID color3;
  class H color4;
  class GOV color5;
```

### 🔹 8.1 Main service responsibilities

<table style="width:100%;border-collapse:collapse;border:2px solid #244B7A;font-family:Arial,sans-serif;font-size:14px">
<thead><tr><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Service</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Responsibility</th></tr></thead>
<tbody>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Web application</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Research interaction and evidence visualization</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">.NET backend</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Core business logic and API</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">AI service</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Agent orchestration</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Retrieval service</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Hybrid search and re-ranking</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Ingestion service</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Legal document processing</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">MCP server</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Controlled external tool access</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Verification service</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Citation and evidence checking</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Background workers</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Document processing and long-running tasks</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Database</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Persistent application and research records</td></tr>
</tbody></table>

### 🔹 8.2 Example end-to-end workflow

A user asks:

"Research the legal framework applicable to termination of employment in Sri Lanka and identify relevant judicial decisions."

The following workflow takes place:

```mermaid
%%{init: {'theme':'base','themeVariables': {'fontFamily':'Arial, sans-serif','fontSize':'16px','primaryColor':'#DCEBFF','primaryTextColor':'#102A43','primaryBorderColor':'#2563EB','lineColor':'#5277A8','secondaryColor':'#D9F7F0','tertiaryColor':'#FFE8CC','clusterBkg':'#EEF4FF','clusterBorder':'#7397C7','edgeLabelBackground':'#FFF7DB','nodeBorder':'#2563EB','mainBkg':'#DCEBFF','textColor':'#102A43','titleColor':'#173B70'}}}%%
flowchart TD
  U["User submits research question"] --> Q["Question Analysis Agent"]
  Q --> P["Research plan"]
  P --> L["Legislation Research Agent"]
  P --> C["Case Discovery Agent"]
  L --> E["Evidence collection"]
  C --> E
  E --> CMP["Case Comparison Agent"]
  CMP --> V["Citation Verification Agent"]
  V --> G{"Evidence sufficient?"}
  G -- "No" --> AR["Additional retrieval"]
  AR --> P
  G -- "Yes" --> S["Legal Synthesis Agent"]
  S --> R["Report Generation"]
  R --> HR["Human review"]
  HR --> OUT["Final research report"]

  %% Colorful node palette; bold labels
  classDef color1 fill:#DCEBFF,stroke:#2563EB,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color2 fill:#D9F7F0,stroke:#0F9D85,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color3 fill:#FFE8CC,stroke:#D97706,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color4 fill:#F0E4FF,stroke:#7C3AED,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color5 fill:#FFE0E7,stroke:#DB4777,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color6 fill:#DDF3FF,stroke:#0284C7,stroke-width:2.5px,color:#14213D,font-weight:bold;
  class U color1;
  class Q color2;
  class P color3;
  class L color4;
  class C color5;
  class E color6;
  class CMP color1;
  class V color2;
  class G color3;
  class AR color4;
  class S color5;
  class R color6;
  class HR color1;
  class OUT color2;
```

The system must retain the retrieved passages and intermediate findings so that the final report is reproducible.

## 9. Detailed agent design

---

This is the heart of the system.

The project team recommends eight specialized agents, with one orchestrator.

The proposed implementation will use eight task-specific components within one controlled workflow rather than eight independent chatbots.

### 🔹 9.1 Research Orchestrator Agent

Central coordinator

Responsibility: Coordinate the complete research process.

Inputs:

- User research question.
- Jurisdiction.
- Legal domain.
- Uploaded documents.
- User research preferences.
Operations:

1. Analyze the requested task.
1. Generate a research plan.
1. Determine which specialist agents are required.
1. Dispatch tasks.
1. Collect structured findings.
1. Detect incomplete evidence.
1. Request additional investigation.
1. Trigger final synthesis.
1. Persist workflow state.
Example output:

```json
{
"research_id": "RES-001",
"jurisdiction": "LK",
"domain": "Employment Law",
"tasks": [
"identify_relevant_legislation",
"discover_relevant_judgments",
"analyze_uploaded_documents",
"verify_citations"
],
"requires_human_review": true
}
```

### 🔹 9.2 Question Analysis Agent

Responsibility: Understand what the user actually wants to investigate.

It extracts:

- Legal domain.
- Jurisdiction.
- Relevant parties.
- Key facts.
- Important dates.
- Legal questions.
- Research scope.
- Missing information.
Example:

Input:

"Can an employer terminate an employee without following the applicable legal procedure?"

Output:

- Domain: Employment law.
- Jurisdiction: Sri Lanka.
- Research issue: Employment termination.
- Research objective: Identify applicable statutory requirements and relevant judgments.
- Missing context: Employment type, relevant dates, applicable agreement and other facts.
The agent must not invent missing facts.

### 🔹 9.3 Document Analysis Agent

Responsibility: Extract structured information from uploaded documents.

Supported documents:

- PDF.
- DOCX.
- TXT.
Operations:

1. Extract document text.
1. Identify document type.
1. Extract parties.
1. Extract dates.
1. Identify relevant clauses.
1. Identify references to statutes and cases.
1. Highlight potentially relevant provisions.
1. Produce structured extraction results.
Important: The agent should distinguish text extracted directly from the document from interpretations generated by an LLM.

### 🔹 9.4 Legislation Research Agent

Responsibility: Find relevant legislation and statutory provisions.

Operations:

1. Identify the legal subject.
1. Search the legislation corpus.
1. Apply jurisdiction and temporal filters.
1. Retrieve relevant Acts and provisions.
1. Identify amendments and effective dates where available.
1. Return exact source passages.
Example output:

```json
{
"source_type": "legislation",
"document_id": "ACT-001",
"title": "Verified Act title",
"section": "Section reference",
"relevant_passage_ids": [
"PASSAGE-101"
],
"source_status": "verified"
}
```

The title and section above are placeholders, not actual legal references.

### 🔹 9.5 Case Discovery Agent

Responsibility: Find relevant Sri Lankan judgments.

Retrieval methods:

- Semantic search.
- Keyword search.
- Citation search.
- Metadata search.
- Graph traversal.
The agent should identify:

- Case name.
- Court.
- Case number.
- Date.
- Relevant passages.
- Cited legislation.
- Related cases.
It should distinguish a judgment's existence from its legal relevance.

### 🔹 9.6 Case Comparison Agent

Responsibility: Compare relevant judgments.

A useful comparison structure:

<table style="width:100%;border-collapse:collapse;border:2px solid #244B7A;font-family:Arial,sans-serif;font-size:14px">
<thead><tr><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Dimension</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Case A</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Case B</th></tr></thead>
<tbody>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Facts</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Extracted facts</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Extracted facts</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Legal issue</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Identified issue</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Identified issue</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Applicable law</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Verified provisions</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Verified provisions</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Judicial reasoning</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Relevant passages</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Relevant passages</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Outcome</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Verified outcome</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Verified outcome</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Distinction</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Comparison</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Comparison</td></tr>
</tbody></table>

The agent should not automatically classify a case as binding or persuasive without considering the relevant court hierarchy, jurisdiction and procedural context.

### 🔹 9.7 Citation Verification Agent

Signature component

Responsibility: Verify the legal references and evidence supporting generated claims.

It performs:

- Case existence checks.
- Case metadata checks.
- Statutory citation checks.
- Passage existence checks.
- Claim-to-evidence support checks.
- Contradiction detection.
- Source-version checks.
Suggested output:

```json
{
"claim_id": "CLM-001",
"source_id": "CASE-001",
"passage_id": "PASSAGE-101",
"source_verified": true,
"passage_verified": true,
"support_status": "supported",
"jurisdiction_match": true,
"review_required": false
}
```

A failed verification should not be silently ignored. The orchestrator should remove, qualify or investigate the unsupported claim.

### 🔹 9.8 Legal Synthesis Agent

Responsibility: Combine the findings from specialist agents.

It produces:

- Research summary.
- Relevant statutory provisions.
- Relevant judicial decisions.
- Legal principles identified in sources.
- Similarities and differences between cases.
- Potentially conflicting authorities.
- Factual uncertainties.
- Research limitations.
This agent should synthesize evidence, not act as a substitute for a qualified lawyer's legal opinion.

### 🔹 9.9 Report Generation Agent

Responsibility: Produce the final structured report.

Recommended report:

1. Executive summary.
1. Research question.
1. Jurisdiction and scope.
1. Facts provided by the user.
1. Identified legal issues.
1. Relevant legislation.
1. Relevant judgments.
1. Case comparison.
1. Evidence-backed findings.
1. Uncertainties and limitations.
1. Source bibliography.
Every legal claim should retain a link to its evidence record.

## 10. RAG pipeline — Detailed engineering design

---

This is where you can demonstrate genuine AI engineering.

A basic RAG pipeline is insufficient for LegalLens.

The project team recommends a Structure-Aware Hybrid Legal RAG Pipeline.

### 🔹 10.1 Data ingestion

Input sources:

- Acts.
- Amendment Acts.
- Regulations.
- Gazette documents.
- Court judgments.
- Legal research documents.
The ingestion pipeline should capture the following metadata:

```json
{
"document_id": "DOC-001",
"document_type": "judgment",
"jurisdiction": "LK",
"court": "Supreme Court",
"case_number": "source-derived",
"document_title": "source-derived",
"publication_date": "source-derived",
"effective_date": null,
"source_url": "original-source",
"language": "en",
"verification_status": "pending"
}
```

Use source-derived values only. Missing fields should remain null.

### 🔹 10.2 Document preprocessing

Legal documents require special treatment.

A normal text splitter may break legal sections incorrectly.

For example:

Section 10

Subsection (1)

Paragraph (a)

Paragraph (b)

These parts may need to remain together because their legal meaning depends on their hierarchy.

Recommended preprocessing:

1. PDF text extraction.
1. OCR for scanned documents.
1. Heading detection.
1. Section and subsection extraction.
1. Paragraph identification.
1. Table extraction.
1. Metadata extraction.
1. Document integrity checks.
Store the original document and its extracted representation.

### 🔹 10.3 Structure-aware chunking

Instead of arbitrary 500-token chunks, use legal document structure.

Recommended chunk types:

<table style="width:100%;border-collapse:collapse;border:2px solid #244B7A;font-family:Arial,sans-serif;font-size:14px">
<thead><tr><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Document</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Chunking strategy</th></tr></thead>
<tbody>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Legislation</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Act → Part → Section → Subsection</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Judgments</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Case → Headnote/metadata → Paragraph</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Contracts</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Clause → Subclause → Paragraph</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Regulations</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Regulation → Subregulation</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Research papers</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Heading → Section → Paragraph</td></tr>
</tbody></table>

Preserve the original page and paragraph references.

Each chunk should contain:

- Document ID.
- Passage ID.
- Original text.
- Page number.
- Section or paragraph.
- Jurisdiction.
- Document type.
- Publication date.
- Legal version information.
- Source URL.
### 🔹 10.4 Embedding generation

Generate embeddings for each legal passage.

Possible models:

- OpenAI embedding models.
- BGE embedding models.
- Multilingual embedding models.
For the initial English-language MVP, benchmark two embedding models rather than automatically choosing the largest one.

### 🔹 10.5 Hybrid retrieval

**Hybrid legal retrieval**

Research query

Vector Search

Semantic similarity

BM25 Search

Exact terminology

Metadata filtering

Sri Lanka · Court · Date · Document type

Reciprocal Rank Fusion

Combine retrieval rankings

Cross-encoder / semantic re-ranking

Verified relevant passages

Why hybrid retrieval?

Consider the query:

"Find judgments discussing termination of employment."

Semantic search may identify documents discussing dismissal, termination and employment disputes.

Keyword search can identify exact statutory phrases and case references.

Combining both can improve retrieval coverage.

Use Reciprocal Rank Fusion (RRF) to combine rankings, followed by re-ranking.

### 🔹 10.6 Knowledge graph retrieval

Create a legal knowledge graph using Neo4j.

Proposed entities:

- Case.
- Court.
- Judge.
- Act.
- Section.
- Regulation.
- Legal concept.
- Party.
- Document.
Proposed relationships:

- CITES
- INTERPRETS
- APPLIES
- AMENDS
- DISTINGUISHES
- OVERRULES
- HEARD_BY
- CONTAINS_SECTION
Only establish relationships when they are supported by reliable source evidence. In particular, OVERRULES must not be inferred from mere citation patterns.

Example:

**Legal knowledge graph example**

Case A

Judgment

CITES ↓

Case B

Earlier judgment

INTERPRETS ↓

Act C — Section 12

Statutory provision

Illustrative graph structure; the entities and relationships must come from actual legal sources.

### 🔹 10.7 Retrieval and synthesis

The final context supplied to the Legal Synthesis Agent should include:

- Relevant passages.
- Source metadata.
- Retrieval scores.
- Jurisdiction.
- Legal document dates.
- Citation relationships.
- Verification status.
The agent should not receive only raw text. It should receive evidence objects that retain source identity.

### 🔹 10.8 Source-grounded generation

Use a strict generation contract:

- Do not invent legal authorities.
- Do not invent quotations.
- Do not invent paragraph numbers.
- Do not mix jurisdictions.
- Distinguish verified facts from inferred interpretations.
- Cite the supporting passage for each important claim.
- State when evidence is insufficient.
- Preserve uncertainty and conflicting sources.
A key design rule: If the system cannot find adequate supporting evidence, it must return an insufficient-evidence response instead of fabricating an answer.

## 11. MCP architecture and tool integration

---

MCP will be an important architectural component, not just a technology mentioned in the project documentation.

Your application will implement a custom LegalLens MCP Server.

This server exposes legal research capabilities to the AI agents through standardized tools.

### 🔹 11.1 MCP architecture

**LegalLens MCP architecture**

```mermaid
%%{init: {'theme':'base','themeVariables': {'fontFamily':'Arial, sans-serif','fontSize':'16px','primaryColor':'#DCEBFF','primaryTextColor':'#102A43','primaryBorderColor':'#2563EB','lineColor':'#5277A8','secondaryColor':'#D9F7F0','tertiaryColor':'#FFE8CC','clusterBkg':'#EEF4FF','clusterBorder':'#7397C7','edgeLabelBackground':'#FFF7DB','nodeBorder':'#2563EB','mainBkg':'#DCEBFF','textColor':'#102A43','titleColor':'#173B70'}}}%%
flowchart TB
  subgraph OR["LangGraph Agent Orchestrator"]
    WS["Workflow state management"]
    PLAN["Planning & reasoning"]
    ROUTE["Agent routing & coordination"]
    CHECK["Checkpointing & recovery"]
    MEM["Memory & context"]
  end
  CLIENT["MCP Client<br/>Connects LangGraph agents to external tools via MCP"] --> SERVER
  OR --> CLIENT
  subgraph SERVER["LegalLens MCP Server"]
    direction TB
    LS["Legal Search tools<br/>Search legislation and cases"]
    DT["Document tools<br/>Read and analyze documents"]
    CT["Citation tools<br/>Verify references and evidence"]
    GT["Graph tools<br/>Explore case relationships"]
    RT["Research tools<br/>Manage research tasks"]
    ET["Export tools<br/>Generate reports"]
  end
  subgraph DATA["LegalLens services"]
    PG[("PostgreSQL<br/>Application data & metadata")]
    VS[("Vector search<br/>Semantic embeddings")]
    N4[("Neo4j<br/>Legal knowledge graph")]
    DS[("Document storage<br/>Original files")]
  end
  SERVER <--> PG
  SERVER <--> VS
  SERVER <--> N4
  SERVER <--> DS

  %% Colorful node palette; bold labels
  classDef color1 fill:#DCEBFF,stroke:#2563EB,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color2 fill:#D9F7F0,stroke:#0F9D85,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color3 fill:#FFE8CC,stroke:#D97706,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color4 fill:#F0E4FF,stroke:#7C3AED,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color5 fill:#FFE0E7,stroke:#DB4777,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color6 fill:#DDF3FF,stroke:#0284C7,stroke-width:2.5px,color:#14213D,font-weight:bold;
  class OR color1;
  class WS color2;
  class PLAN color3;
  class ROUTE color4;
  class CHECK color5;
  class MEM color6;
  class CLIENT color1;
  class SERVER color2;
  class LS color3;
  class DT color4;
  class CT color5;
  class GT color6;
  class RT color1;
  class ET color2;
  class DATA color3;
  class PG color4;
  class VS color5;
  class N4 color6;
  class DS color1;
```

### 🔹 11.2 Proposed MCP tools

### 🔹 Legal retrieval tools

<table style="width:100%;border-collapse:collapse;border:2px solid #244B7A;font-family:Arial,sans-serif;font-size:14px">
<thead><tr><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Tool</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Purpose</th></tr></thead>
<tbody>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">search_legislation</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Search legislation by topic or keywords</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">get_legislation_section</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Retrieve a particular statutory provision</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">search_judgments</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Search Sri Lankan judgments</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">get_judgment_details</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Retrieve judgment metadata and content</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">search_legal_concepts</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Search indexed legal concepts</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">get_related_cases</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Discover connected cases</td></tr>
</tbody></table>

### 🔹 Citation and verification tools

<table style="width:100%;border-collapse:collapse;border:2px solid #244B7A;font-family:Arial,sans-serif;font-size:14px">
<thead><tr><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Tool</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Purpose</th></tr></thead>
<tbody>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">verify_case_citation</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Verify a case citation</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">verify_statutory_reference</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Verify an Act and section</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">verify_evidence_passage</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Confirm that a supporting passage exists</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">check_claim_support</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Assess whether a passage supports a claim</td></tr>
</tbody></table>

### 🔹 Document and research tools

<table style="width:100%;border-collapse:collapse;border:2px solid #244B7A;font-family:Arial,sans-serif;font-size:14px">
<thead><tr><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Tool</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Purpose</th></tr></thead>
<tbody>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">get_uploaded_document</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Retrieve an authorized uploaded document</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">extract_document_clauses</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Extract document clauses</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">create_research_record</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Create a research record</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">get_research_history</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Retrieve previous research activity</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">export_research_report</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Export an approved report</td></tr>
</tbody></table>

### 🔹 11.3 MCP security design

Do not give every agent access to every tool.

For example:

<table style="width:100%;border-collapse:collapse;border:2px solid #244B7A;font-family:Arial,sans-serif;font-size:14px">
<thead><tr><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Agent</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Allowed MCP tools</th></tr></thead>
<tbody>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Legislation Agent</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Legislation search and section retrieval</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Case Discovery Agent</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Judgment search and related cases</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Citation Agent</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Citation and evidence verification</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Document Agent</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Authorized document retrieval</td></tr>
</tbody></table>

Important controls:

- Validate all tool inputs.
- Enforce user-level document permissions.
- Apply tool-specific permissions.
- Restrict database queries.
- Set execution timeouts.
- Log every invocation.
- Treat retrieved documents as untrusted data.
- Never execute instructions found inside uploaded legal documents.
- Keep secrets and credentials outside LLM context.
MCP standardizes the tool interface. Your backend must still enforce the security policies.

Official protocol reference: .

## 12. Harness Engineering - Reliability and control infrastructure

---

Major engineering differentiator

This component warrants particular attention.

A multi-agent application can fail in many ways:

- An agent invents a case citation.
- An agent repeatedly calls the same tool.
- An agent retrieves irrelevant documents.
- An agent enters an infinite research loop.
- An agent receives malicious instructions from an uploaded document.
- An agent produces malformed JSON.
- An agent reports that a citation is verified without checking the original source.
Harness Engineering is the system surrounding your agents that controls, monitors, tests and constrains their behavior.

### 🔹 12.1 Proposed harness components

<table style="width:100%;border-collapse:collapse;border:2px solid #244B7A;font-family:Arial,sans-serif;font-size:14px">
<thead><tr><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Component</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Implementation</th></tr></thead>
<tbody>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Workflow controller</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">LangGraph state machine</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">State persistence</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">PostgreSQL checkpointer</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Input validation</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Pydantic schemas</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Output validation</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">JSON Schema / Pydantic</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Tool permissions</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Role-based tool registry</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Execution limits</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Maximum iterations and token budgets</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Timeout handling</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Per-agent execution timeouts</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Retry mechanism</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Bounded retries with backoff</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Evidence validation</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Citation verification service</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Observability</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Structured logs and OpenTelemetry</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Evaluation</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Automated benchmark pipeline</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Human review</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Workflow interruption and approval</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Security</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Prompt-injection defenses and data isolation</td></tr>
</tbody></table>

### 🔹 12.2 Agent execution contract

Every agent must follow a defined execution contract.

For example:

```json
{
"agent_name": "case_discovery_agent",
"task_id": "TASK-001",
"status": "completed",
"findings": [],
"source_ids": [],
"passage_ids": [],
"confidence": 0.89,
"limitations": [],
"requires_human_review": false
}
```

The confidence value is illustrative. Do not treat an LLM's self-reported confidence as a calibrated probability.

### 🔹 12.3 Workflow state machine

```mermaid
%%{init: {'theme':'base','themeVariables': {'fontFamily':'Arial, sans-serif','fontSize':'16px','primaryColor':'#DCEBFF','primaryTextColor':'#102A43','primaryBorderColor':'#2563EB','lineColor':'#5277A8','secondaryColor':'#D9F7F0','tertiaryColor':'#FFE8CC','clusterBkg':'#EEF4FF','clusterBorder':'#7397C7','edgeLabelBackground':'#FFF7DB','nodeBorder':'#2563EB','mainBkg':'#DCEBFF','textColor':'#102A43','titleColor':'#173B70'}}}%%
flowchart LR
  A["Submitted<br/>User submits question"] --> B["Planning<br/>Orchestrator creates plan"]
  B --> C["Retrieving<br/>Agents retrieve sources"]
  C --> D["Analyzing<br/>Analyze and compare"]
  D --> E["Verifying<br/>Verify citations and evidence"]
  E --> F{"Evidence sufficient?"}
  F -- "No" --> G["Additional retrieval"]
  G --> C
  F -- "Yes" --> H["Review<br/>Human reviewer checks findings"]
  H -- "Reviewer approves" --> I["Approved<br/>Report approved"]
  I --> J["Reported<br/>Generate final report"]
  H -- "Reviewer rejects" --> K["Rejected<br/>Rework required"]
  K --> L["Rework requested"]
  L --> B

  %% Colorful node palette; bold labels
  classDef color1 fill:#DCEBFF,stroke:#2563EB,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color2 fill:#D9F7F0,stroke:#0F9D85,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color3 fill:#FFE8CC,stroke:#D97706,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color4 fill:#F0E4FF,stroke:#7C3AED,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color5 fill:#FFE0E7,stroke:#DB4777,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color6 fill:#DDF3FF,stroke:#0284C7,stroke-width:2.5px,color:#14213D,font-weight:bold;
  class A color1;
  class B color2;
  class C color3;
  class D color4;
  class E color5;
  class F color6;
  class G color1;
  class H color2;
  class I color3;
  class J color4;
  class K color5;
  class L color6;
```

This avoids uncontrolled agent loops.

### 🔹 12.4 Human-in-the-loop design

For your prototype, human approval should be required for:

- Approving a final research report.
- Exporting a report marked for professional review.
- Sharing private uploaded documents.
- Publishing or distributing research results.
The system can autonomously search, retrieve, compare and prepare reports, but sensitive actions remain controlled.

### 🔹 12.5 Reliability mechanisms

The project team recommends implementing these five particularly important mechanisms.

#### 1. Evidence gate

No important legal claim enters the final report without an evidence record or an explicit unsupported/uncertain label.

#### 2. Citation gate

A citation cannot be marked verified merely because an LLM says it is correct. It must be checked against an indexed or accessible source.

#### 3. Retrieval sufficiency gate

If the required evidence is missing, the workflow performs bounded additional retrieval or reports insufficient evidence.

#### 4. Execution budget

Example initial limits:

<table style="width:100%;border-collapse:collapse;border:2px solid #244B7A;font-family:Arial,sans-serif;font-size:14px">
<thead><tr><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Control</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Suggested MVP limit</th></tr></thead>
<tbody>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Specialist agent iterations</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">3</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Research retrieval rounds</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">3</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Tools per research task</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">20</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Agent execution timeout</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">60 seconds</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Workflow total timeout</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">10 minutes</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Automatic retry attempts</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">2</td></tr>
</tbody></table>

These are starting configuration values, not established optimal limits.

#### 5. Recovery

If the application restarts during research, the system should resume from the saved workflow checkpoint rather than restarting every agent.

LangGraph supports persistent state and human-in-the-loop workflow patterns. See  and .

### 🔹 12.6 Agent observability

Record every important event:

```mermaid
%%{init: {'theme':'base','themeVariables': {'fontFamily':'Arial, sans-serif','fontSize':'16px','primaryColor':'#DCEBFF','primaryTextColor':'#102A43','primaryBorderColor':'#2563EB','lineColor':'#5277A8','secondaryColor':'#D9F7F0','tertiaryColor':'#FFE8CC','clusterBkg':'#EEF4FF','clusterBorder':'#7397C7','edgeLabelBackground':'#FFF7DB','nodeBorder':'#2563EB','mainBkg':'#DCEBFF','textColor':'#102A43','titleColor':'#173B70'}}}%%
flowchart TB
  subgraph FLOW["LegalLens AI — Agent execution event flow"]
    direction LR
    E1["1. research.started<br/>Research initiated"]
    E2["2. research.plan_created<br/>Plan created"]
    E3["3. agent.started<br/>Specialist starts"]
    E4["4. retrieval.executed<br/>Retrieval operation"]
    E5["5. source.retrieved<br/>Sources retrieved"]
    E6["6. citation.verified<br/>Citation and passage checked"]
    E7["7. claim.rejected<br/>Unsupported claim rejected"]
    E8["8. human_review.requested<br/>Final report submitted"]
    E9["9. human_review.completed<br/>Reviewer completes review"]
    E10["10. report.generated<br/>Final report generated"]
    E1 --> E2 --> E3 --> E4 --> E5 --> E6
    E6 --> E7 --> E8 --> E9 --> E10
  end
  LOG["Event log timeline<br/>Timestamp · Research ID · Agent · Event type · Source IDs · Status"] --- FLOW

  %% Colorful node palette; bold labels
  classDef color1 fill:#DCEBFF,stroke:#2563EB,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color2 fill:#D9F7F0,stroke:#0F9D85,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color3 fill:#FFE8CC,stroke:#D97706,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color4 fill:#F0E4FF,stroke:#7C3AED,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color5 fill:#FFE0E7,stroke:#DB4777,stroke-width:2.5px,color:#14213D,font-weight:bold;
  classDef color6 fill:#DDF3FF,stroke:#0284C7,stroke-width:2.5px,color:#14213D,font-weight:bold;
  class FLOW color1;
  class E1 color2;
  class E2 color3;
  class E3 color4;
  class E4 color5;
  class E5 color6;
  class E6 color1;
  class E7 color2;
  class E8 color3;
  class E9 color4;
  class E10 color5;
  class LOG color6;
```

This makes it possible to investigate why a particular answer was produced.

Recommended observability tools:

- OpenTelemetry.
- Langfuse.
- Structured application logs.
- PostgreSQL execution records.
Do not log confidential document contents or personal information unnecessarily.

## 13. Dataset Strategy and Knowledge Base Development

---

### 🔹 13.1 Dataset Approach

For the initial Minimum Viable Product (MVP), LegalLens AI will use a **synthetic, AI-augmented legal research dataset** generated with the assistance of ChatGPT. This approach is intended to establish and demonstrate the platform's core technical capabilities without depending on the immediate availability, accessibility, or licensing of real Sri Lankan legal documents.

The synthetic dataset will simulate the structure and relationships found in legal research materials, including legislation extracts, judicial decisions, legal concepts, case references, and research questions. The generated content will be organized around the initial target domain of Sri Lankan employment law.

The dataset will support the development and testing of the platform's primary capabilities:

- Legal document ingestion and processing.
- Structure-aware document chunking and metadata extraction.
- Hybrid Retrieval-Augmented Generation (RAG).
- Semantic and keyword-based legal information retrieval.
- Multi-agent legal research and orchestration.
- Citation and evidence verification workflows.
- Legal knowledge graph construction.
- Research report generation and evidence traceability.
**Important distinction:** The synthetic documents will be simulated examples, not authentic Sri Lankan legislation, court judgments, or legal authorities. They will not be presented as genuine legal sources or used to make claims about actual Sri Lankan law.

### 🔹 13.2 Synthetic Dataset Composition

The initial dataset will focus on employment-related legal research scenarios and contain the following categories:

<table style="width:100%;border-collapse:collapse;border:2px solid #244B7A;font-family:Arial,sans-serif;font-size:14px">
<thead><tr><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Dataset component</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Proposed initial target</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Purpose</th></tr></thead>
<tbody>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Synthetic legislation documents</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">15–20</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Simulate Acts, sections and statutory provisions</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Synthetic judicial decisions</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">30–50</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Simulate case facts, judicial reasoning and decisions</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Legal research documents</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">10–15</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Provide contextual legal research material</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Sample employment contracts</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">10–15</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Support document analysis and clause extraction</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Research questions</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">50–100</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Test natural-language legal research queries</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Claim-evidence verification examples</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">50–100</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Evaluate citation and evidence verification</td></tr>
</tbody></table>

These figures represent proposed MVP dataset targets rather than existing or collected legal materials.

### 🔹 13.3 Synthetic Data Generation and Preparation

ChatGPT will be used as an AI-assisted data generation tool to create structured, internally consistent legal research examples.

The preparation process will follow these stages:

1. **Define the dataset schema:** Establish standardized structures for legislation, judgments, legal documents, passages, citations and research questions.
1. **Generate synthetic documents:** Create representative employment-law scenarios, simulated statutory provisions, fictional judicial decisions and sample contracts.
1. **Generate document metadata:** Assign unique document identifiers, document types, jurisdiction labels, dates, section numbers and other relevant metadata.
1. **Establish relationships:** Create controlled references between synthetic cases, statutory provisions, legal concepts and supporting passages.
1. **Generate research questions:** Develop questions that require different retrieval, comparison and evidence-verification operations.
1. **Validate generated content:** Check structural consistency, metadata completeness, passage references and relationships before ingestion.
1. **Prepare benchmark examples:** Associate selected research questions with expected document IDs, relevant passages and expected answer points.
Every generated document will be explicitly identified as synthetic. Generated citations and case references will use internal identifiers rather than being represented as genuine legal citations.

### 🔹 13.4 Dataset Authenticity and Limitations

Since the initial dataset is AI-generated, it cannot establish the legal accuracy or real-world applicability of the platform's research outputs.

The MVP evaluation will therefore focus on technical capabilities, including:

- Whether relevant documents and passages can be retrieved.
- Whether agents can coordinate research tasks successfully.
- Whether relationships between documents can be identified.
- Whether citations can be checked against the indexed synthetic sources.
- Whether generated claims are supported by their associated passages.
- Whether the system can identify missing or insufficient evidence.
- Whether research reports maintain traceability to their underlying sources.
The system will not claim to verify real-world legal authority during this development stage. Citation verification will demonstrate source existence, passage existence and claim-to-source support within the synthetic dataset.

All MVP research results will be clearly labelled as demonstrations based on synthetic data and must not be relied upon as legal advice or authoritative interpretations of Sri Lankan law.

### 🔹 13.5 Future Integration of Authentic Sri Lankan Legal Documents

The proposed dataset strategy is designed to support future expansion without requiring a fundamental redesign of the system architecture.

Following the MVP, the synthetic dataset can progressively be supplemented with or replaced by authentic Sri Lankan legal materials, subject to source verification, access permissions, licensing and reuse requirements.

Potential sources to investigate include:

- Parliament of Sri Lanka – legislation and parliamentary materials.
- LawNet Sri Lanka – legal research materials.
- Supreme Court of Sri Lanka – judicial decisions.
- Court of Appeal of Sri Lanka – judicial decisions.
- Department of Government Printing – official Gazette publications.
The future integration process will include source authenticity checks, document extraction, OCR where necessary, metadata validation, structure-aware chunking, embedding generation, indexing and knowledge graph construction.

The existing ingestion pipeline will be designed to accept new documents independently of the original synthetic dataset. Each document will retain its source information, document type, version, jurisdiction and authenticity status.

This will allow LegalLens AI to transition from a controlled synthetic research environment into a more comprehensive Sri Lankan legal research platform as authentic legal materials become available.

### 🔹 13.6 Dataset Extensibility

To support this transition, the system will distinguish between synthetic and authentic documents through explicit metadata.

<table style="width:100%;border-collapse:collapse;border:2px solid #244B7A;font-family:Arial,sans-serif;font-size:14px">
<thead><tr><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Metadata field</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Description</th></tr></thead>
<tbody>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">document_id</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Unique document identifier</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">document_type</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Legislation, judgment, contract or research document</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">jurisdiction</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Jurisdiction associated with the document</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">source_type</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Synthetic or official/external source</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">is_synthetic</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Identifies AI-generated demonstration content</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">source_url</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Original document URL, where applicable</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">document_version</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Document version or revision</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">created_at</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Dataset creation or ingestion timestamp</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">verification_status</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Document authenticity and validation status</td></tr>
</tbody></table>

This separation will ensure that synthetic demonstration content cannot be confused with authentic legal authorities when the platform is expanded.

**Overall, the synthetic dataset provides a controlled and cost-effective foundation for developing and evaluating the LegalLens AI MVP, while the extensible ingestion architecture establishes a clear pathway towards integrating authentic Sri Lankan legal documents in future development stages.**

## 14. Database design

---

The project team recommends PostgreSQL as your primary database.

The proposed design uses separate storage systems for distinct responsibilities.

<table style="width:100%;border-collapse:collapse;border:2px solid #244B7A;font-family:Arial,sans-serif;font-size:14px">
<thead><tr><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Technology</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Responsibility</th></tr></thead>
<tbody>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">PostgreSQL</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Users, research projects, documents, citations and audit data</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Pinecone</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Vector embeddings</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Neo4j</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Legal relationship graph</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Redis</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Caching and background job coordination</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Cloudinary</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Original PDFs and uploaded files</td></tr>
</tbody></table>

For a limited MVP budget, PostgreSQL with pgvector and full-text search can replace a separate vector database initially. Add Pinecone or Neo4j only when they materially improve the system.

### 🔹 14.1 Entity relationship model

```mermaid
%%{init: {'theme':'base','themeVariables': {'fontFamily':'Arial, sans-serif','fontSize':'16px','primaryColor':'#DCEBFF','primaryTextColor':'#102A43','primaryBorderColor':'#2563EB','lineColor':'#5277A8','secondaryColor':'#D9F7F0','tertiaryColor':'#FFE8CC','clusterBkg':'#EEF4FF','clusterBorder':'#7397C7','edgeLabelBackground':'#FFF7DB','nodeBorder':'#2563EB','mainBkg':'#DCEBFF','textColor':'#102A43','titleColor':'#173B70'}}}%%
erDiagram
  USERS ||--o{ RESEARCH_PROJECTS : owns
  RESEARCH_PROJECTS ||--o{ RESEARCH_RUNS : contains
  RESEARCH_RUNS ||--o{ RESEARCH_SOURCES : retrieves
  LEGAL_DOCUMENTS ||--o{ DOCUMENT_VERSIONS : has
  LEGAL_DOCUMENTS ||--o{ LEGAL_PASSAGES : contains
  LEGAL_DOCUMENTS ||--o{ CITATIONS : source_or_target
  RESEARCH_RUNS ||--o{ RESEARCH_CLAIMS : produces
  RESEARCH_CLAIMS ||--o{ CLAIM_EVIDENCE : supported_by
  LEGAL_PASSAGES ||--o{ CLAIM_EVIDENCE : evidences
  RESEARCH_RUNS ||--o{ AGENT_EXECUTIONS : orchestrates
  AGENT_EXECUTIONS ||--o{ AGENT_EVENTS : emits
  USERS ||--o{ DOCUMENT_UPLOADS : uploads
  RESEARCH_RUNS ||--o{ HUMAN_REVIEWS : reviewed_by
  USERS ||--o{ AUDIT_LOGS : performs

  USERS {
    uuid Id PK
    string Email
    string PasswordHash
    string Role
  }
  RESEARCH_PROJECTS {
    uuid Id PK
    uuid UserId FK
    string Title
    string Domain
  }
  RESEARCH_RUNS {
    uuid Id PK
    uuid ProjectId FK
    string Question
    string Status
  }
  LEGAL_DOCUMENTS {
    uuid Id PK
    string Title
    string Type
    string Jurisdiction
    string SourceUrl
  }
  DOCUMENT_VERSIONS {
    uuid Id PK
    uuid DocumentId FK
    string Version
    date EffectiveDate
  }
  LEGAL_PASSAGES {
    uuid Id PK
    uuid DocumentId FK
    string Section
    string Paragraph
    text Content
  }
  CITATIONS {
    uuid Id PK
    uuid SourceDocumentId FK
    uuid TargetDocumentId FK
    string Type
  }
  RESEARCH_CLAIMS {
    uuid Id PK
    uuid ResearchRunId FK
    text ClaimText
    string Status
  }
  CLAIM_EVIDENCE {
    uuid Id PK
    uuid ClaimId FK
    uuid PassageId FK
    string SupportStatus
  }

  %% ER entities use the blue/teal theme configured above.
```

### 🔹 14.2 Main tables

<table style="width:100%;border-collapse:collapse;border:2px solid #244B7A;font-family:Arial,sans-serif;font-size:14px">
<thead><tr><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Table</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Important columns</th></tr></thead>
<tbody>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Users</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Id, Email, PasswordHash, Role</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">ResearchProjects</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Id, UserId, Title, Domain</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">ResearchRuns</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Id, ProjectId, Question, Status</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">LegalDocuments</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Id, Title, Type, Jurisdiction, SourceUrl</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">DocumentVersions</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Id, DocumentId, Version, EffectiveDate</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">LegalPassages</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Id, DocumentId, Section, Paragraph, Content</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Citations</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Id, SourceDocumentId, TargetDocumentId, Type</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">ResearchSources</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Id, ResearchRunId, DocumentId, RetrievalRank</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">ResearchClaims</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Id, ResearchRunId, ClaimText, Status</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">ClaimEvidence</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Id, ClaimId, PassageId, SupportStatus</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">AgentExecutions</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Id, ResearchRunId, AgentName, Status</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">AgentEvents</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Id, ExecutionId, EventType, Timestamp</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">DocumentUploads</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Id, UserId, StorageKey, ProcessingStatus</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">HumanReviews</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Id, ResearchRunId, ReviewerId, Decision</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">AuditLogs</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Id, UserId, Action, Timestamp</td></tr>
</tbody></table>

### 🔹 14.3 Important database design decisions

Document versioning

An existing legislative document should not be overwritten by a newer version.

Maintain different versions with their respective effective dates and source information.

Passage provenance

Every indexed passage must retain the original document, page and paragraph or section.

Claim evidence

Store the relationship between generated claims and source passages explicitly.

Research reproducibility

Store:

- Retrieval query.
- Retrieved source IDs.
- Model and prompt version.
- Agent execution sequence.
- Verification outcomes.
- Research completion time.
This allows you to investigate how a report was generated.

## 15. Recommended technology stack

---

**LegalLens technology stack**

<table style="width:100%;border-collapse:collapse;border:2px solid #244B7A;font-family:Arial,sans-serif;font-size:14px">
<thead><tr><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Component</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Technology</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Responsibility</th></tr></thead>
<tbody>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Frontend</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">React 19 + TypeScript</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Research workspace, document viewer and dashboards</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Backend</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">.NET 10 Web API</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Authentication, APIs and business logic</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">AI Services</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Python</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Agent orchestration, document processing and retrieval</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Agent Framework</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">LangGraph</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Stateful agent workflows and checkpoints</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">LLM</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">OpenAI API</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Question understanding, research synthesis and verification</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Database</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">PostgreSQL</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Core application data, metadata and research history</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Vector Database</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">pgvector / Pinecone</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Semantic legal passage retrieval</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Knowledge Graph</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Neo4j</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Citation and legal relationship exploration</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Agent Integration</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">MCP Python SDK</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Standardized agent tool access</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Deployment</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Docker</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Containerized services and reproducible setup</td></tr>
</tbody></table>

### 🔹 Additional libraries

<table style="width:100%;border-collapse:collapse;border:2px solid #244B7A;font-family:Arial,sans-serif;font-size:14px">
<thead><tr><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Requirement</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Suggested library</th></tr></thead>
<tbody>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">PDF extraction</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">PyMuPDF</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">OCR</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Tesseract</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Document parsing</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">python-docx</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Validation</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Pydantic</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">API framework for AI service</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">FastAPI</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Keyword retrieval</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">PostgreSQL FTS / BM25</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Re-ranking</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Cross-encoder</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Embeddings</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">OpenAI / BGE</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Graph access</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Neo4j Python driver</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Background jobs</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Celery / Redis</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Tracing</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">OpenTelemetry + Langfuse</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Backend testing</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">xUnit</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">AI testing</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">pytest</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Frontend testing</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Vitest + React Testing Library</td></tr>
</tbody></table>

## 16. Evaluation methodology

---

LegalLens AI should not be evaluated solely on whether its answers appear intelligent.

The evaluation should be supported by measurable evidence.

The project team recommends five evaluation dimensions.

### 🔹 16.1 Retrieval evaluation

Measure whether the system retrieves the correct legal passages.

Metrics:

<table style="width:100%;border-collapse:collapse;border:2px solid #244B7A;font-family:Arial,sans-serif;font-size:14px">
<thead><tr><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Metric</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Purpose</th></tr></thead>
<tbody>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Precision@K</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Proportion of retrieved passages that are relevant</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Recall@K</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Proportion of relevant passages successfully retrieved</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">MRR</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Ranking quality of the first relevant passage</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">nDCG@K</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Ranking quality considering graded relevance</td></tr>
</tbody></table>

Example:

Suppose the expected supporting passages are:

P1, P2, P3, P4

The system retrieves:

P1, P3, P5, P6

Then:

\[ Precision@4 = \frac{2}{4}=0.5 \]

\[ Recall@4 = \frac{2}{4}=0.5 \]

This makes retrieval performance objectively measurable.

### 🔹 16.2 Citation verification evaluation

This should be a major evaluation area.

Measure:

- Citation existence accuracy.
- Citation metadata accuracy.
- Passage existence accuracy.
- Claim-to-source support precision.
- Unsupported claim detection.
- False acceptance rate.
Example:

Suppose the system generates 100 citations.

- 95 refer to real sources.
- 90 match the correct metadata.
- 85 have passages that genuinely support the corresponding claims.
You can separately report these three levels rather than combining them into one misleading accuracy score.

### 🔹 16.3 Answer quality evaluation

Use a human evaluation rubric, ideally reviewed by a legal academic or qualified legal professional.

<table style="width:100%;border-collapse:collapse;border:2px solid #244B7A;font-family:Arial,sans-serif;font-size:14px">
<thead><tr><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Dimension</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Evaluation</th></tr></thead>
<tbody>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Legal relevance</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Does the answer address the research question?</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Source correctness</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Are the cited sources valid?</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Evidence support</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Do sources support the claims?</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Jurisdiction</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Is the answer grounded in Sri Lankan law?</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Completeness</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Are important issues omitted?</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Clarity</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Is the explanation understandable?</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Uncertainty</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Are limitations appropriately disclosed?</td></tr>
</tbody></table>

Use a 1–5 rating scale.

Do not use an LLM judge as the only evaluator for legal correctness.

### 🔹 16.4 Agent reliability evaluation

Measure:

- Task completion rate.
- Tool invocation success rate.
- Invalid tool-call rate.
- Average number of agent iterations.
- Workflow timeout rate.
- Recovery success rate.
- Human review rejection rate.
- Duplicate tool invocation rate.
### 🔹 16.5 Performance evaluation

Measure:

- Average research completion time.
- Retrieval latency.
- Embedding processing time.
- Token consumption.
- Cost per research task.
- Database query performance.
### 🔹 Proposed project targets

These are development targets to aim for, not claimed results.

<table style="width:100%;border-collapse:collapse;border:2px solid #244B7A;font-family:Arial,sans-serif;font-size:14px">
<thead><tr><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Metric</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Initial target</th></tr></thead>
<tbody>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Precision@5</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">≥ 0.80</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Recall@10</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">≥ 0.80</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Citation source verification</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">≥ 95%</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Unsupported claims correctly flagged</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">≥ 90%</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Invalid MCP tool calls</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">≤ 2%</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Successful workflow completion</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">≥ 90%</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Source traceability for material claims</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">100%</td></tr>
</tbody></table>

For citation verification, distinguish source existence from semantic support. A 95% source verification rate does not mean 95% legal correctness.

### 🔹 16.6 Evaluation dataset design

The project team recommends starting with 100 manually reviewed questions.

Divide them into:

<table style="width:100%;border-collapse:collapse;border:2px solid #244B7A;font-family:Arial,sans-serif;font-size:14px">
<thead><tr><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Question category</th><th style="background:#173B70;color:#FFFFFF;padding:12px 14px;text-align:left;border:1px solid #8FB5E8;font-weight:800;letter-spacing:.2px">Number</th></tr></thead>
<tbody>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Direct statutory lookup</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">20</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Legal concept research</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">20</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Case discovery</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">20</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Multi-case comparison</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">15</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Document-based research</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">15</td></tr>
<tr><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">Citation verification</td><td style="background:#E6F7F3;padding:10px 12px;border:1px solid #B9E1D8;vertical-align:top;font-weight:600;color:#173B3A">10</td></tr>
<tr><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">Total</td><td style="background:#EAF2FF;padding:10px 12px;border:1px solid #C3D5EE;vertical-align:top;font-weight:600;color:#172B4D">100</td></tr>
</tbody></table>

Have a legal-domain reviewer validate the gold sources and passages.

Keep a separate held-out test set so that prompt and retrieval tuning do not leak into the final evaluation.


---

<div align="center">

**⚖️ LEGALLENS AI · PROJECT PROPOSAL · END**

<sub>Evidence first. Traceability always.</sub>

</div>
