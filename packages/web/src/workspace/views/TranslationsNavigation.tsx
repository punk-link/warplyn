import { useId, useRef, useState } from "react";
import { type ArticleRevisionSummary, type ArticleSummary, type GeneralSettings } from "@skladno/shared";
import { Banner, Tab, TabList } from "../../ui/primitives.js";
import { formatDate } from "../../i18n/formatting.js";
import { translationResultId } from "./translation-result-selection.js";
import { useIntl } from "react-intl";
import type { Translation } from "./translations-view-types.js";
import { ChevronDownIcon } from "../../ui/icons.js";
import { handleStatusMenuKeyDown, openStatusMenu } from "../components/ArticleStatusBarMenu.js";
import { getProvenanceMessageId, getRevisionTitle } from "./revision-history-presentation.js";


interface TranslationsNavigationProps {
    article: ArticleSummary;
    sourceArticle?: ArticleSummary;
    languages: readonly string[];
    selectedLanguage?: string;
    translation?: Translation;
    stale: boolean;
    openArticle?: (articleId: string) => void;
    selectTargetLanguage?: (language: string) => void;
    results: readonly Translation[];
    selectResult: (id: string) => void;
    generalSettings?: GeneralSettings;
    revisions?: readonly ArticleRevisionSummary[];
}


export function TranslationsNavigation({ article, sourceArticle, languages, selectedLanguage, translation, stale, openArticle, selectTargetLanguage, results, selectResult, generalSettings, revisions = [] }: TranslationsNavigationProps) {
    const intl = useIntl();
    const [resultMenuOpen, setResultMenuOpen] = useState(false);
    const trigger = useRef<HTMLButtonElement>(null);
    const resultMenuId = useId();
    const selectedResultId = translation ? translationResultId(translation) : undefined;
    const resultLabel = (result: Translation, index: number) => {
        const revision = revisions.find((item) => item.id === result.baseRevisionId);
        const description = revision
            ? getRevisionTitle(revision, intl.formatMessage({ id: getProvenanceMessageId(revision, revisions) }))
            : intl.formatMessage({ id: "revisions.saved" });
        return intl.formatMessage({ id: "views.translationResultOption" }, {
            number: index + 1,
            date: result.createdAt ? formatDate(result.createdAt, generalSettings?.dateFormat, generalSettings?.timeZone) : "",
            description,
        });
    };

    return <>
        {languages.length > 1 && <TabList className="mt-4">
            {languages.map((language) => <Tab key={language} selected={language === selectedLanguage} onClick={() => selectTargetLanguage?.(language)}>{language}</Tab>)}
        </TabList>}
        {results.length > 1 && translation && <div className="relative mt-3">
            <button ref={trigger} className="flex min-h-10 w-full items-center justify-between gap-3 rounded-control border border-border bg-surface-raised px-4 py-2 text-left text-sm text-ink transition-colors hover:border-brand/45 hover:bg-brand-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand" type="button" aria-label={intl.formatMessage({ id: "views.translationResultSelector" })} aria-controls={resultMenuOpen ? resultMenuId : undefined} aria-expanded={resultMenuOpen} aria-haspopup="menu" onClick={() => setResultMenuOpen((open) => !open)} onKeyDown={(event) => {
                if (event.key === "Escape")
                    setResultMenuOpen(false);
                openStatusMenu(event, () => setResultMenuOpen(true), resultMenuId);
            }}>
                <span className="min-w-0 truncate">{resultLabel(translation, results.findIndex((result) => translationResultId(result) === selectedResultId))}</span>
                <ChevronDownIcon className={`size-4 shrink-0 text-muted transition-transform ${resultMenuOpen ? "rotate-180" : ""}`} />
            </button>
            {resultMenuOpen && <div className="absolute left-0 top-full z-20 mt-1 w-full rounded-control border border-border bg-surface-raised p-1 shadow-raised">
                <div id={resultMenuId} role="menu" aria-label={intl.formatMessage({ id: "views.translationResultSelector" })} onKeyDown={(event) => handleStatusMenuKeyDown(event, () => {
                    setResultMenuOpen(false);
                    trigger.current?.focus();
                })}>
                    {[...results].reverse().map((result) => {
                        const index = results.indexOf(result);
                        const id = translationResultId(result);
                        const selected = id === selectedResultId;
                        return <button key={id} className="flex min-h-9 w-full items-center gap-2 rounded-control px-2 py-1 text-left text-xs text-ink hover:bg-brand-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand" type="button" role="menuitemradio" aria-checked={selected} onClick={() => {
                            selectResult(id);
                            setResultMenuOpen(false);
                        }}>
                            <span className="min-w-0 flex-1 truncate">{resultLabel(result, index)}</span>
                            {selected && <span className="text-micro font-semibold text-muted">{intl.formatMessage({ id: "revisions.current" })}</span>}
                        </button>;
                    })}
                </div>
            </div>}
        </div>}
        {sourceArticle && openArticle && <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1">
            <p className="text-xs text-muted">
                {intl.formatMessage({ id: "views.sourceLinkedPrefix" })} <button type="button" className="font-semibold text-brand underline underline-offset-2" onClick={() => openArticle(sourceArticle.id)}>{sourceArticle.title}</button>{article.sourceRevisionNumber ? ` ${intl.formatMessage({ id: "views.sourceLinkedRevision" }, { revisionNumber: article.sourceRevisionNumber })}` : null}
            </p>
        </div>}
        {stale && <Banner className="mt-3" tone="warning">{intl.formatMessage({ id: sourceArticle ? "views.translationArticleStale" : "views.translationStale" })}</Banner>}
    </>;
}
