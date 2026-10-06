import React, { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, User, School, BookOpen } from "lucide-react";
import { studentSession } from "../utils/studentSession";

export default function SplashScreen({ onStartAdventure }) {
  const existing = studentSession.getActiveStudent();
  const [name, setName] = useState(existing?.name || "");
  const [className, setClassName] = useState(existing?.className || "Kelas 5");
  const [studentNumber, setStudentNumber] = useState(existing?.studentNumber || "");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Yuk tuliskan nama panggilanmu terlebih dahulu, Detektif!");
      return;
    }

    const saved = studentSession.setActiveStudent({
      name: name.trim(),
      className: className.trim(),
      studentNumber: studentNumber.trim() || "-"
    });

    if (onStartAdventure) {
      onStartAdventure(saved);
    }
  };

  return (
    <div className="splash-container">
      <div className="splash-card">
        {/* Header Mascot & Badge */}
        <div className="splash-mascot-wrapper">
          <div className="splash-mascot-glow"></div>
          <img
            src="/sokrabot_mascot.png"
            alt="Maskot Sokrabot"
            className="splash-mascot-img"
          />
          <div className="splash-badge-pill">
            <Sparkles size={16} className="text-yellow-300" />
            <span>Tutor Socratic IPAS SD Fase C</span>
          </div>
        </div>

        {/* Title */}
        <div className="splash-header-text">
          <h1 className="splash-main-title">
            SOKRABOT 🌾
          </h1>
          <h2 className="splash-sub-title">
            Petualangan Rantai Makanan Sawah
          </h2>
          <p className="splash-description">
            Selamat datang, calon Detektif Ekosistem! Bersama <strong>SOKRABOT</strong>, kita akan memecahkan misteri rantai makanan, melacak aliran energi, dan menyelamatkan sawah Pak Budi dari kepunahan!
          </p>
        </div>

        {/* Form Input Siswa */}
        <form onSubmit={handleSubmit} className="splash-form">
          <div className="form-group-custom">
            <label htmlFor="detective-name" className="form-label-custom">
              <User size={18} className="form-icon" />
              <span>Nama Lengkap / Panggilan Detektif</span>
            </label>
            <input
              id="detective-name"
              type="text"
              className="form-input-custom"
              placeholder="Contoh: Citra, Budi, atau Adam..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              autoFocus
              maxLength={40}
            />
            {errorMsg && <p className="form-error-text">{errorMsg}</p>}
          </div>

          <div className="form-row-custom">
            <div className="form-group-custom flex-1">
              <label htmlFor="detective-class" className="form-label-custom">
                <School size={18} className="form-icon" />
                <span>Tingkat Kelas (Fase C)</span>
              </label>
              <select
                id="detective-class"
                className="form-select-custom"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              >
                <option value="Kelas 5 SD">Kelas 5 SD</option>
                <option value="Kelas 6 SD">Kelas 6 SD</option>
                <option value="Kelas 4 SD">Kelas 4 SD</option>
              </select>
            </div>

            <div className="form-group-custom flex-1">
              <label htmlFor="detective-number" className="form-label-custom">
                <BookOpen size={18} className="form-icon" />
                <span>Nomor Absen (Opsional)</span>
              </label>
              <input
                id="detective-number"
                type="text"
                className="form-input-custom"
                placeholder="Contoh: 12"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
                maxLength={10}
              />
            </div>
          </div>

          {/* Action CTA Button >= 48px touch target */}
          <button
            type="submit"
            className="btn-splash-cta"
            id="btn-start-adventure"
          >
            <span>Masuk Markas Detektif SOKRABOT</span>
            <ArrowRight size={22} className="btn-icon-right" />
          </button>
        </form>

        {/* Feature Highlights */}
        <div className="splash-features-grid">
          <div className="splash-feature-item">
            <span className="feature-icon">🔍</span>
            <div className="feature-content">
              <strong>Penalaran Socratic</strong>
              <small>Dibimbing menalar bertahap tanpa jawaban instan</small>
            </div>
          </div>
          <div className="splash-feature-item">
            <span className="feature-icon">⭐</span>
            <div className="feature-content">
              <strong>Bintang & Lencana</strong>
              <small>Raih 3 bintang & kumpulkan 4 lencana prestisius</small>
            </div>
          </div>
          <div className="splash-feature-item">
            <span className="feature-icon">📖</span>
            <div className="feature-content">
              <strong>Buku Pintar Sains</strong>
              <small>Buka 6 kartu konsep ilmiah ekosistem sawah</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
