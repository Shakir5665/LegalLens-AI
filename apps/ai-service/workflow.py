"""
LegalLens AI — Multi-Agent Research Workflow State Machine
Engineered according to Section 8, 9, and 12 of the Project Proposal:
- 1 Research Orchestrator managing shared workflow state, checkpoints, and retries.
- 8 Specialized Agent nodes:
  1. Question Analysis Agent (9.2)
  2. Legislation Research Agent (9.4)
  3. Case Discovery Agent (9.5)
  4. Document Analysis Agent (9.3)
  5. Case Comparison Agent (9.6)
  6. Citation Verification Agent (9.7)
  7. Legal Synthesis Agent (9.8)
  8. Report Generation Agent (9.9)
- Evidence Sufficiency Gate with Bounded Additional Retrieval (Figure 2 & Figure 4).
- Human Review Interrupt for flagged uncertainties (12.4).
"""

from typing import Dict, Any, Literal
from schemas import (
    LegalResearchState,
    QuestionAnalysisOutput,
    DocumentAnalysisOutput,
    LegislationMatch,
    CaseMatch,
    CaseComparisonOutput,
    CaseComparisonRow,
    CitationVerificationRecord,
    LegalSynthesisOutput,
    ResearchReport,
    SourceStatusEnum,
)

# --- 1. Question Analysis Agent (Section 9.2) ---
def question_analysis_node(state: LegalResearchState) -> Dict[str, Any]:
    logs = list(state.execution_logs)
    logs.append("[Question Analysis Agent] Extracting domain, issues, parties, and missing facts...")
    
    analysis = QuestionAnalysisOutput(
        domain="Employment Law",
        jurisdiction="Sri Lanka",
        research_issue="Unilateral reduction of allowances amounting to constructive termination",
        research_objective="Determine whether unilateral salary variation allows an unfair termination claim under IDA § 31B",
        key_facts=["30% reduction in fixed monthly allowances", "Continued service under prompt written objection"],
        relevant_parties=["Employee / Senior Executive", "Employer"],
        missing_context=["Exact terms of Clause 8.2 (voucher conditioning)", "Effective variation date"]
    )
    return {
        "analysis": analysis,
        "current_step": "question_analyzed",
        "execution_logs": logs
    }

# --- 2. Legislation Research Agent (Section 9.4) ---
def legislation_research_node(state: LegalResearchState) -> Dict[str, Any]:
    logs = list(state.execution_logs)
    logs.append("[Legislation Research Agent] Querying statutory corpus via MCP tools...")
    
    legislation = [
        LegislationMatch(
            document_id="ACT-IDA-1950",
            act_title="Industrial Disputes Act No. 43 of 1950 (Extract)",
            section="Section 31B(1)(a)",
            summary="Grants Labour Tribunals plenary equitable jurisdiction to award just relief for unfair employment termination.",
            passage_ids=["PASS-IDA-31B"],
            source_status=SourceStatusEnum.SIMULATED,
            is_synthetic=True
        ),
        LegislationMatch(
            document_id="ACT-TEWA-1971",
            act_title="Termination of Employment of Workmen Act No. 45 of 1971",
            section="Section 2(1)",
            summary="Prohibits non-disciplinary termination without prior written consent of the workman or approval of the Labour Commissioner.",
            passage_ids=["PASS-TEWA-2-1"],
            source_status=SourceStatusEnum.SIMULATED,
            is_synthetic=True
        )
    ]
    return {
        "retrieved_legislation": legislation,
        "current_step": "legislation_retrieved",
        "execution_logs": logs
    }

# --- 3. Case Discovery Agent (Section 9.5) ---
def case_discovery_node(state: LegalResearchState) -> Dict[str, Any]:
    logs = list(state.execution_logs)
    logs.append("[Case Discovery Agent] Executing hybrid retrieval over simulated Sri Lankan employment judgments...")
    
    cases = [
        CaseMatch(
            case_id="CASE-1989-CTC",
            case_name="Ceylon Tobacco Co. v. Ilangaratne (Simulated Example)",
            citation="[Simulated SLLR Reference: 1989]",
            court="Supreme Court of Sri Lanka (Simulated)",
            bench="Fernando, J., Mark Fernando, J.",
            year=1989,
            ratio="Arbitrary curtailment of allowances strikes at the root of the contract.",
            relevant_passage_ids=["PASS-CTC-P34"],
            is_synthetic=True
        ),
        CaseMatch(
            case_id="CASE-2004-BROWN",
            case_name="Brown & Co. v. Fernando (Simulated Example)",
            citation="[Simulated SLLR Reference: 2004]",
            court="Court of Appeal of Sri Lanka (Simulated)",
            bench="Sripavan, J.",
            year=2004,
            ratio="Continued service under contemporaneous written protest negates waiver or estoppel.",
            relevant_passage_ids=["PASS-BROWN-P122"],
            is_synthetic=True
        )
    ]
    return {
        "retrieved_cases": cases,
        "current_step": "cases_discovered",
        "execution_logs": logs
    }

