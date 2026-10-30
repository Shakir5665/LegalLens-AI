# LegalLens AI

> **Evidence-Grounded Agentic AI Platform for Sri Lankan Legal Research, Case Analysis and Citation Verification**  
> Focus Domain: Sri Lankan Employment Law (Industrial Disputes Act, TEWA No. 45 of 1971, Gratuity Act)

---

## 🏛️ Project Architecture

```
LegalLense-AI/
│
├── apps/
│   ├── web/                 # React 19 + TypeScript frontend (Vite, Tailwind, Design Tokens)
│   ├── api/                 # .NET 10 Web API (Auth, Research Projects, Document Storage)
│   └── ai-service/          # Python FastAPI + LangGraph (Multi-agent workflow & MCP tools)
│
├── services/
│   └── mcp-server/          # MCP integration tools
│
├── infrastructure/
│   └── docker-compose.yml   # Multi-service container orchestration
│
├── docs/
│   ├── DESIGN.md            # Exact Stitch design system & token specification
│   ├── architecture.md      # System topology, LangGraph multi-agent design, and data flows
│   ├── screen-inventory.md  # Detailed audit of all 20 UI views and routes
│   └── progress-report.md   # Project implementation and status report
│
└── README.md
```

---

## 🎯 Target Users & Capabilities

LegalLens AI is designed for **law students, legal researchers, lawyers, and academics**:
- **Structured Legal Investigation:** Multi-agent research planning (not an unverified chatbot).
- **Hybrid Retrieval:** Full-text keyword matching + semantic vector search over statutory provisions and cases.
- **Citation Verification:** Direct mapping of legal claims to supporting source passages with ambiguity detection.
- **Case Comparison Matrix:** Side-by-side analysis of judicial facts, reasoning, and final orders.
- **Document Analysis:** Parsing and clause extraction from contracts and written submissions.
- **Traceable Reports:** Exportable structured research reports with evidence citations.

---

## ⚠️ Dataset Scope & Authenticity (Section 13 Compliance)

In accordance with Section 13 of the project proposal, this prototype operates on a **synthetic, AI-augmented legal research dataset** simulating Sri Lankan employment law.
- The documents are **simulated examples** designed to evaluate multi-agent orchestration, citation verification, and report generation.
- They are **not** authentic Sri Lankan legislation or court judgments, and must not be used as real-world legal advice.

---

## 🚀 Quickstart

### Prerequisites
- **Node.js**: v20+ / v24+
- **.NET SDK**: 10.0+
- **Python**: 3.12+ / 3.14+

---

### Running the Frontend (`apps/web`)
```bash
cd apps/web
npm install
npm run dev
```
Available at `http://localhost:5173/`

### Running the AI Intelligence Service (`apps/ai-service`)
```bash
cd apps/ai-service
pip install -r requirements.txt
python main.py
```
Available at `http://localhost:8000/` (Swagger docs at `/docs`)

### Running the Backend API (`apps/api`)
```bash
cd apps/api
dotnet run
```
Available at `http://localhost:5000/`
