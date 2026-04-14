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
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
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
