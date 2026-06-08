import { TYPE_COLORS, TYPE_LABELS } from "../../data/pokemonTypes";

interface TypeBadgeProps {
  type: string;
}

export function TypeBadge({ type }: TypeBadgeProps) {
  return (
    <span className="type-badge" style={{ borderColor: TYPE_COLORS[type], color: TYPE_COLORS[type] }}>
      {TYPE_LABELS[type] ?? type}
    </span>
  );
}
