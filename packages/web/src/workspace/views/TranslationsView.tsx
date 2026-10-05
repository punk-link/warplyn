import { useState } from "react";
import { getPublishingLength } from "@skladno/shared";
import { TranslationsHeader } from "./TranslationsHeader.js";
import { TranslationsNavigation } from "./TranslationsNavigation.js";
import { TranslationBody } from "./TranslationBody.js";
import { TranslationRejectionDialog } from "./TranslationRejectionDialog.js";
import { TranslationRefreshControl } from "./TranslationRefreshControl.js";
import type { TranslationsActions } from "./translations-view-actions.js";
import type { TranslationsData } from "./translations-view-data.js";
import { getProviderLanguageName } from "../state/editorial-language.js";
import { NewTranslationDialog } from "./NewTranslationDialog.js";
import { translationResultId, useTranslationResultSelection } from "./translation-result-selection.js";
import { splitTranslationParagraphs } from "./translation-paragraphs.js";
import { TranslationReviewSurface } from "./TranslationReviewSurface.js";


function getChangedProtectedSpans(content: string, protectedSpans: readonly string[]): string[] {
    const expectedCounts = new Map<string, number>();
    for (const span of protectedSpans)
        expectedCounts.set(span, (expectedCounts.get(span) ?? 0) + 1);

    return [...expectedCounts].flatMap(([span, expected]) => content.split(span).length - 1 === expected ? [] : [span]);
}


export function TranslationsView({ data, actions }: { data: TranslationsData; actions: TranslationsActions }) {
    const { article, sourceArticle, linkedTranslations = [], translations = [], stale, translationLanguages = [], publishProfile, selectedTargetLanguage, sourceContent = article.currentRevision.content, requestActive = false } = data;
    const { create, reject, edit, openArticle, selectTargetLanguage, translate } = actions;
    const [creating, setCreating] = useState(false);
    const [rejecting, setRejecting] = useState(false);
    const [rejectConfirmationOpen, setRejectConfirmationOpen] = useState(false);
    const [rejectionComplete, setRejectionComplete] = useState(false);
    const [rejectionLanguage, setRejectionLanguage] = useState<string>();
    const [rejectionId, setRejectionId] = useState<string>();
    const [generationOpen, setGenerationOpen] = useState(false);
    const [displayMode, setDisplayMode] = useState<"side-by-side" | "aligned">("side-by-side");
    const [visibleText, setVisibleText] = useState<"source" | "translation">("source");
    const languages = [...new Set([...translations.map((result) => result.metadata.targetLanguage), ...linkedTranslations.map((linked) => getProviderLanguageName(linked.language ?? ""))])];
    const { translation, language, results, selectResult } = useTranslationResultSelection(translations, selectedTargetLanguage, selectTargetLanguage, languages);
    const linkedTranslation = linkedTranslations.find((linked) => getProviderLanguageName(linked.language ?? "") === language);
    const selectedStale = stale || sourceContent !== article.currentRevision.content || Boolean(translation && translation.baseRevisionId !== article.currentRevisionId);
    const startCreate = () => {
        if (!translation)
            return;

        setCreating(true);
        void create(translationResultId(translation)).then(() => {
            setCreating(false);
            edit?.();
        }, () => setCreating(false));
    };
    const confirmRejection = () => {
        if (!rejectionId || !reject || !translations.some((result) => translationResultId(result) === rejectionId))
            return;

        setRejecting(true);
        void reject(rejectionId).then(() => {
            setRejecting(false);
            setRejectionComplete(true);
            window.setTimeout(() => {
                setRejectConfirmationOpen(false);
                setRejectionComplete(false);
                setRejectionLanguage(undefined);
            }, 300);
        }, () => setRejecting(false));
    };
    const source = sourceArticle ?? article;
    const translatedContent = translation?.content ?? (sourceArticle ? article.currentRevision.content : undefined);
    const targetLanguage = getProviderLanguageName(translation?.metadata.targetLanguage ?? article.language ?? "");
    const protectedSpans = translation?.metadata.protectedSpans;
    const sourceParagraphs = splitTranslationParagraphs(source.currentRevision.content, protectedSpans);
    const translatedParagraphs = translatedContent ? splitTranslationParagraphs(translatedContent, protectedSpans) : [];
    const paragraphCount = Math.max(sourceParagraphs.length, translatedParagraphs.length);
    const publishingGuidance = translatedContent && publishProfile
        ? { length: getPublishingLength(translatedContent, publishProfile), profile: publishProfile }
        : undefined;
    const protectedSpanWarnings = translation ? getChangedProtectedSpans(translation.content, translation.metadata.protectedSpans) : [];
    const protectedSpansValid = protectedSpanWarnings.length === 0;

    return <TranslationReviewSurface generation={data.generation}>
        <TranslationsHeader
            sourceArticle={sourceArticle}
            translation={translation}
            translationLanguages={translationLanguages}
            translatedContent={translatedContent}
            publishingGuidance={publishingGuidance}
            protectedSpansValid={protectedSpansValid}
            displayMode={displayMode}
            creating={creating}
            rejecting={rejecting}
            stale={selectedStale}
            edit={edit}
            reject={reject}
            translate={() => setGenerationOpen(true)}
            startCreate={startCreate}
            openTranslation={linkedTranslation && openArticle ? () => {
                openArticle(linkedTranslation.id);
                edit?.();
            } : undefined}
            update={translation?.editorialArtifactId && !sourceArticle && <TranslationRefreshControl key={translationResultId(translation)} translation={translation} linkedTranslations={linkedTranslations} stale={selectedStale || !protectedSpansValid} create={create} />}
            setDisplayMode={setDisplayMode}
            setRejectionLanguage={setRejectionLanguage}
            setRejectConfirmationOpen={(open) => {
                setRejectionId(translation && translationResultId(translation));
                setRejectConfirmationOpen(open);
            }}
        />
        <TranslationsNavigation
            article={article}
            sourceArticle={sourceArticle}
            languages={languages}
            selectedLanguage={language}
            translation={translation}
            stale={selectedStale}
            openArticle={openArticle}
            selectTargetLanguage={selectTargetLanguage}
            results={results}
            selectResult={selectResult}
            generalSettings={data.generalSettings}
            revisions={data.revisions}
        />
        {generationOpen && <NewTranslationDialog article={article} content={sourceContent} defaults={translationLanguages} viewedLanguage={language} revisionNumber={data.revisionNumbers?.[article.currentRevisionId]} active={requestActive} close={() => setGenerationOpen(false)} generate={translate} />}
        <TranslationBody
            source={source}
            translatedContent={translatedContent}
            targetLanguage={targetLanguage}
            sourceParagraphs={sourceParagraphs}
            translatedParagraphs={translatedParagraphs}
            paragraphCount={paragraphCount}
            translation={translation}
            protectedSpanWarnings={protectedSpanWarnings}
            displayMode={displayMode}
            visibleText={visibleText}
            setVisibleText={setVisibleText}
        />
        <TranslationRejectionDialog
            rejectionLanguage={rejectionLanguage}
            rejectionComplete={rejectionComplete}
            rejectionConfirmationOpen={rejectConfirmationOpen}
            rejecting={rejecting}
            setRejectConfirmationOpen={setRejectConfirmationOpen}
            confirmRejection={confirmRejection}
        />
    </TranslationReviewSurface>;
}
