import type { StoryItemDefinition } from "./story.types";

export const storyItems: StoryItemDefinition[] = [
  {
    id: "bedroom-photo",
    name: "Foto do quarto",
    description: "Três pessoas ainda aparecem no reflexo da janela.",
    acquiredWithFlag: "found_photo_fragment_bedroom",
    category: "clue",
  },
  {
    id: "living-room-photo",
    name: "Foto da sala",
    description: "Só uma silhueta ficou nítida ao lado do rádio.",
    acquiredWithFlag: "found_photo_fragment_living",
    category: "clue",
  },
  {
    id: "kitchen-photo",
    name: "Foto da cozinha",
    description: "Quatro copos estão alinhados, embora dez pessoas tenham viajado.",
    acquiredWithFlag: "found_photo_fragment_kitchen",
    category: "clue",
  },
  {
    id: "old-radio",
    name: "Rádio antigo",
    description: "Capta sinais que parecem ter sido gravados em outro momento.",
    acquiredWithFlag: "examined_radio",
    category: "equipment",
  },
  {
    id: "basement-broken-photo",
    name: "Fotografia quebrada do porão",
    description: "Mostra uma estante desaparecida e um relógio correndo para trás.",
    acquiredWithFlag: "inspected_basement_photo",
    category: "clue",
  },
  {
    id: "basement-card-sequence",
    name: "Cartões fora de ordem",
    description: "As bordas apontam para o gravador que mantém a cena em repetição.",
    acquiredWithFlag: "inspected_basement_cards",
    category: "clue",
  },
  {
    id: "caio-recorder",
    name: "Gravador de Caio",
    description: "Repete a frequência descoberta e ancora a sombra de Caio no loop.",
    acquiredWithFlag: "traced_caio_signal",
    category: "key-item",
  },
];
