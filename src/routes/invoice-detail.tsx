import { createFileRoute } from "@tanstack/react-router";
import { Share2 } from "lucide-react";
import { useState } from "react";
import { StudioScreen, Action, Label, Dock, studioHead } from "@/components/c7/studio-kit";
import { invoices, rupees, balance } from "@/lib/studio-data";
import { receiptPdf, saveBlob } from "@/lib/studio-pdf";
export const Route = createFileRoute("/invoice-detail")({
  validateSearch: (s: Record<string, unknown>): { invoice?: string } =>
    typeof s["invoice"] === "string" ? { invoice: s["invoice"] } : {},
  head: studioHead("Payment receipt", "C7 membership invoice and downloadable payment receipt."),
  component: InvoiceDetail,
});
function InvoiceDetail() {
  const { invoice } = Route.useSearch();
  const item = invoices.find((i) => i.id === invoice) ?? invoices[0];
  const [busy, setBusy] = useState(false),
    [message, setMessage] = useState("");
  if (!item) return null;
  const share = async () => {
    setBusy(true);
    try {
      const file = await receiptPdf(item);
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: item.id });
        setMessage("Receipt shared.");
      } else {
        saveBlob(file, file.name);
        setMessage("PDF receipt downloaded.");
      }
    } catch (e) {
      if (!(e instanceof Error && e.name === "AbortError"))
        setMessage("Unable to share. Please try again.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <StudioScreen title="Invoice detail" nav={false} className="pb-28">
      <div className="receipt mx-5 mt-7 px-6 pb-10 pt-7">
        <Label className="text-receipt-muted">C7 PERSONAL FITNESS</Label>
        <h1 className="mt-2 text-3xl font-light">Payment receipt</h1>
        <p className="mt-5 font-mono text-xs">{item.id}</p>
        <div className="mt-5 flex justify-between border-y border-receipt-muted/30 py-4 text-[11px]">
          <span>{item.date}</span>
          <span>IST · INR</span>
        </div>
        <Label className="mt-6 text-receipt-muted">BILLED TO</Label>
        <p className="mt-2 text-sm">Emma Richardson</p>
        <p className="mt-1 text-[11px] text-receipt-muted">Member C7 / 0042</p>
        <div className="mt-7 border-b border-dashed border-receipt-muted/40 pb-6">
          <p className="text-sm">{item.title}</p>
          <p className="mt-2 text-[11px] text-receipt-muted">90 days · At the studio</p>
          <p className="mt-3 text-right text-2xl font-light">{rupees(item.total)}</p>
        </div>
        <dl className="mt-5 space-y-3 text-xs">
          <div className="flex justify-between">
            <dt>Total</dt>
            <dd>{rupees(item.total)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Received · {item.method}</dt>
            <dd>{rupees(item.paid)}</dd>
          </div>
          <div className="flex justify-between border-t border-receipt-muted/30 pt-4">
            <dt>Balance due</dt>
            <dd className="text-xl font-light">{rupees(balance(item))}</dd>
          </div>
        </dl>
        <div className="mt-8 flex items-center justify-between">
          <p className="text-[10px] text-receipt-muted">
            Recorded by Prasad
            <br />
            C7 Personal Fitness
          </p>
          <span className="receipt-stamp rotate-[-8deg] border-2 px-3 py-1 font-mono text-xl">
            {item.status}
          </span>
        </div>
        <p className="mt-6 text-[9px] text-receipt-muted">
          Illustrative receipt · Not a tax invoice
        </p>
      </div>
      <p role="status" className="mt-5 px-5 text-xs text-primary">
        {message}
      </p>
      <Dock>
        <Action disabled={busy} onClick={share}>
          <Share2 />
          {busy ? "Preparing PDF…" : "Share PDF receipt"}
        </Action>
      </Dock>
    </StudioScreen>
  );
}
