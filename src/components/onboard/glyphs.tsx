/** Original rounded line icons for goals and fitness level. */
type P = { className?: string };
const b = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
export const LoseWeightGlyph = ({ className = "h-7 w-7" }: P) => (<svg viewBox="0 0 24 24" className={className} {...b}><rect x="3.5" y="4" width="17" height="16" rx="4" /><path d="M8 9.5a5 5 0 0 1 8 0" /><path d="M12 9.5 13.5 8" /><path d="M9 15.5h6" /></svg>);
export const TonedGlyph = ({ className = "h-7 w-7" }: P) => (<svg viewBox="0 0 24 24" className={className} {...b}><path d="M12 3c-2 2.5-2 5 0 7.5 2-2.5 2-5 0-7.5z" /><path d="M5 11c1.5 3.5 4 5.5 7 5.5s5.5-2 7-5.5" /><path d="M8 21l4-4.5 4 4.5" /></svg>);
export const MuscleGlyph = ({ className = "h-7 w-7" }: P) => (<svg viewBox="0 0 24 24" className={className} {...b}><path d="M4 18c0-6 2.5-11 6-13l2 2.5-2 2.5c1.5 1.5 3 2 5 1.5 2.5-.5 5 1.5 5 4.5 0 2.5-2 4-4.5 4H6a2 2 0 0 1-2-2z" /><path d="M13 14.5c1-1 2.5-1 3.5 0" /></svg>);
export const EnduranceGlyph = ({ className = "h-7 w-7" }: P) => (<svg viewBox="0 0 24 24" className={className} {...b}><path d="M2.5 12h4l2-5 3.5 10 2.5-7 1.5 2h5.5" /></svg>);
export const LevelGlyph = ({ level, className = "h-7 w-7" }: P & { level: 1 | 2 | 3 }) => (
  <svg viewBox="0 0 24 24" className={className}>
    {[0, 1, 2].map((i) => <rect key={i} x={4 + i * 6} y={16 - i * 5} width="4" height={4 + i * 5} rx="2" fill="currentColor" fillOpacity={i < level ? 1 : 0.25} />)}
  </svg>
);
