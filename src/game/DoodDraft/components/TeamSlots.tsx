import { gameConfig } from "../../data/gameConfig";
import type { DraftCreature } from "../types";
import { TypeBadge } from "./TypeBadge";

interface TeamSlotsProps {
  team: DraftCreature[];
}

export function TeamSlots({ team }: TeamSlotsProps) {
  return (
    <section className="team-slots" aria-label="Equipe escolhida">
      {Array.from({ length: gameConfig.teamSize }).map((_, index) => {
        const creature = team[index];
        return (
          <article className={creature ? "team-slot is-filled" : "team-slot"} key={index}>
            <span>#{index + 1}</span>
            {creature ? (
              <>
                <img src={creature.image} alt="" loading="lazy" />
                <strong>{creature.displayName}</strong>
                <div>{creature.types.map((type) => <TypeBadge key={type} type={type} />)}</div>
                <small>{creature.role} • {creature.cost} moedas</small>
              </>
            ) : (
              <>
                <i />
                <strong>Slot livre</strong>
                <small>Cápsula aguardando escolha</small>
              </>
            )}
          </article>
        );
      })}
    </section>
  );
}
