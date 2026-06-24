import { storyCharacters } from "../data/story/characters";
import { progressNotifications } from "../data/story/progressNotifications";
import type { AbilityUnlockViewModel } from "../data/story/story.types";
import type { GameFlag } from "../types/game.types";
import { emitGameEvent } from "./gameEventBus";

export function getAbilityUnlocks(flags: GameFlag[]): AbilityUnlockViewModel[] {
  return Object.values(storyCharacters)
    .filter((character) => flags.includes(character.unlockFlag))
    .map((character) => ({
      abilityName: character.abilityName,
      characterName: character.name,
      description: character.abilityDescription,
    }));
}

export function publishStoryProgress(flags: GameFlag[]) {
  getAbilityUnlocks(flags).forEach((ability) => {
    emitGameEvent("ability:unlocked", ability);
  });

  flags.forEach((flag) => {
    const notification = progressNotifications[flag];
    if (notification) {
      emitGameEvent("progress:notify", {
        id: `${flag}-${Date.now()}`,
        ...notification,
      });
    }
  });
}
