import Phaser from "phaser";
import { BootScene } from "../scenes/BootScene";
import { DialogueScene } from "../scenes/DialogueScene";
import { PreloadScene } from "../scenes/PreloadScene";
import { WorldScene } from "../scenes/WorldScene";

export function createGameConfig(parent: HTMLElement): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,
    width: 640,
    height: 448,
    backgroundColor: "#171a2d",
    pixelArt: true,
    roundPixels: true,
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
      },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 640,
      height: 448,
    },
    scene: [BootScene, PreloadScene, WorldScene, DialogueScene],
  };
}
