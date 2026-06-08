import { gameConfig } from "../../data/gameConfig";
import type { DraftCreature } from "../types";
import { pickRandom } from "./random";

function hasTooMuchTypeOverlap(options: DraftCreature[]) {
  if (options.length < 3) return false;
  const firstTypes = options[0].types;
  return options.every((option) => option.types.some((type) => firstTypes.includes(type)));
}

function cheapestFutureCost(pool: DraftCreature[], blockedIds: Set<number>, needed: number) {
  if (needed <= 0) return 0;

  const costs = pool
    .filter((creature) => !blockedIds.has(creature.id))
    .map((creature) => creature.cost)
    .sort((a, b) => a - b);

  if (costs.length < needed) return Number.POSITIVE_INFINITY;

  return costs.slice(0, needed).reduce((total, cost) => total + cost, 0);
}

export function generateDraftOptions(
  pool: DraftCreature[],
  usedIds: number[],
  budget: number,
  random: () => number,
  remainingPicks = 1
) {
  const used = new Set(usedIds);
  const available = pool.filter((creature) => !used.has(creature.id));
  const affordable = available.filter((creature) => creature.cost <= budget);
  const safeOptions = affordable.filter((creature) => {
    const blockedIds = new Set([...used, creature.id]);
    const reserve = cheapestFutureCost(pool, blockedIds, remainingPicks - 1);

    return creature.cost + reserve <= budget;
  });
  const possible = safeOptions.length > 0 ? safeOptions : affordable;
  const fallback = [...possible].sort((a, b) => a.cost - b.cost);
  const source = possible.length >= gameConfig.optionsPerRound ? possible : fallback;
  const options: DraftCreature[] = [];
  const localUsed = new Set<number>();

  for (let attempt = 0; attempt < 80 && options.length < gameConfig.optionsPerRound; attempt += 1) {
    const candidate = pickRandom(source, random);
    if (!candidate || localUsed.has(candidate.id)) continue;
    options.push(candidate);
    localUsed.add(candidate.id);
  }

  while (options.length < gameConfig.optionsPerRound) {
    const candidate = fallback.find((creature) => !localUsed.has(creature.id));
    if (!candidate) break;
    options.push(candidate);
    localUsed.add(candidate.id);
  }

  if (hasTooMuchTypeOverlap(options)) {
    const alternate = source.find(
      (candidate) =>
        !localUsed.has(candidate.id) &&
        !candidate.types.some((type) => options[0].types.includes(type)) &&
        candidate.cost <= budget
    );
    if (alternate) options[2] = alternate;
  }

  return {
    options,
    adjusted: safeOptions.length < gameConfig.optionsPerRound || possible.length < gameConfig.optionsPerRound
  };
}
