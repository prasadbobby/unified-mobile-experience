import { describe, expect, it } from "vitest";
import { weekStatus } from "@/routes/steps";
import { daysBetween } from "@/lib/c7-data";

describe("C7 rules", () => {
  it("week is on track when average meets coach target", () => {
    expect(weekStatus([10000, 10000], 10000).onTrack).toBe(true);
    expect(weekStatus([9000, 10000], 10000).onTrack).toBe(false);
  });
  it("balance due is danger at 3 days or fewer", () => {
    expect(daysBetween("2026-11-11", "2026-11-13") <= 3).toBe(true);
    expect(daysBetween("2026-11-11", "2026-11-20") <= 3).toBe(false);
  });
});
