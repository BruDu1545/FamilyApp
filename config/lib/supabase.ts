import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://alsrywccmlxlbtwavxsj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsc3J5d2NjbWx4bGJ0d2F2eHNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MDg2MTksImV4cCI6MjA3MTI4NDYxOX0.N68tPBNf8sLd5YsCKv5e0_W1MnSa87dN_RxvQMzS-xY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, 
  },
});
