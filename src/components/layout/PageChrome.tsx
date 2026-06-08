import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useAchievements } from "../../hooks/useAchievements";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { AchievementToast } from "../gamification/AchievementToast";
import { Navbar } from "../navigation/Navbar";
import { Footer } from "./Footer";

interface PageChromeProps {
  children: ReactNode;
  activeSection?: string;
  achievementsOverride?: ReturnType<typeof useAchievements>;
}

export function PageChrome({ children, activeSection = "curiosidades", achievementsOverride }: PageChromeProps) {
  const location = useLocation();
  const [theme, setTheme] = useLocalStorage<"default" | "red" | "blue">("2doods-theme", "default");
  const [logoClicks, setLogoClicks] = useState(0);
  const internalAchievements = useAchievements();
  const achievements = achievementsOverride ?? internalAchievements;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function navigateTo(id: string) {
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.location.href = id === "inicio" ? "/" : `/#${id}`;
  }

  function handleLogoClick() {
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next >= 5) {
      achievements.unlock("hidden-input");
      setTheme(theme === "red" ? "blue" : theme === "blue" ? "default" : "red");
      setLogoClicks(0);
    }
  }

  return (
    <>
      <Navbar
        activeSection={activeSection}
        points={achievements.progress.points}
        level={achievements.level.name}
        onNavigate={navigateTo}
        onLogoClick={handleLogoClick}
      />
      {children}
      <Footer />
      <AchievementToast id={achievements.toastId} onDone={achievements.clearToast} />
    </>
  );
}
