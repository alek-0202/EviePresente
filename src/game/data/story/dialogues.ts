import { publicAssetPath } from "../../../utils/publicAsset";
import type { DialogueDefinition } from "../../types/game.types";

const caioPortrait = publicAssetPath("assets/avatars/caio.png");
const eviePortrait = publicAssetPath("assets/characters/evie-pixel.png");
const alexPortrait = publicAssetPath("assets/avatars/alex.png");

export const storyDialogues: Record<string, DialogueDefinition> = {
  "act1-awakening": {
    id: "act1-awakening",
    speaker: "Você",
    lines: [
      "A cabana está silenciosa demais. O relógio marca 08:17, mas ainda está escuro lá fora.",
      "As camas estão vazias. Ninguém responde. Na sala, alguma coisa chia entre duas frequências.",
      "Se todo mundo saiu, deixou tudo para trás. Se não saiu... então a cabana ainda guarda uma explicação.",
    ],
  },
  "act1-empty-bed": {
    id: "act1-empty-bed",
    speaker: "Quarto",
    lines: [
      "A cama ao lado ainda está quente. O cobertor foi empurrado para trás às pressas.",
      "No chão, uma foto dobrada mostra três reflexos na janela. Nenhum deles deveria estar ali.",
    ],
    setFlagsAfterEnd: ["inspected_empty_bed", "found_photo_fragment_bedroom"],
  },
  "act1-backpacks": {
    id: "act1-backpacks",
    speaker: "Mochilas",
    lines: [
      "Todas as mochilas ainda estão aqui: documentos, carregadores e casacos.",
      "Ninguém saiu levando nada. Pelo menos não por vontade própria.",
    ],
    setFlagsAfterEnd: ["inspected_backpacks"],
  },
  "act1-cups": {
    id: "act1-cups",
    speaker: "Copos",
    lines: [
      "Dez copos. Alguns ainda guardam marcas de dedo. Isso aconteceu rápido.",
      "Quatro aparecem alinhados exatamente como na fotografia caída ao lado da pia.",
    ],
    setFlagsAfterEnd: ["inspected_cups", "found_photo_fragment_kitchen"],
  },
  "act1-fireplace": {
    id: "act1-fireplace",
    speaker: "Quadro",
    lines: [
      "A moldura está chamuscada e o vidro foi riscado por dentro.",
      "Entre as marcas ainda é possível ler: “98 — não confie no relógio”.",
    ],
    setFlagsAfterEnd: ["inspected_fireplace"],
  },
  "act1-hearth": {
    id: "act1-hearth",
    speaker: "Lareira",
    lines: [
      "As brasas ainda estão quentes. Faz pouco tempo que alguém estava aqui.",
      "A lenha foi largada de qualquer jeito, como se todos tivessem levantado ao mesmo tempo.",
    ],
  },
  "act1-card-game": {
    id: "act1-card-game",
    speaker: "Mesa",
    lines: [
      "A partida ficou pela metade. Cartas boas demais foram abandonadas sobre a mesa.",
      "Quem levantaria no meio disso sem reclamar?",
    ],
    setFlagsAfterEnd: ["inspected_card_game"],
  },
  "act1-living-photo": {
    id: "act1-living-photo",
    speaker: "Fotografia",
    lines: [
      "A foto mostra todos na sala, mas nove rostos foram riscados pela luz.",
      "Uma única silhueta permanece nítida ao lado do rádio. No verso: “o meio é mais limpo”.",
    ],
    setFlagsAfterEnd: ["found_photo_fragment_living"],
  },
  "act1-radio-before": {
    id: "act1-radio-before",
    speaker: "Rádio",
    lines: [
      "O rádio chia como se estivesse procurando uma voz.",
      "O dial se move sozinho por alguns milímetros, mas ainda falta uma faixa por onde começar.",
    ],
    setFlagsAfterEnd: ["examined_radio"],
  },
  "act1-radio-cabin-first": {
    id: "act1-radio-cabin-first",
    speaker: "Você",
    lines: [
      "O rádio está chamando atenção, mas eu ainda nem confirmei se alguém realmente saiu daqui.",
      "As coisas deixadas no quarto podem dizer se isso foi planejado.",
    ],
  },
  "act1-radio-missing-frequency": {
    id: "act1-radio-missing-frequency",
    speaker: "Rádio",
    lines: [
      "A voz desaparece sempre que o dial se afasta de uma faixa muito estreita.",
      "Tentar todas as frequências seria puro acaso. Alguma pista na sala deve indicar por onde começar.",
    ],
  },
  "act1-basement-before-signal": {
    id: "act1-basement-before-signal",
    speaker: "Porta do porão",
    lines: [
      "O teclado pede três dígitos.",
      "Sem uma pista, há combinações demais. O rádio da sala talvez explique por que essa porta importa.",
    ],
  },
  "act1-basement-locked": {
    id: "act1-basement-locked",
    speaker: "Porta do porão",
    lines: [
      "Três espaços piscam no teclado.",
      "As fotos da cabana parecem registrar números em uma ordem específica.",
    ],
    setFlagsAfterEnd: ["found_basement_hint"],
  },
  "act1-basement-missing-photos": {
    id: "act1-basement-missing-photos",
    speaker: "Porta do porão",
    lines: [
      "A transmissão indicou as fotografias, mas a sequência ainda está incompleta.",
      "Há uma pista no quarto, outra na sala e outra na cozinha.",
    ],
  },
  "act1-basement-open": {
    id: "act1-basement-open",
    speaker: "Porta do porão",
    lines: ["O mecanismo destrava. Um ruído de fita rebobinando sobe pela escada."],
  },
  "act1-caio-rescue": {
    id: "act1-caio-rescue",
    speaker: "Caio",
    portraitUrl: caioPortrait,
    lines: [
      "Você demorou. Ou chegou cedo. Eu ainda não decidi qual das duas coisas aconteceu.",
      "Eu ouvi sua voz no rádio antes de você acordar. Depois vi a sala desaparecer quadro por quadro.",
      "As fotos não são só pistas. Elas lembram como os lugares eram antes do loop mexer neles.",
    ],
    choices: [
      {
        id: "ask-others",
        label: "Perguntar pelos outros",
        nextDialogueId: "act1-caio-others",
      },
      {
        id: "ask-loop",
        label: "Perguntar sobre o loop",
        nextDialogueId: "act1-caio-loop",
      },
    ],
  },
  "act1-caio-trapped": {
    id: "act1-caio-trapped",
    speaker: "Caio",
    portraitUrl: caioPortrait,
    lines: [
      "Não chega mais perto. Toda vez que eu tento sair, a cena volta alguns segundos.",
      "A foto, os cartões e aquele gravador estão repetindo versões diferentes deste porão.",
      "Descobre qual parte pertence ao presente. Depois fala comigo.",
    ],
  },
  "act1-basement-photo": {
    id: "act1-basement-photo",
    speaker: "Fotografia quebrada",
    lines: [
      "A imagem mostra Caio diante de uma estante que não existe mais.",
      "No reflexo, o relógio corre para trás e uma passagem aparece na parede leste.",
    ],
    setFlagsAfterEnd: ["inspected_basement_photo"],
  },
  "act1-basement-cards": {
    id: "act1-basement-cards",
    speaker: "Cartões espalhados",
    lines: [
      "Os cartões repetem a mesma sequência da mesa da sala, mas duas cartas trocaram de lugar.",
      "As bordas formam uma seta apontando para o gravador.",
    ],
    setFlagsAfterEnd: ["inspected_basement_cards"],
  },
  "act1-basement-recorder": {
    id: "act1-basement-recorder",
    speaker: "Gravador",
    lines: [
      "A fita não reproduz som. Ela reproduz o ruído exato do rádio em 98.5.",
      "Quando a fita para, a sombra de Caio finalmente acompanha o corpo dele.",
    ],
    setFlagsAfterEnd: ["traced_caio_signal"],
  },
  "act1-caio-others": {
    id: "act1-caio-others",
    speaker: "Caio",
    portraitUrl: caioPortrait,
    lines: [
      "Gabriela estava atrás da parede leste quando tudo mudou. Eu lembro da poeira caindo ao contrário.",
      "Se reconstruirmos o porão como ele era, talvez encontremos a passagem.",
    ],
    setFlagsAfterEnd: [
      "rescued_caio",
      "unlocked_memory_reconstruction",
      "act1_complete",
    ],
  },
  "act1-caio-loop": {
    id: "act1-caio-loop",
    speaker: "Caio",
    portraitUrl: caioPortrait,
    lines: [
      "Não lembro de um loop inteiro. Lembro de várias versões da mesma cena ocupando o mesmo lugar.",
      "A primeira coisa estável é a foto quebrada no canto do porão. Vamos começar por ela.",
    ],
    setFlagsAfterEnd: [
      "rescued_caio",
      "unlocked_memory_reconstruction",
      "act1_complete",
    ],
  },
  "act1-caio-rescued": {
    id: "act1-caio-rescued",
    speaker: "Caio",
    portraitUrl: caioPortrait,
    lines: [
      "A sala não está igual à foto. Uma estante inteira sumiu da parede leste.",
      "Quando quiser continuar, procure o contorno atrás dos escombros.",
    ],
  },
  "act2-memory-mark": {
    id: "act2-memory-mark",
    speaker: "Caio",
    portraitUrl: caioPortrait,
    conditions: ["rescued_caio"],
    lines: [
      "Aqui. A poeira forma um retângulo perfeito, como se uma estante tivesse sido removida depois do desabamento.",
      "Atrás dela existe uma emenda na parede. O túnel ainda está lá.",
    ],
    setFlagsAfterEnd: ["found_tunnel"],
  },
  "act2-tunnel-preview": {
    id: "act2-tunnel-preview",
    speaker: "Caio",
    portraitUrl: caioPortrait,
    lines: [
      "O túnel foi aberto, mas as vigas estão sustentando umas às outras na ordem errada.",
      "Gabriela está do outro lado. Esta parte será o próximo resgate.",
    ],
  },
  "act2-rubble-block": {
    id: "act2-rubble-block",
    speaker: "Túnel",
    lines: [
      "As vigas sustentam o desabamento umas às outras. Puxar a peça errada fecharia a passagem.",
      "A voz de Gabriela vem do outro lado, mas este obstáculo precisa de um puzzle próprio.",
    ],
  },
  "act2-tunnel-crack": {
    id: "act2-tunnel-crack",
    speaker: "Parede do túnel",
    lines: [
      "A rachadura é recente, mas a poeira dentro dela parece antiga.",
      "O loop não está apenas repetindo o lugar. Está empilhando idades diferentes da mesma parede.",
    ],
  },
  "story-puzzle-not-ready": {
    id: "story-puzzle-not-ready",
    speaker: "Investigação",
    lines: [
      "Ainda falta uma pista ou habilidade essencial para resolver isto.",
      "Revise o diário e conclua o objetivo atual antes de continuar.",
    ],
  },
  "story-area-locked": {
    id: "story-area-locked",
    speaker: "Passagem",
    lines: [
      "Esta rota ainda não existe de forma estável.",
      "O objetivo atual precisa ser concluído antes que a próxima área seja liberada.",
    ],
  },
  "evie-alex-future-banter": {
    id: "evie-alex-future-banter",
    speaker: "Evie",
    portraitUrl: eviePortrait,
    lines: [
      "Alex, se você disser “eu acho que” e ficar olhando pro nada de novo, eu juro... moleque de merda.",
      "Alex: Tá bom, guria de bosta, mas dessa vez eu realmente ouvi alguma coisa.",
      "Evie: Você sempre diz isso. E, irritantemente, às vezes está certo.",
    ],
    conditions: ["rescued_evie", "rescued_alex"],
  },
  "alex-evie-future-trust": {
    id: "alex-evie-future-trust",
    speaker: "Alex",
    portraitUrl: alexPortrait,
    lines: [
      "A frequência está escondida sob a cifra dela.",
      "Eu encontro o som, Evie encontra o sentido. Funciona melhor quando nenhum dos dois interrompe o outro.",
    ],
    conditions: ["rescued_evie", "rescued_alex"],
  },
};
