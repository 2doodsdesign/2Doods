import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "../../config/siteConfig";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export function MascotDialogue() {
  const [dismissed, setDismissed] = useLocalStorage("2doods-dialogue-dismissed", false);
  const [index, setIndex] = useState(0);

  if (dismissed) return null;

  const message = siteConfig.dialogues[index];

  return (
    <AnimatePresence>
      <motion.aside
        className="dialogue"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        aria-live="polite"
      >
        <p>{message}</p>
        <div className="dialogue__actions">
          <button className="icon-button" type="button" aria-label="Fechar diálogo" onClick={() => setDismissed(true)}>
            <X size={18} />
          </button>
          <button
            className="icon-button"
            type="button"
            aria-label="Avançar diálogo"
            onClick={() => (index < siteConfig.dialogues.length - 1 ? setIndex(index + 1) : setDismissed(true))}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
