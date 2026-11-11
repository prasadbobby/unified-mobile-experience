import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Headline, NextBar, OnboardScreen, StepHeader, WheelPicker } from "@/components/onboard/kit";
import { onboardHead, setOnboarding, useOnboarding } from "@/lib/onboarding";

export const Route = createFileRoute("/first-login/age")({ head: onboardHead("What is your age?", "Your age helps your coach set safe targets."), component: Age });
const ages = Array.from({ length: 70 }, (_, i) => i + 14);

function Age() {
  const o = useOnboarding(); const nav = useNavigate();
  return (
    <OnboardScreen>
      <StepHeader step={4} />
      <div className="mt-10 px-5"><Headline text="WHAT IS YOUR *AGE*?" /></div>
      <div className="mt-10 animate-fade-up"><WheelPicker values={ages} value={o.age} onChange={(age) => setOnboarding({ age })} /></div>
      <p className="mt-4 text-center font-display text-sm uppercase tracking-[0.2em] text-muted-foreground">Years old</p>
      <NextBar onNext={() => nav({ to: "/first-login/weight" })} />
    </OnboardScreen>
  );
}
