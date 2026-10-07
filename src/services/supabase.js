/**
 * Supabase Client & Cloud Storage Service
 * Menghubungkan SOKRABOT dengan Database Cloud Supabase
 * Mendukung sinkronisasi riwayat belajar siswa secara real-time
 */

import { createClient } from '@supabase/supabase-js';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
// Bersihkan /rest/v1 atau garis miring di akhir URL jika ada
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

// Cek apakah kredensial Supabase sudah terisi di .env
export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('http') &&
    !supabaseUrl.includes('YOUR_SUPABASE')
  );
};

// Buat client hanya jika kredensial valid agar tidak error di browser
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Simpan sesi pengerjaan siswa ke Supabase Cloud
 */
export async function saveSessionToSupabase(sessionData) {
  if (!isSupabaseConfigured() || !supabase) {
    return { success: false, error: 'Supabase belum dikonfigurasi di .env' };
  }

  try {
    const payload = {
      student_id: sessionData.student_id || null,
      student_name: sessionData.student_name || sessionData.studentName || 'Anonim',
      student_class: sessionData.student_class || sessionData.studentClass || '-',
      student_number: sessionData.student_number || sessionData.studentNumber || '-',
      mission_id: sessionData.mission_id || sessionData.missionId || 'misi_1',
      mission_title: sessionData.mission_title || sessionData.missionTitle || 'Misi SOKRABOT',
      stars_earned: sessionData.stars_earned ?? sessionData.starsEarned ?? 0,
      score_percent: sessionData.score_percent ?? sessionData.scorePercent ?? 100,
      hints_used: sessionData.hints_used ?? sessionData.hintsUsed ?? 0,
      completed_questions: sessionData.completed_questions ?? sessionData.completedQuestions ?? 2,
      is_completed: sessionData.is_completed ?? true,
      misconceptions: sessionData.misconceptions || [],
      conversation_transcript: sessionData.conversation_transcript || sessionData.conversationTranscript || [],
      created_at: sessionData.created_at || sessionData.completed_at || new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('student_sessions')
      .insert([payload])
      .select();

    if (error) {
      console.warn('[Supabase] Gagal menyimpan sesi ke cloud:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data: data?.[0] };
  } catch (err) {
    console.error('[Supabase] Error tidak terduga saat insert:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Ambil seluruh riwayat pengerjaan siswa dari Supabase
 */
export async function fetchSessionsFromSupabase() {
  if (!isSupabaseConfigured() || !supabase) {
    return { success: false, data: [], isConfigured: false };
  }

  try {
    const { data, error } = await supabase
      .from('student_sessions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[Supabase] Gagal mengambil data sesi:', error.message);
      return { success: false, data: [], error: error.message, isConfigured: true };
    }

    return { success: true, data: data || [], isConfigured: true };
  } catch (err) {
    console.error('[Supabase] Error fetch:', err);
    return { success: false, data: [], error: err.message, isConfigured: true };
  }
}

/**
 * Hapus satu sesi siswa berdasarkan ID
 */
export async function deleteSessionFromSupabase(id) {
  if (!isSupabaseConfigured() || !supabase) {
    return { success: false };
  }

  try {
    const { error } = await supabase
      .from('student_sessions')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('[Supabase] Gagal menghapus sesi:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Hapus seluruh data sesi siswa dari Supabase (khusus guru reset)
 */
export async function clearAllSessionsFromSupabase() {
  if (!isSupabaseConfigured() || !supabase) {
    return { success: false };
  }

  try {
    const { error } = await supabase
      .from('student_sessions')
      .delete()
      .neq('student_name', '___NON_EXISTENT___'); // Delete all rows

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('[Supabase] Gagal reset semua sesi:', err);
    return { success: false, error: err.message };
  }
}