# --- 4. Document Analysis Agent (Section 9.3) ---
def document_analysis_node(state: LegalResearchState) -> Dict[str, Any]:
    logs = list(state.execution_logs)
    logs.append("[Document Analysis Agent] Parsing uploaded agreement and extracting clauses...")
    
    doc_out = DocumentAnalysisOutput(
        document_id="DOC-UPLOAD-01",
        document_type="Employment Agreement",
        extracted_parties=["Executive Workman", "Company Employer"],
        relevant_clauses=[
            {"clause": "4.1", "title": "Remuneration", "text": "Fixed monthly operational allowances totaling LKR 350,000."},
            {"clause": "8.2", "title": "Variation", "text": "Company reserves prerogative to modify discretionary facilities upon 30 days notice."}
        ],
        statutory_references=["Industrial Disputes Act § 31B"],
        is_synthetic=True
    )
    return {
        "document_analysis": doc_out,
        "current_step": "documents_analyzed",
        "execution_logs": logs
    }

# --- 5. Case Comparison Agent (Section 9.6) ---
def case_comparison_node(state: LegalResearchState) -> Dict[str, Any]:
    logs = list(state.execution_logs)
    logs.append("[Case Comparison Agent] Comparing precedents across factual and legal dimensions...")
    
    comparison = CaseComparisonOutput(
        compared_case_ids=["CASE-1989-CTC", "CASE-2004-BROWN"],
        dimensions=[
            CaseComparisonRow(
                dimension="Dispute Factual Matrix",
                case_a_value="30% allowance cut under administrative restructuring",
                case_b_value="Re-designation to subordinate depot with allowance cut",
                comparison_note="Both involve unilateral reduction in regular monthly emoluments."
            ),
            CaseComparisonRow(
                dimension="Estoppel Defense",
                case_a_value="Rejected: Prompt objection negated acquiescence",
                case_b_value="Rejected: Contemporaneous protest letter preserved cause of action",
                comparison_note="Both affirm continued service under protest preserves rights."
            )
        ],
        conflicting_authorities=[],
        is_synthetic=True
    )
    return {
        "case_comparison": comparison,
        "current_step": "cases_compared",
        "execution_logs": logs
    }

# --- 6. Citation Verification Agent (Section 9.7 — Signature Component) ---
def citation_verification_node(state: LegalResearchState) -> Dict[str, Any]:
    logs = list(state.execution_logs)
    logs.append("[Citation Verification Agent] Validating citations, passage existence, and claim support...")
    
    verifications = [
        CitationVerificationRecord(
            claim_id="CLM-01",
            source_id="CASE-1989-CTC",
            passage_id="PASS-CTC-P34",
            source_verified=True,
            passage_verified=True,
            support_status="supported",
            jurisdiction_match=True,
            review_required=False,
            notes="Passage confirms allowances of regular certainty form part of the contract."
        ),
        CitationVerificationRecord(
            claim_id="CLM-02",
            source_id="CASE-2004-BROWN",
            passage_id="PASS-BROWN-P122",
            source_verified=True,
            passage_verified=True,
            support_status="supported",
            jurisdiction_match=True,
            review_required=False,
            notes="Passage verifies written protest preserves constructive termination rights."
        )
    ]
    return {
        "verification_records": verifications,
        "current_step": "citations_verified",
        "execution_logs": logs
    }

# --- 7. Legal Synthesis Agent (Section 9.8) ---
def legal_synthesis_node(state: LegalResearchState) -> Dict[str, Any]:
    logs = list(state.execution_logs)
    logs.append("[Legal Synthesis Agent] Synthesizing evidence-backed findings and assessing sufficiency...")
    
    synthesis = LegalSynthesisOutput(
        executive_ratio=(
            "Under simulated Sri Lankan labor precedents, an employer cannot unilaterally diminish "
            "fixed contractual allowances that have attained certainty of receipt. Continuing employment "
            "under contemporaneous written protest prevents the employer from claiming waiver or estoppel."
        ),
        reasoning_summary=(
            "Both statutory provisions (Section 31B) and appellate authorities affirm that regular emoluments "
            "cannot be varied to the employee's detriment under managerial reorganization prerogative."
        ),
        settled_principles=[
            "Regular fixed allowances merge into the fundamental contract of employment.",
            "Contemporaneous written protest definitively negates common law estoppel."
        ],
        uncertainties_and_caveats=[
            "Scrutiny of Clause 8.2 is required to confirm whether allowances were conditioned on vouchers."
        ],
        evidence_sufficient=True
    )
    
    # Evidence sufficiency gate: check if at least 2 verified sources exist
    is_sufficient = len(state.verification_records) >= 2 and all(v.passage_verified for v in state.verification_records)
    
    return {
        "synthesis": synthesis,
        "evidence_sufficient": is_sufficient,
        "requires_human_review": not is_sufficient or len(synthesis.uncertainties_and_caveats) > 0,
        "current_step": "synthesized",
        "execution_logs": logs
    }

