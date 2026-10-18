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

// Master Data Level Permainan Rantai Makanan & Aliran Energi
const GAME_LEVELS = [
  {
    id: 1,
    title: "Level 1: Rantai Makanan Dasar Sawah",
    subTitle: "Susun 4 Tingkat Trofik dari Produsen hingga Pengurai",
    difficulty: "Mudah",
    difficultyColor: "#059669",
    hint: "Ingat: Mulailah dari makhluk hidup yang membuat makanannya sendiri (Produsen), lalu hewan yang memakannya, hingga pengurai di akhir!",
    explanation:
      "Bagus sekali! Rantai makanan selalu dimulai dari Produsen (Tanaman Padi) yang membuat makanan sendiri, lalu dimakan oleh Konsumen I (Belalang), kemudian Konsumen II (Katak), dan saat mati akan diurai oleh Pengurai (Jamur).",
    energyExplanation:
      "Arah panah (➡️) menunjukkan arah aliran energi yang diserap dari makanan, BUKAN siapa yang memburu siapa!",
    correctOrder: [
      {
        id: "padi",
        name: "Tanaman Padi",
        scientificName: "Oryza sativa",
        emoji: "🌾",
        role: "Produsen",
        roleType: "producer",
        description: "Menghasilkan makanan sendiri lewat fotosintesis dengan bantuan sinar matahari.",
        badgeColor: "#10b981",
        bgColor: "#ecfdf5"
      },
      {
        id: "belalang",
        name: "Belalang Sawah",
        scientificName: "Oxya chinensis",
        emoji: "🦗",
        role: "Konsumen I (Herbivora)",
        roleType: "consumer_1",
        description: "Memakan daun padi untuk mendapatkan energi pertamanya.",
        badgeColor: "#0284c7",
        bgColor: "#f0f9ff"
      },
      {
        id: "katak",
        name: "Katak Sawah",
        scientificName: "Fejervarya cancrivora",
        emoji: "🐸",
        role: "Konsumen II (Karnivora)",
        roleType: "consumer_2",
        description: "Memangsa serangga seperti belalang di sela-sela rumpun padi.",
        badgeColor: "#ea580c",
        bgColor: "#fff7ed"
      },
      {
        id: "jamur",
        name: "Jamur Pengurai",
        scientificName: "Fungi Decomposer",
        emoji: "🍄",
        role: "Pengurai (Dekomposer)",
        roleType: "decomposer",
        description: "Menguraikan sisa makhluk hidup mati menjadi zat hara untuk menyuburkan tanah.",
        badgeColor: "#7c3aed",
        bgColor: "#f5f3ff"
      }
    ]
  },
  {
    id: 2,
    title: "Level 2: Misteri Hama Tikus & Ular",
    subTitle: "Susun Rantai 5 Tingkat Menuju Predator Puncak",
    difficulty: "Sedang",
    difficultyColor: "#d97706",
    hint: "Padi dimakan oleh hama pengerat sawah. Siapakah pemangsa alaminya sebelum akhirnya dimangsa oleh burung predator besar?",
    explanation:
      "Hebat! Jika ular sawah dibasmi oleh manusia, populasi tikus akan meledak dan menghabiskan padi Pak Budi. Ular dan Elang sangat penting sebagai pengendali hama alami!",
    energyExplanation:
      "Energi berpindah dari Padi ➔ Tikus ➔ Ular ➔ Elang ➔ Jamur. Setiap pemangsa menyerap sebagian energi dari mangsanya.",
    correctOrder: [
      {
        id: "padi",
        name: "Tanaman Padi",
        scientificName: "Oryza sativa",
        emoji: "🌾",
        role: "Produsen",
        roleType: "producer",
        description: "Menghasilkan bulir padi sumber energi utama di sawah.",
        badgeColor: "#10b981",
        bgColor: "#ecfdf5"
      },
      {
        id: "tikus",
        name: "Tikus Sawah",
        scientificName: "Rattus argentiventer",
        emoji: "🐭",
        role: "Konsumen I (Herbivora)",
        roleType: "consumer_1",
        description: "Memakan biji dan batang padi pada malam hari.",
        badgeColor: "#0284c7",
        bgColor: "#f0f9ff"
      },
      {
        id: "ular",
        name: "Ular Sawah",
        scientificName: "Ptyas korros",
        emoji: "🐍",
        role: "Konsumen II (Karnivora)",
        roleType: "consumer_2",
        description: "Predator alami pemburu tikus yang menjaga kelestarian padi.",
        badgeColor: "#ea580c",
        bgColor: "#fff7ed"
      },
      {
        id: "elang",
        name: "Burung Elang",
        scientificName: "Haliaeetus leucogaster",
        emoji: "🦅",
        role: "Konsumen Puncak (Apex)",
        roleType: "apex",
        description: "Burung pemangsa puncak yang memangsa ular dan hewan kecil lainnya.",
        badgeColor: "#b91c1c",
        bgColor: "#fef2f2"
      },
      {
        id: "bakteri_jamur",
        name: "Bakteri & Jamur",
        scientificName: "Mikroorganisme Pengurai",
        emoji: "🦠",
        role: "Pengurai (Dekomposer)",
        roleType: "decomposer",
        description: "Mengembalikan unsur hara bangkai elang ke tanah sawah.",
        badgeColor: "#7c3aed",
        bgColor: "#f5f3ff"
      }
    ]
  },
  {
    id: 3,
    title: "Level 3: Rantai Daun & Burung Pipit",
    subTitle: "Variasi Rantai Makanan dengan Serangga & Burung",
    difficulty: "Menantang",
    difficultyColor: "#dc2626",
    hint: "Ulat daun memakan dedaunan padi. Burung kecil memakannya, lalu burung kecil menjadi santapan ular sawah!",
    explanation:
      "Luar biasa! Di sawah terdapat banyak rantai makanan yang saling berhubungan. Kumpulan dari beberapa rantai makanan ini disebut Jaring-Jaring Makanan (Food Web)!",
    energyExplanation:
      "Panah energi membuktikan bahwa semua energi hewan karnivora secara tidak langsung berasal dari tanaman padi!",
    correctOrder: [
      {
        id: "padi",
        name: "Tanaman Padi",
        scientificName: "Oryza sativa",
        emoji: "🌾",
        role: "Produsen",
        roleType: "producer",
        description: "Menghasilkan daun hijau segar lewat fotosintesis.",
        badgeColor: "#10b981",
        bgColor: "#ecfdf5"
      },
      {
        id: "ulat",
        name: "Ulat Daun",
        scientificName: "Spodoptera litura",
        emoji: "🐛",
        role: "Konsumen I (Herbivora)",
        roleType: "consumer_1",
        description: "Memakan daun padi muda hingga berlubang.",
        badgeColor: "#0284c7",
        bgColor: "#f0f9ff"
      },
      {
        id: "burung_pipit",
        name: "Burung Pipit",
        scientificName: "Lonchura punctulata",
        emoji: "🐦",
        role: "Konsumen II (Insektivora)",
        roleType: "consumer_2",
        description: "Burung kecil lincah yang mematuk ulat dan serangga.",
        badgeColor: "#ea580c",
        bgColor: "#fff7ed"
      },
      {
        id: "ular",
        name: "Ular Sawah",
        scientificName: "Ptyas korros",
        emoji: "🐍",
        role: "Konsumen III (Karnivora)",
        roleType: "consumer_3",
        description: "Menyergap burung pipit yang hinggap di tangkai padi.",
        badgeColor: "#c2410c",
        bgColor: "#fff7ed"
      },
      {
        id: "elang",
        name: "Burung Elang",
        scientificName: "Haliaeetus leucogaster",
        emoji: "🦅",
        role: "Konsumen Puncak (Apex)",
        roleType: "apex",
        description: "Penguasa udara sawah yang memburu ular dari angkasa.",
        badgeColor: "#b91c1c",
        bgColor: "#fef2f2"
      }
    ]
  },
  {
    id: 4,
    title: "Level 4: Sumber Energi Utama Seluruh Kehidupan",
    subTitle: "Lacak Aliran Energi Lengkap Dimulai dari Sang Surya",
    difficulty: "Master Sains",
    difficultyColor: "#9333ea",
    hint: "Dari manakah padi mendapatkan energi pertamanya sebelum dimakan hewan? Mulailah dari sumber energi terbesar di bumi!",
    explanation:
      "Sempurna! Kamu telah membuktikan konsep inti IPA: Matahari adalah sumber energi utama bagi seluruh ekosistem di bumi. Padi menyerap cahaya matahari lewat klorofil daun, lalu energi mengalir ke seluruh rantai makanan!",
    energyExplanation:
      "Aliran energi mengalir satu arah: Matahari ➔ Padi ➔ Belalang ➔ Katak ➔ Ular ➔ Elang!",
    correctOrder: [
      {
        id: "matahari",
        name: "Cahaya Matahari",
        scientificName: "Sumber Energi Utama",
        emoji: "☀️",
        role: "Sumber Energi Terbesar",
        roleType: "sun",
        description: "Memancarkan energi cahaya yang diserap oleh klorofil tanaman.",
        badgeColor: "#eab308",
        bgColor: "#fefce8"
      },
      {
        id: "padi",
        name: "Tanaman Padi",
        scientificName: "Oryza sativa",
        emoji: "🌾",
        role: "Produsen Mandiri",
        roleType: "producer",
        description: "Mengubah energi cahaya menjadi makanan (glukosa) lewat fotosintesis.",
        badgeColor: "#10b981",
        bgColor: "#ecfdf5"
      },
      {
        id: "belalang",
        name: "Belalang Sawah",
        scientificName: "Oxya chinensis",
        emoji: "🦗",
        role: "Konsumen I",
        roleType: "consumer_1",
        description: "Menghisap cairan daun dan memakan daun padi.",
        badgeColor: "#0284c7",
        bgColor: "#f0f9ff"
      },
      {
        id: "katak",
        name: "Katak Sawah",
        scientificName: "Fejervarya cancrivora",
        emoji: "🐸",
        role: "Konsumen II",
        roleType: "consumer_2",
        description: "Menangkap belalang dengan lidahnya yang panjang dan lengket.",
        badgeColor: "#ea580c",
        bgColor: "#fff7ed"
      },
      {
        id: "ular",
        name: "Ular Sawah",
        scientificName: "Ptyas korros",
        emoji: "🐍",
        role: "Konsumen III",
        roleType: "consumer_3",
        description: "Membelit dan menelan katak sawah secara utuh.",
        badgeColor: "#c2410c",
        bgColor: "#fff7ed"
      },
      {
        id: "elang",
        name: "Burung Elang",
        scientificName: "Haliaeetus leucogaster",
        emoji: "🦅",
        role: "Konsumen Puncak",
        roleType: "apex",
        description: "Mencengkeram ular dengan cakar tajamnya yang kuat.",
        badgeColor: "#b91c1c",
        bgColor: "#fef2f2"
      }
    ]
  }
];

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
  const [selectedLevelId, setSelectedLevelId] = useState(1);
  const currentLevel = GAME_LEVELS.find((lvl) => lvl.id === selectedLevelId) || GAME_LEVELS[0];

  // Game Play State
  const [placedCards, setPlacedCards] = useState([]); // array of card objects placed in slots [slot0, slot1, ...]
  const [availableCards, setAvailableCards] = useState([]); // cards waiting in pool
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);
  const [incorrectIndices, setIncorrectIndices] = useState([]);
  const [showHintModal, setShowHintModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Level Progression Storage
  const [completedLevels, setCompletedLevels] = useState(() => {
    try {
      const saved = localStorage.getItem("sokrabot_food_chain_levels");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Inisialisasi Level Baru
  useEffect(() => {
    initLevel(currentLevel);
  }, [selectedLevelId]);

  const initLevel = (level) => {
    setPlacedCards(new Array(level.correctOrder.length).fill(null));
    setAvailableCards(shuffleArray(level.correctOrder));
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
    if (emptyIndex === -1) return; // slot penuh

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

    // Pastikan semua slot terisi
    const hasEmptySlot = placedCards.some((c) => c === null);
    if (hasEmptySlot) {
      soundManager.playHint();
      alert("⚠️ Semua slot rantai makanan harus terisi terlebih dahulu!");
      return;
    }

    const wrongList = [];
    placedCards.forEach((card, idx) => {
      if (!card || card.id !== currentLevel.correctOrder[idx].id) {
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
      const newCompleted = {
        ...completedLevels,
        [currentLevel.id]: {
          stars: attempts === 0 ? 3 : attempts <= 2 ? 2 : 1,
          completedAt: new Date().toISOString()
        }
      };
      setCompletedLevels(newCompleted);
      try {
        localStorage.setItem("sokrabot_food_chain_levels", JSON.stringify(newCompleted));
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
    initLevel(currentLevel);
  };

  // Beralih Level
  const handleSwitchLevel = (lvlId) => {
    soundManager.playClick();
    setSelectedLevelId(lvlId);
  };

  // Lanjut Level Berikutnya
  const handleNextLevel = () => {
    if (selectedLevelId < GAME_LEVELS.length) {
      handleSwitchLevel(selectedLevelId + 1);
    } else {
      setShowSuccessModal(false);
      onGoToMap();
    }
  };

  return (
    <div className="minigame-container-root">
      {/* Top Header Bar */}
      <div className="minigame-header-card">
        <div className="minigame-header-left">
          <button
            onClick={onBackToMenu}
            className="nav-pill-btn"
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

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="minigame-badge-chip">🎮 Minigame Interaktif</span>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "800",
                  padding: "2px 8px",
                  borderRadius: "999px",
                  background: currentLevel.difficultyColor + "20",
                  color: currentLevel.difficultyColor
                }}
              >
                {currentLevel.difficulty}
              </span>
            </div>
            <h1 className="minigame-title">Arena Rantai Makanan & Aliran Energi</h1>
          </div>
        </div>

        {/* Level Selector Pills */}
        <div className="minigame-level-selector">
          {GAME_LEVELS.map((lvl) => {
            const isCompleted = completedLevels[lvl.id];
            const isCurrent = lvl.id === selectedLevelId;
            return (
              <button
                key={lvl.id}
                onClick={() => handleSwitchLevel(lvl.id)}
                className={`minigame-lvl-tab-btn ${isCurrent ? "active" : ""}`}
                title={lvl.title}
              >
                <span>Level {lvl.id}</span>
                {isCompleted && (
                  <span style={{ color: "#f59e0b", fontSize: "0.8rem", marginLeft: "4px" }}>
                    ⭐
                  </span>
                )}
              </button>
            );
          })}
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
                {currentLevel.title}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#047857" }}>
                {currentLevel.subTitle}
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
              <span className="show-on-mobile-only">Geser rantai 👉 | Ketuk kartu untuk batal</span>
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
                        {currentLevel.correctOrder[idx]?.role.split(" ")[0]}
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
                        <div className="organism-title">{card.name}</div>
                        <div
                          className="organism-role-badge"
                          style={{
                            color: card.badgeColor,
                            backgroundColor: "#ffffff",
                            border: `1px solid ${card.badgeColor}40`
                          }}
                        >
                          {card.role}
                        </div>

                        {/* Status Validasi */}
                        {isWrong && (
                          <div className="validation-error-tag">
                            <AlertCircle size={12} />
                            <span>Posisi Belum Tepat</span>
                          </div>
                        )}
                        {isCorrectSlot && isAllCorrect && (
                          <div className="validation-success-tag">
                            <CheckCircle2 size={12} />
                            <span>Tepat!</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="empty-slot-placeholder">
                        <div className="placeholder-icon">📥</div>
                        <div className="placeholder-text">Tarik atau Ketuk Kartu ke Sini</div>
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
                      {card.role}
                    </span>
                  </div>
                  <div className="pool-card-name">{card.name}</div>
                  <div className="pool-card-desc">{card.description}</div>
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
                {currentLevel.hint}
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
                  {currentLevel.explanation}
                </p>
                <div style={{ marginTop: "10px", fontSize: "0.88rem", fontWeight: "700", color: "#b45309" }}>
                  ⚡ {currentLevel.energyExplanation}
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
                onClick={handleNextLevel}
                className="nav-pill-btn"
                style={{
                  background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                  color: "#ffffff",
                  fontWeight: "800",
                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.35)",
                  padding: "0.65rem 1.5rem"
                }}
              >
                <span>
                  {selectedLevelId < GAME_LEVELS.length
                    ? "Lanjut ke Level Berikutnya ➡️"
                    : "Selesai & Buka Peta Misi 🏆"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
