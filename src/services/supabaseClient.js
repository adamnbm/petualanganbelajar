/**
 * Supabase Client & Service Helper
 * Mengelola penyimpanan riwayat percakapan dan progres siswa ke cloud database Supabase.
 * Dilengkapi graceful fallback: jika Supabase belum dikonfigurasi, aplikasi tetap berjalan lancar secara lokal.
 */

import { createClient } from "@supabase/supabase-js";

// Ambil URL dan ANON KEY dari environment variable Vite, lalu bersihkan jika ada trailing slash atau /rest/v1
const rawUrl = (import.meta.env.VITE_SUPABASE_URL || "").trim();
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || "").trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes("your-project-id") &&
  supabaseUrl.startsWith("https://")
);

// Inisialisasi Supabase client (jika credentials valid)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Menyimpan atau memperbarui riwayat percakapan siswa ke tabel `student_sessions` di Supabase
 */
export async function saveStudentSessionToCloud({
  student,
  mission,
  stats,
  messages,
  isCompleted = false
}) {
  if (!isSupabaseConfigured || !supabase) {
    console.info("Supabase belum dikonfigurasi di .env. Data disimpan ke penyimpanan lokal peramban.");
    return { success: true, localOnly: true };
  }

  try {
    const payload = {
      student_name: student?.name || "Siswa Tanpa Nama",
      student_class: student?.className || "Umum",
      student_number: student?.studentNumber || "-",
      mission_id: mission?.id || "sawah-pak-budi",
      mission_title: mission?.title || "Sawah Pak Budi",
      score_percent: Math.max(70, Math.min(100, 100 - (stats?.hintsUsed || 0) * 5)),
      completed_questions: stats?.completedMainCount || 0,
      hints_used: stats?.hintsUsed || 0,
      first_try_correct: stats?.firstTryCorrectCount || 0,
      total_attempts: stats?.totalAttempts || 0,
      badge_earned: isCompleted ? (mission?.badgeTitle || "Penjelajah Rantai Makanan") : null,
      is_completed: Boolean(isCompleted),
      conversation_transcript: messages || [],
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from("student_sessions")
      .insert([payload])
      .select();

    if (error) {
      console.warn("Gagal menyimpan ke Supabase:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.warn("Kesalahan koneksi Supabase:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Mengambil seluruh riwayat sesi percakapan siswa dari Supabase (untuk Dashboard Guru)
 */
export async function fetchAllStudentSessionsFromCloud() {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, data: [], reason: "not_configured" };
  }

  try {
    const { data, error } = await supabase
      .from("student_sessions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { success: false, data: [], error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (err) {
    return { success: false, data: [], error: err.message };
  }
}
