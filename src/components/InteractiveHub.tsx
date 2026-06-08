import { Camera, Gamepad2, MonitorPlay, Smartphone, Trophy, Tv } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

const hubObjects = [
  { id: "tv", label: "Televisão", action: "Abrir vídeos", icon: Tv, target: "videos" },
  { id: "phone", label: "Celular", action: "TikTok", icon: Smartphone, url: siteConfig.social.tiktok },
  { id: "camera", label: "Câmera", action: "Instagram", icon: Camera, url: siteConfig.social.instagram },
  { id: "arcade", label: "Fliperama", action: "Arcade", icon: Gamepad2, target: "arcade" },
  { id: "computer", label: "Computador", action: "Bastidores", icon: MonitorPlay, target: "sobre" },
  { id: "missions", label: "Quadro", action: "Conquistas", icon: Trophy, target: "missoes" }
];

interface InteractiveHubProps {
  onNavigate: (id: string) => void;
  onExternal: (id: string) => void;
}

export function InteractiveHub({ onNavigate, onExternal }: InteractiveHubProps) {
  return (
    <div className="hub-grid">
      {hubObjects.map((object) => {
        const Icon = object.icon;
        return (
          <button
            className={`hub-object hub-object--${object.id}`}
            key={object.id}
            type="button"
            aria-label={`${object.label}: ${object.action}`}
            onClick={() => {
              if (object.url) {
                onExternal(object.id);
                window.open(object.url, "_blank", "noopener,noreferrer");
              } else if (object.target) {
                onNavigate(object.target);
              }
            }}
          >
            <Icon size={30} />
            <strong>{object.label}</strong>
            <span>{object.action}</span>
          </button>
        );
      })}
    </div>
  );
}
