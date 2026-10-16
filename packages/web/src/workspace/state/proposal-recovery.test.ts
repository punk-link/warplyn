// @vitest-environment node

import { expect, it } from "vitest";
import { canRecoverProposal } from "./proposal-recovery.js";

it("prefers the newer recovered Proposal while preserving live work and dismissal", () => {
    const recovery = { articleIds: { current: new Set(["article"]) }, dates: { current: new Map([["article", "2026-10-01"]]) } };
    const old = { articleId: "article", revisionId: "revision", content: "Original", recoveredAt: "2026-10-01" };
    expect(canRecoverProposal("article", "2026-10-02", old, recovery)).toBe(true);
    expect(canRecoverProposal("article", "2026-09-30", old, recovery)).toBe(false);
    expect(canRecoverProposal("article", "2026-10-02", { ...old, recoveredAt: undefined }, recovery)).toBe(false);
    recovery.dates.current.delete("article");
    expect(canRecoverProposal("article", "2026-10-02", undefined, recovery)).toBe(false);
});
