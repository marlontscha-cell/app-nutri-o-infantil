import type { Recipe } from "@/lib/types";
import image from "@/assets/recipes/papa-banana-aveia.jpg";

export const papaBananaAveia: Recipe = {
  id: "papa-banana-aveia",
  slug: "papa-banana-aveia",
  title: "Papa de Banana com Aveia",
  meal: "cafe",
  ageBands: ["6-8m", "8-12m"],
  feedingMethods: ["tradicional", "misto"],
  timeMinutes: 8,
  difficulty: "facil",
  blwFriendly: false,
  quick: true,
  acceptanceFriendly: true,
  restrictionsSafe: ["sem_ovo", "sem_leite", "vegetariano"],
  emoji: "🍌",
  image,
  ingredients: [
    "1 banana madura",
    "1 colher de sopa de aveia em flocos finos",
    "2 colheres de sopa de água morna, se necessário",
  ],
  steps: [
    {
      step: 1,
      title: "Prepare os ingredientes",
      description:
        "Descasque a banana e separe a aveia. Caso necessário, deixe um pouco de água morna pronta para ajustar a textura da papinha.",
    },
    {
      step: 2,
      title: "Amasse a banana",
      description:
        "Com um garfo, amasse bem a banana até formar um creme uniforme e sem pedaços grandes.",
    },
    {
      step: 3,
      title: "Misture a aveia",
      description:
        "Adicione a aveia aos poucos e misture bem até incorporar completamente.",
    },
    {
      step: 4,
      title: "Ajuste a textura",
      description:
        "Se necessário, acrescente pequenas quantidades de água morna para deixar a textura mais cremosa.",
    },
    {
      step: 5,
      title: "Sirva imediatamente",
      description:
        "Sirva em temperatura ambiente ou levemente morna logo após o preparo.",
    },
  ],
  feedingTip:
    "Mesmo que o bebê recuse inicialmente, continue oferecendo em outros momentos sem pressão.",
  acceptanceTip:
    "A banana madura costuma ter ótima aceitação por conta do sabor naturalmente adocicado.",
  textureGuide: {
    "6-8m": "Mais cremosa e completamente amassada.",
    "8-12m": "Mais consistente, com pequenos gruminhos.",
  },
  nutritionHighlights: [
    "Fonte de energia",
    "Rica em fibras",
    "Boa para café da manhã",
  ],
  allergens: ["aveia"],
  storage: {
    fridge: "Consumir em até 12 horas refrigerado.",
    freezer: "Não recomendado congelar.",
  },
  tip: "Use banana bem madura para deixar a receita naturalmente mais doce.",
  texture: "Papinha cremosa e suave.",
};
