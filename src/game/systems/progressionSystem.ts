import { storyActs } from "../data/story/acts";
import {
  actProgressionFlags,
  roomAccessRules,
  storyMapConnections,
  storyMapNodes,
} from "../data/story/progression";
import { storyPuzzles } from "../data/story/puzzles";
import type { GameFlag, GameMapId } from "../types/game.types";
import { gameProgress } from "./flagSystem";

export type ProgressionAccess = {
  allowed: boolean;
  missingFlags: GameFlag[];
  blockedDialogueId?: string;
};

export function getPuzzleAccess(puzzleId: string): ProgressionAccess {
  const puzzle = storyPuzzles[puzzleId];

  if (!puzzle) {
    return {
      allowed: false,
      missingFlags: [],
      blockedDialogueId: "story-puzzle-not-ready",
    };
  }

  const missingFlags = puzzle.requiredFlags.filter(
    (flag) => !gameProgress.hasFlag(flag),
  );
  const firstMissingFlag = missingFlags[0];

  return {
    allowed: missingFlags.length === 0,
    missingFlags,
    blockedDialogueId:
      (firstMissingFlag
        ? puzzle.blockedDialogueByFlag?.[firstMissingFlag]
        : undefined) ?? puzzle.blockedDialogueId,
  };
}

export function getRoomAccess(mapId: GameMapId): ProgressionAccess {
  const rule = roomAccessRules[mapId];

  if (!rule) {
    return { allowed: true, missingFlags: [] };
  }

  const missingFlags = rule.requiredFlags.filter(
    (flag) => !gameProgress.hasFlag(flag),
  );

  return {
    allowed: missingFlags.length === 0,
    missingFlags,
    blockedDialogueId: rule.blockedDialogueId,
  };
}

export function validateStoryProgression() {
  const issues: string[] = [];
  const mapNodeIds = new Set(storyMapNodes.map((node) => node.id));

  storyActs.forEach((act, index) => {
    const expectedPrerequisites = actProgressionFlags[index] ?? [];
    const hasExpectedPrerequisites = expectedPrerequisites.every((flag) =>
      act.prerequisiteFlags.includes(flag),
    );

    if (!hasExpectedPrerequisites) {
      issues.push(`${act.id}: prerequisite flags do not follow the rescue order.`);
    }

    act.puzzleIds.forEach((puzzleId) => {
      if (!storyPuzzles[puzzleId]) {
        issues.push(`${act.id}: missing puzzle ${puzzleId}.`);
      }
    });

    act.roomIds.forEach((roomId) => {
      if (!mapNodeIds.has(roomId)) {
        issues.push(`${act.id}: room ${roomId} is missing from the map.`);
      }
    });
  });

  storyMapConnections.forEach((connection) => {
    if (!mapNodeIds.has(connection.from) || !mapNodeIds.has(connection.to)) {
      issues.push(`${connection.id}: map connection references an unknown room.`);
    }
  });

  return issues;
}
