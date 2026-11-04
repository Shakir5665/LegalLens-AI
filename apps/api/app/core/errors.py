from typing import Any
from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

from app.core.logging import get_logger

logger = get_logger("app.errors")


class ErrorResponse(BaseModel):
    """Standardized API error response payload."""

    error_code: str = Field(..., description="Machine-readable error identifier")
    message: str = Field(..., description="Human-readable explanation of the error")
    details: Any = Field(default=None, description="Optional diagnostic details")


class AppException(Exception):
    """Base application exception for LegalLens AI backend."""

    def __init__(
        self,
        message: str,
        status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR,
        error_code: str = "INTERNAL_SERVER_ERROR",
        details: Any = None,
    ) -> None:
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.error_code = error_code
        self.details = details


class EntityNotFoundException(AppException):
    """Raised when a requested resource is not found."""

    def __init__(self, resource_type: str, identifier: str) -> None:
        super().__init__(
            message=f"{resource_type} with identifier '{identifier}' was not found.",
            status_code=status.HTTP_404_NOT_FOUND,
            error_code="RESOURCE_NOT_FOUND",
            details={"resource_type": resource_type, "identifier": identifier},
        )


class ValidationException(AppException):
    """Raised when request payload violates domain validation rules."""

    def __init__(self, message: str, details: Any = None) -> None:
        super().__init__(
            message=message,
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            error_code="VALIDATION_ERROR",
            details=details,
        )


class DatabaseConnectionError(AppException):
    """Raised when the database connection cannot be established or verified."""

    def __init__(
        self,
        message: str = "Database connection could not be established.",
        details: Any = None,
    ) -> None:
        super().__init__(
            message=message,
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            error_code="DATABASE_CONNECTION_ERROR",
            details=details,
        )


class DatabaseConfigurationError(AppException):
    """Raised when required database configuration is missing or invalid."""

    def __init__(
        self,
        message: str = "Database configuration is missing or invalid.",
        details: Any = None,
    ) -> None:
        super().__init__(
            message=message,
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            error_code="DATABASE_CONFIGURATION_ERROR",
            details=details,
        )


class FileValidationError(AppException):
    """Raised when an uploaded file fails integrity, format, or size validation."""

    def __init__(
        self,
        message: str = "Uploaded file failed validation constraints.",
        details: Any = None,
    ) -> None:
        super().__init__(
            message=message,
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            error_code="FILE_VALIDATION_ERROR",
            details=details,
        )


class StorageError(AppException):
    """Raised when file storage operations fail."""

    def __init__(
        self,
        message: str = "An error occurred during file storage operations.",
        details: Any = None,
    ) -> None:
        super().__init__(
            message=message,
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            error_code="STORAGE_ERROR",
            details=details,
        )


class ScannedPDFException(AppException):
    """Raised when an uploaded PDF is scanned-only without native extractable text."""

    def __init__(
        self,
        message: str = "Scanned-only PDF detected. Native text extraction could not find readable text; OCR is not supported in Phase 3.",
        details: Any = None,
    ) -> None:
        super().__init__(
            message=message,
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            error_code="SCANNED_PDF_UNSUPPORTED",
            details=details,
        )


class DocumentVersionConflictError(AppException):
    """Raised when a concurrent or conflicting document version operation occurs."""

    def __init__(
        self,
        message: str = "Document version conflict detected.",
        details: Any = None,
    ) -> None:
        super().__init__(
            message=message,
            status_code=status.HTTP_409_CONFLICT,
            error_code="DOCUMENT_VERSION_CONFLICT",
            details=details,
        )


class DuplicateDocumentError(AppException):
    """Raised when an identical document version (by SHA-256) is uploaded for the same logical document."""

    def __init__(
        self,
        message: str = "A document version with identical SHA-256 content hash already exists for this document.",
        details: Any = None,
    ) -> None:
        super().__init__(
            message=message,
            status_code=status.HTTP_409_CONFLICT,
            error_code="DUPLICATE_DOCUMENT_VERSION",
            details=details,
        )


async def app_exception_handler(request: Request, exc: AppException) -> JSONResponse:
    """Handle custom application exceptions."""
    logger.warning("Application exception [%s] on %s: %s", exc.error_code, request.url.path, exc.message)
    return JSONResponse(
        status_code=exc.status_code,
        content=ErrorResponse(
            error_code=exc.error_code,
            message=exc.message,
            details=exc.details,
        ).model_dump(),
    )


async def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    """Handle FastAPI / Pydantic validation errors with uniform schema."""
    logger.warning("Request validation error on %s: %s", request.url.path, exc.errors())
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=ErrorResponse(
            error_code="VALIDATION_ERROR",
            message="Request parameters failed validation constraints.",
            details=exc.errors(),
        ).model_dump(),
    )


async def generic_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """Handle unexpected server errors without leaking tracebacks or secrets."""
    logger.exception("Unhandled server exception on %s: %s", request.url.path, exc)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=ErrorResponse(
            error_code="INTERNAL_SERVER_ERROR",
            message="An unexpected internal server error occurred.",
            details=None,
        ).model_dump(),
    )


async def catch_unhandled_exceptions_middleware(request: Request, call_next):
    """Middleware catching unexpected exceptions to ensure clean 500 JSON responses."""
    try:
        return await call_next(request)
    except Exception as exc:
        logger.exception("Unhandled server exception in middleware on %s: %s", request.url.path, exc)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=ErrorResponse(
                error_code="INTERNAL_SERVER_ERROR",
                message="An unexpected internal server error occurred.",
                details=None,
            ).model_dump(),
        )


def register_exception_handlers(app: FastAPI) -> None:
    """Register uniform exception handlers on the FastAPI application."""
    app.middleware("http")(catch_unhandled_exceptions_middleware)
    app.add_exception_handler(AppException, app_exception_handler)
    app.add_exception_handler(RequestValidationError, validation_exception_handler)
    app.add_exception_handler(Exception, generic_exception_handler)
