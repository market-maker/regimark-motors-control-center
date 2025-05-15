
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://keetqaghoxjtcqejvywe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlZXRxYWdob3hqdGNxZWp2eXdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU3OTY0MDgsImV4cCI6MjAzMTM3MjQwOH0.gRyCJ8EItVn-UUasV6QZgtkEAkOF_xDNEfpuRS0k1Qo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
