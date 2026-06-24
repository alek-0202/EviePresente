import type { GameFlag } from "../../types/game.types";
import type { ProgressNotificationViewModel } from "./story.types";

export const progressNotifications: Partial<
  Record<GameFlag, Omit<ProgressNotificationViewModel, "id">>
> = {
  inspected_fireplace: {
    label: "nova pista",
    title: "Faixa de frequência descoberta",
    detail: "O quadro aponta para 98 MHz.",
    tone: "clue",
  },
  heard_caio_signal: {
    label: "transmissão registrada",
    title: "Caio · 98.5 MHz",
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
