import type { EditorialDraftInput, NewsReliability, NewsTopicType, ShortPotential } from "../types";

function detectPotential(score: number): ShortPotential {
  if (score >= 80) return "high";
  if (score >= 50) return "medium";
  return "low";
}

function labelForReliability(reliability: NewsReliability) {
  const labels = {
    confirmed: "confirmado",
    rumor: "rumor",
    leak: "vazamento",
    analysis: "analise"
  };

  return labels[reliability];
}

function introForType(topicType: NewsTopicType) {
  const intros: Record<NewsTopicType, string> = {
    confirmed: "O ponto principal aqui e simples: existe fonte clara e a noticia ja pode ser tratada como fato.",
    rumor: "Por enquanto, isso entra no territorio do rumor. Vale acompanhar, mas sem vender como promessa.",
    leak: "Tem cara de vazamento, entao o freio fica puxado ate aparecer confirmacao oficial.",
    analysis: "Aqui a noticia importa menos pelo barulho e mais pelo movimento que ela sugere.",
    trailer: "Trailer bonito chama atencao, mas o que importa e o que ele revela sobre ritmo, escopo e promessa.",
    "release-date": "Data de lancamento muda calendario, fila de compras e planejamento de quem joga.",
    update: "Atualizacao boa nao vive so de patch note; ela mostra se o jogo ainda tem folego.",
    controversy: "Quando vira polemica, a pergunta certa e: isso afeta jogador ou e so ruido de timeline?",
    market: "Movimento de mercado parece distante, mas costuma bater no preco, catalogo e acesso do jogador."
  };

  return intros[topicType];
}

export function generateEditorialDraft(input: EditorialDraftInput) {
  const sourceLabel = `${input.sourceName} publicou a informacao original`;
  const excerpt = input.excerpt ? ` O recorte mais util: ${input.excerpt}` : "";
  const shortPotential = detectPotential(input.priorityScore);
  const reliabilityLabel = labelForReliability(input.reliability);

  return {
    title: `${input.originalTitle.replace(/\s+/g, " ").slice(0, 92)}`,
    reliability: input.reliability,
    category: input.category,
    tags: [
      input.category,
      reliabilityLabel,
      input.topicType.replace("-", " "),
      input.sourceName
    ].filter((tag, index, tags) => tags.indexOf(tag) === index).slice(0, 6),
    summary: `${sourceLabel}. ${input.originalTitle}${excerpt}`.slice(0, 450),
    whyItMatters: introForType(input.topicType).slice(0, 500),
    doodOpinion:
      "A boa leitura aqui e separar empolgacao de confirmacao. Se a fonte sustenta, entra no radar. Se falta detalhe, melhor esperar o proximo checkpoint antes de cravar.",
    shortHook: `${input.category}: o que muda para quem joga?`.slice(0, 120),
    shortPotential
  };
}
