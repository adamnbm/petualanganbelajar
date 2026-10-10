import React, { useState, useEffect } from "react";
import {
  Volume2,
  VolumeX,
  MapPin,
  BookOpen,
  Award,
  HelpCircle,
  Users,
  UserCheck,
  User,
  Bell,
  LogOut,
  Sparkles,
  Home,
  GraduationCap,
} from "lucide-react";
import { soundManager } from "../engine/audioEffects";
import { studentSession } from "../utils/studentSession";
import { checkServerHealth } from "../services/api";

export default function Navbar({
  currentView,
  onNavigate,
  onOpenTeacherDashboard,
  onOpenStudentModal,
}) {
  const [isMuted, setIsMuted] = useState(soundManager.isMuted());
  const [activeStudent, setActiveStudent] = useState(
    studentSession.getActiveStudent(),
  );
  const [aiStatus, setAiStatus] = useState(null);

  useEffect(() => {
    checkServerHealth().then((status) => {
      setAiStatus(status);
    });
  }, []);

  useEffect(() => {
    const handleStudentChange = () => {
      setActiveStudent(studentSession.getActiveStudent());
    };
    window.addEventListener("timi_student_changed", handleStudentChange);
    return () =>
      window.removeEventListener("timi_student_changed", handleStudentChange);
  }, []);

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const studentName = activeStudent ? activeStudent.name : "Detektif Cilik";

  return (
    <header className="site-navbar">
      <div className="navbar-inner">
        {/* Brand Logo & Name */}
        <button
          className="brand-logo"
          onClick={() => onNavigate("menu")}
          title="Menuju Menu Utama SOKRABOT"
          id="btn-brand-home"
        >
          <div className="brand-mascot-avatar">
            <img
              src="/sokrabot_mascot.png"
              alt="SOKRABOT Logo"
              className="brand-mascot-pic"
            />
          </div>
          <div className="brand-text-wrapper">
            <span className="brand-title">
              SOKRABOT
            </span>
            <span className="brand-subtitle">Petualangan Rantai Makanan</span>
          </div>
        </button>

        {/* Primary Navigation Links (Desktop) */}
        <nav className="navbar-links-group hide-on-mobile">
          <button
            className={`nav-tab-link ${currentView === "menu" ? "active" : ""}`}
            onClick={() => onNavigate("menu")}
            id="nav-link-menu"
          >
            <Home size={16} />
            <span>Menu</span>
          </button>

          <button
            className={`nav-tab-link ${currentView === "map" || currentView === "chat" ? "active" : ""}`}
            onClick={() => onNavigate("map")}
            id="nav-link-map"
          >
            <MapPin size={16} />
            <span>Peta Misi</span>
          </button>

          <button
            className={`nav-tab-link ${currentView === "codex" ? "active" : ""}`}
            onClick={() => onNavigate("codex")}
            id="nav-link-codex"
          >
            <BookOpen size={16} />
            <span>Buku Pintar</span>
          </button>

          <button
            className={`nav-tab-link ${currentView === "achievements" ? "active" : ""}`}
            onClick={() => onNavigate("achievements")}
            id="nav-link-achievements"
          >
            <Award size={16} />
            <span>Pencapaian</span>
          </button>

          <button
            className={`nav-tab-link ${currentView === "guide" ? "active" : ""}`}
            onClick={() => onNavigate("guide")}
            id="nav-link-guide"
          >
            <HelpCircle size={16} />
            <span>Petunjuk</span>
          </button>
        </nav>

        {/* Right Action Icons (Desktop) */}
        <div className="navbar-actions hide-on-mobile">
          {/* Detective Identity Profile */}
          {/* <button
            className="nav-pill-btn navbar-profile-btn"
            onClick={onOpenStudentModal}
            title={
              activeStudent ? `Detektif: ${studentName}` : "Isi Nama Detektif"
            }
            id="btn-profile-siswa"
          >
            <UserCheck size={16} className="text-emerald-700" />
            <span className="profile-name-label">{studentName}</span>
          </button> */}

          {/* Portal Evaluasi Guru */}
          {/* <button
            className="nav-pill-btn btn-teacher-portal"
            onClick={onOpenTeacherDashboard}
            title="Buka Portal Evaluasi Guru"
            id="btn-dashboard-guru"
          >
            <GraduationCap size={17} />
            <span className="navbar-label">Guru</span>
          </button> */}

          {/* Suara */}
          <button
            className="nav-icon-btn"
            onClick={handleToggleSound}
            title={isMuted ? "Aktifkan Efek Suara" : "Bisukan Suara"}
            id="btn-toggle-sound"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          {/* Tombol Keluar / Kembali ke Layar Awal */}
          <button
            className="nav-icon-btn btn-exit-splash"
            onClick={() => onNavigate("splash")}
            title="Kembali ke Layar Awal / Ganti Nama Siswa"
            id="btn-logout-splash"
          >
            <LogOut size={18} />
          </button>
        </div>

        {/* Right Action Icons (Mobile: Bell with Red Dot & Keluar) */}
        <div className="mobile-header-actions show-on-mobile-only">
          <button
            className="mobile-header-icon-btn bell-btn"
            onClick={() => alert("Misi baru siap dijelajahi di Sawah Pak Budi!")}
            title="Pemberitahuan Misi"
            id="mobile-btn-notif"
          >
            <Bell size={19} />
            <span className="mobile-notif-dot" />
          </button>

          <button
            className="mobile-header-icon-btn logout-btn"
            onClick={() => onNavigate("splash")}
            title="Keluar ke Layar Awal / Ganti Siswa"
            id="mobile-btn-logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
