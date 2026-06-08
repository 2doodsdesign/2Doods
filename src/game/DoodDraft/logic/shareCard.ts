import logoUrl from "../../../assets/brand/logo-2doods.jpeg";
import type { DraftResult } from "../types";

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

export async function createResultCard(result: DraftResult) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");

  const gradient = ctx.createLinearGradient(0, 0, 1080, 1350);
  gradient.addColorStop(0, "#090b10");
  gradient.addColorStop(0.5, "#111722");
  gradient.addColorStop(1, "#08142a");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1080, 1350);

  ctx.fillStyle = "rgba(239,35,60,.22)";
  ctx.fillRect(0, 0, 540, 16);
  ctx.fillStyle = "rgba(41,121,255,.42)";
  ctx.fillRect(540, 0, 540, 16);

  try {
    const logo = await loadImage(logoUrl);
    ctx.drawImage(logo, 70, 70, 150, 150);
  } catch {
    ctx.fillStyle = "#f7f8fa";
    ctx.fillText("2Doods", 70, 120);
  }

  ctx.fillStyle = "#f7f8fa";
  ctx.font = "800 58px Arial";
  ctx.fillText("DoodDraft", 250, 115);
  ctx.font = "600 30px Arial";
  ctx.fillStyle = "#a7b0be";
  ctx.fillText("Monte Seu Time Definitivo", 250, 162);

  ctx.font = "900 150px Arial";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(String(result.score), 70, 360);
  ctx.font = "800 46px Arial";
  ctx.fillStyle = "#2979ff";
  ctx.fillText(result.title, 70, 420);

  ctx.font = "600 30px Arial";
  ctx.fillStyle = "#f7f8fa";
  ctx.fillText("Equipe escolhida", 70, 520);

  result.team.forEach((creature, index) => {
    const x = 70 + (index % 2) * 480;
    const y = 580 + Math.floor(index / 2) * 150;
    ctx.fillStyle = "rgba(255,255,255,.08)";
    ctx.roundRect(x, y, 430, 112, 14);
    ctx.fill();
    ctx.fillStyle = "#f7f8fa";
    ctx.font = "800 30px Arial";
    ctx.fillText(creature.displayName, x + 24, y + 44);
    ctx.fillStyle = "#a7b0be";
    ctx.font = "600 22px Arial";
    ctx.fillText(`${creature.types.join(" / ")} • ${creature.cost} moedas`, x + 24, y + 78);
  });

  ctx.fillStyle = "#f7f8fa";
  ctx.font = "600 30px Arial";
  ctx.fillText(result.mascotComment, 70, 1120, 940);
  ctx.fillStyle = "#a7b0be";
  ctx.font = "500 23px Arial";
  ctx.fillText("Projeto não oficial criado por fãs. Pokémon pertence aos respectivos proprietários.", 70, 1250);
  ctx.fillText("2doods.netlify.app", 70, 1290);

  return canvas.toDataURL("image/png");
}
