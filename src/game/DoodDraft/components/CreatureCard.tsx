import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import type { DraftCreature } from "../types";
import { TypeBadge } from "./TypeBadge";

interface CreatureCardProps {
  creature: DraftCreature;
  budget: number;
  teamTypes: string[];
  onChoose: (creature: DraftCreature) => void;
}

export function CreatureCard({ creature, budget, teamTypes, onChoose }: CreatureCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const disabled = creature.cost > budget;
  const newTypes = creature.types.filter((type) => !teamTypes.includes(type)).length;

  return (
    <article className={disabled ? "creature-card is-disabled" : "creature-card"}>
      <div className="creature-card__image">
        <img src={creature.image} alt={creature.displayName} loading="lazy" />
      </div>
      <div className="creature-card__content">
        <div className="creature-card__topline">
          <span>Gen {creature.generation}</span>
          <strong>{creature.cost} moedas</strong>
        </div>
        <h3>{creature.displayName}</h3>
        <div className="type-row">{creature.types.map((type) => <TypeBadge key={type} type={type} />)}</div>
        <dl className="creature-card__summary">
          <div><dt>BST</dt><dd>{creature.baseStatTotal}</dd></div>
          <div><dt>Função</dt><dd>{creature.role}</dd></div>
          <div><dt>Sinergia</dt><dd>{newTypes > 0 ? `+${newTypes} tipo` : "Reforço"}</dd></div>
          <div><dt>Raridade</dt><dd>{creature.rarity}</dd></div>
        </dl>
        <button className="details-toggle" type="button" onClick={() => setDetailsOpen(!detailsOpen)}>
          <ChevronDown size={16} />
          Ver detalhes
        </button>
        {detailsOpen ? (
          <div className="creature-stats">
            <span>HP {creature.stats.hp}</span>
            <span>Atk {creature.stats.attack}</span>
            <span>Def {creature.stats.defense}</span>
            <span>SpA {creature.stats.specialAttack}</span>
            <span>SpD {creature.stats.specialDefense}</span>
            <span>Spe {creature.stats.speed}</span>
          </div>
        ) : null}
        <button className="choose-button" type="button" disabled={disabled} onClick={() => onChoose(creature)}>
          <Plus size={17} />
          {disabled ? "Sem orçamento" : "Escolher"}
        </button>
      </div>
    </article>
  );
}
