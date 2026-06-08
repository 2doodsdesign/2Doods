import { ExternalLink } from "lucide-react";
import type { ArticleSource } from "../../data/articles";

interface ArticleSourcesProps {
  sources: ArticleSource[];
}

export function ArticleSources({ sources }: ArticleSourcesProps) {
  return (
    <section className="article-sources">
      <h2>Fontes e leituras complementares</h2>
      <p>
        Este artigo foi produzido a partir de pesquisas em materiais especializados. Os textos representam a análise
        editorial da 2Doods.
      </p>
      <div>
        {sources.map((source) => (
          <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">
            <strong>{source.title}</strong>
            <span>{source.publisher}</span>
            <ExternalLink size={17} aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}
