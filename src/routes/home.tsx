import { createFileRoute, Link } from "@tanstack/react-router";
import { Dumbbell, Footprints, HeartPulse, PersonStanding, SlidersHorizontal, Timer, Trophy } from "lucide-react";
import { useState } from "react";
import { Greeting, Screen } from "@/components/app/ui";
import { avatars, workouts, type Category } from "@/lib/data";
import { setState, useAppState } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    { title: "Home — PulseFit" },
    { name: "description", content: "Your daily challenge, weekly calendar, workouts and recent activity." },
    { property: "og:title", content: "Home — PulseFit" },
    { property: "og:description", content: "Your daily challenge, workouts and recent activity." },
  ] }),
  component: HomeScreen,
});

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const cats: { id: Category; label: string; icon: typeof HeartPulse }[] = [
  { id: "warmup", label: "Warm Up", icon: PersonStanding },
  { id: "cardio", label: "Cardio", icon: HeartPulse },
  { id: "strength", label: "Strength", icon: Dumbbell },
];

function HomeScreen() {
  const st = useAppState();
  const [day, setDay] = useState(3);
  const [cat, setCat] = useState<Category | "all">("all");
  const [sortDesc, setSortDesc] = useState(true);
  const list = workouts.filter((w) => cat === "all" || w.category === cat);
  const activity = [
    { title: "Walking", time: "Today at 12:43pm", value: 7890, unit: "/steps", icon: Footprints, tone: "bg-lime text-primary-foreground" },
    { title: "Workout", time: "Yesterday at 8:00pm", value: 72, unit: "/min", icon: Dumbbell, tone: "bg-destructive text-destructive-foreground" },
    { title: "Cycling", time: "Mon at 7:10am", value: 12, unit: "/km", icon: Timer, tone: "bg-deep text-foreground" },
  ];
  const sorted = [...activity].sort((a, b) => (sortDesc ? b.value - a.value : a.value - b.value));
  return (
    <Screen nav className="bg-hero">
      <Greeting name={st.name} avatar={avatars.emma} />
      <div className="mx-5 mt-6 flex items-center gap-4 rounded-full bg-lime p-2 pr-3 animate-fade-up">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface"><Trophy className="h-7 w-7 text-foreground" /></div>
        <div className="flex-1 text-primary-foreground">
          <p className="text-lg font-medium">New Challenge</p>
          <p className="text-sm opacity-80">2 Weeks of Energy</p>
        </div>
        <button onClick={() => setState({ challengeStarted: !st.challengeStarted })} className="rounded-full bg-cream px-5 py-3 text-sm font-semibold text-surface shadow-card transition active:scale-95">
          {st.challengeStarted ? "DAY 1 ✓" : "START"}
        </button>
      </div>

      <div className="mt-6 grid grid-cols-7 px-3 text-center">
        {days.map((d, k) => (
          <button key={d} onClick={() => setDay(k)} className="flex flex-col items-center gap-3">
            <span className={cn("text-sm", k === day ? "text-primary" : "text-muted-foreground")}>{d}</span>
            <span className={cn("flex h-11 w-11 items-center justify-center rounded-full border text-base transition-all", k === day ? "border-primary text-primary scale-110" : k % 2 === 0 ? "border-border" : "border-transparent")}>{13 + k}</span>
          </button>
        ))}
      </div>

      <div className="no-scrollbar mt-6 flex gap-3 overflow-x-auto px-5">
        {cats.map((c) => (
          <button key={c.id} onClick={() => setCat(cat === c.id ? "all" : c.id)}
            className={cn("flex shrink-0 items-center gap-2 rounded-full border-2 px-5 py-3 transition", cat === c.id ? "border-primary text-primary" : "border-transparent bg-card")}>
            <c.icon className="h-5 w-5" />{c.label}
          </button>
        ))}
      </div>

      <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto px-5">
        {list.map((w, k) => (
          <Link key={w.id} to="/exercise/$id" params={{ id: w.id }} style={{ animationDelay: `${k * 70}ms` }}
            className="group relative h-44 w-40 shrink-0 overflow-hidden rounded-[1.5rem] animate-fade-up">
            <img src={w.image} alt={w.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-fade" />
            <div className="absolute bottom-3 left-3">
              <p className="text-sm font-medium">{w.title}</p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground"><Timer className="h-3 w-3" />{w.minutes} min</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between px-5">
        <h2 className="text-lg font-medium">Recent Activity</h2>
        <button aria-label="Sort" onClick={() => setSortDesc(!sortDesc)} className="text-muted-foreground transition hover:text-primary"><SlidersHorizontal className="h-5 w-5" /></button>
      </div>
      <div className="mt-3 space-y-3 px-5">
        {sorted.map((a) => (
          <div key={a.title} className="flex items-center gap-4 rounded-[1.75rem] bg-card p-4 transition-all">
            <div className="rounded-full p-1 ring-2 ring-primary/40"><div className={cn("flex h-14 w-14 items-center justify-center rounded-full", a.tone)}><a.icon className="h-6 w-6" /></div></div>
            <div className="flex-1"><p>{a.title}</p><p className="text-sm text-muted-foreground">{a.time}</p></div>
            <div className="text-right"><p className="text-3xl font-light">{a.value}</p><p className="text-xs text-muted-foreground">{a.unit}</p></div>
          </div>
        ))}
      </div>
    </Screen>
  );
}
