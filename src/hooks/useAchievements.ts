import { useMemo, useState } from "react";
import { achievements } from "../data/achievements";
import { useLocalStorage } from "./useLocalStorage";

export interface ProgressState {
  points: number;
  unlocked: string[];
  visitedSections: string[];
  socials: string[];
  curiosities: string[];
}

const initialProgress: ProgressState = {
  points: 0,
  unlocked: [],
  visitedSections: [],
  socials: [],
  curiosities: []
};

export function useAchievements() {
  const [progress, setProgress] = useLocalStorage<ProgressState>("2doods-progress", initialProgress);
  const [toastId, setToastId] = useState<string | null>(null);

  const level = useMemo(() => {
    const tiers = [
      { name: "Visitante", min: 0 },
      { name: "Jogador", min: 120 },
      { name: "Dooder", min: 260 },
      { name: "Explorador", min: 440 },
      { name: "Caçador de Segredos", min: 700 },
      { name: "Mestre do Doodverse", min: 1000 }
    ];
    return [...tiers].reverse().find((tier) => progress.points >= tier.min) ?? tiers[0];
  }, [progress.points]);

  function addPoints(points: number) {
    setProgress((current) => ({ ...current, points: current.points + points }));
  }

  function unlock(id: string) {
    const achievement = achievements.find((item) => item.id === id);
    if (!achievement || progress.unlocked.includes(id)) return;
    setProgress((current) => ({
      ...current,
      points: current.points + achievement.points,
      unlocked: [...current.unlocked, id]
    }));
    setToastId(id);
  }

  function visitSection(id: string, points: number) {
    if (progress.visitedSections.includes(id)) return;
    setProgress((current) => ({
      ...current,
      points: current.points + points,
      visitedSections: [...current.visitedSections, id]
    }));
  }

  function openSocial(id: string, points: number) {
    if (progress.socials.includes(id)) return;
    const nextSocials = [...progress.socials, id];
    setProgress((current) => ({
      ...current,
      points: current.points + points,
      socials: nextSocials
    }));
    if (nextSocials.length >= 3) unlock("multiplatform");
  }

  function readCuriosity(id: string, points: number) {
    if (progress.curiosities.includes(id)) return;
    const nextCuriosities = [...progress.curiosities, id];
    setProgress((current) => ({
      ...current,
      points: current.points + points,
      curiosities: nextCuriosities
    }));
    if (nextCuriosities.length >= 3) unlock("curious-pro");
  }

  return {
    progress,
    level,
    toastId,
    clearToast: () => setToastId(null),
    addPoints,
    unlock,
    visitSection,
    openSocial,
    readCuriosity
  };
}
