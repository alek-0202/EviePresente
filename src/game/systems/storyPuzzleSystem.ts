import { storyPuzzles } from "../data/story/puzzles";
import type { KeypadViewModel } from "../data/story/story.types";
import { gameProgress } from "./flagSystem";
import { getRevealedHints, revealNextHint } from "./hintSystem";
import { getPuzzleAccess } from "./progressionSystem";

export function getKeypadState(
  puzzleId: string,
  digits = "",
  error = "",
): KeypadViewModel | null {
  const puzzle = storyPuzzles[puzzleId];

  if (!puzzle || puzzle.type !== "code") {
    return null;
  }

  return {
    isOpen: true,
    puzzleId,
    title: puzzle.title,
    description: puzzle.description,
    digits,
    error,
    hints: getRevealedHints(puzzleId),
  };
}

export function submitPuzzleCode(puzzleId: string, digits: string) {
  const puzzle = storyPuzzles[puzzleId];
  const access = getPuzzleAccess(puzzleId);
  const solved = access.allowed && puzzle?.solution?.code === digits;

  if (!puzzle || !solved) {
    return {
      solved: false,
      state: getKeypadState(puzzleId, digits, "A fechadura rejeita a sequência."),
      addedFlags: [],
    };
  }

  const addedFlags = gameProgress.addFlags(puzzle.completionFlags);
  return {
    solved: true,
    state: getKeypadState(puzzleId, digits),
    addedFlags,
  };
}

export function revealPuzzleHint(puzzleId: string, digits = "") {
  revealNextHint(puzzleId);
  return getKeypadState(puzzleId, digits);
}
