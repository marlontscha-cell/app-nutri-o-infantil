import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { z } from "zod";
import { Clock, Sparkles, Baby, Leaf, X } from "lucide-react";
import { useBabyProfile } from "@/hooks/use-baby-profile";
import { ALL_MEALS, filterRecipes } from "@/lib/baby";
import { MEAL_LABEL, AGE_LABEL, RESTRICTION_LABEL } from "@/lib/types";
import type { Meal, AgeBand, Restriction } from "@/lib/types";
import { RecipeCard } from "@/components/recipe-card";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  meal: z.enum(["cafe", "almoco", "lanche", "jantar"]).optional(),
  age: z.enum(["6-8m", "8-12m", "1-2a", "2-3a"]).optional(),
  quick: z.boolean().optional(),
  blw: z.boolean().optional(),
  acceptance: z.boolean().optional(),
  r: z.array(z.enum(["sem_ovo", "sem_leite", "sem_gluten", "vegetariano"])).optional(),
});

export const Route = createFileRoute("/_app/receitas")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Receitas — Receitas do Bebê" },
      { name: "description", content: "Receitas filtradas pela idade e restrições do seu bebê." },
    ],
  }),
  component: ReceitasPage,
});

function ReceitasPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { profile } = useBabyProfile();

  const recipes = useMemo(
    () =>
      filterRecipes(profile, {
        meal: search.meal,
        ageBand: search.age,
        quick: search.quick,
        blw: search.blw,
        acceptance: search.acceptance,
        extraRestrictions: search.r,
      }),
    [profile, search]
  );

  const hasFilter =
    !!search.quick || !!search.blw || !!search.acceptance || (search.r?.length ?? 0) > 0;

  function toggleFlag(key: "quick" | "blw" | "acceptance") {
    navigate({ search: (s) => ({ ...s, [key]: s[key] ? undefined : true }) });
  }
  function toggleR(r: Restriction) {
    navigate({
      search: (s) => {
        const cur = s.r ?? [];
        const next = cur.includes(r) ? cur.filter((x) => x !== r) : [...cur, r];
        return { ...s, r: next.length ? next : undefined };
      },
    });
  }

  return (
    <div className="px-5 pt-10">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl leading-tight text-foreground">
            Receitas
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {search.age
              ? `${AGE_LABEL[search.age]}`
              : profile
              ? `Adaptadas para ${profile.name}`
              : "Para o seu bebê"}
          </p>
        </div>
        {hasFilter && (
          <button
            onClick={() =>
              navigate({ search: { meal: search.meal, age: search.age } })
            }
            className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"
          >
            <X className="h-3 w-3" /> limpar
          </button>
        )}
      </header>

      {/* Meal tabs */}
      <div className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Chip
          active={!search.meal}
          onClick={() => navigate({ search: (s) => ({ ...s, meal: undefined }) })}
        >
          Tudo
        </Chip>
        {ALL_MEALS.map((m) => (
          <Chip
            key={m}
            active={search.meal === m}
            onClick={() =>
              navigate({ search: (s) => ({ ...s, meal: s.meal === m ? undefined : m }) })
            }
          >
            {MEAL_LABEL[m]}
          </Chip>
        ))}
      </div>

      {/* Filtros */}
      <div className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Chip active={!!search.quick} onClick={() => toggleFlag("quick")}>
          <Clock className="h-3 w-3" /> Rápida
        </Chip>
        <Chip active={!!search.blw} onClick={() => toggleFlag("blw")}>
          <Baby className="h-3 w-3" /> BLW
        </Chip>
        <Chip
          active={!!search.acceptance}
          onClick={() => toggleFlag("acceptance")}
        >
          <Sparkles className="h-3 w-3" /> Aceitação
        </Chip>
        {(["sem_ovo", "sem_leite", "sem_gluten", "vegetariano"] as Restriction[]).map(
          (r) => (
            <Chip
              key={r}
              active={search.r?.includes(r) ?? false}
              onClick={() => toggleR(r)}
            >
              <Leaf className="h-3 w-3" /> {RESTRICTION_LABEL[r]}
            </Chip>
          )
        )}
      </div>

      {/* Lista */}
      <div className="mt-6 flex flex-col gap-4">
        {recipes.length === 0 ? (
          <EmptyState />
        ) : (
          recipes.map((r) => <RecipeCard key={r.id} recipe={r} />)
        )}
      </div>

      {/* Atalho por idade */}
      <Link
        to="/idades"
        className="mt-6 flex items-center justify-center rounded-2xl border border-dashed border-border bg-card px-4 py-3 text-sm text-muted-foreground"
      >
        Explorar receitas por faixa etária →
      </Link>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
        active
          ? "border-accent bg-accent/10 text-accent"
          : "border-border bg-card text-foreground/70"
      )}
    >
      {children}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl border border-border bg-card p-8 text-center">
      <p className="text-3xl">🍽️</p>
      <p className="mt-3 font-display text-lg text-foreground">
        Nada por aqui ainda
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Tente remover algum filtro para ver mais opções.
      </p>
    </div>
  );
}
