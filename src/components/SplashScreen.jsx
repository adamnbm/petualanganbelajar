import React, { useState } from "react";
import { Sparkles, ArrowRight, User, School, Hash, GraduationCap, ChevronDown, X, Play, Video } from "lucide-react";
import { studentSession } from "../utils/studentSession";
import { TUTORIAL_VIDEOS, getYouTubeEmbedUrl } from "../data/tutorialVideos";

export default function SplashScreen({ onStartAdventure, onOpenTeacherDashboard, onOpenDeveloperInfo }) {
  const existing = studentSession.getActiveStudent();
  const [name, setName] = useState(existing?.name || "");
  const [className, setClassName] = useState(existing?.className || "Kelas 5");
  const [studentNumber, setStudentNumber] = useState(existing?.studentNumber || "");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeVideoModal, setActiveVideoModal] = useState(null); // 'video_siswa' | 'video_guru' | null

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

  const currentVideo = TUTORIAL_VIDEOS.find((v) => v.id === activeVideoModal) || TUTORIAL_VIDEOS[1] || TUTORIAL_VIDEOS[0];
  const embedUrl = currentVideo ? getYouTubeEmbedUrl(currentVideo.youtubeUrl) : "";

  return (
    <div className="splash-container splash-v2 splash-entered">
      {/* Background Gradient */}
      <div className="splash-bg-gradient" aria-hidden="true" />

      {/* Main Glass Card */}
      <div className="splash-card splash-card-v2">

        {/* 1. Header Bar: Identitas UPI (Kiri) & Tombol Video Panduan (Kanan) */}
        <div className="splash-card-topbar">
          <div
            className="splash-upi-brand"
            title="Universitas Pendidikan Indonesia - Kampus Cibiru"
            aria-label="Universitas Pendidikan Indonesia Kampus Cibiru"
          >
            <img
              src="/logo-upi-cibiru.png"
              alt="Logo Universitas Pendidikan Indonesia Kampus Cibiru"
              className="splash-upi-top-logo"
            />
          </div>
          <button
            type="button"
            className="splash-subtle-link"
            onClick={onOpenDeveloperInfo}
            title="Tim Pengembang UPI Kampus Cibiru"
            id="btn-splash-dev-info"
          >
            <Sparkles size={14} />
            <span>Tim Pengembang</span>
          </button>
          {/* <button
            type="button"
            className="btn-splash-guide-top"
            onClick={() => setActiveVideoModal("video_siswa")}
            title="Tonton Video Tutorial Web"
            id="btn-splash-tutorial"
          >
            <Play size={13} fill="currentColor" />
            <span>Video Panduan</span>
          </button> */}
        </div>

        {/* 2. Hero Section: Maskot Sokrabot Terpusat & Judul */}
        <div className="splash-hero-section">
          <div className="splash-mascot-wrapper splash-mascot-v2">
            <div className="splash-mascot-frame" title="Maskot Sokrabot">
              <img
                src="/sokrabot_mascot.png"
                alt="Maskot Sokrabot"
                className="splash-mascot-img splash-mascot-img-v2"
              />
            </div>
          </div>

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
          </div>
        </div>

        {/* 3. Form Section: Data Siswa */}
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
                  placeholder="Contoh: 12"
                  value={studentNumber}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/[^0-9]/g, "");
                    setStudentNumber(digits);
                  }}
                  maxLength={3}
                  title="Nomor absen siswa"
                />
              </div>
            </div>
          </div>

          {/* Satu-satunya Tombol Utama (Primary CTA) */}
          <button
            type="submit"
            className="btn-splash-cta btn-cta-v2"
            id="btn-start-adventure"
          >
            <span className="btn-cta-label">Masuk Markas Detektif</span>
            <ArrowRight size={20} className="btn-icon-right" />
          </button>
        </form>
        <button
          type="button"
          className="btn-splash-guide-top"
          onClick={() => setActiveVideoModal("video_siswa")}
          title="Tonton Video Tutorial Web"
          id="btn-splash-tutorial"
        >
          <Play size={13} fill="currentColor" />
          <span>Video Panduan</span>
        </button>

        {/* 4. Link Pendukung: Portal Guru & Tim Pengembang (Minimalis & Elegan) */}
        <div className="splash-footer-links">
          <button
            type="button"
            className="splash-subtle-link"
            onClick={onOpenTeacherDashboard}
            title="Buka Portal Evaluasi Guru"
            id="btn-dashboard-guru"
          >
            <GraduationCap size={15} />
            <span>Portal Guru</span>
          </button>

          {/* <span className="splash-footer-sep" aria-hidden="true">•</span> */}

          {/* <button
            type="button"
            className="splash-subtle-link"
            onClick={onOpenDeveloperInfo}
            title="Tim Pengembang UPI Kampus Cibiru"
            id="btn-splash-dev-info"
          >
            <Sparkles size={14} />
            <span>Tim Pengembang</span>
          </button> */}
        </div>

      </div>

      {/* =========================================================================
          MODAL VIDEO TUTORIAL SOKRABOT (RESPONSIF MOBILE & DESKTOP)
          ========================================================================= */}
      {activeVideoModal && (
        <div
          className="splash-video-modal-backdrop"
          onClick={() => setActiveVideoModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Modal Video Tutorial Penggunaan SOKRABOT"
        >
          <div
            className="splash-video-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="splash-video-modal-header">
              <div className="splash-video-header-left">
                <div className="splash-video-icon-badge" aria-hidden="true">🎬</div>
                <div>
                  <h3 className="splash-video-modal-title">Video Tutorial Penggunaan</h3>
                  <p className="splash-video-modal-subtitle">
                    Panduan praktis menggunakan media pembelajaran SOKRABOT
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="btn-splash-video-close"
                onClick={() => setActiveVideoModal(null)}
                title="Tutup Video"
                aria-label="Tutup video tutorial"
                id="btn-close-splash-video-modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tab Video Siswa & Guru */}
            <div className="splash-video-tab-switch">
              {TUTORIAL_VIDEOS.map((video) => {
                const isSelected = activeVideoModal === video.id;
                const isGuru = video.id === "video_guru";
                return (
                  <button
                    key={video.id}
                    type="button"
                    className={`splash-video-tab-pill ${isSelected ? "active" : ""}`}
                    onClick={() => setActiveVideoModal(video.id)}
                    id={`btn-tab-video-${video.id}`}
                  >
                    <span>{isGuru ? "🎓 Panduan Guru" : "🎒 Panduan Siswa"}</span>
                  </button>
                );
              })}
            </div>

            {/* Frame Video 16:9 YouTube */}
            <div className="splash-video-screen-frame">
              {embedUrl ? (
                <iframe
                  className="splash-video-iframe-player"
                  src={embedUrl}
                  title={currentVideo?.title || "Video Tutorial SOKRABOT"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <div className="splash-video-empty-state">
                  <Video size={36} />
                  <p>Video sedang disiapkan. Silakan coba beberapa saat lagi.</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="splash-video-modal-footer">
              <button
                type="button"
                className="btn-splash-video-done-action"
                onClick={() => setActiveVideoModal(null)}
              >
                Tutup & Mulai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
