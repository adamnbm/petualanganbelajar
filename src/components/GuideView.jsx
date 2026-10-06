import React from "react";
import {
  HelpCircle,
  ArrowLeft,
  Sparkles,
  Search,
  MessageSquare,
  Star,
  BookOpen,
  Award,
  ShieldCheck
} from "lucide-react";

export default function GuideView({ onBackToMenu, onGoToMap }) {
  return (
    <div className="guide-view-container">
      {/* Top Bar Navigasi */}
      <div className="guide-top-bar">
        <button onClick={onBackToMenu} className="btn-back-map" id="btn-back-to-menu-from-guide">
          <ArrowLeft size={20} />
          <span>Kembali ke Menu Utama</span>
        </button>

        <div className="guide-header-center">
          <h1 className="guide-main-title">Petunjuk Bermain 💡</h1>
          <p className="guide-sub-title">Panduan Investigasi Sains Socratic bersama SOKRABOT</p>
        </div>

        <button onClick={onGoToMap} className="btn-quick-to-map">
          <span>Menuju Peta Misi ➔</span>
        </button>
      </div>

      {/* Guide Hero Mascot */}
      <div className="guide-hero-box">
        <img
          src="/sokrabot_mascot.png"
          alt="SOKRABOT Detective"
          className="guide-hero-mascot"
        />
        <div className="guide-hero-content">
          <h2>Selamat Datang di Markas Detektif SOKRABOT!</h2>
          <p>
            Di sini kamu bukan sekadar menghafal nama-nama hewan, melainkan berlatih menjadi ilmuwan sejati yang memahami <strong>aliran energi</strong> dan <strong>keseimbangan jaring kehidupan sawah</strong>. Yuk pelajari cara memecahkan misi bersama SOKRABOT!
          </p>
        </div>
      </div>

      {/* 4 Steps Guide Cards */}
      <div className="guide-steps-grid">
        {/* Step 1 */}
        <div className="guide-step-card">
          <div className="step-badge">Langkah 1</div>
          <div className="step-icon-circle bg-emerald">
            <Search size={28} className="text-white" />
          </div>
          <h3>Pilih Misi di Peta Sawah</h3>
          <p>
            Mulailah dari <strong>Misi 1: Siapa Aku? (Peran Produsen)</strong>. Misi-misi berikutnya akan terbuka secara bertahap (Level Lock 1-5) setelah kamu berhasil menyelesaikan misi sebelumnya!
          </p>
        </div>

        {/* Step 2 */}
        <div className="guide-step-card">
          <div className="step-badge">Langkah 2</div>
          <div className="step-icon-circle bg-blue">
            <MessageSquare size={28} className="text-white" />
          </div>
          <h3>Berpikir Kritis bersama SOKRABOT</h3>
          <p>
            SOKRABOT tidak akan pernah bilang <em>"Kamu salah!"</em>. Jika jawabanmu belum tepat, SOKRABOT akan mengajukan pertanyaan pemandu yang seru agar kamu menemukan jawabannya sendiri!
          </p>
        </div>

        {/* Step 3 */}
        <div className="guide-step-card">
          <div className="step-badge">Langkah 3</div>
          <div className="step-icon-circle bg-amber">
            <Star size={28} className="text-white" />
          </div>
          <h3>Gunakan Petunjuk Bertingkat (H1-H3)</h3>
          <p>
            Butuh bantuan? Buka petunjuk:
            <br />• <strong>H1</strong>: Petunjuk berpikir konsep dasar.
            <br />• <strong>H2</strong>: Petunjuk kaitan mendalam.
            <br />• <strong>H3</strong>: Diagram visual interaktif organ/domino!
          </p>
        </div>

        {/* Step 4 */}
        <div className="guide-step-card">
          <div className="step-badge">Langkah 4</div>
          <div className="step-icon-circle bg-purple">
            <Award size={28} className="text-white" />
          </div>
          <h3>Buka Buku Pintar & Koleksi Lencana</h3>
          <p>
            Tuntaskan setiap pos untuk membuka kartu konsep ilmiah sejati di <strong>Buku Pintar</strong> dan kumpulkan 5 lencana prestisius hingga menjadi <strong>Penjaga Keseimbangan Sawah</strong>!
          </p>
        </div>
      </div>

      {/* Socratic Dialogue Example (From PRD Page 2) */}
      <div className="guide-example-container">
        <h3 className="example-title">
          <Sparkles size={20} className="text-amber-500" />
          <span>Contoh Alur Percakapan Socratic Nyata:</span>
        </h3>

        <div className="socratic-chat-preview">
          <div className="chat-bubble-sample bot">
            <span className="bubble-speaker">SOKRABOT:</span>
            <p>"Lihat Tikus dan Ular. Jika Ular memakan Tikus, ke mana arah panah yang benar?"</p>
          </div>

          <div className="chat-bubble-sample user">
            <span className="bubble-speaker">Detektif Cilik:</span>
            <p>"Ular ➔ Tikus (karena Ular yang berjalan memakan Tikus)."</p>
          </div>

          <div className="chat-bubble-sample bot">
            <span className="bubble-speaker">SOKRABOT:</span>
            <p>"Jika Tikus dimakan Ular, tubuh siapa yang kenyang dan menerima energi makanan?"</p>
          </div>

          <div className="chat-bubble-sample user">
            <span className="bubble-speaker">Detektif Cilik:</span>
            <p>"Tubuh Ular yang mendapat energi!"</p>
          </div>

          <div className="chat-bubble-sample bot highlight-win">
            <span className="bubble-speaker">SOKRABOT:</span>
            <p>"Tepat sekali! Jika panah adalah SIMBOL ENERGI, dari mana energi itu berasal dan berpindah?"</p>
          </div>

          <div className="chat-bubble-sample user highlight-win">
            <span className="bubble-speaker">Detektif Cilik:</span>
            <p>"Dari Tikus ke Ular! Jadi arah panahnya Tikus ➔ Ular! 🎉"</p>
          </div>
        </div>
      </div>
    </div>
  );
}
