import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import type { Curiosity } from "../data/curiosities";

interface CuriosityCardProps {
  curiosity: Curiosity;
}

export function CuriosityCard({ curiosity }: CuriosityCardProps) {
  return (
    <motion.article className="curiosity-card" whileHover={{ y: -5 }}>
      <Link
        className="curiosity-card__link"
        to={`/artigos/${curiosity.slug}`}
        aria-label={`Ler artigo: ${curiosity.title}`}
      >
        <div className="curiosity-card__media">
          <img src={curiosity.image} alt={curiosity.altText} loading="lazy" />
        </div>
        <div className="curiosity-card__body">
          <div className="curiosity-card__meta">
            <span>{curiosity.category}</span>
            <span><FileText size={14} /> Artigo</span>
            <span>{curiosity.readingTime} min</span>
          </div>
          <h3>{curiosity.title}</h3>
          <p>{curiosity.summary}</p>
          <span className="article-button">
            Descobrir
            <ArrowRight size={17} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
