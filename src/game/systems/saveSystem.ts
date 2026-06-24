import { gameMaps } from "../data/maps";
import type { GameSaveData, TilePosition } from "../types/game.types";
import { gameProgress } from "./flagSystem";

const SAVE_KEY = "evie-minigame-save-v1";

export function createDefaultSave(): GameSaveData {
  const initialMap = gameMaps.bedroom;

  return {
    version: 2,
    mapId: initialMap.id,
    playerPosition: initialMap.startPosition,
    flags: [],
    items: [],
    puzzleHints: {},
    updatedAt: new Date().toISOString(),
  };
}

export function loadGame(): GameSaveData {
  try {
    const rawSave = window.localStorage.getItem(SAVE_KEY);

    if (!rawSave) {
      return createDefaultSave();
    }

    const parsed = JSON.parse(rawSave) as Partial<Omit<GameSaveData, "version">> & {
      version?: 1 | 2;
    };

    if (
      (parsed.version !== 1 && parsed.version !== 2) ||
      !parsed.mapId ||
      !gameMaps[parsed.mapId] ||
      !parsed.playerPosition ||
      !Array.isArray(parsed.flags) ||
      !Array.isArray(parsed.items)
    ) {
      return createDefaultSave();
    }

    return {
      version: 2,
      mapId: parsed.mapId,
      playerPosition: parsed.playerPosition,
      flags: parsed.flags,
      items: parsed.items,
      puzzleHints: parsed.puzzleHints ?? {},
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    };
  } catch {
    return createDefaultSave();
  }
}

export function saveGame(mapId: GameSaveData["mapId"], playerPosition: TilePosition) {
  const save: GameSaveData = {
    version: 2,
    mapId,
    playerPosition,
    flags: gameProgress.getFlags(),
    items: gameProgress.getItems(),
    puzzleHints: gameProgress.getPuzzleHints(),
    updatedAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  } catch {
    // The game remains playable when storage is unavailable.
  }

  return save;
}

export function clearSave() {
  try {
    window.localStorage.removeItem(SAVE_KEY);
  } catch {
    // Ignore storage restrictions in private browsing contexts.
  }
}
