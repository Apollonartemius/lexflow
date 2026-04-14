/**
 * LexFlow Backend — Supabase Client
 * Manages connection to Supabase for auth, storage, and metadata.
 */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'placeholder';

let supabase = null;

try {
  supabase = createClient(supabaseUrl, supabaseKey);
  if (!supabaseUrl.includes('placeholder')) {
    console.log('✅ Supabase client initialized');
  } else {
    console.warn('⚠️  Supabase using placeholder credentials. Set SUPABASE_URL and keys in .env');
  }
} catch (error) {
  console.warn('⚠️  Supabase initialization failed:', error.message);
}

module.exports = { supabase };
