import { motion, useReducedMotion } from "framer-motion";
import laughing from "../../assets/mascot/laughing.png";
import neutral from "../../assets/mascot/neutral.png";
import smiling from "../../assets/mascot/smiling.png";
import talking from "../../assets/mascot/talking.png";

export type MascotExpression = "talking" | "neutral" | "laughing" | "smiling";

interface MascotAvatarProps {
  expression: MascotExpression;
  size?: "small" | "medium" | "large";
  animated?: boolean;
  floating?: boolean;
}

const expressionMap: Record<MascotExpression, string> = {
  talking,
  neutral,
  laughing,
  smiling
};

export function MascotAvatar({ expression, size = "medium", animated = false, floating = false }: MascotAvatarProps) {
  const reducedMotion = useReducedMotion();
  const animate = !reducedMotion && (animated || floating);

  return (
    <motion.img
      className={`mascot mascot--${size}`}
      src={expressionMap[expression]}
      alt="Mascote chibi da 2Doods"
      loading={size === "large" ? "eager" : "lazy"}
      animate={animate ? { y: floating ? [0, -6, 0] : 0, rotate: animated ? [0, 1.5, -1, 0] : 0 } : undefined}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
