import { useId, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { articleLanguages, normalizeArticleLanguage } from "@skladno/shared";
import { Button } from "./primitives.js";
import { TranslationLanguageInput } from "./TranslationLanguageInput.js";

const languageMessageIds = {
    en: "languages.english", es: "languages.spanish", pt: "languages.portuguese", ru: "languages.russian",
    fr: "languages.french", de: "languages.german", it: "languages.italian",
} as const;


export function TranslationLanguagePicker({ selected, sourceLanguage, change, existing = [] }: {
    selected: readonly string[];
    sourceLanguage: string;
    change: (languages: string[]) => void;
    existing?: readonly string[];
}) {
    const intl = useIntl();
    const hintId = useId();
    const input = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState("");
    const label = (language: string) => {
        const common = articleLanguages.find((item) => item === language);
        return common ? intl.formatMessage({ id: languageMessageIds[common] }) : language;
    };

    const candidates = [...new Set([...articleLanguages, ...existing])];
    const normalized = normalizeArticleLanguage(query);
    const matching = candidates.find((language) => label(language).toLocaleLowerCase() === query.trim().toLocaleLowerCase());
    const target = matching ?? normalized;
    const excluded = [sourceLanguage, ...selected];
    const canAdd = target && !excluded.some((language) => language.toLocaleLowerCase() === target.toLocaleLowerCase());
    const add = () => {
        if (!canAdd)
            return;

        change([...selected, target]);
        setQuery("");
        input.current?.focus();
    };

    return <div>
        <div className="flex items-end gap-2">
            <TranslationLanguageInput
                inputRef={input}
                label={intl.formatMessage({ id: "translationLanguages.search" })}
                placeholder={intl.formatMessage({ id: "translationLanguages.placeholder" })}
                describedBy={hintId}
                value={query}
                options={candidates.filter((language) => !excluded.includes(language)).map(label)}
                change={setQuery} />
            <Button
                className="self-end"
                variant="quiet"
                disabled={!canAdd}
                onClick={add}>
                {intl.formatMessage({ id: "translationLanguages.add" })}
            </Button>
        </div>
        <p id={hintId} className="mt-2 text-xs text-muted">{intl.formatMessage({ id: "translationLanguages.entryHint" })}</p>
        {selected.length > 0 && (
            <ul className={"mt-4 max-h-64 divide-y divide-border overflow-y-auto border-b border-border " +
                "[scrollbar-color:var(--color-border-strong)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 " +
                "[&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border-strong"}>
                {selected.map((language) => (
                    <li key={language} className="flex min-h-9 items-center justify-between gap-3 py-2.5 text-sm">
                        <span className="min-w-0 break-words text-sm text-ink">{label(language)}
                            {existing.includes(language) && (
                                <span className="block text-xs text-muted">
                                    {intl.formatMessage({ id: "translationLanguages.existing" })}
                                </span>
                            )}
                        </span>
                        <Button variant="quiet" aria-label={intl.formatMessage({ id: "translationLanguages.remove" }, { language: label(language) })}
                            onClick={() => {
                                change(selected.filter((item) => item !== language));
                                input.current?.focus();
                            }}>
                            {intl.formatMessage({ id: "settings.remove" })}
                        </Button>
                    </li>
                ))}
            </ul>
        )}
    </div>;
}
