import { Link } from "react-router-dom";
import { MascotAvatar } from "../components/mascot/MascotAvatar";
import "../styles/variables.css";
import "../styles/animations.css";
import "../styles/global.css";

export function NotFound() {
  return (
    <main className="not-found">
      <MascotAvatar expression="neutral" size="large" floating />
      <div>
        <span>404</span>
        <h1>Esse mapa ainda não foi desbloqueado.</h1>
        <p>Parece que você entrou em uma fase secreta que ainda não existe.</p>
        <Link to="/">Voltar ao checkpoint</Link>
      </div>
    </main>
  );
}
