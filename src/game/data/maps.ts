import { indoorRooms } from "./rooms/indoorRooms";
import { outdoorRooms } from "./rooms/outdoorRooms";
import { testRooms } from "./rooms/testRooms";
import type { GameMapDefinition, GameMapId } from "../types/game.types";

export const gameMaps: Record<GameMapId, GameMapDefinition> = {
  ...indoorRooms,
  ...outdoorRooms,
  ...testRooms,
};
