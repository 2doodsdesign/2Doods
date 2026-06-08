export interface Curiosity {
  id: string;
  title: string;
  summary: string;
  category: string;
  image: string;
  source?: string;
  featured?: boolean;
}

export const curiosities: Curiosity[] = [
  {
    id: "checkpoint",
    title: "Por que checkpoints mudaram a forma de jogar?",
    summary: "Salvar progresso deixou de ser só conveniência e virou parte do ritmo, da tensão e da recompensa.",
    category: "Game Design",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: "indies",
    title: "Jogos pequenos, ideias gigantes",
    summary: "Muitos indies vencem no foco: uma mecânica forte, apresentação clara e identidade que cola na memória.",
    category: "Indies",
    image: "https://images.unsplash.com/photo-1556438064-2d7646166914?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "bastidores",
    title: "O segredo está no bastidor",
    summary: "Menus, feedback de botão e microanimações também contam a história de um jogo.",
    category: "Bastidores",
    image: "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?auto=format&fit=crop&w=800&q=80"
  }
];
