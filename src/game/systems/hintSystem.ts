import { storyPuzzles } from "../data/story/puzzles";
import { gameProgress } from "./flagSystem";

export function getRevealedHints(puzzleId: string) {
  const puzzle = storyPuzzles[puzzleId];

  if (!puzzle) {
    return [];
  }

  return puzzle.hints.slice(0, gameProgress.getHintLevel(puzzleId));
}

export function revealNextHint(puzzleId: string) {
  const puzzle = storyPuzzles[puzzleId];

  if (!puzzle) {
    return [];
  }

  const level = gameProgress.revealNextHint(puzzleId, puzzle.hints.length);
  return puzzle.hints.slice(0, level);
}
