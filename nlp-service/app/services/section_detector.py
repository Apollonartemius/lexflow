"""
LexFlow NLP Service — Document Section Detector
Detects structural sections in financial documents using pattern matching.
"""
import re


# Patterns that indicate section headings in financial documents
SECTION_PATTERNS = [
    # Numbered sections: "1.", "1.1", "Item 1", "Part I", "Section 1"
    (r'^(?:Item|ITEM)\s+\d+[A-Za-z]?[\.\s\-:]+(.+)', 1),
    (r'^(?:Part|PART)\s+[IVX]+[\.\s\-:]+(.+)', 1),
    (r'^(?:Section|SECTION)\s+\d+[\.\s\-:]+(.+)', 1),
    (r'^(?:Regulation|REGULATION)\s+\d+[\.\s\-:]+(.+)', 1),
    (r'^(?:Schedule|SCHEDULE)\s+[IVX\d]+[\.\s\-:]+(.+)', 1),
    (r'^\d+\.\s+([A-Z][A-Z\s]{3,})', 1),
    (r'^\d+\.\d+\s+(.+)', 2),
    
    # ALL CAPS headings (common in financial docs)
    (r'^([A-Z][A-Z\s,&\-]{5,})$', 1),
    
    # Common financial document headings
    (r'^(RISK\s+FACTORS?)[\s:]*$', 1),
    (r'^(MANAGEMENT.S?\s+DISCUSSION\s+AND\s+ANALYSIS)', 1),
    (r'^(FINANCIAL\s+STATEMENTS?)', 1),
    (r'^(CORPORATE\s+GOVERNANCE)', 1),
    (r'^(BOARD\s+OF\s+DIRECTORS?)', 1),
    (r'^(INDEPENDENT\s+AUDITOR.?S?\s+REPORT)', 1),
    (r'^(BALANCE\s+SHEET)', 1),
    (r'^(STATEMENT\s+OF\s+(?:PROFIT|INCOME|CASH\s+FLOW|CHANGES))', 1),
    (r'^(NOTES?\s+TO\s+(?:THE\s+)?FINANCIAL\s+STATEMENTS?)', 1),
    (r'^(LEGAL\s+PROCEEDINGS?)', 1),
    (r'^(EXECUTIVE\s+COMPENSATION)', 1),
    (r'^(RELATED\s+PARTY\s+TRANSACTIONS?)', 1),
    (r'^(INTERNAL\s+CONTROLS?)', 1),
    (r'^(DISCLOSURE\s+CONTROLS?)', 1),
    (r'^(PROPERTIES)', 1),
    (r'^(DIRECTORS?.?\s+REPORT)', 1),
]


def detect_sections(text: str) -> list[dict]:
    """
    Detect document sections by analyzing text structure.
    
    Args:
        text: Full document text
        
    Returns:
        List of section dicts with title, content, start_index, end_index, level
    """
    lines = text.split('\n')
    sections = []
    current_section = None
    current_content_lines = []
    
    for i, line in enumerate(lines):
        stripped = line.strip()
        if not stripped:
            if current_content_lines is not None:
                current_content_lines.append("")
            continue
            
        # Check if this line is a section heading
        detected = _detect_heading(stripped)
        
        if detected:
            # Save previous section
            if current_section is not None:
                content = '\n'.join(current_content_lines).strip()
                current_section["content"] = content
                current_section["end_index"] = _get_char_position(lines, i - 1)
                if content:  # Only add sections with content
                    sections.append(current_section)
            
            # Start new section
            title, level = detected
            current_section = {
                "title": title.strip(),
                "content": "",
                "start_index": _get_char_position(lines, i),
                "end_index": 0,
                "level": level,
            }
            current_content_lines = []
        else:
            current_content_lines.append(stripped)
    
    # Save last section
    if current_section is not None:
        content = '\n'.join(current_content_lines).strip()
        current_section["content"] = content
        current_section["end_index"] = len(text)
        if content:
            sections.append(current_section)
    
    return sections


def _detect_heading(line: str) -> tuple | None:
    """
    Check if a line matches any section heading pattern.
    
    Returns:
        Tuple of (title, level) or None
    """
    for pattern, level in SECTION_PATTERNS:
        match = re.match(pattern, line, re.IGNORECASE)
        if match:
            title = match.group(1) if match.lastindex else line
            # Don't match single short words
            if len(title.strip()) < 3:
                continue
            return (title.strip(), level)
    
    # Heuristic: Lines that are all caps, 4-60 chars, no periods inside
    if (line.isupper() and 
        4 <= len(line) <= 80 and 
        '.' not in line[:-1] and
        not line.startswith('(') and
        sum(1 for c in line if c.isalpha()) > len(line) * 0.5):
        return (line, 1)
    
    return None


def _get_char_position(lines: list[str], line_index: int) -> int:
    """Get character position of a line in the original text."""
    pos = 0
    for i in range(min(line_index, len(lines))):
        pos += len(lines[i]) + 1  # +1 for newline
    return pos


def get_section_titles(sections: list[dict]) -> list[str]:
    """Extract just the titles from detected sections."""
    return [s["title"] for s in sections]
