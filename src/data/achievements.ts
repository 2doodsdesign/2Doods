export interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
}

export const achievements: Achievement[] = [
  {
    id: "first-checkpoint",
    title: "Primeiro Checkpoint",
    description: "Visite o Doodverse pela primeira vez.",
    points: 80
  },
  {
    id: "multiplatform",
    title: "Multiplataforma",
    description: "Abra os portais de YouTube, Instagram e TikTok.",
    points: 160
  },
  {
    id: "tutorial-reader",
    title: "Leitor de Tutoriais",
    description: "Leia seu primeiro artigo da Doodex.",
    points: 90
  },
  {
    id: "curious-pro",
    title: "Curioso Profissional",
    description: "Leia todos os artigos disponíveis da Doodex.",
    points: 150
  },
  {
    id: "hidden-input",
    title: "Achou que Eu Não Ia Colocar?",
    description: "Descubra um easter egg do Doodverse.",
    points: 120
  },
  {
    id: "first-draft",
    title: "Primeiro Draft",
    description: "Monte seu primeiro time completo.",
    points: 100
  },
  {
    id: "balanced-team",
    title: "Time Equilibrado",
    description: "Conquiste nota acima de 75 no DoodDraft.",
    points: 80
  },
  {
    id: "champion-level",
    title: "Nível Campeão",
    description: "Conquiste nota acima de 85 no DoodDraft.",
    points: 120
  },
  {
    id: "doodverse-master-draft",
    title: "Mestre do Doodverse",
    description: "Conquiste nota acima de 95 no DoodDraft.",
    points: 180
  },
  {
    id: "economic-draft",
    title: "Econômico",
    description: "Consiga nota acima de 75 gastando no máximo 85 moedas.",
    points: 90
  },
  {
    id: "type-collector",
    title: "Colecionador de Tipos",
    description: "Monte um time com pelo menos dez tipos diferentes.",
    points: 90
  },
  {
    id: "no-reroll",
    title: "Quem Precisa de Reroll?",
    description: "Complete uma partida sem usar reroll.",
    points: 80
  }
];
