export type GameMapId =
  | "bedroom"
  | "living-room"
  | "cabin-kitchen"
  | "cabin-hallway"
  | "basement"
  | "collapsed-tunnel"
  | "village"
  | "forest"
  | "shop"
  | "library"
  | "quiet-garden"
  | "star-trail"
  | "stone-corridor"
  | "empty-test-room";

export type GameDirection = "up" | "down" | "left" | "right";

export type GameFlag =
  | "started_last_transmission"
  | "inspected_empty_bed"
  | "inspected_backpacks"
  | "inspected_cups"
  | "inspected_fireplace"
  | "inspected_card_game"
  | "found_photo_fragment_bedroom"
  | "found_photo_fragment_living"
  | "found_photo_fragment_kitchen"
  | "examined_radio"
  | "heard_caio_signal"
  | "solved_radio_dial_caio"
  | "found_basement_hint"
  | "unlocked_basement"
  | "inspected_basement_photo"
  | "inspected_basement_cards"
  | "traced_caio_signal"
  | "rescued_caio"
  | "unlocked_memory_reconstruction"
  | "act1_complete"
  | "found_tunnel"
  | "viewed_act2_preview"
  | "rescued_gabriela"
  | "unlocked_strength"
  | "heard_nabinho_signal"
  | "detected_edited_transmission"
  | "rescued_nabinho"
  | "unlocked_emotional_echo"
  | "decoded_evie_morse"
  | "rescued_evie"
  | "unlocked_decoding"
  | "rescued_alex"
  | "unlocked_enhanced_hearing"
  | "rescued_dix"
  | "unlocked_tracking"
  | "rescued_yuri"
  | "unlocked_radio_amplification"
  | "rescued_pori"
  | "unlocked_nature_connection"
  | "rescued_crita"
  | "unlocked_external_perspective"
  | "found_dioguinho"
  | "final_sync_started"
  | "loop_resolved"
  | "talked_to_evie"
  | "heard_crystal_hint"
  | "awakened_crystal"
  | "unlocked_gate"
  | "reached_star_trail"
  | "thought_game_start"
  | "thought_radio_near"
  | "thought_signal_solved"
  | "thought_basement_entered"
  | "thought_tunnel_entered"
  | "noticed_disappearance"
  | "started_magnifier_search"
  | "found_magnifying_glass"
  | "equipped_magnifying_glass"
  | "discovered_radio_digit_one"
  | "discovered_radio_digit_two"
  | "discovered_radio_digit_three"
  | "discovered_radio_frequency"
  | "thought_backpacks_missing"
  | "thought_magnifier_found"
  | "thought_first_hidden_digit"
  | "thought_frequency_discovered";

export type GameObjectType = "npc" | "sign" | "door" | "item" | "chest" | "switch" | "portal";

export type TilePosition = {
  x: number;
  y: number;
};

export type CollisionArea = TilePosition & {
  width: number;
  height: number;
  style: "counter" | "hedge" | "stone" | "tree" | "wall" | "water" | "wood";
};

export type MapDecoration = TilePosition & {
  color?: number;
  kind: "flower" | "grass" | "lamp" | "path" | "rug" | "spark";
};

export type GameAssetKey =
  | "biome"
  | "chests"
  | "doors"
  | "fences"
  | "furniture"
  | "grass-tiles"
  | "house"
  | "paths"
  | "plants"
  | "player-sheet"
  | "story-magnifier"
  | "tools"
  | "water-strip"
  | "wood-bridge"
  | "frame-digit-0"
  | "frame-digit-1"
  | "frame-digit-2"
  | "frame-digit-3"
  | "frame-digit-4"
  | "frame-digit-5"
  | "frame-digit-6"
  | "frame-digit-7"
  | "frame-digit-8"
  | "frame-digit-9";

export type MapProp = TilePosition & {
  assetKey: GameAssetKey;
  frame?: number;
  scale?: number;
  depth?: number;
  alpha?: number;
  flipX?: boolean;
  tint?: number;
};

