import React from "react";
import {
  MapPin,
  BookOpen,
  Award,
  HelpCircle,
  Sparkles,
  ChevronRight,
  GraduationCap,
  RotateCcw,
  LogOut,
  Zap,
  ShieldAlert,
  Mail,
  Gamepad2,
} from "lucide-react";
import {
  getStudentAchievements,
  getCodexCardsStatus,
} from "../utils/sokrabotProgress";
import VideoTutorialSection from "./VideoTutorialSection";

export default function MainMenu({
  activeStudent,
  onNavigate,
  onOpenTeacherDashboard,
  onSwitchStudent,
  onOpenDeveloperInfo,
  onOpenContactUs,
}) {
  const achievements = getStudentAchievements();
  const codexCards = getCodexCardsStatus();
  const unlockedCodexCount = codexCards.filter((c) => c.isUnlocked).length;
  const unlockedBadgeCount = achievements.unlockedBadges.length;

  const studentName = activeStudent ? activeStudent.name : "Detektif Cilik";
  const className = activeStudent ? activeStudent.className : "Kelas 5 SD";

  return (
    <div className="main-menu-container">
      {/* Hero Banner Sambutan Detektif */}
      <section className="menu-hero-card">
        <div className="menu-hero-left">
          <h1 className="menu-hero-greeting">
            <span className="greeting-title-line">Halo, Detektif</span>{" "}
            <span className="greeting-name-line">
              <span className="highlight-name">{studentName}</span>
              {" !"}
              <span className="hero-rice-icon" title="Padi Sawah">
                <svg width="28" height="34" viewBox="0 0 28 34" fill="none">
                  {/* Stems */}
                  <path
                    d="M9 30V15C9 12 11 10 14 10"
                    stroke="#48bb78"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15 30V6C15 4 16 3 19 3"
                    stroke="#48bb78"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6 25C6 22 7 20 9 20"
                    stroke="#48bb78"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M21 25C21 22 20 20 18 20"
                    stroke="#48bb78"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Rice grains */}
                  <path
                    d="M15 7C19 7 23 8 23 11C23 13 19 13 15 13"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15 13C20 13 24 14 24 17C24 19 20 19 15 19"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 15C13 15 17 16 17 19C17 21 13 21 9 21"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 21C13 21 17 22 17 24C17 26 13 26 9 26"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>
          </h1>
          <p className="menu-hero-sub">
            Pak Budi sedang kebingungan. Tanaman padi di sawahnya semakin rusak
            dan berkurang. Kira-kira apa penyebabnya, ya? Ayo bantu SOKRABOT
            mencari petunjuk, menyelidiki hubungan antar makhluk hidup di sawah,
            dan menemukan jawaban dari misteri ini!
            <br />
            <span className="start-penyelidikan">Ayo mulai penyelidikan!</span>
          </p>

          {/* Quick Stats Pill */}
          <div className="menu-stats-bar">
            <div className="menu-stat-item">
              <span className="stat-emoji">⭐</span>
              <div className="stat-text">
                <span className="stat-value">
                  {achievements.totalStars} / {achievements.maxStars}
                </span>
                <span className="stat-label">Bintang Diraih</span>
              </div>
            </div>

            <div className="menu-stat-divider"></div>

            <div className="menu-stat-item">
              <span className="stat-emoji">🏅</span>
              <div className="stat-text">
                <span className="stat-value">
                  {unlockedBadgeCount} / {achievements.allBadges.length}
                </span>
                <span className="stat-label">Lencana Terbuka</span>
              </div>
            </div>

            <div className="menu-stat-divider"></div>

            <div className="menu-stat-item">
              <span className="stat-emoji">📖</span>
              <div className="stat-text">
                <span className="stat-value">
                  {unlockedCodexCount} / {codexCards.length}
                </span>
                <span className="stat-label">Kartu Sains</span>
              </div>
            </div>
          </div>
        </div>

        <div className="menu-hero-right">
          {/* Organic SVG wave divider with top mint petal */}
          <svg
            className="hero-wave-divider"
            viewBox="0 0 100 284"
            preserveAspectRatio="none"
          >
            {/* Top mint accent petal */}
            <path
              d="M 0,0 C 25,0 55,8 55,24 C 55,40 32,54 22,62 C 16,52 24,30 12,20 Z"
              fill="#a7f3d0"
              opacity="0.8"
            />
            {/* Main card background organic wave cut */}
            <path
              d="M 18,0 C 28,12 36,22 34,34 C 31,48 18,60 18,78 C 18,105 25,130 25,155 C 25,180 19,200 20,220 C 22,240 40,260 90,284 L 0,284 L 0,0 Z"
              fill="#f6faf6"
            />
          </svg>

          {/* Speech bubble di atas kepala SOKRABOT */}
          {/* <div className="sokrabot-speech-bubble">
            <span>Ayo berpetualang bersama!</span>
          </div> */}

          <img
            src="/hero_pakbudi.png?v=panorama"
            alt="Pak Budi dan SOKRABOT Petualang Sawah"
            onError={(e) => {
              e.currentTarget.src = "/hero_robot.png?v=panorama";
            }}
            className="menu-hero-image"
          />
        </div>
      </section>

      {/* 4 Pintu Utama Navigasi (Sitemap PRD Section 3) */}
      <section className="menu-grid-section">
        <h2 className="section-title-sitemap">
          <span className="section-title-leaf">🍃</span>
          <span>Pusat Komando Investigasi SOKRABOT</span>
        </h2>

        <div className="menu-cards-grid">
          {/* 1. PETA MISI */}
          <div
            className="menu-nav-card card-peta-misi"
            onClick={() => onNavigate("map")}
            role="button"
            tabIndex={0}
            id="menu-btn-peta-misi"
          >
            <div className="card-badge-top">5 Pos Pembelajaran</div>
            <div className="card-icon-circle bg-emerald">
              <MapPin size={32} className="text-white" />
            </div>
            <div className="card-text-wrapper">
              <h3 className="card-nav-title">Peta Misi Sawah</h3>
              <p className="card-nav-desc">
                <span className="desc-mobile show-on-mobile-only">
                  Jelajahi peta interaktif untuk menemukan lokasi misi dan
                  informasi penting di sekitar sawah.
                </span>
                <span className="desc-desktop hide-on-mobile">
                  Jelajahi 5 level misi bertingkat (Level Lock 1-5). Selesaikan
                  tantangan Socratic dan kumpulkan bintang maksimal!
                </span>
              </p>
            </div>
            <div className="card-footer-action">
              <span className="action-label">Buka Peta Misi</span>
              <ChevronRight size={20} className="action-arrow" />
            </div>
          </div>

          {/* 2. BUKU PINTAR (CODEX) */}
          <div
            className="menu-nav-card card-buku-pintar"
            onClick={() => onNavigate("codex")}
            role="button"
            tabIndex={0}
            id="menu-btn-buku-pintar"
          >
            <div className="card-badge-top">
              {unlockedCodexCount > 0
                ? `${unlockedCodexCount} Terbuka`
                : "Semua Terkunci"}
            </div>
            <div className="card-icon-circle bg-amber">
              <BookOpen size={32} className="text-white" />
            </div>
            <div className="card-text-wrapper">
              <h3 className="card-nav-title">Buku Pintar</h3>
              <p className="card-nav-desc">
                <span className="desc-mobile show-on-mobile-only">
                  Kumpulkan pengetahuan tentang jaring makanan, makhluk hidup,
                  dan keseimbangan ekosistem.
                </span>
                <span className="desc-desktop hide-on-mobile">
                  Koleksi kartu konsep ilmiah interaktif. Kartu akan terbuka
                  otomatis setelah percakapan Socratic selesai!
                </span>
              </p>
            </div>
            <div className="card-footer-action">
              <span className="action-label">Baca Buku Pintar</span>
              <ChevronRight size={20} className="action-arrow" />
            </div>
          </div>

          {/* 3. PENCAPAIANKU */}
          <div
            className="menu-nav-card card-pencapaian"
            onClick={() => onNavigate("achievements")}
            role="button"
            tabIndex={0}
            id="menu-btn-pencapaianku"
          >
            <div className="card-badge-top">
              {unlockedBadgeCount > 0
                ? `${unlockedBadgeCount} Lencana`
                : "5 Lencana Tersedia"}
            </div>
            <div className="card-icon-circle bg-orange">
              <Award size={32} className="text-white" />
            </div>
            <div className="card-text-wrapper">
              <h3 className="card-nav-title">Pencapaianku</h3>
              <p className="card-nav-desc">
                Lihat koleksi Bintang Emas, 5 Lencana Kehormatan Sawah, dan
                riwayat investigasi remediasi miskonsepsi.
              </p>
            </div>
            <div className="card-footer-action">
              <span className="action-label">Lihat Pencapaian</span>
              <ChevronRight size={20} className="action-arrow" />
            </div>
          </div>

          {/* 4. PETUNJUK BERMAIN */}
          <div
            className="menu-nav-card card-petunjuk"
            onClick={() => onNavigate("guide")}
            role="button"
            tabIndex={0}
            id="menu-btn-petunjuk"
          >
            <div className="card-badge-top">Panduan Lengkap</div>
            <div className="card-icon-circle bg-teal">
              <HelpCircle size={32} className="text-white" />
            </div>
            <div className="card-text-wrapper">
              <h3 className="card-nav-title">Petunjuk Bermain</h3>
              <p className="card-nav-desc">
                Pahami cara menalar bersama SOKRABOT, aturan bintang, dan trik
                menggunakan petunjuk bertingkat H1-H3.
              </p>
            </div>
            <div className="card-footer-action">
              <span className="action-label">Baca Petunjuk</span>
              <ChevronRight size={20} className="action-arrow" />
            </div>
          </div>

          {/* 5. MINIGAME: ARENA RANTAI MAKANAN */}
          <div
            className="menu-nav-card card-minigame"
            onClick={() => onNavigate("game")}
            role="button"
            tabIndex={0}
            id="menu-btn-minigame"
            style={{
              position: "relative",
              borderColor: "#f59e0b"
            }}
          >

            <div className="card-icon-circle" style={{ background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" }}>
              <Gamepad2 size={32} className="text-white" />
            </div>
            <div className="card-text-wrapper">
              <h3 className="card-nav-title">Arena Rantai Makanan</h3>
              <p className="card-nav-desc">
                Uji kemampuan menalarmu menyusun urutan organisme dan melacak arah panah aliran energi ekosistem sawah!
              </p>
            </div>
            <div className="card-footer-action">
              <span className="action-label" style={{ color: "#d97706", fontWeight: "800" }}>Mainkan Game</span>
              <ChevronRight size={20} className="action-arrow" style={{ color: "#d97706" }} />
            </div>
          </div>
        </div>
      </section>

      {/* 2 Video Panduan Penggunaan Web (Bisa Ditonton Langsung di Chrome) */}
      <VideoTutorialSection />

      {/* Baris Kontrol Bawah: Dashboard Guru & Ganti Siswa */}
      <section className="menu-auxiliary-bar">
        <div className="aux-student-info">
          <span>
            Detektif Aktif: <strong>{studentName}</strong> ({className})
          </span>
          {/* <button
            onClick={() => onNavigate("splash")}
            className="btn-aux-switch"
            title="Keluar ke layar awal untuk ganti siswa"
            id="btn-aux-logout-splash"
          >
            <LogOut size={15} />
            <span>Keluar / Ganti Siswa</span>
          </button> */}
        </div>

        <div className="aux-action-buttons-group">
          <button
            onClick={onOpenContactUs}
            className="btn-aux-teacher"
            style={{
              background: "#F1F8E9",
              color: "#1B5E20",
              border: "1.5px solid #A5D6A7",
              boxShadow: "0 2px 6px rgba(46, 125, 50, 0.08)",
              cursor: "pointer",
              fontWeight: 700,
            }}
            id="btn-menu-contact-us"
            title="Hubungi Kami"
          >
            <Mail size={18} color="#2E7D32" />
            <span>Hubungi Kami</span>
          </button>

          <button
            onClick={onOpenDeveloperInfo}
            className="btn-aux-teacher"
            style={{
              background: "#F1F8E9",
              color: "#1B5E20",
              border: "1.5px solid #A5D6A7",
              boxShadow: "0 2px 6px rgba(46, 125, 50, 0.08)",
              cursor: "pointer",
              fontWeight: 700,
            }}
            id="btn-menu-dev-info"
            title="Tim Pengembang"
          >
            <GraduationCap size={18} color="#2E7D32" />
            <span>Tim Pengembang</span>
          </button>
        </div>

        {/* <button
          onClick={onOpenTeacherDashboard}
          className="btn-aux-teacher"
          id="btn-open-teacher-dashboard"
        >
          <GraduationCap size={18} />
          <span>Portal Evaluasi Guru</span>
        </button> */}
      </section>
    </div>
  );
}
