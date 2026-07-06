import { generateEditorialDraft } from "../ai/generateEditorialDraft";
import type { DoodNewsDraft, NewsGroup, NewsReliability, NewsTopicType, RawNewsItem } from "../types";
import { createSlug } from "./normalizeNewsItem";
import { scoreNewsPriority } from "./scoreNewsPriority";

function detectReliability(item: RawNewsItem): NewsReliability {
  const text = `${item.title} ${item.excerpt ?? ""}`.toLowerCase();
  if (/rumor|reportedly|insider|suposto|boato/.test(text)) return "rumor";
  if (/leak|datamine|vazou|vazamento/.test(text)) return "leak";
  if (/analysis|opinion|analise|análise/.test(text)) return "analysis";
  return "confirmed";
}

function detectTopicType(item: RawNewsItem): NewsTopicType {
  const text = `${item.title} ${item.excerpt ?? ""}`.toLowerCase();
  if (/rumor|reportedly|insider|boato/.test(text)) return "rumor";
  if (/leak|datamine|vazou|vazamento/.test(text)) return "leak";
  if (/trailer|teaser|gameplay/.test(text)) return "trailer";
  if (/release date|launch date|data de lancamento|data de lançamento/.test(text)) return "release-date";
  if (/update|patch|season|atualizacao|atualização/.test(text)) return "update";
  if (/controversy|lawsuit|criticism|polemica|polêmica/.test(text)) return "controversy";
  if (/sales|acquisition|layoff|market|mercado/.test(text)) return "market";
  if (/analysis|opinion|analise|análise/.test(text)) return "analysis";
  return "confirmed";
}

function playerImpactFor(item: RawNewsItem, topicType: NewsTopicType) {
  const impacts: Record<NewsTopicType, string> = {
    confirmed: "Pode entrar no radar sem tratar como promessa vaga.",
    rumor: "Vale acompanhar, mas sem mudar compra, hype ou expectativa ainda.",
    leak: "Bom para ficar de olho, ruim para cravar qualquer conclusao.",
    analysis: "Ajuda a entender tendencia, calendario e comportamento da industria.",
    trailer: "Ajuda a medir tom, escopo e se o jogo esta vendendo bem a propria ideia.",
    "release-date": "Pode mexer direto na fila de jogos, pre-venda e planejamento de tempo.",
    update: "Impacta quem ainda joga ou pensa em voltar para testar novidades.",
    controversy: "Pode afetar confianca, comunidade e decisao de compra.",
    market: "Pode mexer em catalogos, precos, exclusividades e acesso."
  };

  return impacts[topicType] ?? `Impacto em observacao a partir da fonte ${item.sourceName}.`;
}

function shortPackage(title: string, tags: string[], hook: string) {
  const shortTitle = title.length > 58 ? `${title.slice(0, 55)}...` : title;

  return {
    shortTitle,
    suggestedTags: [...new Set(["2Doods", "games", ...tags])].slice(0, 8),
    pinnedComment: "Voce acha que isso muda alguma coisa para quem joga agora ou e barulho de calendario?",
    communityQuestion: "Isso entra no seu radar ou voce esperaria mais informacao antes do hype?"
  };
}

export function generateDoodNewsDraft(group: NewsGroup): DoodNewsDraft {
  const lead = [...group.items].sort((a, b) => scoreNewsPriority(b) - scoreNewsPriority(a))[0];
  const priorityScore = group.score;
  const reliability = detectReliability(lead);
  const topicType = detectTopicType(lead);
  const relatedLinks = group.items.map((item) => ({
    title: item.title,
    source: item.sourceName,
    url: item.link
  }));
  const generated = generateEditorialDraft({
    originalTitle: lead.title,
    sourceName: lead.sourceName,
    publishedAt: lead.publishedAt,
    excerpt: lead.excerpt,
    link: lead.link,
    relatedLinks,
    category: group.category,
    reliability,
    topicType,
    priorityScore
  });
  const slug = createSlug(generated.title);

  return {
    id: `draft-${slug}-${Date.now()}`,
    slug,
    status: "draft",
    reliability: generated.reliability,
    topicType,
    title: generated.title,
    originalTitle: lead.title,
    sourceName: lead.sourceName,
    sourceUrl: lead.link,
    publishedAt: lead.publishedAt,
    generatedAt: new Date().toISOString(),
    category: generated.category,
    tags: generated.tags,
    summary: generated.summary,
    whyItMatters: generated.whyItMatters,
    doodOpinion: generated.doodOpinion,
    playerImpact: playerImpactFor(lead, topicType),
    shortHook: generated.shortHook,
    shortPotential: generated.shortPotential,
    shortPackage: shortPackage(generated.title, generated.tags, generated.shortHook),
    youtubeShortTitle: generated.title.length > 58 ? `${generated.title.slice(0, 55)}...` : generated.title,
    tiktokCaption: "",
    instagramCaption: "",
    pinnedComment: "Voce acha que isso muda alguma coisa para quem joga agora ou e barulho de calendario?",
    communityQuestion: "Isso entra no seu radar ou voce esperaria mais informacao antes do hype?",
    reviewedByHuman: false,
    priorityScore,
    relatedLinks
  };
}
