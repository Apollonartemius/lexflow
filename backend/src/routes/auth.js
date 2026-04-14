/**
 * LexFlow Backend — Auth Routes
 * Handles authentication via Supabase.
 */
const express = require('express');
const { supabase } = require('../config/supabase');

const router = express.Router();

/**
 * POST /api/auth/signup
 * Register a new user.
 */
router.post('/signup', async (req, res) => {
  try {
    const { email, password, full_name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (!supabase || !process.env.SUPABASE_URL || process.env.SUPABASE_URL.includes('placeholder')) {
      // Dev mode: return mock user
      return res.json({
        message: 'User created (dev mode)',
        user: { id: 'dev-user-001', email, full_name },
        session: { access_token: 'dev-token-001' },
      });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: full_name || '' },
      },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'User created successfully',
      user: data.user,
      session: data.session,
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

/**
 * POST /api/auth/login
 * Sign in an existing user.
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (!supabase || !process.env.SUPABASE_URL || process.env.SUPABASE_URL.includes('placeholder')) {
      // Dev mode: return mock session
      return res.json({
        message: 'Login successful (dev mode)',
        user: { id: 'dev-user-001', email, role: 'admin' },
        session: { access_token: 'dev-token-001' },
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    res.json({
      message: 'Login successful',
      user: data.user,
      session: data.session,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

/**
 * POST /api/auth/logout
 * Sign out a user.
 */
router.post('/logout', async (req, res) => {
  try {
    if (supabase && process.env.SUPABASE_URL && !process.env.SUPABASE_URL.includes('placeholder')) {
      await supabase.auth.signOut();
    }
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

module.exports = router;
