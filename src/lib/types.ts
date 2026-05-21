export type FeedingStyle = "tradicional" | "blw" | "misto";

export type Restriction = "sem_ovo" | "sem_leite" | "sem_gluten" | "vegetariano";

export type Meal = "cafe" | "almoco" | "lanche" | "jantar";

export type AgeBand = "6-8m" | "8-12m" | "1-2a" | "2-3a";

export type Feedback = "amou" | "aceitou" | "rejeitou";

export type BabyProfile = {
  name: string;
  birthMonth: string; // ISO yyyy-mm-01
  feedingStyle: FeedingStyle;
  restrictions: Restriction[];
};

export type Recipe = {
  id: string;
  title: string;
  meal: Meal;
  ageBands: AgeBand[];
  timeMinutes: number;
  blwFriendly: boolean;
  quick: boolean; // <= 15 min
  acceptanceFriendly: boolean;
  restrictionsSafe: Restriction[];
  image?: string;
  emoji: string;
  ingredients: string[];
  steps: string[];
  tip: string;
  texture?: string;
};

export type MealEntry = {
  recipeId: string;
  servedAt?: string;
  feedback?: Feedback;
};

export type DailyPlan = {
  date: string; // YYYY-MM-DD
  babyName: string;
  meals: Record<Meal, MealEntry>;
};

export type HistoryEntry = {
  date: string;
  meal: Meal;
  recipeId: string;
  feedback?: Feedback;
  servedAt: string;
};

export const MEAL_LABEL: Record<Meal, string> = {
  cafe: "Café da manhã",
  almoco: "Almoço",
  lanche: "Lanche",
  jantar: "Jantar",
};

export const MEAL_EMOJI: Record<Meal, string> = {
  cafe: "🥣",
  almoco: "🍲",
  lanche: "🍌",
  jantar: "🍛",
};

export const AGE_LABEL: Record<AgeBand, string> = {
  "6-8m": "6 a 8 meses",
  "8-12m": "8 a 12 meses",
  "1-2a": "1 a 2 anos",
  "2-3a": "2 a 3 anos",
};

export const AGE_HINT: Record<AgeBand, string> = {
  "6-8m": "Texturas amassadas, sabores suaves",
  "8-12m": "Pedacinhos macios, mais variedade",
  "1-2a": "Quase a comida da família",
  "2-3a": "Refeições completas e divertidas",
};

export const RESTRICTION_LABEL: Record<Restriction, string> = {
  sem_ovo: "Sem ovo",
  sem_leite: "Sem leite",
  sem_gluten: "Sem glúten",
  vegetariano: "Vegetariano",
};

export const FEEDBACK_EMOJI: Record<Feedback, string> = {
  amou: "😍",
  aceitou: "🙂",
  rejeitou: "😣",
};

export const FEEDBACK_LABEL: Record<Feedback, string> = {
  amou: "Amou",
  aceitou: "Aceitou",
  rejeitou: "Rejeitou",
};
