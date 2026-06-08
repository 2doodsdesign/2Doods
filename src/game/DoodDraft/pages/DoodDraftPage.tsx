import { CalendarDays, Gamepad2, Lock, Play, ShieldAlert } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAudio } from "../../../audio/useAudio";
import { PageChrome } from "../../../components/layout/PageChrome";
import { MascotAvatar } from "../../../components/mascot/MascotAvatar";
import { Seo } from "../../../components/Seo";
import { useAchievements } from "../../../hooks/useAchievements";
import { doodDraftRewards, gameConfig } from "../../data/gameConfig";
import { ChoiceGrid } from "../components/ChoiceGrid";
import { DraftHeader } from "../components/DraftHeader";
import { LiveTeamAnalysis } from "../components/LiveTeamAnalysis";
import { MascotCoach } from "../components/MascotCoach";
import { ResultScreen } from "../components/ResultScreen";
import { TeamSlots } from "../components/TeamSlots";
import { useDraftGame } from "../hooks/useDraftGame";
import { todaySeed } from "../logic/random";

function parseSharedTeam(search: string) {
  const params = new URLSearchParams(search);
  return (params.get("team") ?? "")
    .split(",")
    .map((id) => Number(id))
    .filter((id) => Number.isInteger(id) && id > 0);
}

export function DoodDraftPage() {
  const game = useDraftGame();
  const audio = useAudio();
  const achievements = useAchievements();
  const location = useLocation();
  const teamTypes = game.state.team.flatMap((creature) => creature.types);

  useEffect(() => {
    audio.changeTrack("dooddraft-theme");
    return () => audio.changeTrack("doodverse-theme");
  }, []);

  useEffect(() => {
    const ids = parseSharedTeam(location.search);
    if (ids.length) game.loadSharedTeam(ids);
  }, [location.search]);

  useEffect(() => {
    if (game.state.status === "result") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [game.state.status]);

  useEffect(() => {
    const result = game.state.result;
    if (!result) return;

    achievements.rewardGameAction("dooddraft-first-complete", doodDraftRewards.firstComplete, ["first-draft"]);
    if (game.state.mode === "daily") {
      achievements.rewardGameAction(`dooddraft-daily-${todaySeed()}`, doodDraftRewards.dailyComplete);
    }
    if (result.score >= 75) {
      achievements.rewardGameAction("dooddraft-score-75", doodDraftRewards.score75, ["balanced-team"]);
    }
    if (result.score >= 85) {
      achievements.rewardGameAction("dooddraft-score-85", 0, ["champion-level"]);
    }
    if (result.score >= 90) {
      achievements.rewardGameAction("dooddraft-score-90", doodDraftRewards.score90);
    }
    if (result.score >= 95) {
      achievements.rewardGameAction("dooddraft-score-95", 0, ["doodverse-master-draft"]);
    }
    if (result.score >= 75 && result.budgetSpent <= 85) {
      achievements.rewardGameAction("dooddraft-economic", 0, ["economic-draft"]);
    }
    if (result.analysis.uniqueTypes.length >= 10) {
      achievements.rewardGameAction("dooddraft-type-collector", 0, ["type-collector"]);
    }
    if (game.state.rerollsUsed === 0) {
      achievements.rewardGameAction("dooddraft-no-reroll", 0, ["no-reroll"]);
    }
  }, [game.state.result?.score]);

  function start(mode: "classic" | "daily") {
    audio.enableMusic();
    game.startGame(mode);
  }

  return (
    <PageChrome activeSection="arcade" achievementsOverride={achievements}>
      <Seo
        title="DoodDraft | Monte Seu Time Definitivo - 2Doods"
        description="Monte uma equipe com seis Pokémon, equilibre tipos, administre seu orçamento e descubra sua classificação no DoodDraft da 2Doods."
        canonicalPath="/arcade/dooddraft"
      />

      <main className="dooddraft-page">
        {game.state.status === "intro" ? (
          <section className="dooddraft-intro section-band">
            <div>
              <div className="dooddraft-intro__copy">
                <span className="article-kicker">2Doods Arcade</span>
                <h1>
                  <span>DoodDraft:</span>
                  <span>Monte Seu Time</span>
                  <span>Definitivo</span>
                </h1>
                <p>
                  Escolha com inteligência, equilibre tipos, administre 100 Dood Coins e descubra se seu time
                  conseguiria dominar o Doodverse.
                </p>
                <div className="dooddraft-actions">
                  <button type="button" onClick={() => start("classic")}>
                    <Play size={18} />
                    Começar Draft
                  </button>
                  <button type="button" onClick={() => start("daily")}>
                    <CalendarDays size={18} />
                    Draft Diário
                  </button>
                  <Link to="/#arcade">Voltar ao Arcade</Link>
                </div>
              </div>
              <MascotAvatar expression="talking" size="large" floating />
            </div>

            <section className="how-to-play" aria-label="Como jogar">
              {[
                "Escolha um entre três Pokémon.",
                "Observe custo, tipos e função.",
                "Monte seis integrantes.",
                "Equilibre cobertura e fraquezas.",
                "Receba nota, classificação e card compartilhável."
              ].map((step, index) => (
                <article key={step}>
                  <span>{index + 1}</span>
                  <p>{step}</p>
                </article>
              ))}
            </section>

            <section className="mode-grid" aria-label="Modos">
              <article className="is-active"><Gamepad2 size={22} /><strong>Modo Clássico</strong><span>Todas as regras normais.</span></article>
              <article className="is-active"><CalendarDays size={22} /><strong>Draft Diário</strong><span>Mesmas opções para todo mundo hoje.</span></article>
              {["Uma Geração", "Monotype", "Sem Lendários", "Caos Total"].map((mode) => (
                <article key={mode}><Lock size={22} /><strong>{mode}</strong><span>Em breve</span></article>
              ))}
            </section>

            <aside className="fan-project-note">
              <ShieldAlert size={18} />
              Projeto não oficial criado por fãs. Pokémon e suas marcas pertencem aos respectivos proprietários. A
              2Doods não possui vínculo com Nintendo, Game Freak, Creatures ou The Pokémon Company.
            </aside>
          </section>
        ) : null}

        {game.state.status === "playing" ? (
          <section className="dooddraft-game section-band">
            <div>
              <DraftHeader
                round={game.state.round}
                budget={game.state.budget}
                rerollsLeft={game.state.rerollsLeft}
                onReroll={game.rerollOptions}
                disabled={!game.state.currentOptions.length}
              />
              <MascotCoach message={game.state.adjustedDraw ? "Ajustei o sorteio para não deixar a partida impossível." : game.state.message} />
              <TeamSlots team={game.state.team} />
              <div className="draft-playfield">
                <ChoiceGrid
                  options={game.state.currentOptions}
                  budget={game.state.budget}
                  teamTypes={teamTypes}
                  onChoose={game.chooseCreature}
                />
                <LiveTeamAnalysis analysis={game.analysis} />
              </div>
            </div>
          </section>
        ) : null}

        {game.state.status === "result" && game.state.result ? (
          <section className="dooddraft-result section-band">
            <div>
              <ResultScreen
                result={game.state.result}
                shareUrl={game.shareUrl}
                onRestart={game.resetGame}
                onShared={() => achievements.rewardGameAction(`dooddraft-share-${game.state.result?.team.map((creature) => creature.id).join("-")}`, doodDraftRewards.shared)}
              />
            </div>
          </section>
        ) : null}
      </main>
    </PageChrome>
  );
}
