import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** First-login building blocks. Each is presentational and maps to a React Native component. */

export function OnboardScreen({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen justify-center bg-surface">
      <main className="relative flex min-h-screen w-full max-w-[390px] flex-col overflow-hidden bg-surface pb-32 text-foreground">{children}</main>
    </div>
  );
}

/** Headline in condensed caps; wrap the highlighted word as `*WORD*`. */
export function Headline({ text, className }: { text: string; className?: string }) {
  return (
    <h1 className={cn("font-display text-[2.75rem] font-extrabold uppercase leading-[0.95] tracking-tight", className)}>
      {text.split(/(\*[^*]+\*)/).map((p, i) => p.startsWith("*") ? <span key={i} className="text-primary">{p.slice(1, -1)}</span> : p)}
    </h1>
  );
}

export function StepHeader({ step, total = 6 }: { step?: number; total?: number }) {
  return (
    <header className="px-5 pt-6">
      <div className="flex items-center justify-between">
        <span className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">{step ? <>Step <span className="text-foreground">{step}</span> of {total}</> : "C7 Personal Fitness"}</span>
        <Link to="/screens" aria-label="Close" className="flex h-10 w-10 items-center justify-center rounded-full bg-card"><X className="h-5 w-5" /></Link>
      </div>
      {step && (
        <div className="mt-4 flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => <span key={i} className={cn("h-1.5 flex-1 rounded-full transition-colors duration-500", i < step ? "bg-primary" : "bg-secondary")} />)}
        </div>
      )}
    </header>
  );
}

