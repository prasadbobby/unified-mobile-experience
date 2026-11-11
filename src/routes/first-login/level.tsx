import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LevelGlyph } from "@/components/onboard/glyphs";
import { Headline, NextBar, OnboardScreen, OptionCard, StepHeader } from "@/components/onboard/kit";
import { onboardHead, setOnboarding, useOnboarding, type Level } from "@/lib/onboarding";

export const Route = createFileRoute("/first-login/level")({ head: onboardHead("How fit are you today?", "Tell your coach your current fitness level."), component: LevelStep });

const levels: { id: Level; n: 1 | 2 | 3; sub: string }[] = [
  { id: "Beginner", n: 1, sub: "New to training or coming back" },
  { id: "Intermediate", n: 2, sub: "Train 2–3 times a week" },
  { id: "Advanced", n: 3, sub: "Train 4+ times a week" },
];

function LevelStep() {
  const o = useOnboarding(); const nav = useNavigate();
  return (
    <OnboardScreen>
      <StepHeader step={3} />
      <div className="mt-10 px-5">
        <Headline text="HOW *FIT* ARE YOU TODAY?" />
        <div className="mt-8 space-y-3">
          {levels.map((l, i) => <div key={l.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}><OptionCard selected={o.level === l.id} onClick={() => setOnboarding({ level: l.id })} icon={<LevelGlyph level={l.n} />} title={l.id} sub={l.sub} /></div>)}
        </div>
      </div>
      <NextBar onNext={() => nav({ to: "/first-login/age" })} />
    </OnboardScreen>
  );
}
