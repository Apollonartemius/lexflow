"""
LexFlow NLP Service — Named Entity Recognition Engine
Uses spaCy for extracting entities from financial documents.
"""
import spacy
from app.config import settings

# Load spaCy model once at module level
_nlp = None


def get_nlp():
    """Lazy-load the spaCy model with memory optimizations."""
    global _nlp
    if _nlp is None:
        # Disable parser, tagger, and lemmatizer to save massive amounts of RAM
        disable_pipes = ["parser", "tagger", "lemmatizer", "tok2vec", "attribute_ruler"]
        try:
            _nlp = spacy.load(settings.SPACY_MODEL, disable=["parser", "tagger", "lemmatizer", "attribute_ruler"])
        except OSError:
            # Model not installed — download it
            from spacy.cli import download
            download(settings.SPACY_MODEL)
            _nlp = spacy.load(settings.SPACY_MODEL, disable=["parser", "tagger", "lemmatizer", "attribute_ruler"])
    return _nlp


def extract_entities(text: str, max_length: int = 1_000_000) -> list[dict]:
    """
    Extract named entities from text using spaCy.
    Optimized to prevent Out constraints on PaaS platforms like Railway.
    """
    nlp = get_nlp()
    
    # Truncate if necessary to absolute physical cap
    if len(text) > max_length:
        text = text[:max_length]

    # Filter to financially relevant entity types
    relevant_labels = {
        "ORG", "MONEY", "DATE", "PERCENT", "LAW",
        "PERSON", "GPE", "CARDINAL", "ORDINAL", "QUANTITY"
    }

    entities = []
    seen = set()  # Deduplicate
    
    # Memory optimization: Chunk massive documents to prevent RAM spiking
    CHUNK_SIZE = 150_000
    for i in range(0, len(text), CHUNK_SIZE):
        chunk = text[i:i + CHUNK_SIZE]
        if not chunk.strip():
            continue
            
        doc = nlp(chunk)
        
        for ent in doc.ents:
            if ent.label_ in relevant_labels:
                key = (ent.text.strip(), ent.label_)
                if key not in seen:
                    seen.add(key)
                    entities.append({
                        "text": ent.text.strip(),
                        "label": ent.label_,
                        "start": i + ent.start_char,
                        "end": i + ent.end_char,
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
