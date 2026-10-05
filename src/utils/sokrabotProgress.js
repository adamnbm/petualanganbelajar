/**
 * SOKRABOT Progress & Gamification Controller
 * Mengimplementasikan Database Schema Collection 'mission_progress' (PRD Section 7)
 * dan Gamification System Mechanics (Bintang, Lencana, Buku Pintar Codex) (PRD Section 6)
 */

import { MISSIONS_DATA } from "../data/missions";
import { BADGES_DATA } from "../data/badgesData";
import { CODEX_CARDS } from "../data/codexData";
import { studentSession } from "./studentSession";

const SOKRABOT_PROGRESS_KEY = "sokrabot_mission_progress";
const SOKRABOT_EVENT_CHANGED = "sokrabot_progress_updated";

/**
 * Mendapatkan userId aktif atau default
 */
export function getCurrentUserId() {
  const activeStudent = studentSession.getActiveStudent();
  if (activeStudent && activeStudent.id) {
    return activeStudent.id;
  }
  return "usr_tamu";
}

/**
 * Mengambil semua record mission_progress untuk user saat ini dari localStorage
 * Returns Map { [missionId]: ProgressRecord }
 */
export function getAllMissionProgress() {
  try {
    const userId = getCurrentUserId();
    const raw = localStorage.getItem(`${SOKRABOT_PROGRESS_KEY}_${userId}`);
    let map = raw ? JSON.parse(raw) : {};

    // Inisialisasi default jika belum ada data
    const completeMap = {};
    MISSIONS_DATA.forEach((mission, index) => {
      const existing = map[mission.id];
      if (existing) {
        completeMap[mission.id] = existing;
      } else {
        // Tentukan initial status
        let initialStatus = "LOCKED";
        if (index === 0) {
          initialStatus = "NOT_STARTED";
        }

        completeMap[mission.id] = {
          progress_id: `prg_${mission.id}_${userId}`,
          user_id: userId,
          mission_id: mission.id,
          status: initialStatus, // LOCKED | NOT_STARTED | IN_PROGRESS | COMPLETED
          stars_earned: 0,
          hints_used_count: 0,
          hints_opened: [], // ['h1', 'h2', 'h3']
          misconceptions_triggered: [],
          attempts_count: 0,
          wrong_answers_count: 0,
          completed_at: null
        };
      }
    });

    // Validasi ulang status LOCKED jika misi sebelumnya selesai
    MISSIONS_DATA.forEach((mission, index) => {
      if (index === 0) {
        if (completeMap[mission.id].status === "LOCKED") {
          completeMap[mission.id].status = "NOT_STARTED";
        }
      } else {
        const prevMission = MISSIONS_DATA[index - 1];
        const prevProgress = completeMap[prevMission.id];
        if (prevProgress && prevProgress.status === "COMPLETED") {
          if (completeMap[mission.id].status === "LOCKED") {
            completeMap[mission.id].status = "NOT_STARTED";
          }
        } else if (completeMap[mission.id].status !== "COMPLETED") {
          completeMap[mission.id].status = "LOCKED";
        }
      }
    });

    return completeMap;
  } catch (err) {
    console.error("[SOKRABOT Storage Error]:", err);
    return {};
  }
}

/**
 * Menyimpan seluruh map progress ke localStorage
 */
function saveAllMissionProgress(map) {
  try {
    const userId = getCurrentUserId();
    localStorage.setItem(`${SOKRABOT_PROGRESS_KEY}_${userId}`, JSON.stringify(map));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(SOKRABOT_EVENT_CHANGED, { detail: map }));
    }
  } catch (err) {
    console.error("[SOKRABOT Save Error]:", err);
  }
}

/**
 * Mengambil progress satu misi tertentu
 */
export function getMissionProgress(missionId) {
  const map = getAllMissionProgress();
  return map[missionId] || null;
}

/**
 * Memulai misi (update status ke IN_PROGRESS jika NOT_STARTED)
 */
export function markMissionStarted(missionId) {
  const map = getAllMissionProgress();
  const current = map[missionId];
  if (current && current.status !== "COMPLETED" && current.status !== "LOCKED") {
    current.status = "IN_PROGRESS";
    saveAllMissionProgress(map);
  }
  return map[missionId];
}

/**
 * Mencatat penggunaan hint pada misi yang sedang berjalan
 * @param {string} missionId
 * @param {'h1' | 'h2' | 'h3'} hintType
 */
export function recordHintUsage(missionId, hintType) {
  const map = getAllMissionProgress();
  const current = map[missionId];
  if (!current) return;

  current.hints_used_count = (current.hints_used_count || 0) + 1;
  current.hints_opened = current.hints_opened || [];
  if (!current.hints_opened.includes(hintType)) {
    current.hints_opened.push(hintType);
  }
  saveAllMissionProgress(map);
}

