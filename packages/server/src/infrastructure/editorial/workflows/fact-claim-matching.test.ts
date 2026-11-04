import assert from "node:assert/strict";
import test from "node:test";
import { setTimeout } from "node:timers/promises";
import type { FactCheckFinding } from "@skladno/shared";

import { matchFactCandidates } from "./fact-claim-matching.js";
import { streamFactCheck } from "./fact-check-workflow.js";
import type { FactCheckProvider } from "../models/fact-check-provider.js";


const previous: FactCheckFinding = {
    factId: "previous-fact", claim: "There were 10 participants.", status: "supported",
    rationale: "Public source", uncertainty: "Low", sources: [],
};


test("measures changed-number matching through the real workflow with synthetic provider delay", async (context) => {
    let matchingCalls = 0;
    let researchCalls = 0;
    const provider: FactCheckProvider = {
        researchStage: "web_research",
        extractClaims: async () => ({ responseId: "extracted", claims: [{ claim: "There were 20 participants." }] }),
        matchClaims: async () => {
            matchingCalls++;
            await setTimeout(40);
            return [{ claimIndex: 0, factId: previous.factId! }];
        },
        researchClaims: async (claims) => {
            researchCalls++;
            return claims.map(({ claim }) => ({ claim, evidence: "Public evidence", sources: [] }));
        },
        evaluateClaims: async ([research]) => ({ responseId: "evaluated", findings: [{
            claim: research!.claim, status: "supported", rationale: "Public evidence", uncertainty: "Low", sources: [],
        }] }),
    };
    const started = performance.now();
    let completed = false;
    for await (const event of streamFactCheck({
        request: { article: "There were 20 participants.", instructions: "Check", reusableFactFindings: [previous] },
        signal: new AbortController().signal, provider,
    })) {
        if (event.type === "completed") {
            completed = true;
            assert.equal(event.factCheck?.findings[0]?.factId, undefined);
        }
    }

    assert.equal(completed, true);
    assert.equal(matchingCalls, 0);
    assert.equal(researchCalls, 1);
    context.diagnostic(JSON.stringify({ syntheticMatcherDelayMs: 40, matchingCalls, researchCalls, elapsedMs: performance.now() - started }));
});


test("matching keeps original claim indices when incompatible claims precede compatible claims", async () => {
    const provider: FactCheckProvider = {
        researchStage: "web_research",
        extractClaims: async () => ({ responseId: "unused", claims: [] }),
        researchClaims: async () => [],
        evaluateClaims: async () => ({ responseId: "unused", findings: [] }),
        matchClaims: async (claims) => {
            assert.deepEqual(claims, ["10 people participated."]);
            return [{ claimIndex: 0, factId: previous.factId! }];
        },
    };
    const matched = await matchFactCandidates([
        { claim: "There were 20 participants." }, { claim: "10 people participated." },
    ], [previous], provider, new AbortController().signal);
    assert.equal(matched.has(0), false);
    assert.equal(matched.get(1), previous);
});


test("negation changes skip matching and retain the existing rejection guard", async () => {
    let calls = 0;
    const provider: FactCheckProvider = {
        researchStage: "web_research",
        extractClaims: async () => ({ responseId: "unused", claims: [] }),
        researchClaims: async () => [],
        evaluateClaims: async () => ({ responseId: "unused", findings: [] }),
        matchClaims: async () => {
            calls++;
            return [{ claimIndex: 0, factId: previous.factId! }];
        },
    };
    const matched = await matchFactCandidates([{ claim: "There were not 10 participants." }], [previous], provider, new AbortController().signal);
    assert.equal(matched.size, 0);
    assert.equal(calls, 0);
});
