import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { StudioScreen, Label, studioHead } from "@/components/c7/studio-kit";
import { bmiStats } from "@/lib/studio-data";
export const Route = createFileRoute("/bmi")({
  head: studioHead(
    "Body mass index",
    "Calculate BMI, review healthy weight range and monthly history.",
  ),
  component: Bmi,
});
function Bmi() {
  const [weight, setWeight] = useState("64"),
    [height, setHeight] = useState("168");
  const stats = bmiStats(Number(weight), Number(height));
  const angle = Math.PI * (1 - Math.max(0, Math.min(1, ((stats?.bmi ?? 15) - 15) / 25)));
  const x = 170 + 108 * Math.cos(angle),
    y = 157 - 108 * Math.sin(angle);
  return (
    <StudioScreen title="Body mass index">
      <div className="px-5 pt-8">
        <div className="flex items-start justify-between">
          <div>
            <Label>YOUR BMI</Label>
            <h1 className="mt-2 text-[64px] font-light leading-none tabular-nums">
              {stats ? stats.bmi.toFixed(1) : "—"}
            </h1>
          </div>
          <span className="mt-9 rounded-full border border-primary/70 px-3 py-1.5 text-xs text-primary">
            {stats?.band ?? "Enter values"}
          </span>
        </div>
        <svg
          viewBox="0 0 340 185"
          className="mt-5 w-full"
          aria-label={`BMI gauge: ${stats?.band ?? "unavailable"}`}
        >
          <path
            d="M 28 157 A 142 142 0 0 1 41.5 96.5"
            className="stroke-info"
            strokeWidth="18"
            fill="none"
          />
          <path
            d="M 45.5 88.6 A 142 142 0 0 1 121.3 23.6"
            className="stroke-primary"
            strokeWidth="18"
            fill="none"
          />
          <path
            d="M 129.7 20.8 A 142 142 0 0 1 209.7 20.6"
            className="stroke-warning"
            strokeWidth="18"
            fill="none"
          />
          <path
            d="M 218.5 23.5 A 142 142 0 0 1 312 157"
            className="stroke-destructive"
            strokeWidth="18"
            fill="none"
          />
          <line x1="170" y1="157" x2={x} y2={y} className="stroke-foreground" strokeWidth="2" />
          <circle cx="170" cy="157" r="5" className="fill-foreground" />
          <text x="170" y="182" textAnchor="middle" className="fill-muted-foreground text-[10px]">
            15 — 40 kg/m²
          </text>
        </svg>
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>Under</span>
          <span className="text-primary">Healthy</span>
          <span>Over</span>
          <span>Obese</span>
        </div>
        <div className="mt-6 flex items-baseline justify-between border-y border-border py-4">
          <Label>HEALTHY WEIGHT RANGE</Label>
          <p className="text-xl font-light tabular-nums">
            {stats ? `${stats.low.toFixed(1)}–${stats.high.toFixed(1)}` : "—"}
            <span className="text-xs text-muted-foreground"> kg</span>
          </p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <label>
            <Label>WEIGHT / KG</Label>
            <input
              aria-label="Weight in kilograms"
              type="number"
              min="1"
              max="400"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-2 w-full border-b border-border bg-transparent pb-3 text-3xl font-light tabular-nums outline-none focus:border-primary"
            />
          </label>
          <label>
            <Label>HEIGHT / CM</Label>
            <input
              aria-label="Height in centimetres"
              type="number"
              min="50"
              max="250"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="mt-2 w-full border-b border-border bg-transparent pb-3 text-3xl font-light tabular-nums outline-none focus:border-primary"
            />
          </label>
        </div>
        <div className="mt-7 flex justify-between">
          <Label>THE BIG PICTURE</Label>
          <span className="text-[10px] text-primary">−2.4 SINCE JUNE</span>
        </div>
        <div className="mt-4 flex h-24 items-end gap-4">
          {[25.1, 24.6, 24.2, 23.6, 23.1, 22.7].map((n, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-[9px] text-muted-foreground">{n}</span>
              <div
                className={"w-full rounded-t-[3px] " + (i === 5 ? "bg-primary" : "bg-secondary")}
                style={{ height: (n - 18) * 7 }}
              />
              <span className="text-[9px] text-muted-foreground">
                {["JUN", "JUL", "AUG", "SEP", "OCT", "NOV"][i]}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 inline-flex rounded-full border border-primary/40 px-3 py-2 text-[10px] text-primary">
          NEXT CHECK-UP · 30 NOV 2026
        </div>
        <p className="mt-4 text-[10px] leading-relaxed text-muted-foreground">
          BMI is a screening measure, not a diagnosis. It does not distinguish muscle from body fat.
          Discuss results with your clinician.
        </p>
      </div>
    </StudioScreen>
  );
}
