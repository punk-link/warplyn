import type { Session } from "electron";
import { isPersonalSpellingWord, type DesktopSpellingSnapshot, type DictionaryState } from "@skladno/shared";
import { readRuntimeSettings, updateRuntimeSettings } from "../runtime/runtime-settings.js";

type DictionaryEvent = "spellcheck-dictionary-initialized" | "spellcheck-dictionary-download-begin" | "spellcheck-dictionary-download-failure";
type NativeSpellingSession = Pick<Session, "availableSpellCheckerLanguages" | "setSpellCheckerEnabled" | "setSpellCheckerLanguages" | "listWordsInSpellCheckerDictionary" | "addWordToSpellCheckerDictionary" | "removeWordFromSpellCheckerDictionary"> & {
    on(event: DictionaryEvent, listener: (_event: unknown, language: string) => void): unknown;
    removeListener(event: DictionaryEvent, listener: (_event: unknown, language: string) => void): unknown;
};


export class SpellingSession {
    private readonly states = new Map<string, DictionaryState>();


    private readonly fallback: string[];


    private requested: string[];


    private articleLanguages: string[] | undefined;


    private timer: ReturnType<typeof setTimeout> | undefined;


    private readonly initialized = (_event: unknown, language: string) => this.recordState(language, "ready");


    private readonly downloading = (_event: unknown, language: string) => this.recordState(language, "preparing");


    private readonly failed = (_event: unknown, language: string) => this.recordState(language, "failed");


    constructor(private readonly session: NativeSpellingSession, private readonly runtimePath: string, private readonly platform: string, preferredLanguages: string[]) {
        this.fallback = this.resolveFallback(preferredLanguages);
        this.requested = (readRuntimeSettings(runtimePath).spelling?.preloadLanguages ?? []).filter((language) => this.supported.includes(language));
        session.on("spellcheck-dictionary-initialized", this.initialized);
        session.on("spellcheck-dictionary-download-begin", this.downloading);
        session.on("spellcheck-dictionary-download-failure", this.failed);
        this.activate(this.fallback);
    }


    get supported(): string[] {
        return this.session.availableSpellCheckerLanguages;
    }


    setArticleLanguage(language: string | null): void {
        this.stopPreparation();
        this.articleLanguages = language === null ? undefined : this.resolveLanguage(language);
        this.activate(this.articleLanguages ?? this.fallback);
    }


    prepare(languages: string[]): void {
        if (this.articleLanguages || languages.some((language) => !this.supported.includes(language)))
            throw new Error("Invalid dictionary preparation");

        this.stopPreparation();
        const requested = [...new Set([...languages, ...this.requested])];
        updateRuntimeSettings(this.runtimePath, (current) => ({ ...current, spelling: { preloadLanguages: requested } }));
        this.requested = requested;
        for (const language of requested) {
            if (this.states.get(language) !== "ready")
                this.states.set(language, "preparing");
        }

        this.activate(requested.length ? requested : this.fallback);
        this.timer = setTimeout(() => this.stopPreparation(), 30_000);
        this.timer.unref();
    }


    async snapshot(failed: string[] = []): Promise<DesktopSpellingSnapshot> {
        return {
            dictionaries: { supported: [...this.supported], requested: [...this.requested], states: Object.fromEntries(this.states) },
            personal: { words: (await this.session.listWordsInSpellCheckerDictionary()).sort(), failed, affectsSystem: this.platform === "win32" || this.platform === "darwin" },
        };
    }


    unload(language: string): void {
        if (this.articleLanguages || this.platform === "darwin" || !this.supported.includes(language))
            throw new Error("Invalid dictionary unload");

        const remaining = [...this.states].filter(([code, state]) => code !== language && (state === "ready" || state === "preparing")).map(([code]) => code);
        this.session.setSpellCheckerLanguages(remaining);
        // An empty language list otherwise falls back to en-US in Electron.
        this.session.setSpellCheckerEnabled(remaining.length > 0);
        const requested = this.requested.filter((code) => code !== language);
        updateRuntimeSettings(this.runtimePath, (current) => ({ ...current, spelling: { preloadLanguages: requested } }));
        this.requested = requested;
        this.states.set(language, "unloaded");
    }


    async addWords(words: string[]): Promise<string[]> {
        const existing = new Set(await this.session.listWordsInSpellCheckerDictionary());
        const failed: string[] = [];
        for (const word of new Set(words.map((word) => word.trim()))) {
            if (!isPersonalSpellingWord(word)) {
                failed.push(word);
                continue;
            }

            if (existing.has(word))
                continue;

            try {
                if (!this.session.addWordToSpellCheckerDictionary(word))
                    failed.push(word);
            } catch {
                failed.push(word);
            }
        }

        return failed;
    }


    removeWord(word: string): void {
        if (!this.session.removeWordFromSpellCheckerDictionary(word))
            throw new Error("Personal word removal failed");
    }


    dispose(): void {
        this.stopPreparation();
        this.session.removeListener("spellcheck-dictionary-initialized", this.initialized);
        this.session.removeListener("spellcheck-dictionary-download-begin", this.downloading);
        this.session.removeListener("spellcheck-dictionary-download-failure", this.failed);
    }


    private recordState(language: string, state: DictionaryState): void {
        if (this.supported.includes(language) && this.states.get(language) !== "unloaded")
            this.states.set(language, state);
    }


    private stopPreparation(): void {
        clearTimeout(this.timer);
        this.timer = undefined;
        for (const [language, state] of this.states) {
            if (state === "preparing")
                this.states.set(language, "failed");
        }
    }


    private activate(languages: string[]): void {
        for (const [language, state] of this.states) {
            if (state === "unloaded")
                this.states.delete(language);
        }

        this.session.setSpellCheckerEnabled(true);
        if (this.platform !== "darwin")
            this.session.setSpellCheckerLanguages(languages);
    }


    private resolveFallback(preferred: string[]): string[] {
        const resolved = [...new Set(preferred.flatMap((language) => this.matchLanguage(language, preferred)))];
        if (resolved.length)
            return resolved;

        return this.supported.includes("en-US") ? ["en-US"] : this.supported.slice(0, 1);
    }


    private resolveLanguage(language: string): string[] {
        const matched = this.matchLanguage(language, this.fallback);
        return matched.length ? matched : this.fallback;
    }


    private matchLanguage(language: string, preferred: string[]): string[] {
        const matches = this.supported.filter((candidate) => candidate.split("-")[0] === language.split("-")[0]);
        const defaults: Record<string, string> = { en: "en-US", es: "es-ES", pt: "pt-BR" };
        const selected = matches.find((candidate) => candidate === language)
            ?? matches.find((candidate) => preferred.includes(candidate))
            ?? matches.find((candidate) => candidate === defaults[language]) ?? matches.sort()[0];

        return selected ? [selected] : [];
    }
}
