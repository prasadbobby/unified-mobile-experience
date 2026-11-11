import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LockKeyhole } from "lucide-react";
import hero from "@/assets/first-login-hero.svg";
import { GoogleIcon } from "@/components/app/icons";
import { Segmented } from "@/components/c7/kit";
import { Headline, NextBar, OnboardScreen, StepHeader } from "@/components/onboard/kit";
import { onboardHead, setOnboarding, useOnboarding } from "@/lib/onboarding";

export const Route = createFileRoute("/first-login/welcome")({ head: onboardHead("Ready to push?", "Sign in to C7 with the email your gym invited."), component: Welcome });

function Welcome() {
  const o = useOnboarding(); const nav = useNavigate();
  const ok = o.method === "Google" || /^\S+@\S+\.\S+$/.test(o.email);
  return (
    <OnboardScreen>
      <img src={hero} alt="" aria-hidden className="absolute inset-x-0 top-0 h-[420px] w-full object-cover animate-fade-up" />
      <div className="relative"><StepHeader /></div>
      <div className="relative mt-[230px] px-5 animate-fade-up">
        <Headline text="*READY* TO PUSH?" className="text-[3.5rem]" />
        <div className="mt-6"><Segmented options={["Email", "Google"] as const} value={o.method} onChange={(method) => setOnboarding({ method })} /></div>
        {o.method === "Email" ? (
          <>
            <input type="email" aria-label="Email" value={o.email} onChange={(e) => setOnboarding({ email: e.target.value })} placeholder="you@example.com" className="field mt-4 h-[58px]" />
            <p className="mt-2 px-2 text-sm text-muted-foreground">Use the email your gym invited</p>
          </>
        ) : (
          <div className="mt-4 flex h-[58px] items-center justify-center gap-3 rounded-full bg-card"><GoogleIcon />Continue with your invited Google account</div>
        )}
        <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground"><LockKeyhole className="h-3.5 w-3.5 text-primary" />Invite-only · your coach adds you from the C7 dashboard</p>
      </div>
      <NextBar back={false} label={o.method === "Google" ? "Continue" : "Send code"} disabled={!ok} onNext={() => nav({ to: o.method === "Google" ? "/first-login/name" : "/first-login/code" })} />
    </OnboardScreen>
  );
}
