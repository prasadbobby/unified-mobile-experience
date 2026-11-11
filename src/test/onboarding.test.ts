import { describe, expect, it } from "vitest";
import { kgToLb, lbToKg } from "@/lib/onboarding";
describe("weight unit toggle", () => {
  it("79 kg shows as 174 lb and back", () => { expect(kgToLb(79)).toBe(174); expect(lbToKg(174)).toBe(79); });
});
