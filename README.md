# 2Doods Doodverse

Site oficial da 2Doods, uma marca brasileira de entretenimento e conteúdo gamer criada por Reinhold Berner. O projeto funciona como um hub interativo com mascote, vídeos, redes sociais, curiosidades, conquistas e uma base expansível para minigames.

## Tecnologias

- React, Vite e TypeScript
- React Router
- Framer Motion
- Lucide React
- CSS com variáveis, responsividade e suporte a `prefers-reduced-motion`
- LocalStorage para progresso, conquistas, som, tema e diálogo inicial

## Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
```

No Windows, se o PowerShell bloquear `npm.ps1`, use:

```bash
npm.cmd install
npm.cmd run dev
```

## Estrutura

```text
src/
  assets/
    brand/logo-2doods.jpeg
    mascot/talking.png
    mascot/neutral.png
    mascot/laughing.png
    mascot/smiling.png
  components/
  config/siteConfig.ts
  data/
  game/data/creatures.ts
  hooks/
  pages/
  styles/
```

## Assets

A logo oficial enviada com o nome `423417174_2133144353691864_1765391500424636163_n_Nero_AI_Image_Upscaler_Reconstruct.jpeg` foi copiada para:

```text
src/assets/brand/logo-2doods.jpeg
```

As expressões do PNGTuber foram copiadas para `src/assets/mascot/` com nomes sem espaços para facilitar imports.

## Como editar conteúdo

- Links, textos principais, pontos e flags: `src/config/siteConfig.ts`
- Vídeos: `src/data/videos.ts`
- Curiosidades: `src/data/curiosities.ts`
- Conquistas: `src/data/achievements.ts`
- Missão semanal: `src/data/missions.ts`
- Navegação: `src/data/navigation.ts`
- Artigos completos: `src/data/articles.ts`
- Capas dos artigos: `src/assets/articles/`
- Logo profissional do criador: `src/assets/brand/reinhold-berner-logo.png`

## MVP incluído

- Tela de carregamento
- Hero com logo e mascote animado
- Diálogo inicial com persistência local
- Navegação responsiva
- Hub interativo
- Vitrine de vídeos em movimento
- Doodex de curiosidades
- Portais sociais
- Sistema básico de Dood Points
- Quatro conquistas
- Área Arcade em desenvolvimento
- Página geral de artigos em `/artigos`
- Páginas individuais de artigos em `/artigos/:slug`
- Compartilhamento de artigos
- Barra de progresso de leitura
- Seção Sobre
- Rodapé
- Página 404 personalizada
- SEO básico, favicon, robots e sitemap

## Próximas fases

- Minigame funcional de montagem de time
- Card compartilhável via Canvas
- Sons leves após interação
- Mais conquistas, missões diárias e easter eggs
- Conteúdos reais de vídeos e curiosidades
- Deploy em GitHub Pages, Netlify ou Vercel

## Deploy no Netlify

O projeto já inclui `netlify.toml` com:

- Comando de build: `npm run build`
- Pasta publicada: `dist`
- Redirecionamento de SPA para evitar erro 404 em rotas internas

Também existe `public/_redirects`, copiado para `dist/_redirects` durante o build, para garantir que rotas como `/artigos/checkpoints-mudaram-a-forma-de-jogar` funcionem ao recarregar a página.

## Como adicionar artigos

1. Abra `src/data/articles.ts`.
2. Adicione um novo objeto seguindo a interface `Article`.
3. Crie um `slug` curto e sem acentos.
4. Coloque a imagem de capa em `src/assets/articles/`.
5. Importe essa imagem no topo de `articles.ts`.
6. Adicione fontes em `sources`.

Os cards da Doodex são gerados automaticamente a partir de `articles.ts`, então não precisa duplicar o conteúdo em outro arquivo.

## Como trocar imagens

- Logo da 2Doods: `src/assets/brand/logo-2doods.jpeg`
- Logo de Reinhold Berner: `src/assets/brand/reinhold-berner-logo.png`
- Capas dos artigos: `src/assets/articles/`

## Áudio

As músicas ficam em:

```text
public/audio/music/doodverse-theme.mp3
public/audio/music/dooddraft-theme.mp3
```

O sistema global de áudio fica em:

```text
src/audio/
```

Preferências salvas no navegador:

- `2doods-music-enabled`
- `2doods-sfx-enabled`
- `2doods-music-volume`
- `2doods-sfx-volume`

O menu possui controles para ligar/desligar música, ligar/desligar efeitos e ajustar os volumes por slider. O volume padrão é 20% para música e 45% para efeitos.
