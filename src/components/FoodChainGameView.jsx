import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Play,
  Trophy,
  Zap,
  ArrowRight,
  Award,
  ChevronRight,
  Flame,
  Volume2
} from "lucide-react";
import { soundManager } from "../engine/audioEffects";

// =====================================================
// DATA 1 LEVEL — Rantai Makanan Sawah (Konteks Peta Misi)
// Padi → Tikus → Ular → Elang
// =====================================================
const GAME_LEVEL = {
  id: 1,
  title: "Rantai Makanan Ekosistem Sawah",
  subTitle: "Susun kartu organisme dari Produsen hingga Konsumen Puncak!",
  difficulty: "Tantangan",
  difficultyColor: "#059669",
  hint: "Ingat rantai makanan di sawah Pak Budi! Dimulai dari tanaman yang melakukan fotosintesis (Produsen), lalu hewan pemakan tumbuhan (Konsumen I), kemudian hewan pemangsa (Konsumen II), hingga predator puncak (Konsumen III).",
  explanation:
    "Rantai makanan di sawah dimulai dari Tanaman Padi (Produsen) yang menghasilkan makanan sendiri lewat fotosintesis. Padi dimakan oleh Tikus Sawah (Konsumen I), Tikus dimangsa oleh Ular Sawah (Konsumen II), dan Ular dimangsa oleh Burung Elang (Konsumen III) sebagai predator puncak.",
  energyExplanation:
    "Arah aliran energi: Padi 🌾 ➡️ Tikus 🐀 ➡️ Ular 🐍 ➡️ Elang 🦅. Energi mengalir dari produsen ke konsumen melalui peristiwa makan dan dimakan!",
  correctOrder: [
    {
      id: "padi",
      name: "Tanaman Padi",
      shortName: "Padi",
      scientificName: "Oryza sativa",
      emoji: "🌾",
      role: "Produsen",
      shortRole: "Produsen",
      roleType: "producer",
      description:
        "Menghasilkan makanan sendiri dari cahaya matahari melalui fotosintesis. Sumber energi pertama di ekosistem sawah.",
      badgeColor: "#10b981",
      bgColor: "#ecfdf5"
    },
    {
      id: "tikus",
      name: "Tikus Sawah",
      shortName: "Tikus",
      scientificName: "Rattus argentiventer",
      emoji: "🐀",
      role: "Konsumen I (Herbivora)",
      shortRole: "Konsumen 1",
      roleType: "consumer_1",
      description:
        "Memakan biji dan batang padi pada malam hari. Hama utama yang merugikan petani di sawah.",
      badgeColor: "#0284c7",
      bgColor: "#f0f9ff"
    },
    {
      id: "ular",
      name: "Ular Sawah",
      shortName: "Ular",
      scientificName: "Ptyas korros",
      emoji: "🐍",
      role: "Konsumen II (Karnivora)",
      shortRole: "Konsumen 2",
      roleType: "consumer_2",
      description:
        "Predator alami pemburu tikus yang menjaga kelestarian padi di sawah.",
      badgeColor: "#ea580c",
      bgColor: "#fff7ed"
    },
    {
      id: "elang",
      name: "Burung Elang",
      shortName: "Elang",
      scientificName: "Haliaeetus leucogaster",
      emoji: "🦅",
      role: "Konsumen III (Predator Puncak)",
      shortRole: "Konsumen 3",
      roleType: "apex",
      description:
        "Burung pemangsa puncak yang memangsa ular dan hewan kecil lainnya dari udara.",
      badgeColor: "#b91c1c",
      bgColor: "#fef2f2"
    }
  ]
};

