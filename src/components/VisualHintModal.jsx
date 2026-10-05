import React from "react";
import { X, ZoomIn, Eye, Sparkles, AlertCircle } from "lucide-react";

export default function VisualHintModal({ visualHint, onClose }) {
  if (!visualHint) return null;

  return (
    <div className="modal-backdrop-custom" onClick={onClose}>
      <div
        className="modal-visual-hint"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="visual-hint-header">
          <div className="visual-header-title">
            <Eye size={20} className="text-yellow-400" />
            <h3>{visualHint.label || "Petunjuk Visual SOKRABOT (H3)"}</h3>
          </div>
          <button onClick={onClose} className="btn-modal-close" aria-label="Tutup">
            <X size={20} />
          </button>
        </div>

        <div className="visual-hint-body">
          <div className="visual-image-wrapper">
            <img
              src={visualHint.image}
              alt={visualHint.label || "Visual Hint Diagram"}
              className="visual-diagram-img"
            />
          </div>

          <div className="visual-hint-caption-box">
            <div className="caption-pill">
              <Sparkles size={16} className="text-amber-500" />
              <span>Petunjuk Khusus SOKRABOT</span>
            </div>
            <p className="caption-text">
              {visualHint.text || "Perhatikan bagan visual di atas secara saksama untuk menemukan jawaban ilmiahmu!"}
            </p>
          </div>
        </div>

        <div className="visual-hint-footer">
          <button onClick={onClose} className="btn-visual-close-cta">
            Paham, Lanjutkan Percakapan Socratic ➔
          </button>
        </div>
      </div>
    </div>
  );
}
