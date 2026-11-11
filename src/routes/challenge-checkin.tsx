import { createFileRoute } from "@tanstack/react-router";
import { ImagePlus, Moon, Pencil, X } from "lucide-react";
import { useRef, useState } from "react";
import { PrimaryButton, Screen, TopBar } from "@/components/app/ui";
import { FlameIcon } from "@/components/app/icons";
import { Card, Chip, FRAME, Field, Segmented, StickyBar, Stepper, TextArea, Toggle } from "@/components/c7/kit";
import { EnergyIcon, MoodIcon, energyLabels, moodLabels } from "@/components/c7/moods";
import { sampleImages } from "@/lib/c7-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/challenge-checkin")({
  head: () => ({ meta: [
    { title: "Today's check-in — C7 90-Day Challenge" },
    { name: "description", content: "Log sleep, mood, energy, meals and progress photos for your 90-day transformation." },
    { property: "og:title", content: "Today's check-in — C7 90-Day Challenge" },
    { property: "og:description", content: "Daily check-in for the C7 90-day transformation challenge." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Checkin,
});

const qualities = ["Poor", "Fair", "Good", "Great", "Excellent"] as const;
const texts = [["meals", "Meals today", "Breakfast, lunch, dinner, snacks…"], ["day", "How was your day", "Training, work, how you felt…"], ["wins", "Wins", "What went well?"], ["struggles", "Struggles", "What was hard?"]] as const;
type Form = { sleep: number; quality: (typeof qualities)[number]; mood: number; energy: number; fasting: boolean; meals: string; day: string; wins: string; struggles: string; photos: string[] };

export function PickerRow({ count, value, onChange, Icon, labels }: { count: number; value: number; onChange: (n: number) => void; Icon: typeof MoodIcon; labels: string[] }) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button key={i} type="button" aria-label={labels[i]} aria-pressed={value === i} onClick={() => onChange(i)}
          className={cn("flex flex-1 flex-col items-center gap-1 rounded-[1.25rem] border-2 py-2.5 text-[10px] transition active:scale-95", value === i ? "border-primary text-primary" : "border-transparent bg-secondary text-muted-foreground")}>
          <Icon level={i} className="h-6 w-6" />{labels[i]}
        </button>
      ))}
    </div>
  );
}

function Checkin() {
  const [f, setF] = useState<Form>({ sleep: 7, quality: "Good", mood: 4, energy: 3, fasting: false, meals: "", day: "", wins: "", struggles: "", photos: [sampleImages[2]!, sampleImages[3]!] });
  const [posted, setPosted] = useState(false);
  const file = useRef<HTMLInputElement>(null);
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((p) => ({ ...p, [k]: v }));
  const addPhotos = (files: FileList | null) => { if (!files) return; const urls = Array.from(files).map((x) => URL.createObjectURL(x)); set("photos", [...f.photos, ...urls].slice(0, 10)); };

  return (
    <Screen className={`bg-hero pb-36 ${FRAME}`}>
      <TopBar title="Today's check-in" right={<span className="flex h-12 items-center gap-1 rounded-full bg-card px-3 text-sm"><FlameIcon className="h-5 w-5" />8</span>} />
      <div className="mt-6 px-5 animate-fade-up">
        <Chip>90-day transformation</Chip>
        <h2 className="mt-3 text-3xl font-light">Day <span className="text-primary">8</span> of 90</h2>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-lime" style={{ width: `${(8 / 90) * 100}%` }} /></div>
      </div>

      {posted ? (
        <Card className="mx-5 mt-6 animate-pop">
          <div className="flex items-center justify-between"><Chip>Posted · just now</Chip>
            <button onClick={() => setPosted(false)} className="flex items-center gap-1 rounded-full border border-primary/70 px-4 py-2 text-sm text-primary"><Pencil className="h-4 w-4" />Edit</button></div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-[1.25rem] bg-secondary p-3 text-primary"><MoodIcon level={f.mood} className="mx-auto h-6 w-6" /><p className="mt-1">{moodLabels[f.mood]}</p></div>
            <div className="rounded-[1.25rem] bg-secondary p-3 text-primary"><EnergyIcon level={f.energy} className="mx-auto h-6 w-6" /><p className="mt-1">{energyLabels[f.energy]}</p></div>
            <div className="rounded-[1.25rem] bg-secondary p-3 text-info"><Moon className="mx-auto h-6 w-6" /><p className="mt-1">{f.sleep}h · {f.quality}</p></div>
          </div>
          {texts.map(([k, l]) => f[k] && <div key={k} className="mt-4"><p className="text-xs text-muted-foreground">{l}</p><p className="text-sm">{f[k]}</p></div>)}
          {f.fasting && <p className="mt-4 text-sm text-primary">Fasting day ✓</p>}
          {f.photos.length > 0 && <div className="mt-4 grid grid-cols-4 gap-2">{f.photos.map((p) => <img key={p} src={p} alt="Progress" className="aspect-square rounded-xl object-cover" />)}</div>}
        </Card>
      ) : (
        <div className="mt-6 space-y-5 px-5">
          <Card className="space-y-4">
            <div className="flex items-center justify-between"><span className="flex items-center gap-2"><Moon className="h-5 w-5 text-info" />Sleep</span><div className="w-40"><Stepper label="sleep hours" value={f.sleep} step={0.5} unit="h" onChange={(v) => set("sleep", Math.min(14, v))} /></div></div>
            <Segmented options={qualities} value={f.quality} onChange={(v) => set("quality", v)} />
          </Card>
          <Card><p className="mb-3">Mood</p><PickerRow count={6} value={f.mood} onChange={(v) => set("mood", v)} Icon={MoodIcon} labels={moodLabels} /></Card>
          <Card><p className="mb-3">Energy</p><PickerRow count={5} value={f.energy} onChange={(v) => set("energy", v)} Icon={EnergyIcon} labels={energyLabels} /></Card>
          <Card className="flex items-center justify-between"><div><p>Fasting today</p><p className="text-xs text-muted-foreground">Intermittent fast completed</p></div><Toggle label="Fasting" on={f.fasting} onChange={(v) => set("fasting", v)} /></Card>
          {texts.map(([k, l, ph]) => <Field key={k} label={l}><TextArea value={f[k]} placeholder={ph} onChange={(e) => set(k, e.target.value)} /></Field>)}
          <div>
            <p className="mb-2 flex justify-between text-sm text-muted-foreground"><span>Progress photos</span><span>{f.photos.length}/10</span></p>
            <div className="grid grid-cols-4 gap-2">
              {f.photos.length < 10 && (
                <button type="button" onClick={() => file.current?.click()} className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-primary/60 text-[10px] text-primary"><ImagePlus className="h-5 w-5" />Add</button>
              )}
              {f.photos.map((p) => (
                <div key={p} className="relative animate-pop"><img src={p} alt="Progress" className="aspect-square w-full rounded-xl object-cover" />
                  <button aria-label="Remove photo" onClick={() => set("photos", f.photos.filter((x) => x !== p))} className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-surface"><X className="h-3.5 w-3.5" /></button></div>
              ))}
            </div>
            <input ref={file} type="file" accept="image/*" multiple hidden onChange={(e) => addPhotos(e.target.files)} />
          </div>
        </div>
      )}
      {!posted && <StickyBar><PrimaryButton onClick={() => { setPosted(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Post check-in</PrimaryButton></StickyBar>}
    </Screen>
  );
}
