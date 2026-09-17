/**
 * Master Data Daftar Misi Pembelajaran
 * Struktur data ini modular dan dapat langsung diperluas oleh guru/admin.
 */

export const MISSIONS_DATA = [
  {
    id: "sawah-pak-budi",
    code: "MISSION 01",
    title: "Sawah Pak Budi",
    icon: "🌾",
    category: "Ekosistem & Rantai Makanan",
    gradeLevel: "SD Kelas 3 - 5",
    description: "Jelajahi hubungan antara tumbuhan dan hewan dalam rantai makanan serta bantu Pak Budi memecahkan teka-teki sawahnya.",
    topics: [
      "Rantai makanan",
      "Produsen",
      "Konsumen I & II",
      "Aliran energi",
      "Keseimbangan alam"
    ],
    characters: [
      { name: "Padi", emoji: "🌾", role: "Produsen" },
      { name: "Belalang", emoji: "🦗", role: "Konsumen I (Herbivora)" },
      { name: "Katak", emoji: "🐸", role: "Konsumen II (Karnivora)" },
      { name: "Ular", emoji: "🐍", role: "Konsumen III" },
      { name: "Elang", emoji: "🦅", role: "Konsumen Puncak" }
    ],
    totalMainQuestions: 5,
    estimatedMinutes: 8,
    badgeTitle: "Penjelajah Rantai Makanan",
    badgeIcon: "🏆",
    badgeDescription: "Berhasil memahami peran produsen, konsumen, dan menjaga keseimbangan rantai makanan sawah.",
    available: true,
    accentColor: "#10B981"
  },
  {
    id: "rimba-hutan-tropis",
    code: "MISSION 02",
    title: "Rimba Hutan Tropis",
    icon: "🌿",
    category: "Jaring-Jaring Makanan",
    gradeLevel: "SD Kelas 4 - 6",
    description: "Menelusuri rimba hijau Kalimantan bersama Orangutan, Rusa, Harimau, dan Jamur Pengurai untuk mengungkap jaring-jaring makanan.",
    topics: [
      "Piramida makanan",
      "Konsumen Puncak",
      "Pengurai / Dekomposer",
      "Daur materi"
    ],
    characters: [
      { name: "Pohon Buah", emoji: "🌳", role: "Produsen" },
      { name: "Rusa", emoji: "🦌", role: "Konsumen I" },
      { name: "Harimau", emoji: "🐯", role: "Konsumen Puncak" },
      { name: "Jamur", emoji: "🍄", role: "Pengurai" }
    ],
    totalMainQuestions: 5,
    estimatedMinutes: 10,
    badgeTitle: "Penjaga Rimba Tropis",
    badgeIcon: "🐯",
    badgeDescription: "Menguasai peran dekomposer dan jaring-jaring makanan di hutan hujan nusantara.",
    available: true,
    accentColor: "#F59E0B"
  },
  {
    id: "taman-laut-karang",
    code: "MISSION 03",
    title: "Taman Karang Biru",
    icon: "🐠",
    category: "Simbiosis & Ekosistem Bahari",
    gradeLevel: "SD Kelas 4 - 6",
    description: "Menyelam ke dasar laut Raja Ampat bersama Ikan Badut, Terumbu Karang, dan Penyu untuk mempelajari simbiosis dan fitoplankton.",
    topics: [
      "Fitoplankton & Zooplankton",
      "Simbiosis Mutualisme",
      "Rantai makanan laut",
      "Pelestarian terumbu"
    ],
    characters: [
      { name: "Fitoplankton", emoji: "🦠", role: "Produsen Laut" },
      { name: "Ikan Badut", emoji: "🐠", role: "Konsumen I" },
      { name: "Anemon", emoji: "🪸", role: "Mitra Simbiosis" },
      { name: "Hiu Karang", emoji: "🦈", role: "Konsumen Puncak" }
    ],
    totalMainQuestions: 5,
    estimatedMinutes: 9,
    badgeTitle: "Penyelam Samudra Cilik",
    badgeIcon: "🌊",
    badgeDescription: "Berhasil memecahkan teka-teki simbiosis dan produsen fotosintetik bawah air.",
    available: true,
    accentColor: "#0284C7"
  }
];

export function getMissionById(missionId) {
  return MISSIONS_DATA.find((m) => m.id === missionId) || MISSIONS_DATA[0];
}
