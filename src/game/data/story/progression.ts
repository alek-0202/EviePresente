import type {
  GameFlag,
  GameMapId,
} from "../../types/game.types";
import type {
  RoomAccessRule,
  StoryMapConnectionDefinition,
  StoryMapNodeDefinition,
} from "./story.types";

export const roomAccessRules: Partial<Record<GameMapId, RoomAccessRule>> = {
  basement: {
    requiredFlags: ["unlocked_basement"],
    blockedDialogueId: "act1-basement-before-signal",
  },
  "collapsed-tunnel": {
    requiredFlags: ["found_tunnel"],
    blockedDialogueId: "story-area-locked",
  },
  forest: {
    requiredFlags: ["rescued_gabriela"],
    blockedDialogueId: "story-area-locked",
  },
  "quiet-garden": {
    requiredFlags: ["rescued_gabriela"],
    blockedDialogueId: "story-area-locked",
  },
  "star-trail": {
    requiredFlags: ["rescued_nabinho"],
    blockedDialogueId: "story-area-locked",
  },
  "stone-corridor": {
    requiredFlags: ["rescued_evie"],
    blockedDialogueId: "story-area-locked",
  },
  "empty-test-room": {
    requiredFlags: ["rescued_pori"],
    blockedDialogueId: "story-area-locked",
  },
};

export const storyMapNodes: StoryMapNodeDefinition[] = [
  { id: "bedroom", x: 7, y: 22 },
  { id: "living-room", x: 24, y: 22 },
  { id: "cabin-kitchen", x: 24, y: 7 },
  { id: "cabin-hallway", x: 41, y: 22 },
  { id: "basement", x: 41, y: 42 },
  { id: "collapsed-tunnel", x: 54, y: 42 },
  { id: "forest", x: 67, y: 42 },
  { id: "quiet-garden", x: 80, y: 42 },
  { id: "star-trail", x: 90, y: 58 },
  { id: "stone-corridor", x: 78, y: 76 },
  { id: "empty-test-room", x: 62, y: 76 },
  { id: "village", x: 67, y: 20 },
  { id: "shop", x: 82, y: 8 },
  { id: "library", x: 82, y: 22 },
];

export const storyMapConnections: StoryMapConnectionDefinition[] = [
  { id: "bedroom-living", from: "bedroom", to: "living-room" },
  { id: "living-kitchen", from: "living-room", to: "cabin-kitchen" },
  { id: "living-hallway", from: "living-room", to: "cabin-hallway" },
  { id: "hallway-basement", from: "cabin-hallway", to: "basement" },
  { id: "basement-tunnel", from: "basement", to: "collapsed-tunnel" },
  { id: "tunnel-forest", from: "collapsed-tunnel", to: "forest" },
  { id: "forest-garden", from: "forest", to: "quiet-garden" },
  { id: "garden-trail", from: "quiet-garden", to: "star-trail" },
  { id: "trail-corridor", from: "star-trail", to: "stone-corridor" },
  { id: "corridor-center", from: "stone-corridor", to: "empty-test-room" },
  { id: "forest-village", from: "forest", to: "village" },
  { id: "village-shop", from: "village", to: "shop" },
  { id: "village-library", from: "village", to: "library" },
];

export const actProgressionFlags: GameFlag[][] = [
  [],
  ["rescued_caio"],
  ["rescued_gabriela"],
  ["rescued_nabinho"],
  ["rescued_evie"],
  ["rescued_alex"],
  ["rescued_dix"],
  ["rescued_yuri"],
  ["rescued_pori"],
  ["rescued_crita"],
];
