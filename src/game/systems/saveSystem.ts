import { gameMaps } from "../data/maps";
import { getFrequencyDigits, pickActOneFrequency } from "../data/actOneConfig";
import type {
  GameFlag,
  GameSaveData,
  TilePosition,
} from "../types/game.types";
import { gameProgress } from "./flagSystem";

const SAVE_KEY = "evie-minigame-save-v1";

export function createDefaultSave(): GameSaveData {
  const initialMap = gameMaps.bedroom;

  return {
    version: 3,
    mapId: initialMap.id,
    playerPosition: initialMap.startPosition,
    flags: [],
    items: [],
    activeItemId: null,
    seenInteractions: [],
    protagonistId: "the-viewer",
    actOneFrequency: pickActOneFrequency(),
    actOneRadioClues: {
      discoveredFrameIds: [],
    },
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
      version?: 1 | 2 | 3;
    };

    if (
      (parsed.version !== 1 && parsed.version !== 2 && parsed.version !== 3) ||
      !parsed.mapId ||
      !gameMaps[parsed.mapId] ||
      !parsed.playerPosition ||
      !Array.isArray(parsed.flags) ||
      !Array.isArray(parsed.items)
    ) {
      return createDefaultSave();
    }

    const migrated = migrateLegacyProgress(parsed);
    return {
      version: 3,
      mapId: parsed.mapId,
      playerPosition: parsed.playerPosition,
      flags: migrated.flags,
      items: migrated.items,
      activeItemId: migrated.activeItemId,
      seenInteractions: parsed.seenInteractions ?? [],
      protagonistId: "the-viewer",
      actOneFrequency: migrated.actOneFrequency,
      actOneRadioClues: migrated.actOneRadioClues,
      puzzleHints: parsed.puzzleHints ?? {},
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    };
  } catch {
    return createDefaultSave();
  }
}

export function saveGame(mapId: GameSaveData["mapId"], playerPosition: TilePosition) {
  const progress = gameProgress.getSaveState();
  const save: GameSaveData = {
    version: 3,
    mapId,
    playerPosition,
    protagonistId: "the-viewer",
    ...progress,
    updatedAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  } catch {
    // The game remains playable when storage is unavailable.
  }

  return save;
}

export function saveProgressSnapshot() {
  const currentSave = loadGame();
  return saveGame(currentSave.mapId, currentSave.playerPosition);
}

export function clearSave() {
  try {
    window.localStorage.removeItem(SAVE_KEY);
  } catch {
    // Ignore storage restrictions in private browsing contexts.
  }
}

function migrateLegacyProgress(
  parsed: Partial<Omit<GameSaveData, "version">> & { version?: 1 | 2 | 3 },
) {
  const flags = [...(parsed.flags ?? [])] as GameFlag[];
  const items = [...(parsed.items ?? [])];
  const hasFlag = (flag: GameFlag) => flags.includes(flag);
  const addFlag = (flag: GameFlag) => {
    if (!hasFlag(flag)) {
      flags.push(flag);
    }
  };
  const hasAdvancedRadioProgress =
    hasFlag("solved_radio_dial_caio") || hasFlag("heard_caio_signal");

  if (parsed.version !== 3) {
    if (
      hasFlag("examined_radio") ||
      hasFlag("inspected_fireplace") ||
      hasAdvancedRadioProgress
    ) {
      addFlag("noticed_disappearance");
      addFlag("started_magnifier_search");
    }

    if (hasAdvancedRadioProgress) {
      addFlag("found_magnifying_glass");
      addFlag("equipped_magnifying_glass");
      addFlag("discovered_radio_digit_one");
      addFlag("discovered_radio_digit_two");
      addFlag("discovered_radio_digit_three");
      addFlag("discovered_radio_frequency");
      if (!items.includes("magnifying_glass")) {
        items.push("magnifying_glass");
      }
    }
  }

  const actOneFrequency =
    parsed.actOneFrequency ??
    (hasAdvancedRadioProgress ? 98.5 : pickActOneFrequency());
  const digits = getFrequencyDigits(actOneFrequency);
  const actOneRadioClues = parsed.actOneRadioClues ?? {
    firstDigit: hasAdvancedRadioProgress ? digits[0] : undefined,
    secondDigit: hasAdvancedRadioProgress ? digits[1] : undefined,
    thirdDigit: hasAdvancedRadioProgress ? digits[2] : undefined,
    discoveredFrameIds: hasAdvancedRadioProgress
      ? [
          "bedroom-road-frame",
          "living-cabin-frame",
          "hallway-forest-frame",
        ]
      : [],
  };

  return {
    flags,
    items,
    activeItemId:
      parsed.activeItemId ??
      (hasAdvancedRadioProgress ? "magnifying_glass" : null),
    actOneFrequency,
    actOneRadioClues,
  };
}
