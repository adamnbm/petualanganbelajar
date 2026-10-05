/**
 * Student Session & Local Storage Helper
 * Menyimpan identitas siswa yang sedang aktif dan riwayat lokal sesi pembelajaran
 * Setiap siswa memiliki identitas unik dan sesi terpisah.
 */

const ACTIVE_STUDENT_KEY = "timi_active_student";
const ALL_SUBMISSIONS_KEY = "timi_student_submissions";

export const studentSession = {
  // Ambil identitas siswa yang sedang aktif
  getActiveStudent() {
    try {
      const data = localStorage.getItem(ACTIVE_STUDENT_KEY);
      if (!data) return null;
      const parsed = JSON.parse(data);
      if (!parsed || !parsed.name) return null;
      
      // Pastikan ada ID unik siswa yang konsisten
      if (!parsed.id) {
        const slug = parsed.name.toLowerCase().trim().replace(/[^a-z0-9]/g, "_");
        parsed.id = `siswa_${slug}`;
      }
      return parsed;
    } catch {
      return null;
    }
  },

  // Simpan identitas siswa aktif dan beri notifikasi event
  setActiveStudent(student) {
    try {
      if (!student || !student.name) return;
      const slug = student.name.toLowerCase().trim().replace(/[^a-z0-9]/g, "_");
      const normalized = {
        id: student.id || `siswa_${slug}`,
        name: student.name.trim(),
        className: student.className ? student.className.trim() : "Kelas 4",
        studentNumber: student.studentNumber ? student.studentNumber.trim() : "-"
      };
      localStorage.setItem(ACTIVE_STUDENT_KEY, JSON.stringify(normalized));
      
      // Dispatch custom event agar komponen UI lain langsung re-render
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("timi_student_changed", { detail: normalized }));
      }
      return normalized;
    } catch {
      return null;
    }
  },

  // Hapus / Ganti siswa aktif
  clearActiveStudent() {
    try {
      localStorage.removeItem(ACTIVE_STUDENT_KEY);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("timi_student_changed", { detail: null }));
      }
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
        id: submission.id || `sesi_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        created_at: submission.created_at || new Date().toISOString()
      };
      existing.unshift(newSubmission);
      localStorage.setItem(ALL_SUBMISSIONS_KEY, JSON.stringify(existing.slice(0, 300)));
      return newSubmission;
    } catch {
      return null;
    }
  },

  // Ambil semua arsip sesi siswa lokal (dengan normalisasi ID)
  getAllLocalSubmissions() {
    try {
      const data = localStorage.getItem(ALL_SUBMISSIONS_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];
      
      // Pastikan setiap record punya id yang valid untuk penghapusan
      return parsed.map((s, idx) => ({
        ...s,
        id: s.id || `sesi_${idx}_${s.created_at || Date.now()}`
      }));
    } catch {
      return [];
    }
  },

  // Hapus SATU riwayat sesi siswa tertentu berdasarkan ID atau created_at
  deleteLocalSubmission(submissionId) {
    try {
      const existing = this.getAllLocalSubmissions();
      const updated = existing.filter((s) => s.id !== submissionId && s.created_at !== submissionId);
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
