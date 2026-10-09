import React, { useState } from "react";
import {
  Lock,
  CheckCircle,
  ArrowLeft,
  ExternalLink,
  X,
  Lightbulb,
  Sparkles,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  Check
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
          <p className="codex-sub-title">Modul Belajar Ilmiah Lengkap & Remediasi Konsep Ekosistem Sawah</p>
        </div>

        <div className="codex-badge-counter">
          <span className="counter-val">{unlockedCount} / {cards.length}</span>
          <span className="counter-lbl">Kartu Terbuka</span>
        </div>
      </div>

      {/* Hero Intro */}
      <div className="codex-intro-card">
        <div className="codex-intro-left">
          <h2>Koleksi Modul Ilmiah Detektif Cilik</h2>
          <p>
            Setiap kali kamu berhasil menuntaskan dialog Socratic di satu pos misi, kartu konsep ilmiah sejati akan terbuka otomatis di Buku Pintar ini. Kumpulkan ke-5 kartu untuk menguasai seluruh konsep ekosistem sawah!
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
                <span className="mission-source-tag">
                  {card.pointLetter ? `Poin ${card.pointLetter} • ${card.missionName}` : card.missionName}
                </span>
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
                      ? (card.subtitle || card.fact.slice(0, 110) + "...")
                      : `Selesaikan ${card.missionName} untuk membuka kartu sains ini!`}
                  </p>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="codex-card-footer">
                {isUnlocked ? (
                  <span className="action-inspect-text">
                    <span>Baca Kartu Lengkap</span>
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

      {/* Modal Detail Pembaca Kartu Modul Sains Interaktif */}
      {activeModalCard && (
        <div className="modal-backdrop-custom" onClick={() => setActiveModalCard(null)}>
          <div
            className="modal-codex-detail modal-codex-large"
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
                <span className="meta-category-badge">
                  {activeModalCard.pointLetter ? `Poin ${activeModalCard.pointLetter} : Kartu Pintar ${activeModalCard.kartuNumber}` : `Kartu Pintar ${activeModalCard.kartuNumber}`}
                </span>
                <span className="meta-category-badge meta-cat-sub">{activeModalCard.category}</span>
                <span className="meta-mission-ref">{activeModalCard.missionName}</span>
              </div>
              <div className="header-title-row">
                <span className="modal-header-icon">{activeModalCard.icon}</span>
                <div>
                  <h2 className="modal-header-title">{activeModalCard.title}</h2>
                  {activeModalCard.subtitle && (
                    <p className="modal-header-subtitle">{activeModalCard.subtitle}</p>
                  )}
                </div>
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
              {/* 1. PERTANYAAN PEMANTIK (AYO AMATI!) */}
              {activeModalCard.hook && (
                <div className="codex-hook-card">
                  <div className="hook-header">
                    <span className="hook-icon-badge">
                      <HelpCircle size={18} />
                    </span>
                    <h3 className="hook-title">{activeModalCard.hook.title}</h3>
                  </div>
                  <div className="hook-content">
                    {activeModalCard.hook.story && (
                      <p className="hook-story-text">{activeModalCard.hook.story}</p>
                    )}
                    {activeModalCard.hook.question && (
                      <div className="hook-question-callout">
                        <span className="question-mark-bubble">❓</span>
                        <strong>{activeModalCard.hook.question}</strong>
                      </div>
                    )}
                    {activeModalCard.hook.explanation && (
                      <p className="hook-explanation-text">{activeModalCard.hook.explanation}</p>
                    )}
                  </div>
                </div>
              )}

              {/* 2. MATERI LENGKAP & PENJELASAN ILMIAH */}
              {activeModalCard.sections && activeModalCard.sections.map((sec, sIdx) => (
                <div key={sIdx} className="codex-materi-section">
                  <h3 className="materi-section-heading">
                    <BookOpen size={18} className="materi-heading-icon" />
                    <span>{sec.heading}</span>
                  </h3>

                  <div className="materi-paragraphs-wrapper">
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="materi-paragraph">{p}</p>
                    ))}
                  </div>

                  {/* Jika ada bahan fotosintesis */}
                  {sec.ingredients && (
                    <div className="codex-ingredients-grid">
                      {sec.ingredients.map((ing, iIdx) => (
                        <div key={iIdx} className="ingredient-item-card">
                          <span className="ingredient-icon">{ing.icon}</span>
                          <div className="ingredient-info">
                            <strong>{ing.label}</strong>
                            <span>{ing.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Jika ada Tahukah Kamu */}
                  {sec.funFact && (
                    <div className="codex-funfact-box">
                      <div className="funfact-header">
                        <Sparkles size={18} className="text-amber-600" />
                        <strong>Tahukah Kamu?</strong>
                      </div>
                      <p className="funfact-text">{sec.funFact}</p>
                    </div>
                  )}

                  {/* Jika ada contoh predator */}
                  {sec.examples && (
                    <div className="codex-examples-grid">
                      {sec.examples.map((ex, eIdx) => (
                        <div key={eIdx} className="example-predator-card">
                          <div className="predator-card-top">
                            <span className="predator-icon">{ex.icon}</span>
                            <div>
                              <h4 className="predator-name">{ex.animal}</h4>
                              <span className="predator-prey-tag">Mangsa: {ex.prey}</span>
                            </div>
                          </div>
                          <p className="predator-ability">
                            <strong>Keahlian Berburu:</strong> {ex.ability}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Jika ada langkah domino efek */}
                  {sec.dominoSteps && (
                    <div className="codex-domino-flow">
                      <div className="domino-flow-title">
                        <AlertTriangle size={18} className="text-red-600" />
                        <span>Alur Dampak Berkurangnya Populasi Ular:</span>
                      </div>
                      <div className="domino-steps-grid">
                        {sec.dominoSteps.map((st, dIdx) => (
                          <div key={dIdx} className="domino-step-card">
                            <div className="domino-step-badge">{st.step}</div>
                            <span className="domino-step-icon">{st.icon}</span>
                            <h5 className="domino-step-title">{st.title}</h5>
                            <p className="domino-step-desc">{st.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* 3. VISUALISASI ALUR RANTAI MAKANAN (KARTU 1) */}
              {activeModalCard.chainExamples && (
                <div className="codex-chains-showcase">
                  <h4 className="showcase-title">
                    <span>🌾 Contoh Rantai Makanan Nyata</span>
                  </h4>
                  <div className="chains-wrapper">
                    {activeModalCard.chainExamples.map((chain, cIdx) => (
                      <div key={cIdx} className="chain-card">
                        <h5 className="chain-card-title">{chain.title}</h5>
                        <div className="chain-steps-row">
                          {chain.steps.map((st, sIdx) => (
                            <React.Fragment key={sIdx}>
                              <div className="chain-node">
                                <span className="node-emoji">{st.emoji}</span>
                                <strong className="node-name">{st.name}</strong>
                                <span className="node-role">{st.role}</span>
                              </div>
                              {sIdx < chain.steps.length - 1 && (
                                <div className="chain-arrow">
                                  <ArrowRight size={20} />
                                </div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                        <p className="chain-card-desc">{chain.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. PERAN DALAM RANTAI MAKANAN (KARTU 1) */}
              {activeModalCard.roles && (
                <div className="codex-roles-section">
                  <h4 className="roles-main-title">
                    <span>🌿 Siapa Saja yang Berperan dalam Rantai Makanan?</span>
                  </h4>
                  <div className="roles-cards-grid">
                    {activeModalCard.roles.map((r, rIdx) => (
                      <div
                        key={rIdx}
                        className="role-info-card"
                        style={{ borderTopColor: r.color }}
                      >
                        <span className="role-icon-big">{r.icon}</span>
                        <h5 className="role-name">{r.name}</h5>
                        <span className="role-subtitle">{r.role}</span>
                        <p className="role-desc">{r.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. ALIRAN PERJALANAN ENERGI (KARTU 2) */}
              {activeModalCard.energyFlowSteps && (
                <div className="codex-energy-showcase">
                  <h4 className="energy-showcase-title">
                    <span>⚡ Perjalanan Energi di Ekosistem Sawah</span>
                  </h4>
                  <div className="energy-flow-row">
                    {activeModalCard.energyFlowSteps.map((ef, eIdx) => (
                      <React.Fragment key={eIdx}>
                        <div className="energy-flow-node">
                          <span className="ef-icon">{ef.icon}</span>
                          <strong className="ef-name">{ef.name}</strong>
                          <span className="ef-info">{ef.info}</span>
                        </div>
                        {eIdx < activeModalCard.energyFlowSteps.length - 1 && (
                          <div className="energy-arrow">
                            <ArrowRight size={20} />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <p className="energy-flow-caption">
                    Energi cahaya matahari ditangkap padi, lalu energi berpindah melalui peristiwa makan dan dimakan.
                  </p>
                </div>
              )}

              {/* 6. PERBANDINGAN SOLUSI: DILEMA PAK TANI (KARTU 5) */}
              {activeModalCard.comparison && (
                <div className="codex-comparison-container">
                  <div className="comparison-box box-negative">
                    <h4 className="comp-title text-red-700">{activeModalCard.comparison.negative.title}</h4>
                    <ul className="comp-list">
                      {activeModalCard.comparison.negative.points.map((pt, pIdx) => (
                        <li key={pIdx}>
                          <span className="comp-bullet text-red-500">❌</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="comparison-box box-positive">
                    <h4 className="comp-title text-emerald-700">{activeModalCard.comparison.positive.title}</h4>
                    <ul className="comp-list">
                      {activeModalCard.comparison.positive.points.map((pt, pIdx) => (
                        <li key={pIdx}>
                          <span className="comp-bullet text-emerald-500">✅</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* 7. YANG PERLU DIINGAT CHECKLIST (KARTU 5) */}
              {activeModalCard.rememberChecklist && (
                <div className="codex-checklist-card">
                  <h4 className="checklist-heading">
                    <CheckCircle size={18} className="text-emerald-600" />
                    <span>Yang Perlu Diingat!</span>
                  </h4>
                  <div className="checklist-grid">
                    {activeModalCard.rememberChecklist.map((ch, cIdx) => (
                      <div key={cIdx} className="checklist-item">
                        <span className="check-badge">✓</span>
                        <span>{ch}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. LANGKAH MENJAGA KESEIMBANGAN (KARTU 5) */}
              {activeModalCard.actionSteps && (
                <div className="codex-action-steps-card">
                  <h4 className="action-steps-title">
                    <span>Bagaimana Kita Menjaga Keseimbangan?</span>
                  </h4>
                  <div className="action-steps-grid">
                    {activeModalCard.actionSteps.map((act, aIdx) => (
                      <div key={aIdx} className="action-step-item">
                        <span className="step-num-bubble">{act.num}</span>
                        <p className="step-text">{act.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 9. CATATAN KHUSUS DETEKTIF SOKRABOT */}
              <div className="sokrabot-quote-card">
                <div className="quote-robot-header">
                  <img
                    src="/sokrabot_mascot.png"
                    alt="Sokrabot"
                    className="quote-mascot-tiny"
                  />
                  <span>Catatan Detektif SOKRABOT:</span>
                </div>
                <blockquote className="quote-body">
                  "{activeModalCard.sokrabotNote}"
                </blockquote>
              </div>

              {/* 10. INGAT KONSEP NYA! (RANGKUMAN PDF) */}
              {activeModalCard.rememberConcepts && (
                <div className="codex-remember-box">
                  <h4 className="remember-title">
                    <Lightbulb size={20} className="text-amber-500" />
                    <span>Ingat Konsepnya!</span>
                  </h4>
                  <ul className="remember-list">
                    {activeModalCard.rememberConcepts.map((pt, i) => (
                      <li key={i}>
                        <span className="remember-bullet">✨</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
