import { newsSources } from "../newsSources";
import type { RawNewsItem } from "../types";

const weightedTerms: Array<[string, number]> = [
  ["nintendo", 15],
  ["switch", 12],
  ["playstation", 14],
  ["ps5", 12],
  ["xbox", 14],
  ["game pass", 12],
  ["persona", 16],
  ["final fantasy", 18],
  ["kingdom hearts", 18],
  ["zelda", 18],
  ["pokemon", 18],
  ["pokémon", 18],
  ["atlus", 14],
  ["square enix", 14],
  ["indie", 8],
  ["release date", 12],
  ["launch date", 12],
  ["remake", 14],
  ["remaster", 10],
  ["trailer", 10],
  ["announcement", 12],
  ["official", 10],
  ["delay", 10],
  ["controversy", 9],
  ["leak", 7],
  ["rumor", 6],
  ["showcase", 10],
  ["direct", 10],
  ["state of play", 10],
  ["summer game fest", 8]
];

function sourcePriority(sourceId: string) {
  return newsSources.find((source) => source.id === sourceId)?.priority ?? 5;
}

function freshnessScore(publishedAt: string) {
  const ageMs = Date.now() - new Date(publishedAt).getTime();
  const ageHours = ageMs / 1000 / 60 / 60;

  if (ageHours <= 12) return 18;
  if (ageHours <= 24) return 12;
  if (ageHours <= 72) return 6;
  if (ageHours <= 168) return 2;
  return -12;
}

export function scoreNewsPriority(item: RawNewsItem): number {
  const text = `${item.title} ${item.excerpt ?? ""}`.toLowerCase();
  const termScore = weightedTerms.reduce((score, [term, weight]) => (text.includes(term) ? score + weight : score), 0);
  const officialScore = /blog|wire|official|nintendo|playstation|xbox/i.test(item.sourceName) ? 8 : 0;
  const sourceScore = sourcePriority(item.sourceId);
  const shortScore = /trailer|launch|release|remake|delay|leak|rumor|showcase/i.test(text) ? 8 : 2;

  return Math.max(0, Math.round(termScore + officialScore + sourceScore + shortScore + freshnessScore(item.publishedAt)));
}
