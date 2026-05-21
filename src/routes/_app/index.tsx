import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Check, RefreshCcw, Shuffle, Sparkles, ChevronRight } from "lucide-react";
import { useBabyProfile } from "@/hooks/use-baby-profile";
import { useDailyPlan } from "@/hooks/use-daily-plan";
import { recipes } from "@/data/recipes";
import {
  ageBandFromMonths,
  ageInMonths,
  ALL_MEALS,
  formatShortDate,
  greeting,
} from "@/lib/baby";
import {
  AGE_LABEL,
  FEEDBACK_EMOJI,
  MEAL_LABEL,
  type Feedback,
  type Meal,
  type MealEntry,
} from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [
      { title: "Hoje — Receitas do Bebê" },
      {
        name: "description",
        content: "Seu plano alimentar do dia, pronto em segundos.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { profile } = useBabyProfile();
  const { plan, hydrated, swapMeal, regenerateAll } = useDailyPlan();

  const byId = useMemo(
    () => Object.fromEntries(recipes.map((r) => [r.id, r])),
    []
  );

  const ageBand = profile
    ? ageBandFromMonths(ageInMonths(profile.birthMonth))
    : undefined;

  return (
    <div className="px-5 pt-10">
      <header>
        <p className="text-sm text-muted-foreground">
          {greeting()}, mamãe 👋
        </p>
        <h1 className="mt-2 font-display text-[28px] leading-[1.15] text-foreground">
          O que {profile?.name ? `o ${profile.name}` : "o bebê"} vai
          comer hoje?
        </h1>
        <p className="mt-1.5 text-xs text-muted-foreground">
          {formatShortDate()} {ageBand ? `· ${AGE_LABEL[ageBand]}` : ""}
        </p>
      </header>

      <section className="mt-7 flex flex-col gap-3">
        {hydrated && plan
          ? ALL_MEALS.map((m) => (
              <MealCard
                key={m}
                meal={m}
                entry={plan.meals[m]}
                recipe={byId[plan.meals[m].recipeId]}
                onSwap={() => swapMeal(m)}
              />
            ))
          : ALL_MEALS.map((m) => <Skeleton key={m} />)}
      </section>

      <div className="mt-6 flex flex-col gap-2">
        <button
          type="button"
          onClick={regenerateAll}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-accent text-sm font-medium text-accent-foreground transition-colors active:bg-accent/90"
        >
          <RefreshCcw className="h-4 w-4" /> Gerar sugestões do dia
        </button>
        <Link
          to="/sos"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-card text-sm font-medium text-foreground"
        >
          <Sparkles className="h-4 w-4 text-accent" /> Estou sem ideias agora
        </Link>
      </div>
    </div>
  );
}

function MealCard({
  meal,
  entry,
  recipe,
  onSwap,
}: {
  meal: Meal;
  entry: MealEntry;
  recipe: (typeof recipes)[number] | undefined;
  onSwap: () => void;
}) {
  const served = !!entry.servedAt;
  const fb = entry.feedback as Feedback | undefined;

  if (!recipe) {
    return (
      <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-4">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-secondary text-3xl">
          🍽️
        </div>
        <div className="flex-1">
          <p className="text-[11px] font-medium uppercase tracking-wider text-accent">
            {MEAL_LABEL[meal]}
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Sem sugestão. Toque em trocar.
          </p>
        </div>
        <button
          onClick={onSwap}
          className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-foreground/70"
          aria-label="Trocar"
        >
          <Shuffle className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-3xl bg-card p-3 ring-1 ring-border/60 shadow-[0_1px_2px_rgba(60,40,20,0.04),0_8px_24px_-14px_rgba(60,40,20,0.10)] transition-opacity",
        served && "opacity-80"
      )}
    >
      <div className="flex items-center gap-4">
        <Link
          to="/receitas/$id"
          params={{ id: recipe.id }}
          className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-secondary text-4xl"
        >
          {recipe.emoji}
        </Link>
        <Link
          to="/receitas/$id"
          params={{ id: recipe.id }}
          className="min-w-0 flex-1"
        >
          <div className="flex items-center gap-2">
            <p className="text-[11px] font-medium uppercase tracking-wider text-accent">
              {MEAL_LABEL[meal]}
            </p>
            {served && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-medium text-foreground/70">
                <Check className="h-3 w-3" /> servido
                {fb && <span className="ml-0.5">{FEEDBACK_EMOJI[fb]}</span>}
              </span>
            )}
          </div>
          <p className="mt-0.5 line-clamp-2 font-display text-[17px] leading-snug text-foreground">
            {recipe.title}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {recipe.timeMinutes} min · {AGE_LABEL[recipe.ageBands[0]]}
          </p>
        </Link>
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-border/60 pt-3">
        <button
          type="button"
          onClick={onSwap}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-secondary py-2 text-xs font-medium text-foreground/75 transition-colors active:bg-secondary/70"
        >
          <Shuffle className="h-3.5 w-3.5" /> Trocar
        </button>
        <Link
          to="/receitas/$id"
          params={{ id: recipe.id }}
          className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl bg-foreground/90 py-2 text-xs font-medium text-background"
        >
          Abrir <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="flex h-[116px] items-center gap-4 rounded-3xl border border-border bg-card/60 p-3">
      <div className="h-20 w-20 rounded-2xl bg-secondary/60" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-20 rounded-full bg-secondary/60" />
        <div className="h-4 w-3/4 rounded-full bg-secondary/60" />
        <div className="h-3 w-1/3 rounded-full bg-secondary/60" />
      </div>
    </div>
  );
}
