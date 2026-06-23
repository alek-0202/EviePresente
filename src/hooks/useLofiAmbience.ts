import { useCallback, useEffect, useRef, useState } from "react";
import { audioConfig } from "../config/audio";

export type LofiAudioStatus = "idle" | "playing" | "missing";

export function useLofiAmbience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState<LofiAudioStatus>("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stop = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      setIsPlaying(false);
      return;
    }

    audio.pause();
    audio.currentTime = 0;
    audioRef.current = null;
    setIsPlaying(false);
    setStatus("idle");
  }, []);

  const start = useCallback(() => {
    if (audioRef.current) {
      return;
    }

    const audio = new Audio(audioConfig.localThemePath);

    audio.loop = true;
    audio.volume = 0.42;

    audio.addEventListener(
      "error",
      () => {
        audioRef.current = null;
        setIsPlaying(false);
        setStatus("missing");
      },
      { once: true },
    );

    void audio
      .play()
      .then(() => {
        audioRef.current = audio;
        setIsPlaying(true);
        setStatus("playing");
      })
      .catch(() => {
        audioRef.current = null;
        setIsPlaying(false);
        setStatus("missing");
      });
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      stop();
      return;
    }

    start();
  }, [isPlaying, start, stop]);

  useEffect(() => stop, [stop]);

  return {
    isPlaying,
    status,
    toggle,
    youtubeReferenceUrl: audioConfig.youtubeReferenceUrl,
  };
}
