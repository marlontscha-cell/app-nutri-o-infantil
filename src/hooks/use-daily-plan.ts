import { useCallback, useEffect, useState } from "react";
import type { DailyPlan, Feedback, Meal, MealEntry } from "@/lib/types";
import { ALL_MEALS, dailySuggestion, todayISO } from "@/lib/baby";
import { useBabyProfile } from "./use-baby-profile";
import { addHistoryEntry } from "./use-history";

const KEY = "rdb_daily_plan_v1";
const SALT_KEY = "rdb_daily_plan_salts_v1";

function read(): DailyPlan | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as DailyPlan) : null;
  } catch {
    return null;
  }
}

function readSalts(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(SALT_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeSalts(s: Record<string, number>) {
  localStorage.setItem(SALT_KEY, JSON.stringify(s));
}

function buildPlan(
  date: string,
  babyName: string,
  profile: Parameters<typeof dailySuggestion>[0],
  salts: Record<Meal, number> = { cafe: 0, almoco: 0, lanche: 0, jantar: 0 }
): DailyPlan {
  const meals = {} as Record<Meal, MealEntry>;
  for (const m of ALL_MEALS) {
    const r = dailySuggestion(profile, m, new Date(date), salts[m] ?? 0);
    meals[m] = { recipeId: r?.id ?? "" };
  }
  return { date, babyName, meals };
}

export function useDailyPlan() {
  const { profile, ready } = useBabyProfile();
  const [plan, setPlan] = useState<DailyPlan | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const today = todayISO();
    const name = profile?.name ?? "bebê";
    const existing = read();
    if (existing && existing.date === today && existing.babyName === name) {
      setPlan(existing);
    } else {
      const fresh = buildPlan(today, name, profile);
      localStorage.setItem(KEY, JSON.stringify(fresh));
      setPlan(fresh);
    }
    setHydrated(true);
  }, [ready, profile]);

  const persist = useCallback((next: DailyPlan) => {
    localStorage.setItem(KEY, JSON.stringify(next));
    setPlan(next);
  }, []);

  const swapMeal = useCallback(
    (meal: Meal) => {
      if (!plan) return;
      const salts = readSalts();
      const key = `${plan.date}|${meal}`;
      const nextSalt = (salts[key] ?? 0) + 1;
      salts[key] = nextSalt;
      writeSalts(salts);
      const r = dailySuggestion(profile, meal, new Date(plan.date), nextSalt);
      persist({
        ...plan,
        meals: {
          ...plan.meals,
          [meal]: { recipeId: r?.id ?? plan.meals[meal].recipeId },
        },
      });
    },
    [plan, profile, persist]
  );

  const regenerateAll = useCallback(() => {
    const today = todayISO();
    const salts = readSalts();
    const bump: Record<Meal, number> = {
      cafe: (salts[`${today}|cafe`] ?? 0) + 1,
      almoco: (salts[`${today}|almoco`] ?? 0) + 1,
      lanche: (salts[`${today}|lanche`] ?? 0) + 1,
      jantar: (salts[`${today}|jantar`] ?? 0) + 1,
    };
    for (const m of ALL_MEALS) salts[`${today}|${m}`] = bump[m];
    writeSalts(salts);
    persist(buildPlan(today, profile?.name ?? "bebê", profile, bump));
  }, [profile, persist]);

  const markServed = useCallback(
    (meal: Meal) => {
      if (!plan) return;
      const entry = plan.meals[meal];
      const servedAt = new Date().toISOString();
      persist({
        ...plan,
        meals: { ...plan.meals, [meal]: { ...entry, servedAt } },
      });
      addHistoryEntry({
        date: plan.date,
        meal,
        recipeId: entry.recipeId,
        servedAt,
      });
    },
    [plan, persist]
  );

  const setFeedback = useCallback(
    (meal: Meal, feedback: Feedback) => {
      if (!plan) return;
      const entry = plan.meals[meal];
      const servedAt = entry.servedAt ?? new Date().toISOString();
      persist({
        ...plan,
        meals: {
          ...plan.meals,
          [meal]: { ...entry, servedAt, feedback },
        },
      });
      addHistoryEntry({
        date: plan.date,
        meal,
        recipeId: entry.recipeId,
        servedAt,
        feedback,
      });
    },
    [plan, persist]
  );

  return { plan, hydrated, swapMeal, regenerateAll, markServed, setFeedback };
}
