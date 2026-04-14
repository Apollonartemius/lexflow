"""
LexFlow NLP Service — Keyword Extraction
Extracts compliance-relevant keywords from financial documents.
"""
import re

# Compliance keywords organized by category
COMPLIANCE_KEYWORDS = {
    "Risk": [
        "risk factors", "risk management", "risk assessment", "risk mitigation",
        "material risk", "operational risk", "financial risk", "market risk",
        "credit risk", "liquidity risk", "regulatory risk", "cyber security risk",
        "systemic risk", "concentration risk",
    ],
    "Financial": [
        "financial statements", "balance sheet", "profit and loss",
        "income statement", "cash flow", "revenue", "net income",
        "stockholders equity", "shareholders equity", "total assets",
        "total liabilities", "earnings per share", "dividend",
        "off balance sheet", "capital resources", "liquidity",
        "financial position", "operating results", "fiscal year",
        "audited financial", "consolidated financial",
    ],
    "Governance": [
        "corporate governance", "board of directors", "independent director",
        "audit committee", "nomination committee", "remuneration committee",
        "risk management committee", "stakeholders relationship committee",
        "related party", "related party transactions",
        "code of conduct", "whistleblower", "vigil mechanism",
    ],
    "Disclosure": [
        "disclosure", "material events", "material information",
        "price sensitive information", "insider trading",
        "continuous disclosure", "periodic disclosure",
        "website disclosure", "annual disclosure",
    ],
    "Analysis": [
        "management discussion", "management analysis", "md&a",
        "mda", "business overview", "industry overview",
        "outlook", "forward looking", "future prospects",
        "competitive landscape", "market position",
    ],
    "Controls": [
        "internal controls", "internal audit", "disclosure controls",
        "control procedures", "material weakness", "significant deficiency",
        "sarbanes oxley", "sox compliance", "internal control over financial reporting",
    ],
    "Legal": [
        "legal proceedings", "litigation", "lawsuit", "regulatory action",
        "enforcement", "penalty", "fine", "consent order",
        "investigation", "compliance violation",
    ],
    "Compensation": [
        "executive compensation", "remuneration", "stock options",
        "equity awards", "bonus", "incentive plan",
        "compensation committee", "say on pay",
    ],
    "IPO": [
        "prospectus", "offer document", "initial public offering",
        "issue price", "book building", "subscription",
        "allotment", "listing", "objects of the issue",
    ],
}


def extract_keywords(text: str) -> list[dict]:
    """
    Extract compliance-relevant keywords from document text.
    
    Args:
        text: Document text to analyze
        
    Returns:
        List of keyword match dicts with keyword, count, category, positions
    """
    text_lower = text.lower()
    results = []

    for category, keywords in COMPLIANCE_KEYWORDS.items():
        for keyword in keywords:
            # Find all occurrences
            positions = []
            start = 0
            while True:
                pos = text_lower.find(keyword, start)
                if pos == -1:
                    break
                positions.append(pos)
                start = pos + 1

            if positions:
                results.append({
                    "keyword": keyword,
                    "count": len(positions),
                    "category": category,
                    "positions": positions[:10],  # Limit positions stored
                })

    # Sort by count descending
    results.sort(key=lambda x: x["count"], reverse=True)
    return results


def detect_document_type(keywords: list[dict], sections: list[dict]) -> str:
    """
    Infer the document type based on detected keywords and sections.
    
    Args:
        keywords: Extracted keywords
        sections: Detected sections
        
    Returns:
        Detected document type string
    """
    section_titles = " ".join([s.get("title", "").lower() for s in sections])
    keyword_text = " ".join([k["keyword"] for k in keywords])
    combined = section_titles + " " + keyword_text

    # Score each document type
    scores = {
        "Annual Report": 0,
        "Quarterly Report": 0,
        "10-K Filing": 0,
        "10-Q Filing": 0,
        "IPO Prospectus": 0,
        "Corporate Governance Report": 0,
    }

    # Annual Report signals
    if "annual report" in combined or "annual disclosure" in combined:
        scores["Annual Report"] += 5
    if "director" in combined and "report" in combined:
        scores["Annual Report"] += 3
    if "md&a" in combined or "management discussion" in combined:
        scores["Annual Report"] += 2

    # 10-K signals
    if "item 1" in section_titles or "item 1a" in section_titles:
        scores["10-K Filing"] += 5
    if "form 10-k" in combined or "10-k" in combined:
        scores["10-K Filing"] += 10
    if "sarbanes" in combined or "sox" in combined:
        scores["10-K Filing"] += 3

    # 10-Q signals
    if "form 10-q" in combined or "10-q" in combined:
        scores["10-Q Filing"] += 10
    if "quarterly report" in combined:
        scores["Quarterly Report"] += 5

    # IPO signals
    if "prospectus" in combined or "offer document" in combined:
        scores["IPO Prospectus"] += 10
    if "objects of the issue" in combined or "book building" in combined:
        scores["IPO Prospectus"] += 5

    # Corporate Governance signals
    if "corporate governance" in combined:
        scores["Corporate Governance Report"] += 5
    if "audit committee" in combined and "nomination" in combined:
        scores["Corporate Governance Report"] += 3

    # Return highest-scoring type
    best_type = max(scores, key=scores.get)
    if scores[best_type] == 0:
        return "Annual Report"  # Default
    return best_type


def get_keyword_summary(keywords: list[dict]) -> dict:
    """
    Summarize keywords by category.
    
    Returns:
        Dict mapping category to total keyword count
    """
    summary = {}
    for kw in keywords:
        cat = kw["category"]
        summary[cat] = summary.get(cat, 0) + kw["count"]
    return summary