export type GameMapDefinition = {
  id: GameMapId;
  title: string;
  description: string;
  theme: "forest" | "garden" | "indoor" | "mystery" | "test" | "village";
  width: number;
  height: number;
  tileSize: number;
  backgroundColor: number;
  groundColor: number;
  alternateGroundColor: number;
  borderColor: number;
  startPosition: TilePosition;
  collisions: CollisionArea[];
  decorations: MapDecoration[];
  props: MapProp[];
  tiledJsonPath?: string;
};

export type ConditionalDialogueRef = {
  dialogueId: string;
  requiredFlags?: GameFlag[];
  excludedFlags?: GameFlag[];
};

export type NpcDefinition = {
  id: string;
  name: string;
  mapId: GameMapId;
  position: TilePosition;
  spriteKey: string;
  portraitUrl?: string;
  dialogueId: string;
  dialogueVariants?: ConditionalDialogueRef[];
  requiredFlags?: GameFlag[];
  excludedFlags?: GameFlag[];
  setFlagsOnInteraction?: GameFlag[];
  optionalBehavior?: "idle" | "wander" | "look-at-player";
};

export type InteractiveObjectDefinition = {
  id: string;
  name: string;
  mapId: GameMapId;
  position: TilePosition;
  type: Exclude<GameObjectType, "npc">;
  spriteKey: string;
  spriteFrame?: number;
  spriteScale?: number;
  prompt: string;
  interactionMode?: "dialogue" | "keypad" | "radio";
  interactionId?: string;
  dialogueId?: string;
  dialogueVariants?: ConditionalDialogueRef[];
  blockedDialogueId?: string;
  blockedThought?: string;
  requiredFlags?: GameFlag[];
  setFlagsOnInteraction?: GameFlag[];
  visibleWithFlags?: GameFlag[];
  hiddenWithFlags?: GameFlag[];
  targetMapId?: GameMapId;
  targetPosition?: TilePosition;
  triggerRadius?: number;
  collision?: boolean;
  grantsItems?: string[];
  hiddenWhenOwnedItemId?: string;
  hiddenDetail?: HiddenDetailDefinition;
};

export type HiddenDetailDefinition = {
  requiredItemId: string;
  discoveryFlag: GameFlag;
  sequence: 1 | 2 | 3;
  mark: "I" | "II" | "III";
};

export type DialogueChoice = {
  id: string;
  label: string;
  nextDialogueId?: string;
  setFlags?: GameFlag[];
};

export type DialogueDefinition = {
  id: string;
  speaker: string;
  portraitUrl?: string;
  lines: string[];
  choices?: DialogueChoice[];
  conditions?: GameFlag[];
  setFlagsAfterEnd?: GameFlag[];
};

export type PuzzleDefinition = {
  id: string;
  title: string;
  steps: Array<{
    flag: GameFlag;
    objective: string;
  }>;
  completionFlags: GameFlag[];
};

export type ActOneRadioClues = {
  firstDigit?: string;
  secondDigit?: string;
  thirdDigit?: string;
  discoveredFrameIds: string[];
};

export type InventoryItem = {
  id: string;
  name: string;
  description: string;
  iconPath: string;
  usableOn?: string[];
};

export type GameSaveData = {
  version: 3;
  mapId: GameMapId;
  playerPosition: TilePosition;
  flags: GameFlag[];
  items: string[];
  activeItemId: string | null;
  seenInteractions: string[];
  protagonistId: "the-viewer";
  actOneFrequency: number;
  actOneRadioClues: ActOneRadioClues;
  puzzleHints: Record<string, number>;
  updatedAt: string;
};

export type DialogueViewModel = {
  isOpen: boolean;
  speaker: string;
  portraitUrl?: string;
  line: string;
  lineIndex: number;
  lineCount: number;
  choices: DialogueChoice[];
};

export type ClueInspectionViewModel = {
  objectId: string;
  title: string;
  imageUrl: string;
  detail: string;
  mark?: string;
  digit?: string;
};

export type GameStatusViewModel = {
  mapId: GameMapId;
  mapTitle: string;
  objective: string;
  interactionPrompt: string;
};

export type GameRoomDefinition = {
  id: GameMapId;
  name: string;
  description: string;
  startPosition: TilePosition;
};

export type WorldSceneData = {
  mapId?: GameMapId;
  playerPosition?: TilePosition;
  previousMapId?: GameMapId;
};
