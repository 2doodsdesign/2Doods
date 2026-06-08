import { useMemo, useRef, useState } from "react";
import { gameConfig } from "../../data/gameConfig";
import { localFallbackCreatures } from "../../data/localFallback";
import { draftDialogues } from "../../data/mascotDialogues";
import type { DraftCreature, DraftResult, DraftStatus, GameMode } from "../types";
import { generateDraftOptions } from "../logic/draftOptions";
import { createSeededRandom, todaySeed } from "../logic/random";
import { calculateFinalScore } from "../logic/scoring";
import { calculateTeamAnalysis } from "../logic/teamAnalysis";

interface DraftGameState {
  mode: GameMode;
  status: DraftStatus;
  round: number;
  budget: number;
  team: DraftCreature[];
  currentOptions: DraftCreature[];
  rerollsLeft: number;
  usedCreatureIds: number[];
  seed: string;
  message: string;
  adjustedDraw: boolean;
  result: DraftResult | null;
  rerollsUsed: number;
}

const initialState: DraftGameState = {
  mode: "classic",
  status: "intro",
  round: 1,
  budget: gameConfig.initialBudget,
  team: [],
  currentOptions: [],
  rerollsLeft: gameConfig.rerolls,
  usedCreatureIds: [],
  seed: "",
  message: draftDialogues.intro,
  adjustedDraw: false,
  result: null,
  rerollsUsed: 0
};

function makeSeed(mode: GameMode) {
  return mode === "daily" ? `daily-${todaySeed()}` : `classic-${Date.now()}-${Math.random()}`;
}

export function useDraftGame() {
  const [state, setState] = useState<DraftGameState>(initialState);
  const randomRef = useRef<() => number>(createSeededRandom("idle"));
  const pool = useMemo(() => localFallbackCreatures, []);

  function startGame(mode: GameMode) {
    const seed = makeSeed(mode);
    randomRef.current = createSeededRandom(seed);
    const draw = generateDraftOptions(pool, [], gameConfig.initialBudget, randomRef.current, gameConfig.teamSize);
    setState({
      ...initialState,
      mode,
      status: "playing",
      seed,
      currentOptions: draw.options,
      adjustedDraw: draw.adjusted,
      message: mode === "daily" ? "Draft Diário carregado. Todo mundo recebe o mesmo caos hoje." : draftDialogues.intro
    });
  }

  function rerollOptions() {
    setState((current) => {
      if (current.status !== "playing" || current.rerollsLeft <= 0) return current;
      const usedCreatureIds = [...new Set([...current.usedCreatureIds, ...current.currentOptions.map((creature) => creature.id)])];
      const draw = generateDraftOptions(
        pool,
        usedCreatureIds,
        current.budget,
        randomRef.current,
        gameConfig.teamSize - current.team.length
      );
      return {
        ...current,
        currentOptions: draw.options,
        usedCreatureIds,
        rerollsLeft: current.rerollsLeft - 1,
        rerollsUsed: current.rerollsUsed + 1,
        adjustedDraw: draw.adjusted,
        message: draftDialogues.reroll
      };
    });
  }

  function chooseCreature(creature: DraftCreature) {
    setState((current) => {
      if (current.status !== "playing") return current;
      if (creature.cost > current.budget) {
        return { ...current, message: "Essa escolha estoura o orçamento. As Dood Coins não perdoam." };
      }

      const team = [...current.team, creature];
      const budget = current.budget - creature.cost;
      const usedCreatureIds = [...new Set([...current.usedCreatureIds, creature.id])];

      if (team.length >= gameConfig.teamSize) {
        const result = calculateFinalScore(team, budget);
        return {
          ...current,
          status: "result",
          team,
          budget,
          usedCreatureIds,
          result,
          message: result.score >= 75 ? draftDialogues.resultHigh : draftDialogues.resultLow
        };
      }

      const draw = generateDraftOptions(
        pool,
        usedCreatureIds,
        budget,
        randomRef.current,
        gameConfig.teamSize - team.length
      );
      const analysis = calculateTeamAnalysis(team);
      const message =
        budget < 25
          ? draftDialogues.budget
          : analysis.uniqueTypes.length >= team.length * 2
            ? draftDialogues.balanced
            : draftDialogues.risky;

      return {
        ...current,
        round: team.length + 1,
        team,
        budget,
        usedCreatureIds,
        currentOptions: draw.options,
        adjustedDraw: draw.adjusted,
        message
      };
    });
  }

  function resetGame() {
    setState(initialState);
  }

  function loadSharedTeam(ids: number[]) {
    const team = ids.map((id) => pool.find((creature) => creature.id === id)).filter((creature): creature is DraftCreature => Boolean(creature)).slice(0, gameConfig.teamSize);
    if (team.length !== gameConfig.teamSize) return false;
    const budget = gameConfig.initialBudget - team.reduce((total, creature) => total + creature.cost, 0);
    if (budget < 0) return false;
    const result = calculateFinalScore(team, budget);
    setState({
      ...initialState,
      status: "result",
      team,
      budget,
      result,
      usedCreatureIds: ids,
      message: result.mascotComment
    });
    return true;
  }

  const analysis = useMemo(() => calculateTeamAnalysis(state.team), [state.team]);
  const shareUrl = state.result
    ? `/arcade/dooddraft?team=${state.result.team.map((creature) => creature.id).join(",")}`
    : "/arcade/dooddraft";

  return {
    state,
    pool,
    analysis,
    shareUrl,
    startGame,
    chooseCreature,
    rerollOptions,
    resetGame,
    loadSharedTeam
  };
}
