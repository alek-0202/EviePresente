import { initialGameFlags } from "../data/gameFlags";
import type { GameFlag, GameSaveData } from "../types/game.types";

class GameProgress {
  private flags = new Set<GameFlag>(initialGameFlags);
  private items = new Set<string>();
  private puzzleHints = new Map<string, number>();
  private listeners = new Set<() => void>();

  hydrate(save: GameSaveData) {
    this.flags = new Set(save.flags);
    this.items = new Set(save.items);
    this.puzzleHints = new Map(Object.entries(save.puzzleHints));
    this.notify();
  }

  reset() {
    this.flags = new Set(initialGameFlags);
    this.items.clear();
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

  getFlags() {
    return Array.from(this.flags);
  }

  getItems() {
    return Array.from(this.items);
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
