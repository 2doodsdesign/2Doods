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
