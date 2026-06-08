import { gameConfig } from "../../data/gameConfig";
import type { DraftCreature, DraftResult, ScoreBreakdown } from "../types";
import { allTypeCount, calculateTeamAnalysis, calculateTypeCoverage } from "./teamAnalysis";

const SCORE_WEIGHTS = {
  typeCoverage: 0.22,
  defensiveSynergy: 0.2,
  roleBalance: 0.16,
  offensivePower: 0.14,
  defensivePower: 0.12,
  speedBalance: 0.08,
  budgetEfficiency: 0.08
};

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function classify(score: number) {
  if (score >= 95) return ["Mestre do Doodverse", "Isso não é um time. É uma ameaça ao equilíbrio do universo."];
  if (score >= 85) return ["Campeão Regional", "Esse time entra na Liga fazendo todo mundo rever a estratégia."];
  if (score >= 75) return ["Candidato à Liga", "Tem plano, cobertura e cara de quem não clicou só no favorito."];
  if (score >= 60) return ["Especialista de Tipo", "Dá para ganhar bastante luta, mas algumas fraquezas estão piscando no HUD."];
  if (score >= 45) return ["Desafiante de Ginásio", "Funciona, mas ainda tem cara de time que aprendeu apanhando."];
  if (score >= 30) return ["Treinador Iniciante", "Tem começo de ideia. Falta convencer o Doodverse."];
  return ["Turista da Rota 1", "Talvez seja melhor voltar ao laboratório e escolher outro inicial."];
}

export function calculateFinalScore(team: DraftCreature[], budgetLeft: number): DraftResult {
  const analysis = calculateTeamAnalysis(team);
  const coverage = calculateTypeCoverage(team);
  const budgetSpent = gameConfig.initialBudget - budgetLeft;
  const repeatedTypePenalty = Math.max(0, team.length * 2 - analysis.uniqueTypes.length) * 2;
  const severeWeaknessPenalty = analysis.weaknesses.filter((weakness) => weakness.count >= 4).length * 10;
  const legendaryPenalty = Math.max(0, team.filter((creature) => creature.rarity === "legendary" || creature.rarity === "mythical").length - 2) * 8;

  const breakdown: ScoreBreakdown = {
    typeCoverage: clampScore((coverage.size / allTypeCount()) * 100),
    defensiveSynergy: clampScore(100 - severeWeaknessPenalty - (analysis.weaknesses[0]?.count ?? 0) * 8),
    roleBalance: clampScore((Object.keys(analysis.roleCounts).length / 5) * 100),
    offensivePower: clampScore((analysis.offensivePower / 135) * 100),
    defensivePower: clampScore((analysis.defensivePower / 120) * 100),
    speedBalance: clampScore(analysis.averageSpeed > 120 ? 100 : (analysis.averageSpeed / 110) * 100),
    budgetEfficiency: clampScore(budgetSpent >= 78 && budgetSpent <= 100 ? 100 : (budgetSpent / 78) * 100)
  };

  const weighted =
    breakdown.typeCoverage * SCORE_WEIGHTS.typeCoverage +
    breakdown.defensiveSynergy * SCORE_WEIGHTS.defensiveSynergy +
    breakdown.roleBalance * SCORE_WEIGHTS.roleBalance +
    breakdown.offensivePower * SCORE_WEIGHTS.offensivePower +
    breakdown.defensivePower * SCORE_WEIGHTS.defensivePower +
    breakdown.speedBalance * SCORE_WEIGHTS.speedBalance +
    breakdown.budgetEfficiency * SCORE_WEIGHTS.budgetEfficiency -
    repeatedTypePenalty -
    legendaryPenalty;

  const score = clampScore(weighted);
  const [title, mascotComment] = classify(score);
  const strengths = [
    breakdown.typeCoverage >= 70 ? "Boa cobertura ofensiva" : "",
    analysis.uniqueTypes.length >= 10 ? "Variedade de tipos acima da média" : "",
    breakdown.roleBalance >= 80 ? "Funções bem distribuídas" : "",
    breakdown.budgetEfficiency >= 80 ? "Uso inteligente das Dood Coins" : ""
  ].filter(Boolean);
  const problems = [
    analysis.weaknesses[0]?.count >= 4 ? `Fraqueza recorrente contra ${analysis.weaknesses[0].type}` : "",
    breakdown.roleBalance < 55 ? "Pouca variedade de funções" : "",
    breakdown.speedBalance < 55 ? "Velocidade média baixa" : "",
    repeatedTypePenalty > 8 ? "Tipos repetidos demais" : ""
  ].filter(Boolean);

  return {
    score,
    title,
    mascotComment,
    budgetSpent,
    strengths: strengths.length ? strengths : ["Time com identidade clara"],
    problems: problems.length ? problems : ["Nenhum problema grave no radar"],
    analysis,
    breakdown,
    team
  };
}
