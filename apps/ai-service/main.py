"""
LegalLens AI — FastAPI Intelligence & Agent Service
Integrates the complete 8-agent LangGraph state machine and Python MCP tool endpoints.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from schemas import LegalResearchState, ResearchReport
from workflow import research_graph
from mcp_tools import (
    MCP_TOOL_DEFINITIONS,
    search_legislation,
    get_legislation_section,
    search_judgments,
    get_judgment_details,
    verify_case_citation,
    verify_statutory_reference,
    verify_evidence_passage,
    check_claim_support,
    get_uploaded_document,
    extract_document_clauses
)

app = FastAPI(
    title="LegalLens AI — Intelligence & Agent Orchestration Service",
    description="Multi-agent legal research, hybrid retrieval, and citation verification service.",
    version="2.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResearchRunRequest(BaseModel):
    query: str
    jurisdiction: str = "LK"
    domain: str = "Employment Law"
    document_ids: Optional[List[str]] = []

class MCPCallRequest(BaseModel):
    tool_name: str
    arguments: Dict[str, Any]

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "legallens-ai-service",
        "orchestrator": "LangGraph StateGraph (8-Agent Workflow)",
        "dataset_scope": "Synthetic Sri Lankan Employment Law Benchmark (Proposal Section 13)",
        "mcp_tools_registered": len(MCP_TOOL_DEFINITIONS)
    }

@app.post("/api/v1/research/run", response_model=ResearchReport)
def run_research_workflow(request: ResearchRunRequest):
    """
    Executes the complete 8-agent legal research workflow through the LangGraph state machine:
    1. Question Analysis -> 2. Legislation Research -> 3. Case Discovery ->
    4. Document Analysis -> 5. Case Comparison -> 6. Citation Verification ->
    7. Legal Synthesis -> [Evidence Sufficiency Gate] -> 8. Report Generation
    """
    initial_state = {
        "research_id": "RES-2025-001",
        "user_query": request.query,
        "jurisdiction": request.jurisdiction,
        "domain": request.domain,
        "uploaded_document_ids": request.document_ids or ["DOC-UPLOAD-01"],
        "execution_logs": ["[Orchestrator] Initialized LangGraph 8-Agent Execution Workflow"]
    }

    try:
        if hasattr(research_graph, "invoke"):
            result = research_graph.invoke(initial_state)
            if isinstance(result, dict) and "final_report" in result:
                return result["final_report"]
            elif hasattr(result, "final_report") and result.final_report:
                return result.final_report
            else:
                raise ValueError("Workflow did not produce a final_report.")
        else:
            raise RuntimeError("Workflow runner uninitialized.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Agent workflow execution error: {str(e)}")

# MCP Tool Endpoints (Python MCP SDK specification)
@app.get("/api/v1/mcp/tools")
def list_mcp_tools():
    """List available MCP tools according to the Model Context Protocol specification."""
    return {"tools": MCP_TOOL_DEFINITIONS}

@app.post("/api/v1/mcp/call")
def call_mcp_tool(request: MCPCallRequest):
    """Direct invocation endpoint for MCP-compatible clients."""
    tool_map = {
        "search_legislation": search_legislation,
        "get_legislation_section": get_legislation_section,
        "search_judgments": search_judgments,
        "get_judgment_details": get_judgment_details,
        "verify_case_citation": verify_case_citation,
        "verify_statutory_reference": verify_statutory_reference,
        "verify_evidence_passage": verify_evidence_passage,
        "check_claim_support": check_claim_support,
        "get_uploaded_document": get_uploaded_document,
        "extract_document_clauses": extract_document_clauses
    }
    
    handler = tool_map.get(request.tool_name)
    if not handler:
        raise HTTPException(status_code=404, detail=f"Tool '{request.tool_name}' not found.")
    
    try:
        return handler(**request.arguments)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Tool invocation error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
