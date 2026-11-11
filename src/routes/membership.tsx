import { createFileRoute } from "@tanstack/react-router";
import { CalendarPlus, PauseCircle, RefreshCw, Plus } from "lucide-react";
import { useState } from "react";
import { Screen, TopBar } from "@/components/app/ui";
import { Card, Chip, FRAME, Ring, Section, Segmented, inr, type Tone } from "@/components/c7/kit";
import { TODAY, daysBetween, fmtDate, membership as m, type PlanStatus } from "@/lib/c7-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/membership")({
  head: () => ({ meta: [
    { title: "Membership — C7 Personal Fitness" },
    { name: "description", content: "Your plan status, days remaining, payments and membership history." },
    { property: "og:title", content: "Membership — C7 Personal Fitness" },
    { property: "og:description", content: "Plan status, payments and history for your gym membership." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Membership,
});

const statusTone: Record<PlanStatus, Tone> = { Active: "lime", "Expiring soon": "warning", Expired: "danger", Paused: "info" };
const histIcon = { Extension: CalendarPlus, Renewal: RefreshCw, Pause: PauseCircle };

export function MembershipHero({ status }: { status: PlanStatus }) {
  const total = daysBetween(m.start, m.end);
  const left = status === "Expired" ? 0 : status === "Expiring soon" ? 3 : Math.max(0, daysBetween(TODAY, m.end));
  return (
    <Card className="mx-5 mt-6 animate-fade-up">
      <div className="flex items-start justify-between">
        <div><p className="text-xs text-muted-foreground">Current plan</p><p className="mt-1 font-medium">{m.plan}</p></div>
        <Chip tone={statusTone[status]}>{status}</Chip>
      </div>
      <div className="mt-5 flex items-center gap-5">
        <Ring value={left} max={total} color={status === "Expired" ? "var(--destructive)" : status === "Paused" ? "var(--info)" : "var(--primary)"}>
          <span className="text-4xl font-light">{left}</span><span className="text-xs text-muted-foreground">days left</span>
        </Ring>
        <div className="space-y-3 text-sm">
          <div><p className="text-xs text-muted-foreground">Start</p><p>{fmtDate(m.start)}</p></div>
          <div className="h-4 w-px bg-border" />
          <div><p className="text-xs text-muted-foreground">End</p><p>{fmtDate(m.end)}</p></div>
        </div>
      </div>
      {status === "Paused" && (
        <div className="mt-5 rounded-[1.25rem] border border-info/40 p-4 text-sm">
          <p className="flex items-center gap-2 font-medium text-info"><PauseCircle className="h-4 w-4" />Paused · {m.pause.reason}</p>
          <p className="mt-1 text-muted-foreground">{fmtDate(m.pause.from)} → {fmtDate(m.pause.to)}. Days resume automatically.</p>
        </div>
      )}
    </Card>
  );
}

function Membership() {
  const [status, setStatus] = useState<PlanStatus>("Active");
  const paid = m.payments.reduce((a, p) => a + p.amount, 0);
  const due = m.price - paid, dueIn = daysBetween(TODAY, m.dueDate);
  return (
    <Screen className={`bg-hero pb-12 ${FRAME}`}>
      <TopBar title="Membership" />
      <div className="mt-5 px-5"><Segmented options={["Active", "Expiring soon", "Expired", "Paused"] as const} value={status} onChange={setStatus} /></div>
      <MembershipHero status={status} />
      {status !== "Expired" && (
        <div className="mx-5 mt-3 flex items-center gap-4 rounded-[1.5rem] border border-primary/40 bg-card p-4 animate-fade-up">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lime text-primary-foreground"><Plus className="h-5 w-5" /></span>
          <div className="text-sm"><p className="font-medium">Upcoming extension · +{m.extension.days} days</p>
            <p className="text-muted-foreground">{fmtDate(m.extension.from)} → {fmtDate(m.extension.to)} · {m.extension.reason}</p></div>
        </div>
      )}
      <Section title="Payments">
        <div className="grid grid-cols-3 gap-2">
          <Tile label="Package" value={inr(m.price)} />
          <Tile label="Paid" value={inr(paid)} className="text-primary" />
          <Tile label="Balance due" value={inr(due)} sub={`Due ${fmtDate(m.dueDate).replace(/ \d{4}$/, "")}`} danger={dueIn <= 3} />
        </div>
        <div className="mt-3 divide-y divide-border rounded-[1.75rem] bg-card px-5">
          {m.payments.map((p) => (
            <div key={p.id} className="flex items-center justify-between py-4">
              <div><p className="text-lg font-light">{inr(p.amount)}</p><p className="text-xs text-muted-foreground">{fmtDate(p.date)} · {p.by}</p></div>
              <Chip tone="muted">{p.method}</Chip>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Membership history">
        <ol className="relative ml-5 border-l border-border">
          {m.history.map((h, i) => { const I = histIcon[h.type as keyof typeof histIcon]; return (
            <li key={i} className="relative pb-6 pl-8 last:pb-0">
              <span className={cn("absolute -left-[18px] flex h-9 w-9 items-center justify-center rounded-full bg-card", h.type === "Pause" ? "text-info" : "text-primary")}><I className="h-4 w-4" /></span>
              <p className="font-medium">{h.type}</p><p className="text-sm text-muted-foreground">{h.note}</p><p className="text-xs text-muted-foreground">{fmtDate(h.date)}</p>
            </li>); })}
        </ol>
      </Section>
    </Screen>
  );
}

function Tile({ label, value, sub, danger, className }: { label: string; value: string; sub?: string; danger?: boolean; className?: string }) {
  return (
    <div className={cn("rounded-[1.5rem] bg-card p-3", danger && "border border-destructive/60")}>
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className={cn("mt-1 text-base font-medium", danger ? "text-destructive" : className)}>{value}</p>
      {sub && <p className={cn("text-[11px]", danger ? "text-destructive" : "text-muted-foreground")}>{sub}</p>}
    </div>
  );
}
