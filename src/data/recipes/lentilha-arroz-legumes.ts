import type { Recipe } from "@/lib/types";
import image from "@/assets/recipes/lentilha-arroz-legumes.jpg";

export const lentilhaArrozLegumes: Recipe = {
  id: "lentilha-arroz-legumes",
  slug: "lentilha-arroz-legumes",
  title: "Lentilha com Arroz e Legumes",
  meal: "almoco",
  ageBands: ["1-2a", "2-3a"],
  feedingMethods: ["tradicional", "misto"],
  timeMinutes: 30,
  difficulty: "facil",
  blwFriendly: false,
  quick: false,
  acceptanceFriendly: true,
  restrictionsSafe: ["sem_leite", "sem_ovo", "vegetariano"],
  emoji: "🥕",
  image,
  ingredients: [
    "2 colheres de sopa de lentilha cozida",
    "2 colheres de sopa de arroz cozido",
    "1/2 cenoura pequena",
    "1 colher de chá de azeite",
  ],
  steps: [
    {
      step: 1,
      title: "Prepare os legumes",
      description: "Descasque a cenoura e corte em cubinhos pequenos.",
    },
    {
      step: 2,
      title: "Cozinhe a cenoura",
      description:
        "Cozinhe até ficar bem macia para facilitar a mastigação.",
    },
    {
      step: 3,
      title: "Prepare a lentilha",
      description:
        "Cozinhe a lentilha até ficar macia e confortável para o bebê.",
    },
    {
      step: 4,
      title: "Misture os ingredientes",
      description:
        "Junte o arroz, a lentilha e os legumes ainda mornos.",
    },
    {
      step: 5,
      title: "Finalize",
      description:
        "Adicione azeite e misture delicadamente antes de servir.",
    },
  ],
  feedingTip:
    "Leguminosas ajudam bastante na variedade alimentar desde cedo.",
  acceptanceTip:
    "Misturar arroz e lentilha costuma deixar a textura mais confortável para muitos bebês.",
  textureGuide: {
    "1-2a": "Mais úmido e macio.",
    "2-3a": "Mais soltinho com pequenos pedaços.",
  },
  nutritionHighlights: [
    "Fonte vegetal de proteína",
    "Rica em fibras",
    "Ajuda na saciedade",
    "Boa fonte de energia",
  ],
  allergens: [],
  storage: {
    fridge: "Consumir em até 24 horas refrigerado.",
    freezer: "Pode congelar por até 30 dias.",
  },
  tip: "Cozinhar bem a lentilha ajuda muito na digestão e aceitação.",
  texture: "Macia, úmida e confortável para mastigar.",
};
