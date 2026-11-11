import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { EnduranceGlyph, LoseWeightGlyph, MuscleGlyph, TonedGlyph } from "@/components/onboard/glyphs";
import { Headline, NextBar, OnboardScreen, OptionCard, StepHeader } from "@/components/onboard/kit";
import { onboardHead, setOnboarding, useOnboarding, type Goal } from "@/lib/onboarding";

export const Route = createFileRoute("/first-login/goal")({ head: onboardHead("What's your main goal?", "Pick the goal your coach will plan around."), component: GoalStep });

const goals: { id: Goal; sub: string; Icon: typeof MuscleGlyph }[] = [
  { id: "Lose weight", sub: "Burn fat, feel lighter", Icon: LoseWeightGlyph },
  { id: "Get toned", sub: "Lean and defined", Icon: TonedGlyph },
  { id: "Build muscle", sub: "Get bigger and stronger", Icon: MuscleGlyph },
  { id: "Endurance", sub: "Go longer, recover faster", Icon: EnduranceGlyph },
];

function GoalStep() {
  const o = useOnboarding(); const nav = useNavigate();
  return (
    <OnboardScreen>
      <StepHeader step={2} />
      <div className="mt-10 px-5">
        <Headline text="WHAT'S YOUR MAIN *GOAL*?" />
        <div className="mt-8 space-y-3">
          {goals.map((g, i) => <div key={g.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}><OptionCard selected={o.goal === g.id} onClick={() => setOnboarding({ goal: g.id })} icon={<g.Icon />} title={g.id} sub={g.sub} /></div>)}
        </div>
      </div>
      <NextBar onNext={() => nav({ to: "/first-login/level" })} />
    </OnboardScreen>
  );
}
