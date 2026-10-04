import { useLayoutEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { articleLanguages, type Article } from "@skladno/shared";
import { Banner, Button, Dialog } from "../../ui/primitives.js";
import { getProviderLanguageName } from "../state/editorial-language.js";

const languageMessageIds = { en: "languages.english", es: "languages.spanish", pt: "languages.portuguese", ru: "languages.russian", fr: "languages.french", de: "languages.german", it: "languages.italian" } as const;


export function NewTranslationDialog({ article, content, defaults, viewedLanguage, revisionNumber, active, close, generate }: {
    article: Article;
    content: string;
    defaults: readonly string[];
    viewedLanguage?: string;
    revisionNumber?: number;
    active: boolean;
    close: () => void;
    generate: (languages: readonly string[]) => void;
}) {
    const intl = useIntl();
    const supported = articleLanguages.filter((language) => language !== article.language);
    const viewed = supported.find((language) => getProviderLanguageName(language) === viewedLanguage);
    const [languages, setLanguages] = useState<readonly string[]>(viewed && supported.some((language) => language === viewed) ? [viewed] : defaults);
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

    const selected = supported.filter((language) => languages.includes(language));
    const confirm = () => {
        if (active || changed || !selected.length || submitted.current)
            return;

        submitted.current = true;
        generate(selected);
        close();
    };

    return <Dialog ref={dialog} className="w-full max-w-[calc(100vw-2rem)] sm:max-w-3xl" aria-labelledby="new-translation-title" onCancel={(event) => {
        event.preventDefault();
        close();
    }}>
        <h2 id="new-translation-title" className="text-lg font-semibold">{intl.formatMessage({ id: "views.translate" })}</h2>
        <p className="mt-2 text-sm leading-6 text-muted">{intl.formatMessage({ id: "views.translationGenerateDescription" }, { title: article.title, revisionId: revisionNumber ?? article.currentRevisionId })}</p>
        {content !== article.currentRevision.content && <p className="mt-2 text-sm text-muted">{intl.formatMessage({ id: "views.translationGenerateDraft" })}</p>}
        {changed && <Banner tone="warning" className="mt-3">{intl.formatMessage({ id: "views.translationContextChanged" })}</Banner>}
        <fieldset className="mt-4">
            <legend className="text-sm font-semibold">{intl.formatMessage({ id: "views.translationGenerateTargets" })}</legend>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {supported.map((language) => <label key={language} className="flex min-h-9 items-center gap-2 text-sm text-ink">
                    <input type="checkbox" className="size-4 accent-brand" checked={selected.includes(language)} onChange={(event) => setLanguages(event.target.checked ? [...selected, language] : selected.filter((item) => item !== language))} />
                    {intl.formatMessage({ id: languageMessageIds[language] })}
                </label>)}
            </div>
        </fieldset>
        <div className="mt-5 flex flex-wrap justify-end gap-2">
            <Button ref={cancel} variant="secondary" onClick={close}>{intl.formatMessage({ id: "editor.cancel" })}</Button>
            {changed && <Button variant="secondary" onClick={() => setReviewedSnapshot(snapshot)}>{intl.formatMessage({ id: "views.translationReviewSource" })}</Button>}
            <Button disabled={active || changed || !selected.length} onClick={confirm}>{selected.length === 1 ? intl.formatMessage({ id: "views.translationGenerateConfirm" }, { languages: selected.map(getProviderLanguageName).join(", ") }) : intl.formatMessage({ id: "views.translationGenerateBatch" })}</Button>
        </div>
    </Dialog>;
}
