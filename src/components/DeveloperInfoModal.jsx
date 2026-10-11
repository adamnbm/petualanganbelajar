import React from "react";
import { GraduationCap, User, School, Sparkles, X, BookOpen, Award, CheckCircle } from "lucide-react";

export default function DeveloperInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card-tree"
        style={{
          maxWidth: "580px",
          width: "95%",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: "20px",
          boxShadow: "0 20px 45px rgba(0, 0, 0, 0.2)",
          border: "2px solid #C8E6C9"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div
          className="modal-header"
          style={{
            background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)",
            color: "#FFFFFF",
            padding: "1.25rem 1.5rem",
            borderBottom: "3px solid #81C784",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem"
              }}
            >
              🎓
            </div>
            <div>
              <h3 style={{ margin: 0, color: "#FFFFFF", fontSize: "1.15rem", fontWeight: 800 }}>
                Informasi Pengembang Media
              </h3>
              <p style={{ margin: "2px 0 0", fontSize: "0.8rem", color: "#E8F5E9" }}>
                Tesis S2 Magister Pendidikan Guru Sekolah Dasar (PGSD)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              border: "none",
              color: "#FFFFFF",
              borderRadius: "50%",
              width: "34px",
              height: "34px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            title="Tutup"
            id="btn-close-dev-modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body Modal */}
        <div
          style={{
            padding: "1.25rem",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            backgroundColor: "#F8FAF8"
          }}
        >
          {/* Card Institusi & Tesis */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "14px",
              padding: "1rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <School size={18} color="#2E7D32" />
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1B5E20", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Afiliasi Akademik
              </span>
            </div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: "0.95rem", color: "#1E293B" }}>
              Universitas Pendidikan Indonesia (UPI) Kampus Cibiru
            </p>
            <p style={{ margin: "3px 0 0", fontSize: "0.85rem", color: "#64748B" }}>
              Program Studi Magister Pendidikan Guru Sekolah Dasar (S2 PGSD)
            </p>
          </div>

          {/* Card Pengembang / Peneliti */}
          <div
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #F1F8E9 100%)",
              border: "1.5px solid #A5D6A7",
              borderRadius: "14px",
              padding: "1.1rem",
              boxShadow: "0 3px 10px rgba(46, 125, 50, 0.08)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <div
                style={{
                  background: "#2E7D32",
                  color: "#FFFFFF",
                  padding: "3px 8px",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  fontWeight: 700
                }}
              >
                PENGEMBANG / PENELITI
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "#E8F5E9",
                  border: "2px solid #4CAF50",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                  flexShrink: 0
                }}
              >
                👩‍🏫
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800, color: "#1B5E20" }}>
                  Suci Ulfah Suhirwah
                </h4>
                <ul style={{ margin: "6px 0 0", paddingLeft: "1.2rem", fontSize: "0.85rem", color: "#334155", lineHeight: "1.45" }}>
                  <li>Guru SDN Pasir Putih 2 Kota Depok</li>
                  <li>Mahasiswa S2 PGSD UPI Kampus Cibiru</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card Tim Dosen Pembimbing */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "14px",
              padding: "1.1rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <div
                style={{
                  background: "#0284C7",
                  color: "#FFFFFF",
                  padding: "3px 8px",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  fontWeight: 700
                }}
              >
                TIM DOSEN PEMBIMBING
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {/* Pembimbing 1 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "8px 10px",
                  background: "#F0F9FF",
                  borderRadius: "10px",
                  border: "1px solid #BAE6FD"
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "#E0F2FE",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    flexShrink: 0
                  }}
                >
                  👨‍🏫
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0369A1" }}>
                    DOSEN PEMBIMBING I
                  </div>
                  <h5 style={{ margin: "2px 0 0", fontSize: "0.95rem", fontWeight: 800, color: "#0F172A" }}>
                    Dr. Ai Sutini, M.Pd
                  </h5>
                  <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#475569" }}>
                    Dosen S2 PGSD UPI Kampus Cibiru
                  </p>
                </div>
              </div>

              {/* Pembimbing 2 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "8px 10px",
                  background: "#F0F9FF",
                  borderRadius: "10px",
                  border: "1px solid #BAE6FD"
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "#E0F2FE",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    flexShrink: 0
                  }}
                >
                  👨‍🏫
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0369A1" }}>
                    DOSEN PEMBIMBING II
                  </div>
                  <h5 style={{ margin: "2px 0 0", fontSize: "0.95rem", fontWeight: 800, color: "#0F172A" }}>
                    Dr. Dede Trie Kurniawan, M.Pd
                  </h5>
                  <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#475569" }}>
                    Dosen S2 PGSD UPI Kampus Cibiru
                  </p>
                </div>
              </div>
            </div>
          </div>


        </div>

        {/* Footer Modal */}
        <div
          style={{
            padding: "0.85rem 1.25rem",
            borderTop: "1px solid #E2E8F0",
            backgroundColor: "#FFFFFF",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0
          }}
        >
          <span style={{ fontSize: "0.78rem", color: "#94A3B8" }}>
            UPI Kampus Cibiru • 2026
          </span>
          <button
            onClick={onClose}
            style={{
              background: "#2E7D32",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "8px",
              padding: "8px 18px",
              fontSize: "0.88rem",
              fontWeight: 700,
              cursor: "pointer"
            }}
            id="btn-confirm-close-dev"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
