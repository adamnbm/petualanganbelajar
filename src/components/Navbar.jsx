import React, { useState } from "react";
import { Volume2, VolumeX, Map, RefreshCw, Users, UserCheck } from "lucide-react";
import { soundManager } from "../engine/audioEffects";
import { storage } from "../utils/storage";
import { studentSession } from "../utils/studentSession";

export default function Navbar({
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
        {/* Logo & Brand - klik ke Landing */}
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
          {/* Profil Siswa */}
          <button
            className="nav-pill-btn navbar-profile-btn"
            style={{
              background: activeStudent ? "#ecfdf5" : "#f1f5f9",
              borderColor: activeStudent ? "#a7f3d0" : "#cbd5e1",
              color: activeStudent ? "#065f46" : "#475569"
            }}
            onClick={onOpenStudentModal}
            title={activeStudent ? `Profil: ${activeStudent.name}` : "Isi Profil Siswa"}
            id="btn-profile-siswa"
          >
            {activeStudent ? <UserCheck size={16} color="#059669" /> : <Users size={16} />}
            <span className="profile-name-label">
              {activeStudent ? activeStudent.name : "Profil Siswa"}
            </span>
          </button>

          {/* Dashboard Guru */}
          <button
            className="nav-pill-btn"
            onClick={onOpenTeacherDashboard}
            title="Buka Dashboard Guru"
            id="btn-dashboard-guru"
          >
            <span style={{ fontSize: "1rem", lineHeight: 1 }}>👨‍🏫</span>
            <span className="navbar-label">Guru</span>
          </button>

          {/* Peta Decision Tree - Sembunyikan di mobile */}
          <button
            className="nav-pill-btn hide-on-mobile"
            onClick={onOpenTreeModal}
            title="Lihat Peta Pohon Percakapan"
            id="btn-tree-map"
          >
            <Map size={16} />
            <span>Peta</span>
          </button>

          {/* Suara */}
          <button
            className="nav-icon-btn"
            onClick={handleToggleSound}
            title={isMuted ? "Aktifkan Efek Suara" : "Bisukan Suara"}
            id="btn-toggle-sound"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          {/* Reset */}
          <button
            className="nav-icon-btn hide-on-mobile"
            onClick={handleResetData}
            title="Reset Seluruh Progres"
            id="btn-reset-progress"
          >
            <RefreshCw size={16} />
          </button>
        </nav>
      </div>
    </header>
  );
}
