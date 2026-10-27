// @vitest-environment node
import { describe, expect, it } from "vitest";
import { ASSISTANT_EVENT } from "@skladno/shared";
import { updateStreamedMessage, type StreamedAssistantMessage } from "./assistant-streaming.js";

describe("assistant streaming", () => {
    it("exposes the resolved skill before any generated text", () => {
        let message: StreamedAssistantMessage | undefined;
        updateStreamedMessage({
            event: { type: ASSISTANT_EVENT.SKILL_RESOLVED, requestId: "request", skillId: "flow", source: "inferred" },
            articleId: "article", streamedId: "stream", buffers: {}, update: (next) => {
                message = next;
            },
        });
        expect(message).toMatchObject({ requestId: "request", skillId: "flow", blocks: [], status: "pending" });
    });
});
