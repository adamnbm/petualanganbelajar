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
  Zap,
  ShieldAlert
} from "lucide-react";
import { getStudentAchievements, getCodexCardsStatus } from "../utils/sokrabotProgress";

export default function MainMenu({
  activeStudent,
  onNavigate,
  onOpenTeacherDashboard,
  onSwitchStudent
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
          <div className="detective-tag">
            <span className="detective-badge-dot"></span>
            <span>Detektif IPAS Fase C Terdaftar</span>
          </div>
          <h1 className="menu-hero-greeting">
            Halo, Detektif <span className="highlight-name">{studentName}</span>! 🌾
          </h1>
          <p className="menu-hero-sub">
            Sawah Pak Budi sedang menunggumu! SOKRABOT siap memandu penalaranmu untuk mengungkap misteri jaring makanan dan mengembalikan keseimbangan alam.
          </p>

          {/* Quick Stats Pill */}
          <div className="menu-stats-bar">
            <div className="menu-stat-item">
              <span className="stat-emoji">⭐</span>
              <div className="stat-text">
                <span className="stat-value">{achievements.totalStars} / {achievements.maxStars}</span>
                <span className="stat-label">Bintang Diraih</span>
              </div>
            </div>

            <div className="menu-stat-divider"></div>

            <div className="menu-stat-item">
              <span className="stat-emoji">🏅</span>
              <div className="stat-text">
                <span className="stat-value">{unlockedBadgeCount} / {achievements.allBadges.length}</span>
                <span className="stat-label">Lencana Terbuka</span>
              </div>
            </div>

            <div className="menu-stat-divider"></div>

            <div className="menu-stat-item">
              <span className="stat-emoji">📖</span>
              <div className="stat-text">
                <span className="stat-value">{unlockedCodexCount} / {codexCards.length}</span>
                <span className="stat-label">Kartu Sains</span>
              </div>
            </div>
          </div>
        </div>

        <div className="menu-hero-right">
          <div className="mascot-circle-frame">
            <img
              src="/sokrabot_mascot.jpg"
              alt="SOKRABOT Mascot"
              className="menu-mascot-img"
            />
            <div className="mascot-speech-bubble">
              "Siap menalar bersamaku hari ini, Detektif {studentName}? 🔍"
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pintu Utama Navigasi (Sitemap PRD Section 3) */}
      <section className="menu-grid-section">
        <h2 className="section-title-sitemap">
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
                Jelajahi 5 level misi bertingkat (Level Lock 1-5). Selesaikan tantangan Socratic dan kumpulkan bintang maksimal!
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
              {unlockedCodexCount > 0 ? `${unlockedCodexCount} Terbuka` : "Semua Terkunci"}
            </div>
            <div className="card-icon-circle bg-amber">
              <BookOpen size={32} className="text-white" />
            </div>
            <div className="card-text-wrapper">
              <h3 className="card-nav-title">Buku Pintar (Codex)</h3>
              <p className="card-nav-desc">
                Koleksi kartu konsep ilmiah interaktif. Kartu akan terbuka otomatis setelah percakapan Socratic selesai!
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
              {unlockedBadgeCount > 0 ? `${unlockedBadgeCount} Lencana` : "4 Lencana Tersedia"}
            </div>
            <div className="card-icon-circle bg-orange">
              <Award size={32} className="text-white" />
            </div>
            <div className="card-text-wrapper">
              <h3 className="card-nav-title">Pencapaianku</h3>
              <p className="card-nav-desc">
                Lihat koleksi Bintang Emas, 4 Lencana Kehormatan Sawah, dan riwayat investigasi remediasi miskonsepsi.
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
                Pahami cara menalar bersama SOKRABOT, aturan bintang, dan trik menggunakan petunjuk bertingkat H1-H3.
              </p>
            </div>
            <div className="card-footer-action">
              <span className="action-label">Baca Petunjuk</span>
              <ChevronRight size={20} className="action-arrow" />
            </div>
          </div>
        </div>
      </section>

      {/* Baris Kontrol Bawah: Dashboard Guru & Ganti Siswa */}
      <section className="menu-auxiliary-bar">
        <div className="aux-student-info">
          <span>Detektif Aktif: <strong>{studentName}</strong> ({className})</span>
          <button
            onClick={onSwitchStudent}
            className="btn-aux-switch"
            title="Ganti nama atau profil siswa"
          >
            <RotateCcw size={15} />
            <span>Ganti Siswa</span>
          </button>
        </div>

        <button
          onClick={onOpenTeacherDashboard}
          className="btn-aux-teacher"
          id="btn-open-teacher-dashboard"
        >
          <GraduationCap size={18} />
          <span>Portal Evaluasi Guru</span>
        </button>
      </section>
    </div>
  );
}
