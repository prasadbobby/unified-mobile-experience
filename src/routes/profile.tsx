import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Dumbbell, EllipsisVertical, Footprints, ListFilter, LogOut, Zap } from "lucide-react";
import { useState } from "react";
import hero from "@/assets/profile-emma.jpg";
import { IconButton, Screen, SectionTitle } from "@/components/app/ui";
import { useAppState } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [
    { title: "Profile — PulseFit" },
    { name: "description", content: "Your followers, body stats and latest activity." },
    { property: "og:title", content: "Profile — PulseFit" },
    { property: "og:description", content: "Your followers, body stats and latest activity." },
  ] }),
  component: Profile,
});

function Profile() {
  const st = useAppState();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [boost, setBoost] = useState(false);
  const stats = [["Age", "34", "y.o."], ["Weight", "49", "kg"], ["Height", "168", "cm"], ["Fat", "18", "%"]];
  return (
    <Screen nav>
      <div className="relative h-[520px] overflow-hidden bg-hero">
        <img src={hero} alt="Profile" className="h-full w-full object-cover object-top animate-in fade-in zoom-in-105 duration-700" />
        <div className="absolute inset-0 bg-fade" />
        <div className="absolute inset-x-5 top-6 flex justify-between">
          <IconButton label="Boost mode" onClick={() => setBoost(!boost)} className={cn("border-2 border-primary text-primary", boost && "bg-primary text-primary-foreground shadow-glow")}><Zap className="h-5 w-5" /></IconButton>
          <div className="relative">
            <IconButton label="Menu" onClick={() => setMenu(!menu)}><EllipsisVertical className="h-5 w-5" /></IconButton>
            {menu && <button onClick={() => navigate({ to: "/login" })} className="absolute right-0 top-14 flex items-center gap-2 whitespace-nowrap rounded-2xl bg-popover px-4 py-3 text-sm shadow-card animate-pop"><LogOut className="h-4 w-4" />Log out</button>}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-4 text-center animate-fade-up">
          <div className="flex justify-center gap-2">
            <span className="rounded-full bg-secondary/80 px-4 py-2 backdrop-blur"><b className="text-lg font-medium">542</b> Followers</span>
            <span className="rounded-full bg-secondary/80 px-4 py-2 backdrop-blur"><b className="text-lg font-medium">1,2k</b> Following</span>
          </div>
          <h1 className="mt-4 text-3xl font-medium">{st.name} Richardson</h1>
          <p className="mt-2 px-8 text-sm text-primary">#IronPrincess #CompeteLikeAGirl #WellnessBabe #MuscleMood</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2 px-5">
        {stats.map(([l, v, u]) => (
          <div key={l} className="rounded-[1.5rem] bg-card p-3"><p className="text-xs text-muted-foreground">{l}</p><p className="mt-1 text-xl font-light">{v}<span className="text-xs">{u}</span></p></div>
        ))}
      </div>
      <div className="mt-6"><SectionTitle action={<ListFilter className="h-5 w-5" />}>Last Activity</SectionTitle></div>
      <div className="mt-3 space-y-3 px-5">
        {[{ t: "Workout", s: "Yesterday at 8:00pm", v: 50, u: "/min", I: Dumbbell, c: "bg-destructive" }, { t: "Walking", s: "Today at 12:43pm", v: 7890, u: "/steps", I: Footprints, c: "bg-lime text-primary-foreground" }].map((a) => (
          <div key={a.t} className="flex items-center gap-4 rounded-[1.75rem] bg-card p-4">
            <div className={cn("flex h-14 w-14 items-center justify-center rounded-full", a.c)}><a.I className="h-6 w-6" /></div>
            <div className="flex-1"><p>{a.t}</p><p className="text-sm text-muted-foreground">{a.s}</p></div>
            <div className="text-right"><p className="text-3xl font-light">{a.v}</p><p className="text-xs text-muted-foreground">{a.u}</p></div>
          </div>
        ))}
      </div>
    </Screen>
  );
}
