import React from "react";
import { ArrowRight, CheckCircle2, Clock, Play, Search, Sun, Footprints, ScanSearch, Sprout } from "lucide-react";
import { storage } from "../utils/storage";

const renderMissionIcon = (mission) => {
  const iconProps = { size: 24, strokeWidth: 2.3, color: mission?.accentColor || "#1b5e20" };
  switch (mission?.missionNumber) {
    case 1:
      return <Search {...iconProps} />;
    case 2:
      return <Sun {...iconProps} />;
    case 3:
      return <Footprints {...iconProps} />;
    case 4:
      return <ScanSearch {...iconProps} />;
    case 5:
      return <Sprout {...iconProps} />;
    default:
      return <span>{mission?.icon || "🌾"}</span>;
  }
};

export default function MissionCard({ mission, onSelectMission }) {
  // Cek status dari storage
  const isCompleted = storage.isMissionCompleted(mission.id);
  const activeState = storage.getMissionState(mission.id);
  const isInProgress = activeState && !isCompleted && activeState.messages && activeState.messages.length > 0;

  let statusLabel = "Belum dimulai";
  let statusClass = "status-not-started";

  if (isCompleted) {
    statusLabel = "Selesai ✓";
    statusClass = "status-completed";
  } else if (isInProgress) {
    const currentQ = Math.min(activeState.stats?.currentMainIndex || 1, mission.totalMainQuestions);
    statusLabel = `Sedang berlangsung (${currentQ}/${mission.totalMainQuestions})`;
    statusClass = "status-in-progress";
  }

  return (
    <div className="mission-card" id={`card-${mission.id}`}>
      <div className="mission-card-header">
        <div className="mission-icon-box">
          {renderMissionIcon(mission)}
        </div>
        <span className={`mission-status-pill ${statusClass}`}>
          {statusLabel}
        </span>
      </div>

      <div className="mission-card-body">
        <span className="mission-code">{mission.code} • {mission.gradeLevel}</span>
        <h3 className="mission-title">{mission.title}</h3>
        <p className="mission-desc">{mission.description}</p>

        <div className="mission-topics-tags">
          {mission.topics.map((topic, i) => (
            <span className="topic-tag" key={i}>
              • {topic}
            </span>
          ))}
        </div>
      </div>

      <div className="mission-card-footer">
        <button
          className="btn-start-mission"
          onClick={() => onSelectMission(mission.id)}
          id={`btn-open-${mission.id}`}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 size={18} />
              <span>Mainkan Ulang Misi</span>
            </>
          ) : isInProgress ? (
            <>
              <Play size={18} />
              <span>Lanjutkan Misi</span>
            </>
          ) : (
            <>
              <ArrowRight size={18} />
              <span>Mulai Misi</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
