import { createFileRoute, useNavigate } from "@tanstack/react-router";
import success from "@/assets/first-login-success.svg";
import { Chip } from "@/components/c7/kit";
import { Headline, NextBar, OnboardScreen } from "@/components/onboard/kit";
import { kgToLb, onboardHead, useOnboarding } from "@/lib/onboarding";

export const Route = createFileRoute("/first-login/ready")({ head: onboardHead("You're all set", "Your profile is ready. Your coach will assign your first workout."), component: Ready });

function Ready() {
  const o = useOnboarding(); const nav = useNavigate();
  const chips = [`${o.first} ${o.last}`.trim(), o.goal, o.level, `${o.age} yrs`, o.unit === "lb" ? `${kgToLb(o.weightKg)} lb` : `${o.weightKg} kg`, `${o.heightCm} cm`];
  return (
    <OnboardScreen>
      <div className="flex flex-col items-center px-5 pt-16 text-center">
        <img src={success} alt="" aria-hidden className="h-56 w-56 animate-pop" />
        <Headline text="YOU'RE ALL *SET*" className="mt-6 text-[3.25rem]" />
        <div className="mt-6 flex flex-wrap justify-center gap-2">{chips.map((c, i) => <span key={c} className="animate-fade-up" style={{ animationDelay: `${200 + i * 60}ms` }}><Chip className="px-4 py-1.5 text-sm">{c}</Chip></span>)}</div>
        <p className="mt-10 font-display text-xl font-bold uppercase leading-tight tracking-wide">Your <span className="text-primary">coach</span> will assign your first workout</p>
        <p className="mt-2 text-sm text-muted-foreground">You'll get a notification when it's ready.</p>
      </div>
      <NextBar back={false} label="Let's go" onNext={() => nav({ to: "/home" })} />
    </OnboardScreen>
  );
}
