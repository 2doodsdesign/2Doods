export type CreatureRole =
  | "Atacante físico"
  | "Atacante especial"
  | "Defensor físico"
  | "Defensor especial"
  | "Suporte"
  | "Velocista"
  | "Versátil";

export type CreatureRarity = "common" | "uncommon" | "rare" | "legendary" | "mythical";
export type GameMode = "classic" | "daily";
export type DraftStatus = "intro" | "playing" | "result";

export interface DraftCreature {
  id: number;
  name: string;
  displayName: string;
  image: string;
  types: string[];
  generation: number;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  baseStatTotal: number;
  role: CreatureRole;
  rarity: CreatureRarity;
  cost: number;
}

export interface TeamAnalysis {
  uniqueTypes: string[];
  weaknesses: Array<{ type: string; count: number }>;
  roleCounts: Record<string, number>;
  averageSpeed: number;
  offensivePower: number;
  defensivePower: number;
  messages: string[];
}

export interface ScoreBreakdown {
  typeCoverage: number;
  defensiveSynergy: number;
  roleBalance: number;
  offensivePower: number;
  defensivePower: number;
  speedBalance: number;
  budgetEfficiency: number;
}

export interface DraftResult {
  score: number;
  title: string;
  mascotComment: string;
  budgetSpent: number;
  strengths: string[];
  problems: string[];
  analysis: TeamAnalysis;
  breakdown: ScoreBreakdown;
  team: DraftCreature[];
}
