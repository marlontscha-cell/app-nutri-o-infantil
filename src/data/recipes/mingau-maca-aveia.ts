import type { Recipe } from "@/lib/types";
import image from "@/assets/recipes/mingau-maca-aveia.jpg";

export const mingauMacaAveia: Recipe = {
  id: "mingau-maca-aveia",
  slug: "mingau-maca-aveia",
  title: "Mingau Cremoso de Maçã e Aveia",
  meal: "cafe",
  ageBands: ["6-8m", "8-12m", "1-2a"],
  feedingMethods: ["tradicional", "misto"],
  timeMinutes: 12,
  difficulty: "facil",
  blwFriendly: false,
  quick: true,
  acceptanceFriendly: true,
  restrictionsSafe: ["sem_ovo", "sem_leite", "vegetariano"],
  emoji: "🍎",
  image,
  ingredients: [
    "1 maçã pequena",
    "2 colheres de sopa de aveia",
    "150ml de água",
  ],
  steps: [
    {
      step: 1,
      title: "Prepare a maçã",
      description:
        "Lave bem, descasque e corte a maçã em cubos pequenos.",
    },
    {
      step: 2,
      title: "Cozinhe a fruta",
      description:
        "Coloque a maçã em uma panela com água e cozinhe até ficar macia.",
    },
    {
      step: 3,
      title: "Adicione a aveia",
      description:
        "Acrescente a aveia e cozinhe mexendo até engrossar levemente.",
    },
    {
      step: 4,
      title: "Amasse ou bata",
      description:
        "Amasse com garfo ou bata rapidamente dependendo da textura ideal para o bebê.",
    },
    {
      step: 5,
      title: "Sirva morno",
      description: "Espere amornar antes de servir.",
    },
  ],
  feedingTip:
    "Frutas cozidas costumam facilitar a aceitação em fases iniciais.",
  acceptanceTip:
    "A combinação de maçã e aveia traz sabor suave e textura confortável.",
  textureGuide: {
    "6-8m": "Bem cremosa e lisa.",
    "8-12m": "Mais consistente com pequenos pedaços macios.",
  },
  nutritionHighlights: [
    "Rica em fibras",
    "Ajuda na saciedade",
    "Boa opção para manhãs frias",
  ],
  allergens: ["aveia"],
  storage: {
    fridge: "Consumir em até 24 horas.",
    freezer: "Pode congelar por até 15 dias.",
  },
  tip: "Use maçãs mais doces para evitar necessidade de adoçar.",
  texture: "Mingau cremoso e reconfortante.",
};
