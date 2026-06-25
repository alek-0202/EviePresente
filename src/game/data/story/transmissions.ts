import type { StoryTransmissionDefinition } from "./story.types";

export const storyTransmissions: Record<string, StoryTransmissionDefinition> = {
  "caio-first-signal": {
    id: "caio-first-signal",
    frequency: 98.5,
    speaker: "Caio",
    rawText:
      "Se você está ouvindo isso, não são oito da manhã. São três da madrugada. Eles não saíram. Siga as fotos. Porão.",
    distortedText:
      "Se... ouvindo... não são oito... três da... eles não... fotos... porão...",
    decodedText:
      "Se você está ouvindo isso, não são oito da manhã. São três da madrugada. Eles não saíram. Eles foram levados. Encontre as fotos. Porão. Siga as fotos.",
    requiredFlags: [
      "examined_radio",
      "found_magnifying_glass",
      "equipped_magnifying_glass",
      "discovered_radio_frequency",
    ],
    unlockFlags: ["heard_caio_signal", "solved_radio_dial_caio"],
    relatedPuzzleId: "radio-dial-caio",
    hintLevel: 0,
  },
  "gabriela-rubble-signal": {
    id: "gabriela-rubble-signal",
    frequency: 104.2,
    speaker: "Gabriela",
    rawText: "Tem alguma coisa atrás da parede. Não encosta na viga da esquerda.",
    distortedText: "...coisa atrás... parede... viga... esquerda...",
    decodedText: "Tem alguma coisa atrás da parede. Não encosta na viga da esquerda.",
    requiredFlags: ["rescued_caio"],
    unlockFlags: [],
    relatedPuzzleId: "basement-memory-reconstruction",
    hintLevel: 0,
  },
};
