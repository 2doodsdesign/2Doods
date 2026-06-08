import { MascotAvatar } from "../../../components/mascot/MascotAvatar";

interface MascotCoachProps {
  message: string;
  mood?: "talking" | "neutral" | "laughing" | "smiling";
}

export function MascotCoach({ message, mood = "talking" }: MascotCoachProps) {
  return (
    <aside className="mascot-coach">
      <MascotAvatar expression={mood} size="small" floating />
      <p>{message}</p>
    </aside>
  );
}
