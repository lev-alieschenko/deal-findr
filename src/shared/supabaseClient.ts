import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = "https://totwljhofxfkkdsatjpo.supabase.co";
const supabaseAnonKey: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvdHdsamhvZnhma2tkc2F0anBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MDgxOTMsImV4cCI6MjA1NjI4NDE5M30.snwfIvk-HaeL9gurVBffpQ4sKnl_GCjeMXtLBN2N28Q";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
