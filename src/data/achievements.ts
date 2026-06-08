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
  }
];
