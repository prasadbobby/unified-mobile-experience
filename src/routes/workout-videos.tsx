import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Check, Download, Play, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudioScreen, StudioSheet, Label, Tabs, studioHead } from "@/components/c7/studio-kit";
import { videos } from "@/lib/studio-data";
import { saveBlob } from "@/lib/studio-pdf";
export const Route = createFileRoute("/workout-videos")({
  head: studioHead(
    "Workout videos",
    "Animated exercise demonstrations with downloadable video files.",
  ),
  component: WorkoutVideos,
});
function WorkoutVideos() {
  const [tab, setTab] = useState("All"),
    [selected, setSelected] = useState<(typeof videos)[number] | null>(null),
    [download, setDownload] = useState<Record<string, number>>({}),
    [offline, setOffline] = useState(false),
    [error, setError] = useState("");
  const blobs = useRef<Record<string, string>>({});
  const controllers = useRef<AbortController[]>([]);
  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
      controllers.current.forEach((c) => c.abort());
      Object.values(blobs.current).forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);
  const get = async (v: (typeof videos)[number]) => {
    if (download[v.name] === 100) return;
    const ctrl = new AbortController();
    controllers.current.push(ctrl);
    setDownload((d) => ({ ...d, [v.name]: 1 }));
    setError("");
    try {
      const response = await fetch(v.source, { signal: ctrl.signal });
      if (!response.ok) throw Error("Download failed");
      const total = Number(response.headers.get("content-length"));
      const reader = response.body?.getReader();
      const parts: BlobPart[] = [];
      let received = 0;
      if (reader) {
        while (true) {
          const result = await reader.read();
          if (result.done) break;
          parts.push(new Uint8Array(result.value));
          received += result.value.length;
          setDownload((d) => ({
            ...d,
            [v.name]: total ? Math.min(99, Math.round((received / total) * 100)) : 50,
          }));
        }
      } else parts.push(await response.blob());
      const blob = new Blob(parts, { type: "video/mp4" });
      blobs.current[v.name] = URL.createObjectURL(blob);
      saveBlob(blob, v.name + ".mp4");
      setDownload((d) => ({ ...d, [v.name]: 100 }));
    } catch (e) {
      if (ctrl.signal.aborted) return;
      setDownload((d) => ({ ...d, [v.name]: 0 }));
      setError("Download unavailable. Try again when connected.");
    }
  };
  return (
    <StudioScreen title="Workout videos">
      <div className="px-5 pt-8">
        <Label>THE MOVEMENT LIBRARY</Label>
        <h1 className="mt-3 text-4xl font-light">
          Good form.
          <br />
          <span className="text-muted-foreground">Every rep.</span>
        </h1>
        <div className="mt-5 flex items-center gap-2 border-y border-border py-3 text-[10px] text-muted-foreground">
          <WifiOff size={14} />
          {offline
            ? "You are offline · Saved demos available this session"
            : "Save a demo for offline practice"}
          <span className="ml-auto text-primary">
            {Object.values(download).filter((n) => n === 100).length} SAVED
          </span>
        </div>
        <div className="mt-5">
          <Tabs options={["All", "Strength", "Mobility"]} value={tab} onChange={setTab} />
        </div>
        <div className="mt-5 space-y-7">
          {videos
            .filter((v) => tab === "All" || v.category === tab)
            .map((v, i) => (
              <article key={v.name}>
                <Button
                  variant="ghost"
                  aria-label={`Play ${v.name}`}
                  onClick={() => setSelected(v)}
                  className="relative block aspect-video h-auto w-full overflow-hidden rounded-2xl bg-card p-0"
                >
                  <video
                    src={blobs.current[v.name] ?? v.source}
                    preload="auto"
                    muted
                    playsInline
                    className="h-full w-full object-contain"
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-border bg-surface/80 px-2.5 py-1 text-[9px]">
                    ANIMATED DEMO
                  </span>
                  <span className="absolute bottom-4 right-4 text-xs">{v.duration}</span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Play size={30} className="fill-primary text-primary" />
                  </span>
                </Button>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <Label>
                      {v.category} / 0{i + 1}
                    </Label>
                    <h2 className="mt-1.5 text-base font-light">{v.name}</h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`${download[v.name] === 100 ? "Downloaded" : "Download"} ${v.name}`}
                    disabled={Boolean(download[v.name] && download[v.name] !== 100)}
                    onClick={() => get(v)}
                    className="rounded-full text-primary"
                  >
                    {download[v.name] === 100 ? (
                      <Check />
                    ) : download[v.name] ? (
                      <svg viewBox="0 0 36 36">
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          fill="none"
                          className="stroke-secondary"
                          strokeWidth="3"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          fill="none"
                          className="stroke-primary"
                          strokeWidth="3"
                          strokeDasharray={`${(download[v.name] ?? 0) * 0.88} 88`}
                          transform="rotate(-90 18 18)"
                        />
                      </svg>
                    ) : (
                      <Download />
                    )}
                  </Button>
                </div>
              </article>
            ))}
        </div>
        <p role="alert" className="mt-4 text-xs text-destructive">
          {error}
        </p>
      </div>
      <StudioSheet
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.name ?? "Workout demo"}
      >
        {selected && (
          <>
            <video
              key={selected.name}
              src={blobs.current[selected.name] ?? selected.source}
              autoPlay
              controls
              loop
              playsInline
              className="aspect-video w-full rounded-xl bg-surface"
            />
            <p className="mt-4 text-sm">{selected.cue}</p>
            <p className="mt-3 text-[10px] text-muted-foreground">
              Movement reference only. Ask your coach to check your form.
            </p>
          </>
        )}
      </StudioSheet>
    </StudioScreen>
  );
}
