import {
  CheckCircle2,
  Clipboard,
  Code2,
  Copy,
  ExternalLink,
  FileText,
  Link as LinkIcon,
  Pencil,
  RefreshCw,
  Save,
  ShieldAlert,
  Sparkles,
  Wand2,
  XCircle
} from "lucide-react";
import { useMemo, useState } from "react";
import { PageChrome } from "../components/layout/PageChrome";
import { Seo } from "../components/Seo";
import { generateManualEditorialPrompt } from "../news/ai/generateManualEditorialPrompt";
import { createSlug } from "../news/aggregator/normalizeNewsItem";
import { useNewsDraftStore } from "../news/storage/useNewsDraftStore";
import type { DoodNewsDraft, NewsDraftStatus, NewsReliability, NewsTopicType, RawNewsItem, ShortPotential } from "../news/types";

const statusLabels: Record<NewsDraftStatus, string> = {
  draft: "Rascunho",
  approved: "Aprovado",
  rejected: "Rejeitado"
};

const reliabilityLabels: Record<NewsReliability, string> = {
  confirmed: "Confirmado",
  rumor: "Rumor",
  leak: "Vazamento",
  analysis: "Análise"
};

const jsonErrorMessage =
  "O texto colado não parece um JSON válido. Confira se você copiou desde a primeira chave até a última chave.";

const emptyManualForm = {
  title: "",
  sourceName: "",
  sourceUrl: "",
  publishedAt: new Date().toISOString().slice(0, 10),
  excerpt: "",
  category: "Geral",
  reliability: "confirmed" as NewsReliability,
  tags: ""
};

function topicFromReliability(reliability: NewsReliability): NewsTopicType {
  if (reliability === "confirmed") return "confirmed";
  return reliability;
}

