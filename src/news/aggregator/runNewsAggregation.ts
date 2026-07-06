import { getEnabledNewsSources } from "../newsSources";
import type { DoodNewsDraft, RawNewsItem } from "../types";
import { dedupeNews } from "./dedupeNews";
import { fetchRssFeed } from "./fetchRssFeed";
import { generateDoodNewsDraft } from "./generateDoodNewsDraft";
import { groupRelatedNews } from "./groupRelatedNews";
import { scoreNewsPriority } from "./scoreNewsPriority";
import { validateNewsDraft } from "./validateNewsDraft";

const maxAgeDays = 7;
const minimumDraftScore = 42;

function isRecent(item: RawNewsItem) {
  const ageMs = Date.now() - new Date(item.publishedAt).getTime();
  return ageMs <= maxAgeDays * 24 * 60 * 60 * 1000;
}

export async function runNewsAggregation(limit = 8): Promise<DoodNewsDraft[]> {
  const enabledSources = getEnabledNewsSources();
  const settled = await Promise.allSettled(enabledSources.map((source) => fetchRssFeed(source)));
  const rawItems = settled.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
  const cleanItems = dedupeNews(rawItems.filter((item) => item.title && item.link && isRecent(item)));
  const groups = groupRelatedNews(cleanItems)
    .filter((group) => group.score >= minimumDraftScore || scoreNewsPriority(group.items[0]) >= minimumDraftScore)
    .slice(0, limit);

  return groups
    .map((group) => generateDoodNewsDraft(group))
    .filter((draft) => validateNewsDraft(draft).ok);
}
