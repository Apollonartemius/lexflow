/**
 * LexFlow Backend — Document Routes
 * Handles document upload, listing, and analysis triggering.
 */
const express = require('express');
const multer = require('multer');
const { authMiddleware } = require('../middleware/auth');
const nlpBridge = require('../services/nlpBridgeService');
const complianceEngine = require('../services/complianceEngine');

const router = express.Router();

// Configure multer for file uploads (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
});

// In-memory store for development (replace with Supabase Postgres in production)
const documents = new Map();
let docCounter = 0;

/**
 * POST /api/documents/upload
 * Upload a document and trigger analysis.
 */
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded. Please upload a PDF file.' });
    }

    const docId = `DOC-${String(++docCounter).padStart(4, '0')}`;
    const now = new Date().toISOString();

    // Create document record
    const doc = {
      id: docId,
      filename: req.file.originalname,
      size: req.file.size,
      mime_type: req.file.mimetype,
      uploaded_by: req.user.id,
      uploaded_at: now,
      status: 'processing',
      analysis: null,
      compliance: null,
    };

    documents.set(docId, doc);

    // Process asynchronously
    processDocumentAsync(docId, req.file.buffer, req.file.originalname);

    res.status(201).json({
      message: 'Document uploaded successfully. Analysis in progress.',
      document: {
        id: doc.id,
        filename: doc.filename,
        size: doc.size,
        status: doc.status,
        uploaded_at: doc.uploaded_at,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload document', details: error.message });
  }
});

/**
 * GET /api/documents
 * List all documents for the authenticated user.
 */
router.get('/', authMiddleware, (req, res) => {
  const userDocs = Array.from(documents.values())
    .filter(d => d.uploaded_by === req.user.id)
    .map(d => ({
      id: d.id,
      filename: d.filename,
      size: d.size,
      status: d.status,
      uploaded_at: d.uploaded_at,
      compliance_score: d.compliance?.compliance_score ?? null,
      document_type: d.compliance?.document_type ?? null,
      issues_count: d.compliance?.rules_failed ?? 0,
    }))
    .sort((a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at));

  res.json({ documents: userDocs, total: userDocs.length });
});

/**
 * GET /api/documents/:id
 * Get full document details including analysis results.
 */
router.get('/:id', authMiddleware, (req, res) => {
  const doc = documents.get(req.params.id);
  if (!doc) {
    return res.status(404).json({ error: 'Document not found' });
  }

  res.json({
    document: {
      id: doc.id,
      filename: doc.filename,
      size: doc.size,
      status: doc.status,
      uploaded_at: doc.uploaded_at,
      uploaded_by: doc.uploaded_by,
    },
    analysis: doc.analysis ? {
      page_count: doc.analysis.page_count,
      word_count: doc.analysis.word_count,
      detected_doc_type: doc.analysis.detected_doc_type,
      entities_count: doc.analysis.entities?.length || 0,
      sections_count: doc.analysis.sections?.length || 0,
      keywords_count: doc.analysis.keywords?.length || 0,
      sections: doc.analysis.sections?.map(s => ({ title: s.title, level: s.level })),
      processing_time_ms: doc.analysis.processing_time_ms,
    } : null,
    compliance: doc.compliance,
  });
});

/**
 * POST /api/documents/:id/reanalyze
 * Re-run analysis on an existing document.
 */
router.post('/:id/reanalyze', authMiddleware, (req, res) => {
  const doc = documents.get(req.params.id);
  if (!doc) {
    return res.status(404).json({ error: 'Document not found' });
  }

  doc.status = 'processing';
  doc.analysis = null;
  doc.compliance = null;

  res.json({ message: 'Re-analysis triggered', document_id: doc.id });
});

/**
 * Background document processing.
 */
async function processDocumentAsync(docId, fileBuffer, filename) {
  const doc = documents.get(docId);
  if (!doc) return;

  try {
    // Step 1: NLP Processing
    console.log(`📄 Processing document: ${filename}`);
    const nlpResult = await nlpBridge.processDocument(fileBuffer, filename);
    doc.analysis = nlpResult;

    // Step 2: Compliance Analysis
    console.log(`🔍 Running compliance check on: ${filename}`);
    const complianceResult = await complianceEngine.analyzeCompliance(nlpResult);
    doc.compliance = complianceResult;

    doc.status = 'completed';
    console.log(`✅ Analysis complete for ${filename}: Score ${complianceResult.compliance_score}%`);
  } catch (error) {
    console.error(`❌ Analysis failed for ${filename}:`, error.message);
    global.latestDocError = `${filename}: ${error.message} \n ${error.stack}`;
    doc.status = 'error';
    doc.error = error.message;
  }
}

module.exports = router;
