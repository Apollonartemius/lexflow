// ============================================
// LEXFLOW — Regulations Seed Data
// ============================================
// Real-world SEBI & SEC regulation structures

// =============================================
// DOCUMENT TYPES
// =============================================
CREATE (dt1:DocumentType {id: "DT001", name: "Annual Report", description: "Yearly financial disclosure document"});
CREATE (dt2:DocumentType {id: "DT002", name: "Quarterly Report", description: "Quarterly financial results filing"});
CREATE (dt3:DocumentType {id: "DT003", name: "IPO Prospectus", description: "Initial Public Offering prospectus document"});
CREATE (dt4:DocumentType {id: "DT004", name: "10-K Filing", description: "SEC annual report filing"});
CREATE (dt5:DocumentType {id: "DT005", name: "10-Q Filing", description: "SEC quarterly report filing"});
CREATE (dt6:DocumentType {id: "DT006", name: "Corporate Governance Report", description: "Annual corporate governance disclosure"});

// =============================================
// REGULATION 1: SEBI LODR (Listing Obligations and Disclosure Requirements)
// SEBI/LODR/2015 — The primary Indian securities regulation
// =============================================
CREATE (reg1:Regulation {
  id: "REG001",
  name: "SEBI LODR 2015",
  full_name: "SEBI (Listing Obligations and Disclosure Requirements) Regulations, 2015",
  jurisdiction: "India",
  authority: "Securities and Exchange Board of India",
  version: "2023 Amendment",
  effective_date: "2015-12-01",
  source_url: "https://www.sebi.gov.in/legal/regulations/dec-2015/securities-and-exchange-board-of-india-listing-obligations-and-disclosure-requirements-regulations-2015-last-amended-on-june-14-2023-_34260.html"
});

// --- SEBI LODR Sections ---

// Regulation 27 — Corporate Governance
CREATE (s1:Section {
  id: "SEC001",
  regulation_id: "REG001",
  regulation_number: "Regulation 27",
  title: "Corporate Governance Compliance",
  text: "The listed entity shall submit a quarterly compliance report on corporate governance in the format specified by the Board.",
  mandatory: true,
  category: "Corporate Governance",
  schedule_ref: "Schedule V"
});

// Regulation 30 — Disclosure of Events
CREATE (s2:Section {
  id: "SEC002",
  regulation_id: "REG001",
  regulation_number: "Regulation 30",
  title: "Disclosure of Events or Information",
  text: "Every listed entity shall make disclosures of any events or information which, in the opinion of the board of directors of the listed entity, is material.",
  mandatory: true,
  category: "Disclosure",
  schedule_ref: "Schedule III Part A"
});

// Regulation 33 — Financial Results
CREATE (s3:Section {
  id: "SEC003",
  regulation_id: "REG001",
  regulation_number: "Regulation 33",
  title: "Financial Results",
  text: "The listed entity shall submit quarterly and year-to-date standalone financial results to the stock exchange within forty-five days of end of each quarter.",
  mandatory: true,
  category: "Financial Reporting",
  schedule_ref: "Schedule IV"
});

// Regulation 34 — Annual Report
CREATE (s4:Section {
  id: "SEC004",
  regulation_id: "REG001",
  regulation_number: "Regulation 34",
  title: "Annual Report",
  text: "The annual report shall contain disclosures as specified in Schedule V, including management discussion and analysis, corporate governance report, and business responsibility report.",
  mandatory: true,
  category: "Annual Disclosure",
  schedule_ref: "Schedule V"
});

// Regulation 17 — Board of Directors
CREATE (s5:Section {
  id: "SEC005",
  regulation_id: "REG001",
  regulation_number: "Regulation 17",
  title: "Board of Directors Composition",
  text: "The board of directors shall have an optimum combination of executive and non-executive directors with at least one woman director and not less than fifty per cent non-executive directors.",
  mandatory: true,
  category: "Corporate Governance",
  schedule_ref: "N/A"
});

// Regulation 21 — Risk Management
CREATE (s6:Section {
  id: "SEC006",
  regulation_id: "REG001",
  regulation_number: "Regulation 21",
  title: "Risk Management Committee",
  text: "The top 1000 listed entities shall constitute a Risk Management Committee which shall evaluate risk management systems and practices, including cyber security risks.",
  mandatory: true,
  category: "Risk Management",
  schedule_ref: "N/A"
});

