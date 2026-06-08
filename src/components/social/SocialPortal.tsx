import { motion } from "framer-motion";
import type { ComponentType } from "react";

interface SocialPortalProps {
  name: string;
  description: string;
  url: string;
  tone: string;
  icon: ComponentType<{ size?: number }>;
  onOpen: () => void;
}

export function SocialPortal({ name, description, url, tone, icon: Icon, onOpen }: SocialPortalProps) {
  return (
    <motion.a
      className={`portal portal--${tone}`}
      href={url}
      target="_blank"
      rel="noreferrer"
      onClick={onOpen}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon size={34} />
      <strong>{name}</strong>
      <span>{description}</span>
      <em>Entrar no portal</em>
    </motion.a>
  );
}
