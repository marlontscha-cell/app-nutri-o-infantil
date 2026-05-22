import type { Recipe } from "@/lib/types";
import image from "@/assets/recipes/cuscuz-ovo-mexido.jpg";

export const cuscuzOvoMexido: Recipe = {
  id: "cuscuz-ovo-mexido",
  slug: "cuscuz-ovo-mexido",
  title: "Cuscuz Macio com Ovo Mexido",
  meal: "cafe",
  ageBands: ["8-12m", "1-2a", "2-3a"],
  feedingMethods: ["tradicional", "blw", "misto"],
  timeMinutes: 15,
  difficulty: "facil",
  blwFriendly: true,
  quick: true,
  acceptanceFriendly: true,
  restrictionsSafe: ["sem_leite", "vegetariano"],
  emoji: "🍳",
  image,
  ingredients: [
    "3 colheres de sopa de flocão de milho",
    "1 ovo",
    "1 colher de chá de azeite",
    "Água filtrada",
  ],
  steps: [
    {
      step: 1,
      title: "Hidrate o cuscuz",
      description:
        "Misture o flocão com pequenas quantidades de água até ficar levemente úmido. Deixe descansar por alguns minutos.",
    },
    {
      step: 2,
      title: "Prepare o cuscuz",
      description:
        "Coloque o cuscuz na cuscuzeira e cozinhe até ficar macio e soltinho.",
    },
    {
      step: 3,
      title: "Prepare o ovo",
      description:
        "Em uma frigideira antiaderente, aqueça o azeite em fogo baixo e mexa o ovo delicadamente até ficar bem macio.",
    },
    {
      step: 4,
      title: "Monte a refeição",
      description:
        "Misture parte do ovo ao cuscuz ou sirva separado dependendo da fase alimentar do bebê.",
    },
    {
      step: 5,
      title: "Ajuste para o bebê",
      description:
        "Para BLW, modele pequenos pedaços fáceis de segurar. Para bebês menores, deixe tudo mais macio e bem fragmentado.",
    },
    {
      step: 6,
      title: "Sirva morno",
      description: "Espere esfriar levemente antes de oferecer ao bebê.",
    },
  ],
  feedingTip:
    "O cuscuz é uma ótima opção para variar o café da manhã de forma simples e nutritiva.",
  acceptanceTip:
    "A textura macia do cuscuz costuma facilitar bastante a aceitação alimentar.",
  textureGuide: {
    "8-12m": "Bem macio e úmido.",
    "1-2a": "Mais soltinho, com pequenos pedaços.",
  },
  nutritionHighlights: [
    "Boa fonte de energia",
    "Fonte de proteína",
    "Ajuda na saciedade",
    "Ótimo para BLW",
  ],
  allergens: ["ovo"],
  storage: {
    fridge: "Consumir em até 24 horas refrigerado.",
    freezer: "Não recomendado congelar.",
  },
  tip: "Evite deixar o cuscuz muito seco para facilitar a mastigação do bebê.",
  texture: "Macio, leve e fácil de mastigar.",
};