// Regulation 32 — Statement of Deviation
CREATE (s7:Section {
  id: "SEC007",
  regulation_id: "REG001",
  regulation_number: "Regulation 32",
  title: "Statement of Deviation or Variation",
  text: "The listed entity shall submit to the stock exchange a statement of deviation or variation on a quarterly basis for funds raised through public issue, rights issue, preferential issue.",
  mandatory: true,
  category: "Financial Reporting",
  schedule_ref: "N/A"
});

// Regulation 46 — Website Disclosures
CREATE (s8:Section {
  id: "SEC008",
  regulation_id: "REG001",
  regulation_number: "Regulation 46",
  title: "Website Disclosures",
  text: "The listed entity shall maintain a functional website containing terms and conditions of appointment of independent directors, composition of various committees, contact information of designated officials, and policies on related party transactions.",
  mandatory: true,
  category: "Disclosure",
  schedule_ref: "N/A"
});

// =============================================
// REGULATION 2: SEC 10-K Requirements
// Securities Exchange Act of 1934, Form 10-K
// =============================================
CREATE (reg2:Regulation {
  id: "REG002",
  name: "SEC Form 10-K",
  full_name: "Annual Report Pursuant to Section 13 or 15(d) of the Securities Exchange Act of 1934",
  jurisdiction: "United States",
  authority: "U.S. Securities and Exchange Commission",
  version: "2024",
  effective_date: "1934-06-06",
  source_url: "https://www.sec.gov/files/form10-k.pdf"
});

// Item 1 — Business Description
CREATE (s9:Section {
  id: "SEC009",
  regulation_id: "REG002",
  regulation_number: "Item 1",
  title: "Business Description",
  text: "Describe the general development of the business, its subsidiaries, and any predecessor(s) during the past five fiscal years. Include the principal products or services, competitive conditions, dependence on key customers, and any government regulations affecting the business.",
  mandatory: true,
  category: "Business Overview",
  schedule_ref: "Regulation S-K Item 101"
});

// Item 1A — Risk Factors
CREATE (s10:Section {
  id: "SEC010",
  regulation_id: "REG002",
  regulation_number: "Item 1A",
  title: "Risk Factors",
  text: "Set forth the most significant factors that make the offering speculative or risky. Explain how each risk affects the registrant. Risks should be organized logically under relevant headings and must include risks related to the company, industry, and securities.",
  mandatory: true,
  category: "Risk Disclosure",
  schedule_ref: "Regulation S-K Item 105"
});

// Item 2 — Properties
CREATE (s11:Section {
  id: "SEC011",
  regulation_id: "REG002",
  regulation_number: "Item 2",
  title: "Properties",
  text: "Furnish the location and general character of the principal plants, mines and other materially important physical properties of the registrant and its subsidiaries.",
  mandatory: true,
  category: "Asset Disclosure",
  schedule_ref: "Regulation S-K Item 102"
});

// Item 3 — Legal Proceedings
CREATE (s12:Section {
  id: "SEC012",
  regulation_id: "REG002",
  regulation_number: "Item 3",
  title: "Legal Proceedings",
  text: "Briefly describe any material pending legal proceedings, other than ordinary routine litigation incidental to the business. Include the name of the court, the date instituted, the principal parties, and a description of the factual basis.",
  mandatory: true,
  category: "Legal",
  schedule_ref: "Regulation S-K Item 103"
});

// Item 7 — MD&A
CREATE (s13:Section {
  id: "SEC013",
  regulation_id: "REG002",
  regulation_number: "Item 7",
  title: "Management Discussion and Analysis of Financial Condition and Results of Operations",
  text: "Furnish information required by Item 303 of Regulation S-K. Discuss results of operations, liquidity, capital resources, off-balance sheet arrangements, and contractual obligations. Include known trends, events, and uncertainties that may affect future operations.",
  mandatory: true,
  category: "Financial Analysis",
  schedule_ref: "Regulation S-K Item 303"
});

