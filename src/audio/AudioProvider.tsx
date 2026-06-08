import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { audioConfig, type MusicTrackId, type SoundEffectId } from "./audioConfig";
import { AudioContext } from "./useAudio";

interface AudioProviderProps {
  children: ReactNode;
}

function clampVolume(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function readBoolean(key: string, fallback: boolean) {
  const stored = window.localStorage.getItem(key);
  return stored ? stored === "true" : fallback;
}

function readNumber(key: string, fallback: number) {
  const stored = window.localStorage.getItem(key);
  return stored ? clampVolume(Number(stored)) : fallback;
}

export function AudioProvider({ children }: AudioProviderProps) {
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const sfxRefs = useRef<Partial<Record<SoundEffectId, HTMLAudioElement>>>({});
  const [musicEnabled, setMusicEnabled] = useState(() => readBoolean("2doods-music-enabled", false));
  const [sfxEnabled, setSfxEnabled] = useState(() => readBoolean("2doods-sfx-enabled", true));
  const [musicVolume, setMusicVolumeState] = useState(() =>
    readNumber("2doods-music-volume", audioConfig.defaultMusicVolume)
  );
  const [sfxVolume, setSfxVolumeState] = useState(() => readNumber("2doods-sfx-volume", audioConfig.defaultSfxVolume));
  const [currentTrack, setCurrentTrack] = useState<MusicTrackId | null>("doodverse-theme");
  const [audioReady, setAudioReady] = useState(false);

  const applyMusic = useCallback(async () => {
    const audio = musicRef.current;
    if (!audio || !currentTrack) return;

    audio.volume = musicVolume;
    audio.loop = true;

    if (!musicEnabled || !audioReady) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch {
      setAudioReady(false);
    }
  }, [audioReady, currentTrack, musicEnabled, musicVolume]);

  useEffect(() => {
    musicRef.current = new Audio();
    musicRef.current.preload = "auto";
    return () => {
      musicRef.current?.pause();
      musicRef.current = null;
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem("2doods-music-enabled", String(musicEnabled));
  }, [musicEnabled]);

  useEffect(() => {
    window.localStorage.setItem("2doods-sfx-enabled", String(sfxEnabled));
  }, [sfxEnabled]);

  useEffect(() => {
    window.localStorage.setItem("2doods-music-volume", String(musicVolume));
    if (musicRef.current) musicRef.current.volume = musicVolume;
  }, [musicVolume]);

  useEffect(() => {
    window.localStorage.setItem("2doods-sfx-volume", String(sfxVolume));
    Object.values(sfxRefs.current).forEach((audio) => {
      if (audio) audio.volume = sfxVolume;
    });
  }, [sfxVolume]);

  useEffect(() => {
    if (!musicRef.current || !currentTrack) return;
    const source = audioConfig.tracks[currentTrack].sources[0];
    if (!musicRef.current.src.endsWith(source)) {
      musicRef.current.pause();
      musicRef.current.src = source;
      musicRef.current.currentTime = 0;
    }
    void applyMusic();
  }, [applyMusic, currentTrack]);

  useEffect(() => {
    void applyMusic();
  }, [applyMusic]);

  useEffect(() => {
    function handleVisibility() {
      if (!musicRef.current) return;
      if (document.hidden) {
        musicRef.current.pause();
      } else {
        void applyMusic();
      }
    }

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [applyMusic]);

  useEffect(() => {
    function handleFirstInteraction() {
      setAudioReady(true);
    }

    window.addEventListener("pointerdown", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });
    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  const unlockAudio = useCallback(() => {
    setAudioReady(true);
  }, []);

  const enableMusic = useCallback(() => {
    setAudioReady(true);
    setMusicEnabled(true);
  }, []);

  const disableMusic = useCallback(() => {
    setMusicEnabled(false);
    musicRef.current?.pause();
  }, []);

  const toggleMusic = useCallback(() => {
    if (musicEnabled) {
      disableMusic();
    } else {
      enableMusic();
    }
  }, [disableMusic, enableMusic, musicEnabled]);

  const toggleSfx = useCallback(() => {
    setSfxEnabled((enabled) => !enabled);
  }, []);

  const setMusicVolume = useCallback((value: number) => {
    setMusicVolumeState(clampVolume(value));
  }, []);

  const setSfxVolume = useCallback((value: number) => {
    setSfxVolumeState(clampVolume(value));
  }, []);

  const changeTrack = useCallback((track: MusicTrackId) => {
    setCurrentTrack(track);
  }, []);

  const playSfx = useCallback(
    (id: SoundEffectId) => {
      const src = audioConfig.soundEffects[id];
      if (!sfxEnabled || !audioReady || !src) return;
      const audio = sfxRefs.current[id] ?? new Audio(src);
      audio.volume = sfxVolume;
      audio.currentTime = 0;
      sfxRefs.current[id] = audio;
      void audio.play().catch(() => undefined);
    },
    [audioReady, sfxEnabled, sfxVolume]
  );

  const value = useMemo(
    () => ({
      musicEnabled,
      sfxEnabled,
      musicVolume,
      sfxVolume,
      currentTrack,
      audioReady,
      enableMusic,
      disableMusic,
      toggleMusic,
      toggleSfx,
      setMusicVolume,
      setSfxVolume,
      playSfx,
      changeTrack,
      unlockAudio
    }),
    [
      audioReady,
      changeTrack,
      currentTrack,
      disableMusic,
      enableMusic,
      musicEnabled,
      musicVolume,
      playSfx,
      setMusicVolume,
      setSfxVolume,
      sfxEnabled,
      sfxVolume,
      toggleMusic,
      toggleSfx,
      unlockAudio
    ]
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}
