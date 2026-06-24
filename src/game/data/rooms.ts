import { gameMaps } from "./maps";
import type { GameMapId, GameRoomDefinition } from "../types/game.types";

const roomOrder: GameMapId[] = [
  "bedroom",
  "living-room",
  "cabin-kitchen",
  "cabin-hallway",
  "basement",
  "collapsed-tunnel",
  "village",
  "forest",
  "shop",
  "library",
  "quiet-garden",
  "star-trail",
  "stone-corridor",
  "empty-test-room",
];

export const gameRooms: GameRoomDefinition[] = roomOrder.map((roomId) => {
  const map = gameMaps[roomId];

  return {
    id: map.id,
    name: map.title,
    description: map.description,
    startPosition: map.startPosition,
  };
});