// Item 8 — Financial Statements
CREATE (s14:Section {
  id: "SEC014",
  regulation_id: "REG002",
  regulation_number: "Item 8",
  title: "Financial Statements and Supplementary Data",
  text: "Furnish financial statements meeting the requirements of Regulation S-X, including balance sheet, income statement, cash flow statement, and statement of stockholders equity, together with the report of an independent registered public accounting firm.",
  mandatory: true,
  category: "Financial Statements",
  schedule_ref: "Regulation S-X"
});

// Item 9A — Controls and Procedures
CREATE (s15:Section {
  id: "SEC015",
  regulation_id: "REG002",
  regulation_number: "Item 9A",
  title: "Controls and Procedures",
  text: "Disclose conclusions of the principal executive and principal financial officer regarding the effectiveness of disclosure controls and procedures. Include management assessment of internal control over financial reporting under SOX Section 404.",
  mandatory: true,
  category: "Internal Controls",
  schedule_ref: "SOX Section 302, 404"
});

// Item 11 — Executive Compensation
CREATE (s16:Section {
  id: "SEC016",
  regulation_id: "REG002",
  regulation_number: "Item 11",
  title: "Executive Compensation",
  text: "Furnish the information required by Items 402 and 407(e)(4) and (5) of Regulation S-K regarding compensation of directors and executive officers.",
  mandatory: true,
  category: "Compensation",
  schedule_ref: "Regulation S-K Item 402"
});

// =============================================
// REGULATION 3: SEBI ICDR (Issue of Capital and Disclosure Requirements)
// =============================================
CREATE (reg3:Regulation {
  id: "REG003",
  name: "SEBI ICDR 2018",
  full_name: "SEBI (Issue of Capital and Disclosure Requirements) Regulations, 2018",
  jurisdiction: "India",
  authority: "Securities and Exchange Board of India",
  version: "2023 Amendment",
  effective_date: "2018-11-11",
  source_url: "https://www.sebi.gov.in/legal/regulations/nov-2018/securities-and-exchange-board-of-india-issue-of-capital-and-disclosure-requirements-regulations-2018_40929.html"
});

// Regulation 26 — Prospectus Contents
CREATE (s17:Section {
  id: "SEC017",
  regulation_id: "REG003",
  regulation_number: "Regulation 26",
  title: "Contents of Offer Document",
  text: "The offer document shall contain all material disclosures which are true, correct, and adequate so as to enable the applicants to take an informed investment decision, including risk factors, financial information, objects of the issue, and basis for issue price.",
  mandatory: true,
  category: "IPO Disclosure",
  schedule_ref: "Schedule VI"
});

// Risk Factors in Prospectus
CREATE (s18:Section {
  id: "SEC018",
  regulation_id: "REG003",
  regulation_number: "Regulation 26(1)(a)",
  title: "Risk Factors in Prospectus",
  text: "The risk factors shall appear on the cover page and shall include internal risks, external risks, risks related to the issue, risks incidental to the industry, and risk factor mitigation strategies.",
  mandatory: true,
  category: "Risk Disclosure",
  schedule_ref: "Schedule VI Part A"
});

// Financial Information
CREATE (s19:Section {
  id: "SEC019",
  regulation_id: "REG003",
  regulation_number: "Regulation 26(1)(b)",
  title: "Financial Information in Prospectus",
  text: "The offer document shall contain restated financial statements for the last five completed financial years, audited by the statutory auditors, including balance sheet, profit and loss statement, cash flow statement, and related schedules and notes.",
  mandatory: true,
  category: "Financial Statements",
  schedule_ref: "Schedule VI Part B"
});

// =============================================
// REQUIREMENTS (linked to sections)
// =============================================

