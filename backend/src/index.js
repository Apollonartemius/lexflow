/**
 * LexFlow Backend — Express Entry Point
 * Main application server.
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import routes
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/documents');
const complianceRoutes = require('./routes/compliance');
const dashboardRoutes = require('./routes/dashboard');

// Import config
const { verifyConnection } = require('./config/db');

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

// ─── Middleware ───────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check allowed origins dynamically
    const allowed = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : [];
    if (allowed.includes(origin) || origin.includes('localhost') || origin.includes('vercel.app')) {
      return callback(null, true);
    }
    
    // Fallback allowing all for development/testing if no specific restrictions
    callback(null, true); 
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// ─── Routes ──────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/compliance', complianceRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ─── Health Check ────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'LexFlow Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health/debug', async (req, res) => {
  // Hack to expose latest document error for debugging
  global.latestDocError = global.latestDocError || 'None';
  const anonKey = process.env.SUPABASE_ANON_KEY || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const url = process.env.SUPABASE_URL || '';
  
  // Test Neo4j connection specifically to capture error
  let neo4jError = 'None';
  try {
    const neo4jService = require('./services/neo4jService');
    const db = require('./config/db');
    await db.driver.getServerInfo();
    neo4jError = 'Connected Successfully';
  } catch (err) {
    neo4jError = err.message || err.toString();
  }
  
  res.json({
    supabaseUrl: url,
    anonKey_length: anonKey.length,
    serviceKey_length: serviceKey.length,
    node_env: process.env.NODE_ENV,
    neo4jUri: process.env.NEO4J_URI || 'NOT_SET',
    neo4jUser: process.env.NEO4J_USER || 'NOT_SET',
    nlpUrl: process.env.NLP_SERVICE_URL || 'NOT_SET',
    neo4j_diagnostic_error: neo4jError,
    latest_doc_error: global.latestDocError
  });
});

// ─── Root ────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    name: 'LexFlow API',
    version: '1.0.0',
    description: 'Financial Document Compliance Engine',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      documents: '/api/documents',
      compliance: '/api/compliance',
      dashboard: '/api/dashboard',
    },
  });
});

// ─── Error Handler ───────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File too large. Maximum size is 50MB.' });
  }
  
  if (err.message === 'Only PDF files are allowed') {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

// ─── Start Server ────────────────────────────────────────
async function start() {
  console.log('');
  console.log('╔══════════════════════════════════════════╗');
  console.log('║         🧠 LexFlow Backend API          ║');
  console.log('║    Financial Document Compliance Engine   ║');
  console.log('╚══════════════════════════════════════════╝');
  console.log('');

  // Check Neo4j connection
  await verifyConnection();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API docs at http://localhost:${PORT}/`);
    console.log('');
  });
}

start();
