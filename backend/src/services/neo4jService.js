/**
 * LexFlow Backend — Neo4j Service
 * Graph database queries for regulation matching and compliance checks.
 */
const { driver, NEO4J_DATABASE } = require('../config/db');

// Helper to pass database config to executeQuery
const dbConfig = NEO4J_DATABASE ? { database: NEO4J_DATABASE } : {};

// In-memory fallback data when Neo4j is not available
const MOCK_REGULATIONS = [
  {
    id: 'REG001', name: 'SEBI LODR 2015',
    full_name: 'SEBI (Listing Obligations and Disclosure Requirements) Regulations, 2015',
    jurisdiction: 'India', authority: 'SEBI',
  },
  {
    id: 'REG002', name: 'SEC Form 10-K',
    full_name: 'Annual Report Pursuant to Section 13 or 15(d) of the Securities Exchange Act of 1934',
    jurisdiction: 'United States', authority: 'SEC',
  },
  {
    id: 'REG003', name: 'SEBI ICDR 2018',
    full_name: 'SEBI (Issue of Capital and Disclosure Requirements) Regulations, 2018',
    jurisdiction: 'India', authority: 'SEBI',
  },
];

const MOCK_COMPLIANCE_RULES = [
  {
    regulation: 'SEBI LODR 2015', section_number: 'Regulation 21', section_title: 'Risk Management Committee',
    category: 'Risk Management', requirement: 'Document must include a dedicated risk factors section',
    keywords: ['risk factors', 'risk management'], violation_severity: 'Critical',
    violation_description: 'Risk Factors section is completely missing from the document',
    violation_suggestion: 'Add a dedicated Risk Factors section covering: (1) Company-specific risks, (2) Industry risks, (3) Market risks, (4) Regulatory risks, and (5) Operational risks.',
  },
  {
    regulation: 'SEBI LODR 2015', section_number: 'Regulation 33', section_title: 'Financial Results',
    category: 'Financial Reporting', requirement: 'Financial statements must include balance sheet, P&L, and cash flow',
    keywords: ['financial statements', 'balance sheet', 'profit and loss', 'income statement', 'cash flow'],
    violation_severity: 'Critical',
    violation_description: 'Financial statements are incomplete or missing',
    violation_suggestion: 'Include complete audited financial statements: Balance Sheet, Profit & Loss Statement, Cash Flow Statement, and Statement of Changes in Equity.',
  },
  {
    regulation: 'SEBI LODR 2015', section_number: 'Regulation 34', section_title: 'Annual Report',
    category: 'Annual Disclosure', requirement: 'Management Discussion & Analysis section must be included',
    keywords: ['management discussion', 'md&a'], violation_severity: 'High',
    violation_description: 'Management Discussion & Analysis section is missing',
    violation_suggestion: 'Add an MD&A section covering: (1) Operations overview, (2) Revenue and expense analysis, (3) Liquidity and capital resources, (4) Known trends and uncertainties.',
  },
  {
    regulation: 'SEBI LODR 2015', section_number: 'Regulation 27', section_title: 'Corporate Governance Compliance',
    category: 'Corporate Governance', requirement: 'Corporate governance report must be included in annual report',
    keywords: ['corporate governance'], violation_severity: 'High',
    violation_description: 'Corporate Governance report is missing',
    violation_suggestion: 'Include a Corporate Governance report with: (1) Board composition, (2) Committee details, (3) Meeting attendance records, (4) Related party disclosures.',
  },
  {
    regulation: 'SEBI LODR 2015', section_number: 'Regulation 17', section_title: 'Board of Directors Composition',
    category: 'Corporate Governance', requirement: 'Board composition details must be disclosed',
    keywords: ['board of directors', 'independent director'], violation_severity: 'High',
    violation_description: 'Board of Directors composition details are missing',
    violation_suggestion: 'Disclose full board composition including: names, designations, DIN, category, committee memberships, and number of other directorships.',
  },
  {
    regulation: 'SEC Form 10-K', section_number: 'Item 1A', section_title: 'Risk Factors',
    category: 'Risk Disclosure', requirement: 'Document must include a dedicated risk factors section',
    keywords: ['risk factors', 'risk management'], violation_severity: 'Critical',
    violation_description: 'Risk Factors section is completely missing from the document',
    violation_suggestion: 'Add a Risk Factors section organized by: company risks, industry risks, and securities risks. Each risk should describe potential impact.',
  },
  {
    regulation: 'SEC Form 10-K', section_number: 'Item 7', section_title: 'MD&A',
    category: 'Financial Analysis', requirement: 'Management Discussion & Analysis section must be included',
    keywords: ['management discussion', 'md&a'], violation_severity: 'High',
    violation_description: 'Management Discussion & Analysis section is missing',
    violation_suggestion: 'Furnish MD&A covering results of operations, liquidity, capital resources, off-balance sheet arrangements, and contractual obligations.',
  },
  {
    regulation: 'SEC Form 10-K', section_number: 'Item 8', section_title: 'Financial Statements',
    category: 'Financial Statements', requirement: 'Financial statements must include balance sheet, P&L, and cash flow',
    keywords: ['financial statements', 'balance sheet', 'income statement', 'cash flow'], violation_severity: 'Critical',
    violation_description: 'Financial statements are incomplete or missing',
    violation_suggestion: 'Include audited financial statements with independent auditor report, balance sheet, income statement, cash flow statement, and stockholders equity statement.',
  },
  {
    regulation: 'SEC Form 10-K', section_number: 'Item 9A', section_title: 'Controls and Procedures',
    category: 'Internal Controls', requirement: 'Internal controls and audit report must be included',
    keywords: ['internal controls', 'disclosure controls', 'audit committee'], violation_severity: 'Critical',
    violation_description: 'Internal controls and procedures disclosure is missing',
    violation_suggestion: 'Add a section on Internal Controls covering: management assessment of ICFR effectiveness, auditor report, material weaknesses, and remediation plans.',
  },
  {
    regulation: 'SEC Form 10-K', section_number: 'Item 1', section_title: 'Business Description',
    category: 'Business Overview', requirement: 'Business description and principal activities must be included',
    keywords: ['revenue'], violation_severity: 'High',
    violation_description: 'Business description is missing or incomplete',
    violation_suggestion: 'Provide a comprehensive business overview covering: principal products/services, revenue segments, competitive landscape, key customers, and government regulations.',
  },
  {
    regulation: 'SEC Form 10-K', section_number: 'Item 3', section_title: 'Legal Proceedings',
    category: 'Legal', requirement: 'Legal proceedings must be disclosed',
    keywords: ['legal proceedings'], violation_severity: 'Medium',
    violation_description: 'Legal proceedings disclosure is missing or inadequate',
    violation_suggestion: 'Disclose all material pending legal proceedings including: court name, date instituted, principal parties, factual basis, and potential financial impact.',
  },
  {
    regulation: 'SEC Form 10-K', section_number: 'Item 11', section_title: 'Executive Compensation',
    category: 'Compensation', requirement: 'Executive compensation details must be disclosed',
    keywords: ['executive compensation'], violation_severity: 'Medium',
    violation_description: 'Executive compensation disclosure is missing',
    violation_suggestion: 'Include detailed executive compensation data: salary, bonus, stock awards, option awards, non-equity incentive, deferred compensation, and total per named executive officer.',
  },
  {
    regulation: 'SEBI LODR 2015', section_number: 'Regulation 46', section_title: 'Website Disclosures',
    category: 'Disclosure', requirement: 'Related party transaction policy must be disclosed',
    keywords: ['related party'], violation_severity: 'High',
    violation_description: 'Related party transaction disclosures are missing',
    violation_suggestion: 'Include full related party transaction policy and disclose all material transactions with related parties.',
  },
];