// Risk disclosure requirements
CREATE (req1:Requirement {id: "REQ001", type: "Mandatory", description: "Document must include a dedicated risk factors section", penalty_description: "Non-compliance may attract penalties under SEBI Act Section 15A/SEC Exchange Act Section 32"});
CREATE (req2:Requirement {id: "REQ002", type: "Mandatory", description: "Risk factors must be categorized (internal, external, industry-specific)", penalty_description: "Inadequate risk disclosure may result in regulatory action"});
CREATE (req3:Requirement {id: "REQ003", type: "Mandatory", description: "Financial statements must include balance sheet, P&L, and cash flow", penalty_description: "Incomplete financials may result in filing rejection or show-cause notice"});
CREATE (req4:Requirement {id: "REQ004", type: "Mandatory", description: "Management Discussion & Analysis section must be included", penalty_description: "Missing MDA may attract penalty under LODR Regulation 52"});
CREATE (req5:Requirement {id: "REQ005", type: "Mandatory", description: "Corporate governance report must be included in annual report", penalty_description: "Fine up to INR 25 lakhs under SEBI regulations"});
CREATE (req6:Requirement {id: "REQ006", type: "Mandatory", description: "Board composition details must be disclosed", penalty_description: "Non-compliance with board composition is a listed entity violation"});
CREATE (req7:Requirement {id: "REQ007", type: "Mandatory", description: "Internal controls and audit report must be included", penalty_description: "SOX Section 404 non-compliance may attract SEC enforcement"});
CREATE (req8:Requirement {id: "REQ008", type: "Mandatory", description: "Legal proceedings must be disclosed", penalty_description: "Material omission of legal proceedings is a securities fraud risk"});
CREATE (req9:Requirement {id: "REQ009", type: "Mandatory", description: "Executive compensation details must be disclosed", penalty_description: "SEC Proxy Rule violations may result in enforcement action"});
CREATE (req10:Requirement {id: "REQ010", type: "Mandatory", description: "Business description and principal activities must be included", penalty_description: "Incomplete business overview may result in comment letter from SEC"});
CREATE (req11:Requirement {id: "REQ011", type: "Mandatory", description: "Risk management committee details must be disclosed", penalty_description: "Penalty under SEBI LODR for top listed entities"});
CREATE (req12:Requirement {id: "REQ012", type: "Mandatory", description: "Related party transaction policy must be disclosed", penalty_description: "Non-disclosure is a corporate governance violation"});

// =============================================
// VIOLATIONS (what happens when rules are broken)
// =============================================
CREATE (v1:Violation {id: "VIO001", type: "Missing Section", severity: "Critical", description: "Risk Factors section is completely missing from the document", suggestion: "Add a dedicated 'Risk Factors' section covering: (1) Company-specific risks, (2) Industry risks, (3) Market risks, (4) Regulatory risks, and (5) Operational risks. Each risk should describe the potential impact and any mitigation measures."});
CREATE (v2:Violation {id: "VIO002", type: "Missing Section", severity: "Critical", description: "Financial statements are incomplete or missing", suggestion: "Include complete audited financial statements: Balance Sheet, Profit & Loss Statement, Cash Flow Statement, and Statement of Changes in Equity. Ensure all statements cover the required reporting period with comparative figures."});
CREATE (v3:Violation {id: "VIO003", type: "Missing Section", severity: "High", description: "Management Discussion & Analysis section is missing", suggestion: "Add an MD&A section covering: (1) Operations overview, (2) Revenue and expense analysis, (3) Liquidity and capital resources, (4) Known trends and uncertainties, (5) Off-balance sheet arrangements."});
CREATE (v4:Violation {id: "VIO004", type: "Missing Section", severity: "High", description: "Corporate Governance report is missing", suggestion: "Include a Corporate Governance report with: (1) Board composition, (2) Committee details (Audit, Nomination, Remuneration, Risk), (3) Meeting attendance records, (4) Related party disclosures."});
CREATE (v5:Violation {id: "VIO005", type: "Insufficient Detail", severity: "Medium", description: "Risk factors are listed but not adequately categorized", suggestion: "Reorganize risk factors under clear categories: Internal Risks, External Risks, Financial Risks, Operational Risks, and Regulatory Risks. Each risk should explain the potential impact on business operations."});
CREATE (v6:Violation {id: "VIO006", type: "Missing Section", severity: "High", description: "Board of Directors composition details are missing", suggestion: "Disclose full board composition including: names, designations, DIN, category (executive/non-executive/independent), committee memberships, and number of other directorships."});
CREATE (v7:Violation {id: "VIO007", type: "Missing Section", severity: "Critical", description: "Internal controls and procedures disclosure is missing", suggestion: "Add a section on Internal Controls covering: (1) Management's assessment of ICFR effectiveness, (2) Auditor's report on internal controls, (3) Material weaknesses identified, (4) Remediation plans."});
CREATE (v8:Violation {id: "VIO008", type: "Missing Section", severity: "Medium", description: "Legal proceedings disclosure is missing or inadequate", suggestion: "Disclose all material pending legal proceedings including: court name, date instituted, principal parties, factual basis, and potential financial impact."});
CREATE (v9:Violation {id: "VIO009", type: "Missing Section", severity: "Medium", description: "Executive compensation disclosure is missing", suggestion: "Include detailed executive compensation data covering: salary, bonus, stock awards, option awards, non-equity incentive, deferred compensation, and total for each named executive officer."});
CREATE (v10:Violation {id: "VIO010", type: "Missing Section", severity: "High", description: "Business description is missing or incomplete", suggestion: "Provide a comprehensive business overview covering: principal products/services, revenue segments, competitive landscape, key customers, government regulations, and R&D activities."});
CREATE (v11:Violation {id: "VIO011", type: "Missing Section", severity: "Medium", description: "Risk management committee disclosure is missing", suggestion: "Disclose Risk Management Committee composition, terms of reference, meetings held, and key risk areas identified and monitored."});
CREATE (v12:Violation {id: "VIO012", type: "Missing Disclosure", severity: "High", description: "Related party transaction disclosures are missing", suggestion: "Include full related party transaction policy and disclose all material transactions with related parties including nature, value, and terms."});

