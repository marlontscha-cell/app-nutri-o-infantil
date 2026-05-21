import { createFileRoute, Link } from "@tanstack/react-router";
import { useBabyProfile } from "@/hooks/use-baby-profile";
import { ageBandFromMonths, ageInMonths } from "@/lib/baby";
import { AGE_LABEL, AGE_HINT } from "@/lib/types";
import type { AgeBand } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/idades")({
  head: () => ({
    meta: [
      { title: "Por idade — Receitas do Bebê" },
      { name: "description", content: "Receitas seguras para cada fase da introdução alimentar." },
    ],
  }),
  component: IdadesPage,
});

const BANDS: AgeBand[] = ["6-8m", "8-12m", "1-2a", "2-3a"];

function IdadesPage() {
  const { profile } = useBabyProfile();
  const current = profile ? ageBandFromMonths(ageInMonths(profile.birthMonth)) : null;

  return (
    <div className="px-5 pt-10">
      <h1 className="font-display text-3xl leading-tight text-foreground">
        Por idade
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Cada fase tem texturas e sabores certos para o bebê.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {BANDS.map((b) => {
          const isCurrent = current === b;
          return (
            <Link
              key={b}
              to="/receitas"
              search={{ age: b }}
              className={cn(
                "flex items-center justify-between rounded-3xl border bg-card p-5 transition-colors",
                isCurrent ? "border-primary bg-primary/10" : "border-border"
              )}
            >
              <div>
                {isCurrent && (
                  <p className="text-[11px] font-medium uppercase tracking-wider text-accent">
                    Fase atual
                  </p>
                )}
                <p className="mt-0.5 font-display text-xl text-foreground">
                  {AGE_LABEL[b]}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {AGE_HINT[b]}
                </p>
              </div>
              <span className="font-display text-3xl text-foreground/30">
                →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
