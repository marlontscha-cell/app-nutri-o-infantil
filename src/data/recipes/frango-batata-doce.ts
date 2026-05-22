import type { Recipe } from "@/lib/types";
import image from "@/assets/recipes/frango-batata-doce.jpg";

export const frangoBatataDoce: Recipe = {
  id: "frango-batata-doce",
  slug: "frango-batata-doce",
  title: "Frango Desfiado com Batata-Doce",
  meal: "almoco",
  ageBands: ["8-12m", "1-2a", "2-3a"],
  feedingMethods: ["tradicional", "misto", "blw"],
  timeMinutes: 30,
  difficulty: "facil",
  blwFriendly: true,
  quick: false,
  acceptanceFriendly: true,
  restrictionsSafe: ["sem_leite", "sem_ovo", "sem_gluten"],
  emoji: "🍠",
  image,
  ingredients: [
    "100g de peito de frango",
    "1 batata-doce pequena",
    "1 colher de chá de azeite",
    "Água filtrada",
  ],
  steps: [
    {
      step: 1,
      title: "Prepare a batata-doce",
      description:
        "Descasque a batata-doce e corte em pequenos cubos para acelerar o cozimento.",
    },
    {
      step: 2,
      title: "Cozinhe a batata",
      description:
        "Coloque os pedaços em água fervente e cozinhe até ficarem extremamente macios.",
    },
    {
      step: 3,
      title: "Prepare o frango",
      description:
        "Cozinhe o peito de frango até ficar bem macio. Depois desfie em pedaços pequenos.",
    },
    {
      step: 4,
      title: "Monte a refeição",
      description:
        "Misture a batata-doce cozida com o frango desfiado ainda morno.",
    },
    {
      step: 5,
      title: "Finalize",
      description:
        "Adicione azeite e misture delicadamente antes de servir.",
    },
  ],
  feedingTip:
    "Batata-doce costuma ser uma ótima porta de entrada para novos sabores por ter sabor naturalmente suave.",
  acceptanceTip:
    "A textura macia e o sabor levemente adocicado ajudam bastante na aceitação alimentar.",
  textureGuide: {
    "8-12m": "Bem macio e úmido.",
    "1-2a": "Mais firme com pequenos pedaços.",
  },
  nutritionHighlights: [
    "Fonte de proteína",
    "Boa fonte de energia",
    "Ajuda na saciedade",
    "Rica em carboidratos naturais",
  ],
  allergens: [],
  storage: {
    fridge: "Consumir em até 24 horas refrigerado.",
    freezer: "Pode congelar por até 30 dias.",
  },
  tip: "Evite deixar o frango muito seco para facilitar a mastigação do bebê.",
  texture: "Macia, úmida e fácil de mastigar.",
};
