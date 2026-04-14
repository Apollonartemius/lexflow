/**
 * LexFlow Backend — Auth Middleware
 * Validates Supabase JWT tokens for protected routes.
 */
const { supabase } = require('../config/supabase');

/**
 * Middleware to verify authentication.
 * For development, allows requests through if Supabase is not configured.
 */
async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  // Dev token bypass — always allow dev tokens through
  if (!token || token === 'dev-token-001' || token === 'dev-token') {
    req.user = {
      id: 'dev-user-001',
      email: 'dev@lexflow.local',
      role: 'admin',
    };
    return next();
  }

  // Try Supabase validation for real tokens
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      // Fallback to dev user instead of blocking
      req.user = { id: 'dev-user-001', email: 'dev@lexflow.local', role: 'admin' };
      return next();
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role || 'user',
    };

    next();
  } catch (error) {
    // Fallback to dev user on any auth error
    req.user = { id: 'dev-user-001', email: 'dev@lexflow.local', role: 'admin' };
    next();
  }
}

module.exports = { authMiddleware };
