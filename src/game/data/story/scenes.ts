import type { StorySceneTrigger } from "./story.types";

export const storySceneTriggers: StorySceneTrigger[] = [
  {
    id: "act1-awakening",
    mapId: "bedroom",
    dialogueId: "act1-awakening",
    excludedFlags: ["started_last_transmission"],
    setFlagsOnTrigger: ["started_last_transmission"],
    delayMs: 2900,
  },
  {
    id: "act2-tunnel-found",
    mapId: "basement",
    dialogueId: "act2-tunnel-preview",
    requiredFlags: ["rescued_caio", "found_tunnel"],
    excludedFlags: ["viewed_act2_preview"],
    setFlagsOnTrigger: ["viewed_act2_preview"],
    delayMs: 450,
  },
];
