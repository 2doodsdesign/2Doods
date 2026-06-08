import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Article } from "../../data/articles";
import { ReadingTime } from "./ReadingTime";

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles.length) return null;

  return (
    <section className="related-articles">
      <h2>Próximos arquivos da Doodex</h2>
      <div>
        {articles.map((article) => (
          <Link key={article.id} to={`/artigos/${article.slug}`}>
            <img src={article.coverImage} alt="" loading="lazy" />
            <span>{article.category}</span>
            <strong>{article.title}</strong>
            <ReadingTime minutes={article.readingTime} />
            <em>Continuar lendo <ArrowRight size={16} /></em>
          </Link>
        ))}
      </div>
    </section>
  );
}
