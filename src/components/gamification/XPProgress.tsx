import { Trophy } from "lucide-react";

interface XPProgressProps {
  points: number;
  level: string;
}

export function XPProgress({ points, level }: XPProgressProps) {
  const next = Math.ceil((points + 1) / 500) * 500;
  const percentage = Math.min(100, Math.round((points / next) * 100));

  return (
    <div className="xp" aria-label={`Nível ${level}, ${points} pontos`}>
      <Trophy size={18} />
      <div>
        <strong>{level}</strong>
        <span>{points} / {next} XP</span>
      </div>
      <i style={{ width: `${percentage}%` }} />
    </div>
  );
}
