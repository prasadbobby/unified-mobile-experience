export function GoogleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (<svg viewBox="0 0 48 48" className={className}><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>);
}
export function FacebookIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" className={className}><circle cx="12" cy="12" r="12" fill="#1877F2"/><path fill="#fff" d="M15.1 12.9l.4-2.8h-2.7V8.3c0-.8.4-1.5 1.6-1.5h1.2V4.4s-1.1-.2-2.2-.2c-2.2 0-3.7 1.4-3.7 3.8v2.1H7.3v2.8h2.4V20h3.1v-7.1h2.3z"/></svg>);
}
export function AppleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M16.4 12.6c0-2.5 2.1-3.7 2.2-3.8-1.2-1.7-3-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4.2zM13.9 5.1c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5z"/></svg>);
}

/* Smooth, rounded duotone icon set */
type P = { className?: string };
const base = { strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function DumbbellGlyph({ className = "h-6 w-6" }: P) {
  return (<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} {...base}>
    <rect x="2.5" y="8" width="4" height="8" rx="2" fill="currentColor" fillOpacity=".25" /><rect x="17.5" y="8" width="4" height="8" rx="2" fill="currentColor" fillOpacity=".25" />
    <rect x="6.5" y="5.5" width="3" height="13" rx="1.5" /><rect x="14.5" y="5.5" width="3" height="13" rx="1.5" /><path d="M9.5 12h5" /></svg>);
}
export function FlameIcon({ className = "h-7 w-7" }: P) {
  return (<svg viewBox="0 0 24 24" className={className}>
    <path d="M12 2.5c.6 3-2.6 4.6-4.4 7.3A6.8 6.8 0 0 0 12 21.5a6.8 6.8 0 0 0 6.6-8.6c-.4-1.6-1.4-2.8-2.4-3.6.1 1.6-.5 2.7-1.5 3.1.4-4.3-1-8-2.7-9.9z" fill="var(--chart-3)" />
    <path d="M12 21.5a3.4 3.4 0 0 1-3.2-4.6c.6-1.6 2.3-2.4 2.8-4.4 1.9 1.5 3.6 3.5 3.6 5.5a3.3 3.3 0 0 1-3.2 3.5z" fill="var(--chart-5)" /></svg>);
}
export function ProteinIcon({ className = "h-7 w-7" }: P) {
  return (<svg viewBox="0 0 24 24" className={className} fill="none" stroke="oklch(0.72 0.14 230)" strokeWidth={2.4} {...base}>
    <path d="M4 5c4 0 4 3 8 3s4-3 8-3" /><path d="M4 12c4 0 4 3 8 3s4-3 8-3" opacity=".8" /><path d="M4 19c4 0 4-3 8-3s4 3 8 3" opacity=".6" /></svg>);
}
export function CarbsIcon({ className = "h-7 w-7" }: P) {
  return (<svg viewBox="0 0 24 24" className={className} fill="none" {...base}>
    <path d="M5 20 18 7" stroke="var(--chart-5)" strokeWidth={2} />
    {[0, 1, 2].map((i) => (<g key={i} fill="var(--chart-5)">
      <ellipse cx={9 + i * 3} cy={11 - i * 3} rx="1.6" ry="3" transform={`rotate(45 ${9 + i * 3} ${11 - i * 3})`} />
      <ellipse cx={12 + i * 3} cy={14 - i * 3} rx="1.6" ry="3" transform={`rotate(45 ${12 + i * 3} ${14 - i * 3})`} opacity=".7" /></g>))}</svg>);
}
export function FatIcon({ className = "h-7 w-7" }: P) {
  const pts = [[12, 5], [8.5, 9], [15.5, 9], [12, 12.5], [5.5, 13], [18.5, 13], [8.5, 16.5], [15.5, 16.5], [12, 20]];
  return (<svg viewBox="0 0 24 24" className={className}>{pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.6" fill="var(--chart-4)" opacity={1 - i * 0.05} />)}</svg>);
}
export const ingredients = [
  (<svg key="pepper" viewBox="0 0 24 24" className="h-7 w-7"><path d="M12 6c4 0 6 3 6 7 0 5-3 9-6 9s-6-4-6-9c0-4 2-7 6-7z" fill="var(--chart-3)" /><path d="M12 6c0-2 1-3 3-3" stroke="var(--chart-2)" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>),
  (<svg key="avo" viewBox="0 0 24 24" className="h-7 w-7"><path d="M12 2c3 0 5 5 6 9a6 6 0 1 1-12 0c1-4 3-9 6-9z" fill="var(--chart-2)" /><path d="M12 6c2 0 3.5 4 4 6.5a4 4 0 1 1-8 0C8.5 10 10 6 12 6z" fill="oklch(0.9 0.12 115)" /><circle cx="12" cy="14" r="2.4" fill="oklch(0.5 0.08 60)" /></svg>),
  (<svg key="cherry" viewBox="0 0 24 24" className="h-7 w-7" fill="none"><path d="M8 15c1-5 3-8 8-11M16 15c-1-4-.5-7 0-11" stroke="var(--chart-2)" strokeWidth="1.8" strokeLinecap="round" /><circle cx="7.5" cy="17" r="4" fill="var(--chart-3)" /><circle cx="16.5" cy="17" r="4" fill="var(--chart-3)" /></svg>),
  (<svg key="meat" viewBox="0 0 24 24" className="h-7 w-7"><path d="M4 11c0-5 5-8 10-7s7 6 5 10-6 7-10 6-5-4-5-9z" fill="oklch(0.65 0.2 25)" /><circle cx="13" cy="11" r="3.2" fill="oklch(0.95 0.03 60)" /></svg>),
  (<svg key="leaf" viewBox="0 0 24 24" className="h-7 w-7"><path d="M3 18C3 9 10 4 21 4c0 11-5 17-14 17-2 0-4-1-4-3z" fill="oklch(0.6 0.12 175)" /><path d="M5 19 15 9" stroke="oklch(0.35 0.06 175)" strokeWidth="1.6" strokeLinecap="round" /></svg>),
  (<svg key="mush" viewBox="0 0 24 24" className="h-7 w-7"><path d="M3 12a9 8 0 0 1 18 0c0 1-1 1.5-2 1.5H5c-1 0-2-.5-2-1.5z" fill="var(--chart-5)" /><path d="M9 13.5h6l-1 7a2 2 0 0 1-4 0z" fill="oklch(0.92 0.03 80)" /></svg>),
];
