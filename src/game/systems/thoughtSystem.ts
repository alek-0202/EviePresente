import { storyThoughts } from "../data/story/thoughts";
import type { GameFlag, GameMapId } from "../types/game.types";
import { emitGameEvent } from "./gameEventBus";
import { gameProgress } from "./flagSystem";

export function showThought(
  text: string,
  options: {
    duration?: number;
    id?: string;
    onceFlag?: GameFlag;
  } = {},
) {
  if (options.onceFlag && gameProgress.hasFlag(options.onceFlag)) {
    return false;
  }

  if (options.onceFlag) {
    gameProgress.addFlags([options.onceFlag]);
  }

  emitGameEvent("thought:show", {
    id: options.id ?? `thought-${Date.now()}`,
    text,
    duration: options.duration ?? 3600,
  });
  return true;
}

export function showStoryThought(thoughtId: string) {
  const thought = storyThoughts[thoughtId];

  if (
    !thought ||
    !gameProgress.hasAll(thought.requiredFlags) ||
    gameProgress.hasAny(thought.excludedFlags)
  ) {
    return false;
  }

  return showThought(thought.text, {
    id: thought.id,
    duration: thought.duration,
    onceFlag: thought.onceFlag,
  });
}

export function getRoomEntryThought(mapId: GameMapId) {
  return Object.values(storyThoughts).find(
    (thought) =>
      thought.mapId === mapId &&
      gameProgress.hasAll(thought.requiredFlags) &&
      !gameProgress.hasAny(thought.excludedFlags) &&
      (!thought.onceFlag || !gameProgress.hasFlag(thought.onceFlag)),
  );
}
