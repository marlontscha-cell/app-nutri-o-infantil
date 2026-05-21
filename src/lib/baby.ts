import type { AgeBand, BabyProfile, Meal, Recipe, Restriction } from "./types";
import { recipes } from "@/data/recipes";

export function ageInMonths(birthMonth: string, today = new Date()): number {
  const d = new Date(birthMonth);
  return Math.max(
    0,
    (today.getFullYear() - d.getFullYear()) * 12 + (today.getMonth() - d.getMonth())
  );
}

export function ageBandFromMonths(months: number): AgeBand {
  if (months < 8) return "6-8m";
  if (months < 12) return "8-12m";
  if (months < 24) return "1-2a";
  return "2-3a";
}

export function describeAge(months: number): string {
  if (months < 12) return `${months} meses`;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (rest === 0) return `${years} ${years === 1 ? "ano" : "anos"}`;
  return `${years}a ${rest}m`;
}

export function greeting(now = new Date()): string {
  const h = now.getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

export function todayISO(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function formatShortDate(date = new Date()): string {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  })
    .format(date)
    .replace(".", "");
}

function respectsRestrictions(recipe: Recipe, restrictions: Restriction[]): boolean {
  return restrictions.every((r) => recipe.restrictionsSafe.includes(r));
}

export function filterRecipes(
  profile: BabyProfile | null,
  opts: {
    meal?: Meal;
    ageBand?: AgeBand;
    quick?: boolean;
    blw?: boolean;
    acceptance?: boolean;
    minimal?: boolean;
    extraRestrictions?: Restriction[];
  } = {}
): Recipe[] {
  const restrictions = [
    ...(profile?.restrictions ?? []),
    ...(opts.extraRestrictions ?? []),
  ];
  const band =
    opts.ageBand ??
    (profile ? ageBandFromMonths(ageInMonths(profile.birthMonth)) : undefined);

  return recipes.filter((r) => {
    if (opts.meal && r.meal !== opts.meal) return false;
    if (band && !r.ageBands.includes(band)) return false;
    if (opts.quick && !r.quick) return false;
    if (opts.blw && !r.blwFriendly) return false;
    if (opts.acceptance && !r.acceptanceFriendly) return false;
    if (opts.minimal && r.ingredients.length > 5) return false;
    if (!respectsRestrictions(r, restrictions)) return false;
    return true;
  });
}

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function dailySuggestion(
  profile: BabyProfile | null,
  meal: Meal,
  date = new Date(),
  salt = 0
): Recipe | null {
  const pool = filterRecipes(profile, { meal });
  const list =
    pool.length > 0 ? pool : recipes.filter((r) => r.meal === meal);
  if (list.length === 0) return null;
  const seed = `${todayISO(date)}|${profile?.name ?? "x"}|${meal}|${salt}`;
  return list[hash(seed) % list.length];
}

export const ALL_MEALS: Meal[] = ["cafe", "almoco", "lanche", "jantar"];