function normalizeDate(value: string) {
  if (!value) return new Date().toISOString();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

function tagsFromText(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function draftToRawNewsItem(draft: DoodNewsDraft): RawNewsItem {
  return {
    id: draft.id,
    sourceId: "manual",
    sourceName: draft.sourceName,
    title: draft.originalTitle || draft.title,
    link: draft.sourceUrl,
    publishedAt: draft.publishedAt,
    excerpt: draft.summary || draft.reviewNotes,
    category: draft.category,
    reliability: draft.reliability,
    tags: draft.tags
  };
}

function hostFromUrl(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function createManualDraft(form: typeof emptyManualForm): DoodNewsDraft {
  const originalTitle = form.title.trim() || "Pauta sem título";
  const slug = createSlug(originalTitle || `pauta-${Date.now()}`);
  const tags = tagsFromText(form.tags);
  const sourceName = form.sourceName.trim() || hostFromUrl(form.sourceUrl) || "Fonte manual";
  const sourceUrl = form.sourceUrl.trim();
  const publishedAt = normalizeDate(form.publishedAt);

  return {
    id: `manual-${slug}-${Date.now()}`,
    slug,
    status: "draft",
    reliability: form.reliability,
    topicType: topicFromReliability(form.reliability),
    title: originalTitle,
    originalTitle,
    sourceName,
    sourceUrl,
    publishedAt,
    generatedAt: new Date().toISOString(),
    category: form.category.trim() || "Geral",
    tags,
    summary: form.excerpt.trim() || "Pauta criada manualmente. Gere o prompt editorial e cole a resposta estruturada.",
    whyItMatters: "Aguardando resposta editorial estruturada.",
    doodOpinion: "Aguardando opinião editorial da 2Doods.",
    playerImpact: "Aguardando impacto para jogadores.",
    shortHook: "",
    shortPotential: "low",
    shortPackage: {
      shortTitle: originalTitle.slice(0, 58),
      suggestedTags: ["2Doods", "games", ...tags].slice(0, 8),
      pinnedComment: "",
      communityQuestion: ""
    },
    priorityScore: 0,
    relatedLinks: sourceUrl
      ? [
          {
            title: originalTitle,
            source: sourceName,
            url: sourceUrl
          }
        ]
      : [],
    reviewNotes: form.excerpt,
    createdManually: true,
    reviewedByHuman: false
  };
}

function contentPackage(draft: DoodNewsDraft) {
  return [
    "TÍTULO DO SHORT:",
    draft.youtubeShortTitle || draft.shortPackage.shortTitle,
    "",
    "ROTEIRO/HOOK:",
    draft.shortHook ?? "",
    "",
    "LEGENDA TIKTOK:",
    draft.tiktokCaption ?? "",
    "",
    "LEGENDA INSTAGRAM:",
    draft.instagramCaption ?? "",
    "",
    "COMENTÁRIO FIXADO:",
    draft.pinnedComment || draft.shortPackage.pinnedComment,
    "",
    "PERGUNTA PARA COMUNIDADE:",
    draft.communityQuestion || draft.shortPackage.communityQuestion,
    "",
    "FONTE:",
    `${draft.sourceName} - ${draft.sourceUrl}`
  ].join("\n");
}

function docsCopy(draft: DoodNewsDraft) {
  return [
    draft.title,
    "",
    `Status: ${statusLabels[draft.status]}`,
    `Confiabilidade: ${reliabilityLabels[draft.reliability]}`,
    `Fonte: ${draft.sourceName} - ${draft.sourceUrl}`,
    `Publicado em: ${new Date(draft.publishedAt).toLocaleString("pt-BR")}`,
    "",
    "Resumo",
    draft.summary,
    "",
    "Por que importa",
    draft.whyItMatters,
    "",
    "Opinião da 2Doods",
    draft.doodOpinion,
    "",
    "Impacto para jogadores",
    draft.playerImpact,
    "",
    "Transformar em conteúdo",
    contentPackage(draft),
    "",
    "Links relacionados",
    ...draft.relatedLinks.map((link) => `- ${link.title} (${link.source}): ${link.url}`)
  ].join("\n");
}

function exportApprovedSnippet(draft: DoodNewsDraft) {
  const exported: DoodNewsDraft = {
    ...draft,
    status: "approved",
    reviewedByHuman: true,
    approvedAt: draft.approvedAt ?? new Date().toISOString(),
    isMock: undefined,
    isDemo: undefined,
    aiResponseRaw: undefined,
    manualPrompt: undefined
  };

  return `${JSON.stringify(exported, null, 2)},`;
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function parseAiJson(raw: string) {
  const firstBrace = raw.indexOf("{");
  const lastBrace = raw.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error(jsonErrorMessage);
  }

  return JSON.parse(raw.slice(firstBrace, lastBrace + 1)) as {
    title?: string;
    reliability?: NewsReliability;
    category?: string;
    tags?: string[];
    summary?: string;
    whyItMatters?: string;
    doodOpinion?: string;
    shortHook?: string;
    shortPotential?: ShortPotential;
    youtubeShortTitle?: string;
    tiktokCaption?: string;
    instagramCaption?: string;
    pinnedComment?: string;
    communityQuestion?: string;
  };
}

export function AdminNewsDraftsPage() {
  const { drafts, addDraft, approveDraft, rejectDraft, reopenDraft, resetMockData, updateDraft } = useNewsDraftStore();
  const [status, setStatus] = useState<"Todos" | NewsDraftStatus>("Todos");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [linkImport, setLinkImport] = useState("");
  const [manualForm, setManualForm] = useState(emptyManualForm);
  const [aiResponses, setAiResponses] = useState<Record<string, string>>({});
  const [aiErrors, setAiErrors] = useState<Record<string, string>>({});
  const [exportSnippets, setExportSnippets] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    title: "",
    summary: "",
    whyItMatters: "",
    doodOpinion: "",
    playerImpact: "",
    shortHook: "",
    youtubeShortTitle: "",
    tiktokCaption: "",
    instagramCaption: "",
    pinnedComment: "",
    communityQuestion: ""
  });

  const filteredDrafts = useMemo(
    () => drafts.filter((draft) => status === "Todos" || draft.status === status),
    [drafts, status]
  );
  const counts = useMemo(
    () => ({
      draft: drafts.filter((draft) => draft.status === "draft").length,
      approved: drafts.filter((draft) => draft.status === "approved").length,
      rejected: drafts.filter((draft) => draft.status === "rejected").length
    }),
    [drafts]
  );

  function prefillFromLink() {
    const url = linkImport.trim();
    if (!url) return;
    setManualForm((current) => ({
      ...current,
      sourceUrl: url,
      sourceName: current.sourceName || hostFromUrl(url)
    }));
  }

  function createManualNewsDraft() {
    const draft = createManualDraft(manualForm);
    const prompt = generateManualEditorialPrompt(draftToRawNewsItem(draft));
    addDraft({ ...draft, manualPrompt: prompt });
    setManualForm(emptyManualForm);
    setLinkImport("");
  }

  function startEditing(draft: DoodNewsDraft) {
    setEditingId(draft.id);
    setForm({
      title: draft.title,
      summary: draft.summary,
      whyItMatters: draft.whyItMatters,
      doodOpinion: draft.doodOpinion,
      playerImpact: draft.playerImpact,
      shortHook: draft.shortHook ?? "",
      youtubeShortTitle: draft.youtubeShortTitle ?? draft.shortPackage.shortTitle,
      tiktokCaption: draft.tiktokCaption ?? "",
      instagramCaption: draft.instagramCaption ?? "",
      pinnedComment: draft.pinnedComment ?? draft.shortPackage.pinnedComment,
      communityQuestion: draft.communityQuestion ?? draft.shortPackage.communityQuestion
    });
  }

  function saveEditing(draft: DoodNewsDraft) {
    updateDraft(draft.id, {
      ...form,
      shortPackage: {
        ...draft.shortPackage,
        shortTitle: form.youtubeShortTitle || form.title.slice(0, 58),
        pinnedComment: form.pinnedComment,
        communityQuestion: form.communityQuestion
      }
    });
    setEditingId(null);
  }

  async function copyAndMark(id: string, text: string) {
    await copyText(text);
    setCopied(id);
    window.setTimeout(() => setCopied(null), 1600);
  }

  function generatePrompt(draft: DoodNewsDraft) {
    const prompt = generateManualEditorialPrompt(draftToRawNewsItem(draft));
    updateDraft(draft.id, { manualPrompt: prompt });
    return prompt;
  }

  async function copyPrompt(draft: DoodNewsDraft) {
    const prompt = draft.manualPrompt || generatePrompt(draft);
    await copyAndMark(`${draft.id}-prompt`, prompt);
  }

  function applyAiResponse(draft: DoodNewsDraft) {
    const raw = aiResponses[draft.id] ?? "";
    try {
      const parsed = parseAiJson(raw);
      const nextTags = Array.isArray(parsed.tags) ? parsed.tags.filter(Boolean) : draft.tags;
      const nextReliability = parsed.reliability ?? draft.reliability;
      const nextTitle = parsed.title || draft.title;

      updateDraft(draft.id, {
        status: "draft",
        title: nextTitle,
        slug: createSlug(nextTitle),
        reliability: nextReliability,
        topicType: topicFromReliability(nextReliability),
        category: parsed.category || draft.category,
        tags: nextTags,
        summary: parsed.summary || draft.summary,
        whyItMatters: parsed.whyItMatters || draft.whyItMatters,
        doodOpinion: parsed.doodOpinion || draft.doodOpinion,
        shortHook: parsed.shortHook || draft.shortHook,
        shortPotential: parsed.shortPotential ?? draft.shortPotential,
        youtubeShortTitle: parsed.youtubeShortTitle,
        tiktokCaption: parsed.tiktokCaption,
        instagramCaption: parsed.instagramCaption,
        pinnedComment: parsed.pinnedComment,
        communityQuestion: parsed.communityQuestion,
        aiResponseRaw: raw,
        reviewedByHuman: false,
        shortPackage: {
          shortTitle: parsed.youtubeShortTitle || nextTitle.slice(0, 58),
          suggestedTags: [...new Set(["2Doods", "games", ...nextTags])].slice(0, 8),
          pinnedComment: parsed.pinnedComment || draft.shortPackage.pinnedComment,
          communityQuestion: parsed.communityQuestion || draft.shortPackage.communityQuestion
        }
      });
      setAiErrors((current) => ({ ...current, [draft.id]: "" }));
    } catch {
      setAiErrors((current) => ({ ...current, [draft.id]: jsonErrorMessage }));
    }
  }

  function exportDraft(draft: DoodNewsDraft) {
    const snippet = exportApprovedSnippet(draft);
    setExportSnippets((current) => ({ ...current, [draft.id]: snippet }));
  }

  return (
    <PageChrome activeSection="plantao">
      <Seo
        title="Admin Plantão Doodverse | Fluxo semi-automático"
        description="Painel local para criar pautas, gerar prompts editoriais, revisar JSON e exportar notícias aprovadas."
        canonicalPath="/admin/news-drafts"
      />

      <main className="news-admin-page">
        <section className="news-admin-hero section-band">
          <div>
            <span className="article-kicker">
              <ShieldAlert size={15} />
              Admin local
            </span>
            <h1>Plantão Doodverse semi-automático</h1>
            <p>
              Este painel é local/semi-automático. Para publicar definitivamente no site estático, exporte a notícia
              aprovada e adicione ao arquivo <code>approvedDoodNews.ts</code>.
            </p>
            <div className="news-admin-stats" aria-label="Resumo dos rascunhos">
              <span>{counts.draft} rascunhos</span>
              <span>{counts.approved} aprovados</span>
              <span>{counts.rejected} rejeitados</span>
            </div>
          </div>
        </section>

        <section className="section-band news-manual-entry" aria-label="Criar pauta manual">
          <div>
            <div className="plantao-section-heading">
              <span>Modo Estático</span>
              <h2>Criar pauta manual</h2>
            </div>

            <div className="news-link-import">
              <label>
                Colar link da notícia
                <input value={linkImport} onChange={(event) => setLinkImport(event.target.value)} placeholder="https://fonte.com/noticia" />
              </label>
              <button type="button" onClick={prefillFromLink}>
                <LinkIcon size={17} />
                Usar link
              </button>
            </div>

            <div className="news-manual-grid">
              <label>
                Título original
                <input value={manualForm.title} onChange={(event) => setManualForm({ ...manualForm, title: event.target.value })} />
              </label>
              <label>
                Fonte
                <input value={manualForm.sourceName} onChange={(event) => setManualForm({ ...manualForm, sourceName: event.target.value })} />
              </label>
              <label>
                Link
                <input value={manualForm.sourceUrl} onChange={(event) => setManualForm({ ...manualForm, sourceUrl: event.target.value })} />
              </label>
              <label>
                Data
                <input
                  type="date"
                  value={manualForm.publishedAt}
                  onChange={(event) => setManualForm({ ...manualForm, publishedAt: event.target.value })}
                />
              </label>
              <label>
                Categoria
                <input value={manualForm.category} onChange={(event) => setManualForm({ ...manualForm, category: event.target.value })} />
              </label>
              <label>
                Tipo
                <select
                  value={manualForm.reliability}
                  onChange={(event) => setManualForm({ ...manualForm, reliability: event.target.value as NewsReliability })}
                >
                  <option value="confirmed">Confirmado</option>
                  <option value="rumor">Rumor</option>
                  <option value="leak">Vazamento</option>
                  <option value="analysis">Análise</option>
                </select>
              </label>
              <label>
                Tags opcionais
                <input
                  value={manualForm.tags}
                  onChange={(event) => setManualForm({ ...manualForm, tags: event.target.value })}
                  placeholder="Nintendo, RPG, trailer"
                />
              </label>
              <label className="news-manual-grid__wide">
                Trecho ou contexto bruto
                <textarea value={manualForm.excerpt} onChange={(event) => setManualForm({ ...manualForm, excerpt: event.target.value })} />
              </label>
            </div>

            <button className="news-primary-action" type="button" onClick={createManualNewsDraft}>
              <Save size={17} />
              Criar pauta
            </button>
          </div>
        </section>

        <section className="section-band news-admin-toolbar" aria-label="Filtros do painel">
          <div>
            <div role="tablist" aria-label="Status">
              {(["Todos", "draft", "approved", "rejected"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  className={status === item ? "is-active" : ""}
                  onClick={() => setStatus(item)}
                >
                  {item === "Todos" ? "Todos" : statusLabels[item]}
                </button>
              ))}
            </div>
            <button type="button" onClick={resetMockData}>
              <RefreshCw size={17} />
              Restaurar demos
            </button>
          </div>
        </section>

        <section className="section-band news-admin-list" aria-label="Rascunhos gerados">
          <div>
            {filteredDrafts.map((draft) => {
              const editing = editingId === draft.id;
              const prompt = draft.manualPrompt || generateManualEditorialPrompt(draftToRawNewsItem(draft));
              const exportSnippet = exportSnippets[draft.id];

              return (
                <article key={draft.id} className={`news-draft-card news-draft-card--${draft.status}`}>
                  <div className="news-draft-card__header">
                    <div>
                      <span>{draft.isDemo ? "Demo" : statusLabels[draft.status]}</span>
                      <h2>{draft.title}</h2>
                      <p>{draft.originalTitle}</p>
                    </div>
                    <strong>{draft.priorityScore}</strong>
                  </div>

                  <div className="news-draft-card__meta">
                    <span>{draft.sourceName}</span>
                    <span>{reliabilityLabels[draft.reliability]}</span>
                    <span>{draft.category}</span>
                    <span>{new Date(draft.publishedAt).toLocaleDateString("pt-BR")}</span>
                    {draft.reviewedByHuman ? <span>Revisado por humano</span> : null}
                  </div>

                  {editing ? (
                    <div className="news-draft-editor">
                      <label>
                        Título
                        <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
                      </label>
                      <label>
                        Resumo
                        <textarea value={form.summary} onChange={(event) => setForm({ ...form, summary: event.target.value })} />
                      </label>
                      <label>
                        Por que importa
                        <textarea value={form.whyItMatters} onChange={(event) => setForm({ ...form, whyItMatters: event.target.value })} />
                      </label>
                      <label>
                        Opinião da 2Doods
                        <textarea value={form.doodOpinion} onChange={(event) => setForm({ ...form, doodOpinion: event.target.value })} />
                      </label>
                      <label>
                        Impacto para jogadores
                        <textarea value={form.playerImpact} onChange={(event) => setForm({ ...form, playerImpact: event.target.value })} />
                      </label>
                      <label>
                        Título para Short
                        <input
                          value={form.youtubeShortTitle}
                          onChange={(event) => setForm({ ...form, youtubeShortTitle: event.target.value })}
                        />
                      </label>
                      <label>
                        Hook para Short
                        <input value={form.shortHook} onChange={(event) => setForm({ ...form, shortHook: event.target.value })} />
                      </label>
                      <label>
                        Legenda TikTok
                        <textarea value={form.tiktokCaption} onChange={(event) => setForm({ ...form, tiktokCaption: event.target.value })} />
                      </label>
                      <label>
                        Legenda Instagram
                        <textarea
                          value={form.instagramCaption}
                          onChange={(event) => setForm({ ...form, instagramCaption: event.target.value })}
                        />
                      </label>
                      <label>
                        Comentário fixado
                        <textarea value={form.pinnedComment} onChange={(event) => setForm({ ...form, pinnedComment: event.target.value })} />
                      </label>
                      <label>
                        Pergunta para comunidade
                        <textarea
                          value={form.communityQuestion}
                          onChange={(event) => setForm({ ...form, communityQuestion: event.target.value })}
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="news-draft-card__body">
                      <section>
                        <strong>Resumo</strong>
                        <p>{draft.summary}</p>
                      </section>
                      <section>
                        <strong>Por que importa</strong>
                        <p>{draft.whyItMatters}</p>
                      </section>
                      <section>
                        <strong>Opinião editorial</strong>
                        <p>{draft.doodOpinion}</p>
                      </section>
                      <section>
                        <strong>Impacto para jogadores</strong>
                        <p>{draft.playerImpact}</p>
                      </section>
                    </div>
                  )}

                  <div className="news-prompt-panel">
                    <div>
                      <strong>Prompt editorial</strong>
                      <p>Copie, cole no ChatGPT e depois traga o JSON de volta para este painel.</p>
                    </div>
                    <textarea readOnly value={prompt} aria-label="Prompt editorial gerado" />
                    <div className="news-draft-actions">
                      <button type="button" onClick={() => copyPrompt(draft)}>
                        <Wand2 size={17} />
                        Gerar prompt editorial
                      </button>
                      <button type="button" onClick={() => copyAndMark(`${draft.id}-prompt-copy`, prompt)}>
                        <Copy size={17} />
                        Copiar prompt
                      </button>
                    </div>
                  </div>

                  <div className="news-ai-response-panel">
                    <label>
                      Colar resposta do ChatGPT
                      <textarea
                        value={aiResponses[draft.id] ?? draft.aiResponseRaw ?? ""}
                        onChange={(event) => setAiResponses((current) => ({ ...current, [draft.id]: event.target.value }))}
                        placeholder='Cole aqui o JSON começando em "{" e terminando em "}".'
                      />
                    </label>
                    {aiErrors[draft.id] ? <p className="news-error">{aiErrors[draft.id]}</p> : null}
                    <button type="button" onClick={() => applyAiResponse(draft)}>
                      <Save size={17} />
                      Salvar rascunho
                    </button>
                  </div>

                  <div className="news-short-panel">
                    <Sparkles size={18} />
                    <div>
                      <strong>Transformar em conteúdo</strong>
                      <span>{draft.youtubeShortTitle || draft.shortPackage.shortTitle}</span>
                      <small>{draft.shortHook}</small>
                    </div>
                  </div>

                  <div className="news-draft-links">
                    {draft.relatedLinks.map((link) => (
                      <a key={`${draft.id}-${link.url}`} href={link.url} target="_blank" rel="noreferrer">
                        <ExternalLink size={15} />
                        {link.source}
                      </a>
                    ))}
                  </div>

                  <div className="news-draft-actions">
                    {editing ? (
                      <>
                        <button type="button" onClick={() => saveEditing(draft)}>
                          <CheckCircle2 size={17} />
                          Salvar edição
                        </button>
                        <button type="button" onClick={() => setEditingId(null)}>
                          <XCircle size={17} />
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <button type="button" onClick={() => startEditing(draft)}>
                        <Pencil size={17} />
                        Editar
                      </button>
                    )}
                    <button type="button" onClick={() => approveDraft(draft.id)} disabled={draft.status === "approved"}>
                      <CheckCircle2 size={17} />
                      Aprovar
                    </button>
                    <button type="button" onClick={() => rejectDraft(draft.id)} disabled={draft.status === "rejected"}>
                      <XCircle size={17} />
                      Rejeitar
                    </button>
                    <button type="button" onClick={() => reopenDraft(draft.id)} disabled={draft.status === "draft"}>
                      <FileText size={17} />
                      Voltar para rascunho
                    </button>
                    <button type="button" onClick={() => copyAndMark(`${draft.id}-docs`, docsCopy(draft))}>
                      <Clipboard size={17} />
                      Copiar para Docs
                    </button>
                    <button type="button" onClick={() => copyAndMark(`${draft.id}-content`, contentPackage(draft))}>
                      <Copy size={17} />
                      Copiar pacote completo
                    </button>
                    <button type="button" onClick={() => copyAndMark(`${draft.id}-short`, draft.shortHook ?? "")}>
                      <Copy size={17} />
                      Copiar roteiro de Short
                    </button>
                    <button type="button" onClick={() => copyAndMark(`${draft.id}-tiktok`, draft.tiktokCaption ?? "")}>
                      <Copy size={17} />
                      Copiar legenda TikTok
                    </button>
                    <button type="button" onClick={() => copyAndMark(`${draft.id}-instagram`, draft.instagramCaption ?? "")}>
                      <Copy size={17} />
                      Copiar legenda Instagram
                    </button>
                    <button type="button" onClick={() => copyAndMark(`${draft.id}-comment`, draft.pinnedComment ?? draft.shortPackage.pinnedComment)}>
                      <Copy size={17} />
                      Copiar comentário fixado
                    </button>
                    <button type="button" onClick={() => exportDraft(draft)} disabled={draft.status !== "approved"}>
                      <Code2 size={17} />
                      Exportar notícia aprovada
                    </button>
                  </div>

                  {exportSnippet ? (
                    <div className="news-export-panel">
                      <strong>Exportar para código</strong>
                      <p>Cole este objeto dentro do array em <code>src/news/data/approvedDoodNews.ts</code>.</p>
                      <textarea readOnly value={exportSnippet} />
                      <button type="button" onClick={() => copyAndMark(`${draft.id}-export`, exportSnippet)}>
                        <Copy size={17} />
                        Copiar código
                      </button>
                    </div>
                  ) : null}

                  {copied?.startsWith(draft.id) ? <p className="news-copy-state">Copiado.</p> : null}
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </PageChrome>
  );
}
