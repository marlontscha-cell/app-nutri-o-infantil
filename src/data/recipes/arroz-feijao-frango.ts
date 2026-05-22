import type { Recipe } from "@/lib/types";
import image from "@/assets/recipes/arroz-feijao-frango.jpg";

export const arrozFeijaoFrango: Recipe = {
  id: "arroz-feijao-frango",
  slug: "arroz-feijao-frango",
  title: "Arroz com Feijão e Frango Desfiado",
  meal: "almoco",
  ageBands: ["8-12m", "1-2a", "2-3a"],
  feedingMethods: ["tradicional", "misto"],
  timeMinutes: 30,
  difficulty: "facil",
  blwFriendly: false,
  quick: false,
  acceptanceFriendly: true,
  restrictionsSafe: ["sem_leite", "sem_ovo"],
  emoji: "🍛",
  image,
  ingredients: [
    "2 colheres de sopa de arroz cozido",
    "2 colheres de sopa de feijão cozido",
    "80g de peito de frango",
    "1 colher de chá de azeite",
    "Água filtrada",
  ],
  steps: [
    {
      step: 1,
      title: "Prepare o frango",
      description:
        "Cozinhe o peito de frango em água até ficar bem macio. Depois desfie em pedaços pequenos.",
    },
    {
      step: 2,
      title: "Prepare os acompanhamentos",
      description:
        "Separe o arroz e o feijão já cozidos e amasse levemente o feijão para facilitar a aceitação.",
    },
    {
      step: 3,
      title: "Misture os ingredientes",
      description:
        "Monte o prato misturando o arroz, o feijão e o frango desfiado.",
    },
    {
      step: 4,
      title: "Adicione azeite",
      description:
        "Finalize com azeite para deixar a refeição mais saborosa e nutritiva.",
    },
    {
      step: 5,
      title: "Ajuste para o bebê",
      description: "Para bebês menores, deixe tudo mais úmido e macio.",
    },
  ],
  feedingTip:
    "Combinações simples e do dia a dia ajudam o bebê a se acostumar com a alimentação da família.",
  acceptanceTip:
    "Misturar o feijão ao arroz costuma facilitar bastante a aceitação.",
  textureGuide: {
    "8-12m": "Mais úmido e amassado.",
    "1-2a": "Mais soltinho com pequenos pedaços.",
  },
  nutritionHighlights: [
    "Fonte de proteína",
    "Fonte de ferro",
    "Refeição equilibrada",
  ],
  allergens: [],
  storage: {
    fridge: "Consumir em até 24 horas refrigerado.",
    freezer: "Pode congelar por até 30 dias.",
  },
  tip: "Adicionar um pouco do caldo do feijão ajuda a deixar a refeição mais úmida.",
  texture: "Macia e úmida.",
};
