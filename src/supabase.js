// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://fhpqywvagrtfkizejhpf.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZocHF5d3ZhZ3J0ZmtpemVqaHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MDg2NDQsImV4cCI6MjA2ODE4NDY0NH0.d3nEPWk6OJ1_srGAYQo7NV_CPSiNDjII-I5nAyHRh6Y'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
