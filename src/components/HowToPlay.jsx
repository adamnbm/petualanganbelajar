import React from "react";
import { Compass, MessageCircleQuestion, Lightbulb } from "lucide-react";

export default function HowToPlay() {
  const steps = [
    {
      number: "01",
      icon: <Compass size={22} />,
      title: "Pilih Pos Misi",
      desc: "Pilih pos pengamatan sains yang ingin kamu selidiki bersama SOKRABOT di Sawah Pak Budi.",
      accent: "green"
    },
    {
      number: "02",
      icon: <MessageCircleQuestion size={22} />,
      title: "Ketik Analisismu",
      desc: "Ketik pendapat dan alasanmu sendiri di kolom obrolan interaktif — murni diskusi langsung dengan AI!",
      accent: "sky"
    },
    {
      number: "03",
      icon: <Lightbulb size={22} />,
      title: "Paham Secara Mandiri",
      desc: "SOKRABOT memandu jalan pikiranmu melalui pertanyaan pemandu bertahap hingga kamu menemukan jawaban yang tepat!",
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
