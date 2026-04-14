"""
LexFlow NLP Service — Pydantic Schemas
"""
from pydantic import BaseModel
from typing import Optional


class Entity(BaseModel):
    """A named entity extracted from the document."""
    text: str
    label: str
    start: int
    end: int


class DocumentSection(BaseModel):
    """A detected section in the document."""
    title: str
    content: str
    start_index: int
    end_index: int
    level: int  # heading level (1 = top-level)


class KeywordMatch(BaseModel):
    """A keyword found in the document."""
    keyword: str
    count: int
    category: str
    positions: list[int]


class NLPResult(BaseModel):
    """Complete NLP processing result."""
    text: str
    page_count: int
    word_count: int
    entities: list[Entity]
    sections: list[DocumentSection]
    keywords: list[KeywordMatch]
    detected_doc_type: Optional[str] = None
    processing_time_ms: float


class HealthResponse(BaseModel):
    """Health check response."""
    status: str
    service: str
    version: str
    spacy_model: str
