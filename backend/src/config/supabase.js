/**
 * LexFlow Backend — Supabase Client
 * Manages connection to Supabase for auth, storage, and metadata.
 */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

function cleanKey(key) {
  if (!key) return null;
  const cleaned = key.replace(/['"]/g, '').trim();
  return cleaned === '' ? null : cleaned;
}

const supabaseUrl = cleanKey(process.env.SUPABASE_URL) || 'https://placeholder.supabase.co';
const supabaseKey = cleanKey(process.env.SUPABASE_SERVICE_ROLE_KEY) || cleanKey(process.env.SUPABASE_ANON_KEY) || 'placeholder';

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
