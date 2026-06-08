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
    id: "curious-pro",
    title: "Curioso Profissional",
    description: "Leia três curiosidades da Doodex.",
    points: 150
  },
  {
    id: "hidden-input",
    title: "Achou que Eu Não Ia Colocar?",
    description: "Descubra um easter egg do Doodverse.",
    points: 120
  }
];