// =============================================
// KEYWORDS (for matching document content)
// =============================================
CREATE (k1:Keyword {id: "KW001", term: "risk factors", category: "Risk"});
CREATE (k2:Keyword {id: "KW002", term: "risk management", category: "Risk"});
CREATE (k3:Keyword {id: "KW003", term: "financial statements", category: "Financial"});
CREATE (k4:Keyword {id: "KW004", term: "balance sheet", category: "Financial"});
CREATE (k5:Keyword {id: "KW005", term: "profit and loss", category: "Financial"});
CREATE (k6:Keyword {id: "KW006", term: "income statement", category: "Financial"});
CREATE (k7:Keyword {id: "KW007", term: "cash flow", category: "Financial"});
CREATE (k8:Keyword {id: "KW008", term: "management discussion", category: "Analysis"});
CREATE (k9:Keyword {id: "KW009", term: "corporate governance", category: "Governance"});
CREATE (k10:Keyword {id: "KW010", term: "board of directors", category: "Governance"});
CREATE (k11:Keyword {id: "KW011", term: "audit committee", category: "Governance"});
CREATE (k12:Keyword {id: "KW012", term: "internal controls", category: "Controls"});
CREATE (k13:Keyword {id: "KW013", term: "legal proceedings", category: "Legal"});
CREATE (k14:Keyword {id: "KW014", term: "executive compensation", category: "Compensation"});
CREATE (k15:Keyword {id: "KW015", term: "related party", category: "Governance"});
CREATE (k16:Keyword {id: "KW016", term: "independent director", category: "Governance"});
CREATE (k17:Keyword {id: "KW017", term: "disclosure", category: "Disclosure"});
CREATE (k18:Keyword {id: "KW018", term: "prospectus", category: "IPO"});
CREATE (k19:Keyword {id: "KW019", term: "material events", category: "Disclosure"});
CREATE (k20:Keyword {id: "KW020", term: "revenue", category: "Financial"});
CREATE (k21:Keyword {id: "KW021", term: "net income", category: "Financial"});
CREATE (k22:Keyword {id: "KW022", term: "stockholders equity", category: "Financial"});
CREATE (k23:Keyword {id: "KW023", term: "off balance sheet", category: "Financial"});
CREATE (k24:Keyword {id: "KW024", term: "capital resources", category: "Financial"});
CREATE (k25:Keyword {id: "KW025", term: "liquidity", category: "Financial"});

// =============================================
// RELATIONSHIPS
// =============================================

