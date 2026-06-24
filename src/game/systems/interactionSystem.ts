import type { GameDirection } from "../types/game.types";

export type InteractionCandidate<T> = {
  id: string;
  x: number;
  y: number;
  data: T;
};

const directionVectors: Record<GameDirection, { x: number; y: number }> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export function findFacingInteraction<T>(
  player: { x: number; y: number },
  direction: GameDirection,
  candidates: InteractionCandidate<T>[],
  maxDistance: number,
) {
  const facing = directionVectors[direction];

  return candidates
    .map((candidate) => {
      const offsetX = candidate.x - player.x;
      const offsetY = candidate.y - player.y;
      const distance = Math.hypot(offsetX, offsetY);
      const facingScore =
        distance === 0 ? 1 : (offsetX / distance) * facing.x + (offsetY / distance) * facing.y;

      return { candidate, distance, facingScore };
    })
    .filter(({ distance, facingScore }) => distance <= maxDistance && facingScore > 0.2)
    .sort((left, right) => left.distance - right.distance)[0]?.candidate;
}
