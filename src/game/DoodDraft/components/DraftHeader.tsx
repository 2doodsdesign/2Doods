import { Coins, RotateCcw } from "lucide-react";
import { gameConfig } from "../../data/gameConfig";

interface DraftHeaderProps {
  round: number;
  budget: number;
  rerollsLeft: number;
  onReroll: () => void;
  disabled: boolean;
}

export function DraftHeader({ round, budget, rerollsLeft, onReroll, disabled }: DraftHeaderProps) {
  return (
    <header className="draft-header">
      <div>
        <span>Rodada {Math.min(round, gameConfig.teamSize)} / {gameConfig.teamSize}</span>
        <h2>Escolha uma opção para o time</h2>
      </div>
      <div className="draft-header__stats">
        <strong><Coins size={18} /> Dood Coins: {budget} / {gameConfig.initialBudget}</strong>
        <button type="button" onClick={onReroll} disabled={disabled || rerollsLeft <= 0}>
          <RotateCcw size={17} />
          {rerollsLeft > 0 ? `Rerrolar opções - ${rerollsLeft} restantes` : "Sem rerolls restantes"}
        </button>
      </div>
    </header>
  );
}
