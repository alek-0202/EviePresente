export type BirthdayMessageIcon = "gift" | "moon" | "spark" | "sprout" | "star";

export type BirthdayMessage = {
  id: string;
  author: string;
  message: string;
  avatarUrl?: string;
  optionalTitle?: string;
  optionalEmoji?: BirthdayMessageIcon;
  isFinalMessage?: boolean;
};

export const birthdayMessages: BirthdayMessage[] = [
  {
    id: "dix",
    author: "Dix",
    optionalTitle: "Uma página guardada com carinho",
    avatarUrl: "/assets/avatars/Dix.png",
    optionalEmoji: "star",
    message:
      "Parabéns Ju... Sou eu de novo kkkk\n\nNunca vou me cansar de te falar o quanto vc é uma pessoa incrível e o tamanho da importância que vc tem para as pessoas a sua volta!\n\nVc é foda demais Ju... Tmj até ficarmos idosos caquéticos kkk",
  },
  {
    id: "caio",
    author: "Caio",
    optionalTitle: "Feliz aniversário de novo",
    avatarUrl: "/assets/avatars/caio.png",
    optionalEmoji: "moon",
    message:
      "Evie, feliz aniversário (de novo)! Espero que seu novo ano seja cheio de felicidade, conquistas e muitas lives boas. E que você continue firme na sua missão de vencer seu preconceito com VTubers, mesmo tendo virado uma.\n\nTambém desejo que este seja o ano em que você descubra que existem campeões no LoL além das suas fadinhas e finalmente aprenda a jogar com uns bonecos de macho de verdade.\n\nBrincadeiras à parte, você é uma pessoa incrível e merece tudo de melhor. Aproveite seu presente e tenha um ótimo ano!",
  },
  {
    id: "yuri",
    author: "Yuri",
    optionalTitle: "Mais um ano da Evie",
    avatarUrl: "/assets/avatars/yuri.png",
    optionalEmoji: "sprout",
    message:
      "Evie, parabéns por mais esse ano. Que você conquiste todos seus objetivos.\n\nMais uma vez, obrigado por me receber com carinho em seu grupo de amigos, significa muito pra mim. Tem pães?",
  },
  {
    id: "crita",
    author: "Crita",
    optionalTitle: "A tiny note",
    avatarUrl: "/assets/avatars/crita.png",
    optionalEmoji: "spark",
    message: "Hi evie, thank you for being my friend love ya :3\n\n-Crita",
  },
  {
    id: "alex-final",
    author: "Alex",
    optionalTitle: "Minha mensagem final para Evie",
    avatarUrl: "/assets/avatars/alex.png",
    optionalEmoji: "gift",
    isFinalMessage: true,
    message:
      "Parabéns um pouco atrasado, acabei levando um tempinho pra terminar, enfim, feliz aniversário garota de merda <3",
  },
];
