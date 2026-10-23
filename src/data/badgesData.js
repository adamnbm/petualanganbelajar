/**
 * Master Data Lencana Prestasi (Badge System)
 * Berdasarkan 5 Misi Utama Flowchart Ekosistem Sawah
 */

export const BADGES_DATA = [
  {
    id: "badge_penemu_produsen",
    name: "Penemu Sang Produsen",
    icon: "🌱",
    missionId: "misi_1",
    missionName: "Misi 1 — Detektif Penghuni Sawah",
    category: "Misi 1 — Detektif Penghuni Sawah",
    requirement: "Menyelesaikan Misi 1 — Detektif Penghuni Sawah (Minimal 2 ⭐)",
    description: "Detektif berhasil membongkar rahasia fotosintesis padi dan membuktikan bahwa padi membuat makanannya sendiri sebagai Produsen!",
    accentColor: "#2E7D32",
    isUnlocked(progressMap) {
      const p = progressMap["misi_1"];
      return p && p.status === "COMPLETED" && (p.stars_earned >= 2);
    }
  },
  {
    id: "badge_ahli_penghuni",
    name: "Penjelajah Aliran Energi",
    icon: "☀️",
    missionId: "misi_2",
    missionName: "Misi 2 — Rahasia Aliran Energi",
    category: "Misi 2 — Rahasia Aliran Energi",
    requirement: "Menyelesaikan Misi 2 — Rahasia Aliran Energi (Minimal 2 ⭐)",
    description: "Detektif berhasil menelusuri sumber energi matahari dan arah aliran energi dalam rantai makanan sawah!",
    accentColor: "#D97706",
    isUnlocked(progressMap) {
      const p = progressMap["misi_2"];
      return p && p.status === "COMPLETED" && (p.stars_earned >= 2);
    }
  },
  {
    id: "badge_pelacak_predator",
    name: "Pelacak Predator & Mangsa",
    icon: "🦅",
    missionId: "misi_3",
    missionName: "Misi 3 — Jejak Pemburu dan Mangsa",
    category: "Misi 3 — Jejak Pemburu dan Mangsa",
    requirement: "Menyelesaikan Misi 3 — Jejak Pemburu dan Mangsa (Minimal 2 ⭐)",
    description: "Detektif menguasai hubungan predator dan mangsa serta mengungkap rahasia peran ganda organisme di sawah!",
    accentColor: "#EA580C",
    isUnlocked(progressMap) {
      const p = progressMap["misi_3"];
      return p && p.status === "COMPLETED" && (p.stars_earned >= 2);
    }
  },
  {
    id: "badge_penyelamat_ekosistem",
    name: "Pemecah Misteri Tikus",
    icon: "🎯",
    missionId: "misi_4",
    missionName: "Misi 4 — Misteri Tikus yang Bertambah",
    category: "Misi 4 — Misteri Tikus yang Bertambah",
    requirement: "Menyelesaikan Misi 4 — Misteri Tikus yang Bertambah secara tuntas",
    description: "Detektif berhasil menganalisis efek domino berkurangnya ular terhadap ledakan populasi tikus dan tanaman padi!",
    accentColor: "#DC2626",
    isUnlocked(progressMap) {
      const p = progressMap["misi_4"];
      return p && p.status === "COMPLETED";
    }
  },
  {
    id: "badge_penjaga_ekosistem",
    name: "Penyelamat Sawah Sejati",
    icon: "🛡️",
    missionId: "misi_5",
    missionName: "Misi 5 — Penyelamat Sawah Pak Budi",
    category: "Misi 5 — Penyelamat Sawah Pak Budi",
    requirement: "Menyelesaikan Misi 5 — Penyelamat Sawah Pak Budi dengan nilai sempurna (3 ⭐)",
    description: "Gelar kehormatan tertinggi! Mampu merumuskan solusi bijak untuk menjaga keseimbangan dan kelestarian ekosistem sawah.",
    accentColor: "#15803D",
    isUnlocked(progressMap) {
      const p5 = progressMap["misi_5"];
      return p5 && p5.status === "COMPLETED" && (p5.stars_earned === 3);
    }
  }
];

export function getBadgeById(badgeId) {
  return BADGES_DATA.find((b) => b.id === badgeId) || BADGES_DATA[0];
}
