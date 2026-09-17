import React from "react";
import { ArrowRight, Sparkles, Compass, Lightbulb, ShieldCheck } from "lucide-react";

export default function LandingHero({ onStartAdventure, onExploreMissions }) {
  return (
    <section className="hero-section">
      <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-tag">
            <Sparkles size={16} />
            <span>Chatbot Pembelajaran Interaktif Siswa SD</span>
          </div>

          <h1 className="hero-title">
            Yuk, Belajar Sambil <span className="highlight-green">Bertualang!</span> 🌱
          </h1>

          <p className="hero-description">
            Temukan jawaban melalui berbagai misi pembelajaran interaktif. 
            Bersama <strong>Timi Si Robot Belajar</strong>, kamu tidak sekadar menghafal, 
            tetapi diajak berpikir dan menyelidiki sains langkah demi langkah!
          </p>

          <div className="hero-cta-group">
            <button
              className="btn-primary-adventure"
              onClick={onStartAdventure}
              id="cta-start-adventure"
            >
              <span>Mulai Petualangan</span>
              <ArrowRight size={20} />
            </button>

            <button
              className="btn-secondary-outline"
              onClick={onExploreMissions}
              id="cta-explore-missions"
            >
              <Compass size={18} />
              <span>Lihat Pilihan Misi</span>
            </button>
          </div>
        </div>

        <div className="hero-character-card">
          <div className="mascot-backdrop-glow"></div>
          <div className="mascot-card-inner">
            <div className="mascot-avatar-large">
              🤖
            </div>
            <span className="mascot-badge">Sahabat Belajarmu</span>
            <h3>Halo, Aku Timi! 👋</h3>
            <p>
              "Aku akan memandumu memecahkan teka-teki alam di Sawah Pak Budi. 
              Jika kamu belum tepat menjawab, jangan khawatir—kita akan cari tahu bersama!"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
