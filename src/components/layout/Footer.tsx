import logo from "../../assets/brand/logo-2doods.jpeg";
import { socialLinks } from "../../data/socialLinks";

export function Footer() {
  return (
    <footer className="footer">
      <img src={logo} alt="Logo da 2Doods" />
      <p>Feito por quem nunca aperta Start sem olhar os controles.</p>
      <div>
        {socialLinks.map((link) => (
          <a key={link.id} href={link.url} target="_blank" rel="noreferrer">
            {link.name}
          </a>
        ))}
      </div>
      <small>© {new Date().getFullYear()} 2Doods, criada por Reinhold Berner.</small>
    </footer>
  );
}
