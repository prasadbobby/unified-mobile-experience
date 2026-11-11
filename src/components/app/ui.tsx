import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, BarChart3, ChevronLeft, Dumbbell, EllipsisVertical, Home, UserRound, UtensilsCrossed } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Screen({ children, className, nav = false }: { children: ReactNode; className?: string; nav?: boolean }) {
  return (
    <div className="flex min-h-screen justify-center bg-surface">
      <main className={cn("relative min-h-screen w-full max-w-[430px] overflow-x-hidden bg-surface text-foreground", nav && "pb-32", className)}>
        {children}
        {nav && <BottomNav />}
      </main>
    </div>
  );
}

const tabs = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/workout", label: "Workout", icon: Dumbbell },
  { to: "/meals", label: "Meals", icon: UtensilsCrossed },
  { to: "/profile", label: "Profile", icon: UserRound },
] as const;

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const Tab = ({ t }: { t: (typeof tabs)[number] }) => {
    const active = path.startsWith(t.to) || (t.to === "/meals" && path.startsWith("/search"));
    return (
      <Link to={t.to} className={cn("flex flex-1 flex-col items-center gap-1 text-xs transition-colors", active ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
        <t.icon className="h-6 w-6" strokeWidth={1.8} />
        {t.label}
        <span className={cn("h-1 w-1 rounded-full bg-primary transition-opacity", active ? "opacity-100" : "opacity-0")} />
      </Link>
    );
  };
  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 px-3 pb-3">
      <div className="relative flex items-end rounded-[2rem] border border-border bg-card/90 px-2 pb-3 pt-4 backdrop-blur-xl">
        <Tab t={tabs[0]} /><Tab t={tabs[1]} />
        <div className="flex-1" />
        <Tab t={tabs[2]} /><Tab t={tabs[3]} />
        <Link to="/leaderboard" aria-label="Leaderboard"
          className={cn("absolute -top-7 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform hover:scale-105 active:scale-95", path.startsWith("/leaderboard") && "ring-4 ring-primary/30")}>
          <BarChart3 className="h-7 w-7" strokeWidth={2.2} />
        </Link>
      </div>
    </nav>
  );
}

export function IconButton({ children, onClick, label, className }: { children: ReactNode; onClick?: () => void; label: string; className?: string }) {
  return (
    <button type="button" aria-label={label} onClick={onClick}
      className={cn("relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface/80 text-foreground backdrop-blur transition hover:bg-secondary active:scale-90", className)}>
      {children}
    </button>
  );
}

export function BackButton({ variant = "chevron" }: { variant?: "chevron" | "arrow" }) {
  const router = useRouter();
  return (
    <IconButton label="Go back" onClick={() => router.history.back()}>
      {variant === "arrow" ? <ArrowLeft className="h-5 w-5" /> : <ChevronLeft className="h-6 w-6" />}
    </IconButton>
  );
}

export function TopBar({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <header className="relative z-10 flex items-center justify-between px-5 pt-6">
      <BackButton />
      <h1 className="text-lg font-medium">{title}</h1>
      {right ?? <IconButton label="More options"><EllipsisVertical className="h-5 w-5" /></IconButton>}
    </header>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5">
      <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">{children}</h2>
      {action}
    </div>
  );
}

export function StatTile({ icon, label, value, unit, sub, className }: { icon: ReactNode; label: string; value: string | number; unit?: string; sub?: string; className?: string }) {
  return (
    <div className={cn("shrink-0 rounded-[1.5rem] bg-card p-4", className)}>
      <div className="mb-4 h-7">{icon}</div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-light">{value}<span className="text-sm">{unit}</span></p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function PrimaryButton({ children, className, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...p} className={cn("h-14 w-full rounded-full bg-primary font-medium text-primary-foreground shadow-glow transition hover:brightness-110 active:scale-[.98] disabled:opacity-50", className)}>
      {children}
    </button>
  );
}
