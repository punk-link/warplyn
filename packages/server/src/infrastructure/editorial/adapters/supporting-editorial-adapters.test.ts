import assert from "node:assert/strict";
import test from "node:test";
import { MockLanguageModelV3 } from "ai/test";
import type { LanguageModelV3GenerateResult } from "@ai-sdk/provider";

import { EDITORIAL_ENGINE_ERROR } from "../../../application/editorial/engine/editorial-engine-errors.js";
import { AiSdkProposalSummaryGeneratorAdapter } from "./ai-sdk-proposal-summary-generator-adapter.js";
import { AiSdkArticleTitleGeneratorAdapter } from "./ai-sdk-article-title-generator-adapter.js";
import { AiSdkRevisionDescriptionGeneratorAdapter } from "./ai-sdk-revision-description-generator-adapter.js";


function generated(text: string, finishReason: LanguageModelV3GenerateResult["finishReason"]) {
    return {
        content: [{ type: "text" as const, text }],
        finishReason,
        usage: {
            inputTokens: { total: 0, noCache: 0, cacheRead: 0, cacheWrite: 0 },
            outputTokens: { total: 0, text: 0, reasoning: 0 },
        },
        warnings: [],
    } satisfies LanguageModelV3GenerateResult;
}


test("title generation rejects output stopped by the token limit", async () => {
    const model = new MockLanguageModelV3({ doGenerate: generated("Partial title", { unified: "length", raw: undefined }) });
    const adapter = new AiSdkArticleTitleGeneratorAdapter(model);

    await assert.rejects(adapter.generate("Article", new AbortController().signal), { code: EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT });
});


test("title generation validates confidence, structured output, language and cancellation", async () => {
    for (const output of ['{"title":"Community gardens","confident":true}', '{"title":"Guess","confident":false}', '{"title":"","confident":true}', "malformed"]) {
        const model = new MockLanguageModelV3({ doGenerate: generated(output, { unified: "stop", raw: undefined }) });
        const adapter = new AiSdkArticleTitleGeneratorAdapter(model);
        if (output.includes("Community")) {
            assert.equal(await adapter.generate("Community gardens", new AbortController().signal, "es"), "Community gardens");
            assert.ok(JSON.stringify(model.doGenerateCalls[0]?.prompt).includes('\\"language\\":\\"es\\"'));
        } else {
            await assert.rejects(adapter.generate("Community gardens", new AbortController().signal));
        }
    }

    const controller = new AbortController();
    controller.abort();
    const model = new MockLanguageModelV3({ doGenerate: generated('{"title":"Community gardens","confident":true}', { unified: "stop", raw: undefined }) });
    await assert.rejects(new AiSdkArticleTitleGeneratorAdapter(model).generate("Community gardens", controller.signal));
});


test("Proposal summaries reject structured output stopped by the token limit", async () => {
    const model = new MockLanguageModelV3({ doGenerate: generated('{"summaries":[{"changeId":"change-1","summary":"A summary"}]}', { unified: "length", raw: undefined }) });
    const adapter = new AiSdkProposalSummaryGeneratorAdapter(model);

    await assert.rejects(adapter.summarize([{ id: "change-1", baseStart: 0, baseEnd: 1, baseLines: ["Before"], proposalLines: ["After"] }], "en", new AbortController().signal), { code: EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT });
});


test("Revision descriptions reject output stopped by the token limit", async () => {
    const model = new MockLanguageModelV3({ doGenerate: generated("Partial description", { unified: "length", raw: undefined }) });
    const adapter = new AiSdkRevisionDescriptionGeneratorAdapter(model);

    await assert.rejects(adapter.generate("Before", "After", "en", new AbortController().signal), { code: EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT });
});


test("Revision descriptions include sentence context for partial-word edits and exclude unrelated sentences", async () => {
    const model = new MockLanguageModelV3({ doGenerate: generated("Adjusted terminology", { unified: "stop", raw: undefined }) });
    const adapter = new AiSdkRevisionDescriptionGeneratorAdapter(model);
    await adapter.generate("Unrelated introduction. These models work. Unrelated ending.",
        "Unrelated introduction. These m work. Unrelated ending.", "en", new AbortController().signal);
    const prompt = JSON.stringify(model.doGenerateCalls[0]?.prompt);
    assert.ok(prompt.includes("These models work."));
    assert.ok(prompt.includes("These m work."));
    assert.ok(!prompt.includes("Unrelated introduction"));
    assert.ok(!prompt.includes("Unrelated ending"));
    assert.ok(prompt.includes("Do not invent the Author's intention"));
});


test("Revision descriptions fall back without a provider call when changed sentences exceed the context budget", async () => {
    const model = new MockLanguageModelV3();
    const adapter = new AiSdkRevisionDescriptionGeneratorAdapter(model);
    await assert.rejects(adapter.generate("a".repeat(12001), "b".repeat(12001), "en", new AbortController().signal),
        { code: EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT });
    assert.equal(model.doGenerateCalls.length, 0);
});
