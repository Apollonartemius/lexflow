"""
LexFlow NLP Service — FastAPI Entry Point
Processes financial documents for compliance analysis.
"""
import time
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.services.pdf_extractor import extract_text_from_pdf
from app.services.ner_engine import extract_entities, get_entity_summary
from app.services.section_detector import detect_sections, get_section_titles
from app.services.keyword_extractor import (
    extract_keywords,
    detect_document_type,
    get_keyword_summary,
)
from app.models.schemas import (
    NLPResult,
    HealthResponse,
    Entity,
    DocumentSection,
    KeywordMatch,
)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="NLP microservice for processing financial documents",
)

# CORS — allow backend to call this service
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(
        status="healthy",
        service=settings.APP_NAME,
        version=settings.APP_VERSION,
        spacy_model=settings.SPACY_MODEL,
    )


@app.post("/process", response_model=NLPResult)
async def process_document(file: UploadFile = File(...)):
    """
    Full NLP pipeline: PDF → text → NER → sections → keywords.
    
    Accepts a PDF file and returns complete NLP analysis.
    """
    start_time = time.time()

    # Validate file type
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported. Please upload a .pdf file.",
        )

    # Read file
    file_bytes = await file.read()
    
    # Check file size
    size_mb = len(file_bytes) / (1024 * 1024)
    if size_mb > settings.MAX_FILE_SIZE_MB:
        raise HTTPException(
            status_code=413,
            detail=f"File too large ({size_mb:.1f}MB). Maximum is {settings.MAX_FILE_SIZE_MB}MB.",
        )

    # Step 1: Extract text from PDF
    try:
        pdf_result = extract_text_from_pdf(file_bytes)
    except Exception as e:
        raise HTTPException(
            status_code=422,
            detail=f"Failed to extract text from PDF: {str(e)}",
        )

    text = pdf_result["text"]
    
    if not text.strip():
        raise HTTPException(
            status_code=422,
            detail="No text could be extracted from this PDF. It may be a scanned image.",
        )

    # Step 2: Named Entity Recognition
    entities_raw = extract_entities(text)
    entities = [Entity(**e) for e in entities_raw]

    # Step 3: Section Detection
    sections_raw = detect_sections(text)
    sections = [DocumentSection(**s) for s in sections_raw]

    # Step 4: Keyword Extraction
    keywords_raw = extract_keywords(text)
    keywords = [KeywordMatch(**k) for k in keywords_raw]

    # Step 5: Detect document type
    doc_type = detect_document_type(keywords_raw, sections_raw)

    # Calculate word count
    word_count = len(text.split())

    processing_time = (time.time() - start_time) * 1000  # Convert to ms

    return NLPResult(
        text=text[:50000],  # Limit text in response (50k chars)
        page_count=pdf_result["page_count"],
        word_count=word_count,
        entities=entities,
        sections=sections,
        keywords=keywords,
        detected_doc_type=doc_type,
        processing_time_ms=round(processing_time, 2),
    )


@app.post("/extract-text")
async def extract_text(file: UploadFile = File(...)):
    """Extract text only from a PDF file."""
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    file_bytes = await file.read()
    try:
        result = extract_text_from_pdf(file_bytes)
    except Exception as e:
        raise HTTPException(status_code=422, detail=f"PDF extraction failed: {str(e)}")

    return {
        "text": result["text"],
        "page_count": result["page_count"],
        "word_count": len(result["text"].split()),
    }


@app.post("/ner")
async def run_ner(file: UploadFile = File(...)):
    """Run Named Entity Recognition on a PDF file."""
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    file_bytes = await file.read()
    pdf_result = extract_text_from_pdf(file_bytes)
    entities = extract_entities(pdf_result["text"])
    summary = get_entity_summary(entities)

    return {
        "entities": entities,
        "summary": summary,
        "total_entities": len(entities),
    }


@app.post("/sections")
async def run_section_detection(file: UploadFile = File(...)):
    """Detect document sections in a PDF file."""
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    file_bytes = await file.read()
    pdf_result = extract_text_from_pdf(file_bytes)
    sections = detect_sections(pdf_result["text"])
    titles = get_section_titles(sections)

    return {
        "sections": sections,
        "titles": titles,
        "total_sections": len(sections),
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
    )
