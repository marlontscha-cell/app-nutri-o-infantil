import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useBabyProfile } from "@/hooks/use-baby-profile";
import type { FeedingStyle, Restriction } from "@/lib/types";
import { RESTRICTION_LABEL } from "@/lib/types";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Boas-vindas — Receitas do Bebê" },
      { name: "description", content: "Personalize tudo para o seu bebê em menos de um minuto." },
    ],
  }),
  component: Onboarding,
});

const STEPS = 4;

function Onboarding() {
  const navigate = useNavigate();
  const { save } = useBabyProfile();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [birth, setBirth] = useState(""); // yyyy-mm
  const [style, setStyle] = useState<FeedingStyle | null>(null);
  const [restrictions, setRestrictions] = useState<Restriction[]>([]);

  const canNext =
    (step === 0 && name.trim().length > 0) ||
    (step === 1 && birth.length === 7) ||
    (step === 2 && style !== null) ||
    step === 3;

  function next() {
    if (step < STEPS - 1) {
      setStep(step + 1);
      return;
    }
    save({
      name: name.trim(),
      birthMonth: `${birth}-01`,
      feedingStyle: style!,
      restrictions,
    });
    navigate({ to: "/home" });
  }

  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto flex min-h-svh max-w-md flex-col px-6 pb-10 pt-8">
        {/* progresso */}
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors",
                i <= step ? "bg-accent" : "bg-secondary"
              )}
            />
          ))}
        </div>

        <div className="flex-1 pt-12">
          {step === 0 && (
            <Step
              eyebrow="Vamos começar 💛"
              title="Qual o nome do bebê?"
              subtitle="Vamos personalizar tudo para ele."
            >
              <Input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex.: João"
                className="h-14 rounded-2xl border-border bg-card px-5 text-lg"
              />
            </Step>
          )}

          {step === 1 && (
            <Step
              eyebrow={`Que bom, ${name || "mamãe"}!`}
              title="Quando o bebê nasceu?"
              subtitle="Mês e ano são suficientes."
            >
              <Input
                type="month"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
                max={new Date().toISOString().slice(0, 7)}
                className="h-14 rounded-2xl border-border bg-card px-5 text-lg"
              />
            </Step>
          )}

          {step === 2 && (
            <Step
              eyebrow="Quase lá"
              title="Como é a alimentação?"
              subtitle="Você pode mudar quando quiser."
            >
              <div className="flex flex-col gap-3">
                {[
                  { v: "tradicional" as const, t: "Tradicional", d: "Papinhas e purês." },
                  { v: "blw" as const, t: "BLW", d: "O bebê come com as próprias mãos." },
                  { v: "misto" as const, t: "Misto", d: "Um pouco dos dois." },
                ].map((o) => (
                  <button
                    key={o.v}
                    type="button"
                    onClick={() => setStyle(o.v)}
                    className={cn(
                      "rounded-2xl border bg-card p-4 text-left transition-all",
                      style === o.v
                        ? "border-accent ring-2 ring-accent/30"
                        : "border-border hover:border-accent/40"
                    )}
                  >
                    <p className="font-medium text-foreground">{o.t}</p>
                    <p className="text-sm text-muted-foreground">{o.d}</p>
                  </button>
                ))}
              </div>
            </Step>
          )}

          {step === 3 && (
            <Step
              eyebrow="Por último"
              title="Alguma restrição?"
              subtitle="Vamos filtrar as receitas para você. (opcional)"
            >
              <div className="flex flex-wrap gap-2">
                {(Object.keys(RESTRICTION_LABEL) as Restriction[]).map((r) => {
                  const on = restrictions.includes(r);
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() =>
                        setRestrictions((p) =>
                          p.includes(r) ? p.filter((x) => x !== r) : [...p, r]
                        )
                      }
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors",
                        on
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border bg-card text-foreground"
                      )}
                    >
                      {on && <Check className="h-3.5 w-3.5" />}
                      {RESTRICTION_LABEL[r]}
                    </button>
                  );
                })}
              </div>
            </Step>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={next}
            disabled={!canNext}
            className="h-14 rounded-2xl bg-accent text-base font-medium text-accent-foreground hover:bg-accent/90 disabled:opacity-40"
          >
            {step === STEPS - 1 ? "Tudo pronto" : "Continuar"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          {step === 3 && (
            <button
              onClick={() => {
                setRestrictions([]);
                next();
              }}
              className="text-sm text-muted-foreground"
            >
              Pular por agora
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Step({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium text-accent">{eyebrow}</p>
        <h1 className="mt-2 font-display text-3xl leading-tight text-foreground">
          {title}
        </h1>
        <p className="mt-2 text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
