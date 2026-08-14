// Shared Supabase client for Redline Electric.
// Uses the public anon key — safe to expose client-side; access is enforced by RLS.
var SUPABASE_URL = "https://hvesaitxkwlufbljnupy.supabase.co";
var SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2ZXNhaXR4a3dsdWZibGpudXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MzkyNzksImV4cCI6MjEwMjMxNTI3OX0.Pcdzxa-eWUrtBRblXRJ156EOG--7KPAHiKFTiHpFMS0";

var supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
