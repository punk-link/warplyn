import assert from "node:assert/strict";
import test from "node:test";
import { BUILT_IN_SKILL } from "@skladno/shared";
import { AssistantCapabilityLoop } from "./assistant-capability-loop.js";
import { editorialCapabilityDefinitions } from "./editorial-capability-registry.js";
import { AssistantSkillCatalog } from "../skills/assistant-skill-catalog.js";
import { builtInSkillSource } from "../skills/built-in-skill-source.js";
import type { PreparedAssistantRequest } from "../requests/prepared-assistant-request.js";
import type { EditorialAssistantRequest } from "../../editorial/engine/editorial-assistant-request.js";
import { EDITORIAL_ENGINE_EVENT } from "../../editorial/engine/editorial-engine-events.js";


test("each translation request binds its explicit language even when the model chooses another", async () => {
    const languages: (string | undefined)[] = [];
    const engine = {
        async *stream() {
            return;
        },
        async *streamConversation() {
            return;
        },
        async *streamAssistant(request: EditorialAssistantRequest, signal: AbortSignal) {
            assert.ok(request.instructions.some((instruction) => instruction === "Target translation language: German"));
            const tool = request.tools.find((candidate) => candidate.capability === "translate");
            assert.ok(tool);
            await tool.execute({ targetLanguage: "Spanish" }, signal);
            yield { type: EDITORIAL_ENGINE_EVENT.COMPLETED, responseId: "assistant", text: "Done" } as const;
        },
    };
    const request: PreparedAssistantRequest = {
        kind: "new", requestId: "request", articleId: "article", authorMessage: "", targetLanguage: "German",
        scope: { kind: "article", baseRevisionId: "revision" }, articleContent: "Source", articleTitle: "Title",
        resolvedSkillId: BUILT_IN_SKILL.TRANSLATION, engine, usesCapabilityLoop: true,
        capabilityActivities: [], pendingActions: [], authorizedActions: [],
    };
    const loop = new AssistantCapabilityLoop({
        assistant: { setExecution: () => undefined }, engines: {},
        capabilities: {
            getDefinitions: () => editorialCapabilityDefinitions.filter((definition) => definition.id === "translate"),
            discover: () => [], read: () => undefined, executeAction: () => ({ items: [], rules: "", status: "empty" }),
            stream: async function* (context) {
                languages.push(context.targetLanguage);
                yield { type: EDITORIAL_ENGINE_EVENT.COMPLETED, responseId: "translation", text: "Übersetzung", translation: { targetLanguage: "German", protectedSpans: [] } } as const;
            },
        },
        skills: new AssistantSkillCatalog([builtInSkillSource]), conversationHistory: () => [],
    });
    for await (const event of loop.stream(request, new AbortController().signal))
        assert.ok(event);

    assert.deepEqual(languages, ["German"]);
});
