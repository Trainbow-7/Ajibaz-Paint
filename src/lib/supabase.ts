import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isValidUrl = (url: string) => {
  try {
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    return false;
  }
};

export const supabase: SupabaseClient | null =
  isValidUrl(supabaseUrl) && supabaseAnonKey && supabaseAnonKey !== 'YOUR_PUBLIC_ANON_KEY'
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
