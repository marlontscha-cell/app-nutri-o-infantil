import { Link } from "@tanstack/react-router";
import { Clock, Heart } from "lucide-react";
import type { Recipe } from "@/lib/types";
import { AGE_LABEL } from "@/lib/types";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

export function RecipeCard({
  recipe,
  variant = "tall",
}: {
  recipe: Recipe;
  variant?: "tall" | "wide" | "compact";
}) {
  const { has, toggle } = useFavorites();
  const fav = has(recipe.id);
  const ageLabel = AGE_LABEL[recipe.ageBands[0]];

  if (variant === "compact") {
    return (
      <Link
        to="/receitas/$id"
        params={{ id: recipe.id }}
        className="group flex w-[170px] shrink-0 flex-col gap-2"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
          {recipe.image ? (
            <img src={recipe.image} alt="" loading="lazy" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-5xl">
              {recipe.emoji}
            </div>
          )}
        </div>
        <div>
          <p className="line-clamp-2 text-sm font-medium leading-snug text-foreground">
            {recipe.title}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {recipe.timeMinutes} min · {ageLabel}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/receitas/$id"
      params={{ id: recipe.id }}
      className={cn(
        "group block overflow-hidden rounded-3xl bg-card shadow-[0_1px_2px_rgba(60,40,20,0.04),0_8px_24px_-12px_rgba(60,40,20,0.10)] ring-1 ring-border/60 transition-transform active:scale-[0.99]"
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        {recipe.image ? (
          <img src={recipe.image} alt="" loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-7xl">
            {recipe.emoji}
          </div>
        )}
        <button
          type="button"
          aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          onClick={(e) => {
            e.preventDefault();
            toggle(recipe.id);
          }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/85 backdrop-blur transition-colors"
        >
          <Heart
            className={cn("h-4 w-4", fav ? "fill-accent text-accent" : "text-foreground")}
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg leading-tight text-foreground">
          {recipe.title}
        </h3>
        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {recipe.timeMinutes} min
          </span>
          <span>•</span>
          <span>{ageLabel}</span>
          {recipe.blwFriendly && (
            <>
              <span>•</span>
              <span>BLW</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
