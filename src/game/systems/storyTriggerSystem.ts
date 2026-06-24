import { storySceneTriggers } from "../data/story/scenes";
import type { GameMapId } from "../types/game.types";
import { gameProgress } from "./flagSystem";

export function getPendingStoryTrigger(mapId: GameMapId) {
  return storySceneTriggers.find(
    (trigger) =>
      trigger.mapId === mapId &&
      gameProgress.hasAll(trigger.requiredFlags) &&
      !gameProgress.hasAny(trigger.excludedFlags),
  );
}
