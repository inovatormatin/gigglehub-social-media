import { createClient } from "@supabase/supabase-js";

// setup for supabase
const supabaseUrl = process.env.REACT_APP_SUPABASE_URI || '';
const supabaseKey = process.env.REACT_APP_SUPABASE_API_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: false,
    }
});

export default supabase;
