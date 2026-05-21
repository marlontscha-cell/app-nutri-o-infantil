import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, HeartCrack, Sparkles, Package, Moon, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_app/sos")({
  head: () => ({
    meta: [
      { title: "SOS Refeição — Receitas do Bebê" },
      { name: "description", content: "Ajuda rápida para situações reais do dia a dia." },
    ],
  }),
  component: SosPage,
});

type Option = {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  search: Record<string, unknown>;
};

const options: Option[] = [
  {
    title: "Tenho só 10 minutos",
    subtitle: "Receitas prontas em até 15 min",
    icon: Clock,
    search: { quick: true },
  },
  {
    title: "Meu bebê rejeitou comida",
    subtitle: "Opções com aceitação mais fácil",
    icon: HeartCrack,
    search: { acceptance: true },
  },
  {
    title: "Quero algo fácil",
    subtitle: "Sem complicação, poucos passos",
    icon: Sparkles,
    search: { quick: true, acceptance: true },
  },
  {
    title: "Só tenho poucos ingredientes",
    subtitle: "Receitas com até 5 itens",
    icon: Package,
    search: { minimal: true },
  },
  {
    title: "Preciso de jantar rápido",
    subtitle: "Janta leve para fechar o dia",
    icon: Moon,
    search: { meal: "jantar", quick: true },
  },
];

function SosPage() {
  return (
    <div className="px-5 pt-10">
      <header>
        <p className="text-sm text-muted-foreground">Respira fundo 💛</p>
        <h1 className="mt-2 font-display text-[28px] leading-[1.15] text-foreground">
          Como posso te ajudar agora?
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Toque na situação que mais combina com o seu momento.
        </p>
      </header>

      <div className="mt-7 flex flex-col gap-3">
        {options.map(({ title, subtitle, icon: Icon, search }) => (
          <Link
            key={title}
            to="/receitas"
            search={search}
            className="flex items-center gap-4 rounded-3xl bg-card p-4 ring-1 ring-border/60 shadow-[0_1px_2px_rgba(60,40,20,0.04),0_8px_24px_-14px_rgba(60,40,20,0.10)] active:scale-[0.99] transition-transform"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent">
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-[17px] leading-snug text-foreground">
                {title}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {subtitle}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </div>
  );
}
