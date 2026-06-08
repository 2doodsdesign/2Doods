export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  youtubeId: string;
  category: string;
  duration?: string;
  featured?: boolean;
}

export const videos: VideoItem[] = [
  {
    id: "channel-trailer",
    title: "O próximo respawn da 2Doods",
    description: "Um espaço para curiosidades, cultura gamer, game design e experiências interativas.",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80",
    youtubeId: "TwoDoods2",
    category: "Doodverse",
    duration: "Em breve",
    featured: true
  },
  {
    id: "curiosidades",
    title: "Curiosidades que mudam como você olha para jogos",
    description: "Histórias curtas, bastidores e detalhes que fazem cada fase render conversa.",
    thumbnail: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=900&q=80",
    youtubeId: "TwoDoods2",
    category: "Curiosidade",
    duration: "Shorts"
  },
  {
    id: "game-design",
    title: "Game design sem palestra chata",
    description: "Ideias, escolhas e truques de design que explicam por que um jogo prende a gente.",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    youtubeId: "TwoDoods2",
    category: "Game Design",
    duration: "8 min"
  }
];
