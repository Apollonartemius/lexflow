"""
LexFlow NLP Service — PDF Text Extraction
Uses pdfplumber for accurate text extraction from financial documents.
"""
import io
import pdfplumber


def extract_text_from_pdf(file_bytes: bytes) -> dict:
    """
    Extract text from a PDF file.
    
    Args:
        file_bytes: Raw bytes of the PDF file
        
    Returns:
        dict with 'text' (full text), 'pages' (list of page texts), 'page_count'
    """
    pages = []
    full_text_parts = []

    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text() or ""
            pages.append(page_text)
            full_text_parts.append(page_text)

    full_text = "\n\n".join(full_text_parts)

    return {
        "text": full_text,
        "pages": pages,
        "page_count": len(pages),
    }


def extract_tables_from_pdf(file_bytes: bytes) -> list[dict]:
    """
    Extract tables from a PDF file.
    
    Args:
        file_bytes: Raw bytes of the PDF file
        
    Returns:
        List of tables, each as a dict with 'page', 'data' (list of rows)
    """
    tables = []

    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        for i, page in enumerate(pdf.pages):
            page_tables = page.extract_tables() or []
            for table in page_tables:
                tables.append({
                    "page": i + 1,
                    "data": table,
                })

    return tables
