import type { Recipe } from "@/lib/types";
import image from "@/assets/recipes/panquequinha-banana-bebe.jpg";

export const panquequinhaBananaBebe: Recipe = {
  id: "panquequinha-banana-bebe",
  slug: "panquequinha-banana-bebe",
  title: "Panquequinha de Banana para Bebês",
  meal: "cafe",
  ageBands: ["8-12m", "1-2a", "2-3a"],
  feedingMethods: ["blw", "misto"],
  timeMinutes: 15,
  difficulty: "facil",
  blwFriendly: true,
  quick: true,
  acceptanceFriendly: true,
  restrictionsSafe: ["sem_leite", "vegetariano"],
  emoji: "🥞",
  image,
  ingredients: [
    "1 banana madura",
    "1 ovo",
    "2 colheres de sopa de aveia em flocos finos",
    "1 colher de chá de azeite ou manteiga para untar",
  ],
  steps: [
    {
      step: 1,
      title: "Prepare os ingredientes",
      description:
        "Descasque a banana e separe todos os ingredientes. Utilize uma banana bem madura para deixar a receita naturalmente mais doce.",
    },
    {
      step: 2,
      title: "Amasse a banana",
      description:
        "Com um garfo, amasse completamente a banana até formar um creme uniforme e sem pedaços grandes.",
    },
    {
      step: 3,
      title: "Misture os ingredientes",
      description:
        "Adicione o ovo e a aveia. Misture bem até formar uma massa cremosa e homogênea.",
    },
    {
      step: 4,
      title: "Aqueça a frigideira",
      description:
        "Unte levemente uma frigideira antiaderente com azeite ou manteiga e aqueça em fogo baixo.",
    },
    {
      step: 5,
      title: "Prepare as panquequinhas",
      description:
        "Coloque pequenas porções da massa na frigideira formando mini panquecas. Cozinhe lentamente até dourar dos dois lados.",
    },
    {
      step: 6,
      title: "Ajuste para o bebê",
      description:
        "Para bebês menores, corte em pedaços pequenos e macios. Para BLW, ofereça em tiras fáceis de segurar.",
    },
    {
      step: 7,
      title: "Sirva morno",
      description:
        "Espere esfriar levemente antes de servir para evitar desconforto ao bebê.",
    },
  ],
  feedingTip:
    "Panquequinhas costumam funcionar muito bem para bebês que gostam de comer com as mãos.",
  acceptanceTip:
    "A textura macia e o sabor adocicado da banana ajudam bastante na aceitação alimentar.",
  textureGuide: {
    "8-12m": "Bem macia e cortada em pequenos pedaços.",
    "1-2a": "Mais firme, em pedaços maiores ou tiras para BLW.",
  },
  nutritionHighlights: [
    "Fonte de energia",
    "Boa fonte de proteína",
    "Ajuda na saciedade",
    "Ótima opção para BLW",
  ],
  allergens: ["ovo", "aveia"],
  storage: {
    fridge: "Consumir em até 24 horas refrigerado.",
    freezer: "Pode congelar por até 15 dias.",
  },
  tip: "Você pode variar adicionando pequenas quantidades de canela após 1 ano.",
  texture: "Macia por dentro e levemente firme por fora.",
};
