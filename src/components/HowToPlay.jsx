import React from "react";
import { Compass, MessageCircleQuestion, Lightbulb } from "lucide-react";

export default function HowToPlay() {
  const steps = [
    {
      number: "01",
      icon: <Compass size={22} />,
      title: "Temukan Misi",
      desc: "Pilih misi pembelajaran yang ingin kamu selesaikan, mulai dari Sawah Pak Budi hingga Hutan Rimba.",
      accent: "green"
    },
    {
      number: "02",
      icon: <MessageCircleQuestion size={22} />,
      title: "Jawab Pertanyaan",
      desc: "Jawab pertanyaan dari Timi si Robot Belajar menggunakan tombol pilihan yang tersedia.",
      accent: "sky"
    },
    {
      number: "03",
      icon: <Lightbulb size={22} />,
      title: "Temukan Jawabannya",
      desc: "Jika salah, chatbot TIDAK langsung memberi kunci jawaban, melainkan memandumu berpikir sampai paham!",
      accent: "amber"
    }
  ];

  return (
    <section className="section-wrapper" id="how-to-play-section">
      <div className="section-header">
        <span className="section-header-tag">Cara Kerja Pembelajaran</span>
        <h2>Bagaimana Cara Bermain? 🎮</h2>
        <p>Belajar IPA jadi seru layaknya bermain game detektif alam</p>
      </div>

      <div className="steps-grid">
        {steps.map((step) => (
          <div className="step-card" key={step.number}>
            <div className="step-number-badge">
              {step.number}
            </div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
