import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronRight, Heart, LogOut, Pencil } from "lucide-react";
import { useBabyProfile } from "@/hooks/use-baby-profile";
import { useHistory } from "@/hooks/use-history";
import { useFavorites } from "@/hooks/use-favorites";
import { recipes } from "@/data/recipes";
import { ageInMonths, describeAge } from "@/lib/baby";
import {
  FEEDBACK_EMOJI,
  MEAL_LABEL,
  RESTRICTION_LABEL,
  type FeedingStyle,
  type Restriction,
} from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/bebe")({
  head: () => ({
    meta: [
      { title: "Bebê — Receitas do Bebê" },
      { name: "description", content: "Perfil do bebê, favoritas e últimas refeições." },
    ],
  }),
  component: BebePage,
});

function BebePage() {
  const { profile, save, clear, ready } = useBabyProfile();
  const { entries } = useHistory();
  const { ids: favIds } = useFavorites();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  const byId = useMemo(
    () => Object.fromEntries(recipes.map((r) => [r.id, r])),
    []
  );

  if (!ready) return null;

  const favs = recipes.filter((r) => favIds.includes(r.id));

  return (
    <div className="px-5 pt-10">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl leading-tight text-foreground">
            {profile?.name ?? "Bebê"}
          </h1>
          {profile && (
            <p className="mt-1 text-sm text-muted-foreground">
              {describeAge(ageInMonths(profile.birthMonth))} ·{" "}
              {profile.feedingStyle === "blw"
                ? "BLW"
                : profile.feedingStyle}
            </p>
          )}
          {profile && profile.restrictions.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {profile.restrictions.map((r) => (
                <span
                  key={r}
                  className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] text-foreground/70"
                >
                  {RESTRICTION_LABEL[r]}
                </span>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => setEditing((v) => !v)}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-xs text-foreground/70"
        >
          <Pencil className="h-3.5 w-3.5" /> {editing ? "Fechar" : "Editar"}
        </button>
      </header>

      {editing && profile && (
        <EditForm
          profile={profile}
          onSave={(p) => {
            save(p);
            setEditing(false);
          }}
        />
      )}

      <Section title="Últimas refeições">
        {entries.length === 0 ? (
          <EmptyHint>
            Marque uma receita como servida para começar seu histórico.
          </EmptyHint>
        ) : (
          <ul className="flex flex-col gap-2">
            {entries.slice(0, 10).map((e, i) => {
              const r = byId[e.recipeId];
              if (!r) return null;
              return (
                <li key={i}>
                  <Link
                    to="/receitas/$id"
                    params={{ id: r.id }}
                    className="flex items-center gap-3 rounded-2xl bg-card p-3 ring-1 ring-border/60"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-2xl">
                      {r.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-medium uppercase tracking-wider text-accent">
                        {MEAL_LABEL[e.meal]}
                      </p>
                      <p className="line-clamp-1 text-sm font-medium text-foreground">
                        {r.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDay(e.date)}
                      </p>
                    </div>
                    {e.feedback ? (
                      <span className="text-2xl">
                        {FEEDBACK_EMOJI[e.feedback]}
                      </span>
                    ) : (
                      <Check className="h-4 w-4 text-foreground/40" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Section>

      <Section
        title="Favoritas"
        action={
          favs.length > 0 ? (
            <span className="text-xs text-muted-foreground">{favs.length}</span>
          ) : null
        }
      >
        {favs.length === 0 ? (
          <EmptyHint icon={<Heart className="h-4 w-4" />}>
            Toque no ♥ em qualquer receita para guardar aqui.
          </EmptyHint>
        ) : (
          <ul className="flex flex-col gap-2">
            {favs.map((r) => (
              <li key={r.id}>
                <Link
                  to="/receitas/$id"
                  params={{ id: r.id }}
                  className="flex items-center gap-3 rounded-2xl bg-card p-3 ring-1 ring-border/60"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-2xl">
                    {r.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-medium text-foreground">
                      {r.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {r.timeMinutes} min · {MEAL_LABEL[r.meal]}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <button
        onClick={() => {
          clear();
          navigate({ to: "/onboarding" });
        }}
        className="mx-auto mt-10 mb-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground"
      >
        <LogOut className="h-3.5 w-3.5" /> Recomeçar do zero
      </button>
    </div>
  );
}

function Section({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-xl text-foreground">{title}</h2>
        {action}
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function EmptyHint({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/60 px-4 py-5 text-center">
      {icon && (
        <span className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent">
          {icon}
        </span>
      )}
      <p className="text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

function formatDay(iso: string) {
  const today = new Date().toISOString().slice(0, 10);
  if (iso === today) return "Hoje";
  const d = new Date(iso + "T12:00:00");
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  })
    .format(d)
    .replace(".", "");
}

function EditForm({
  profile,
  onSave,
}: {
  profile: NonNullable<ReturnType<typeof useBabyProfile>["profile"]>;
  onSave: (p: NonNullable<ReturnType<typeof useBabyProfile>["profile"]>) => void;
}) {
  const [name, setName] = useState(profile.name);
  const [birth, setBirth] = useState(profile.birthMonth.slice(0, 7));
  const [style, setStyle] = useState<FeedingStyle>(profile.feedingStyle);
  const [restrictions, setRestrictions] = useState<Restriction[]>(
    profile.restrictions
  );

  useEffect(() => {
    setName(profile.name);
    setBirth(profile.birthMonth.slice(0, 7));
    setStyle(profile.feedingStyle);
    setRestrictions(profile.restrictions);
  }, [profile]);

  return (
    <div className="mt-6 flex flex-col gap-5 rounded-3xl border border-border bg-card p-5">
      <Field label="Nome">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-11 rounded-xl border-border bg-background"
        />
      </Field>
      <Field label="Mês de nascimento">
        <Input
          type="month"
          value={birth}
          max={new Date().toISOString().slice(0, 7)}
          onChange={(e) => setBirth(e.target.value)}
          className="h-11 rounded-xl border-border bg-background"
        />
      </Field>
      <Field label="Tipo de alimentação">
        <div className="grid grid-cols-3 gap-2">
          {(["tradicional", "blw", "misto"] as FeedingStyle[]).map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={cn(
                "rounded-xl border bg-background px-3 py-2.5 text-sm capitalize",
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
                    : "border-border bg-background text-foreground/70"
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
        onClick={() =>
          onSave({
            name: name.trim() || "bebê",
            birthMonth: `${birth}-01`,
            feedingStyle: style,
            restrictions,
          })
        }
        className="h-12 rounded-2xl bg-accent text-base font-medium text-accent-foreground hover:bg-accent/90"
      >
        Salvar
      </Button>
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
