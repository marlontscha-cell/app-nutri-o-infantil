import { Link, useLocation } from "@tanstack/react-router";
import { Home, LifeBuoy, Baby } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Hoje", icon: Home },
  { to: "/sos", label: "SOS", icon: LifeBuoy },
  { to: "/bebe", label: "Bebê", icon: Baby },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/85 backdrop-blur-xl">
      <ul className="mx-auto flex max-w-md items-stretch justify-around safe-bottom pt-2">
        {items.map(({ to, label, icon: Icon }) => {
          const active =
            to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className={cn(
                  "flex flex-col items-center gap-1 py-1.5 text-[11px] font-medium transition-colors",
                  active ? "text-accent" : "text-muted-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-transform",
                    active && "scale-110"
                  )}
                  strokeWidth={active ? 2.2 : 1.8}
                />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
