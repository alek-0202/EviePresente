import type { GameFlag } from "../../types/game.types";

export const actOneFlags = [
  "started_last_transmission",
  "examined_radio",
  "heard_caio_signal",
  "solved_radio_dial_caio",
  "found_photo_fragment_bedroom",
  "found_photo_fragment_living",
  "found_photo_fragment_kitchen",
  "unlocked_basement",
  "inspected_basement_photo",
  "inspected_basement_cards",
  "traced_caio_signal",
  "rescued_caio",
  "unlocked_memory_reconstruction",
  "act1_complete",
] satisfies GameFlag[];

export const rescueFlags = [
  "rescued_caio",
  "rescued_gabriela",
  "rescued_nabinho",
  "rescued_evie",
  "rescued_alex",
  "rescued_dix",
  "rescued_yuri",
  "rescued_pori",
  "rescued_crita",
  "found_dioguinho",
] satisfies GameFlag[];
