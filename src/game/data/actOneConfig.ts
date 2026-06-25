import type { GameFlag } from "../types/game.types";

export const possibleActOneFrequencies = [
  91.4,
  93.7,
  95.2,
  98.5,
] as const;

export const actOneFrameClues = [
  {
    objectId: "bedroom-road-frame",
    sequence: 1,
    mark: "I",
    discoveryFlag: "discovered_radio_digit_one",
    label: "Quadro da estrada",
  },
  {
    objectId: "living-cabin-frame",
    sequence: 2,
    mark: "II",
    discoveryFlag: "discovered_radio_digit_two",
    label: "Quadro da cabana",
  },
  {
    objectId: "hallway-forest-frame",
    sequence: 3,
    mark: "III",
    discoveryFlag: "discovered_radio_digit_three",
    label: "Quadro da floresta",
  },
] as const satisfies ReadonlyArray<{
  objectId: string;
  sequence: 1 | 2 | 3;
  mark: "I" | "II" | "III";
  discoveryFlag: GameFlag;
  label: string;
}>;

export function pickActOneFrequency() {
  return possibleActOneFrequencies[
    Math.floor(Math.random() * possibleActOneFrequencies.length)
  ];
}

export function getFrequencyDigits(frequency: number) {
  return frequency.toFixed(1).replace(".", "").split("");
}
