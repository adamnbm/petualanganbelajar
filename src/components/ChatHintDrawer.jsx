import React from "react";
import { Lightbulb } from "lucide-react";

export default function ChatHintDrawer({ hintText }) {
  if (!hintText) return null;

  return (
    <div style={{ padding: "0 1.5rem 0.75rem" }}>
      <div className="hint-banner-bar">
        <div className="hint-content">
          <Lightbulb size={18} color="#d97706" />
          <span>
            <strong>Petunjuk:</strong> {hintText}
          </span>
        </div>
      </div>
    </div>
  );
}
