import { normalizeWritingLanguage } from "@skladno/shared";


export function getDisplayLanguageName(languageId: string, locale: string): string {
    const normalized = normalizeWritingLanguage(languageId);
    if (!normalized)
        return languageId;

    const localName = new Intl.DisplayNames([locale], { type: "language" }).of(normalized);
    const englishName = new Intl.DisplayNames(["en"], { type: "language" }).of(normalized);
    if (!localName || !englishName)
        return languageId;

    return localName === englishName ? localName : `${localName} (${englishName})`;
}
