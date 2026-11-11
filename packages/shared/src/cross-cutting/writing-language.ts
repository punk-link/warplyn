export function normalizeWritingLanguage(value: unknown): string | undefined {
    if (typeof value !== "string" || !value.trim() || value.length > 100)
        return undefined;

    const aliases: Record<string, string> = {
        english: "en",
        spanish: "es",
        portuguese: "pt",
        russian: "ru",
        french: "fr",
        german: "de",
        italian: "it",
    };

    const candidate = aliases[value.trim().toLowerCase()] ?? value.trim();

    try {
        return Intl.getCanonicalLocales(candidate)[0];
    } catch {
        return undefined;
    }
}


/** Article language names may include Author-specified regional preferences. */
export function normalizeArticleLanguage(value: unknown): string | undefined {
    if (typeof value !== "string" || !value.trim() || value.length > 100 || [...value].some((character) => character.charCodeAt(0) < 32))
        return undefined;

    const name = value.trim();
    const normalized = normalizeWritingLanguage(name);
    const languageCodePattern = /^[a-z]{2,3}(?:-|$)/iu;

    if (normalized && (normalized !== name.toLowerCase() || languageCodePattern.test(name)))
        return normalized;

    return name;
}
