import React from "react";

export default function Footer({ onOpenDeveloperInfo }) {
  return (
    <footer className="site-footer">
      <p>
        🌾 <strong>SOKRABOT: Petualangan Sains Ekosistem Sawah</strong> •
        Sahabat Belajar AI Interaktif Siswa SD Kelas 5-6
      </p>
      <p style={{ marginTop: "6px", fontSize: "0.82rem", color: "#64748B" }}>
        Tesis S2 PGSD UPI Kampus Cibiru •{" "}
        <button
          type="button"
          onClick={onOpenDeveloperInfo}
          style={{
            background: "none",
            border: "none",
            color: "#166534",
            fontWeight: "700",
            cursor: "pointer",
            textDecoration: "underline",
            padding: 0,
            fontSize: "inherit"
          }}
          title="Info Pengembang"
          id="btn-footer-dev-info"
        >
          🎓 Info Pengembang
        </button>
      </p>
    </footer>
  );
}
