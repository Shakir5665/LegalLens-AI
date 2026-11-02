import logging
import sys


def setup_logging(log_level: str = "INFO") -> None:
    """Configure standard Python logging for the backend application."""
    numeric_level = getattr(logging, log_level.upper(), logging.INFO)

    logging.basicConfig(
        level=numeric_level,
        format="%(asctime)s | %(levelname)-7s | %(name)s | %(message)s",
        handlers=[
            logging.StreamHandler(sys.stdout),
        ],
        force=True,
    )


def get_logger(name: str) -> logging.Logger:
    """Return a logger configured with the given module name."""
    return logging.getLogger(name)
