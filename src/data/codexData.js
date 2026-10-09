/**
 * Master Data Buku Pintar (Interactive Codex Cards)
 * Berdasarkan Materi PDF Kartu Pintar Ekosistem Sawah SOKRABOT (5 Kartu Pintar: A s.d D)
 * Menampilkan Modul Belajar Lengkap Interaktif:
 * - Pertanyaan Pemantik & Konsep Dasar
 * - Materi & Penjelasan Ilmiah
 * - 'Tahukah Kamu?' (Fakta Sains Menarik)
 * - Visualisasi Alur / Diagram / Peran Organisme
 * - 'Ingat Konsepnya!' (Rangkuman Konsep Ilmiah)
 */

export const CODEX_CARDS = [
  // ==========================================
  // KARTU PINTAR 1 (POINT A)
  // ==========================================
  {
    id: "codex_kartu_1",
    pointLetter: "A",
    kartuNumber: 1,
    missionId: "misi_1",
    missionName: "Misi 1: Siapa Aku?",
    title: "Mengenal Ekosistem dan Rantai Makanan",
    subtitle: "Hubungan Timbal Balik Makhluk Hidup & Lingkungannya",
    category: "Ekosistem & Rantai Makanan",
    icon: "🌾",
    accentColor: "#2E7D32",
    myth: "Makhluk hidup di alam hidup sendiri-sendiri tanpa membutuhkan lingkungan atau makhluk hidup lainnya.",
    fact: "Semua makhluk hidup saling berhubungan dengan makhluk hidup lain dan lingkungannya membentuk ekosistem, serta terhubung melalui peristiwa makan dan dimakan (rantai makanan) untuk mengalirkan energi.",
    sokrabotNote: "Detektif Cilik, perhatikan kebun dan sawah di sekitarmu! Setiap rumput, ulat, dan burung saling terhubung dalam rantai kehidupan yang menakjubkan.",
    keyPoints: [
      "Ekosistem = Hubungan timbal balik antara makhluk hidup dan lingkungannya.",
      "Rantai makanan = Hubungan makan dan dimakan yang menunjukkan perpindahan energi.",
      "Tiga peran utama: Produsen (pembuat makanan), Konsumen (pemakan), dan Pengurai (dekomposer)."
    ],
    hook: {
      title: "Pernahkah Kamu Memperhatikan Lingkungan Sekitarmu?",
      story: "Coba ingat ketika kamu berada di halaman rumah atau sekolah. Pernahkah kamu melihat ulat memakan daun? Atau melihat cicak menangkap nyamuk dan serangga kecil di dinding rumah?",
      question: "Mengapa ulat memakan daun? Mengapa cicak menangkap serangga?",
      explanation: "Ternyata, semua makhluk hidup membutuhkan makanan untuk mendapatkan energi. Energi tersebut digunakan untuk tumbuh, bergerak, dan melakukan kegiatan sehari-hari. Di alam, makhluk hidup juga saling berhubungan dengan makhluk hidup lain dan lingkungan tempat tinggalnya."
    },
    sections: [
      {
        heading: "Apa Itu Ekosistem?",
        paragraphs: [
          "Ekosistem adalah hubungan timbal balik antara makhluk hidup dengan makhluk hidup lainnya serta lingkungan tempat tinggalnya.",
          "Contohnya, di halaman sekolah terdapat rumput, pohon, semut, kupu-kupu, tanah, air, udara, dan cahaya matahari.",
          "Tumbuhan membutuhkan air, udara, dan cahaya matahari untuk tumbuh. Sementara itu, hewan membutuhkan makanan, air, dan tempat hidup. Semua bagian tersebut saling berhubungan sehingga membentuk sebuah ekosistem.",
          "Ekosistem dapat ditemukan di berbagai tempat, seperti halaman rumah, kebun, kolam, sungai, hutan, dan sawah."
        ]
      },
      {
        heading: "Mengapa Ada Rantai Makanan?",
        paragraphs: [
          "Setiap makhluk hidup membutuhkan energi untuk bertahan hidup. Namun, tidak semua makhluk hidup dapat membuat makanannya sendiri.",
          "Tumbuhan hijau dapat membuat makanan dengan bantuan cahaya matahari. Sementara itu, hewan mendapatkan energi dengan memakan tumbuhan atau hewan lain.",
          "Karena itulah terjadi hubungan makan dan dimakan antarmakhluk hidup. Hubungan tersebut membentuk rantai makanan.",
          "Rantai makanan adalah hubungan makan dan dimakan antara makhluk hidup yang menunjukkan perpindahan energi dari satu makhluk hidup ke makhluk hidup lainnya."
        ]
      }
    ],
    chainExamples: [
      {
        title: "Contoh Rantai Makanan di Kebun",
        steps: [
          { name: "Daun", role: "Tumbuhan", emoji: "🍃" },
          { name: "Ulat", role: "Pemakan Daun", emoji: "🐛" },
          { name: "Burung", role: "Pemakan Ulat", emoji: "🐦" }
        ],
        desc: "Energi berpindah dari daun ke ulat, kemudian dari ulat ke burung."
      },
      {
        title: "Contoh Rantai Makanan di Sawah",
        steps: [
          { name: "Padi", role: "Produsen", emoji: "🌾" },
          { name: "Tikus", role: "Konsumen I", emoji: "🐀" },
          { name: "Ular", role: "Konsumen II", emoji: "🐍" },
          { name: "Elang", role: "Konsumen III", emoji: "🦅" }
        ],
        desc: "Padi dimakan tikus, tikus dimakan ular, dan ular dimakan elang. Energi berpindah secara berantai."
      }
    ],
    roles: [
      {
        name: "Produsen",
        role: "Tumbuhan Hijau",
        desc: "Makhluk hidup yang dapat membuat makanan sendiri, seperti padi dan rumput.",
        icon: "🌱",
        color: "#2E7D32"
      },
      {
        name: "Konsumen",
        role: "Hewan Pemakan",
        desc: "Makhluk hidup yang mendapatkan energi dengan memakan makhluk hidup lain, seperti tikus, ular, dan elang.",
        icon: "🐀",
        color: "#D97706"
      },
      {
        name: "Pengurai",
        role: "Dekomposer",
        desc: "Organisme yang menguraikan sisa makhluk hidup yang telah mati, seperti jamur dan bakteri.",
        icon: "🍄",
        color: "#7C3AED"
      }
    ],
    rememberConcepts: [
      "Ekosistem adalah tempat berlangsungnya hubungan antara makhluk hidup dan lingkungannya.",
      "Salah satu hubungan tersebut adalah makan dan dimakan yang membentuk rantai makanan.",
      "Melalui rantai makanan, energi berpindah dari satu makhluk hidup ke makhluk hidup lainnya."
    ]
  },

  // ==========================================
  // KARTU PINTAR 2 (POINT B)
  // ==========================================
  {
    id: "codex_kartu_2",
    pointLetter: "B",
    kartuNumber: 2,
    missionId: "misi_2",
    missionName: "Misi 2: Rantai Makanan",
    title: "Dari Mana Energi Berasal?",
    subtitle: "Fotosintesis, Sumber Energi Matahari & Aliran Panah Energi",
    category: "Aliran Energi & Fotosintesis",
    icon: "☀️",
    accentColor: "#D97706",
    myth: "Tanaman padi menyerap makanan yang sudah jadi atau pupuk dari tanah, dan panah rantai makanan menunjukkan siapa yang menyerang siapa.",
    fact: "Matahari adalah sumber energi utama. Padi memasak makanannya sendiri lewat fotosintesis (akar hanya menyerap air dan mineral). Tanda panah (→) melambangkan arah perpindahan energi makanan!",
    sokrabotNote: "Ingat Detektif: Panah menusuk ke arah yang memakan karena energi makanan berpindah ke tubuh hewan tersebut!",
    keyPoints: [
      "Matahari = Sumber energi utama seluruh rantai makanan di Bumi.",
      "Fotosintesis = Mengolah air, karbon dioksida, dan sinar matahari menjadi gula.",
      "Tanda panah (→) = Arah perpindahan energi makanan, bukan arah hewan berlari.",
      "Energi berkurang di setiap tingkatan rantai makanan karena digunakan beraktivitas dan dilepas sebagai panas."
    ],
    hook: {
      title: "1. Mengapa Makhluk Hidup Membutuhkan Energi?",
      story: "Pernahkah kamu merasa lapar setelah bermain atau berlari? Tubuhmu membutuhkan makanan agar memiliki energi untuk bergerak dan melakukan kegiatan. Begitu juga dengan hewan dan tumbuhan. Semua makhluk hidup membutuhkan energi untuk tumbuh dan bertahan hidup.",
      question: "Namun, tahukah kamu dari mana energi dalam rantai makanan berasal?",
      explanation: "Matahari merupakan sumber energi utama bagi sebagian besar rantai makanan di Bumi. Tanpa cahaya matahari, kehidupan di bumi tidak dapat berlangsung!"
    },
    sections: [
      {
        heading: "2. Bagaimana Padi Mendapatkan Energi?",
        paragraphs: [
          "Padi adalah tumbuhan hijau yang dapat membuat makanannya sendiri melalui proses FOTOSINTESIS.",
          "Dengan bantuan cahaya matahari, padi mengolah air dan karbon dioksida menjadi makanan berupa gula. Makanan tersebut digunakan untuk tumbuh dan menyimpan cadangan energi."
        ],
        ingredients: [
          { label: "Cahaya Matahari", desc: "Sebagai sumber energi utama pembuatan makanan.", icon: "☀️" },
          { label: "Air dari Tanah", desc: "Diserap oleh akar tanaman bersama mineral.", icon: "💧" },
          { label: "Karbon Dioksida", desc: "Diperoleh daun padi dari udara sekitar.", icon: "🌬️" }
        ],
        funFact: "Akar padi menyerap air dan mineral dari tanah, BUKAN mengambil makanan yang sudah jadi! Energi untuk membuat makanan berasal dari cahaya matahari, bukan dari tanah."
      },
      {
        heading: "3. Bagaimana Energi Berpindah ke Hewan?",
        paragraphs: [
          "Tikus tidak dapat membuat makanannya sendiri seperti padi. Tikus mendapatkan energi dengan memakan padi.",
          "Ketika ular memakan tikus, sebagian energi dari tikus berpindah ke ular. Begitu pula ketika elang memangsa ular.",
          "Perpindahan energi ini membentuk rantai makanan yang berkesinambungan."
        ]
      },
      {
        heading: "4. Apa Arti Tanda Panah dalam Rantai Makanan?",
        paragraphs: [
          "Perhatikan hubungan berikut: Padi → Tikus.",
          "Panah tersebut berarti ENERGI BERPINDAH dari padi ke tikus karena tikus memakan padi.",
          "Jadi, arah panah menunjukkan arah perpindahan energi, BUKAN arah hewan berjalan atau mengejar mangsanya!"
        ]
      },
      {
        heading: "5. Apakah Energi Terus Berpindah dalam Jumlah yang Sama?",
        paragraphs: [
          "TIDAK! Setiap makhluk hidup menggunakan energi untuk bergerak, tumbuh, bernapas, dan menjalankan fungsi tubuh. Sebagian energi juga dilepaskan ke udara sebagai panas.",
          "Oleh karena itu, energi yang tersedia untuk makhluk hidup pada tingkat rantai makanan berikutnya SEMAKIN SEDIKIT."
        ]
      }
    ],
    energyFlowSteps: [
      { name: "Matahari", info: "Menghasilkan energi cahaya", icon: "☀️" },
      { name: "Padi", info: "Fotosintesis & simpan energi", icon: "🌾" },
      { name: "Tikus", info: "Makan padi & dapat energi", icon: "🐀" },
      { name: "Ular", info: "Makan tikus & dapat energi", icon: "🐍" },
      { name: "Elang", info: "Memangsa ular & dapat energi", icon: "🦅" }
    ],
    rememberConcepts: [
      "Matahari merupakan sumber energi utama bagi sebagian besar rantai makanan.",
      "Padi membuat makanan sendiri melalui fotosintesis.",
      "Hewan memperoleh energi dengan memakan makhluk hidup lain.",
      "Panah (→) menunjukkan arah perpindahan energi.",
      "Energi yang tersedia semakin sedikit pada tingkat rantai makanan yang lebih tinggi."
    ]
  },

  // ==========================================
  // KARTU PINTAR 3 (POINT C)
  // ==========================================
  {
    id: "codex_kartu_3",
    pointLetter: "C",
    kartuNumber: 3,
    missionId: "misi_3",
    missionName: "Misi 3: Siapa Memburu Siapa?",
    title: "Siapa Predator dan Siapa Mangsa?",
    subtitle: "Aksi Berburu, Mangsa, dan Peran Ganda Hewan di Sawah",
    category: "Predator & Mangsa",
    icon: "🦅",
    accentColor: "#EA580C",
    myth: "Tumbuhan adalah mangsa, dan hewan hanya bisa memiliki satu peran kaku: menjadi predator saja atau mangsa saja.",
    fact: "Predator khusus untuk hewan pemakan hewan lain. Seekor hewan bisa memiliki peran ganda: ular adalah predator bagi tikus, tetapi sekaligus menjadi mangsa bagi elang!",
    sokrabotNote: "Hebat sekali kan detektif? Alam sawah sangat fleksibel! Seekor pemangsa bisa berbalik menjadi buruan jika bertemu pemangsa yang lebih tangguh.",
    keyPoints: [
      "Predator = Hewan yang memburu dan memakan hewan lain.",
      "Mangsa = Hewan yang diburu dan dimakan oleh predator.",
      "Peran ganda = Hewan bisa menjadi predator sekaligus mangsa tergantung hubungannya.",
      "Hubungan predator-mangsa mengontrol kestabilan populasi di sawah."
    ],
    hook: {
      title: "1. Pernahkah Kamu Melihat Hewan Berburu?",
      story: "Pernahkah kamu melihat kucing mengejar tikus? Atau cicak menangkap nyamuk di dinding rumah?",
      question: "Mengapa kucing mengejar tikus? Mengapa cicak menangkap serangga?",
      explanation: "Hewan-hewan tersebut sedang mencari makanan untuk mendapatkan energi. Ada hewan yang memperoleh makanan dengan cara memburu hewan lain. Dalam hubungan makan dan dimakan, kita mengenal istilah predator dan mangsa."
    },
    sections: [
      {
        heading: "2. Apa Itu Predator?",
        paragraphs: [
          "Predator adalah hewan yang memburu dan memakan hewan lain untuk mendapatkan makanan.",
          "Predator biasanya memiliki kemampuan tertentu untuk membantu menangkap mangsanya.",
          "Di ekosistem sawah, ular merupakan salah satu predator yang dapat memangsa tikus."
        ],
        examples: [
          { animal: "Kucing", prey: "Tikus", ability: "Cakar tajam & gigi taring kuat", icon: "🐱" },
          { animal: "Cicak", prey: "Serangga / Nyamuk", ability: "Mulut cepat & lidah berlendir lengket", icon: "🦎" },
          { animal: "Ular", prey: "Tikus Sawah", ability: "Sensor panas, taring, dan lilitan kuat", icon: "🐍" },
          { animal: "Elang", prey: "Ular & Mamalia", ability: "Penglihatan jarak jauh & cakar pencengkeram tajam", icon: "🦅" }
        ]
      },
      {
        heading: "3. Apa Itu Mangsa?",
        paragraphs: [
          "Mangsa adalah hewan yang diburu dan dimakan oleh predator.",
          "Contohnya, ketika ular memakan tikus, tikus disebut mangsa karena menjadi makanan ular. Tikus memiliki kemampuan berlari gesit dan pendengaran peka untuk menghindari predator."
        ]
      },
      {
        heading: "4. Apakah Predator Bisa Menjadi Mangsa?",
        paragraphs: [
          "TENTU BISA! Seekor hewan dapat menjadi predator sekaligus mangsa, bergantung pada hubungan makan dan dimakan yang sedang terjadi.",
          "Perhatikan rantai makanan sawah berikut:",
          "• Tikus menjadi mangsa ular.",
          "• Ular menjadi predator ketika memakan tikus.",
          "• Elang menjadi predator ketika memangsa ular.",
          "• Ular menjadi mangsa ketika dimakan elang.",
          "Jadi, ULAR dapat berperan sebagai PREDATOR dan MANGSA dalam hubungan yang berbeda!"
        ],
        funFact: "Tidak semua konsumen disebut predator! Tikus yang memakan padi merupakan konsumen herbivora, tetapi TIDAK disebut predator padi karena predator adalah hewan yang memangsa hewan lain (daging)."
      },
      {
        heading: "5. Mengapa Predator dan Mangsa Penting dalam Ekosistem?",
        paragraphs: [
          "Predator dan mangsa memiliki hubungan yang dapat memengaruhi jumlah makhluk hidup di alam.",
          "Misalnya, di sawah terdapat banyak tikus yang memakan padi. Ular membantu mengendalikan jumlah tikus dengan memangsanya.",
          "Jika jumlah ular berkurang, tikus mungkin bertambah karena lebih sedikit yang memangsanya. Sebaliknya, jika jumlah tikus berkurang, ular mungkin kesulitan mendapatkan makanan.",
          "Karena itu, hubungan predator dan mangsa merupakan salah satu bagian penting dalam menjaga keseimbangan ekosistem."
        ]
      }
    ],
    rememberConcepts: [
      "Predator adalah hewan yang memburu dan memakan hewan lain.",
      "Mangsa adalah hewan yang diburu dan dimakan predator.",
      "Seekor hewan dapat menjadi predator sekaligus mangsa (peran ganda).",
      "Hubungan predator dan mangsa dapat memengaruhi keseimbangan ekosistem."
    ]
  },

  // ==========================================
  // KARTU PINTAR 4 (MISI 4)
  // ==========================================
  {
    id: "codex_kartu_4",
    pointLetter: "Misi 4",
    kartuNumber: 4,
    missionId: "misi_4",
    missionName: "Misi 4: Sawah dalam Bahaya!",
    title: "Apa yang Terjadi Jika Jumlah Makhluk Hidup Berubah?",
    subtitle: "Dinamika Populasi & Dampak Efek Domino di Sawah",
    category: "Dinamika Populasi",
    icon: "⚠️",
    accentColor: "#DC2626",
    myth: "Jika populasi ular sawah berkurang, sawah akan aman dan tidak berdampak apa-apa pada tanaman padi.",
    fact: "Terjadi EFEK DOMINO: Berkurangnya ular membuat tikus meledak tanpa pemangsa, lalu ribuan tikus menghabisi tanaman padi hingga petani gagal panen!",
    sokrabotNote: "Ibarat kartu domino yang roboh beruntun, gangguan pada satu populasi akan merambat ke seluruh penghuni sawah!",
    keyPoints: [
      "Populasi = Kumpulan makhluk hidup sejenis di suatu tempat pada waktu tertentu.",
      "Keterkaitan = Setiap makhluk hidup terikat dalam jaring makanan.",
      "Efek Domino = Penurunan predator (ular) ➔ Lonjakan hama (tikus) ➔ Kerusakan produsen (padi).",
      "Kekeringan pada padi juga memicu kelaparan pada tikus, ular, hingga elang."
    ],
    hook: {
      title: "1. Pernahkah Kamu Melihat Banyak Semut Berkumpul?",
      story: "Pernahkah kamu melihat banyak semut mengerumuni makanan yang jatuh? Atau melihat banyak nyamuk muncul setelah hujan?",
      question: "Tahukah kamu bahwa perubahan jumlah satu jenis makhluk hidup dapat memengaruhi makhluk hidup lainnya?",
      explanation: "Jumlah makhluk hidup di suatu tempat dapat bertambah atau berkurang. Perubahan jumlah tersebut juga dapat terjadi pada hewan dan tumbuhan di sawah, memicu dampak besar bagi kelangsungan ekosistem."
    },
    sections: [
      {
        heading: "2. Apa Itu Populasi?",
        paragraphs: [
          "Populasi adalah kumpulan makhluk hidup sejenis yang tinggal di suatu tempat pada waktu tertentu.",
          "Contohnya di sawah: Semua tikus yang hidup di sawah disebut populasi tikus. Semua ular yang hidup di area tersebut disebut populasi ular. Semua tanaman padi di area tersebut disebut populasi padi.",
          "Jumlah anggota populasi dapat bertambah atau berkurang karena berbagai faktor, seperti ketersediaan makanan, keberadaan predator, serangan penyakit, dan kondisi lingkungan cuaca."
        ]
      },
      {
        heading: "3. Mengapa Makhluk Hidup Saling Memengaruhi?",
        paragraphs: [
          "Dalam rantai makanan di sawah: tikus membutuhkan padi sebagai makanan, ular memakan tikus, dan elang dapat memangsa ular.",
          "Artinya, setiap makhluk hidup memiliki hubungan dengan makhluk hidup lainnya. Jika salah satu populasi berubah, populasi lain juga dapat terpengaruh!"
        ]
      },
      {
        heading: "4. Apa yang Terjadi Jika Jumlah Ular Berkurang?",
        paragraphs: [
          "Bayangkan banyak ular di sawah ditangkap atau dibasmi manusia. Apa yang mungkin terjadi?",
          "Karena jumlah ular yang memangsa tikus berkurang, lebih banyak tikus dapat bertahan hidup dan berkembang biak cepat. Jika jumlah tikus melonjak tinggi, padi yang dimakan juga semakin banyak hingga tanaman padi habis!",
          "Namun, perubahan tersebut tidak selalu terjadi dengan cara yang sama karena masih dipengaruhi oleh makanan, predator lain, dan keadaan lingkungan."
        ],
        dominoSteps: [
          { step: 1, title: "Jumlah Ular Berkurang", desc: "Ular ditangkap atau diburu manusia.", icon: "📉🐍" },
          { step: 2, title: "Jumlah Tikus Bertambah", desc: "Tikus bebas berkembang biak tanpa pemangsa alami.", icon: "📈🐀" },
          { step: 3, title: "Lebih Banyak Padi Dimakan", desc: "Rombongan tikus memakan rumpun padi Pak Tani.", icon: "🌾💥" },
          { step: 4, title: "Tanaman Padi Habis Rusak", desc: "Sawah hancur dan hasil panen gagal total.", icon: "📉🌾" }
        ]
      },
      {
        heading: "5. Bagaimana Jika Jumlah Padi Berkurang?",
        paragraphs: [
          "Sekarang bayangkan tanaman padi banyak yang mati akibat kekeringan atau kemarau ekstrem:",
          "• Tikus dapat kekurangan makanan.",
          "• Jumlah tikus mungkin berkurang atau tikus berpindah mencari makanan lain.",
          "• Ular yang biasa memakan tikus kesulitan mendapatkan makanan.",
          "• Elang juga dapat terpengaruh jika mangsanya semakin sulit ditemukan.",
          "Jadi, perubahan jumlah produsen dapat memengaruhi konsumen dalam rantai makanan secara menyeluruh."
        ]
      },
      {
        heading: "6. Apa Itu Keseimbangan Ekosistem?",
        paragraphs: [
          "Keseimbangan ekosistem adalah keadaan ketika hubungan antara makhluk hidup dan lingkungannya tetap mendukung kelangsungan kehidupan.",
          "Dalam ekosistem yang seimbang, makhluk hidup dapat memperoleh makanan dan menjalankan perannya di lingkungan.",
          "Keseimbangan bukan berarti jumlah setiap makhluk hidup harus selalu sama setiap waktu. Populasi dapat berubah secara alami. Namun, jika terjadi perubahan yang sangat besar (seperti hilangnya predator atau rusaknya habitat), keseimbangan ekosistem dapat terganggu!"
        ]
      }
    ],
    rememberConcepts: [
      "Populasi adalah kumpulan makhluk hidup sejenis di suatu tempat.",
      "Makhluk hidup dalam rantai makanan saling berhubungan erat.",
      "Jika jumlah satu populasi berubah, populasi lain dapat terpengaruh.",
      "Menjaga keseimbangan ekosistem penting bagi kelangsungan hidup makhluk hidup."
    ]
  },

  // ==========================================
  // KARTU PINTAR 5 (POINT D / PENGUATAN)
  // ==========================================
  {
    id: "codex_kartu_5",
    pointLetter: "D",
    kartuNumber: 5,
    missionId: "misi_5",
    missionName: "Misi 5: Jaga Keseimbangan!",
    title: "Penguatan: Menjaga Keseimbangan Ekosistem Sawah",
    subtitle: "Solusi Bijak Menjaga Harmoni Sawah & Sahabat Petani",
    category: "Penguatan & Keseimbangan",
    icon: "🛡️",
    accentColor: "#15803D",
    myth: "Solusi terbaik membasmi hama sawah adalah dengan memusnahkan semua tikus dan predator berbahaya sampai habis.",
    fact: "Membasmi habis semua tikus memutus rantai makanan: ular dan elang kelaparan, sementara hama lain (seperti wereng) meledak! Keseimbangan terjaga jika predator alami dilestarikan.",
    sokrabotNote: "Detektif Sejati tahu bahwa alam memiliki cara alaminya sendiri. Bersahabat dengan predator alami adalah rahasia sawah subur dan petani makmur!",
    keyPoints: [
      "Membasmi semua tikus bukan solusi baik dan merusak rantai makanan.",
      "Predator alami (ular, burung pemangsa) mengendalikan hama tikus secara alami.",
      "Keseimbangan ekosistem menjamin keberlangsungan pangan dan panen petani.",
      "Langkah bijak: Kelola sawah ramah lingkungan dan lindungi habitat predator alami."
    ],
    hook: {
      title: "Dilema Pak Tani: Mengapa Tidak Boleh Membasmi Semua Tikus?",
      story: "Pak Tani ingin membasmi SEMUA tikus karena padi di sawah sering rusak. Pak Tani berpikir: 'Apakah ini solusi yang baik jika semua tikus dimusnahkan?'",
      question: "Yuk, kita lihat apa yang bisa terjadi jika semua tikus dibasmi vs bagaimana cara menjaga keseimbangan!",
      explanation: "Di alam sawah, setiap hewan memiliki tugasnya. Memutus satu bagian dapat menimbulkan kekacauan yang jauh lebih rumit!"
    },
    comparison: {
      negative: {
        title: "❌ Jika Semua Tikus Dibasmi...",
        points: [
          "Jumlah tikus menjadi sangat sedikit atau hilang sama sekali.",
          "Ular kesulitan mendapatkan makanan, jumlah ular dapat berkurang drastis.",
          "Elang juga kesulitan mendapatkan makanan (kehilangan mangsa).",
          "Hama lain (seperti serangga & belalang) dapat meningkat pesat dan tetap merusak padi!"
        ]
      },
      positive: {
        title: "✅ Ekosistem Tetap Seimbang...",
        points: [
          "Rantai makanan Padi ➔ Tikus ➔ Ular ➔ Elang berjalan harmonis.",
          "Jumlah setiap makhluk hidup terjaga alami.",
          "Tikus tetap ada namun jumlahnya terkontrol oleh predator (ular & elang).",
          "Kerusakan padi dapat terkendali dan ekosistem sawah tetap lestari!"
        ]
      }
    },
    rememberChecklist: [
      "Setiap makhluk hidup memiliki peran penting dalam ekosistem.",
      "Membasmi semua tikus BUKAN solusi yang baik.",
      "Predator seperti ular dan elang membantu mengendalikan jumlah tikus secara alami.",
      "Ekosistem akan tetap sehat jika jumlah makhluk hidup terjaga seimbang."
    ],
    actionSteps: [
      { num: 1, text: "Mengelola sawah dengan cara yang ramah lingkungan.", icon: "🌾" },
      { num: 2, text: "Tidak membasmi semua tikus secara berlebihan.", icon: "🛡️" },
      { num: 3, text: "Melindungi habitat ular, elang, dan makhluk hidup lainnya.", icon: "🦅" },
      { num: 4, text: "Menjaga kebersihan dan kelestarian lingkungan sawah.", icon: "💧" }
    ],
    rememberConcepts: [
      "Setiap makhluk hidup memiliki peran yang tak tergantikan dalam ekosistem.",
      "Membasmi suatu populasi secara total merusak rantai makanan di sekelilingnya.",
      "Predator alami adalah sahabat petani untuk menjaga populasi hama tetap terkendali.",
      "Menjaga keseimbangan ekosistem adalah kunci kelestarian alam dan kemakmuran bersama."
    ]
  }
];

export function getCodexById(codexId) {
  return CODEX_CARDS.find((c) => c.id === codexId) || CODEX_CARDS[0];
}

export function getCodexByMissionId(missionId) {
  return CODEX_CARDS.filter((c) => c.missionId === missionId);
}
