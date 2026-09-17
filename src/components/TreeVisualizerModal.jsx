import React, { useState } from "react";
import { X, GitBranch, ArrowRight, CheckCircle2, HelpCircle, FileSpreadsheet, Code2 } from "lucide-react";
import { getAllNodes } from "../data/decisionTreeSawah";

export default function TreeVisualizerModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("tree"); // 'tree' | 'schema'
  const nodes = getAllNodes();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card-tree" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <GitBranch size={22} color="#10b981" />
            <div>
              <h3>Peta Alur Decision Tree (Socratic Questioning)</h3>
              <p style={{ fontSize: "0.82rem", color: "#64748b" }}>
                Inspeksi struktur percabangan berbasis data JSON murni (Mudah dikonversi ke Excel)
              </p>
            </div>
          </div>
          <button
            className="nav-icon-btn"
            onClick={onClose}
            title="Tutup Modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selector */}
        <div style={{ display: "flex", gap: "8px", padding: "0.75rem 1.75rem 0", borderBottom: "1px solid #e2e8f0" }}>
          <button
            className={`nav-pill-btn ${activeTab === "tree" ? "active" : ""}`}
            onClick={() => setActiveTab("tree")}
          >
            <GitBranch size={15} />
            <span>Alur Node Percakapan ({nodes.length} Node)</span>
          </button>
          <button
            className={`nav-pill-btn ${activeTab === "schema" ? "active" : ""}`}
            onClick={() => setActiveTab("schema")}
          >
            <FileSpreadsheet size={15} />
            <span>Format Konversi Excel / JSON Guru</span>
          </button>
        </div>

        <div className="modal-body-scroll">
          {activeTab === "tree" ? (
            nodes.map((node) => {
              const isMain = node.isMain;
              const isEnd = node.isEnd;

              return (
                <div
                  key={node.id}
                  className={`tree-node-card ${isMain ? "main-node" : isEnd ? "" : "scaffold-node"}`}
                  id={`node-${node.id}`}
                >
                  <div className="node-header-row">
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        className="node-title-badge"
                        style={{
                          background: isMain ? "#d1fae5" : isEnd ? "#e0f2fe" : "#fef3c7",
                          color: isMain ? "#065f46" : isEnd ? "#0369a1" : "#92400e"
                        }}
                      >
                        {isMain ? `⭐ Pertanyaan Utama ${node.mainIndex}` : isEnd ? "🏁 Titik Selesai" : "💡 Cabang Pengarah (Scaffold)"}
                      </span>
                      <code style={{ fontSize: "0.82rem", background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px" }}>
                        ID: {node.id}
                      </code>
                    </div>
                    <strong style={{ fontSize: "0.95rem", color: "#1e293b" }}>{node.title}</strong>
                  </div>

                  <p style={{ fontSize: "0.95rem", fontWeight: "600", color: "#0f172a", marginTop: "4px" }}>
                    ❓ "{node.question}"
                  </p>

                  {node.hint && (
                    <div style={{ fontSize: "0.82rem", color: "#b45309", background: "rgba(254, 243, 199, 0.6)", padding: "4px 8px", borderRadius: "6px" }}>
                      💡 Petunjuk: {node.hint}
                    </div>
                  )}

                  <div className="node-options-list">
                    <span style={{ fontSize: "0.75rem", fontWeight: "800", color: "#64748b", textTransform: "uppercase" }}>
                      Pilihan Cabang Respon:
                    </span>
                    {node.options?.map((opt) => (
                      <div
                        key={opt.id}
                        className={`node-option-item ${opt.correct ? "correct" : "scaffold-branch"}`}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          {opt.correct ? (
                            <CheckCircle2 size={16} color="#059669" />
                          ) : (
                            <HelpCircle size={16} color="#d97706" />
                          )}
                          <span>
                            <strong>[{opt.id}]</strong> {opt.text}
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem" }}>
                          <span>Lanjut ke:</span>
                          <code style={{ background: "#e2e8f0", padding: "2px 6px", borderRadius: "4px", fontWeight: "700" }}>
                            {opt.next}
                          </code>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "1rem", borderRadius: "12px" }}>
                <h4 style={{ color: "#166534", marginBottom: "6px" }}>Format Kolom Excel untuk Guru:</h4>
                <p style={{ fontSize: "0.9rem", color: "#15803d" }}>
                  Guru dapat menyusun materi dalam Spreadsheet/Excel dengan kolom-kolom berikut, yang dapat langsung diekspor menjadi JSON tanpa mengubah kode program:
                </p>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", background: "white" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", textAlign: "left", borderBottom: "2px solid #cbd5e1" }}>
                    <th style={{ padding: "8px" }}>Nama Kolom Excel</th>
                    <th style={{ padding: "8px" }}>Tipe Data</th>
                    <th style={{ padding: "8px" }}>Deskripsi / Contoh</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "8px" }}><code>node_id</code></td>
                    <td style={{ padding: "8px" }}>Teks unik</td>
                    <td style={{ padding: "8px" }}><code>q1_main</code> atau <code>q1_scaffold_1</code></td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "8px" }}><code>is_main</code></td>
                    <td style={{ padding: "8px" }}>TRUE / FALSE</td>
                    <td style={{ padding: "8px" }}>Menentukan apakah ini pertanyaan utama penentu progress</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "8px" }}><code>question</code></td>
                    <td style={{ padding: "8px" }}>Teks Pertanyaan</td>
                    <td style={{ padding: "8px" }}>Pertanyaan yang diucapkan bot</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "8px" }}><code>option_a_text</code></td>
                    <td style={{ padding: "8px" }}>Teks</td>
                    <td style={{ padding: "8px" }}>Teks jawaban untuk opsi A</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "8px" }}><code>option_a_correct</code></td>
                    <td style={{ padding: "8px" }}>TRUE / FALSE</td>
                    <td style={{ padding: "8px" }}>Status kebenaran ilmiah</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "8px" }}><code>option_a_feedback</code></td>
                    <td style={{ padding: "8px" }}>Teks Umpan Balik</td>
                    <td style={{ padding: "8px" }}>Respon positif atau arahan berpikir</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "8px" }}><code>option_a_next</code></td>
                    <td style={{ padding: "8px" }}>Target Node ID</td>
                    <td style={{ padding: "8px" }}>ID pertanyaan tujuan jika memilih A</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
