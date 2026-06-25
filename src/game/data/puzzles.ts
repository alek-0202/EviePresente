import type { PuzzleDefinition } from "../types/game.types";

export const gamePuzzles: PuzzleDefinition[] = [
  {
    id: "last-transmission-act-one",
    title: "O Despertar Solitário",
    steps: [
      {
        flag: "noticed_disappearance",
        objective: "Acorde e examine o quarto e a sala da cabana.",
      },
      {
        flag: "examined_radio",
        objective: "Descubra por que todos desapareceram e investigue o rádio antigo.",
      },
      {
        flag: "found_magnifying_glass",
        objective: "Procure uma lupa nos cômodos liberados da cabana.",
      },
      {
        flag: "equipped_magnifying_glass",
        objective: "Abra a mochila com B e equipe a lupa.",
      },
      {
        flag: "discovered_radio_digit_one",
        objective: "Use a lupa no quadro da estrada, no quarto.",
      },
      {
        flag: "discovered_radio_digit_two",
        objective: "Use a lupa no quadro da cabana, na sala principal.",
      },
      {
        flag: "discovered_radio_digit_three",
        objective: "Use a lupa no quadro da floresta, no corredor.",
      },
      {
        flag: "discovered_radio_frequency",
        objective: "Organize os três números pelas marcas I, II e III.",
      },
      {
        flag: "solved_radio_dial_caio",
        objective: "Ajuste o rádio usando a frequência descoberta.",
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
    ],
    completionFlags: ["rescued_caio"],
  },
  {
    id: "last-transmission-act-two-opening",
    title: "Força Bruta",
    steps: [
      {
        flag: "found_tunnel",
        objective: "Use a memória de Caio na parede leste do porão.",
      },
    ],
    completionFlags: ["found_tunnel"],
  },
];
