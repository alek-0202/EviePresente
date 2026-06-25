import { publicAssetPath } from "../../utils/publicAsset";
import type { InventoryItem } from "../types/game.types";

export const inventoryItems: Record<string, InventoryItem> = {
  magnifying_glass: {
    id: "magnifying_glass",
    name: "Lupa",
    description: "Revela detalhes pequenos que passam despercebidos.",
    iconPath: publicAssetPath("assets/game/items/magnifying-glass.png"),
    usableOn: ["painting", "photo", "note", "scratch", "radio_mark"],
  },
};