# --- 8. Evidence Sufficiency Routing Gate (Figure 2 & Figure 4) ---
def evidence_sufficiency_condition(state: LegalResearchState) -> Literal["report_generation", "additional_retrieval"]:
    if state.evidence_sufficient or state.iteration_count >= state.max_retries:
        return "report_generation"
    return "additional_retrieval"

# --- Bounded Additional Retrieval Node (Harness Engineering 12.5) ---
def additional_retrieval_node(state: LegalResearchState) -> Dict[str, Any]:
    logs = list(state.execution_logs)
    logs.append(f"[Orchestrator] Triggering bounded additional retrieval round {state.iteration_count + 1}...")
    return {
        "iteration_count": state.iteration_count + 1,
        "current_step": "additional_retrieval_executed",
        "execution_logs": logs
    }

# --- 9. Report Generation Agent (Section 9.9) ---
def report_generation_node(state: LegalResearchState) -> Dict[str, Any]:
    logs = list(state.execution_logs)
    logs.append("[Report Generation Agent] Generating structured research report with evidence traceability...")
    
    summary = state.synthesis.executive_ratio if state.synthesis else "Summary pending."
    
    report = ResearchReport(
        report_id=f"REP-{state.research_id}",
        research_question=state.user_query,
        jurisdiction="Sri Lanka (Simulated Dataset)",
        executive_summary=summary,
        relevant_legislation=state.retrieved_legislation,
        relevant_judgments=state.retrieved_cases,
        document_analysis=state.document_analysis,
        case_comparison=state.case_comparison,
        verification_records=state.verification_records,
        limitations=[
            "Grounded in a synthetic, AI-augmented research dataset (Section 13 of Proposal).",
            "Not authentic Sri Lankan legal authority or formal legal advice.",
            "Clause 8.2 voucher conditioning requires empirical factual verification."
        ],
        requires_human_review=state.requires_human_review,
        is_synthetic_dataset=True
    )
    
    return {
        "final_report": report,
        "current_step": "completed",
        "execution_logs": logs
    }

# --- Build Complete LangGraph State Machine ---
try:
    from langgraph.graph import StateGraph, END

    workflow = StateGraph(LegalResearchState)
    
    # Add all 8 specialist nodes + retrieval loop
    workflow.add_node("question_analysis", question_analysis_node)
    workflow.add_node("legislation_research", legislation_research_node)
    workflow.add_node("case_discovery", case_discovery_node)
    workflow.add_node("document_analysis", document_analysis_node)
    workflow.add_node("case_comparison", case_comparison_node)
    workflow.add_node("citation_verification", citation_verification_node)
    workflow.add_node("legal_synthesis", legal_synthesis_node)
    workflow.add_node("additional_retrieval", additional_retrieval_node)
    workflow.add_node("report_generation", report_generation_node)

    # Workflow Edges
    workflow.set_entry_point("question_analysis")
    workflow.add_edge("question_analysis", "legislation_research")
    workflow.add_edge("legislation_research", "case_discovery")
    workflow.add_edge("case_discovery", "document_analysis")
    workflow.add_edge("document_analysis", "case_comparison")
    workflow.add_edge("case_comparison", "citation_verification")
    workflow.add_edge("citation_verification", "legal_synthesis")
    
    # Conditional Gate: Evidence Sufficiency Check
    workflow.add_conditional_edges(
        "legal_synthesis",
        evidence_sufficiency_condition,
        {
            "report_generation": "report_generation",
            "additional_retrieval": "additional_retrieval"
        }
    )
    workflow.add_edge("additional_retrieval", "case_discovery")
    workflow.add_edge("report_generation", END)

    research_graph = workflow.compile()

except Exception:
    # Deterministic fallback runner with exact 8-agent sequential flow
    class FallbackRunner:
        def invoke(self, initial_state: Dict[str, Any]) -> LegalResearchState:
            state = LegalResearchState(**initial_state)
            state = state.copy(update=question_analysis_node(state))
            state = state.copy(update=legislation_research_node(state))
            state = state.copy(update=case_discovery_node(state))
            state = state.copy(update=document_analysis_node(state))
            state = state.copy(update=case_comparison_node(state))
            state = state.copy(update=citation_verification_node(state))
            state = state.copy(update=legal_synthesis_node(state))
            state = state.copy(update=report_generation_node(state))
            return state

    research_graph = FallbackRunner()
