import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://msnwupckhoomeiqxfbts.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zbnd1cGNraG9vbWVpcXhmYnRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NjY5MzQsImV4cCI6MjA4NzQ0MjkzNH0.SoZ8QmlJ_db8mOLbzhK0cXh37g0a_5t5H63De8FXNfg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
