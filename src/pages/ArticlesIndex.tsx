import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { CuriosityCard } from "../components/CuriosityCard";
import { PageChrome } from "../components/layout/PageChrome";
import { MascotAvatar } from "../components/mascot/MascotAvatar";
import { Seo } from "../components/Seo";
import { articles } from "../data/articles";

const categories = ["Todos", "Game Design", "Indies", "Bastidores"];

export function ArticlesIndex() {
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");

  const filteredArticles = useMemo(() => {
    const term = search.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory = category === "Todos" || article.category === category;
      const matchesSearch =
        !term ||
        article.title.toLowerCase().includes(term) ||
        article.excerpt.toLowerCase().includes(term) ||
        article.category.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  return (
    <PageChrome activeSection="curiosidades">
      <Seo
        title="Doodex | Artigos e Curiosidades da 2Doods"
        description="Leia artigos da Doodex sobre game design, jogos independentes, UX gamer e bastidores do mundo dos games."
        canonicalPath="/artigos"
      />
      <main className="articles-index">
        <section className="section-band articles-hero">
          <div>
            <div>
              <span className="article-kicker">Doodex</span>
              <h1>Artigos para abrir antes do próximo respawn.</h1>
              <p>
                Curiosidades com um pouco mais de fôlego: game design, bastidores, indies e ideias que deixam jogos
                mais interessantes depois que você entende como funcionam.
              </p>
            </div>
            <MascotAvatar expression="smiling" size="medium" floating />
          </div>
        </section>

        <section className="section-band article-filters" aria-label="Filtros de artigos">
          <div>
            <label>
              <Search size={18} />
              <span className="sr-only">Pesquisar artigos</span>
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Pesquisar na Doodex" />
            </label>
            <div role="tablist" aria-label="Categorias">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={category === item ? "is-active" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band">
          <div className="card-grid">
            {filteredArticles.map((article) => (
              <CuriosityCard
                key={article.id}
                curiosity={{
                  id: article.id,
                  title: article.title,
                  summary: article.excerpt,
                  category: article.category,
                  image: article.coverImage,
                  altText: article.altText,
                  slug: article.slug,
                  readingTime: article.readingTime
                }}
              />
            ))}
          </div>
          {!filteredArticles.length ? (
            <div className="empty-state">
              <MascotAvatar expression="neutral" size="small" />
              <p>Os próximos arquivos ainda estão sendo desbloqueados.</p>
            </div>
          ) : null}
        </section>
      </main>
    </PageChrome>
  );
}