// --- Regulation → Document Type ---
MATCH (r:Regulation {id: "REG001"}), (dt:DocumentType {id: "DT001"}) CREATE (r)-[:APPLIES_TO]->(dt);
MATCH (r:Regulation {id: "REG001"}), (dt:DocumentType {id: "DT002"}) CREATE (r)-[:APPLIES_TO]->(dt);
MATCH (r:Regulation {id: "REG001"}), (dt:DocumentType {id: "DT006"}) CREATE (r)-[:APPLIES_TO]->(dt);
MATCH (r:Regulation {id: "REG002"}), (dt:DocumentType {id: "DT004"}) CREATE (r)-[:APPLIES_TO]->(dt);
MATCH (r:Regulation {id: "REG002"}), (dt:DocumentType {id: "DT005"}) CREATE (r)-[:APPLIES_TO]->(dt);
MATCH (r:Regulation {id: "REG002"}), (dt:DocumentType {id: "DT001"}) CREATE (r)-[:APPLIES_TO]->(dt);
MATCH (r:Regulation {id: "REG003"}), (dt:DocumentType {id: "DT003"}) CREATE (r)-[:APPLIES_TO]->(dt);

// --- Regulation → Section ---
MATCH (r:Regulation {id: "REG001"}), (s:Section {id: "SEC001"}) CREATE (r)-[:HAS_SECTION]->(s);
MATCH (r:Regulation {id: "REG001"}), (s:Section {id: "SEC002"}) CREATE (r)-[:HAS_SECTION]->(s);
MATCH (r:Regulation {id: "REG001"}), (s:Section {id: "SEC003"}) CREATE (r)-[:HAS_SECTION]->(s);
MATCH (r:Regulation {id: "REG001"}), (s:Section {id: "SEC004"}) CREATE (r)-[:HAS_SECTION]->(s);
MATCH (r:Regulation {id: "REG001"}), (s:Section {id: "SEC005"}) CREATE (r)-[:HAS_SECTION]->(s);
MATCH (r:Regulation {id: "REG001"}), (s:Section {id: "SEC006"}) CREATE (r)-[:HAS_SECTION]->(s);
MATCH (r:Regulation {id: "REG001"}), (s:Section {id: "SEC007"}) CREATE (r)-[:HAS_SECTION]->(s);
MATCH (r:Regulation {id: "REG001"}), (s:Section {id: "SEC008"}) CREATE (r)-[:HAS_SECTION]->(s);
MATCH (r:Regulation {id: "REG002"}), (s:Section {id: "SEC009"}) CREATE (r)-[:HAS_SECTION]->(s);
MATCH (r:Regulation {id: "REG002"}), (s:Section {id: "SEC010"}) CREATE (r)-[:HAS_SECTION]->(s);
MATCH (r:Regulation {id: "REG002"}), (s:Section {id: "SEC011"}) CREATE (r)-[:HAS_SECTION]->(s);
MATCH (r:Regulation {id: "REG002"}), (s:Section {id: "SEC012"}) CREATE (r)-[:HAS_SECTION]->(s);
MATCH (r:Regulation {id: "REG002"}), (s:Section {id: "SEC013"}) CREATE (r)-[:HAS_SECTION]->(s);
MATCH (r:Regulation {id: "REG002"}), (s:Section {id: "SEC014"}) CREATE (r)-[:HAS_SECTION]->(s);
MATCH (r:Regulation {id: "REG002"}), (s:Section {id: "SEC015"}) CREATE (r)-[:HAS_SECTION]->(s);
MATCH (r:Regulation {id: "REG002"}), (s:Section {id: "SEC016"}) CREATE (r)-[:HAS_SECTION]->(s);
MATCH (r:Regulation {id: "REG003"}), (s:Section {id: "SEC017"}) CREATE (r)-[:HAS_SECTION]->(s);
MATCH (r:Regulation {id: "REG003"}), (s:Section {id: "SEC018"}) CREATE (r)-[:HAS_SECTION]->(s);
MATCH (r:Regulation {id: "REG003"}), (s:Section {id: "SEC019"}) CREATE (r)-[:HAS_SECTION]->(s);

