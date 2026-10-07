import React, { useEffect, useRef } from "react";
import { Sparkles, Eye, Lightbulb, Bot } from "lucide-react";

export default function ChatMessageList({
  messages,
  isBotTyping,
  studentName = "Detektif",
  onOpenVisualHint,
}) {
  const scrollEndRef = useRef(null);

  useEffect(() => {
    if (scrollEndRef.current) {
      scrollEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, isBotTyping]);

  return (
    <div className="chat-messages-viewport" id="chat-viewport">
      {messages.map((msg) => {
        const isBot = msg.sender === "bot";
        const isAI = Boolean(msg.isAIGenerated);

        let feedbackClass = "";
        if (isAI) {
          feedbackClass = msg.isCorrect
            ? "bubble-ai-correct"
            : "bubble-ai-guide";
        } else if (msg.isFeedback) {
          feedbackClass = msg.isCorrect ? "feedback-correct" : "feedback-hint";
        } else if (msg.isHint) {
          feedbackClass = "feedback-hint-message";
        }

        return (
          <div key={msg.id} className={`message-row ${isBot ? "bot" : "user"}`}>
            {isBot && (
              <div
                className={`message-avatar avatar-bot ${isAI ? "avatar-gemini-ai" : ""}`}
                title={
                  isAI
                    ? "Respon dari Gemini AI"
                    : "Pemandu SOKRABOT (Alur Misi)"
                }
              >
                <img
                  src="/sokrabot_mascot.png"
                  alt="SOKRABOT"
                  className="avatar-mascot-img"
                />
                {isAI && (
                  <span className="avatar-ai-mini-badge" title="Gemini AI">
                    ✨
                  </span>
                )}
              </div>
            )}

            <div className="message-bubble-wrapper">
              <div
                className={`message-bubble ${feedbackClass} ${isAI ? "is-ai-response" : isBot ? "is-system-response" : ""}`}
              >
                {/* ── Banner Penanda Sumber Balasan (Gemini AI vs Bukan AI) ── */}
                {isBot && (
                  <div
                    className={`message-source-banner ${isAI ? "source-banner-ai" : msg.isHint ? "source-banner-hint" : "source-banner-system"}`}
                  >
                    {isAI ? (
                      <>
                        <div className="banner-left">
                          <span className="ai-pulsing-circle" />
                          <Sparkles size={13} className="banner-icon-ai" />
                          <span className="banner-title-ai">
                            Respon: <strong>Gemini AI (Live)</strong>
                          </span>
                        </div>
                        <div className="banner-right">
                          {msg.isFeedback && (
                            <span
                              className={`banner-status-tag ${msg.isCorrect ? "tag-aligned" : "tag-guide"}`}
                            >
                              {msg.isCorrect
                                ? "🌟 Alasan Tepat"
                                : "🤔 Bimbingan Socratic"}
                            </span>
                          )}
                          <span className="banner-pill-ai">✨ AI</span>
                        </div>
                      </>
                    ) : msg.isHint ? (
                      <>
                        <div className="banner-left">
                          <Lightbulb size={13} className="banner-icon-hint" />
                          <span className="banner-title-hint">
                            Bukan AI •{" "}
                            <strong>
                              Petunjuk {msg.hintLevel?.toUpperCase() || "H1"}
                            </strong>
                          </span>
                        </div>
                        <div className="banner-right">
                          <span className="banner-pill-system">
                            💡 Petunjuk
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="banner-left">
                          <Bot size={13} className="banner-icon-system" />
                          <span className="banner-title-system">
                            Pemandu: <strong>SOKRABOT</strong>
                          </span>
                        </div>
                        <div className="banner-right">
                          <span className="banner-pill-system">
                            Bukan AI • Alur Misi
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Contextual Illustration from Scenario */}
                {msg.image && (
                  <div className="bubble-context-image-box">
                    <img
                      src={msg.image}
                      alt={msg.imageAlt || "Ilustrasi Skenario"}
                      className="bubble-context-image"
                      loading="lazy"
                    />
                    {msg.imageCaption && (
                      <div className="bubble-image-caption">
                        <span>🔍 {msg.imageCaption}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Message Text Content */}
                <div className="bubble-text-content">
                  {msg.text.split("\n").map((line, idx) => (
                    <React.Fragment key={idx}>
                      {line}
                      {idx < msg.text.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>

                {/* Quick button to open visual diagram if H3 was given */}
                {msg.hintLevel === "h3" && onOpenVisualHint && (
                  <button
                    onClick={onOpenVisualHint}
                    className="btn-open-diagram-inline"
                  >
                    <Eye size={16} />
                    <span>Lihat Diagram Visual Besar 🔍</span>
                  </button>
                )}
              </div>

              {/* Footer Meta dengan Penanda Jelas */}
              <div className="message-meta-footer">
                <span className="message-timestamp">{msg.timestamp}</span>
                {/* {isBot && (
                  <span
                    className={`meta-source-chip ${isAI ? "chip-ai" : "chip-system"}`}
                  >
                    {isAI ? "✨ Balasan Gemini AI" : "📜 Alur Skenario Belajar"}
                  </span>
                )} */}
              </div>
            </div>

            {!isBot && (
              <div
                className="message-avatar avatar-user"
                title={`Detektif ${studentName}`}
              >
                🔍
              </div>
            )}
          </div>
        );
      })}

      {/* Typing Indicator */}
      {isBotTyping && (
        <div className="typing-indicator-row">
          <div className="message-avatar avatar-bot">
            <img
              src="/sokrabot_mascot.png"
              alt="SOKRABOT"
              className="avatar-mascot-img"
            />
          </div>
          <div className="typing-bubble">
            <span className="typing-label">
              SOKRABOT + Gemini AI sedang menganalisis jawabanmu...
            </span>
            <div className="typing-dots">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        </div>
      )}

      {/* Anchor for autoscroll */}
      <div ref={scrollEndRef} style={{ height: "1px" }} />
    </div>
  );
}
