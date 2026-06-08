export interface Creature {
  id: number;
  name: string;
  image: string;
  types: string[];
  generation: number;
  attack: number;
  defense: number;
  speed: number;
  rarity: number;
}

export const creatures: Creature[] = [
  {
    id: 1,
    name: "Bytepuff",
    image: "",
    types: ["Tech", "Spark"],
    generation: 1,
    attack: 62,
    defense: 50,
    speed: 78,
    rarity: 2
  }
];
