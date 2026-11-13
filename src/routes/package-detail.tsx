import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import {
  StudioScreen,
  StudioSheet,
  Dock,
  Action,
  Label,
  studioHead,
} from "@/components/c7/studio-kit";
import { packages, studio, rupees } from "@/lib/studio-data";
export const Route = createFileRoute("/package-detail")({
  validateSearch: (s: Record<string, unknown>): { package?: string } =>
    typeof s["package"] === "string" ? { package: s["package"] } : {},
  head: studioHead(
    "Quarterly training package",
    "Explore coached sessions and request your C7 training package.",
  ),
  component: PackageDetail,
});
function PackageDetail() {
  const search = Route.useSearch();
  const p = packages.find((p) => p.id === search.package) ?? packages[0];
  const [open, setOpen] = useState(false),
    [phone, setPhone] = useState(""),
    [sent, setSent] = useState(false);
  if (!p) return null;
  return (
    <StudioScreen title="The package" nav={false} className="pb-28">
      <div className="relative mt-5 h-[340px]">
        <img
          src={studio}
          width={1024}
          height={1024}
          alt="Sunlit training studio with squat racks and lime benches"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-fade" />
        <div className="absolute bottom-4 left-5 right-5">
          <Label className="text-primary">
            {p.mode} / {p.days} DAYS
          </Label>
          <h1 className="mt-2 text-3xl font-light">{p.name}</h1>
          <p className="mt-5 text-[54px] font-light leading-none tabular-nums">{rupees(p.price)}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            <s>{rupees(p.regular)}</s>
            <span className="ml-3 text-primary">Save {rupees(p.regular - p.price)}</span>
          </p>
        </div>
      </div>
      <section className="px-5 pt-6">
        <Label>WHAT'S INCLUDED</Label>
        {[
          p.sessions,
          "Personalised strength programme",
          "Nutrition guidance & weekly check-ins",
          "Body assessment every 30 days",
          "Progress tracking with your coach",
        ].map((item, i) => (
          <div key={item} className="flex items-center gap-4 border-b border-border py-4">
            <span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span>
            <p className="flex-1 text-sm">{item}</p>
            <Check size={16} className="text-primary" />
          </div>
        ))}
        <p className="mt-4 text-[11px] text-muted-foreground">
          Illustrative package · Final terms confirmed by the studio.
        </p>
      </section>
      <Dock>
        <Action onClick={() => setOpen(true)}>
          Request this package <ArrowRight />
        </Action>
      </Dock>
      <StudioSheet
        open={open}
        onClose={() => setOpen(false)}
        title={sent ? "Request prepared" : "Let’s get you started"}
      >
        {sent ? (
          <>
            <Check className="mb-4 h-10 w-10 text-primary" />
            <p className="text-lg">Your interest is noted.</p>
            <p className="mt-3 text-sm text-muted-foreground">
              This review request has not been sent to the studio.
            </p>
            <Action className="mt-6" onClick={() => setOpen(false)}>
              Done
            </Action>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <p className="mb-6 text-sm text-muted-foreground">
              {p.name} · {rupees(p.price)}
            </p>
            <label className="text-xs">
              Phone number
              <div className="mt-2 flex items-center rounded-full border border-border bg-surface px-4">
                <span className="mr-3 text-muted-foreground">+91</span>
                <input
                  aria-label="Phone number"
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  pattern="[6-9][0-9]{9}"
                  required
                  placeholder="98765 43210"
                  className="h-14 min-w-0 flex-1 bg-transparent outline-none"
                />
              </div>
            </label>
            <p className="mt-3 text-[11px] text-muted-foreground">
              Review only. No message is sent to a coach.
            </p>
            <Action className="mt-6" type="submit">
              Confirm interest <ArrowRight />
            </Action>
          </form>
        )}
      </StudioSheet>
    </StudioScreen>
  );
}
