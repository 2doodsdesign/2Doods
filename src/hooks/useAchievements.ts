import { useMemo, useState } from "react";
import { achievements } from "../data/achievements";
import { useLocalStorage } from "./useLocalStorage";

export interface ProgressState {
  points: number;
  unlocked: string[];
  visitedSections: string[];
  socials: string[];
  curiosities: string[];
  articles: string[];
  gameRewards: string[];
}

const initialProgress: ProgressState = {
  points: 0,
  unlocked: [],
  visitedSections: [],
  socials: [],
  curiosities: [],
  articles: [],
  gameRewards: []
};

function normalizeProgress(progress: ProgressState): ProgressState {
  return {
    ...initialProgress,
    ...progress,
    unlocked: progress.unlocked ?? [],
    visitedSections: progress.visitedSections ?? [],
    socials: progress.socials ?? [],
    curiosities: progress.curiosities ?? [],
    articles: progress.articles ?? [],
    gameRewards: progress.gameRewards ?? []
  };
}

function achievementPoints(id: string) {
  return achievements.find((item) => item.id === id)?.points ?? 0;
}

export function useAchievements() {
  const [storedProgress, setProgress] = useLocalStorage<ProgressState>("2doods-progress", initialProgress);
  const [toastId, setToastId] = useState<string | null>(null);
  const progress = useMemo(() => normalizeProgress(storedProgress), [storedProgress]);

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
    setProgress((current) => ({ ...normalizeProgress(current), points: normalizeProgress(current).points + points }));
  }

  function unlock(id: string) {
    const achievement = achievements.find((item) => item.id === id);
    if (!achievement || progress.unlocked.includes(id)) return;
    setProgress((current) => {
      const normalized = normalizeProgress(current);
      if (normalized.unlocked.includes(id)) return normalized;
      return {
        ...normalized,
        points: normalized.points + achievement.points,
        unlocked: [...normalized.unlocked, id]
      };
    });
    setToastId(id);
  }

  function visitSection(id: string, points: number) {
    if (progress.visitedSections.includes(id)) return;
    setProgress((current) => {
      const normalized = normalizeProgress(current);
      if (normalized.visitedSections.includes(id)) return normalized;
      return {
        ...normalized,
        points: normalized.points + points,
        visitedSections: [...normalized.visitedSections, id]
      };
    });
  }

  function openSocial(id: string, points: number) {
    if (progress.socials.includes(id)) return;
    setProgress((current) => {
      const normalized = normalizeProgress(current);
      if (normalized.socials.includes(id)) return normalized;
      const nextSocials = [...normalized.socials, id];
      const shouldUnlock = nextSocials.length >= 3 && !normalized.unlocked.includes("multiplatform");
      if (shouldUnlock) setToastId("multiplatform");
      return {
        ...normalized,
        points: normalized.points + points + (shouldUnlock ? achievementPoints("multiplatform") : 0),
        socials: nextSocials,
        unlocked: shouldUnlock ? [...normalized.unlocked, "multiplatform"] : normalized.unlocked
      };
    });
  }

  function readCuriosity(id: string, points: number) {
    if (progress.curiosities.includes(id)) return;
    setProgress((current) => {
      const normalized = normalizeProgress(current);
      if (normalized.curiosities.includes(id)) return normalized;
      return {
        ...normalized,
        points: normalized.points + points,
        curiosities: [...normalized.curiosities, id]
      };
    });
  }

  function readArticle(id: string, points: number, totalArticles: number) {
    setProgress((current) => {
      const normalized = normalizeProgress(current);
      if (normalized.articles.includes(id)) return normalized;

      const nextArticles = [...normalized.articles, id];
      const nextUnlocked = [...normalized.unlocked];
      let nextPoints = normalized.points + points;
      let toast: string | null = null;

      if (!nextUnlocked.includes("tutorial-reader")) {
        nextUnlocked.push("tutorial-reader");
        nextPoints += achievementPoints("tutorial-reader");
        toast = "tutorial-reader";
      }

      if (nextArticles.length >= totalArticles && !nextUnlocked.includes("curious-pro")) {
        nextUnlocked.push("curious-pro");
        nextPoints += achievementPoints("curious-pro");
        toast = "curious-pro";
      }

      if (toast) setToastId(toast);

      return {
        ...normalized,
        points: nextPoints,
        unlocked: nextUnlocked,
        articles: nextArticles
      };
    });
  }

  function rewardGameAction(actionId: string, points: number, achievementIds: string[] = []) {
    setProgress((current) => {
      const normalized = normalizeProgress(current);
      if (normalized.gameRewards.includes(actionId)) return normalized;

      const nextUnlocked = [...normalized.unlocked];
      let nextPoints = normalized.points + points;
      let toast: string | null = null;

      achievementIds.forEach((achievementId) => {
        if (!nextUnlocked.includes(achievementId)) {
          nextUnlocked.push(achievementId);
          nextPoints += achievementPoints(achievementId);
          toast = achievementId;
        }
      });

      if (toast) setToastId(toast);

      return {
        ...normalized,
        points: nextPoints,
        unlocked: nextUnlocked,
        gameRewards: [...normalized.gameRewards, actionId]
      };
    });
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
    readCuriosity,
    readArticle,
    rewardGameAction
  };
}
