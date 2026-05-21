import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, LogOut } from "lucide-react";
import { useBabyProfile } from "@/hooks/use-baby-profile";
import type { FeedingStyle, Restriction } from "@/lib/types";
import { RESTRICTION_LABEL } from "@/lib/types";
import { ageInMonths, describeAge } from "@/lib/baby";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil — Receitas do Bebê" },
      { name: "description", content: "Edite as informações do seu bebê." },
    ],
  }),
  component: PerfilPage,
});

function PerfilPage() {
  const { profile, save, clear, ready } = useBabyProfile();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [style, setStyle] = useState<FeedingStyle>("tradicional");
  const [restrictions, setRestrictions] = useState<Restriction[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setBirth(profile.birthMonth.slice(0, 7));
      setStyle(profile.feedingStyle);
      setRestrictions(profile.restrictions);
    }
  }, [profile]);

  if (!ready) return null;

  function handleSave() {
    save({
      name: name.trim() || "bebê",
      birthMonth: `${birth}-01`,
      feedingStyle: style,
      restrictions,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div className="px-5 pt-10">
      <h1 className="font-display text-3xl leading-tight text-foreground">
        Perfil
      </h1>
      {profile && (
        <p className="mt-1 text-sm text-muted-foreground">
          {profile.name} · {describeAge(ageInMonths(profile.birthMonth))}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-5">
        <Field label="Nome do bebê">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 rounded-xl border-border bg-card"
          />
        </Field>

        <Field label="Mês de nascimento">
          <Input
            type="month"
            value={birth}
            max={new Date().toISOString().slice(0, 7)}
            onChange={(e) => setBirth(e.target.value)}
            className="h-12 rounded-xl border-border bg-card"
          />
        </Field>

        <Field label="Tipo de alimentação">
          <div className="grid grid-cols-3 gap-2">
            {(["tradicional", "blw", "misto"] as FeedingStyle[]).map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={cn(
                  "rounded-xl border bg-card px-3 py-2.5 text-sm capitalize",
                  style === s
                    ? "border-accent text-accent"
                    : "border-border text-foreground/80"
                )}
              >
                {s === "blw" ? "BLW" : s}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Restrições">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(RESTRICTION_LABEL) as Restriction[]).map((r) => {
              const on = restrictions.includes(r);
              return (
                <button
                  key={r}
                  onClick={() =>
                    setRestrictions((p) =>
                      p.includes(r) ? p.filter((x) => x !== r) : [...p, r]
                    )
                  }
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm",
                    on
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border bg-card text-foreground/70"
                  )}
                >
                  {on && <Check className="h-3.5 w-3.5" />}
                  {RESTRICTION_LABEL[r]}
                </button>
              );
            })}
          </div>
        </Field>

        <Button
          onClick={handleSave}
          className="mt-2 h-14 rounded-2xl bg-accent text-base font-medium text-accent-foreground hover:bg-accent/90"
        >
          {saved ? "Salvo 💛" : "Salvar alterações"}
        </Button>

        <p className="mt-2 text-center text-xs text-muted-foreground">
          Em breve: mais de um bebê no mesmo perfil.
        </p>

        <button
          onClick={() => {
            clear();
            navigate({ to: "/onboarding" });
          }}
          className="mt-4 inline-flex items-center justify-center gap-1.5 text-xs text-muted-foreground"
        >
          <LogOut className="h-3.5 w-3.5" /> Recomeçar do zero
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
