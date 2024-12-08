// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_APP_SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
