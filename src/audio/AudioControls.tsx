import { Music2, SlidersHorizontal, Volume2, VolumeX, Waves } from "lucide-react";
import { useState } from "react";
import { useAudio } from "./useAudio";

export function AudioControls() {
  const [open, setOpen] = useState(false);
  const audio = useAudio();
  const musicPercent = Math.round(audio.musicVolume * 100);
  const sfxPercent = Math.round(audio.sfxVolume * 100);

  return (
    <div className="audio-controls">
      <button
        className="icon-button"
        type="button"
        aria-label={audio.musicEnabled ? "Desativar música" : "Ativar música"}
        onClick={audio.toggleMusic}
      >
        {audio.musicEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
      <button className="icon-button" type="button" aria-label="Abrir controles de áudio" onClick={() => setOpen(!open)}>
        <SlidersHorizontal size={20} />
      </button>

      {open ? (
        <section className="audio-panel" aria-label="Controles de áudio">
          <header>
            <Music2 size={18} />
            <strong>Trilha do Doodverse</strong>
          </header>

          <label className="audio-toggle">
            <input type="checkbox" checked={audio.musicEnabled} onChange={audio.toggleMusic} />
            Música {audio.musicEnabled ? "ligada" : "desligada"}
          </label>

          <label>
            <span>Música: {musicPercent}%</span>
            <input
              type="range"
              min="0"
              max="100"
              value={musicPercent}
              onChange={(event) => audio.setMusicVolume(Number(event.target.value) / 100)}
              aria-label="Volume da música"
            />
          </label>

          <label className="audio-toggle">
            <input type="checkbox" checked={audio.sfxEnabled} onChange={audio.toggleSfx} />
            Efeitos {audio.sfxEnabled ? "ligados" : "desligados"}
          </label>

          <label>
            <span>Efeitos: {sfxPercent}%</span>
            <input
              type="range"
              min="0"
              max="100"
              value={sfxPercent}
              onChange={(event) => audio.setSfxVolume(Number(event.target.value) / 100)}
              aria-label="Volume dos efeitos sonoros"
            />
          </label>

          <p>
            <Waves size={15} />
            A música começa depois de uma interação, respeitando o navegador.
          </p>
        </section>
      ) : null}
    </div>
  );
}
