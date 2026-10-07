import React from "react";
import { Home, MapPin, BookOpen, Award, HelpCircle } from "lucide-react";

export default function MobileBottomNav({ currentView, onNavigate }) {
  const navItems = [
    { id: "menu", label: "Menu", icon: Home },
    { id: "map", label: "Peta Misi", icon: MapPin },
    { id: "codex", label: "Buku Pintar", icon: BookOpen },
    { id: "achievements", label: "Pencapaian", icon: Award },
    { id: "guide", label: "Petunjuk", icon: HelpCircle }
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Navigasi Bawah Ponsel">
      <div className="mobile-bottom-nav-inner">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              className={`mobile-bottom-nav-btn ${isActive ? "active" : ""}`}
              onClick={() => onNavigate(item.id)}
              aria-label={item.label}
              id={`mobile-nav-${item.id}`}
            >
              <div className="nav-btn-icon-wrapper">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="nav-btn-label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
