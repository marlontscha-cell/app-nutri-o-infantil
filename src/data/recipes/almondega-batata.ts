import type { Recipe } from "@/lib/types";
import image from "@/assets/recipes/almondega-batata.jpg";

export const almondegaBatata: Recipe = {
  id: "almondega-batata",
  slug: "almondega-batata",
  title: "Almôndega Macia com Batata",
  meal: "almoco",
  ageBands: ["1-2a", "2-3a"],
  feedingMethods: ["tradicional", "blw", "misto"],
  timeMinutes: 30,
  difficulty: "facil",
  blwFriendly: true,
  quick: false,
  acceptanceFriendly: true,
  restrictionsSafe: ["sem_leite", "sem_gluten"],
  emoji: "🥔",
  image,
  ingredients: [
    "100g de carne moída",
    "1 batata pequena",
    "1 colher de sopa de aveia",
    "1 colher de chá de azeite",
  ],
  steps: [
    {
      step: 1,
      title: "Prepare a batata",
      description:
        "Descasque a batata, corte em pedaços pequenos e cozinhe até ficar bem macia.",
    },
    {
      step: 2,
      title: "Prepare a mistura",
      description:
        "Misture a carne moída, a batata amassada e a aveia até formar uma massa homogênea.",
    },
    {
      step: 3,
      title: "Modele as almôndegas",
      description:
        "Faça pequenas bolinhas macias em tamanho adequado para o bebê.",
    },
    {
      step: 4,
      title: "Cozinhe lentamente",
      description:
        "Prepare em fogo baixo até ficarem bem cozidas e macias por dentro.",
    },
    {
      step: 5,
      title: "Sirva morno",
      description: "Espere esfriar levemente antes de servir.",
    },
  ],
  feedingTip:
    "Receitas em formato de bolinhas costumam estimular autonomia alimentar.",
  acceptanceTip:
    "A textura macia da batata ajuda bastante na aceitação da carne.",
  textureGuide: {
    "1-2a": "Bem macia e fácil de mastigar.",
    "2-3a": "Mais firme mantendo interior macio.",
  },
  nutritionHighlights: [
    "Fonte de proteína",
    "Ajuda na mastigação",
    "Boa fonte de energia",
  ],
  allergens: ["aveia"],
  storage: {
    fridge: "Consumir em até 24 horas.",
    freezer: "Pode congelar por até 30 dias.",
  },
  tip: "Evite deixar as almôndegas secas para facilitar a mastigação.",
  texture: "Macia por dentro e fácil de mastigar.",
};
