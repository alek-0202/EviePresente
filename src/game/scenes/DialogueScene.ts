import Phaser from "phaser";
import type { DialogueChoice, DialogueDefinition, GameFlag } from "../types/game.types";
import { getDialogue } from "../systems/dialogueSystem";
import { emitGameEvent, onGameEvent } from "../systems/gameEventBus";
import { gameProgress } from "../systems/flagSystem";
import { publishStoryProgress } from "../systems/storyProgressSystem";

type DialogueKeys = {
  advance: Phaser.Input.Keyboard.Key;
  close: Phaser.Input.Keyboard.Key;
  enter: Phaser.Input.Keyboard.Key;
  interact: Phaser.Input.Keyboard.Key;
  optionOne: Phaser.Input.Keyboard.Key;
  optionTwo: Phaser.Input.Keyboard.Key;
};

export class DialogueScene extends Phaser.Scene {
  private currentDialogue: DialogueDefinition | null = null;
  private lineIndex = 0;
  private showingChoices = false;
  private inputReadyAt = 0;
  private completionFlags: GameFlag[] = [];
  private keys?: DialogueKeys;
  private removeEventListeners: Array<() => void> = [];

  constructor() {
    super("DialogueScene");
  }

  create() {
    this.registry.set("dialogueOpen", false);
    this.keys = this.input.keyboard?.addKeys({
      advance: Phaser.Input.Keyboard.KeyCodes.SPACE,
      close: Phaser.Input.Keyboard.KeyCodes.ESC,
      enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
      interact: Phaser.Input.Keyboard.KeyCodes.E,
      optionOne: Phaser.Input.Keyboard.KeyCodes.ONE,
      optionTwo: Phaser.Input.Keyboard.KeyCodes.TWO,
    }) as DialogueKeys;

    this.removeEventListeners = [
      onGameEvent("dialogue:advance", () => this.advance()),
      onGameEvent("dialogue:choose", (choiceId) => this.choose(choiceId)),
      onGameEvent("dialogue:close", () => this.close(false)),
    ];

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.removeEventListeners.forEach((removeListener) => removeListener());
    });
  }

  update() {
    if (!this.currentDialogue || !this.keys || this.time.now < this.inputReadyAt) {
      return;
    }

    if (Phaser.Input.Keyboard.JustDown(this.keys.close)) {
      this.close(false);
      return;
    }

    if (this.showingChoices) {
      if (Phaser.Input.Keyboard.JustDown(this.keys.optionOne)) {
        this.choose(this.currentDialogue.choices?.[0]?.id ?? "");
      } else if (Phaser.Input.Keyboard.JustDown(this.keys.optionTwo)) {
        this.choose(this.currentDialogue.choices?.[1]?.id ?? "");
      }
      return;
    }

    if (
      Phaser.Input.Keyboard.JustDown(this.keys.advance) ||
      Phaser.Input.Keyboard.JustDown(this.keys.enter) ||
      Phaser.Input.Keyboard.JustDown(this.keys.interact)
    ) {
      this.advance();
    }
  }

  startDialogue(dialogueId: string, completionFlags: GameFlag[] = []) {
    const dialogue = getDialogue(dialogueId);

    if (!dialogue) {
      return;
    }

    this.currentDialogue = dialogue;
    this.lineIndex = 0;
    this.showingChoices = false;
    this.completionFlags = completionFlags;
    this.registry.set("dialogueOpen", true);
    this.inputReadyAt = this.time.now + 180;
    this.publish();
  }

  forceClose() {
    this.close(false);
  }

  private advance() {
    if (!this.currentDialogue) {
      return;
    }

    if (this.lineIndex < this.currentDialogue.lines.length - 1) {
      this.lineIndex += 1;
      this.publish();
      return;
    }

    if (this.currentDialogue.choices?.length) {
      this.showingChoices = true;
      this.publish();
      return;
    }

    this.close(true);
  }

  private choose(choiceId: string) {
    if (!this.currentDialogue || !this.showingChoices) {
      return;
    }

    const choice = this.currentDialogue.choices?.find((item) => item.id === choiceId);

    if (!choice) {
      return;
    }

    const addedFlags = [
      ...gameProgress.addFlags(choice.setFlags),
      ...gameProgress.addFlags(this.currentDialogue.setFlagsAfterEnd),
    ];
    this.publishAbilityUnlocks(addedFlags);

    if (choice.nextDialogueId) {
      const pendingFlags = this.completionFlags;
      const nextDialogue = getDialogue(choice.nextDialogueId);

      if (nextDialogue) {
        this.currentDialogue = nextDialogue;
        this.lineIndex = 0;
        this.showingChoices = false;
        this.completionFlags = pendingFlags;
        this.inputReadyAt = this.time.now + 150;
        this.publish();
        return;
      }
    }

    this.close(true);
  }

  private close(applyProgress: boolean) {
    if (!this.currentDialogue) {
      return;
    }

    if (applyProgress) {
      const addedFlags = [
        ...gameProgress.addFlags(this.currentDialogue.setFlagsAfterEnd),
        ...gameProgress.addFlags(this.completionFlags),
      ];
      this.publishAbilityUnlocks(addedFlags);
    }

    this.currentDialogue = null;
    this.lineIndex = 0;
    this.showingChoices = false;
    this.completionFlags = [];
    this.registry.set("dialogueOpen", false);
    emitGameEvent("dialogue:closed", undefined);
  }

  private publish() {
    if (!this.currentDialogue) {
      return;
    }

    const choices: DialogueChoice[] = this.showingChoices
      ? (this.currentDialogue.choices ?? [])
      : [];

    emitGameEvent("dialogue:changed", {
      isOpen: true,
      speaker: this.currentDialogue.speaker,
      portraitUrl: this.currentDialogue.portraitUrl,
      line: this.currentDialogue.lines[this.lineIndex] ?? "",
      lineIndex: this.lineIndex,
      lineCount: this.currentDialogue.lines.length,
      choices,
    });
  }

  private publishAbilityUnlocks(flags: GameFlag[]) {
    publishStoryProgress(flags);
  }
}
