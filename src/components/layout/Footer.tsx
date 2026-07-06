import { ArrowUp } from "lucide-react";
import logo from "../../assets/brand/logo-2doods.jpeg";
import reinholdLogo from "../../assets/brand/reinhold-berner-logo.png";
import { siteConfig } from "../../config/siteConfig";
import { navigation } from "../../data/navigation";
import { socialLinks } from "../../data/socialLinks";

export function Footer() {
  function backToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const creatorBlock = (
    <>
      <img src={reinholdLogo} alt="Logo de Reinhold Berner" loading="lazy" />
      <div>
        <span>Design e desenvolvimento por</span>
        <strong>{siteConfig.creator.name}</strong>
        <p>{siteConfig.creator.role}</p>
      </div>
    </>
  );

  return (
    <footer className="footer">
      <div className="footer__brand">
        <img src={logo} alt="Logo da 2Doods" />
        <p>Feito por quem nunca aperta Start sem olhar os controles.</p>
      </div>

      <nav className="footer__nav" aria-label="Navegação do rodapé">
        {navigation.map((item) => (
          <a key={item.id} href={"href" in item && item.href ? item.href : item.id === "inicio" ? "/#inicio" : `/#${item.id}`}>
            {item.label}
          </a>
        ))}
        <a href="/artigos">Doodex</a>
      </nav>

      <div className="footer__social">
        {socialLinks.map((link) => (
          <a key={link.id} href={link.url} target="_blank" rel="noreferrer">
            {link.name}
          </a>
        ))}
      </div>

      {siteConfig.creator.portfolioUrl ? (
        <a className="footer__creator" href={siteConfig.creator.portfolioUrl} target="_blank" rel="noreferrer">
          {creatorBlock}
        </a>
      ) : (
        <div className="footer__creator">{creatorBlock}</div>
      )}

      <div className="footer__bottom">
        <small>© {new Date().getFullYear()} 2Doods, criada e desenvolvida por Reinhold Berner.</small>
        <button type="button" onClick={backToTop}>
          <ArrowUp size={17} />
          Voltar ao topo
        </button>
      </div>
    </footer>
  );
}
