import React, { useState } from "react";
import {
  Lock,
  CheckCircle,
  ArrowLeft,
  ExternalLink,
  X,
  Lightbulb
} from "lucide-react";
import { getCodexCardsStatus } from "../utils/sokrabotProgress";

export default function BukuPintarView({ onBackToMenu, onSelectMission }) {
  const cards = getCodexCardsStatus();
  const unlockedCount = cards.filter((c) => c.isUnlocked).length;
  const [activeModalCard, setActiveModalCard] = useState(null);

  return (
    <div className="codex-view-container">
      {/* Top Bar Navigasi */}
      <div className="codex-top-bar">
        <button onClick={onBackToMenu} className="btn-back-map" id="btn-back-to-menu-from-codex">
          <ArrowLeft size={20} />
          <span>Kembali ke Menu Utama</span>
        </button>

        <div className="codex-header-center">
          <h1 className="codex-main-title">Buku Pintar (Codex) 📖</h1>
          <p className="codex-sub-title">Arsip Konsep Ilmiah & Remediasi Miskonsepsi Ekosistem Sawah</p>
        </div>

        <div className="codex-badge-counter">
          <span className="counter-val">{unlockedCount} / {cards.length}</span>
          <span className="counter-lbl">Kartu Terbuka</span>
        </div>
      </div>

      {/* Hero Intro */}
      <div className="codex-intro-card">
        <div className="codex-intro-left">
          <h2>Koleksi Pengetahuan Ilmiah Detektif Cilik</h2>
          <p>
            Setiap kali kamu berhasil menuntaskan dialog Socratic di satu pos misi, kartu konsep ilmiah sejati akan terbuka otomatis di Buku Pintar ini. Kumpulkan ke-6 kartu untuk menguasai seluruh konsep ekosistem sawah!
          </p>
        </div>
        <div className="codex-progress-pill">
          <div className="pill-bar-track">
            <div
              className="pill-bar-fill"
              style={{ width: `${(unlockedCount / cards.length) * 100}%` }}
            ></div>
          </div>
          <span className="pill-bar-text">{Math.round((unlockedCount / cards.length) * 100)}% Lengkap</span>
        </div>
      </div>

      {/* Grid of Codex Cards */}
      <div className="codex-cards-grid">
        {cards.map((card) => {
          const isUnlocked = card.isUnlocked;

          return (
            <div
              key={card.id}
              className={`codex-item-card ${isUnlocked ? "card-unlocked" : "card-locked"}`}
              onClick={() => {
                if (isUnlocked) {
                  setActiveModalCard(card);
                }
              }}
              role="button"
              tabIndex={0}
              id={`codex-card-${card.id}`}
            >
              {/* Status Ribbon */}
              <div className="card-top-ribbon">
                <span className="mission-source-tag">{card.missionName}</span>
                <span className="status-badge-icon">
                  {isUnlocked ? (
                    <span className="badge-open">
                      <CheckCircle size={15} />
                      <span>Terbuka</span>
                    </span>
                  ) : (
                    <span className="badge-lock">
                      <Lock size={15} />
                      <span>Terkunci</span>
                    </span>
                  )}
                </span>
              </div>

              {/* Card Body */}
              <div className="codex-card-inner">
                <div
                  className="codex-card-icon-box"
                  style={{
                    backgroundColor: isUnlocked ? `${card.accentColor}18` : "#E0E0E0",
                    borderColor: isUnlocked ? card.accentColor : "#BDBDBD"
                  }}
                >
                  <span className="codex-big-emoji">
                    {isUnlocked ? card.icon : "🔒"}
                  </span>
                </div>

                <div className="codex-card-details">
                  <span className="codex-category-label">
                    {isUnlocked ? card.category : "Misteri Sains"}
                  </span>
                  <h3 className="codex-card-title">
                    {isUnlocked ? card.title : "Kartu Rahasia Terkunci"}
                  </h3>
                  <p className="codex-card-snippet">
                    {isUnlocked
                      ? card.fact.slice(0, 110) + "..."
                      : `Selesaikan ${card.missionName} untuk membuka kartu sains ini!`}
                  </p>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="codex-card-footer">
                {isUnlocked ? (
                  <span className="action-inspect-text">
                    <span>Buka Kartu Lengkap</span>
                    <ExternalLink size={16} />
                  </span>
                ) : (
                  <button
                    className="btn-unlock-hint"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectMission) {
                        onSelectMission(card.missionId);
                      }
                    }}
                  >
                    <span>Investigasi Sekarang ➔</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Detail Pembaca Kartu Sains */}
      {activeModalCard && (
        <div className="modal-backdrop-custom" onClick={() => setActiveModalCard(null)}>
          <div
            className="modal-codex-detail"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div
              className="codex-modal-header"
              style={{ backgroundColor: activeModalCard.accentColor }}
            >
              <div className="header-meta-row">
                <span className="meta-category-badge">{activeModalCard.category}</span>
                <span className="meta-mission-ref">{activeModalCard.missionName}</span>
              </div>
              <div className="header-title-row">
                <span className="modal-header-icon">{activeModalCard.icon}</span>
                <h2 className="modal-header-title">{activeModalCard.title}</h2>
              </div>
              <button
                onClick={() => setActiveModalCard(null)}
                className="btn-modal-close"
                aria-label="Tutup"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="codex-modal-body">
              {/* Miskonsepsi Umum vs Fakta Ilmiah */}
              <div className="myth-vs-fact-container">
                <div className="myth-box">
                  <div className="myth-header">
                    <span className="myth-cross">❌</span>
                    <strong>Miskonsepsi yang Sering Terjadi:</strong>
                  </div>
                  <p className="myth-text">"{activeModalCard.myth}"</p>
                </div>

                <div className="fact-box">
                  <div className="fact-header">
                    <span className="fact-check">✅</span>
                    <strong>Fakta Ilmiah yang Sebenarnya:</strong>
                  </div>
                  <p className="fact-text">{activeModalCard.fact}</p>
                </div>
              </div>

              {/* Catatan Detektif SOKRABOT */}
              <div className="sokrabot-quote-card">
                <div className="quote-robot-header">
                  <img
                    src="/sokrabot_mascot.png"
                    alt="Sokrabot"
                    className="quote-mascot-tiny"
                  />
                  <span>Catatan Khusus SOKRABOT:</span>
                </div>
                <blockquote className="quote-body">
                  "{activeModalCard.sokrabotNote}"
                </blockquote>
              </div>

              {/* Poin Kunci Belajar */}
              <div className="codex-keypoints-box">
                <h4 className="keypoints-title">
                  <Lightbulb size={18} className="text-yellow-600" />
                  <span>Poin Penting untuk Siswa Kelas 5-6 SD:</span>
                </h4>
                <ul className="keypoints-list">
                  {activeModalCard.keyPoints.map((pt, i) => (
                    <li key={i}>
                      <span className="keypoint-bullet">🌱</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="codex-modal-footer">
              <button
                onClick={() => setActiveModalCard(null)}
                className="btn-close-reader"
              >
                Tutup Kartu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
