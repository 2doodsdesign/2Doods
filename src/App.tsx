import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ExternalLink, Gamepad2, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "./assets/brand/logo-2doods.jpeg";
import { CuriosityCard } from "./components/CuriosityCard";
import { DailyMission } from "./components/DailyMission";
import { AchievementPanel } from "./components/gamification/AchievementPanel";
import { AchievementToast } from "./components/gamification/AchievementToast";
import { Footer } from "./components/layout/Footer";
import { LoadingScreen } from "./components/layout/LoadingScreen";
import { MascotAvatar } from "./components/mascot/MascotAvatar";
import { MascotDialogue } from "./components/mascot/MascotDialogue";
import { InteractiveHub } from "./components/InteractiveHub";
import { Navbar } from "./components/navigation/Navbar";
import { SocialPortal } from "./components/social/SocialPortal";
import { Modal } from "./components/ui/Modal";
import { SectionTitle } from "./components/ui/SectionTitle";
import { VideoCarousel } from "./components/videos/VideoCarousel";
import { siteConfig } from "./config/siteConfig";
import { curiosities } from "./data/curiosities";
import { socialLinks } from "./data/socialLinks";
import { VideoItem, videos } from "./data/videos";
import { useAchievements } from "./hooks/useAchievements";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [soundOn, setSoundOn] = useLocalStorage("2doods-sound", siteConfig.soundEnabledByDefault);
  const [theme, setTheme] = useLocalStorage<"default" | "red" | "blue">("2doods-theme", "default");
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [logoClicks, setLogoClicks] = useState(0);
  const achievements = useAchievements();

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoaded(true), 1200);
    achievements.unlock("first-checkpoint");
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("main section[id]")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            achievements.visitSection(entry.target.id, siteConfig.points.visitSection);
          }
        });
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: 0.1 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [loaded]);

  function navigateTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleLogoClick() {
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next >= 5) {
      achievements.unlock("hidden-input");
      setTheme(theme === "red" ? "blue" : theme === "blue" ? "default" : "red");
      setLogoClicks(0);
    }
  }

  function openSocial(id: string) {
    achievements.openSocial(id, siteConfig.points.openSocial);
  }

  return (
    <>
      <AnimatePresence>{!loaded ? <LoadingScreen /> : null}</AnimatePresence>
      <Navbar
        activeSection={activeSection}
        points={achievements.progress.points}
        level={achievements.level.name}
        soundOn={soundOn}
        onSoundToggle={() => setSoundOn(!soundOn)}
        onNavigate={navigateTo}
        onLogoClick={handleLogoClick}
      />

      <main>
        <section className="hero section-band" id="inicio">
          <div className="hero__copy">
            <img className="hero__logo" src={logo} alt="Logo oficial da 2Doods" />
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
              {siteConfig.headline}
            </motion.h1>
            <p>{siteConfig.description}</p>
            <div className="hero__actions">
              <button type="button" onClick={() => navigateTo("hub")}>
                <ArrowDown size={18} />
                Entrar no Doodverse
              </button>
              <a href={siteConfig.social.youtube} target="_blank" rel="noreferrer" onClick={() => openSocial("youtube")}>
                <ExternalLink size={18} />
                Assistir no YouTube
              </a>
            </div>
          </div>
          <div className="hero__mascot">
            <MascotAvatar expression="talking" size="large" animated floating />
            <MascotDialogue />
          </div>
        </section>

        <section className="section-band hub-section" id="hub">
          <SectionTitle eyebrow="Hub interativo" title="Escolha uma área do quartel-general">
            Portais e objetos clicáveis levam para vídeos, redes, conquistas e a base do futuro arcade.
          </SectionTitle>
          <InteractiveHub onNavigate={navigateTo} onExternal={openSocial} />
        </section>

        <section className="section-band" id="videos">
          <SectionTitle eyebrow="Últimos Respawns" title="Conteúdo em destaque">
            Cards configuráveis para vídeos atuais e futuros da 2Doods.
          </SectionTitle>
          <VideoCarousel
            videos={videos}
            onOpen={(video) => {
              achievements.addPoints(siteConfig.points.openVideo);
              setSelectedVideo(video);
            }}
          />
        </section>

        <section className="section-band" id="curiosidades">
          <SectionTitle eyebrow="Doodex" title="Curiosidades de bolso">
            Textos rápidos para transformar detalhes de jogos em conversa boa.
          </SectionTitle>
          <div className="card-grid">
            {curiosities.map((curiosity) => (
              <CuriosityCard
                key={curiosity.id}
                curiosity={curiosity}
                onRead={(id) => achievements.readCuriosity(id, siteConfig.points.curiosity)}
              />
            ))}
          </div>
        </section>

        <section className="section-band arcade" id="arcade">
          <SectionTitle eyebrow="2Doods Arcade" title="Monte Seu Time Definitivo">
            A base do minigame já está preparada para criaturas originais e modos temáticos configuráveis.
          </SectionTitle>
          <div className="arcade__panel">
            <MascotAvatar expression="laughing" size="medium" floating />
            <div>
              <Gamepad2 size={32} />
              <h3>Em desenvolvimento</h3>
              <p>Escolhas rápidas, sinergia, nota final e card compartilhável entram na próxima fase.</p>
              <button type="button" onClick={() => achievements.addPoints(30)}>Testar protótipo visual</button>
            </div>
          </div>
        </section>

        <section className="section-band mission-zone" id="missoes">
          <DailyMission />
          <AchievementPanel unlocked={achievements.progress.unlocked} />
        </section>

        <section className="section-band social-zone" id="redes">
          <SectionTitle eyebrow="Portais" title="Escolha seu próximo portal">
            Cada rede abre em uma nova aba e também conta progresso no Doodverse.
          </SectionTitle>
          <div className="portal-grid">
            {socialLinks.map((link) => (
              <SocialPortal key={link.id} {...link} onOpen={() => openSocial(link.id)} />
            ))}
          </div>
        </section>

        <section className="section-band about" id="sobre">
          <SectionTitle eyebrow="Sobre" title="Um projeto construído por amor aos jogos.">
            A 2Doods nasceu como um espaço para conversar sobre jogos com humor, curiosidade e profundidade.
          </SectionTitle>
          <div className="about__content">
            <MascotAvatar expression="smiling" size="medium" floating />
            <div>
              <p>
                Hoje, o projeto entra em uma nova fase conduzida por Reinhold Berner, reunindo conteúdo, UX,
                frontend, game design e experiências digitais em um pequeno universo gamer.
              </p>
              <ul>
                <li><ShieldCheck size={18} /> Criatividade com personalidade</li>
                <li><ShieldCheck size={18} /> Curiosidade sem enrolação</li>
                <li><ShieldCheck size={18} /> Comunidade em primeiro lugar</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AchievementToast id={achievements.toastId} onDone={achievements.clearToast} />
      <Modal open={Boolean(selectedVideo)} title={selectedVideo?.title ?? "Vídeo"} onClose={() => setSelectedVideo(null)}>
        <div className="video-modal">
          <img src={selectedVideo?.thumbnail} alt="" />
          <p>{selectedVideo?.description}</p>
          <a href={siteConfig.social.youtube} target="_blank" rel="noreferrer" onClick={() => openSocial("youtube")}>
            Abrir canal da 2Doods
          </a>
        </div>
      </Modal>
    </>
  );
}
