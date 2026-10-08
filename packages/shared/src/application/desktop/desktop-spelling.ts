export const desktopSpellingChannel = "warplyn:desktop-spelling";
export const desktopSpellingLanguageChannel = "warplyn:desktop-spelling-language";

export type DictionaryState = "unverified" | "preparing" | "ready" | "failed" | "unloaded";


export interface DesktopSpellingSnapshot {
    dictionaries: {
        supported: string[];
        requested: string[];
        states: Record<string, DictionaryState>;
    };
    personal: { words: string[]; failed: string[]; affectsSystem: boolean };
}


export type DesktopSpellingRequest =
    | { method: "snapshot" }
    | { method: "prepare"; languages: string[] }
    | { method: "unload"; language: string }
    | { method: "addWords"; words: string[] }
    | { method: "removeWord"; word: string };


export type DesktopSpellingResult =
    | { ok: true; value: DesktopSpellingSnapshot }
    | { ok: false };


export interface DesktopSpellingClient {
    setArticleLanguage(language: string | null): void;
    request(request: DesktopSpellingRequest): Promise<DesktopSpellingResult>;
}


export function isSpellingLanguage(value: unknown): value is string {
    return typeof value === "string" && /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8}){0,2}$/.test(value);
}


export function isPersonalSpellingWord(value: unknown): value is string {
    return typeof value === "string" && value.length > 0 && value === value.trim()
        && Array.from(value).length <= 128 && !/[\p{Cc}\p{Zl}\p{Zp}]/u.test(value);
}


export function isDesktopSpellingRequest(value: unknown): value is DesktopSpellingRequest {
    if (!value || typeof value !== "object" || !("method" in value))
        return false;

    switch (value.method) {
        case "snapshot":
            return true;
        case "prepare":
            return "languages" in value && Array.isArray(value.languages) && value.languages.length <= 100 && value.languages.every(isSpellingLanguage);
        case "unload":
            return "language" in value && isSpellingLanguage(value.language);
        case "addWords":
            return "words" in value && Array.isArray(value.words) && value.words.length <= 500
                && value.words.every((word: unknown) => typeof word === "string" && word.length <= 256)
                && new TextEncoder().encode(value.words.join("\n")).length <= 65_536;
        case "removeWord":
            return "word" in value && isPersonalSpellingWord(value.word);
        default:
            return false;
    }
}


export function isDesktopSpellingResult(value: unknown): value is DesktopSpellingResult {
    if (!value || typeof value !== "object" || !("ok" in value))
        return false;

    if (value.ok === false)
        return true;

    if (value.ok !== true || !("value" in value))
        return false;

    return isSnapshot(value.value);
}


function isStringList(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item: unknown) => typeof item === "string");
}


function isSnapshot(value: unknown): value is DesktopSpellingSnapshot {
    if (!value || typeof value !== "object" || !("dictionaries" in value) || !("personal" in value))
        return false;

    const { dictionaries, personal } = value;
    if (!dictionaries || typeof dictionaries !== "object" || !personal || typeof personal !== "object")
        return false;

    return "supported" in dictionaries && isStringList(dictionaries.supported)
        && "requested" in dictionaries && isStringList(dictionaries.requested)
        && "states" in dictionaries && isStates(dictionaries.states)
        && "words" in personal && isStringList(personal.words)
        && "failed" in personal && isStringList(personal.failed)
        && "affectsSystem" in personal && typeof personal.affectsSystem === "boolean";
}


function isStates(value: unknown): value is Record<string, DictionaryState> {
    return value !== null && typeof value === "object" && !Array.isArray(value)
        && Object.values(value).every((state: unknown) => state === "unverified" || state === "preparing" || state === "ready" || state === "failed" || state === "unloaded");
}
