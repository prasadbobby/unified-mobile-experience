import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useState } from "react";
import illo from "@/assets/login-illustration.png";
import { AppleIcon, FacebookIcon, GoogleIcon } from "@/components/app/icons";
import { PrimaryButton, Screen } from "@/components/app/ui";
import { setState } from "@/lib/store";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    { title: "Log in — PulseFit" },
    { name: "description", content: "Log in to PulseFit to pick up your habits, streaks and progress." },
    { property: "og:title", content: "Log in — PulseFit" },
    { property: "og:description", content: "Pick up your habits, streaks and progress." },
  ] }),
  component: Login,
});

export function SocialButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-card text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground active:scale-[.98]">
      {icon}{label}
    </button>
  );
}

function Login() {
  const navigate = useNavigate();
  const [emailMode, setEmailMode] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const go = () => navigate({ to: "/home" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr("Enter a valid email");
    if (pw.length < 6) return setErr("Password must be at least 6 characters");
    setState({ email });
    go();
  };
  return (
    <Screen className="flex flex-col px-6 pb-10 pt-10">
      <img src={illo} alt="Woman walking in the city" width={1024} height={1024} className="mx-auto h-60 w-60 object-contain animate-floaty" />
      <h1 className="mt-4 text-center text-3xl font-medium animate-fade-up">Let's Login you in</h1>
      <p className="mx-auto mt-3 max-w-xs text-center text-sm text-muted-foreground animate-fade-up">Log in to pick up where you left off. Your habits, streaks, and progress are waiting for you.</p>
      {!emailMode ? (
        <div className="mt-8 space-y-3 animate-fade-up">
          <SocialButton icon={<GoogleIcon />} label="Login with Google" onClick={go} />
          <SocialButton icon={<FacebookIcon />} label="Login with Facebook" onClick={go} />
          <SocialButton icon={<AppleIcon />} label="Continue with Apple" onClick={go} />
          <div className="flex items-center gap-4 py-3 text-sm text-muted-foreground"><span className="h-px flex-1 bg-border" />Or<span className="h-px flex-1 bg-border" /></div>
          <PrimaryButton onClick={() => setEmailMode(true)}><Mail className="mr-2 inline h-4 w-4" />Login with Email</PrimaryButton>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-8 space-y-3 animate-fade-up">
          <input className="field" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="field" type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} />
          {err && <p className="px-2 text-sm text-destructive">{err}</p>}
          <PrimaryButton type="submit">Login</PrimaryButton>
          <button type="button" onClick={() => setEmailMode(false)} className="w-full py-2 text-sm text-muted-foreground hover:text-foreground">Back to other options</button>
        </form>
      )}
      <p className="mt-auto pt-8 text-center text-sm text-muted-foreground">Don't have an account? <Link to="/signup" className="font-medium text-primary">Create An account</Link></p>
    </Screen>
  );
}
