import { inventoryItems } from "../data/inventoryItems";
import { emitGameEvent } from "./gameEventBus";
import { gameProgress } from "./flagSystem";
import { saveProgressSnapshot } from "./saveSystem";
import { publishStoryProgress } from "./storyProgressSystem";

export function getInventoryItems() {
  return gameProgress
    .getItems()
    .map((itemId) => inventoryItems[itemId])
    .filter((item) => Boolean(item));
}

export function getActiveInventoryItem() {
  const activeItemId = gameProgress.getActiveItemId();
  return activeItemId ? inventoryItems[activeItemId] ?? null : null;
}

export function obtainInventoryItems(itemIds: string[]) {
  const newItemIds = itemIds.filter((itemId) => !gameProgress.hasItem(itemId));
  gameProgress.addItems(newItemIds);

  if (newItemIds.includes("magnifying_glass")) {
    const addedFlags = gameProgress.addFlags(["found_magnifying_glass"]);
    publishStoryProgress(addedFlags);
  }

  newItemIds.forEach((itemId) => {
    const item = inventoryItems[itemId];
    if (item) {
      emitGameEvent("progress:notify", {
        id: `item-${itemId}-${Date.now()}`,
        label: "item obtido",
        title: item.name,
        detail: item.description,
        tone: "item",
      });
    }
  });

  if (newItemIds.length > 0) {
    saveProgressSnapshot();
    emitGameEvent("inventory:refresh", undefined);
  }

  return newItemIds;
}

export function equipInventoryItem(itemId: string) {
  const item = inventoryItems[itemId];
  if (!item || !gameProgress.hasItem(itemId)) {
    return false;
  }

  const changed = gameProgress.setActiveItem(itemId);
  if (!changed) {
    return false;
  }

  if (itemId === "magnifying_glass") {
    const addedFlags = gameProgress.addFlags(["equipped_magnifying_glass"]);
    publishStoryProgress(addedFlags);
  }

  saveProgressSnapshot();
  emitGameEvent("inventory:refresh", undefined);
  emitGameEvent("progress:notify", {
    id: `equipped-${itemId}-${Date.now()}`,
    label: "item ativo",
    title: item.name,
    tone: "item",
  });
  return true;
}
