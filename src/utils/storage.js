/**
 * LocalStorage Storage Helper
 * Menyimpan progres belajar siswa secara persisten dan terisolasi PER SISWA.
 * Jika nama siswa berganti, progres masing-masing siswa tetap tersimpan terpisah.
 */

import { studentSession } from "./studentSession";

const STORAGE_KEY_PREFIX = "timi_edukasi_";

function getStudentStoragePrefix() {
  try {
    const student = studentSession.getActiveStudent();
    if (student && student.name) {
      const slug = student.name.toLowerCase().trim().replace(/[^a-z0-9]/g, "_");
      return `${STORAGE_KEY_PREFIX}s_${slug}_`;
    }
  } catch {
    // fallback
  }
  return `${STORAGE_KEY_PREFIX}s_default_`;
}

export const storage = {
  // Simpan progres percakapan aktif misi untuk siswa yang sedang aktif
  saveMissionState(missionId, state) {
    try {
      const prefix = getStudentStoragePrefix();
      localStorage.setItem(
        `${prefix}state_${missionId}`,
        JSON.stringify({
          ...state,
          updatedAt: new Date().toISOString()
        })
      );
    } catch {
      // Storage quota or error
    }
  },

  // Ambil progres percakapan aktif misi untuk siswa yang sedang aktif
  getMissionState(missionId) {
    try {
      const prefix = getStudentStoragePrefix();
      const sanitizeState = (raw) => {
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.messages)) {
          parsed.messages = parsed.messages.map((m) => {
            if (m && typeof m.text === "string" && m.text.includes("Pak Tani")) {
              return { ...m, text: m.text.replaceAll("Pak Tani", "Pak Budi") };
            }
            return m;
          });
        }
        return parsed;
      };

      if (data) return sanitizeState(data);

      // Cek legacy key jika prefix default
      if (prefix === `${STORAGE_KEY_PREFIX}s_default_`) {
        const legacy = localStorage.getItem(`${STORAGE_KEY_PREFIX}state_${missionId}`);
        return sanitizeState(legacy);
      }
      return null;
    } catch {
      return null;
    }
  },

  // Hapus progres percakapan misi siswa aktif (saat Mulai Ulang / Replay)
  clearMissionState(missionId) {
    try {
      const prefix = getStudentStoragePrefix();
      localStorage.removeItem(`${prefix}state_${missionId}`);
      // Bersihkan juga legacy key
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}state_${missionId}`);
    } catch {
      // ignore
    }
  },

  // Simpan status penyelesaian misi untuk siswa aktif
  saveCompletedMission(missionId, resultSummary) {
    try {
      const prefix = getStudentStoragePrefix();
      const existing = this.getCompletedMissions();
      existing[missionId] = {
        ...resultSummary,
        completedAt: new Date().toISOString()
      };
      localStorage.setItem(`${prefix}completed`, JSON.stringify(existing));
    } catch {
      // ignore
    }
  },

  // Ambil semua misi yang sudah diselesaikan siswa aktif
  getCompletedMissions() {
    try {
      const prefix = getStudentStoragePrefix();
      const data = localStorage.getItem(`${prefix}completed`);
      if (data) return JSON.parse(data);
      return {};
    } catch {
      return {};
    }
  },

  // Cek apakah misi tertentu sudah diselesaikan siswa aktif
  isMissionCompleted(missionId) {
    const completed = this.getCompletedMissions();
    return !!completed[missionId];
  },

  // Reset seluruh data penyimpanan aplikasi
  resetAllProgress() {
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(STORAGE_KEY_PREFIX) || key.startsWith("timi_")) {
          localStorage.removeItem(key);
        }
      });
    } catch {
      // ignore
    }
  }
};
