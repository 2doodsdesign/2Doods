import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { Curiosity } from "../data/curiosities";

interface CuriosityCardProps {
  curiosity: Curiosity;
  onRead: (id: string) => void;
}

export function CuriosityCard({ curiosity, onRead }: CuriosityCardProps) {
  return (
    <motion.article className="curiosity-card" whileHover={{ y: -5 }}>
      <img src={curiosity.image} alt="" loading="lazy" />
      <div>
        <span>{curiosity.category}</span>
        <h3>{curiosity.title}</h3>
        <p>{curiosity.summary}</p>
        <button type="button" onClick={() => onRead(curiosity.id)}>
          <Sparkles size={17} />
          Descobrir
        </button>
      </div>
    </motion.article>
  );
}
