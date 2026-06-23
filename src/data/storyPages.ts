export type StoryMood = "calm" | "dramatic" | "mysterious" | "triumphant" | "comic";

export type StoryPageData = {
  id: string;
  title: string;
  text: string;
  optionalEmoji?: string;
  backgroundMood: StoryMood;
  isPunchline?: boolean;
};

export const storyPages: StoryPageData[] = [
  {
    id: "mission",
    title: "Capítulo 1 - A missão",
    text: "Em uma tarde aparentemente comum, Evie sentiu um chamado ancestral ecoando pela cozinha: a vontade de comer pão.",
    optionalEmoji: "BREAD",
    backgroundMood: "calm",
  },
  {
    id: "empty-kingdom",
    title: "Capítulo 2 - O reino sem pão",
    text: "Ela abriu o armário com esperança. O armário respondeu com silêncio. Nem migalhas. Nem promessa. Nem um pãozinho diplomático.",
    optionalEmoji: "BOX",
    backgroundMood: "dramatic",
  },
  {
    id: "departure",
    title: "Capítulo 3 - A partida",
    text: "Com coragem no peito e fome no inventário, Evie decidiu sair em busca da lendária panificadora mais próxima.",
    optionalEmoji: "MAP",
    backgroundMood: "triumphant",
  },
  {
    id: "red-guardian",
    title: "Capítulo 4 - O guardião vermelho",
    text: "No primeiro cruzamento, um semáforo ficou vermelho por tempo demais. Para qualquer pessoa era só trânsito. Para Evie, era um chefe de fase.",
    optionalEmoji: "STOP",
    backgroundMood: "dramatic",
  },
  {
    id: "dog-judge",
    title: "Capítulo 5 - O julgamento",
    text: "Um cachorro na calçada encarou Evie com a seriedade de quem sabe todos os segredos do bairro. Ela seguiu firme, embora claramente avaliada.",
    optionalEmoji: "DOG",
    backgroundMood: "mysterious",
  },
  {
    id: "lost",
    title: "Capítulo 6 - A curva suspeita",
    text: "Por alguns minutos, Evie desconfiou que a cidade havia trocado as ruas de lugar só para testar sua determinação panificadora.",
    optionalEmoji: "QUEST",
    backgroundMood: "mysterious",
  },
  {
    id: "bakery",
    title: "Capítulo 7 - A dungeon iluminada",
    text: "Então ela viu: uma panificadora brilhando ao longe, quente, dourada, quase celestial. O destino finalmente tinha cheiro de forno.",
    optionalEmoji: "SHOP",
    backgroundMood: "triumphant",
  },
  {
    id: "naes",
    title: "Capítulo 8 - O ápice dos pães",
    text: "Evie respirou fundo, encarou o padeiro e perguntou: “Tem pães?” O padeiro, guardião máximo da farinha, respondeu: “NÃES!!”",
    optionalEmoji: "NAES",
    backgroundMood: "comic",
    isPunchline: true,
  },
];
