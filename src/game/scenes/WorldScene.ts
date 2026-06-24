import Phaser from "phaser";
import { playerConfig } from "../config/playerConfig";
import { gameMaps } from "../data/maps";
import { gameNpcs } from "../data/npcs";
import { interactiveObjects } from "../data/objects";
import { storyPuzzles } from "../data/story/puzzles";
import { storyRoomIds } from "../data/story/rooms";
import { storyTransmissions } from "../data/story/transmissions";
import type {
  GameDirection,
  GameMapDefinition,
  InteractiveObjectDefinition,
  NpcDefinition,
  TilePosition,
  WorldSceneData,
} from "../types/game.types";
import { resolveDialogueId } from "../systems/dialogueSystem";
import { gameProgress } from "../systems/flagSystem";
import { emitGameEvent, onGameEvent } from "../systems/gameEventBus";
import {
  findFacingInteraction,
  type InteractionCandidate,
} from "../systems/interactionSystem";
import { transitionToMap } from "../systems/mapTransitionSystem";
import { getCurrentObjective } from "../systems/puzzleSystem";
import {
  getPuzzleAccess,
  getRoomAccess,
} from "../systems/progressionSystem";
import { clearSave, createDefaultSave, loadGame, saveGame } from "../systems/saveSystem";
import { getPendingStoryTrigger } from "../systems/storyTriggerSystem";
import {
  getRoomEntryThought,
  showStoryThought,
  showThought,
} from "../systems/thoughtSystem";
import { DialogueScene } from "./DialogueScene";

type MovementKeys = {
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
  up: Phaser.Input.Keyboard.Key;
  interact: Phaser.Input.Keyboard.Key;
  enter: Phaser.Input.Keyboard.Key;
};

type WorldInteractable =
  | { kind: "npc"; value: NpcDefinition }
  | { kind: "object"; value: InteractiveObjectDefinition };

const collisionColors: Record<GameMapDefinition["collisions"][number]["style"], number> = {
  counter: 0x6f4d45,
  hedge: 0x27483f,
  stone: 0x4b4a5e,
  tree: 0x24483a,
  wall: 0x463549,
  water: 0x31546e,
  wood: 0x765846,
};

export class WorldScene extends Phaser.Scene {
  private mapDefinition!: GameMapDefinition;
  private player!: Phaser.Physics.Arcade.Sprite;
  private movementKeys?: MovementKeys;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private facing: GameDirection = "down";
  private interactables: Array<InteractionCandidate<WorldInteractable>> = [];
  private automaticTransitions: Array<
    InteractionCandidate<InteractiveObjectDefinition>
  > = [];
  private objectSprites = new Map<string, Phaser.GameObjects.Image>();
  private interactionMarkers = new Map<string, Phaser.GameObjects.Container>();
  private interactionGlows = new Map<string, Phaser.GameObjects.Ellipse>();
  private doorLabels = new Map<string, Phaser.GameObjects.Text>();
  private activeInteraction?: InteractionCandidate<WorldInteractable>;
  private virtualDirection: GameDirection | null = null;
  private virtualInteractRequested = false;
  private isTransitioning = false;
  private rescuedCaioAtSceneStart = false;
  private foundTunnelAtSceneStart = false;
  private activeAutomaticTransitionId?: string;
  private entryGuardTargetMapId?: GameMapDefinition["id"];
  private suppressAutomaticTransitionsUntilClear = false;
  private removeEventListeners: Array<() => void> = [];

  constructor() {
    super("WorldScene");
  }

