import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  type?: "website" | "article";
  publishedAt?: string;
  author?: string;
  structuredData?: Record<string, unknown>;
}

function upsertMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export function Seo({ title, description, canonicalPath = "/", image, type = "website", publishedAt, author, structuredData }: SeoProps) {
  useEffect(() => {
    const canonicalUrl = `${window.location.origin}${canonicalPath}`;
    document.title = title;
    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:type"]', "property", "og:type", type);
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");

    if (image) {
      upsertMeta('meta[property="og:image"]', "property", "og:image", new URL(image, window.location.origin).href);
    }

    if (publishedAt) {
      upsertMeta('meta[property="article:published_time"]', "property", "article:published_time", publishedAt);
    }

    if (author) {
      upsertMeta('meta[name="author"]', "name", "author", author);
    }

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const scriptId = "structured-data";
    document.getElementById(scriptId)?.remove();
    if (structuredData) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [author, canonicalPath, description, image, publishedAt, structuredData, title, type]);

  return null;
}
