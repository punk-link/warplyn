import type { DesktopSpellingSnapshot, DictionaryState } from "@skladno/shared";
import { readRuntimeSettings, updateRuntimeSettings } from "../runtime/runtime-settings.js";


export class SpellingDictionaryPreparation {
    private readonly states = new Map<string, DictionaryState>();


    private requested: string[];


    private timer: ReturnType<typeof setTimeout> | undefined;


    constructor(private readonly runtimePath: string, supported: string[]) {
        this.requested = (readRuntimeSettings(runtimePath).spelling?.preloadLanguages ?? []).filter((language) => supported.includes(language));
    }


    snapshot(): Pick<DesktopSpellingSnapshot["dictionaries"], "requested" | "states"> {
        return { requested: [...this.requested], states: Object.fromEntries(this.states) };
    }


    prepare(languages: string[]): string[] {
        this.stop();
        const requested = [...new Set([...languages, ...this.requested])];
        this.saveRequested(requested);
        for (const language of requested) {
            if (this.states.get(language) !== "ready")
                this.states.set(language, "preparing");
        }

        return requested;
    }


    startTimeout(): void {
        this.timer = setTimeout(() => this.stop(), 30_000);
        this.timer.unref();
    }


    stop(): void {
        clearTimeout(this.timer);
        this.timer = undefined;
        for (const [language, state] of this.states) {
            if (state === "preparing")
                this.states.set(language, "failed");
        }
    }


    recordState(language: string, state: DictionaryState): void {
        if (this.states.get(language) !== "unloaded")
            this.states.set(language, state);
    }


    activeLanguagesExcept(language: string): string[] {
        return [...this.states]
            .filter(([code, state]) => code !== language && (state === "ready" || state === "preparing"))
            .map(([code]) => code);
    }


    unload(language: string): void {
        this.saveRequested(this.requested.filter((code) => code !== language));
        this.states.set(language, "unloaded");
    }


    clearUnloaded(): void {
        for (const [language, state] of this.states) {
            if (state === "unloaded")
                this.states.delete(language);
        }
    }


    private saveRequested(requested: string[]): void {
        updateRuntimeSettings(this.runtimePath, (current) => ({ ...current, spelling: { preloadLanguages: requested } }));
        this.requested = requested;
    }
}
