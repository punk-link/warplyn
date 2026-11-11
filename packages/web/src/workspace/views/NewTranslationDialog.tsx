import { useLayoutEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { type Article } from "@skladno/shared";
import { Banner, Button, Dialog } from "../../ui/primitives.js";
import { getProviderLanguageName, getTargetLanguageId } from "../state/editorial-language.js";
import { TranslationLanguagePicker } from "../../ui/TranslationLanguagePicker.js";


export function NewTranslationDialog({ article, content, defaults, viewedLanguage, revisionNumber, active, close, generate, existing }: {
    article: Article;
    content: string;
    defaults: readonly string[];
    viewedLanguage?: string;
    revisionNumber?: number;
    active: boolean;
    close: () => void;
    generate: (languages: readonly string[]) => void;
    existing: readonly string[];
}) {
    const intl = useIntl();
    const viewed = viewedLanguage ? getTargetLanguageId(viewedLanguage) : undefined;
    const [languages, setLanguages] = useState<readonly string[]>(viewed && viewed !== article.language ? [viewed] : defaults);
    const snapshot = JSON.stringify([article.id, article.currentRevisionId, article.title, article.language, content]);
    const [reviewedSnapshot, setReviewedSnapshot] = useState(snapshot);
    const changed = snapshot !== reviewedSnapshot;
    const submitted = useRef(false);
    const dialog = useRef<HTMLDialogElement>(null);
    const cancel = useRef<HTMLButtonElement>(null);

    useLayoutEffect(() => {
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
            else
                element?.removeAttribute("open");

            if (trigger instanceof HTMLElement && trigger.isConnected)
                trigger.focus();
        };
    }, []);

    const selected = languages.filter((language) => language !== article.language);
    const confirm = () => {
        if (active || changed || !selected.length || submitted.current)
            return;

        submitted.current = true;
        generate(selected);
        close();
    };

    return <Dialog
        ref={dialog}
        className={"w-full max-w-[calc(100vw-2rem)] sm:max-w-3xl " +
            "[scrollbar-color:var(--color-border-strong)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 " +
            "[&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border-strong"}
        aria-labelledby="new-translation-title"
        onCancel={(event) => {
            event.preventDefault();
            close();
        }}>
        <h2 id="new-translation-title" className="text-lg font-semibold">{intl.formatMessage({ id: "views.translationDialogTitle" })}</h2>
        <p className="mt-2 text-sm leading-6 text-muted">{intl.formatMessage({ id: "views.translationGenerateDescription" }, { title: article.title.trim() || intl.formatMessage({ id: "article.defaultTitle" }), revisionId: revisionNumber ?? article.currentRevisionId })}</p>
        {content !== article.currentRevision.content && <p className="mt-2 text-sm text-muted">{intl.formatMessage({ id: "views.translationGenerateDraft" })}</p>}
        {changed && <Banner tone="warning" className="mt-3">{intl.formatMessage({ id: "views.translationContextChanged" })}</Banner>}
        <fieldset className="mt-4">
            <legend className="sr-only">{intl.formatMessage({ id: "views.translationGenerateTargets" })}</legend>
            <TranslationLanguagePicker
                selected={selected}
                sourceLanguage={article.language ?? ""}
                change={setLanguages}
                existing={existing.map(getTargetLanguageId)} />
        </fieldset>
        <p className="mt-3 text-xs leading-5 text-muted">{intl.formatMessage({ id: "views.translationPreservation" })}</p>
        <p className="mt-2 text-xs text-muted">{intl.formatMessage({ id: "translationLanguages.hint" })}</p>
        {(active || !selected.length) && (
            <p className="mt-2 text-sm text-muted" role="status">
                {intl.formatMessage({ id: active ? "views.translationGenerationActive" : "views.translationChooseTargets" })}
            </p>
        )}
        <div className="mt-5 flex flex-wrap justify-end gap-2">
            <Button ref={cancel} variant="secondary" onClick={close}>{intl.formatMessage({ id: "editor.cancel" })}</Button>
            {changed && <Button variant="secondary" onClick={() => setReviewedSnapshot(snapshot)}>{intl.formatMessage({ id: "views.translationReviewSource" })}</Button>}
            <Button disabled={active || changed || !selected.length} onClick={confirm}>{selected.length === 1
                ? intl.formatMessage({ id: "views.translationGenerateConfirm" }, { languages: selected.map(getProviderLanguageName).join(", ") })
                : intl.formatMessage({ id: "views.translationGenerateBatch" }, { count: selected.length })}
            </Button>
        </div>
    </Dialog>;
}
