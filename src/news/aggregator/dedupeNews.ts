import type { RawNewsItem } from "../types";
import { createSlug } from "./normalizeNewsItem";
import { scoreNewsPriority } from "./scoreNewsPriority";

function dedupeKey(item: RawNewsItem) {
  try {
    const url = new URL(item.link);
    return `${url.hostname}${url.pathname}`.replace(/\/$/, "");
  } catch {
    return createSlug(item.title);
  }
}

export function dedupeNews(items: RawNewsItem[]) {
  const byKey = new Map<string, RawNewsItem>();

  items.forEach((item) => {
    const key = dedupeKey(item);
    const current = byKey.get(key);

    if (!current || scoreNewsPriority(item) > scoreNewsPriority(current)) {
      byKey.set(key, item);
    }
  });

  return [...byKey.values()];
}
