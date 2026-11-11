import { useSyncExternalStore } from "react";

type State = { name: string; email: string; following: string[]; saved: string[]; liked: string[]; challengeStarted: boolean };
const KEY = "pulsefit-state";
const initial: State = { name: "Emma", email: "", following: [], saved: [], liked: [], challengeStarted: false };
let state: State = initial;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try { const raw = localStorage.getItem(KEY); if (raw) state = { ...initial, ...JSON.parse(raw) }; } catch { /* ignore */ }
}
export function setState(patch: Partial<State>) {
  state = { ...state, ...patch };
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
  listeners.forEach((l) => l());
}
export function toggle(key: "following" | "saved" | "liked", id: string) {
  const list = state[key];
  setState({ [key]: list.includes(id) ? list.filter((x) => x !== id) : [...list, id] } as Partial<State>);
}
export function useAppState() {
  return useSyncExternalStore(
    (cb) => { load(); listeners.add(cb); cb(); return () => listeners.delete(cb); },
    () => { load(); return state; },
    () => initial,
  );
}
