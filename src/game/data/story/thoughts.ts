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
    text: "Eu lembro da viagem... mas não lembro de ter chegado aqui.",
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
    requiredFlags: ["noticed_disappearance"],
    excludedFlags: ["examined_radio"],
  },
  "backpacks-missing": {
    id: "backpacks-missing",
    text: "As mochilas ficaram. Então ninguém foi embora por vontade própria.",
    onceFlag: "thought_backpacks_missing",
    duration: 4000,
    requiredFlags: ["inspected_backpacks"],
  },
  "magnifier-found": {
    id: "magnifier-found",
    text: "Talvez isso ajude a enxergar o que todo mundo deixou passar.",
    onceFlag: "thought_magnifier_found",
    duration: 4000,
    requiredFlags: ["found_magnifying_glass"],
  },
  "first-hidden-digit": {
    id: "first-hidden-digit",
    text: "Isso não é sujeira. É um número.",
    onceFlag: "thought_first_hidden_digit",
    duration: 3800,
  },
  "frequency-discovered": {
    id: "frequency-discovered",
    text: "Três números. Três marcas. Isso parece uma frequência.",
    onceFlag: "thought_frequency_discovered",
    duration: 4200,
    requiredFlags: ["discovered_radio_frequency"],
  },
  "signal-solved": {
    id: "signal-solved",
    text: "Caio está falando comigo... mas isso não parece uma gravação normal.",
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
