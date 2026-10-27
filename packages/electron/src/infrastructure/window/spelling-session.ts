import type { Session } from "electron";
import { isPersonalSpellingWord, type DesktopSpellingSnapshot, type DictionaryState } from "@skladno/shared";
import { SpellingDictionaryPreparation } from "./spelling-dictionary-preparation.js";

type DictionaryEvent = "spellcheck-dictionary-initialized" | "spellcheck-dictionary-download-begin" | "spellcheck-dictionary-download-failure";
type NativeSpellingSession = Pick<Session, "availableSpellCheckerLanguages" | "setSpellCheckerEnabled" | "setSpellCheckerLanguages" | "listWordsInSpellCheckerDictionary" | "addWordToSpellCheckerDictionary" | "removeWordFromSpellCheckerDictionary"> & {
    on(event: DictionaryEvent, listener: (_event: unknown, language: string) => void): unknown;
    removeListener(event: DictionaryEvent, listener: (_event: unknown, language: string) => void): unknown;
};


export class SpellingSession {
    private readonly preparation: SpellingDictionaryPreparation;


    private readonly fallback: string[];


    private articleLanguages: string[] | undefined;


    private readonly initialized = (_event: unknown, language: string) => this.recordState(language, "ready");


    private readonly downloading = (_event: unknown, language: string) => this.recordState(language, "preparing");


    private readonly failed = (_event: unknown, language: string) => this.recordState(language, "failed");


    constructor(private readonly session: NativeSpellingSession, runtimePath: string, private readonly platform: string, preferredLanguages: string[]) {
        this.fallback = this.resolveFallback(preferredLanguages);
        this.preparation = new SpellingDictionaryPreparation(runtimePath, this.supported);
        session.on("spellcheck-dictionary-initialized", this.initialized);
        session.on("spellcheck-dictionary-download-begin", this.downloading);
        session.on("spellcheck-dictionary-download-failure", this.failed);
        this.activate(this.fallback);
    }


    get supported(): string[] {
        return this.session.availableSpellCheckerLanguages;
    }


    setArticleLanguage(language: string | null): void {
        this.preparation.stop();
        this.articleLanguages = language === null ? undefined : this.resolveLanguage(language);
        this.activate(this.articleLanguages ?? this.fallback);
    }


    prepare(languages: string[]): void {
        if (this.articleLanguages || languages.some((language) => !this.supported.includes(language)))
            throw new Error("Invalid dictionary preparation");

        const requested = this.preparation.prepare(languages);
        this.activate(requested.length ? requested : this.fallback);
        this.preparation.startTimeout();
    }


    async snapshot(failed: string[] = []): Promise<DesktopSpellingSnapshot> {
        return {
            dictionaries: { supported: [...this.supported], ...this.preparation.snapshot() },
            personal: { words: (await this.session.listWordsInSpellCheckerDictionary()).sort(), failed, affectsSystem: this.platform === "win32" || this.platform === "darwin" },
        };
    }


    unload(language: string): void {
        if (this.articleLanguages || this.platform === "darwin" || !this.supported.includes(language))
            throw new Error("Invalid dictionary unload");

        const remaining = this.preparation.activeLanguagesExcept(language);
        this.session.setSpellCheckerLanguages(remaining);
        this.session.setSpellCheckerEnabled(remaining.length > 0);
        this.preparation.unload(language);
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
        this.preparation.stop();
        this.session.removeListener("spellcheck-dictionary-initialized", this.initialized);
        this.session.removeListener("spellcheck-dictionary-download-begin", this.downloading);
        this.session.removeListener("spellcheck-dictionary-download-failure", this.failed);
    }


    private recordState(language: string, state: DictionaryState): void {
        if (this.supported.includes(language))
            this.preparation.recordState(language, state);
    }


    private activate(languages: string[]): void {
        this.preparation.clearUnloaded();
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
        const selected = matches.find((candidate) => candidate === language) ??
            matches.find((candidate) => preferred.includes(candidate)) ??
            matches.find((candidate) => candidate === defaults[language]) ?? matches.sort()[0];

        return selected ? [selected] : [];
    }
}
