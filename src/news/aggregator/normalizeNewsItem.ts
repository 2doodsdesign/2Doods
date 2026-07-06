import type { RawNewsItem } from "../types";

export function createSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 90);
}

export function stripHtml(value = "") {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeTitle(value: string) {
  return stripHtml(value)
    .replace(/\s[-|]\s[^-|]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeNewsItem(item: RawNewsItem): RawNewsItem | null {
  const title = normalizeTitle(item.title);
  const link = item.link?.trim();

  if (!title || !link) return null;

  const publishedAt = Number.isNaN(Date.parse(item.publishedAt)) ? new Date().toISOString() : item.publishedAt;

  return {
    ...item,
    id: item.id || createSlug(`${item.sourceId}-${title}-${link}`),
    title,
    link,
    publishedAt,
    excerpt: item.excerpt ? stripHtml(item.excerpt).slice(0, 360) : undefined
  };
}
