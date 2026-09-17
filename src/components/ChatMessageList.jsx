import React, { useEffect, useRef } from "react";
import { Check, HelpCircle, Sparkles } from "lucide-react";

export default function ChatMessageList({ messages, isBotTyping }) {
  const scrollEndRef = useRef(null);

  // Autoscroll ke pesan paling baru secara mulus
  useEffect(() => {
    if (scrollEndRef.current) {
      scrollEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, isBotTyping]);

  return (
    <div className="chat-messages-viewport" id="chat-viewport">
      {messages.map((msg) => {
        const isBot = msg.sender === "bot";

        // Tambahkan styling khusus jika bubble adalah feedback
        let feedbackClass = "";
        if (msg.isFeedback) {
          feedbackClass = msg.isCorrect ? "feedback-correct" : "feedback-hint";
        }

        return (
          <div
            key={msg.id}
            className={`message-row ${isBot ? "bot" : "user"}`}
          >
            {isBot && (
              <div className="message-avatar avatar-bot" title="Timi Si Bot Belajar">
                🤖
              </div>
            )}

            <div className="message-bubble-wrapper">
              <div className={`message-bubble ${feedbackClass}`}>
                {msg.isFeedback && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px", fontWeight: "800", fontSize: "0.85rem" }}>
                    {msg.isCorrect ? (
                      <>
                        <span style={{ color: "#059669" }}>✓ Jawaban Benar!</span>
                      </>
                    ) : (
                      <>
                        <span style={{ color: "#d97706" }}>🤔 Mari Pikirkan Kembali...</span>
                      </>
                    )}
                  </div>
                )}
                {msg.text.split("\n").map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    {idx < msg.text.split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
              <span className="message-timestamp">{msg.timestamp}</span>
            </div>

            {!isBot && (
              <div className="message-avatar avatar-user" title="Jawaban Kamu">
                👦
              </div>
            )}
          </div>
        );
      })}

      {/* Typing Indicator */}
      {isBotTyping && (
        <div className="typing-indicator-row">
          <div className="message-avatar avatar-bot">
            🤖
          </div>
          <div className="typing-bubble">
            <span className="typing-label">Timi sedang mengetik</span>
            <div className="typing-dots">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        </div>
      )}

      {/* Invisible anchor for autoscroll */}
      <div ref={scrollEndRef} style={{ height: "1px" }} />
    </div>
  );
}
