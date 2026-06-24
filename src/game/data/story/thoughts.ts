import type { GameFlag, GameMapId } from "../../types/game.types";

export type StoryThoughtDefinition = {
  id: string;
  text: string;
  onceFlag?: GameFlag;
  duration?: number;
  mapId?: GameMapId;
  requiredFlags?: GameFlag[];
  excludedFlags?: GameFlag[];
  delayMs?: number;
};

export const storyThoughts: Record<string, StoryThoughtDefinition> = {
  "game-start": {
    id: "game-start",
    text: "Tá... isso definitivamente não parece uma brincadeira.",
    onceFlag: "thought_game_start",
    duration: 4200,
    mapId: "bedroom",
    delayMs: 350,
  },
  "radio-near": {
    id: "radio-near",
    text: "Esse rádio está ligado sozinho?",
    onceFlag: "thought_radio_near",
    duration: 3200,
    requiredFlags: ["inspected_backpacks", "inspected_fireplace"],
    excludedFlags: ["examined_radio"],
  },
  "signal-solved": {
    id: "signal-solved",
    text: "A voz era do Caio. Mas por que parecia gravada no futuro?",
    onceFlag: "thought_signal_solved",
    duration: 4400,
    requiredFlags: ["heard_caio_signal"],
  },
  "basement-entered": {
    id: "basement-entered",
    text: "Caio está aqui, mas alguma coisa neste porão ainda não encaixa.",
    onceFlag: "thought_basement_entered",
    duration: 4200,
    mapId: "basement",
    requiredFlags: ["unlocked_basement"],
    excludedFlags: ["rescued_caio"],
    delayMs: 450,
  },
  "tunnel-entered": {
    id: "tunnel-entered",
    text: "Essas vigas não vão aguentar outra tentativa no escuro.",
    onceFlag: "thought_tunnel_entered",
    duration: 4000,
    mapId: "collapsed-tunnel",
    requiredFlags: ["found_tunnel"],
    delayMs: 450,
  },
};
