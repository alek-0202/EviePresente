import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { createGameConfig } from "../config/gameConfig";
import styles from "./GameCanvas.module.css";

export function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const game = new Phaser.Game(createGameConfig(container));

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div className={styles.canvasHost} ref={containerRef} aria-label="Área do minigame" />;
}
