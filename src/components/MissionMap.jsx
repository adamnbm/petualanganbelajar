import React, { useState } from "react";
import {
  Lock,
  CheckCircle,
  Play,
  RotateCcw,
  Star,
  ArrowLeft,
  Sparkles,
  Info,
  Shield,
  Zap,
  Target
} from "lucide-react";
import { MISSIONS_DATA } from "../data/missions";
import { getAllMissionProgress } from "../utils/sokrabotProgress";

export default function MissionMap({ onSelectMission, onBackToMenu }) {
  const [progressMap, setProgressMap] = useState(getAllMissionProgress());
  const [lockedNotice, setLockedNotice] = useState(null);

  const handleCardClick = (mission, isLocked) => {
    if (isLocked) {
      setLockedNotice({
        title: `Misi ${mission.missionNumber} Masih Terkunci 🔒`,
        message: `Detektif perlu menuntaskan Misi ${mission.missionNumber - 1} terlebih dahulu untuk membuka investigasi di pos ini!`
      });
      setTimeout(() => setLockedNotice(null), 3500);
      return;
    }

    onSelectMission(mission.id);
  };

  return (
    <div className="mission-map-container">
      {/* Top Bar Navigasi */}
      <div className="map-top-bar">
        <button onClick={onBackToMenu} className="btn-back-map" id="btn-back-to-menu">
          <ArrowLeft size={20} />
          <span>Kembali ke Menu Utama</span>
        </button>

        <div className="map-header-center">
          <h1 className="map-main-title">Peta Misi Sawah 🌾</h1>
          <p className="map-sub-title">{MISSIONS_DATA.length} Pos Investigasi Socratic (Level Lock 1-{MISSIONS_DATA.length})</p>
        </div>

        <div className="map-header-placeholder"></div>
      </div>

      {/* Floating Locked Notice Modal/Toast */}
      {lockedNotice && (
        <div className="locked-toast-banner animate-bounce">
          <Lock size={20} className="text-amber-400" />
          <div className="locked-toast-text">
            <strong>{lockedNotice.title}</strong>
            <p>{lockedNotice.message}</p>
          </div>
          <button
            onClick={() => setLockedNotice(null)}
            className="btn-toast-close"
          >
            ✕
          </button>
        </div>
      )}

      {/* Hero Intro Banner */}
      <div className="map-intro-card">
        <img
          src="/sokrabot_mascot.png"
          alt="SOKRABOT Scout"
          className="map-mascot-badge"
        />
        <div className="map-intro-text">
          <h3>Panduan Detektif: Telusuri Pematang Sawah Runtut</h3>
          <p>
            Setiap pos menyimpan satu rahasia sains penting. Selesaikan percakapan Socratic pos demi pos untuk membuka gembok level berikutnya, meraih bintang emas, dan mengungkap kartu Buku Pintar!
          </p>
        </div>
      </div>

      {/* Path List of 5 Missions */}
      <div className="missions-path-wrapper">
        {MISSIONS_DATA.map((mission, idx) => {
          const progress = progressMap[mission.id] || { status: idx === 0 ? "NOT_STARTED" : "LOCKED", stars_earned: 0 };
          const isLocked = progress.status === "LOCKED";
          const isCompleted = progress.status === "COMPLETED";
          const isInProgress = progress.status === "IN_PROGRESS";
          const starsEarned = progress.stars_earned || 0;

          return (
            <div
              key={mission.id}
              className={`mission-level-node ${isLocked ? "is-locked" : ""} ${isCompleted ? "is-completed" : ""} ${isInProgress ? "is-active" : ""}`}
            >
              {/* Connector Line to Next Level */}
              {idx < MISSIONS_DATA.length - 1 && (
                <div
                  className={`path-connector-line ${isCompleted ? "line-completed" : ""}`}
                ></div>
              )}

              {/* Number Badge Indicator */}
              <div className="level-number-bubble">
                {isLocked ? (
                  <Lock size={20} className="text-gray-400" />
                ) : isCompleted ? (
                  <CheckCircle size={22} className="text-emerald-500" />
                ) : (
                  <span className="level-digit">{mission.missionNumber}</span>
                )}
              </div>

              {/* Main Card Content */}
              <div
                className="level-card-body"
                onClick={() => handleCardClick(mission, isLocked)}
                role="button"
                tabIndex={0}
                id={`btn-mission-node-${mission.missionNumber}`}
              >
                <div className="level-card-header">
                  <div className="level-code-tag">
                    <span>{mission.code}</span>
                    <span className="dot-sep">•</span>
                    <span>{mission.category}</span>
                  </div>

                  {/* Stars Display */}
                  <div className="level-stars-row">
                    {[1, 2, 3].map((starIdx) => (
                      <Star
                        key={starIdx}
                        size={18}
                        className={`star-icon ${starIdx <= starsEarned ? "star-earned" : "star-empty"}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="level-card-main">
                  <div className="level-icon-box" style={{ borderColor: mission.accentColor }}>
                    <span className="level-big-emoji">{mission.icon}</span>
                  </div>

                  <div className="level-info-content">
                    <h2 className="level-title">
                      Misi {mission.missionNumber}: {mission.title}
                    </h2>
                    <h3 className="level-sub-title">{mission.subTitle}</h3>
                    <p className="level-pedagogy-indicator">
                      <Target size={14} className="inline-icon" />
                      <span>{mission.pedagogicalIndicator}</span>
                    </p>
                  </div>
                </div>

                {/* Footer Action Button (Touch target >= 48px) */}
                <div className="level-card-footer">
                  <div className="level-status-pill">
                    {isLocked && <span className="status-locked">🔒 Terkunci (Selesaikan Pos Sebelumnya)</span>}
                    {isCompleted && <span className="status-done">✅ Tuntas ({starsEarned} ⭐)</span>}
                    {isInProgress && <span className="status-progress">🟡 Sedang Berjalan</span>}
                    {!isLocked && !isCompleted && !isInProgress && (
                      <span className="status-ready">🟢 Siap Diinvestigasi!</span>
                    )}
                  </div>

                  <button
                    className={`btn-level-action ${isLocked ? "btn-disabled" : isCompleted ? "btn-repeat" : "btn-play"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(mission, isLocked);
                    }}
                  >
                    {isLocked ? (
                      <>
                        <Lock size={18} />
                        <span>Terkunci</span>
                      </>
                    ) : isCompleted ? (
                      <>
                        <RotateCcw size={18} />
                        <span>Investigasi Ulang</span>
                      </>
                    ) : (
                      <>
                        <Play size={18} />
                        <span>Mulai Misi</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
