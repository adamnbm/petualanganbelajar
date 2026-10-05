import React from "react";
import { ArrowLeft, Volume2, VolumeX, RotateCcw, Star, Lightbulb } from "lucide-react";
import { soundManager } from "../engine/audioEffects";

export default function ChatHeader({
  mission,
  currentMainIndex,
  totalMainQuestions,
  currentStars = 3,
  onBack,
  onRestart,
  onToggleHintDrawer
}) {
  const [isMuted, setIsMuted] = React.useState(soundManager.isMuted());

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const currentSafe = Math.min(currentMainIndex || 1, totalMainQuestions || 2);
  const progressPercent = Math.min(100, Math.round(((currentSafe - 1) / (totalMainQuestions || 2)) * 100));

  return (
    <header className="chat-header">
      {/* Badge Gemini AI Aktif */}
      <div className="gemini-ai-status-bar">
        <span className="gemini-ai-dot" />
        <span className="gemini-ai-status-label">✨ Gemini AI Aktif – Menganalisis Jawabanmu</span>
      </div>
      <div className="chat-header-main">
        <button
          className="chat-back-btn"
          onClick={onBack}
          id="btn-back-to-map"
          title="Kembali ke Peta Misi"
        >
          <ArrowLeft size={18} />
          <span>Peta Misi</span>
        </button>

        <div className="chat-mission-info">
          <div className="chat-mission-icon">
            {mission?.icon || "🌾"}
          </div>
          <div className="chat-mission-title-group">
            <div className="title-row-with-badge">
              <h2>Misi {mission?.missionNumber}: {mission?.title}</h2>
              <span className="chat-topic-pill">{mission?.category}</span>
            </div>
            <p className="chat-sub-desc">{mission?.subTitle || mission?.pedagogicalIndicator}</p>
          </div>
        </div>

        {/* Live Stars Tracker */}
        <div className="chat-live-stars" title={`Perolehan saat ini: ${currentStars} Bintang`}>
          <span className="live-stars-label">Potensi Bintang:</span>
          <div className="live-stars-icons">
            {[1, 2, 3].map((s) => (
              <Star
                key={s}
                size={17}
                className={s <= currentStars ? "star-active text-yellow-400 fill-yellow-400" : "star-dimmed text-gray-300"}
              />
            ))}
          </div>
        </div>

        <div className="chat-header-actions">
          {onToggleHintDrawer && (
            <button
              className="nav-icon-btn btn-hint-toggle"
              onClick={onToggleHintDrawer}
              title="Buka Petunjuk Bertingkat (H1-H3)"
              id="btn-toggle-hint"
            >
              <Lightbulb size={18} className="text-amber-500" />
            </button>
          )}

          <button
            className="nav-icon-btn"
            onClick={onRestart}
            title="Mulai Ulang Investigasi dari Awal"
            id="btn-restart-chat"
          >
            <RotateCcw size={17} />
          </button>

          <button
            className="nav-icon-btn"
            onClick={handleToggleSound}
            title={isMuted ? "Aktifkan Efek Suara" : "Bisukan Suara"}
          >
            {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>
        </div>
      </div>

      <div className="chat-progress-container">
        <div className="chat-progress-meta">
          <span>
            Tantangan {currentSafe} dari {totalMainQuestions}
          </span>
          <span className="chat-progress-badge">
            {progressPercent}% Selesai
          </span>
        </div>
        <div className="progress-track" role="progressbar" aria-valuenow={progressPercent} aria-valuemin="0" aria-valuemax="100">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
    </header>
  );
}
