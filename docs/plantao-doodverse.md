# Plantao Doodverse

Base MVP para uma secao de noticias gamer com personalidade da 2Doods e revisao humana antes da publicacao.

## Rotas

- Publica: `/plantao`
- Painel local oculto do menu: `/admin/news-drafts`

## Regras do MVP

- Apenas noticias com `status: "approved"` aparecem em `/plantao`.
- Rascunhos `draft` e `rejected` ficam invisiveis no site publico.
- O painel usa LocalStorage para aprovar, rejeitar e editar localmente.
- Os dados atuais em `src/news/data/mockDoodNews.ts` sao mocks de demonstracao, marcados com `isMock`.
- A Function `netlify/functions/fetch-news.ts` gera rascunhos, mas nao publica automaticamente.
- Links originais devem continuar visiveis em toda noticia publicada.

## Arquivos principais

```text
src/news/types.ts
src/news/newsSources.ts
src/news/data/mockDoodNews.ts
src/news/storage/useNewsDraftStore.ts
src/news/aggregator/
src/news/ai/generateEditorialDraft.ts
src/pages/PlantaoPage.tsx
src/pages/AdminNewsDraftsPage.tsx
netlify/functions/fetch-news.ts
```

## Como adicionar novas fontes

1. Abra `src/news/newsSources.ts`.
2. Adicione um objeto seguindo `NewsSource`.
3. Defina `type` como `rss`, `api` ou `manual`.
4. Use `enabled: true` somente para fontes confiaveis.
5. Ajuste `priority` de 1 a 10. Fontes oficiais podem ter prioridade maior.

Exemplo:

```ts
{
  id: "nova-fonte",
  name: "Nova Fonte",
  url: "https://exemplo.com/feed.xml",
  type: "rss",
  language: "en",
  priority: 7,
  enabled: true,
  defaultCategory: "Geral"
}
```

## Como ativar IA real futuramente

O frontend nao deve chamar IA diretamente. A troca deve acontecer em uma Function ou backend.

1. Substituir a implementacao fake de `src/news/ai/generateEditorialDraft.ts` por chamada server-side.
2. Manter o prompt editorial do briefing como base.
3. Validar JSON antes de salvar.
4. Salvar rascunhos como `draft`, nunca como `approved`.
5. Exigir aprovacao manual no painel.

Variaveis de ambiente recomendadas no Netlify:

- `OPENAI_API_KEY`: chave da IA, apenas em Function/backend.
- `DOOD_NEWS_ADMIN_SECRET`: segredo futuro para proteger o painel.
- `SUPABASE_URL`: URL do banco quando sair do LocalStorage.
- `SUPABASE_SERVICE_ROLE_KEY`: chave server-side para salvar rascunhos.
- `NEWS_FETCH_LIMIT`: limite opcional de rascunhos por execucao.

## Scheduled Function

`netlify.toml` agenda `fetch-news` para `09h`, `15h` e `21h` UTC:

```toml
[functions."fetch-news"]
  schedule = "0 9,15,21 * * *"
```

Segundo a documentacao da Netlify, scheduled functions usam cron em UTC e podem declarar o cron via codigo JS/TS ou `netlify.toml`.

A primeira versao grava um JSON temporario em `/tmp/dood-news-drafts.json` e registra logs. Para producao, trocar por Supabase ou Netlify Blobs.
