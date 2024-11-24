// Import the Supabase library
import { createClient } from '@supabase/supabase-js';

// Use environment variables from .env file
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_API_KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

// Create the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

// Export the client to use it in other parts of the app
export default supabase;
