import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { recipes } from "@/data/recipes";
import { RecipeCard } from "@/components/recipe-card";
import { useBabyProfile } from "@/hooks/use-baby-profile";

export const Route = createFileRoute("/_app/favoritos")({
  head: () => ({
    meta: [
      { title: "Favoritos — Receitas do Bebê" },
      { name: "description", content: "Suas receitas favoritas em um só lugar." },
    ],
  }),
  component: FavoritosPage,
});

function FavoritosPage() {
  const { ids } = useFavorites();
  const { profile } = useBabyProfile();
  const favs = recipes.filter((r) => ids.includes(r.id));

  return (
    <div className="px-5 pt-10">
      <h1 className="font-display text-3xl leading-tight text-foreground">
        Favoritos
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        As receitas que {profile?.name ?? "o bebê"} mais gosta.
      </p>

      {favs.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-3xl border border-border bg-card p-10 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-accent/10 text-accent">
            <Heart className="h-6 w-6" />
          </span>
          <p className="mt-4 font-display text-lg text-foreground">
            Sem favoritas por enquanto
          </p>
          <p className="mt-1 max-w-[240px] text-sm text-muted-foreground">
            Toque no ♥ em qualquer receita para guardar aqui.
          </p>
          <Link
            to="/receitas"
            className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground"
          >
            Explorar receitas
          </Link>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {favs.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      )}
    </div>
  );
}
