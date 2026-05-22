import type { Recipe } from "@/lib/types";
import image from "@/assets/recipes/pure-abobora-carne.jpg";

export const pureAboboraCarne: Recipe = {
  id: "pure-abobora-carne",
  slug: "pure-abobora-carne",
  title: "Purê de Abóbora com Carne Desfiada",
  meal: "almoco",
  ageBands: ["8-12m", "1-2a"],
  feedingMethods: ["tradicional", "misto"],
  timeMinutes: 25,
  difficulty: "facil",
  blwFriendly: false,
  quick: false,
  acceptanceFriendly: true,
  restrictionsSafe: ["sem_leite", "sem_ovo", "sem_gluten"],
  emoji: "🎃",
  image,
  ingredients: [
    "2 pedaços pequenos de abóbora",
    "80g de carne bovina",
    "1 colher de chá de azeite",
  ],
  steps: [
    {
      step: 1,
      title: "Cozinhe a abóbora",
      description: "Cozinhe a abóbora até ficar extremamente macia.",
    },
    {
      step: 2,
      title: "Prepare a carne",
      description:
        "Cozinhe a carne até ficar macia e desfie em pequenos pedaços.",
    },
    {
      step: 3,
      title: "Monte o purê",
      description: "Amasse bem a abóbora formando um purê cremoso.",
    },
    {
      step: 4,
      title: "Misture os ingredientes",
      description:
        "Adicione a carne desfiada ao purê e misture delicadamente.",
    },
    {
      step: 5,
      title: "Finalize",
      description: "Finalize com azeite e sirva morno.",
    },
  ],
  feedingTip:
    "Purês costumam ser ótimos para fases de adaptação alimentar.",
  acceptanceTip:
    "O sabor levemente adocicado da abóbora costuma ajudar bastante na aceitação.",
  textureGuide: {
    "8-12m": "Bem cremoso e macio.",
    "1-2a": "Mais consistente com pequenos pedaços.",
  },
  nutritionHighlights: [
    "Fonte de ferro",
    "Boa fonte de energia",
    "Ajuda na saciedade",
  ],
  allergens: [],
  storage: {
    fridge: "Consumir em até 24 horas.",
    freezer: "Pode congelar por até 30 dias.",
  },
  tip: "Use abóbora bem madura para deixar o purê naturalmente mais saboroso.",
  texture: "Purê cremoso e suave.",
};
