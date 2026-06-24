import { gamePuzzles } from "../data/puzzles";
import { gameProgress } from "./flagSystem";

export function getCurrentObjective() {
  for (const puzzle of gamePuzzles) {
    if (gameProgress.hasAll(puzzle.completionFlags)) {
      continue;
    }

    const currentStep = puzzle.steps.find((step) => !gameProgress.hasFlag(step.flag));
    return currentStep?.objective ?? "Observe o que mudou ao seu redor.";
  }

  return "A passagem foi encontrada. O próximo resgate começa no túnel.";
}
