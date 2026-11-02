"""Reusable prompt template abstraction for LegalLens AI.

Ensures strict separation between immutable system instructions and dynamic
user inputs, providing clear prompt naming, versioning, and validation.
"""

from dataclasses import dataclass
from typing import Any


@dataclass(frozen=True)
class PromptTemplate:
    """Immutable prompt template encapsulating system instructions and user templates."""

    name: str
    version: str
    description: str
    system_instruction: str
    user_template: str

    def format_prompt(self, **kwargs: Any) -> str:
        """Format the user-facing prompt string with dynamic keyword arguments."""
        try:
            return self.user_template.format(**kwargs)
        except KeyError as exc:
            missing_key = str(exc)
            raise ValueError(
                f"Missing required variable {missing_key} for prompt template '{self.name}:{self.version}'"
            ) from exc

    def render(self, **kwargs: Any) -> tuple[str, str]:
        """Render both system instructions and formatted user prompt.

        Returns:
            tuple[str, str]: (system_instruction, formatted_user_prompt)
        """
        user_prompt = self.format_prompt(**kwargs)
        return self.system_instruction, user_prompt
