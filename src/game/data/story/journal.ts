import { storyCharacters } from "./characters";
import type { JournalEntryDefinition } from "./story.types";

export const journalEntries: JournalEntryDefinition[] = [
  {
    id: "clue-empty-cabin",
    category: "clue",
    title: "A cabana vazia",
    body: "As camas, copos e mochilas indicam que ninguém saiu de forma normal.",
    requiredFlags: ["inspected_backpacks", "inspected_cups"],
  },
  {
    id: "clue-photo-code",
    category: "clue",
    title: "Três fotografias",
    body: "Quarto: 3. Sala: 1. Cozinha: 4. A ordem segue o caminho pela cabana.",
    requiredFlags: [
      "found_photo_fragment_bedroom",
      "found_photo_fragment_living",
      "found_photo_fragment_kitchen",
    ],
  },
  {
    id: "clue-basement",
    category: "clue",
    title: "A porta do porão",
    body: "Caio repetiu 'fotos' e 'porão'. O teclado aceita três dígitos.",
    requiredFlags: ["heard_caio_signal"],
  },
  {
    id: "clue-basement-time",
    category: "clue",
    title: "Três versões do porão",
    body: "A fotografia, os cartões e o gravador registram momentos diferentes ocupando o mesmo espaço.",
    requiredFlags: [
      "inspected_basement_photo",
      "inspected_basement_cards",
      "traced_caio_signal",
    ],
  },
  {
    id: "transmission-caio",
    category: "transmission",
    title: "98.5 — Caio",
    body: "Não são oito da manhã. São três da madrugada. Eles foram levados. Encontre as fotos. Porão.",
    requiredFlags: ["heard_caio_signal"],
    characterId: "caio",
  },
  {
    id: "friend-caio",
    category: "friend",
    title: "Caio resgatado",
    body: storyCharacters.caio.personality,
    requiredFlags: ["rescued_caio"],
    characterId: "caio",
  },
  {
    id: "ability-memory",
    category: "ability",
    title: storyCharacters.caio.abilityName,
    body: storyCharacters.caio.abilityDescription,
    requiredFlags: ["unlocked_memory_reconstruction"],
    characterId: "caio",
  },
];
