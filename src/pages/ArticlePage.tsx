import { ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArticleBody } from "../components/articles/ArticleBody";
import { ArticleHeader } from "../components/articles/ArticleHeader";
import { ArticleMascotComment } from "../components/articles/ArticleMascotComment";
import { ArticleShare } from "../components/articles/ArticleShare";
import { ArticleSources } from "../components/articles/ArticleSources";
import { ReadingProgress } from "../components/articles/ReadingProgress";
import { RelatedArticles } from "../components/articles/RelatedArticles";
import { PageChrome } from "../components/layout/PageChrome";
import { MascotAvatar } from "../components/mascot/MascotAvatar";
import { Seo } from "../components/Seo";
import { siteConfig } from "../config/siteConfig";
import { articles, getArticleBySlug, getRelatedArticles } from "../data/articles";
import { useAchievements } from "../hooks/useAchievements";
import { NotFound } from "./NotFound";

export function ArticlePage() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);
  const achievements = useAchievements();

  useEffect(() => {
    if (article) {
      achievements.readArticle(article.id, siteConfig.points.readArticle, articles.length);
    }
  }, [article?.id]);

  if (!article) return <NotFound />;

  const related = getRelatedArticles(article);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.subtitle,
    image: article.coverImage,
    author: {
      "@type": "Person",
      name: article.author
    },
    publisher: {
      "@type": "Organization",
      name: "2Doods"
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt
  };

  return (
    <PageChrome activeSection="curiosidades" achievementsOverride={achievements}>
      <Seo
        title={`${article.title} | 2Doods`}
        description={article.subtitle}
        canonicalPath={`/artigos/${article.slug}`}
        image={article.coverImage}
        type="article"
        publishedAt={article.publishedAt}
        author={article.author}
        structuredData={structuredData}
      />
      <ReadingProgress />
      <main className="article-page">
        <ArticleHeader article={article} />
        <ArticleBody article={article} />
        <ArticleMascotComment>
          Se esse artigo te fez reparar em um detalhe invisível de algum jogo, missão cumprida.
        </ArticleMascotComment>
        <ArticleSources sources={article.sources} />
        <ArticleShare article={article} />
        <section className="article-cta">
          <MascotAvatar expression="laughing" size="small" floating />
          <div>
            <h2>Quer mais respawns como esse?</h2>
            <p>O canal da 2Doods recebe curiosidades, análises e ideias para quem gosta de entender jogos por dentro.</p>
          </div>
          <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer">
            Abrir YouTube
            <ExternalLink size={17} />
          </a>
        </section>
        <RelatedArticles articles={related} />
      </main>
    </PageChrome>
  );
}
