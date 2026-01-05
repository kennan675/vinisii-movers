import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://mrrvckimtvezdzcvmsky.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjQ3NzQ3YjcyLTZhZDktNDFiMC05NDUzLTc0MDBiZjhjOGQ0NiJ9.eyJwcm9qZWN0SWQiOiJtcnJ2Y2tpbXR2ZXpkemN2bXNreSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzY3NjAyNDUxLCJleHAiOjIwODI5NjI0NTEsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.6gBhLucZfzRUUWF4MteMAenCVlY2lRXaryN7-h5ZFcE';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };