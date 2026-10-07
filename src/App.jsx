import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import SplashScreen from "./components/SplashScreen";
import MainMenu from "./components/MainMenu";
import MissionMap from "./components/MissionMap";
import BukuPintarView from "./components/BukuPintarView";
import AchievementsView from "./components/AchievementsView";
import GuideView from "./components/GuideView";
import ChatHeader from "./components/ChatHeader";
import ChatMessageList from "./components/ChatMessageList";
import ChatTextInput from "./components/ChatTextInput";
import ChatOptionButtons from "./components/ChatOptionButtons";
import ChatHintDrawer from "./components/ChatHintDrawer";
import VisualHintModal from "./components/VisualHintModal";
import ResultCard from "./components/ResultCard";
import TeacherDashboardModal from "./components/TeacherDashboardModal";
import TeacherDashboardView from "./components/TeacherDashboardView";
import StudentProfileModal from "./components/StudentProfileModal";
import Footer from "./components/Footer";
import MobileBottomNav from "./components/MobileBottomNav";

import { getMissionById } from "./data/missions";
import { BranchingSessionController } from "./engine/conversationEngine";
import { storage } from "./utils/storage";
import { studentSession } from "./utils/studentSession";
import { getMissionProgress } from "./utils/sokrabotProgress";

export default function App() {
  const [activeStudent, setActiveStudent] = useState(studentSession.getActiveStudent());
  
  // Navigation View: 'splash' | 'menu' | 'map' | 'chat' | 'codex' | 'achievements' | 'guide' | 'result'
  const [currentView, setCurrentView] = useState(activeStudent ? "menu" : "splash");
  const [selectedMissionId, setSelectedMissionId] = useState("misi_1");

  // Modals & Drawers
  const [isTeacherDashboardOpen, setIsTeacherDashboardOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isHintDrawerOpen, setIsHintDrawerOpen] = useState(false);
  const [activeVisualHintModal, setActiveVisualHintModal] = useState(null);

  // Chat Session State
  const [chatState, setChatState] = useState(null);
  const controllerRef = useRef(null);

  // Pantau perubahan siswa aktif secara global
  useEffect(() => {
    const handleStudentChange = (e) => {
      const updated = e.detail || studentSession.getActiveStudent();
      setActiveStudent(updated);
      if (!updated && currentView !== "splash") {
        setCurrentView("splash");
      }
    };
    window.addEventListener("timi_student_changed", handleStudentChange);
    return () => window.removeEventListener("timi_student_changed", handleStudentChange);
  }, [currentView]);

  // Sync dengan Hash URL
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "/guru" || hash === "/teacher") {
        setCurrentView("teacher");
        return;
      }
      if (hash.startsWith("/mission/")) {
        const id = hash.replace("/mission/", "");
        setSelectedMissionId(id || "misi_1");
        setCurrentView("chat");
      } else if (hash === "/map") {
        setCurrentView("map");
      } else if (hash === "/codex") {
        setCurrentView("codex");
      } else if (hash === "/achievements") {
        setCurrentView("achievements");
      } else if (hash === "/guide") {
        setCurrentView("guide");
      } else if (hash === "/result") {
        setCurrentView("result");
      } else if (hash === "/menu") {
        setCurrentView("menu");
      } else if (hash === "/splash" || !studentSession.getActiveStudent()) {
        setCurrentView("splash");
      } else {
        setCurrentView("menu");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    if (window.location.hash) {
      handleHashChange();
    }
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateTo = (view, missionId = null) => {
    // Portal Guru memiliki rute dan hak akses tersendiri
    if (view === "teacher" || view === "guru") {
      setCurrentView("teacher");
      window.location.hash = "/guru";
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Jika belum ada identitas siswa, arahkan ke splash screen
    if (!studentSession.getActiveStudent() && view !== "splash") {
      setCurrentView("splash");
      window.location.hash = "/splash";
      return;
    }

    if (missionId) {
      setSelectedMissionId(missionId);
    }
    setCurrentView(view);

    // Update Hash URL
    if (view === "chat") {
      window.location.hash = `/mission/${missionId || selectedMissionId}`;
    } else if (view === "map") {
      window.location.hash = "/map";
    } else if (view === "codex") {
      window.location.hash = "/codex";
    } else if (view === "achievements") {
      window.location.hash = "/achievements";
    } else if (view === "guide") {
      window.location.hash = "/guide";
    } else if (view === "result") {
      window.location.hash = "/result";
    } else if (view === "splash") {
      window.location.hash = "/splash";
    } else {
      window.location.hash = "/menu";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Callback dari Splash Screen saat siswa baru mengisi nama
  const handleStartAdventureFromSplash = (studentProfile) => {
    setActiveStudent(studentProfile);
    navigateTo("menu");
  };

  // Inisialisasi engine chat saat masuk ke view 'chat'
  useEffect(() => {
    if (currentView === "chat") {
      const controller = new BranchingSessionController(selectedMissionId, (state) => {
        setChatState(state);
        // Buka modal visual jika ada trigger H3 baru
        if (state.activeVisualHint) {
          setActiveVisualHintModal(state.activeVisualHint);
        }
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
  }, [currentView, selectedMissionId, activeStudent?.id]);

  const activeMission = getMissionById(selectedMissionId);
  const totalConcepts = activeMission?.conversationConfig?.concepts?.length || 2;

  return (
    <div className="app-container sawah-theme">
      {/* Navbar Atas (Hanya tampil jika bukan di Splash Screen & bukan di Dashboard Guru) */}
      {currentView !== "splash" && currentView !== "teacher" && (
        <Navbar
          currentView={currentView}
          onNavigate={(view) => navigateTo(view)}
          onOpenTeacherDashboard={() => navigateTo("teacher")}
          onOpenStudentModal={() => setIsStudentModalOpen(true)}
        />
      )}

      <main className="main-content">
        {/* =========================================================
            0. PORTAL KHUSUS GURU (LINK TERPISAH: #/guru)
           ========================================================= */}
        {currentView === "teacher" && (
          <TeacherDashboardView
            onBackToMenu={() => navigateTo("menu")}
          />
        )}

        {/* =========================================================
            1. SPLASH SCREEN (INPUT NAMA DETEKTIF)
           ========================================================= */}
        {currentView === "splash" && (
          <SplashScreen
            onStartAdventure={handleStartAdventureFromSplash}
          />
        )}

        {/* =========================================================
            2. MENU UTAMA (DASHBOARD KOMANDO SOKRABOT)
           ========================================================= */}
        {currentView === "menu" && (
          <MainMenu
            activeStudent={activeStudent}
            onNavigate={(view) => navigateTo(view)}
            onOpenTeacherDashboard={() => navigateTo("teacher")}
            onSwitchStudent={() => setIsStudentModalOpen(true)}
          />
        )}

        {/* =========================================================
            3. PETA MISI SAWAH (LEVEL LOCK 1-5)
           ========================================================= */}
        {currentView === "map" && (
          <MissionMap
            onSelectMission={(missionId) => navigateTo("chat", missionId)}
            onBackToMenu={() => navigateTo("menu")}
          />
        )}

        {/* =========================================================
            4. BUKU PINTAR (INTERACTIVE CODEX CARDS)
           ========================================================= */}
        {currentView === "codex" && (
          <BukuPintarView
            onBackToMenu={() => navigateTo("menu")}
            onSelectMission={(missionId) => navigateTo("chat", missionId)}
          />
        )}

        {/* =========================================================
            5. PENCAPAIANKU (BINTANG, LENCANA, STATISTIK)
           ========================================================= */}
        {currentView === "achievements" && (
          <AchievementsView
            onBackToMenu={() => navigateTo("menu")}
            onSelectMission={(missionId) => navigateTo("chat", missionId)}
          />
        )}

        {/* =========================================================
            6. PETUNJUK BERMAIN (PANDUAN SOCRATIC)
           ========================================================= */}
        {currentView === "guide" && (
          <GuideView
            onBackToMenu={() => navigateTo("menu")}
            onGoToMap={() => navigateTo("map")}
          />
        )}

        {/* =========================================================
            7. RUANG INVESTIGASI CHATBOT SOKRABOT
           ========================================================= */}
        {currentView === "chat" && (
          <div className="chat-page-wrapper">
            <div className="chat-room-card">
              {/* Header Chat */}
              <ChatHeader
                mission={activeMission}
                currentMainIndex={chatState?.stats?.currentMainIndex || 1}
                totalMainQuestions={chatState?.stats?.totalMainQuestions || totalConcepts}
                currentStars={chatState?.stats?.currentStars || 3}
                onBack={() => navigateTo("map")}
                onRestart={() => {
                  controllerRef.current?.restartSession();
                }}
                onToggleHintDrawer={() => setIsHintDrawerOpen(true)}
              />

              {/* Balon Pesan Obrolan SOKRABOT & Siswa */}
              <ChatMessageList
                messages={chatState?.messages || []}
                isBotTyping={chatState?.isBotTyping || false}
                studentName={activeStudent?.name || "Detektif"}
                onOpenVisualHint={() => {
                  const h3 = chatState?.currentConceptH3;
                  if (h3) setActiveVisualHintModal(h3);
                }}
              />

              {/* Tombol Pilihan A/B/C (dari Decision Tree GBPM) */}
              {!chatState?.isFinished && chatState?.currentOptions?.length > 0 && (
                <ChatOptionButtons
                  options={chatState.currentOptions}
                  disabled={chatState?.optionsDisabled || chatState?.isBotTyping}
                  onSelectOption={(option) => {
                    controllerRef.current?.chooseOption(option);
                  }}
                />
              )}

              {/* Input Teks Bebas (HANYA tampil saat pertanyaan terbuka meminta alasan / isOpenEnded) */}
              {!chatState?.isFinished && chatState?.isOpenEnded && (
                <ChatTextInput
                  disabled={chatState?.optionsDisabled || chatState?.isBotTyping}
                  placeholder={
                    chatState?.inputPlaceholder || `Ketik alasanmu di sini, Detektif ${activeStudent?.name || ""}...`
                  }
                  isHighlighted={true}
                  onSend={(text) => {
                    controllerRef.current?.submitFreeText(text);
                  }}
                />
              )}
            </div>
          </div>
        )}

        {/* =========================================================
            8. HASIL SELEBRASI MISI (BINTANG, CODEX UNLOCKED, FANFARE)
           ========================================================= */}
        {currentView === "result" && (
          <ResultCard
            mission={activeMission}
            stats={chatState?.stats}
            completedRecord={chatState?.completedRecord || getMissionProgress(selectedMissionId)}
            onReplay={() => {
              storage.clearMissionState(selectedMissionId);
              navigateTo("chat", selectedMissionId);
            }}
            onBackToMap={() => navigateTo("map")}
            onOpenCodex={() => navigateTo("codex")}
            onNextMission={(nextId) => navigateTo("chat", nextId)}
          />
        )}
      </main>

      {/* Footer */}
      {currentView !== "splash" && currentView !== "teacher" && <Footer />}

      {/* Navigasi Bawah Khusus Ponsel (Mobile Bottom Navigation) */}
      {currentView !== "splash" && currentView !== "chat" && currentView !== "teacher" && (
        <MobileBottomNav
          currentView={currentView}
          onNavigate={(view) => navigateTo(view)}
        />
      )}

      {/* Modal Drawer Petunjuk Bertingkat (H1 - H3) */}
      <ChatHintDrawer
        isOpen={isHintDrawerOpen}
        onClose={() => setIsHintDrawerOpen(false)}
        hintsOpened={chatState?.stats?.hintsOpened || []}
        onRequestHint={(level) => {
          controllerRef.current?.requestHint(level);
        }}
        onOpenVisualHint={() => {
          const h3 = chatState?.currentConceptH3;
          if (h3) setActiveVisualHintModal(h3);
        }}
        hasVisualHint={Boolean(chatState?.currentConceptH3)}
      />

      {/* Modal Diagram Visual H3 Interaktif */}
      {activeVisualHintModal && (
        <VisualHintModal
          visualHint={activeVisualHintModal}
          onClose={() => {
            setActiveVisualHintModal(null);
            controllerRef.current?.closeVisualHint();
          }}
        />
      )}

      {/* Modal Identitas Detektif Siswa */}
      <StudentProfileModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        onSaveStudent={(saved) => {
          setActiveStudent(saved);
          setIsStudentModalOpen(false);
        }}
      />

      {/* Modal Dashboard Guru */}
      <TeacherDashboardModal
        isOpen={isTeacherDashboardOpen}
        onClose={() => setIsTeacherDashboardOpen(false)}
      />
    </div>
  );
}
