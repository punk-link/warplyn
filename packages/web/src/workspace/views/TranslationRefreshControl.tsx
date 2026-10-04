import { useLayoutEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import type { ArticleSummary } from "@skladno/shared";
import { Button, Dialog, Select } from "../../ui/primitives.js";
import { getProviderLanguageName } from "../state/editorial-language.js";
import type { Translation } from "./translations-view-types.js";
import type { TranslationsActions } from "./translations-view-actions.js";
import { translationResultId } from "./translation-result-selection.js";


export function TranslationRefreshControl({ translation, linkedTranslations, stale, create }: {
    translation: Translation;
    linkedTranslations: readonly ArticleSummary[];
    stale: boolean;
    create: TranslationsActions["create"];
}) {
    const intl = useIntl();
    const [target, setTarget] = useState<ArticleSummary>();
    const [applying, setApplying] = useState(false);
    const dialog = useRef<HTMLDialogElement>(null);
    const cancel = useRef<HTMLButtonElement>(null);
    const confirmationOpen = Boolean(target);
    useLayoutEffect(() => {
        if (!confirmationOpen)
            return;

        const trigger = document.activeElement;
        const element = dialog.current;
        if (element && typeof element.showModal === "function")
            element.showModal();
        else
            element?.setAttribute("open", "");

        cancel.current?.focus();
        return () => {
            if (element?.open && typeof element.close === "function")
                element.close();

            if (trigger instanceof HTMLElement && trigger.isConnected)
                trigger.focus();
        };
    }, [confirmationOpen]);
    const targets = linkedTranslations.filter((article) => getProviderLanguageName(article.language ?? "") === translation.metadata.targetLanguage);
    if (!targets.length)
        return null;

    const selected = targets.find((article) => !article.draft) ?? targets[0];

    const accept = async () => {
        if (!target || stale || !targets.some((article) => article.id === target.id && article.currentRevisionId === target.currentRevisionId && !article.draft))
            return;

        setApplying(true);
        try {
            await create(translationResultId(translation), target);
            setTarget(undefined);
        } catch {
            // Keep the confirmation open so the Author can retry the failed refresh.
        } finally {
            setApplying(false);
        }
    };

    return <>
        <Button variant="secondary" disabled={stale || !selected || Boolean(selected.draft)} aria-describedby={selected?.draft ? "translation-refresh-draft" : undefined} onClick={() => setTarget(selected)}>{intl.formatMessage({ id: "views.translationRefresh" })}</Button>
        {selected?.draft && <p id="translation-refresh-draft" className="text-xs text-muted">{intl.formatMessage({ id: "views.translationRefreshDraft" })}</p>}
        {target && <Dialog ref={dialog} className="w-full max-w-[calc(100vw-2rem)] sm:max-w-3xl" aria-labelledby="translation-refresh-title" onCancel={(event) => {
            event.preventDefault();
            if (!applying)
                setTarget(undefined);
        }}>
            <h2 id="translation-refresh-title" className="text-lg font-semibold">{intl.formatMessage({ id: "views.translationRefreshTitle" })}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{intl.formatMessage({ id: "views.translationRefreshDescription" }, { title: target.title, language: translation.metadata.targetLanguage })}</p>
            {targets.length > 1 && <div className="mt-3">
                <Select aria-label={intl.formatMessage({ id: "views.translationRefreshTarget" })} value={target.id} disabled={applying} onChange={(event) => setTarget(targets.find((article) => article.id === event.target.value))}>
                    {targets.map((article) => <option key={article.id} value={article.id}>{intl.formatMessage({ id: "views.translationLinkedTarget" }, { title: article.title, articleId: article.id, revisionId: article.sourceRevisionNumber ?? article.sourceRevisionId ?? "" })}</option>)}
                </Select>
            </div>}
            <div className="mt-5 flex justify-end gap-2">
                <Button ref={cancel} variant="secondary" disabled={applying} onClick={() => setTarget(undefined)}>{intl.formatMessage({ id: "editor.cancel" })}</Button>
                <Button disabled={stale || Boolean(target.draft)} state={applying ? "loading" : "default"} onClick={() => void accept()}>{intl.formatMessage({ id: "views.translationRefreshConfirm" })}</Button>
            </div>
        </Dialog>}
    </>;
}
