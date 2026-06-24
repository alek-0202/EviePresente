import Phaser from "phaser";
import { validateStoryProgression } from "../systems/progressionSystem";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  create() {
    const progressionIssues = validateStoryProgression();
    if (progressionIssues.length > 0) {
      throw new Error(`Invalid story progression:\n${progressionIssues.join("\n")}`);
    }

    this.scene.start("PreloadScene");
  }
}
