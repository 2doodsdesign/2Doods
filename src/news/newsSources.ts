import type { NewsSource } from "./types";

export const newsSources: NewsSource[] = [
  {
    id: "gamespot",
    name: "GameSpot",
    url: "https://www.gamespot.com/feeds/mashup/",
    type: "rss",
    language: "en",
    priority: 7,
    enabled: true,
    defaultCategory: "Geral"
  },
  {
    id: "ign",
    name: "IGN",
    url: "https://feeds.feedburner.com/ign/games-all",
    type: "rss",
    language: "en",
    priority: 8,
    enabled: true,
    defaultCategory: "Geral"
  },
  {
    id: "polygon",
    name: "Polygon",
    url: "https://www.polygon.com/rss/index.xml",
    type: "rss",
    language: "en",
    priority: 7,
    enabled: true,
    defaultCategory: "Geral"
  },
  {
    id: "vgc",
    name: "VGC",
    url: "https://www.videogameschronicle.com/feed/",
    type: "rss",
    language: "en",
    priority: 8,
    enabled: true,
    defaultCategory: "Mercado"
  },
  {
    id: "gematsu",
    name: "Gematsu",
    url: "https://www.gematsu.com/feed",
    type: "rss",
    language: "en",
    priority: 8,
    enabled: true,
    defaultCategory: "Japao"
  },
  {
    id: "nintendo-life",
    name: "Nintendo Life",
    url: "https://www.nintendolife.com/feeds/latest",
    type: "rss",
    language: "en",
    priority: 7,
    enabled: true,
    defaultCategory: "Nintendo"
  },
  {
    id: "playstation-blog",
    name: "PlayStation Blog",
    url: "https://blog.playstation.com/feed/",
    type: "rss",
    language: "en",
    priority: 9,
    enabled: true,
    defaultCategory: "PlayStation"
  },
  {
    id: "xbox-wire",
    name: "Xbox Wire",
    url: "https://news.xbox.com/en-us/feed/",
    type: "rss",
    language: "en",
    priority: 9,
    enabled: true,
    defaultCategory: "Xbox"
  },
  {
    id: "steam-news",
    name: "Steam News",
    url: "https://store.steampowered.com/feeds/news.xml",
    type: "rss",
    language: "en",
    priority: 6,
    enabled: true,
    defaultCategory: "PC"
  },
  {
    id: "square-enix-news",
    name: "Square Enix News",
    url: "https://www.square-enix-games.com/en_US/news",
    type: "manual",
    language: "en",
    priority: 8,
    enabled: true,
    defaultCategory: "RPG"
  },
  {
    id: "nintendo-news",
    name: "Nintendo News",
    url: "https://www.nintendo.com/us/whatsnew/",
    type: "manual",
    language: "en",
    priority: 9,
    enabled: true,
    defaultCategory: "Nintendo"
  }
];

export function getEnabledNewsSources() {
  return newsSources.filter((source) => source.enabled);
}
