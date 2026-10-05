/**
 * SOKRABOT: Master Data 5 Misi Utama GBPM
 * Berdasarkan Diagram Alur Flowchart SOKRABOT Lengkap (Target: Kelas 5-6 SD Fase C)
 * Materi: Ekosistem Sawah — Mode: Percakapan Socratic Bercabang + Live Gemini AI
 * 
 * 5 Misi:
 *   Misi 1: Siapa Aku? (Peran Padi sebagai Produsen — Fotosintesis)
 *   Misi 2: Rantai Makanan (Urutan Hubungan Makan-Dimakan)
 *   Misi 3: Jejak Energi (Arti Panah & Aliran Energi)
 *   Misi 4: Siapa Memburu Siapa? (Predator & Mangsa)
 *   Misi 5: Sawah dalam Bahaya! (Dinamika Populasi)
 */

export const MISSIONS_DATA = [
  {
    id: "misi_1",
    code: "TP 1",
    missionNumber: 1,
    title: "Siapa Aku?",
    subTitle: "Peran Padi sebagai Produsen Mandiri",
    icon: "🌱",
    category: "Produsen & Fotosintesis",
    focus: "Bagaimana Padi Mendapatkan Makanannya (Konsep Produsen)",
    pedagogicalIndicator: "Menganalisis cara tumbuhan hijau (padi) mendapatkan makanan melalui fotosintesis dan memahami konsep produsen.",
    gradeLevel: "SD Kelas 5 - 6 (Fase C)",
    description: "Selidiki rahasia tanaman padi di sawah Pak Tani! Dari mana padi mendapatkan makanannya? Apakah menyerap makanan jadi dari tanah atau membuat makanannya sendiri dengan bantuan cahaya matahari?",
    misconceptions: [
      { id: "produsen_pemakan_pupuk", name: "Padi Mengambil Makanan Jadi dari Tanah", description: "Anggapan bahwa tanaman padi menyerap makanan yang sudah jadi atau memakan pupuk dari dalam tanah melalui akar." },
      { id: "padi_seperti_hewan", name: "Padi Memakan Makhluk Hidup Lain", description: "Anggapan bahwa tanaman padi memakan organisme lain seperti halnya hewan." }
    ],
    topics: ["Produsen", "Fotosintesis", "Cahaya Matahari", "Air & Mineral", "Akar & Daun"],
    characters: [
      { name: "Padi", emoji: "🌾", role: "Produsen (Membuat Makanan Sendiri)" },
      { name: "Matahari", emoji: "☀️", role: "Sumber Cahaya Fotosintesis" },
      { name: "Akar & Tanah", emoji: "🌱", role: "Penyerap Air & Mineral" }
    ],
    totalMainQuestions: 2,
    estimatedMinutes: 5,
    accentColor: "#2E7D32",
    badgeReward: { id: "badge_penemu_produsen", name: "Penemu Sang Produsen", icon: "🌱", description: "Menyelesaikan Misi 1 dengan membongkar rahasia fotosintesis padi (Minimal 2 ⭐)!" },
    codexUnlockIds: ["codex_produsen"],

    conversationConfig: {
      openingSpeech: [
        "Halo Detektif Cilik! 👋 Selamat datang di penyelidikan pertama bersama SOKRABOT!",
        "Perhatikan gambar ini: Padi 🌾 terlihat menjadi yang pertama dalam rantai makanan."
      ],
      concepts: [
        {
          id: "konsep_cara_padi_makan",
          title: "Cara Padi Mendapatkan Makanan",
          transitionSpeech: null,
          openingQuestion: "Bagaimana cara padi mendapatkan makanannya? Apakah membuat makanannya sendiri atau mengambil makanan jadi dari tanah? 🤔🌾",
          targetUnderstanding: "Padi membuat makanannya sendiri dengan bantuan cahaya matahari melalui proses fotosintesis. Akar hanya menyerap air dan mineral dari tanah sebagai bahan baku, bukan makanan jadi.",
          misconceptions: [
            { id: "produsen_pemakan_pupuk", keywords: ["dari tanah", "makan pupuk", "akar mengambil makanan", "makanan jadi dari tanah"] },
            { id: "padi_seperti_hewan", keywords: ["memakan hewan", "memakan makhluk lain", "menelan"] }
          ],
          confirmationKeywords: ["membuat makanannya sendiri", "cahaya matahari", "fotosintesis", "sendiri", "air dan mineral", "bukan makanan jadi"],
          hints: {
            h1: "Perhatikan daun hijau padi saat terkena sinar matahari pagi ☀️🌾",
            h2: "Apakah padi punya mulut untuk mengunyah makanan dari tanah? Padi memasak makanannya sendiri di daun! 💡",
            h3: null
          }
        },
        {
          id: "konsep_definisi_produsen",
          title: "Konsep Makhluk Hidup Produsen",
          transitionSpeech: [
            "Hebat sekali, Detektif! Kamu berhasil menemukan bahwa padi membuat makanannya sendiri!",
            "Sekarang, mari kita simpulkan peran penting tumbuhan hijau ini di alam..."
          ],
          openingQuestion: "Karena padi dapat membuat makanannya sendiri dan menjadi sumber makanan bagi makhluk lain, apa sebutan ilmiah untuk peran padi di ekosistem? 🌱",
          targetUnderstanding: "Makhluk hidup yang dapat membuat makanannya sendiri disebut PRODUSEN.",
          misconceptions: [
            { id: "padi_konsumen", keywords: ["konsumen", "pemangsa", "predator", "parasit"] }
          ],
          confirmationKeywords: ["produsen", "membuat sendiri", "penghasil makanan"],
          hints: {
            h1: "Kata ini berakar dari kata 'memproduksi' atau menghasilkan 💡",
            h2: "Tumbuhan hijau yang menghasilkan makanan sendiri disebut PRODUSEN! 🌱",
            h3: null
          }
        }
      ]
    }
  },

  {
    id: "misi_2",
    code: "TP 2",
    missionNumber: 2,
    title: "Rantai Makanan",
    subTitle: "Rantai Makanan, Arti Panah & Sumber Energi",
    icon: "🌾",
    category: "Rantai Makanan",
    focus: "Hubungan Makan-Dimakan, Arti Panah & Sumber Energi di Sawah",
    pedagogicalIndicator: "Menentukan urutan hubungan makan dan dimakan yang tepat, memahami arti tanda panah sebagai arah perpindahan energi, serta mengidentifikasi matahari sebagai sumber energi awal.",
    gradeLevel: "SD Kelas 5 - 6 (Fase C)",
    description: "Bantu Pak Tani menyusun urutan rantai makanan, menemukan arti tanda panah (→), dan menyelidiki dari mana sumber energi pertama berasal!",
    misconceptions: [
      { id: "urutan_terbalik", name: "Urutan Terbalik (Konsumen ke Produsen)", description: "Anggapan bahwa urutan rantai makanan dimulai dari pemangsa puncak (Elang) menuju produsen (Padi)." },
      { id: "urutan_salah", name: "Urutan Salah (Ular Makan Padi)", description: "Anggapan bahwa ular memakan padi dan padi dimakan oleh pemangsa." },
      { id: "panah_berarti_memakan", name: "Panah = Siapa Memakan Siapa", description: "Anggapan bahwa panah hanya berarti siapa memakan siapa, padahal panah menunjukkan arah perpindahan energi." },
      { id: "panah_urutan_saja", name: "Panah = Urutan Saja", description: "Anggapan bahwa panah hanya menunjukkan urutan makhluk hidup dari kecil ke besar." },
      { id: "energi_dari_tanah", name: "Energi dari Tanah", description: "Anggapan bahwa padi menyerap energi langsung dari tanah, padahal tanah hanya memberikan air dan mineral." },
      { id: "energi_dari_tikus", name: "Energi dari Konsumen", description: "Anggapan bahwa padi mendapatkan energi dari tikus." }
    ],
    topics: ["Rantai Makanan", "Hubungan Makan dan Dimakan", "Arti Tanda Panah", "Perpindahan Energi", "Sumber Energi Matahari", "Produsen & Konsumen", "Sawah"],
    characters: [
      { name: "Padi", emoji: "🌾", role: "Produsen (Dimakan Tikus)" },
      { name: "Tikus", emoji: "🐀", role: "Konsumen I (Memakan Padi)" },
      { name: "Ular", emoji: "🐍", role: "Konsumen II (Memakan Tikus)" },
      { name: "Elang", emoji: "🦅", role: "Konsumen III (Memakan Ular)" }
    ],
    totalMainQuestions: 5,
    estimatedMinutes: 12,
    accentColor: "#388E3C",
    badgeReward: { id: "badge_ahli_penghuni", name: "Ahli Rantai Makanan", icon: "🌾", description: "Menyelesaikan Misi 2 dengan minimal perolehan 2 Bintang (⭐)." },
    codexUnlockIds: ["codex_rantai_makanan"],

    conversationConfig: {
      openingSpeech: [
        "Halo Detektif Cilik! 👋 Selamat datang di Pos Pengamatan 2 bersama SOKRABOT!",
        "Di sawah Pak Tani, kita menemukan beberapa makhluk hidup: padi 🌾, tikus 🐀, ular 🐍, dan elang 🦅."
      ],
      concepts: [
        {
          id: "konsep_urutan_rantai",
          title: "Urutan Rantai Makanan Sawah",
          transitionSpeech: null,
          openingQuestion: "Manakah urutan hubungan makan dan dimakan yang tepat antara padi, tikus, ular, dan elang? 🤔🌾",
          targetUnderstanding: "Urutan yang tepat adalah Padi → Tikus → Ular → Elang, di mana padi dimakan tikus, tikus dimakan ular, dan ular dimakan elang.",
          misconceptions: [
            { id: "urutan_terbalik", keywords: ["elang ular tikus padi", "terbalik", "elang dulu", "dari elang", "pemangsa pertama"] },
            { id: "urutan_salah", keywords: ["padi ular", "ular makan padi", "tikus makan ular"] }
          ],
          confirmationKeywords: ["padi tikus ular elang", "padi dimakan tikus", "tikus dimakan ular", "ular dimakan elang", "rantai makanan", "makan dan dimakan"],
          hints: {
            h1: "Pikirkan siapa yang dimakan oleh siapa. Tikus suka memakan apa di sawah? 🐀🌾",
            h2: "Urutan dimulai dari tanaman padi yang dimakan oleh hewan pengerat, lalu hewan itu dimakan ular! 💡",
            h3: null
          }
        },
        {
          id: "konsep_alasan_urutan",
          title: "Hubungan Makan dan Dimakan",
          transitionSpeech: [
            "Luar biasa, Detektif! Kamu berhasil menemukan urutan yang tepat!",
            "Sekarang, mari kita pastikan kamu memahami alasan di balik urutan tersebut..."
          ],
          openingQuestion: "Mengapa urutan Padi → Tikus → Ular → Elang adalah urutan yang tepat? Ceritakan siapa memakan siapa! 🌾🐀🐍🦅",
          targetUnderstanding: "Padi dimakan tikus, tikus dimakan ular, dan ular dimakan elang. Rantai makanan menunjukkan urutan hubungan makan dan dimakan secara berantai.",
          misconceptions: [
            { id: "ular_makan_padi", keywords: ["ular makan padi", "elang makan padi"] }
          ],
          confirmationKeywords: ["padi dimakan tikus", "tikus dimakan ular", "ular dimakan elang", "makan", "dimakan", "rantai", "memakan"],
          hints: {
            h1: "Ular tidak bisa memakan bulir padi langsung, ia mencari mangsa daging di pematang sawah 🐍",
            h2: "Elang terbang tinggi mengincar ular, ular mengincar tikus, dan tikus memakan bulir padi Pak Tani 💡",
            h3: null
          }
        }
      ]
    }
  },

  {
    id: "misi_3",
    code: "TP 3",
    missionNumber: 3,
    title: "Siapa Memburu Siapa?",
    subTitle: "Predator dan Mangsa di Sawah",
    icon: "🐍",
    category: "Predator & Mangsa",
    focus: "Peran Predator dan Mangsa di Ekosistem Sawah",
    pedagogicalIndicator: "Mengidentifikasi peran predator (pemangsa) dan mangsa dalam interaksi berburu di ekosistem sawah.",
    gradeLevel: "SD Kelas 5 - 6 (Fase C)",
    description: "Di sawah Pak Tani, seekor ular terlihat memburu dan memakan tikus! Selidiki siapakah yang bertindak sebagai predator dan siapakah mangsa!",
    misconceptions: [
      { id: "predator_karena_ukuran", name: "Predator Karena Ukuran Tubuh", description: "Anggapan bahwa hewan disebut predator hanya karena ukuran tubuhnya yang besar, bukan karena perilakunya memburu dan memakan hewan lain." },
      { id: "peran_terbalik", name: "Peran Terbalik", description: "Kebingungan menentukan siapa yang memburu dan siapa yang diburu antara ular dan tikus." }
    ],
    topics: ["Predator", "Mangsa", "Ular & Tikus", "Interaksi Berburu", "Sawah"],
    characters: [
      { name: "Elang", emoji: "🦅", role: "Predator Ular (Pemangsa Puncak)" },
      { name: "Ular", emoji: "🐍", role: "Predator Tikus & Mangsa Elang" },
      { name: "Tikus", emoji: "🐀", role: "Mangsa Ular" }
    ],
    totalMainQuestions: 4,
    estimatedMinutes: 10,
    accentColor: "#E65100",
    badgeReward: { id: "badge_pelacak_predator", name: "Pengamat Predator", icon: "🐍", description: "Menyelesaikan Penyelidikan Predator dan Mangsa!" },
    codexUnlockIds: ["codex_predator_mangsa"],

    conversationConfig: {
      openingSpeech: [
        "Selamat datang di Pos Pengamatan 3, Detektif Cilik! ⚡",
        "Pak Tani sedang memperhatikan tanda panah pada diagram Padi → Tikus 🌾🐀."
      ],
      concepts: [
        {
          id: "konsep_arti_panah",
          title: "Arti Tanda Panah pada Rantai Makanan",
          transitionSpeech: null,
          openingQuestion: "Pada gambar Padi → Tikus, menurutmu apa arti tanda panah tersebut? ⚡🤔",
          targetUnderstanding: "Tanda panah (→) menunjukkan perpindahan atau aliran energi dari organisme yang dimakan (padi) ke organisme yang memakan (tikus).",
          misconceptions: [
            { id: "panah_siapa_makan_siapa", keywords: ["siapa memakan siapa", "padi memakan tikus", "mulut memakan"] },
            { id: "padi_dapat_energi_tikus", keywords: ["padi dapat energi dari tikus", "padi menyerap tikus", "energi dari tikus ke padi"] }
          ],
          confirmationKeywords: ["energi", "berpindah", "aliran energi", "padi ke tikus", "perpindahan energi", "energi padi", "ke tubuh tikus"],
          hints: {
            h1: "Saat tikus memakan padi, apa yang masuk dan tersimpan di dalam tubuh tikus sehingga ia bisa berlari? ⚡🐀",
            h2: "Tanda panah bukan sekadar siapa makan siapa, tapi menunjukkan ke mana ENERGI itu mengalir! 💡",
            h3: null
          }
        },
        {
          id: "konsep_sumber_energi_padi",
          title: "Sumber Energi Tanaman Padi",
          transitionSpeech: [
            "Hebat sekali Detektif! Kamu sudah tahu bahwa panah artinya aliran energi!",
            "Sekarang, mari kita cari tahu dari mana asal energi tanaman padi itu sendiri..."
          ],
          openingQuestion: "Dari mana tanaman padi memperoleh energi untuk tumbuh dan membuat makanannya sendiri? 🌾☀️",
          targetUnderstanding: "Padi memperoleh energi dari cahaya matahari melalui proses fotosintesis untuk membuat makanannya sendiri sebagai produsen.",
          misconceptions: [
            { id: "padi_dapat_energi_dari_hewan", keywords: ["dari tikus", "dari cacing", "dari pupuk saja", "memakan hewan"] }
          ],
          confirmationKeywords: ["matahari", "cahaya", "sinar", "fotosintesis", "sendiri", "produsen", "cahaya matahari"],
          hints: {
            h1: "Apa yang menyinari sawah Pak Tani setiap pagi hari dari langit? ☀️",
            h2: "Padi berdaun hijau menangkap cahaya matahari untuk fotosintesis membuat makanannya sendiri! 💡",
            h3: null
          }
        }
      ]
    }
  },

  {
    id: "misi_4",
    code: "TP 4",
    missionNumber: 4,
    title: "Sawah dalam Bahaya!",
    subTitle: "Dinamika Populasi & Keseimbangan Sawah",
    icon: "⚠️",
    category: "Dinamika Populasi",
    focus: "Efek Domino Penurunan Populasi Predator terhadap Keseimbangan Sawah",
    pedagogicalIndicator: "Menganalisis dampak berkurangnya satu populasi terhadap populasi lain dan keseimbangan ekosistem.",
    gradeLevel: "SD Kelas 5 - 6 (Fase C)",
    description: "Gawat! Populasi Ular di sawah berkurang drastis. Apa yang akan terjadi pada populasi Tikus dan tanaman Padi Pak Tani?",
    misconceptions: [
      { id: "ular_berkurang_tikus_berkurang", name: "Ular Berkurang Tikus Ikut Berkurang", description: "Anggapan keliru bahwa jika pemangsa berkurang, mangsanya juga ikut berkurang." },
      { id: "padi_tidak_terpengaruh", name: "Padi Tidak Terpengaruh Hilangnya Ular", description: "Anggapan bahwa padi tidak terpengaruh oleh berkurangnya populasi ular di sawah." }
    ],
    topics: ["Dinamika Populasi", "Efek Domino", "Keseimbangan Ekosistem", "Hama Tikus"],
    characters: [
      { name: "Padi", emoji: "🌾", role: "Terancam Hama Tikus" },
      { name: "Tikus", emoji: "🐀", role: "Populasi Meledak" },
      { name: "Ular", emoji: "🐍", role: "Populasi Berkurang Drastis" }
    ],
    totalMainQuestions: 5,
    estimatedMinutes: 6,
    accentColor: "#C62828",
    badgeReward: { id: "badge_penyelamat_ekosistem", name: "Penjaga Keseimbangan Ekosistem", icon: "🛡️", description: "Menyelesaikan Misi 4 dan memahami pentingnya menjaga keseimbangan ekosistem (3 ⭐)!" },
    codexUnlockIds: ["codex_efek_domino", "codex_keseimbangan_ekosistem"],

    conversationConfig: {
      openingSpeech: [
        "Gawat, Detektif Cilik! Ada kabar darurat dari sawah Pak Tani ⚠️!",
        "Karena banyak yang takut, ular-ular di sawah ditangkap dan jumlahnya berkurang drastis! 😱"
      ],
      concepts: [
        {
          id: "konsep_efek_tikus",
          title: "Dampak Berkurangnya Ular terhadap Populasi Tikus",
          transitionSpeech: null,
          openingQuestion: "Jika jumlah ular di sawah berkurang drastis, apa yang akan terjadi pada jumlah populasi tikus? Mengapa demikian? 🐍🐀",
          targetUnderstanding: "Jumlah tikus akan bertambah banyak karena pemangsanya (ular) berkurang, sehingga tikus lebih bebas berkembang biak tanpa ancaman.",
          misconceptions: [
            { id: "ular_berkurang_tikus_berkurang", keywords: ["tikus ikut berkurang", "tikus berkurang", "tikus mati", "tikus habis"] }
          ],
          confirmationKeywords: ["tikus bertambah", "makin banyak", "meledak", "pemangsa berkurang", "tidak ada yang memburu", "tikus meningkat"],
          hints: {
            h1: "Ular adalah pemburu alami yang mengontrol tikus. Jika pemburunya hilang, apakah tikus aman? 🐀",
            h2: "Tanpa pemangsa alami, tikus akan bebas mencari makan dan bertambah banyak berlipat ganda! 💡",
            h3: null
          }
        },
        {
          id: "konsep_efek_domino_keseimbangan",
          title: "Efek Domino terhadap Padi dan Keseimbangan",
          transitionSpeech: [
            "Analisis yang tepat sekali! Populasi tikus meledak tanpa pemangsa!",
            "Sekarang, mari kita telusuri dampak lanjutannya terhadap sawah Pak Tani..."
          ],
          openingQuestion: "Ketika jumlah tikus bertambah sangat banyak, apa yang akan terjadi pada tanaman padi Pak Tani dan keseimbangan ekosistem sawah? 🌾💥",
          targetUnderstanding: "Tanaman padi akan semakin banyak dimakan oleh hama tikus sehingga padi rusak dan berkurang. Perubahan pada satu organisme mempengaruhi organisme lainnya dan mengganggu keseimbangan ekosistem.",
          misconceptions: [
            { id: "padi_tidak_terpengaruh", keywords: ["padi tetap", "tidak ada hubungan", "padi aman", "padi bertambah"] }
          ],
          confirmationKeywords: ["padi berkurang", "padi rusak", "gagal panen", "dimakan tikus", "keseimbangan terganggu", "saling terkait", "efek domino"],
          hints: {
            h1: "Tikus-tikus yang kelaparan akan menyerbu apa yang ada di sawah? 🌾🐀",
            h2: "Ribuan tikus akan memakan padi Pak Tani hingga habis! Inilah bukti bahwa semua makhluk di sawah saling terkait. 💡",
            h3: {
              image: "/visual_domino_populasi.jpg",
              label: "Diagram Efek Domino Sawah",
              text: "Ular berkurang → Populasi tikus meledak → Padi habis dimakan tikus → Keseimbangan sawah terganggu."
            }
          }
        }
      ]
    }
  },

  {
    id: "misi_5",
    code: "TP 5",
    missionNumber: 5,
    title: "Jaga Keseimbangan!",
    subTitle: "Solusi Ekosistem & PBL Keseimbangan",
    icon: "🛡️",
    category: "Solusi & Keseimbangan Ekosistem",
    focus: "Mengevaluasi Tindakan Manusia terhadap Keseimbangan Ekosistem Sawah",
    pedagogicalIndicator: "Mengevaluasi dampak tindakan manusia (membasmi tikus) terhadap keseimbangan ekosistem dan menemukan solusi yang tepat.",
    gradeLevel: "SD Kelas 5 - 6 (Fase C)",
    description: "Pak Tani ingin membasmi semua tikus di sawah! Apakah itu solusi yang tepat? Selidiki dampaknya terhadap rantai makanan dan temukan cara yang lebih bijak untuk menjaga keseimbangan ekosistem!",
    misconceptions: [
      { id: "basmi_semua_tepat", name: "Membasmi Semua Tikus Tepat", description: "Anggapan bahwa membasmi seluruh tikus adalah solusi tepat tanpa mempertimbangkan dampaknya terhadap rantai makanan." },
      { id: "tidak_memengaruhi_salah", name: "Tidak Memengaruhi Organisme Lain", description: "Anggapan bahwa menghilangkan satu spesies tidak akan memengaruhi organisme lain dalam ekosistem." }
    ],
    topics: ["Keseimbangan Ekosistem", "Solusi Bijak", "Dampak Tindakan Manusia", "Pengendalian Populasi", "Rantai Makanan"],
    characters: [
      { name: "Pak Tani", emoji: "👨‍🌾", role: "Pengambil Keputusan" },
      { name: "Tikus", emoji: "🐀", role: "Populasi yang Ingin Dibasmi" },
      { name: "Ular", emoji: "🐍", role: "Predator yang Terancam Kehilangan Makanan" }
    ],
    totalMainQuestions: 3,
    estimatedMinutes: 8,
    accentColor: "#1565C0",
    badgeReward: { id: "badge_penjaga_ekosistem", name: "Penjaga Ekosistem Sejati", icon: "🛡️", description: "Menyelesaikan Misi 5 dan memahami pentingnya solusi bijak untuk menjaga keseimbangan ekosistem!" },
    codexUnlockIds: ["codex_keseimbangan_solusi"],

    conversationConfig: {
      openingSpeech: [
        "Perhatian Detektif Cilik! Ada masalah besar di sawah Pak Tani ⚠️!",
        "Tikus menjadi terlalu banyak dan Pak Tani ingin membasmi semuanya! Apakah itu bijak? 🤔"
      ],
      concepts: [
        {
          id: "konsep_basmi_tikus",
          title: "Dampak Membasmi Semua Tikus",
          transitionSpeech: null,
          openingQuestion: "Bagaimana kalau semua tikus di sawah dibasmi saja? Apakah itu solusi yang tepat? 🐀❌",
          targetUnderstanding: "Membasmi semua tikus bukan solusi tepat karena tikus adalah makanan ular. Menghilangkan tikus akan membuat ular kekurangan makanan dan mengganggu keseimbangan ekosistem.",
          misconceptions: [
            { id: "basmi_semua_tepat", keywords: ["basmi saja", "hilangkan semua", "padi aman", "tidak perlu tikus"] }
          ],
          confirmationKeywords: ["tidak tepat", "ular kekurangan makanan", "keseimbangan terganggu", "rantai makanan", "saling terhubung"],
          hints: {
            h1: "Pikirkan: siapa yang memakan tikus di sawah? Jika tikus hilang, apa yang terjadi pada pemangsa tikus? 🐍",
            h2: "Ular memakan tikus. Jika semua tikus dibasmi, ular kehilangan makanan dan keseimbangan ekosistem terganggu! 💡",
            h3: null
          }
        },
        {
          id: "konsep_solusi_bijak",
          title: "Solusi Bijak Mengendalikan Populasi",
          transitionSpeech: [
            "Hebat! Kamu sudah paham bahwa membasmi semua tikus bukan solusi!",
            "Sekarang, mari temukan solusi yang lebih bijak..."
          ],
          openingQuestion: "Tindakan mana yang lebih tepat: membasmi semua tikus atau mengendalikan jumlahnya tanpa menghilangkan mereka dari ekosistem? 🌿",
          targetUnderstanding: "Yang tepat adalah mengendalikan jumlah tikus agar tidak terlalu banyak, tetapi tetap menjaga keberadaannya di ekosistem agar rantai makanan tetap seimbang.",
          misconceptions: [
            { id: "basmi_semua_tetap_salah", keywords: ["basmi semua", "hilangkan", "musnahkan"] }
          ],
          confirmationKeywords: ["mengendalikan", "tidak menghilangkan", "seimbang", "tetap ada", "populasi terkendali"],
          hints: {
            h1: "Apakah kita perlu menghilangkan tikus sepenuhnya, atau cukup mengendalikan jumlahnya? 🤔",
            h2: "Mengendalikan populasi tikus lebih bijak daripada membasmi semua! Ekosistem tetap seimbang. 💡",
            h3: null
          }
        }
      ]
    }
  }
];

export function getMissionById(missionId) {
  return MISSIONS_DATA.find((m) => m.id === missionId) || MISSIONS_DATA[0];
}

export function getNextMissionId(currentMissionId) {
  const currentIndex = MISSIONS_DATA.findIndex((m) => m.id === currentMissionId);
  if (currentIndex >= 0 && currentIndex < MISSIONS_DATA.length - 1) {
    return MISSIONS_DATA[currentIndex + 1].id;
  }
  return null;
}
