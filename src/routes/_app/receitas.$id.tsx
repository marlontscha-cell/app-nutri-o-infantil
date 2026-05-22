import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Heart, Clock, Baby, Check, Leaf, Snowflake, Refrigerator } from "lucide-react";

import { recipes } from "@/data/recipes";
import { useFavorites } from "@/hooks/use-favorites";
import { useDailyPlan } from "@/hooks/use-daily-plan";
import {
  AGE_LABEL,
  DIFFICULTY_LABEL,
  FEEDBACK_EMOJI,
  FEEDBACK_LABEL,
  MEAL_LABEL,
  RESTRICTION_LABEL,
  type AgeBand,
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
  const [heartBeat, setHeartBeat] = useState(0);
  const [servedBeat, setServedBeat] = useState(0);

  const handleToggleFav = () => {
    const willFav = !fav;
    toggle(recipe.id);
    setHeartBeat((n) => n + 1);
    if (willFav) {
      toast.success("Receita adicionada aos favoritos 💛");
    } else {
      toast("Receita removida dos favoritos");
    }
  };

  const handleMarkServed = (meal: Meal) => {
    markServed(meal);
    setServedBeat((n) => n + 1);
    toast.success("Refeição marcada como servida 🍽️");
  };


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

  const textureEntries = recipe.textureGuide
    ? (Object.entries(recipe.textureGuide) as Array<[AgeBand, string]>)
    : [];

  return (
    <div className="pb-32">
      {/* Hero image */}
      <div className="relative">
        <div className="aspect-[10/9] w-full overflow-hidden bg-secondary">
          {recipe.image ? (
            <img
              src={recipe.image}
              alt={recipe.title}
              width={1024}
              height={922}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[150px]">
              {recipe.emoji}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => router.history.back()}
          className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/85 shadow-sm backdrop-blur"
          aria-label="Voltar"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={handleToggleFav}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/85 shadow-sm backdrop-blur active:scale-95 transition-transform"
          aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart
            key={heartBeat}
            className={cn(
              "h-5 w-5 transition-colors",
              fav && "fill-accent text-accent",
              heartBeat > 0 && "animate-[heart-pop_400ms_ease-out]"
            )}
          />
        </button>

      </div>

      {/* Header */}
      <div className="px-5 pt-7">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium uppercase tracking-wider text-accent">
          <span>{MEAL_LABEL[recipe.meal]}</span>
          {recipe.ageBands.map((a) => (
            <span key={a} className="text-foreground/40">
              · <span className="text-foreground/55">{AGE_LABEL[a]}</span>
            </span>
          ))}
        </div>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-foreground">
          {recipe.title}
        </h1>

        <div className="mt-3 flex flex-wrap gap-2">
          <MetaPill>
            <Clock className="h-3.5 w-3.5" /> {recipe.timeMinutes} min
          </MetaPill>
          {recipe.difficulty && (
            <MetaPill>{DIFFICULTY_LABEL[recipe.difficulty]}</MetaPill>
          )}
          {recipe.blwFriendly && (
            <MetaPill>
              <Baby className="h-3.5 w-3.5" /> BLW
            </MetaPill>
          )}
          {recipe.restrictionsSafe.slice(0, 3).map((r) => (
            <MetaPill key={r}>
              <Leaf className="h-3 w-3" /> {RESTRICTION_LABEL[r]}
            </MetaPill>
          ))}
        </div>

        {/* Acceptance tip */}
        {recipe.acceptanceTip && (
          <Callout tone="accent" eyebrow="Dica de aceitação">
            {recipe.acceptanceTip}
          </Callout>
        )}

        {/* Ingredients */}
        <Section title="Ingredientes" subtitle={`${recipe.ingredients.length} itens`}>
          <ul className="flex flex-col gap-2.5">
            {recipe.ingredients.map((i, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground/85"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Steps */}
        <Section
          title="Modo de preparo"
          subtitle={`${recipe.steps.length} passos`}
        >
          <ol className="flex flex-col gap-5">
            {recipe.steps.map((s) => (
              <li key={s.step} className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/15 text-sm font-semibold text-accent">
                  {s.step}
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="font-display text-[17px] leading-snug text-foreground">
                    {s.title}
                  </p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-foreground/75">
                    {s.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* Texture guide by age */}
        {textureEntries.length > 0 && (
          <Section title="Textura ideal por idade">
            <div className="flex flex-col gap-2.5">
              {textureEntries.map(([age, desc]) => (
                <div
                  key={age}
                  className="rounded-2xl bg-secondary/60 p-4"
                >
                  <p className="text-[11px] font-medium uppercase tracking-wider text-accent">
                    {AGE_LABEL[age]}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/85">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Nutrition highlights */}
        {recipe.nutritionHighlights && recipe.nutritionHighlights.length > 0 && (
          <Section title="Destaques nutricionais">
            <div className="flex flex-wrap gap-2">
              {recipe.nutritionHighlights.map((n) => (
                <span
                  key={n}
                  className="inline-flex items-center rounded-full bg-primary/15 px-3.5 py-1.5 text-sm text-foreground/80"
                >
                  {n}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Storage */}
        {recipe.storage && (recipe.storage.fridge || recipe.storage.freezer) && (
          <Section title="Conservação">
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {recipe.storage.fridge && (
                <StorageCard
                  icon={<Refrigerator className="h-4 w-4" />}
                  label="Geladeira"
                  text={recipe.storage.fridge}
                />
              )}
              {recipe.storage.freezer && (
                <StorageCard
                  icon={<Snowflake className="h-4 w-4" />}
                  label="Freezer"
                  text={recipe.storage.freezer}
                />
              )}
            </div>
          </Section>
        )}

        {/* Feeding tip (closing) */}
        {recipe.feedingTip && (
          <Callout tone="primary" eyebrow="Dica da introdução">
            {recipe.feedingTip}
          </Callout>
        )}
      </div>

      {/* Sticky action bar */}
      {planMeal && (
        <div className="fixed inset-x-0 bottom-16 z-30 mx-auto max-w-md px-4 pb-2">
          <div className="rounded-2xl border border-border bg-background/95 p-3 shadow-[0_-4px_24px_-12px_rgba(60,40,20,0.18)] backdrop-blur">
            {!served ? (
              <button
                type="button"
                onClick={() => handleMarkServed(planMeal)}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent text-sm font-medium text-accent-foreground transition-transform active:scale-[0.97] active:bg-accent/90"
              >
                <Check
                  key={servedBeat}
                  className={cn(
                    "h-4 w-4",
                    servedBeat > 0 && "animate-[served-pop_500ms_ease-out]"
                  )}
                />{" "}
                Marcar como servido
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

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-9 border-t border-border/60 pt-7">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-display text-xl text-foreground">{title}</h2>
        {subtitle && (
          <span className="text-xs text-muted-foreground">{subtitle}</span>
        )}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function MetaPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs text-foreground/70">
      {children}
    </span>
  );
}

function Callout({
  eyebrow,
  children,
  tone,
}: {
  eyebrow: string;
  children: React.ReactNode;
  tone: "accent" | "primary";
}) {
  return (
    <div
      className={cn(
        "mt-6 rounded-2xl p-5",
        tone === "accent" ? "bg-accent/10" : "bg-primary/15"
      )}
    >
      <p className="text-[11px] font-medium uppercase tracking-wider text-foreground/65">
        💡 {eyebrow}
      </p>
      <p className="mt-2 text-[15px] leading-relaxed text-foreground/85">
        {children}
      </p>
    </div>
  );
}

function StorageCard({
  icon,
  label,
  text,
}: {
  icon: React.ReactNode;
  label: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-accent">
        {icon}
        <span className="text-[11px] font-medium uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-foreground/80">{text}</p>
    </div>
  );
}