// --- Section → Requirement ---
MATCH (s:Section {id: "SEC010"}), (req:Requirement {id: "REQ001"}) CREATE (s)-[:REQUIRES]->(req);
MATCH (s:Section {id: "SEC018"}), (req:Requirement {id: "REQ001"}) CREATE (s)-[:REQUIRES]->(req);
MATCH (s:Section {id: "SEC018"}), (req:Requirement {id: "REQ002"}) CREATE (s)-[:REQUIRES]->(req);
MATCH (s:Section {id: "SEC006"}), (req:Requirement {id: "REQ002"}) CREATE (s)-[:REQUIRES]->(req);
MATCH (s:Section {id: "SEC014"}), (req:Requirement {id: "REQ003"}) CREATE (s)-[:REQUIRES]->(req);
MATCH (s:Section {id: "SEC003"}), (req:Requirement {id: "REQ003"}) CREATE (s)-[:REQUIRES]->(req);
MATCH (s:Section {id: "SEC019"}), (req:Requirement {id: "REQ003"}) CREATE (s)-[:REQUIRES]->(req);
MATCH (s:Section {id: "SEC013"}), (req:Requirement {id: "REQ004"}) CREATE (s)-[:REQUIRES]->(req);
MATCH (s:Section {id: "SEC004"}), (req:Requirement {id: "REQ004"}) CREATE (s)-[:REQUIRES]->(req);
MATCH (s:Section {id: "SEC001"}), (req:Requirement {id: "REQ005"}) CREATE (s)-[:REQUIRES]->(req);
MATCH (s:Section {id: "SEC005"}), (req:Requirement {id: "REQ006"}) CREATE (s)-[:REQUIRES]->(req);
MATCH (s:Section {id: "SEC015"}), (req:Requirement {id: "REQ007"}) CREATE (s)-[:REQUIRES]->(req);
MATCH (s:Section {id: "SEC012"}), (req:Requirement {id: "REQ008"}) CREATE (s)-[:REQUIRES]->(req);
MATCH (s:Section {id: "SEC016"}), (req:Requirement {id: "REQ009"}) CREATE (s)-[:REQUIRES]->(req);
MATCH (s:Section {id: "SEC009"}), (req:Requirement {id: "REQ010"}) CREATE (s)-[:REQUIRES]->(req);
MATCH (s:Section {id: "SEC006"}), (req:Requirement {id: "REQ011"}) CREATE (s)-[:REQUIRES]->(req);
MATCH (s:Section {id: "SEC008"}), (req:Requirement {id: "REQ012"}) CREATE (s)-[:REQUIRES]->(req);

// --- Section → Violation (what happens when missing) ---
MATCH (s:Section {id: "SEC010"}), (v:Violation {id: "VIO001"}) CREATE (s)-[:LEADS_TO_VIOLATION]->(v);
MATCH (s:Section {id: "SEC018"}), (v:Violation {id: "VIO001"}) CREATE (s)-[:LEADS_TO_VIOLATION]->(v);
MATCH (s:Section {id: "SEC014"}), (v:Violation {id: "VIO002"}) CREATE (s)-[:LEADS_TO_VIOLATION]->(v);
MATCH (s:Section {id: "SEC003"}), (v:Violation {id: "VIO002"}) CREATE (s)-[:LEADS_TO_VIOLATION]->(v);
MATCH (s:Section {id: "SEC019"}), (v:Violation {id: "VIO002"}) CREATE (s)-[:LEADS_TO_VIOLATION]->(v);
MATCH (s:Section {id: "SEC013"}), (v:Violation {id: "VIO003"}) CREATE (s)-[:LEADS_TO_VIOLATION]->(v);
MATCH (s:Section {id: "SEC004"}), (v:Violation {id: "VIO003"}) CREATE (s)-[:LEADS_TO_VIOLATION]->(v);
MATCH (s:Section {id: "SEC001"}), (v:Violation {id: "VIO004"}) CREATE (s)-[:LEADS_TO_VIOLATION]->(v);
MATCH (s:Section {id: "SEC006"}), (v:Violation {id: "VIO005"}) CREATE (s)-[:LEADS_TO_VIOLATION]->(v);
MATCH (s:Section {id: "SEC005"}), (v:Violation {id: "VIO006"}) CREATE (s)-[:LEADS_TO_VIOLATION]->(v);
MATCH (s:Section {id: "SEC015"}), (v:Violation {id: "VIO007"}) CREATE (s)-[:LEADS_TO_VIOLATION]->(v);
MATCH (s:Section {id: "SEC012"}), (v:Violation {id: "VIO008"}) CREATE (s)-[:LEADS_TO_VIOLATION]->(v);
MATCH (s:Section {id: "SEC016"}), (v:Violation {id: "VIO009"}) CREATE (s)-[:LEADS_TO_VIOLATION]->(v);
MATCH (s:Section {id: "SEC009"}), (v:Violation {id: "VIO010"}) CREATE (s)-[:LEADS_TO_VIOLATION]->(v);
MATCH (s:Section {id: "SEC006"}), (v:Violation {id: "VIO011"}) CREATE (s)-[:LEADS_TO_VIOLATION]->(v);
MATCH (s:Section {id: "SEC008"}), (v:Violation {id: "VIO012"}) CREATE (s)-[:LEADS_TO_VIOLATION]->(v);

