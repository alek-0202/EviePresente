import { gameDialogues } from "../data/dialogues";
import type { ConditionalDialogueRef, DialogueDefinition } from "../types/game.types";
import { gameProgress } from "./flagSystem";

export function getDialogue(dialogueId: string): DialogueDefinition | null {
  const dialogue = gameDialogues[dialogueId];

  if (!dialogue || !gameProgress.hasAll(dialogue.conditions)) {
    return null;
  }

  return dialogue;
}

export function resolveDialogueId(
  fallbackDialogueId: string | undefined,
  variants: ConditionalDialogueRef[] = [],
) {
  const match = variants.find(
    (variant) =>
      gameProgress.hasAll(variant.requiredFlags) &&
      !gameProgress.hasAny(variant.excludedFlags),
  );

  return match?.dialogueId ?? fallbackDialogueId ?? null;
}
