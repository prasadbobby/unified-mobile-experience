import { createFileRoute } from "@tanstack/react-router";
import { Check, ChevronLeft, ChevronRight, Plus, SkipForward, Trophy, Undo2, History } from "lucide-react";
import { useEffect, useState } from "react";
import { BackButton, Screen } from "@/components/app/ui";
import { DumbbellGlyph } from "@/components/app/icons";
import { FRAME, Ring, Stepper } from "@/components/c7/kit";
import { loggerPlan } from "@/lib/c7-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/workout-logger")({
  head: () => ({ meta: [
    { title: "Workout logger — C7 Personal Fitness" },
    { name: "description", content: "Log every set with weight and reps, with built-in rest timer." },
    { property: "og:title", content: "Workout logger — C7 Personal Fitness" },
    { property: "og:description", content: "Set-by-set workout logging with rest timer." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Logger,
});

type SetRow = { kg: number; reps: number; done: boolean };
const REST = 60;
const mk = (n: number, reps: number, kg: number): SetRow[] => Array.from({ length: n }, () => ({ kg, reps, done: false }));
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export function SetRowView({ i, row, active, onChange, onUndo }: { i: number; row: SetRow; active: boolean; onChange: (r: SetRow) => void; onUndo: () => void }) {
  return (
    <div className={cn("flex items-center gap-2 rounded-[1.5rem] p-2 transition", active ? "bg-card ring-1 ring-primary/60" : "bg-card/60", row.done && "opacity-80")}>
      <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm", row.done ? "bg-primary text-primary-foreground" : "bg-secondary")}>{row.done ? <Check className="h-4 w-4" /> : i + 1}</span>
      <div className="flex-1"><Stepper label={`set ${i + 1} kg`} value={row.kg} step={2.5} unit="kg" onChange={(kg) => onChange({ ...row, kg })} /></div>
      <div className="flex-1"><Stepper label={`set ${i + 1} reps`} value={row.reps} unit="" onChange={(reps) => onChange({ ...row, reps })} /></div>
      <button aria-label="Undo set" disabled={!row.done} onClick={onUndo} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground disabled:opacity-20"><Undo2 className="h-4 w-4" /></button>
    </div>
  );
}

function Logger() {
  const [ex, setEx] = useState(0);
  const [sets, setSets] = useState(() => loggerPlan.map((p) => mk(p.sets, p.target, 60)));
  const [rest, setRest] = useState(0);
  const [restMax, setRestMax] = useState(REST);
  const [elapsed, setElapsed] = useState(754);
  useEffect(() => { const t = setInterval(() => { setElapsed((e) => e + 1); setRest((r) => Math.max(0, r - 1)); }, 1000); return () => clearInterval(t); }, []);

  const plan = loggerPlan[ex]!, rows = sets[ex]!;
  const cur = rows.findIndex((r) => !r.done);
  const update = (i: number, r: SetRow) => setSets((s) => s.map((x, k) => k === ex ? x.map((y, j) => j === i ? r : y) : x));
  const complete = () => { if (cur < 0) { if (ex < loggerPlan.length - 1) setEx(ex + 1); return; } update(cur, { ...rows[cur]!, done: true }); setRestMax(REST); setRest(REST); };
  const next = loggerPlan[ex + 1];

  return (
    <Screen className={`overflow-hidden pb-40 ${FRAME}`}>
      <img src={plan.image} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-[60vh] w-full scale-110 object-cover opacity-50 blur-2xl" />
      <div className="absolute inset-0 bg-fade" />
      <div className="relative">
        <header className="flex items-center gap-3 px-5 pt-6">
          <BackButton />
          <div className="flex flex-1 gap-1.5">
            {loggerPlan.map((p, i) => { const d = sets[i]!.filter((r) => r.done).length / p.sets; return (
              <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary"><div className="h-full bg-lime transition-all" style={{ width: `${i < ex ? 100 : d * 100}%` }} /></div>); })}
          </div>
          <span className="rounded-full bg-card px-3 py-2 text-sm tabular-nums">{mmss(elapsed)}</span>
        </header>

        {rest > 0 ? (
          <div className="flex flex-col items-center px-5 pt-14 animate-pop">
            <p className="mb-6 text-sm uppercase tracking-wider text-info">Rest</p>
            <Ring value={rest} max={restMax} size={240} stroke={16} color="var(--info)">
              <span className="text-6xl font-light tabular-nums">{mmss(rest)}</span><span className="text-xs text-muted-foreground">until set {cur + 1 || "done"}</span>
            </Ring>
            <div className="mt-8 flex w-full gap-3">
              <button onClick={() => { setRest(rest + 15); setRestMax(Math.max(restMax, rest + 15)); }} className="h-14 flex-1 rounded-full border-2 border-info text-info">+15s</button>
              <button onClick={() => setRest(0)} className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-info font-medium text-primary-foreground"><SkipForward className="h-4 w-4" />Skip rest</button>
            </div>
          </div>
        ) : (
          <div className="px-5 pt-8 animate-fade-up" key={ex}>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Exercise {ex + 1} of {loggerPlan.length}</p>
            <h1 className="mt-1 text-3xl font-light">{plan.name}</h1>
            <p className="mt-1 text-primary">{cur < 0 ? "All sets done" : `Set ${cur + 1} of ${rows.length}`} · target {plan.target} reps</p>
            <div className="mt-3 flex gap-2 text-xs">
              <span className="flex items-center gap-1 rounded-full bg-card px-3 py-1.5 text-muted-foreground"><History className="h-3.5 w-3.5" />Last: {plan.last}</span>
              <span className="flex items-center gap-1 rounded-full bg-card px-3 py-1.5 text-warning"><Trophy className="h-3.5 w-3.5" />PB: {plan.pb}</span>
            </div>
            <div className="mt-5 flex px-14 text-xs text-muted-foreground"><span className="flex-1 text-center">Weight</span><span className="flex-1 text-center">Reps</span></div>
            <div className="mt-2 space-y-2">
              {rows.map((r, i) => <SetRowView key={i} i={i} row={r} active={i === cur} onChange={(n) => update(i, n)} onUndo={() => update(i, { ...r, done: false })} />)}
            </div>
            <button onClick={() => setSets((s) => s.map((x, k) => k === ex ? [...x, { ...x[x.length - 1]!, done: false }] : x))} className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full border border-dashed border-primary/60 text-sm text-primary"><Plus className="h-4 w-4" />Add set</button>
            {next && (
              <div className="mt-5 flex items-center gap-3 rounded-[1.5rem] bg-card p-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-deep text-primary"><DumbbellGlyph className="h-7 w-7" /></span>
                <div className="flex-1"><p className="text-xs text-muted-foreground">Next up</p><p className="font-medium">{next.name}</p><p className="text-xs text-muted-foreground">{next.sets} × {next.target}</p></div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className={`fixed bottom-0 left-1/2 z-40 flex w-full -translate-x-1/2 items-center justify-between px-8 pb-8 pt-4 ${FRAME}`}>
        <button aria-label="Previous exercise" disabled={ex === 0} onClick={() => { setEx(ex - 1); setRest(0); }} className="flex h-14 w-14 items-center justify-center rounded-full bg-card disabled:opacity-30"><ChevronLeft className="h-6 w-6" /></button>
        <button aria-label="Complete set" onClick={complete} className="flex h-20 w-20 items-center justify-center rounded-full bg-lime text-primary-foreground shadow-glow transition active:scale-90"><Check className="h-9 w-9" strokeWidth={2.6} /></button>
        <button aria-label="Next exercise" disabled={ex === loggerPlan.length - 1} onClick={() => { setEx(ex + 1); setRest(0); }} className="flex h-14 w-14 items-center justify-center rounded-full bg-card disabled:opacity-30"><ChevronRight className="h-6 w-6" /></button>
      </div>
    </Screen>
  );
}
