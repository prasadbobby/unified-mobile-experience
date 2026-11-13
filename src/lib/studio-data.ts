import studio from "@/assets/c7-studio.jpg";
import progress from "@/assets/c7-progress.jpg";
import squat from "@/assets/c7-squat.mp4.asset.json";
import curl from "@/assets/c7-curl.mp4.asset.json";
import press from "@/assets/c7-press.mp4.asset.json";
export { studio, progress };
export const packages = [
  {
    id: "strength",
    name: "Strength, together.",
    price: 18000,
    regular: 21000,
    days: 90,
    mode: "At the studio",
    sessions: "36 coached sessions",
    tag: "MOST POPULAR",
  },
  {
    id: "online",
    name: "Your space. Our plan.",
    price: 9000,
    regular: 12000,
    days: 90,
    mode: "Online",
    sessions: "Weekly video check-ins",
    tag: "TRAIN ANYWHERE",
  },
  {
    id: "personal",
    name: "All eyes on you.",
    price: 28000,
    regular: 32000,
    days: 90,
    mode: "At the studio",
    sessions: "36 personal training sessions",
    tag: "ONE TO ONE",
  },
];
export const invoices = [
  {
    id: "C7-2026-118",
    date: "12 Nov 2026",
    month: "November 2026",
    title: "Quarterly Strength",
    total: 18000,
    paid: 8000,
    method: "UPI",
    status: "PARTIAL",
  },
  {
    id: "C7-2026-094",
    date: "12 Aug 2026",
    month: "August 2026",
    title: "Quarterly Strength",
    total: 18000,
    paid: 18000,
    method: "UPI",
    status: "PAID",
  },
  {
    id: "C7-2026-071",
    date: "12 May 2026",
    month: "May 2026",
    title: "Quarterly Strength",
    total: 18000,
    paid: 18000,
    method: "Card",
    status: "PAID",
  },
];
export const videos = [
  {
    name: "The perfect squat",
    category: "Strength",
    duration: "0:03",
    source: squat.url,
    cue: "Sit back. Knees track over toes.",
  },
  {
    name: "Dumbbell curl",
    category: "Strength",
    duration: "0:03",
    source: curl.url,
    cue: "Keep elbows close. Lower slowly.",
  },
  {
    name: "Standing shoulder press",
    category: "Mobility",
    duration: "0:03",
    source: press.url,
    cue: "Brace your core. Press overhead.",
  },
];
export const notices = [
  {
    id: 1,
    type: "Timings",
    title: "A little later this Saturday.",
    text: "The studio opens at 7:00 AM on 14 November for equipment maintenance. Evening sessions run as usual, 4:00–9:00 PM IST.",
    date: "12 NOV · 10:30 AM IST",
    pinned: true,
    author: "Prasad · Studio manager",
  },
  {
    id: 2,
    type: "Event",
    title: "Stronger as a crew.",
    text: "Join Coach Arjun for our community deadlift session on Sunday, 15 November at 8:00 AM IST. All levels welcome. Bring your training shoes.",
    date: "11 NOV · 6:00 PM IST",
    author: "Coach Arjun",
  },
  {
    id: 3,
    type: "Offer",
    title: "Bring a friend. Build a habit.",
    text: "Invite a friend for a complimentary trial session this November. Speak to Prasad at the front desk to reserve a slot.",
    date: "10 NOV · 11:00 AM IST",
    author: "C7 Personal Fitness",
  },
  {
    id: 4,
    type: "Payment",
    title: "November payment reminder.",
    text: "Please clear any outstanding membership balance before 15 November. UPI and card payments are accepted at the studio.",
    date: "9 NOV · 9:00 AM IST",
    author: "Prasad · Front desk",
  },
];
export function bmiStats(weight: number, height: number) {
  if (!Number.isFinite(weight) || !Number.isFinite(height) || weight <= 0 || height <= 0)
    return null;
  const metres = height / 100,
    bmi = weight / metres ** 2;
  return {
    bmi,
    band: bmi < 18.5 ? "Under" : bmi < 25 ? "Healthy" : bmi < 30 ? "Over" : "Obese",
    low: 18.5 * metres ** 2,
    high: 24.9 * metres ** 2,
  };
}
export const balance = (invoice: { total: number; paid: number }) =>
  Math.max(0, invoice.total - invoice.paid);
export const rupees = (value: number) => "₹" + value.toLocaleString("en-IN");
export function attendanceMonth(offset: number) {
  const date = new Date(2026, 10 + offset, 1);
  const count = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const cutoff = offset === 0 ? 12 : count;
  const present = Array.from({ length: count }, (_, i) => i + 1).filter(
    (day) =>
      day <= cutoff &&
      ![0, 3].includes(new Date(date.getFullYear(), date.getMonth(), day).getDay()),
  );
  return {
    date,
    count,
    cutoff,
    present,
    first: (date.getDay() + 6) % 7,
    label: date.toLocaleDateString("en-IN", { month: "long", year: "numeric" }),
    rate: Math.round((present.length / cutoff) * 100),
  };
}
