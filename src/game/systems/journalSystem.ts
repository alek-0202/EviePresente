import { journalEntries } from "../data/story/journal";
import { storyMapNodes } from "../data/story/progression";
import { gameMaps } from "../data/maps";
import type { JournalViewModel } from "../data/story/story.types";
import { gameProgress } from "./flagSystem";
import { getCurrentObjective } from "./puzzleSystem";
import { getRoomAccess } from "./progressionSystem";

export function buildJournal(): JournalViewModel {
  const visibleEntries = journalEntries.filter((entry) =>
    gameProgress.hasAll(entry.requiredFlags),
  );

  return {
    abilities: visibleEntries.filter((entry) => entry.category === "ability"),
    clues: visibleEntries.filter((entry) => entry.category === "clue"),
    friends: visibleEntries.filter((entry) => entry.category === "friend"),
    transmissions: visibleEntries.filter((entry) => entry.category === "transmission"),
    objective: getCurrentObjective(),
    unlockedMaps: storyMapNodes
      .filter((node) => getRoomAccess(node.id).allowed)
      .map((node) => ({
        id: node.id,
        name: gameMaps[node.id].title,
      })),
  };
}
