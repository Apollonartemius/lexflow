/**
 * LexFlow Backend — Compliance Routes
 * Provides compliance issue data and regulation information.
 */
const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const neo4jService = require('../services/neo4jService');

const router = express.Router();

/**
 * GET /api/compliance/regulations
 * List all regulations in the system.
 */
router.get('/regulations', authMiddleware, async (req, res) => {
  try {
    const docType = req.query.docType || null;
    const regulations = await neo4jService.getRegulations(docType);
    res.json({ regulations, total: regulations.length });
  } catch (error) {
    console.error('Failed to fetch regulations:', error);
    res.status(500).json({ error: 'Failed to fetch regulations' });
  }
});

/**
 * GET /api/compliance/rules
 * Get all compliance rules for a document type.
 */
router.get('/rules', authMiddleware, async (req, res) => {
  try {
    const docType = req.query.docType || 'Annual Report';
    const rules = await neo4jService.getComplianceRules(docType);
    res.json({ rules, total: rules.length, document_type: docType });
  } catch (error) {
    console.error('Failed to fetch rules:', error);
    res.status(500).json({ error: 'Failed to fetch compliance rules' });
  }
});

/**
 * GET /api/compliance/stats
 * Get compliance system statistics.
 */
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const stats = await neo4jService.getStats();
    res.json(stats);
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

module.exports = router;
