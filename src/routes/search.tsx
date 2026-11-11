import { createFileRoute } from "@tanstack/react-router";
import { Bookmark, ListFilter, MessageCircle, Search } from "lucide-react";
import { useState } from "react";
import { CarbsIcon, FatIcon, FlameIcon, ProteinIcon, ingredients } from "@/components/app/icons";
import { Screen, SectionTitle, StatTile, TopBar } from "@/components/app/ui";
import { avatars, mealCategories, meals } from "@/lib/data";
import { toggle, useAppState } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [
    { title: "Search for Meal — PulseFit" },
    { name: "description", content: "Find vegetarian, seafood, high-protein and keto meals with full macros." },
    { property: "og:title", content: "Search for Meal — PulseFit" },
    { property: "og:description", content: "Find healthy meals with full macros." },
  ] }),
  component: SearchMeals,
});

function SearchMeals() {
  const st = useAppState();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("seafood");
  const [byKcal, setByKcal] = useState(false);
  let list = meals.filter((m) => (!cat || m.tag === cat) && m.title.toLowerCase().includes(q.toLowerCase()));
  if (byKcal) list = [...list].sort((a, b) => a.kcal - b.kcal);
  return (
    <Screen nav className="bg-hero">
      <TopBar title="Search for Meal" />
      <label className="mx-5 mt-6 flex h-14 items-center gap-3 rounded-full border border-primary/70 px-5">
        <Search className="h-5 w-5" /><input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground" />
      </label>
      <div className="no-scrollbar mt-5 flex gap-4 overflow-x-auto px-5">
        {mealCategories.map((c) => (
          <button key={c.id} onClick={() => setCat(cat === c.id ? "" : c.id)} className="flex shrink-0 flex-col items-center gap-2">
            <img src={c.image} alt={c.label} className={cn("h-24 w-24 rounded-full object-cover transition", cat === c.id ? "ring-4 ring-primary" : "ring-2 ring-border")} />
            <span className="text-sm">{c.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-6"><SectionTitle action={<button aria-label="Sort by calories" onClick={() => setByKcal(!byKcal)} className={byKcal ? "text-primary" : ""}><ListFilter className="h-5 w-5" /></button>}>Search Result</SectionTitle></div>
      <div className="mt-4 divide-y divide-border px-5">
        {list.map((m, k) => {
          const saved = st.saved.includes(m.id);
          return (
            <div key={m.id} className="py-5 animate-fade-up" style={{ animationDelay: `${k * 60}ms` }}>
              <div className="flex gap-4">
                <div className="relative h-36 w-32 shrink-0 overflow-hidden rounded-[1.5rem]">
                  <img src={m.image} alt={m.title} loading="lazy" className="h-full w-full object-cover" />
                  <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-lime py-0.5 pl-0.5 pr-2 text-xs text-primary-foreground"><img src={avatars.regina} alt="" className="h-6 w-6 rounded-full" />Follow</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between gap-2">
                    <h3 className="text-xl leading-tight">{m.title}</h3>
                    <button aria-label="Save" onClick={() => toggle("saved", m.id)}><Bookmark className={cn("h-5 w-5", saved && "fill-primary text-primary")} /></button>
                  </div>
                  <p className="mt-2 line-clamp-3 text-xs text-muted-foreground">{m.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex -space-x-1 rounded-full bg-card px-2 [&_svg]:h-5 [&_svg]:w-5">{ingredients.slice(0, 5)}</div>
                    <span className="flex items-center gap-1 rounded-full bg-card px-3 py-1 text-xs"><MessageCircle className="h-4 w-4" />{m.comments}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2">
                <StatTile icon={<FlameIcon className="h-6 w-6" />} label="Calories" value={m.kcal} unit="Kcal" className="p-3 [&_p:last-child]:text-lg" />
                <StatTile icon={<ProteinIcon className="h-6 w-6" />} label="Proteins" value={m.protein} unit="g" className="p-3" />
                <StatTile icon={<CarbsIcon className="h-6 w-6" />} label="Carbs" value={m.carbs} unit="g" className="p-3" />
                <StatTile icon={<FatIcon className="h-6 w-6" />} label="Fat" value={m.fat} unit="g" className="p-3" />
              </div>
            </div>
          );
        })}
        {list.length === 0 && <p className="py-10 text-center text-muted-foreground">No meals match your search.</p>}
      </div>
    </Screen>
  );
}
