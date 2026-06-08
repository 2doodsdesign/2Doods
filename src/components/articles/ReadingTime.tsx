import { Clock3 } from "lucide-react";

interface ReadingTimeProps {
  minutes: number;
}

export function ReadingTime({ minutes }: ReadingTimeProps) {
  return (
    <span className="reading-time">
      <Clock3 size={16} />
      {minutes} min de leitura
    </span>
  );
}
