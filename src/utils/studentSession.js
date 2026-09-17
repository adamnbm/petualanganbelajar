/**
 * Student Session & Local Storage Helper
 * Menyimpan identitas siswa yang sedang aktif dan riwayat lokal sesi pembelajaran
 * Sistem mandiri (self-contained) tanpa ketergantungan database eksternal.
 */

const ACTIVE_STUDENT_KEY = "timi_active_student";
const ALL_SUBMISSIONS_KEY = "timi_student_submissions";

export const studentSession = {
  // Ambil identitas siswa yang sedang aktif
  getActiveStudent() {
    try {
      const data = localStorage.getItem(ACTIVE_STUDENT_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  // Simpan identitas siswa aktif
  setActiveStudent(student) {
    try {
      localStorage.setItem(ACTIVE_STUDENT_KEY, JSON.stringify(student));
    } catch {
      // ignore
    }
  },

  // Hapus / Ganti siswa aktif
  clearActiveStudent() {
    try {
      localStorage.removeItem(ACTIVE_STUDENT_KEY);
    } catch {
      // ignore
    }
  },

  // Simpan arsip sesi siswa secara lokal
  saveLocalSubmission(submission) {
    try {
      const existing = this.getAllLocalSubmissions();
      const newSubmission = {
        ...submission,
        id: submission.id || `sesi_${Date.now()}`,
        created_at: new Date().toISOString()
      };
      existing.unshift(newSubmission);
      localStorage.setItem(ALL_SUBMISSIONS_KEY, JSON.stringify(existing.slice(0, 200)));
      return newSubmission;
    } catch {
      return null;
    }
  },

  // Ambil semua arsip sesi siswa lokal
  getAllLocalSubmissions() {
    try {
      const data = localStorage.getItem(ALL_SUBMISSIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  // Hapus SATU riwayat sesi siswa tertentu berdasarkan ID
  deleteLocalSubmission(submissionId) {
    try {
      const existing = this.getAllLocalSubmissions();
      const updated = existing.filter((s) => s.id !== submissionId);
      localStorage.setItem(ALL_SUBMISSIONS_KEY, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  // Hapus SEMUA riwayat sesi siswa sekaligus (Reset Data Guru)
  clearAllLocalSubmissions() {
    try {
      localStorage.removeItem(ALL_SUBMISSIONS_KEY);
      return [];
    } catch {
      return [];
    }
  }
};
