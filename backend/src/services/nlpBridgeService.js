/**
 * LexFlow Backend — NLP Bridge Service
 * Communicates with the Python NLP microservice.
 */
require('dotenv').config();

let nlpUrlConfig = process.env.NLP_SERVICE_URL || 'http://localhost:8000';
if (nlpUrlConfig && !nlpUrlConfig.startsWith('http')) {
  nlpUrlConfig = `https://${nlpUrlConfig}`;
}
const NLP_URL = nlpUrlConfig;

/**
 * Send a document to the NLP service for processing.
 * @param {Buffer} fileBuffer - The PDF file as a buffer
 * @param {string} filename - Original filename
 * @returns {Object} NLP processing results
 */
async function processDocument(fileBuffer, filename) {
  try {
    // Create FormData-like body for the NLP service
    const formData = new FormData();
    const blob = new Blob([fileBuffer], { type: 'application/pdf' });
    formData.append('file', blob, filename);

    const response = await fetch(`${NLP_URL}/process`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || `NLP service returned ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error.cause?.code === 'ECONNREFUSED') {
      console.warn('⚠️  NLP service not available. Returning mock NLP results.');
      return getMockNLPResult(filename);
    }
    throw error;
  }
}

/**
 * Check NLP service health.
 */
async function checkHealth() {
  try {
    const response = await fetch(`${NLP_URL}/health`);
    if (response.ok) {
      return await response.json();
    }
    return { status: 'unhealthy', error: `Status ${response.status}` };
  } catch {
    return { status: 'unavailable', error: 'NLP service not reachable' };
  }
}

/**
 * Mock NLP results when the Python service is not running.
 */
function getMockNLPResult(filename) {
  return {
    text: `[Mock NLP Result for ${filename}] — NLP service is not running. Start the Python service for real analysis.`,
    page_count: 0,
    word_count: 0,
    entities: [],
    sections: [
      { title: 'RISK FACTORS', content: 'Sample risk factors content...', start_index: 0, end_index: 100, level: 1 },
      { title: 'FINANCIAL STATEMENTS', content: 'Sample financial data...', start_index: 100, end_index: 200, level: 1 },
      { title: 'MANAGEMENT DISCUSSION AND ANALYSIS', content: 'Sample MD&A...', start_index: 200, end_index: 300, level: 1 },
    ],
    keywords: [
      { keyword: 'risk factors', count: 3, category: 'Risk', positions: [10, 50, 90] },
      { keyword: 'financial statements', count: 2, category: 'Financial', positions: [110, 150] },
      { keyword: 'management discussion', count: 1, category: 'Analysis', positions: [210] },
    ],
    detected_doc_type: 'Annual Report',
    processing_time_ms: 0,
    _mock: true,
  };
}

module.exports = { processDocument, checkHealth };
