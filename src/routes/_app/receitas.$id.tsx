import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Heart, Clock, Baby } from "lucide-react";
import { recipes } from "@/data/recipes";
import { useFavorites } from "@/hooks/use-favorites";
import { AGE_LABEL, MEAL_LABEL, RESTRICTION_LABEL } from "@/lib/types";
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
      <Link to="/receitas" className="mt-4 inline-block text-accent">
        Voltar
      </Link>
    </div>
  ),
  component: RecipeDetail,
});

function RecipeDetail() {
  const { recipe } = Route.useLoaderData();
  const { has, toggle } = useFavorites();
  const fav = has(recipe.id);

  return (
    <div>
      {/* Hero */}
      <div className="relative">
        <div className="flex aspect-square w-full items-center justify-center bg-secondary text-[140px]">
          {recipe.emoji}
        </div>
        <Link
          to="/receitas"
          className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/85 backdrop-blur"
          aria-label="Voltar"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
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
