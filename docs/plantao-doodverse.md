# Plantao Doodverse

Base MVP para noticias gamer com revisao humana e fluxo semi-automatico sem custo de IA.

Nesta versao, o site nao chama OpenAI API, nao usa `OPENAI_API_KEY`, nao instala SDK de IA e nao publica nada sozinho. O painel gera um prompt editorial pronto, o usuario cola esse prompt no ChatGPT ou outra IA externa, depois cola o JSON de volta no painel.

## Rotas

- Publica: `/plantao`
- Painel local oculto do menu: `/admin/news-drafts`

## Fluxo recomendado

1. Abra `/admin/news-drafts`.
2. Cadastre uma noticia manualmente ou cole um link e complete os campos.
3. Clique em `Criar pauta`.
4. Na pauta criada, clique em `Gerar prompt editorial` ou `Copiar prompt`.
5. Cole o prompt no ChatGPT.
6. Copie o JSON gerado pelo ChatGPT.
7. Cole o JSON em `Colar resposta do ChatGPT`.
8. Clique em `Salvar rascunho`.
9. Revise/edite os campos manualmente.
10. Clique em `Aprovar`.
11. Clique em `Exportar noticia aprovada`.
12. Copie o objeto TypeScript gerado.
13. Peça ao Codex para inserir esse objeto em `src/news/data/approvedDoodNews.ts`.
14. Rode build e publique a pasta `dist`.

Nada aparece publicamente como noticia definitiva sem aprovacao humana.

## Entrada de noticias

### Modo 1: noticia manual

No admin, preencha:

- titulo original
- fonte
- link
- data
- trecho/contexto bruto
- categoria
- tipo: confirmado, rumor, vazamento ou analise
- tags opcionais

Depois clique em `Criar pauta`.

### Modo 2: importacao simples por link

Cole o link no campo `Colar link da noticia` e clique em `Usar link`.

O painel tenta apenas preencher o link e sugerir a fonte pelo dominio. Ele nao faz scraping agressivo. Complete titulo, fonte, contexto e categoria manualmente.

### Modo 3: RSS opcional

A estrutura de RSS continua em `src/news/aggregator/` e a Function opcional continua em `netlify/functions/fetch-news.ts`.

O modo principal nao depende de RSS nem de Netlify Functions.

## Arquivos principais

```text
src/news/types.ts
src/news/newsSources.ts
src/news/data/approvedDoodNews.ts
src/news/data/demoDoodNews.ts
src/news/storage/useNewsDraftStore.ts
src/news/ai/generateManualEditorialPrompt.ts
src/news/ai/generateEditorialDraft.ts
src/news/aggregator/
src/pages/PlantaoPage.tsx
src/pages/AdminNewsDraftsPage.tsx
netlify/functions/fetch-news.ts
```

## Dados publicos

`src/news/data/approvedDoodNews.ts` e a fonte principal do modo estatico.

Se esse arquivo estiver vazio, `/plantao` pode mostrar dados de demonstracao de `demoDoodNews.ts`, mas com aviso claro de demo. Isso evita tratar mock como noticia real.

## LocalStorage

O admin usa LocalStorage para validar o fluxo local:

- criar pauta
- salvar resposta do ChatGPT
- editar campos
- aprovar/rejeitar
- gerar exportacao

Limite importante: LocalStorage nao e ideal para producao multi-dispositivo. Para publicar de verdade em site estatico, exporte a noticia aprovada e adicione ao arquivo `approvedDoodNews.ts` antes do build.

## Como usar o ChatGPT manualmente

Cada pauta possui `Gerar prompt editorial`.

O prompt pede:

- resumo curto
- por que importa
- opiniao da 2Doods
- hook para Short
- titulo para Short
- legenda TikTok
- legenda Instagram
- comentario fixado
- pergunta para comunidade
- saida em JSON valido

Se o JSON colado no painel estiver quebrado, o admin mostra:

`O texto colado nao parece um JSON valido. Confira se voce copiou desde a primeira chave ate a ultima chave.`

## Modo Estatico

Este modo existe para publicacao manual no Netlify por upload de `dist`.

1. Gere a noticia no admin.
2. Aprove.
3. Clique em `Exportar noticia aprovada`.
4. Copie o objeto gerado.
5. Adicione ao array em `src/news/data/approvedDoodNews.ts`.
6. Rode `npm run build`.
7. Suba a pasta `dist`.

## Pacote de conteudo

Cada pauta pode gerar/copiar:

- titulo para Short
- hook/roteiro
- legenda TikTok
- legenda Instagram
- comentario fixado
- pergunta para comunidade
- pacote completo

Formato do pacote completo:

```text
TITULO DO SHORT:

ROTEIRO/HOOK:

LEGENDA TIKTOK:

LEGENDA INSTAGRAM:

COMENTARIO FIXADO:

PERGUNTA PARA COMUNIDADE:

FONTE:
```

## Fontes

Fontes continuam configuraveis em `src/news/newsSources.ts`.

Para adicionar uma fonte:

1. Abra `src/news/newsSources.ts`.
2. Adicione um objeto seguindo `NewsSource`.
3. Defina `type` como `rss`, `api` ou `manual`.
4. Use `enabled: true` apenas para fonte confiavel.
5. Ajuste `priority` de 1 a 10.

## IA real futuramente

Nao ativar agora.

Quando for a hora, a IA real deve entrar apenas em backend/Function. Nunca chame IA direto do frontend publico.

Variaveis futuras possiveis:

- `DOOD_NEWS_ADMIN_SECRET`: proteger painel no futuro.
- `SUPABASE_URL`: persistencia real.
- `SUPABASE_SERVICE_ROLE_KEY`: salvar rascunhos no backend.
- `NEWS_FETCH_LIMIT`: limite por execucao de RSS.
- uma chave de IA server-side futura, somente quando o projeto decidir ativar custo de API.

## Scheduled Function opcional

`netlify.toml` agenda `fetch-news` para `09h`, `15h` e `21h` UTC:

```toml
[functions."fetch-news"]
  schedule = "0 9,15,21 * * *"
```

A Function atual pode gerar rascunhos mecanicos a partir de RSS, mas nao publica automaticamente.
