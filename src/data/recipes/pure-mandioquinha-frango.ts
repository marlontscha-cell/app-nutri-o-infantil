import type { Recipe } from "@/lib/types";
import image from "@/assets/recipes/pure-mandioquinha-frango.jpg";

export const pureMandioquinhaFrango: Recipe = {
  id: "pure-mandioquinha-frango",
  slug: "pure-mandioquinha-frango",
  title: "Purê de Mandioquinha com Frango Desfiado",
  meal: "almoco",
  ageBands: ["8-12m", "1-2a"],
  feedingMethods: ["tradicional", "misto"],
  timeMinutes: 25,
  difficulty: "facil",
  blwFriendly: false,
  quick: false,
  acceptanceFriendly: true,
  restrictionsSafe: ["sem_leite", "sem_ovo", "sem_gluten"],
  emoji: "🥣",
  image,
  ingredients: [
    "2 mandioquinhas médias",
    "100 g de peito de frango",
    "1 colher de chá de azeite de oliva",
    "Água filtrada",
    "Salsinha fresca picada",
  ],
  steps: [
    {
      step: 1,
      title: "Prepare os ingredientes",
      description:
        "Lave bem a mandioquinha, retire a casca e corte em pedaços pequenos para acelerar o cozimento. Corte o peito de frango em cubos médios.",
    },
    {
      step: 2,
      title: "Cozinhe a mandioquinha",
      description:
        "Coloque a mandioquinha em uma panela com água suficiente para cobrir. Cozinhe em fogo médio até ficar extremamente macia.",
    },
    {
      step: 3,
      title: "Prepare o frango",
      description:
        "Enquanto a mandioquinha cozinha, coloque o frango em outra panela com água e cozinhe até ficar bem macio. Depois de cozido, desfie em pedaços pequenos.",
    },
    {
      step: 4,
      title: "Monte o purê",
      description:
        "Escorra a mandioquinha e amasse bem com um garfo até formar um purê cremoso. Adicione pequenas quantidades da água do cozimento se precisar deixar mais leve.",
    },
    {
      step: 5,
      title: "Misture os ingredientes",
      description:
        "Adicione o frango desfiado ao purê e misture delicadamente. Finalize com azeite de oliva e salsinha fresca picada.",
    },
    {
      step: 6,
      title: "Ajuste a textura ideal",
      description:
        "Para bebês menores, deixe o purê mais cremoso e o frango mais desfiado. Para bebês maiores, mantenha pequenos pedaços macios.",
    },
    {
      step: 7,
      title: "Sirva morno",
      description:
        "Espere atingir uma temperatura confortável antes de servir. O ideal é oferecer logo após o preparo.",
    },
  ],
  feedingTip:
    "Se o bebê rejeitar na primeira tentativa, ofereça novamente em outro momento sem pressão.",
  acceptanceTip:
    "A mandioquinha possui sabor suave e naturalmente adocicado, o que costuma facilitar a aceitação alimentar.",
  textureGuide: {
    "8-12m": "Purê cremoso com frango bem desfiado.",
    "1-2a": "Purê mais consistente com pequenos pedaços macios.",
  },
  nutritionHighlights: [
    "Fonte de ferro",
    "Rica em proteínas",
    "Boa fonte de energia",
    "Ajuda na saciedade",
  ],
  allergens: [],
  storage: {
    fridge: "Consumir em até 24 horas refrigerado.",
    freezer: "Pode ser congelado por até 30 dias em pequenas porções.",
  },
  tip: "A mandioquinha costuma ter ótima aceitação por possuir sabor naturalmente suave e levemente adocicado.",
  texture: "Purê cremoso e macio, ideal para introdução alimentar.",
};
