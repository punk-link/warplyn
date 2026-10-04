import { useEffect, useRef, useState } from "react";
import type { Translation } from "./translations-view-types.js";


export function translationResultId(result: Translation): string {
    return result.resultId ?? result.editorialArtifactId ?? result.metadata.targetLanguage;
}


export function useTranslationResultSelection(translations: readonly Translation[], preferredLanguage?: string, selectLanguage?: (language: string) => void, languages = translations.map((result) => result.metadata.targetLanguage)) {
    const [selectedIds, setSelectedIds] = useState<Record<string, string>>({});
    const seen = useRef<Set<string>>();
    const [completedLanguage, setCompletedLanguage] = useState<string>();

    useEffect(() => {
        const ids = new Set(translations.map(translationResultId));
        const newest = translations.filter((result) => !seen.current?.has(translationResultId(result))).at(-1);
        if (seen.current && newest) {
            setSelectedIds((current) => ({ ...current, [newest.metadata.targetLanguage]: translationResultId(newest) }));
            setCompletedLanguage(newest.metadata.targetLanguage);
            selectLanguage?.(newest.metadata.targetLanguage);
        }

        if (seen.current || ids.size)
            seen.current = ids;
    }, [translations, selectLanguage]);

    const language = [preferredLanguage, completedLanguage, translations.at(-1)?.metadata.targetLanguage, languages.at(-1)].find((candidate) => candidate !== undefined && languages.includes(candidate));
    const results = translations.filter((result) => result.metadata.targetLanguage === language);
    const translation = results.find((result) => translationResultId(result) === selectedIds[language ?? ""]) ?? results.at(-1);
    const selectResult = (id: string) => {
        if (translation)
            setSelectedIds((current) => ({ ...current, [translation.metadata.targetLanguage]: id }));
    };

    return { translation, language, results, selectResult };
}
