import type { Recipe } from "@/lib/types";
import image from "@/assets/recipes/creme-abacate-banana.jpg";

export const cremeAbacateBanana: Recipe = {
  id: "creme-abacate-banana",
  slug: "creme-abacate-banana",
  title: "Creme de Abacate com Banana",
  meal: "cafe",
  ageBands: ["6-8m", "8-12m", "1-2a"],
  feedingMethods: ["tradicional", "misto"],
  timeMinutes: 5,
  difficulty: "facil",
  blwFriendly: false,
  quick: true,
  acceptanceFriendly: true,
  restrictionsSafe: ["sem_leite", "sem_ovo", "sem_gluten", "vegetariano"],
  emoji: "🥑",
  image,
  ingredients: [
    "2 colheres de sopa de abacate maduro",
    "1/2 banana madura",
  ],
  steps: [
    {
      step: 1,
      title: "Prepare as frutas",
      description:
        "Retire a polpa do abacate e descasque a banana. Utilize frutas bem maduras para garantir textura cremosa e sabor mais suave.",
    },
    {
      step: 2,
      title: "Amasse os ingredientes",
      description:
        "Com um garfo, amasse bem o abacate e a banana até formar um creme uniforme e sem pedaços grandes.",
    },
    {
      step: 3,
      title: "Misture até ficar cremoso",
      description:
        "Misture delicadamente até a combinação ficar bem homogênea e cremosa.",
    },
    {
      step: 4,
      title: "Ajuste a textura",
      description:
        "Caso necessário, amasse mais para deixar a textura mais lisa para bebês menores.",
    },
    {
      step: 5,
      title: "Sirva imediatamente",
      description:
        "Sirva logo após o preparo para preservar a textura e evitar oxidação do abacate.",
    },
  ],
  feedingTip:
    "Receitas cremosas e suaves costumam ser ótimas para fases iniciais da introdução alimentar.",
  acceptanceTip:
    "A banana ajuda a suavizar o sabor do abacate e costuma aumentar bastante a aceitação.",
  textureGuide: {
    "6-8m": "Bem cremosa e lisa.",
    "8-12m": "Mais consistente com pequenos gruminhos macios.",
  },
  nutritionHighlights: [
    "Fonte de gorduras boas",
    "Ajuda na saciedade",
    "Rico em energia",
    "Boa opção para café da manhã",
  ],
  allergens: [],
  storage: {
    fridge: "Consumir em até 6 horas refrigerado.",
    freezer: "Não recomendado congelar.",
  },
  tip: "Pingar algumas gotas de limão pode ajudar a reduzir a oxidação do abacate após 1 ano.",
  texture: "Creme leve, macio e muito cremoso.",
};
