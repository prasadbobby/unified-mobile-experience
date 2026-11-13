import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Bell, ChevronRight } from "lucide-react";
import avatar from "@/assets/avatar-emma.jpg";
import { StudioScreen, Tickets, Label, studioHead } from "@/components/c7/studio-kit";
export const Route = createFileRoute("/guest-home")({
  head: studioHead("Your next chapter", "Explore C7 studio and online training packages."),
  component: GuestHome,
});
function GuestHome() {
  return (
    <StudioScreen title="C7 Personal Fitness">
      <header className="flex items-center gap-3 px-5 pt-7">
        <img src={avatar} width={46} height={46} className="rounded-full" alt="Emma Richardson" />
        <div className="flex-1">
          <Label>Good morning,</Label>
          <p className="mt-1 text-lg">Emma Richardson</p>
        </div>
        <Link to="/announcements" aria-label="Announcements" className="relative p-3">
          <Bell size={20} />
          <span className="absolute right-3 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </Link>
      </header>
      <div className="px-5 pb-9 pt-10">
        <Label>YOUR NEXT CHAPTER / 01</Label>
        <h1 className="mt-4 text-[44px] font-light leading-[1.1]">
          You showed up.
          <br />
          <span className="text-primary">
            Now get
            <br />
            stronger.
          </span>
        </h1>
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">A plan. A coach. Your kind of pace.</p>
          <ArrowUpRight size={20} className="text-primary" />
        </div>
      </div>
      <div className="mb-4 flex items-center justify-between px-5">
        <Label>FIND YOUR FIT</Label>
        <span className="font-mono text-xs text-muted-foreground">03 PACKAGES</span>
      </div>
      <Tickets />
      <Link
        to="/announcements"
        className="mx-5 mt-5 flex items-center gap-3 border-y border-border py-4"
      >
        <span className="h-6 w-0.5 bg-primary" />
        <div className="flex-1">
          <Label className="text-primary">STUDIO NOTE</Label>
          <p className="mt-1 text-xs">Saturday doors open at 7:00 AM IST.</p>
        </div>
        <ChevronRight size={16} />
      </Link>
    </StudioScreen>
  );
}
