import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogIn, MailCheck, UserPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PrimaryButton, Screen, TopBar } from "@/components/app/ui";
import { FRAME } from "@/components/c7/kit";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/invite")({
  head: () => ({ meta: [
    { title: "Invite-only access — C7 Personal Fitness" },
    { name: "description", content: "C7 is invite-only: your coach invites you, you accept, then sign in with a one-time code." },
    { property: "og:title", content: "Invite-only access — C7 Personal Fitness" },
    { property: "og:description", content: "How to get into the C7 member app." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Invite,
});

const steps = [
  { icon: UserPlus, title: "Coach invites you", text: "Your coach adds your email in the C7 dashboard." },
  { icon: MailCheck, title: "Accept email invite", text: "Open the invite email and tap Accept." },
  { icon: LogIn, title: "Sign in", text: "Enter your email and the 6-digit code we send." },
];

export function OtpBoxes({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  return (
    <div className="flex justify-between gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <input key={i} ref={(el) => { refs.current[i] = el; }} inputMode="numeric" maxLength={1} aria-label={`Digit ${i + 1}`} value={value[i] ?? ""}
          onChange={(e) => { const d = e.target.value.replace(/\D/g, "").slice(-1); const arr = value.padEnd(6, " ").split(""); arr[i] = d || " "; onChange(arr.join("").trimEnd()); if (d) refs.current[i + 1]?.focus(); }}
          onKeyDown={(e) => { if (e.key === "Backspace" && !value[i]) refs.current[i - 1]?.focus(); }}
          onPaste={(e) => { const t = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6); if (t) { e.preventDefault(); onChange(t); refs.current[Math.min(5, t.length)]?.focus(); } }}
          className={cn("h-14 w-12 rounded-2xl bg-card text-center text-xl outline-none transition focus:ring-[1.5px] focus:ring-primary", value[i]?.trim() && "ring-1 ring-primary/60")} />
      ))}
    </div>
  );
}

function Invite() {
  const nav = useNavigate();
  const [stage, setStage] = useState<"explain" | "email" | "code">("explain");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(30);
  useEffect(() => { if (stage !== "code" || timer <= 0) return; const t = setTimeout(() => setTimer(timer - 1), 1000); return () => clearTimeout(t); }, [stage, timer]);
  const validEmail = /^\S+@\S+\.\S+$/.test(email);

  return (
    <Screen className={`bg-hero pb-10 ${FRAME}`}>
      <TopBar title={stage === "explain" ? "Invite-only" : "Sign in"} right={<span className="w-12" />} />
      {stage === "explain" && (
        <div className="px-5 pt-8 animate-fade-up">
          <h1 className="text-3xl font-light">C7 is <span className="text-primary">invite-only</span></h1>
          <p className="mt-2 text-muted-foreground">Membership is managed by your gym. Here's how to get in:</p>
          <ol className="relative mt-8 space-y-6">
            <span className="absolute bottom-6 left-6 top-6 w-px bg-border" />
            {steps.map((s, i) => (
              <li key={s.title} className="relative flex gap-4 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card text-primary ring-2 ring-primary/50"><s.icon className="h-5 w-5" /></span>
                <div className="rounded-[1.5rem] bg-card p-4 flex-1"><p className="text-xs text-primary">Step {i + 1}</p><p className="font-medium">{s.title}</p><p className="text-sm text-muted-foreground">{s.text}</p></div>
              </li>
            ))}
          </ol>
          <PrimaryButton className="mt-10" onClick={() => setStage("email")}>I have an invite</PrimaryButton>
          <p className="mt-4 text-center text-sm text-muted-foreground">No invite? Ask your coach at the front desk.</p>
        </div>
      )}
      {stage === "email" && (
        <form className="px-5 pt-8 animate-fade-up" onSubmit={(e) => { e.preventDefault(); if (validEmail) { setStage("code"); setTimer(30); } }}>
          <h1 className="text-3xl font-light">Your email</h1>
          <p className="mt-2 text-muted-foreground">Use the address your coach invited.</p>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-label="Email" className="field mt-8" />
          <PrimaryButton className="mt-6" disabled={!validEmail}>Send code</PrimaryButton>
        </form>
      )}
      {stage === "code" && (
        <form className="px-5 pt-8 animate-fade-up" onSubmit={(e) => { e.preventDefault(); if (code.replace(/\s/g, "").length === 6) nav({ to: "/home" }); }}>
          <h1 className="text-3xl font-light">Enter code</h1>
          <p className="mt-2 text-muted-foreground">We sent a 6-digit code to <span className="text-foreground">{email}</span></p>
          <div className="mt-8"><OtpBoxes value={code} onChange={setCode} /></div>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            {timer > 0 ? <>Resend code in <span className="tabular-nums text-foreground">0:{String(timer).padStart(2, "0")}</span></> :
              <button type="button" onClick={() => { setTimer(30); setCode(""); }} className="text-primary">Resend code</button>}
          </p>
          <PrimaryButton className="mt-8" disabled={code.replace(/\s/g, "").length !== 6}>Verify & sign in</PrimaryButton>
          <button type="button" onClick={() => setStage("email")} className="mt-4 w-full text-center text-sm text-muted-foreground">Change email</button>
        </form>
      )}
    </Screen>
  );
}
