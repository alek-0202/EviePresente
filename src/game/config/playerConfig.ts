import type { GameDirection } from "../types/game.types";

export const playerConfig = {
  speed: 118,
  interactionDistance: 54,
  textureKey: "player-sheet",
  scale: 2,
  idleFrames: {
    down: 0,
    up: 4,
    right: 12,
    left: 8,
  } satisfies Record<GameDirection, number>,
  walkAnimations: {
    down: "player-walk-down",
    up: "player-walk-up",
    right: "player-walk-right",
    left: "player-walk-left",
  } satisfies Record<GameDirection, string>,
};
