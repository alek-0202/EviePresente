import type { GameFlag } from "../../types/game.types";
import type { ProgressNotificationViewModel } from "./story.types";

export const progressNotifications: Partial<
  Record<GameFlag, Omit<ProgressNotificationViewModel, "id">>
> = {
  noticed_disappearance: {
    label: "investigação atualizada",
    title: "Todos desapareceram",
    detail: "As coisas ficaram para trás. O rádio pode ser a única pista ativa.",
    tone: "objective",
  },
  started_magnifier_search: {
    label: "novos cômodos liberados",
    title: "Procure uma ferramenta",
    detail: "A cozinha e o corredor agora podem ser investigados.",
    tone: "area",
  },
  found_magnifying_glass: {
    label: "item obtido",
    title: "Lupa",
    detail: "Abra a mochila com B para equipá-la.",
    tone: "item",
  },
  equipped_magnifying_glass: {
    label: "item ativo",
    title: "Lupa",
    detail: "Quadros com detalhes ocultos voltarão a brilhar.",
    tone: "item",
  },
  discovered_radio_digit_one: {
    label: "número oculto encontrado",
    title: "Quadro I",
    tone: "clue",
  },
  discovered_radio_digit_two: {
    label: "número oculto encontrado",
    title: "Quadro II",
    tone: "clue",
  },
  discovered_radio_digit_three: {
    label: "número oculto encontrado",
    title: "Quadro III",
    tone: "clue",
  },
  discovered_radio_frequency: {
    label: "frequência descoberta",
    title: "As marcas I, II e III definem a ordem",
    tone: "transmission",
  },
  inspected_fireplace: {
    label: "objeto examinado",
    title: "A moldura possui riscos minúsculos",
    detail: "Uma ferramenta de aumento pode revelar mais.",
    tone: "clue",
  },
  heard_caio_signal: {
    label: "transmissão registrada",
    title: "Sinal de Caio estabilizado",
    detail: "A mensagem foi adicionada ao diário.",
    tone: "transmission",
  },
  found_photo_fragment_bedroom: {
    label: "nova pista",
    title: "Fotografia do quarto",
    tone: "clue",
  },
  found_photo_fragment_living: {
    label: "nova pista",
    title: "Fotografia da sala",
    tone: "clue",
  },
  found_photo_fragment_kitchen: {
    label: "nova pista",
    title: "Fotografia da cozinha",
    tone: "clue",
  },
  unlocked_basement: {
    label: "nova área liberada",
    title: "Porão",
    detail: "A passagem automática agora está aberta.",
    tone: "area",
  },
  inspected_basement_photo: {
    label: "nova pista",
    title: "Fotografia do porão",
    tone: "clue",
  },
  inspected_basement_cards: {
    label: "nova pista",
    title: "Cartões fora de ordem",
    tone: "clue",
  },
  traced_caio_signal: {
    label: "pista conectada",
    title: "O gravador prende o sinal de Caio",
    tone: "clue",
  },
  rescued_caio: {
    label: "amigo resgatado",
    title: "Caio",
    tone: "rescue",
  },
  found_tunnel: {
    label: "nova área liberada",
    title: "Túnel desmoronado",
    tone: "area",
  },
};
