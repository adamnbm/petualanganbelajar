import React from "react";
import { Lightbulb, X } from "lucide-react";

export default function ChatHintDrawer({
  isOpen,
  onClose,
  hintsOpened = [],
  onRequestHint,
  onOpenVisualHint
}) {
  if (!isOpen) return null;

  const hasH1 = hintsOpened.includes("h1");
  const hasH2 = hintsOpened.includes("h2");
  const hasH3 = hintsOpened.includes("h3");

  return (
    <div className="hint-drawer-backdrop" onClick={onClose}>
      <div className="hint-drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="hint-drawer-header">
          <div className="hint-header-left">
            <Lightbulb size={20} className="text-amber-500" />
            <h3>Papan Petunjuk Bertingkat (H1 - H3)</h3>
          </div>
          <button onClick={onClose} className="btn-modal-close" aria-label="Tutup Papan Petunjuk">
            <X size={18} />
          </button>
        </div>

        <div className="hint-drawer-intro">
          <p>
            Detektif boleh meminta bantuan jika merasa bimbang. Ingat aturan bintang:
            <br />
            ⭐ <strong>3 Bintang</strong>: Tanpa Hint | ⭐ <strong>2 Bintang</strong>: Pakai H1/H2 | ⭐ <strong>1 Bintang</strong>: Pakai H3 Visual.
          </p>
        </div>

        <div className="hint-levels-list">
          {/* Level 1: H1 */}
          <div className={`hint-level-card ${hasH1 ? "opened" : ""}`}>
            <div className="level-tag-row">
              <span className="level-badge h1-badge">Level 1 (H1)</span>
              <span className="level-star-impact">Maksimal 2 ⭐</span>
            </div>
            <h4>Petunjuk Konsep Dasar</h4>
            <p>Memandu arah penalaran pertama tentang peran atau konsep sains yang diuji.</p>
            <button
              onClick={() => {
                onRequestHint("h1");
                onClose();
              }}
              className={`btn-hint-request ${hasH1 ? "btn-already-open" : "btn-req-h1"}`}
            >
              {hasH1 ? "✓ Sudah Terbuka (Lihat di Chat)" : "Buka Petunjuk H1 💡"}
            </button>
          </div>

          {/* Level 2: H2 */}
          <div className={`hint-level-card ${hasH2 ? "opened" : ""}`}>
            <div className="level-tag-row">
              <span className="level-badge h2-badge">Level 2 (H2)</span>
              <span className="level-star-impact">Maksimal 2 ⭐</span>
            </div>
            <h4>Petunjuk Kaitan Mendalam</h4>
            <p>Memberikan petunjuk spesifik tentang hubungan antar-organisme atau mekanisme energi.</p>
            <button
              onClick={() => {
                onRequestHint("h2");
                onClose();
              }}
              className={`btn-hint-request ${hasH2 ? "btn-already-open" : "btn-req-h2"}`}
            >
              {hasH2 ? "✓ Sudah Terbuka (Lihat di Chat)" : "Buka Petunjuk H2 🔍"}
            </button>
          </div>

          {/* Level 3: H3 Visual */}
          <div className={`hint-level-card ${hasH3 ? "opened" : ""}`}>
            <div className="level-tag-row">
              <span className="level-badge h3-badge">Level 3 (H3 Visual)</span>
              <span className="level-star-impact text-amber-700">Maksimal 1 ⭐</span>
            </div>
            <h4>Petunjuk Visual Interaktif</h4>
            <p>Diagram visual lengkap organ adaptasi, efek domino rantai makanan, atau keseimbangan sawah.</p>
            <button
              onClick={() => {
                onRequestHint("h3");
                onClose();
                if (onOpenVisualHint) onOpenVisualHint();
              }}
              className={`btn-hint-request ${hasH3 ? "btn-already-open" : "btn-req-h3"}`}
            >
              {hasH3 ? "✓ Buka Kembali Diagram Visual 🖼️" : "Buka Diagram Visual H3 🖼️"}
            </button>
          </div>
        </div>

        <div className="hint-drawer-footer">
          <button onClick={onClose} className="btn-close-drawer">
            Kembali ke Investigasi
          </button>
        </div>
      </div>
    </div>
  );
}
