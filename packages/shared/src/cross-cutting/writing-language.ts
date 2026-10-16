export function normalizeWritingLanguage(value: unknown): string | undefined {
    if (typeof value !== "string" || !value.trim() || value.length > 100)
        return undefined;

    const aliases: Record<string, string> = {
        english: "en", spanish: "es", portuguese: "pt", russian: "ru", french: "fr", german: "de", italian: "it",
    };
    const candidate = aliases[value.trim().toLowerCase()] ?? value.trim();
    try {
        return Intl.getCanonicalLocales(candidate)[0];
    } catch {
        return undefined;
    }
}
