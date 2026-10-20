# Petualangan Belajar Sokrabot 🌱
> **Media Pembelajaran Sains Interaktif Berbasis AI Socratic & Gamifikasi untuk Siswa SD Kelas 3–6**

[![Platform Web App](https://img.shields.io/badge/Platform-Web%20App-emerald?style=for-the-badge)](https://github.com/adamnbm/petualanganbelajar)
[![React 19](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-purple?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Google Gemini AI](https://img.shields.io/badge/AI%20Engine-Google%20Gemini%20Flash-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

---

## 📌 Tentang Aplikasi

**Petualangan Belajar Timi** adalah platform edukasi IPA (Ilmu Pengetahuan Alam) interaktif yang dirancang khusus untuk siswa sekolah dasar. Menghadirkan **Timi & SOKRABOT** (Tutor AI Cerdas), aplikasi ini mengombinasikan metode **Socratic Questioning** dengan pendekatan gamifikasi yang menyenangkan guna melatih keterampilan berpikir kritis, mengidentifikasi miskonsepsi konsep sains, dan membangun pemahaman konsep yang mendalam sejak dini.

---

## ✨ Fitur-Fitur Utama

### 🤖 1. Sokrabot Socratic AI (Google Gemini Integration)
- **Tutor Percakapan Ramah Anak**: Memberikan umpan balik yang ceria, suportif, dan edukatif tanpa pernah memarahi siswa.
- **Deteksi Miskonsepsi Otomatis**: Menganalisis alasan di balik jawaban siswa untuk mendeteksi apakah siswa mengalami miskonsepsi konsep sains (misal: produsen vs konsumen, peran dekomposer).
- **Scaffolding Bertingkat**: Menuntun siswa menemukan sendiri pemahaman yang benar melalui petunjuk terarah (*hint*) alih-alih langsung membeberkan kunci jawaban.
- **Mode Hibrida & Fallback Cerdas**: Dilengkapi cadangan *Deterministic Decision Tree* berbasis JSON yang tetap dapat berjalan lancar saat offline atau tanpa koneksi API AI.

### 📊 2. Dashboard Guru & Analitik Kelas
- **Pemantauan Progres Siswa**: Melihat daftar siswa aktif, tingkat penyelesaian misi, dan skor akurasi belajar.
- **Peta Analisis Miskonsepsi**: Visualisasi titik-titik pertanyaan di mana siswa paling sering keliru untuk membantu guru memberikan remedial yang tepat sasaran.
- **Tabel Rekap Data**: Terintegrasi langsung dengan database Supabase untuk pemantauan kelas secara real-time.

### 🎮 3. Minigame Edukatif Rantai Makanan
- Simulasi jaring-jaring makanan interaktif di mana siswa dapat menyusun organisme (produsen, konsumen I, II, puncak, pengurai) ke dalam ekosistem yang seimbang.
- Visual interaktif responsif untuk perangkat mobile maupun desktop.

### 📖 4. Buku Pintar Sains (Ensiklopedia Mini)
- Rangkuman materi sains visual dengan ilustrasi menarik dan bahasa yang ramah anak.
- Glosarium istilah sains (herbivora, karnivora, rantai makanan, fotosintesis, dekomposer, simbiosis, dll.).

### 🏆 5. Gamifikasi & Sistem Prestasi
- **Lencana & Trofi**: Penghargaan digital atas pencapaian eksplorasi, ketelitian, dan ketekunan belajar siswa.
- **Layar Selebrasi**: Dilengkapi efek animasi *canvas confetti* dan efek suara sintetis ceria (Web Audio API).
- **Profil Siswa**: Penyimpanan identitas siswa, catatan petualangan, dan progres misi.

---

## 🚀 Struktur Modul & Halaman

| Halaman / Komponen | Fungsi Utama |
| :--- | :--- |
| **Splash Screen & Login Siswa** | Penyambutan ceria dan pengisian nama detektif sains cilik. |
| **Menu Utama & Peta Misi** | Navigasi petualangan antar ekosistem (Sawah, Hutan Tropis, Terumbu Karang). |
| **Ruang Belajar Chatbot (Sokrabot)** | Ruang interaksi tanya-jawab Socratic interaktif dengan input pilihan ganda & esai. |
| **Minigame Ekosistem** | Latihan menyusun rantai makanan interaktif secara visual. |
| **Buku Pintar** | Ensiklopedia konsep sains untuk belajar mandiri. |
| **Dashboard Guru** | Panel analitik guru untuk melihat rekapitulasi nilai dan miskonsepsi kelas. |
| **Layar Hasil & Prestasi** | Ringkasan akurasi jawaban, petunjuk yang diakses, dan koleksi lencana. |

---

## 🛠️ Arsitektur & Teknologi

- **Frontend Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **AI Core**: `@google/genai` (Google Gemini 3.5 / 3.8 Flash API dengan *Structured JSON Output Schema*)
- **Database & Auth**: [Supabase](https://supabase.com/) (`@supabase/supabase-js`)
- **Backend Service**:
  - **Lokal**: Node.js Express server (`backend/server.js`) dengan middleware CORS & Dotenv.
  - **Cloud/Production**: Vercel Serverless Functions (`api/chat.js` & `api/health.js`).
- **Styling**: Vanilla CSS (Edu-Glassmorphism System, Google Fonts *Nunito* & *Plus Jakarta Sans*).
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Audio Effects**: Web Audio API Procedural Synthesizer (tanpa memerlukan file MP3 eksternal).
- **Celebration Effects**: Canvas Confetti.

---

## 📂 Struktur Direktori Proyek

```text
petualanganbelajar/
├── api/                           # Vercel Serverless Functions
│   ├── chat.js                    # Endpoint API AI chat production
│   └── health.js                  # Endpoint health-check serverless
├── backend/                       # Local Express backend server
│   ├── routes/                    # Definisi rute Express
│   ├── services/
│   │   └── gemini.js              # Integrasi Google Gemini Socratic Engine
│   └── server.js                  # Entry point Express local server
├── public/                        # Aset publik statis (favicon, avatar, gambar)
├── src/
│   ├── components/                # Komponen UI modular
│   │   ├── AchievementsView.jsx   # Galeri lencana & prestasi
│   │   ├── BukuPintarView.jsx     # Ensiklopedia materi sains SD
│   │   ├── FoodChainGameView.jsx  # Minigame rantai makanan interaktif
│   │   ├── TeacherDashboardView.jsx # Dashboard pemantauan guru
│   │   ├── ChatMessageList.jsx    # Balon chat & typing indicator
│   │   ├── ChatTextInput.jsx      # Input jawaban terbuka siswa
│   │   ├── LandingHero.jsx        # Bagian hero landing page
│   │   ├── SplashScreen.jsx       # Layar pembuka & input nama siswa
│   │   └── ...
│   ├── data/                      # Data misi, badges, & pohon keputusan
│   │   ├── badgesData.js          # Definisi lencana gamifikasi
│   │   ├── missions.js            # Metadata misi ekosistem
│   │   └── decisionTreeSawah.js   # Master decision tree alur Socratic
│   ├── engine/                    # Engine audio & controller percakapan
│   ├── services/                  # API client & konektor Supabase
│   │   ├── api.js                 # HTTP fetch client ke backend
│   │   └── supabase.js            # Supabase database client
│   ├── App.jsx                    # State root & screen navigator
│   ├── index.css                  # Desain sistem responsif edukasi anak
│   └── main.jsx                   # Entry point aplikasi React
├── .env.example                   # Contoh konfigurasi variabel lingkungan
├── package.json                   # Daftar dependensi & npm scripts
├── vercel.json                    # Konfigurasi deployment Vercel
└── vite.config.js                 # Konfigurasi bundler Vite
```

---

## 💻 Panduan Menjalankan Secara Lokal

### 1. Prasyarat
- [Node.js](https://nodejs.org/) versi 18 atau lebih baru.
- Akun [Google AI Studio](https://aistudio.google.com/) untuk mendapatkan `GEMINI_API_KEY`.
- (Opsional) Akun [Supabase](https://supabase.com/) jika ingin mengaktifkan sinkronisasi database guru.

### 2. Clone Repository
```bash
git clone https://github.com/adamnbm/petualanganbelajar.git
cd petualanganbelajar
```

### 3. Install Dependensi
```bash
npm install
```

### 4. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Isi variabel berikut di dalam file `.env`:
```env
PORT=3001
GEMINI_API_KEY=masukkan_api_key_gemini_anda
GEMINI_MODEL=gemini-3.5-flash-lite

VITE_SUPABASE_URL=masukkan_url_supabase_anda
VITE_SUPABASE_ANON_KEY=masukkan_anon_key_supabase_anda
```

### 5. Jalankan Aplikasi
Jalankan frontend dan backend secara bersamaan:
```bash
npm run dev
```

Aplikasi dapat diakses melalui peramban di:
- **Frontend**: [http://localhost:5173/](http://localhost:5173/)
- **Backend API**: `http://localhost:3001/api/chat`

---

## 👥 Kontributor & Pengembang

Dikembangkan dengan dedikasi untuk media pembelajaran interaktif anak sekolah dasar:
- **adamnbm** ([@adamnbm](https://github.com/adamnbm))
- **Azril Rojaan Fauzi** ([@Azril-Rojaan-Fauzi](https://github.com/Azril-Rojaan-Fauzi))

---

## 📄 Lisensi
Proyek ini dibuat untuk keperluan akademik dan pengembangan media pembelajaran interaktif.
