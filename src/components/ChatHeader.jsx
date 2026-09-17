import React from "react";
import { ArrowLeft, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { soundManager } from "../engine/audioEffects";

export default function ChatHeader({
  mission,
  currentMainIndex,
  totalMainQuestions,
  onBack,
  onRestart
}) {
  const [isMuted, setIsMuted] = React.useState(soundManager.isMuted());

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  // Hitung persentase progress (berdasarkan pertanyaan utama)
  const currentSafe = Math.min(currentMainIndex, totalMainQuestions);
  const progressPercent = Math.min(100, Math.round(((currentSafe - 1) / totalMainQuestions) * 100));

  return (
    <header className="chat-header">
      <div className="chat-header-main">
        <button
          className="chat-back-btn"
          onClick={onBack}
          id="btn-back-missions"
          title="Kembali ke Daftar Misi"
        >
          <ArrowLeft size={16} />
          <span>Kembali</span>
        </button>

        <div className="chat-mission-info">
          <div className="chat-mission-icon">
            {mission.icon}
          </div>
          <div className="chat-mission-title-group">
            <h2>{mission.title}</h2>
            <p>{mission.description.slice(0, 48)}...</p>
          </div>
        </div>

        <div className="chat-header-actions">
          <button
            className="nav-icon-btn"
            onClick={onRestart}
            title="Mulai Ulang Percakapan dari Awal"
            id="btn-restart-chat"
          >
            <RotateCcw size={16} />
          </button>

          <button
            className="nav-icon-btn"
            onClick={handleToggleSound}
            title={isMuted ? "Aktifkan Efek Suara" : "Bisukan Suara"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>

      <div className="chat-progress-container">
        <div className="chat-progress-meta">
          <span>
            Pertanyaan {currentSafe} dari {totalMainQuestions}
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
