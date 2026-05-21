import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ChevronRight, HeartHandshake, Sparkles, Clock } from "lucide-react";
import { useBabyProfile } from "@/hooks/use-baby-profile";
import {
  ALL_MEALS,
  ageBandFromMonths,
  ageInMonths,
  dailySuggestion,
  filterRecipes,
  greeting,
} from "@/lib/baby";
import { MEAL_EMOJI, MEAL_LABEL, AGE_LABEL } from "@/lib/types";
import { RecipeCard } from "@/components/recipe-card";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [
      { title: "Início — Receitas do Bebê" },
      { name: "description", content: "O que o seu bebê vai comer hoje? Sugestões prontas para o dia." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { profile } = useBabyProfile();

  const ageBand = profile
    ? ageBandFromMonths(ageInMonths(profile.birthMonth))
    : undefined;

  const suggestions = useMemo(
    () =>
      ALL_MEALS.slice(0, 3).map((meal) => ({
        meal,
        recipe: dailySuggestion(profile, meal),
      })),
    [profile]
  );

  const quick = useMemo(
    () => filterRecipes(profile, { quick: true }).slice(0, 8),
    [profile]
  );

  return (
    <div className="px-5 pt-10">
      {/* Hero */}
      <header>
        <p className="text-sm text-muted-foreground">
          {greeting()}, {profile?.name ? "mamãe" : "olá"} 💛
        </p>
        <h1 className="mt-2 font-display text-[28px] leading-[1.15] text-foreground">
          O que {profile?.name ? `o ${profile.name}` : "o bebê"} vai
          comer hoje?
        </h1>
      </header>

      {/* Atalhos de refeição */}
      <div className="mt-6 grid grid-cols-4 gap-2">
        {ALL_MEALS.map((m) => (
          <Link
            key={m}
            to="/receitas"
            search={{ meal: m }}
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-card p-3 transition-colors active:bg-secondary"
          >
            <span className="text-2xl">{MEAL_EMOJI[m]}</span>
            <span className="text-[11px] font-medium text-foreground/80">
              {shortMeal(m)}
            </span>
          </Link>
        ))}
      </div>

      {/* Sem ideias hoje */}
      <section className="mt-9">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-xl text-foreground">
            Sem ideias hoje?
          </h2>
          <span className="text-xs text-muted-foreground">3 sugestões</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Já pensamos por você. Adaptado{" "}
          {ageBand ? `para ${AGE_LABEL[ageBand].toLowerCase()}` : ""}.
        </p>

        <div className="mt-4 flex flex-col gap-3">
          {suggestions.map(({ meal, recipe }) =>
            recipe ? (
              <Link
                key={meal}
                to="/receitas/$id"
                params={{ id: recipe.id }}
                className="group flex items-center gap-4 rounded-3xl bg-card p-3 ring-1 ring-border/60 shadow-[0_1px_2px_rgba(60,40,20,0.04),0_8px_24px_-14px_rgba(60,40,20,0.10)] active:scale-[0.99] transition-transform"
              >
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-secondary text-4xl">
                  {recipe.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-accent">
                    {MEAL_LABEL[meal]}
                  </p>
                  <p className="mt-0.5 line-clamp-2 font-display text-[17px] leading-snug text-foreground">
                    {recipe.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {recipe.timeMinutes} min · {AGE_LABEL[recipe.ageBands[0]]}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
              </Link>
            ) : null
          )}
        </div>
      </section>

      {/* Rejeita comida */}
      <Link
        to="/receitas"
        search={{ acceptance: true }}
        className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
      >
        <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/10 text-accent">
          <HeartHandshake className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            Meu bebê rejeita comida
          </p>
          <p className="text-xs text-muted-foreground">
            Receitas mais fáceis de aceitar
          </p>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </Link>

      {/* Receitas rápidas */}
      <section className="mt-9">
        <div className="flex items-end justify-between pr-1">
          <h2 className="font-display text-xl text-foreground">
            Receitas rápidas
          </h2>
          <Link
            to="/receitas"
            search={{ quick: true }}
            className="inline-flex items-center gap-0.5 text-sm text-muted-foreground"
          >
            ver todas <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5" /> Prontas em até 15 minutos
        </p>
        <div className="-mx-5 mt-4 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {quick.map((r) => (
            <RecipeCard key={r.id} recipe={r} variant="compact" />
          ))}
        </div>
      </section>

      {/* Por idade */}
      <section className="mt-8">
        <h2 className="font-display text-xl text-foreground">
          Por idade {profile?.name ? `do ${profile.name}` : ""}
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {(["6-8m", "8-12m", "1-2a", "2-3a"] as const).map((b) => (
            <Link
              key={b}
              to="/receitas"
              search={{ age: b }}
              className={cn(
                "rounded-2xl border bg-card p-4 transition-colors",
                ageBand === b
                  ? "border-primary bg-primary/10"
                  : "border-border"
              )}
            >
              <div className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                <span className="text-xs font-medium text-foreground/70">
                  {AGE_LABEL[b]}
                </span>
              </div>
              <p className="mt-2 font-display text-base leading-snug text-foreground">
                {labelFromBand(b)}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function shortMeal(m: string) {
  return { cafe: "Café", almoco: "Almoço", lanche: "Lanche", jantar: "Jantar" }[
    m
  ];
}

function labelFromBand(b: string) {
  return {
    "6-8m": "Texturas suaves",
    "8-12m": "Pedacinhos macios",
    "1-2a": "Comida da família",
    "2-3a": "Refeições completas",
  }[b];
}
