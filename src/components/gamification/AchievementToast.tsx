import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { useEffect } from "react";
import { achievements } from "../../data/achievements";

interface AchievementToastProps {
  id: string | null;
  onDone: () => void;
}

export function AchievementToast({ id, onDone }: AchievementToastProps) {
  const achievement = achievements.find((item) => item.id === id);

  useEffect(() => {
    if (!id) return;
    const timeout = window.setTimeout(onDone, 4200);
    return () => window.clearTimeout(timeout);
  }, [id, onDone]);

  return (
    <AnimatePresence>
      {achievement ? (
        <motion.div
          className="achievement-toast"
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 32 }}
          role="status"
        >
          <BadgeCheck size={24} />
          <div>
            <strong>{achievement.title}</strong>
            <span>{achievement.description}</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
