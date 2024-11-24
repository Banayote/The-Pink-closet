// Import the Supabase library
import { createClient } from '@supabase/supabase-js';

// Supabase URL and API key
const SUPABASE_URL = 'https://eczpdpysryifkekieloc.supabase.co';
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjenBkcHlzcnlpZmtla2llbG9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwMjQ2NDUsImV4cCI6MjA0NzYwMDY0NX0.lxC6cqnwH9hMbGC4AsE5W6JRt34eyp4MxhNtAl0MdM4';

// Create the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

// Export the client to use it in other parts of the app
export default supabase;
