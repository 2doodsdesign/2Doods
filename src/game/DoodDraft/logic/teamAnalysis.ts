import { ALL_TYPES, DEFENSIVE_WEAKNESSES, OFFENSIVE_SUPER_EFFECTIVE } from "../../data/typeChart";
import type { DraftCreature, TeamAnalysis } from "../types";

function average(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((total, value) => total + value, 0) / values.length;
}

export function calculateTypeCoverage(team: DraftCreature[]) {
  const covered = new Set<string>();
  team.forEach((creature) => {
    creature.types.forEach((type) => {
      OFFENSIVE_SUPER_EFFECTIVE[type]?.forEach((target) => covered.add(target));
    });
  });
  return covered;
}

export function calculateTeamAnalysis(team: DraftCreature[]): TeamAnalysis {
  const uniqueTypes = [...new Set(team.flatMap((creature) => creature.types))];
  const weaknessMap = new Map<string, number>();
  const roleCounts: Record<string, number> = {};

  team.forEach((creature) => {
    roleCounts[creature.role] = (roleCounts[creature.role] ?? 0) + 1;
    creature.types.forEach((type) => {
      DEFENSIVE_WEAKNESSES[type]?.forEach((weakness) => {
        weaknessMap.set(weakness, (weaknessMap.get(weakness) ?? 0) + 1);
      });
    });
  });

  const weaknesses = [...weaknessMap.entries()]
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const averageSpeed = Math.round(average(team.map((creature) => creature.stats.speed)));
  const offensivePower = Math.round(
    average(team.map((creature) => Math.max(creature.stats.attack, creature.stats.specialAttack)))
  );
  const defensivePower = Math.round(
    average(team.map((creature) => (creature.stats.hp + creature.stats.defense + creature.stats.specialDefense) / 3))
  );
  const coverage = calculateTypeCoverage(team);
  const messages: string[] = [];

  if (coverage.size >= 10) messages.push("Boa cobertura ofensiva");
  if (uniqueTypes.length >= 10) messages.push("Ótima variedade de tipos");
  if (Object.keys(roleCounts).length < 4 && team.length >= 4) messages.push("Falta variedade de funções");
  if (weaknesses[0]?.count >= 4) messages.push(`Cuidado com ataques do tipo ${weaknesses[0].type}`);
  if (averageSpeed > 95) messages.push("Seu time está bem rápido");
  if (averageSpeed < 65 && team.length >= 4) messages.push("Seu time está ficando lento");
  if (!messages.length) messages.push(team.length ? "Time em construção, ainda dá para ajustar" : "Escolha sua primeira peça");

  return {
    uniqueTypes,
    weaknesses,
    roleCounts,
    averageSpeed,
    offensivePower,
    defensivePower,
    messages
  };
}

export function allTypeCount() {
  return ALL_TYPES.length;
}
