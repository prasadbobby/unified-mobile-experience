import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Timer } from "lucide-react";
import { useState } from "react";
import { Screen, TopBar } from "@/components/app/ui";
import { workouts, type Category } from "@/lib/data";
import { cn } from "@/lib/utils";
import { cats } from "./home";

export const Route = createFileRoute("/workout")({
  head: () => ({ meta: [
    { title: "Workouts — PulseFit" },
    { name: "description", content: "Browse guided warm-up, cardio and strength workouts." },
    { property: "og:title", content: "Workouts — PulseFit" },
    { property: "og:description", content: "Guided warm-up, cardio and strength workouts." },
  ] }),
  component: WorkoutList,
});

function WorkoutList() {
  const [cat, setCat] = useState<Category | "all">("all");
  const [q, setQ] = useState("");
  const list = workouts.filter((w) => (cat === "all" || w.category === cat) && w.title.toLowerCase().includes(q.toLowerCase()));
  return (
    <Screen nav className="bg-hero">
      <TopBar title="Workouts" />
      <label className="mx-5 mt-6 flex h-14 items-center gap-3 rounded-full border border-primary/70 px-5">
        <Search className="h-5 w-5" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search workouts" className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground" />
      </label>
      <div className="no-scrollbar mt-5 flex gap-3 overflow-x-auto px-5">
        {[{ id: "all" as const, label: "All", icon: null }, ...cats].map((c) => (
          <button key={c.id} onClick={() => setCat(c.id)} className={cn("flex shrink-0 items-center gap-2 rounded-full border-2 px-5 py-2.5 transition", cat === c.id ? "border-primary text-primary" : "border-transparent bg-card")}>
            {c.icon && <c.icon className="h-4 w-4" />}{c.label}
          </button>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 px-5">
        {list.map((w, k) => (
          <Link key={w.id} to="/exercise/$id" params={{ id: w.id }} style={{ animationDelay: `${k * 60}ms` }} className="group relative aspect-[3/4] overflow-hidden rounded-[1.5rem] animate-fade-up">
            <img src={w.image} alt={w.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-fade" />
            <div className="absolute bottom-3 left-3 right-3">
              <p className="font-medium">{w.title}</p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground"><Timer className="h-3 w-3" />{w.minutes} min · {w.subtitle}</p>
            </div>
          </Link>
        ))}
        {list.length === 0 && <p className="col-span-2 py-10 text-center text-muted-foreground">No workouts found.</p>}
      </div>
    </Screen>
  );
}
