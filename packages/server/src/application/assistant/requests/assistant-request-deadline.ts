import { APPLICATION_ERROR, ASSISTANT_EVENT, HTTP_STATUS, type AssistantEvent } from "@skladno/shared";

import { ApplicationServiceError } from "../../errors/application-service-error.js";
import { normalizeGeneralSettings } from "../../settings/application-settings-normalizers.js";
import type { SettingsStore } from "../../settings/settings-store.js";


export function getAssistantRequestTimeoutMs(settings: SettingsStore): number | undefined {
    const timeout = normalizeGeneralSettings(settings.getSetting("application-general")?.value).assistantRequestTimeoutMinutes;
    return timeout === "unlimited" ? undefined : timeout * 60000;
}


export async function* streamWithAssistantDeadline(
    stream: (signal: AbortSignal) => AsyncIterable<AssistantEvent>,
    signal: AbortSignal,
    timeoutMs: number | undefined,
): AsyncIterable<AssistantEvent> {
    const deadline = new AbortController();
    const combined = AbortSignal.any([signal, deadline.signal]);
    const timer = timeoutMs === undefined
        ? undefined
        : setTimeout(() => deadline.abort(new ApplicationServiceError(APPLICATION_ERROR.ASSISTANT_REQUEST_TIMED_OUT, HTTP_STATUS.BAD_REQUEST)), timeoutMs);
    let onAbort: () => void = () => undefined;
    const aborted = new Promise<never>((_resolve, reject) => {
        onAbort = () => reject(combined.reason);
        combined.addEventListener("abort", onAbort, { once: true });
    });
    const iterator = stream(combined)[Symbol.asyncIterator]();

    try {
        combined.throwIfAborted();
        while (true) {
            const next = await Promise.race([iterator.next(), aborted]);
            combined.throwIfAborted();
            if (next.done)
                return;

            if (next.value.type === ASSISTANT_EVENT.COMPLETED) {
                if (timer)
                    clearTimeout(timer);

                combined.removeEventListener("abort", onAbort);
                yield next.value;

                return;
            }

            yield next.value;
        }
    } finally {
        if (timer)
            clearTimeout(timer);

        combined.removeEventListener("abort", onAbort);
        // Do not wait for a provider that ignores cancellation to close its iterator.
        void iterator.return?.().catch(() => undefined);
    }
}
