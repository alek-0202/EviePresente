import { publicAssetPath } from "../../utils/publicAsset";

export const gameIntroPages = [
  {
    id: "departure",
    imagePath: publicAssetPath("assets/game/intro/intro-01.png"),
    caption: "Naquela sexta-feira, dez amigos deixaram a cidade para trás.",
  },
  {
    id: "road",
    imagePath: publicAssetPath("assets/game/intro/intro-02.png"),
    caption:
      "A cabana ficava longe o suficiente para o sinal falhar, mas perto o bastante para ninguém se preocupar.",
  },
  {
    id: "night",
    imagePath: publicAssetPath("assets/game/intro/intro-03.png"),
    caption:
      "Houve risadas, jogos, copos espalhados e promessas de que ninguém dormiria cedo.",
  },
  {
    id: "three-am",
    imagePath: publicAssetPath("assets/game/intro/intro-04.png"),
    caption: "Às três da manhã, alguma coisa ainda estava acordada.",
  },
  {
    id: "viewer",
    imagePath: publicAssetPath("assets/game/intro/intro-05.png"),
    caption: "E então, alguém abriu os olhos.",
  },
] as const;
