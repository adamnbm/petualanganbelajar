import React, { useState } from "react";
import { User, GraduationCap, Hash, Sparkles, X } from "lucide-react";
import { studentSession } from "../utils/studentSession";

export default function StudentProfileModal({ isOpen, onClose, onSaveStudent }) {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("Kelas 4");
  const [studentNumber, setStudentNumber] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Halo! Silakan masukkan namamu terlebih dahulu ya! 😊");
      return;
    }

    const profile = {
      name: name.trim(),
      className: className.trim(),
      studentNumber: studentNumber.trim() || "-"
    };

    studentSession.setActiveStudent(profile);
    if (onSaveStudent) {
      onSaveStudent(profile);
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
        <div className="modal-header" style={{ background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "2rem" }}>🎒</span>
            <div>
              <h3 style={{ color: "#065f46" }}>Profil Petualang Cilik</h3>
              <p style={{ fontSize: "0.82rem", color: "#047857" }}>
                Masukkan identitasmu agar hasil belajar tersimpan rapi
              </p>
            </div>
          </div>
          {onClose && (
            <button className="nav-icon-btn" onClick={onClose} title="Tutup">
              <X size={18} />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Input Nama Lengkap */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ fontSize: "0.92rem", fontWeight: "800", color: "#1e293b", display: "flex", alignItems: "center", gap: "6px" }}>
              <User size={16} color="#10b981" />
              <span>Nama Lengkap Siswa:</span>
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
                border: "2px solid #cbd5e1",
                fontSize: "1rem",
                fontFamily: "inherit",
                outline: "none",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => (e.target.style.borderColor = "#10b981")}
              onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
            />
          </div>

          {/* Pilihan Kelas */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ fontSize: "0.92rem", fontWeight: "800", color: "#1e293b", display: "flex", alignItems: "center", gap: "6px" }}>
              <GraduationCap size={16} color="#0ea5e9" />
              <span>Kelas:</span>
            </label>
            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              style={{
                padding: "0.8rem 1rem",
                borderRadius: "12px",
                border: "2px solid #cbd5e1",
                fontSize: "1rem",
                fontFamily: "inherit",
                background: "white",
                outline: "none"
              }}
            >
              <option value="Kelas 3">SD Kelas 3</option>
              <option value="Kelas 4">SD Kelas 4</option>
              <option value="Kelas 5">SD Kelas 5</option>
              <option value="Kelas 6">SD Kelas 6</option>
            </select>
          </div>

          {/* Nomor Absen (Opsional) */}
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

          {/* Tombol Submit */}
          <button
            type="submit"
            className="btn-start-mission"
            style={{ marginTop: "0.5rem", padding: "0.95rem" }}
          >
            <Sparkles size={18} />
            <span>Mulai Petualangan Belajar! 🚀</span>
          </button>
        </form>
      </div>
    </div>
  );
}
