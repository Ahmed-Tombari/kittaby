"use client";

import { useCallback } from "react";

export function useSound(path: string) {
  const play = useCallback(() => {
    const audio = new Audio(path);
    audio.play().catch((err) => console.error("Audio playback failed:", err));
  }, [path]);

  return play;
}
