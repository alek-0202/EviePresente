import { publicAssetPath } from "../../utils/publicAsset";
import type { NpcDefinition } from "../types/game.types";

export const gameNpcs: NpcDefinition[] = [
  {
    id: "caio-basement",
    name: "Caio",
    mapId: "basement",
    position: { x: 9, y: 6 },
    spriteKey: "npc-evie",
    portraitUrl: publicAssetPath("assets/avatars/caio.png"),
    dialogueId: "act1-caio-trapped",
    dialogueVariants: [
      {
        dialogueId: "act1-caio-rescue",
        requiredFlags: [
          "inspected_basement_photo",
          "inspected_basement_cards",
          "traced_caio_signal",
        ],
      },
    ],
    requiredFlags: ["unlocked_basement"],
    excludedFlags: ["rescued_caio"],
    optionalBehavior: "look-at-player",
  },
  {
    id: "caio-safe",
    name: "Caio",
    mapId: "living-room",
    position: { x: 13, y: 10 },
    spriteKey: "npc-evie",
    portraitUrl: publicAssetPath("assets/avatars/caio.png"),
    dialogueId: "act1-caio-rescued",
    requiredFlags: ["rescued_caio"],
    optionalBehavior: "look-at-player",
  },
  {
    id: "evie-garden",
    name: "Evie",
    mapId: "quiet-garden",
    position: { x: 7, y: 6 },
    spriteKey: "npc-evie",
    portraitUrl: publicAssetPath("assets/characters/evie-pixel.png"),
    dialogueId: "evie-intro",
    dialogueVariants: [
      {
        dialogueId: "evie-after-crystal",
        requiredFlags: ["awakened_crystal"],
      },
      {
        dialogueId: "evie-repeat",
        requiredFlags: ["talked_to_evie"],
      },
    ],
    optionalBehavior: "look-at-player",
  },
  {
    id: "village-placeholder",
    name: "Morador",
    mapId: "village",
    position: { x: 10, y: 6 },
    spriteKey: "npc-evie",
    dialogueId: "sandbox-villager",
    optionalBehavior: "idle",
  },
];
