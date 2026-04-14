// ============================================
// LEXFLOW — Neo4j Schema Definition
// ============================================
// Run this FIRST before seeding data

// --- Constraints (Unique IDs) ---
CREATE CONSTRAINT regulation_id IF NOT EXISTS FOR (r:Regulation) REQUIRE r.id IS UNIQUE;
CREATE CONSTRAINT section_id IF NOT EXISTS FOR (s:Section) REQUIRE s.id IS UNIQUE;
CREATE CONSTRAINT requirement_id IF NOT EXISTS FOR (req:Requirement) REQUIRE req.id IS UNIQUE;
CREATE CONSTRAINT violation_id IF NOT EXISTS FOR (v:Violation) REQUIRE v.id IS UNIQUE;
CREATE CONSTRAINT document_type_id IF NOT EXISTS FOR (dt:DocumentType) REQUIRE dt.id IS UNIQUE;
CREATE CONSTRAINT keyword_id IF NOT EXISTS FOR (k:Keyword) REQUIRE k.id IS UNIQUE;

// --- Indexes (Performance) ---
CREATE INDEX regulation_name IF NOT EXISTS FOR (r:Regulation) ON (r.name);
CREATE INDEX section_mandatory IF NOT EXISTS FOR (s:Section) ON (s.mandatory);
CREATE INDEX requirement_type IF NOT EXISTS FOR (req:Requirement) ON (req.type);
CREATE INDEX violation_severity IF NOT EXISTS FOR (v:Violation) ON (v.severity);
CREATE INDEX keyword_term IF NOT EXISTS FOR (k:Keyword) ON (k.term);
