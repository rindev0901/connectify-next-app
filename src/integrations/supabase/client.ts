// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rpopfhnpvgkpnjzchcid.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwb3BmaG5wdmdrcG5qemNoY2lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4NTAwOTgsImV4cCI6MjA1MDQyNjA5OH0.KCLXyfh1pAtn0pEvEGtrnzKT0KInA52ss2jJt2o-sI0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);