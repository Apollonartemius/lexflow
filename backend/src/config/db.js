/**
 * LexFlow Backend — Neo4j Database Connection
 * Manages connection to Neo4j graph database.
 */
const neo4j = require('neo4j-driver');
require('dotenv').config();

function cleanCredential(val) {
  if (!val) return val;
  return val.replace(/['"]/g, '').trim();
}

const driver = neo4j.driver(
  cleanCredential(process.env.NEO4J_URI) || 'bolt://localhost:7687',
  neo4j.auth.basic(
    cleanCredential(process.env.NEO4J_USER) || 'neo4j',
    cleanCredential(process.env.NEO4J_PASSWORD) || 'lexflow_dev_password'
  )
);

/**
 * Verify the Neo4j connection is working.
 */
async function verifyConnection() {
  try {
    const serverInfo = await driver.getServerInfo();
    console.log('✅ Neo4j connected:', serverInfo.address);
    return true;
  } catch (error) {
    console.warn('⚠️  Neo4j not available:', error.message);
    console.warn('   App will run with mock data. Start Neo4j to enable graph queries.');
    return false;
  }
}

module.exports = { driver, verifyConnection };
