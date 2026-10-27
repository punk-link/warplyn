import type { EditorialEngineEvent } from "../../editorial/engine/editorial-engine-event.js";


export class AssistantToolProgress {
    // ponytail: Foreground events queue in memory; add backpressure if long model streams make this measurable.
    private readonly queuedEvents: EditorialEngineEvent[] = [];


    private notify: () => void = () => undefined;


    push(event: EditorialEngineEvent): void {
        this.queuedEvents.push(event);
        this.notify();
    }


    async *stream(source: AsyncIterable<EditorialEngineEvent>, resolve: (event: EditorialEngineEvent) => EditorialEngineEvent | undefined): AsyncIterable<EditorialEngineEvent> {
        let done = false;
        let failure: unknown;
        const produce = (async () => {
            try {
                for await (const event of source) {
                    const resolved = resolve(event);
                    if (resolved)
                        this.push(resolved);
                }
            } catch (error) {
                failure = error;
            } finally {
                done = true;
                this.notify();
            }
        })();

        while (!done || this.queuedEvents.length) {
            if (this.queuedEvents.length) {
                yield this.queuedEvents.shift()!;
                continue;
            }

            await new Promise<void>((resolveWait) => {
                this.notify = resolveWait;
            });
        }

        await produce;
        if (failure)
            throw failure;
    }
}
