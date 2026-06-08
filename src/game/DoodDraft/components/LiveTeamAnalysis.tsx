import { Shield, Swords, Wind } from "lucide-react";
import type { TeamAnalysis } from "../types";
import { TypeBadge } from "./TypeBadge";

interface LiveTeamAnalysisProps {
  analysis: TeamAnalysis;
}

export function LiveTeamAnalysis({ analysis }: LiveTeamAnalysisProps) {
  return (
    <aside className="live-analysis" aria-live="polite">
      <header>
        <span>Análise em tempo real</span>
        <strong>{analysis.uniqueTypes.length} tipos diferentes</strong>
      </header>
      <div className="analysis-metrics">
        <span><Swords size={16} /> Ataque {analysis.offensivePower}</span>
        <span><Shield size={16} /> Defesa {analysis.defensivePower}</span>
        <span><Wind size={16} /> Velocidade {analysis.averageSpeed}</span>
      </div>
      <div className="type-row">
        {analysis.uniqueTypes.slice(0, 12).map((type) => <TypeBadge key={type} type={type} />)}
      </div>
      <ul>
        {analysis.messages.map((message) => <li key={message}>{message}</li>)}
      </ul>
      {analysis.weaknesses.length ? (
        <p>Fraquezas no radar: {analysis.weaknesses.slice(0, 3).map((weakness) => `${weakness.type} x${weakness.count}`).join(", ")}</p>
      ) : null}
    </aside>
  );
}
