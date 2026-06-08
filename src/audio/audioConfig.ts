export type MusicTrackId = "doodverse-theme" | "dooddraft-theme";
export type SoundEffectId = "button" | "hover" | "select" | "portal" | "achievement";

export const audioConfig = {
  defaultMusicVolume: 0.2,
  defaultSfxVolume: 0.45,
  tracks: {
    "doodverse-theme": {
      label: "Doodverse Theme",
      sources: ["/audio/music/doodverse-theme.mp3"]
    },
    "dooddraft-theme": {
      label: "DoodDraft Theme",
      sources: ["/audio/music/dooddraft-theme.mp3"]
    }
  },
  soundEffects: {
    button: "",
    hover: "",
    select: "",
    portal: "",
    achievement: ""
  }
} as const;
