import type { GameFlag, GameMapId, TilePosition } from "../../types/game.types";

export type StoryCharacterId =
  | "caio"
  | "gabriela"
  | "nabinho"
  | "evie"
  | "alex"
  | "dix"
  | "yuri"
  | "pori"
  | "crita"
  | "dioguinho";

export type StoryAbilityId =
  | "memory-reconstruction"
  | "strength"
  | "emotional-echo"
  | "decoding"
  | "enhanced-hearing"
  | "tracking"
  | "radio-amplification"
  | "nature-connection"
  | "external-perspective"
  | "temporal-anchor";

export type StoryCharacterDefinition = {
  id: StoryCharacterId;
  name: string;
  alias?: string;
  abilityId: StoryAbilityId;
  abilityName: string;
  abilityDescription: string;
  rescueFlag: GameFlag;
  unlockFlag: GameFlag;
  portraitUrl?: string;
  language: "en" | "pt-BR";
  personality: string;
};

export type StoryActDefinition = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  summary: string;
  roomIds: GameMapId[];
  rescueCharacterId: StoryCharacterId;
  puzzleIds: string[];
  prerequisiteFlags: GameFlag[];
  completionFlag: GameFlag;
  implementation: "playable" | "prepared";
};

export type StorySceneTrigger = {
  id: string;
  mapId: GameMapId;
  dialogueId: string;
  requiredFlags?: GameFlag[];
  excludedFlags?: GameFlag[];
  setFlagsOnTrigger?: GameFlag[];
  delayMs?: number;
};

export type StoryTransmissionDefinition = {
  id: string;
  frequency: number;
  speaker: string;
  rawText: string;
  distortedText: string;
  decodedText: string;
  requiredFlags: GameFlag[];
  unlockFlags: GameFlag[];
  relatedPuzzleId: string;
  hintLevel: number;
};

export type StoryPuzzleDefinition = {
  id: string;
  actId: string;
  title: string;
  description: string;
  type:
    | "audio-comparison"
    | "code"
    | "environment"
    | "frequency"
    | "morse"
    | "sequence"
    | "spatial-loop";
  requiredFlags: GameFlag[];
  completionFlags: GameFlag[];
  blockedDialogueId?: string;
  blockedDialogueByFlag?: Partial<Record<GameFlag, string>>;
  hints: [string, string, string];
  solution?: {
    code?: string;
    frequency?: number;
    tolerance?: number;
    sequence?: string[];
  };
};

export type StoryItemDefinition = {
  id: string;
  name: string;
  description: string;
  acquiredWithFlag: GameFlag;
  category: "clue" | "equipment" | "key-item";
};

export type JournalEntryDefinition = {
  id: string;
  category: "ability" | "clue" | "friend" | "transmission";
  title: string;
  body: string;
  requiredFlags: GameFlag[];
  characterId?: StoryCharacterId;
};

export type JournalViewModel = {
  abilities: JournalEntryDefinition[];
  clues: JournalEntryDefinition[];
  friends: JournalEntryDefinition[];
  transmissions: JournalEntryDefinition[];
  objective: string;
  unlockedMaps: Array<{
    id: GameMapId;
    name: string;
  }>;
};

export type RadioViewModel = {
  isOpen: boolean;
  transmissionId: string;
  frequency: number;
  signalQuality: number;
  displayText: string;
  solved: boolean;
  hints: string[];
};

export type KeypadViewModel = {
  isOpen: boolean;
  puzzleId: string;
  title: string;
  description: string;
  digits: string;
  error: string;
  hints: string[];
};

export type AbilityUnlockViewModel = {
  abilityName: string;
  characterName: string;
  description: string;
};

export type ThoughtViewModel = {
  id: string;
  text: string;
  duration: number;
};

export type ProgressNotificationViewModel = {
  id: string;
  label: string;
  title: string;
  detail?: string;
  tone:
    | "ability"
    | "area"
    | "clue"
    | "item"
    | "objective"
    | "rescue"
    | "transmission";
};

export type StoryRoomConnection = {
  id: string;
  mapId: GameMapId;
  position: TilePosition;
  targetMapId: GameMapId;
  targetPosition: TilePosition;
};

export type StoryMapNodeDefinition = {
  id: GameMapId;
  x: number;
  y: number;
};

export type StoryMapConnectionDefinition = {
  id: string;
  from: GameMapId;
  to: GameMapId;
};

export type RoomAccessRule = {
  requiredFlags: GameFlag[];
  blockedDialogueId: string;
};
