import type { DraftCreature } from "../types";
import { CreatureCard } from "./CreatureCard";

interface ChoiceGridProps {
  options: DraftCreature[];
  budget: number;
  teamTypes: string[];
  onChoose: (creature: DraftCreature) => void;
}

export function ChoiceGrid({ options, budget, teamTypes, onChoose }: ChoiceGridProps) {
  return (
    <section className="choice-grid" aria-label="Opções da rodada">
      {options.map((creature) => (
        <CreatureCard
          key={creature.id}
          creature={creature}
          budget={budget}
          teamTypes={teamTypes}
          onChoose={onChoose}
        />
      ))}
    </section>
  );
}