export function NextBar({ label = "Next step", onNext, disabled, back = true }: { label?: string; onNext: () => void; disabled?: boolean; back?: boolean }) {
  const router = useRouter();
  return (
    <div className="fixed bottom-0 left-1/2 z-40 flex w-full max-w-[390px] -translate-x-1/2 items-center gap-3 bg-gradient-to-t from-surface via-surface to-transparent px-5 pb-7 pt-8">
      {back && <button type="button" aria-label="Go back" onClick={() => router.history.back()} className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-card transition active:scale-90"><ArrowLeft className="h-5 w-5" /></button>}
      <button type="button" onClick={onNext} disabled={disabled}
        className="flex h-[58px] flex-1 items-center justify-center gap-2 rounded-full bg-primary font-display text-lg font-bold uppercase tracking-wider text-primary-foreground shadow-glow transition hover:brightness-110 active:scale-[.98] disabled:opacity-40 disabled:shadow-none">
        {label}<ArrowRight className="h-5 w-5" strokeWidth={2.6} />
      </button>
    </div>
  );
}

/** Vertical scroll-snap wheel. */
export function WheelPicker({ values, value, onChange, itemH = 64 }: { values: number[]; value: number; onChange: (v: number) => void; itemH?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const idx = Math.max(0, values.indexOf(value));
  useEffect(() => { ref.current?.scrollTo({ top: idx * itemH }); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const onScroll = () => { const el = ref.current; if (!el) return; const i = Math.round(el.scrollTop / itemH); const v = values[Math.min(values.length - 1, Math.max(0, i))]; if (v !== undefined && v !== value) onChange(v); };
  return (
    <div className="relative mx-auto w-48" style={{ height: itemH * 5 }}>
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 border-y-2 border-primary/70" style={{ height: itemH }} />
      <div ref={ref} onScroll={onScroll} role="listbox" aria-label="Picker" tabIndex={0}
        onKeyDown={(e) => { const d = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0; if (d) { e.preventDefault(); ref.current?.scrollBy({ top: d * itemH, behavior: "smooth" }); } }}
        className="no-scrollbar h-full snap-y snap-mandatory overflow-y-scroll outline-none" style={{ paddingBlock: itemH * 2 }}>
        {values.map((v, i) => { const d = Math.abs(i - idx); return (
          <button key={v} role="option" aria-selected={d === 0} onClick={() => ref.current?.scrollTo({ top: i * itemH, behavior: "smooth" })}
            className="flex w-full snap-center items-center justify-center font-display font-bold transition-all duration-200"
            style={{ height: itemH, fontSize: d === 0 ? 56 : d === 1 ? 36 : 28, opacity: d === 0 ? 1 : d === 1 ? 0.45 : 0.18, color: d === 0 ? "var(--foreground)" : "var(--muted-foreground)" }}>{v}</button>); })}
      </div>
    </div>
  );
}

/** Horizontal ruler: scroll to choose; 10 minor ticks per major label. */
export function RulerHorizontal({ min, max, value, onChange, tick = 10 }: { min: number; max: number; value: number; onChange: (v: number) => void; tick?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { ref.current?.scrollTo({ left: (value - min) * tick }); }, [min]); // eslint-disable-line react-hooks/exhaustive-deps
  const count = max - min + 1;
  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-1/2 top-0 z-10 h-20 w-1 -translate-x-1/2 rounded-full bg-primary shadow-glow" />
      <div ref={ref} aria-label="Weight ruler" onScroll={() => { const el = ref.current; if (el) { const v = min + Math.round(el.scrollLeft / tick); if (v !== value && v >= min && v <= max) onChange(v); } }}
        className="no-scrollbar overflow-x-scroll" style={{ paddingInline: "50%" }}>
        <div className="relative flex h-28" style={{ width: count * tick }}>
          {Array.from({ length: count }).map((_, i) => { const v = min + i, major = v % 10 === 0, mid = v % 5 === 0; return (
            <div key={v} className="relative shrink-0" style={{ width: tick }}>
              <span className={cn("absolute left-0 top-2 w-0.5 -translate-x-1/2 rounded-full", major ? "h-14 bg-foreground" : mid ? "h-10 bg-muted-foreground" : "h-6 bg-muted-foreground/50")} />
              {major && <span className="absolute left-0 top-[4.5rem] -translate-x-1/2 font-display text-lg font-semibold text-muted-foreground">{v}</span>}
            </div>); })}
        </div>
      </div>
    </div>
  );
}

/** Vertical ruler on the right edge; top = max. */
export function RulerVertical({ min, max, value, onChange, tick = 10 }: { min: number; max: number; value: number; onChange: (v: number) => void; tick?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { ref.current?.scrollTo({ top: (max - value) * tick }); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const count = max - min + 1;
  return (
    <div ref={ref} aria-label="Height ruler" onScroll={() => { const el = ref.current; if (el) { const v = max - Math.round(el.scrollTop / tick); if (v !== value && v >= min && v <= max) onChange(v); } }}
      className="no-scrollbar h-[420px] w-28 overflow-y-scroll" style={{ paddingBlock: 210 }}>
      {Array.from({ length: count }).map((_, i) => { const v = max - i, major = v % 10 === 0, mid = v % 5 === 0; return (
        <div key={v} className="relative" style={{ height: tick }}>
          <span className={cn("absolute right-0 top-0 h-0.5 -translate-y-1/2 rounded-full", major ? "w-14 bg-foreground" : mid ? "w-10 bg-muted-foreground" : "w-6 bg-muted-foreground/50")} />
          {major && <span className="absolute right-16 top-0 -translate-y-1/2 font-display text-lg font-semibold text-muted-foreground">{v}</span>}
        </div>); })}
    </div>
  );
}

export function OptionCard({ selected, onClick, icon, title, sub }: { selected: boolean; onClick: () => void; icon: ReactNode; title: string; sub?: string }) {
  return (
    <button type="button" aria-pressed={selected} onClick={onClick}
      className={cn("flex w-full items-center gap-4 rounded-[1.75rem] border-2 bg-card p-4 text-left transition active:scale-[.98]", selected ? "border-primary" : "border-transparent")}>
      <span className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-full", selected ? "bg-primary text-primary-foreground" : "bg-secondary text-primary")}>{icon}</span>
      <span className="flex-1"><span className="block font-display text-xl font-bold uppercase tracking-wide">{title}</span>{sub && <span className="text-sm text-muted-foreground">{sub}</span>}</span>
      <span className={cn("h-6 w-6 rounded-full border-2 transition", selected ? "border-primary bg-primary" : "border-muted-foreground/40")} />
    </button>
  );
}
