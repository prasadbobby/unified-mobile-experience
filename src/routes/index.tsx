import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import hero from "@/assets/onboarding-woman.jpg";
import { workouts } from "@/lib/data";
import { Screen } from "@/components/app/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    { title: "PulseFit — Track steps, workouts & meals" },
    { name: "description", content: "PulseFit helps you hit your daily steps, follow guided workouts and track nutrition." },
    { property: "og:title", content: "PulseFit — Track steps, workouts & meals" },
    { property: "og:description", content: "Hit your daily steps, follow guided workouts and track nutrition." },
  ] }),
  component: Onboarding,
});

const slides = [
  { img: hero, score: 88, big: "+1,012", label: "Steps Taken", note: "You still need 819 steps to complete your day. Do it now!!! ⚡" },
  { img: workouts[0]!.image, score: 92, big: "47.5kg", label: "Lifted Today", note: "Guided workouts with video and progress you can see. 💪" },
  { img: workouts[1]!.image, score: 76, big: "1120", label: "Kcal Tracked", note: "Daily nutrition and a cooking community that keeps you fuelled. 🥗" },
  { img: workouts[2]!.image, score: 95, big: "#32", label: "Your Rank", note: "Climb the leaderboard with friends every single week. 🏆" },
];

function Onboarding() {
  const [i, setI] = useState(0);
  const navigate = useNavigate();
  const s = slides[i]!;
  const next = () => (i < slides.length - 1 ? setI(i + 1) : navigate({ to: "/login" }));
  return (
    <Screen className="h-screen overflow-hidden">
      <img key={s.img} src={s.img} alt="" className="absolute inset-0 h-full w-full object-cover animate-in fade-in zoom-in-105 duration-700" />
      <div className="absolute inset-0 bg-fade" />
      <Link to="/login" className="absolute -right-6 -top-6 z-10 flex h-28 w-28 items-end justify-start rounded-full bg-surface/60 pb-8 pl-8 text-lg backdrop-blur">Skip</Link>
      <div key={i} className="absolute right-6 top-[38%] flex items-center gap-3 rounded-xl bg-surface/50 p-1.5 pr-4 backdrop-blur animate-pop">
        <span className="rounded-lg bg-cream px-3 py-2 text-3xl text-surface">{s.score}</span>
        <span className="text-sm leading-tight">SCORE<br />NOW</span>
      </div>
      <div key={`t${i}`} className="absolute inset-x-6 bottom-36 animate-fade-up">
        <p className="max-w-[200px] text-sm text-foreground/90">{s.note}</p>
        <p className="mt-6 text-6xl font-light">{s.big}</p>
        <p className="mt-2 text-3xl font-light">{s.label}</p>
      </div>
      <div className="absolute inset-x-6 bottom-12 flex items-center justify-between">
        <div className="flex gap-1.5">
          {slides.map((_, k) => (
            <button key={k} aria-label={`Slide ${k + 1}`} onClick={() => setI(k)} className={cn("h-2.5 rounded-full transition-all duration-300", k === i ? "w-12 bg-primary" : "w-2.5 bg-foreground")} />
          ))}
        </div>
        <button onClick={next} aria-label="Next" className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow transition hover:rotate-45 active:scale-90">
          <ArrowUpRight className="h-7 w-7" />
        </button>
      </div>
    </Screen>
  );
}
