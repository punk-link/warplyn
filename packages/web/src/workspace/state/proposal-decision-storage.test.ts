import { beforeEach, expect, it } from "vitest";
import { loadProposalDecisions, saveProposalDecisions, loadProposalReplacements, saveProposalReplacements } from "./proposal-decision-storage.js";

const base = { articleId: "article", revisionId: "revision", editorialArtifactId: "artifact", content: "" };
beforeEach(() => localStorage.clear());

it("recovers mixed review decisions from persistent storage and persists reset", () => {
    saveProposalDecisions(base, { "change-1": "accepted", "change-2": "rejected" });
    expect(loadProposalDecisions({ ...base })).toEqual({ "change-1": "accepted", "change-2": "rejected" });
    expect(loadProposalDecisions({ ...base, editorialArtifactId: "other" })).toEqual({});
    expect(loadProposalDecisions({ ...base, revisionId: "other" })).toEqual({});
    expect(loadProposalDecisions({ ...base, articleId: "other" })).toEqual({});
    saveProposalDecisions(base, {});
    expect(loadProposalDecisions(base)).toEqual({});
});

it("ignores malformed stored review metadata", () => {
    saveProposalDecisions(base, {});
    const key = localStorage.key(0)!;
    localStorage.setItem(key, '{"change-1":"accepted","change-2":"invalid"}');
    expect(loadProposalDecisions(base)).toEqual({ "change-1": "accepted" });
    localStorage.setItem(key, "invalid json");
    expect(loadProposalDecisions(base)).toEqual({});
});


it("retains empty and multiline Author replacements independently of decisions", () => {
    const replacements = { "change-1": "", "change-2": "Author text\nSecond line" };
    saveProposalReplacements(base, replacements);
    saveProposalDecisions(base, { "change-2": "rejected" });
    expect(loadProposalReplacements({ ...base })).toEqual(replacements);
    expect(loadProposalReplacements({ ...base, editorialArtifactId: "other" })).toEqual({});
    saveProposalDecisions(base, {});
    expect(loadProposalReplacements(base)).toEqual(replacements);
});
