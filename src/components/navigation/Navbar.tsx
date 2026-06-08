import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../../assets/brand/logo-2doods.jpeg";
import { AudioControls } from "../../audio/AudioControls";
import { navigation } from "../../data/navigation";
import { XPProgress } from "../gamification/XPProgress";

interface NavbarProps {
  activeSection: string;
  points: number;
  level: string;
  onNavigate: (id: string) => void;
  onLogoClick: () => void;
}

export function Navbar({ activeSection, points, level, onNavigate, onLogoClick }: NavbarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className="navbar">
      <button className="brand" type="button" onClick={onLogoClick} aria-label="2Doods">
        <img src={logo} alt="Logo oficial da 2Doods" />
      </button>

      <nav className={open ? "nav-links is-open" : "nav-links"} aria-label="Navegação principal">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={activeSection === item.id ? "is-active" : ""}
              type="button"
              onClick={() => {
                onNavigate(item.id);
                setOpen(false);
              }}
            >
              <Icon size={17} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="navbar__tools">
        <XPProgress points={points} level={level} />
        <AudioControls />
        <button className="icon-button menu-toggle" type="button" aria-label="Abrir menu" onClick={() => setOpen(!open)}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}
