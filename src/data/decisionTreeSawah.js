/**
 * SOKRABOT Master Decision Trees & Socratic Flowchart Matrix
 * Sesuai dengan Diagram Alur GBPM Terbaru
 * 5 Misi Utama:
 *   Misi 1: Siapa Aku? (Peran Padi sebagai Produsen — Fotosintesis)
 *   Misi 2: Rantai Makanan (Urutan Hubungan Makan-Dimakan)
 *   Misi 3: Jejak Energi (Arti Panah & Aliran Energi) — Sub 2.1, 2.2, 2.3, 2.4 PBL4, PBL5
 *   Misi 4: Predator & Mangsa — Sub P1, P2, P3, PBL4
 *   Misi 5: Dinamika Populasi — Sub PBL3 P1, P2, P3, PBL4, Refleksi
 */

export const DECISION_TREES = {
  // =========================================================================
  // MISI 1: SIAPA AKU? (Peran Padi sebagai Produsen)
  // =========================================================================
  // MISI 1: SIAPA AKU? (Peran Padi sebagai Produsen)
  // Sesuai Diagram GBPM "MISI 1" — Bagaimana cara padi mendapatkan makanannya
  // =========================================================================
  misi_1: {
    missionId: "misi_1",
    title: "Misi 1: Siapa Aku? (Peran Produsen)",
    startNodeId: "m0_start",
    totalMainQuestions: 2,
    nodes: {
      // ── KOTAK AWAL (Padi sebagai Produsen) ───────────────────────────────
      "m0_start": {
        id: "m0_start",
        isMain: true,
        mainIndex: 1,
        title: "Cara Padi Mendapatkan Makanan",
        image: "/visual_padi_produsen.jpg",
        imageAlt: "Padi memanfaatkan cahaya matahari (fotosintesis)",
        imageCaption: "Padi memanfaatkan sinar matahari untuk membuat makanannya sendiri (fotosintesis)",
        question: "Padi terlihat menjadi yang pertama dalam rantai makanan di sawah 🌾.\n\nBagaimana cara padi mendapatkan makanannya?",
        options: [
          {
            id: "A",
            text: "Padi membuat makanannya sendiri dengan bantuan cahaya matahari.",
            next: "m0_a_open"
          },
          {
            id: "B",
            text: "Padi mengambil makanan yang sudah jadi dari tanah melalui akar.",
            misconceptionTriggered: "produsen_pemakan_pupuk",
            next: "m0_bc_open"
          },
          {
            id: "C",
            text: "Padi mendapatkan makanan dengan memakan makhluk hidup lain.",
            misconceptionTriggered: "padi_seperti_hewan",
            next: "m0_bc_open"
          }
        ],
        hintLevel1: "Perhatikan daun hijau padi saat terkena sinar matahari pagi ☀️🌾",
        hintLevel2: "Apakah padi punya mulut untuk mengunyah makanan dari tanah? 🤔"
      },

      // ── SISWA A: Mengapa kamu memilih jawaban itu? (Terbuka) ──────────────
      "m0_a_open": {
        id: "m0_a_open",
        isMain: false,
        title: "Alasan Memilih Jawaban Itu",
        question: "Mengapa kamu memilih jawaban itu?",
        isOpenEnded: true,
        placeholder: "Ketik alasanmu di sini...",
        conceptContext: {
          concept: "Padi membuat makanannya sendiri melalui fotosintesis dengan bantuan cahaya matahari, bukan mengambil makanan jadi dari tanah",
          keywords: ["fotosintesis", "cahaya", "matahari", "sendiri", "membuat", "daun", "klorofil", "memasak"],
          misconceptions: ["dari tanah", "makan pupuk", "akar mengambil makanan", "memakan", "menelan"]
        },
        nextOnAligned: "m0_periksa_akar",
        nextOnMisconception: "m0_klarifikasi_1"
      },

      // ── SISWA B (Miskonsepsi): Alasan Memilih Jawaban ──────────────────────
      "m0_bc_open": {
        id: "m0_bc_open",
        isMain: false,
        title: "Eksplorasi Alasan Miskonsepsi",
        question: "Kamu memilih bahwa padi mendapatkan makanan yang sudah jadi dari tanah. Mengapa kamu berpikir begitu?",
        isOpenEnded: true,
        placeholder: "Ketik alasanmu di sini...",
        conceptContext: {
          concept: "Padi tidak mengambil makanan jadi dari tanah dan tidak memakan makhluk lain. Padi membuat makanannya sendiri dengan fotosintesis.",
          keywords: ["sendiri", "cahaya", "matahari", "fotosintesis", "membuat"],
          misconceptions: ["dari tanah", "akar ambil makanan", "makan pupuk", "memakan hewan", "menelan"]
        },
        nextOnAligned: "m0_akar_tanah",
        nextOnMisconception: "m0_akar_tanah"
      },

      // ── SISWA MENJAWAB SESUAI KONSEP: Periksa Pemikiran ───────────────────
      "m0_periksa_akar": {
        id: "m0_periksa_akar",
        isMain: false,
        title: "Periksa Lagi Pemikiranmu",
        introSpeech: [
          "Bagus! Sekarang kita periksa lagi pemikiranmu."
        ],
        question: "Kalau padi membuat makanannya sendiri, apa yang diambil akar dari tanah?",
        options: [
          {
            id: "A",
            text: "Makanan yang sudah jadi",
            next: "m0_tyaah"
          },
          {
            id: "B",
            text: "Air dan mineral",
            next: "m0_lalu_apa"
          }
        ]
      },

      // ── SISWA MENJAWAB TIDAK SESUAI KONSEP (Klarifikasi 1) ─────────────────
      "m0_klarifikasi_1": {
        id: "m0_klarifikasi_1",
        isMain: false,
        title: "Klarifikasi 1: Pemikiran Awal",
        introSpeech: [
          "Mari kita periksa lagi pemikiranmu 🔍."
        ],
        question: "Kalau padi membuat makanannya sendiri, apa yang diambil akar dari tanah?",
        options: [
          {
            id: "A",
            text: "Makanan yang sudah jadi",
            next: "m0_tyaah"
          },
          {
            id: "B",
            text: "Air dan mineral",
            next: "m0_lalu_apa"
          }
        ]
      },

      // ── SISWA B: Tyeahh! Makanan Jadi dari Tanah? ─────────────────────────
      "m0_tyaah": {
        id: "m0_tyaah",
        isMain: false,
        title: "Klarifikasi Makanan dari Tanah",
        introSpeech: [
          "Tyeahh! 😮"
        ],
        question: "Jadi, apakah padi mengambil makanan yang sudah jadi dari tanah?",
        options: [
          {
            id: "A",
            text: "Tidak",
            next: "m0_lalu_apa"
          },
          {
            id: "B",
            text: "Iya",
            next: "m0_klarifikasi_2"
          }
        ]
      },

      // ── SISWA "TIDAK": Lalu Apa yang Dilakukan Padi? ──────────────────────
      "m0_lalu_apa": {
        id: "m0_lalu_apa",
        isMain: false,
        title: "Lalu Apa yang Dilakukan Padi?",
        question: "Lalu apa yang dilakukan padi dengan air dan mineral tersebut?",
        options: [
          {
            id: "A",
            text: "Membuat makanannya sendiri dengan bantuan cahaya matahari.",
            next: "m0_reinforcement"
          },
          {
            id: "B",
            text: "Menyimpannya langsung tanpa perlu mengolahnya.",
            next: "m0_reinforcement"
          },
          {
            id: "C",
            text: "Mengubahnya langsung menjadi padi tanpa butuh daun.",
            next: "m0_reinforcement"
          }
        ]
      },

      // ── SISWA "IYA" (Klarifikasi 2) ────────────────────────────────────────
      "m0_klarifikasi_2": {
        id: "m0_klarifikasi_2",
        isMain: false,
        title: "Klarifikasi 2: Padi & Makanan Tanah",
        introSpeech: [
          "Hmm, mari kita selidiki lebih dalam 🤔."
        ],
        question: "Jika makanan padi sudah tersedia di dalam tanah, mengapa padi membutuhkan cahaya matahari?",
        options: [
          {
            id: "A",
            text: "Untuk membantu membuat makanan.",
            next: "m0_dua_petunjuk"
          },
          {
            id: "B",
            text: "Agar tanah menjadi makanan.",
            next: "m0_klarifikasi_4"
          }
        ]
      },

      // ── DARI PATH MISKONSEPSI: Menurutmu apa yang diserap akar dari tanah? ──
      "m0_akar_tanah": {
        id: "m0_akar_tanah",
        isMain: false,
        title: "Apa yang Diserap Akar dari Tanah?",
        question: "Menurutmu, apa yang diserap akar dari tanah?",
        options: [
          {
            id: "A",
            text: "Air dan mineral",
            next: "m0_cahaya"
          },
          {
            id: "B",
            text: "Makanan yang sudah jadi",
            next: "m0_klarifikasi_3"
          }
        ]
      },

      // ── SISWA MENJAWAB B (Klarifikasi 3) ──────────────────────────────────
      "m0_klarifikasi_3": {
        id: "m0_klarifikasi_3",
        isMain: false,
        title: "Klarifikasi 3: Peran Tanah & Makanan",
        introSpeech: [
          "Akar sebenarnya menyerap air dan mineral yang terlarut di dalam tanah, bukan makanan yang sudah jadi.",
          "Coba kita pikirkan petunjuk berikutnya..."
        ],
        question: "Jika makanan padi sudah tersedia di dalam tanah, mengapa padi membutuhkan cahaya matahari?",
        options: [
          {
            id: "A",
            text: "Untuk membantu membuat makanan.",
            next: "m0_dua_petunjuk"
          },
          {
            id: "B",
            text: "Agar tanah menjadi makanan.",
            next: "m0_klarifikasi_4"
          }
        ]
      },

      // ── JIKA SISWA MENJAWAB A: Bagus. Berarti akar mengambil air dan mineral ─
      "m0_cahaya": {
        id: "m0_cahaya",
        isMain: false,
        title: "Peran Cahaya Matahari",
        introSpeech: [
          "Bagus. Berarti akar mengambil air dan mineral.",
          "Sekarang pikirkan satu hal lagi."
        ],
        question: "Jika makanan padi sudah tersedia di dalam tanah, mengapa padi membutuhkan cahaya matahari?",
        options: [
          {
            id: "A",
            text: "Untuk membantu membuat makanan.",
            next: "m0_dua_petunjuk"
          },
          {
            id: "B",
            text: "Agar tanah menjadi makanan.",
            next: "m0_klarifikasi_4"
          }
        ]
      },

      // ── SISWA B (Klarifikasi 4) ───────────────────────────────────────────
      "m0_klarifikasi_4": {
        id: "m0_klarifikasi_4",
        isMain: false,
        title: "Klarifikasi 4: Tanah Menjadi Makanan?",
        introSpeech: [
          "Tanah tidak berubah menjadi makanan, Detektif.",
          "Cahaya matahari diserap oleh daun hijau untuk memasak makanannya!"
        ],
        question: "Kita sudah menemukan dua petunjuk:\n• Akar → mengambil air dan mineral.\n• Cahaya matahari → membantu padi membuat makanan.\n\nJadi, apakah tanah memberikan makanan yang sudah jadi kepada padi?",
        options: [
          {
            id: "A",
            text: "Tidak",
            next: "m0_kembali_awal"
          },
          {
            id: "B",
            text: "Iya",
            next: "m0_kembali_awal"
          }
        ]
      },

      // ── SISWA A: Kita sudah menemukan dua petunjuk ─────────────────────────
      "m0_dua_petunjuk": {
        id: "m0_dua_petunjuk",
        isMain: false,
        title: "Dua Petunjuk Penting",
        introSpeech: [
          "Kita sudah menemukan dua petunjuk:\n• Akar → mengambil air dan mineral.\n• Cahaya matahari → membantu padi membuat makanan."
        ],
        question: "Jadi, apakah tanah memberikan makanan yang sudah jadi kepada padi?",
        options: [
          {
            id: "A",
            text: "Tidak",
            next: "m0_kembali_awal"
          },
          {
            id: "B",
            text: "Iya",
            next: "m0_kembali_awal"
          }
        ]
      },

      // ── SISWA "TIDAK" (Meninjau Kembali): Pertanyaan Awal ─────────────────
      "m0_kembali_awal": {
        id: "m0_kembali_awal",
        isMain: false,
        title: "Meninjau Kembali Pertanyaan Awal",
        introSpeech: [
          "Bagus! Sekarang coba jawab kembali pertanyaan awal."
        ],
        question: "Bagaimana padi mendapatkan makanannya?",
        options: [
          {
            id: "A",
            text: "Membuat makanannya sendiri dengan bantuan cahaya matahari.",
            next: "m0_reinforcement"
          },
          {
            id: "B",
            text: "Mengambil makanan yang sudah jadi dari tanah.",
            next: "m0_klarifikasi_5"
          },
          {
            id: "C",
            text: "Memakan makhluk hidup lain.",
            next: "m0_klarifikasi_5"
          }
        ]
      },

      // ── SISWA B / C (Klarifikasi 5) ────────────────────────────────────────
      "m0_klarifikasi_5": {
        id: "m0_klarifikasi_5",
        isMain: false,
        title: "Klarifikasi 5: Penguatan Konsep Akhir",
        introSpeech: [
          "Ingat dua petunjuk kita tadi:\n• Akar menyerap air dan mineral sebagai bahan.\n• Daun menggunakan cahaya matahari untuk membuat makanannya sendiri!"
        ],
        question: "Jadi, bagaimana padi mendapatkan makanannya?",
        options: [
          {
            id: "A",
            text: "Membuat makanannya sendiri dengan bantuan cahaya matahari.",
            next: "m0_reinforcement"
          },
          {
            id: "B",
            text: "Menyerap makanan yang sudah jadi dari tanah melalui akar.",
            next: "m0_reinforcement"
          },
          {
            id: "C",
            text: "Memakan bangkai serangga dan hewan kecil di sekitarnya.",
            next: "m0_reinforcement"
          }
        ]
      },

      // ── KOTAK AKHIR: SISWA "Membuat makanannya sendiri" -> PRODUSEN ────────
      "m0_reinforcement": {
        id: "m0_reinforcement",
        isMain: true,
        isConceptCompleted: true,
        isEnd: true,
        mainIndex: 2,
        title: "Konsep PRODUSEN Ditemukan!",
        question: "Tepat!\nPadi dapat membuat makanannya sendiri dengan bantuan cahaya matahari. Akar membantu menyerap air dan mineral dari tanah.\n\nMakhluk hidup yang dapat membuat makanannya sendiri disebut PRODUSEN.\nKamu menemukan konsep pertama: PRODUSEN. 🏆",
        options: [
          {
            id: "Lanjut",
            text: "Lanjut ke Misi 2: Rantai Makanan! 🌾➔🐀➔🐍➔🦅",
            next: "END"
          }
        ]
      }
    }
  },

  // =========================================================================
  // MISI 2: RANTAI MAKANAN (Urutan Hubungan Makan dan Dimakan)
  // Sesuai Diagram GBPM "MISI 2"
  // =========================================================================

  misi_2: {
    missionId: "misi_2",
    title: "Misi 2: Rantai Makanan",
    startNodeId: "m1_start",
    totalMainQuestions: 5,
    nodes: {
      // ── KOTAK AWAL: Pertanyaan Urutan Rantai Makanan ──────────────────────
      "m1_start": {
        id: "m1_start",
        isMain: true,
        mainIndex: 1,
        title: "Urutan Rantai Makanan Sawah",
        introSpeech: [
          "Halo Detektif Cilik! 👋 Selamat datang di penyelidikan pertama bersama SOKRABOT!",
          "Di sawah Pak Tani, kita menemukan beberapa makhluk hidup: padi 🌾, tikus 🐀, ular 🐍, dan elang 🦅."
        ],
        question: "Manakah urutan hubungan makan dan dimakan yang tepat?",
        options: [
          {
            id: "A",
            text: "Padi → Tikus → Ular → Elang",
            next: "m1_a_open"
          },
          {
            id: "B",
            text: "Elang → Ular → Tikus → Padi",
            misconceptionTriggered: "urutan_terbalik",
            next: "m1_bc_open"
          },
          {
            id: "C",
            text: "Padi → Ular → Tikus → Elang",
            misconceptionTriggered: "urutan_salah",
            next: "m1_bc_open"
          }
        ],
        hintLevel1: "Pikirkan siapa yang dimakan oleh siapa. Tikus suka memakan apa di sawah? 🐀🌾",
        hintLevel2: "Urutan dimulai dari yang dimakan pertama: Padi dimakan oleh... lalu hewan itu dimakan oleh siapa lagi?"
      },

      // ── SISWA PILIH A (Benar): Tanya Alasan ──────────────────────────────
      "m1_a_open": {
        id: "m1_a_open",
        isMain: false,
        title: "Alasan Urutan Benar",
        question: "Mengapa kamu memilih urutan tersebut? Ceritakan alasanmu! 🤔",
        isOpenEnded: true,
        placeholder: "Ketik alasanmu di sini... Mengapa urutan itu yang benar?",
        conceptContext: {
          concept: "Padi dimakan tikus, tikus dimakan ular, ular dimakan elang — urutan berdasarkan siapa memakan siapa dalam rantai makanan sawah",
          keywords: ["padi dimakan tikus", "tikus dimakan ular", "ular dimakan elang", "makan", "dimakan", "rantai", "memakan"],
          misconceptions: ["elang makan padi", "ular makan padi", "tikus makan ular", "terbalik"]
        },
        nextOnAligned: "m1_tanya_pemakan_ular",
        nextOnMisconception: "m1_periksa_padi"
      },

      // ── SISWA PILIH B/C (Salah): Tanya Alasan ────────────────────────────
      "m1_bc_open": {
        id: "m1_bc_open",
        isMain: false,
        title: "Eksplorasi Alasan Siswa",
        question: "Kamu memilih urutan itu. Mengapa kamu berpikir demikian? 🤔",
        isOpenEnded: true,
        placeholder: "Ketik alasanmu di sini...",
        conceptContext: {
          concept: "Urutan yang benar berdasarkan hubungan makan-dimakan: Padi→Tikus→Ular→Elang",
          keywords: ["makan", "dimakan", "padi", "tikus"],
          misconceptions: ["terbalik", "besar ke kecil", "elang pertama", "ular makan padi"]
        },
        nextOnAligned: "m1_periksa_padi",
        nextOnMisconception: "m1_periksa_padi"
      },

      // ── PERIKSA DARI PADI: Tikus berada di dekat padi ────────────────────
      "m1_periksa_padi": {
        id: "m1_periksa_padi",
        isMain: false,
        title: "Periksa dari Padi",
        introSpeech: [
          "Mari kita periksa dari padi terlebih dahulu 🌾.",
          "Tikus berada di dekat tanaman padi."
        ],
        question: "Siapa yang memakan siapa?",
        options: [
          {
            id: "A",
            text: "Padi memakan tikus",
            misconceptionTriggered: "padi_memakan_tikus",
            next: "m1_klarifikasi_padi"
          },
          {
            id: "B",
            text: "Tikus memakan padi",
            next: "m1_tanya_pemakan_tikus"
          }
        ]
      },

      // ── KLARIFIKASI: Padi tidak memakan tikus ─────────────────────────────
      "m1_klarifikasi_padi": {
        id: "m1_klarifikasi_padi",
        isMain: false,
        title: "Klarifikasi Padi",
        introSpeech: [
          "Hmm, apakah tanaman padi punya mulut untuk memakan tikus? 🤔",
          "Tanaman padi adalah tumbuhan yang tidak bisa bergerak atau memangsa hewan."
        ],
        question: "Jadi, siapa yang sebenarnya memakan siapa antara padi dan tikus?",
        options: [
          {
            id: "A",
            text: "Tikus memakan padi",
            next: "m1_tanya_pemakan_tikus"
          },
          {
            id: "B",
            text: "Padi memakan tikus",
            next: "m1_tanya_pemakan_tikus"
          },
          {
            id: "C",
            text: "Padi dan tikus saling memakan",
            next: "m1_tanya_pemakan_tikus"
          }
        ]
      },

      // ── TANYA: Siapa yang memakan tikus? ──────────────────────────────────
      "m1_tanya_pemakan_tikus": {
        id: "m1_tanya_pemakan_tikus",
        isMain: false,
        title: "Pemakan Tikus",
        introSpeech: [
          "Bagus! Tikus memang memakan padi 🐀🌾."
        ],
        question: "Lalu, siapa yang memakan tikus?",
        options: [
          {
            id: "A",
            text: "Ular",
            next: "m1_tanya_pemakan_ular"
          },
          {
            id: "B",
            text: "Padi",
            misconceptionTriggered: "padi_makan_tikus",
            next: "m1_klarifikasi_pemakan_tikus"
          }
        ]
      },

      // ── KLARIFIKASI pemakan tikus ─────────────────────────────────────────
      "m1_klarifikasi_pemakan_tikus": {
        id: "m1_klarifikasi_pemakan_tikus",
        isMain: false,
        title: "Klarifikasi Pemakan Tikus",
        introSpeech: [
          "Ingat, padi adalah tumbuhan yang tidak bisa memakan hewan 🌾.",
          "Hewan apa yang suka memangsa tikus di sawah? 🐍"
        ],
        question: "Siapa yang memakan tikus di sawah?",
        options: [
          {
            id: "A",
            text: "Ular",
            next: "m1_tanya_pemakan_ular"
          },
          {
            id: "B",
            text: "Padi",
            next: "m1_tanya_pemakan_ular"
          },
          {
            id: "C",
            text: "Rumput",
            next: "m1_tanya_pemakan_ular"
          }
        ]
      },

      // ── TANYA: Siapa yang memakan ular? ───────────────────────────────────
      "m1_tanya_pemakan_ular": {
        id: "m1_tanya_pemakan_ular",
        isMain: false,
        title: "Pemakan Ular",
        introSpeech: [
          "Hebat! Ular memang memakan tikus 🐍🐀."
        ],
        question: "Lalu, siapa yang dapat memakan ular?",
        options: [
          {
            id: "A",
            text: "Elang",
            next: "m1_reinforcement"
          },
          {
            id: "B",
            text: "Padi",
            misconceptionTriggered: "padi_makan_ular",
            next: "m1_klarifikasi_pemakan_ular"
          }
        ]
      },

      // ── KLARIFIKASI pemakan ular ──────────────────────────────────────────
      "m1_klarifikasi_pemakan_ular": {
        id: "m1_klarifikasi_pemakan_ular",
        isMain: false,
        title: "Klarifikasi Pemakan Ular",
        introSpeech: [
          "Padi tetap tumbuhan, tidak bisa memakan ular 🌾.",
          "Hewan besar apa yang terbang gagah di langit sawah dan memangsa ular? 🦅"
        ],
        question: "Siapa yang memakan ular di sawah?",
        options: [
          {
            id: "A",
            text: "Elang",
            next: "m1_reinforcement"
          },
          {
            id: "B",
            text: "Tikus",
            next: "m1_reinforcement"
          },
          {
            id: "C",
            text: "Padi",
            next: "m1_reinforcement"
          }
        ]
      },

      // ── REINFORCEMENT MISI 2 PART 1 ──────────────────────────────────────
      "m1_reinforcement": {
        id: "m1_reinforcement",
        isMain: true,
        isConceptCompleted: true,
        mainIndex: 2,
        title: "Rantai Makanan Ditemukan!",
        question: "Bagus sekali! 🌟 Hubungan makan dan dimakan sudah kamu temukan:\n\n🌾 Padi → 🐀 Tikus → 🐍 Ular → 🦅 Elang\n\nTapi ada satu hal penting:\nApakah tanda panah (→) hanya menunjukkan 'siapa memakan siapa'?\nAtau ada makna lain? 🤔\n\nMari kita selidiki! ⚡",
        options: [
          {
            id: "Lanjut",
            text: "Lanjut ke Penyelidikan 2.2: Arti Tanda Panah ⚡",
            next: "m2_1_start"
          }
        ]
      },

      // ════════════════════════════════════════════════════════════════════════
      // PENYELIDIKAN 2.2: Arti Tanda Panah & Perpindahan Energi
      // Sesuai Diagram Canva — Penyelidikan Arti Panah
      // ════════════════════════════════════════════════════════════════════════

      // ── PERTANYAAN UTAMA 2.2 ───────────────────────────────────────────────
      "m2_1_start": {
        id: "m2_1_start",
        isMain: true,
        mainIndex: 3,
        title: "Arti Tanda Panah",
        introSpeech: [
          "Kita sudah tahu urutan rantai makanan: Padi → Tikus → Ular → Elang.",
          "Sekarang, mari kita selidiki arti tanda panah (→) pada rantai makanan itu."
        ],
        question: "Perhatikan bagian pertama:\nPadi → Tikus\nApa arti tanda panah tersebut?",
        options: [
          {
            id: "A",
            text: "Padi memakan tikus",
            misconceptionTriggered: "panah_berarti_memakan",
            next: "m2_1_ac_open"
          },
          {
            id: "B",
            text: "Tikus memakan padi dan energi berpindah dari padi ke tikus",
            next: "m2_1_b_open"
          },
          {
            id: "C",
            text: "Panah hanya menunjukkan urutan makhluk hidup dari kecil ke besar",
            misconceptionTriggered: "panah_urutan_saja",
            next: "m2_1_ac_open"
          }
        ],
        hintLevel1: "Ingat penyelidikan sebelumnya: siapa yang memakan siapa antara padi dan tikus? 🐀🌾",
        hintLevel2: "Panah menunjukkan arah perpindahan sesuatu yang penting. Setelah tikus makan padi, apa yang berpindah ke tubuh tikus? ⚡"
      },

      // ── SISWA PILIH B (Benar): Tanya Alasan ────────────────────────────────
      "m2_1_b_open": {
        id: "m2_1_b_open",
        isMain: false,
        title: "Alasan Arti Panah",
        question: "Mengapa panah mengarah dari padi ke tikus? Ceritakan alasanmu!",
        isOpenEnded: true,
        placeholder: "Ketik alasanmu di sini... Mengapa panah dari padi ke tikus?",
        conceptContext: {
          concept: "Panah menunjukkan arah perpindahan energi dari padi (yang dimakan) ke tikus (yang memakan)",
          keywords: ["energi", "berpindah", "dimakan", "memakan", "perpindahan", "aliran"],
          misconceptions: ["urutan", "kiri kanan", "abjad"]
        },
        nextOnAligned: "m2_1_tanya_energi_padi",
        nextOnMisconception: "m2_1_tanya_energi_padi"
      },

      // ── JAWABAN SESUAI DARI B: Energi dari padi berpindah ke mana? ─────────
      "m2_1_tanya_energi_padi": {
        id: "m2_1_tanya_energi_padi",
        isMain: false,
        title: "Perpindahan Energi dari Padi",
        introSpeech: [
          "Bagus. Kalau begitu, setelah tikus memakan padi, energi dari padi berpindah ke mana?"
        ],
        question: "Setelah tikus memakan padi, energi dari padi berpindah ke mana?",
        isOpenEnded: true,
        placeholder: "Energi dari padi berpindah ke...?",
        conceptContext: {
          concept: "Energi dari padi berpindah ke tikus karena tikus yang memakan padi",
          keywords: ["tikus", "ke tikus", "tubuh tikus", "berpindah ke tikus"],
          misconceptions: ["padi", "tanah", "matahari", "hilang"]
        },
        nextOnAligned: "m2_1_tanya_tikus_ular",
        nextOnMisconception: "m2_1_klarifikasi_energi"
      },

      // ── KLARIFIKASI ENERGI PADI ────────────────────────────────────────────
      "m2_1_klarifikasi_energi": {
        id: "m2_1_klarifikasi_energi",
        isMain: false,
        title: "Klarifikasi Energi",
        introSpeech: [
          "Coba pikirkan: tikus makan padi untuk mendapatkan tenaga 🐀.",
          "Tenaga atau energi itu berpindah dari padi ke tubuh tikus."
        ],
        question: "Jadi energi dari padi berpindah ke...?",
        options: [
          {
            id: "A",
            text: "Tikus",
            next: "m2_1_tanya_tikus_ular"
          },
          {
            id: "B",
            text: "Elang langsung",
            next: "m2_1_tanya_tikus_ular"
          },
          {
            id: "C",
            text: "Cahaya matahari",
            next: "m2_1_tanya_tikus_ular"
          }
        ]
      },

      // ── TANYA: Energi tikus ke ular ────────────────────────────────────────
      "m2_1_tanya_tikus_ular": {
        id: "m2_1_tanya_tikus_ular",
        isMain: false,
        title: "Energi Tikus ke Ular",
        introSpeech: [
          "Tepat! Energi berpindah dari padi ke tikus ⚡."
        ],
        question: "Kalau tikus → ular, energi berpindah dari siapa ke siapa?",
        isOpenEnded: true,
        placeholder: "Energi berpindah dari... ke...?",
        conceptContext: {
          concept: "Energi berpindah dari tikus ke ular karena ular memakan tikus",
          keywords: ["tikus ke ular", "dari tikus", "ke ular", "berpindah"],
          misconceptions: ["ular ke tikus", "padi ke ular"]
        },
        nextOnAligned: "m2_1_fungsi_panah",
        nextOnMisconception: "m2_1_klarifikasi_tikus_ular"
      },

      // ── KLARIFIKASI TIKUS KE ULAR ──────────────────────────────────────────
      "m2_1_klarifikasi_tikus_ular": {
        id: "m2_1_klarifikasi_tikus_ular",
        isMain: false,
        title: "Klarifikasi Tikus ke Ular",
        introSpeech: [
          "Ingat: ular yang memakan tikus 🐍🐀.",
          "Setelah ular kenyang, energi dari tubuh tikus berpindah ke tubuh ular."
        ],
        question: "Jadi energi berpindah dari...?",
        options: [
          {
            id: "A",
            text: "Dari tikus ke ular",
            next: "m2_1_fungsi_panah"
          },
          {
            id: "B",
            text: "Dari ular ke tikus",
            next: "m2_1_fungsi_panah"
          },
          {
            id: "C",
            text: "Dari elang ke padi",
            next: "m2_1_fungsi_panah"
          }
        ]
      },

      // ── TANYA: Fungsi tanda panah ──────────────────────────────────────────
      "m2_1_fungsi_panah": {
        id: "m2_1_fungsi_panah",
        isMain: false,
        title: "Fungsi Tanda Panah",
        introSpeech: [
          "Hebat! Kamu sudah menemukan pola pentingnya ⚡.",
          "Padi → Tikus: energi berpindah dari padi ke tikus.",
          "Tikus → Ular: energi berpindah dari tikus ke ular."
        ],
        question: "Jadi menurutmu, apa fungsi tanda panah (→) pada rantai makanan?",
        isOpenEnded: true,
        placeholder: "Ketik jawabanmu... Apa arti panah pada rantai makanan?",
        conceptContext: {
          concept: "Tanda panah menunjukkan arah perpindahan energi dari organisme yang dimakan ke organisme yang memakan",
          keywords: ["perpindahan energi", "aliran energi", "energi berpindah", "dari yang dimakan", "ke yang memakan", "arah energi"],
          misconceptions: ["siapa makan siapa saja", "urutan", "kiri ke kanan"]
        },
        nextOnAligned: "m2_1_reinforcement",
        nextOnMisconception: "m2_1_klarifikasi_fungsi"
      },

      // ── KLARIFIKASI FUNGSI PANAH ───────────────────────────────────────────
      "m2_1_klarifikasi_fungsi": {
        id: "m2_1_klarifikasi_fungsi",
        isMain: false,
        title: "Klarifikasi Fungsi Panah",
        introSpeech: [
          "Tanda panah bukan hanya menunjukkan siapa memakan siapa 🔍.",
          "Panah menunjukkan ARAH PERPINDAHAN ENERGI: dari yang dimakan → ke yang memakan."
        ],
        question: "Jadi arti panah pada Padi → Tikus adalah...",
        options: [
          {
            id: "A",
            text: "Energi berpindah dari padi ke tikus",
            next: "m2_1_reinforcement"
          },
          {
            id: "B",
            text: "Padi memakan tikus",
            next: "m2_1_reinforcement"
          },
          {
            id: "C",
            text: "Tikus memberi makanan kepada padi",
            next: "m2_1_reinforcement"
          }
        ]
      },

      // ── SISWA A/C (Salah): Tanya Alasan ────────────────────────────────────
      "m2_1_ac_open": {
        id: "m2_1_ac_open",
        isMain: false,
        title: "Eksplorasi Miskonsepsi Panah",
        question: "Mengapa kamu berpikir begitu? Ceritakan alasanmu!",
        isOpenEnded: true,
        placeholder: "Ketik alasanmu di sini...",
        conceptContext: {
          concept: "Panah menunjukkan arah perpindahan energi dari organisme yang dimakan ke yang memakan",
          keywords: ["energi", "berpindah", "dimakan", "memakan"],
          misconceptions: ["padi makan", "urutan saja", "kiri ke kanan", "abjad"]
        },
        nextOnAligned: "m2_1_tanya_energi_padi",
        nextOnMisconception: "m2_1_siapa_makan_siapa"
      },

      // ── KLARIFIKASI A/C: Kita periksa ──────────────────────────────────────
      "m2_1_siapa_makan_siapa": {
        id: "m2_1_siapa_makan_siapa",
        isMain: false,
        title: "Kita Periksa",
        introSpeech: [
          "Kita periksa.",
          "Apakah makhluk hidup yang lebih besar selalu berada di ujung rantai makanan?"
        ],
        question: "Dalam kehidupan di sawah, siapa yang memakan siapa?",
        options: [
          {
            id: "A",
            text: "Padi memakan tikus",
            next: "m2_1_klarifikasi_padi_tdk_makan"
          },
          {
            id: "B",
            text: "Tikus memakan padi",
            next: "m2_1_tanya_siapa_energi"
          }
        ]
      },

      // ── KLARIFIKASI: Padi tidak memakan tikus (jawaban A) ──────────────────
      "m2_1_klarifikasi_padi_tdk_makan": {
        id: "m2_1_klarifikasi_padi_tdk_makan",
        isMain: false,
        title: "Klarifikasi Padi Bukan Pemakan",
        introSpeech: [
          "Ingat, padi adalah tumbuhan yang tidak bisa memakan hewan 🌾.",
          "Justru tikus yang memakan padi."
        ],
        question: "Benar, tikus memakan padi. Setelah tikus memakan padi, siapa yang mendapatkan energi dari makanan tersebut?",
        options: [
          {
            id: "A",
            text: "Padi",
            next: "m2_1_klarifikasi_8"
          },
          {
            id: "B",
            text: "Tikus",
            next: "m2_1_jadi_energi_berpindah"
          }
        ]
      },

      // ── JAWABAN B (Tikus memakan padi) dari Kita Periksa ───────────────────
      "m2_1_tanya_siapa_energi": {
        id: "m2_1_tanya_siapa_energi",
        isMain: false,
        title: "Siapa yang Mendapatkan Energi",
        introSpeech: [
          "Benar, tikus memakan padi."
        ],
        question: "Setelah tikus memakan padi, siapa yang mendapatkan energi dari makanan tersebut?",
        options: [
          {
            id: "A",
            text: "Padi",
            next: "m2_1_klarifikasi_8"
          },
          {
            id: "B",
            text: "Tikus",
            next: "m2_1_jadi_energi_berpindah"
          }
        ]
      },

      // ── KLARIFIKASI 8: Jika pilih Padi ─────────────────────────────────────
      "m2_1_klarifikasi_8": {
        id: "m2_1_klarifikasi_8",
        isMain: false,
        title: "Klarifikasi Siapa Dapat Energi",
        introSpeech: [
          "Coba pikirkan: siapa yang makan, dia yang mendapat tenaga 🐀.",
          "Tikus yang memakan padi, jadi tikus yang mendapatkan energi dari makanan tersebut."
        ],
        question: "Jadi, ketika tikus memakan padi, ke mana energi berpindah?",
        options: [
          {
            id: "A",
            text: "Energi berpindah dari padi ke tikus",
            next: "m2_1_jadi_energi_berpindah"
          },
          {
            id: "B",
            text: "Energi berpindah dari tikus ke padi",
            next: "m2_1_jadi_energi_berpindah"
          },
          {
            id: "C",
            text: "Energi hilang dan tidak berpindah",
            next: "m2_1_jadi_energi_berpindah"
          }
        ]
      },

      // ── JAWABAN B (Tikus): Energi berpindah dari... ke... ──────────────────
      "m2_1_jadi_energi_berpindah": {
        id: "m2_1_jadi_energi_berpindah",
        isMain: false,
        title: "Energi Berpindah",
        question: "Jadi, energi berpindah dari..... ke.....",
        isOpenEnded: true,
        placeholder: "Energi berpindah dari... ke...",
        conceptContext: {
          concept: "Energi berpindah dari padi ke tikus melalui proses makan. Arah panah menunjukkan perpindahan energi.",
          keywords: ["padi ke tikus", "dari padi", "ke tikus", "perpindahan", "energi"],
          misconceptions: ["tikus ke padi", "ular ke padi"]
        },
        nextOnAligned: "m2_1_hebat_perpindahan",
        nextOnMisconception: "m2_1_klarifikasi_energi_ac"
      },

      // ── JAWABAN TIDAK SESUAI: Klarifikasi Energi ──────────────────────────
      "m2_1_klarifikasi_energi_ac": {
        id: "m2_1_klarifikasi_energi_ac",
        isMain: false,
        title: "Klarifikasi Arah Perpindahan Energi",
        question: "Tikus memakan padi dan mendapatkan energi darinya. Arah perpindahan energi yang benar adalah...",
        options: [
          {
            id: "A",
            text: "Dari padi ke tikus (Padi → Tikus)",
            next: "m2_1_hebat_perpindahan"
          },
          {
            id: "B",
            text: "Dari tikus ke padi (Tikus → Padi)",
            next: "m2_1_hebat_perpindahan"
          },
          {
            id: "C",
            text: "Tidak ada energi yang mengalir",
            next: "m2_1_hebat_perpindahan"
          }
        ]
      },

      // ── JAWABAN SESUAI: Hebat! Arah panah = perpindahan ───────────────────
      "m2_1_hebat_perpindahan": {
        id: "m2_1_hebat_perpindahan",
        isMain: false,
        title: "Hebat! Panah = Perpindahan Energi",
        introSpeech: [
          "Hebat!"
        ],
        question: "Jadi apa arti sebenarnya dari tanda panah (→) pada rantai makanan?",
        options: [
          {
            id: "A",
            text: "Arah perpindahan energi dari yang dimakan ke pemakan",
            next: "m2_1_reinforcement"
          },
          {
            id: "B",
            text: "Urutan hewan dari tubuh terkecil ke terbesar",
            next: "m2_1_reinforcement"
          },
          {
            id: "C",
            text: "Menunjukkan arah jalan hewan di pematang sawah",
            next: "m2_1_reinforcement"
          }
        ]
      },

      // ── REINFORCEMENT PENYELIDIKAN 2.2 ─────────────────────────────────────
      "m2_1_reinforcement": {
        id: "m2_1_reinforcement",
        isMain: true,
        isConceptCompleted: true,
        mainIndex: 3,
        title: "Arti Panah Ditemukan!",
        question: "Tepat! Kamu sudah menemukan arti panahnya 🌟⚡\n\nTanda panah (→) pada rantai makanan menunjukkan ARAH PERPINDAHAN ENERGI dari organisme yang dimakan ke organisme yang memakannya.\n\nSekarang kita gunakan konsep itu untuk penyelidikan berikutnya!",
        options: [
          {
            id: "Lanjut",
            text: "Lanjut ke Penyelidikan 2.3: Sumber Energi Padi ☀️",
            next: "m2_3_start"
          }
        ]
      },

      // ════════════════════════════════════════════════════════════════════════
      // PENYELIDIKAN 2.3: Sumber Energi Padi
      // Sesuai Diagram Canva Halaman 4/17
      // ════════════════════════════════════════════════════════════════════════

      // ── PERTANYAAN UTAMA 2.3 ───────────────────────────────────────────────
      "m2_3_start": {
        id: "m2_3_start",
        isMain: true,
        mainIndex: 4,
        title: "Sumber Energi Padi",
        introSpeech: [
          "Kita sudah mengikuti energi: Padi → Tikus → Ular → Elang ⚡.",
          "Tetapi ada satu misteri terakhir..."
        ],
        question: "Kita sudah mengikuti energi:\nPadi → Tikus → Ular → Elang\nTetapi ada satu misteri terakhir.\nDari mana padi memperoleh energi untuk membuat makanannya?",
        options: [
          {
            id: "A",
            text: "Cahaya matahari",
            next: "m2_3_a_open"
          },
          {
            id: "B",
            text: "Tanah",
            misconceptionTriggered: "energi_dari_tanah",
            next: "m2_3_bc_klarifikasi"
          },
          {
            id: "C",
            text: "Tikus",
            misconceptionTriggered: "energi_dari_tikus",
            next: "m2_3_bc_klarifikasi"
          }
        ],
        hintLevel1: "Padi adalah tumbuhan hijau penghasil makanan sendiri. Apa yang menyinari daun padi dari langit? ☀️🌿",
        hintLevel2: "Tumbuhan menggunakan cahaya matahari untuk fotosintesis membuat makanannya sendiri ☀️."
      },

      // ── JAWABAN A: Mengapa kamu memilih cahaya matahari? (AI) ──────────────
      "m2_3_a_open": {
        id: "m2_3_a_open",
        isMain: false,
        title: "Alasan Memilih Cahaya Matahari",
        question: "Mengapa kamu memilih cahaya matahari? Ceritakan alasanmu!",
        isOpenEnded: true,
        placeholder: "Ketik alasanmu di sini... Mengapa padi butuh cahaya matahari?",
        conceptContext: {
          concept: "Padi menggunakan energi cahaya matahari untuk membuat makanan atau fotosintesis",
          keywords: ["cahaya matahari", "fotosintesis", "membuat makanan", "sendiri", "klorofil", "daun"],
          misconceptions: ["tikus", "tanah", "pupuk"]
        },
        nextOnAligned: "m2_3_tikus_energi",
        nextOnMisconception: "m2_3_ai_identifikasi_a"
      },

      // ── AI MENGIDENTIFIKASI JIKA ALASAN A BELUM SESUAI ──────────────────────
      "m2_3_ai_identifikasi_a": {
        id: "m2_3_ai_identifikasi_a",
        isMain: false,
        title: "Identifikasi Cahaya Matahari",
        introSpeech: [
          "Padi memiliki klorofil pada daun hijau yang menangkap energi cahaya matahari 🌿☀️.",
          "Energi ini digunakan untuk proses fotosintesis (membuat makanannya sendiri)."
        ],
        question: "Jadi, padi menggunakan energi cahaya matahari untuk apa?",
        options: [
          {
            id: "A",
            text: "Membuat makanannya sendiri (fotosintesis)",
            next: "m2_3_tikus_energi"
          },
          {
            id: "B",
            text: "Mengeringkan daunnya yang basah",
            next: "m2_3_tikus_energi"
          },
          {
            id: "C",
            text: "Menghangatkan serangga di sawah",
            next: "m2_3_tikus_energi"
          }
        ]
      },

      // ── DARI MANA TIKUS MEMPEROLEH ENERGINYA? ──────────────────────────────
      "m2_3_tikus_energi": {
        id: "m2_3_tikus_energi",
        isMain: false,
        title: "Energi Tikus",
        introSpeech: [
          "Bagus! Padi menggunakan energi cahaya matahari untuk membuat makanan."
        ],
        question: "Jika padi menggunakan energi cahaya matahari, kemudian padi dimakan tikus, dari mana tikus memperoleh energinya?",
        options: [
          {
            id: "A",
            text: "Padi",
            next: "m2_3_ular_energi"
          },
          {
            id: "B",
            text: "Cahaya matahari langsung",
            next: "m2_3_klarifikasi_tikus"
          },
          {
            id: "C",
            text: "Tanah",
            next: "m2_3_klarifikasi_tikus"
          }
        ]
      },

      // ── JAWABAN LAIN (KLARIFIKASI 8: ENERGI TIKUS) ─────────────────────────
      "m2_3_klarifikasi_tikus": {
        id: "m2_3_klarifikasi_tikus",
        isMain: false,
        title: "Klarifikasi Energi Tikus",
        introSpeech: [
          "Tikus tidak bisa menyerap cahaya matahari langsung atau menyerap tanah 🐀.",
          "Tikus mendapatkan energi karena memakan padi yang menyimpan energi makanan."
        ],
        question: "Jadi dari mana tikus memperoleh energinya?",
        options: [
          {
            id: "A",
            text: "Dari memakan padi",
            next: "m2_3_ular_energi"
          },
          {
            id: "B",
            text: "Langsung menyerap cahaya matahari",
            next: "m2_3_ular_energi"
          },
          {
            id: "C",
            text: "Dari tanah dan air sawah",
            next: "m2_3_ular_energi"
          }
        ]
      },

      // ── LALU ULAR MEMPEROLEH ENERGI DARI MANA? ─────────────────────────────
      "m2_3_ular_energi": {
        id: "m2_3_ular_energi",
        isMain: false,
        title: "Energi Ular",
        question: "Lalu ular memperoleh energi dari mana?",
        options: [
          {
            id: "A",
            text: "Tikus",
            next: "m2_3_elang_energi"
          },
          {
            id: "B",
            text: "Padi",
            next: "m2_3_klarifikasi_ular"
          },
          {
            id: "C",
            text: "Cahaya matahari",
            next: "m2_3_klarifikasi_ular"
          }
        ]
      },

      // ── KLARIFIKASI ENERGI ULAR ────────────────────────────────────────────
      "m2_3_klarifikasi_ular": {
        id: "m2_3_klarifikasi_ular",
        isMain: false,
        title: "Klarifikasi Energi Ular",
        introSpeech: [
          "Ingat rantai makanan kita: Padi → Tikus → Ular 🐍.",
          "Ular adalah pemangsa yang memakan tikus."
        ],
        question: "Jadi ular memperoleh energi setelah memakan siapa?",
        options: [
          {
            id: "A",
            text: "Tikus",
            next: "m2_3_elang_energi"
          },
          {
            id: "B",
            text: "Padi secara langsung",
            next: "m2_3_elang_energi"
          },
          {
            id: "C",
            text: "Elang",
            next: "m2_3_elang_energi"
          }
        ]
      },

      // ── DAN ELANG MEMPEROLEH ENERGI DARI? ──────────────────────────────────
      "m2_3_elang_energi": {
        id: "m2_3_elang_energi",
        isMain: false,
        title: "Energi Elang",
        question: "Dan elang memperoleh energi dari?",
        options: [
          {
            id: "A",
            text: "Ular",
            next: "m2_3_selamat"
          },
          {
            id: "B",
            text: "Tikus",
            next: "m2_3_klarifikasi_elang"
          },
          {
            id: "C",
            text: "Padi",
            next: "m2_3_klarifikasi_elang"
          }
        ]
      },

      // ── KLARIFIKASI ENERGI ELANG ───────────────────────────────────────────
      "m2_3_klarifikasi_elang": {
        id: "m2_3_klarifikasi_elang",
        isMain: false,
        title: "Klarifikasi Energi Elang",
        introSpeech: [
          "Dalam rantai makanan ini: Ular → Elang 🦅.",
          "Elang adalah pemangsa puncak yang memakan ular."
        ],
        question: "Jadi elang memperoleh energinya dari memakan siapa?",
        options: [
          {
            id: "A",
            text: "Ular",
            next: "m2_3_selamat"
          },
          {
            id: "B",
            text: "Padi",
            next: "m2_3_selamat"
          },
          {
            id: "C",
            text: "Cahaya matahari langsung",
            next: "m2_3_selamat"
          }
        ]
      },

      // ── CABANG JAWABAN B/C (Tanah / Tikus) ─────────────────────────────────
      "m2_3_bc_klarifikasi": {
        id: "m2_3_bc_klarifikasi",
        isMain: false,
        title: "Ingat Kembali Misi 1",
        introSpeech: [
          "Ingat kembali penemuan kita pada Misi 1 🔍."
        ],
        question: "Apa yang diserap akar padi dari tanah?",
        options: [
          {
            id: "A",
            text: "Air dan Mineral",
            next: "m2_3_tepat_kembali"
          },
          {
            id: "B",
            text: "Energi untuk membuat makanan",
            next: "m2_3_b_tanah_disiram"
          }
        ]
      },

      // ── JAWABAN A: Tepat! (Akar serap air dan mineral) ─────────────────────
      "m2_3_tepat_kembali": {
        id: "m2_3_tepat_kembali",
        isMain: false,
        title: "Tepat!",
        introSpeech: [
          "Tepat! Akar padi menyerap air dan mineral dari tanah 🌱💧."
        ],
        question: "Jika dari tanah padi menyerap air dan mineral, dari mana padi memperoleh energi untuk membuat makanannya?",
        options: [
          {
            id: "A",
            text: "Cahaya matahari",
            next: "m2_3_a_open"
          },
          {
            id: "B",
            text: "Tikus",
            next: "m2_3_bc_klarifikasi"
          }
        ]
      },

      // ── JAWABAN B: Coba pikirkan saat tanaman disiram ───────────────────────
      "m2_3_b_tanah_disiram": {
        id: "m2_3_b_tanah_disiram",
        isMain: false,
        title: "Saat Tanaman Disiram",
        introSpeech: [
          "Coba pikirkan saat tanaman disiram 🚿."
        ],
        question: "Apa yang masuk ke dalam tanah dan kemudian dapat diserap oleh akar?",
        options: [
          {
            id: "A",
            text: "Air",
            next: "m2_3_air_dan_mineral"
          },
          {
            id: "B",
            text: "Cahaya matahari",
            next: "m2_3_cahaya_bukan_tanah"
          }
        ]
      },

      // ── JAWABAN A (dari tanaman disiram): Tepat! Selain air... ─────────────
      "m2_3_air_dan_mineral": {
        id: "m2_3_air_dan_mineral",
        isMain: false,
        title: "Akar Menyerap Air dan Mineral",
        introSpeech: [
          "Tepat! Selain air, akar juga menyerap mineral dari tanah 🌱."
        ],
        question: "Sekarang coba lagi: apa yang diserap akar padi dari tanah?",
        options: [
          {
            id: "A",
            text: "Air dan Mineral",
            next: "m2_3_tepat_kembali"
          },
          {
            id: "B",
            text: "Energi untuk membuat makanan",
            next: "m2_3_b_tanah_disiram"
          }
        ]
      },

      // ── JAWABAN B (dari tanaman disiram): AI mengidentifikasi ──────────────
      "m2_3_cahaya_bukan_tanah": {
        id: "m2_3_cahaya_bukan_tanah",
        isMain: false,
        title: "Cahaya Matahari Datang dari Langit",
        introSpeech: [
          "Cahaya matahari bersinar dari langit ke daun hijau, bukan masuk ke dalam tanah ☀️🌱.",
          "Yang diserap oleh akar di dalam tanah adalah air dan mineral."
        ],
        question: "Jadi, apa yang diserap akar padi dari dalam tanah?",
        options: [
          {
            id: "A",
            text: "Air dan mineral",
            next: "m2_3_tepat_kembali"
          },
          {
            id: "B",
            text: "Makanan yang sudah jadi",
            next: "m2_3_tepat_kembali"
          },
          {
            id: "C",
            text: "Cahaya matahari",
            next: "m2_3_tepat_kembali"
          }
        ]
      },

      // ── TRANSISI PENYELIDIKAN 2.3 KE 2.4 ──────────────────────────────────
      "m2_3_selamat": {
        id: "m2_3_selamat",
        isMain: true,
        isConceptCompleted: true,
        mainIndex: 4,
        title: "Energi Rantai Makanan Terhubung!",
        question: "Tepat! Padi memperoleh energi dari matahari, tikus dari padi, ular dari tikus, dan elang dari ular 🌟⚡\n\nSekarang mari kita tarik kesimpulan akhir di Penyelidikan 2.4!",
        options: [
          {
            id: "Lanjut",
            text: "Lanjut ke Penyelidikan 2.4: Kesimpulan Rantai Makanan 📝",
            next: "m2_4_start"
          }
        ]
      },

      // ════════════════════════════════════════════════════════════════════════
      // PENYELIDIKAN 2.4: Kesimpulan Arti Panah & Asal Energi
      // Sesuai Diagram Canva Halaman 5/17
      // ════════════════════════════════════════════════════════════════════════

      // ── PERTANYAAN UTAMA 2.4 ───────────────────────────────────────────────
      "m2_4_start": {
        id: "m2_4_start",
        isMain: true,
        mainIndex: 5,
        title: "Kesimpulan Arti Panah",
        introSpeech: [
          "Kita sudah mengumpulkan semua petunjuk.",
          "Sekarang bantu Pak Tani menjelaskan: Padi → Tikus → Ular → Elang."
        ],
        question: "Kita sudah mengumpulkan semua petunjuk.\nSekarang bantu Pak Tani menjelaskan:\nPadi → Tikus → Ular → Elang\nApa arti tanda panah pada rantai makanan tersebut?",
        isOpenEnded: true,
        placeholder: "Tuliskan arti tanda panah pada rantai makanan...",
        conceptContext: {
          concept: "Panah menunjukkan arah perpindahan energi dari organisme yang dimakan ke organisme yang memakannya",
          keywords: ["perpindahan energi", "aliran energi", "energi berpindah", "dimakan", "memakan", "arah perpindahan"],
          misconceptions: ["siapa makan siapa saja", "urutan ukuran", "kiri ke kanan"]
        },
        nextOnAligned: "m2_4_tanya_asal",
        nextOnMisconception: "m2_4_klarifikasi_9"
      },

      // ── JAWABAN TIDAK SESUAI: KLARIFIKASI 9 ───────────────────────────────
      "m2_4_klarifikasi_9": {
        id: "m2_4_klarifikasi_9",
        isMain: false,
        title: "Klarifikasi 9: Arti Tanda Panah",
        introSpeech: [
          "Mari kita ingat kembali 💡.",
          "Ketika tikus memakan padi, energi berpindah dari padi ke tikus.",
          "Ketika ular memakan tikus, energi berpindah dari tikus ke ular."
        ],
        question: "Jadi, tanda panah (→) pada rantai makanan menunjukkan apa?",
        options: [
          {
            id: "A",
            text: "Arah perpindahan energi dari yang dimakan ke yang memakan",
            next: "m2_4_tanya_asal"
          },
          {
            id: "B",
            text: "Siapa hewan yang paling kuat di alam",
            next: "m2_4_tanya_asal"
          },
          {
            id: "C",
            text: "Perjalanan tempat tinggal hewan di sawah",
            next: "m2_4_tanya_asal"
          }
        ]
      },

      // ── JAWABAN "ALIRAN ENERGI" (SESUAI): DARI MANA ENERGI BERAWAL? ────────
      "m2_4_tanya_asal": {
        id: "m2_4_tanya_asal",
        isMain: false,
        title: "Asal Energi Rantai Makanan",
        introSpeech: [
          "Tepat sekali! Tanda panah menunjukkan arah perpindahan energi ⚡."
        ],
        question: "Dari mana energi pada rantai makanan itu berawal?",
        options: [
          {
            id: "A",
            text: "Matahari",
            next: "m2_4_susun_rantai"
          },
          {
            id: "B",
            text: "Padi",
            next: "m2_4_klarifikasi_matahari"
          },
          {
            id: "C",
            text: "Tanah",
            next: "m2_4_klarifikasi_matahari"
          }
        ]
      },

      // ── KLARIFIKASI MATAHARI SEBAGAI ASAL ENERGI ───────────────────────────
      "m2_4_klarifikasi_matahari": {
        id: "m2_4_klarifikasi_matahari",
        isMain: false,
        title: "Klarifikasi Asal Energi",
        introSpeech: [
          "Padi memang tumbuhan pertama dalam rantai, tetapi padi membuat makanan menggunakan energi dari sinar matahari ☀️🌱.",
          "Jadi, sumber energi paling awal di alam adalah MATAHARI."
        ],
        question: "Dari mana energi pada rantai makanan itu berawal?",
        options: [
          {
            id: "A",
            text: "Matahari",
            next: "m2_4_susun_rantai"
          },
          {
            id: "B",
            text: "Tanah dan pupuk",
            next: "m2_4_susun_rantai"
          },
          {
            id: "C",
            text: "Air hujan",
            next: "m2_4_susun_rantai"
          }
        ]
      },

      // ── TRANSISI PENYELIDIKAN 2.4 KE 2.5 ──────────────────────────────────
      "m2_4_susun_rantai": {
        id: "m2_4_susun_rantai",
        isMain: true,
        isConceptCompleted: true,
        mainIndex: 5,
        title: "Penyusunan Rantai Makanan Selesai!",
        question: "Luar biasa, Detektif Cilik! 🌟☀️🌾\n\nKamu telah membuktikan seluruh konsep rantai makanan sawah:\n☀️ Matahari → 🌾 Padi → 🐀 Tikus → 🐍 Ular → 🦅 Elang\n\nSemua energi mengalir dari matahari ke produsen dan berlanjut ke konsumen-konsumen berikutnya.\n\nSekarang saatnya refleksi akhir di Penyelidikan 2.5! ✍️",
        options: [
          {
            id: "Lanjut",
            text: "Lanjut ke Penyelidikan 2.5: Refleksi ✍️",
            next: "m2_5_refleksi_awal"
          }
        ]
      },

      // ════════════════════════════════════════════════════════════════════════
      // PENYELIDIKAN 2.5: Refleksi & Penutupan Misi 2
      // Sesuai Diagram Canva Halaman 6/17 (Page 6 - MISI 2 PBL 5)
      // ════════════════════════════════════════════════════════════════════════

      // ── REFLEKSI 1: SEBELUM PENYELIDIKAN ──────────────────────────────────
      "m2_5_refleksi_awal": {
        id: "m2_5_refleksi_awal",
        isMain: false,
        title: "Refleksi: Sebelum Penyelidikan",
        introSpeech: [
          "Saatnya refleksi, Detektif Cilik! ✍️"
        ],
        question: "Sebelum penyelidikan tadi, apa yang kamu pikirkan tentang tanda panah pada rantai makanan?",
        isOpenEnded: true,
        placeholder: "Ceritakan apa yang kamu pikirkan sebelumnya...",
        conceptContext: {
          concept: "Refleksi pemikiran awal tentang tanda panah",
          keywords: ["makan", "siapa makan siapa", "urutan", "panah", "belum tahu", "tidak tahu"],
          misconceptions: []
        },
        nextOnAligned: "m2_5_refleksi_sesudah",
        nextOnMisconception: "m2_5_refleksi_sesudah"
      },

      // ── REFLEKSI 2: SETELAH MENGIKUTI JEJAK ENERGI ─────────────────────────
      "m2_5_refleksi_sesudah": {
        id: "m2_5_refleksi_sesudah",
        isMain: false,
        title: "Refleksi: Setelah Penyelidikan",
        introSpeech: [
          "Bagus! Belajar dari pengalaman adalah kunci sains 🌟."
        ],
        question: "Setelah mengikuti jejak energi, apa yang kamu pahami sekarang?",
        isOpenEnded: true,
        placeholder: "Ceritakan apa yang kamu pahami sekarang...",
        conceptContext: {
          concept: "Pemahaman baru bahwa panah menunjukkan aliran perpindahan energi",
          keywords: ["energi", "perpindahan energi", "aliran energi", "berpindah", "matahari"],
          misconceptions: []
        },
        nextOnAligned: "m2_5_jelaskan_gambar",
        nextOnMisconception: "m2_5_jelaskan_gambar"
      },

      // ── REFLEKSI 3: ALIRAN ENERGI PADI KE TIKUS (JELASKAN DENGAN BAHASAMU SENDIRI) ───
      "m2_5_jelaskan_gambar": {
        id: "m2_5_jelaskan_gambar",
        isMain: false,
        title: "Jelaskan dengan Bahasamu Sendiri",
        image: "/visual_padi_tikus.jpg",
        imageAlt: "Aliran energi dari Padi ke Tikus",
        imageCaption: "🌾 Padi → 🐀 Tikus (Aliran Energi)",
        question: "🌾 Padi → 🐀 Tikus\n\nDengan bahasamu sendiri, coba jelaskan:\nMengapa panah pada padi → tikus mengarah ke tikus?",
        isOpenEnded: true,
        placeholder: "Jelaskan mengapa panah mengarah ke tikus...",
        conceptContext: {
          concept: "Panah mengarah ke tikus karena energi dari padi berpindah ke tubuh tikus yang memakannya",
          keywords: ["energi", "padi ke tikus", "tikus makan padi", "berpindah", "arah"],
          misconceptions: []
        },
        nextOnAligned: "m2_reinforcement_final",
        nextOnMisconception: "m2_reinforcement_final"
      },

      // ── MISI 2 BERHASIL! (REINFORCEMENT FINAL MISI 2) ─────────────────────
      "m2_reinforcement_final": {
        id: "m2_reinforcement_final",
        isMain: true,
        isConceptCompleted: true,
        isEnd: true,
        mainIndex: 6,
        title: "MISI 2 BERHASIL!",
        question: "MISI 2 BERHASIL! 🏆🎉\n\nKamu berhasil mengikuti Jejak Energi:\n🌾 Tikus memakan padi.\n🐀 Ular memakan tikus.\n🐍 Elang memakan ular.\n\n⚡ Tanda panah menunjukkan arah perpindahan energi dari organisme yang dimakan menuju organisme yang memakannya.\n\n☀️ Energi pada rantai makanan ini berawal dari Matahari, kemudian diteruskan melalui hubungan makan dan dimakan.",
        options: [
          {
            id: "Selesai",
            text: "MISI 3 TERBUKA! 🚀",
            next: "END"
          }
        ]
      }
    }
  },

  // =========================================================================
  // MISI 2: JEJAK ENERGI (Arti Panah & Aliran Energi)
  // Sesuai Diagram GBPM "MISI 2.1" s/d "MISI 2 PBL 5"
  // =========================================================================
    // =========================================================================
  // MISI 3: SIAPA MEMBURU SIAPA? (Predator & Mangsa)
  // Sesuai Diagram Canva Halaman 7/17 (Page 7 - MISI 3 P1)
  // =========================================================================
  misi_3: {
    missionId: "misi_3",
    title: "Misi 3: Siapa Memburu Siapa? (Predator & Mangsa)",
    startNodeId: "m3_1_start",
    totalMainQuestions: 4,
    nodes: {
      // ════════════════════════════════════════════════════════════════════════
      // PENYELIDIKAN 3.1 (P1): Hubungan Predator dan Mangsa
      // ════════════════════════════════════════════════════════════════════════

      // ── KOTAK AWAL (Predator dan Mangsa di Sawah) ─────────────────────────
      "m3_1_start": {
        id: "m3_1_start",
        isMain: true,
        mainIndex: 1,
        title: "Siapakah Predator?",
        image: "/visual_ular_buru_tikus.jpg",
        imageAlt: "Ular memburu tikus di sawah",
        imageCaption: "Ular memburu dan memangsa tikus di ekosistem sawah",
        question: "Di sawah, ular memburu dan memakan tikus 🐍🐀.\n\nDalam hubungan tersebut, siapakah predator?",
        options: [
          {
            id: "A",
            text: "Ular",
            next: "m3_1_a_open"
          },
          {
            id: "B",
            text: "Tikus",
            misconceptionTriggered: "predator_tikus",
            next: "m3_1_periksa_predator"
          },
          {
            id: "C",
            text: "Padi",
            misconceptionTriggered: "predator_padi",
            next: "m3_1_periksa_predator"
          }
        ],
        hintLevel1: "Siapa yang memburu dan memakan hewan lain dalam peristiwa ini? 🐍",
        hintLevel2: "Hewan pemburu disebut predator. Antara ular dan tikus, siapa yang bertindak sebagai pemburu?"
      },

      // ── JAWABAN A: Mengapa kamu memilih ular sebagai predator? (AI) ────────
      "m3_1_a_open": {
        id: "m3_1_a_open",
        isMain: false,
        title: "Alasan Memilih Ular",
        question: "Mengapa kamu memilih ular sebagai predator? Ceritakan alasanmu!",
        isOpenEnded: true,
        placeholder: "Ketik alasanmu di sini... Mengapa ular disebut predator?",
        conceptContext: {
          concept: "Ular disebut predator karena memburu dan memakan hewan lain (tikus)",
          keywords: ["memburu", "memakan", "hewan lain", "tikus", "mangsa", "menangkap", "pemburu"],
          misconceptions: ["karena ukuran besar", "karena berbisa saja", "karena tumbuhan"]
        },
        nextOnAligned: "m3_1_tanya_mangsa",
        nextOnMisconception: "m3_1_periksa_predator"
      },

      // ── JAWABAN TIDAK SESUAI: Coba kita periksa ukuran vs memburu ──────────
      "m3_1_periksa_predator": {
        id: "m3_1_periksa_predator",
        isMain: false,
        title: "Coba Kita Periksa",
        question: "Coba kita periksa. Apakah hewan disebut predator karena ukuran tubuhnya, atau karena memburu dan memakan hewan lain?",
        options: [
          {
            id: "A",
            text: "Ukuran tubuhnya",
            next: "m3_1_klarifikasi_ukuran"
          },
          {
            id: "B",
            text: "Memburu dan memakan hewan lain",
            next: "m3_1_tepat_definisi_predator"
          }
        ]
      },

      // ── KLARIFIKASI JIKA PILIH A (Ukuran tubuhnya) ─────────────────────────
      "m3_1_klarifikasi_ukuran": {
        id: "m3_1_klarifikasi_ukuran",
        isMain: false,
        title: "Klarifikasi Ukuran Tubuh",
        introSpeech: [
          "Tidak selalu karena ukuran tubuhnya 🔍. Hewan kecil pun (seperti capung atau laba-laba) bisa disebut predator jika mereka memburu serangga lain."
        ],
        question: "Jadi, mengapa seekor hewan disebut predator?",
        options: [
          {
            id: "A",
            text: "Karena memburu dan memakan hewan lain",
            next: "m3_1_tepat_definisi_predator"
          },
          {
            id: "B",
            text: "Karena memiliki ukuran tubuh paling besar",
            next: "m3_1_tepat_definisi_predator"
          },
          {
            id: "C",
            text: "Karena hidup di tempat yang gelap",
            next: "m3_1_tepat_definisi_predator"
          }
        ]
      },

      // ── JAWABAN B DARI PERIKSA: Tepat! ─────────────────────────────────────
      "m3_1_tepat_definisi_predator": {
        id: "m3_1_tepat_definisi_predator",
        isMain: false,
        title: "Definisi Predator Tepat",
        introSpeech: [
          "Tepat! Hewan disebut predator karena memburu atau memakan hewan lain 🐍."
        ],
        question: "Sekarang kamu tahu ular adalah predator karena memburu tikus. Bagaimana dengan peran tikus?",
        options: [
          {
            id: "A",
            text: "Tikus adalah mangsa (hewan yang diburu)",
            next: "m3_1_tanya_mangsa"
          },
          {
            id: "B",
            text: "Tikus juga predator bagi ular",
            next: "m3_1_tanya_mangsa"
          },
          {
            id: "C",
            text: "Tikus adalah produsen di sawah",
            next: "m3_1_tanya_mangsa"
          }
        ]
      },

      // ── TANYA PERAN TIKUS (MANGSA) ─────────────────────────────────────────
      "m3_1_tanya_mangsa": {
        id: "m3_1_tanya_mangsa",
        isMain: false,
        title: "Peran Tikus",
        introSpeech: [
          "Baik. Karena ular memburu dan memakan tikus, maka ular adalah predator."
        ],
        question: "Kalau ular adalah predator, tikus dalam hubungan tersebut disebut apa?",
        options: [
          {
            id: "A",
            text: "Predator",
            next: "m3_1_perhatikan_kembali"
          },
          {
            id: "B",
            text: "Mangsa",
            next: "m3_1_selesai_p1"
          },
          {
            id: "C",
            text: "Produsen",
            next: "m3_1_perhatikan_kembali"
          }
        ]
      },

      // ── CABANG JAWABAN A/C: Coba perhatikan kembali ────────────────────────
      "m3_1_perhatikan_kembali": {
        id: "m3_1_perhatikan_kembali",
        isMain: false,
        title: "Perhatikan Kembali",
        question: "Coba perhatikan kembali. Dalam hubungan ular dan tikus, siapa yang diburu dan dimakan?",
        options: [
          {
            id: "A",
            text: "Ular",
            next: "m3_1_klarifikasi_10"
          },
          {
            id: "B",
            text: "Tikus",
            next: "m3_1_tanya_sebutan_buruan"
          }
        ]
      },

      // ── JAWABAN B DARI PERHATIKAN: Tepat. Hewan yang diburu disebut apa? ───
      "m3_1_tanya_sebutan_buruan": {
        id: "m3_1_tanya_sebutan_buruan",
        isMain: false,
        title: "Sebutan Hewan yang Diburu",
        introSpeech: [
          "Tepat! Tikus adalah hewan yang diburu dan dimakan ular."
        ],
        question: "Hewan yang diburu dan dimakan oleh hewan lain disebut apa?",
        options: [
          {
            id: "A",
            text: "Predator",
            next: "m3_1_klarifikasi_10"
          },
          {
            id: "B",
            text: "Mangsa",
            next: "m3_1_selesai_p1"
          }
        ]
      },

      // ── JAWABAN A/C: KLARIFIKASI 10 ────────────────────────────────────────
      "m3_1_klarifikasi_10": {
        id: "m3_1_klarifikasi_10",
        isMain: false,
        title: "Klarifikasi 10: Mangsa",
        introSpeech: [
          "Klarifikasi: Hewan pemburu disebut predator, sedangkan hewan yang diburu dan dimakan disebut mangsa 🐁."
        ],
        question: "Dalam hubungan ular memburu tikus, tikus disebut...",
        options: [
          {
            id: "A",
            text: "Mangsa (hewan yang diburu)",
            next: "m3_1_selesai_p1"
          },
          {
            id: "B",
            text: "Predator (hewan pemburu)",
            next: "m3_1_selesai_p1"
          },
          {
            id: "C",
            text: "Produsen (pembuat makanan)",
            next: "m3_1_selesai_p1"
          }
        ]
      },

      // ── TRANSISI PENYELIDIKAN 3.1 KE 3.2 ──────────────────────────────────
      "m3_1_selesai_p1": {
        id: "m3_1_selesai_p1",
        isMain: true,
        isConceptCompleted: true,
        mainIndex: 1,
        title: "Benar! Kamu Hebat!",
        question: "Benar! Kamu hebat! 🌟👏\n\nMangsa adalah makhluk hidup yang dimakan oleh predator.\n\nDalam hubungan ini:\n🐍 Ular = Predator (Pemburu)\n🐀 Tikus = Mangsa (Yang diburu)",
        options: [
          {
            id: "Lanjut",
            text: "Lanjut ke Penyelidikan 3.2: Definisi Mangsa 🔍",
            next: "m3_2_start"
          }
        ]
      },

      // ════════════════════════════════════════════════════════════════════════
      // PENYELIDIKAN 3.2 (P2): Mengapa Tikus Disebut Mangsa?
      // Sesuai Diagram Canva Halaman 8/17 (Page 8 - MISI 3 P2)
      // ════════════════════════════════════════════════════════════════════════

      // ── KOTAK AWAL 3.2 ────────────────────────────────────────────────────
      "m3_2_start": {
        id: "m3_2_start",
        isMain: true,
        mainIndex: 2,
        title: "Mengapa Tikus Disebut Mangsa?",
        introSpeech: [
          "Kita sudah tahu bahwa ular memburu tikus 🐍🐀."
        ],
        question: "Kita sudah tahu bahwa ular memburu tikus.\nLalu, mengapa tikus disebut mangsa?",
        options: [
          {
            id: "A",
            text: "Karena tikus memburu ular.",
            misconceptionTriggered: "mangsa_memburu_predator",
            next: "m3_2_ac_klarifikasi"
          },
          {
            id: "B",
            text: "Karena tikus diburu dan dimakan ular.",
            next: "m3_2_b_open"
          },
          {
            id: "C",
            text: "Karena tikus berukuran lebih kecil.",
            misconceptionTriggered: "mangsa_karena_ukuran",
            next: "m3_2_ac_klarifikasi"
          }
        ],
        hintLevel1: "Pikirkan tindakan yang dialami tikus saat bertemu ular di sawah 🌾.",
        hintLevel2: "Hewan disebut mangsa bukan karena ukuran tubuhnya, tapi karena ia yang diburu dan dimakan!"
      },

      // ── JAWABAN B: Bagus. Jadi menurutmu... (AI) ───────────────────────────
      "m3_2_b_open": {
        id: "m3_2_b_open",
        isMain: false,
        title: "Definisi Mangsa Menurutmu",
        question: "Bagus. Jadi menurutmu, apa yang membuat suatu hewan disebut mangsa? Ceritakan alasanmu!",
        isOpenEnded: true,
        placeholder: "Ketik alasanmu di sini... Apa yang membuat hewan disebut mangsa?",
        conceptContext: {
          concept: "Hewan disebut mangsa karena diburu atau dimakan oleh hewan lain (predator)",
          keywords: ["diburu", "dimakan", "hewan lain", "predator", "pemburu"],
          misconceptions: ["ukuran kecil", "lemah", "tumbuhan"]
        },
        nextOnAligned: "m3_2_b_sukses",
        nextOnMisconception: "m3_2_klarifikasi_ai"
      },

      // ── JAWABAN SESUAI: "Karena diburu/dimakan hewan lain." ───────────────
      "m3_2_b_sukses": {
        id: "m3_2_b_sukses",
        isMain: false,
        title: "Betul! Kamu Hebat!",
        introSpeech: [
          "Karena diburu atau dimakan hewan lain."
        ],
        question: "Betul! Kamu hebat! Hewan yang diburu dan dimakan oleh predator disebut mangsa.",
        options: [
          {
            id: "Lanjut",
            text: "Penyelidikan selanjutnya! 👉",
            next: "m3_2_selesai"
          }
        ]
      },

      // ── JAWABAN TIDAK SESUAI DARI ALASAN: KLARIFIKASI ──────────────────────
      "m3_2_klarifikasi_ai": {
        id: "m3_2_klarifikasi_ai",
        isMain: false,
        title: "Klarifikasi Definisi Mangsa",
        introSpeech: [
          "Ingat kembali 🔍: Hewan tidak disebut mangsa hanya karena ukuran tubuhnya yang kecil."
        ],
        question: "Apa alasan sebenarnya suatu hewan disebut sebagai mangsa?",
        options: [
          {
            id: "A",
            text: "Karena diburu dan dimakan oleh predator",
            next: "m3_2_b_sukses"
          },
          {
            id: "B",
            text: "Karena tubuhnya selalu kecil dan lemah",
            next: "m3_2_b_sukses"
          },
          {
            id: "C",
            text: "Karena tidak bisa berlari cepat",
            next: "m3_2_b_sukses"
          }
        ]
      },

      // ── JAWABAN A/C: Coba pikirkan lagi... siapa yang diburu? ──────────────
      "m3_2_ac_klarifikasi": {
        id: "m3_2_ac_klarifikasi",
        isMain: false,
        title: "Coba Pikirkan Lagi",
        question: "Coba pikirkan lagi. Dalam hubungan ular dan tikus, siapa yang diburu?",
        options: [
          {
            id: "A",
            text: "Ular",
            next: "m3_2_klarifikasi_11"
          },
          {
            id: "B",
            text: "Tikus",
            next: "m3_2_ac_jawaban_b"
          }
        ]
      },

      // ── JAWABAN B DARI A/C: Tepat! Hewan yang diburu... ───────────────────
      "m3_2_ac_jawaban_b": {
        id: "m3_2_ac_jawaban_b",
        isMain: false,
        title: "Tepat!",
        introSpeech: [
          "Tepat! Hewan yang diburu dan dimakan oleh hewan lain disebut mangsa."
        ],
        question: "Jadi tikus disebut mangsa karena tikus yang diburu dan dimakan oleh ular.",
        options: [
          {
            id: "Lanjut",
            text: "Penyelidikan selanjutnya! 👉",
            next: "m3_2_selesai"
          }
        ]
      },

      // ── JAWABAN A: KLARIFIKASI 11 ─────────────────────────────────────────
      "m3_2_klarifikasi_11": {
        id: "m3_2_klarifikasi_11",
        isMain: false,
        title: "Klarifikasi 11: Siapa Diburu",
        introSpeech: [
          "Ular tidak diburu oleh tikus 🐍🐀.",
          "Justru tikus yang diburu dan dimakan oleh ular."
        ],
        question: "Jadi, siapa hewan yang diburu dalam hubungan antara ular dan tikus?",
        options: [
          {
            id: "A",
            text: "Tikus (diburu oleh ular)",
            next: "m3_2_ac_jawaban_b"
          },
          {
            id: "B",
            text: "Ular (diburu oleh tikus)",
            next: "m3_2_ac_jawaban_b"
          },
          {
            id: "C",
            text: "Padi (diburu oleh ular)",
            next: "m3_2_ac_jawaban_b"
          }
        ]
      },

      // ── TRANSISI PENYELIDIKAN 3.2 KE 3.3 ──────────────────────────────────
      "m3_2_selesai": {
        id: "m3_2_selesai",
        isMain: true,
        isConceptCompleted: true,
        mainIndex: 2,
        title: "Penyelidikan Selanjutnya!",
        question: "Penyelidikan selanjutnya! 🌟🔍\n\nKamu sudah memahami dengan tepat bahwa mangsa adalah hewan yang diburu dan dimakan oleh hewan lain (predator).\n\nMari kita selidiki misteri berikutnya!",
        options: [
          {
            id: "Lanjut",
            text: "Lanjut ke Penyelidikan 3.3: Peran Ganda Ular 🦅🐍",
            next: "m3_3_start"
          }
        ]
      },

      // ════════════════════════════════════════════════════════════════════════
      // PENYELIDIKAN 3.3 (P3): Elang Memburu Ular (Peran Ganda)
      // Sesuai Diagram Canva Halaman 9/17 (Page 9 - MISI 3 P3)
      // ════════════════════════════════════════════════════════════════════════

      // ── KOTAK AWAL 3.3 ────────────────────────────────────────────────────
      "m3_3_start": {
        id: "m3_3_start",
        isMain: true,
        mainIndex: 3,
        title: "Elang Memburu Ular",
        introSpeech: [
          "Seekor elang memburu dan memakan ular 🦅🐍."
        ],
        question: "Seekor elang memburu dan memakan ular.\nDalam hubungan tersebut, manakah yang tepat?",
        options: [
          {
            id: "A",
            text: "Elang predator, ular mangsa",
            next: "m3_3_a_open"
          },
          {
            id: "B",
            text: "Ular predator, elang mangsa",
            misconceptionTriggered: "peran_terbalik_elang_ular",
            next: "m3_3_bc_klarifikasi"
          },
          {
            id: "C",
            text: "Keduanya predator",
            misconceptionTriggered: "keduanya_predator",
            next: "m3_3_bc_klarifikasi"
          }
        ],
        hintLevel1: "Siapa yang memburu dan siapa yang dimakan dalam interaksi ini? 🦅",
        hintLevel2: "Elang menyambar ular dari langit untuk dimakan. Berarti elang adalah pemburu!"
      },

      // ── JAWABAN A: Mengapa sekarang ular menjadi mangsa? (AI) ───────────────
      "m3_3_a_open": {
        id: "m3_3_a_open",
        isMain: false,
        title: "Alasan Perubahan Peran Ular",
        question: "Mengapa sekarang ular menjadi mangsa? padahal ketika tikus dimakan ular, ular menjadi predator? Ceritakan alasanmu!",
        isOpenEnded: true,
        placeholder: "Ketik alasanmu di sini... Mengapa peran ular bisa berubah?",
        conceptContext: {
          concept: "Peran makhluk hidup tergantung pada interaksinya. Ular menjadi mangsa karena dalam hubungan ini elang yang memburu dan memakan ular.",
          keywords: ["elang memburu", "dimakan elang", "tergantung", "posisi", "hubungan", "pemburu", "rantai makanan"],
          misconceptions: ["ular selalu predator", "elang bukan predator"]
        },
        nextOnAligned: "m3_3_sesuai",
        nextOnMisconception: "m3_3_klarifikasi_ai"
      },

      // ── JAWABAN TIDAK SESUAI DARI ALASAN: KLARIFIKASI ──────────────────────
      "m3_3_klarifikasi_ai": {
        id: "m3_3_klarifikasi_ai",
        isMain: false,
        title: "Klarifikasi Peran Ganda",
        introSpeech: [
          "Ingat 💡: Status predator atau mangsa ditentukan oleh interaksinya saat itu."
        ],
        question: "Apakah peran predator dan mangsa pada seekor hewan bisa berubah tergantung hubungannya?",
        options: [
          {
            id: "A",
            text: "Bisa, seperti ular: predator bagi tikus, tapi mangsa bagi elang",
            next: "m3_3_sesuai"
          },
          {
            id: "B",
            text: "Tidak bisa, perannya selalu tetap selamanya",
            next: "m3_3_sesuai"
          },
          {
            id: "C",
            text: "Hanya elang yang perannya bisa berubah",
            next: "m3_3_sesuai"
          }
        ]
      },

      // ── CABANG JAWABAN B/C: Perhatikan siapa yang memburu siapa ────────────
      "m3_3_bc_klarifikasi": {
        id: "m3_3_bc_klarifikasi",
        isMain: false,
        title: "Perhatikan Siapa Memburu Siapa",
        introSpeech: [
          "Perhatikan siapa yang memburu siapa 🔍."
        ],
        question: "Siapa yang memburu dan memakan ular?",
        options: [
          {
            id: "A",
            text: "Tikus",
            next: "m3_3_klarifikasi_tikus"
          },
          {
            id: "B",
            text: "Elang",
            next: "m3_3_sesuai_dari_b"
          }
        ]
      },

      // ── JAWABAN A DARI B/C: KLARIFIKASI TIKUS ─────────────────────────────
      "m3_3_klarifikasi_tikus": {
        id: "m3_3_klarifikasi_tikus",
        isMain: false,
        title: "Klarifikasi Pemburu Ular",
        introSpeech: [
          "Tikus tidak memburu dan memakan ular 🐀."
        ],
        question: "Siapakah hewan yang terbang tinggi dan memburu ular untuk dimakan?",
        options: [
          {
            id: "A",
            text: "Elang",
            next: "m3_3_bc_klarifikasi"
          },
          {
            id: "B",
            text: "Tikus",
            next: "m3_3_bc_klarifikasi"
          },
          {
            id: "C",
            text: "Katak",
            next: "m3_3_bc_klarifikasi"
          }
        ]
      },

      // ── JAWABAN B DARI B/C: TEPAT ELANG ───────────────────────────────────
      "m3_3_sesuai_dari_b": {
        id: "m3_3_sesuai_dari_b",
        isMain: false,
        title: "Tepat, Elang Memburu Ular",
        introSpeech: [
          "Tepat! Elang yang memburu dan memakan ular 🦅🐍.",
          "Oleh karena itu, dalam hubungan ini Elang adalah predator dan Ular adalah mangsa."
        ],
        question: "Mari kita lanjutkan ke kesimpulan!",
        options: [
          {
            id: "Lanjut",
            text: "Lanjut ke kesimpulan! 👉",
            next: "m3_3_sesuai"
          }
        ]
      },

      // ── TRANSISI PENYELIDIKAN 3.3 KE 3.4 ──────────────────────────────────
      "m3_3_sesuai": {
        id: "m3_3_sesuai",
        isMain: true,
        isConceptCompleted: true,
        mainIndex: 3,
        title: "Bagus! Kamu Menemukan Hal Penting",
        question: "Bagus! Berarti kamu sudah menemukan sesuatu yang penting 🌟👏\n\nSeekor hewan bisa memiliki peran berbeda tergantung pada hubungannya:\n🐍 Ular menjadi PREDATOR saat memangsa tikus.\n🐍 Ular menjadi MANGSA saat dimakan oleh elang!\n\nMari kita lengkapi kesimpulan dan refleksi di Penyelidikan 3.4!",
        options: [
          {
            id: "Lanjut",
            text: "Lanjut ke Penyelidikan 3.4: Kesimpulan & Refleksi ✍️",
            next: "m3_4_start"
          }
        ]
      },

      // ════════════════════════════════════════════════════════════════════════
      // PENYELIDIKAN 3.4 (PBL 4): Kesimpulan Definisi & Refleksi
      // Sesuai Diagram Canva Halaman 10/17 (Page 10 - MISI 3 PBL 4)
      // ════════════════════════════════════════════════════════════════════════

      // ── KOTAK AWAL 3.4 (Lengkapi dan tulis kembali) ───────────────────────
      "m3_4_start": {
        id: "m3_4_start",
        isMain: true,
        mainIndex: 4,
        title: "Kesimpulan Temuan",
        introSpeech: [
          "Sekarang bantu Pak Tani menyelesaikan temuannya 🌾."
        ],
        question: "Sekarang bantu Pak Tani menyelesaikan temuannya.\nLengkapi dan tulis kembali pada kolom chatmu!\n\nPredator adalah hewan yang ______,\nMangsa adalah hewan yang ______.",
        isOpenEnded: true,
        placeholder: "Predator adalah hewan yang..., Mangsa adalah hewan yang...",
        conceptContext: {
          concept: "Predator adalah hewan yang memburu atau memakan hewan lain. Mangsa adalah hewan yang diburu atau dimakan oleh predator.",
          keywords: ["memburu", "memakan", "memangsa", "diburu", "dimakan", "dimangsa", "predator", "mangsa"],
          misconceptions: ["hewan besar", "hewan kecil"]
        },
        nextOnAligned: "m3_4_jawaban_sesuai",
        nextOnMisconception: "m3_4_tidak_sesuai_1"
      },

      // ── JAWABAN TIDAK SESUAI DARI KESIMPULAN ──────────────────────────────
      "m3_4_tidak_sesuai_1": {
        id: "m3_4_tidak_sesuai_1",
        isMain: false,
        title: "Klarifikasi Definisi",
        introSpeech: [
          "Mari kita ingat kembali penyelidikan sebelumnya 🔍."
        ],
        question: "Predator adalah hewan yang memburu/memakan hewan lain, sedangkan mangsa adalah hewan yang diburu/dimakan.",
        options: [
          {
            id: "A",
            text: "Paham! Lanjut ke refleksi",
            next: "m3_4_jawaban_sesuai"
          },
          {
            id: "B",
            text: "Kembali ke Misi 3 Penyelidikan 3",
            next: "m3_3_start"
          }
        ]
      },

      // ── JAWABAN SESUAI: BENAR! AYO KITA REFLEKSI! ─────────────────────────
      "m3_4_jawaban_sesuai": {
        id: "m3_4_jawaban_sesuai",
        isMain: false,
        title: "Benar! Ayo Kita Refleksi",
        introSpeech: [
          "Predator adalah hewan yang memangsa/memburu/memakan.",
          "Mangsa adalah hewan yang diburu/dimangsa/dimakan."
        ],
        question: "Benar! Ayo kita refleksi! ✍️",
        options: [
          {
            id: "Lanjut",
            text: "Mulai Refleksi 👉",
            next: "m3_4_refleksi"
          }
        ]
      },

      // ── PERTANYAAN REFLEKSI ───────────────────────────────────────────────
      "m3_4_refleksi": {
        id: "m3_4_refleksi",
        isMain: false,
        title: "Refleksi",
        introSpeech: [
          "Refleksi ✍️"
        ],
        question: "Setelah penyelidikan tadi, apakah seekor hewan selalu menjadi predator atau selalu menjadi mangsa? Mengapa?",
        isOpenEnded: true,
        placeholder: "Ceritakan alasanmu... Apakah peran hewan selalu tetap?",
        conceptContext: {
          concept: "Tidak. Perannya bergantung pada hubungan dengan organisme lain. Ular menjadi predator saat memakan tikus, tetapi menjadi mangsa saat dimakan elang.",
          keywords: ["tidak", "bergantung", "bisa berubah", "ular", "elang", "tikus", "hubungan", "lain"],
          misconceptions: ["selalu predator", "selalu mangsa", "tetap"]
        },
        nextOnAligned: "m3_4_refleksi_sesuai",
        nextOnMisconception: "m3_4_refleksi_tidak_sesuai"
      },

      // ── JAWABAN TIDAK SESUAI REFLEKSI ─────────────────────────────────────
      "m3_4_refleksi_tidak_sesuai": {
        id: "m3_4_refleksi_tidak_sesuai",
        isMain: false,
        title: "Klarifikasi Refleksi",
        introSpeech: [
          "Ingat kembali contoh ular di sawah 🐍."
        ],
        question: "Tidak selalu. Perannya bergantung pada hubungan dengan organisme lain. Ular menjadi predator saat memakan tikus, tetapi menjadi mangsa saat dimakan elang.",
        options: [
          {
            id: "A",
            text: "Paham! Lanjut ke hasil akhir",
            next: "m3_4_refleksi_sesuai"
          },
          {
            id: "B",
            text: "Kembali ke Misi 3 Penyelidikan 3",
            next: "m3_3_start"
          }
        ]
      },

      // ── JAWABAN YANG DIHARAPKAN (REFLEKSI SESUAI) ─────────────────────────
      "m3_4_refleksi_sesuai": {
        id: "m3_4_refleksi_sesuai",
        isMain: false,
        title: "Jawaban yang Diharapkan",
        introSpeech: [
          "Jawaban yang diharapkan: Tidak. Perannya bergantung pada hubungan dengan organisme lain. Ular menjadi predator saat memakan tikus, tetapi menjadi mangsa saat dimakan elang."
        ],
        question: "Luar biasa! Kamu telah menguasai konsep predator dan mangsa secara utuh.",
        options: [
          {
            id: "Lanjut",
            text: "Lihat Hasil Akhir Misi 3! 🏆",
            next: "m3_reinforcement_final"
          }
        ]
      },

      // ── MISI 3 BERHASIL! (REINFORCEMENT FINAL MISI 3) ─────────────────────
      "m3_reinforcement_final": {
        id: "m3_reinforcement_final",
        isMain: true,
        isConceptCompleted: true,
        isEnd: true,
        mainIndex: 4,
        title: "MISI 3 BERHASIL!",
        question: "MISI 3 BERHASIL! 🏆🎉\n\nKamu menemukan bahwa:\n🐾 Predator adalah hewan yang memburu dan memakan hewan lain.\n🐁 Mangsa adalah hewan yang diburu dan dimakan predator.\n🔄 Seekor hewan dapat menjadi predator dalam satu hubungan dan menjadi mangsa dalam hubungan lainnya.",
        options: [
          {
            id: "Selesai",
            text: "MISI 4 TERBUKA! 🚀",
            next: "END"
          }
        ]
      }
    }
  },

  // =========================================================================
  // MISI 3: PREDATOR & MANGSA
  // Sesuai Diagram GBPM "MISI 3 P1" s/d "MISI 3 PBL 4"
  // =========================================================================
  misi_4: {
    missionId: "misi_4",
    title: "Misi 4: Sawah dalam Bahaya! (Dinamika Populasi)",
    startNodeId: "m4_1_start",
    totalMainQuestions: 5,
    nodes: {
      // ════════════════════════════════════════════════════════════════════════
      // PENYELIDIKAN 1: Efek Ular Berkurang terhadap Tikus (Bagan 1)
      // ════════════════════════════════════════════════════════════════════════
      "m4_1_start": {
        id: "m4_1_start",
        isMain: true,
        mainIndex: 1,
        title: "Penyelidikan 1: Hubungan Ular dan Tikus",
        introSpeech: [
          "Perhatikan hubungan berikut: 🌾 Padi → 🐀 Tikus → 🐍 Ular",
          "Sekarang jumlah ular berkurang."
        ],
        question: "Perhatikan hubungan berikut:\n🌾 Padi → 🐀 Tikus → 🐍 Ular\nSekarang jumlah ular berkurang.\nMenurutmu, apa yang kemungkinan terjadi pada jumlah tikus?",
        options: [
          {
            id: "A",
            text: "Tikus tetap sama",
            misconceptionTriggered: "tikus_tetap_sama",
            next: "m4_1_ingat_misi3"
          },
          {
            id: "B",
            text: "Tikus berkurang",
            misconceptionTriggered: "tikus_berkurang",
            next: "m4_1_ingat_misi3"
          },
          {
            id: "C",
            text: "Tikus bertambah",
            next: "m4_1_tanya_mengapa"
          }
        ],
        hintLevel1: "Ingat Misi 4: ular adalah pemangsa/predator yang memangsa tikus. Jika pemangsanya berkurang, apa akibatnya bagi mangsa? 🐍🐀",
        hintLevel2: "Tanpa banyak ular yang memangsa, tikus akan lebih aman dan populasinya akan bertambah! 🐀⬆️"
      },

      // ── SISWA PILIH C: Tanya Alasan (Open-Ended / AI) ──────────────────────
      "m4_1_tanya_mengapa": {
        id: "m4_1_tanya_mengapa",
        isMain: false,
        title: "Alasan Tikus Bertambah",
        question: "Mengapa jumlah tikus dapat bertambah ketika ular berkurang? Ceritakan alasanmu!",
        isOpenEnded: true,
        placeholder: "Ceritakan alasanmu mengapa jumlah tikus bertambah saat ular berkurang...",
        conceptContext: {
          concept: "Tikus bertambah karena predatornya (ular) berkurang sehingga tikus yang dimangsa ular menjadi lebih sedikit",
          keywords: ["predator", "pemangsa", "ular berkurang", "dimangsa", "lebih sedikit dimangsa", "tidak ada yang memburu", "berkembang biak", "bebas"],
          misconceptions: ["tikus makan padi banyak", "tikus makan ular", "tidak ada hubungan"]
        },
        nextOnAligned: "m4_1_predator_berkurang",
        nextOnMisconception: "m4_1_ingat_misi3"
      },

      // ── JAWABAN SESUAI: Konfirmasi Predator Berkurang ──────────────────────
      "m4_1_predator_berkurang": {
        id: "m4_1_predator_berkurang",
        isMain: false,
        title: "Tikus yang Dimangsa",
        introSpeech: [
          "Pemikiran yang bagus!"
        ],
        question: "Jadi, jika predator tikus berkurang, apakah tikus yang dimangsa menjadi lebih banyak atau lebih sedikit?",
        options: [
          {
            id: "A",
            text: "Lebih banyak",
            misconceptionTriggered: "dimangsa_lebih_banyak_salah",
            next: "m4_1_klarifikasi_dimangsa_banyak"
          },
          {
            id: "B",
            text: "Lebih sedikit",
            next: "m4_1_selesai_p1"
          }
        ]
      },

      // ── KLARIFIKASI JIKA PILIH "LEBIH BANYAK" (Tanpa Looping) ──────────────
      "m4_1_klarifikasi_dimangsa_banyak": {
        id: "m4_1_klarifikasi_dimangsa_banyak",
        isMain: false,
        title: "Penjelasan Predator Berkurang",
        introSpeech: [
          "Mari kita perjelas bersama 🔍."
        ],
        question: "Jika pemburu (ular) berkurang drastis, apa pengaruhnya pada jumlah tikus yang dimangsa?",
        options: [
          {
            id: "A",
            text: "Tikus yang dimangsa lebih sedikit, sehingga populasi tikus bertambah",
            next: "m4_1_selesai_p1"
          },
          {
            id: "B",
            text: "Tikus yang dimangsa menjadi lebih banyak",
            next: "m4_1_selesai_p1"
          },
          {
            id: "C",
            text: "Tikus yang dimangsa tetap sama seperti biasa",
            next: "m4_1_selesai_p1"
          }
        ]
      },

      // ── SISWA PILIH A/B / MISKONSEPSI: Coba Ingat Misi 3/4 ─────────────────
      "m4_1_ingat_misi3": {
        id: "m4_1_ingat_misi3",
        isMain: false,
        title: "Mengingat Pemangsa Tikus",
        introSpeech: [
          "Mari kita telaah kembali hubungannya 🔍."
        ],
        question: "Coba ingat Misi 3. Siapa yang memangsa tikus?",
        options: [
          {
            id: "A",
            text: "Ular",
            next: "m4_1_ular_memangsa"
          },
          {
            id: "B",
            text: "Padi",
            misconceptionTriggered: "padi_memangsa_tikus_salah",
            next: "m4_1_kembali_misi3"
          }
        ]
      },

      // ── JAWABAN B (PADI): Klarifikasi & Lanjut (Tanpa Looping) ─────────────
      "m4_1_kembali_misi3": {
        id: "m4_1_kembali_misi3",
        isMain: false,
        title: "Kembali ke Konsep Hubungan Makan",
        introSpeech: [
          "Ingat kembali: padi adalah produsen yang dimakan oleh tikus, bukan pemangsa! 🌾🐀"
        ],
        question: "Dalam rantai makanan sawah, siapa sebenarnya pemangsa yang memburu tikus?",
        options: [
          {
            id: "A",
            text: "Ular",
            next: "m4_1_ular_memangsa"
          },
          {
            id: "B",
            text: "Padi",
            next: "m4_1_ular_memangsa"
          },
          {
            id: "C",
            text: "Cacing",
            next: "m4_1_ular_memangsa"
          }
        ]
      },

      // ── JAWABAN A (ULAR): Penegasan Pemangsa ───────────────────────────────
      "m4_1_ular_memangsa": {
        id: "m4_1_ular_memangsa",
        isMain: false,
        title: "Ular Berkurang dan Tikus yang Dimangsa",
        introSpeech: [
          "Benar! Ular memangsa tikus 🐍🐀."
        ],
        question: "Benar! Jika jumlah ular berkurang, tikus yang dimangsa ular akan...",
        options: [
          {
            id: "A",
            text: "Semakin banyak",
            misconceptionTriggered: "ular_sedikit_mangsa_banyak_salah",
            next: "m4_1_klarifikasi_mangsa_banyak"
          },
          {
            id: "B",
            text: "Semakin sedikit",
            next: "m4_1_tikus_dimangsa_sedikit"
          }
        ]
      },

      // ── KLARIFIKASI JIKA PILIH SEMAKIN BANYAK (Tanpa Looping) ──────────────
      "m4_1_klarifikasi_mangsa_banyak": {
        id: "m4_1_klarifikasi_mangsa_banyak",
        isMain: false,
        title: "Penjelasan Tikus Dimangsa",
        introSpeech: [
          "Perhatikan baik-baik 🔍:"
        ],
        question: "Karena pemangsa ular berkurang, pemburu tikus makin sedikit. Jadi tikus yang dimangsa ular akan...",
        options: [
          {
            id: "A",
            text: "Semakin sedikit yang dimangsa, sehingga tikus bertambah banyak",
            next: "m4_1_tikus_dimangsa_sedikit"
          },
          {
            id: "B",
            text: "Semakin banyak yang dimangsa, sehingga tikus habis",
            next: "m4_1_tikus_dimangsa_sedikit"
          },
          {
            id: "C",
            text: "Tetap sama karena tikus tidak terpengaruh ular",
            next: "m4_1_tikus_dimangsa_sedikit"
          }
        ]
      },

      // ── JAWABAN B: Tikus yang dimangsa semakin sedikit ─────────────────────
      "m4_1_tikus_dimangsa_sedikit": {
        id: "m4_1_tikus_dimangsa_sedikit",
        isMain: false,
        title: "Kemungkinan Jumlah Tikus",
        question: "Nah, jika tikus yang dimangsa semakin sedikit, bagaimana kemungkinan jumlah tikus?",
        options: [
          {
            id: "A",
            text: "Bertambah",
            next: "m4_1_selesai_p1"
          },
          {
            id: "B",
            text: "Berkurang",
            misconceptionTriggered: "tikus_berkurang_salah_lagi",
            next: "m4_1_klarifikasi_tikus_berkurang"
          }
        ]
      },

      // ── KLARIFIKASI JIKA PILIH "BERKURANG" (SOLUSI ANTI LOOPING) ───────────
      "m4_1_klarifikasi_tikus_berkurang": {
        id: "m4_1_klarifikasi_tikus_berkurang",
        isMain: false,
        title: "Penjelasan Jumlah Tikus",
        introSpeech: [
          "Mari kita bayangkan bersama 💡:"
        ],
        question: "Jika tikus yang dimangsa makin sedikit dan bebas berkembang biak, apa akibatnya pada jumlah tikus?",
        options: [
          {
            id: "A",
            text: "Jumlah tikus akan bertambah banyak",
            next: "m4_1_selesai_p1"
          },
          {
            id: "B",
            text: "Jumlah tikus akan berkurang drastis",
            next: "m4_1_selesai_p1"
          },
          {
            id: "C",
            text: "Jumlah tikus akan musnah dari sawah",
            next: "m4_1_selesai_p1"
          }
        ]
      },

      // ── PENYELIDIKAN 1 SELESAI ─────────────────────────────────────────────
      "m4_1_selesai_p1": {
        id: "m4_1_selesai_p1",
        isMain: false,
        title: "Penyelidikan 1 Berhasil",
        introSpeech: [
          "Bagus sekali! 🎉"
        ],
        question: "Bagus. Sekarang kita lihat apa akibatnya bagi padi di penyelidikan selanjutnya!",
        options: [
          {
            id: "Lanjut",
            text: "Lanjut ke Penyelidikan 2 🌾",
            next: "m4_2_start"
          }
        ]
      },

      // ════════════════════════════════════════════════════════════════════════
      // PENYELIDIKAN 2: Efek Tikus Bertambah terhadap Padi (Bagan 2)
      // ════════════════════════════════════════════════════════════════════════
      "m4_2_start": {
        id: "m4_2_start",
        isMain: true,
        mainIndex: 2,
        title: "Penyelidikan 2: Efek pada Padi",
        introSpeech: [
          "Kita menemukan bahwa:",
          "Ular berkurang → Tikus bertambah"
        ],
        question: "Kita menemukan bahwa:\nUlar berkurang → Tikus bertambah\n\nJika jumlah tikus bertambah, apa yang kemungkinan terjadi pada padi?",
        options: [
          {
            id: "A",
            text: "Padi bertambah",
            misconceptionTriggered: "padi_bertambah_salah",
            next: "m4_2_kembali_penyelidikan_sebelumnya"
          },
          {
            id: "B",
            text: "Padi berkurang",
            next: "m4_2_tanya_mengapa"
          },
          {
            id: "C",
            text: "Padi tetap sama",
            misconceptionTriggered: "padi_tetap_sama_salah",
            next: "m4_2_kembali_penyelidikan_sebelumnya"
          }
        ],
        hintLevel1: "Tikus memakan padi di sawah. Jika hama tikus semakin banyak, apa yang terjadi pada tanaman padi Pak Tani? 🐀🌾",
        hintLevel2: "Semakin banyak tikus yang makan padi, tanaman padi akan semakin berkurang! 🌾⬇️"
      },

      // ── SISWA PILIH A/C: Kembali ke Penyelidikan Sebelumnya ───────────────
      "m4_2_kembali_penyelidikan_sebelumnya": {
        id: "m4_2_kembali_penyelidikan_sebelumnya",
        isMain: false,
        title: "Kembali ke Penyelidikan Sebelumnya",
        introSpeech: [
          "Coba ingat kembali penyelidikan sebelumnya 🔍:",
          "Tikus memakan padi.",
          "Jika jumlah tikus di sawah bertambah banyak, apa yang terjadi pada padi yang dimakan?"
        ],
        question: "Bila populasi tikus meledak banyak, padi yang dimakan akan...",
        options: [
          {
            id: "A",
            text: "Semakin banyak dimakan sehingga padi berkurang",
            next: "m4_2_semakin_banyak_tikus"
          },
          {
            id: "B",
            text: "Kembali ke Penyelidikan 1",
            next: "m4_1_start"
          }
        ]
      },

      // ── SISWA PILIH B: Tanya Alasan (Open-Ended / AI) ──────────────────────
      "m4_2_tanya_mengapa": {
        id: "m4_2_tanya_mengapa",
        isMain: false,
        title: "Alasan Padi Berkurang",
        question: "Benar! Mengapa jumlah padi dapat berkurang ketika tikus bertambah? Ceritakan alasanmu!",
        isOpenEnded: true,
        placeholder: "Ceritakan alasanmu mengapa padi berkurang saat tikus bertambah...",
        conceptContext: {
          concept: "Padi berkurang karena tikus memakan padi, sehingga semakin banyak tikus, semakin banyak padi yang dimakan",
          keywords: ["dimakan", "tikus makan padi", "banyak tikus", "habis", "memakan padi", "hama"],
          misconceptions: ["padi sakit", "mati sendiri", "tidak ada makanan"]
        },
        nextOnAligned: "m4_2_semakin_banyak_tikus",
        nextOnMisconception: "m4_2_klarifikasi_alasan_padi"
      },

      // ── KLARIFIKASI JIKA ALASAN MISKONSEPSI (Tanpa Looping) ────────────────
      "m4_2_klarifikasi_alasan_padi": {
        id: "m4_2_klarifikasi_alasan_padi",
        isMain: false,
        title: "Penguatan Konsep Padi Berkurang",
        introSpeech: [
          "Tepat! Ingat kembali bahwa tikus adalah hama pemakan padi 🐀🌾."
        ],
        question: "Semakin banyak tikus di sawah, apakah padi yang dimakan menjadi lebih banyak atau lebih sedikit?",
        options: [
          {
            id: "A",
            text: "Lebih banyak (sehingga tanaman padi berkurang)",
            next: "m4_2_selesai_p2"
          },
          {
            id: "B",
            text: "Lebih sedikit (sehingga tanaman padi bertambah)",
            next: "m4_2_selesai_p2"
          },
          {
            id: "C",
            text: "Tetap sama (tikus tidak memakan padi)",
            next: "m4_2_selesai_p2"
          }
        ]
      },

      // ── JAWABAN SESUAI: Padi yang Dimakan Tikus ───────────────────────────
      "m4_2_semakin_banyak_tikus": {
        id: "m4_2_semakin_banyak_tikus",
        isMain: false,
        title: "Padi yang Dimakan",
        introSpeech: [
          "Tepat sekali! 🌟"
        ],
        question: "Tepat. Semakin banyak tikus, apakah padi yang dimakan menjadi lebih banyak atau lebih sedikit?",
        options: [
          {
            id: "A",
            text: "Lebih banyak",
            next: "m4_2_selesai_p2"
          },
          {
            id: "B",
            text: "Lebih sedikit",
            misconceptionTriggered: "dimakan_sedikit_salah",
            next: "m4_2_klarifikasi_dimakan_sedikit"
          }
        ]
      },

      // ── KLARIFIKASI JIKA PILIH "LEBIH SEDIKIT" (Tanpa Looping) ─────────────
      "m4_2_klarifikasi_dimakan_sedikit": {
        id: "m4_2_klarifikasi_dimakan_sedikit",
        isMain: false,
        title: "Penjelasan Jumlah Padi Dimakan",
        introSpeech: [
          "Perhatikan baik-baik 🔍:"
        ],
        question: "Bila ada lebih banyak tikus lapar di sawah, bagaimana pengaruhnya terhadap tanaman padi?",
        options: [
          {
            id: "A",
            text: "Padi yang dimakan lebih banyak, sisa padi berkurang",
            next: "m4_2_selesai_p2"
          },
          {
            id: "B",
            text: "Padi yang dimakan lebih sedikit, padi melimpah",
            next: "m4_2_selesai_p2"
          },
          {
            id: "C",
            text: "Tanaman padi tidak terpengaruh oleh tikus",
            next: "m4_2_selesai_p2"
          }
        ]
      },

      // ── PENYELIDIKAN 2 SELESAI ─────────────────────────────────────────────
      "m4_2_selesai_p2": {
        id: "m4_2_selesai_p2",
        isMain: false,
        title: "Penyelidikan 2 Berhasil",
        introSpeech: [
          "Benar! 🌾"
        ],
        question: "Benar! Mari kita ke Penyelidikan 3!",
        options: [
          {
            id: "Lanjut",
            text: "Lanjut ke Penyelidikan 3 🔍",
            next: "m4_3_start"
          }
        ]
      },

      // ════════════════════════════════════════════════════════════════════════
      // PENYELIDIKAN 3: Efek Rantai Makanan (Bagan 3)
      // ════════════════════════════════════════════════════════════════════════
      "m4_3_start": {
        id: "m4_3_start",
        isMain: true,
        mainIndex: 3,
        title: "Penyelidikan 3: Rantai Pengaruh Ular ke Padi",
        introSpeech: [
          "Sekarang perhatikan hasil penyelidikan kita:",
          "Ular berkurang → Tikus bertambah → Padi berkurang"
        ],
        question: "Sekarang perhatikan hasil penyelidikan kita:\nUlar berkurang → Tikus bertambah → Padi berkurang\n\nMengapa berkurangnya ular akhirnya dapat memengaruhi padi? Ceritakan alasanmu!",
        isOpenEnded: true,
        placeholder: "Ceritakan alasanmu mengapa berkurangnya ular memengaruhi padi...",
        conceptContext: {
          concept: "Ular memangsa tikus dan tikus memakan padi. Ketika ular berkurang, tikus bertambah banyak sehingga memakan lebih banyak padi sampai padi berkurang.",
          keywords: ["rantai makanan", "ular memangsa tikus", "tikus makan padi", "tikus bertambah", "padi berkurang", "terhubung", "berpengaruh", "saling terkait"],
          misconceptions: ["ular makan padi", "tidak ada hubungan ular dan padi"]
        },
        nextOnAligned: "m4_3_sukses",
        nextOnMisconception: "m4_3_lengkapi",
        hintLevel1: "Ingat urutannya: Siapa yang memangsa tikus, dan siapa yang memakan padi? 🐍🐀🌾",
        hintLevel2: "Ular berkurang membuat tikus bertambah. Lalu tikus yang banyak memakan padi sehingga padi berkurang! 🔗"
      },

      // ── JAWABAN SESUAI: Sukses Penyelidikan 3 ──────────────────────────────
      "m4_3_sukses": {
        id: "m4_3_sukses",
        isMain: false,
        title: "Penyelidikan 3 Berhasil",
        introSpeech: [
          "Bagus sekali!"
        ],
        question: "Bagus! Kamu berhasil menemukan hubungan perubahan jumlah organisme dalam rantai makanan.\n\nMari ke penyelidikan selanjutnya!",
        options: [
          {
            id: "Lanjut",
            text: "Lanjut ke Penyelidikan 4 🐍⬆️",
            next: "m4_4_start"
          }
        ]
      },

      // ── JAWABAN TIDAK SESUAI: Lengkapi Hubungan ────────────────────────────
      "m4_3_lengkapi": {
        id: "m4_3_lengkapi",
        isMain: false,
        title: "Lengkapi Hubungan Rantai Makanan",
        question: "Lengkapi hubungan berikut:\nUlar berkurang → Tikus ______ → Padi ______",
        options: [
          {
            id: "A",
            text: "bertambah - berkurang",
            next: "m4_3_sukses"
          },
          {
            id: "B",
            text: "berkurang - bertambah",
            misconceptionTriggered: "kebalikan_populasi_salah",
            next: "m4_3_klarifikasi_lengkapi"
          }
        ]
      },

      // ── KLARIFIKASI LENGKAPI HUBUNGAN (Tanpa Looping) ──────────────────────
      "m4_3_klarifikasi_lengkapi": {
        id: "m4_3_klarifikasi_lengkapi",
        isMain: false,
        title: "Penjelasan Rantai Pengaruh",
        introSpeech: [
          "Ingat kembali urutan rantai makanannya 🔗:"
        ],
        question: "Apa rantai akibat jika pemangsa ular berkurang habis?",
        options: [
          {
            id: "A",
            text: "Ular berkurang → Tikus bertambah → Padi berkurang",
            next: "m4_4_start"
          },
          {
            id: "B",
            text: "Ular berkurang → Tikus berkurang → Padi bertambah",
            next: "m4_4_start"
          },
          {
            id: "C",
            text: "Ular bertambah → Tikus bertambah → Padi melimpah",
            next: "m4_4_start"
          }
        ]
      },

      // ════════════════════════════════════════════════════════════════════════
      // PENYELIDIKAN 4: Jumlah Ular Bertambah Banyak (Bagan 4)
      // ════════════════════════════════════════════════════════════════════════
      "m4_4_start": {
        id: "m4_4_start",
        isMain: true,
        mainIndex: 4,
        title: "Penyelidikan 4: Ular Bertambah Banyak",
        image: "/visual_ular_banyak.jpg",
        imageAlt: "Populasi ular bertambah banyak di sawah",
        imageCaption: "Jumlah ular di sawah bertambah banyak 🐍🐍🐍",
        question: "Perhatikan sawah ini: Jumlah ular bertambah banyak 🐍🐍🐍.\n\nMenurutmu, apa yang kemungkinan terjadi pada tikus dan padi?",
        options: [
          {
            id: "A",
            text: "Tikus bertambah dan padi berkurang",
            misconceptionTriggered: "ular_banyak_tikus_banyak_salah",
            next: "m4_4_klarifikasi_ular_banyak"
          },
          {
            id: "B",
            text: "Tikus berkurang dan padi bertambah",
            next: "m4_4_tanya_mengapa"
          },
          {
            id: "C",
            text: "Tikus dan padi tidak berubah",
            misconceptionTriggered: "tidak_berubah_salah",
            next: "m4_4_klarifikasi_ular_banyak"
          }
        ],
        hintLevel1: "Jika ular bertambah banyak, apakah tikus yang dimangsa ular semakin banyak atau sedikit? 🐍🐀",
        hintLevel2: "Banyak ular = banyak tikus dimangsa = tikus berkurang = padi aman dan bertambah! 🌾⬆️"
      },

      // ── SISWA PILIH B: Tanya Alasan (Open-Ended / AI) ──────────────────────
      "m4_4_tanya_mengapa": {
        id: "m4_4_tanya_mengapa",
        isMain: false,
        title: "Alasan Pilihanmu",
        question: "Mengapa kamu memilih jawaban tersebut? Ceritakan alasanmu!",
        isOpenEnded: true,
        placeholder: "Ceritakan alasanmu mengapa tikus berkurang dan padi bertambah saat ular bertambah...",
        conceptContext: {
          concept: "Karena ular bertambah banyak, lebih banyak tikus yang dimangsa sehingga tikus berkurang. Ketika tikus berkurang, padi yang dimakan lebih sedikit sehingga padi bertambah.",
          keywords: ["ular memangsa tikus", "tikus dimangsa", "tikus berkurang", "padi bertambah", "padi aman", "sedikit yang makan padi"],
          misconceptions: ["ular makan padi", "padi berkurang"]
        },
        nextOnAligned: "m4_4_sukses",
        nextOnMisconception: "m4_4_coba_pikirkan"
      },

      // ── JAWABAN SESUAI: Sukses Penyelidikan 4 ──────────────────────────────
      "m4_4_sukses": {
        id: "m4_4_sukses",
        isMain: false,
        title: "Penyelidikan 4 Selesai",
        introSpeech: [
          "Hebat luar biasa! 🌟"
        ],
        question: "Yeah! Kita lanjut ke refleksi!",
        options: [
          {
            id: "Lanjut",
            text: "Lanjut ke Refleksi 📝",
            next: "m4_refleksi_start"
          }
        ]
      },

      // ── JAWABAN TIDAK SESUAI: Coba Pikirkan Lagi (Tanpa Looping) ───────────
      "m4_4_coba_pikirkan": {
        id: "m4_4_coba_pikirkan",
        isMain: false,
        title: "Coba Pikirkan Lagi",
        introSpeech: [
          "Coba pikirkan lagi!"
        ],
        question: "Jika ular yang memangsa tikus bertambah banyak, maka tikus akan berkurang dan padi menjadi bertambah karena sedikit yang memakannya.",
        options: [
          {
            id: "Lanjut",
            text: "Yeah! Kita lanjut ke refleksi! 📝",
            next: "m4_refleksi_start"
          }
        ]
      },

      // ── SISWA PILIH A/C: Klarifikasi Ular Semakin Banyak ───────────────────
      "m4_4_klarifikasi_ular_banyak": {
        id: "m4_4_klarifikasi_ular_banyak",
        isMain: false,
        title: "Klarifikasi Jumlah Ular Banyak",
        question: "Jika ular semakin banyak, apakah tikus yang dimangsa akan cenderung lebih banyak atau lebih sedikit?",
        options: [
          {
            id: "A",
            text: "Lebih banyak",
            next: "m4_4_dimangsa_banyak"
          },
          {
            id: "B",
            text: "Lebih sedikit",
            misconceptionTriggered: "predator_banyak_mangsa_sedikit_dimangsa_salah",
            next: "m4_4_klarifikasi_dimangsa_sedikit"
          }
        ]
      },

      // ── JAWABAN "LEBIH BANYAK" (BETUL): Penguatan (Tanpa Looping) ─────────
      "m4_4_dimangsa_banyak": {
        id: "m4_4_dimangsa_banyak",
        isMain: false,
        title: "Penguatan Logika Predator",
        introSpeech: [
          "Betul! 🐍🐀"
        ],
        question: "Sebaliknya, jika ular pemangsa tikus bertambah banyak, apa akibatnya bagi padi?",
        options: [
          {
            id: "A",
            text: "Tikus berkurang, sehingga padi bertambah (panen selamat)",
            next: "m4_refleksi_start"
          },
          {
            id: "B",
            text: "Tikus bertambah, sehingga padi habis dimakan",
            next: "m4_refleksi_start"
          },
          {
            id: "C",
            text: "Tikus dan padi sama-sama punah",
            next: "m4_refleksi_start"
          }
        ]
      },

      // ── JAWABAN "LEBIH SEDIKIT": Klarifikasi (Tanpa Looping) ───────────────
      "m4_4_klarifikasi_dimangsa_sedikit": {
        id: "m4_4_klarifikasi_dimangsa_sedikit",
        isMain: false,
        title: "Penjelasan Pemangsa Bertambah",
        introSpeech: [
          "Ingat: ular adalah pemangsa tikus."
        ],
        question: "Jika ada semakin banyak ular berburu di sawah, bagaimana perubahan populasinya?",
        options: [
          {
            id: "A",
            text: "Tikus semakin banyak dimangsa (berkurang), padi terselamatkan",
            next: "m4_refleksi_start"
          },
          {
            id: "B",
            text: "Tikus semakin sedikit dimangsa, padi habis",
            next: "m4_refleksi_start"
          },
          {
            id: "C",
            text: "Ular berhenti berburu tikus",
            next: "m4_refleksi_start"
          }
        ]
      },

      // ════════════════════════════════════════════════════════════════════════
      // REFLEKSI & REINFORCEMENT FINAL (Bagan 5)
      // ════════════════════════════════════════════════════════════════════════
      "m4_refleksi_start": {
        id: "m4_refleksi_start",
        isMain: true,
        mainIndex: 5,
        title: "Refleksi Akhir: Apa yang Kamu Pelajari?",
        question: "Apa hal penting yang kamu pelajari dari perubahan jumlah ular, tikus, dan padi? Ceritakan alasanmu!",
        isOpenEnded: true,
        placeholder: "Ceritakan hal penting yang kamu pelajari dari penyelidikan ini...",
        conceptContext: {
          concept: "Dalam rantai makanan, organisme saling berhubungan. Jika jumlah satu organisme berubah, organisme lain dapat ikut terpengaruh dan memengaruhi keseimbangan ekosistem.",
          keywords: ["rantai makanan", "saling berhubungan", "saling terkait", "berpengaruh", "terpengaruh", "keseimbangan", "ekosistem", "berubah"],
          misconceptions: ["tidak ada hubungan", "tidak berpengaruh", "hanya satu organisme saja"]
        },
        nextOnAligned: "m4_reinforcement_final",
        nextOnMisconception: "m4_reinforcement_final",
        hintLevel1: "Pikirkan bagaimana perubahan satu hewan (ular) ternyata bisa memengaruhi tumbuhan (padi) melalui tikus. 🔗",
        hintLevel2: "Semua makhluk hidup dalam ekosistem saling berhubungan. Keseimbangan harus dijaga! 🌍✨"
      },

      // ── KESIMPULAN AKHIR MISI 4 ───────────────────────────────────────────
      "m4_reinforcement_final": {
        id: "m4_reinforcement_final",
        isMain: true,
        isConceptCompleted: true,
        isEnd: true,
        mainIndex: 5,
        title: "MISI 4 BERHASIL!",
        question: "🎉 MISI 4 BERHASIL!\n\nKamu berhasil menyelamatkan sawah Pak Tani!\n\nDalam rantai makanan, organisme saling berhubungan.\nJika jumlah satu organisme berubah, organisme lain dapat ikut terpengaruh.\n\nContohnya:\n🐍 Ular berkurang\n↓\n🐀 Tikus bertambah\n↓\n🌾 Padi semakin banyak dimakan dan dapat berkurang\n\nJadi, perubahan jumlah satu organisme dapat memengaruhi keseimbangan ekosistem. 🏆",
        options: [
          {
            id: "Selesai",
            text: "Lihat Hasil Akhir! 🏆",
            next: "END"
          }
        ]
      }
    }
  },

  // =========================================================================
  // MISI 5: JAGA KESEIMBANGAN! (Solusi Ekosistem — PBL)
  // Sesuai Diagram GBPM "MISI 5 PBL 1" (Canva Page 16-17)
  // =========================================================================
  misi_5: {
    missionId: "misi_5",
    title: "Misi 5: Jaga Keseimbangan! (Solusi Ekosistem)",
    startNodeId: "m5_1_start",
    totalMainQuestions: 3,
    nodes: {
      // ════════════════════════════════════════════════════════════════════════
      // PBL 1: Membasmi Semua Tikus — Tepatkah?
      // ════════════════════════════════════════════════════════════════════════
      "m5_1_start": {
        id: "m5_1_start",
        isMain: true,
        mainIndex: 1,
        title: "PBL 1: Membasmi Semua Tikus?",
        introSpeech: [
          "Karena tikus menjadi terlalu banyak di sawah, Pak Tani memutuskan...",
          "\"Bagaimana kalau semua tikus di sawah dibasmi saja?\""
        ],
        question: "Karena tikus menjadi terlalu banyak di sawah, Pak Tani berkata:\n\"Bagaimana kalau semua tikus di sawah dibasmi saja?\"\n\nMenurutmu, apakah tindakan tersebut tepat untuk menjaga keseimbangan ekosistem sawah?",
        options: [
          {
            id: "A",
            text: "Ya, semua padi tidak akan dimakan tikus lagi.",
            misconceptionTriggered: "basmi_semua_tepat",
            next: "m5_1_review_misi4"
          },
          {
            id: "B",
            text: "Tidak, karena hilangnya tikus dapat memengaruhi organisme lain.",
            next: "m5_1_tanya_mengapa"
          }
        ],
        hintLevel1: "Ingat Misi 4: semua organisme dalam rantai makanan saling terhubung. Jika tikus hilang, apa yang terjadi pada ular? 🐀🐍",
        hintLevel2: "Membasmi semua tikus akan membuat ular kehilangan makanan! Keseimbangan ekosistem terganggu! 🔗"
      },

      // ── JAWABAN A (SALAH): Review Konsep Misi 4 ────────────────────────────
      "m5_1_review_misi4": {
        id: "m5_1_review_misi4",
        isMain: false,
        title: "Ingat Kembali Misi 4",
        introSpeech: [
          "Coba ingat kembali pelajaran dari Misi 4! 🔗"
        ],
        question: "Mengapa membasmi SELURUH tikus hingga musnah bukan tindakan yang bijak?",
        options: [
          {
            id: "A",
            text: "Karena ular akan kehilangan sumber makanan utamanya",
            next: "m5_1_tanya_mengapa"
          },
          {
            id: "B",
            text: "Karena tikus bertugas membuat makanan bagi padi",
            next: "m5_1_tanya_mengapa"
          },
          {
            id: "C",
            text: "Karena tikus adalah pemangsa elang",
            next: "m5_1_tanya_mengapa"
          }
        ]
      },

      // ── JAWABAN B (BENAR): Tanya Mengapa (Open-Ended / AI) ─────────────────
      "m5_1_tanya_mengapa": {
        id: "m5_1_tanya_mengapa",
        isMain: false,
        title: "Mengapa Membasmi Semua Tikus Berbahaya?",
        question: "Mengapa hilangnya semua tikus dapat memengaruhi keseimbangan sawah? Ceritakan alasanmu!",
        isOpenEnded: true,
        placeholder: "Ceritakan alasanmu mengapa membasmi semua tikus dapat memengaruhi keseimbangan sawah...",
        conceptContext: {
          concept: "Tikus adalah makanan ular. Jika semua tikus dibasmi, ular akan kekurangan sumber makanan. Ini mengganggu keseimbangan rantai makanan di sawah.",
          keywords: ["tikus makanan ular", "ular kekurangan makanan", "rantai makanan terganggu", "keseimbangan", "saling terhubung", "organisme lain terpengaruh"],
          misconceptions: ["tidak ada hubungan", "ular tidak makan tikus", "hanya padi yang penting"]
        },
        nextOnAligned: "m5_1_tikus_hilang_ular",
        nextOnMisconception: "m5_1_scaffolding"
      },

      // ── SCAFFOLDING: Pikirkan Kembali Hubungan ─────────────────────────────
      "m5_1_scaffolding": {
        id: "m5_1_scaffolding",
        isMain: false,
        title: "Pikirkan Hubungan Tikus dan Ular",
        introSpeech: [
          "Coba pikirkan kembali hubungan dalam rantai makanan 🔗:"
        ],
        question: "Coba pikirkan kembali hubungan:\n🐀 Tikus → 🐍 Ular\n\nJika semua tikus hilang, apa yang mungkin terjadi pada sumber makanan ular?",
        options: [
          {
            id: "A",
            text: "Sumber makanan ular tetap tersedia",
            misconceptionTriggered: "sumber_makanan_tetap_salah",
            next: "m5_1_klarifikasi_sumber"
          },
          {
            id: "B",
            text: "Sumber makanan ular berkurang",
            next: "m5_1_tikus_hilang_ular"
          }
        ]
      },

      // ── KLARIFIKASI: Sumber Makanan Ular ───────────────────────────────────
      "m5_1_klarifikasi_sumber": {
        id: "m5_1_klarifikasi_sumber",
        isMain: false,
        title: "Penjelasan Sumber Makanan Ular",
        question: "Tikus adalah makanan utama ular. Jika seluruh tikus di sawah hilang, apa yang terjadi pada ular?",
        options: [
          {
            id: "A",
            text: "Sumber makanan ular berkurang dan ular bisa kelaparan",
            next: "m5_1_tikus_hilang_ular"
          },
          {
            id: "B",
            text: "Ular mendapatkan makanan lebih melimpah",
            next: "m5_1_tikus_hilang_ular"
          },
          {
            id: "C",
            text: "Ular akan beralih memakan tanaman padi",
            next: "m5_1_tikus_hilang_ular"
          }
        ]
      },

      // ── PERTANYAAN LANJUTAN: Dampak pada Ular ──────────────────────────────
      "m5_1_tikus_hilang_ular": {
        id: "m5_1_tikus_hilang_ular",
        isMain: false,
        title: "Dampak pada Ular",
        question: "Jika semua tikus hilang, apa yang mungkin terjadi pada ular?",
        options: [
          {
            id: "A",
            text: "Ular dapat kekurangan salah satu sumber makanan.",
            next: "m5_1_membasmi_seluruh"
          },
          {
            id: "B",
            text: "Ular mendapatkan semakin banyak makanan.",
            misconceptionTriggered: "ular_dapat_lebih_banyak_salah",
            next: "m5_1_klarifikasi_ular"
          }
        ]
      },

      // ── KLARIFIKASI: Ular Kekurangan Makanan ──────────────────────────────
      "m5_1_klarifikasi_ular": {
        id: "m5_1_klarifikasi_ular",
        isMain: false,
        title: "Penjelasan Dampak pada Ular",
        introSpeech: [
          "Coba pikirkan kembali 🤔:"
        ],
        question: "Jika semua tikus di sawah hilang, apakah ular akan kekurangan atau kelebihan makanan?",
        options: [
          {
            id: "A",
            text: "Kekurangan makanan karena mangsa utamanya hilang",
            next: "m5_1_membasmi_seluruh"
          },
          {
            id: "B",
            text: "Kelebihan makanan",
            next: "m5_1_membasmi_seluruh"
          },
          {
            id: "C",
            text: "Tidak kekurangan karena ular memakan air dan tanah",
            next: "m5_1_membasmi_seluruh"
          }
        ]
      },

      // ── ASSESSMENT: Membasmi Seluruh Tikus ─────────────────────────────────
      "m5_1_membasmi_seluruh": {
        id: "m5_1_membasmi_seluruh",
        isMain: false,
        title: "Dampak Membasmi Seluruh Tikus",
        question: "Jadi, apakah membasmi seluruh tikus dapat memengaruhi organisme lain?",
        options: [
          {
            id: "A",
            text: "Ya",
            next: "m5_1_tepat_cara_lain"
          },
          {
            id: "B",
            text: "Tidak",
            misconceptionTriggered: "tidak_memengaruhi_salah",
            next: "m5_1_review_dampak"
          }
        ]
      },

      // ── REVIEW: Dampak Membasmi (Jawaban Salah) ────────────────────────────
      "m5_1_review_dampak": {
        id: "m5_1_review_dampak",
        isMain: false,
        title: "Review Dampak Membasmi Tikus",
        question: "Apakah membasmi satu populasi secara total dapat memengaruhi keseimbangan ekosistem?",
        options: [
          {
            id: "A",
            text: "Pasti memengaruhi karena semua makhluk hidup saling terhubung",
            next: "m5_1_tepat_cara_lain"
          },
          {
            id: "B",
            text: "Tidak memengaruhi, makhluk hidup lain tetap baik-baik saja",
            next: "m5_1_tepat_cara_lain"
          },
          {
            id: "C",
            text: "Hanya memengaruhi manusia saja",
            next: "m5_1_tepat_cara_lain"
          }
        ]
      },

      // ── CONCLUSION: Tindakan Mana yang Lebih Tepat? ────────────────────────
      "m5_1_tepat_cara_lain": {
        id: "m5_1_tepat_cara_lain",
        isMain: true,
        mainIndex: 2,
        title: "Solusi yang Tepat",
        introSpeech: [
          "Tepat! Kita perlu mencari cara lain yang tidak mengganggu keseimbangan 🌿"
        ],
        question: "Tepat, jadi kita perlu mencari cara lain yang tidak mengganggu keseimbangan.\n\nMenurutmu, tindakan mana yang lebih tepat?",
        options: [
          {
            id: "A",
            text: "Membasmi semua tikus.",
            misconceptionTriggered: "basmi_semua_tetap_salah",
            next: "m5_1_klarifikasi_tindakan"
          },
          {
            id: "B",
            text: "Mengendalikan jumlah tikus agar tidak terlalu banyak tetapi tidak menghilangkan organisme dari sawah.",
            next: "m5_refleksi_start"
          }
        ]
      },

      // ── KLARIFIKASI: Tindakan Salah ────────────────────────────────────────
      "m5_1_klarifikasi_tindakan": {
        id: "m5_1_klarifikasi_tindakan",
        isMain: false,
        title: "Penjelasan Tindakan Tepat",
        question: "Bagaimana tindakan terbaik menghadapi hama tikus agar ekosistem tetap seimbang?",
        options: [
          {
            id: "A",
            text: "Mengendalikan jumlah tikus secara bijak, bukan memusnahkan semuanya",
            next: "m5_refleksi_start"
          },
          {
            id: "B",
            text: "Memusnahkan semua hewan di sawah tanpa sisa",
            next: "m5_refleksi_start"
          },
          {
            id: "C",
            text: "Membiarkan hama merusak seluruh tanaman padi",
            next: "m5_refleksi_start"
          }
        ]
      },

      // ════════════════════════════════════════════════════════════════════════
      // REFLEKSI AKHIR: Saran untuk Pak Tani (Canva Page 17)
      // ════════════════════════════════════════════════════════════════════════
      "m5_refleksi_start": {
        id: "m5_refleksi_start",
        isMain: true,
        mainIndex: 3,
        title: "Refleksi Akhir: Saran untuk Pak Tani",
        introSpeech: [
          "Di awal permainan, kita menemukan:",
          "\"Pak Tani mengalami gagal panen karena jumlah tikus di sawah meningkat.\"",
          "Sekarang, setelah menyelesaikan semua penyelidikan..."
        ],
        question: "Di awal permainan, kita menemukan:\n\"Pak Tani mengalami gagal panen karena jumlah tikus di sawah meningkat.\"\n\nSekarang, setelah menyelesaikan semua penyelidikan:\nApa saranmu kepada Pak Tani agar tanaman padi terlindungi tetapi keseimbangan ekosistem sawah tetap terjaga?",
        isOpenEnded: true,
        placeholder: "Tuliskan saranmu untuk Pak Tani agar padi terlindungi dan ekosistem tetap seimbang...",
        conceptContext: {
          concept: "Mengendalikan jumlah tikus tanpa membasmi seluruhnya. Menjaga keberadaan ular sebagai predator alami tikus. Keseimbangan ekosistem harus dijaga agar semua organisme tetap terhubung.",
          keywords: ["mengendalikan", "tidak membasmi semua", "predator alami", "ular", "keseimbangan", "ekosistem", "saling terhubung", "populasi", "tidak menghilangkan"],
          misconceptions: ["basmi semua tikus", "hilangkan tikus", "bunuh semua", "musnahkan"]
        },
        nextOnAligned: "m5_refleksi_selesai",
        nextOnMisconception: "m5_refleksi_scaffolding",
        hintLevel1: "Ingat: membasmi semua tikus akan membuat ular kehilangan makanan. Apa solusi yang lebih bijak? 🤔",
        hintLevel2: "Mengendalikan populasi tikus tanpa menghilangkannya dari ekosistem adalah kunci keseimbangan! 🌿"
      },

      // ── SCAFFOLDING REFLEKSI: Ingat Kembali ────────────────────────────────
      "m5_refleksi_scaffolding": {
        id: "m5_refleksi_scaffolding",
        isMain: false,
        title: "Ingat Kembali Penyelidikan",
        introSpeech: [
          "Coba ingat kembali hasil penyelidikan kita 🔍"
        ],
        question: "Coba ingat kembali hasil penyelidikan kita.\nJika semua tikus hilang, apa yang mungkin terjadi pada ular?",
        options: [
          {
            id: "A",
            text: "Ular dapat kehilangan salah satu sumber makanannya.",
            next: "m5_refleksi_tepat"
          },
          {
            id: "B",
            text: "Ular mendapatkan lebih banyak makanan.",
            misconceptionTriggered: "ular_lebih_banyak_makanan_salah",
            next: "m5_refleksi_review"
          }
        ]
      },

      // ── JAWABAN A SCAFFOLDING: Tepat! Pikirkan Kembali ─────────────────────
      "m5_refleksi_tepat": {
        id: "m5_refleksi_tepat",
        isMain: false,
        title: "Pikirkan Kembali Jawabanmu",
        question: "Tepat. Berarti hilangnya semua tikus dapat memengaruhi organisme lain.\n\nSekarang pikirkan kembali jawabanmu. Apakah membasmi semua tikus merupakan cara yang tepat untuk menjaga keseimbangan sawah? Mengapa?",
        isOpenEnded: true,
        placeholder: "Jelaskan mengapa membasmi semua tikus bukan cara yang tepat...",
        conceptContext: {
          concept: "Membasmi semua tikus bukan cara tepat karena ular kehilangan makanan. Yang bijak adalah mengendalikan populasi tikus tanpa menghilangkannya.",
          keywords: ["tidak tepat", "ular kehilangan makanan", "mengendalikan", "keseimbangan", "tidak membasmi semua"],
          misconceptions: ["basmi saja", "hilangkan semua", "tepat membasmi"]
        },
        nextOnAligned: "m5_refleksi_selesai",
        nextOnMisconception: "m5_refleksi_selesai"
      },

      // ── JAWABAN B SCAFFOLDING: Review (Tanpa Looping) ──────────────────────
      "m5_refleksi_review": {
        id: "m5_refleksi_review",
        isMain: false,
        title: "Review Hubungan Tikus dan Ular",
        question: "Apa kesimpulan penting dalam menjaga keseimbangan rantai makanan di sawah?",
        options: [
          {
            id: "A",
            text: "Menjaga populasi agar tetap seimbang, bukan melenyapkan satu jenis organisme",
            next: "m5_refleksi_selesai"
          },
          {
            id: "B",
            text: "Menghilangkan semua pemangsa agar hewan lain tenang",
            next: "m5_refleksi_selesai"
          },
          {
            id: "C",
            text: "Menghilangkan hewan herbivora agar tanaman subur",
            next: "m5_refleksi_selesai"
          }
        ]
      },

      // ── KESIMPULAN AKHIR: MISI SELESAI! ────────────────────────────────────
      "m5_refleksi_selesai": {
        id: "m5_refleksi_selesai",
        isMain: true,
        isConceptCompleted: true,
        isEnd: true,
        mainIndex: 3,
        title: "SELAMAT! MISI SELESAI!",
        question: "🎉 Yeah, benar! SELAMAT! MISI SELESAI!\n\nKamu berhasil membantu Pak Tani.\nDalam ekosistem, setiap organisme saling berhubungan. Perubahan jumlah satu organisme dapat memengaruhi organisme lainnya.\n\nKarena itu, menjaga keseimbangan bukan berarti menghilangkan satu organisme seluruhnya, tetapi menjaga agar populasi dan hubungan antarorganisme tidak terganggu.\n\n🏆 Kamu resmi menjadi PENJAGA EKOSISTEM!",
        options: [
          {
            id: "Selesai",
            text: "Lihat Hasil Akhir! 🏆",
            next: "END"
          }
        ]
      }
    }
  }
};

// ── Helper Functions ──────────────────────────────────────────────────────────
export function getTreeByMissionId(missionId) {
  return DECISION_TREES[missionId] || DECISION_TREES.misi_1;
}

export function getNode(missionId, nodeId) {
  const tree = getTreeByMissionId(missionId);
  return tree.nodes[nodeId] || tree.nodes[tree.startNodeId];
}

export function getAllNodes(missionId = null) {
  if (missionId && DECISION_TREES[missionId]) {
    return Object.values(DECISION_TREES[missionId].nodes);
  }
  return Object.values(DECISION_TREES).flatMap((tree) =>
    Object.values(tree.nodes).map((node) => ({
      ...node,
      missionId: tree.missionId,
      missionTitle: tree.title
    }))
  );
}
