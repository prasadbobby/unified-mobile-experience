import { createFileRoute, notFound } from "@tanstack/react-router";
import { Expand, Pause, Pencil, Play, Plus, Timer, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { DumbbellGlyph } from "@/components/app/icons";
import { BackButton, IconButton, Screen } from "@/components/app/ui";
import { workouts } from "@/lib/data";

export const Route = createFileRoute("/exercise/$id")({
  loader: ({ params }) => {
    const w = workouts.find((x) => x.id === params.id);
    if (!w) throw notFound();
    return w;
  },
  head: ({ loaderData }) => ({ meta: [
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    { title: loaderData ? `${loaderData.title} — PulseFit` : "Workout — PulseFit" },
    { name: "description", content: loaderData?.description.slice(0, 150) ?? "Guided workout" },
    { property: "og:title", content: loaderData ? `${loaderData.title} — PulseFit` : "Workout — PulseFit" },
    { property: "og:description", content: loaderData?.description.slice(0, 150) ?? "Guided workout" },
  ] }),
  component: Exercise,
});

const TOTAL = 340;
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

function Exercise() {
  const w = Route.useLoaderData();
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [muted, setMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [points, setPoints] = useState([22, 48, 30, 41, 28, 42]);
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setT((v) => (v >= TOTAL ? (setPlaying(false), TOTAL) : v + 1)), 1000);
    return () => clearInterval(id);
  }, [playing]);
  const W = 320, H = 150, max = 55, min = 15;
  const xy = points.map((p, i) => [20 + (i * (W - 40)) / (points.length - 1), H - ((p - min) / (max - min)) * H] as const);
  const path = xy.reduce((acc, [x, y], i) => {
    if (i === 0) return `M${x},${y}`;
    const [px, py] = xy[i - 1]!; const cx = (px + x) / 2;
    return `${acc} C${cx},${py} ${cx},${y} ${x},${y}`;
  }, "");
  return (
    <Screen className="pb-10">
      <div className="relative h-[420px] overflow-hidden rounded-b-[2.5rem] bg-hero">
        <img src={w.image} alt={w.title} className="h-full w-full object-cover animate-in fade-in duration-700" />
        <div className="absolute inset-0 bg-fade" />
        <div className="absolute inset-x-5 top-6 flex justify-between"><BackButton /><IconButton label="Fullscreen" onClick={() => setExpanded(!expanded)}><Expand className="h-5 w-5" /></IconButton></div>
        <button onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause" : "Play"} className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-surface/50 backdrop-blur transition active:scale-90">
          {playing ? <Pause className="h-8 w-8 fill-current" /> : <Play className="ml-1 h-8 w-8 fill-current" />}
        </button>
        <div className="absolute inset-x-5 bottom-5">
          <div className="flex items-center gap-4">
            <button onClick={() => setPlaying(!playing)} aria-label="Toggle play">{playing ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}</button>
            <span className="flex-1 text-sm">{fmt(t)} - {fmt(TOTAL)}</span>
            <button onClick={() => setMuted(!muted)} aria-label="Mute">{muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}</button>
          </div>
          <input type="range" min={0} max={TOTAL} value={t} onChange={(e) => setT(+e.target.value)} className="mt-4 w-full accent-[var(--primary)]" aria-label="Seek" />
        </div>
      </div>
      <div className="px-5 pt-6 animate-fade-up">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-medium">{w.title}</h1>
            <p className="mt-2 flex items-center gap-2 text-muted-foreground"><DumbbellGlyph className="h-5 w-5 text-primary" />{w.subtitle}</p>
          </div>
          <span className="flex items-center gap-2 rounded-full bg-card px-4 py-3 text-sm"><Timer className="h-4 w-4" />{w.minutes} min</span>
        </div>
        <p className={`mt-5 text-sm leading-7 text-muted-foreground ${expanded ? "" : "line-clamp-3"}`}>{w.description}</p>
        <button onClick={() => setExpanded(!expanded)} className="mt-1 text-sm text-primary">{expanded ? "Show less" : "Read more"}</button>
        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-lg font-medium">My Progress</h2>
          <div className="flex gap-4">
            <button aria-label="Edit last" onClick={() => setPoints(points.map((p, i) => (i === points.length - 1 ? Math.min(max, p + 2.5) : p)))}><Pencil className="h-5 w-5" /></button>
            <button aria-label="Add entry" onClick={() => setPoints([...points.slice(1), Math.round(20 + Math.random() * 30)])}><Plus className="h-5 w-5" /></button>
          </div>
        </div>
        <p className="mt-2 text-4xl font-light text-primary">{points[points.length - 1]}kg</p>
        <svg viewBox={`0 0 ${W} ${H + 30}`} className="mt-4 w-full overflow-visible">
          <defs><linearGradient id="ln" x1="0" x2="1"><stop offset="0" stopColor="var(--primary)" stopOpacity="0.2" /><stop offset=".4" stopColor="var(--primary)" /><stop offset="1" stopColor="var(--primary-glow)" stopOpacity="0.4" /></linearGradient></defs>
          {[50, 40, 30, 20].map((v) => <text key={v} x={0} y={H - ((v - min) / (max - min)) * H} className="fill-muted-foreground text-[10px]">{v}kg</text>)}
          <path key={path} d={path} fill="none" stroke="url(#ln)" strokeWidth={2.5} strokeLinecap="round" className="animate-draw" />
          {xy.map(([x, y], i) => i % 2 === 1 && (
            <g key={i} className="animate-pop" style={{ animationDelay: `${i * 120}ms` }}>
              <circle cx={x} cy={y} r={13} className="fill-card" />
              <circle cx={x} cy={y} r={4} className="fill-primary" />
            </g>
          ))}
          {["Mon", "Wed", "Thr", "Sun"].map((d, i) => <text key={d} x={60 + i * 75} y={H + 25} className="fill-muted-foreground text-[11px]">{d}</text>)}
        </svg>
      </div>
    </Screen>
  );
}
