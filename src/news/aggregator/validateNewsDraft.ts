import type { DoodNewsDraft } from "../types";

export function validateNewsDraft(draft: DoodNewsDraft) {
  const errors: string[] = [];

  if (!draft.title.trim()) errors.push("Titulo ausente.");
  if (!draft.sourceUrl.trim()) errors.push("Link da fonte ausente.");
  if (!draft.sourceName.trim()) errors.push("Nome da fonte ausente.");
  if (!draft.summary.trim()) errors.push("Resumo ausente.");
  if (!draft.whyItMatters.trim()) errors.push("Contexto ausente.");
  if (!draft.doodOpinion.trim()) errors.push("Opiniao editorial ausente.");
  if (!draft.relatedLinks.length) errors.push("Pelo menos uma fonte relacionada e obrigatoria.");
  if (draft.status === "approved" && errors.length) errors.push("Rascunho aprovado nao pode ter campos obrigatorios vazios.");

  return {
    ok: errors.length === 0,
    errors
  };
}
