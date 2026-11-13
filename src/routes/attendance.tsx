import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudioScreen, StudioSheet, Label, studioHead } from "@/components/c7/studio-kit";
import { attendanceMonth } from "@/lib/studio-data";
export const Route = createFileRoute("/attendance")({
  head: studioHead("Attendance", "Your C7 studio visits, streaks and monthly attendance calendar."),
  component: Attendance,
});
function Attendance() {
  const [offset, setOffset] = useState(0),
    [selected, setSelected] = useState<number | null>(null);
  const month = attendanceMonth(offset);
  return (
    <StudioScreen title="Attendance">
      <section className="px-5 pt-8">
        <Label>KEEP SHOWING UP</Label>
        <div className="mt-2 flex items-baseline gap-3">
          <h1 className="text-[84px] font-light tabular-nums leading-none">6</h1>
          <p className="text-lg font-light text-primary">day streak</p>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Your longest streak is 12. Keep going.</p>
        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-sm">{month.label}</h2>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Previous month"
              onClick={() => setOffset(offset - 1)}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Next month"
              disabled={offset === 0}
              onClick={() => setOffset(offset + 1)}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-2">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i} className="mb-1 text-center text-[10px] text-muted-foreground">
              {d}
            </span>
          ))}
          {Array.from({ length: month.first }, (_, i) => (
            <span key={"blank" + i} />
          ))}
          {Array.from({ length: month.count }, (_, i) => i + 1).map((d) => (
            <Button
              key={d}
              variant="ghost"
              aria-label={`${d} ${month.label}, ${month.present.includes(d) ? "present" : d > month.cutoff ? "upcoming" : "no visit"}`}
              onClick={() => setSelected(d)}
              className={
                "aspect-square h-auto w-full rounded-[5px] p-0 text-xs tabular-nums " +
                (month.present.includes(d)
                  ? "bg-primary text-primary-foreground hover:bg-primary/80"
                  : d > month.cutoff
                    ? "bg-card/40 text-muted-foreground/40"
                    : "bg-secondary text-muted-foreground")
              }
            >
              {d}
            </Button>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-[10px] text-muted-foreground">
          <span className="h-2 w-2 rounded-[2px] bg-primary" />
          Present
          <span className="ml-3 h-2 w-2 rounded-[2px] bg-secondary" />
          No visit
        </div>
        <div className="mt-8 grid grid-cols-2 border-y border-border py-5">
          <div>
            <p className="text-[42px] font-light tabular-nums">
              {month.present.length}
              <span className="ml-1 text-sm text-muted-foreground">visits</span>
            </p>
            <Label>THIS MONTH</Label>
          </div>
          <div className="border-l border-border pl-6">
            <p className="text-[42px] font-light tabular-nums">
              {month.rate}
              <span className="text-lg">%</span>
            </p>
            <Label>ATTENDANCE RATE</Label>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <Label>LAST CHECK-IN</Label>
          <p className="text-xs">12 Nov · 7:04 AM IST</p>
        </div>
      </section>
      <StudioSheet
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={`${selected} ${month.label}`}
      >
        <Label>
          {selected !== null && month.present.includes(selected) ? "PRESENT" : "NO CHECK-IN"}
        </Label>
        <p className="mt-4 text-sm text-muted-foreground">
          {selected !== null && month.present.includes(selected)
            ? "Studio visit · Strength session · Coach Arjun"
            : selected !== null && selected > month.cutoff
              ? "This date is upcoming."
              : "No studio visit recorded on this date."}
        </p>
      </StudioSheet>
    </StudioScreen>
  );
}