// --- Requirement → Keyword ---
MATCH (req:Requirement {id: "REQ001"}), (k:Keyword {id: "KW001"}) CREATE (req)-[:HAS_KEYWORD]->(k);
MATCH (req:Requirement {id: "REQ001"}), (k:Keyword {id: "KW002"}) CREATE (req)-[:HAS_KEYWORD]->(k);
MATCH (req:Requirement {id: "REQ002"}), (k:Keyword {id: "KW001"}) CREATE (req)-[:HAS_KEYWORD]->(k);
MATCH (req:Requirement {id: "REQ002"}), (k:Keyword {id: "KW002"}) CREATE (req)-[:HAS_KEYWORD]->(k);
MATCH (req:Requirement {id: "REQ003"}), (k:Keyword {id: "KW003"}) CREATE (req)-[:HAS_KEYWORD]->(k);
MATCH (req:Requirement {id: "REQ003"}), (k:Keyword {id: "KW004"}) CREATE (req)-[:HAS_KEYWORD]->(k);
MATCH (req:Requirement {id: "REQ003"}), (k:Keyword {id: "KW005"}) CREATE (req)-[:HAS_KEYWORD]->(k);
MATCH (req:Requirement {id: "REQ003"}), (k:Keyword {id: "KW006"}) CREATE (req)-[:HAS_KEYWORD]->(k);
MATCH (req:Requirement {id: "REQ003"}), (k:Keyword {id: "KW007"}) CREATE (req)-[:HAS_KEYWORD]->(k);
MATCH (req:Requirement {id: "REQ004"}), (k:Keyword {id: "KW008"}) CREATE (req)-[:HAS_KEYWORD]->(k);
MATCH (req:Requirement {id: "REQ005"}), (k:Keyword {id: "KW009"}) CREATE (req)-[:HAS_KEYWORD]->(k);
MATCH (req:Requirement {id: "REQ006"}), (k:Keyword {id: "KW010"}) CREATE (req)-[:HAS_KEYWORD]->(k);
MATCH (req:Requirement {id: "REQ006"}), (k:Keyword {id: "KW016"}) CREATE (req)-[:HAS_KEYWORD]->(k);
MATCH (req:Requirement {id: "REQ007"}), (k:Keyword {id: "KW012"}) CREATE (req)-[:HAS_KEYWORD]->(k);
MATCH (req:Requirement {id: "REQ007"}), (k:Keyword {id: "KW011"}) CREATE (req)-[:HAS_KEYWORD]->(k);
MATCH (req:Requirement {id: "REQ008"}), (k:Keyword {id: "KW013"}) CREATE (req)-[:HAS_KEYWORD]->(k);
MATCH (req:Requirement {id: "REQ009"}), (k:Keyword {id: "KW014"}) CREATE (req)-[:HAS_KEYWORD]->(k);
MATCH (req:Requirement {id: "REQ010"}), (k:Keyword {id: "KW020"}) CREATE (req)-[:HAS_KEYWORD]->(k);
MATCH (req:Requirement {id: "REQ011"}), (k:Keyword {id: "KW002"}) CREATE (req)-[:HAS_KEYWORD]->(k);
MATCH (req:Requirement {id: "REQ012"}), (k:Keyword {id: "KW015"}) CREATE (req)-[:HAS_KEYWORD]->(k);
