import { storyPuzzles } from "../data/story/puzzles";
import { storyTransmissions } from "../data/story/transmissions";
import type { RadioViewModel } from "../data/story/story.types";
import { gameProgress } from "./flagSystem";
import { getRevealedHints, revealNextHint } from "./hintSystem";
import { getPuzzleAccess } from "./progressionSystem";

export function getRadioState(
  transmissionId: string,
  frequency: number,
): RadioViewModel | null {
  const transmission = storyTransmissions[transmissionId];

  if (!transmission || !gameProgress.hasAll(transmission.requiredFlags)) {
    return null;
  }

  const difference = Math.abs(frequency - transmission.frequency);
  const signalQuality = Math.max(0, Math.min(1, 1 - difference / 3.5));
  const solved = gameProgress.hasAll(transmission.unlockFlags);

  let displayText = "████  ...estática...  ░░░░";
  if (signalQuality >= 0.92 || solved) {
    displayText = transmission.decodedText;
  } else if (signalQuality >= 0.55) {
    displayText = transmission.distortedText;
  } else if (signalQuality >= 0.25) {
    displayText = "...voz distante... fotos... não... ███ ...";
  }

  return {
    isOpen: true,
    transmissionId,
    frequency,
    signalQuality,
    displayText,
    solved,
    hints: getRevealedHints(transmission.relatedPuzzleId),
  };
}

export function tuneTransmission(transmissionId: string, frequency: number) {
  const transmission = storyTransmissions[transmissionId];
  const puzzle = transmission ? storyPuzzles[transmission.relatedPuzzleId] : undefined;
  const target = puzzle?.solution?.frequency;
  const tolerance = puzzle?.solution?.tolerance ?? 0.05;
  const access = puzzle ? getPuzzleAccess(puzzle.id) : null;

  if (
    !transmission ||
    !access?.allowed ||
    target === undefined ||
    Math.abs(frequency - target) > tolerance
  ) {
    return {
      solved: false,
      state: getRadioState(transmissionId, frequency),
      addedFlags: [],
    };
  }

  const addedFlags = gameProgress.addFlags(transmission.unlockFlags);
  return {
    solved: true,
    state: getRadioState(transmissionId, target),
    addedFlags,
  };
}

export function revealTransmissionHint(transmissionId: string, frequency: number) {
  const transmission = storyTransmissions[transmissionId];

  if (!transmission) {
    return null;
  }

  revealNextHint(transmission.relatedPuzzleId);
  return getRadioState(transmissionId, frequency);
}
