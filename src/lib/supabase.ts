import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://loirmuynikvzpehmdqbt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvaXJtdXluaWt2enBlaG1kcWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MjM0NTAsImV4cCI6MjA4NzQ5OTQ1MH0.esZwx9jxBtZZaZ8M36V3MBrf6_cK9ncz7kToP2gBKVA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);