/**
 * Check if Neo4j is available.
 */
async function isNeo4jAvailable() {
  try {
    await driver.getServerInfo();
    return true;
  } catch {
    return false;
  }
}

/**
 * Get all regulations, optionally filtered by document type.
 */
async function getRegulations(docType = null) {
  if (!(await isNeo4jAvailable())) {
    return MOCK_REGULATIONS;
  }

  let query, params;
  if (docType) {
    query = `
      MATCH (r:Regulation)-[:APPLIES_TO]->(dt:DocumentType {name: $docType})
      RETURN r.id AS id, r.name AS name, r.full_name AS full_name,
             r.jurisdiction AS jurisdiction, r.authority AS authority
    `;
    params = { docType };
  } else {
    query = `
      MATCH (r:Regulation)
      RETURN r.id AS id, r.name AS name, r.full_name AS full_name,
             r.jurisdiction AS jurisdiction, r.authority AS authority
    `;
    params = {};
  }

  const result = await driver.executeQuery(query, params, dbConfig);
  return result.records.map(r => ({
    id: r.get('id'),
    name: r.get('name'),
    full_name: r.get('full_name'),
    jurisdiction: r.get('jurisdiction'),
    authority: r.get('authority'),
  }));
}

/**
 * Get all compliance rules for a document type.
 * This is the core query for the compliance engine.
 */
