import { achievements } from "../../data/achievements";

interface AchievementPanelProps {
  unlocked: string[];
}

export function AchievementPanel({ unlocked }: AchievementPanelProps) {
  return (
    <section className="achievement-panel" aria-label="Conquistas">
      {achievements.map((achievement) => (
        <article className={unlocked.includes(achievement.id) ? "is-unlocked" : ""} key={achievement.id}>
          <strong>{achievement.title}</strong>
          <span>{achievement.description}</span>
        </article>
      ))}
    </section>
  );
}
