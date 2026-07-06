import type { DoodNewsDraft } from "../types";

export const mockDoodNewsDrafts: DoodNewsDraft[] = [
  {
    id: "mock-rpg-trailer-approved",
    slug: "demo-trailer-rpg-reacende-radar",
    status: "approved",
    reliability: "analysis",
    topicType: "trailer",
    title: "[Demo] Trailer novo reacende o radar de RPGs",
    originalTitle: "RPG trailer spotlight",
    sourceName: "PlayStation Blog",
    sourceUrl: "https://blog.playstation.com/",
    publishedAt: "2026-07-06T09:00:00.000Z",
    generatedAt: "2026-07-06T09:25:00.000Z",
    approvedAt: "2026-07-06T09:40:00.000Z",
    category: "RPG",
    tags: ["RPG", "Trailer", "PlayStation", "Demo MVP"],
    summary:
      "Card de demonstracao do MVP: a ideia e mostrar como um trailer seria resumido sem copiar texto da fonte, com link original e contexto editorial separado.",
    whyItMatters:
      "Trailer nao serve so para hype. Ele ajuda a medir direcao de arte, ritmo, promessa de combate e onde o jogo quer entrar no calendario.",
    doodOpinion:
      "O interessante aqui nao e gritar que vem obra-prima. E olhar para timing, promessa e se o material mostra jogo de verdade ou so fumaça bonita.",
    playerImpact:
      "Ajuda quem curte RPG a decidir se coloca no radar ou espera gameplay mais concreto antes de embarcar no hype.",
    shortHook: "Esse trailer mostra jogo de verdade ou so vende clima?",
    shortPotential: "high",
    shortPackage: {
      shortTitle: "Trailer de RPG: hype ou substancia?",
      suggestedTags: ["2Doods", "RPG", "PlayStation", "Trailer", "Games"],
      pinnedComment: "Voce prefere trailer cinematografico ou gameplay direto ao ponto?",
      communityQuestion: "Esse tipo de anuncio te convence ou voce espera gameplay?"
    },
    priorityScore: 78,
    relatedLinks: [
      {
        title: "Fonte original",
        source: "PlayStation Blog",
        url: "https://blog.playstation.com/"
      }
    ],
    reviewNotes: "Demo aprovada para validar layout publico.",
    isMock: true
  },
  {
    id: "mock-xbox-update-approved",
    slug: "demo-atualizacao-xbox-radar",
    status: "approved",
    reliability: "confirmed",
    topicType: "update",
    title: "[Demo] Atualizacao de servico entra no radar de quem joga no Xbox",
    originalTitle: "Xbox service update",
    sourceName: "Xbox Wire",
    sourceUrl: "https://news.xbox.com/en-us/",
    publishedAt: "2026-07-05T15:00:00.000Z",
    generatedAt: "2026-07-05T15:20:00.000Z",
    approvedAt: "2026-07-05T15:50:00.000Z",
    category: "Xbox",
    tags: ["Xbox", "Atualizacao", "Servico", "Demo MVP"],
    summary:
      "Exemplo aprovado do Plantao: uma atualizacao de servico deve explicar o que muda para o jogador antes de virar lista fria de recurso.",
    whyItMatters:
      "Mudanca de servico afeta biblioteca, acesso, tempo de download, save, multiplayer e a rotina de quem joga sem querer ler documento tecnico.",
    doodOpinion:
      "Atualizacao boa e aquela que diminui atrito. Se a novidade exige manual para entender, talvez o problema ainda nao tenha sido resolvido.",
    playerImpact:
      "Pode afetar principalmente quem usa o console como hub diario, alterna jogos com frequencia ou depende de recursos online.",
    shortHook: "Atualizacao de servico: melhoria real ou menu novo com outro nome?",
    shortPotential: "medium",
    shortPackage: {
      shortTitle: "Xbox atualizou. O que muda?",
      suggestedTags: ["2Doods", "Xbox", "GamePass", "Atualizacao", "Games"],
      pinnedComment: "Qual recurso de console voce acha que ainda precisa melhorar?",
      communityQuestion: "Voce liga para atualizacao de sistema ou so quer abrir o jogo logo?"
    },
    priorityScore: 62,
    relatedLinks: [
      {
        title: "Fonte original",
        source: "Xbox Wire",
        url: "https://news.xbox.com/en-us/"
      }
    ],
    reviewNotes: "Demo aprovada para validar filtros.",
    isMock: true
  },
  {
    id: "mock-indie-approved",
    slug: "demo-indie-surpresa-merece-lupa",
    status: "approved",
    reliability: "analysis",
    topicType: "analysis",
    title: "[Demo] Indie com cara de surpresa merece lupa",
    originalTitle: "Steam indie spotlight",
    sourceName: "Steam News",
    sourceUrl: "https://store.steampowered.com/news/",
    publishedAt: "2026-07-04T18:30:00.000Z",
    generatedAt: "2026-07-04T19:05:00.000Z",
    approvedAt: "2026-07-04T19:30:00.000Z",
    category: "Indies",
    tags: ["Indies", "PC", "Steam", "Demo MVP"],
    summary:
      "Exemplo editorial: quando um indie aparece com proposta clara, o resumo precisa explicar a ideia central antes de vender como fenomeno.",
    whyItMatters:
      "Indie forte normalmente vence no foco. Uma mecanica bem explicada pode render mais conversa do que uma campanha gigante sem identidade.",
    doodOpinion:
      "O melhor sinal nao e parecer caro. E parecer facil de explicar: uma boa ideia, uma promessa limpa e uma identidade que nao some no feed.",
    playerImpact:
      "Bom para quem procura experiencias menores, mais autorais e com potencial de virar recomendacao boca a boca.",
    shortHook: "Esse indie parece pequeno, mas a ideia pode ser grande.",
    shortPotential: "medium",
    shortPackage: {
      shortTitle: "Indie pequeno, ideia grande",
      suggestedTags: ["2Doods", "IndieGame", "Steam", "PCGaming", "Games"],
      pinnedComment: "Qual indie pequeno mais te surpreendeu nos ultimos anos?",
      communityQuestion: "Voce compra indie pelo visual, mecanica ou recomendacao?"
    },
    priorityScore: 55,
    relatedLinks: [
      {
        title: "Fonte original",
        source: "Steam News",
        url: "https://store.steampowered.com/news/"
      }
    ],
    reviewNotes: "Demo aprovada para validar cards.",
    isMock: true
  },
  {
    id: "mock-remake-draft",
    slug: "rascunho-rumor-remake-classico",
    status: "draft",
    reliability: "rumor",
    topicType: "rumor",
    title: "[Rascunho] Rumor de remake classico precisa de freio antes do hype",
    originalTitle: "Classic remake reportedly in development",
    sourceName: "VGC",
    sourceUrl: "https://www.videogameschronicle.com/",
    publishedAt: "2026-07-06T12:00:00.000Z",
    generatedAt: "2026-07-06T12:15:00.000Z",
    category: "Rumores",
    tags: ["Rumor", "Remake", "Mercado"],
    summary:
      "Rascunho invisivel no site publico: o texto precisa deixar claro que a informacao ainda nao foi confirmada oficialmente.",
    whyItMatters:
      "Rumor de remake mexe com nostalgia e calendario, mas tambem costuma virar telefone sem fio quando falta fonte primaria.",
    doodOpinion:
      "Da para ficar animado sem desligar o desconfiometro. Enquanto nao houver confirmacao, isso e pauta de radar, nao de promessa.",
    playerImpact:
      "Nao vale mudar decisao de compra ainda. Vale acompanhar se surgir confirmacao oficial ou mais de uma fonte confiavel.",
    shortHook: "Rumor de remake: hype permitido, certeza proibida.",
    shortPotential: "high",
    shortPackage: {
      shortTitle: "Rumor de remake: calma la",
      suggestedTags: ["2Doods", "Remake", "Rumor", "Games"],
      pinnedComment: "Qual remake voce realmente gostaria de ver confirmado?",
      communityQuestion: "Voce curte rumor ou prefere esperar anuncio oficial?"
    },
    priorityScore: 81,
    relatedLinks: [
      {
        title: "Fonte original",
        source: "VGC",
        url: "https://www.videogameschronicle.com/"
      }
    ],
    reviewNotes: "Precisa revisao humana antes de aprovar.",
    isMock: true
  },
  {
    id: "mock-rejected",
    slug: "rejeitado-sem-fonte-boa",
    status: "rejected",
    reliability: "leak",
    topicType: "leak",
    title: "[Rejeitado] Vazamento sem fonte suficiente",
    originalTitle: "Unverified leak",
    sourceName: "Fonte nao aprovada",
    sourceUrl: "https://example.com/",
    publishedAt: "2026-07-03T10:00:00.000Z",
    generatedAt: "2026-07-03T10:10:00.000Z",
    category: "Vazamentos",
    tags: ["Vazamento", "Rejeitado"],
    summary: "Exemplo rejeitado: material sem confiabilidade suficiente nao deve aparecer na pagina publica.",
    whyItMatters: "A regra editorial protege a credibilidade do Plantao e evita transformar chute em manchete.",
    doodOpinion: "Quando a fonte e fraca, a melhor decisao editorial e guardar o controle no bolso.",
    playerImpact: "Nenhum impacto pratico enquanto nao houver fonte melhor.",
    shortHook: "Nem todo vazamento merece palco.",
    shortPotential: "low",
    shortPackage: {
      shortTitle: "Vazamento fraco nao passa",
      suggestedTags: ["2Doods", "Vazamento", "Games"],
      pinnedComment: "Voce acha que rumor sem fonte deveria virar pauta?",
      communityQuestion: "Qual foi o rumor mais errado que voce ja viu?"
    },
    priorityScore: 18,
    relatedLinks: [
      {
        title: "Link analisado",
        source: "Fonte nao aprovada",
        url: "https://example.com/"
      }
    ],
    reviewNotes: "Rejeitado por falta de fonte confiavel.",
    isMock: true
  }
];