  create(data: WorldSceneData) {
    this.interactables = [];
    this.automaticTransitions = [];
    this.objectSprites.clear();
    this.interactionMarkers.clear();
    this.interactionGlows.clear();
    this.doorLabels.clear();
    this.activeInteraction = undefined;
    this.virtualDirection = null;
    this.virtualInteractRequested = false;
    this.isTransitioning = false;
    this.activeAutomaticTransitionId = undefined;
    this.entryGuardTargetMapId = data.previousMapId;
    this.suppressAutomaticTransitionsUntilClear = !data.mapId;
    this.registry.set("storyOverlayOpen", false);

    const savedGame = loadGame();
    gameProgress.hydrate(savedGame);
    this.rescuedCaioAtSceneStart = gameProgress.hasFlag("rescued_caio");
    this.foundTunnelAtSceneStart = gameProgress.hasFlag("found_tunnel");

    const requestedMapId = data.mapId ?? savedGame.mapId;
    const canResumeRequestedMap = getRoomAccess(requestedMapId).allowed;
    const mapId = canResumeRequestedMap ? requestedMapId : "bedroom";
    this.mapDefinition = gameMaps[mapId];
    const startPosition = canResumeRequestedMap
      ? (data.playerPosition ?? savedGame.playerPosition)
      : gameMaps[mapId].startPosition;

    this.physics.world.setBounds(
      0,
      0,
      this.mapDefinition.width * this.mapDefinition.tileSize,
      this.mapDefinition.height * this.mapDefinition.tileSize,
    );

    this.drawMap();
    const collisionGroup = this.createCollisions();
    this.createMapProps();
    const npcGroup = this.createNpcs();
    const objectCollisionGroup = this.createObjects();
    this.createPlayer(startPosition);

    this.physics.add.collider(this.player, collisionGroup);
    this.physics.add.collider(this.player, npcGroup);
    this.physics.add.collider(this.player, objectCollisionGroup);

    this.movementKeys = this.input.keyboard?.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      interact: Phaser.Input.Keyboard.KeyCodes.E,
      enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
    }) as MovementKeys;
    this.cursors = this.input.keyboard?.createCursorKeys();

    if (!this.scene.isActive("DialogueScene")) {
      this.scene.launch("DialogueScene");
    }

    this.removeEventListeners = [
      onGameEvent("dialogue:closed", () => this.handleDialogueClosed()),
      onGameEvent("game:reset", () => this.resetGame()),
      onGameEvent("game:interact", () => {
        this.virtualInteractRequested = true;
      }),
      onGameEvent("game:move-start", (direction) => {
        this.virtualDirection = direction;
      }),
      onGameEvent("game:move-stop", () => {
        this.virtualDirection = null;
      }),
      onGameEvent("radio:close", () => this.closeStoryOverlay()),
      onGameEvent("keypad:close", () => {
        this.activeAutomaticTransitionId = undefined;
        this.closeStoryOverlay();
      }),
      onGameEvent("journal:changed", (isOpen) => {
        this.registry.set("storyOverlayOpen", isOpen);
        this.player?.setVelocity(0);
      }),
      onGameEvent("map:changed", (isOpen) => {
        this.registry.set("storyOverlayOpen", isOpen);
        this.player?.setVelocity(0);
      }),
    ];

    this.time.addEvent({
      delay: 1800,
      loop: true,
      callback: () => this.persistCurrentPosition(),
    });

    this.cameras.main.fadeIn(260, 20, 15, 32);
    this.publishStatus("");
    this.scheduleRoomThought();
    this.scheduleStoryTrigger();

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.removeEventListeners.forEach((removeListener) => removeListener());
      if (!this.isTransitioning) {
        this.persistCurrentPosition();
      }
    });
  }

  update() {
    if (!this.player || this.isTransitioning) {
      return;
    }

    const dialogueOpen = Boolean(this.registry.get("dialogueOpen"));
    const storyOverlayOpen = Boolean(this.registry.get("storyOverlayOpen"));

    if (dialogueOpen || storyOverlayOpen) {
      this.player.setVelocity(0);
      this.player.anims.stop();
      return;
    }

    this.updateMovement();
    this.updateAutomaticTransitions();
    if (this.isTransitioning) {
      return;
    }
    this.updateInteraction();

    const keyboardInteract =
      Boolean(this.movementKeys) &&
      (Phaser.Input.Keyboard.JustDown(this.movementKeys!.interact) ||
        Phaser.Input.Keyboard.JustDown(this.movementKeys!.enter));

    if (keyboardInteract || this.virtualInteractRequested) {
      this.virtualInteractRequested = false;
      this.interact();
    }
  }

  private drawMap() {
    const { tileSize, width, height } = this.mapDefinition;
    this.cameras.main.setBackgroundColor(this.mapDefinition.backgroundColor);

    const graphics = this.add.graphics();
    this.drawBaseFloor(graphics);

    this.drawThemeDetails(graphics);
    this.drawCollisionVisuals(graphics);

    this.mapDefinition.decorations.forEach((decoration) => {
      const centerX = (decoration.x + 0.5) * tileSize;
      const centerY = (decoration.y + 0.5) * tileSize;

      if (decoration.kind === "path") {
        graphics.fillStyle(0x796f6a, 0.7);
        graphics.fillRect(decoration.x * tileSize, decoration.y * tileSize, tileSize, tileSize);
      } else if (decoration.kind === "rug") {
        graphics.fillStyle(decoration.color ?? 0x8c5e72, 0.9);
        graphics.fillRect(
          decoration.x * tileSize,
          decoration.y * tileSize,
          tileSize,
          tileSize,
        );
        graphics.lineStyle(2, 0xf0c58e, 0.35);
        graphics.strokeRect(
          decoration.x * tileSize + 3,
          decoration.y * tileSize + 3,
          tileSize - 6,
          tileSize - 6,
        );
      } else if (decoration.kind === "flower") {
        graphics.fillStyle(decoration.color ?? 0xf4c485);
        graphics.fillRect(centerX - 4, centerY - 4, 8, 8);
        graphics.fillStyle(0x82ad79);
        graphics.fillRect(centerX - 1, centerY + 4, 3, 8);
      } else if (decoration.kind === "lamp") {
        graphics.fillStyle(0xffdfa0);
        graphics.fillRect(centerX - 6, centerY - 12, 12, 12);
        graphics.fillStyle(0x3a3048);
        graphics.fillRect(centerX - 2, centerY, 4, 14);
      } else if (decoration.kind === "spark") {
        graphics.fillStyle(decoration.color ?? 0xcbb29e, 0.45);
        graphics.fillRect(centerX - 5, centerY + 2, 3, 2);
        graphics.fillRect(centerX + 3, centerY - 4, 2, 2);
        graphics.fillRect(centerX + 6, centerY + 5, 2, 3);
      } else {
        graphics.fillStyle(0x2e5248);
        graphics.fillRect(centerX - 2, centerY - 7, 4, 14);
        graphics.fillRect(centerX - 7, centerY - 2, 14, 4);
      }
    });
  }

  private drawBaseFloor(graphics: Phaser.GameObjects.Graphics) {
    const {
      alternateGroundColor,
      borderColor,
      groundColor,
      height,
      theme,
      tileSize,
      width,
    } = this.mapDefinition;
    const worldWidth = width * tileSize;
    const worldHeight = height * tileSize;

    if (theme === "indoor") {
      graphics.fillStyle(groundColor);
      graphics.fillRect(0, 0, worldWidth, worldHeight);

      const plankHeight = tileSize / 2;
      for (let row = 0; row < height * 2; row += 1) {
        const y = row * plankHeight;
        const rowColor = row % 3 === 0 ? alternateGroundColor : groundColor;
        graphics.fillStyle(rowColor, row % 3 === 0 ? 0.34 : 0.16);
        graphics.fillRect(0, y, worldWidth, plankHeight);
        graphics.lineStyle(1, borderColor, 0.26);
        graphics.lineBetween(0, y, worldWidth, y);

        const seamOffset = row % 2 === 0 ? 0 : tileSize;
        for (let x = seamOffset; x < worldWidth; x += tileSize * 2) {
          graphics.lineStyle(1, borderColor, 0.2);
          graphics.lineBetween(x, y, x, y + plankHeight);
        }
      }

      for (let y = tileSize; y < worldHeight - tileSize; y += tileSize * 3) {
        for (let x = tileSize * 2; x < worldWidth - tileSize; x += tileSize * 5) {
          graphics.fillStyle(borderColor, 0.22);
          graphics.fillRect(x + (y % 17), y + 7, 5, 2);
          graphics.fillRect(x + (y % 17) + 2, y + 10, 2, 1);
        }
      }
      return;
    }

    if (theme === "mystery") {
      graphics.fillStyle(groundColor);
      graphics.fillRect(0, 0, worldWidth, worldHeight);

      for (let y = 0; y < height; y += 1) {
        const offset = y % 2 === 0 ? 0 : tileSize;
        for (let x = -offset; x < worldWidth; x += tileSize * 2) {
          graphics.fillStyle(alternateGroundColor, 0.38);
          graphics.fillRect(x, y * tileSize, tileSize * 2, tileSize);
          graphics.lineStyle(1, borderColor, 0.34);
          graphics.strokeRect(x, y * tileSize, tileSize * 2, tileSize);
        }
      }
      return;
    }

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const color = (x + y) % 3 === 0 ? alternateGroundColor : groundColor;
        graphics.fillStyle(color);
        graphics.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }

  private drawThemeDetails(graphics: Phaser.GameObjects.Graphics) {
    const { tileSize, width, height, theme } = this.mapDefinition;

    if (theme === "indoor") {
      graphics.lineStyle(3, 0xe1b17e, 0.08);
      graphics.strokeRect(
        tileSize + 4,
        tileSize + 4,
        (width - 2) * tileSize - 8,
        (height - 2) * tileSize - 8,
      );
      return;
    }

    if (theme === "mystery") {
      graphics.fillStyle(0xffffff, 0.035);
      for (let x = 2; x < width - 1; x += 3) {
        for (let y = 2; y < height - 1; y += 3) {
          graphics.fillRect(x * tileSize + 5, y * tileSize + 7, 3, 3);
        }
      }
      return;
    }

    if (theme === "test") {
      graphics.lineStyle(1, 0xffffff, 0.08);
      for (let x = 0; x <= width; x += 1) {
        graphics.lineBetween(x * tileSize, 0, x * tileSize, height * tileSize);
      }
      for (let y = 0; y <= height; y += 1) {
        graphics.lineBetween(0, y * tileSize, width * tileSize, y * tileSize);
      }
    }
  }

  private drawCollisionVisuals(graphics: Phaser.GameObjects.Graphics) {
    const { tileSize } = this.mapDefinition;

    this.mapDefinition.collisions.forEach((area) => {
      const x = area.x * tileSize;
      const y = area.y * tileSize;
      const width = area.width * tileSize;
      const height = area.height * tileSize;

      if (area.style === "water") {
        this.add
          .tileSprite(x + width / 2, y + height / 2, width, height, "water-strip")
          .setDepth(1)
          .setAlpha(0.92);
        graphics.lineStyle(3, 0x8cc9bd, 0.45);
        graphics.strokeRect(x, y, width, height);
        return;
      }

      const isFurnitureCollision =
        area.style === "wood" || area.style === "counter";
      const fillAlpha =
        area.style === "tree"
          ? 0.72
          : this.mapDefinition.theme === "indoor" && isFurnitureCollision
            ? 0.42
            : this.mapDefinition.theme === "mystery" && area.style === "wood"
              ? 0.5
              : 0.95;
      graphics.fillStyle(collisionColors[area.style], fillAlpha);
      graphics.fillRect(x, y, width, height);

      if (area.style === "wall" || area.style === "wood" || area.style === "counter") {
        graphics.lineStyle(3, 0xe1b17e, 0.22);
        graphics.strokeRect(x + 2, y + 2, width - 4, height - 4);
      } else if (area.style === "hedge" || area.style === "tree") {
        graphics.fillStyle(0x79a866, 0.28);
        graphics.fillRect(x + 4, y + 4, Math.max(0, width - 8), 5);
      } else {
        graphics.lineStyle(2, 0xa5a1b0, 0.2);
        graphics.strokeRect(x + 2, y + 2, width - 4, height - 4);
      }
    });
  }

  private createMapProps() {
    const { tileSize } = this.mapDefinition;

    this.mapDefinition.props.forEach((prop) => {
      const image = this.add.image(
        (prop.x + 0.5) * tileSize,
        (prop.y + 0.5) * tileSize,
        prop.assetKey,
        prop.frame,
      );
      image
        .setDepth(prop.depth ?? 3)
        .setScale(prop.scale ?? 2)
        .setAlpha(prop.alpha ?? 1)
        .setFlipX(prop.flipX ?? false);

      if (prop.tint !== undefined) {
        image.setTint(prop.tint);
      }
    });
  }

  private createCollisions() {
    const group = this.physics.add.staticGroup();
    const { tileSize } = this.mapDefinition;

    this.mapDefinition.collisions.forEach((area) => {
      for (let offsetY = 0; offsetY < area.height; offsetY += 1) {
        for (let offsetX = 0; offsetX < area.width; offsetX += 1) {
          const tile = group
            .create(
              (area.x + offsetX + 0.5) * tileSize,
              (area.y + offsetY + 0.5) * tileSize,
              "collision-tile",
            )
            .setVisible(false) as Phaser.Physics.Arcade.Image;
          tile.refreshBody();
        }
      }
    });

    return group;
  }

  private createNpcs() {
    const group = this.physics.add.staticGroup();
    const { tileSize } = this.mapDefinition;

    gameNpcs
      .filter(
        (npc) =>
          npc.mapId === this.mapDefinition.id &&
          gameProgress.hasAll(npc.requiredFlags) &&
          !gameProgress.hasAny(npc.excludedFlags),
      )
      .forEach((npc) => {
        const position = this.toWorldPosition(npc.position);
        const sprite = group
          .create(position.x, position.y, npc.spriteKey)
          .setDepth(5) as Phaser.Physics.Arcade.Image;
        sprite.refreshBody();
        this.createInteractionVisual(
          npc.id,
          position.x,
          position.y,
          sprite.displayHeight,
          0xffdda1,
        );

        this.interactables.push({
          id: npc.id,
          x: position.x,
          y: position.y,
          data: { kind: "npc", value: npc },
        });
      });

    return group;
  }

  private createObjects() {
    const group = this.physics.add.staticGroup();

    interactiveObjects
      .filter(
        (object) =>
          object.mapId === this.mapDefinition.id &&
          gameProgress.hasAll(object.visibleWithFlags) &&
          !gameProgress.hasAny(object.hiddenWithFlags),
      )
      .forEach((object) => {
        const position = this.toWorldPosition(object.position);
        const texture = this.getObjectTexture(object);
        const staticSprite = object.collision
          ? (group.create(
              position.x,
              position.y,
              texture,
              object.spriteFrame,
            ) as Phaser.Physics.Arcade.Image)
          : null;
        const sprite =
          staticSprite ??
          this.add.image(position.x, position.y, texture, object.spriteFrame);

        sprite.setDepth(4).setScale(object.spriteScale ?? 1);
        staticSprite?.refreshBody();

        this.objectSprites.set(object.id, sprite);
        this.createInteractionVisual(
          object.id,
          position.x,
          position.y,
          sprite.displayHeight,
          this.isAutomaticTransition(object) ? 0x83c5a5 : 0xffdda1,
        );
        if (this.isAutomaticTransition(object)) {
          this.createDoorLabel(object, position);
          this.automaticTransitions.push({
            id: object.id,
            x: position.x,
            y: position.y,
            data: object,
          });
        } else {
          this.interactables.push({
            id: object.id,
            x: position.x,
            y: position.y,
            data: { kind: "object", value: object },
          });
        }
      });

    return group;
  }

  private createInteractionVisual(
    id: string,
    x: number,
    y: number,
    displayHeight: number,
    color: number,
  ) {
    const glowWidth = Phaser.Math.Clamp(displayHeight * 0.75, 24, 54);
    const glow = this.add
      .ellipse(x, y + Math.min(displayHeight * 0.28, 16), glowWidth, 14, color, 0.08)
      .setStrokeStyle(2, color, 0.48)
      .setDepth(3);
    const markerY = Math.max(18, y - displayHeight / 2 - 10);
    const markerBackground = this.add
      .rectangle(0, 0, 14, 14, color, 0.96)
      .setStrokeStyle(2, 0x211a2d, 1);
    const markerText = this.add
      .text(0, -1, "!", {
        color: "#2d263b",
        fontFamily: "monospace",
        fontSize: "11px",
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    const marker = this.add
      .container(x, markerY, [markerBackground, markerText])
      .setDepth(9);

    this.interactionGlows.set(id, glow);
    this.interactionMarkers.set(id, marker);

    this.tweens.add({
      targets: marker,
      y: markerY - 3,
      duration: 650,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: -1,
    });
    this.tweens.add({
      targets: glow,
      alpha: 0.34,
      scaleX: 1.14,
      scaleY: 1.14,
      duration: 900,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: -1,
    });
  }

  private createDoorLabel(
    object: InteractiveObjectDefinition,
    position: { x: number; y: number },
  ) {
    if (!object.targetMapId) {
      return;
    }

    const targetName = gameMaps[object.targetMapId].title;
    let x = position.x;
    let y = position.y;
    const edgePadding = 68;

    if (object.position.y <= 2) {
      y += edgePadding;
    } else if (object.position.y >= this.mapDefinition.height - 3) {
      y -= edgePadding;
    } else if (object.position.x <= 2) {
      x += edgePadding;
      y -= 30;
    } else if (object.position.x >= this.mapDefinition.width - 3) {
      x -= edgePadding;
      y -= 30;
    } else {
      y -= 44;
    }

    const label = this.add
      .text(x, y, targetName, {
        backgroundColor: "#211a2d",
        color: "#fff0cf",
        fontFamily: "monospace",
        fontSize: "9px",
        fontStyle: "bold",
        padding: { x: 5, y: 3 },
      })
      .setOrigin(0.5)
      .setDepth(8)
      .setAlpha(0.84);

    this.doorLabels.set(object.id, label);
  }

  private createPlayer(position: TilePosition) {
    const worldPosition = this.toWorldPosition(position);
    this.player = this.physics.add
      .sprite(
        worldPosition.x,
        worldPosition.y,
        playerConfig.textureKey,
        playerConfig.idleFrames.down,
      )
      .setDepth(8)
      .setScale(playerConfig.scale)
      .setCollideWorldBounds(true);
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.setSize(10, 14);
    body.setOffset(19, 17);
  }

  private updateMovement() {
    if (!this.movementKeys) {
      return;
    }

    const left = this.movementKeys.left.isDown || Boolean(this.cursors?.left.isDown);
    const right = this.movementKeys.right.isDown || Boolean(this.cursors?.right.isDown);
    const up = this.movementKeys.up.isDown || Boolean(this.cursors?.up.isDown);
    const down = this.movementKeys.down.isDown || Boolean(this.cursors?.down.isDown);
    const direction =
      this.virtualDirection ??
      (left ? "left" : right ? "right" : up ? "up" : down ? "down" : null);

    this.player.setVelocity(0);

    if (!direction) {
      this.player.anims.stop();
      this.player.setFrame(playerConfig.idleFrames[this.facing]);
      this.player.setScale(playerConfig.scale);
      return;
    }

    this.facing = direction;
    this.player.play(playerConfig.walkAnimations[direction], true);

    if (direction === "left") {
      this.player.setVelocityX(-playerConfig.speed);
    } else if (direction === "right") {
      this.player.setVelocityX(playerConfig.speed);
    } else if (direction === "up") {
      this.player.setVelocityY(-playerConfig.speed);
    } else {
      this.player.setVelocityY(playerConfig.speed);
    }

    this.player.setScale(
      playerConfig.scale,
      playerConfig.scale * (0.98 + Math.sin(this.time.now / 80) * 0.02),
    );
  }

  private updateInteraction() {
    const nextInteraction = findFacingInteraction(
      this.player,
      this.facing,
      this.interactables,
      playerConfig.interactionDistance,
    );

    if (nextInteraction?.id === this.activeInteraction?.id) {
      return;
    }

    const previousInteractionId = this.activeInteraction?.id;
    this.activeInteraction = nextInteraction;
    this.setInteractionVisualState(previousInteractionId, false);
    this.setInteractionVisualState(nextInteraction?.id, true);
    if (
      nextInteraction?.data.kind === "object" &&
      nextInteraction.data.value.id === "living-radio"
    ) {
      if (showStoryThought("radio-near")) {
        this.persistCurrentPosition();
      }
    }
    const prompt = nextInteraction
      ? `E / Enter: ${
          nextInteraction.data.kind === "npc"
            ? `falar com ${nextInteraction.data.value.name}`
            : nextInteraction.data.value.prompt
        }`
      : "";
    this.publishStatus(prompt);
  }

  private setInteractionVisualState(id: string | undefined, active: boolean) {
    if (!id) {
      return;
    }

    this.interactionMarkers
      .get(id)
      ?.setScale(active ? 1.25 : 1)
      .setAlpha(active ? 1 : 0.88);
    this.interactionGlows
      .get(id)
      ?.setStrokeStyle(active ? 3 : 2, active ? 0xfff0b8 : 0xffdda1, active ? 0.9 : 0.48);
  }

  private interact() {
    if (!this.activeInteraction) {
      return;
    }

    const interaction = this.activeInteraction.data;

    if (interaction.kind === "npc") {
      const npc = interaction.value;
      const dialogueId = resolveDialogueId(npc.dialogueId, npc.dialogueVariants);

      if (dialogueId) {
        this.getDialogueScene().startDialogue(dialogueId, npc.setFlagsOnInteraction);
      }
      return;
    }

    const object = interaction.value;

    if (object.interactionMode === "radio" && object.interactionId) {
      const transmission = storyTransmissions[object.interactionId];
      const access = transmission
        ? getPuzzleAccess(transmission.relatedPuzzleId)
        : {
            allowed: false,
            blockedDialogueId: object.blockedDialogueId,
          };

      if (!access.allowed) {
        const blockedDialogueId =
          access.blockedDialogueId ?? object.blockedDialogueId;
        if (blockedDialogueId) {
          this.getDialogueScene().startDialogue(blockedDialogueId);
        }
        return;
      }

      gameProgress.addFlags(object.setFlagsOnInteraction);
      this.openStoryOverlay();
      emitGameEvent("radio:open", object.interactionId);
      return;
    }

    if (object.targetMapId && object.targetPosition) {
      this.handleTransitionObject(object, false);
      return;
    }

    const dialogueId = resolveDialogueId(object.dialogueId, object.dialogueVariants);

    if (dialogueId) {
      this.getDialogueScene().startDialogue(dialogueId, object.setFlagsOnInteraction);
    }
  }

  private handleDialogueClosed() {
    const rescuedCaioNow = gameProgress.hasFlag("rescued_caio");
    const foundTunnelNow = gameProgress.hasFlag("found_tunnel");
    const basementLayoutChanged =
      this.mapDefinition.id === "basement" &&
      ((!this.rescuedCaioAtSceneStart && rescuedCaioNow) ||
        (!this.foundTunnelAtSceneStart && foundTunnelNow));

    if (basementLayoutChanged) {
      this.rescuedCaioAtSceneStart = rescuedCaioNow;
      this.foundTunnelAtSceneStart = foundTunnelNow;
      const position = {
        x: this.player.x / this.mapDefinition.tileSize - 0.5,
        y: this.player.y / this.mapDefinition.tileSize - 0.5,
      };
      saveGame(this.mapDefinition.id, position);
      this.scene.restart({
        mapId: this.mapDefinition.id,
        playerPosition: position,
      } satisfies WorldSceneData);
      return;
    }

    this.refreshObjectTextures();
    this.persistCurrentPosition();
    this.publishStatus(this.activeInteraction ? this.getPrompt(this.activeInteraction) : "");
  }

  private refreshObjectTextures() {
    interactiveObjects
      .filter((object) => object.mapId === this.mapDefinition.id)
      .forEach((object) => {
        this.objectSprites.get(object.id)?.setTexture(this.getObjectTexture(object));
      });
  }

  private getObjectTexture(object: InteractiveObjectDefinition) {
    if (object.id === "garden-crystal" && gameProgress.hasFlag("awakened_crystal")) {
      return "crystal-on";
    }

    if (object.id === "garden-gate" && gameProgress.hasFlag("unlocked_gate")) {
      return "gate-open";
    }

    if (object.id === "hallway-basement-door" && gameProgress.hasFlag("unlocked_basement")) {
      return "gate-open";
    }

    return object.spriteKey;
  }

  private getPrompt(interaction: InteractionCandidate<WorldInteractable>) {
    return interaction.data.kind === "npc"
      ? `E / Enter: falar com ${interaction.data.value.name}`
      : `E / Enter: ${interaction.data.value.prompt}`;
  }

  private publishStatus(interactionPrompt: string) {
    const objective =
      storyRoomIds.has(this.mapDefinition.id) ||
      this.mapDefinition.id === "quiet-garden" ||
      this.mapDefinition.id === "star-trail"
        ? getCurrentObjective()
        : this.mapDefinition.description;
    const previousObjective = this.registry.get("lastObjective") as
      | string
      | undefined;

    if (previousObjective && previousObjective !== objective) {
      emitGameEvent("progress:notify", {
        id: `objective-${Date.now()}`,
        label: "objetivo atualizado",
        title: objective,
        tone: "objective",
      });
    }
    this.registry.set("lastObjective", objective);

    emitGameEvent("game:status", {
      mapId: this.mapDefinition.id,
      mapTitle: this.mapDefinition.title,
      objective,
      interactionPrompt,
    });
  }

  private persistCurrentPosition() {
    if (!this.player || !this.mapDefinition) {
      return;
    }

    saveGame(this.mapDefinition.id, {
      x: this.player.x / this.mapDefinition.tileSize - 0.5,
      y: this.player.y / this.mapDefinition.tileSize - 0.5,
    });
  }

  private resetGame() {
    this.isTransitioning = true;
    this.getDialogueScene().forceClose();
    clearSave();
    gameProgress.reset();
    this.registry.remove("lastObjective");
    const initialSave = createDefaultSave();
    this.scene.restart({
      mapId: initialSave.mapId,
      playerPosition: initialSave.playerPosition,
    } satisfies WorldSceneData);
  }

  private scheduleStoryTrigger() {
    const trigger = getPendingStoryTrigger(this.mapDefinition.id);

    if (!trigger) {
      return;
    }

    const addedFlags = gameProgress.addFlags(trigger.setFlagsOnTrigger);
    if (addedFlags.length > 0) {
      this.persistCurrentPosition();
    }
    this.time.delayedCall(trigger.delayMs ?? 300, () => {
      if (!Boolean(this.registry.get("storyOverlayOpen"))) {
        this.getDialogueScene().startDialogue(trigger.dialogueId);
      }
    });
  }

  private openStoryOverlay() {
    this.registry.set("storyOverlayOpen", true);
    this.player.setVelocity(0);
    this.player.anims.stop();
  }

  private closeStoryOverlay() {
    this.registry.set("storyOverlayOpen", false);
    this.refreshObjectTextures();
    this.persistCurrentPosition();
    this.publishStatus(this.activeInteraction ? this.getPrompt(this.activeInteraction) : "");
  }

  private updateAutomaticTransitions() {
    if (this.automaticTransitions.length === 0) {
      return;
    }

    const distances = this.automaticTransitions.map((transition) => ({
      transition,
      distance: Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        transition.x,
        transition.y,
      ),
      radius: transition.data.triggerRadius ?? 46,
    }));

    if (this.suppressAutomaticTransitionsUntilClear) {
      const stillInsideTransition = distances.some(
        ({ distance, radius }) => distance <= radius + 18,
      );
      if (stillInsideTransition) {
        return;
      }
      this.suppressAutomaticTransitionsUntilClear = false;
    }

    if (this.entryGuardTargetMapId) {
      const stillInsideEntryDoor = distances.some(
        ({ transition, distance, radius }) =>
          transition.data.targetMapId === this.entryGuardTargetMapId &&
          distance <= radius + 18,
      );
      if (!stillInsideEntryDoor) {
        this.entryGuardTargetMapId = undefined;
      }
    }

    const nearest = distances
      .filter(({ distance, radius }) => distance <= radius)
      .sort((left, right) => left.distance - right.distance)[0];

    if (!nearest) {
      this.activeAutomaticTransitionId = undefined;
      return;
    }

    if (
      nearest.transition.data.targetMapId === this.entryGuardTargetMapId ||
      nearest.transition.id === this.activeAutomaticTransitionId
    ) {
      return;
    }

    this.activeAutomaticTransitionId = nearest.transition.id;
    this.player.setVelocity(0);
    this.player.anims.stop();
    this.handleTransitionObject(nearest.transition.data, true);
  }

  private handleTransitionObject(
    object: InteractiveObjectDefinition,
    automatic: boolean,
  ) {
    if (!object.targetMapId || !object.targetPosition) {
      return;
    }

    if (!gameProgress.hasAll(object.requiredFlags)) {
      if (object.interactionMode === "keypad" && object.interactionId) {
        const puzzle = storyPuzzles[object.interactionId];
        const access = getPuzzleAccess(object.interactionId);

        if (puzzle && access.allowed) {
          gameProgress.addFlags(object.setFlagsOnInteraction);
          this.openStoryOverlay();
          emitGameEvent("keypad:open", object.interactionId);
          return;
        }
      }

      if (automatic) {
        showThought(
          object.blockedThought ??
            "Ainda não encontrei o que preciso para abrir esta passagem.",
          { duration: 3200, id: `blocked-${object.id}` },
        );
      } else if (object.blockedDialogueId) {
        this.getDialogueScene().startDialogue(object.blockedDialogueId);
      }
      return;
    }

    const roomAccess = getRoomAccess(object.targetMapId);
    if (!roomAccess.allowed) {
      if (automatic) {
        showThought(
          object.blockedThought ??
            "Eu preciso entender melhor este lugar antes de seguir por aqui.",
          { duration: 3400, id: `area-blocked-${object.id}` },
        );
      } else if (roomAccess.blockedDialogueId) {
        this.getDialogueScene().startDialogue(roomAccess.blockedDialogueId);
      }
      return;
    }

    gameProgress.addFlags(object.setFlagsOnInteraction);
    this.isTransitioning = true;
    saveGame(object.targetMapId, object.targetPosition);
    transitionToMap(
      this,
      this.mapDefinition.id,
      object.targetMapId,
      object.targetPosition,
    );
  }

  private isAutomaticTransition(object: InteractiveObjectDefinition) {
    return (
      Boolean(object.targetMapId && object.targetPosition) &&
      (object.type === "door" || object.type === "portal")
    );
  }

  private scheduleRoomThought() {
    const thought = getRoomEntryThought(this.mapDefinition.id);

    if (!thought) {
      return;
    }

    this.time.delayedCall(thought.delayMs ?? 350, () => {
      if (showStoryThought(thought.id)) {
        this.persistCurrentPosition();
      }
    });
  }

  private getDialogueScene() {
    return this.scene.get("DialogueScene") as DialogueScene;
  }

  private toWorldPosition(position: TilePosition) {
    return {
      x: (position.x + 0.5) * this.mapDefinition.tileSize,
      y: (position.y + 0.5) * this.mapDefinition.tileSize,
    };
  }
}
