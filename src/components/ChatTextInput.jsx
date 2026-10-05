import React, { useState } from 'react';
import { SendHorizontal, Sparkles, MessageCircle } from 'lucide-react';

export default function ChatTextInput({ onSend, disabled = false, placeholder = "Ketik jawabanmu...", isHighlighted = false }) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabled || !inputText.trim()) return;

    onSend(inputText.trim());
    setInputText('');
  };

  return (
    <form
      className={`chat-text-input-wrapper${isHighlighted ? ' open-ended-mode' : ''}`}
      onSubmit={handleSubmit}
      id="chat-text-form"
    >
      {isHighlighted && (
        <div className="open-ended-label">
          <Sparkles size={14} />
          <span>Ceritakan alasanmu – Gemini AI akan menganalisis jawabanmu! ✨</span>
        </div>
      )}
      <div className={`chat-input-bar${isHighlighted ? ' highlighted' : ''}`}>
        <div className="chat-input-prefix-icon" title="Tutor AI siap memahami jawabanmu">
          {isHighlighted
            ? <Sparkles size={18} className="sparkle-ai-icon active" />
            : <MessageCircle size={18} className="sparkle-ai-icon" />
          }
        </div>
        <input
          type="text"
          id="student-free-text-input"
          className="chat-text-input-field"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={disabled ? "SOKRABOT + Gemini AI sedang menganalisis..." : placeholder}
          disabled={disabled}
          autoComplete="off"
          autoFocus={isHighlighted}
        />
        <button
          type="submit"
          id="btn-send-chat"
          className={`chat-send-btn${isHighlighted ? ' active' : ''}`}
          disabled={disabled || !inputText.trim()}
          title="Kirim Jawaban"
          aria-label="Kirim Jawaban"
        >
          <SendHorizontal size={18} />
        </button>
      </div>
    </form>
  );
}
