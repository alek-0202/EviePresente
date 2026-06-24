export type StoryMood = "calm" | "dramatic" | "mysterious" | "triumphant" | "comic";

export type StoryChoice = {
  id: string;
  label: string;
  response: string;
  consequence: string;
};

export type StoryCharacter = {
  name: string;
  role: string;
  avatarUrl?: string;
};

export type StoryPageData = {
  id: string;
  sceneLabel: string;
  title: string;
  narration: string;
  prompt: string;
  character: StoryCharacter;
  choices: StoryChoice[];
  optionalEmoji?: string;
  backgroundMood: StoryMood;
  isPunchline?: boolean;
};

export const storyPages: StoryPageData[] = [
  {
    id: "kitchen-call",
    sceneLabel: "Prólogo",
    title: "O chamado do pão",
    narration:
      "A tarde parecia comum, até a cozinha ficar silenciosa demais. Evie abriu o armário e encontrou o vazio absoluto: nenhum pão, nenhuma torrada, nenhuma esperança com manteiga.",
    prompt: "Evie encara o destino e pergunta para si mesma: qual é o primeiro passo da missão?",
    character: {
      name: "Evie",
      role: "protagonista com fome",
      avatarUrl: "/assets/characters/evie-pixel.png",
    },
    choices: [
      {
        id: "accept",
        label: "Aceitar a missão",
        response: "Evie respira fundo e declara que nenhum bairro ficará entre ela e os pães.",
        consequence: "A barra de coragem sobe. A barra de fome também, infelizmente.",
      },
      {
        id: "check-again",
        label: "Conferir o armário de novo",
        response: "Evie verifica o armário pela segunda vez, como se pão pudesse spawnar por insistência.",
        consequence: "Nada aparece. O armário ganha aura de vilão recorrente.",
      },
    ],
    optionalEmoji: "BREAD",
    backgroundMood: "calm",
  },
  {
    id: "dix-warning",
    sceneLabel: "Rua 01",
    title: "O aviso de Dix",
    narration:
      "Antes mesmo de sair, Evie recebe uma mensagem de Dix, como se ele tivesse sentido uma perturbação no campo espiritual da padaria.",
    prompt: "Dix diz: “Ju, se você sair agora, talvez volte diferente. Talvez volte... com pão.”",
    character: {
      name: "Dix",
      role: "oráculo do caos carinhoso",
      avatarUrl: "/assets/avatars/Dix.png",
    },
    choices: [
      {
        id: "dramatic",
        label: "Responder dramaticamente",
        response: "“Se eu não voltar, conte minha história nas lives.”",
        consequence: "Dix aprova o drama e entrega uma bênção: +1 resistência a perrengue.",
      },
      {
        id: "practical",
        label: "Pedir coordenadas",
        response: "“Tá, mas sabe onde tem uma panificadora?”",
        consequence: "Dix manda três áudios, dois memes e nenhuma coordenada objetiva.",
      },
    ],
    optionalEmoji: "MAP",
    backgroundMood: "dramatic",
  },
  {
    id: "caio-vtuber-gate",
    sceneLabel: "Rua 02",
    title: "O portão dos bonecos",
    narration:
      "Na calçada, Caio surge como um NPC de tutorial. Ele aponta para duas ruas: uma normal e outra cheia de placas suspeitas sobre campeões do LoL.",
    prompt:
      "Caio diz: “Evie, para chegar aos pães você precisa escolher: vai pela rota das fadinhas ou pela rota dos bonecos de macho?”",
    character: {
      name: "Caio",
      role: "guardião do tutorial competitivo",
      avatarUrl: "/assets/avatars/caio.png",
    },
    choices: [
      {
        id: "fairies",
        label: "Rota das fadinhas",
        response: "“Eu conheço meus pontos fortes.”",
        consequence: "A rota é confortável, mas aparece uma placa escrito: preconceito com VTuber detectado.",
      },
      {
        id: "macho",
        label: "Rota dos machos",
        response: "“Hoje eu vou surpreender o meta.”",
        consequence: "Caio anota isso como promessa pública e a missão fica oficialmente mais perigosa.",
      },
    ],
    optionalEmoji: "QUEST",
    backgroundMood: "comic",
  },
  {
    id: "yuri-first-question",
    sceneLabel: "Rua 03",
    title: "A pergunta proibida",
    narration:
      "Yuri aparece no caminho com a tranquilidade de quem sabe exatamente qual frase vai assombrar o final dessa história.",
    prompt: "Yuri pergunta, com seriedade absoluta: “Antes de seguir... tem pães?”",
    character: {
      name: "Yuri",
      role: "profeta da frase final",
      avatarUrl: "/assets/avatars/yuri.png",
    },
    choices: [
      {
        id: "not-yet",
        label: "Ainda não",
        response: "“Ainda não. Mas essa pergunta vai render.”",
        consequence: "Yuri sente um arrepio narrativo. Algo foi plantado no roteiro.",
      },
      {
        id: "manifest",
        label: "Manifestar pães",
        response: "“Tem, sim. No meu coração.”",
        consequence: "Bonito, mas não comestível. A fome continua comandando a party.",
      },
    ],
    optionalEmoji: "BREAD",
    backgroundMood: "mysterious",
  },
  {
    id: "crita-checkpoint",
    sceneLabel: "Checkpoint",
    title: "A plaquinha fofa",
    narration:
      "Uma plaquinha pixelada brilha perto de uma esquina. Crita aparece como se fosse uma personagem secreta destravada por amizade.",
    prompt: "Crita diz: “Hi Evie, quest check. Do you need emotional support or chaos support?”",
    character: {
      name: "Crita",
      role: "suporte internacional da jornada",
      avatarUrl: "/assets/avatars/crita.png",
    },
    choices: [
      {
        id: "emotional",
        label: "Emotional support",
        response: "“Apoio emocional, por favor. O armário me traiu.”",
        consequence: "Crita entrega um buff de amizade. A tela fica 12% mais aconchegante.",
      },
      {
        id: "chaos",
        label: "Chaos support",
        response: "“Chaos support. Sempre.”",
        consequence: "Uma lata cai sozinha em algum beco. Ninguém sabe por quê, mas combinou.",
      },
    ],
    optionalEmoji: "STAR",
    backgroundMood: "calm",
  },
  {
    id: "nabinho-inventory",
    sceneLabel: "Inventário",
    title: "O item duvidoso",
    narration:
      "No meio da rua, Nabinho abre uma janelinha de inventário como se aquilo fosse perfeitamente normal em uma terça-feira.",
    prompt: "Nabinho oferece dois itens para a jornada. Só dá para carregar um.",
    character: {
      name: "Nabinho",
      role: "mercador de recursos questionáveis",
      avatarUrl: "/assets/avatars/nabinho.png",
    },
    choices: [
      {
        id: "coin",
        label: "Moeda amassada",
        response: "Evie pega a moeda. Ela tem valor sentimental e talvez monetário.",
        consequence: "Item adquirido: moeda que provavelmente compra um pão francês, se o universo colaborar.",
      },
      {
        id: "crumb",
        label: "Migalha lendária",
        response: "Evie pega a migalha. Ela parece brilhar, mas pode ser só farelo velho.",
        consequence: "Item adquirido: prova científica de que pão existiu em algum momento da história.",
      },
    ],
    optionalEmoji: "BOX",
    backgroundMood: "mysterious",
  },
  {
    id: "pori-map",
    sceneLabel: "Mapa",
    title: "O mapa rabiscado",
    narration:
      "Pori surge com um mapa desenhado em guardanapo. Ele tem ruas, setas, uma caveira pequena e uma anotação dizendo “talvez padaria”.",
    prompt: "Pori pergunta: “Você confia no mapa ou no cheiro imaginário de pão?”",
    character: {
      name: "Pori",
      role: "cartógrafo do guardanapo",
      avatarUrl: "/assets/avatars/pori.png",
    },
    choices: [
      {
        id: "map",
        label: "Confiar no mapa",
        response: "“Todo grande RPG começa com um mapa ruim.”",
        consequence: "Evie segue a seta torta e ganha +1 em fé cartográfica.",
      },
      {
        id: "smell",
        label: "Seguir o cheiro",
        response: "“O nariz sabe coisas que o Google Maps não entende.”",
        consequence: "O cheiro leva até uma pizzaria fechada. Quase pão. Mas não o bastante.",
      },
    ],
    optionalEmoji: "MAP",
    backgroundMood: "triumphant",
  },
  {
    id: "gabriela-sign",
    sceneLabel: "Enigma",
    title: "A placa incompleta",
    narration:
      "Gabriela está parada diante de uma placa antiga. Ela diz “PANI...”, mas o resto está coberto por uma propaganda de curso duvidoso.",
    prompt: "Gabriela pergunta: “Isso é panificadora, panini, pânico ou panfleto?”",
    character: {
      name: "Gabriela",
      role: "decifradora de placas urbanas",
      avatarUrl: "/assets/avatars/gabriela.png",
    },
    choices: [
      {
        id: "panificadora",
        label: "Panificadora",
        response: "“Eu escolho acreditar na forma mais carboidrática da palavra.”",
        consequence: "A placa range dramaticamente. A cidade respeita sua interpretação.",
      },
      {
        id: "panico",
        label: "Pânico",
        response: "“Pânico também combina com sair sem pão.”",
        consequence: "Gabriela concorda. A missão ganha trilha sonora de suspense por sete segundos.",
      },
    ],
    optionalEmoji: "QUEST",
    backgroundMood: "mysterious",
  },
  {
    id: "dioguinho-traffic",
    sceneLabel: "Miniboss",
    title: "O guardião vermelho",
    narration:
      "O semáforo fecha no exato momento em que Evie chega. Dioguinho aparece do outro lado da rua como um NPC preso por barreira invisível.",
    prompt: "Dioguinho grita: “O guardião vermelho só respeita paciência ou teatro. Qual vai ser?”",
    character: {
      name: "Dioguinho",
      role: "sentinela do cruzamento",
      avatarUrl: "/assets/avatars/dioguinho.png",
    },
    choices: [
      {
        id: "patience",
        label: "Esperar com dignidade",
        response: "Evie espera. O vento sopra. Um papel passa. A tensão é absurda para um semáforo.",
        consequence: "O sinal abre. Vitória limpa, sem dano moral.",
      },
      {
        id: "theater",
        label: "Fazer cena épica",
        response: "Evie encara o semáforo como se ele tivesse matado um mentor fictício.",
        consequence: "O sinal abre por vergonha. Dioguinho aplaude de longe.",
      },
    ],
    optionalEmoji: "STOP",
    backgroundMood: "dramatic",
  },
  {
    id: "alex-sidequest",
    sceneLabel: "Side quest",
    title: "O conselho de Alex",
    narration:
      "Alex aparece em uma notificação mística, provavelmente atrasada, mas com intenção de ajudar. A missão está longa; a fome já tem barra própria.",
    prompt: "Alex pergunta: “Você quer ir direto para a padaria ou completar uma side quest inútil por lore?”",
    character: {
      name: "Alex",
      role: "narrador atrasado e cúmplice",
      avatarUrl: "/assets/avatars/alex.png",
    },
    choices: [
      {
        id: "direct",
        label: "Ir direto",
        response: "“Pão primeiro, lore depois.”",
        consequence: "Escolha racional. O roteiro finge respeitar e coloca mais uma curva mesmo assim.",
      },
      {
        id: "sidequest",
        label: "Pegar a side quest",
        response: "“Se tem lore, tem obrigação moral.”",
        consequence: "Side quest aceita: observar uma vitrine por tempo demais sem motivo claro.",
      },
    ],
    optionalEmoji: "STAR",
    backgroundMood: "comic",
  },
  {
    id: "dix-dog",
    sceneLabel: "Evento raro",
    title: "O fiscal da calçada",
    narration:
      "Um cachorro aparece sentado no caminho. Ele não late. Ele só julga. Dix manda mensagem no mesmo instante: “Esse aí sabe demais.”",
    prompt: "O cachorro bloqueia a passagem com autoridade de chefe opcional. Como Evie responde?",
    character: {
      name: "Dix",
      role: "comentarista do encontro canino",
      avatarUrl: "/assets/avatars/Dix.png",
    },
    choices: [
      {
        id: "respect",
        label: "Cumprimentar o fiscal",
        response: "Evie acena com respeito institucional.",
        consequence: "O cachorro permite passagem. Talvez por educação, talvez por pena.",
      },
      {
        id: "negotiate",
        label: "Negociar com migalha",
        response: "Evie oferece a migalha lendária, mesmo que talvez nem tenha escolhido esse item.",
        consequence: "O cachorro aceita a ideia conceitual da migalha e sai andando satisfeito.",
      },
    ],
    optionalEmoji: "DOG",
    backgroundMood: "mysterious",
  },
  {
    id: "caio-crossroads",
    sceneLabel: "Desvio",
    title: "A rota suspeita",
    narration:
      "A rua se divide em duas. Uma tem cheiro de forno. A outra tem Wi-Fi aberto com nome “PADARIA_5G”. Caio surge novamente, claramente preocupado.",
    prompt: "Caio diz: “Não confia em Wi-Fi de padaria, Evie. Isso é como pickar campeão só pela skin.”",
    character: {
      name: "Caio",
      role: "analista de decisões perigosas",
      avatarUrl: "/assets/avatars/caio.png",
    },
    choices: [
      {
        id: "oven",
        label: "Seguir cheiro de forno",
        response: "“O cheiro é meu minimapa.”",
        consequence: "Boa escolha. O aroma fica mais forte e a trilha sonora ganha sininhos.",
      },
      {
        id: "wifi",
        label: "Seguir o Wi-Fi",
        response: "“Mas e se o roteador estiver perto do pão?”",
        consequence: "O Wi-Fi leva até uma assistência técnica. Caio suspira como quem avisou.",
      },
    ],
    optionalEmoji: "QUEST",
    backgroundMood: "dramatic",
  },
  {
    id: "yuri-bread-echo",
    sceneLabel: "Eco",
    title: "A frase retorna",
    narration:
      "A panificadora já parece próxima. Yuri reaparece em espírito de meme, como se tivesse esperado o roteiro inteiro por esse momento.",
    prompt: "Yuri pergunta de novo: “Tem pães?”",
    character: {
      name: "Yuri",
      role: "profeta insistente do carboidrato",
      avatarUrl: "/assets/avatars/yuri.png",
    },
    choices: [
      {
        id: "soon",
        label: "Ainda não, mas quase",
        response: "“Quase. Eu sinto que estamos perto do trauma.”",
        consequence: "Yuri sorri como quem sabe demais. O destino estala os dedos.",
      },
      {
        id: "dont-jinx",
        label: "Não zika",
        response: "“Não fala isso agora, pelo amor da massa.”",
        consequence: "Tarde demais. A palavra pão já acordou o chefão final.",
      },
    ],
    optionalEmoji: "BREAD",
    backgroundMood: "mysterious",
  },
  {
    id: "crita-final-buff",
    sceneLabel: "Pré-chefe",
    title: "Buff de coragem",
    narration:
      "A vitrine aparece ao longe. O letreiro brilha. Crita surge para entregar a última frase de apoio antes do encontro com o balcão.",
    prompt: "Crita diz: “You got this. Ask the bread question with confidence.”",
    character: {
      name: "Crita",
      role: "suporte antes do chefão",
      avatarUrl: "/assets/avatars/crita.png",
    },
    choices: [
      {
        id: "confident",
        label: "Entrar confiante",
        response: "Evie ajeita a postura de protagonista e empurra a porta.",
        consequence: "O sininho da padaria toca como fanfarra de RPG.",
      },
      {
        id: "tiny-panic",
        label: "Entrar em pânico fofo",
        response: "Evie entra tentando parecer normal, mas com alma de cutscene final.",
        consequence: "Também funciona. A padaria aceita todos os estilos de heroína.",
      },
    ],
    optionalEmoji: "STAR",
    backgroundMood: "triumphant",
  },
  {
    id: "bakery-door",
    sceneLabel: "Dungeon final",
    title: "A panificadora iluminada",
    narration:
      "Lá dentro, tudo parece dourado demais. Pães desenhados em placas, cheiro de forno, balcão reluzente. Evie atravessa o salão como quem chegou ao último andar de uma dungeon.",
    prompt: "O padeiro ergue os olhos. É agora. Qual frase Evie escolhe para abrir o diálogo final?",
    character: {
      name: "Padeiro",
      role: "guardião máximo da farinha",
    },
    choices: [
      {
        id: "formal",
        label: "Boa tarde, tem pães?",
        response: "Evie escolhe educação e carboidrato na mesma frase.",
        consequence: "O padeiro apoia as mãos no balcão. O universo prende a respiração.",
      },
      {
        id: "direct",
        label: "Tem pães?",
        response: "Sem rodeios. Sem filler. Só a pergunta que atravessou a cidade.",
        consequence: "O padeiro pisca devagar. Uma força antiga desperta atrás do balcão.",
      },
    ],
    optionalEmoji: "SHOP",
    backgroundMood: "triumphant",
  },
  {
    id: "naes",
    sceneLabel: "Final",
    title: "O ápice dos pães",
    narration:
      "Toda a jornada, todos os semáforos, mapas rabiscados, conselhos suspeitos e perguntas repetidas levaram Evie até este balcão.",
    prompt: "Evie respira fundo. A pergunta final precisa ser feita.",
    character: {
      name: "Evie",
      role: "heroína da panificadora",
      avatarUrl: "/assets/characters/evie-pixel.png",
    },
    choices: [
      {
        id: "ask",
        label: "Tem pães?",
        response: "Evie pergunta: “Tem pães?”",
        consequence: "O padeiro responde com a força de mil fornadas negadas.",
      },
    ],
    optionalEmoji: "NAES",
    backgroundMood: "comic",
    isPunchline: true,
  },
];
