"""Unit tests for prompt templates, structured output models, and response validation."""

import pytest
from app.core.llm_errors import LLMResponseValidationError
from app.prompts.base import PromptTemplate
from app.prompts.legal_prompts import LEGAL_QUERY_ANALYSIS_PROMPT
from app.schemas.llm import (
    LegalQueryAnalysisResult,
    LegalUrgencyLevel,
    PotentialStatute,
    validate_structured_response,
)


def test_prompt_template_formatting_success() -> None:
    """Verify prompt formatting with dynamic parameters."""
    template = PromptTemplate(
        name="test_prompt",
        version="1.0.0",
        description="Test template",
        system_instruction="System rule",
        user_template="Context: {context}. Query: {query}.",
    )
    sys_inst, user_prompt = template.render(context="Employment", query="Termination")
    assert sys_inst == "System rule"
    assert user_prompt == "Context: Employment. Query: Termination."


def test_prompt_template_missing_variable_raises_value_error() -> None:
    """Verify missing prompt variable raises clear descriptive ValueError."""
    template = PromptTemplate(
        name="test_prompt",
        version="1.0.0",
        description="Test template",
        system_instruction="System rule",
        user_template="Context: {context}. Query: {query}.",
    )
    with pytest.raises(ValueError) as exc_info:
        template.render(context="Only context provided")
    assert "Missing required variable" in str(exc_info.value)
    assert "test_prompt:1.0.0" in str(exc_info.value)


def test_legal_query_analysis_prompt_safeguards() -> None:
    """Verify system instructions enforce ethical and evidence-grounded constraints."""
    instruction = LEGAL_QUERY_ANALYSIS_PROMPT.system_instruction
    assert "DO NOT provide final legal conclusions" in instruction
    assert "DO NOT declare liability" in instruction
    assert "DO NOT invent or hallucinate statutory sections" in instruction


def test_validate_structured_response_valid_json() -> None:
    """Verify successful validation of valid model JSON payload."""
    raw_json = """{
        "primary_legal_issue": "Termination of non-probationary workman without prior Labour Commissioner approval",
        "potential_statutes": ["termination_of_employment_workmen_act", "industrial_disputes_act"],
        "key_factual_elements": ["5 years continuous service", "No written misconduct inquiry", "Immediate discharge"],
        "requires_clarification": false,
        "clarification_questions": [],
        "urgency_assessment": "TIME_SENSITIVE",
        "statutory_grounding_note": "Preliminary query classification only. Not authoritative legal advice."
    }"""
    result = validate_structured_response(raw_json, LegalQueryAnalysisResult)

    assert isinstance(result, LegalQueryAnalysisResult)
    assert result.primary_legal_issue.startswith("Termination of non-probationary workman")
    assert PotentialStatute.TERMINATION_OF_EMPLOYMENT_WORKMEN_ACT in result.potential_statutes
    assert PotentialStatute.INDUSTRIAL_DISPUTES_ACT in result.potential_statutes
    assert result.urgency_assessment == LegalUrgencyLevel.TIME_SENSITIVE
    assert result.requires_clarification is False
    assert len(result.key_factual_elements) == 3


def test_validate_structured_response_missing_mandatory_field() -> None:
    """Verify missing mandatory field raises LLMResponseValidationError."""
    # primary_legal_issue is missing
    raw_json = """{
        "potential_statutes": ["industrial_disputes_act"],
        "key_factual_elements": ["Dismissal without compensation"]
    }"""
    with pytest.raises(LLMResponseValidationError) as exc_info:
        validate_structured_response(raw_json, LegalQueryAnalysisResult)

    assert exc_info.value.status_code == 502
    assert exc_info.value.error_code == "LLM_INVALID_RESPONSE"
    assert "validation_errors" in exc_info.value.details


def test_validate_structured_response_invalid_enum() -> None:
    """Verify unapproved enum value raises LLMResponseValidationError."""
    raw_json = """{
        "primary_legal_issue": "Claim for unpaid gratuity benefits upon resignation",
        "potential_statutes": ["completely_invented_act_1999"],
        "key_factual_elements": ["10 years service"],
        "requires_clarification": false,
        "clarification_questions": [],
        "urgency_assessment": "ROUTINE",
        "statutory_grounding_note": "Preliminary query classification only."
    }"""
    with pytest.raises(LLMResponseValidationError) as exc_info:
        validate_structured_response(raw_json, LegalQueryAnalysisResult)

    assert "validation_errors" in exc_info.value.details


def test_validate_structured_response_malformed_json() -> None:
    """Verify arbitrary prose / non-JSON output is safely rejected."""
    raw_text = "Based on Sri Lankan employment law, you might have a claim under TEWA..."
    with pytest.raises(LLMResponseValidationError) as exc_info:
        validate_structured_response(raw_text, LegalQueryAnalysisResult)

    assert exc_info.value.status_code == 502
    assert "could not be parsed as valid JSON" in exc_info.value.message


def test_validate_structured_response_empty_string() -> None:
    """Verify empty or whitespace response raises LLMResponseValidationError."""
    with pytest.raises(LLMResponseValidationError) as exc_info:
        validate_structured_response("   ", LegalQueryAnalysisResult)

    assert "empty response content" in exc_info.value.message


def test_validate_structured_response_extra_fields_forbidden() -> None:
    """Verify extra unexpected fields are rejected when schema specifies extra='forbid'."""
    from pydantic import BaseModel, ConfigDict

    class StrictForbiddenSchema(BaseModel):
        model_config = ConfigDict(extra="forbid")
        issue: str

    raw_json = """{
        "issue": "Valid issue title",
        "invented_untrusted_field": "Should fail validation"
    }"""
    with pytest.raises(LLMResponseValidationError) as exc_info:
        validate_structured_response(raw_json, StrictForbiddenSchema)
    assert "validation_errors" in exc_info.value.details
