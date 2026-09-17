-- ==============================================================================
-- SKRIP TABEL SUPABASE: PETUALANGAN BELAJAR TIMI 🌱
-- Jalankan skrip ini di: Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Buat Tabel Riwayat Sesi Percakapan Siswa (student_sessions)
CREATE TABLE IF NOT EXISTS public.student_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    student_name TEXT NOT NULL,
    student_class TEXT NOT NULL,
    student_number TEXT,
    mission_id TEXT NOT NULL,
    mission_title TEXT NOT NULL,
    score_percent INTEGER DEFAULT 100,
    completed_questions INTEGER DEFAULT 0,
    hints_used INTEGER DEFAULT 0,
    first_try_correct INTEGER DEFAULT 0,
    total_attempts INTEGER DEFAULT 0,
    badge_earned TEXT,
    is_completed BOOLEAN DEFAULT false,
    conversation_transcript JSONB DEFAULT '[]'::jsonb
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE public.student_sessions ENABLE ROW LEVEL SECURITY;

-- 3. Kebijakan Keamanan: Izinkan siswa (public anonim) untuk menambahkan sesi belajar (INSERT)
CREATE POLICY "Izinkan siswa menambahkan riwayat percakapan"
ON public.student_sessions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Kebijakan Keamanan: Izinkan pembacaan data untuk Dashboard Guru (SELECT)
CREATE POLICY "Izinkan pembacaan riwayat percakapan"
ON public.student_sessions
FOR SELECT
TO anon, authenticated
USING (true);

-- 5. Berikan indeks untuk mempercepat pencarian berdasarkan nama dan waktu
CREATE INDEX IF NOT EXISTS idx_student_name ON public.student_sessions(student_name);
CREATE INDEX IF NOT EXISTS idx_created_at ON public.student_sessions(created_at DESC);
