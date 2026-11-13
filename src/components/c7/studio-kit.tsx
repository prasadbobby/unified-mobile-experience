import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { Screen, TopBar } from "@/components/app/ui";
import { Button, type ButtonProps } from "@/components/ui/button";
import { packages, rupees } from "@/lib/studio-data";
import { cn } from "@/lib/utils";
export function studioHead(title: string, description: string) {
  return () => ({
    meta: [
      { title: `${title} — C7 Personal Fitness` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} — C7 Personal Fitness` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  });
}
export function StudioScreen({
  title,
  children,
  nav = true,
  className,
}: {
  title: string;
  children: ReactNode;
  nav?: boolean;
  className?: string;
}) {
  return (
    <Screen nav={nav} className={cn("studio-screen bg-hero", className)}>
      <TopBar
        title={title}
        right={
          <Link
            to="/screens"
            aria-label="All screens"
            className="text-[10px] uppercase text-muted-foreground"
          >
            C7 / MENU
          </Link>
        }
      />
      {children}
    </Screen>
  );
}
export function Action({ className, ...props }: ButtonProps) {
  return (
    <Button {...props} className={cn("h-[58px] w-full rounded-full shadow-none", className)} />
  );
}
export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[11px] font-normal uppercase text-muted-foreground", className)}>
      {children}
    </p>
  );
}
export function Tabs<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto py-1">
      {options.map((o) => (
        <Button
          key={o}
          variant="ghost"
          onClick={() => onChange(o)}
          aria-pressed={o === value}
          className={cn(
            "h-9 shrink-0 rounded-full border px-4 text-xs",
            o === value
              ? "border-primary bg-primary text-primary-foreground hover:bg-primary"
              : "border-border text-muted-foreground",
          )}
        >
          {o}
        </Button>
      ))}
    </div>
  );
}
export function Tickets({ compact = false }: { compact?: boolean }) {
  return (
    <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3">
      {packages.map((p, i) => (
        <Link
          key={p.id}
          to="/package-detail"
          search={{ package: p.id }}
          className={cn(
            "ticket relative shrink-0 snap-center rounded-3xl bg-card",
            compact ? "w-[276px]" : "w-[304px]",
          )}
        >
          <div className="p-6">
            <Label className="text-primary">{p.tag}</Label>
            <p className="mt-5 max-w-52 text-2xl font-light leading-tight">{p.name}</p>
            <p className="mt-7 text-[42px] font-light tabular-nums leading-none">
              {rupees(p.price)}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {p.days} days · {p.sessions}
            </p>
          </div>
          <div className="ticket-stub flex items-center justify-between border-t border-dashed border-muted-foreground/40 px-6 py-4">
            <span className="text-xs">{p.mode}</span>
            <ArrowRight className="h-5 w-5 text-primary" />
          </div>
          <span className="absolute right-5 top-5 font-mono text-[10px] text-muted-foreground">
            0{i + 1}
          </span>
        </Link>
      ))}
    </div>
  );
}
export function StudioSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    if (!open) return;
    const active = document.activeElement;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close.current();
      if (e.key === "Tab") {
        const els = ref.current?.querySelectorAll<HTMLElement>(
          "button,input,select,textarea,a[href]",
        );
        const first = els?.[0],
          last = els?.[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", handler);
      if (active instanceof HTMLElement) active.focus();
    };
  }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <Button
        variant="ghost"
        aria-label="Dismiss sheet"
        onClick={onClose}
        className="absolute inset-0 h-full w-full rounded-none bg-surface/80 backdrop-blur-sm"
      />
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="studio-sheet relative max-h-[85dvh] w-full max-w-[390px] overflow-y-auto rounded-t-[32px] border border-border bg-card p-5 pb-8 outline-none"
      >
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-secondary" />
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-light">{title}</h2>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full"
            aria-label="Close sheet"
            onClick={onClose}
          >
            <X />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
export function Dock({ children }: { children: ReactNode }) {
  return (
    <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[390px] -translate-x-1/2 border-t border-border bg-surface px-5 py-4">
      {children}
    </div>
  );
}
export function ReturnControl() {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Go back"
      className="rounded-full bg-surface/80"
      onClick={() => router.history.back()}
    >
      <ArrowLeft />
    </Button>
  );
}
