// ============================================
// LEXFLOW — Reusable Compliance Queries
// ============================================

// --- Get all regulations applicable to a document type ---
// Parameters: $docType (e.g., "Annual Report")
// MATCH (r:Regulation)-[:APPLIES_TO]->(dt:DocumentType {name: $docType})
// RETURN r.id, r.name, r.jurisdiction, r.authority

// --- Get all mandatory sections for a regulation ---
// Parameters: $regulationId
// MATCH (r:Regulation {id: $regulationId})-[:HAS_SECTION]->(s:Section {mandatory: true})
// RETURN s.id, s.title, s.text, s.category, s.regulation_number

// --- Get requirements and keywords for a section ---
// Parameters: $sectionId
// MATCH (s:Section {id: $sectionId})-[:REQUIRES]->(req:Requirement)-[:HAS_KEYWORD]->(k:Keyword)
// RETURN req.id, req.description, req.type, collect(k.term) AS keywords

// --- Get violation details for a section ---
// Parameters: $sectionId
// MATCH (s:Section {id: $sectionId})-[:LEADS_TO_VIOLATION]->(v:Violation)
// RETURN v.id, v.type, v.severity, v.description, v.suggestion

// --- FULL COMPLIANCE CHECK QUERY ---
// Get all mandatory sections with their requirements, keywords, and potential violations
// Parameters: $docType
// MATCH (r:Regulation)-[:APPLIES_TO]->(dt:DocumentType {name: $docType})
// MATCH (r)-[:HAS_SECTION]->(s:Section {mandatory: true})
// MATCH (s)-[:REQUIRES]->(req:Requirement)
// OPTIONAL MATCH (req)-[:HAS_KEYWORD]->(k:Keyword)
// OPTIONAL MATCH (s)-[:LEADS_TO_VIOLATION]->(v:Violation)
// RETURN r.name AS regulation,
//        s.regulation_number AS section_number,
//        s.title AS section_title,
//        s.category AS category,
//        req.description AS requirement,
//        collect(DISTINCT k.term) AS keywords,
//        v.severity AS violation_severity,
//        v.description AS violation_description,
//        v.suggestion AS violation_suggestion
// ORDER BY v.severity DESC, r.name

// --- Get compliance statistics ---
// MATCH (r:Regulation) RETURN count(r) AS total_regulations
// MATCH (s:Section {mandatory: true}) RETURN count(s) AS total_mandatory_sections
// MATCH (v:Violation) RETURN count(v) AS total_violation_types
