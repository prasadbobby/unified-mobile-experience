import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Segmented } from "@/components/c7/kit";
import { Headline, NextBar, OnboardScreen, RulerHorizontal, StepHeader } from "@/components/onboard/kit";
import { kgToLb, lbToKg, onboardHead, setOnboarding, useOnboarding } from "@/lib/onboarding";

export const Route = createFileRoute("/first-login/weight")({ head: onboardHead("What is your weight?", "Set your starting weight for progress tracking."), component: Weight });

function Weight() {
  const o = useOnboarding(); const nav = useNavigate();
  const lb = o.unit === "lb";
  const shown = lb ? kgToLb(o.weightKg) : o.weightKg;
  return (
    <OnboardScreen>
      <StepHeader step={5} />
      <div className="mt-10 px-5"><Headline text="WHAT IS YOUR *WEIGHT*?" /></div>
      <div className="mx-auto mt-8 w-40"><Segmented options={["kg", "lb"] as const} value={o.unit} onChange={(unit) => setOnboarding({ unit })} /></div>
      <p className="mt-10 text-center font-display font-extrabold leading-none animate-pop"><span className="text-[7rem] tabular-nums">{shown}</span> <span className="text-4xl uppercase text-primary">{o.unit}</span></p>
      <div className="mt-8">
        <RulerHorizontal key={o.unit} min={lb ? 66 : 30} max={lb ? 440 : 200} value={shown} onChange={(v) => setOnboarding({ weightKg: lb ? lbToKg(v) : v })} />
      </div>
      <NextBar onNext={() => nav({ to: "/first-login/height" })} />
    </OnboardScreen>
  );
}
