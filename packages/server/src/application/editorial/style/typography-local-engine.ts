import type { EditorialEngine } from "../engine/editorial-engine.js";
import type { EditorialEngineEvent } from "../engine/editorial-engine-event.js";
import type { EditorialEngineRequest } from "../engine/editorial-engine-request.js";


export class TypographyLocalEngine implements EditorialEngine {
    async *stream(request: EditorialEngineRequest, signal: AbortSignal): AsyncIterable<EditorialEngineEvent> {
        if (signal.aborted)
            return;

        yield { type: "completed", responseId: `local:${crypto.randomUUID()}`, text: request.article };
    }


    async *streamConversation(): AsyncIterable<EditorialEngineEvent> {
        yield* [];
    }
}
