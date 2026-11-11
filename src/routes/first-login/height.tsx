import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Headline, NextBar, OnboardScreen, RulerVertical, StepHeader } from "@/components/onboard/kit";
import { onboardHead, setOnboarding, useOnboarding } from "@/lib/onboarding";

export const Route = createFileRoute("/first-login/height")({ head: onboardHead("What is your height?", "Set your height for body stats."), component: Height });

function Height() {
  const o = useOnboarding(); const nav = useNavigate();
  return (
    <OnboardScreen>
      <StepHeader step={6} />
      <div className="mt-10 px-5"><Headline text="WHAT IS YOUR *HEIGHT*?" /></div>
      <div className="relative mt-6 flex h-[420px] items-center pl-5">
        <div className="absolute bottom-1/2 left-5 mb-4">
          <p className="font-display font-extrabold leading-none animate-pop"><span className="text-[6.5rem] tabular-nums">{o.heightCm}</span> <span className="text-4xl text-primary">CM</span></p>
        </div>
        <div className="pointer-events-none absolute left-5 right-[6.25rem] top-1/2 flex -translate-y-1/2 items-center">
          <span className="h-1 flex-1 rounded-full bg-primary shadow-glow" /><span className="h-0 w-0 border-y-[7px] border-l-[10px] border-y-transparent border-l-primary" />
        </div>
        <div className="ml-auto"><RulerVertical min={140} max={210} value={o.heightCm} onChange={(heightCm) => setOnboarding({ heightCm })} /></div>
      </div>
      <NextBar label="Finish" onNext={() => nav({ to: "/first-login/ready" })} />
    </OnboardScreen>
  );
}
