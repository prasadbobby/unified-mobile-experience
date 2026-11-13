import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudioScreen, StudioSheet, Label, Tabs, studioHead } from "@/components/c7/studio-kit";
import { progress } from "@/lib/studio-data";
export const Route = createFileRoute("/progress-photos")({
  head: studioHead("Progress photos", "Compare your C7 progress photographs by pose and date."),
  component: ProgressPhotos,
});
const poses = ["Front", "Side", "Back"] as const;
function Photo({
  pose,
  after,
  className = "",
}: {
  pose: number;
  after: boolean;
  className?: string;
}) {
  return (
    <div className={"progress-photo " + className}>
      <img
        src={progress}
        width={1536}
        height={1024}
        alt={`${after ? "November" : "August"} progress, ${poses[pose]?.toLowerCase()} pose`}
        className="absolute max-w-none"
        style={{
          width: "300%",
          height: "200%",
          left: `-${pose * 100}%`,
          top: after ? "-100%" : "0",
        }}
      />
    </div>
  );
}
function ProgressPhotos() {
  const [pose, setPose] = useState<(typeof poses)[number]>("Front"),
    [split, setSplit] = useState(50),
    [selected, setSelected] = useState<boolean | null>(null);
  const col = poses.indexOf(pose);
  return (
    <StudioScreen title="Progress photos">
      <div className="px-5 pt-7">
        <div className="flex items-end justify-between">
          <h1 className="text-3xl font-light">
            Same you.
            <br />
            <span className="text-primary">Stronger story.</span>
          </h1>
          <div className="text-right">
            <p className="text-[44px] font-light tabular-nums leading-none">90</p>
            <Label className="mt-2">DAYS APART</Label>
          </div>
        </div>
        <div className="relative mt-6 aspect-[4/5] overflow-hidden rounded-3xl">
          <Photo pose={col} after className="absolute inset-0" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
            <Photo pose={col} after={false} className="absolute inset-0" />
          </div>
          <div className="absolute bottom-4 left-4 rounded-full bg-surface/80 px-3 py-1.5 text-[10px]">
            14 AUG
          </div>
          <div className="absolute bottom-4 right-4 rounded-full bg-surface/80 px-3 py-1.5 text-[10px]">
            12 NOV
          </div>
          <div
            className="pointer-events-none absolute bottom-0 top-0 w-0.5 bg-primary"
            style={{ left: `${split}%` }}
          >
            <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ArrowLeftRight size={18} />
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={split}
            aria-label="Before and after comparison"
            onChange={(e) => setSplit(Number(e.target.value))}
            className="comparison-slider absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>
        <div className="mt-5">
          <Tabs options={poses} value={pose} onChange={setPose} />
        </div>
        <div className="mb-4 mt-7 flex justify-between">
          <Label>PHOTO JOURNAL</Label>
          <span className="text-[10px] text-muted-foreground">02 CHECK-INS</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[true, false].map((after) => (
            <Button
              key={String(after)}
              variant="ghost"
              onClick={() => setSelected(after)}
              className="block h-auto p-0 text-left"
            >
              <Photo
                pose={col}
                after={after}
                className="relative aspect-[4/5] overflow-hidden rounded-xl"
              />
              <p className="mt-2 text-xs">{after ? "12 Nov 2026" : "14 Aug 2026"}</p>
              <Label className="mt-1">
                {after ? "DAY 90" : "DAY 01"} / {pose}
              </Label>
            </Button>
          ))}
        </div>
        <p className="mt-5 text-[10px] text-muted-foreground">Illustrative progress photography.</p>
      </div>
      <StudioSheet
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected ? "12 November 2026" : "14 August 2026"}
      >
        <Photo
          pose={col}
          after={Boolean(selected)}
          className="relative aspect-square overflow-hidden rounded-xl"
        />
      </StudioSheet>
    </StudioScreen>
  );
}
