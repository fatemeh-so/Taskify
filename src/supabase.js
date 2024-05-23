// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ipujmkdynjpwmrbuoulr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwdWpta2R5bmpwd21yYnVvdWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzMTMyMjEsImV4cCI6MjAzMTg4OTIyMX0.hubTO6Ib0rXbZ3FeDkqi2P7pUUp1sgGx_ii_Kbkv39M';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
