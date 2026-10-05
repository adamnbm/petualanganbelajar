/**
 * Master Data Lencana Prestasi (Badge System)
 * Berdasarkan 5 Misi Utama Flowchart Ekosistem Sawah
 */

export const BADGES_DATA = [
  {
    id: "badge_penemu_produsen",
    name: "Penemu Sang Produsen",
    icon: "🌱",
    category: "Misi 1",
    requirement: "Menyelesaikan Misi 1 dengan minimal 2 Bintang (⭐)",
    description: "Detektif berhasil membongkar rahasia fotosintesis padi dan membuktikan bahwa padi membuat makanannya sendiri sebagai Produsen!",
    accentColor: "#2E7D32",
    isUnlocked(progressMap) {
      const p = progressMap["misi_1"];
      return p && p.status === "COMPLETED" && (p.stars_earned >= 2);
    }
  },
  {
    id: "badge_ahli_penghuni",
    name: "Ahli Rantai Makanan",
    icon: "🌾",
    category: "Misi 2",
    requirement: "Menyelesaikan Misi 2 dengan minimal 2 Bintang (⭐)",
    description: "Detektif berhasil menyusun urutan hubungan makan dan dimakan yang tepat di ekosistem sawah tanpa terbalik!",
    accentColor: "#388E3C",
    isUnlocked(progressMap) {
      const p = progressMap["misi_2"];
      return p && p.status === "COMPLETED" && (p.stars_earned >= 2);
    }
  },
  {
    id: "badge_pelacak_energi",
    name: "Pelacak Energi",
    icon: "⚡",
    category: "Misi 3",
    requirement: "Menyelesaikan Misi 3 tanpa salah panah (Raih 3 ⭐)",
    description: "Detektif berhasil membuktikan bahwa tanda panah adalah simbol aliran dan perpindahan energi makanan dari produsen!",
    accentColor: "#F57F17",
    isUnlocked(progressMap) {
      const p = progressMap["misi_3"];
      return p && p.status === "COMPLETED" && (p.stars_earned === 3);
    }
  },
  {
    id: "badge_detektif_rantai",
    name: "Detektif Predator & Mangsa",
    icon: "🦅",
    category: "Misi 4",
    requirement: "Menyelesaikan Misi 4 secara lengkap",
    description: "Detektif menguasai hubungan predator dan mangsa serta mengungkap rahasia peran ganda organisme di sawah.",
    accentColor: "#D84315",
    isUnlocked(progressMap) {
      const p = progressMap["misi_4"];
      return p && p.status === "COMPLETED";
    }
  },
  {
    id: "badge_penyelamat_ekosistem",
    name: "Penjaga Keseimbangan Sawah",
    icon: "🛡️",
    category: "Misi 5",
    requirement: "Menyelesaikan Misi 5 dengan nilai sempurna (3 ⭐)",
    description: "Gelar tertinggi detektif sawah! Mampu menganalisis efek domino populasi dan memahami pentingnya menjaga keseimbangan ekosistem.",
    accentColor: "#C62828",
    isUnlocked(progressMap) {
      const p5 = progressMap["misi_5"];
      return p5 && p5.status === "COMPLETED" && (p5.stars_earned === 3);
    }
  }
];

export function getBadgeById(badgeId) {
  return BADGES_DATA.find((b) => b.id === badgeId) || BADGES_DATA[0];
}
