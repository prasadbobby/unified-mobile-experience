import { createFileRoute, Link } from "@tanstack/react-router";
import { LockKeyhole, Phone } from "lucide-react";
import { Screen, TopBar } from "@/components/app/ui";
import { Card, FRAME } from "@/components/c7/kit";

export const Route = createFileRoute("/locked")({
  head: () => ({ meta: [
    { title: "Account locked — C7 Personal Fitness" },
    { name: "description", content: "Your member access is paused. Contact the front desk to restore it." },
    { property: "og:title", content: "Account locked — C7 Personal Fitness" },
    { property: "og:description", content: "Member access paused — contact your gym." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Locked,
});

function Locked() {
  return (
    <Screen className={`bg-hero ${FRAME}`}>
      <TopBar title="" right={<span className="w-12" />} />
      <div className="flex flex-col items-center px-6 pt-16 text-center">
        <div className="relative animate-pop">
          <div className="absolute inset-0 rounded-full bg-destructive/20 blur-2xl" />
          <span className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-destructive/60 bg-card text-destructive"><LockKeyhole className="h-12 w-12" /></span>
        </div>
        <h1 className="mt-8 text-3xl font-light">Account locked</h1>
        <p className="mt-3 text-muted-foreground">Your access has been paused by C7 Personal Fitness. This usually happens when a membership expires or a payment is overdue.</p>
        <Card className="mt-8 w-full text-left">
          <p className="text-xs text-muted-foreground">Reason from your gym</p>
          <p className="mt-1">Balance of ₹4,000 overdue since 13 Nov</p>
        </Card>
        <a href="tel:+919800000000" className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary font-medium text-primary-foreground shadow-glow"><Phone className="h-5 w-5" />Call front desk</a>
        <Link to="/invite" className="mt-3 flex h-14 w-full items-center justify-center rounded-full border-2 border-primary text-primary">Use a different account</Link>
      </div>
    </Screen>
  );
}
