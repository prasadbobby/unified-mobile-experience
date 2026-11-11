import { createFileRoute } from "@tanstack/react-router";
import { Footprints, Plus, TrendingDown, TrendingUp, Watch } from "lucide-react";
import { useState } from "react";
import { PrimaryButton, Screen, TopBar } from "@/components/app/ui";
import { FlameIcon } from "@/components/app/icons";
import { Card, Chip, FRAME, Ring, Section, Sheet } from "@/components/c7/kit";
import { steps as s0 } from "@/lib/c7-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/steps")({
  head: () => ({ meta: [
    { title: "Steps — C7 Personal Fitness" },
    { name: "description", content: "Track daily steps against your coach's target, weekly trend and streak." },
    { property: "og:title", content: "Steps — C7 Personal Fitness" },
    { property: "og:description", content: "Daily steps, weekly chart and streak." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Steps,
});

/** Weekly status: on track when the week's average so far meets the target. */
export function weekStatus(week: number[], target: number) {
  const avg = week.reduce((a, b) => a + b, 0) / week.length;
  return { avg: Math.round(avg), onTrack: avg >= target };
}

export function WeekChart({ week, target, days }: { week: number[]; target: number; days: string[] }) {
  const max = Math.max(target * 1.2, ...week);
  return (
    <div className="relative h-44">
      <div className="absolute inset-x-0 border-t-2 border-dashed border-primary/60" style={{ bottom: `${(target / max) * 100}%` }}>
        <span className="absolute -top-5 right-0 text-[10px] text-primary">Goal {target / 1000}k</span>
      </div>
      <div className="flex h-full items-end gap-2">
        {week.map((v, i) => (
          <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <div className={cn("w-full rounded-full animate-rise", v >= target ? "bg-lime" : "bg-secondary", i === week.length - 1 && "ring-2 ring-foreground/60")} style={{ height: `${(v / max) * 100}%`, animationDelay: `${i * 60}ms` }} />
            <span className="text-xs text-muted-foreground">{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Steps() {
  const [week, setWeek] = useState(s0.week);
  const [open, setOpen] = useState(false);
  const [when, setWhen] = useState(0);
  const [val, setVal] = useState("");
  const today = week[week.length - 1]!;
  const st = weekStatus(week, s0.target);
  const save = () => { const n = parseInt(val, 10); if (!n || n < 0) return; setWeek((w) => w.map((x, i) => i === w.length - 1 - when ? n : x)); setOpen(false); setVal(""); };
  return (
    <Screen className={`bg-hero pb-12 ${FRAME}`}>
      <TopBar title="Steps" right={<button aria-label="Log steps" onClick={() => setOpen(true)} className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"><Plus className="h-5 w-5" /></button>} />
      <div className="mt-8 flex justify-center animate-pop">
        <Ring value={today} max={s0.target} size={230} stroke={18}>
          <Footprints className="h-6 w-6 text-primary" />
          <span className="mt-1 text-5xl font-light tabular-nums">{today.toLocaleString("en-IN")}</span>
          <span className="text-xs text-muted-foreground">of {s0.target.toLocaleString("en-IN")} · coach target</span>
        </Ring>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 px-5">
        <Card className="p-4"><FlameIcon className="h-6 w-6" /><p className="mt-3 text-xs text-muted-foreground">Streak</p><p className="text-2xl font-light">{s0.streak} days</p></Card>
        <Card className="p-4">{st.onTrack ? <TrendingUp className="h-6 w-6 text-primary" /> : <TrendingDown className="h-6 w-6 text-warning" />}
          <p className="mt-3 text-xs text-muted-foreground">This week</p><Chip tone={st.onTrack ? "lime" : "warning"} className="mt-1">{st.onTrack ? "On track" : "Behind"}</Chip><p className="mt-1 text-xs text-muted-foreground">avg {st.avg.toLocaleString("en-IN")}/day</p></Card>
      </div>
      <Section title="Last 7 days"><Card><WeekChart week={week} target={s0.target} days={s0.days} /></Card></Section>
      <Section title="Devices">
        <Card className="flex items-center gap-4 p-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-info/15 text-info"><Watch className="h-5 w-5" /></span>
          <div className="flex-1"><p className="font-medium">Fitbit</p><p className="text-xs text-muted-foreground">Last synced 12 min ago</p></div>
          <Chip>Connected</Chip>
        </Card>
      </Section>
      <Sheet open={open} onClose={() => setOpen(false)} title="Log steps">
        <div className="flex gap-2">{["Today", "Yesterday", "2 days ago"].map((l, i) => (
          <button key={l} onClick={() => setWhen(i)} className={cn("rounded-full border-2 px-4 py-2 text-sm", when === i ? "border-primary text-primary" : "border-transparent bg-secondary")}>{l}</button>))}</div>
        <input inputMode="numeric" value={val} onChange={(e) => setVal(e.target.value.replace(/\D/g, ""))} placeholder={String(week[week.length - 1 - when])} aria-label="Steps" className="field mt-4 h-16 bg-secondary text-center text-2xl" />
        <PrimaryButton className="mt-5" disabled={!val} onClick={save}>Save steps</PrimaryButton>
      </Sheet>
    </Screen>
  );
}