// Helper shuffle array
function shuffleArray(arr) {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export default function FoodChainGameView({ onBackToMenu, onGoToMap }) {
  // Game Play State
  const [placedCards, setPlacedCards] = useState([]);
  const [availableCards, setAvailableCards] = useState([]);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);
  const [incorrectIndices, setIncorrectIndices] = useState([]);
  const [showHintModal, setShowHintModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Inisialisasi Level
  useEffect(() => {
    initLevel();
  }, []);

  const initLevel = () => {
    setPlacedCards(new Array(GAME_LEVEL.correctOrder.length).fill(null));
    setAvailableCards(shuffleArray(GAME_LEVEL.correctOrder));
    setIsAnswerChecked(false);
    setIsAllCorrect(false);
    setIncorrectIndices([]);
    setShowSuccessModal(false);
    setAttempts(0);
  };

  // Drag and Drop State
  const [draggedCard, setDraggedCard] = useState(null);

  // Klik kartu di baki: masukkan ke slot pertama yang kosong
  const handleSelectFromPool = (card) => {
    soundManager.playClick();
    const emptyIndex = placedCards.findIndex((c) => c === null);
    if (emptyIndex === -1) return;

    const newPlaced = [...placedCards];
    newPlaced[emptyIndex] = card;
    setPlacedCards(newPlaced);

    setAvailableCards((prev) => prev.filter((c) => c.id !== card.id));
    setIsAnswerChecked(false);
    setIncorrectIndices([]);
  };

  // Klik kartu di slot: kembalikan ke baki kartu
  const handleRemoveFromSlot = (index) => {
    const card = placedCards[index];
    if (!card) return;

    soundManager.playClick();
    const newPlaced = [...placedCards];
    newPlaced[index] = null;
    setPlacedCards(newPlaced);

    setAvailableCards((prev) => [...prev, card]);
    setIsAnswerChecked(false);
    setIncorrectIndices([]);
  };

  // Drag handlers
  const handleDragStart = (card, fromSource, fromIndex = null) => {
    setDraggedCard({ card, fromSource, fromIndex });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropToSlot = (targetIndex) => {
    if (!draggedCard) return;

    soundManager.playClick();
    const { card, fromSource, fromIndex } = draggedCard;
    const existingInTarget = placedCards[targetIndex];

    const newPlaced = [...placedCards];

    if (fromSource === "pool") {
      newPlaced[targetIndex] = card;
      if (existingInTarget) {
        setAvailableCards((prev) => [...prev.filter((c) => c.id !== card.id), existingInTarget]);
      } else {
        setAvailableCards((prev) => prev.filter((c) => c.id !== card.id));
      }
    } else if (fromSource === "slot") {
      newPlaced[targetIndex] = card;
      newPlaced[fromIndex] = existingInTarget || null;
    }

    setPlacedCards(newPlaced);
    setDraggedCard(null);
    setIsAnswerChecked(false);
    setIncorrectIndices([]);
  };

  // Periksa Jawaban
  const handleCheckAnswer = () => {
    setAttempts((prev) => prev + 1);

    const hasEmptySlot = placedCards.some((c) => c === null);
    if (hasEmptySlot) {
      soundManager.playHint();
      alert("⚠️ Semua slot rantai makanan harus terisi terlebih dahulu!");
      return;
    }

    const wrongList = [];
    placedCards.forEach((card, idx) => {
      if (!card || card.id !== GAME_LEVEL.correctOrder[idx].id) {
        wrongList.push(idx);
      }
    });

    if (wrongList.length === 0) {
      // BENAR SEMUA!
      soundManager.playCorrect();
      setIsAllCorrect(true);
      setIsAnswerChecked(true);
      setIncorrectIndices([]);

      // Simpan progress
      try {
        localStorage.setItem(
          "sokrabot_food_chain_levels",
          JSON.stringify({
            1: {
              stars: attempts === 0 ? 3 : attempts <= 2 ? 2 : 1,
              completedAt: new Date().toISOString()
            }
          })
        );
      } catch (err) {
        console.error(err);
      }

      // Fanfare & Confetti
      setTimeout(() => {
        soundManager.playFanfare();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        setShowSuccessModal(true);
      }, 400);
    } else {
      // ADA YANG SALAH
      soundManager.playHint();
      setIsAllCorrect(false);
      setIsAnswerChecked(true);
      setIncorrectIndices(wrongList);
    }
  };

  // Reset Level
  const handleReset = () => {
    soundManager.playClick();
    initLevel();
  };

  return (
    <div className="minigame-container-root">
      {/* Top Header Bar */}
      <div className="minigame-header-card">
        <div className="minigame-header-left">
          <button
            onClick={onBackToMenu}
            className="nav-pill-btn btn-minigame-back"
            style={{
              background: "#ffffff",
              border: "1.5px solid #cbd5e1",
              color: "#334155",
              fontWeight: "700"
            }}
            title="Kembali ke Menu Utama"
          >
            <ArrowLeft size={16} />
            <span>Menu Utama</span>
          </button>

          <div className="minigame-header-titles">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="minigame-badge-chip">🎮 Minigame Interaktif</span>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "800",
                  padding: "2px 8px",
                  borderRadius: "999px",
                  background: GAME_LEVEL.difficultyColor + "20",
                  color: GAME_LEVEL.difficultyColor
                }}
              >
                {GAME_LEVEL.difficulty}
              </span>
            </div>
            <h1 className="minigame-title">Arena Rantai Makanan & Aliran Energi</h1>
          </div>
        </div>
      </div>

      {/* Main Game Stage */}
      <div className="minigame-stage-card">
        {/* Banner Instruksi & Petunjuk Level */}
        <div className="minigame-mission-banner">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <div className="minigame-mascot-circle">
              <img
                src="/sokrabot_mascot.png"
                alt="SOKRABOT"
                style={{ width: "38px", height: "38px", objectFit: "contain" }}
              />
            </div>
            <div>
              <div style={{ fontWeight: "800", color: "#065f46", fontSize: "1.05rem" }}>
                {GAME_LEVEL.title}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#047857" }}>
                {GAME_LEVEL.subTitle}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button
              onClick={() => {
                soundManager.playHint();
                setShowHintModal(true);
              }}
              className="nav-pill-btn"
              style={{
                background: "#fef3c7",
                color: "#92400e",
                border: "1.5px solid #fde68a",
                fontWeight: "700"
              }}
              title="Buka Petunjuk SOKRABOT"
            >
              <HelpCircle size={16} />
              <span>Petunjuk</span>
            </button>

            <button
              onClick={handleReset}
              className="nav-pill-btn"
              style={{
                background: "#f1f5f9",
                color: "#475569",
                border: "1.5px solid #e2e8f0"
              }}
              title="Acak Ulang Kartu"
            >
              <RotateCcw size={16} />
              <span>Ulang</span>
            </button>
          </div>
        </div>

        {/* Zona Rantai Makanan: SLOT-SLOT TERATUR */}
        <div className="minigame-chain-workspace">
          <div className="workspace-header-label">
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Zap size={18} className="text-amber-500" />
              <strong>Jalur Rantai Makanan & Arah Aliran Energi</strong>
            </span>
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
              <span className="hide-on-mobile">Ketuk kartu di slot untuk membatalkan</span>
              <span className="show-on-mobile-only">Ketuk kartu untuk batal</span>
            </span>
          </div>

          <div className="chain-slots-track">
            {placedCards.map((card, idx) => {
              const isWrong = isAnswerChecked && incorrectIndices.includes(idx);
              const isCorrectSlot = isAnswerChecked && !incorrectIndices.includes(idx) && card;

              return (
                <React.Fragment key={idx}>
                  {/* Slot Target */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={() => handleDropToSlot(idx)}
                    onClick={() => handleRemoveFromSlot(idx)}
                    className={`chain-slot-box ${card ? "filled" : "empty"} ${
                      isWrong ? "wrong-slot" : ""
                    } ${isCorrectSlot && isAllCorrect ? "correct-slot" : ""}`}
                    title={card ? "Klik untuk mengembalikan kartu" : `Slot ${idx + 1}`}
                  >
                    {/* Header Slot (Nomor Urut & Peran) */}
                    <div className="slot-number-badge">
                      <span className="slot-idx-num">{idx + 1}</span>
                      <span className="slot-role-hint">
                        {GAME_LEVEL.correctOrder[idx]?.shortRole || GAME_LEVEL.correctOrder[idx]?.role.split(" ")[0]}
                      </span>
                    </div>

                    {card ? (
                      <div
                        draggable
                        onDragStart={() => handleDragStart(card, "slot", idx)}
                        className="placed-organism-card"
                        style={{
                          backgroundColor: card.bgColor,
                          borderColor: isWrong ? "#ef4444" : isAllCorrect ? "#10b981" : card.badgeColor
                        }}
                      >
                        <div className="organism-emoji">{card.emoji}</div>
                        <div className="organism-title">
                          <span className="hide-on-mobile">{card.name}</span>
                          <span className="show-on-mobile-only">{card.shortName || card.name}</span>
                        </div>
                        <div
                          className="organism-role-badge"
                          style={{
                            color: card.badgeColor,
                            backgroundColor: "#ffffff",
                            border: `1px solid ${card.badgeColor}40`
                          }}
                        >
                          <span className="hide-on-mobile">{card.role}</span>
                          <span className="show-on-mobile-only">{card.shortRole || card.role}</span>
                        </div>

                        {/* Status Validasi */}
                        {isWrong && (
                          <div className="validation-error-tag">
                            <AlertCircle size={12} />
                            <span className="hide-on-mobile">Posisi Belum Tepat</span>
                            <span className="show-on-mobile-only">Salah</span>
                          </div>
                        )}
                        {isCorrectSlot && isAllCorrect && (
                          <div className="validation-success-tag">
                            <CheckCircle2 size={12} />
                            <span className="hide-on-mobile">Tepat!</span>
                            <span className="show-on-mobile-only">Benar!</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="empty-slot-placeholder">
                        <div className="placeholder-icon">🎯</div>
                        <div className="placeholder-text">
                          <span className="hide-on-mobile">Tarik atau Ketuk Kartu ke Sini</span>
                          <span className="show-on-mobile-only">Pilih Kartu</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Panah Aliran Energi Antar Slot */}
                  {idx < placedCards.length - 1 && (
                    <div
                      className={`energy-arrow-connector ${
                        isAllCorrect ? "energy-flowing" : ""
                      }`}
                      title="Energi Mengalir Ke"
                    >
                      <div className="energy-arrow-line"></div>
                      <div className="energy-flow-pulse">⚡</div>
                      <div className="energy-arrow-tip">▶</div>
                      <span className="energy-arrow-label">Aliran Energi</span>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Zona Baki Kartu Organisme Tersedia */}
        <div className="available-pool-workspace">
          <div className="pool-header-label">
            <span style={{ fontWeight: "700", color: "#1e293b", fontSize: "0.95rem" }}>
              🃏 Pilihan Kartu Makhluk Hidup Sawah ({availableCards.length} Tersedia)
            </span>
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
              Ketuk kartu untuk memasang ke slot berikutnya
            </span>
          </div>

          <div className="available-cards-grid">
            {availableCards.length > 0 ? (
              availableCards.map((card) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={() => handleDragStart(card, "pool")}
                  onClick={() => handleSelectFromPool(card)}
                  className="pool-organism-card"
                  style={{
                    backgroundColor: card.bgColor,
                    borderColor: card.badgeColor + "60"
                  }}
                  title={`Klik untuk memasang ${card.name}`}
                >
                  <div className="pool-card-top">
                    <span className="pool-card-emoji">{card.emoji}</span>
                    <span
                      className="pool-card-role-chip"
                      style={{
                        color: card.badgeColor,
                        backgroundColor: "#ffffff",
                        borderColor: card.badgeColor + "40"
                      }}
                    >
                      <span className="hide-on-mobile">{card.role}</span>
                      <span className="show-on-mobile-only">{card.shortRole || card.role}</span>
                    </span>
                  </div>
                  <div className="pool-card-name">
                    <span className="hide-on-mobile">{card.name}</span>
                    <span className="show-on-mobile-only">{card.shortName || card.name}</span>
                  </div>
                  <div className="pool-card-desc hide-on-mobile">{card.description}</div>
                  <div className="pool-card-action-hint">+ Pasang ke Rantai</div>
                </div>
              ))
            ) : (
              <div className="all-cards-placed-msg">
                <CheckCircle2 size={24} className="text-emerald-600" />
                <span>
                  Semua kartu telah dipasang ke slot! Klik tombol <strong>Periksa Rantai Makanan</strong> di bawah.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="minigame-footer-action-bar">
          <div className="footer-status-text">
            {isAnswerChecked && !isAllCorrect && (
              <span style={{ color: "#dc2626", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px" }}>
                <AlertCircle size={18} />
                Beberapa organisme belum pada urutan yang tepat. Coba periksa peran masing-masing!
              </span>
            )}
            {isAllCorrect && (
              <span style={{ color: "#16a34a", fontWeight: "800", display: "flex", alignItems: "center", gap: "6px" }}>
                <CheckCircle2 size={18} />
                Luar biasa! Susunan rantai makanan dan aliran energi tepat 100%!
              </span>
            )}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleCheckAnswer}
              className="btn-check-chain-action"
              disabled={isAllCorrect}
            >
              <Zap size={18} />
              <span>Periksa Rantai Makanan ⚡</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal Petunjuk Sokratik */}
      {showHintModal && (
        <div className="game-modal-overlay">
          <div className="game-modal-box">
            <div className="game-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "1.5rem" }}>💡</span>
                <h3 style={{ margin: 0, color: "#1e293b", fontSize: "1.15rem" }}>
                  Petunjuk dari SOKRABOT
                </h3>
              </div>
              <button
                onClick={() => setShowHintModal(false)}
                className="game-modal-close-btn"
              >
                ✕
              </button>
            </div>
            <div className="game-modal-body">
              <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#334155" }}>
                {GAME_LEVEL.hint}
              </p>
              <div
                style={{
                  background: "#eff6ff",
                  padding: "0.85rem 1rem",
                  borderRadius: "12px",
                  borderLeft: "4px solid #3b82f6",
                  marginTop: "12px",
                  fontSize: "0.88rem",
                  color: "#1e40af"
                }}
              >
                <strong>💡 Catatan Detektif:</strong>
                <br />
                Panah ➡️ selalu menunjuk dari organisme yang dimakan ke organisme yang memakannya. Ini menandakan bahwa <em>energi kehidupan</em> berpindah ke pemangsa!
              </div>
            </div>
            <div className="game-modal-footer">
              <button
                onClick={() => setShowHintModal(false)}
                className="nav-pill-btn"
                style={{
                  background: "#0284c7",
                  color: "#ffffff",
                  fontWeight: "700",
                  padding: "0.6rem 1.4rem"
                }}
              >
                Saya Mengerti!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Kemenangan & Penjelasan Ilmiah */}
      {showSuccessModal && (
        <div className="game-modal-overlay">
          <div className="game-modal-box success-modal">
            <div className="success-modal-hero">
              <div className="success-star-row">
                <span className="big-star">⭐</span>
                <span className="big-star center-star">⭐</span>
                <span className="big-star">⭐</span>
              </div>
              <h2 className="success-title">Misi Berhasil Terpecahkan!</h2>
              <p className="success-subtitle">
                Kamu berhasil menyusun rantai makanan dengan sempurna!
              </p>
            </div>

            <div className="success-modal-body">
              <div className="concept-explanation-card">
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#065f46", fontWeight: "800", marginBottom: "6px" }}>
                  <Sparkles size={18} />
                  <span>Penjelasan Ilmiah SOKRABOT:</span>
                </div>
                <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: "1.55", color: "#064e3b" }}>
                  {GAME_LEVEL.explanation}
                </p>
                <div style={{ marginTop: "10px", fontSize: "0.88rem", fontWeight: "700", color: "#b45309" }}>
                  ⚡ {GAME_LEVEL.energyExplanation}
                </div>
              </div>
            </div>

            <div className="success-modal-footer">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="nav-pill-btn"
                style={{
                  background: "#f1f5f9",
                  color: "#475569",
                  border: "1.5px solid #cbd5e1"
                }}
              >
                Tinjau Rantai
              </button>

              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  onGoToMap();
                }}
                className="nav-pill-btn"
                style={{
                  background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                  color: "#ffffff",
                  fontWeight: "800",
                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.35)",
                  padding: "0.65rem 1.5rem"
                }}
              >
                <span>Selesai & Buka Peta Misi 🏆</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
