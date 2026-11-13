import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { AppleIcon, FacebookIcon, GoogleIcon } from "@/components/app/icons";
import { BackButton, PrimaryButton, Screen } from "@/components/app/ui";
import { setState } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    { title: "Create an account — PulseFit" },
    { name: "description", content: "Create a PulseFit account to set goals, track progress and stay motivated." },
    { property: "og:title", content: "Create an account — PulseFit" },
    { property: "og:description", content: "Set goals, track progress and stay motivated." },
  ] }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  const [f, setF] = useState({ name: "", email: "", pw: "", pw2: "" });
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState("");
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim()) return setErr("Please enter your name");
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr("Enter a valid email");
    if (f.pw.length < 6) return setErr("Password must be at least 6 characters");
    if (f.pw !== f.pw2) return setErr("Passwords don't match");
    if (!agree) return setErr("Please accept the Terms & Condition");
    setState({ name: f.name.trim().split(" ")[0] ?? f.name, email: f.email });
    navigate({ to: "/home" });
  };
  const social = () => navigate({ to: "/home" });
  return (
    <Screen className="flex flex-col px-6 pb-10 pt-8">
      <BackButton variant="arrow" />
      <h1 className="mt-14 text-center text-3xl font-medium animate-fade-up">Create An Account</h1>
      <p className="mx-auto mt-3 max-w-xs text-center text-sm text-muted-foreground animate-fade-up">Create an account to set goals, track your progress, and stay motivated every step of the way.</p>
      <form onSubmit={submit} className="mt-8 space-y-4 animate-fade-up">
        <input className="field" placeholder="Name" value={f.name} onChange={set("name")} />
        <input className="field" type="email" placeholder="Email" value={f.email} onChange={set("email")} />
        <input className="field" type="password" placeholder="Password" value={f.pw} onChange={set("pw")} />
        <input className="field" type="password" placeholder="Confirm Password" value={f.pw2} onChange={set("pw2")} />
        <label className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground">
          <button type="button" onClick={() => setAgree(!agree)} aria-pressed={agree} className={cn("flex h-5 w-5 items-center justify-center rounded-md border transition", agree ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground")}>
            {agree && <Check className="h-3.5 w-3.5" />}
          </button>
          I agree to the <span className="text-foreground">Terms & Condition</span>
        </label>
        {err && <p className="px-2 text-sm text-destructive">{err}</p>}
        <PrimaryButton type="submit">Create an Account</PrimaryButton>
      </form>
      <div className="mt-10 flex items-center gap-4 text-sm text-muted-foreground"><span className="h-px flex-1 bg-border" />Or Login with<span className="h-px flex-1 bg-border" /></div>
      <div className="mt-5 flex justify-center gap-5">
        {[<GoogleIcon key="g" />, <FacebookIcon key="f" />, <AppleIcon key="a" />].map((ic, k) => (
          <button key={k} onClick={social} className="flex h-12 w-12 items-center justify-center rounded-full bg-card transition hover:bg-secondary active:scale-90">{ic}</button>
        ))}
      </div>
      <p className="mt-auto pt-8 text-center text-sm text-muted-foreground">Already have an account? <Link to="/login" className="font-medium text-primary">Login</Link></p>
    </Screen>
  );
}
