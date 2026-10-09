import React from "react";
import {
  ArrowLeft,
  Rocket,
  Map,
  Search,
  Lightbulb,
  MessageSquare,
  Bot,
  RotateCcw,
  Star,
  ShieldCheck,
  CheckCircle2,
  Trophy,
} from "lucide-react";

const STEPS = [
  {
    badge: "Langkah 1",
    title: "1. Mulai Petualangan 🚀",
    description: "Buka permainan SOKRABOT, kemudian tekan tombol untuk memulai petualanganmu.",
    Icon: Rocket,
    color: "bg-emerald",
  },
  {
    badge: "Langkah 2",
    title: "2. Pilih Misi 🗺️",
    description:
      "Ikuti misi yang tersedia secara berurutan. Setiap misi memiliki tantangan yang harus kamu selesaikan.",
    Icon: Map,
    color: "bg-blue",
  },
  {
    badge: "Langkah 3",
    title: "3. Amati dan Pahami 🔍",
    description:
      "Baca cerita, perhatikan gambar, dan pahami pertanyaan yang diberikan sebelum menjawab.",
    Icon: Search,
    color: "bg-amber",
  },
  {
    badge: "Langkah 4",
    title: "4. Pilih Jawabanmu 💡",
    description:
      "Pilih jawaban yang menurutmu paling tepat. Jangan terburu-buru! Gunakan pengetahuan dan pemikiranmu sendiri.",
    Icon: Lightbulb,
    color: "bg-yellow",
  },
  {
    badge: "Langkah 5",
    title: "5. Jelaskan Alasanmu 💬",
    description:
      'SOKRABOT mungkin akan bertanya, "Mengapa kamu memilih jawaban itu?" Jelaskan alasanmu sesuai dengan apa yang kamu pikirkan.',
    Icon: MessageSquare,
    color: "bg-purple",
  },
  {
    badge: "Langkah 6",
    title: "6. Ikuti Pertanyaan SOKRABOT 🤖",
    description:
      "SOKRABOT akan membantumu melalui pertanyaan dan petunjuk. Pikirkan kembali jawabanmu jika menemukan sesuatu yang berbeda.",
    Icon: Bot,
    color: "bg-teal",
  },
  {
    badge: "Langkah 7",
    title: "7. Perbaiki Pemahamanmu 🔄",
    description:
      "Jika jawabanmu belum tepat, jangan menyerah! Perhatikan petunjuk, pikirkan kembali, dan coba temukan jawaban yang lebih tepat.",
    Icon: RotateCcw,
    color: "bg-rose",
  },
  {
    badge: "Langkah 8",
    title: "8. Selesaikan Semua Misi ⭐",
    description:
      "Teruslah berpetualang hingga seluruh misi selesai. Periksa kembali apa yang telah kamu pelajari!",
    Icon: Star,
    color: "bg-indigo",
  },
];

const RULES = [
  "Kerjakan setiap misi dengan jujur dan mandiri.",
  "Bacalah pertanyaan dengan teliti.",
  "Beranilah menjawab dan menyampaikan alasan.",
  "Tidak perlu takut salah karena kesalahan adalah bagian dari belajar.",
  "Gunakan petunjuk untuk menemukan jawaban, bukan sekadar menebak.",
];

export default function GuideView({ onBackToMenu, onGoToMap }) {
  return (
    <div className="guide-view-container">
      {/* ── Top Bar ── */}
      <div className="guide-top-bar">
        <button
          onClick={onBackToMenu}
          className="btn-back-map"
          id="btn-back-to-menu-from-guide"
        >
          <ArrowLeft size={20} />
          <span>Kembali ke Menu Utama</span>
        </button>

        <div className="guide-header-center">
          <h1 className="guide-main-title">🌾 PETUNJUK BERMAIN SOKRABOT</h1>
          <p className="guide-sub-title">Petualangan Rantai Makanan</p>
        </div>

        <button
          onClick={onGoToMap}
          className="btn-quick-to-map"
          id="btn-quick-to-map"
        >
          <span>Menuju Peta Misi ➔</span>
        </button>
      </div>

      {/* ── Hero / Greeting ── */}
      <div className="guide-hero-box">
        <img
          src="/sokrabot_mascot.png"
          alt="SOKRABOT"
          className="guide-hero-mascot"
        />
        <div className="guide-hero-content">
          <h2>Halo, Petualang Cilik! 👋</h2>
          <p>
            Selamat datang di SOKRABOT! Di sini, kamu akan menjadi seorang
            penjelajah yang bertugas memecahkan berbagai misteri rantai makanan.
          </p>
          <p className="guide-hero-highlight">
            Siapkan dirimu untuk berpikir, menjawab pertanyaan, dan
            menyelesaikan setiap misi!
          </p>
        </div>
      </div>

      {/* ── Cara Bermain ── */}
      <div className="guide-section">
        <h2 className="guide-section-title">🎮 Cara Bermain</h2>
        <div className="guide-steps-grid">
          {STEPS.map((step) => (
            <div key={step.badge} className="guide-step-card">
              <div className="step-badge">{step.badge}</div>
              <div className={`step-icon-circle ${step.color}`}>
                <step.Icon size={26} className="text-white" />
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Aturan Petualang Hebat ── */}
      <div className="guide-rules-container">
        <div className="guide-rules-header">
          <div className="guide-rules-icon-badge">
            <ShieldCheck size={26} />
          </div>
          <h2 className="guide-rules-title">🌟 Aturan Petualang Hebat</h2>
        </div>
        <div className="guide-rules-list">
          {RULES.map((rule, i) => (
            <div key={i} className="guide-rule-item">
              <CheckCircle2 size={20} className="rule-check-icon" />
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Ingat! Quote ── */}
      <div className="guide-quote-box">
        <div className="guide-quote-trophy">
          <Trophy size={40} className="trophy-gold-icon" />
        </div>
        <div className="guide-quote-content">
          <h3 className="guide-quote-title">🏆 Ingat!</h3>
          <p className="guide-quote-text">
            <em>
              "Di SOKRABOT, petualang hebat bukanlah yang selalu menjawab
              benar, tetapi yang berani berpikir, bertanya, dan memperbaiki
              pemahamannya."
            </em>
          </p>
          <p className="guide-farewell">
            <em>Selamat berpetualang! 🌾🐭🐍🦅</em>
          </p>
          <div className="guide-cta-wrapper">
            <button
              onClick={onGoToMap}
              className="btn-start-adventure"
              id="btn-guide-start-adventure"
            >
              <Rocket size={18} />
              <span>Mulai Petualangan 🚀</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
