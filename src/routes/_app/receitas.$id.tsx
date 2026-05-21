import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useMemo } from "react";
import { ArrowLeft, Heart, Clock, Baby, Check } from "lucide-react";
import { recipes } from "@/data/recipes";
import { useFavorites } from "@/hooks/use-favorites";
import { useDailyPlan } from "@/hooks/use-daily-plan";
import {
  AGE_LABEL,
  FEEDBACK_EMOJI,
  FEEDBACK_LABEL,
  MEAL_LABEL,
  RESTRICTION_LABEL,
  type Feedback,
  type Meal,
} from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/receitas/$id")({
  loader: ({ params }) => {
    const recipe = recipes.find((r) => r.id === params.id);
    if (!recipe) throw notFound();
    return { recipe };
  },
  head: ({ loaderData }) => ({
    meta: loaderData?.recipe
      ? [
          { title: `${loaderData.recipe.title} — Receitas do Bebê` },
          {
            name: "description",
            content: `Receita ${loaderData.recipe.title.toLowerCase()} para bebês. ${loaderData.recipe.timeMinutes} minutos.`,
          },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="px-5 pt-20 text-center">
      <p className="font-display text-2xl">Receita não encontrada</p>
      <Link to="/" className="mt-4 inline-block text-accent">
        Voltar
      </Link>
    </div>
  ),
  component: RecipeDetail,
});

function RecipeDetail() {
  const { recipe } = Route.useLoaderData() as {
    recipe: (typeof recipes)[number];
  };
  const { has, toggle } = useFavorites();
  const { plan, markServed, setFeedback } = useDailyPlan();
  const router = useRouter();
  const fav = has(recipe.id);

  // Find which meal slot today this recipe occupies (if any)
  const planMeal = useMemo<Meal | null>(() => {
    if (!plan) return null;
    const entry = Object.entries(plan.meals).find(
      ([, v]) => v.recipeId === recipe.id
    );
    return (entry?.[0] as Meal) ?? null;
  }, [plan, recipe.id]);

  const planEntry = planMeal && plan ? plan.meals[planMeal] : undefined;
  const served = !!planEntry?.servedAt;
  const fb = planEntry?.feedback;

  return (
    <div className="pb-32">
      <div className="relative">
        <div className="flex aspect-square w-full items-center justify-center bg-secondary text-[140px]">
          {recipe.emoji}
        </div>
        <button
          type="button"
          onClick={() => router.history.back()}
          className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/85 backdrop-blur"
          aria-label="Voltar"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => toggle(recipe.id)}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/85 backdrop-blur"
          aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart className={cn("h-5 w-5", fav && "fill-accent text-accent")} />
        </button>
      </div>

      <div className="px-5 pt-6">
        <p className="text-xs font-medium uppercase tracking-wider text-accent">
          {MEAL_LABEL[recipe.meal]}
        </p>
        <h1 className="mt-1 font-display text-[28px] leading-tight text-foreground">
          {recipe.title}
        </h1>

        <div className="mt-3 flex flex-wrap gap-2">
          <Pill>
            <Clock className="h-3.5 w-3.5" /> {recipe.timeMinutes} min
          </Pill>
          <Pill>
            <Baby className="h-3.5 w-3.5" /> {AGE_LABEL[recipe.ageBands[0]]}
          </Pill>
          {recipe.blwFriendly && <Pill>BLW</Pill>}
          {recipe.restrictionsSafe.slice(0, 2).map((r) => (
            <Pill key={r}>{RESTRICTION_LABEL[r]}</Pill>
          ))}
        </div>

        {recipe.texture && (
          <div className="mt-5 rounded-2xl bg-secondary/60 p-4">
            <p className="text-[11px] font-medium uppercase tracking-wider text-foreground/60">
              Textura ideal
            </p>
            <p className="mt-1 text-sm text-foreground/85">{recipe.texture}</p>
          </div>
        )}

        <Section title="Ingredientes">
          <ul className="flex flex-col gap-2">
            {recipe.ingredients.map((i, idx) => (
              <li key={idx} className="flex gap-3 text-foreground/85">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Modo de preparo">
          <ol className="flex flex-col gap-3">
            {recipe.steps.map((s, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/30 text-xs font-semibold text-foreground/80">
                  {idx + 1}
                </span>
                <span className="text-foreground/85">{s}</span>
              </li>
            ))}
          </ol>
        </Section>

        <div className="mt-8 rounded-2xl bg-primary/15 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-foreground/70">
            💡 Dica da introdução
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85">
            {recipe.tip}
          </p>
        </div>
      </div>

      {/* Sticky action bar */}
      {planMeal && (
        <div className="fixed inset-x-0 bottom-16 z-30 mx-auto max-w-md px-4 pb-2">
          <div className="rounded-2xl border border-border bg-background/95 p-3 shadow-[0_-4px_24px_-12px_rgba(60,40,20,0.18)] backdrop-blur">
            {!served ? (
              <button
                type="button"
                onClick={() => markServed(planMeal)}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent text-sm font-medium text-accent-foreground active:bg-accent/90"
              >
                <Check className="h-4 w-4" /> Marcar como servido
              </button>
            ) : (
              <div>
                <p className="text-center text-xs text-muted-foreground">
                  Como foi a aceitação?
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {(["amou", "aceitou", "rejeitou"] as Feedback[]).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFeedback(planMeal, f)}
                      className={cn(
                        "flex flex-col items-center justify-center gap-0.5 rounded-xl border py-2 text-xs font-medium transition-colors",
                        fb === f
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border bg-card text-foreground/70"
                      )}
                    >
                      <span className="text-xl leading-none">
                        {FEEDBACK_EMOJI[f]}
                      </span>
                      <span>{FEEDBACK_LABEL[f]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="font-display text-xl text-foreground">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs text-foreground/70">
      {children}
    </span>
  );
}
