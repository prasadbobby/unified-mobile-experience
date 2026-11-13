import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, EllipsisVertical, Heart, MessageCircle, Search } from "lucide-react";
import { CarbsIcon, FatIcon, FlameIcon, ProteinIcon, ingredients } from "@/components/app/icons";
import { Greeting, Screen, StatTile } from "@/components/app/ui";
import { avatars, meals } from "@/lib/data";
import { toggle, useAppState } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/meals")({
  head: () => ({ meta: [
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    { title: "Daily Nutrition — PulseFit" },
    { name: "description", content: "Track calories, protein, carbs and fat and explore the cooking community." },
    { property: "og:title", content: "Daily Nutrition — PulseFit" },
    { property: "og:description", content: "Track macros and explore the cooking community." },
  ] }),
  component: Meals,
});

const posts = [
  { author: "Regina Fly", followers: "12k", avatar: avatars.regina, meal: meals[0]! },
  { author: "Alex Freedman", followers: "8.4k", avatar: avatars.alex, meal: meals[2]! },
  { author: "Methew Apostol", followers: "5.1k", avatar: avatars.methew, meal: meals[5]! },
];

function Meals() {
  const st = useAppState();
  return (
    <Screen nav className="bg-hero">
      <Greeting name={st.name} avatar={avatars.emma} />
      <h1 className="mt-8 px-5 text-2xl font-medium">Your Daily Nutrition</h1>
      <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto px-5">
        <StatTile className="w-36 animate-fade-up" icon={<FlameIcon />} label="Calories" value={1120} unit="Kcal" sub="/ 230 burned" />
        <StatTile className="w-36 animate-fade-up" icon={<ProteinIcon />} label="Proteins" value={98} unit="g" sub="/ 392 kcal" />
        <StatTile className="w-36 animate-fade-up" icon={<CarbsIcon />} label="Carbs" value={120} unit="g" sub="/ 480 kcal" />
        <StatTile className="w-36 animate-fade-up" icon={<FatIcon />} label="Fat" value={42} unit="g" sub="/ 378 kcal" />
      </div>
      <div className="mt-8 flex items-center justify-between px-5">
        <h2 className="text-2xl font-medium">Cooking community</h2>
        <Link to="/search" aria-label="Search meals"><Search className="h-6 w-6" /></Link>
      </div>
      <div className="mt-4 space-y-8 px-5">
        {posts.map((p) => {
          const following = st.following.includes(p.author);
          const liked = st.liked.includes(p.meal.id);
          const saved = st.saved.includes(p.meal.id);
          return (
            <article key={p.meal.id} className="animate-fade-up">
              <div className="flex items-center gap-3">
                <img src={p.avatar} alt={p.author} className="h-14 w-14 rounded-full object-cover" />
                <div className="flex-1"><p>{p.author}</p><p className="text-sm text-muted-foreground">{p.followers} Followers</p></div>
                <button onClick={() => toggle("following", p.author)} className={cn("rounded-full px-5 py-2.5 text-sm transition active:scale-95", following ? "bg-card text-foreground" : "bg-lime text-primary-foreground")}>{following ? "Following" : "Follow"}</button>
                <EllipsisVertical className="h-5 w-5" />
              </div>
              <div className="relative mt-4 h-52 overflow-hidden rounded-[2rem]">
                <img src={p.meal.image} alt={p.meal.title} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-x-3 bottom-3 flex justify-around rounded-full bg-surface/80 py-2 backdrop-blur">{ingredients}</div>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <button onClick={() => toggle("liked", p.meal.id)} className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm">
                  <Heart className={cn("h-5 w-5 transition", liked ? "scale-110 fill-destructive text-destructive" : "")} />{p.meal.likes + (liked ? 1 : 0)} Likes
                </button>
                <span className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm"><MessageCircle className="h-5 w-5" />{p.meal.comments}</span>
                <button aria-label="Save" onClick={() => toggle("saved", p.meal.id)} className="ml-auto"><Bookmark className={cn("h-6 w-6", saved && "fill-primary text-primary")} /></button>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{p.meal.title}: {p.meal.description}</p>
            </article>
          );
        })}
      </div>
    </Screen>
  );
}
