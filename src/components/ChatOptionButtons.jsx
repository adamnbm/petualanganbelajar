import React from "react";
import { MessageSquareText } from "lucide-react";

export default function ChatOptionButtons({
  options = [],
  disabled = false,
  onSelectOption
}) {
  if (!options || options.length === 0) {
    return null;
  }

  return (
    <div className="chat-interactive-dock" id="chat-options-dock">
      <div className="options-prompt-label">
        <MessageSquareText size={16} />
        <span>Pilih Jawabanmu:</span>
      </div>

      <div className="options-grid">
        {options.map((opt) => (
          <button
            key={opt.id}
            className="option-btn"
            onClick={() => onSelectOption(opt)}
            disabled={disabled}
            id={`opt-btn-${opt.id}`}
          >
            <span className="option-badge">{opt.id}</span>
            <span className="option-text">{opt.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
