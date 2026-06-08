import { Instagram, Music2, Youtube } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

export const socialLinks = [
  {
    id: "youtube",
    name: "YouTube",
    description: "Vídeos completos, análises, curiosidades e projetos especiais.",
    url: siteConfig.social.youtube,
    icon: Youtube,
    tone: "red"
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Posts, bastidores, artes e atualizações da comunidade.",
    url: siteConfig.social.instagram,
    icon: Instagram,
    tone: "blue"
  },
  {
    id: "tiktok",
    name: "TikTok",
    description: "Curiosidades rápidas, vídeos curtos e conteúdo diário.",
    url: siteConfig.social.tiktok,
    icon: Music2,
    tone: "split"
  }
] as const;
