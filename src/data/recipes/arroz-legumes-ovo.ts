import type { Recipe } from "@/lib/types";
import image from "@/assets/recipes/arroz-legumes-ovo.jpg";

export const arrozLegumesOvo: Recipe = {
  id: "arroz-legumes-ovo",
  slug: "arroz-legumes-ovo",
  title: "Arroz Cremoso com Legumes e Ovo",
  meal: "almoco",
  ageBands: ["8-12m", "1-2a", "2-3a"],
  feedingMethods: ["tradicional", "misto"],
  timeMinutes: 20,
  difficulty: "facil",
  blwFriendly: false,
  quick: true,
  acceptanceFriendly: true,
  restrictionsSafe: ["sem_leite", "vegetariano"],
  emoji: "🍚",
  image,
  ingredients: [
    "2 colheres de sopa de arroz cozido",
    "1 ovo",
    "1/2 cenoura pequena",
    "1 colher de chá de azeite",
  ],
  steps: [
    {
      step: 1,
      title: "Prepare os legumes",
      description:
        "Descasque a cenoura, corte em cubinhos pequenos e cozinhe até ficar macia.",
    },
    {
      step: 2,
      title: "Prepare o ovo",
      description: "Mexa o ovo em fogo baixo até ficar bem macio.",
    },
    {
      step: 3,
      title: "Misture os ingredientes",
      description:
        "Adicione o arroz, a cenoura e o ovo mexido em uma panela.",
    },
    {
      step: 4,
      title: "Deixe mais cremoso",
      description:
        "Adicione pequenas quantidades de água morna e mexa até a mistura ficar mais úmida.",
    },
    {
      step: 5,
      title: "Finalize",
      description: "Finalize com azeite e sirva morno.",
    },
  ],
  feedingTip:
    "Misturas cremosas costumam facilitar bastante a aceitação alimentar.",
  acceptanceTip:
    "O ovo deixa a textura mais macia e confortável para muitos bebês.",
  textureGuide: {
    "8-12m": "Mais úmido e bem macio.",
    "1-2a": "Mais soltinho com pequenos pedaços.",
  },
  nutritionHighlights: [
    "Fonte de proteína",
    "Boa fonte de energia",
    "Ajuda na saciedade",
  ],
  allergens: ["ovo"],
  storage: {
    fridge: "Consumir em até 24 horas refrigerado.",
    freezer: "Não recomendado congelar.",
  },
  tip: "Adicionar um pouco de água ajuda a deixar a refeição mais confortável para bebês menores.",
  texture: "Cremosa e macia.",
};
