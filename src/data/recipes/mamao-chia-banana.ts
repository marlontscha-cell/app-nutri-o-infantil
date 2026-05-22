import type { Recipe } from "@/lib/types";
import image from "@/assets/recipes/mamao-chia-banana.jpg";

export const mamaoChiaBanana: Recipe = {
  id: "mamao-chia-banana",
  slug: "mamao-chia-banana",
  title: "Mamão com Chia e Banana",
  meal: "cafe",
  ageBands: ["8-12m", "1-2a", "2-3a"],
  feedingMethods: ["tradicional", "misto"],
  timeMinutes: 5,
  difficulty: "facil",
  blwFriendly: false,
  quick: true,
  acceptanceFriendly: true,
  restrictionsSafe: ["sem_leite", "sem_ovo", "sem_gluten", "vegetariano"],
  emoji: "🥭",
  image,
  ingredients: [
    "1 fatia pequena de mamão",
    "1/2 banana madura",
    "1 colher de chá de chia",
  ],
  steps: [
    {
      step: 1,
      title: "Prepare as frutas",
      description:
        "Lave bem o mamão, retire a casca e as sementes. Descasque a banana.",
    },
    {
      step: 2,
      title: "Amasse os ingredientes",
      description:
        "Com um garfo, amasse o mamão e a banana até formar um creme uniforme.",
    },
    {
      step: 3,
      title: "Adicione a chia",
      description:
        "Misture a chia delicadamente até distribuir bem pela fruta.",
    },
    {
      step: 4,
      title: "Descanse por alguns minutos",
      description:
        "Deixe a mistura descansar por 2 a 3 minutos para que a chia absorva parte da umidade.",
    },
    {
      step: 5,
      title: "Sirva imediatamente",
      description:
        "Sirva em temperatura ambiente logo após o preparo.",
    },
  ],
  feedingTip:
    "Frutas no café da manhã ajudam a criar variedade alimentar desde cedo.",
  acceptanceTip:
    "A banana suaviza o sabor do mamão e costuma aumentar a aceitação.",
  textureGuide: {
    "8-12m": "Bem amassado e cremoso.",
    "1-2a": "Pode manter pequenos pedaços macios.",
  },
  nutritionHighlights: [
    "Rico em fibras",
    "Ajuda o funcionamento intestinal",
    "Fonte natural de energia",
  ],
  allergens: ["chia"],
  storage: {
    fridge: "Consumir em até 12 horas refrigerado.",
    freezer: "Não recomendado congelar.",
  },
  tip: "Use mamão bem maduro para deixar a textura mais cremosa e agradável.",
  texture: "Cremoso, leve e fácil de aceitar.",
};
