/** Expressive rounded face icons for mood (6) and bolt icons for energy (5). */
type P = { level: number; className?: string };
const mouths = ["M8 16.5c1.2-1.6 2.5-2 4-2s2.8.4 4 2", "M8.5 16c1-1 2.2-1.3 3.5-1.3s2.5.3 3.5 1.3", "M8.5 15.5h7", "M8.5 14.8c1 .9 2.2 1.3 3.5 1.3s2.5-.4 3.5-1.3", "M8 14.3c1.2 1.6 2.5 2.2 4 2.2s2.8-.6 4-2.2", "M7.5 13.8h9c0 2.6-2 4.2-4.5 4.2s-4.5-1.6-4.5-4.2z"];
export const moodLabels = ["Awful", "Low", "Meh", "Okay", "Good", "Great"];
export const energyLabels = ["Drained", "Tired", "Steady", "Charged", "Unstoppable"];
export function MoodIcon({ level, className = "h-7 w-7" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9.5" fill="currentColor" fillOpacity=".15" />
      {level <= 1 ? <><path d="M8 9.5l2 1M16 9.5l-2 1" /></> : <><circle cx="9" cy="10" r=".9" fill="currentColor" /><circle cx="15" cy="10" r=".9" fill="currentColor" /></>}
      <path d={mouths[level]} fill={level === 5 ? "currentColor" : "none"} fillOpacity={level === 5 ? .4 : 0} />
    </svg>
  );
}
export function EnergyIcon({ level, className = "h-7 w-7" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="16" height="10" rx="3" /><path d="M21 10.5v3" />
      {Array.from({ length: level + 1 }).map((_, i) => <rect key={i} x={5 + i * 2.5} y="9" width="1.6" height="6" rx=".8" fill="currentColor" stroke="none" />)}
    </svg>
  );
}
