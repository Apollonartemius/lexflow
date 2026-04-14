/**
 * LexFlow Backend — Dashboard Routes
 * Aggregated data for the frontend dashboard.
 */
const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const neo4jService = require('../services/neo4jService');
const nlpBridge = require('../services/nlpBridgeService');

const router = express.Router();

/**
 * GET /api/dashboard/stats
 * Returns aggregated statistics for the dashboard.
 */
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    // Get graph stats
    const graphStats = await neo4jService.getStats();

    // Get NLP service health
    const nlpHealth = await nlpBridge.checkHealth();

    // Get Neo4j status
    const neo4jAvailable = await neo4jService.isNeo4jAvailable();

    res.json({
      graph: graphStats,
      services: {
        neo4j: neo4jAvailable ? 'connected' : 'offline',
        nlp: nlpHealth.status,
        backend: 'running',
      },
      system: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        node_version: process.version,
      },
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

module.exports = router;
