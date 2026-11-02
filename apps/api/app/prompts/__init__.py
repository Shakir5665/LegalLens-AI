"""Prompt architecture and reusable templates for LegalLens AI."""

from app.prompts.base import PromptTemplate
from app.prompts.legal_prompts import LEGAL_QUERY_ANALYSIS_PROMPT

__all__ = [
    "PromptTemplate",
    "LEGAL_QUERY_ANALYSIS_PROMPT",
]
