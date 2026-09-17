import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import LandingHero from "./components/LandingHero";
import HowToPlay from "./components/HowToPlay";
import MissionCard from "./components/MissionCard";
import ChatHeader from "./components/ChatHeader";
import ChatMessageList from "./components/ChatMessageList";
import ChatOptionButtons from "./components/ChatOptionButtons";
import ChatHintDrawer from "./components/ChatHintDrawer";
import ResultCard from "./components/ResultCard";
import TreeVisualizerModal from "./components/TreeVisualizerModal";
import TeacherDashboardModal from "./components/TeacherDashboardModal";
import StudentProfileModal from "./components/StudentProfileModal";
import Footer from "./components/Footer";

import { MISSIONS_DATA, getMissionById } from "./data/missions";
import { getNode } from "./data/decisionTreeSawah";
import { BranchingSessionController } from "./engine/conversationEngine";
import { storage } from "./utils/storage";
import { studentSession } from "./utils/studentSession";

export default function App() {
  // Navigation View: 'landing' | 'missions' | 'chat' | 'result'
  const [currentView, setCurrentView] = useState("landing");
  const [selectedMissionId, setSelectedMissionId] = useState("sawah-pak-budi");
  
  // Modals
  const [isTreeModalOpen, setIsTreeModalOpen] = useState(false);
  const [isTeacherDashboardOpen, setIsTeacherDashboardOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [pendingMissionId, setPendingMissionId] = useState(null);

  // Chat Session State
  const [chatState, setChatState] = useState(null);
  const controllerRef = useRef(null);

  // Sync dengan Hash URL untuk kemudahan navigasi
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash.startsWith("/mission/")) {
        const id = hash.replace("/mission/", "");
        setSelectedMissionId(id || "sawah-pak-budi");
        setCurrentView("chat");
      } else if (hash === "/missions") {
        setCurrentView("missions");
      } else if (hash === "/result") {
        setCurrentView("result");
      } else {
        setCurrentView("landing");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    // Parse saat load pertama kali
    if (window.location.hash) {
      handleHashChange();
    }

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateTo = (view, missionId = null) => {
    // Jika masuk ke 'chat' tetapi siswa belum mengisi nama, buka form profil siswa terlebih dahulu!
    if (view === "chat") {
      const activeStudent = studentSession.getActiveStudent();
      if (!activeStudent) {
        setPendingMissionId(missionId || selectedMissionId);
        setIsStudentModalOpen(true);
        return;
      }
    }

    if (missionId) {
      setSelectedMissionId(missionId);
    }
    setCurrentView(view);

    // Update Hash URL
    if (view === "chat") {
      window.location.hash = `/mission/${missionId || selectedMissionId}`;
    } else if (view === "missions") {
      window.location.hash = "/missions";
    } else if (view === "result") {
      window.location.hash = "/result";
    } else {
      window.location.hash = "/";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Callback saat siswa menyimpan profil
  const handleStudentProfileSaved = () => {
    setIsStudentModalOpen(false);
    if (pendingMissionId) {
      const target = pendingMissionId;
      setPendingMissionId(null);
      navigateTo("chat", target);
    }
  };

  // Inisialisasi atau pulihkan engine chat saat masuk ke view 'chat'
  useEffect(() => {
    if (currentView === "chat") {
      const controller = new BranchingSessionController(selectedMissionId, (state) => {
        setChatState(state);
        if (state.isFinished) {
          navigateTo("result");
        }
      });
      controllerRef.current = controller;
      controller.startOrResume();

      return () => {
        controller.cleanup();
      };
    }
  }, [currentView, selectedMissionId]);

  const activeMission = getMissionById(selectedMissionId);
  const currentNode = chatState ? getNode(chatState.currentNodeId) : null;

  return (
    <div className="app-container">
      {/* Navbar Atas */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => navigateTo(view)}
        onOpenTreeModal={() => setIsTreeModalOpen(true)}
        onOpenTeacherDashboard={() => setIsTeacherDashboardOpen(true)}
        onOpenStudentModal={() => setIsStudentModalOpen(true)}
      />

      <main className="main-content">
        {/* =========================================================
            1. LANDING PAGE
           ========================================================= */}
        {currentView === "landing" && (
          <>
            <LandingHero
              onStartAdventure={() => navigateTo("chat", "sawah-pak-budi")}
              onExploreMissions={() => navigateTo("missions")}
            />

            <HowToPlay />

            {/* Featured Missions Section */}
            <section className="section-wrapper" style={{ paddingTop: "1rem" }}>
              <div className="section-header">
                <span className="section-header-tag">Mulai Berpetualang</span>
                <h2>Misi Pembelajaran Pilihan 🚀</h2>
                <p>Pilih topik sains dan pecahkan teka-tekinya bersama Timi</p>
              </div>

              <div className="missions-grid">
                {MISSIONS_DATA.map((mission) => (
                  <MissionCard
                    key={mission.id}
                    mission={mission}
                    onSelectMission={(id) => navigateTo("chat", id)}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {/* =========================================================
            2. HALAMAN PILIH MISI
           ========================================================= */}
        {currentView === "missions" && (
          <section className="section-wrapper">
            <div className="section-header" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <span className="section-header-tag">Daftar Materi SD</span>
              <h2>Pilih Misi Belajarmu 🚀</h2>
              <p>Pilih misi sains yang ingin kamu selesaikan hari ini</p>
            </div>

            <div className="missions-grid">
              {MISSIONS_DATA.map((mission) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  onSelectMission={(id) => navigateTo("chat", id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* =========================================================
            3. HALAMAN CHATBOT PEMBELAJARAN
           ========================================================= */}
        {currentView === "chat" && (
          <div className="chat-page-wrapper">
            <div className="chat-room-card">
              {/* Header Chat */}
              <ChatHeader
                mission={activeMission}
                currentMainIndex={chatState?.stats?.currentMainIndex || 1}
                totalMainQuestions={chatState?.stats?.totalMainQuestions || activeMission.totalMainQuestions}
                onBack={() => navigateTo("missions")}
                onRestart={() => {
                  if (window.confirm("Mulai ulang misi dari awal?")) {
                    controllerRef.current?.startOrResume(true);
                  }
                }}
              />

              {/* Daftar Pesan Obrolan */}
              <ChatMessageList
                messages={chatState?.messages || []}
                isBotTyping={chatState?.isBotTyping || false}
              />

              {/* Hint Drawer Berpikir */}
              <ChatHintDrawer hintText={currentNode?.hint} />

              {/* Pilihan Jawaban (A, B, C, D) */}
              <ChatOptionButtons
                options={chatState?.currentOptions || []}
                disabled={chatState?.optionsDisabled || chatState?.isBotTyping}
                onSelectOption={(option) => {
                  controllerRef.current?.chooseOption(option);
                }}
              />
            </div>
          </div>
        )}

        {/* =========================================================
            4. HALAMAN HASIL / PROGRES BELAJAR
           ========================================================= */}
        {currentView === "result" && (
          <ResultCard
            mission={activeMission}
            stats={
              chatState?.stats || {
                totalMainQuestions: activeMission.totalMainQuestions,
                completedMainCount: activeMission.totalMainQuestions,
                hintsUsed: 0,
                firstTryCorrectCount: activeMission.totalMainQuestions
              }
            }
            onReplay={() => {
              storage.clearMissionState(selectedMissionId);
              navigateTo("chat", selectedMissionId);
            }}
            onBackToMissions={() => navigateTo("missions")}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal Input Identitas Siswa */}
      <StudentProfileModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        onSaveStudent={handleStudentProfileSaved}
      />

      {/* Modal Dashboard Guru (Melihat Transkrip Obrolan & Ekspor) */}
      <TeacherDashboardModal
        isOpen={isTeacherDashboardOpen}
        onClose={() => setIsTeacherDashboardOpen(false)}
      />

      {/* Modal Visualisasi Struktur Decision Tree (Guru & Evaluasi) */}
      <TreeVisualizerModal
        isOpen={isTreeModalOpen}
        onClose={() => setIsTreeModalOpen(false)}
      />
    </div>
  );
}
