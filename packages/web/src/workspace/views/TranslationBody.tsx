import { type Article } from "@skladno/shared";
import { Banner, EmptyState, Tab, TabList } from "../../ui/primitives.js";
import { useIntl } from "react-intl";
import type { Translation } from "./translations-view-types.js";
import { ProtectedTranslationText } from "./ProtectedTranslationText.js";
import type { KeyboardEvent } from "react";


interface TranslationBodyProps {
    source: Article;
    translatedContent?: string;
    targetLanguage: string;
    sourceParagraphs: string[];
    translatedParagraphs: string[];
    paragraphCount: number;
    translation?: Translation;
    protectedSpanWarnings: string[];
    displayMode: "side-by-side" | "aligned";
    visibleText: "source" | "translation";
    setVisibleText: (text: "source" | "translation") => void;
}


function SideBySideTranslation({ source, translatedContent, targetLanguage, visibleText, setVisibleText, protectedSpans }: Pick<TranslationBodyProps, "source" | "translatedContent" | "targetLanguage" | "visibleText" | "setVisibleText"> & { protectedSpans: readonly string[] }) {
    const intl = useIntl();
    return <>
        <TabList className="mt-4 @[42rem]:hidden">
            <Tab selected={visibleText === "source"} onClick={() => setVisibleText("source")}>{intl.formatMessage({ id: "views.translationOriginal" })}</Tab>
            <Tab selected={visibleText === "translation"} onClick={() => setVisibleText("translation")}>{intl.formatMessage({ id: "views.translationResult" }, { language: targetLanguage })}</Tab>
        </TabList>
        <div className="grid gap-3 @[42rem]:grid-cols-2">
            <article className={`${visibleText === "source" ? "block" : "hidden"} mt-3 min-w-0 rounded-panel border border-border bg-surface-raised p-3 @[42rem]:block`}>
                <h3 className="text-sm font-semibold">{intl.formatMessage({ id: "views.translationOriginal" })}</h3>
                <pre className="mt-3 whitespace-pre-wrap break-anywhere font-serif text-base leading-7 text-ink"><ProtectedTranslationText content={source.currentRevision.content} protectedSpans={protectedSpans} /></pre>
            </article>
            <article className={`${visibleText === "translation" ? "block" : "hidden"} mt-3 min-w-0 rounded-panel border border-border bg-surface-raised p-3 @[42rem]:block`}>
                <h3 className="text-sm font-semibold">{intl.formatMessage({ id: "views.translationResult" }, { language: targetLanguage })}</h3>
                <pre className="mt-3 whitespace-pre-wrap break-anywhere font-serif text-base leading-7 text-ink"><ProtectedTranslationText content={translatedContent ?? ""} protectedSpans={protectedSpans} /></pre>
            </article>
        </div>
    </>;
}


function AlignedTranslation({ targetLanguage, sourceParagraphs, translatedParagraphs, paragraphCount, protectedSpans }: Pick<TranslationBodyProps, "targetLanguage" | "sourceParagraphs" | "translatedParagraphs" | "paragraphCount"> & { protectedSpans: readonly string[] }) {
    const intl = useIntl();
    return <div className="mt-4 overflow-hidden rounded-panel border border-border bg-surface-raised">
        <div className="grid gap-3 border-b border-border px-3 py-2 @[42rem]:grid-cols-2">
            <h3 className="text-sm font-semibold">{intl.formatMessage({ id: "views.translationOriginal" })}</h3>
            <h3 className="text-sm font-semibold">{intl.formatMessage({ id: "views.translationResult" }, { language: targetLanguage })}</h3>
        </div>
        {Array.from({ length: paragraphCount }, (_, index) => <div className="grid gap-3 border-b border-border px-3 py-2 last:border-b-0 @[42rem]:grid-cols-2" key={index}>
            <pre className="whitespace-pre-wrap break-anywhere font-serif text-base leading-7 text-ink">{sourceParagraphs[index] === undefined ? <span className="font-ui text-xs italic text-muted">{intl.formatMessage({ id: "views.translationMissingOriginal" })}</span> : <ProtectedTranslationText content={sourceParagraphs[index]} protectedSpans={protectedSpans} />}</pre>
            <pre className="whitespace-pre-wrap break-anywhere font-serif text-base leading-7 text-ink">{translatedParagraphs[index] === undefined ? <span className="font-ui text-xs italic text-muted">{intl.formatMessage({ id: "views.translationMissingResult" })}</span> : <ProtectedTranslationText content={translatedParagraphs[index]} protectedSpans={protectedSpans} />}</pre>
        </div>)}
    </div>;
}


function ProtectedSpanNotice({ protectedSpanWarnings }: Pick<TranslationBodyProps, "protectedSpanWarnings">) {
    const intl = useIntl();
    if (!protectedSpanWarnings.length)
        return null;

    return <Banner className="mt-4 break-anywhere" tone="warning" role="alert">
        <span>{intl.formatMessage({ id: "views.translationProtectedWarning" })}: {protectedSpanWarnings.join(", ")}</span>
    </Banner>;
}


function navigateProtectedValues(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight")
        return;

    if (event.target !== event.currentTarget && !(event.target instanceof HTMLElement && event.target.hasAttribute("data-protected-value")))
        return;

    const values = [...event.currentTarget.querySelectorAll<HTMLButtonElement>("[data-protected-value]")].filter((button) => button.getClientRects().length > 0);
    if (!values.length)
        return;

    const index = values.findIndex((button) => button === event.target);
    const previous = index < 0 ? values.length - 1 : (index + values.length - 1) % values.length;
    const next = event.key === "ArrowRight" ? (index + 1) % values.length : previous;

    event.preventDefault();
    values[next]?.focus();
}


export function TranslationBody({ source, translatedContent, targetLanguage, sourceParagraphs, translatedParagraphs, paragraphCount, translation, protectedSpanWarnings, displayMode, visibleText, setVisibleText }: TranslationBodyProps) {
    const intl = useIntl();
    const protectedSpans = (translation?.metadata.protectedSpans ?? []).filter((span) => !protectedSpanWarnings.includes(span));
    const content = !translatedContent
        ? <EmptyState title={intl.formatMessage({ id: "views.translationEmptyTitle" })}>{intl.formatMessage({ id: "views.translationEmpty" })}</EmptyState>
        : <>
            <div className="@container">
                {displayMode === "side-by-side"
                    ? <SideBySideTranslation source={source} translatedContent={translatedContent} targetLanguage={targetLanguage} visibleText={visibleText} setVisibleText={setVisibleText} protectedSpans={protectedSpans} />
                    : <AlignedTranslation targetLanguage={targetLanguage} sourceParagraphs={sourceParagraphs} translatedParagraphs={translatedParagraphs} paragraphCount={paragraphCount} protectedSpans={protectedSpans} />}
            </div>
            <ProtectedSpanNotice protectedSpanWarnings={protectedSpanWarnings} />
        </>;

    return <div data-focus-area="article-editor" data-focus-area-entry tabIndex={0} aria-label={intl.formatMessage({ id: "views.translationComparison" })} onKeyDown={navigateProtectedValues} className="mt-4 min-h-0 flex-1 overflow-y-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand [scrollbar-color:var(--color-border-strong)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border-strong">{content}</div>;
}
