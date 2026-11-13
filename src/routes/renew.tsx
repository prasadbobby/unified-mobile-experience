import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, LockKeyhole, ArrowUpRight } from "lucide-react";
import { StudioScreen, Tickets, Label, studioHead } from "@/components/c7/studio-kit";
export const Route = createFileRoute("/renew")({
  head: studioHead("A chapter complete", "Review your completed C7 plan and renewal packages."),
  component: Renew,
});
function Renew() {
  return (
    <StudioScreen title="Your membership">
      <section className="px-5 pt-10">
        <Label>QUARTERLY STRENGTH / COMPLETED</Label>
        <h1 className="mt-5 text-3xl font-light">
          A chapter complete.
          <br />
          <span className="text-muted-foreground">Not the finish line.</span>
        </h1>
        <div className="mb-2 mt-9 flex items-baseline gap-3">
          <span className="text-[72px] font-light tabular-nums leading-none">90</span>
          <span className="text-2xl font-light text-muted-foreground">/ 90 days</span>
          <Check className="ml-auto text-primary" />
        </div>
        <div className="mt-4 h-1.5 bg-primary" />
        <div className="mt-3 flex justify-between text-[10px] text-muted-foreground">
          <span>14 AUG 2026</span>
          <span>11 NOV 2026 · IST</span>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-5 border-y border-border py-5">
          <div>
            <Label className="flex items-center gap-2">
              <LockKeyhole size={12} />
              PAUSED
            </Label>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Studio check-in
              <br />
              New workout plans
              <br />
              Coach check-ins
            </p>
          </div>
          <div>
            <Label className="text-primary">STILL YOURS</Label>
            <p className="mt-3 text-sm leading-6">
              Progress & photos
              <br />
              Invoices & reports
              <br />
              Workout demos
            </p>
          </div>
        </div>
      </section>
      <div className="mb-4 mt-7 flex items-center justify-between px-5">
        <Label>YOUR NEXT 90 DAYS</Label>
        <ArrowUpRight size={18} className="text-primary" />
      </div>
      <Tickets compact />
      <Link to="/progress-photos" className="mx-5 mt-4 block text-sm text-primary">
        Look back at your progress →
      </Link>
    </StudioScreen>
  );
}
