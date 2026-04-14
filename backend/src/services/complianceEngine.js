/**
 * LexFlow Backend — Compliance Engine
 * Core logic: matches NLP output against Neo4j regulation graph.
 * This is the "Vectorless Retrieval-Augmented Reasoning" engine.
 */
const neo4jService = require('./neo4jService');

/**
 * Run a full compliance check on an NLP-processed document.
 * 
 * Algorithm:
 * 1. Get detected document type from NLP result
 * 2. Query Neo4j for all mandatory sections for that doc type
 * 3. For each required section, check if the document contains matching keywords
 * 4. If missing → flag violation with severity + suggestion
 * 5. Score overall compliance percentage
 * 
 * @param {Object} nlpResult - Result from the NLP service
 * @returns {Object} Compliance analysis results
 */
async function analyzeCompliance(nlpResult) {
  const docType = nlpResult.detected_doc_type || 'Annual Report';
  const documentKeywords = nlpResult.keywords || [];
  const documentSections = nlpResult.sections || [];
  const documentText = (nlpResult.text || '').toLowerCase();

  // Step 1: Get compliance rules from Neo4j graph
  const rules = await neo4jService.getComplianceRules(docType);

  // Step 2: Check each rule against document content
  const issues = [];
  const passed = [];
  let totalRules = 0;

  // Deduplicate rules by section
  const uniqueRules = deduplicateRules(rules);

  for (const rule of uniqueRules) {
    totalRules++;
    const ruleKeywords = rule.keywords || [];

    // Check if document has matching content
    const matchResult = checkRuleMatch(
      ruleKeywords,
      documentKeywords,
      documentSections,
      documentText,
      rule
    );

    if (matchResult.matched) {
      passed.push({
        regulation: rule.regulation,
        section: rule.section_number,
        title: rule.section_title,
        category: rule.category,
        requirement: rule.requirement,
        confidence: matchResult.confidence,
        matched_keywords: matchResult.matchedKeywords,
      });
    } else {
      issues.push({
        id: `ISS-${String(issues.length + 1).padStart(3, '0')}`,
        regulation: rule.regulation,
        section: rule.section_number,
        title: rule.section_title,
        category: rule.category,
        requirement: rule.requirement,
        severity: rule.violation_severity || 'Medium',
        description: rule.violation_description || `Missing: ${rule.section_title}`,
        suggestion: rule.violation_suggestion || `Add a section covering ${rule.section_title}`,
        matched_keywords: matchResult.matchedKeywords,
        confidence: matchResult.confidence,
      });
    }
  }

  // Step 3: Calculate compliance score
  const complianceScore = totalRules > 0
    ? Math.round((passed.length / totalRules) * 100)
    : 100;

  // Step 4: Determine severity breakdown
  const severityBreakdown = {
    critical: issues.filter(i => i.severity === 'Critical').length,
    high: issues.filter(i => i.severity === 'High').length,
    medium: issues.filter(i => i.severity === 'Medium').length,
    low: issues.filter(i => i.severity === 'Low').length,
  };

  return {
    document_type: docType,
    compliance_score: complianceScore,
    total_rules_checked: totalRules,
    rules_passed: passed.length,
    rules_failed: issues.length,
    severity_breakdown: severityBreakdown,
    issues,
    passed,
    analyzed_at: new Date().toISOString(),
  };
}

/**
 * Check if a compliance rule is satisfied by the document.
 */
function checkRuleMatch(ruleKeywords, docKeywords, docSections, docText, rule) {
  let confidence = 0;
  const matchedKeywords = [];

  // Method 1: Keyword matching (primary)
  for (const ruleKw of ruleKeywords) {
    const found = docKeywords.find(
      dk => dk.keyword.toLowerCase() === ruleKw.toLowerCase()
    );
    if (found) {
      confidence += 30;
      matchedKeywords.push({ keyword: ruleKw, count: found.count });
    }
  }

  // Method 2: Section title matching
  const ruleTitleLower = (rule.section_title || '').toLowerCase();
  const ruleCategoryLower = (rule.category || '').toLowerCase();

  for (const section of docSections) {
    const sectionTitleLower = (section.title || '').toLowerCase();
    
    // Direct title match
    if (sectionTitleLower.includes(ruleTitleLower) || 
        ruleTitleLower.includes(sectionTitleLower)) {
      confidence += 40;
      break;
    }
    
    // Category match
    if (sectionTitleLower.includes(ruleCategoryLower)) {
      confidence += 25;
      break;
    }
  }

  // Method 3: Raw text search (fallback)
  for (const ruleKw of ruleKeywords) {
    if (docText.includes(ruleKw.toLowerCase())) {
      confidence += 10;
      if (!matchedKeywords.find(mk => mk.keyword === ruleKw)) {
        matchedKeywords.push({ keyword: ruleKw, count: 1 });
      }
    }
  }

  // Cap confidence at 100
  confidence = Math.min(confidence, 100);

  // Threshold: rule is matched if confidence >= 25
  return {
    matched: confidence >= 25,
    confidence,
    matchedKeywords,
  };
}

/**
 * Deduplicate rules that map to the same section.
 */
function deduplicateRules(rules) {
  const seen = new Map();
  for (const rule of rules) {
    const key = `${rule.regulation}:${rule.section_number}`;
    if (!seen.has(key)) {
      seen.set(key, rule);
    } else {
      // Merge keywords
      const existing = seen.get(key);
      const mergedKeywords = [...new Set([...(existing.keywords || []), ...(rule.keywords || [])])];
      existing.keywords = mergedKeywords;
    }
  }
  return Array.from(seen.values());
}

module.exports = { analyzeCompliance };
