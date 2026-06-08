import { createContext, useContext } from "react";
import type { MusicTrackId, SoundEffectId } from "./audioConfig";

export interface AudioContextValue {
  musicEnabled: boolean;
  sfxEnabled: boolean;
  musicVolume: number;
  sfxVolume: number;
  currentTrack: MusicTrackId | null;
  audioReady: boolean;
  enableMusic: () => void;
  disableMusic: () => void;
  toggleMusic: () => void;
  toggleSfx: () => void;
  setMusicVolume: (value: number) => void;
  setSfxVolume: (value: number) => void;
  playSfx: (id: SoundEffectId) => void;
  changeTrack: (track: MusicTrackId) => void;
  unlockAudio: () => void;
}

export const AudioContext = createContext<AudioContextValue | null>(null);

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used inside AudioProvider");
  }
  return context;
}
