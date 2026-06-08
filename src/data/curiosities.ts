import { articles } from "./articles";

export interface Curiosity {
  id: string;
  title: string;
  summary: string;
  category: string;
  image: string;
  altText: string;
  slug: string;
  readingTime: number;
  source?: string;
  featured?: boolean;
}

export const curiosities: Curiosity[] = articles.map((article, index) => ({
  id: article.id,
  title: article.title,
  summary: article.excerpt,
  category: article.category,
  image: article.coverImage,
  altText: article.altText,
  slug: article.slug,
  readingTime: article.readingTime,
  featured: index === 0
}));
