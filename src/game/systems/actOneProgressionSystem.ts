import type { GameFlag } from "../types/game.types";
import { gameProgress } from "./flagSystem";
import { publishStoryProgress } from "./storyProgressSystem";

const disappearanceEvidence: GameFlag[] = [
  "inspected_empty_bed",
  "inspected_backpacks",
  "inspected_card_game",
];

export function syncActOneProgression() {
  const derivedFlags: GameFlag[] = [];
  const evidenceCount = disappearanceEvidence.filter((flag) =>
    gameProgress.hasFlag(flag),
  ).length;

  if (evidenceCount >= 3) {
    derivedFlags.push("noticed_disappearance");
  }

  if (
    gameProgress.hasFlag("noticed_disappearance") &&
    gameProgress.hasFlag("examined_radio")
  ) {
    derivedFlags.push("started_magnifier_search");
  }

  if (
    gameProgress.hasAll([
      "discovered_radio_digit_one",
      "discovered_radio_digit_two",
      "discovered_radio_digit_three",
    ])
  ) {
    derivedFlags.push("discovered_radio_frequency");
  }

  const addedFlags = gameProgress.addFlags(derivedFlags);
  publishStoryProgress(addedFlags);
  return addedFlags;
}
