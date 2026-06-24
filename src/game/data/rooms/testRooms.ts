import type { GameMapDefinition } from "../../types/game.types";
import { prop, repeatProps, roomEdges } from "./roomHelpers";

export const testRooms = {
  "stone-corridor": {
    id: "stone-corridor",
    title: "Corredor de Pedra",
    description: "Uma passagem estreita para validar portas, bloqueios e encontros lineares.",
    theme: "mystery",
    width: 20,
    height: 14,
    tileSize: 32,
    backgroundColor: 0x171725,
    groundColor: 0x434356,
    alternateGroundColor: 0x3e3e50,
    borderColor: 0x242433,
    startPosition: { x: 2, y: 7 },
    collisions: [
      ...roomEdges("stone"),
      { x: 1, y: 1, width: 18, height: 4, style: "stone" },
      { x: 1, y: 9, width: 18, height: 4, style: "stone" },
      { x: 7, y: 5, width: 2, height: 1, style: "stone" },
      { x: 12, y: 8, width: 2, height: 1, style: "stone" },
    ],
    decorations: [
      ...Array.from({ length: 18 }, (_, index) => ({
        x: 1 + index,
        y: 7,
        kind: "path" as const,
      })),
      { x: 5, y: 6, kind: "lamp" },
      { x: 10, y: 8, kind: "lamp" },
      { x: 15, y: 6, kind: "lamp" },
    ],
    props: [
      prop("doors", 0, 18, 7, { scale: 2.8, depth: 4 }),
      prop("chests", 2, 10, 6, { scale: 2.2, depth: 4 }),
    ],
  },
  "empty-test-room": {
    id: "empty-test-room",
    title: "Sala Vazia de Testes",
    description: "Espaço neutro com obstáculos variados para ajustar colisões e escala.",
    theme: "test",
    width: 20,
    height: 14,
    tileSize: 32,
    backgroundColor: 0x25212e,
    groundColor: 0x6b6870,
    alternateGroundColor: 0x646168,
    borderColor: 0x38343f,
    startPosition: { x: 2, y: 2 },
    collisions: [
      ...roomEdges("wall"),
      { x: 4, y: 3, width: 3, height: 2, style: "wood" },
      { x: 10, y: 2, width: 2, height: 5, style: "stone" },
      { x: 14, y: 8, width: 4, height: 2, style: "water" },
      { x: 3, y: 9, width: 5, height: 1, style: "counter" },
    ],
    decorations: [
      { x: 2, y: 11, kind: "spark" },
      { x: 9, y: 9, kind: "flower", color: 0xffd38a },
      { x: 16, y: 4, kind: "grass" },
    ],
    props: [
      ...repeatProps("furniture", 30, [[4, 3.5], [5.5, 3.5]], { scale: 2.5, depth: 4 }),
      prop("biome", 0, 16, 4, { scale: 2.8, depth: 4 }),
      prop("chests", 0, 5, 8.5, { scale: 2.5, depth: 4 }),
      prop("tools", 0, 9, 10, { scale: 2.2, depth: 4 }),
      prop("plants", 4, 13, 3, { scale: 2.2, depth: 4 }),
    ],
  },
} satisfies Partial<Record<string, GameMapDefinition>>;
