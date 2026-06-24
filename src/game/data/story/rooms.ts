import type { GameMapId } from "../../types/game.types";

export const actOneRoomIds: GameMapId[] = [
  "bedroom",
  "living-room",
  "cabin-kitchen",
  "cabin-hallway",
  "basement",
];

export const storyRoomIds = new Set<GameMapId>([
  ...actOneRoomIds,
  "collapsed-tunnel",
]);
