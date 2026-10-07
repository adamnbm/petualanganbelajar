import React, { useState } from "react";
import {
  Star,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Sparkles,
  RotateCcw,
  AlertTriangle,
  X
} from "lucide-react";
import {
  getStudentAchievements,
  resetCurrentStudentProgress
} from "../utils/sokrabotProgress";
import { MISSIONS_DATA } from "../data/missions";

export default function AchievementsView({ onBackToMenu, onSelectMission }) {
  const [achievements, setAchievements] = useState(getStudentAchievements());
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    resetCurrentStudentProgress();
    setAchievements(getStudentAchievements());
    setShowResetConfirm(false);
  };

  const unlockedBadgeIds = achievements.unlockedBadges.map((b) => b.id);

  return (
    <div className="achievements-container">
      {/* Top Bar Navigasi */}
      <div className="achieve-top-bar">
        <button onClick={onBackToMenu} className="btn-back-map" id="btn-back-to-menu-from-achievements">
          <ArrowLeft size={20} />
          <span>Kembali ke Menu Utama</span>
        </button>

        <div className="achieve-header-center">
          <h1 className="achieve-main-title">Pencapaianku 🏆</h1>
          <p className="achieve-sub-title">Bintang Kehormatan & Lencana Detektif Ekosistem Sawah</p>
        </div>

        <button
          onClick={() => setShowResetConfirm(true)}
          className="btn-reset-progress"
          title="Mulai ulang petualangan dari awal"
        >
          <RotateCcw size={16} />
          <span>Reset Progres</span>
        </button>
      </div>

      {/* Confirmation Modal for Reset */}
      {showResetConfirm && (
        <div
          className="modal-backdrop-custom"
          onClick={() => setShowResetConfirm(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-modal-title"
        >
          <div className="modal-reset-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="btn-modal-close-reset"
              onClick={() => setShowResetConfirm(false)}
              aria-label="Tutup modal"
            >
              <X size={18} />
            </button>

            <div className="modal-reset-icon-wrapper">
              <div className="modal-reset-icon-circle">
                <AlertTriangle size={32} />
              </div>
            </div>

            <div className="modal-reset-header">
              <h3 id="reset-modal-title">Reset Seluruh Pencapaian?</h3>
              <p className="modal-reset-desc">
                Semua bintang ⭐, lencana kehormatan 🏅, dan riwayat petualangan belajarmu akan dikembalikan ke kondisi awal.
              </p>
            </div>

            <div className="modal-reset-warning-pill">
              <span className="warning-pill-icon">⚠️</span>
              <span className="warning-pill-text">
                Tindakan ini tidak dapat dibatalkan. Kamu bisa mengulang seluruh misi dari awal untuk meraih skor terbaik!
              </span>
            </div>

            <div className="modal-reset-actions">
              <button
                type="button"
                className="btn-cancel-reset"
                onClick={() => setShowResetConfirm(false)}
              >
                Batal
              </button>
              <button
                type="button"
                className="btn-confirm-reset"
                onClick={handleReset}
              >
                <RotateCcw size={16} />
                <span>Ya, Reset dari Awal</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Summary Cards */}
      <div className="achieve-summary-cards">
        {/* Star Rating Card */}
        <div className="achieve-stat-card card-stars">
          <div className="card-top-icon">⭐</div>
          <div className="card-stat-info">
            <span className="stat-big-number">{achievements.totalStars} / {achievements.maxStars}</span>
            <span className="stat-name">Total Bintang Terkumpul</span>
          </div>
          <div className="card-progress-track">
            <div
              className="card-progress-bar bg-yellow-400"
              style={{ width: `${(achievements.totalStars / achievements.maxStars) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Badges Card */}
        <div className="achieve-stat-card card-badges">
          <div className="card-top-icon">🏅</div>
          <div className="card-stat-info">
            <span className="stat-big-number">{achievements.unlockedBadges.length} / {achievements.allBadges.length}</span>
            <span className="stat-name">Lencana Kehormatan</span>
          </div>
          <div className="card-progress-track">
            <div
              className="card-progress-bar bg-emerald-500"
              style={{ width: `${(achievements.unlockedBadges.length / achievements.allBadges.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Completed Missions Card */}
        <div className="achieve-stat-card card-missions">
          <div className="card-top-icon">🌾</div>
          <div className="card-stat-info">
            <span className="stat-big-number">{achievements.completedCount} / {achievements.totalMissions}</span>
            <span className="stat-name">Misi Dituntaskan</span>
          </div>
          <div className="card-progress-track">
            <div
              className="card-progress-bar bg-green-600"
              style={{ width: `${(achievements.completedCount / achievements.totalMissions) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Star System Rules Explanation Box (PRD Section 6) */}
      <div className="star-rules-banner">
        <h3 className="star-rules-title">
          <Star size={20} className="text-yellow-500" />
          <span>Aturan Perolehan Bintang SOKRABOT:</span>
        </h3>
        <div className="star-rules-grid">
          <div className="star-rule-pill">
            <div className="rule-stars">⭐⭐⭐</div>
            <div className="rule-desc">
              <strong>3 Bintang (Sempurna)</strong>
              <small>Menjawab benar pada percobaan pertama tanpa membuka Hint.</small>
            </div>
          </div>
          <div className="star-rule-pill">
            <div className="rule-stars">⭐⭐</div>
            <div className="rule-desc">
              <strong>2 Bintang (Mandiri)</strong>
              <small>Memperbaiki jawaban setelah 1–2 bimbingan Socratic atau Hint H1-H2.</small>
            </div>
          </div>
          <div className="star-rule-pill">
            <div className="rule-stars">⭐</div>
            <div className="rule-desc">
              <strong>1 Bintang (Berbantuan)</strong>
              <small>Menyelesaikan misi dengan bantuan diagram Hint Level 3 Visual.</small>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Lencana Kehormatan (PRD Section 6) */}
      <section className="badges-section">
        <h2 className="section-title">
          <span>Koleksi 4 Lencana Kehormatan Sawah</span>
        </h2>

        <div className="badges-grid">
          {achievements.allBadges.map((badge) => {
            const isUnlocked = unlockedBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`badge-card ${isUnlocked ? "badge-unlocked" : "badge-locked"}`}
                id={`badge-${badge.id}`}
              >
                <div className="badge-icon-frame">
                  <div
                    className="badge-icon-circle"
                    style={{
                      backgroundColor: isUnlocked ? `${badge.accentColor}22` : "#EEEEEE",
                      borderColor: isUnlocked ? badge.accentColor : "#CCCCCC"
                    }}
                  >
                    <span className="badge-main-emoji">
                      {isUnlocked ? badge.icon : "🔒"}
                    </span>
                  </div>
                  {isUnlocked && <Sparkles size={20} className="badge-sparkle-star" />}
                </div>

                <div className="badge-details">
                  <div className="badge-status-chip">
                    {isUnlocked ? (
                      <span className="chip-earned">
                        <CheckCircle2 size={13} />
                        <span>Diraih!</span>
                      </span>
                    ) : (
                      <span className="chip-locked">
                        <Lock size={13} />
                        <span>Terkunci</span>
                      </span>
                    )}
                  </div>

                  <h3 className="badge-title">{badge.name}</h3>
                  <p className="badge-requirement">
                    <strong>Syarat:</strong> {badge.requirement}
                  </p>
                  <p className="badge-desc">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tabel Ringkasan Progres 5 Misi (PRD Section 7 Collection: mission_progress) */}
      <section className="progress-table-section">
        <h2 className="section-title">
          <span>Rekapitulasi Investigasi Misi (Data Log Siswa)</span>
        </h2>

        <div className="table-responsive-wrapper">
          <table className="progress-data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Kode & Judul Misi</th>
                <th>Fokus Pedagogis</th>
                <th>Status</th>
                <th>Bintang</th>
                <th>Miskonsepsi Terdeteksi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {MISSIONS_DATA.map((m) => {
                const prog = achievements.progressMap[m.id] || { status: "LOCKED", stars_earned: 0 };
                const isLocked = prog.status === "LOCKED";
                const isCompleted = prog.status === "COMPLETED";

                return (
                  <tr key={m.id} className={isCompleted ? "row-completed" : isLocked ? "row-locked" : "row-active"}>
                    <td className="text-center font-bold">{m.missionNumber}</td>
                    <td>
                      <div className="table-mission-info">
                        <span className="t-icon">{m.icon}</span>
                        <div>
                          <strong>{m.title}</strong>
                          <small className="t-sub">{m.code}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="t-focus">{m.focus}</span>
                    </td>
                    <td>
                      {isLocked && <span className="status-badge-tbl lock">🔒 Terkunci</span>}
                      {isCompleted && <span className="status-badge-tbl done">✅ Selesai</span>}
                      {prog.status === "IN_PROGRESS" && <span className="status-badge-tbl progress">🟡 Berjalan</span>}
                      {prog.status === "NOT_STARTED" && <span className="status-badge-tbl ready">🟢 Belum Dimulai</span>}
                    </td>
                    <td className="text-center">
                      <div className="table-stars">
                        {[1, 2, 3].map((s) => (
                          <span
                            key={s}
                            className={s <= (prog.stars_earned || 0) ? "star-fill" : "star-dim"}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      {prog.misconceptions_triggered && prog.misconceptions_triggered.length > 0 ? (
                        <div className="tag-misconceptions">
                          {prog.misconceptions_triggered.map((mt, i) => (
                            <span key={i} className="chip-misconception">
                              {mt.replace(/_/g, " ")}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">Tidak ada</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn-tbl-action"
                        disabled={isLocked}
                        onClick={() => onSelectMission(m.id)}
                      >
                        {isLocked ? "Terkunci" : isCompleted ? "Ulangi" : "Main"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
