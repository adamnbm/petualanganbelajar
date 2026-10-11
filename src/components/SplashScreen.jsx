import React, { useState } from "react";
import { Sparkles, ArrowRight, User, School, Hash, GraduationCap, Search, Star, Leaf, ChevronDown, X } from "lucide-react";
import { studentSession } from "../utils/studentSession";

export default function SplashScreen({ onStartAdventure, onOpenTeacherDashboard, onOpenDeveloperInfo }) {
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
    <div className="splash-container splash-v2 splash-entered">
      {/* Background */}
      <div className="splash-bg-gradient" aria-hidden="true" />

      {/* Main Glass Card */}
      <div className="splash-card splash-card-v2">

        {/* Hero Section */}
        <div className="splash-hero-section">
          {/* Mascot */}
          <div className="splash-mascot-wrapper splash-mascot-v2">
            <div className="splash-mascot-frame">
              <img
                src="/sokrabot_mascot.png"
                alt="Maskot Sokrabot"
                className="splash-mascot-img splash-mascot-img-v2"
              />
            </div>
          </div>

          {/* Title Group */}
          <div className="splash-header-text splash-header-v2">
            <div className="splash-title-row">
              <h1 className="splash-main-title splash-title-v2">
                SOKRABOT
              </h1>
              <span className="splash-title-emoji" aria-hidden="true">🌾</span>
            </div>
            <h2 className="splash-sub-title splash-subtitle-v2">
              Petualangan Rantai Makanan Sawah
            </h2>
            <p className="splash-description splash-desc-v2">
              Selamat datang, calon <strong>Detektif Ekosistem</strong>! Bersama <strong>SOKRABOT</strong>, kita akan memecahkan misteri rantai makanan, melacak aliran energi, dan menyelamatkan sawah Pak Budi!
            </p>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="splash-form splash-form-v2">
          <div className="splash-form-card">
            <div className="form-group-custom">
              <label htmlFor="detective-name" className="form-label-custom form-label-v2">
                <div className="form-label-icon-wrap">
                  <User size={15} />
                </div>
                <span>Nama Detektif</span>
              </label>
              <div className="input-with-clear">
                <input
                  id="detective-name"
                  type="text"
                  className="form-input-custom form-input-v2"
                  placeholder="Contoh: Dafa, Aisyah..."
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  autoFocus
                  maxLength={40}
                  autoComplete="off"
                  autoCorrect="off"
                />
                {name && (
                  <button
                    type="button"
                    className="btn-input-clear"
                    onClick={() => setName("")}
                    title="Hapus nama"
                    tabIndex={-1}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              {errorMsg && <p className="form-error-text form-error-v2">{errorMsg}</p>}
            </div>

            <div className="form-row-v2">
              <div className="form-group-custom form-group-class">
                <label htmlFor="detective-class" className="form-label-custom form-label-v2">
                  <div className="form-label-icon-wrap">
                    <School size={15} />
                  </div>
                  <span>Kelas</span>
                </label>
                <div className="select-wrapper-custom">
                  <select
                    id="detective-class"
                    className="form-select-custom form-select-v2"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                  >
                    <option value="Kelas 5 SD">Kelas 5 SD</option>
                    <option value="Kelas 6 SD">Kelas 6 SD</option>
                    <option value="Kelas 4 SD">Kelas 4 SD</option>
                  </select>
                  <ChevronDown size={16} className="select-chevron-icon" aria-hidden="true" />
                </div>
              </div>

              <div className="form-group-custom form-group-number">
                <label htmlFor="detective-number" className="form-label-custom form-label-v2">
                  <div className="form-label-icon-wrap">
                    <Hash size={15} />
                  </div>
                  <span>No. Absen</span>
                </label>
                <input
                  id="detective-number"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="form-input-custom form-input-v2 input-student-number"
                  placeholder="Opsional"
                  value={studentNumber}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/[^0-9]/g, "");
                    setStudentNumber(digits);
                  }}
                  maxLength={3}
                  title="Nomor absen siswa (opsional)"
                />
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            type="submit"
            className="btn-splash-cta btn-cta-v2"
            id="btn-start-adventure"
          >
            <span className="btn-cta-label">Masuk Markas Detektif</span>
            <ArrowRight size={20} className="btn-icon-right" />
          </button>
        </form>

        {/* Portal Guru & Info Pengembang */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", margin: "1rem 0 0.5rem" }}>
          <button
            type="button"
            className="nav-pill-btn btn-teacher-portal btn-teacher-v2"
            onClick={onOpenTeacherDashboard}
            title="Buka Portal Evaluasi Guru"
            id="btn-dashboard-guru"
          >
            <GraduationCap size={17} />
            <span className="navbar-label">Masuk sebagai Guru</span>
          </button>

          <button
            type="button"
            className="nav-pill-btn btn-teacher-v2"
            onClick={onOpenDeveloperInfo}
            title="Info Pengembang"
            id="btn-splash-dev-info"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              border: "1.5px solid #A5D6A7",
              color: "#1B5E20",
              cursor: "pointer",
              padding: "0.55rem 1.1rem",
              borderRadius: "50px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontWeight: 700,
              fontSize: "0.85rem",
              boxShadow: "0 2px 8px rgba(46, 125, 50, 0.1)",
              transition: "all 0.2s ease"
            }}
          >
            <Sparkles size={16} color="#2E7D32" />
            <span className="navbar-label">Info Pengembang</span>
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="splash-features-grid splash-features-v2">
          <div className="splash-feature-item splash-feature-v2">
            <div className="feature-icon-wrap feature-icon-green">
              <Search size={18} />
            </div>
            <div className="feature-content">
              <strong>Penalaran Socratic</strong>
              <small>Dibimbing menalar bertahap tanpa jawaban instan</small>
            </div>
          </div>
          <div className="splash-feature-item splash-feature-v2">
            <div className="feature-icon-wrap feature-icon-amber">
              <Star size={18} />
            </div>
            <div className="feature-content">
              <strong>Bintang & Lencana</strong>
              <small>Raih 3 bintang & kumpulkan 4 lencana prestisius</small>
            </div>
          </div>
          <div className="splash-feature-item splash-feature-v2">
            <div className="feature-icon-wrap feature-icon-sky">
              <Leaf size={18} />
            </div>
            <div className="feature-content">
              <strong>Buku Pintar Sains</strong>
              <small>Buka 5 kartu konsep ilmiah ekosistem sawah</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
