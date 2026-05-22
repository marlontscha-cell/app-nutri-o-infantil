import type { Recipe } from "@/lib/types";
import image from "@/assets/recipes/macarrao-legumes.jpg";

export const macarraoLegumes: Recipe = {
  id: "macarrao-legumes",
  slug: "macarrao-legumes",
  title: "Macarrão com Legumes Macios",
  meal: "almoco",
  ageBands: ["1-2a", "2-3a"],
  feedingMethods: ["tradicional", "blw", "misto"],
  timeMinutes: 20,
  difficulty: "facil",
  blwFriendly: true,
  quick: true,
  acceptanceFriendly: true,
  restrictionsSafe: ["sem_leite", "vegetariano"],
  emoji: "🍝",
  image,
  ingredients: [
    "1 xícara de macarrão pequeno",
    "1/2 cenoura",
    "1/2 abobrinha",
    "1 colher de chá de azeite",
  ],
  steps: [
    {
      step: 1,
      title: "Cozinhe o macarrão",
      description: "Prepare o macarrão até ficar bem macio.",
    },
    {
      step: 2,
      title: "Prepare os legumes",
      description:
        "Corte os legumes em pedaços pequenos e cozinhe até ficarem macios.",
    },
    {
      step: 3,
      title: "Misture tudo",
      description: "Misture os legumes ao macarrão ainda quente.",
    },
    {
      step: 4,
      title: "Finalize",
      description: "Adicione azeite e misture delicadamente.",
    },
    {
      step: 5,
      title: "Sirva",
      description: "Sirva morno em pedaços adequados para a idade.",
    },
  ],
  feedingTip: "Massas costumam ser ótimas para introduzir novos legumes.",
  acceptanceTip:
    "O macarrão ajuda muitos bebês a aceitarem melhor vegetais.",
  textureGuide: {
    "1-2a": "Bem macio e úmido.",
    "2-3a": "Mais firme com pedaços pequenos.",
  },
  nutritionHighlights: [
    "Boa fonte de energia",
    "Ajuda na variedade alimentar",
    "Rico em vegetais",
  ],
  allergens: ["gluten"],
  storage: {
    fridge: "Consumir em até 24 horas.",
    freezer: "Não recomendado congelar.",
  },
  tip: "Cozinhar bem os legumes ajuda muito na aceitação alimentar.",
  texture: "Macio e fácil de mastigar.",
};
