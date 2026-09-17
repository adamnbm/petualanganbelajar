import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { Trophy, RotateCcw, Compass, Award, CheckCircle2, Lightbulb, Star } from "lucide-react";
import { soundManager } from "../engine/audioEffects";

export default function ResultCard({
  mission,
  stats,
  onReplay,
  onBackToMissions
}) {
  useEffect(() => {
    // Bunyikan fanfare dan tembakkan confetti ceria
    soundManager.playFanfare();

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      // Efek confetti kedua
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 400);
    } catch {
      // ignore
    }
  }, []);

  const totalMain = stats.totalMainQuestions || 5;
  const completedCount = stats.completedMainCount || totalMain;
  const hintsUsed = stats.hintsUsed || 0;
  const firstTryCount = stats.firstTryCorrectCount || 0;

  // Hitung persentase kecermatan
  const scorePercent = Math.max(70, Math.min(100, 100 - hintsUsed * 5));

  return (
    <div className="result-page-wrapper">
      <div className="result-celebration-card">
        <div className="result-ribbon-top"></div>

        <div className="badge-showcase">
          {mission.badgeIcon || "🏆"}
        </div>

        <div className="result-title-group">
          <h1>Misi Selesai! 🎉</h1>
          <p>
            Hebat sekali! Kamu berhasil menuntaskan petualangan sains di{" "}
            <strong>{mission.title}</strong> bersama Timi!
          </p>
        </div>

        {/* Lencana Terbuka */}
        <div className="badge-card-box">
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#b45309", fontWeight: "800", fontSize: "0.85rem", textTransform: "uppercase" }}>
            <Award size={18} />
            <span>Lencana Prestasi Baru Terbuka</span>
          </div>
          <h3 className="badge-card-title">{mission.badgeTitle || "Penjelajah Rantai Makanan"}</h3>
          <p className="badge-card-desc">{mission.badgeDescription}</p>
        </div>

        {/* Ringkasan Skor & Statistik */}
        <div className="stats-grid-box">
          <div className="stat-item">
            <CheckCircle2 size={24} color="#10b981" />
            <span className="stat-value">{completedCount}</span>
            <span className="stat-label">Pertanyaan Selesai</span>
          </div>

          <div className="stat-item">
            <Star size={24} color="#f59e0b" />
            <span className="stat-value">{scorePercent}%</span>
            <span className="stat-label">Tingkat Kecermatan</span>
          </div>

          <div className="stat-item">
            <Lightbulb size={24} color="#0284c7" />
            <span className="stat-value">{hintsUsed}</span>
            <span className="stat-label">Petunjuk Digunakan</span>
          </div>
        </div>

        {/* Tombol Tindakan */}
        <div className="result-actions-group">
          <button
            className="btn-replay-mission"
            onClick={onReplay}
            id="btn-replay-result"
          >
            <RotateCcw size={18} />
            <span>Ulangi Misi</span>
          </button>

          <button
            className="btn-all-missions"
            onClick={onBackToMissions}
            id="btn-all-missions-result"
          >
            <Compass size={18} />
            <span>Pilih Misi Lain</span>
          </button>
        </div>
      </div>
    </div>
  );
}
