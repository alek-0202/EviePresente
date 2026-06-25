import Phaser from "phaser";
import { gameAssets } from "../config/gameAssets";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    gameAssets.forEach((asset) => {
      if (asset.type === "spritesheet") {
        this.load.spritesheet(asset.key, asset.url, {
          frameWidth: asset.frameWidth,
          frameHeight: asset.frameHeight,
        });
        return;
      }

      this.load.image(asset.key, asset.url);
    });
  }

  create() {
    this.createCollisionTexture();
    this.createPlayerAnimations();
    this.createNpcTexture();
    this.createCrystalTextures();
    this.createGateTextures();
    this.createObjectTextures();
    this.createStoryTextures();
    this.scene.start("WorldScene");
  }

  private createCollisionTexture() {
    const graphics = this.make.graphics({ x: 0, y: 0 });
    graphics.fillStyle(0xffffff);
    graphics.fillRect(0, 0, 32, 32);
    graphics.generateTexture("collision-tile", 32, 32);
    graphics.destroy();
  }

  private createPlayerAnimations() {
    const animations = [
      { key: "player-walk-down", start: 0, end: 3 },
      { key: "player-walk-up", start: 4, end: 7 },
      { key: "player-walk-right", start: 12, end: 15 },
      { key: "player-walk-left", start: 8, end: 11 },
    ];

    animations.forEach((animation) => {
      if (this.anims.exists(animation.key)) {
        return;
      }

      this.anims.create({
        key: animation.key,
        frames: this.anims.generateFrameNumbers("player-sheet", {
          start: animation.start,
          end: animation.end,
        }),
        frameRate: 8,
        repeat: -1,
      });
    });
  }

  private createNpcTexture() {
    const graphics = this.make.graphics({ x: 0, y: 0 });
    graphics.fillStyle(0x2b2237);
    graphics.fillRect(2, 3, 24, 27);
    graphics.fillStyle(0xf2c78f);
    graphics.fillRect(7, 5, 14, 12);
    graphics.fillStyle(0x58374f);
    graphics.fillRect(4, 2, 20, 7);
    graphics.fillStyle(0x85ad95);
    graphics.fillRect(5, 17, 18, 12);
    graphics.fillStyle(0xf9e9b9);
    graphics.fillRect(10, 10, 2, 2);
    graphics.fillRect(16, 10, 2, 2);
    graphics.generateTexture("npc-evie", 28, 32);
    graphics.destroy();
  }

  private createCrystalTextures() {
    const states = [
      { key: "crystal-off", outer: 0x51455f, inner: 0x89728f },
      { key: "crystal-on", outer: 0x6ce0c3, inner: 0xffeda8 },
    ];

    states.forEach(({ key, outer, inner }) => {
      const graphics = this.make.graphics({ x: 0, y: 0 });
      graphics.fillStyle(0x201b2d);
      graphics.fillRect(5, 26, 22, 5);
      graphics.fillStyle(outer);
      graphics.fillTriangle(16, 1, 3, 24, 29, 24);
      graphics.fillStyle(inner);
      graphics.fillTriangle(16, 6, 10, 21, 22, 21);
      graphics.generateTexture(key, 32, 32);
      graphics.destroy();
    });
  }

  private createGateTextures() {
    const states = [
      { key: "gate-locked", color: 0x6d4b62, glow: 0x9b6b78 },
      { key: "gate-open", color: 0x6cc8aa, glow: 0xffe3a1 },
    ];

    states.forEach(({ key, color, glow }) => {
      const graphics = this.make.graphics({ x: 0, y: 0 });
      graphics.fillStyle(0x201b2d);
      graphics.fillRect(2, 2, 28, 44);
      graphics.fillStyle(color);
      graphics.fillRect(6, 6, 20, 40);
      graphics.fillStyle(0x201b2d);
      graphics.fillRect(10, 13, 3, 31);
      graphics.fillRect(19, 13, 3, 31);
      graphics.fillStyle(glow);
      graphics.fillRect(12, 7, 8, 5);
      graphics.generateTexture(key, 32, 48);
      graphics.destroy();
    });
  }

  private createObjectTextures() {
    const sign = this.make.graphics({ x: 0, y: 0 });
    sign.fillStyle(0x2a2133);
    sign.fillRect(13, 17, 6, 15);
    sign.fillStyle(0xd2a56f);
    sign.fillRect(2, 3, 28, 18);
    sign.fillStyle(0x6d4b62);
    sign.fillRect(6, 7, 20, 3);
    sign.fillRect(6, 13, 15, 3);
    sign.generateTexture("sign", 32, 32);
    sign.destroy();

    const portal = this.make.graphics({ x: 0, y: 0 });
    portal.fillStyle(0x25213c);
    portal.fillCircle(16, 16, 15);
    portal.fillStyle(0xb18bd1);
    portal.fillCircle(16, 16, 11);
    portal.fillStyle(0x4d416d);
    portal.fillCircle(16, 16, 6);
    portal.generateTexture("portal", 32, 32);
    portal.destroy();
  }

  private createStoryTextures() {
    if (!this.textures.exists("story-magnifier")) {
      const magnifier = this.make.graphics({ x: 0, y: 0 });
      magnifier.lineStyle(5, 0xffdda1, 1);
      magnifier.strokeCircle(13, 13, 8);
      magnifier.lineStyle(5, 0x5d4054, 1);
      magnifier.lineBetween(19, 19, 29, 29);
      magnifier.generateTexture("story-magnifier", 32, 32);
      magnifier.destroy();
    }

    for (let digit = 0; digit <= 9; digit += 1) {
      const key = `frame-digit-${digit}`;
      if (this.textures.exists(key)) {
        continue;
      }
      const frame = this.make.graphics({ x: 0, y: 0 });
      frame.fillStyle(0x2d263b);
      frame.fillRect(1, 2, 30, 28);
      frame.fillStyle(0xd2a56f);
      frame.fillRect(4, 5, 24, 22);
      frame.fillStyle(0x6d4b62);
      frame.fillRect(7, 8, 18, 16);
      frame.generateTexture(key, 32, 32);
      frame.destroy();
    }

    const radio = this.make.graphics({ x: 0, y: 0 });
    radio.fillStyle(0x241d2e);
    radio.fillRect(1, 5, 30, 23);
    radio.fillStyle(0x9b6b78);
    radio.fillRect(4, 8, 24, 17);
    radio.fillStyle(0xf5ca92);
    radio.fillRect(7, 11, 11, 7);
    radio.fillStyle(0x34283e);
    radio.fillCircle(24, 15, 4);
    radio.fillCircle(24, 22, 2);
    radio.generateTexture("story-radio", 32, 32);
    radio.destroy();

    const photo = this.make.graphics({ x: 0, y: 0 });
    photo.fillStyle(0x2d263b);
    photo.fillRect(2, 4, 28, 24);
    photo.fillStyle(0xffe0a2);
    photo.fillRect(5, 7, 22, 18);
    photo.fillStyle(0x8bb1a0);
    photo.fillTriangle(6, 23, 14, 13, 20, 23);
    photo.fillStyle(0xc47a76);
    photo.fillCircle(21, 12, 4);
    photo.generateTexture("story-photo", 32, 32);
    photo.destroy();

    const backpack = this.make.graphics({ x: 0, y: 0 });
    backpack.fillStyle(0x2d263b);
    backpack.fillRoundedRect(5, 7, 22, 23, 4);
    backpack.fillStyle(0x7b5665);
    backpack.fillRoundedRect(8, 10, 16, 17, 3);
    backpack.fillStyle(0xe2ae7d);
    backpack.fillRect(10, 17, 12, 3);
    backpack.generateTexture("story-backpack", 32, 32);
    backpack.destroy();

    const fireplace = this.make.graphics({ x: 0, y: 0 });
    fireplace.fillStyle(0x34283e);
    fireplace.fillRect(2, 3, 28, 28);
    fireplace.fillStyle(0x7a5b54);
    fireplace.fillRect(5, 6, 22, 22);
    fireplace.fillStyle(0x241d2e);
    fireplace.fillRect(9, 14, 14, 14);
    fireplace.fillStyle(0xf0a06f);
    fireplace.fillTriangle(11, 26, 16, 16, 21, 26);
    fireplace.fillStyle(0xffdb86);
    fireplace.fillTriangle(13, 26, 16, 20, 19, 26);
    fireplace.generateTexture("story-fireplace", 32, 32);
    fireplace.destroy();

    const memoryMark = this.make.graphics({ x: 0, y: 0 });
    memoryMark.lineStyle(3, 0xb7acd1, 0.9);
    memoryMark.strokeRect(3, 4, 26, 23);
    memoryMark.lineStyle(2, 0xffdda1, 0.65);
    memoryMark.lineBetween(5, 25, 27, 7);
    memoryMark.generateTexture("story-memory-mark", 32, 32);
    memoryMark.destroy();

    const cards = this.make.graphics({ x: 0, y: 0 });
    cards.fillStyle(0x2d263b);
    cards.fillRect(3, 11, 14, 18);
    cards.fillStyle(0xffe8bc);
    cards.fillRect(5, 9, 14, 18);
    cards.fillStyle(0x7e2d43);
    cards.fillRect(9, 14, 5, 5);
    cards.fillStyle(0xffe8bc);
    cards.fillRect(16, 5, 13, 18);
    cards.fillStyle(0x557f78);
    cards.fillRect(20, 10, 5, 5);
    cards.generateTexture("story-cards", 32, 32);
    cards.destroy();

    const rubble = this.make.graphics({ x: 0, y: 0 });
    rubble.fillStyle(0x25232c);
    rubble.fillTriangle(2, 30, 10, 10, 18, 30);
    rubble.fillStyle(0x55515d);
    rubble.fillTriangle(10, 30, 20, 5, 30, 30);
    rubble.fillStyle(0x81766f);
    rubble.fillRect(2, 13, 31, 5);
    rubble.fillStyle(0x3f383c);
    rubble.fillRect(14, 2, 5, 30);
    rubble.generateTexture("story-rubble", 34, 32);
    rubble.destroy();

    const crack = this.make.graphics({ x: 0, y: 0 });
    crack.lineStyle(3, 0x211d28, 0.8);
    crack.beginPath();
    crack.moveTo(16, 1);
    crack.lineTo(11, 9);
    crack.lineTo(18, 15);
    crack.lineTo(9, 22);
    crack.lineTo(14, 31);
    crack.strokePath();
    crack.lineStyle(2, 0x8b7d77, 0.55);
    crack.lineBetween(18, 15, 28, 11);
    crack.lineBetween(9, 22, 2, 17);
    crack.generateTexture("story-crack", 32, 32);
    crack.destroy();
  }
}
