import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { StudioScreen, Label, studioHead } from "@/components/c7/studio-kit";
import { invoices, rupees, balance } from "@/lib/studio-data";
export const Route = createFileRoute("/invoices")({
  head: studioHead("Invoices", "Your C7 payments, receipts and outstanding balance."),
  component: Invoices,
});
function Invoices() {
  return (
    <StudioScreen title="Invoices">
      <section className="px-5 pb-8 pt-9">
        <Label>OUTSTANDING</Label>
        <h1 className="mt-3 text-[52px] font-light tabular-nums leading-none">
          {rupees(invoices.reduce((sum, i) => sum + balance(i), 0))}
        </h1>
        <div className="mt-5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-warning" />
          <p className="text-xs text-muted-foreground">Due 15 Nov 2026 · Pay at the studio</p>
        </div>
      </section>
      <div className="px-5">
        {invoices.map((i) => (
          <section key={i.id} className="mb-8">
            <Label className="mb-3 border-b border-border pb-3">{i.month}</Label>
            <Link
              to="/invoice-detail"
              search={{ invoice: i.id }}
              className="flex items-start gap-4 py-2"
            >
              <span className="mt-1 font-mono text-xs text-muted-foreground">
                {i.date.slice(0, 2)}
              </span>
              <div className="flex-1">
                <p className="text-sm">{i.title}</p>
                <p className="mt-2 font-mono text-[10px] text-muted-foreground">{i.id}</p>
                <span
                  className={
                    "mt-4 inline-block rounded-full border px-2.5 py-1 text-[10px] " +
                    (i.status === "PAID"
                      ? "border-primary/50 text-primary"
                      : "border-warning/50 text-warning")
                  }
                >
                  {i.status}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xl font-light tabular-nums">{rupees(i.total)}</p>
                <ArrowUpRight size={18} className="ml-auto mt-5 text-muted-foreground" />
              </div>
            </Link>
          </section>
        ))}
        <p className="text-[10px] text-muted-foreground">Illustrative records · Amounts in INR</p>
      </div>
    </StudioScreen>
  );
}
