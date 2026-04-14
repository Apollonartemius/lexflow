"""
LexFlow NLP Service — Named Entity Recognition Engine
Uses spaCy for extracting entities from financial documents.
"""
import spacy
from app.config import settings

# Load spaCy model once at module level
_nlp = None


def get_nlp():
    """Lazy-load the spaCy model."""
    global _nlp
    if _nlp is None:
        try:
            _nlp = spacy.load(settings.SPACY_MODEL)
        except OSError:
            # Model not installed — download it
            from spacy.cli import download
            download(settings.SPACY_MODEL)
            _nlp = spacy.load(settings.SPACY_MODEL)
    return _nlp


def extract_entities(text: str, max_length: int = 1_000_000) -> list[dict]:
    """
    Extract named entities from text using spaCy.
    
    Focuses on entities relevant to financial documents:
    - ORG: Companies, regulatory bodies
    - MONEY: Dollar amounts, financial figures
    - DATE: Dates, fiscal years
    - PERCENT: Percentages
    - LAW: Regulations, acts, statutes
    - PERSON: Directors, officers
    - GPE: Countries, jurisdictions
    
    Args:
        text: Input text to process
        max_length: Maximum text length (spaCy limit)
        
    Returns:
        List of entity dicts with text, label, start, end
    """
    nlp = get_nlp()
    
    # Truncate if necessary
    if len(text) > max_length:
        text = text[:max_length]

    doc = nlp(text)
    
    # Filter to financially relevant entity types
    relevant_labels = {
        "ORG", "MONEY", "DATE", "PERCENT", "LAW",
        "PERSON", "GPE", "CARDINAL", "ORDINAL", "QUANTITY"
    }

    entities = []
    seen = set()  # Deduplicate
    
    for ent in doc.ents:
        if ent.label_ in relevant_labels:
            key = (ent.text.strip(), ent.label_)
            if key not in seen:
                seen.add(key)
                entities.append({
                    "text": ent.text.strip(),
                    "label": ent.label_,
                    "start": ent.start_char,
                    "end": ent.end_char,
                })

    return entities


def get_entity_summary(entities: list[dict]) -> dict:
    """
    Summarize extracted entities by type.
    
    Args:
        entities: List of entity dicts
        
    Returns:
        Dict mapping entity label to list of unique entity texts
    """
    summary = {}
    for ent in entities:
        label = ent["label"]
        if label not in summary:
            summary[label] = []
        if ent["text"] not in summary[label]:
            summary[label].append(ent["text"])
    return summary
