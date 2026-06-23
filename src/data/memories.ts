export type MemoryType = "clip" | "moment" | "photo" | "stream";

export type Memory = {
  id: string;
  title: string;
  description: string;
  clipUrl?: string;
  isEmbeddable?: boolean;
  type: MemoryType;
  optionalDate?: string;
  optionalEmoji?: string;
};

export const memories: Memory[] = [
  {
    id: "speedy-callous-swallow",
    title: "U hépi",
    description: "Death in Unison, 12 segundos. Um daqueles registros curtinhos que já chegam com energia de clip clássico.",
    clipUrl: "https://www.twitch.tv/eviehz/clip/SpeedyCallousSwallowKreygasm-1x-5h2k9qPDsJ5rj",
    type: "clip",
    optionalDate: "22/02/2026",
    optionalEmoji: "CAM",
  },
  {
    id: "sneaky-faithful-woodcock",
    title: "Sobrou nada pra Moira betinha",
    description: "Overwatch, 18 segundos. O tipo de momento em que a live resolve virar highlight sem pedir licença.",
    clipUrl:
      "https://www.twitch.tv/eviehz/clip/SneakyFaithfulWoodcockRickroll-9MJ-i-HKf9xr1S-x?filter=clips&range=all",
    type: "clip",
    optionalDate: "18/04/2026",
    optionalEmoji: "PLAY",
  },
  {
    id: "plump-ugly-asparagus",
    title: "A sapatada",
    description: "Sea of Thieves, 6 segundos. Pouco tempo, impacto suficiente para ir para a coleção.",
    clipUrl:
      "https://www.twitch.tv/eviehz/clip/PlumpUglyAsparagusBrokeBack-25QNwlHd6W60Rbf7?filter=clips&range=7d",
    type: "clip",
    optionalDate: "02/05/2026",
    optionalEmoji: "WOW",
  },
  {
    id: "attractive-crispy-shrimp",
    title: "...................",
    description: "Sea of Thieves, 22 segundos. Quando até o título do clipe parece estar processando o que acabou de acontecer.",
    clipUrl: "https://www.twitch.tv/eviehz/clip/AttractiveCrispyShrimpSoonerLater-NositZ1y2LhL1Ip7",
    type: "clip",
    optionalDate: "03/05/2026",
    optionalEmoji: "???",
  },
  {
    id: "eager-smelly-jaguar",
    title: "vingança é um prato que se come EXPLOSIVO",
    description: "PEAK, 11 segundos. Dramático, caótico e com o tempero certo de explosão.",
    clipUrl: "https://www.twitch.tv/eviehz/clip/EagerSmellyJaguarPanicBasket-m3aLeQCXCRzJdjsf",
    type: "clip",
    optionalDate: "13/05/2026",
    optionalEmoji: "BOOM",
  },
  {
    id: "aggressive-moldy-herring",
    title: "Solta o ovo Caio",
    description: "R.E.P.O., 18 segundos. Um pedido simples, uma frase impossível de ignorar.",
    clipUrl: "https://www.twitch.tv/eviehz/clip/AggressiveMoldyHerringTheRinger-mt9awDfF0umGcFft",
    type: "clip",
    optionalDate: "24/05/2026",
    optionalEmoji: "EGG",
  },
  {
    id: "dignified-amazonian-weasel",
    title: "A Siri não gostou muito",
    description: "Once Human, 17 segundos. Tecnologia, caos e julgamento em forma de clipe.",
    clipUrl: "https://www.twitch.tv/eviehz/clip/DignifiedAmazonianWeaselDancingBanana-5uAtIOSPjlF20Kwz",
    type: "clip",
    optionalDate: "27/05/2026",
    optionalEmoji: "SFX",
  },
  {
    id: "clear-splendid-cod",
    title: "Celeiro cocô",
    description: "Once Human, 28 segundos. Nome forte, energia inexplicável, memória preservada.",
    clipUrl: "https://www.twitch.tv/eviehz/clip/ClearSplendidCodPermaSmug-SeWfbqX9V6pBo7PM",
    type: "clip",
    optionalDate: "27/05/2026",
    optionalEmoji: "CRT",
  },
  {
    id: "crunchy-venomous-oil",
    title: "Caio e a vida no copo",
    description: "VALORANT, 22 segundos. Um pequeno retrato da live em estado concentrado.",
    clipUrl: "https://www.twitch.tv/eviehz/clip/CrunchyVenomousOilNerfRedBlaster-C9LFI6KHEFuwxuey",
    type: "clip",
    optionalDate: "06/06/2026",
    optionalEmoji: "LIVE",
  },
];
