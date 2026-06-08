import { ArrowLeft, CalendarDays, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import type { Article } from "../../data/articles";
import { ArticleMascotComment } from "./ArticleMascotComment";
import { ReadingTime } from "./ReadingTime";

interface ArticleHeaderProps {
  article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const published = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(
    new Date(`${article.publishedAt}T12:00:00`)
  );

  return (
    <header className="article-header">
      <Link className="back-link" to="/artigos">
        <ArrowLeft size={18} />
        Voltar para a Doodex
      </Link>
      <div className="article-header__content">
        <div>
          <span className="article-kicker">{article.category}</span>
          <h1>{article.title}</h1>
          <p>{article.subtitle}</p>
          <div className="article-meta">
            <span><UserRound size={16} /> {article.author}</span>
            <span><CalendarDays size={16} /> {published}</span>
            <ReadingTime minutes={article.readingTime} />
          </div>
        </div>
        {article.mascotComment ? <ArticleMascotComment compact>{article.mascotComment}</ArticleMascotComment> : null}
      </div>
      <img src={article.coverImage} alt={article.altText} loading="eager" />
    </header>
  );
}
