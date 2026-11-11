import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Headline, NextBar, OnboardScreen, StepHeader } from "@/components/onboard/kit";
import { onboardHead, setOnboarding, useOnboarding } from "@/lib/onboarding";

export const Route = createFileRoute("/first-login/name")({ head: onboardHead("What should we call you?", "Confirm your name from your gym invite."), component: Name });

function Name() {
  const o = useOnboarding(); const nav = useNavigate();
  return (
    <OnboardScreen>
      <StepHeader step={1} />
      <div className="mt-12 px-5 animate-fade-up">
        <Headline text="WHAT SHOULD WE *CALL* YOU?" />
        <p className="mt-3 text-muted-foreground">Prefilled from your gym invite.</p>
        <label className="mt-10 block text-xs uppercase tracking-widest text-muted-foreground">First name
          <input value={o.first} onChange={(e) => setOnboarding({ first: e.target.value })} className="field mt-2 h-[58px] text-base normal-case tracking-normal" /></label>
        <label className="mt-5 block text-xs uppercase tracking-widest text-muted-foreground">Last name
          <input value={o.last} onChange={(e) => setOnboarding({ last: e.target.value })} className="field mt-2 h-[58px] text-base normal-case tracking-normal" /></label>
      </div>
      <NextBar disabled={!o.first.trim()} onNext={() => nav({ to: "/first-login/goal" })} />
    </OnboardScreen>
  );
}
