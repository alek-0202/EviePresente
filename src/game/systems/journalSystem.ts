import { journalEntries } from "../data/story/journal";
import { storyMapNodes } from "../data/story/progression";
import { gameMaps } from "../data/maps";
import type { JournalViewModel } from "../data/story/story.types";
import { gameProgress } from "./flagSystem";
import { getCurrentObjective } from "./puzzleSystem";
import { getRoomAccess } from "./progressionSystem";

export function buildJournal(): JournalViewModel {
  const frequency = gameProgress.getActOneFrequency();
  const clues = gameProgress.getActOneRadioClues();
  const dynamicEntries = [
    clues.firstDigit
      ? {
          id: "radio-digit-one",
          category: "clue" as const,
          title: `Quadro I — ${clues.firstDigit}`,
          body: "O quadro da estrada esconde o primeiro número da sequência.",
          requiredFlags: ["discovered_radio_digit_one" as const],
        }
      : null,
    clues.secondDigit
      ? {
          id: "radio-digit-two",
          category: "clue" as const,
          title: `Quadro II — ${clues.secondDigit}`,
          body: "O quadro da cabana esconde o segundo número da sequência.",
          requiredFlags: ["discovered_radio_digit_two" as const],
        }
      : null,
    clues.thirdDigit
      ? {
          id: "radio-digit-three",
          category: "clue" as const,
          title: `Quadro III — ${clues.thirdDigit}`,
          body: "O quadro da floresta esconde o último número da sequência.",
          requiredFlags: ["discovered_radio_digit_three" as const],
        }
      : null,
    gameProgress.hasFlag("discovered_radio_frequency")
      ? {
          id: "radio-frequency-complete",
          category: "clue" as const,
          title: `Frequência descoberta — ${frequency.toFixed(1)} MHz`,
          body: `Os números ${clues.firstDigit}, ${clues.secondDigit} e ${clues.thirdDigit}, marcados como I, II e III, formam a frequência do rádio.`,
          requiredFlags: ["discovered_radio_frequency" as const],
        }
      : null,
  ].filter((entry) => entry !== null);
  const visibleEntries = [...journalEntries, ...dynamicEntries]
    .filter((entry) => gameProgress.hasAll(entry.requiredFlags))
    .map((entry) =>
      entry.id === "transmission-caio"
        ? { ...entry, title: `${frequency.toFixed(1)} MHz — Caio` }
        : entry,
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
