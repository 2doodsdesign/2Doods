import bastidoresCover from "../assets/articles/bastidores.svg";
import checkpointsCover from "../assets/articles/checkpoints.svg";
import indiesCover from "../assets/articles/indies.svg";

export interface ArticleSource {
  title: string;
  publisher: string;
  url: string;
}

export interface ArticleSection {
  title?: string;
  paragraphs: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  excerpt: string;
  coverImage: string;
  altText: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  sections: ArticleSection[];
  sources: ArticleSource[];
  relatedArticleIds: string[];
  mascotComment?: string;
}

export const articles: Article[] = [
  {
    id: "checkpoint",
    slug: "checkpoints-mudaram-a-forma-de-jogar",
    title: "Por que checkpoints mudaram a forma de jogar?",
    subtitle:
      "Salvar o progresso deixou de ser apenas uma conveniência e passou a controlar ritmo, tensão, dificuldade e até a maneira como encaramos o fracasso.",
    category: "Game Design",
    excerpt:
      "Salvar progresso deixou de ser só conveniência e virou parte do ritmo, da tensão e da recompensa.",
    coverImage: checkpointsCover,
    altText: "Arte com ponto de salvamento, caminho e HUD gamer vermelho e azul.",
    author: "Reinhold Berner",
    publishedAt: "2026-06-08",
    readingTime: 5,
    mascotComment: "Um checkpoint mal colocado consegue ser mais assustador que o próprio chefe.",
    relatedArticleIds: ["indies", "bastidores"],
    sections: [
      {
        title: "Salvar o jogo nem sempre foi algo simples",
        paragraphs: [
          "Hoje parece natural morrer em um jogo e voltar alguns segundos antes. Você erra um salto, perde para um chefe, reaparece perto do desafio e tenta novamente.",
          "Mas os jogos nem sempre funcionaram assim.",
          "Nos arcades, perder fazia parte do modelo de negócio. A partida acabava, o jogador colocava outra ficha e começava novamente. A dificuldade precisava manter a pessoa interessada, mas também fazer com que ela perdesse com frequência suficiente para continuar pagando.",
          "Quando os videogames chegaram com mais força às casas, repetir um jogo inteiro começou a fazer menos sentido. Jogadores queriam experiências maiores, histórias mais longas e mundos que não poderiam ser concluídos em uma única sessão.",
          "Foi aí que senhas, saves e checkpoints começaram a mudar completamente nossa relação com o progresso."
        ]
      },
      {
        title: "O checkpoint controla o ritmo",
        paragraphs: [
          "Um checkpoint não serve apenas para guardar onde o jogador parou.",
          "Ele também determina qual parte do jogo será repetida depois de uma falha.",
          "Quando um checkpoint aparece antes de um combate difícil, o jogo está dizendo: pode experimentar. O custo de errar não será tão alto.",
          "Quando ele fica muito distante, a mensagem muda: cada decisão importa, porque perder vai custar tempo.",
          "Essa diferença interfere diretamente na tensão. Em um jogo de ação rápido, repetir vários minutos antes de cada tentativa pode transformar desafio em irritação. Em um jogo de terror, porém, a distância entre pontos seguros pode aumentar a sensação de vulnerabilidade.",
          "Por isso, não existe uma posição universalmente perfeita para checkpoints. Tudo depende da experiência que o jogo quer construir."
        ]
      },
      {
        title: "O medo de perder progresso",
        paragraphs: [
          "Parte da tensão de jogos como survival horrors vem do receio de perder recursos, itens ou progresso.",
          "Se o jogador souber que pode morrer e retornar imediatamente, alguns perigos deixam de parecer tão ameaçadores.",
          "Por outro lado, fazer alguém repetir conteúdo demais também pode destruir o envolvimento. Em vez de pensar no inimigo ou na história, o jogador começa a pensar no tempo que está desperdiçando.",
          "O bom checkpoint equilibra duas sensações: o erro precisa ter alguma consequência, mas a consequência não pode tornar a experiência insuportável.",
          "Esse equilíbrio muda conforme o gênero, o público e o objetivo do jogo."
        ]
      },
      {
        title: "Checkpoints também ensinam",
        paragraphs: [
          "Reaparecer perto de um desafio permite que o jogador observe, teste e aprenda.",
          "Cada tentativa vira informação: qual ataque vem primeiro, onde existe uma abertura, que recurso deveria ser guardado, se existe outro caminho e se o problema foi habilidade ou estratégia.",
          "O checkpoint diminui o intervalo entre o erro e a nova tentativa. Isso ajuda o jogador a lembrar o que aconteceu e testar uma solução diferente.",
          "Por esse motivo, jogos difíceis não precisam necessariamente punir com longas repetições. Um desafio pode ser exigente e ainda respeitar o tempo do jogador."
        ]
      },
      {
        title: "O caminho até o chefe também pode ser parte do desafio",
        paragraphs: [
          "Isso não significa que todo checkpoint deva estar imediatamente antes do inimigo.",
          "Em alguns jogos, o percurso até o chefe faz parte da preparação psicológica. O jogador precisa atravessar perigos, administrar recursos e chegar à batalha em boas condições.",
          "Nesse caso, o caminho não é somente uma perda de tempo. Ele faz parte do teste.",
          "O problema aparece quando essa repetição não exige mais decisões. Se o jogador já dominou completamente o trajeto e só precisa correr por vários minutos antes de tentar novamente, o desafio pode virar burocracia."
        ]
      },
      {
        title: "Uma ferramenta invisível de direção",
        paragraphs: [
          "O jogador raramente para para elogiar um checkpoint bem colocado. Mesmo assim, ele sente seus efeitos durante toda a experiência.",
          "Checkpoints influenciam dificuldade, ritmo, experimentação, medo, frustração, exploração, uso de recursos e tempo de sessão.",
          "Eles funcionam como uma ferramenta invisível de direção. Definem quando o jogador pode respirar, quando deve se concentrar e quanto custa falhar.",
          "Salvar o jogo deixou de ser apenas uma função técnica. Tornou-se parte da linguagem do game design."
        ]
      },
      {
        title: "Conclusão",
        paragraphs: [
          "Um checkpoint é uma promessa silenciosa entre o jogo e o jogador.",
          "Ele determina quanto progresso está protegido, quanto risco existe e quanto esforço será necessário para tentar novamente.",
          "Quando funciona, quase ninguém percebe.",
          "Quando não funciona, todo mundo reclama.",
          "E talvez essa seja a melhor prova de sua importância."
        ]
      }
    ],
    sources: [
      {
        title: "Farlands - What Is Good Game Design?",
        publisher: "Game Developer",
        url: "https://www.gamedeveloper.com/design/farlands---what-is-good-game-design-"
      },
      {
        title: "Feedback in Games: How to Design Rewards and Punishments",
        publisher: "Game Developer",
        url: "https://www.gamedeveloper.com/game-platforms/feedback-in-games-how-to-design-rewards-and-punishments"
      },
      {
        title: "Majora's Mask and the Crisis of Failure",
        publisher: "Game Developer",
        url: "https://www.gamedeveloper.com/design/majora-s-mask-and-the-crisis-of-failure"
      },
      {
        title: "Level Design Pre-Production",
        publisher: "GDC Vault",
        url: "https://media.gdcvault.com/gdc10/slides/2_EdByrne_LevelDesigninaDay_Preproduction.pdf"
      }
    ]
  },
  {
    id: "indies",
    slug: "jogos-pequenos-ideias-gigantes",
    title: "Jogos pequenos, ideias gigantes",
    subtitle:
      "Um jogo não precisa de centenas de profissionais ou orçamento milionário para criar algo marcante. Muitas vezes, a limitação ajuda uma boa ideia a aparecer.",
    category: "Indies",
    excerpt:
      "Muitos indies vencem no foco: uma mecânica forte, apresentação clara e identidade que cola na memória.",
    coverImage: indiesCover,
    altText: "Arte com notebook, caderno, controle e protótipo de jogo independente.",
    author: "Reinhold Berner",
    publishedAt: "2026-06-08",
    readingTime: 6,
    mascotComment: "Às vezes, uma boa ideia vale mais que um prédio inteiro cheio de executivos.",
    relatedArticleIds: ["checkpoint", "bastidores"],
    sections: [
      {
        title: "Pequeno não significa simples",
        paragraphs: [
          "Quando alguém chama um jogo de indie, muita gente imagina automaticamente uma produção barata, curta ou visualmente simples.",
          "Mas orçamento e independência não são exatamente a mesma coisa.",
          "O termo indie vem de independent. Ele está relacionado à autonomia de quem produz e publica o projeto.",
          "Um jogo independente pode ser criado por uma pessoa, por uma equipe pequena ou até por um estúdio relativamente grande. O ponto principal é o nível de controle que os criadores mantêm sobre suas decisões.",
          "Isso inclui direção criativa, mecânicas, narrativa, visual, modelo comercial, forma de distribuição e relação com o público."
        ]
      },
      {
        title: "Limitações podem gerar identidade",
        paragraphs: [
          "Equipes pequenas normalmente não conseguem competir diretamente com grandes produções em quantidade de conteúdo, realismo gráfico ou campanhas milionárias.",
          "Por isso, precisam competir em foco.",
          "Em vez de tentar fazer tudo, muitos jogos independentes escolhem uma ideia central e constroem a experiência ao redor dela.",
          "Pode ser uma mecânica diferente, uma narrativa pessoal, uma direção artística marcante, uma combinação incomum de gêneros ou uma maneira nova de usar algo conhecido.",
          "Quando os recursos são limitados, cada escolha precisa justificar sua existência. Essa pressão pode gerar projetos com identidade muito clara."
        ]
      },
      {
        title: "O jogador não se apaixona pelo orçamento",
        paragraphs: [
          "Ninguém termina um jogo pensando apenas em quantas pessoas trabalharam nele.",
          "O que fica na memória geralmente é uma sensação: dominar uma mecânica, ouvir uma música no momento certo, encontrar uma história que conversa com uma experiência pessoal ou reconhecer um visual impossível de confundir.",
          "Grandes orçamentos podem ajudar a executar ideias ambiciosas, mas não substituem direção.",
          "Um jogo cheio de conteúdo ainda pode parecer vazio. Um jogo curto pode continuar na cabeça do jogador durante anos."
        ]
      },
      {
        title: "Foco é diferente de falta de ambição",
        paragraphs: [
          "Fazer menos coisas não significa pensar pequeno.",
          "Na verdade, alguns projetos independentes são extremamente ambiciosos. A diferença é que sua ambição está concentrada.",
          "Em vez de criar vinte sistemas razoáveis, o estúdio pode criar dois sistemas excelentes que se alimentam o tempo inteiro.",
          "Essa clareza ajuda o público a entender rapidamente a proposta.",
          "Uma proposta fácil de explicar não significa uma experiência superficial."
        ]
      },
      {
        title: "Independência também traz risco",
        paragraphs: [
          "Ter controle criativo não torna o desenvolvimento mais fácil.",
          "Equipes independentes enfrentam falta de dinheiro, pouco tempo, sobrecarga, dificuldade de divulgação, ausência de especialistas, dependência do sucesso de um único projeto e pressão das plataformas.",
          "A liberdade vem acompanhada de responsabilidade.",
          "Sem uma grande estrutura financeira por trás, uma decisão errada pode comprometer meses ou anos de trabalho.",
          "Por isso, romantizar o desenvolvimento independente também é perigoso. A ideia de uma pessoa criando um sucesso sozinha é inspiradora, mas pode esconder jornadas extremamente cansativas."
        ]
      },
      {
        title: "Distribuição mudou o cenário",
        paragraphs: [
          "Plataformas digitais permitiram que criadores publicassem projetos sem depender exclusivamente das antigas estruturas de distribuição.",
          "Serviços como itch.io foram construídos com foco em criadores independentes e oferecem mais controle sobre preço, página do projeto, atualizações e forma de distribuição.",
          "Isso não elimina o problema de visibilidade. Publicar se tornou mais acessível, mas ser encontrado continua difícil.",
          "Mesmo assim, essa abertura permitiu que experiências muito específicas encontrassem público.",
          "Projetos que talvez nunca recebessem aprovação em uma grande empresa agora podem existir, circular e formar comunidades."
        ]
      },
      {
        title: "A força está na clareza",
        paragraphs: [
          "O indie que se destaca não é necessariamente o mais bonito ou o maior.",
          "É aquele que sabe claramente o que quer ser, para quem está sendo feito, qual sensação deseja provocar, qual ideia merece receber mais atenção e o que pode ser removido sem prejudicar a experiência.",
          "Essa clareza é uma das maiores lições que os jogos independentes oferecem para todo o mercado.",
          "Não é preciso fazer tudo. É preciso fazer algo que tenha motivo para existir."
        ]
      },
      {
        title: "Conclusão",
        paragraphs: [
          "Jogos pequenos podem carregar ideias enormes porque não precisam impressionar apenas pela quantidade.",
          "Eles podem impressionar pela personalidade.",
          "Quando uma equipe entende suas limitações e as transforma em direção, o resultado pode ser uma experiência que nenhum orçamento conseguiria reproduzir automaticamente.",
          "No fim, independência não é um estilo gráfico. É a possibilidade de proteger uma ideia."
        ]
      }
    ],
    sources: [
      {
        title: "About itch.io",
        publisher: "itch.io",
        url: "https://itch.io/docs/general/about"
      },
      {
        title: "Understanding Video Games as Culture",
        publisher: "Game Developer",
        url: "https://www.gamedeveloper.com/game-platforms/book-excerpt-understanding-video-games-as-culture"
      },
      {
        title: "What Is Good Game Design?",
        publisher: "Game Developer",
        url: "https://www.gamedeveloper.com/design/farlands---what-is-good-game-design-"
      }
    ]
  },
  {
    id: "bastidores",
    slug: "o-segredo-esta-no-bastidor",
    title: "O segredo está no bastidor",
    subtitle:
      "Menus, sons, animações e respostas de botão parecem detalhes, mas são eles que fazem um jogo parecer agradável, claro e bem acabado.",
    category: "Bastidores",
    excerpt:
      "Menus, feedback de botão e microanimações também contam a história de um jogo.",
    coverImage: bastidoresCover,
    altText: "Arte com wireframes, botões, setas de feedback e painéis de interface gamer.",
    author: "Reinhold Berner",
    publishedAt: "2026-06-08",
    readingTime: 5,
    mascotComment: "Quando o botão não reage, eu clico mais forte. Não resolve, mas é tradição.",
    relatedArticleIds: ["checkpoint", "indies"],
    sections: [
      {
        title: "Jogar também é apertar botões fora da partida",
        paragraphs: [
          "Quando pensamos em game design, normalmente lembramos de combate, exploração, fases, chefes e narrativa.",
          "Mas uma parte enorme da experiência acontece em lugares menos chamativos: menus, inventários, mapas, seletores, telas de configuração, confirmações, avisos, barras de progresso e botões.",
          "Esses elementos parecem pequenos, mas estão sempre mediando a conversa entre o jogador e o jogo.",
          "Quando essa conversa funciona, tudo parece natural.",
          "Quando não funciona, até uma tarefa simples se torna irritante."
        ]
      },
      {
        title: "Toda ação precisa de resposta",
        paragraphs: [
          "Ao apertar um botão, o jogador espera alguma confirmação.",
          "Essa resposta pode aparecer como animação, mudança de cor, som, vibração, texto, brilho, movimento ou tela de confirmação.",
          "Essas pequenas respostas são chamadas frequentemente de microinterações.",
          "Elas mostram que o sistema recebeu o comando e ajudam a explicar o que aconteceu.",
          "Sem feedback, o jogador começa a ter dúvidas: eu realmente cliquei, o jogo travou, a ação foi aceita, preciso apertar novamente ou alguma coisa mudou?",
          "Uma interface bem projetada responde antes que essas perguntas apareçam."
        ]
      },
      {
        title: "O som também faz parte do botão",
        paragraphs: [
          "Um clique sonoro pode parecer insignificante, mas ele ajuda a construir sensação de peso e velocidade.",
          "Compare um menu silencioso, um menu com sons leves e coerentes e um menu com efeitos exagerados em cada movimento.",
          "O primeiro pode parecer sem vida. O terceiro pode se tornar cansativo.",
          "O desafio é criar um feedback que seja perceptível sem disputar atenção com o conteúdo.",
          "O mesmo vale para vibração, animação e efeitos visuais.",
          "A melhor resposta não é sempre a maior. É aquela que comunica o necessário no momento certo."
        ]
      },
      {
        title: "Interfaces também possuem personalidade",
        paragraphs: [
          "Menus não precisam existir separados da identidade do jogo.",
          "Um jogo de terror pode usar sons desconfortáveis, movimentos lentos, texturas desgastadas e transições secas.",
          "Um jogo de corrida pode usar linhas rápidas, animações direcionais, sons metálicos e informações organizadas como painel.",
          "Um RPG pode transformar seus menus em parte do universo.",
          "Quando interface e direção artística trabalham juntas, até configurar um equipamento ajuda a sustentar a atmosfera."
        ]
      },
      {
        title: "Clareza vem antes do espetáculo",
        paragraphs: [
          "Uma interface bonita que não pode ser entendida falha em sua principal função.",
          "O jogador precisa saber onde está, o que está selecionado, o que pode fazer, como voltar, qual ação foi concluída e qual problema aconteceu.",
          "E essa informação não deve depender apenas de cor.",
          "Existem jogadores com diferentes condições visuais, motoras, cognitivas e auditivas. Por isso, feedback importante deve combinar mais de um recurso quando possível.",
          "Acessibilidade não diminui a personalidade. Ela aumenta a quantidade de pessoas que consegue entender a experiência."
        ]
      },
      {
        title: "Microinteração não é enfeite",
        paragraphs: [
          "Uma boa animação possui função.",
          "Ela pode mostrar de onde um elemento veio, indicar para onde ele foi, confirmar uma escolha, alertar sobre um erro, explicar mudança de estado ou chamar atenção para algo importante.",
          "Quando tudo se move sem necessidade, o usuário deixa de saber o que realmente importa.",
          "Por isso, acabamento não significa adicionar efeitos em cada canto. Significa fazer cada reação ter intenção."
        ]
      },
      {
        title: "O trabalho que ninguém percebe",
        paragraphs: [
          "Boa parte do polimento de um jogo está justamente naquilo que o jogador não consegue apontar.",
          "Ele talvez não saiba explicar por que um menu parece melhor.",
          "Mas percebe a velocidade da transição, o tempo do som, o tamanho da área clicável, a clareza do foco, a resposta imediata e a consistência entre as telas.",
          "Esses detalhes constroem confiança.",
          "O jogo começa a parecer sólido porque sempre responde de uma maneira previsível."
        ]
      },
      {
        title: "Conclusão",
        paragraphs: [
          "Um bom botão não é apenas um retângulo com texto.",
          "Ele comunica ação, recebe o comando, responde ao jogador e confirma o resultado.",
          "Menus e microinterações fazem parte da experiência tanto quanto fases e personagens.",
          "O segredo pode estar no bastidor, mas o jogador sente seu efeito o tempo inteiro."
        ]
      }
    ],
    sources: [
      {
        title: "Microinteractions in User Experience",
        publisher: "Nielsen Norman Group",
        url: "https://www.nngroup.com/articles/microinteractions/"
      },
      {
        title: "Understanding Success Criterion 4.1.3: Status Messages",
        publisher: "W3C Web Accessibility Initiative",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html"
      },
      {
        title: "User Notification",
        publisher: "W3C Web Accessibility Initiative",
        url: "https://www.w3.org/WAI/tutorials/forms/notifications/"
      },
      {
        title: "Notifications and Feedback",
        publisher: "W3C Web Accessibility Initiative",
        url: "https://www.w3.org/WAI/perspective-videos/notifications/"
      }
    ]
  }
];

export function getArticleBySlug(slug: string | undefined) {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(article: Article) {
  return article.relatedArticleIds
    .map((id) => articles.find((candidate) => candidate.id === id))
    .filter((candidate): candidate is Article => Boolean(candidate));
}
