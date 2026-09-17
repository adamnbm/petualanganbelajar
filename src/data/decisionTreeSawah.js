/**
 * Master Decision Tree: Misi 01 - Sawah Pak Budi
 * 
 * Sistem Decision Tree / Branching Conversation murni berbasis data JSON.
 * Tidak memakai AI generatif. Sangat mudah dikonversi dari/ke Excel atau Spreadsheet.
 *
 * Logika Socratic Branching:
 * - Pertanyaan Utama (isMain: true): Jika dijawab benar -> Lanjut ke pertanyaan utama berikutnya.
 * - Jika dijawab salah -> Masuk ke node Pertanyaan Pengarah (scaffold node)
 *   Chatbot memandu siswa berpikir lewat analogi/petunjuk sampai menemukan jawaban.
 */

export const DECISION_TREE_SAWAH = {
  startNodeId: "q1_main",
  totalMainQuestions: 5,
  nodes: {
    // ==========================================
    // PERTANYAAN UTAMA 1: Ketergantungan Makanan
    // ==========================================
    "q1_main": {
      id: "q1_main",
      isMain: true,
      mainIndex: 1,
      title: "Hubungan Antar Makhluk Hidup",
      introSpeech: [
        "Halo! 👋 Selamat datang di Misi Sawah bersama Timi Si Robot Belajar!",
        "Tahun ini Pak Budi mengalami masalah gagal panen di sawahnya 🌾.",
        "Di sawah Pak Budi terdapat tanaman padi, belalang, katak, ular, dan burung elang."
      ],
      question: "Menurutmu, mengapa kita perlu mengetahui hubungan antara hewan-hewan tersebut dengan tanaman padi?",
      hint: "Pikirkan bagaimana setiap hewan dan tumbuhan di sawah bisa tetap hidup dan bertenaga.",
      options: [
        {
          id: "A",
          text: "Karena mereka saling berhubungan dalam memperoleh makanan",
          correct: true,
          feedback: "Benar sekali! 🌱 Mereka memiliki hubungan erat dalam proses makan dan dimakan untuk memperoleh energi.",
          next: "q2_main"
        },
        {
          id: "B",
          text: "Karena semuanya hanya kebetulan tinggal bersama di sawah",
          correct: false,
          feedback: "Hmm, tempat tinggal memang sama di sawah, tetapi hubungan mereka jauh lebih penting dari sekadar tempat tinggal...",
          next: "q1_scaffold_1"
        },
        {
          id: "C",
          text: "Karena semua hewan tersebut memakan tanaman padi",
          correct: false,
          feedback: "Wah, coba perhatikan lagi hewan-hewannya! Apakah katak dan ular juga memakan padi?",
          next: "q1_scaffold_1"
        },
        {
          id: "D",
          text: "Karena tanaman padi sama sekali tidak membutuhkan hewan",
          correct: false,
          feedback: "Tumbuhan dan hewan saling membutuhkan dalam satu kesatuan alam. Coba kita telusuri ya!",
          next: "q1_scaffold_1"
        }
      ]
    },

    // Pengarah 1.1 (Scaffold Level 1)
    "q1_scaffold_1": {
      id: "q1_scaffold_1",
      isMain: false,
      title: "Petunjuk Pengarah: Mengapa Makhluk Hidup Berinteraksi?",
      introSpeech: [
        "Hmm, coba kita pikirkan lagi bersama-sama 🤔",
        "Di dalam sawah, katak selalu mengincar belalang, dan ular mencari katak."
      ],
      question: "Menurutmu, untuk apa katak memburu belalang dan ular memburu katak?",
      hint: "Ingat apa yang dibutuhkan tubuh setiap makhluk hidup agar tidak lemas dan lapar.",
      options: [
        {
          id: "A",
          text: "Untuk bermain kejar-kejaran di pematang sawah",
          correct: false,
          feedback: "Hihi, di alam liar mereka bukan sedang bermain, melainkan berjuang untuk tetap bertahan hidup!",
          next: "q1_scaffold_2"
        },
        {
          id: "B",
          text: "Untuk mendapatkan makanan agar memiliki energi untuk hidup",
          correct: true,
          feedback: "Tepat sekali! 🌟 Setiap makhluk hidup saling berinteraksi karena kebutuhan MAKANAN dan ENERGI.",
          next: "q2_main"
        },
        {
          id: "C",
          text: "Karena katak ingin mengajak belalang jalan-jalan",
          correct: false,
          feedback: "Wah, di alam katak adalah pemangsa belalang, bukan temannya jalan-jalan!",
          next: "q1_scaffold_2"
        }
      ]
    },

    // Pengarah 1.2 (Scaffold Level 2)
    "q1_scaffold_2": {
      id: "q1_scaffold_2",
      isMain: false,
      title: "Petunjuk Pengarah Tambahan",
      introSpeech: [
        "Mari Timi bantu dengan petunjuk lebih dekat 💡",
        "Semua makhluk hidup di bumi butuh 'bahan bakar' agar bisa bergerak dan tumbuh."
      ],
      question: "Bagaimana cara hewan mendapatkan 'bahan bakar' energi tersebut?",
      hint: "Apa yang kamu lakukan saat merasa lapar setelah berolahraga?",
      options: [
        {
          id: "A",
          text: "Dengan cara makan makhluk hidup lain",
          correct: true,
          feedback: "Pintar! 👏 Hewan makan makhluk hidup lain untuk energi. Maka dari itu, hubungan di sawah adalah proses saling memakan!",
          next: "q2_main"
        },
        {
          id: "B",
          text: "Cukup dengan tidur seharian tanpa makan",
          correct: false,
          feedback: "Tidur memang mengistirahatkan tubuh, tapi energi hanya didapat dari makanan. Jadi hubungan mereka adalah saling memakan!",
          next: "q2_main"
        }
      ]
    },

    // ==========================================
    // PERTANYAAN UTAMA 2: Sumber Energi Utama
    // ==========================================
    "q2_main": {
      id: "q2_main",
      isMain: true,
      mainIndex: 2,
      title: "Sumber Energi Utama Ekosistem",
      introSpeech: [
        "Keren! Sekarang kamu sudah tahu bahwa makhluk hidup berhubungan karena makanan 👍",
        "Padi tidak memiliki mulut untuk makan seperti katak atau ular."
      ],
      question: "Dari mana sumber energi utama yang pertama kali masuk ke alam dan digunakan tanaman padi untuk membuat makanan?",
      hint: "Lihat ke langit di siang hari. Benda apa yang paling terang dan hangat?",
      options: [
        {
          id: "A",
          text: "Dari air hujan di parit sawah",
          correct: false,
          feedback: "Air hujan sangat penting untuk tumbuhan, tetapi bukan sebagai sumber energi pembuat zat gula.",
          next: "q2_scaffold_1"
        },
        {
          id: "B",
          text: "Dari cacing yang ada di dalam tanah",
          correct: false,
          feedback: "Cacing memang menyuburkan tanah, namun cacing bukan sumber energi utama yang diserap daun.",
          next: "q2_scaffold_1"
        },
        {
          id: "C",
          text: "Dari cahaya matahari di siang hari",
          correct: true,
          feedback: "Luar biasa! ☀️ Sinar matahari adalah sumber energi utama terbesar bagi seluruh kehidupan di muka bumi!",
          next: "q3_main"
        },
        {
          id: "D",
          text: "Dari pupuk buatan pabrik semata",
          correct: false,
          feedback: "Pupuk adalah nutrisi tambahan, tetapi tanpa energi cahaya, fotosintesis tidak bisa terjadi.",
          next: "q2_scaffold_1"
        }
      ]
    },

    // Pengarah 2.1
    "q2_scaffold_1": {
      id: "q2_scaffold_1",
      isMain: false,
      title: "Petunjuk Pengarah: Mengingat Fotosintesis",
      introSpeech: [
        "Ayo kita ingat kembali pelajaran tentang daun hijau 🍃",
        "Daun padi memiliki zat klorofil yang menangkap cahaya dari langit saat siang hari."
      ],
      question: "Benda langit apa yang memancarkan cahaya terang benderang yang dibutuhkan daun untuk memasak makanannya?",
      hint: "Benda langit ini terbit di timur pada pagi hari dan terbenam di barat.",
      options: [
        {
          id: "A",
          text: "Bulan di malam hari",
          correct: false,
          feedback: "Bulan bersinar di malam hari dan cahayanya tidak cukup hangat untuk fotosintesis.",
          next: "q2_scaffold_2"
        },
        {
          id: "B",
          text: "Matahari di siang hari",
          correct: true,
          feedback: "Tepat sekali! ☀️ Matahari memberikan energi cahaya agar daun padi dapat berfotosintesis.",
          next: "q3_main"
        },
        {
          id: "C",
          text: "Bintang-bintang kecil di angkasa",
          correct: false,
          feedback: "Bintang jaraknya sangat jauh dari bumi sehingga energinya sangat kecil.",
          next: "q2_scaffold_2"
        }
      ]
    },

    // Pengarah 2.2
    "q2_scaffold_2": {
      id: "q2_scaffold_2",
      isMain: false,
      title: "Petunjuk Cepat Energi",
      introSpeech: [
        "Bayangkan jika bumi gelap gulita tanpa cahaya ini 💡 Tanaman akan layu dan mati."
      ],
      question: "Apakah sumber energi utama tumbuhan tersebut?",
      hint: "Huruf awalnya M, berakhiran I.",
      options: [
        {
          id: "A",
          text: "Matahari",
          correct: true,
          feedback: "Hebat! ☀️ Kamu berhasil menemukannya. Matahari adalah sumber energi utama alam.",
          next: "q3_main"
        },
        {
          id: "B",
          text: "Lampu senter Pak Budi",
          correct: false,
          feedback: "Hehe, lampu senter tentu tidak sanggup menyinari sawah seluas itu! Sumber aslinya adalah Matahari.",
          next: "q3_main"
        }
      ]
    },

    // ==========================================
    // PERTANYAAN UTAMA 3: Peran Produsen
    // ==========================================
    "q3_main": {
      id: "q3_main",
      isMain: true,
      mainIndex: 3,
      title: "Peran Tumbuhan Hijau: Produsen",
      introSpeech: [
        "Wah, hebat sekali! Padi memanfaatkan sinar matahari untuk membuat makanannya sendiri lewat fotosintesis 🌾."
      ],
      question: "Dalam rantai makanan, makhluk hidup yang mampu membuat atau menghasilkan makanannya sendiri disebut sebagai apa?",
      hint: "Ingat kata dasarnya: 'Menghasilkan' atau 'Memproduksi'.",
      options: [
        {
          id: "A",
          text: "Konsumen Pertama",
          correct: false,
          feedback: "Konsumen artinya yang memakan atau menghabiskan, bukan yang membuat makanannya sendiri.",
          next: "q3_scaffold_1"
        },
        {
          id: "B",
          text: "Produsen (Penghasil)",
          correct: true,
          feedback: "Tepat sekali! 🌾 Tumbuhan hijau disebut Produsen karena memproduksi makanan pertama bagi rantai makanan.",
          next: "q4_main"
        },
        {
          id: "C",
          text: "Pengurai (Dekomposer)",
          correct: false,
          feedback: "Pengurai adalah jamur atau bakteri yang membusukkan sisa makhluk hidup yang sudah mati.",
          next: "q3_scaffold_1"
        },
        {
          id: "D",
          text: "Predator Puncak",
          correct: false,
          feedback: "Predator adalah hewan pemburu seperti elang atau harimau.",
          next: "q3_scaffold_1"
        }
      ]
    },

    // Pengarah 3.1
    "q3_scaffold_1": {
      id: "q3_scaffold_1",
      isMain: false,
      title: "Petunjuk Pengarah: Makna Kata Produsen",
      introSpeech: [
        "Ayo kita telaah arti katanya bersama Timi 🔍",
        "Orang atau pihak yang 'memproduksi' barang disebut produsen."
      ],
      question: "Jika tumbuhan hijau 'memproduksi' makanannya sendiri, maka tumbuhan disebut...",
      hint: "Pilih kata yang paling cocok dengan kata 'produksi'.",
      options: [
        {
          id: "A",
          text: "Produsen",
          correct: true,
          feedback: "Mantap! 🎯 Produsen adalah istilah IPA untuk tumbuhan yang menghasilkan makanan sendiri.",
          next: "q4_main"
        },
        {
          id: "B",
          text: "Pembeli di pasar",
          correct: false,
          feedback: "Tentu bukan pembeli di pasar ya, melainkan Produsen!",
          next: "q4_main"
        }
      ]
    },

    // ==========================================
    // PERTANYAAN UTAMA 4: Konsumen Tingkat I & II
    // ==========================================
    "q4_main": {
      id: "q4_main",
      isMain: true,
      mainIndex: 4,
      title: "Tingkatan Konsumen di Sawah",
      introSpeech: [
        "Sekarang perhatikan alur makan berikut di sawah Pak Budi:",
        "🌾 Padi dimakan oleh 🦗 Belalang, lalu belalang dimakan oleh 🐸 Katak."
      ],
      question: "Siapakah yang berperan sebagai KONSUMEN TINGKAT I (hewan yang memakan langsung tumbuhan produsen)?",
      hint: "Cari hewan yang giginya atau mulutnya langsung mengunyah daun padi.",
      options: [
        {
          id: "A",
          text: "Belalang",
          correct: true,
          feedback: "Benar! 🦗 Belalang adalah Konsumen Tingkat I karena langsung memakan produsen (tumbuhan padi).",
          next: "q5_main"
        },
        {
          id: "B",
          text: "Katak",
          correct: false,
          feedback: "Katak memakan belalang (hewan), jadi katak adalah Konsumen Tingkat II.",
          next: "q4_scaffold_1"
        },
        {
          id: "C",
          text: "Padi",
          correct: false,
          feedback: "Padi adalah Produsen yang dimakan, bukan hewan yang mengonsumsi.",
          next: "q4_scaffold_1"
        },
        {
          id: "D",
          text: "Burung Elang",
          correct: false,
          feedback: "Elang berada di tingkatan paling atas, memangsa ular dan katak.",
          next: "q4_scaffold_1"
        }
      ]
    },

    // Pengarah 4.1
    "q4_scaffold_1": {
      id: "q4_scaffold_1",
      isMain: false,
      title: "Petunjuk Pengarah: Siapa Makan Siapa?",
      introSpeech: [
        "Mari kita amati urutannya perlahan-lahan 🔎",
        "1. Padi tumbuh hijau di sawah.\n2. Hewan X datang dan memakan daun padi.\n3. Katak melompat lalu menyantap hewan X."
      ],
      question: "Siapakah hewan X yang pertama kali memakan daun padi tersebut?",
      hint: "Serangga kecil yang bisa melompat dan suka memakan daun padi.",
      options: [
        {
          id: "A",
          text: "Belalang si pemakan daun",
          correct: true,
          feedback: "Tepat sekali! 🦗 Karena belalang memakan padi pertama kali, dialah Konsumen Tingkat I!",
          next: "q5_main"
        },
        {
          id: "B",
          text: "Katak si pemakan serangga",
          correct: false,
          feedback: "Katak tidak makan daun padi, katak makan serangga seperti belalang.",
          next: "q4_scaffold_2"
        }
      ]
    },

    // Pengarah 4.2
    "q4_scaffold_2": {
      id: "q4_scaffold_2",
      isMain: false,
      title: "Penegasan Konsumen I",
      introSpeech: [
        "Ingat prinsipnya: Konsumen I selalu hewan herbivora yang makan tumbuhan hijau."
      ],
      question: "Antara belalang dan katak, siapakah pemakan tumbuhan?",
      hint: "Belalang memakan padi, katak memakan belalang.",
      options: [
        {
          id: "A",
          text: "Belalang",
          correct: true,
          feedback: "Yess! Sekarang kamu paham sepenuhnya 👏 Belalang = Konsumen I!",
          next: "q5_main"
        },
        {
          id: "B",
          text: "Katak",
          correct: false,
          feedback: "Katak makan hewan (karnivora). Yang makan tumbuhan padi adalah belalang!",
          next: "q5_main"
        }
      ]
    },

    // ==========================================
    // PERTANYAAN UTAMA 5: Keseimbangan Ekosistem & Misteri Pak Budi
    // ==========================================
    "q5_main": {
      id: "q5_main",
      isMain: true,
      mainIndex: 5,
      title: "Misteri Gagal Panen Pak Budi",
      introSpeech: [
        "Ini pertanyaan pamungkas untuk memecahkan misteri Pak Budi! 🌾🔍",
        "Beberapa minggu lalu, ada pemburu yang menangkap SEMUA KATAK di sawah Pak Budi sampai habis tak tersisa."
      ],
      question: "Menurut analisismu, apa yang terjadi selanjutnya sehingga tanaman padi Pak Budi menjadi rusak dan gagal panen?",
      hint: "Katak adalah pemangsa belalang. Apa yang terjadi pada belalang jika katak hilang?",
      options: [
        {
          id: "A",
          text: "Tanah sawah terendam terlalu banyak air karena tidak ada katak",
          correct: false,
          feedback: "Katak tidak mengalirkan air sawah, jadi bukan itu penyebabnya.",
          next: "q5_scaffold_1"
        },
        {
          id: "B",
          text: "Burung elang turun memakan semua tanaman padi",
          correct: false,
          feedback: "Burung elang adalah karnivora pemburu ular, elang sama sekali tidak makan padi.",
          next: "q5_scaffold_1"
        },
        {
          id: "C",
          text: "Padi Pak Budi layu karena merasa kesepian tanpa suara katak",
          correct: false,
          feedback: "Hihi, padi tidak punya perasaan kesepian. Ada penjelasan ilmiah rantai makanan!",
          next: "q5_scaffold_1"
        },
        {
          id: "D",
          text: "Belalang bertambah sangat banyak tanpa pemangsa lalu memakan habis padi Pak Budi",
          correct: true,
          feedback: "LUAR BIASA! 🏆 Kamu berhasil memecahkan misteri Pak Budi! Keseimbangan rantai makanan rusak ketika salah satu hewan diburu habis!",
          next: "mission_complete"
        }
      ]
    },

    // Pengarah 5.1
    "q5_scaffold_1": {
      id: "q5_scaffold_1",
      isMain: false,
      title: "Petunjuk Pengarah: Hubungan Sebab-Akibat",
      introSpeech: [
        "Ayo kita susun rantai sebab-akibatnya 🧩",
        "Katak adalah pemangsa alami belalang yang menjaga agar jumlah belalang tidak terlalu banyak."
      ],
      question: "Jika SEMUA katak hilang, apa yang akan terjadi pada populasi belalang di sawah?",
      hint: "Jika tidak ada yang memburu belalang, apakah belalang semakin banyak atau semakin sedikit?",
      options: [
        {
          id: "A",
          text: "Jumlah belalang akan melonjak sangat banyak tanpa kendali",
          correct: true,
          feedback: "Tepat sekali! 🦗 Ribuan belalang yang lapar tersebut kemudian memakan habis daun padi Pak Budi hingga gagal panen!",
          next: "mission_complete"
        },
        {
          id: "B",
          text: "Belalang akan ikut menghilang dan mati dengan sendirinya",
          correct: false,
          feedback: "Justru sebaliknya! Tanpa pemangsa katak, belalang akan bebas berkembang biak lebih banyak.",
          next: "q5_scaffold_2"
        }
      ]
    },

    // Pengarah 5.2
    "q5_scaffold_2": {
      id: "q5_scaffold_2",
      isMain: false,
      title: "Petunjuk Akhir Keseimbangan Alam",
      introSpeech: [
        "Bayangkan sawah dipenuhi jutaan belalang tanpa ada katak yang memakannya 🦗🌾"
      ],
      question: "Apa yang akan dimakan oleh jutaan belalang tersebut?",
      hint: "Makanan kesukaan belalang di sawah adalah...",
      options: [
        {
          id: "A",
          text: "Memakan habis tanaman padi Pak Budi sampai rusak",
          correct: true,
          feedback: "Bingo! 🎯 Itulah jawaban tepatnya! Semua makhluk saling menjaga keseimbangan alam.",
          next: "mission_complete"
        },
        {
          id: "B",
          text: "Memakan bebatuan di parit",
          correct: false,
          feedback: "Belalang memakan tanaman padi! Itulah sebabnya padi Pak Budi rusak saat katak punah.",
          next: "mission_complete"
        }
      ]
    },

    // ==========================================
    // NODE SELESAI
    // ==========================================
    "mission_complete": {
      id: "mission_complete",
      isMain: false,
      isEnd: true,
      title: "Misi Selesai!",
      introSpeech: [
        "🎉 Horeee! Selamat, kamu telah menuntaskan seluruh Misi Sawah Pak Budi!",
        "Sekarang kamu mengerti pentingnya rantai makanan: dari Matahari ☀️ -> Padi (Produsen) 🌾 -> Belalang (Konsumen I) 🦗 -> Katak (Konsumen II) 🐸 -> Ular & Elang 🦅.",
        "Semua makhluk hidup saling bergantung dan menjaga keseimbangan alam!"
      ],
      question: "Apakah kamu ingin melihat hasil petualangan dan lencana prestasimu?",
      hint: "Klik tombol di bawah untuk melihat skor dan lencanamu!",
      options: [
        {
          id: "A",
          text: "Lihat Hasil & Lencana 🏆",
          correct: true,
          feedback: "Membuka halaman penghargaan...",
          next: "VIEW_RESULT"
        }
      ]
    }
  }
};

/**
 * Helper untuk mengambil node tertentu
 */
export function getNode(nodeId) {
  return DECISION_TREE_SAWAH.nodes[nodeId] || null;
}

/**
 * Helper untuk mengambil daftar seluruh node (berguna untuk modal visualisasi pohon percakapan guru)
 */
export function getAllNodes() {
  return Object.values(DECISION_TREE_SAWAH.nodes);
}
