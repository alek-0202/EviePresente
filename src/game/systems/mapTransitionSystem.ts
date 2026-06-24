import Phaser from "phaser";
import type { GameMapId, TilePosition, WorldSceneData } from "../types/game.types";

export function transitionToMap(
  scene: Phaser.Scene,
  sourceMapId: GameMapId,
  targetMapId: GameMapId,
  targetPosition: TilePosition,
) {
  scene.cameras.main.fadeOut(260, 20, 15, 32);
  scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
    const sceneData: WorldSceneData = {
      mapId: targetMapId,
      playerPosition: targetPosition,
      previousMapId: sourceMapId,
    };

    scene.scene.restart(sceneData);
  });
}
