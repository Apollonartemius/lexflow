"""
LexFlow NLP Service Configuration
"""
import os


class Settings:
    """Application settings loaded from environment variables."""
    APP_NAME: str = "LexFlow NLP Service"
    APP_VERSION: str = "1.0.0"
    HOST: str = os.getenv("NLP_HOST", "0.0.0.0")
    PORT: int = int(os.getenv("NLP_PORT", "8000"))
    DEBUG: bool = os.getenv("NLP_DEBUG", "true").lower() == "true"

    # spaCy model
    SPACY_MODEL: str = os.getenv("SPACY_MODEL", "en_core_web_sm")

    # File upload limits
    MAX_FILE_SIZE_MB: int = int(os.getenv("MAX_FILE_SIZE_MB", "50"))


settings = Settings()
