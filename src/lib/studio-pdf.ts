import { invoices, balance } from "./studio-data";
export async function receiptPdf(invoice: (typeof invoices)[number]) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ format: "a5" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(21);
  doc.text("C7 PERSONAL FITNESS", 15, 25);
  doc.setFont("courier", "normal");
  doc.setFontSize(10);
  doc.text("ILLUSTRATIVE RECEIPT / NOT A TAX INVOICE", 15, 35);
  doc.text([invoice.id, invoice.date + " / IST", "Member: Emma Richardson"], 15, 50);
  doc.line(15, 72, 133, 72);
  doc.setFont("helvetica", "normal");
  doc.text(
    [
      invoice.title,
      "90-day studio membership",
      "Total: INR " + invoice.total,
      "Received: INR " + invoice.paid,
      "Outstanding: INR " + balance(invoice),
      "Payment method: " + invoice.method,
    ],
    15,
    85,
  );
  doc.setFontSize(24);
  doc.text(invoice.status, 15, 143);
  doc.setFontSize(9);
  doc.text("Prepared by Prasad / C7 Personal Fitness", 15, 162);
  return new File([doc.output("blob")], invoice.id + ".pdf", { type: "application/pdf" });
}
export function saveBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
