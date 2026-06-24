import { gameMaps } from "../data/maps";
import {
  storyMapConnections,
  storyMapNodes,
} from "../data/story/progression";
import type { GameMapId } from "../types/game.types";
import { getRoomAccess } from "./progressionSystem";

export function buildStoryMap(currentRoomId: GameMapId) {
  return {
    nodes: storyMapNodes.map((node) => ({
      ...node,
      name: gameMaps[node.id].title,
      status:
        node.id === currentRoomId
          ? ("current" as const)
          : getRoomAccess(node.id).allowed
            ? ("open" as const)
            : ("locked" as const),
    })),
    connections: storyMapConnections,
  };
}
