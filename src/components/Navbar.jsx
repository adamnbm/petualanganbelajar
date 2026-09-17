import React, { useState } from "react";
import { Volume2, VolumeX, Compass, Sparkles, Map, RefreshCw } from "lucide-react";
import { soundManager } from "../engine/audioEffects";
import { storage } from "../utils/storage";

export default function Navbar({ currentView, onNavigate, onOpenTreeModal }) {
  const [isMuted, setIsMuted] = useState(soundManager.isMuted());

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const handleResetData = () => {
    if (window.confirm("Apakah kamu yakin ingin mereset seluruh progres belajar untuk memulai petualangan baru?")) {
      storage.resetAllProgress();
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
          <button
            className={`nav-pill-btn ${currentView === "landing" ? "active" : ""}`}
            onClick={() => onNavigate("landing")}
          >
            <Sparkles size={16} />
            <span>Beranda</span>
          </button>

          <button
            className={`nav-pill-btn ${currentView === "missions" ? "active" : ""}`}
            onClick={() => onNavigate("missions")}
          >
            <Compass size={16} />
            <span>Misi Belajar</span>
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
