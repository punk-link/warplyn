import { normalizeArticleLanguage } from "@skladno/shared";


export function getTargetLanguageId(language: string): string {
    const ids: Record<string, string> = {
        English: "en",
        Spanish: "es",
        Portuguese: "pt",
        Russian: "ru",
        French: "fr",
        German: "de",
        Italian: "it"
    };

    return ids[language] ?? normalizeArticleLanguage(language) ?? language;
}


export function getProviderLanguageName(languageId: string): string {
    const normalized = normalizeArticleLanguage(languageId) ?? languageId;
    const names: Record<string, string> = {
        en: "English",
        es: "Spanish",
        pt: "Portuguese",
        ru: "Russian",
        fr: "French",
        de: "German",
        it: "Italian"
    };

    return names[normalized] ?? normalized;
}
