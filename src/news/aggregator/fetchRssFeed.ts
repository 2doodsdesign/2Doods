import type { NewsSource, RawNewsItem } from "../types";
import { normalizeNewsItem, stripHtml } from "./normalizeNewsItem";

function tagValue(xml: string, tag: string) {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? stripHtml(match[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")) : "";
}

function itemBlocks(xml: string) {
  const rssItems = xml.match(/<item[\s\S]*?<\/item>/gi);
  if (rssItems?.length) return rssItems;

  return xml.match(/<entry[\s\S]*?<\/entry>/gi) ?? [];
}

function entryLink(block: string) {
  const direct = tagValue(block, "link");
  if (direct) return direct;

  const href = block.match(/<link[^>]+href=["']([^"']+)["'][^>]*>/i);
  return href?.[1] ?? "";
}

export async function fetchRssFeed(source: NewsSource): Promise<RawNewsItem[]> {
  if (!source.enabled || source.type !== "rss") return [];

  const response = await fetch(source.url, {
    headers: {
      accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.5"
    }
  });

  if (!response.ok) {
    throw new Error(`Feed ${source.name} respondeu ${response.status}`);
  }

  const xml = await response.text();

  return itemBlocks(xml)
    .slice(0, 20)
    .map((block, index) => {
      const title = tagValue(block, "title");
      const link = entryLink(block);
      const publishedAt = tagValue(block, "pubDate") || tagValue(block, "published") || tagValue(block, "updated");
      const excerpt = tagValue(block, "description") || tagValue(block, "summary") || tagValue(block, "content:encoded");
      const normalized = normalizeNewsItem({
        id: `${source.id}-${index}-${title}`,
        sourceId: source.id,
        sourceName: source.name,
        title,
        link,
        publishedAt,
        excerpt,
        language: source.language
      });

      return normalized;
    })
    .filter((item): item is RawNewsItem => Boolean(item));
}
