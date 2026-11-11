import { useSyncExternalStore } from "react";

/** First-login onboarding answers (in-memory; no backend). Invite values prefill name/email. */
export type Goal = "Lose weight" | "Get toned" | "Build muscle" | "Endurance";
export type Level = "Beginner" | "Intermediate" | "Advanced";
export type Onboarding = { email: string; method: "Email" | "Google"; first: string; last: string; goal: Goal; level: Level; age: number; weightKg: number; unit: "kg" | "lb"; heightCm: number };

let s: Onboarding = { email: "rahul.verma@gmail.com", method: "Email", first: "Rahul", last: "Verma", goal: "Build muscle", level: "Intermediate", age: 28, weightKg: 79, unit: "kg", heightCm: 170 };
const ls = new Set<() => void>();
export const setOnboarding = (p: Partial<Onboarding>) => { s = { ...s, ...p }; ls.forEach((l) => l()); };
export const useOnboarding = () => useSyncExternalStore((cb) => { ls.add(cb); return () => ls.delete(cb); }, () => s, () => s);

export const kgToLb = (kg: number) => Math.round(kg * 2.20462);
export const lbToKg = (lb: number) => Math.round(lb / 2.20462);
export const maskEmail = (e: string) => { const [u = "", d = ""] = e.split("@"); return `${u.slice(0, 5)}…@${d}`; };

export const onboardHead = (title: string, description: string) => () => ({ meta: [
  { title: `${title} — C7 Personal Fitness` }, { name: "description", content: description },
  { property: "og:title", content: `${title} — C7 Personal Fitness` }, { property: "og:description", content: description },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
] });
