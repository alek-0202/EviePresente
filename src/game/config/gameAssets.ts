import { publicAssetPath } from "../../utils/publicAsset";
import type { GameAssetKey } from "../types/game.types";

type ImageAssetDefinition = {
  key: GameAssetKey;
  type: "image";
  url: string;
};

type SpriteSheetAssetDefinition = {
  key: GameAssetKey;
  type: "spritesheet";
  url: string;
  frameWidth: number;
  frameHeight: number;
};

export type GameAssetDefinition = ImageAssetDefinition | SpriteSheetAssetDefinition;

export const gameAssets: GameAssetDefinition[] = [
  {
    key: "player-sheet",
    type: "spritesheet",
    url: publicAssetPath("assets/characters/Basic Charakter Spritesheet.png"),
    frameWidth: 48,
    frameHeight: 48,
  },
  {
    key: "furniture",
    type: "spritesheet",
    url: publicAssetPath("assets/Objects/Basic_Furniture.png"),
    frameWidth: 16,
    frameHeight: 16,
  },
  {
    key: "biome",
    type: "spritesheet",
    url: publicAssetPath("assets/Objects/Basic_Grass_Biom_things.png"),
    frameWidth: 16,
    frameHeight: 16,
  },
  {
    key: "plants",
    type: "spritesheet",
    url: publicAssetPath("assets/Objects/Basic_Plants.png"),
    frameWidth: 16,
    frameHeight: 16,
  },
  {
    key: "tools",
    type: "spritesheet",
    url: publicAssetPath("assets/Objects/Basic_tools_and_meterials.png"),
    frameWidth: 16,
    frameHeight: 16,
  },
  {
    key: "grass-tiles",
    type: "spritesheet",
    url: publicAssetPath("assets/Tilesets/Grass.png"),
    frameWidth: 16,
    frameHeight: 16,
  },
  {
    key: "fences",
    type: "spritesheet",
    url: publicAssetPath("assets/Tilesets/Fences.png"),
    frameWidth: 16,
    frameHeight: 16,
  },
  {
    key: "doors",
    type: "spritesheet",
    url: publicAssetPath("assets/Tilesets/Doors.png"),
    frameWidth: 16,
    frameHeight: 16,
  },
  {
    key: "chests",
    type: "spritesheet",
    url: publicAssetPath("assets/Objects/Chest.png"),
    frameWidth: 16,
    frameHeight: 16,
  },
  {
    key: "paths",
    type: "spritesheet",
    url: publicAssetPath("assets/Objects/Paths.png"),
    frameWidth: 16,
    frameHeight: 16,
  },
  {
    key: "water-strip",
    type: "image",
    url: publicAssetPath("assets/Tilesets/Water.png"),
  },
  {
    key: "wood-bridge",
    type: "image",
    url: publicAssetPath("assets/Objects/Wood_Bridge.png"),
  },
  {
    key: "house",
    type: "image",
    url: publicAssetPath("assets/Tilesets/Wooden House.png"),
  },
];
