import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (_supabase) return _supabase;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Please export NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_SECRET_KEY'
    );
  }

  _supabase = createClient(supabaseUrl, supabaseKey);
  return _supabase;
}
