import { newsSources } from "../newsSources";
import type { NewsGroup, RawNewsItem } from "../types";
import { createSlug } from "./normalizeNewsItem";
import { scoreNewsPriority } from "./scoreNewsPriority";

const stopwords = new Set([
  "the",
  "and",
  "for",
  "with",
  "from",
  "this",
  "that",
  "game",
  "games",
  "new",
  "gets",
  "will",
  "after",
  "before",
  "sobre",
  "para",
  "com",
  "uma",
  "novo",
  "nova"
]);

function importantTokens(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u00c0-\u017f\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 3 && !stopwords.has(token))
    .slice(0, 5);
}

function groupKey(item: RawNewsItem) {
  const tokens = importantTokens(item.title);
  return tokens.length ? tokens.slice(0, 3).join("-") : createSlug(item.title);
}

function categoryFor(item: RawNewsItem) {
  return newsSources.find((source) => source.id === item.sourceId)?.defaultCategory ?? "Geral";
}

export function groupRelatedNews(items: RawNewsItem[]): NewsGroup[] {
  const groups = new Map<string, RawNewsItem[]>();

  items.forEach((item) => {
    const key = groupKey(item);
    groups.set(key, [...(groups.get(key) ?? []), item]);
  });

  return [...groups.entries()]
    .map(([id, groupItems]) => {
      const lead = [...groupItems].sort((a, b) => scoreNewsPriority(b) - scoreNewsPriority(a))[0];
      const multiSourceBoost = new Set(groupItems.map((item) => item.sourceId)).size > 1 ? 16 : 0;
      const score = scoreNewsPriority(lead) + multiSourceBoost + Math.min(groupItems.length * 4, 18);

      return {
        id,
        title: lead.title,
        items: groupItems,
        score,
        category: categoryFor(lead)
      };
    })
    .sort((a, b) => b.score - a.score);
}
