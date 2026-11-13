import { describe, it, expect } from "vitest";
import { bmiStats, balance, attendanceMonth } from "@/lib/studio-data";
describe("studio calculations", () => {
  it("calculates BMI and healthy weight range for 168cm", () => {
    const stats = bmiStats(64, 168);
    expect(stats?.bmi).toBeCloseTo(22.6757, 3);
    expect(stats?.band).toBe("Healthy");
    expect(stats?.low).toBeCloseTo(52.2144);
    expect(stats?.high).toBeCloseTo(70.27776);
  });
  it("classifies standard BMI bands and rejects zero height", () => {
    expect(bmiStats(50, 180)?.band).toBe("Under");
    expect(bmiStats(85, 180)?.band).toBe("Over");
    expect(bmiStats(105, 180)?.band).toBe("Obese");
    expect(bmiStats(64, 0)).toBeNull();
  });
  it("shows the requested outstanding ten thousand rupees", () => {
    expect(balance({ total: 18000, paid: 8000 })).toBe(10000);
    expect(balance({ total: 18000, paid: 18000 })).toBe(0);
  });
  it("does not count future attendance in November", () => {
    expect(attendanceMonth(0).present.every((day) => day <= 12)).toBe(true);
    expect(attendanceMonth(-1).count).toBe(31);
  });
});
