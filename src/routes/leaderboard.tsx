import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownUp, ChefHat, Crown, Dumbbell, Medal } from "lucide-react";
import { useState } from "react";
import { Screen, SectionTitle, TopBar } from "@/components/app/ui";
import { avatars, leaderboard } from "@/lib/data";
import { useAppState } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({ meta: [
    { title: "Leaderboard — PulseFit" },
    { name: "description", content: "See who leads the workout and cooking streaks this week." },
    { property: "og:title", content: "Leaderboard — PulseFit" },
    { property: "og:description", content: "Who leads the workout and cooking streaks this week." },
  ] }),
  component: Leaderboard,
});

function Leaderboard() {
  const st = useAppState();
  const [tab, setTab] = useState<"workout" | "cooking">("workout");
  const [asc, setAsc] = useState(false);
  const data = leaderboard[tab];
  const [first, second, third] = data;
  const rows = asc ? [...data].reverse() : data;
  const unit = tab === "workout" ? "/steps" : "/pts";
  const Podium = ({ u, rank, size, h }: { u: (typeof data)[number]; rank: number; size: string; h: string }) => (
    <div className="flex flex-1 flex-col items-center">
      <div className="relative animate-pop" style={{ animationDelay: `${rank * 120}ms` }}>
        <img src={u.avatar} alt={u.name} className={cn("rounded-full object-cover ring-4 ring-primary-glow", size)} />
        <span className="absolute -right-1 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">{rank === 1 ? <Crown className="h-4 w-4" /> : <Medal className="h-4 w-4" />}</span>
      </div>
      <p className="mt-2 text-center text-sm">{u.name}</p>
      <div className={cn("mt-3 flex w-full items-start justify-center rounded-t-lg bg-primary pt-2 text-6xl font-bold text-primary-foreground animate-rise", h)}>{rank}</div>
    </div>
  );
  return (
    <Screen nav className="bg-hero">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] overflow-hidden"><div className="absolute -inset-1/2 bg-rays animate-spin-slow" /></div>
      <TopBar title="Leaderboard" />
      <div className="relative mt-6 flex items-end gap-1 px-5">
        {[0, 1, 2, 3, 4].map((i) => <span key={i} className="absolute text-primary animate-twinkle" style={{ left: `${30 + i * 10}%`, top: `${-10 + (i % 2) * 14}px`, animationDelay: `${i * 300}ms` }}>✦</span>)}
        <Podium u={second} rank={2} size="h-20 w-20" h="h-24" />
        <Podium u={first} rank={1} size="h-28 w-28" h="h-32" />
        <Podium u={third} rank={3} size="h-20 w-20" h="h-20" />
      </div>
      <div className="relative -mt-2 rounded-t-[2rem] bg-card pt-5">
        <div className="flex gap-3 px-5">
          {([["workout", "Workout", Dumbbell], ["cooking", "Cooking", ChefHat]] as const).map(([id, label, Icon]) => (
            <button key={id} onClick={() => setTab(id)} className={cn("flex flex-1 items-center gap-3 rounded-full border-2 p-1.5 pr-4 transition", tab === id ? "border-primary text-primary" : "border-transparent bg-secondary")}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface"><Icon className="h-5 w-5" /></span>{label}
            </button>
          ))}
        </div>
        <div className="mt-6"><SectionTitle action={<button aria-label="Reverse order" onClick={() => setAsc(!asc)}><ArrowDownUp className="h-5 w-5" /></button>}>All Users</SectionTitle></div>
        <div className="mt-4 space-y-3 px-5 pb-4">
          {rows.map((u) => {
            const rank = data.indexOf(u) + 1;
            return (
              <div key={u.name} className="flex items-center gap-4 rounded-[1.75rem] bg-secondary p-4 animate-fade-up">
                <div className="relative"><img src={u.avatar} alt={u.name} className="h-14 w-14 rounded-full object-cover ring-2 ring-primary-glow" /><span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">{rank}</span></div>
                <div className="flex-1"><p>{u.name}</p><p className="text-sm text-muted-foreground">{tab === "workout" ? "Workout" : "Cooking"} streak</p></div>
                <div className="text-right"><p className="text-2xl font-light">{u.value}</p><p className="text-xs text-muted-foreground">{unit}</p></div>
              </div>
            );
          })}
          <div className="flex items-center gap-4 rounded-[1.75rem] bg-lime p-4 text-primary-foreground shadow-glow">
            <div className="relative"><img src={avatars.emma} alt="You" className="h-14 w-14 rounded-full object-cover" /><span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-surface text-xs text-foreground">32</span></div>
            <div className="min-w-0 flex-1"><p className="truncate">(You) {st.name}</p><p className="text-sm opacity-75">{tab === "workout" ? "Workout" : "Cooking"} streak</p></div>
            <div className="text-right"><p className="text-2xl">{tab === "workout" ? "987k" : "214"}</p><p className="text-xs opacity-75">{unit}</p></div>
          </div>
        </div>
      </div>
    </Screen>
  );
}
