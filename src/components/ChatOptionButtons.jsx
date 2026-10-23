import React from "react";
import {
  MessageSquareText,
  Rocket,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Check,
  X
} from "lucide-react";

export default function ChatOptionButtons({
  options = [],
  disabled = false,
  onSelectOption
}) {
  if (!options || options.length === 0) {
    return null;
  }

  // Menentukan label header yang kontekstual dan ramah anak
  const getPromptHeader = () => {
    if (options.length === 1) {
      const optId = String(options[0].id || "").toLowerCase();
      const optText = String(options[0].text || "").toLowerCase();

      if (optId.includes("mulai") || optText.includes("mulai")) {
        return {
          icon: <Rocket size={16} className="prompt-header-icon" style={{ color: "#10b981" }} />,
          text: "Siap Mulai Penyelidikan?"
        };
      }
      if (optId.includes("siap") || optText.includes("siap")) {
        return {
          icon: <Sparkles size={16} className="prompt-header-icon" style={{ color: "#f59e0b" }} />,
          text: "Persiapan Penyelidikan:"
        };
      }
      if (optId.includes("kembali") || optText.includes("kembali")) {
        return {
          icon: <RotateCcw size={16} className="prompt-header-icon" style={{ color: "#3b82f6" }} />,
          text: "Pikirkan Kembali:"
        };
      }
      return {
        icon: <ArrowRight size={16} className="prompt-header-icon" style={{ color: "#10b981" }} />,
        text: "Langkah Selanjutnya:"
      };
    }

    const isYesNo = options.every((o) =>
      ["ya", "tidak"].includes(String(o.id || "").toLowerCase())
    );
    if (isYesNo) {
      return {
        icon: <MessageSquareText size={16} />,
        text: "Tentukan Pilihanmu:"
      };
    }

    return {
      icon: <MessageSquareText size={16} />,
      text: "Pilih Jawabanmu:"
    };
  };

  const header = getPromptHeader();

  return (
    <div className="chat-interactive-dock" id="chat-options-dock">
      <div className="options-prompt-label">
        {header.icon}
        <span>{header.text}</span>
      </div>

      <div className={`options-grid ${options.length === 1 ? "options-grid-single" : ""}`}>
        {options.map((opt) => {
          const rawId = String(opt.id || "").trim();
          const lowerId = rawId.toLowerCase();
          const isSingleLetter = rawId.length === 1 && /^[A-Z0-9]$/i.test(rawId);
          const isYes = lowerId === "ya";
          const isNo = lowerId === "tidak";
          const isAction = !isSingleLetter && !isYes && !isNo;

          // Ikon khusus untuk tombol aksi interaktif
          let actionIcon = null;
          if (lowerId.includes("mulai") || opt.text?.toLowerCase().includes("mulai")) {
            actionIcon = <Rocket size={18} />;
          } else if (lowerId.includes("siap") || opt.text?.toLowerCase().includes("siap")) {
            actionIcon = <Sparkles size={18} />;
          } else if (lowerId.includes("kembali") || opt.text?.toLowerCase().includes("kembali")) {
            actionIcon = <RotateCcw size={18} />;
          } else if (isAction) {
            actionIcon = <ArrowRight size={18} />;
          }

          return (
            <button
              key={opt.id}
              className={`option-btn ${isAction ? "option-btn-action" : ""} ${options.length === 1 ? "option-btn-single" : ""}`}
              onClick={() => onSelectOption(opt)}
              disabled={disabled}
              id={`opt-btn-${opt.id}`}
            >
              {isSingleLetter && (
                <span className="option-badge">{rawId.toUpperCase()}</span>
              )}

              {isYes && (
                <span className="option-badge badge-yes">
                  <Check size={16} strokeWidth={3} />
                </span>
              )}

              {isNo && (
                <span className="option-badge badge-no">
                  <X size={16} strokeWidth={3} />
                </span>
              )}

              {isAction && actionIcon && (
                <span className="option-badge option-badge-action">
                  {actionIcon}
                </span>
              )}

              <span className="option-text">{opt.text}</span>

              {isAction && (
                <span className="option-action-hint">
                  <ArrowRight size={16} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