/**
 * Mencatat deteksi miskonsepsi
 */
export function recordMisconception(missionId, misconceptionId) {
  if (!misconceptionId) return;
  const map = getAllMissionProgress();
  const current = map[missionId];
  if (!current) return;

  current.misconceptions_triggered = current.misconceptions_triggered || [];
  if (!current.misconceptions_triggered.includes(misconceptionId)) {
    current.misconceptions_triggered.push(misconceptionId);
  }
  saveAllMissionProgress(map);
}

/**
 * Menghitung perolehan bintang berdasarkan aturan PRD Section 6:
 * - 3 Bintang: Berhasil menjawab benar pada percobaan pertama tanpa Hint.
 * - 2 Bintang: Memperbaiki jawaban setelah 1–2 Pertanyaan Socratic / Hint H1-H2.
 * - 1 Bintang: Menyelesaikan misi dengan bantuan Hint Level 3 Visual.
 */
export function calculateStarsEarned({ wrongAnswersCount = 0, hintsOpened = [], scaffoldVisits = 0 }) {
  const usedH3 = hintsOpened.includes("h3");
  if (usedH3) {
    return 1;
  }

  const usedH1orH2 = hintsOpened.includes("h1") || hintsOpened.includes("h2");
  if (wrongAnswersCount > 0 || scaffoldVisits > 0 || usedH1orH2) {
    return 2;
  }

  return 3;
}

/**
 * Menyelesaikan misi dan menghitung bintang serta membuka level berikutnya
 */
export function completeMission(missionId, { wrongAnswersCount = 0, hintsOpened = [], scaffoldVisits = 0 }) {
  const map = getAllMissionProgress();
  const current = map[missionId];
  if (!current) return null;

  const stars = calculateStarsEarned({ wrongAnswersCount, hintsOpened, scaffoldVisits });

  current.status = "COMPLETED";
  // Simpan nilai bintang tertinggi yang pernah diraih
  current.stars_earned = Math.max(current.stars_earned || 0, stars);
  current.completed_at = new Date().toISOString();

  // Buka misi berikutnya jika ada
  const currentIndex = MISSIONS_DATA.findIndex((m) => m.id === missionId);
  if (currentIndex >= 0 && currentIndex < MISSIONS_DATA.length - 1) {
    const nextMission = MISSIONS_DATA[currentIndex + 1];
    if (map[nextMission.id] && map[nextMission.id].status === "LOCKED") {
      map[nextMission.id].status = "NOT_STARTED";
    }
  }

  saveAllMissionProgress(map);

  // Buat submission arsip ke studentSession
  const activeStudent = studentSession.getActiveStudent();
  if (activeStudent) {
    studentSession.saveLocalSubmission({
      missionId,
      starsEarned: current.stars_earned,
      hintsUsed: current.hints_used_count || 0,
      misconceptions: current.misconceptions_triggered || [],
      studentName: activeStudent.name,
      studentClass: activeStudent.className || "Kelas 5-6 SD",
      completed_at: current.completed_at
    });
  }

  return current;
}

/**
 * Mengambil ringkasan pencapaian siswa:
 * Total Bintang, Lencana yang didapat, Misi selesai
 */
export function getStudentAchievements() {
  const progressMap = getAllMissionProgress();
  let totalStars = 0;
  let completedCount = 0;

  Object.values(progressMap).forEach((p) => {
    totalStars += p.stars_earned || 0;
    if (p.status === "COMPLETED") {
      completedCount++;
    }
  });

  const unlockedBadges = BADGES_DATA.filter((badge) => badge.isUnlocked(progressMap));

  return {
    totalStars,
    maxStars: MISSIONS_DATA.length * 3,
    completedCount,
    totalMissions: MISSIONS_DATA.length,
    unlockedBadges,
    allBadges: BADGES_DATA,
    progressMap
  };
}

/**
 * Mengambil status kartu Buku Pintar (Codex Cards)
 */
export function getCodexCardsStatus() {
  const progressMap = getAllMissionProgress();
  return CODEX_CARDS.map((card) => {
    const missionProgress = progressMap[card.missionId];
    const isUnlocked = missionProgress && missionProgress.status === "COMPLETED";
    return {
      ...card,
      isUnlocked: Boolean(isUnlocked)
    };
  });
}

/**
 * Reset seluruh kemajuan siswa aktif (berguna untuk pengujian atau jika siswa ingin ulang dari awal)
 */
export function resetCurrentStudentProgress() {
  const userId = getCurrentUserId();
  localStorage.removeItem(`${SOKRABOT_PROGRESS_KEY}_${userId}`);
  return getAllMissionProgress();
}
