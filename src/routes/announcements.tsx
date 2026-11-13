import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Pin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudioScreen, StudioSheet, Label, Tabs, studioHead } from "@/components/c7/studio-kit";
import { notices } from "@/lib/studio-data";
export const Route = createFileRoute("/announcements")({
  head: studioHead(
    "Studio announcements",
    "C7 studio timings, community events, offers and payment notices.",
  ),
  component: Announcements,
});
function Announcements() {
  const [tab, setTab] = useState("All"),
    [read, setRead] = useState<number[]>([]),
    [selected, setSelected] = useState<(typeof notices)[number] | null>(null);
  return (
    <StudioScreen title="Announcements">
      <div className="px-5 pt-8">
        <div className="flex items-baseline justify-between">
          <h1 className="text-4xl font-light">Studio notes.</h1>
          <span className="font-mono text-xs text-primary">{notices.length - read.length} NEW</span>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">From the people behind your progress.</p>
        <div className="mt-6">
          <Tabs
            options={["All", "Timings", "Event", "Offer", "Payment"]}
            value={tab}
            onChange={setTab}
          />
        </div>
        <div className="mt-6">
          {notices
            .filter((n) => tab === "All" || n.type === tab)
            .map((n) => (
              <article
                key={n.id}
                className={
                  "mb-7 border-b border-border pb-7 " +
                  (n.pinned ? "border-l-2 border-l-primary pl-4" : "")
                }
              >
                <div className="flex items-center gap-2">
                  <span
                    className={
                      "rounded-full border px-2.5 py-1 text-[10px] " +
                      (n.type === "Payment"
                        ? "border-warning/60 text-warning"
                        : "border-primary/60 text-primary")
                    }
                  >
                    {n.type}
                  </span>
                  {n.pinned && (
                    <span className="ml-auto flex items-center gap-1 text-[9px] text-muted-foreground">
                      <Pin size={11} />
                      PINNED
                    </span>
                  )}
                  {!read.includes(n.id) && (
                    <span
                      aria-label="Unread"
                      className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                    />
                  )}
                </div>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSelected(n);
                    setRead((ids) => (ids.includes(n.id) ? ids : [...ids, n.id]));
                  }}
                  className="mt-4 block h-auto w-full whitespace-normal p-0 text-left hover:bg-transparent"
                >
                  <h2 className="text-[27px] font-light leading-tight">{n.title}</h2>
                  <p className="mt-4 text-xs font-normal leading-6 text-muted-foreground">
                    {n.text}
                  </p>
                </Button>
                <div className="mt-5 flex items-center justify-between">
                  <Label className="text-[9px]">{n.date}</Label>
                  <ArrowUpRight size={16} className="text-muted-foreground" />
                </div>
              </article>
            ))}
        </div>
      </div>
      <StudioSheet
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.type ?? "Announcement"}
      >
        <Label className="text-primary">{selected?.date}</Label>
        <h2 className="mt-4 text-3xl font-light">{selected?.title}</h2>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">{selected?.text}</p>
        <p className="mt-7 border-t border-border pt-4 text-xs">{selected?.author}</p>
      </StudioSheet>
    </StudioScreen>
  );
}
