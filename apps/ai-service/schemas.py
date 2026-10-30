from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from enum import Enum

class JurisdictionEnum(str, Enum):
    SRI_LANKA = "LK"

class SourceStatusEnum(str, Enum):
    VERIFIED = "verified"
    SIMULATED = "simulated"
    UNVERIFIED = "unverified"
    CONFLICTING = "conflicting"

# 1. Question Analysis Agent Output (Section 9.2)
class QuestionAnalysisOutput(BaseModel):
    domain: str = Field(default="Employment Law", description="Identified legal domain")
    jurisdiction: str = Field(default="Sri Lanka", description="Target jurisdiction")
    research_issue: str = Field(description="Identified core legal problem")
    research_objective: str = Field(description="Objective of the investigation")
    key_facts: List[str] = Field(default_factory=list)
    relevant_parties: List[str] = Field(default_factory=list)
    missing_context: List[str] = Field(default_factory=list, description="Missing facts; agent must not invent them")

# 2. Document Analysis Agent Output (Section 9.3)
class DocumentAnalysisOutput(BaseModel):
    document_id: str
    document_type: str = "contract"
    extracted_parties: List[str] = Field(default_factory=list)
    relevant_clauses: List[Dict[str, str]] = Field(default_factory=list)
    statutory_references: List[str] = Field(default_factory=list)
    is_synthetic: bool = True

# 3. Legislation Research Agent Output (Section 9.4)
class LegislationMatch(BaseModel):
    document_id: str
    act_title: str
    section: str
    summary: str
    passage_ids: List[str] = Field(default_factory=list)
    source_status: SourceStatusEnum = SourceStatusEnum.SIMULATED
    is_synthetic: bool = True

# 4. Case Discovery Agent Output (Section 9.5)
class CaseMatch(BaseModel):
    case_id: str
    case_name: str
    citation: str
    court: str
    bench: str
    year: int
    ratio: str
    relevant_passage_ids: List[str] = Field(default_factory=list)
    is_synthetic: bool = True

# 5. Case Comparison Agent Output (Section 9.6)
class CaseComparisonRow(BaseModel):
    dimension: str
    case_a_value: str
    case_b_value: str
    comparison_note: str

class CaseComparisonOutput(BaseModel):
    compared_case_ids: List[str]
    dimensions: List[CaseComparisonRow]
    conflicting_authorities: List[str] = Field(default_factory=list)
    is_synthetic: bool = True

# 6. Citation Verification Agent Output (Section 9.7 — Signature Component)
class CitationVerificationRecord(BaseModel):
    claim_id: str
    source_id: str
    passage_id: str
    source_verified: bool = True
    passage_verified: bool = True
    support_status: str = Field(default="supported", description="supported | unsupported | ambiguous")
    jurisdiction_match: bool = True
    review_required: bool = False
    notes: Optional[str] = None

# 7. Legal Synthesis Agent Output (Section 9.8)
class LegalSynthesisOutput(BaseModel):
    executive_ratio: str
    reasoning_summary: str
    settled_principles: List[str]
    uncertainties_and_caveats: List[str]
    evidence_sufficient: bool = True

# 8. Report Generation Agent Output (Section 9.9)
class ResearchReport(BaseModel):
    report_id: str
    research_question: str
    jurisdiction: str
    executive_summary: str
    relevant_legislation: List[LegislationMatch]
    relevant_judgments: List[CaseMatch]
    document_analysis: Optional[DocumentAnalysisOutput] = None
    case_comparison: Optional[CaseComparisonOutput] = None
    verification_records: List[CitationVerificationRecord]
    limitations: List[str] = Field(default_factory=list)
    requires_human_review: bool = False
    is_synthetic_dataset: bool = True

# Complete Shared LangGraph State Schema (Sections 9, 11 & 12 of Proposal)
class LegalResearchState(BaseModel):
    research_id: str
    user_query: str
    jurisdiction: str = "LK"
    domain: str = "Employment Law"
    uploaded_document_ids: List[str] = Field(default_factory=list)
    
    # Agent Outputs
    analysis: Optional[QuestionAnalysisOutput] = None
    document_analysis: Optional[DocumentAnalysisOutput] = None
    retrieved_legislation: List[LegislationMatch] = Field(default_factory=list)
    retrieved_cases: List[CaseMatch] = Field(default_factory=list)
    case_comparison: Optional[CaseComparisonOutput] = None
    verification_records: List[CitationVerificationRecord] = Field(default_factory=list)
    synthesis: Optional[LegalSynthesisOutput] = None
    final_report: Optional[ResearchReport] = None
    
    # Orchestrator & Harness Governance State
    iteration_count: int = 0
    max_retries: int = 2
    evidence_sufficient: bool = False
    requires_human_review: bool = False
    current_step: str = "initialized"
    execution_logs: List[str] = Field(default_factory=list)
