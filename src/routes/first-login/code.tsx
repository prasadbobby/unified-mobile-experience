import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Headline, NextBar, OnboardScreen, StepHeader } from "@/components/onboard/kit";
import { maskEmail, onboardHead, useOnboarding } from "@/lib/onboarding";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/first-login/code")({ head: onboardHead("Confirm sign in", "Enter the 6-digit code sent to your email."), component: Code });

/** Six large digits, no boxes; the active slot gets a lime underline. Uses one hidden input. */
export function CodeDigits({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(true);
  useEffect(() => ref.current?.focus(), []);
  return (
    <div className="relative" onClick={() => ref.current?.focus()}>
      <input ref={ref} value={value} inputMode="numeric" autoComplete="one-time-code" aria-label="6-digit code" maxLength={6}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
        className="absolute inset-0 opacity-0" />
      <div className="flex justify-between">
        {Array.from({ length: 6 }).map((_, i) => { const active = focus && i === Math.min(value.length, 5); return (
          <div key={i} className="flex w-11 flex-col items-center">
            <span className={cn("font-display text-6xl font-bold tabular-nums transition", value[i] ? "text-foreground" : "text-muted-foreground/30")}>{value[i] ?? "0"}</span>
            <span className={cn("mt-1 h-1 w-full rounded-full transition", active ? "bg-primary shadow-glow" : "bg-transparent")} />
          </div>); })}
      </div>
    </div>
  );
}

function Code() {
  const o = useOnboarding(); const nav = useNavigate();
  const [code, setCode] = useState(""); const [t, setT] = useState(7);
  useEffect(() => { if (t <= 0) return; const id = setTimeout(() => setT(t - 1), 1000); return () => clearTimeout(id); }, [t]);
  return (
    <OnboardScreen>
      <StepHeader />
      <div className="mt-14 px-5 animate-fade-up">
        <Headline text="CONFIRM *SIGN IN*" />
        <p className="mt-4 text-muted-foreground">A 6-digit code was sent to <span className="text-foreground">{maskEmail(o.email)}</span></p>
        <div className="mt-12"><CodeDigits value={code} onChange={setCode} /></div>
        <p className="mt-10 text-sm text-muted-foreground">
          {t > 0 ? <>You can resend the code in <span className="font-medium tabular-nums text-primary">00:{String(t).padStart(2, "0")}</span></> :
            <button onClick={() => { setT(30); setCode(""); }} className="font-medium text-primary">Resend code</button>}
        </p>
      </div>
      <NextBar label="Verify" disabled={code.length !== 6} onNext={() => nav({ to: "/first-login/name" })} />
    </OnboardScreen>
  );
}