async function getComplianceRules(docType) {
  if (!(await isNeo4jAvailable())) {
    // Filter mock rules by document type mapping
    const docTypeMap = {
      'Annual Report': ['SEBI LODR 2015', 'SEC Form 10-K'],
      '10-K Filing': ['SEC Form 10-K'],
      '10-Q Filing': ['SEC Form 10-K'],
      'Quarterly Report': ['SEBI LODR 2015'],
      'IPO Prospectus': ['SEBI ICDR 2018'],
      'Corporate Governance Report': ['SEBI LODR 2015'],
    };
    const applicableRegs = docTypeMap[docType] || ['SEBI LODR 2015', 'SEC Form 10-K'];
    return MOCK_COMPLIANCE_RULES.filter(r => applicableRegs.includes(r.regulation));
  }

  const query = `
    MATCH (r:Regulation)-[:APPLIES_TO]->(dt:DocumentType {name: $docType})
    MATCH (r)-[:HAS_SECTION]->(s:Section {mandatory: true})
    MATCH (s)-[:REQUIRES]->(req:Requirement)
    OPTIONAL MATCH (req)-[:HAS_KEYWORD]->(k:Keyword)
    OPTIONAL MATCH (s)-[:LEADS_TO_VIOLATION]->(v:Violation)
    RETURN r.name AS regulation,
           s.regulation_number AS section_number,
           s.title AS section_title,
           s.category AS category,
           req.description AS requirement,
           collect(DISTINCT k.term) AS keywords,
           v.severity AS violation_severity,
           v.description AS violation_description,
           v.suggestion AS violation_suggestion
    ORDER BY v.severity DESC, r.name
  `;

  const result = await driver.executeQuery(query, { docType }, dbConfig);
  return result.records.map(r => ({
    regulation: r.get('regulation'),
    section_number: r.get('section_number'),
    section_title: r.get('section_title'),
    category: r.get('category'),
    requirement: r.get('requirement'),
    keywords: r.get('keywords'),
    violation_severity: r.get('violation_severity'),
    violation_description: r.get('violation_description'),
    violation_suggestion: r.get('violation_suggestion'),
  }));
}

/**
 * Get dashboard statistics.
 */
async function getStats() {
  if (!(await isNeo4jAvailable())) {
    return {
      total_regulations: 3,
      total_sections: 19,
      total_requirements: 12,
      total_violations: 12,
    };
  }

  const query = `
    MATCH (r:Regulation) WITH count(r) AS regs
    MATCH (s:Section) WITH regs, count(s) AS secs
    MATCH (req:Requirement) WITH regs, secs, count(req) AS reqs
    MATCH (v:Violation) WITH regs, secs, reqs, count(v) AS viols
    RETURN regs, secs, reqs, viols
  `;

  const result = await driver.executeQuery(query, {}, dbConfig);
  const record = result.records[0];
  return {
    total_regulations: record.get('regs').toNumber(),
    total_sections: record.get('secs').toNumber(),
    total_requirements: record.get('reqs').toNumber(),
    total_violations: record.get('viols').toNumber(),
  };
}

module.exports = {
  getRegulations,
  getComplianceRules,
  getStats,
  isNeo4jAvailable,
};
