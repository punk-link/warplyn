import { useIntl } from "react-intl";
import { useId, useState } from "react";
import { Button, Field, TextareaField } from "../../ui/primitives.js";
import { SettingsGroup, SettingRow } from "./SettingRow.js";
import { useSpellingSettings } from "../use-spelling-settings.js";
import type { DictionaryState } from "@skladno/shared";
import type { MessageId } from "../../i18n/messages.js";

const stateMessages: Record<DictionaryState, MessageId> = {
    unverified: "spelling.unverified", preparing: "spelling.preparing", ready: "spelling.ready", failed: "spelling.failed", unloaded: "spelling.unloaded",
};


export function SpellingSettingsSection() {
    const intl = useIntl();
    const spelling = useSpellingSettings();
    const { snapshot, busy } = spelling;
    const [languageSearch, setLanguageSearch] = useState("");
    const wordsHintId = useId();
    if (!spelling.available)
        return <p className="mt-6 text-sm text-muted">{intl.formatMessage({ id: "spelling.desktopOnly" })}</p>;

    const names = new Intl.DisplayNames([intl.locale], { type: "language" });
    const query = languageSearch.trim().toLocaleLowerCase(intl.locale);
    const languages = (snapshot?.dictionaries.supported ?? [])
        .map((code) => ({ code, label: intl.formatMessage({ id: "spelling.languageVariant" }, { language: names.of(code) ?? code, code }), downloaded: snapshot?.dictionaries.states[code] === "ready" }))
        .filter((language) => language.label.toLocaleLowerCase(intl.locale).includes(query))
        .sort((left, right) => Number(right.downloaded) - Number(left.downloaded) || left.label.localeCompare(right.label, intl.locale));
    const words = snapshot?.personal.words.filter((word) => word.toLocaleLowerCase(intl.locale).includes(spelling.search.toLocaleLowerCase(intl.locale))) ?? [];
    return <>
        <p className="mt-4 text-sm text-muted">{intl.formatMessage({ id: "spelling.localHint" })}</p>
        <p className="mt-3 text-sm" role="status">{intl.formatMessage({ id: spelling.status })}</p>
        {!snapshot && <Button variant="quiet" disabled={busy} onClick={() => void spelling.retryLoad()}>{intl.formatMessage({ id: "spelling.retry" })}</Button>}
        <SettingsGroup className="mt-6 pt-6" label={intl.formatMessage({ id: "spelling.dictionaries" })}>
            <div className="mt-4 border-l border-border-strong pl-4">
                <SettingRow className="border-none" layout="stacked" headingLevel={3} label={intl.formatMessage({ id: "spelling.preload" })} hint={intl.formatMessage({ id: "spelling.preloadHint" })} action={<Button variant="quiet" disabled={busy || !snapshot || !spelling.selected.length} onClick={() => void spelling.prepare()}>{intl.formatMessage({ id: "spelling.download" })}</Button>}>
                    <div>
                        <label className="mb-3 block text-sm font-medium">
                            {intl.formatMessage({ id: "spelling.filterLanguages" })}
                            <Field type="search" value={languageSearch} onChange={(event) => setLanguageSearch(event.target.value)} className="mt-2 w-full" />
                        </label>
                        <fieldset disabled={busy} className="max-h-64 divide-y divide-border overflow-y-auto border-b border-border" aria-label={intl.formatMessage({ id: "spelling.dictionaries" })}>
                            {languages.map(({ code: language, label, downloaded }) => <div key={language} className="flex min-h-9 items-center gap-2 py-2.5 text-sm">
                                {downloaded ? <span className="min-w-0 flex-1">{label}</span> : <label className="flex min-w-0 flex-1 items-center gap-2">
                                    <input type="checkbox" className="size-4 accent-brand" disabled={snapshot?.dictionaries.states[language] === "preparing"} checked={spelling.selected.includes(language)} onChange={(event) => spelling.setSelected((current) => event.target.checked ? [...current, language] : current.filter((item) => item !== language))} />
                                    <span>{label}</span>
                                </label>}
                                <span className="shrink-0 text-xs text-muted" role={spelling.selected.includes(language) ? "status" : undefined}>{intl.formatMessage({ id: stateMessages[snapshot?.dictionaries.states[language] ?? "unverified"] })}</span>
                                {downloaded && <Button variant="quiet" disabled={busy} aria-label={intl.formatMessage({ id: "spelling.unloadLanguage" }, { language: label })} onClick={() => void spelling.unload(language)}>{intl.formatMessage({ id: "spelling.unload" })}</Button>}
                            </div>)}
                        </fieldset>
                        {snapshot && !languages.length && <p className="mt-2 text-sm text-muted">{intl.formatMessage({ id: "spelling.noLanguages" })}</p>}
                    </div>
                </SettingRow>
            </div>
        </SettingsGroup>
        <SettingsGroup className="mt-6 pt-6" label={intl.formatMessage({ id: "spelling.personal" })}>
            <div className="mt-4 border-l border-border-strong pl-4">
                <p className="mt-2 text-sm text-muted">
                    {intl.formatMessage({ id: "spelling.personalHint" })}
                    {snapshot?.personal.affectsSystem && <> {intl.formatMessage({ id: "spelling.systemHint" })}</>}
                </p>
                <section className="border-b border-border py-4">
                    <h3 className="text-sm font-semibold">{intl.formatMessage({ id: "spelling.addWords" })}</h3>
                    <TextareaField aria-label={intl.formatMessage({ id: "spelling.addWords" })} aria-describedby={wordsHintId} value={spelling.input} onChange={(event) => spelling.setInput(event.target.value)} disabled={busy} className="mt-4 min-h-24 w-full" />
                    <div className="mt-3 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                        <Button className="shrink-0" variant="quiet" disabled={busy || !snapshot || !spelling.input.trim()} onClick={() => void spelling.addWords()}>{intl.formatMessage({ id: "spelling.add" })}</Button>
                        <p id={wordsHintId} className="min-w-0 flex-1 text-xs leading-5 text-muted">{intl.formatMessage({ id: "spelling.wordsHint" })}</p>
                    </div>
                </section>
                <SettingRow className="border-none" layout="stacked" headingLevel={3} label={intl.formatMessage({ id: "spelling.savedWords" })} hint={intl.formatMessage({ id: "spelling.searchHint" })}>
                    <Field aria-label={intl.formatMessage({ id: "spelling.search" })} value={spelling.search} onChange={(event) => spelling.setSearch(event.target.value)} className="w-full" />
                </SettingRow>
                <ul className="max-h-64 divide-y divide-border overflow-y-auto border-b border-border" aria-label={intl.formatMessage({ id: "spelling.savedWords" })}>
                    {words.map((word) => <li key={word} className="flex min-h-9 items-center justify-between gap-3 py-2.5 text-sm">
                        <span className="min-w-0 break-words">{word}</span>
                        <Button variant="quiet" disabled={busy} aria-label={intl.formatMessage({ id: "spelling.removeWord" }, { word })} onClick={() => void spelling.removeWord(word)}>{intl.formatMessage({ id: "spelling.remove" })}</Button>
                    </li>)}
                </ul>
                {!words.length && <p className="mt-2 text-sm text-muted">{intl.formatMessage({ id: "spelling.noWords" })}</p>}
            </div>
        </SettingsGroup>
        <p className="mt-6 text-sm text-muted">{intl.formatMessage({ id: "spelling.persistenceHint" })}</p>
    </>;
}
