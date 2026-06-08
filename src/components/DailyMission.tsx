import { Flag } from "lucide-react";
import { weeklyMission } from "../data/missions";

export function DailyMission() {
  return (
    <section className="mission">
      <Flag size={24} />
      <div>
        <span>{weeklyMission.title}</span>
        <strong>{weeklyMission.task}</strong>
      </div>
      <em>+{weeklyMission.reward} XP</em>
    </section>
  );
}
