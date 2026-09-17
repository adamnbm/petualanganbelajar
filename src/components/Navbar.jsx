import React, { useState } from "react";
import { Volume2, VolumeX, Compass, Sparkles, Map, RefreshCw, Users, UserCheck } from "lucide-react";
import { soundManager } from "../engine/audioEffects";
import { storage } from "../utils/storage";
import { studentSession } from "../utils/studentSession";

export default function Navbar({
  currentView,
  onNavigate,
  onOpenTreeModal,
  onOpenTeacherDashboard,
  onOpenStudentModal
}) {
  const [isMuted, setIsMuted] = useState(soundManager.isMuted());
  const activeStudent = studentSession.getActiveStudent();

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const handleResetData = () => {
    if (window.confirm("Apakah kamu yakin ingin mereset seluruh progres belajar untuk memulai petualangan baru?")) {
      storage.resetAllProgress();
      studentSession.clearActiveStudent();
      window.location.reload();
    }
  };

  return (
    <header className="site-navbar">
      <div className="navbar-inner">
        <button
          className="brand-logo"
          onClick={() => onNavigate("landing")}
          title="Kembali ke Beranda"
        >
          <div className="brand-badge-icon">
            🤖
          </div>
          <div className="brand-text-wrapper">
            <span className="brand-title">
              Timi<span>Belajar</span> 🌱
            </span>
            <span className="brand-subtitle">Chatbot Edukasi Sains SD</span>
          </div>
        </button>

        <nav className="navbar-actions">
          {/* Status Profil Siswa Aktif */}
          <button
            className="nav-pill-btn"
            style={{
              background: activeStudent ? "#ecfdf5" : "#f1f5f9",
              borderColor: activeStudent ? "#a7f3d0" : "#cbd5e1",
              color: activeStudent ? "#065f46" : "#475569"
            }}
            onClick={onOpenStudentModal}
            title={activeStudent ? "Ganti Profil Siswa" : "Isi Profil Siswa"}
          >
            {activeStudent ? <UserCheck size={16} color="#059669" /> : <Users size={16} />}
            <span>{activeStudent ? `${activeStudent.name} (${activeStudent.className})` : "Daftar Siswa"}</span>
          </button>

          <button
            className={`nav-pill-btn ${currentView === "landing" ? "active" : ""}`}
            onClick={() => onNavigate("landing")}
          >
            <Sparkles size={16} />
            <span className="hide-on-mobile">Beranda</span>
          </button>

          <button
            className={`nav-pill-btn ${currentView === "missions" ? "active" : ""}`}
            onClick={() => onNavigate("missions")}
          >
            <Compass size={16} />
            <span>Misi</span>
          </button>

          {/* Tombol Dashboard Guru */}
          <button
            className="nav-pill-btn"
            onClick={onOpenTeacherDashboard}
            title="Buka Dashboard Guru (Rekaman Riwayat & Transkrip Siswa)"
            style={{ background: "#f8fafc", borderColor: "#cbd5e1" }}
          >
            <span style={{ fontSize: "1rem" }}>👨‍🏫</span>
            <span>Dashboard Guru</span>
          </button>

          <button
            className="nav-pill-btn"
            onClick={onOpenTreeModal}
            title="Lihat Peta Pohon Percakapan / Struktur Decision Tree (Guru & Penilai)"
          >
            <Map size={16} />
            <span className="hide-on-mobile">Peta Decision Tree</span>
          </button>

          <button
            className="nav-icon-btn"
            onClick={handleToggleSound}
            title={isMuted ? "Aktifkan Efek Suara" : "Bisukan Suara"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <button
            className="nav-icon-btn"
            onClick={handleResetData}
            title="Reset Seluruh Progres"
          >
            <RefreshCw size={16} />
          </button>
        </nav>
      </div>
    </header>
  );
}
