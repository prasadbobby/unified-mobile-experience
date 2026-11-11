import wCurl from "@/assets/workout-curl.jpg";
import wCore from "@/assets/workout-core.jpg";
import mBowl from "@/assets/meal-bowl.jpg";
import mSalmon from "@/assets/meal-salmon.jpg";
import mYogurt from "@/assets/meal-yogurt.jpg";
import mVeg from "@/assets/meal-vegetarian.jpg";

/** Sample data mirroring what the C7 Personal Fitness admin dashboard would send. */
export type PlanStatus = "Active" | "Expiring soon" | "Expired" | "Paused";

export const membership = {
  member: "Rahul Verma",
  plan: "Quarterly Strength + Nutrition",
  start: "2026-09-01",
  end: "2026-11-30",
  extension: { days: 15, from: "2026-12-01", to: "2026-12-15", reason: "Diwali offer" },
  pause: { from: "2026-10-10", to: "2026-10-17", reason: "Travel" },
  price: 18000,
  payments: [
    { id: "p1", amount: 9000, date: "2026-09-01", method: "UPI", by: "Coach Arjun" },
    { id: "p2", amount: 5000, date: "2026-10-01", method: "Card", by: "Front desk · Priya" },
  ],
  dueDate: "2026-11-13",
  history: [
    { type: "Extension", date: "2026-11-05", note: "+15 days · Diwali offer" },
    { type: "Pause", date: "2026-10-10", note: "7 days · Travel" },
    { type: "Renewal", date: "2026-09-01", note: "Quarterly plan · ₹18,000" },
    { type: "Renewal", date: "2026-06-01", note: "Monthly plan · ₹6,500" },
  ],
};

export const sampleImages = [wCurl, wCore, mBowl, mSalmon, mYogurt, mVeg];

export const reactions = ["Like", "Love", "Support", "Strong", "Fire", "Clap"] as const;
export type Reaction = (typeof reactions)[number];

export type Comment = { id: string; author: string; coach?: boolean; time: string; text: string; replies?: Comment[] };
export type Post = {
  id: string; author: string; coach?: boolean; time: string; pinned?: boolean; day: number;
  mood: number; energy: number; sleep: number; sections: { label: string; text: string }[];
  photos: string[]; reactions: Record<Reaction, number>; mine?: Reaction | undefined; comments: Comment[];
};

export const posts: Post[] = [
  { id: "a1", author: "Coach Arjun", coach: true, time: "2d", pinned: true, day: 7, mood: 5, energy: 4, sleep: 7.5,
    sections: [{ label: "Week 1 done", text: "Proud of this group. Keep logging honestly — protein first at every meal and 8k steps minimum." }],
    photos: [], reactions: { Like: 24, Love: 9, Support: 6, Strong: 11, Fire: 14, Clap: 18 }, comments: [] },
  { id: "a2", author: "Sneha Iyer", time: "1h", day: 8, mood: 4, energy: 3, sleep: 7,
    sections: [{ label: "Meals", text: "Oats + whey, dal rice with paneer, grilled fish salad." }, { label: "Wins", text: "Hit a 60kg deadlift PB!" }, { label: "Struggles", text: "Craved sweets after dinner." }],
    photos: [mBowl, mSalmon, mYogurt], reactions: { Like: 8, Love: 3, Support: 2, Strong: 6, Fire: 4, Clap: 1 }, mine: "Strong",
    comments: [
      { id: "c1", author: "Coach Arjun", coach: true, time: "45m", text: "Huge PB! Try a date + peanut butter for the sweet tooth.", replies: [{ id: "c2", author: "Sneha Iyer", time: "30m", text: "Will try tonight, thanks coach!" }] },
      { id: "c3", author: "Karan Mehta", time: "20m", text: "Beast mode 💪" },
    ] },
  { id: "a3", author: "Karan Mehta", time: "3h", day: 8, mood: 2, energy: 2, sleep: 5.5,
    sections: [{ label: "How was my day", text: "Long shift, barely slept. Still made it for a 25 min session." }],
    photos: [wCore], reactions: { Like: 5, Love: 1, Support: 7, Strong: 2, Fire: 0, Clap: 3 }, comments: [] },
];

/** Challenge calendar: Nov 2026, challenge started Nov 4, today Nov 11. */
export const challenge = { startDay: 4, today: 11, month: "November 2026", firstWeekday: 0, daysInMonth: 30, total: 90 };
export const checkins: Record<number, { mood: number; energy: number; sleep: number; note: string }> = {
  4: { mood: 4, energy: 3, sleep: 7, note: "Day 1! Measured in, first workout done." },
  5: { mood: 3, energy: 3, sleep: 6.5, note: "Sore legs, kept protein high." },
  6: { mood: 4, energy: 4, sleep: 8, note: "Great sleep, 10k steps." },
  8: { mood: 2, energy: 2, sleep: 5, note: "Rough day at work, skipped gym." },
  9: { mood: 4, energy: 4, sleep: 7.5, note: "Back on track. Upper body day." },
  10: { mood: 5, energy: 4, sleep: 7, note: "Deadlift PB 100kg!" },
};

export const loggerPlan = [
  { name: "Barbell Back Squat", image: wCore, sets: 4, target: 10, last: "60kg × 10", pb: "80kg × 5" },
  { name: "Seated Dumbbell Curl", image: wCurl, sets: 3, target: 12, last: "12kg × 12", pb: "16kg × 8" },
  { name: "Romanian Deadlift", image: wCore, sets: 3, target: 10, last: "70kg × 10", pb: "90kg × 6" },
];

export const steps = { today: 7420, target: 10000, streak: 5, week: [8200, 10400, 9100, 11050, 6300, 10200, 7420], days: ["M", "T", "W", "T", "F", "S", "S"] };

export const fmtDate = (iso: string) => new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
export const daysBetween = (a: string, b: string) => Math.round((new Date(b + "T00:00:00").getTime() - new Date(a + "T00:00:00").getTime()) / 86400000);
export const TODAY = "2026-11-11";
