# Petualangan Belajar Timi 🌱
> **Media Pembelajaran Berbasis Chatbot Interaktif untuk Siswa SD Kelas 3–6**
> Menggunakan metode *Socratic Questioning* & sistem percakapan bercabang (*Decision Tree*).

![Timi Bot Banner](https://img.shields.io/badge/Platform-Web%20App-emerald?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-purple?style=for-the-badge&logo=vite)
![No Generative AI](https://img.shields.io/badge/AI%20Model-Deterministic%20Decision%20Tree-orange?style=for-the-badge)

---

## 📌 Konsep Utama

Website ini adalah media edukasi sains interaktif berbentuk chatbot tutor virtual (**Timi si Robot Belajar** 🤖). Chatbot mengajak siswa belajar melalui percakapan, memberikan pertanyaan, menerima jawaban, memberikan feedback, dan mengarahkan siswa melalui alur berpikir kritis.

### 💡 Keunggulan Utama:
- **TIDAK menggunakan AI Generatif / API ChatGPT eksternal**: Semua pertanyaan, pilihan jawaban, feedback, petunjuk pengarah, dan percabangan dikontrol oleh struktur data JSON murni yang deterministik dan aman untuk anak SD.
- **Pendekatan Socratic Questioning**: Jika siswa menjawab salah, chatbot **TIDAK** langsung memberikan kunci jawaban atau sekadar menyalahkan secara kaku. Chatbot memberikan pertanyaan/petunjuk pengarah (*scaffolding*) agar siswa menemukan jawaban yang benar melalui proses berpikirnya sendiri.
- **Struktur Data Siap Excel**: Struktur data pohon percakapan dirancang modular sehingga guru dapat dengan mudah membuat atau memperbarui materi melalui format tabel Spreadsheet/Excel.

---

## 🚀 Struktur Halaman & Fitur

1. **Landing Page (`/`)**:
   - Hero ceria dengan maskot Timi dan tombol CTA petualangan.
   - Panduan 3 langkah bermain: *Temukan Misi*, *Jawab Pertanyaan*, dan *Temukan Jawabannya*.
   - Kartu misi sains dengan badge status dinamis (*Belum dimulai*, *Sedang berlangsung*, *Selesai ✓*).

2. **Halaman Pilih Misi (`/#/missions`)**:
   - Daftar misi pembelajaran sains:
     - 🌾 **MISSION 01: Sawah Pak Budi** (Rantai Makanan & Hubungan Makhluk Hidup)
     - 🌿 **MISSION 02: Rimba Hutan Tropis** (Konsumen Puncak & Pengurai)
     - 🐠 **MISSION 03: Taman Karang Biru** (Simbiosis & Fitoplankton)

3. **Ruang Chatbot Pembelajaran (`/#/mission/sawah-pak-budi`)**:
   - Header interaktif dengan tombol kembali, ikon misi, counter pertanyaan utama, dan progress bar horizontal.
   - Balon obrolan dinamis (Chatbot di kiri, Siswa di kanan).
   - Animasi *typing indicator* tiga titik lentur.
   - Papan petunjuk berpikir (*hint bar*) di bawah obrolan.
   - Pilihan jawaban berbentuk tombol (A, B, C, D) yang otomatis terkunci (*disabled*) saat dipilih untuk mencegah respon ganda.
   - Autoscroll mulus ke pesan terbaru.

4. **Halaman Hasil & Lencana (`/#/result`)**:
   - Selebrasi kelulusan misi dengan animasi *confetti*.
   - Perolehan lencana prestasi: **🏆 Penjelajah Rantai Makanan**.
   - Statistik belajar: Pertanyaan selesai, tingkat kecermatan (%), dan jumlah petunjuk yang dieksplorasi.
   - Tombol *Ulangi Misi* dan *Pilih Misi Lain*.

5. **Peta Decision Tree (Untuk Guru & Evaluator)**:
   - Tombol inspeksi visual di bilah navigasi atas untuk melihat seluruh alur pohon percakapan dan skema format kolom Spreadsheet/Excel.

6. **Audio Synthesizer Terintegrasi**:
   - Efek suara sintetis murni menggunakan Web Audio API (benar, petunjuk, dan kemenangan) tanpa membutuhkan aset MP3 eksternal.

7. **Penyimpanan Lokal (localStorage)**:
   - Menyimpan progres percakapan dan status penyelesaian misi secara otomatis di peramban.

---

## 🛠️ Teknologi yang Digunakan

- **Frontend**: React 19 + Vite
- **Styling**: Vanilla CSS (Modern Educational Design System, Google Fonts *Nunito* & *Plus Jakarta Sans*)
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Audio Engine**: Web Audio API Procedural Synthesizer
- **State & Data Engine**: Branching Conversation State Controller berbasis JSON

---

## 💻 Cara Menjalankan Secara Lokal

1. **Clone repository ini**:
   ```bash
   git clone https://github.com/adamnbm/petualanganbelajar.git
   cd petualanganbelajar
   ```

2. **Install dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan development server**:
   ```bash
   npm run dev
   ```

4. **Buka di browser**:
   Akses `http://localhost:5173/`

5. **Build untuk produksi**:
   ```bash
   npm run build
   ```

---

## 📂 Struktur Direktori Proyek

```
petualanganbelajar/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                   # Entry point aplikasi
    ├── App.jsx                    # Routing & state controller
    ├── index.css                  # Desain sistem edukasi SD (responsif & animasi)
    ├── data/
    │   ├── missions.js            # Metadata misi pembelajaran
    │   └── decisionTreeSawah.js   # Master data pohon percakapan Socratic
    ├── engine/
    │   ├── conversationEngine.js  # Controller mesin percakapan bercabang
    │   └── audioEffects.js        # Synthesizer efek suara ramah anak
    ├── components/
    │   ├── Navbar.jsx             # Navigasi atas, sound toggle, inspeksi pohon
    │   ├── LandingHero.jsx        # Hero section landing page
    │   ├── HowToPlay.jsx          # Panduan 3 langkah bermain
    │   ├── MissionCard.jsx        # Kartu misi dengan status dinamis
    │   ├── ChatHeader.jsx         # Header chatbot, info progres, tombol kembali
    │   ├── ChatMessageList.jsx    # Daftar balon chat, typing indicator, autoscroll
    │   ├── ChatOptionButtons.jsx  # Pilihan tombol jawaban (A, B, C, D)
    │   ├── ChatHintDrawer.jsx     # Bar petunjuk berpikir kontekstual
    │   ├── ResultCard.jsx         # Layar hasil, lencana, dan confetti
    │   ├── TreeVisualizerModal.jsx# Modal inspeksi alur percabangan untuk guru
    │   └── Footer.jsx             # Footer aplikasi
    └── utils/
        └── storage.js             # Persistensi progres siswa di localStorage
```

---

Dibuat dengan ❤️ untuk kemajuan media pembelajaran sains interaktif siswa sekolah dasar.
