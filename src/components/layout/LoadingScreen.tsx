import { motion } from "framer-motion";
import logo from "../../assets/brand/logo-2doods.jpeg";
import { MascotAvatar } from "../mascot/MascotAvatar";

const messages = [
  "Carregando o Doodverse...",
  "Calibrando o controle...",
  "Verificando se o jogador salvou o progresso..."
];

export function LoadingScreen() {
  const message = messages[new Date().getSeconds() % messages.length];

  return (
    <motion.div className="loading-screen" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <img src={logo} alt="2Doods" />
      <MascotAvatar expression="talking" size="small" animated />
      <p>{message}</p>
      <div className="loading-bar">
        <motion.span initial={{ width: "8%" }} animate={{ width: "100%" }} transition={{ duration: 1.2, ease: "easeInOut" }} />
      </div>
    </motion.div>
  );
}
