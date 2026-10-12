import React from "react";
import { X } from "lucide-react";

export default function DeveloperInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="dev-info-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dev-modal-title"
      >
        {/* Header Modal Compact */}
        <div className="dev-info-header">
          <div className="dev-info-title-group">
            <div className="dev-info-icon-badge">🎓</div>
            <h3 id="dev-modal-title" className="dev-info-title">
              Tim Pengembang
            </h3>
          </div>
          <button
            onClick={onClose}
            className="dev-info-close-btn"
            title="Tutup"
            aria-label="Tutup"
            id="btn-close-dev-modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body Modal Scrollable & Compact */}
        <div className="dev-info-body">
          <div className="dev-info-badge-tag">TIM PENGEMBANG</div>

          <div className="dev-info-cards-list">
            {/* Suci Ulfah Suhirwah */}
            <div className="dev-member-card primary">
              <div className="dev-avatar">👩‍🏫</div>
              <div className="dev-member-details">
                <h4 className="dev-member-name">Suci Ulfah Suhirwah</h4>
                <ul className="dev-member-roles">
                  <li>Guru SDN Pasir Putih 2 Kota Depok</li>
                  <li>Mahasiswa S2 PGSD UPI Kampus Cibiru</li>
                </ul>
                <div className="dev-member-email-row">
                  <span className="dev-email-icon">✉️</span>
                  <a
                    href="mailto:suhirwahh@gmail.com"
                    className="dev-email-link"
                  >
                    suhirwahh@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Dr. Ai Sutini */}
            <div className="dev-member-card secondary">
              <div className="dev-avatar small">👨‍🏫</div>
              <div className="dev-member-details">
                <h5 className="dev-member-name secondary">Dr. Ai Sutini, M.Pd</h5>
                <p className="dev-member-subrole">Dosen S2 PGSD UPI Kampus Cibiru</p>
              </div>
            </div>

            {/* Dr. Dede Trie Kurniawan */}
            <div className="dev-member-card secondary">
              <div className="dev-avatar small">👨‍🏫</div>
              <div className="dev-member-details">
                <h5 className="dev-member-name secondary">Dr. Dede Trie Kurniawan, M.Pd</h5>
                <p className="dev-member-subrole">Dosen S2 PGSD UPI Kampus Cibiru</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Modal Compact */}
        <div className="dev-info-footer">
          <span className="dev-footer-note">UPI Kampus Cibiru • 2026</span>
          <button
            onClick={onClose}
            className="dev-btn-close-action"
            id="btn-confirm-close-dev"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
