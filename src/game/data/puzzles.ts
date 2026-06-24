import type { PuzzleDefinition } from "../types/game.types";

export const gamePuzzles: PuzzleDefinition[] = [
  {
    id: "last-transmission-act-one",
    title: "O Despertar Solitário",
    steps: [
      {
        flag: "inspected_backpacks",
        objective: "Examine a cabana e descubra o que foi deixado para trás.",
      },
      {
        flag: "inspected_fireplace",
        objective: "Procure na sala uma pista que limite a frequência do rádio.",
      },
      {
        flag: "examined_radio",
        objective: "Examine o rádio antigo na sala principal.",
      },
      {
        flag: "solved_radio_dial_caio",
        objective: "Ajuste o rádio e limpe a transmissão impossível.",
      },
      {
        flag: "found_photo_fragment_bedroom",
        objective: "Encontre a fotografia escondida no quarto.",
      },
      {
        flag: "found_photo_fragment_living",
        objective: "Compare a fotografia próxima ao rádio.",
      },
      {
        flag: "found_photo_fragment_kitchen",
        objective: "Investigue os copos e a foto na cozinha.",
      },
      {
        flag: "unlocked_basement",
        objective: "Use as três fotografias para abrir o porão.",
      },
      {
        flag: "inspected_basement_photo",
        objective: "Investigue a fotografia quebrada no porão.",
      },
      {
        flag: "inspected_basement_cards",
        objective: "Compare os cartões espalhados com a fotografia.",
      },
      {
        flag: "traced_caio_signal",
        objective: "Rastreie o gravador que mantém Caio preso ao sinal.",
      },
      {
        flag: "rescued_caio",
        objective: "Fale com Caio agora que as três inconsistências foram encontradas.",
      },
      {
        flag: "found_tunnel",
        objective: "Use a memória de Caio na parede leste do porão.",
      },
    ],
    completionFlags: ["found_tunnel"],
  },
];
