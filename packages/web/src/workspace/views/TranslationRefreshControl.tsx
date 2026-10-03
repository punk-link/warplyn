import { useState } from "react";
import { useIntl } from "react-intl";
import type { ArticleSummary } from "@skladno/shared";
import { Button, Dialog, Select } from "../../ui/primitives.js";
import { getProviderLanguageName } from "../state/editorial-language.js";
import type { Translation } from "./translations-view-types.js";
import type { TranslationsActions } from "./translations-view-actions.js";


export function TranslationRefreshControl({ translation, linkedTranslations, stale, create }: {
    translation: Translation;
    linkedTranslations: readonly ArticleSummary[];
    stale: boolean;
    create: TranslationsActions["create"];
}) {
    const intl = useIntl();
    const [selectedId, setSelectedId] = useState("");
    const [target, setTarget] = useState<ArticleSummary>();
    const [applying, setApplying] = useState(false);
    const targets = linkedTranslations.filter((article) => getProviderLanguageName(article.language ?? "") === translation.metadata.targetLanguage);
    if (!targets.length)
        return null;

    const selected = targets.find((article) => article.id === selectedId) ?? targets[0];

    const accept = async () => {
        if (!target)
            return;

        setApplying(true);
        try {
            await create(translation.metadata.targetLanguage, target);
            setTarget(undefined);
        } catch {
            // The application action reports the error; keep the review available.
        } finally {
            setApplying(false);
        }
    };

    return <div className="mt-3">
        <div className="flex flex-wrap items-center gap-2">
            <div className="min-w-0 max-w-full sm:w-64">
                <Select aria-label={intl.formatMessage({ id: "views.translationRefreshTarget" })} value={selected?.id ?? ""} onChange={(event) => setSelectedId(event.target.value)}>
                    {targets.map((article) => <option key={article.id} value={article.id}>{article.title}</option>)}
                </Select>
            </div>
            <Button variant="secondary" disabled={stale || !selected || Boolean(selected.draft)} onClick={() => setTarget(selected)}>{intl.formatMessage({ id: "views.translationRefresh" })}</Button>
        </div>
        {selected?.draft && <p className="mt-1 text-xs text-muted">{intl.formatMessage({ id: "views.translationRefreshDraft" })}</p>}
        {target && <Dialog open className="w-full max-w-[calc(100vw-2rem)] sm:max-w-3xl" aria-labelledby="translation-refresh-title" onCancel={(event) => {
            event.preventDefault();
            if (!applying)
                setTarget(undefined);
        }}>
            <h2 id="translation-refresh-title" className="text-lg font-semibold">{intl.formatMessage({ id: "views.translationRefresh" })}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{intl.formatMessage({ id: "views.translationRefreshDescription" }, { title: target.title, language: translation.metadata.targetLanguage })}</p>
            <div className="mt-5 flex justify-end gap-2">
                <Button variant="secondary" autoFocus disabled={applying} onClick={() => setTarget(undefined)}>{intl.formatMessage({ id: "editor.cancel" })}</Button>
                <Button disabled={stale} state={applying ? "loading" : "default"} onClick={() => void accept()}>{intl.formatMessage({ id: "views.translationRefreshConfirm" })}</Button>
            </div>
        </Dialog>}
    </div>;
}
