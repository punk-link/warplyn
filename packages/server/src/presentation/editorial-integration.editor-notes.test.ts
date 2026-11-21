import assert from "node:assert/strict";
import test from "node:test";
import { BUILT_IN_SKILL, createEditorNoteAnchor } from "@skladno/shared";
import { CapabilityFixtureEngine, FixtureEngine, withService } from "./editorial-integration.test-utils.js";

test("translation receives attached notes, excludes detached guidance, and preserves clean proposed text", async () => {
    const engine = new CapabilityFixtureEngine([{
        type: "completed", responseId: "notes-translation", text: "Texto traducido.",
        translation: { targetLanguage: "Spanish", protectedSpans: [], title: "Traducción" },
    }], "translate", { targetLanguage: "Spanish" });
    await withService(engine, async (_url, persistence, services) => {
        const content = "Selected passage. Unrelated passage.";
        const article = services.articles.createArticle({ title: "Source", content });
        for (const [id, start, end, text] of [
            ["selected", 0, 17, "Use a formal voice."],
            ["other", 18, content.length, "PRIVATE UNRELATED NOTE"],
        ] as const)
            services.articles.updateArticle(article.id, { editorNoteChange: {
                kind: "save", id, text, expectedVersion: 0,
                anchor: createEditorNoteAnchor(id === "other" ? "x".repeat(content.length) : content,
                    start, end, content.slice(start, end)),
            } });

        const request = services.assistant.prepare({
            kind: "new", requestId: "translate-notes", articleId: article.id,
            authorMessage: "Translate this Article into Spanish.",
            explicitSkillId: BUILT_IN_SKILL.TRANSLATION,
            scope: { kind: "article", baseRevisionId: article.currentRevisionId },
        });
        for await (const event of services.assistant.stream(request, new AbortController().signal))
            assert.notEqual(event.type, "failed");

        assert.equal(engine.requests[0]?.targetLanguage, "Spanish");
        assert.ok(engine.requests[0]?.authorContext.includes("Use a formal voice."));
        assert.ok(!engine.requests[0]?.authorContext.includes("PRIVATE UNRELATED NOTE"));
        assert.equal(engine.requests[0]?.article, content);
        assert.equal(services.articles.getArticle(article.id)?.currentRevision.content, content);
        const messages = JSON.stringify(persistence.assistant.listMessages(article.id));
        assert.ok(messages.includes("Texto traducido."));
        assert.ok(!messages.includes("Use a formal voice."));
        assert.ok(!messages.includes("PRIVATE UNRELATED NOTE"));
        assert.equal(services.articles.listRevisions(article.id).length, 1);
    });
});

// Product scenarios: workspace.editor.notes-guidance
for (const [authorMessage, generated] of [
    ["Revise this passage.", "improved"],
    ["Translate this passage into Spanish.", "Texto traducido."],
] as const)
    test(`selection guidance stays separate from proposed prose: ${authorMessage}`, async () => {
        const engine = new CapabilityFixtureEngine([{ type: "completed", responseId: "notes", text: generated }]);
        await withService(engine, async (_url, persistence, services) => {
            const content = "before selected after unrelated";
            const article = services.articles.createArticle({ title: "Synthetic", content });
            for (const [id, start, end, text] of [["attached", 7, 15, "Check this verb."], ["unrelated", 22, 31, "PRIVATE OTHER GUIDANCE"]] as const)
                services.articles.updateArticle(article.id, { editorNoteChange: {
                    kind: "save", id, expectedVersion: 0, text, anchor: createEditorNoteAnchor(content, start, end, content.slice(start, end)),
                } });

            const request = services.assistant.prepare({
                kind: "new", requestId: "notes-selection", articleId: article.id, authorMessage,
                scope: { kind: "selection", baseRevisionId: article.currentRevisionId, startOffset: 7, endOffset: 15 },
            });
            services.articles.updateArticle(article.id, { editorNoteChange: {
                kind: "save", id: "attached", expectedVersion: 1, text: "Guidance for a later request.",
                anchor: createEditorNoteAnchor(content, 7, 15, "selected"),
            } });
            for await (const event of services.assistant.stream(request, new AbortController().signal))
                assert.notEqual(event.type, "failed");

            assert.equal(engine.requests.length, 1);
            assert.ok(engine.requests[0].authorContext.includes("Check this verb."));
            assert.ok(!engine.requests[0].authorContext.includes("Guidance for a later request."));
            assert.ok(!engine.requests[0].authorContext.includes("PRIVATE OTHER GUIDANCE"));
            assert.equal(engine.requests[0].article, "selected");
            assert.equal(services.articles.getArticle(article.id)?.currentRevision.content, content);
            assert.equal(services.articles.listRevisions(article.id).length, 1);
            const reply = persistence.assistant.listMessages(article.id).find((message) => message.role === "assistant" && message.requestId);
            assert.equal(reply?.proposalContent, `before ${generated} after unrelated`);
        });
    });

test("HTTP note mutations reject malformed input and whole-Article generation receives attached notes", async () => {
    const engine = new FixtureEngine([{ type: "completed", responseId: "notes-full", text: "Revised source." }]);
    await withService(engine, async (url, _persistence, services) => {
        const article = services.articles.createArticle({ title: "Synthetic", content: "Source." });
        const endpoint = `${url}/api/articles/${article.id}`;
        const anchor = createEditorNoteAnchor("Source.", 0, 7, "Source.");
        const save = await fetch(endpoint, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({
            editorNoteChange: { kind: "save", id: "note", expectedVersion: 0, text: "Use a formal voice.", anchor },
        }) });
        assert.equal(save.status, 200);
        const invalid = await fetch(endpoint, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({
            editorNoteChange: { kind: "save", id: "note", expectedVersion: 1, text: "", anchor },
        }) });
        assert.equal(invalid.status, 400);
        const request = services.assistant.prepare({
            kind: "new", requestId: "notes-full", articleId: article.id, authorMessage: "Revise.", explicitSkillId: BUILT_IN_SKILL.FLOW_AND_CLARITY,
            scope: { kind: "article", baseRevisionId: article.currentRevisionId },
        });
        for await (const event of services.assistant.stream(request, new AbortController().signal))
            assert.notEqual(event.type, "failed");

        assert.ok(engine.requests[0]?.authorContext.includes("Use a formal voice."));
        assert.equal(services.articles.getArticle(article.id)?.currentRevision.content, "Source.");
    });
});
