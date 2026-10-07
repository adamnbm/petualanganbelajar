import React, { useState, useEffect } from "react";
import { User, GraduationCap, Hash, Sparkles, X } from "lucide-react";
import { studentSession } from "../utils/studentSession";

export default function StudentProfileModal({ isOpen, onClose, onSaveStudent }) {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("Kelas 5 SD");
  const [studentNumber, setStudentNumber] = useState("");

  useEffect(() => {
    if (isOpen) {
      const current = studentSession.getActiveStudent();
      if (current) {
        setName(current.name || "");
        setClassName(current.className || "Kelas 5 SD");
        setStudentNumber(current.studentNumber && current.studentNumber !== "-" ? current.studentNumber : "");
      } else {
        setName("");
        setClassName("Kelas 5 SD");
        setStudentNumber("");
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Halo Detektif! Silakan masukkan namamu terlebih dahulu ya! 😊");
      return;
    }

    const profile = {
      name: name.trim(),
      className: className.trim(),
      studentNumber: studentNumber.trim() || "-"
    };

    const saved = studentSession.setActiveStudent(profile);
    if (onSaveStudent) {
      onSaveStudent(saved || profile);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card-tree"
        style={{ maxWidth: "480px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header" style={{ background: "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "2rem" }}>🌾</span>
            <div>
              <h3 style={{ color: "#1B5E20" }}>Identitas Detektif SOKRABOT</h3>
              <p style={{ fontSize: "0.82rem", color: "#2E7D32" }}>
                Ganti nama siswa untuk mencatat bintang dan lencana investigasi
              </p>
            </div>
          </div>
          {onClose && (
            <button className="nav-icon-btn" onClick={onClose} title="Tutup">
              <X size={18} />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="student-modal-form" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ fontSize: "0.92rem", fontWeight: "800", color: "#1e293b", display: "flex", alignItems: "center", gap: "6px" }}>
              <User size={16} color="#2E7D32" />
              <span>Nama Lengkap / Panggilan Detektif:</span>
            </label>
            <input
              type="text"
              placeholder="Contoh: Budi Santoso"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
              style={{
                padding: "0.8rem 1rem",
                borderRadius: "12px",
                border: "2px solid #A5D6A7",
                fontSize: "1rem",
                fontFamily: "inherit",
                outline: "none"
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ fontSize: "0.92rem", fontWeight: "800", color: "#1e293b", display: "flex", alignItems: "center", gap: "6px" }}>
              <GraduationCap size={16} color="#0284c7" />
              <span>Tingkat Kelas:</span>
            </label>
            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              style={{
                padding: "0.8rem 1rem",
                borderRadius: "12px",
                border: "2px solid #A5D6A7",
                fontSize: "1rem",
                fontFamily: "inherit",
                background: "white",
                outline: "none"
              }}
            >
              <option value="Kelas 5 SD">SD Kelas 5</option>
              <option value="Kelas 6 SD">SD Kelas 6</option>
              <option value="Kelas 4 SD">SD Kelas 4</option>
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ fontSize: "0.92rem", fontWeight: "800", color: "#1e293b", display: "flex", alignItems: "center", gap: "6px" }}>
              <Hash size={16} color="#f59e0b" />
              <span>Nomor Absen (Opsional):</span>
            </label>
            <input
              type="text"
              placeholder="Contoh: 12"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              style={{
                padding: "0.8rem 1rem",
                borderRadius: "12px",
                border: "2px solid #cbd5e1",
                fontSize: "1rem",
                fontFamily: "inherit",
                outline: "none"
              }}
            />
          </div>

          <button
            type="submit"
            className="btn-splash-cta"
            style={{ marginTop: "0.5rem" }}
          >
            <Sparkles size={18} />
            <span>Simpan Identitas Detektif 🌾</span>
          </button>
        </form>
      </div>
    </div>
  );
}
