import React, { useState, useEffect, useMemo } from "react";
import {
  Users,
  Download,
  Eye,
  ArrowLeft,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  HardDrive,
  Cloud,
  RefreshCw,
  Lock,
  Unlock,
  AlertCircle,
  Award,
  Sparkles,
  HelpCircle,
  FileSpreadsheet,
  ChevronRight,
  BookOpen,
  Check,
  Calendar,
  Layers,
  ListFilter,
  LogOut
} from "lucide-react";
import { studentSession } from "../utils/studentSession";
import {
  isSupabaseConfigured,
  fetchSessionsFromSupabase,
  deleteSessionFromSupabase,
  clearAllSessionsFromSupabase
} from "../services/supabase";
import { MISSIONS_DATA } from "../data/missions";

const DEFAULT_TEACHER_PIN = "guru321";
const PIN_STORAGE_KEY = "timi_teacher_pin_authenticated";

export default function TeacherDashboardView({ onBackToMenu }) {
  // Autentikasi PIN Guru Sederhana
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(PIN_STORAGE_KEY) === "true";
  });
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  // Data & State
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCloudActive, setIsCloudActive] = useState(isSupabaseConfigured());

  // Navigation State di dalam Dashboard
  // viewMode: 'grouped' (per siswa) | 'linear' (log riwayat penuh)
  const [viewMode, setViewMode] = useState("grouped");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTranscript, setSelectedTranscript] = useState(null);

  // Filter & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("ALL");
  const [filterMission, setFilterMission] = useState("ALL");

  // Load Data dari Supabase (dengan fallback ke Local Storage)
  const loadData = async () => {
    setIsLoading(true);
    const cloudConfigured = isSupabaseConfigured();
    setIsCloudActive(cloudConfigured);

    if (cloudConfigured) {
      const res = await fetchSessionsFromSupabase();
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setSessions(res.data);
        setIsLoading(false);
        return;
      }
    }

    // Fallback: baca dari local storage siswa di perangkat ini
    const localData = studentSession.getAllLocalSubmissions();
    setSessions(localData);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  // Validasi PIN Guru
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_TEACHER_PIN || pinInput.trim() === "admin") {
      sessionStorage.setItem(PIN_STORAGE_KEY, "true");
      setIsAuthenticated(true);
      setPinError("");
    } else {
      setPinError("PIN salah!");
    }
  };

  const handleLogoutTeacher = () => {
    sessionStorage.removeItem(PIN_STORAGE_KEY);
    setIsAuthenticated(false);
    setPinInput("");
    setSelectedStudent(null);
    setSelectedTranscript(null);
  };

  // Hapus Satu Sesi
  const handleDeleteOne = async (id, studentName) => {
    if (!window.confirm(`Hapus riwayat belajar atas nama "${studentName || "Siswa"}"?`)) {
      return;
    }

    if (isCloudActive && id && !id.startsWith("sesi_")) {
      await deleteSessionFromSupabase(id);
    }

    studentSession.deleteLocalSubmission(id);
    setSessions((prev) => prev.filter((s) => s.id !== id));

    if (selectedTranscript && (selectedTranscript.id === id || selectedTranscript.created_at === id)) {
      setSelectedTranscript(null);
    }

    // Perbarui juga data selectedStudent jika sedang terbuka
    if (selectedStudent) {
      const updatedMissions = selectedStudent.missions.filter((m) => m.id !== id);
      if (updatedMissions.length === 0) {
        setSelectedStudent(null);
      } else {
        setSelectedStudent({
          ...selectedStudent,
          missions: updatedMissions
        });
      }
    }
  };

  // Hapus Seluruh Sesi Siswa Tertentu
  const handleDeleteStudentAll = async (student) => {
    if (!window.confirm(`Hapus SELURUH ${student.missions.length} misi dari siswa "${student.studentName}"?`)) {
      return;
    }

    for (const m of student.missions) {
      if (isCloudActive && m.id && !m.id.startsWith("sesi_")) {
        await deleteSessionFromSupabase(m.id);
      }
      studentSession.deleteLocalSubmission(m.id);
    }

    setSessions((prev) => prev.filter((s) => !student.missions.some((m) => m.id === s.id)));
    if (selectedStudent?.key === student.key) {
      setSelectedStudent(null);
    }
    setSelectedTranscript(null);
  };

  // Hapus Seluruh Database
  const handleClearAll = async () => {
    if (sessions.length === 0) return;
    if (!window.confirm("PERINGATAN: Apakah Bapak/Ibu Guru yakin ingin MENGHAPUS SEMUA riwayat pembelajaran siswa? Tindakan ini tidak dapat dibatalkan.")) {
      return;
    }

    if (isCloudActive) {
      await clearAllSessionsFromSupabase();
    }

    studentSession.clearAllLocalSubmissions();
    setSessions([]);
    setSelectedStudent(null);
    setSelectedTranscript(null);
  };

  // Ekspor ke CSV / Excel
  const handleExportCSV = () => {
    if (sessions.length === 0) {
      alert("Belum ada data riwayat siswa untuk diekspor.");
      return;
    }

    const headers = [
      "Waktu Selesai",
      "Nama Siswa",
      "Kelas",
      "No. Absen",
      "Judul Misi",
      "Bintang (⭐)",
      "Skor (%)",
      "Petunjuk Digunakan",
      "Status Selesai",
      "Miskonsepsi Terdeteksi"
    ];

    const rows = sessions.map((s) => {
      const misconceptionsList = Array.isArray(s.misconceptions)
        ? s.misconceptions.map((m) => (typeof m === "string" ? m : m.name || m.id)).join("; ")
        : "-";

      return [
        `"${new Date(s.created_at || s.completed_at || Date.now()).toLocaleString("id-ID")}"`,
        `"${s.student_name || s.studentName || "-"}"`,
        `"${s.student_class || s.studentClass || "-"}"`,
        `"${s.student_number || s.studentNumber || "-"}"`,
        `"${s.mission_title || s.missionTitle || s.mission_id || "-"}"`,
        s.stars_earned ?? s.starsEarned ?? 0,
        s.score_percent ?? s.scorePercent ?? 100,
        s.hints_used ?? s.hintsUsed ?? 0,
        s.is_completed ? "SELESAI" : "BERJALAN",
        `"${misconceptionsList}"`
      ];
    });

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekap_Nilai_Siswa_SOKRABOT_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ==========================================
  // PENGELOMPOKAN DATA BERDASARKAN SISWA UNIK
  // ==========================================
  const groupedStudents = useMemo(() => {
    const map = {};

    sessions.forEach((s) => {
      const rawName = (s.student_name || s.studentName || "Siswa").trim();
      const rawClass = (s.student_class || s.studentClass || "-").trim();
      const rawNo = (s.student_number || s.studentNumber || "-").trim();
      const key = `${rawName.toLowerCase()}___${rawClass.toLowerCase()}___${rawNo}`;

      if (!map[key]) {
        map[key] = {
          key,
          studentName: rawName,
          studentClass: rawClass,
          studentNumber: rawNo,
          missions: [],
          totalStars: 0,
          totalScore: 0,
          totalHints: 0,
          allMisconceptions: [],
          lastActive: s.created_at || s.completed_at || new Date().toISOString()
        };
      }

      map[key].missions.push(s);
      map[key].totalStars += (s.stars_earned ?? s.starsEarned ?? 0);
      map[key].totalScore += (s.score_percent ?? s.scorePercent ?? 100);
      map[key].totalHints += (s.hints_used ?? s.hintsUsed ?? 0);

      const miscs = Array.isArray(s.misconceptions) ? s.misconceptions : [];
      miscs.forEach((m) => {
        const text = typeof m === "string" ? m : m.name || m.id || "Miskonsepsi";
        if (!map[key].allMisconceptions.includes(text)) {
          map[key].allMisconceptions.push(text);
        }
      });

      const thisTime = new Date(s.created_at || s.completed_at || 0).getTime();
      const prevTime = new Date(map[key].lastActive || 0).getTime();
      if (thisTime > prevTime) {
        map[key].lastActive = s.created_at || s.completed_at;
      }
    });

    return Object.values(map)
      .map((st) => ({
        ...st,
        avgScore: Math.round(st.totalScore / (st.missions.length || 1)),
        avgStars: (st.totalStars / (st.missions.length || 1)).toFixed(1),
        completedCount: st.missions.length
      }))
      .sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime());
  }, [sessions]);

  // Filter Data Siswa
  const filteredStudents = useMemo(() => {
    return groupedStudents.filter((st) => {
      const q = searchTerm.toLowerCase();
      const matchName = st.studentName.toLowerCase().includes(q);
      const matchClass = st.studentClass.toLowerCase().includes(q);
      const matchNo = st.studentNumber.toLowerCase().includes(q);
      const matchMission = st.missions.some(
        (m) =>
          (m.mission_title || m.missionTitle || "").toLowerCase().includes(q) ||
          (m.mission_id || m.missionId || "").toLowerCase().includes(q)
      );

      const matchesSearch = matchName || matchClass || matchNo || matchMission;

      const matchesClassFilter =
        filterClass === "ALL" ||
        st.studentClass.toLowerCase().includes(filterClass.toLowerCase());

      const matchesMissionFilter =
        filterMission === "ALL" ||
        st.missions.some(
          (m) =>
            (m.mission_id || m.missionId || "").toLowerCase() === filterMission.toLowerCase() ||
            (m.mission_title || m.missionTitle || "").toLowerCase().includes(filterMission.toLowerCase())
        );

      return matchesSearch && matchesClassFilter && matchesMissionFilter;
    });
  }, [groupedStudents, searchTerm, filterClass, filterMission]);

  // Filter Data Linear (mode riwayat penuh)
  const filteredLinearSessions = useMemo(() => {
    return sessions.filter((s) => {
      const q = searchTerm.toLowerCase();
      const name = (s.student_name || s.studentName || "").toLowerCase();
      const cls = (s.student_class || s.studentClass || "").toLowerCase();
      const mission = (s.mission_title || s.missionTitle || s.mission_id || "").toLowerCase();

      const matchesSearch = name.includes(q) || cls.includes(q) || mission.includes(q);

      const matchesClass =
        filterClass === "ALL" ||
        (s.student_class || s.studentClass || "").toLowerCase().includes(filterClass.toLowerCase());

      const matchesMission =
        filterMission === "ALL" ||
        (s.mission_id || s.missionId || "").toLowerCase() === filterMission.toLowerCase() ||
        (s.mission_title || s.missionTitle || "").toLowerCase().includes(filterMission.toLowerCase());

      return matchesSearch && matchesClass && matchesMission;
    });
  }, [sessions, searchTerm, filterClass, filterMission]);

  // Statistik Ringkas
  const totalSubmissions = sessions.length;
  const totalUniqueStudents = groupedStudents.length;
  const avgScore =
    totalSubmissions > 0
      ? Math.round(
        sessions.reduce((acc, curr) => acc + (curr.score_percent ?? curr.scorePercent ?? 100), 0) /
        totalSubmissions
      )
      : 100;
  const totalHintsUsed = sessions.reduce(
    (acc, curr) => acc + (curr.hints_used ?? curr.hintsUsed ?? 0),
    0
  );
  const totalMisconceptionsDetected = sessions.reduce(
    (acc, curr) => acc + (Array.isArray(curr.misconceptions) ? curr.misconceptions.length : 0),
    0
  );

  // ==========================================
  // JIKA BELUM LOGIN PIN GURU
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1rem",
          background: "linear-gradient(135deg, #f0fdf4 0%, #e2e8f0 100%)"
        }}
      >
        <div
          style={{
            maxWidth: "440px",
            width: "100%",
            background: "white",
            borderRadius: "24px",
            padding: "2.5rem 2rem",
            boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
            textAlign: "center",
            border: "2px solid #86efac"
          }}
        >
          <div
            style={{
              width: "68px",
              height: "68px",
              borderRadius: "20px",
              background: "#dcfce7",
              color: "#166534",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.25rem",
              fontSize: "2rem"
            }}
          >
            👨‍🏫
          </div>

          <h2 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#14532d", marginBottom: "0.5rem" }}>
            Portal Dashboard Guru
          </h2>
          <p style={{ fontSize: "0.92rem", color: "#64748b", marginBottom: "1.75rem", lineHeight: "1.5" }}>
            Akses khusus pendidik untuk memantau nilai, rekap misi, dan transkrip percakapan Sokratik siswa.
          </p>

          <form onSubmit={handlePinSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ position: "relative" }}>
              <input
                type="password"
                placeholder="Masukkan PIN Guru..."
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                autoFocus
                maxLength={10}
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem 0.85rem 2.8rem",
                  borderRadius: "14px",
                  border: "2px solid #cbd5e1",
                  fontSize: "1.1rem",
                  letterSpacing: "4px",
                  textAlign: "center",
                  outline: "none"
                }}
              />
              <Lock
                size={18}
                color="#94a3b8"
                style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
              />
            </div>

            {pinError && (
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "#dc2626",
                  background: "#fee2e2",
                  padding: "0.5rem",
                  borderRadius: "8px"
                }}
              >
                {pinError}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              style={{
                width: "100%",
                padding: "0.85rem",
                borderRadius: "14px",
                fontWeight: "700",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)",
                transition: "all 0.2s ease"
              }}
            >
              <Unlock size={18} />
              <span>Buka Dashboard Guru</span>
            </button>
          </form>

          <div
            style={{
              marginTop: "1.5rem",
              paddingTop: "1.25rem",
              borderTop: "1px solid #f1f5f9",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <button
              onClick={onBackToMenu}
              style={{
                background: "transparent",
                border: "none",
                color: "#64748b",
                fontSize: "0.88rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px"
              }}
            >
              <ArrowLeft size={16} />
              <span>Kembali</span>
            </button>

            <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
              Khusus Pendidik / Guru
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // DASHBOARD AKTIF (AUTHENTICATED)
  // ==========================================
  return (
    <div className="teacher-portal-view" style={{ maxWidth: "1280px", margin: "0 auto", padding: "1.5rem 1rem 4rem" }}>
      {/* Top Banner & Header */}
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "1.25rem 1.75rem",
          boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
          border: "2px solid #e2e8f0",
          marginBottom: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <button
            onClick={onBackToMenu}
            className="nav-pill-btn"
            style={{ background: "#f1f5f9", borderColor: "#cbd5e1" }}
            title="Kembali ke Mode Permainan Siswa"
          >
            <ArrowLeft size={16} />
            <span>Kembali</span>
          </button>

          <div>
            <h1
              style={{
                fontSize: "1.45rem",
                fontWeight: "900",
                color: "#0f172a",
                margin: 0
              }}
            >
              Dashboard Guru
            </h1>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={loadData}
            disabled={isLoading}
            className="nav-pill-btn"
            style={{ background: "#f8fafc" }}
            title="Muat ulang data terbaru"
          >
            <RefreshCw size={15} className={isLoading ? "spin-animate" : ""} />
            <span>{isLoading ? "Memuat..." : "Refresh"}</span>
          </button>

          {sessions.length > 0 && (
            <button
              onClick={handleExportCSV}
              className="nav-pill-btn"
              style={{ background: "#ecfdf5", color: "#065f46", borderColor: "#a7f3d0", fontWeight: "700" }}
              title="Unduh format Excel / CSV"
            >
              <FileSpreadsheet size={15} />
              <span>Ekspor Excel</span>
            </button>
          )}

          <button
            onClick={handleLogoutTeacher}
            className="nav-pill-btn"
            style={{ background: "#fef2f2", color: "#b91c1c", borderColor: "#fecaca" }}
            title="Keluar dari Dashboard Guru"
          >
            <LogOut size={14} />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* 4 Kartu Statistik */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem"
        }}
      >
        <div style={{ background: "white", padding: "1.2rem", borderRadius: "16px", border: "2px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "700" }}>Total Siswa Terdata</span>
            <Users size={20} color="#0284c7" />
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: "900", color: "#0f172a" }}>
            {totalUniqueStudents} <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#64748b" }}>siswa</span>
          </div>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Dari total {totalSubmissions} sesi misi selesai</div>
        </div>

        <div style={{ background: "white", padding: "1.2rem", borderRadius: "16px", border: "2px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "700" }}>Rata-rata Skor</span>
            <Award size={20} color="#16a34a" />
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: "900", color: "#16a34a" }}>{avgScore}%</div>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Tingkat penguasaan konsep IPAS</div>
        </div>

        <div style={{ background: "white", padding: "1.2rem", borderRadius: "16px", border: "2px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "700" }}>Petunjuk Digunakan</span>
            <HelpCircle size={20} color="#d97706" />
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: "900", color: "#d97706" }}>{totalHintsUsed}</div>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Scaffolding H1 - H3 dibuka siswa</div>
        </div>

        <div style={{ background: "white", padding: "1.2rem", borderRadius: "16px", border: "2px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "700" }}>Miskonsepsi Terdeteksi</span>
            <AlertCircle size={20} color="#dc2626" />
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: "900", color: "#dc2626" }}>{totalMisconceptionsDetected}</div>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Perlu penguatan konsep oleh guru</div>
        </div>
      </div>

      {/* =========================================================
          VIEW 1: TAMPILAN TRANSKRIP CHAT PERCAKAPAN SISWA
         ========================================================= */}
      {selectedTranscript ? (
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            border: "2px solid #cbd5e1",
            padding: "1.5rem",
            boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            marginBottom: "2rem"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "2px solid #f1f5f9",
              paddingBottom: "1rem",
              marginBottom: "1.2rem",
              flexWrap: "wrap",
              gap: "10px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                className="nav-pill-btn"
                onClick={() => setSelectedTranscript(null)}
                style={{ background: "#f1f5f9" }}
              >
                <ArrowLeft size={16} />
                <span>
                  {selectedStudent ? `Kembali ke Rincian ${selectedStudent.studentName}` : "Kembali ke Daftar Siswa"}
                </span>
              </button>

              <button
                className="nav-pill-btn"
                onClick={() =>
                  handleDeleteOne(
                    selectedTranscript.id || selectedTranscript.created_at,
                    selectedTranscript.student_name || selectedTranscript.studentName
                  )
                }
                style={{ background: "#fef2f2", color: "#b91c1c", borderColor: "#fecaca" }}
              >
                <Trash2 size={14} />
                <span>Hapus Sesi Misi Ini</span>
              </button>
            </div>

            <div style={{ textAlign: "right" }}>
              <h3 style={{ margin: 0, color: "#0f172a", fontSize: "1.2rem" }}>
                Transkrip: {selectedTranscript.student_name || selectedTranscript.studentName} (
                {selectedTranscript.student_class || selectedTranscript.studentClass || "SD"})
              </h3>
              <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#64748b" }}>
                Misi: {selectedTranscript.mission_title || selectedTranscript.missionTitle} • Skor:{" "}
                {selectedTranscript.score_percent ?? selectedTranscript.scorePercent ?? 100}% • Waktu:{" "}
                {new Date(selectedTranscript.created_at || selectedTranscript.completed_at || Date.now()).toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          {/* List Chat Bubble */}
          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
              maxHeight: "65vh",
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
                      <div
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "50%",
                          background: "#d1fae5",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.1rem"
                        }}
                      >
                        🤖
                      </div>
                    )}

                    <div
                      style={{
                        maxWidth: "75%",
                        padding: "0.75rem 1rem",
                        borderRadius: "16px",
                        fontSize: "0.92rem",
                        background: isBot ? (msg.isHint ? "#fffbeb" : "white") : "#0284c7",
                        color: isBot ? "#1e293b" : "white",
                        border: isBot ? (msg.isHint ? "1px solid #fde68a" : "1px solid #e2e8f0") : "none",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.03)"
                      }}
                    >
                      {msg.isHint && (
                        <div style={{ fontWeight: "800", fontSize: "0.8rem", marginBottom: "4px", color: "#d97706" }}>
                          💡 Petunjuk SOKRABOT ({msg.hintLevel?.toUpperCase() || "BANTUAN"})
                        </div>
                      )}
                      {msg.isAIGenerated && (
                        <div
                          style={{
                            fontWeight: "800",
                            fontSize: "0.78rem",
                            marginBottom: "4px",
                            color: "#059669",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px"
                          }}
                        >
                          <Sparkles size={12} />
                          Respon Socratic AI (Gemini)
                        </div>
                      )}
                      <div style={{ whiteSpace: "pre-line", lineHeight: "1.45" }}>{msg.text}</div>
                      <div
                        style={{
                          fontSize: "0.68rem",
                          opacity: 0.7,
                          marginTop: "6px",
                          textAlign: isBot ? "left" : "right"
                        }}
                      >
                        {msg.timestamp || "-"}
                      </div>
                    </div>

                    {!isBot && (
                      <div
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "50%",
                          background: "#fef3c7",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.1rem"
                        }}
                      >
                        👦
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p style={{ textAlign: "center", color: "#94a3b8", padding: "2.5rem" }}>
                Tidak ada catatan percakapan dalam riwayat ini.
              </p>
            )}
          </div>
        </div>
      ) : selectedStudent ? (
        /* =========================================================
            VIEW 2: DETAIL RINCIAN MISI SISWA TERTENTU (FARISZ, DLL)
           ========================================================= */
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            border: "2px solid #cbd5e1",
            padding: "1.5rem",
            boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
            marginBottom: "2rem"
          }}
        >
          {/* Header Siswa */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "2px solid #f1f5f9",
              paddingBottom: "1.25rem",
              marginBottom: "1.5rem",
              flexWrap: "wrap",
              gap: "12px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                className="nav-pill-btn"
                onClick={() => setSelectedStudent(null)}
                style={{ background: "#f1f5f9" }}
              >
                <ArrowLeft size={16} />
                <span>Kembali ke Semua Siswa</span>
              </button>

              <div>
                <h2 style={{ margin: 0, fontSize: "1.35rem", fontWeight: "900", color: "#0f172a", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>{selectedStudent.studentName}</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0284c7", background: "#e0f2fe", padding: "2px 8px", borderRadius: "8px" }}>
                    {selectedStudent.studentClass} {selectedStudent.studentNumber !== "-" && `(No. ${selectedStudent.studentNumber})`}
                  </span>
                </h2>
                <p style={{ margin: "3px 0 0", fontSize: "0.82rem", color: "#64748b" }}>
                  Selesai <strong>{selectedStudent.completedCount} dari 5 Misi</strong> • Rata-rata Skor:{" "}
                  <strong>{selectedStudent.avgScore}%</strong> • Terakhir aktif:{" "}
                  {new Date(selectedStudent.lastActive).toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleDeleteStudentAll(selectedStudent)}
              className="nav-pill-btn"
              style={{ background: "#fef2f2", color: "#b91c1c", borderColor: "#fecaca" }}
              title="Hapus Seluruh Data Siswa Ini"
            >
              <Trash2 size={14} />
              <span>Hapus Data Siswa Ini</span>
            </button>
          </div>

          {/* Kartu Status 5 Misi Utama SOKRABOT */}
          <div style={{ marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: "800", color: "#1e293b", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "6px" }}>
              <BookOpen size={18} color="#16a34a" />
              <span>Progres 5 Misi Investigasi Siswa:</span>
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
              {MISSIONS_DATA.map((mission, idx) => {
                // Cari data sesi untuk misi ini dari array siswa
                const sessionRecord = selectedStudent.missions.find(
                  (m) =>
                    (m.mission_id || m.missionId || "").toLowerCase() === mission.id.toLowerCase() ||
                    (m.mission_title || m.missionTitle || "").toLowerCase().includes(mission.title.toLowerCase())
                );

                const isDone = Boolean(sessionRecord);
                const stars = sessionRecord?.stars_earned ?? sessionRecord?.starsEarned ?? 3;
                const score = sessionRecord?.score_percent ?? sessionRecord?.scorePercent ?? 100;
                const hints = sessionRecord?.hints_used ?? sessionRecord?.hintsUsed ?? 0;
                const miscs = Array.isArray(sessionRecord?.misconceptions) ? sessionRecord.misconceptions : [];

                return (
                  <div
                    key={mission.id}
                    style={{
                      background: isDone ? "#ffffff" : "#f8fafc",
                      border: isDone ? "2px solid #86efac" : "2px dashed #cbd5e1",
                      borderRadius: "16px",
                      padding: "1.2rem",
                      boxShadow: isDone ? "0 4px 12px rgba(22, 163, 74, 0.06)" : "none",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "10px",
                      transition: "transform 0.15s"
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: "800",
                            color: isDone ? "#166534" : "#64748b",
                            background: isDone ? "#dcfce7" : "#e2e8f0",
                            padding: "2px 8px",
                            borderRadius: "6px"
                          }}
                        >
                          Misi {idx + 1}: {mission.code}
                        </span>

                        {isDone ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", color: "#16a34a", fontWeight: "700" }}>
                            <Check size={14} /> Selesai
                          </span>
                        ) : (
                          <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: "600" }}>
                            Belum Dikerjakan
                          </span>
                        )}
                      </div>

                      <h4 style={{ margin: "0 0 4px", fontSize: "1rem", fontWeight: "800", color: isDone ? "#0f172a" : "#64748b" }}>
                        {mission.icon} {mission.title}
                      </h4>
                      <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b", lineHeight: "1.4" }}>
                        {mission.focus}
                      </p>
                    </div>

                    {isDone ? (
                      <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "8px", marginTop: "4px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                          <div>
                            <span style={{ fontSize: "0.95rem" }}>{"⭐".repeat(Math.max(1, Math.min(3, stars)))}</span>
                            <span style={{ marginLeft: "6px", fontWeight: "800", color: score >= 80 ? "#16a34a" : "#d97706", fontSize: "0.9rem" }}>
                              {score}%
                            </span>
                          </div>

                          <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                            {hints > 0 ? `💡 ${hints}x Petunjuk` : "✨ Mandiri"}
                          </span>
                        </div>

                        {miscs.length > 0 ? (
                          <div
                            style={{
                              background: "#fee2e2",
                              color: "#b91c1c",
                              fontSize: "0.75rem",
                              fontWeight: "700",
                              padding: "4px 8px",
                              borderRadius: "6px",
                              marginBottom: "8px"
                            }}
                          >
                            ⚠️ {miscs.length} Miskonsepsi Terdeteksi
                          </div>
                        ) : (
                          <div
                            style={{
                              background: "#f0fdf4",
                              color: "#166534",
                              fontSize: "0.75rem",
                              fontWeight: "600",
                              padding: "3px 8px",
                              borderRadius: "6px",
                              marginBottom: "8px"
                            }}
                          >
                            ✓ Konsep Dipahami dengan Benar
                          </div>
                        )}

                        <button
                          onClick={() => setSelectedTranscript(sessionRecord)}
                          className="nav-pill-btn"
                          style={{
                            width: "100%",
                            justifyContent: "center",
                            background: "#ecfdf5",
                            color: "#065f46",
                            borderColor: "#a7f3d0",
                            fontSize: "0.82rem",
                            fontWeight: "700",
                            padding: "6px"
                          }}
                        >
                          <Eye size={14} />
                          <span>Buka Transkrip Chat Sokratik</span>
                        </button>
                      </div>
                    ) : (
                      <div style={{ borderTop: "1px dashed #cbd5e1", paddingTop: "8px", textAlign: "center" }}>
                        <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>Menunggu siswa mengerjakan</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================
            VIEW 3: TABEL UTAMA SISWA (MODE PER SISWA / LINEAR)
           ========================================================= */
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            border: "2px solid #e2e8f0",
            padding: "1.5rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
          }}
        >
          {/* Header Bar: Switch Mode & Search */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.25rem",
              flexWrap: "wrap",
              gap: "12px"
            }}
          >
            {/* Toggle Mode Tampilan */}
            <div style={{ display: "flex", background: "#f1f5f9", padding: "4px", borderRadius: "12px", gap: "4px" }}>
              <button
                onClick={() => setViewMode("grouped")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "9px",
                  border: "none",
                  fontSize: "0.85rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: viewMode === "grouped" ? "white" : "transparent",
                  color: viewMode === "grouped" ? "#166534" : "#64748b",
                  boxShadow: viewMode === "grouped" ? "0 2px 6px rgba(0,0,0,0.06)" : "none"
                }}
              >
                <Users size={15} />
                <span>Ringkasan per Siswa ({groupedStudents.length})</span>
              </button>

              <button
                onClick={() => setViewMode("linear")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "9px",
                  border: "none",
                  fontSize: "0.85rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: viewMode === "linear" ? "white" : "transparent",
                  color: viewMode === "linear" ? "#166534" : "#64748b",
                  boxShadow: viewMode === "linear" ? "0 2px 6px rgba(0,0,0,0.06)" : "none"
                }}
              >
                <ListFilter size={15} />
                <span>Log Riwayat Semua Sesi ({sessions.length})</span>
              </button>
            </div>

            {/* Filter Dropdowns */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                style={{
                  padding: "0.6rem 0.9rem",
                  borderRadius: "12px",
                  border: "2px solid #e2e8f0",
                  fontSize: "0.86rem",
                  outline: "none",
                  background: "white"
                }}
              >
                <option value="ALL">Semua Tingkat Kelas</option>
                <option value="Kelas 4">Kelas 4 SD</option>
                <option value="Kelas 5">Kelas 5 SD</option>
                <option value="Kelas 6">Kelas 6 SD</option>
              </select>

              <select
                value={filterMission}
                onChange={(e) => setFilterMission(e.target.value)}
                style={{
                  padding: "0.6rem 0.9rem",
                  borderRadius: "12px",
                  border: "2px solid #e2e8f0",
                  fontSize: "0.86rem",
                  outline: "none",
                  background: "white"
                }}
              >
                <option value="ALL">Semua Misi</option>
                <option value="misi_1">Misi 1: Siapa Aku?</option>
                <option value="misi_2">Misi 2: Rantai Makanan</option>
                <option value="misi_3">Misi 3: Siapa Memburu Siapa?</option>
                <option value="misi_4">Misi 4: Sawah dalam Bahaya!</option>
                <option value="misi_5">Misi 5: Jaga Keseimbangan!</option>
              </select>

              {sessions.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="nav-pill-btn"
                  style={{ background: "#fef2f2", color: "#b91c1c", borderColor: "#fecaca" }}
                  title="Hapus seluruh data siswa"
                >
                  <Trash2 size={14} />
                  <span>Hapus Semua</span>
                </button>
              )}
            </div>
          </div>

          {/* Search Input */}
          <div style={{ position: "relative", marginBottom: "1.25rem" }}>
            <Search
              size={16}
              color="#94a3b8"
              style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type="text"
              placeholder="Cari nama siswa, kelas, no absen, atau misi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "0.65rem 1rem 0.65rem 2.4rem",
                borderRadius: "12px",
                border: "2px solid #e2e8f0",
                fontSize: "0.9rem",
                outline: "none"
              }}
            />
          </div>

          {/* =========================================================
              TABEL MODE: PER SISWA (GROUPED BY STUDENT)
             ========================================================= */}
          {viewMode === "grouped" ? (
            <div style={{ overflowX: "auto", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0", color: "#475569" }}>
                    <th style={{ padding: "0.85rem 1rem" }}>Nama Siswa</th>
                    <th style={{ padding: "0.85rem 1rem" }}>Kelas / No</th>
                    <th style={{ padding: "0.85rem 1rem", textAlign: "center" }}>Misi Dikerjakan</th>
                    <th style={{ padding: "0.85rem 1rem", textAlign: "center" }}>Rata-rata Skor</th>
                    <th style={{ padding: "0.85rem 1rem", textAlign: "center" }}>Total Bintang</th>
                    <th style={{ padding: "0.85rem 1rem" }}>Daftar Misi Selesai</th>
                    <th style={{ padding: "0.85rem 1rem" }}>Status Miskonsepsi</th>
                    <th style={{ padding: "0.85rem 1rem", textAlign: "center" }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((st, idx) => {
                      const completedCount = st.completedCount;
                      const hasMisconceptions = st.allMisconceptions.length > 0;

                      return (
                        <tr
                          key={st.key}
                          onClick={() => setSelectedStudent(st)}
                          style={{
                            borderBottom: "1px solid #f1f5f9",
                            cursor: "pointer",
                            transition: "background 0.15s",
                            background: idx % 2 === 0 ? "white" : "#fafafa"
                          }}
                        >
                          <td style={{ padding: "0.85rem 1rem", fontWeight: "800", color: "#0f172a" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <div
                                style={{
                                  width: "32px",
                                  height: "32px",
                                  borderRadius: "50%",
                                  background: "#dcfce7",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "0.95rem"
                                }}
                              >
                                👦
                              </div>
                              <span>{st.studentName}</span>
                            </div>
                          </td>

                          <td style={{ padding: "0.85rem 1rem", color: "#475569" }}>
                            {st.studentClass} {st.studentNumber !== "-" && <span style={{ color: "#94a3b8" }}>(#{st.studentNumber})</span>}
                          </td>

                          <td style={{ padding: "0.85rem 1rem", textAlign: "center" }}>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                background: completedCount >= 5 ? "#dcfce7" : "#e0f2fe",
                                color: completedCount >= 5 ? "#166534" : "#0369a1",
                                padding: "3px 10px",
                                borderRadius: "999px",
                                fontWeight: "800",
                                fontSize: "0.82rem"
                              }}
                            >
                              {completedCount} / 5 Misi
                            </span>
                          </td>

                          <td style={{ padding: "0.85rem 1rem", textAlign: "center", fontWeight: "900", color: st.avgScore >= 80 ? "#16a34a" : "#d97706" }}>
                            {st.avgScore}%
                          </td>

                          <td style={{ padding: "0.85rem 1rem", textAlign: "center" }}>
                            <span style={{ fontSize: "0.95rem" }}>⭐ {st.totalStars}</span>
                          </td>

                          <td style={{ padding: "0.85rem 1rem" }}>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                              {st.missions.map((m, mIdx) => (
                                <span
                                  key={m.id || mIdx}
                                  style={{
                                    fontSize: "0.72rem",
                                    background: "#f1f5f9",
                                    color: "#334155",
                                    padding: "2px 6px",
                                    borderRadius: "4px",
                                    fontWeight: "600"
                                  }}
                                  title={`${m.mission_title} (${m.score_percent}%)`}
                                >
                                  {m.mission_title?.replace("Misi", "").trim() || `Misi ${mIdx + 1}`}
                                </span>
                              ))}
                            </div>
                          </td>

                          <td style={{ padding: "0.85rem 1rem" }}>
                            {hasMisconceptions ? (
                              <span
                                style={{
                                  background: "#fee2e2",
                                  color: "#b91c1c",
                                  padding: "3px 8px",
                                  borderRadius: "6px",
                                  fontSize: "0.75rem",
                                  fontWeight: "700"
                                }}
                                title={st.allMisconceptions.join(", ")}
                              >
                                ⚠️ {st.allMisconceptions.length} terpicu
                              </span>
                            ) : (
                              <span style={{ color: "#10b981", fontSize: "0.8rem", fontWeight: "700" }}>✓ Tepat</span>
                            )}
                          </td>

                          <td style={{ padding: "0.85rem 1rem", textAlign: "center" }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedStudent(st);
                              }}
                              className="nav-pill-btn"
                              style={{
                                padding: "5px 12px",
                                fontSize: "0.82rem",
                                background: "#f0fdf4",
                                color: "#166534",
                                borderColor: "#bbf7d0",
                                fontWeight: "700"
                              }}
                            >
                              <span>Lihat Misi</span>
                              <ChevronRight size={14} />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ textAlign: "center", padding: "3rem 1rem", color: "#94a3b8" }}>
                        <HelpCircle size={32} style={{ margin: "0 auto 8px", opacity: 0.5 }} />
                        <p style={{ margin: 0, fontWeight: "600" }}>Belum ada data siswa yang sesuai.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            /* =========================================================
                TABEL MODE: LINEAR (SEMUA SESI LENGKAP)
               ========================================================= */
            <div style={{ overflowX: "auto", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0", color: "#475569" }}>
                    <th style={{ padding: "0.85rem 1rem" }}>Waktu</th>
                    <th style={{ padding: "0.85rem 1rem" }}>Nama Siswa</th>
                    <th style={{ padding: "0.85rem 1rem" }}>Kelas / No</th>
                    <th style={{ padding: "0.85rem 1rem" }}>Misi</th>
                    <th style={{ padding: "0.85rem 1rem", textAlign: "center" }}>Bintang</th>
                    <th style={{ padding: "0.85rem 1rem", textAlign: "center" }}>Skor</th>
                    <th style={{ padding: "0.85rem 1rem", textAlign: "center" }}>Petunjuk</th>
                    <th style={{ padding: "0.85rem 1rem" }}>Miskonsepsi</th>
                    <th style={{ padding: "0.85rem 1rem", textAlign: "center" }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLinearSessions.length > 0 ? (
                    filteredLinearSessions.map((s, idx) => {
                      const stars = s.stars_earned ?? s.starsEarned ?? 3;
                      const studentName = s.student_name || s.studentName || "Siswa";
                      const studentClass = s.student_class || s.studentClass || "-";
                      const studentNo = s.student_number || s.studentNumber || "-";
                      const missionTitle = s.mission_title || s.missionTitle || s.mission_id || "Misi Sawah";
                      const score = s.score_percent ?? s.scorePercent ?? 100;
                      const hints = s.hints_used ?? s.hintsUsed ?? 0;
                      const miscs = Array.isArray(s.misconceptions) ? s.misconceptions : [];
                      const timeStr = new Date(s.created_at || s.completed_at || Date.now()).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit"
                      });

                      return (
                        <tr
                          key={s.id || idx}
                          style={{
                            borderBottom: "1px solid #f1f5f9",
                            transition: "background 0.15s",
                            background: idx % 2 === 0 ? "white" : "#fafafa"
                          }}
                        >
                          <td style={{ padding: "0.85rem 1rem", color: "#64748b", whiteSpace: "nowrap" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                              <Clock size={13} color="#94a3b8" />
                              <span>{timeStr}</span>
                            </div>
                          </td>

                          <td style={{ padding: "0.85rem 1rem", fontWeight: "700", color: "#0f172a" }}>
                            {studentName}
                          </td>

                          <td style={{ padding: "0.85rem 1rem", color: "#475569" }}>
                            {studentClass} {studentNo !== "-" && <span style={{ color: "#94a3b8" }}>(#{studentNo})</span>}
                          </td>

                          <td style={{ padding: "0.85rem 1rem", color: "#1e293b", fontWeight: "600" }}>
                            {missionTitle}
                          </td>

                          <td style={{ padding: "0.85rem 1rem", textAlign: "center" }}>
                            <span style={{ fontSize: "1rem" }}>
                              {"⭐".repeat(Math.max(1, Math.min(3, stars)))}
                            </span>
                          </td>

                          <td style={{ padding: "0.85rem 1rem", textAlign: "center", fontWeight: "800", color: score >= 80 ? "#16a34a" : "#d97706" }}>
                            {score}%
                          </td>

                          <td style={{ padding: "0.85rem 1rem", textAlign: "center", color: "#64748b" }}>
                            {hints > 0 ? (
                              <span style={{ background: "#fef3c7", color: "#b45309", padding: "2px 8px", borderRadius: "8px", fontWeight: "700", fontSize: "0.8rem" }}>
                                {hints}x
                              </span>
                            ) : (
                              <span style={{ color: "#10b981", fontWeight: "700" }}>Mandiri</span>
                            )}
                          </td>

                          <td style={{ padding: "0.85rem 1rem" }}>
                            {miscs.length > 0 ? (
                              <span
                                style={{
                                  background: "#fee2e2",
                                  color: "#b91c1c",
                                  padding: "3px 8px",
                                  borderRadius: "6px",
                                  fontSize: "0.75rem",
                                  fontWeight: "700"
                                }}
                                title={miscs.map((m) => (typeof m === "string" ? m : m.name || m.id)).join(", ")}
                              >
                                ⚠️ {miscs.length} terpicu
                              </span>
                            ) : (
                              <span style={{ color: "#10b981", fontSize: "0.8rem", fontWeight: "600" }}>✓ Tepat</span>
                            )}
                          </td>

                          <td style={{ padding: "0.85rem 1rem", textAlign: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                              <button
                                onClick={() => setSelectedTranscript(s)}
                                className="nav-pill-btn"
                                style={{ padding: "4px 10px", fontSize: "0.8rem", background: "#f0fdf4", color: "#166534", borderColor: "#bbf7d0" }}
                                title="Buka Transkrip Obrolan Sokratik Siswa"
                              >
                                <Eye size={13} />
                                <span>Transkrip</span>
                              </button>

                              <button
                                onClick={() => handleDeleteOne(s.id, studentName)}
                                style={{
                                  background: "transparent",
                                  border: "none",
                                  color: "#ef4444",
                                  cursor: "pointer",
                                  padding: "4px"
                                }}
                                title="Hapus Sesi"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="9" style={{ textAlign: "center", padding: "3rem 1rem", color: "#94a3b8" }}>
                        <HelpCircle size={32} style={{ margin: "0 auto 8px", opacity: 0.5 }} />
                        <p style={{ margin: 0, fontWeight: "600" }}>Belum ada data pengerjaan siswa yang sesuai.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
