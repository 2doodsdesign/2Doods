import type { Article } from "../../data/articles";

interface ArticleBodyProps {
  article: Article;
}

export function ArticleBody({ article }: ArticleBodyProps) {
  return (
    <div className="article-body">
      {article.sections.map((section, index) => (
        <section key={`${article.id}-${index}`} className={index === article.sections.length - 1 ? "article-section article-section--final" : "article-section"}>
          {section.title ? <h2>{section.title}</h2> : null}
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}
    </div>
  );
}
