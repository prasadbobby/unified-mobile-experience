import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Moon } from "lucide-react";
import { useState } from "react";
import { Screen, TopBar } from "@/components/app/ui";
import { Card, Chip, FRAME, Sheet } from "@/components/c7/kit";
import { EnergyIcon, MoodIcon, energyLabels, moodLabels } from "@/components/c7/moods";
import { challenge as ch, checkins } from "@/lib/c7-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/challenge-calendar")({
  head: () => ({ meta: [
    { title: "Challenge calendar — C7 90-Day Challenge" },
    { name: "description", content: "Month view of your 90-day challenge check-ins." },
    { property: "og:title", content: "Challenge calendar — C7 90-Day Challenge" },
    { property: "og:description", content: "See which days you checked in during the challenge." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Calendar,
});

type DayState = "done" | "missed" | "today" | "future" | "before";
export function dayState(d: number): DayState {
  if (d < ch.startDay) return "before";
  if (d === ch.today) return "today";
  if (d > ch.today) return "future";
  return checkins[d] ? "done" : "missed";
}

function Calendar() {
  const [sel, setSel] = useState<number | null>(null);
  const cells = [...Array(ch.firstWeekday).fill(null), ...Array.from({ length: ch.daysInMonth }, (_, i) => i + 1)] as (number | null)[];
  const done = Object.keys(checkins).length;
  const c = sel ? checkins[sel] : undefined;
  return (
    <Screen className={`bg-hero pb-12 ${FRAME}`}>
      <TopBar title="Challenge calendar" />
      <div className="mt-6 grid grid-cols-3 gap-2 px-5">
        {[["Check-ins", done], ["Day", ch.today - ch.startDay + 1], ["Left", ch.total - (ch.today - ch.startDay + 1)]].map(([l, v]) => (
          <div key={l} className="rounded-[1.5rem] bg-card p-3 text-center"><p className="text-2xl font-light">{v}</p><p className="text-xs text-muted-foreground">{l}</p></div>
        ))}
      </div>
      <Card className="mx-5 mt-4 animate-fade-up">
        <div className="mb-4 flex items-center justify-between">
          <button aria-label="Previous month" className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary"><ChevronLeft className="h-5 w-5" /></button>
          <p className="font-medium">{ch.month}</p>
          <button aria-label="Next month" className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary"><ChevronRight className="h-5 w-5" /></button>
        </div>
        <div className="grid grid-cols-7 gap-y-2 text-center text-xs text-muted-foreground">{["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <span key={i}>{d}</span>)}</div>
        <div className="mt-2 grid grid-cols-7 gap-y-2">
          {cells.map((d, i) => { if (!d) return <span key={i} />; const s = dayState(d); return (
            <button key={i} disabled={s === "future" || s === "before"} onClick={() => setSel(d)} aria-label={`November ${d}`}
              className={cn("relative mx-auto flex h-10 w-10 flex-col items-center justify-center rounded-full text-sm transition active:scale-90",
                s === "done" && "bg-primary/15 text-primary ring-2 ring-primary",
                s === "today" && "ring-2 ring-foreground",
                s === "missed" && "bg-secondary text-muted-foreground",
                (s === "future" || s === "before") && "text-muted-foreground/40")}>
              {d}{s === "done" && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary" />}
            </button>); })}
        </div>
      </Card>
      <div className="mt-4 flex flex-wrap gap-4 px-6 text-xs text-muted-foreground">
        <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full ring-2 ring-primary" />Checked in</span>
        <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-secondary" />Missed</span>
        <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full ring-2 ring-foreground" />Today</span>
        <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-muted opacity-40" />Upcoming</span>
      </div>
      <Sheet open={sel !== null} onClose={() => setSel(null)} title={sel ? `November ${sel} · Day ${sel - ch.startDay + 1}` : ""}>
        {c ? (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-[1.25rem] bg-secondary p-3 text-primary"><MoodIcon level={c.mood} className="mx-auto h-6 w-6" /><p className="mt-1">{moodLabels[c.mood]}</p></div>
              <div className="rounded-[1.25rem] bg-secondary p-3 text-primary"><EnergyIcon level={c.energy} className="mx-auto h-6 w-6" /><p className="mt-1">{energyLabels[c.energy]}</p></div>
              <div className="rounded-[1.25rem] bg-secondary p-3 text-info"><Moon className="mx-auto h-6 w-6" /><p className="mt-1">{c.sleep}h sleep</p></div>
            </div>
            <p className="text-sm leading-relaxed">{c.note}</p>
            <Chip>Checked in</Chip>
          </div>
        ) : <p className="text-sm text-muted-foreground">{sel === ch.today ? "You haven't checked in today yet." : "No check-in recorded for this day."}</p>}
      </Sheet>
    </Screen>
  );
}
