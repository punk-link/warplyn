import { type ArticleSummary, type GeneralSettings } from "@skladno/shared";
import { Banner, Select, Tab, TabList } from "../../ui/primitives.js";
import { formatDateTime } from "../../i18n/formatting.js";
import { translationResultId } from "./translation-result-selection.js";
import { useIntl } from "react-intl";
import type { Translation } from "./translations-view-types.js";


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
    revisionNumbers?: Readonly<Record<string, number>>;
}


export function TranslationsNavigation({ article, sourceArticle, languages, selectedLanguage, translation, stale, openArticle, selectTargetLanguage, results, selectResult, generalSettings, revisionNumbers }: TranslationsNavigationProps) {
    const intl = useIntl();

    return <>
        {languages.length > 1 && <TabList className="mt-4">
            {languages.map((language) => <Tab key={language} selected={language === selectedLanguage} onClick={() => selectTargetLanguage?.(language)}>{language}</Tab>)}
        </TabList>}
        {results.length > 1 && translation && <div className="mt-3">
            <Select aria-label={intl.formatMessage({ id: "views.translationResultSelector" })} value={translationResultId(translation)} onChange={(event) => selectResult(event.target.value)}>
                {results.map((result, index) => <option key={translationResultId(result)} value={translationResultId(result)}>{intl.formatMessage({ id: "views.translationResultOption" }, { time: result.createdAt ? formatDateTime(result.createdAt, intl.locale, generalSettings?.dateFormat, generalSettings?.timeFormat, generalSettings?.timeZone) : "", revisionId: revisionNumbers?.[result.baseRevisionId] ?? result.baseRevisionId, number: index + 1 })}</option>)}
            </Select>
        </div>}
        {sourceArticle && openArticle && <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1">
            <p className="text-xs text-muted">
                {intl.formatMessage({ id: "views.sourceLinkedPrefix" })} <button type="button" className="font-semibold text-brand underline underline-offset-2" onClick={() => openArticle(sourceArticle.id)}>{sourceArticle.title}</button>{article.sourceRevisionNumber ? ` ${intl.formatMessage({ id: "views.sourceLinkedRevision" }, { revisionNumber: article.sourceRevisionNumber })}` : null}
            </p>
        </div>}
        {stale && <Banner className="mt-3" tone="warning">{intl.formatMessage({ id: sourceArticle ? "views.translationArticleStale" : "views.translationStale" })}</Banner>}
    </>;
}
