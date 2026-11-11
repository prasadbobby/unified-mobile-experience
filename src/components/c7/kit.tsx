import { Minus, Plus, X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared building blocks for the C7 member screens. Each maps 1:1 to a React Native component. */

export const FRAME = "max-w-[390px]";

export type Tone = "lime" | "warning" | "danger" | "muted" | "info";
const toneCls: Record<Tone, string> = {
  lime: "border-primary/70 text-primary",
  warning: "border-warning/70 text-warning",
  danger: "border-destructive/70 text-destructive",
  muted: "border-border text-muted-foreground",
  info: "border-info/70 text-info",
};

export function Chip({ children, tone = "lime", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return <span className={cn("inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium", toneCls[tone], className)}>{children}</span>;
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-[1.75rem] bg-card p-5", className)}>{children}</div>;
}

export function Ring({ value, max, size = 140, stroke = 12, color = "var(--primary)", children }: { value: number; max: number; size?: number; stroke?: number; color?: string; children?: ReactNode }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r, pct = Math.max(0, Math.min(1, value / max));
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--secondary)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - pct)} style={{ transition: "stroke-dashoffset .8s cubic-bezier(.2,.8,.2,1)" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  );
}

export function Segmented<T extends string>({ options, value, onChange }: { options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex rounded-full bg-secondary p-1">
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onChange(o)}
          className={cn("flex-1 rounded-full py-2.5 text-xs transition", value === o ? "bg-primary font-medium text-primary-foreground" : "text-muted-foreground")}>{o}</button>
      ))}
    </div>
  );
}

export function Stepper({ value, onChange, step = 1, min = 0, unit, label }: { value: number; onChange: (v: number) => void; step?: number; min?: number; unit?: string; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-secondary p-1">
      <button type="button" aria-label={`Decrease ${label}`} onClick={() => onChange(Math.max(min, +(value - step).toFixed(1)))} className="flex h-9 w-9 items-center justify-center rounded-full bg-card active:scale-90"><Minus className="h-4 w-4" /></button>
      <span className="min-w-12 flex-1 text-center tabular-nums">{value}<span className="text-xs text-muted-foreground">{unit}</span></span>
      <button type="button" aria-label={`Increase ${label}`} onClick={() => onChange(+(value + step).toFixed(1))} className="flex h-9 w-9 items-center justify-center rounded-full bg-card active:scale-90"><Plus className="h-4 w-4" /></button>
    </div>
  );
}

export function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)}
      className={cn("relative h-8 w-14 rounded-full transition", on ? "bg-primary" : "bg-secondary")}>
      <span className={cn("absolute top-1 h-6 w-6 rounded-full bg-foreground transition-all", on ? "left-7 bg-primary-foreground" : "left-1")} />
    </button>
  );
}

export function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-surface/70 backdrop-blur-sm animate-in fade-in" />
      <div className={cn("relative w-full rounded-t-[2rem] border border-border bg-card px-5 pb-8 pt-3 animate-in slide-in-from-bottom duration-300", FRAME)}>
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-secondary" />
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">{title}</h3>
          <button aria-label="Close sheet" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary"><X className="h-4 w-4" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm text-muted-foreground">{label}</span>{children}</label>;
}

export function TextArea(p: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={3} {...p} className="w-full resize-none rounded-[1.5rem] bg-card p-4 outline-none placeholder:text-muted-foreground focus:ring-[1.5px] focus:ring-primary" />;
}

export function Initials({ name, className }: { name: string; className?: string }) {
  const i = name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-deep text-sm font-medium text-primary", className)}>{i}</span>;
}

export function Section({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="mt-7 px-5">
      <div className="mb-3 flex items-center justify-between"><h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">{title}</h2>{action}</div>
      {children}
    </section>
  );
}

export function StickyBar({ children }: { children: ReactNode }) {
  return <div className={cn("fixed bottom-0 left-1/2 z-40 w-full -translate-x-1/2 bg-gradient-to-t from-surface via-surface/95 to-transparent px-5 pb-6 pt-8", FRAME)}>{children}</div>;
}

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
