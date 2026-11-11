import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Screen, TopBar } from "@/components/app/ui";
import { FRAME } from "@/components/c7/kit";

export const Route = createFileRoute("/screens")({
  head: () => ({ meta: [
    { title: "New screens — C7 Personal Fitness" },
    { name: "description", content: "Index of the C7 member app screens: membership, challenge, logger, steps and access." },
    { property: "og:title", content: "New screens — C7 Personal Fitness" },
    { property: "og:description", content: "Membership, 90-day challenge, workout logger, steps and invite screens." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: ScreensIndex,
});

const items = [
  { to: "/membership", title: "Membership", sub: "Plan, payments, history" },
  { to: "/challenge-checkin", title: "Today's check-in", sub: "90-day challenge form" },
  { to: "/challenge-feed", title: "Challenge feed", sub: "Community check-ins" },
  { to: "/challenge-calendar", title: "Challenge calendar", sub: "Month view with day sheet" },
  { to: "/workout-logger", title: "Workout logger", sub: "Set-by-set with rest timer" },
  { to: "/steps", title: "Steps", sub: "Ring, weekly chart, log steps" },
  { to: "/locked", title: "Account locked", sub: "Access paused state" },
  { to: "/invite", title: "Invite-only access", sub: "3 steps + email code" },
] as const;

function ScreensIndex() {
  return (
    <Screen className={`bg-hero pb-10 ${FRAME}`}>
      <TopBar title="New screens" right={<span className="w-12" />} />
      <p className="px-5 pt-6 text-sm text-muted-foreground">C7 Personal Fitness member app</p>
      <div className="mt-4 space-y-3 px-5">
        {items.map((i, k) => (
          <Link key={i.to} to={i.to} style={{ animationDelay: `${k * 50}ms` }} className="flex items-center gap-4 rounded-[1.5rem] bg-card p-4 animate-fade-up transition hover:bg-secondary">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-deep text-sm font-medium text-primary">{k + 1}</span>
            <span className="flex-1"><span className="block font-medium">{i.title}</span><span className="text-xs text-muted-foreground">{i.sub}</span></span>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </Screen>
  );
}
