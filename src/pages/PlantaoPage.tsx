import { Clock3, ExternalLink, Filter, Gauge, Megaphone, MessageSquareText, Radio, Search, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { PageChrome } from "../components/layout/PageChrome";
import { MascotAvatar } from "../components/mascot/MascotAvatar";
import { Seo } from "../components/Seo";
import { useNewsDraftStore } from "../news/storage/useNewsDraftStore";
import type { DoodNewsDraft, NewsReliability } from "../news/types";

const reliabilityLabels: Record<NewsReliability, string> = {
  confirmed: "Confirmado",
  rumor: "Rumor",
  leak: "Vazamento",
  analysis: "Analise"
};

const shortPotentialLabels = {
  low: "baixo",
  medium: "medio",
  high: "alto"
};

function relativeTime(date: string) {
  const diffMs = Date.now() - new Date(date).getTime();
  const minutes = Math.max(1, Math.round(diffMs / 1000 / 60));
  if (minutes < 60) return `${minutes} min atras`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h atras`;
  return `${Math.round(hours / 24)} d atras`;
}

function hostFromUrl(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function NewsCard({ draft }: { draft: DoodNewsDraft }) {
  const [showOpinion, setShowOpinion] = useState(false);

  return (
    <article className="plantao-card">
      <div className="plantao-card__meta">
        <span className={`reliability-pill reliability-pill--${draft.reliability}`}>{reliabilityLabels[draft.reliability]}</span>
        <span>{draft.category}</span>
        <span>{relativeTime(draft.publishedAt)}</span>
      </div>

      <h2>{draft.title}</h2>
      <p>{draft.summary}</p>

      <div className="plantao-card__context">
        <strong>Por que importa</strong>
        <p>{draft.whyItMatters}</p>
      </div>

      {showOpinion ? (
        <div className="plantao-card__opinion">
          <strong>Opinião da 2Doods</strong>
          <p>{draft.doodOpinion}</p>
        </div>
      ) : null}

      <div className="plantao-card__impact">
        <Gauge size={17} />
        <span>{draft.playerImpact}</span>
      </div>

      <div className="plantao-card__tags" aria-label="Tags">
        {draft.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="plantao-card__short">
        <Megaphone size={17} />
        <span>Short: potencial {shortPotentialLabels[draft.shortPotential]}</span>
        {draft.shortHook ? <strong>{draft.shortHook}</strong> : null}
      </div>

      <div className="plantao-card__sources">
        <span>
          Fonte: <strong>{draft.sourceName}</strong> ({hostFromUrl(draft.sourceUrl)})
        </span>
      </div>

      <div className="plantao-card__actions">
        <a href={draft.sourceUrl} target="_blank" rel="noreferrer">
          <ExternalLink size={17} />
          Ler fonte original
        </a>
        <button type="button" onClick={() => setShowOpinion((current) => !current)}>
          <MessageSquareText size={17} />
          {showOpinion ? "Ocultar opinião" : "Ver opinião da 2Doods"}
        </button>
      </div>
    </article>
  );
}

export function PlantaoPage() {
  const { approvedDrafts } = useNewsDraftStore();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [reliability, setReliability] = useState<"Todos" | NewsReliability>("Todos");

  const categories = useMemo(
    () => ["Todos", ...Array.from(new Set(approvedDrafts.map((draft) => draft.category)))],
    [approvedDrafts]
  );
  const filteredDrafts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return approvedDrafts.filter((draft) => {
      const matchesQuery =
        !normalizedQuery ||
        [draft.title, draft.summary, draft.category, draft.sourceName, ...draft.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesCategory = category === "Todos" || draft.category === category;
      const matchesReliability = reliability === "Todos" || draft.reliability === reliability;

      return matchesQuery && matchesCategory && matchesReliability;
    });
  }, [approvedDrafts, category, query, reliability]);

  const latestAlerts = approvedDrafts.slice(0, 3);

  return (
    <PageChrome activeSection="plantao">
      <Seo
        title="Plantão Doodverse | Notícias gamer com contexto - 2Doods"
        description="Notícias gamer resumidas com contexto, opinião editorial da 2Doods, fontes originais e revisão humana antes da publicação."
        canonicalPath="/plantao"
      />

      <main className="plantao-page">
        <section className="plantao-hero section-band">
          <div>
            <div className="plantao-hero__copy">
              <span className="article-kicker">
                <Radio size={15} />
                Plantão Doodverse
              </span>
              <h1>Notícia gamer sem perder o controle do hype.</h1>
              <p>
                Manchetes organizadas, fontes creditadas, contexto rápido e opinião editorial separada do fato. Primeiro
                revisa, depois publica.
              </p>
              <div className="plantao-ticker" aria-label="Assuntos em monitoramento">
                <span>Ocarina</span>
                <span>Persona</span>
                <span>Nintendo</span>
                <span>Indies</span>
                <span>Game Design</span>
                <span>Mercado</span>
              </div>
            </div>
            <div className="plantao-hero__anchor">
              <MascotAvatar expression="talking" size="large" floating />
              <div>
                <ShieldCheck size={20} />
                <strong>Resumo editorial, fonte na mesa.</strong>
                <span>Conteúdo produzido a partir de fontes públicas, com resumo editorial da 2Doods.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="plantao-alerts section-band" aria-labelledby="ultimos-alertas">
          <div>
            <div className="plantao-section-heading">
              <span>Últimos alertas</span>
              <h2 id="ultimos-alertas">O que já passou pela revisão</h2>
            </div>
            <div className="plantao-alert-list">
              {latestAlerts.map((draft) => (
                <a key={draft.id} href={draft.sourceUrl} target="_blank" rel="noreferrer">
                  <span>{reliabilityLabels[draft.reliability]}</span>
                  <strong>{draft.title}</strong>
                  <small>
                    <Clock3 size={14} />
                    {relativeTime(draft.publishedAt)}
                  </small>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="plantao-feed section-band" aria-label="Notícias aprovadas">
          <div>
            <div className="plantao-toolbar">
              <label>
                <Search size={17} />
                <span className="sr-only">Buscar notícias</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar assunto, fonte ou tag"
                />
              </label>

              <label>
                <Filter size={17} />
                <span className="sr-only">Filtrar categoria</span>
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                  {categories.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label>
                <ShieldCheck size={17} />
                <span className="sr-only">Filtrar confiabilidade</span>
                <select
                  value={reliability}
                  onChange={(event) => setReliability(event.target.value as "Todos" | NewsReliability)}
                >
                  <option>Todos</option>
                  <option value="confirmed">Confirmado</option>
                  <option value="rumor">Rumor</option>
                  <option value="leak">Vazamento</option>
                  <option value="analysis">Analise</option>
                </select>
              </label>
            </div>

            {filteredDrafts.length ? (
              <div className="plantao-grid">
                {filteredDrafts.map((draft) => (
                  <NewsCard key={draft.id} draft={draft} />
                ))}
              </div>
            ) : (
              <div className="plantao-empty">
                <Radio size={24} />
                <strong>Nenhuma notícia aprovada nesse filtro.</strong>
                <p>Rascunhos ainda em revisão continuam invisíveis no site público.</p>
              </div>
            )}
          </div>
        </section>

        <section className="plantao-transparency section-band">
          <div>
            <ShieldCheck size={22} />
            <p>
              O Plantão Doodverse reúne notícias de fontes públicas e adiciona contexto editorial da 2Doods. Links
              originais são sempre creditados. Rascunhos podem ser auxiliados por IA e revisados antes da publicação.
            </p>
          </div>
        </section>
      </main>
    </PageChrome>
  );
}
