import { publicAssetPath } from "../../utils/publicAsset";
import type { DialogueDefinition } from "../types/game.types";
import { storyDialogues } from "./story/dialogues";

const eviePortrait = publicAssetPath("assets/characters/evie-pixel.png");

export const gameDialogues: Record<string, DialogueDefinition> = {
  ...storyDialogues,
  "evie-intro": {
    id: "evie-intro",
    speaker: "Evie",
    portraitUrl: eviePortrait,
    lines: [
      "Você também ouviu esse zumbido vindo do jardim?",
      "Aquele cristal apagou quando o portão da trilha fechou. Talvez as duas coisas estejam ligadas.",
    ],
    choices: [
      {
        id: "ask-crystal",
        label: "Perguntar sobre o cristal",
        nextDialogueId: "evie-crystal-hint",
      },
      {
        id: "explore",
        label: "Dizer que vai explorar",
        nextDialogueId: "evie-explore",
      },
    ],
  },
  "evie-crystal-hint": {
    id: "evie-crystal-hint",
    speaker: "Evie",
    portraitUrl: eviePortrait,
    lines: [
      "Ele reage quando alguém presta atenção de verdade.",
      "Chegue perto, pressione E e veja se alguma luz responde.",
    ],
    setFlagsAfterEnd: ["talked_to_evie", "heard_crystal_hint"],
  },
  "evie-explore": {
    id: "evie-explore",
    speaker: "Evie",
    portraitUrl: eviePortrait,
    lines: ["Boa. Só não ignore o cristal perto do portão. Ele parece estar esperando por alguém."],
    setFlagsAfterEnd: ["talked_to_evie"],
  },
  "evie-repeat": {
    id: "evie-repeat",
    speaker: "Evie",
    portraitUrl: eviePortrait,
    lines: ["O cristal fica a leste daqui. Se ele despertar, o portão deve responder."],
  },
  "evie-after-crystal": {
    id: "evie-after-crystal",
    speaker: "Evie",
    portraitUrl: eviePortrait,
    lines: [
      "Você conseguiu. A luz atravessou o jardim inteiro.",
      "A trilha está aberta agora. Vá com calma; aquele lugar guarda ecos estranhos.",
    ],
  },
  "crystal-sleeping": {
    id: "crystal-sleeping",
    speaker: "Cristal",
    lines: ["A superfície está fria. Talvez alguém no jardim saiba como acordá-lo."],
  },
  "crystal-ready": {
    id: "crystal-ready",
    speaker: "Cristal",
    lines: [
      "Ao tocar a superfície, uma luz percorre as linhas gravadas no chão.",
      "O portão responde com um estalo distante.",
    ],
    setFlagsAfterEnd: ["awakened_crystal", "unlocked_gate"],
  },
  "crystal-awake": {
    id: "crystal-awake",
    speaker: "Cristal",
    lines: ["A luz pulsa em um ritmo tranquilo. O caminho permanece aberto."],
  },
  "gate-locked": {
    id: "gate-locked",
    speaker: "Portão",
    lines: ["Uma força invisível mantém o portão fechado. O encaixe central tem o formato do cristal."],
  },
  "trail-sign": {
    id: "trail-sign",
    speaker: "Placa antiga",
    lines: [
      "TRILHA DAS LUZES",
      "Alguns caminhos só aparecem depois que você muda alguma coisa no lugar de onde veio.",
    ],
  },
  "sandbox-villager": {
    id: "sandbox-villager",
    speaker: "Morador",
    lines: [
      "Diálogo temporário da vila.",
      "Este espaço poderá receber rotinas, lojas e eventos quando a história for definida.",
    ],
  },
  "sandbox-forest-sign": {
    id: "sandbox-forest-sign",
    speaker: "Placa de madeira",
    lines: ["Área de teste da floresta. As árvores e pedras possuem colisores temporários."],
  },
  "sandbox-shop-counter": {
    id: "sandbox-shop-counter",
    speaker: "Balcão",
    lines: ["Este balcão poderá servir para compras, entregas ou conversas com um lojista."],
  },
  "sandbox-library-book": {
    id: "sandbox-library-book",
    speaker: "Livro sem título",
    lines: ["As páginas estão vazias. Talvez guardem pistas ou registros no futuro."],
  },
  "sandbox-test-chest": {
    id: "sandbox-test-chest",
    speaker: "Baú de teste",
    lines: ["Um objeto estranho. Por enquanto, ele serve apenas para validar interação e colisão."],
  },
};
