import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import {
  RotateCcw,
  MapPin,
  Star,
  BookOpen,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { soundManager } from "../engine/audioEffects";
import { getNextMissionId } from "../data/missions";
import { getCodexByMissionId } from "../data/codexData";

export default function ResultCard({
  mission,
  stats,
  completedRecord,
  onReplay,
  onBackToMap,
  onOpenCodex,
  onNextMission
}) {
  const starsEarned = completedRecord?.stars_earned || stats?.currentStars || 3;
  const nextMissionId = getNextMissionId(mission.id);
  const unlockedCodexCards = getCodexByMissionId(mission.id);

  useEffect(() => {
    soundManager.playFanfare();

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0.1 }
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 0.9 }
        });
      }, 400);
    } catch {
      // ignore
    }
  }, []);

  let starReasonText = "";
  if (starsEarned === 3) {
    starReasonText = "Sempurna! Kamu berhasil menyelesaikan investigasi pada percobaan pertama tanpa membuka Hint!";
  } else if (starsEarned === 2) {
    starReasonText = "Bagus sekali! Kamu berhasil merefleksikan dan memperbaiki jawaban lewat penalaran Socratic/Hint H1-H2!";
  } else {
    starReasonText = "Hebat! Kamu berhasil menuntaskan misi dengan bantuan diagram visual Level 3!";
  }

  return (
    <div className="result-page-wrapper">
      <div className="result-celebration-card">
        <div className="result-ribbon-top"></div>

        {/* Mascot / Badge Icon */}
        <div className="result-mascot-frame">
          <img
            src="/sokrabot_mascot.jpg"
            alt="SOKRABOT Celebrates"
            className="result-mascot-img"
          />
          <div className="result-confetti-badge">
            <Sparkles size={20} className="text-yellow-300" />
          </div>
        </div>

        <div className="result-title-group">
          <div className="result-code-tag">{mission.code} SELESAI</div>
          <h1 className="result-h1-title">Investigasi Berhasil! 🎉</h1>
          <p className="result-sub-text">
            Luar biasa, Detektif! Kamu berhasil mengungkap rahasia sains pada <strong>Misi {mission.missionNumber}: {mission.title}</strong> bersama SOKRABOT!
          </p>
        </div>

        {/* Stars Celebration Showcase */}
        <div className="result-stars-box">
          <div className="stars-animation-row">
            {[1, 2, 3].map((starIdx) => (
              <div
                key={starIdx}
                className={`star-wrapper-pop ${starIdx <= starsEarned ? "star-earned-pop" : "star-empty-pop"}`}
              >
                <Star size={44} className="star-svg-large" />
              </div>
            ))}
          </div>
          <h3 className="stars-count-heading">{starsEarned} dari 3 Bintang Emas</h3>
          <p className="stars-reason-note">{starReasonText}</p>
        </div>

        {/* Unlocked Codex Cards Showcase */}
        {unlockedCodexCards.length > 0 && (
          <div className="result-codex-unlocked-card">
            <div className="codex-unlock-header">
              <BookOpen size={20} className="text-amber-600" />
              <span>Kartu Buku Pintar Terbuka Otomatis:</span>
            </div>
            <div className="codex-cards-unlocked-list">
              {unlockedCodexCards.map((c) => (
                <div key={c.id} className="codex-pill-item">
                  <span className="pill-emoji">{c.icon}</span>
                  <div className="pill-content">
                    <strong>{c.title}</strong>
                    <small>{c.category}</small>
                  </div>
                  <span className="pill-check">✓ Terbuka</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="result-actions-group">
          {nextMissionId && (
            <button
              className="btn-next-mission-cta"
              onClick={() => onNextMission(nextMissionId)}
              id="btn-next-mission"
            >
              <span>Lanjut ke Pos Berikutnya</span>
              <ArrowRight size={20} />
            </button>
          )}

          <button
            className="btn-open-codex-result"
            onClick={onOpenCodex}
            id="btn-open-codex-from-result"
          >
            <BookOpen size={18} />
            <span>Buka Buku Pintar (Codex)</span>
          </button>

          <button
            className="btn-all-missions"
            onClick={onBackToMap}
            id="btn-back-to-map-from-result"
          >
            <MapPin size={18} />
            <span>Kembali ke Peta Misi</span>
          </button>

          <button
            className="btn-replay-mission"
            onClick={onReplay}
            id="btn-replay-mission-result"
          >
            <RotateCcw size={17} />
            <span>Ulangi Misi Ini</span>
          </button>
        </div>
      </div>
    </div>
  );
}
