import { createFileRoute } from "@tanstack/react-router";
import { BicepsFlexed, Flame, HandHeart, Heart, MessageCircle, Moon, PartyPopper, Pin, SendHorizontal, ShieldCheck, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Screen, TopBar } from "@/components/app/ui";
import { Card, Chip, FRAME, Initials } from "@/components/c7/kit";
import { EnergyIcon, MoodIcon, energyLabels, moodLabels } from "@/components/c7/moods";
import { posts as seed, reactions, type Comment, type Post, type Reaction } from "@/lib/c7-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/challenge-feed")({
  head: () => ({ meta: [
    { title: "Challenge feed — C7 90-Day Challenge" },
    { name: "description", content: "See and react to check-ins from your 90-day challenge group." },
    { property: "og:title", content: "Challenge feed — C7 90-Day Challenge" },
    { property: "og:description", content: "Community check-ins, reactions and coach comments." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Feed,
});

const rIcon: Record<Reaction, typeof Heart> = { Like: ThumbsUp, Love: Heart, Support: HandHeart, Strong: BicepsFlexed, Fire: Flame, Clap: PartyPopper };

export function ReactionBar({ post, onReact }: { post: Post; onReact: (r: Reaction) => void }) {
  return (
    <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
      {reactions.map((r) => { const I = rIcon[r], on = post.mine === r; return (
        <button key={r} aria-label={r} aria-pressed={on} onClick={() => onReact(r)}
          className={cn("flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition active:scale-90", on ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground")}>
          <I className={cn("h-4 w-4", on && "animate-pop")} fill={on && (r === "Love" || r === "Fire") ? "currentColor" : "none"} />{post.reactions[r]}
        </button>); })}
    </div>
  );
}

function CommentItem({ c, depth = 0 }: { c: Comment; depth?: number }) {
  return (
    <div className={cn(depth > 0 && "ml-10 border-l border-border pl-3")}>
      <div className="flex gap-2.5 py-2">
        <Initials name={c.author} className="h-8 w-8 text-xs" />
        <div className="flex-1 rounded-[1.25rem] bg-secondary px-3.5 py-2.5">
          <p className="flex items-center gap-1.5 text-xs font-medium">{c.author}{c.coach && <ShieldCheck className="h-3.5 w-3.5 text-primary" />}<span className="font-normal text-muted-foreground">· {c.time}</span></p>
          <p className="mt-0.5 text-sm">{c.text}</p>
        </div>
      </div>
      {c.replies?.map((r) => <CommentItem key={r.id} c={r} depth={depth + 1} />)}
    </div>
  );
}

export function PostCard({ post, onReact, onOpen, open }: { post: Post; onReact: (r: Reaction) => void; onOpen: () => void; open: boolean }) {
  const count = post.comments.reduce((a, c) => a + 1 + (c.replies?.length ?? 0), 0);
  return (
    <Card className="animate-fade-up">
      {post.pinned && <p className="mb-3 flex items-center gap-1 text-xs text-primary"><Pin className="h-3.5 w-3.5" />Pinned by coach</p>}
      <div className="flex items-center gap-3">
        <Initials name={post.author} />
        <div className="flex-1">
          <p className="flex items-center gap-2 font-medium">{post.author}{post.coach && <Chip className="px-2 py-0.5 text-[10px]"><ShieldCheck className="h-3 w-3" />Coach</Chip>}</p>
          <p className="text-xs text-muted-foreground">{post.time} ago</p>
        </div>
        <Chip tone="muted">Day {post.day}</Chip>
      </div>
      <div className="mt-4 flex gap-2 text-xs">
        <span className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-primary"><MoodIcon level={post.mood} className="h-4 w-4" />{moodLabels[post.mood]}</span>
        <span className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-primary"><EnergyIcon level={post.energy} className="h-4 w-4" />{energyLabels[post.energy]}</span>
        <span className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-info"><Moon className="h-4 w-4" />{post.sleep}h</span>
      </div>
      {post.sections.map((s) => <div key={s.label} className="mt-3"><p className="text-xs text-muted-foreground">{s.label}</p><p className="text-sm leading-relaxed">{s.text}</p></div>)}
      {post.photos.length > 0 && (
        <div className="no-scrollbar -mx-5 mt-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5">
          {post.photos.map((p, i) => <img key={i} src={p} alt={`Check-in photo ${i + 1}`} loading="lazy" className="aspect-[4/5] w-[78%] shrink-0 snap-center rounded-[1.5rem] object-cover" />)}
        </div>
      )}
      <div className="mt-4"><ReactionBar post={post} onReact={onReact} /></div>
      <button onClick={onOpen} className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground"><MessageCircle className="h-4 w-4" />{count} comments</button>
      {open && count > 0 && <div className="mt-2">{post.comments.map((c) => <CommentItem key={c.id} c={c} />)}</div>}
    </Card>
  );
}

function Feed() {
  const [list, setList] = useState(seed);
  const [open, setOpen] = useState<string>("a2");
  const [text, setText] = useState("");
  const react = (id: string, r: Reaction) => setList((l) => l.map((p) => {
    if (p.id !== id) return p;
    const rs = { ...p.reactions }; if (p.mine) rs[p.mine]--; const mine = p.mine === r ? undefined : r; if (mine) rs[mine]++;
    return { ...p, reactions: rs, mine };
  }));
  const send = () => { if (!text.trim()) return; setList((l) => l.map((p) => p.id === open ? { ...p, comments: [...p.comments, { id: crypto.randomUUID(), author: "Rahul Verma", time: "now", text }] } : p)); setText(""); };
  const target = list.find((p) => p.id === open);
  return (
    <Screen className={`bg-hero pb-28 ${FRAME}`}>
      <TopBar title="Challenge feed" />
      <div className="mt-6 space-y-4 px-5">
        {list.map((p) => <PostCard key={p.id} post={p} open={open === p.id} onOpen={() => setOpen(open === p.id ? "" : p.id)} onReact={(r) => react(p.id, r)} />)}
      </div>
      <div className={`fixed bottom-0 left-1/2 z-40 w-full -translate-x-1/2 border-t border-border bg-card/95 px-4 pb-5 pt-3 backdrop-blur-xl ${FRAME}`}>
        {target && <p className="mb-2 px-1 text-xs text-muted-foreground">Commenting on {target.author}'s Day {target.day}</p>}
        <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex items-center gap-2">
          <input value={text} disabled={!target} onChange={(e) => setText(e.target.value)} placeholder={target ? "Write a comment…" : "Open a post to comment"} className="field h-12 bg-secondary" />
          <button aria-label="Send comment" disabled={!text.trim()} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition active:scale-90 disabled:opacity-40"><SendHorizontal className="h-5 w-5" /></button>
        </form>
      </div>
    </Screen>
  );
}
