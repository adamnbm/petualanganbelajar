import React, { useState, useEffect } from "react";
import {
  X,
  Users,
  Database,
  CloudCheck,
  HardDrive,
  Download,
  Eye,
  ArrowLeft,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  Printer
} from "lucide-react";
import { isSupabaseConfigured, fetchAllStudentSessionsFromCloud } from "../services/supabaseClient";
import { studentSession } from "../utils/studentSession";

export default function TeacherDashboardModal({ isOpen, onClose }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTranscript, setSelectedTranscript] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataSource, setDataSource] = useState("local"); // 'supabase' | 'local'

  useEffect(() => {
    if (isOpen) {
      loadSessions();
    }
  }, [isOpen]);

  const loadSessions = async () => {
    setLoading(true);
    // Ambil data lokal terlebih dahulu
    const localData = studentSession.getAllLocalSubmissions();

    if (isSupabaseConfigured) {
      const res = await fetchAllStudentSessionsFromCloud();
      if (res.success && res.data.length > 0) {
        setSessions(res.data);
        setDataSource("supabase");
        setLoading(false);
        return;
      }
    }

    setSessions(localData);
    setDataSource("local");
    setLoading(false);
  };

  if (!isOpen) return null;

  // Filter pencarian
  const filteredSessions = sessions.filter((s) => {
    const q = searchTerm.toLowerCase();
    const nameMatch = (s.student_name || "").toLowerCase().includes(q);
    const classMatch = (s.student_class || "").toLowerCase().includes(q);
    const missionMatch = (s.mission_title || "").toLowerCase().includes(q);
    return nameMatch || classMatch || missionMatch;
  });

  // Fungsi Ekspor ke CSV / Excel
  const handleExportCSV = () => {
    if (sessions.length === 0) {
      alert("Belum ada data riwayat siswa untuk diekspor.");
      return;
    }

    const headers = [
      "Waktu",
      "Nama Siswa",
      "Kelas",
      "No Absen",
      "Misi",
      "Skor (%)",
      "Pertanyaan Selesai",
      "Petunjuk Digunakan",
      "Status Selesai"
    ];

    const rows = sessions.map((s) => [
      `"${new Date(s.created_at || Date.now()).toLocaleString("id-ID")}"`,
      `"${s.student_name || "-"}"`,
      `"${s.student_class || "-"}"`,
      `"${s.student_number || "-"}"`,
      `"${s.mission_title || "-"}"`,
      s.score_percent ?? 100,
      s.completed_questions ?? 0,
      s.hints_used ?? 0,
      s.is_completed ? "SELESAI" : "BELUM SELESAI"
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `riwayat_belajar_siswa_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Fungsi Ekspor ke JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sessions, null, 2));
    const dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `riwayat_belajar_siswa_${Date.now()}.json`);
    dlAnchorElem.click();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card-tree"
        style={{ maxWidth: "1050px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="modal-header" style={{ background: "#f8fafc" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
              👨‍🏫
            </div>
            <div>
              <h3>Dashboard Guru: Rekaman Riwayat Siswa</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "2px" }}>
                {dataSource === "supabase" ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.78rem", color: "#047857", background: "#d1fae5", padding: "2px 8px", borderRadius: "999px", fontWeight: "700" }}>
                    🟢 Terhubung ke Cloud Supabase
                  </span>
                ) : (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.78rem", color: "#b45309", background: "#fef3c7", padding: "2px 8px", borderRadius: "999px", fontWeight: "700" }}>
                    🟡 Mode Penyimpanan Lokal (LocalStorage)
                  </span>
                )}
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                  Total: <strong>{sessions.length} Sesi Belajar</strong>
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              className="nav-pill-btn"
              onClick={handleExportCSV}
              title="Unduh Data dalam Format CSV / Excel"
            >
              <Download size={15} />
              <span>Ekspor Excel/CSV</span>
            </button>
            <button className="nav-icon-btn" onClick={onClose} title="Tutup">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Isi Konten */}
        <div className="modal-body-scroll" style={{ padding: "1.25rem 1.75rem" }}>
          {selectedTranscript ? (
            /* Tampilan Detail Transkrip Percakapan Siswa */
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f1f5f9", padding: "0.85rem 1.25rem", borderRadius: "12px" }}>
                <button
                  className="nav-pill-btn"
                  onClick={() => setSelectedTranscript(null)}
                  style={{ background: "white" }}
                >
                  <ArrowLeft size={16} />
                  <span>Kembali ke Daftar Siswa</span>
                </button>

                <div style={{ textAlign: "right" }}>
                  <h4 style={{ color: "#0f172a" }}>
                    Transkrip: {selectedTranscript.student_name} ({selectedTranscript.student_class})
                  </h4>
                  <p style={{ fontSize: "0.82rem", color: "#64748b" }}>
                    Misi: {selectedTranscript.mission_title} • Skor: {selectedTranscript.score_percent}%
                  </p>
                </div>
              </div>

              {/* Chat Viewport Transkrip */}
              <div
                style={{
                  background: "#fbfcfe",
                  border: "2px solid #e2e8f0",
                  borderRadius: "16px",
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.85rem",
                  maxHeight: "55vh",
                  overflowY: "auto"
                }}
              >
                {selectedTranscript.conversation_transcript?.length > 0 ? (
                  selectedTranscript.conversation_transcript.map((msg, i) => {
                    const isBot = msg.sender === "bot";
                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: isBot ? "flex-start" : "flex-end",
                          gap: "8px"
                        }}
                      >
                        {isBot && (
                          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
                            🤖
                          </div>
                        )}
                        <div
                          style={{
                            maxWidth: "75%",
                            padding: "0.75rem 1rem",
                            borderRadius: "16px",
                            fontSize: "0.92rem",
                            background: isBot ? (msg.isFeedback ? (msg.isCorrect ? "#ecfdf5" : "#fffbeb") : "white") : "#0284c7",
                            color: isBot ? "#1e293b" : "white",
                            border: isBot ? "1px solid #cbd5e1" : "none",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.04)"
                          }}
                        >
                          {msg.isFeedback && (
                            <div style={{ fontWeight: "800", fontSize: "0.8rem", marginBottom: "4px", color: msg.isCorrect ? "#059669" : "#d97706" }}>
                              {msg.isCorrect ? "✓ Respon Benar" : "🤔 Respon Bimbingan Socratic"}
                            </div>
                          )}
                          {msg.text}
                          <div style={{ fontSize: "0.68rem", opacity: 0.7, marginTop: "4px", textAlign: isBot ? "left" : "right" }}>
                            {msg.timestamp || "-"}
                          </div>
                        </div>
                        {!isBot && (
                          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
                            👦
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p style={{ textAlign: "center", color: "#94a3b8", padding: "2rem" }}>
                    Tidak ada catatan pesan dalam riwayat ini.
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* Tampilan Tabel Daftar Siswa */
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Search Bar */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <Search size={16} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                  <input
                    type="text"
                    placeholder="Cari berdasarkan nama siswa, kelas, atau misi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.65rem 1rem 0.65rem 2.25rem",
                      borderRadius: "10px",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.9rem",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              {/* Tabel */}
              {loading ? (
                <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
                  Memuat data riwayat siswa...
                </div>
              ) : filteredSessions.length === 0 ? (
                <div style={{ textAlign: "center", padding: "3rem", background: "#f8fafc", borderRadius: "12px", border: "2px dashed #cbd5e1" }}>
                  <Users size={36} color="#94a3b8" style={{ margin: "0 auto 8px" }} />
                  <h4 style={{ color: "#475569" }}>Belum Ada Riwayat Percakapan Siswa</h4>
                  <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginTop: "4px" }}>
                    Saat siswa mulai bermain dan menyelesaikan pertanyaan, riwayat dan transkrip obrolan akan muncul otomatis di sini.
                  </p>
                </div>
              ) : (
                <div style={{ overflowX: "auto", border: "1px solid #e2e8f0", borderRadius: "12px" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" }}>
                    <thead>
                      <tr style={{ background: "#f8fafc", borderBottom: "2px solid #cbd5e1", color: "#475569" }}>
                        <th style={{ padding: "10px 12px" }}>Waktu</th>
                        <th style={{ padding: "10px 12px" }}>Nama Siswa</th>
                        <th style={{ padding: "10px 12px" }}>Kelas / No</th>
                        <th style={{ padding: "10px 12px" }}>Misi</th>
                        <th style={{ padding: "10px 12px" }}>Skor</th>
                        <th style={{ padding: "10px 12px" }}>Petunjuk</th>
                        <th style={{ padding: "10px 12px" }}>Status</th>
                        <th style={{ padding: "10px 12px", textAlign: "center" }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSessions.map((s, idx) => (
                        <tr key={s.id || idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "10px 12px", color: "#64748b", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                            {new Date(s.created_at || Date.now()).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </td>
                          <td style={{ padding: "10px 12px", fontWeight: "700", color: "#0f172a" }}>
                            {s.student_name || "Siswa"}
                          </td>
                          <td style={{ padding: "10px 12px", color: "#475569" }}>
                            {s.student_class || "-"} {s.student_number && s.student_number !== "-" ? `(${s.student_number})` : ""}
                          </td>
                          <td style={{ padding: "10px 12px", color: "#0f172a" }}>
                            {s.mission_title || "Misi Sawah"}
                          </td>
                          <td style={{ padding: "10px 12px", fontWeight: "800", color: "#059669" }}>
                            {s.score_percent ?? 100}%
                          </td>
                          <td style={{ padding: "10px 12px", color: "#d97706", fontWeight: "700" }}>
                            {s.hints_used ?? 0}
                          </td>
                          <td style={{ padding: "10px 12px" }}>
                            {s.is_completed ? (
                              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "#065f46", background: "#d1fae5", padding: "2px 8px", borderRadius: "999px", fontSize: "0.75rem", fontWeight: "700" }}>
                                <CheckCircle2 size={12} /> Selesai
                              </span>
                            ) : (
                              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "#92400e", background: "#fef3c7", padding: "2px 8px", borderRadius: "999px", fontSize: "0.75rem", fontWeight: "700" }}>
                                <Clock size={12} /> Berlangsung
                              </span>
                            )}
                          </td>
                          <td style={{ padding: "10px 12px", textAlign: "center" }}>
                            <button
                              className="nav-pill-btn"
                              style={{ padding: "4px 10px", fontSize: "0.8rem" }}
                              onClick={() => setSelectedTranscript(s)}
                              title="Baca Transkrip Percakapan Lengkap Siswa"
                            >
                              <Eye size={14} />
                              <span>Lihat Chat</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
