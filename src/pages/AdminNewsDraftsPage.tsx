import {
  CheckCircle2,
  Clipboard,
  Copy,
  ExternalLink,
  FileText,
  Pencil,
  RefreshCw,
  ShieldAlert,
  Sparkles,
  XCircle
} from "lucide-react";
import { useMemo, useState } from "react";
import { PageChrome } from "../components/layout/PageChrome";
import { Seo } from "../components/Seo";
import { useNewsDraftStore } from "../news/storage/useNewsDraftStore";
import type { DoodNewsDraft, NewsDraftStatus } from "../news/types";

const statusLabels: Record<NewsDraftStatus, string> = {
  draft: "Rascunho",
  approved: "Aprovado",
  rejected: "Rejeitado"
};

const reliabilityLabels = {
  confirmed: "Confirmado",
  rumor: "Rumor",
  leak: "Vazamento",
  analysis: "Analise"
};

function docsCopy(draft: DoodNewsDraft) {
  return [
    draft.title,
    "",
    `Status: ${statusLabels[draft.status]}`,
    `Confiabilidade: ${reliabilityLabels[draft.reliability]}`,
    `Fonte: ${draft.sourceName} - ${draft.sourceUrl}`,
    `Publicado em: ${new Date(draft.publishedAt).toLocaleString("pt-BR")}`,
    `Score: ${draft.priorityScore}`,
    "",
    "Resumo",
    draft.summary,
    "",
    "Por que importa",
    draft.whyItMatters,
    "",
    "Opiniao da 2Doods",
    draft.doodOpinion,
    "",
    "Impacto para jogadores",
    draft.playerImpact,
    "",
    "Short",
    `Hook: ${draft.shortHook ?? ""}`,
    `Titulo curto: ${draft.shortPackage.shortTitle}`,
    `Tags: ${draft.shortPackage.suggestedTags.join(", ")}`,
    `Comentario fixado: ${draft.shortPackage.pinnedComment}`,
    `Pergunta: ${draft.shortPackage.communityQuestion}`,
    "",
    "Links relacionados",
    ...draft.relatedLinks.map((link) => `- ${link.title} (${link.source}): ${link.url}`)
  ].join("\n");
}

function shortCopy(draft: DoodNewsDraft) {
  return [
    `Hook: ${draft.shortHook ?? ""}`,
    `Titulo curto: ${draft.shortPackage.shortTitle}`,
    `Tags: ${draft.shortPackage.suggestedTags.join(", ")}`,
    `Comentario fixado: ${draft.shortPackage.pinnedComment}`,
    `Pergunta para comunidade: ${draft.shortPackage.communityQuestion}`
  ].join("\n");
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

export function AdminNewsDraftsPage() {
  const { drafts, approveDraft, rejectDraft, reopenDraft, resetMockData, updateDraft } = useNewsDraftStore();
  const [status, setStatus] = useState<"Todos" | NewsDraftStatus>("Todos");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    whyItMatters: "",
    doodOpinion: "",
    playerImpact: "",
    shortHook: ""
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

  function startEditing(draft: DoodNewsDraft) {
    setEditingId(draft.id);
    setForm({
      title: draft.title,
      summary: draft.summary,
      whyItMatters: draft.whyItMatters,
      doodOpinion: draft.doodOpinion,
      playerImpact: draft.playerImpact,
      shortHook: draft.shortHook ?? ""
    });
  }

  function saveEditing(draft: DoodNewsDraft) {
    updateDraft(draft.id, {
      ...form,
      shortHook: form.shortHook
    });
    setEditingId(null);
  }

  async function copyAndMark(id: string, text: string) {
    await copyText(text);
    setCopied(id);
    window.setTimeout(() => setCopied(null), 1600);
  }

  return (
    <PageChrome activeSection="plantao">
      <Seo
        title="Admin Plantão Doodverse | Rascunhos locais"
        description="Painel local para revisar rascunhos editoriais do Plantão Doodverse antes da publicação."
        canonicalPath="/admin/news-drafts"
      />

      <main className="news-admin-page">
        <section className="news-admin-hero section-band">
          <div>
            <span className="article-kicker">
              <ShieldAlert size={15} />
              Admin local
            </span>
            <h1>Rascunhos do Plantão Doodverse</h1>
            <p>
              Primeira versão sem publicação automática. Tudo que estiver como rascunho ou rejeitado continua invisível
              na página pública.
            </p>
            <div className="news-admin-stats" aria-label="Resumo dos rascunhos">
              <span>{counts.draft} rascunhos</span>
              <span>{counts.approved} aprovados</span>
              <span>{counts.rejected} rejeitados</span>
            </div>
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
              Restaurar mocks
            </button>
          </div>
        </section>

        <section className="section-band news-admin-list" aria-label="Rascunhos gerados">
          <div>
            {filteredDrafts.map((draft) => {
              const editing = editingId === draft.id;

              return (
                <article key={draft.id} className={`news-draft-card news-draft-card--${draft.status}`}>
                  <div className="news-draft-card__header">
                    <div>
                      <span>{statusLabels[draft.status]}</span>
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
                        <textarea
                          value={form.whyItMatters}
                          onChange={(event) => setForm({ ...form, whyItMatters: event.target.value })}
                        />
                      </label>
                      <label>
                        Opinião da 2Doods
                        <textarea
                          value={form.doodOpinion}
                          onChange={(event) => setForm({ ...form, doodOpinion: event.target.value })}
                        />
                      </label>
                      <label>
                        Impacto para jogadores
                        <textarea
                          value={form.playerImpact}
                          onChange={(event) => setForm({ ...form, playerImpact: event.target.value })}
                        />
                      </label>
                      <label>
                        Hook para Short
                        <input value={form.shortHook} onChange={(event) => setForm({ ...form, shortHook: event.target.value })} />
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

                  <div className="news-short-panel">
                    <Sparkles size={18} />
                    <div>
                      <strong>Criar Short</strong>
                      <span>{draft.shortHook}</span>
                      <small>{draft.shortPackage.suggestedTags.join(" · ")}</small>
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
                        Editar localmente
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
                    <button type="button" onClick={() => copyAndMark(`${draft.id}-short`, shortCopy(draft))}>
                      <Copy size={17} />
                      Copiar hook para Short
                    </button>
                  </div>

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
