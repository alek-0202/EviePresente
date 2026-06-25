import { initialGameFlags } from "../data/gameFlags";
import type {
  ActOneRadioClues,
  GameFlag,
  GameSaveData,
} from "../types/game.types";

class GameProgress {
  private flags = new Set<GameFlag>(initialGameFlags);
  private items = new Set<string>();
  private activeItemId: string | null = null;
  private seenInteractions = new Set<string>();
  private actOneFrequency = 98.5;
  private actOneRadioClues: ActOneRadioClues = {
    discoveredFrameIds: [],
  };
  private puzzleHints = new Map<string, number>();
  private listeners = new Set<() => void>();

  hydrate(save: GameSaveData) {
    this.flags = new Set(save.flags);
    this.items = new Set(save.items);
    this.activeItemId = save.activeItemId;
    this.seenInteractions = new Set(save.seenInteractions);
    this.actOneFrequency = save.actOneFrequency;
    this.actOneRadioClues = {
      ...save.actOneRadioClues,
      discoveredFrameIds: [...save.actOneRadioClues.discoveredFrameIds],
    };
    this.puzzleHints = new Map(Object.entries(save.puzzleHints));
    this.notify();
  }

  reset() {
    this.flags = new Set(initialGameFlags);
    this.items.clear();
    this.activeItemId = null;
    this.seenInteractions.clear();
    this.actOneFrequency = 98.5;
    this.actOneRadioClues = { discoveredFrameIds: [] };
    this.puzzleHints.clear();
    this.notify();
  }

  hasFlag(flag: GameFlag) {
    return this.flags.has(flag);
  }

  hasAll(flags: GameFlag[] = []) {
    return flags.every((flag) => this.flags.has(flag));
  }

  hasAny(flags: GameFlag[] = []) {
    return flags.some((flag) => this.flags.has(flag));
  }

  addFlags(flags: GameFlag[] = []) {
    const addedFlags = flags.filter((flag) => !this.flags.has(flag));
    addedFlags.forEach((flag) => this.flags.add(flag));
    if (addedFlags.length > 0) {
      this.notify();
    }
    return addedFlags;
  }

  addItems(items: string[] = []) {
    const previousSize = this.items.size;
    items.forEach((item) => this.items.add(item));
    if (this.items.size !== previousSize) {
      this.notify();
    }
  }

  hasItem(itemId: string) {
    return this.items.has(itemId);
  }

  getFlags() {
    return Array.from(this.flags);
  }

  getItems() {
    return Array.from(this.items);
  }

  getActiveItemId() {
    return this.activeItemId;
  }

  setActiveItem(itemId: string | null) {
    const nextItemId = itemId && this.items.has(itemId) ? itemId : null;
    if (this.activeItemId === nextItemId) {
      return false;
    }
    this.activeItemId = nextItemId;
    this.notify();
    return true;
  }

  hasSeenInteraction(interactionId: string) {
    return this.seenInteractions.has(interactionId);
  }

  markInteractionSeen(interactionId: string) {
    const previousSize = this.seenInteractions.size;
    this.seenInteractions.add(interactionId);
    if (previousSize !== this.seenInteractions.size) {
      this.notify();
      return true;
    }
    return false;
  }

  getSeenInteractions() {
    return Array.from(this.seenInteractions);
  }

  getActOneFrequency() {
    return this.actOneFrequency;
  }

  getActOneFrequencyDigits() {
    return this.actOneFrequency.toFixed(1).replace(".", "").split("");
  }

  getActOneRadioClues() {
    return {
      ...this.actOneRadioClues,
      discoveredFrameIds: [...this.actOneRadioClues.discoveredFrameIds],
    };
  }

  discoverActOneFrame(
    frameId: string,
    sequence: 1 | 2 | 3,
    digit: string,
  ) {
    if (this.actOneRadioClues.discoveredFrameIds.includes(frameId)) {
      return false;
    }

    const key =
      sequence === 1
        ? "firstDigit"
        : sequence === 2
          ? "secondDigit"
          : "thirdDigit";
    this.actOneRadioClues = {
      ...this.actOneRadioClues,
      [key]: digit,
      discoveredFrameIds: [
        ...this.actOneRadioClues.discoveredFrameIds,
        frameId,
      ],
    };
    this.notify();
    return true;
  }

  getSaveState() {
    return {
      flags: this.getFlags(),
      items: this.getItems(),
      activeItemId: this.activeItemId,
      seenInteractions: this.getSeenInteractions(),
      actOneFrequency: this.actOneFrequency,
      actOneRadioClues: this.getActOneRadioClues(),
      puzzleHints: this.getPuzzleHints(),
    };
  }

  getHintLevel(puzzleId: string) {
    return this.puzzleHints.get(puzzleId) ?? 0;
  }

  revealNextHint(puzzleId: string, hintCount: number) {
    const nextLevel = Math.min(this.getHintLevel(puzzleId) + 1, hintCount);
    this.puzzleHints.set(puzzleId, nextLevel);
    this.notify();
    return nextLevel;
  }

  getPuzzleHints() {
    return Object.fromEntries(this.puzzleHints);
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }
}

export const gameProgress = new GameProgress();
