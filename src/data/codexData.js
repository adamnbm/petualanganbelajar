/**
 * Master Data Buku Pintar (Interactive Codex Cards)
 * Berdasarkan 5 Misi Utama Ekosistem Sawah SOKRABOT
 * Kartu diawali status Locked (🔒) dan terbuka (✅) otomatis saat percakapan Socratic Misi selesai.
 */

export const CODEX_CARDS = [
  {
    id: "codex_produsen",
    missionId: "misi_1",
    missionName: "Misi 1: Siapa Aku?",
    title: "Padi si Produsen Mandiri",
    category: "Produsen & Fotosintesis",
    icon: "🌱",
    accentColor: "#2E7D32",
    myth: "Padi mengambil makanan yang sudah jadi atau memakan pupuk dari dalam tanah melalui akar.",
    fact: "Padi adalah PRODUSEN mandiri! Padi membuat makanannya sendiri melalui proses FOTOSINTESIS dengan bantuan cahaya matahari. Akar hanya menyerap air dan mineral dari tanah sebagai bahan mentah, bukan makanan jadi!",
    sokrabotNote: "Padi tidak punya mulut untuk mengunyah makanan dari tanah, Detektif! Daun hijaunya adalah 'dapur' canggih yang memasak energi matahari menjadi makanan.",
    keyPoints: [
      "Produsen = Makhluk hidup yang memproduksi makanan sendiri.",
      "Fotosintesis = Mengubah energi matahari, air, dan CO2 menjadi makanan.",
      "Akar = Menyerap air dan mineral sebagai bahan, bukan makanan jadi."
    ]
  },
  {
    id: "codex_rantai_makanan",
    missionId: "misi_2",
    missionName: "Misi 2: Rantai Makanan",
    title: "Urutan Rantai Makanan Sawah",
    category: "Rantai Makanan & Hubungan Makan",
    icon: "🌾",
    accentColor: "#388E3C",
    myth: "Rantai makanan bisa dimulai dari hewan pemangsa seperti Elang atau Ular.",
    fact: "Rantai makanan sawah yang benar selalu berurutan dari produsen ke konsumen: Padi ➔ Tikus ➔ Ular ➔ Elang! Padi dimakan tikus, tikus dimakan ular, dan ular dimakan elang.",
    sokrabotNote: "Ingat Detektif: Jangan terbalik! Tumbuhan hijau adalah fondasi awal yang memberi makan hewan pengerat dan pemangsa.",
    keyPoints: [
      "Padi = Produsen yang menyediakan sumber makanan.",
      "Tikus = Konsumen I yang memakan padi.",
      "Ular = Konsumen II yang memakan tikus.",
      "Elang = Konsumen III yang memakan ular."
    ]
  },
  {
    id: "codex_panah_energi",
    missionId: "misi_3",
    missionName: "Misi 3: Jejak Energi",
    title: "Misteri Tanda Panah & Aliran Energi",
    category: "Aliran Energi & Panah",
    icon: "⚡",
    accentColor: "#F57F17",
    myth: "Tanda panah Padi ➔ Tikus artinya padi memakan tikus atau siapa menyerang siapa.",
    fact: "Arah panah (A ➔ B) adalah SIMBOL PERPINDAHAN ENERGI dari makanan menuju tubuh yang memakan! Jadi arah Padi ➔ Tikus artinya energi di dalam padi berpindah ke tubuh tikus yang memakannya.",
    sokrabotNote: "Rahasia detektif: Ujung mata panah selalu menusuk ke tubuh hewan yang kenyang mendapatkan energi makanan!",
    keyPoints: [
      "Panah (➔) = Arah aliran atau perpindahan energi makanan.",
      "Bukan simbol mulut yang memakan atau siapa menyerang siapa.",
      "Matahari ➔ Padi ➔ Tikus ➔ Ular ➔ Elang."
    ]
  },
  {
    id: "codex_adaptasi_predator",
    missionId: "misi_4",
    missionName: "Misi 4: Siapa Memburu Siapa?",
    title: "Predator, Mangsa, & Peran Ganda",
    category: "Predator & Mangsa Sawah",
    icon: "🦅",
    accentColor: "#D84315",
    myth: "Tumbuhan adalah mangsa, dan seekor hewan hanya bisa menjadi predator saja.",
    fact: "Predator adalah hewan yang aktif memburu hewan lain (daging), sedangkan mangsa adalah hewan yang diburu. Suatu hewan seperti ular bisa memiliki PERAN GANDA: menjadi predator bagi tikus, tetapi sekaligus menjadi mangsa bagi elang!",
    sokrabotNote: "Di alam sawah, peran suatu organisme fleksibel tergantung hubungannya dengan organisme lain di rantai makanan.",
    keyPoints: [
      "Predator = Hewan pemburu dan pemangsa (ular & elang).",
      "Mangsa = Hewan yang diburu dan dimakan (tikus & ular).",
      "Peran ganda = Satu organisme bisa menjadi predator sekaligus mangsa."
    ]
  },
  {
    id: "codex_efek_domino",
    missionId: "misi_5",
    missionName: "Misi 5: Sawah dalam Bahaya!",
    title: "Efek Domino Dinamika Populasi",
    category: "Dinamika Populasi Sawah",
    icon: "⚠️",
    accentColor: "#C62828",
    myth: "Jika ular sawah berkurang, populasi tikus juga akan ikut berkurang atau tanaman padi aman.",
    fact: "Yang terjadi adalah EFEK DOMINO: Berkurangnya populasi ular (pemangsa) menyebabkan populasi tikus meledak pesat! Akibatnya, ribuan tikus memakan tanaman padi hingga rusak parah dan panen gagal!",
    sokrabotNote: "Rantai makanan ibarat deretan kartu domino. Ketika satu populasi terganggu, seluruh rantai akan merasakan dampaknya!",
    keyPoints: [
      "Efek domino = Satu gangguan memicu rangkaian dampak berantai.",
      "Pemangsa berkurang ➔ Populasi hama tikus meledak pesat.",
      "Tikus bertambah banyak ➔ Tanaman padi rusak dan berkurang drastis."
    ]
  },
  {
    id: "codex_keseimbangan_ekosistem",
    missionId: "misi_5",
    missionName: "Misi 5: Sawah dalam Bahaya!",
    title: "Keseimbangan Ekosistem Sawah",
    category: "Keseimbangan Ekosistem",
    icon: "🛡️",
    accentColor: "#1B5E20",
    myth: "Semua hewan pemangsa di sawah berbahaya dan sebaiknya dibasmi habis.",
    fact: "Setiap organisme dalam rantai makanan memiliki peran vital untuk menjaga keseimbangan alam. Menjaga predator alami seperti ular dan burung pemangsa sangat penting agar hama tetap terkendali dan sawah tetap subur dan lestari.",
    sokrabotNote: "Detektif sejati melindungi keseimbangan alam sawah agar padi tumbuh subur dan petani sejahtera!",
    keyPoints: [
      "Keseimbangan ekosistem = Kestabilan jumlah organisme di alam.",
      "Predator alami adalah sahabat petani untuk mengendalikan hama.",
      "Semua organisme saling terkait dalam jaring kehidupan sawah."
    ]
  }
];

export function getCodexById(codexId) {
  return CODEX_CARDS.find((c) => c.id === codexId) || CODEX_CARDS[0];
}

export function getCodexByMissionId(missionId) {
  return CODEX_CARDS.filter((c) => c.missionId === missionId);
}
