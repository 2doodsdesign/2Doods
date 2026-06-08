import { Download, RotateCcw, Share2, Youtube } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "../../../config/siteConfig";
import { createResultCard } from "../logic/shareCard";
import type { DraftResult } from "../types";
import { TeamSlots } from "./TeamSlots";
import { TypeBadge } from "./TypeBadge";

interface ResultScreenProps {
  result: DraftResult;
  shareUrl: string;
  onRestart: () => void;
  onShared: () => void;
}

export function ResultScreen({ result, shareUrl, onRestart, onShared }: ResultScreenProps) {
  const [message, setMessage] = useState("");

  async function downloadCard() {
    const dataUrl = await createResultCard(result);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `dooddraft-${result.score}.png`;
    link.click();
    setMessage("Card baixado.");
  }

  async function shareResult() {
    const absoluteUrl = new URL(shareUrl, window.location.origin).href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Meu DoodDraft deu ${result.score}`,
          text: `Meu time recebeu ${result.score} pontos: ${result.title}`,
          url: absoluteUrl
        });
      } else {
        await navigator.clipboard.writeText(absoluteUrl);
      }
      onShared();
      setMessage("Resultado pronto para compartilhar.");
    } catch {
      await navigator.clipboard.writeText(absoluteUrl);
      setMessage("Não deu para abrir o compartilhamento, mas o link foi copiado.");
    }
  }

  return (
    <section className="result-screen">
      <div className="result-hero">
        <span>Resultado</span>
        <strong>{result.score}</strong>
        <h2>{result.title}</h2>
        <p>{result.mascotComment}</p>
      </div>

      <TeamSlots team={result.team} />

      <div className="result-grid">
        <article>
          <h3>Qualidades</h3>
          <ul>{result.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article>
          <h3>Pontos de atenção</h3>
          <ul>{result.problems.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article>
          <h3>Cobertura</h3>
          <div className="type-row">{result.analysis.uniqueTypes.map((type) => <TypeBadge key={type} type={type} />)}</div>
        </article>
        <article>
          <h3>Orçamento</h3>
          <p>{result.budgetSpent} de 100 Dood Coins usadas.</p>
        </article>
      </div>

      <div className="score-breakdown">
        {Object.entries(result.breakdown).map(([key, value]) => (
          <div key={key}>
            <span>{key}</span>
            <strong>{value}</strong>
            <i style={{ width: `${value}%` }} />
          </div>
        ))}
      </div>

      <div className="result-actions">
        <button type="button" onClick={shareResult}><Share2 size={17} /> Compartilhar resultado</button>
        <button type="button" onClick={downloadCard}><Download size={17} /> Baixar meu time</button>
        <button type="button" onClick={onRestart}><RotateCcw size={17} /> Jogar novamente</button>
        <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer"><Youtube size={17} /> Seguir a 2Doods</a>
      </div>
      <p aria-live="polite">{message}</p>
    </section>
  );
}
