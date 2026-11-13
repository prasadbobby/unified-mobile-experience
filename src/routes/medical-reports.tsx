import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { ArrowUpRight, Plus, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudioScreen, StudioSheet, Action, Label, studioHead } from "@/components/c7/studio-kit";
export const Route = createFileRoute("/medical-reports")({
  head: studioHead("Medical reports", "Review your C7 health documents and add a report."),
  component: MedicalReports,
});
type Report = { name: string; type: string; date: string; by: string; url?: string };
const initial: Report[] = [
  { name: "Annual blood panel", type: "PDF", date: "05 NOV 2026", by: "You" },
  { name: "Body composition assessment", type: "PDF", date: "30 OCT 2026", by: "Coach Arjun" },
  { name: "Physio clearance", type: "IMG", date: "14 AUG 2026", by: "You" },
];
function MedicalReports() {
  const [reports, setReports] = useState(initial),
    [open, setOpen] = useState(false),
    [preview, setPreview] = useState<Report | null>(null),
    [error, setError] = useState("");
  const urls = useRef<string[]>([]);
  useEffect(() => () => urls.current.forEach((u) => URL.revokeObjectURL(u)), []);
  const add = (file?: File) => {
    if (!file) return;
    if (
      !["application/pdf", "image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      file.size > 10 * 1024 * 1024
    ) {
      setError("Choose a PDF, JPG or PNG under 10 MB.");
      return;
    }
    const url = URL.createObjectURL(file);
    urls.current.push(url);
    setReports([
      {
        name: file.name,
        type: file.type === "application/pdf" ? "PDF" : "IMG",
        date: "12 NOV 2026",
        by: "You",
        url,
      },
      ...reports,
    ]);
    setOpen(false);
    setError("");
  };
  return (
    <StudioScreen title="Medical reports">
      <section className="px-5 pt-9">
        <div className="flex items-end justify-between">
          <h1 className="text-4xl font-light leading-tight">
            Your health,
            <br />
            <span className="text-muted-foreground">on record.</span>
          </h1>
          <p className="text-[52px] font-light tabular-nums leading-none">0{reports.length}</p>
        </div>
        <div className="mb-6 mt-5 flex justify-between">
          <Label>PRIVATE DOCUMENTS</Label>
          <Button
            variant="ghost"
            className="h-auto p-0 text-xs text-primary"
            onClick={() => setOpen(true)}
          >
            <Plus />
            Add report
          </Button>
        </div>
        {reports.map((report, i) => (
          <Button
            key={i}
            variant="ghost"
            onClick={() => setPreview(report)}
            className="document-tab relative mb-4 h-auto w-full justify-start whitespace-normal rounded-tl-none rounded-tr-2xl rounded-b-2xl border border-border bg-card p-5 pt-7 text-left"
          >
            <span className="document-ear absolute -top-2 left-0 h-3 w-20 rounded-t-lg bg-card" />
            <div className="w-full">
              <div className="flex justify-between">
                <span
                  className={
                    "font-mono text-[10px] " +
                    (report.type === "PDF" ? "text-primary" : "text-info")
                  }
                >
                  {report.type} / 0{i + 1}
                </span>
                <ArrowUpRight className="text-muted-foreground" />
              </div>
              <p className="mt-4 text-lg font-light">{report.name}</p>
              <div className="mt-5 flex justify-between border-t border-border pt-3 text-[10px] text-muted-foreground">
                <span>{report.date}</span>
                <span>{report.by}</span>
              </div>
            </div>
          </Button>
        ))}
        <p className="mt-5 text-[10px] text-muted-foreground">
          Illustrative documents. New uploads remain in this review session.
        </p>
      </section>
      <StudioSheet open={open} onClose={() => setOpen(false)} title="Add a medical report">
        <Upload className="mb-5 text-primary" />
        <Label>PDF, JPG OR PNG / UP TO 10 MB</Label>
        <label className="mt-5 block">
          <span className="mb-3 block text-sm">Choose your document</span>
          <input
            aria-label="Choose medical report"
            type="file"
            accept="application/pdf,image/jpeg,image/png,image/webp"
            onChange={(e) => add(e.target.files?.[0])}
            className="w-full rounded-xl border border-dashed border-border p-5 text-xs file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-primary-foreground"
          />
        </label>
        <p role="alert" className="mt-3 text-xs text-destructive">
          {error}
        </p>
      </StudioSheet>
      <StudioSheet
        open={preview !== null}
        onClose={() => setPreview(null)}
        title={preview?.name ?? "Report"}
      >
        {preview?.url ? (
          preview.type === "IMG" ? (
            <img
              src={preview.url}
              alt={preview.name}
              className="max-h-96 w-full rounded-lg object-contain"
            />
          ) : (
            <iframe title={preview.name} src={preview.url} className="h-96 w-full bg-background" />
          )
        ) : (
          <>
            <FileText className="mb-6 h-12 w-12 text-primary" />
            <Label>ILLUSTRATIVE RECORD</Label>
            <p className="mt-4 text-sm text-muted-foreground">
              No medical results are attached to this sample. Upload a report to preview its
              contents.
            </p>
          </>
        )}
        {preview?.url && (
          <Action className="mt-5" asChild>
            <a href={preview.url} download={preview.name}>
              Download report
            </a>
          </Action>
        )}
      </StudioSheet>
    </StudioScreen>
  );
}
