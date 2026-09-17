/**
 * LocalStorage Storage Helper
 * Menyimpan progres belajar siswa secara persisten di browser.
 */

const STORAGE_KEY_PREFIX = "timi_edukasi_";

export const storage = {
  // Simpan progres percakapan aktif misi
  saveMissionState(missionId, state) {
    try {
      localStorage.setItem(
        `${STORAGE_KEY_PREFIX}state_${missionId}`,
        JSON.stringify({
          ...state,
          updatedAt: new Date().toISOString()
        })
      );
    } catch {
      // Storage quota or error
    }
  },

  // Ambil progres percakapan aktif misi
  getMissionState(missionId) {
    try {
      const data = localStorage.getItem(`${STORAGE_KEY_PREFIX}state_${missionId}`);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  // Hapus progres percakapan (misalnya saat Ulangi Misi)
  clearMissionState(missionId) {
    try {
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}state_${missionId}`);
    } catch {
      // ignore
    }
  },

  // Simpan status penyelesaian misi (completion record)
  saveCompletedMission(missionId, resultSummary) {
    try {
      const existing = this.getCompletedMissions();
      existing[missionId] = {
        ...resultSummary,
        completedAt: new Date().toISOString()
      };
      localStorage.setItem(`${STORAGE_KEY_PREFIX}completed`, JSON.stringify(existing));
    } catch {
      // ignore
    }
  },

  // Ambil semua misi yang sudah selesai
  getCompletedMissions() {
    try {
      const data = localStorage.getItem(`${STORAGE_KEY_PREFIX}completed`);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  // Cek apakah misi tertentu sudah selesai
  isMissionCompleted(missionId) {
    const completed = this.getCompletedMissions();
    return !!completed[missionId];
  },

  // Reset seluruh data siswa (untuk pengujian ulang atau siswa baru)
  resetAllProgress() {
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(STORAGE_KEY_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch {
      // ignore
    }
  }
};
