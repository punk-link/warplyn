import { useCallback, useEffect, useRef, useState } from "react";
import { useIntl, type IntlShape } from "react-intl";
import {
    defaultPublishLimitProfileId,
    isPublishLimitProfileId,
    type AssistantEditorialResult,
    type ArticleSummary,
    type AssistantMessage,
    type FactCheck,
    type PublishLimitProfileId,
    type StyleReview,
    type TranslationMetadata,
} from "@skladno/shared";
import type { EditorialWorkspaceClient } from "../../application/client.js";
import { useNotifications } from "../../notifications/NotificationProvider.js";
import type { ArticleWorkspaceState } from "./article-workspace-state.js";
import { getTargetLanguageId } from "./editorial-language.js";


interface EditorialResult<T> {
    articleId: string;
    baseRevisionId: string;
    value: T;
}


type TranslationResult = EditorialResult<{ metadata: TranslationMetadata; content: string; editorialArtifactId?: string; resultId?: string; createdAt?: string }>;


async function refreshLinkedTranslation(client: EditorialWorkspaceClient, workspace: ArticleWorkspaceState, target: ArticleSummary, result: TranslationResult, intl: IntlShape): Promise<void> {
    const persisted = await client.getArticle(target.id);
    if (persisted.currentRevisionId !== target.currentRevisionId)
        throw new Error(intl.formatMessage({ id: "views.translationRefreshFailed" }));

    if (await workspace.getArticleContent(target) !== persisted.currentRevision.content || persisted.draft)
        throw new Error(intl.formatMessage({ id: "views.translationRefreshDraft" }));

    if (!result.value.editorialArtifactId)
        throw new Error(intl.formatMessage({ id: "views.translationRefreshUnavailable" }));

    await client.acceptProposal(target.id, {
        baseRevisionId: persisted.currentRevisionId,
        content: result.value.content,
        provenance: { kind: "accepted-translation" },
        translationRefresh: { editorialArtifactId: result.value.editorialArtifactId },
        interfaceLocale: intl.locale,
    });

    await workspace.refreshArticle(target.id, true);
    workspace.selectArticle(target.id);
}


export function withFindingFreshness(factCheck: FactCheck, revisionId: string, content: string): FactCheck {
    const normalizedContent = content.replace(/\s+/g, " ").toLowerCase();
    return {
        ...factCheck, findings: factCheck.findings.map((finding) => ({
            ...finding,
            stale: factCheck.reviewedRevisionId !== revisionId && !finding.resolution && !normalizedContent.includes(finding.claim.replace(/\s+/g, " ").toLowerCase()),
        }))
    };
}


function useFactCheckResults(client: EditorialWorkspaceClient, workspace: ArticleWorkspaceState) {
    const [factCheckResult, setFactCheckResult] = useState<EditorialResult<FactCheck[]>>();
    const [selectedRun, setSelectedRun] = useState<{ articleId: string; revisionId: string; index: number }>();

    const loadFactChecks = useCallback(async () => {
        const article = workspace.selectedArticle;
        if (!article || !client.listFactChecks)
            return;

        const checks = await client.listFactChecks(article.id);
        setFactCheckResult({ articleId: article.id, baseRevisionId: article.currentRevisionId, value: checks });
    }, [client, workspace.selectedArticle]);

    useEffect(() => {
        void loadFactChecks();
    }, [loadFactChecks]);

    const article = workspace.selectedArticle;
    const factCheckRuns = factCheckResult && factCheckResult.articleId === article?.id ? factCheckResult.value : [];
    const selectedIndex = selectedRun && article && selectedRun.articleId === article.id && selectedRun.revisionId === article.currentRevisionId ? selectedRun.index : undefined;
    const viewedCheck = selectedIndex === undefined
        ? factCheckRuns.find((check) => check.reviewedRevisionId === article?.currentRevisionId)
        : factCheckRuns[selectedIndex];
    const factCheck = viewedCheck && article
        ? withFindingFreshness(viewedCheck, article.currentRevisionId, article.currentRevision.content)
        : undefined;
    const factCheckStale = Boolean(factCheck && factCheck.reviewedRevisionId !== workspace.selectedArticle?.currentRevisionId);
    const factCheckHistorical = selectedIndex !== undefined && selectedIndex !== factCheckRuns.findIndex((check) => check.reviewedRevisionId === article?.currentRevisionId);

    const resolveFactCheck = useCallback(async (findingId: string, resolution: NonNullable<FactCheck["findings"][number]["resolution"]>) => {
        const article = workspace.selectedArticle;
        if (!article || !client.resolveFactCheckFinding)
            return;

        await client.resolveFactCheckFinding(article.id, findingId, resolution);
        await loadFactChecks();
    }, [client, loadFactChecks, workspace.selectedArticle]);

    const setFactCheck = useCallback((result: EditorialResult<FactCheck>) => {
        setFactCheckResult((current) => ({ ...result, value: [result.value, ...(current?.articleId === result.articleId ? current.value : [])] }));
        setSelectedRun(undefined);
    }, []);
    const selectFactCheckRun = useCallback((index: number | undefined) => {
        const article = workspace.selectedArticle;
        setSelectedRun(article && index !== undefined ? { articleId: article.id, revisionId: article.currentRevisionId, index } : undefined);
    }, [workspace.selectedArticle]);

    return { factCheck, factCheckRuns, selectedFactCheckRun: selectedIndex, selectFactCheckRun, factCheckStale, factCheckHistorical, loadFactChecks, resolveFactCheck, setFactCheck };
}


function useTranslationResults(client: EditorialWorkspaceClient, workspace: ArticleWorkspaceState) {
    const intl = useIntl();
    const { notifyError } = useNotifications();
    const [translationResults, setTranslationResults] = useState<TranslationResult[]>([]);
    const selectedArticleId = workspace.selectedArticle?.id;
    const currentContext = useRef({ workspace, translationResults });
    currentContext.current = { workspace, translationResults };

    const retainTranslation = useCallback((result: TranslationResult) => {
        setTranslationResults((current) => [...current.filter((item) => !result.value.editorialArtifactId || item.value.editorialArtifactId !== result.value.editorialArtifactId), { ...result, value: { ...result.value, resultId: result.value.editorialArtifactId, createdAt: new Date().toISOString() } }]);
    }, []);

    const replaceTranslations = useCallback((articleId: string, messages: readonly AssistantMessage[] | undefined) => {
        const completed = (messages ?? []).flatMap((message) => message.status === "completed" && message.translation && message.baseRevisionId
            ? [{ articleId, baseRevisionId: message.baseRevisionId, value: { ...message.translation, editorialArtifactId: message.editorialArtifactId, resultId: message.editorialArtifactId ?? message.id, createdAt: message.createdAt } }]
            : []);
        const translations = [...new Map(completed.map((result) => [result.value.resultId, result])).values()];
        setTranslationResults((current) => [...current.filter((result) => result.articleId !== articleId), ...translations]);
    }, []);

    const translations = translationResults.filter((result) => result.articleId === selectedArticleId);
    const translationStale = translations.some((result) => result.baseRevisionId !== workspace.selectedArticle?.currentRevisionId);

    const createTranslation = useCallback(async (resultId: string, target?: ArticleSummary) => {
        const article = workspace.selectedArticle;
        const translationResult = translations.find((result) => (result.value.resultId ?? result.value.editorialArtifactId) === resultId);
        if (!article || !translationResult || translationResult.baseRevisionId !== article.currentRevisionId || workspace.content !== article.currentRevision.content)
            return;

        const translation = translationResult.value.metadata;

        try {
            if (target) {
                await refreshLinkedTranslation(client, workspace, target, translationResult, intl);
                return;
            }

            const { defaultProfileId: configuredDefaultProfile } = await client.getPublishingSettings();
            if (!translationStillCurrent(currentContext.current.workspace, currentContext.current.translationResults, translationResult))
                throw new Error(intl.formatMessage({ id: "workspace.createTranslationFailed" }));

            let publishingProfileId: PublishLimitProfileId = defaultPublishLimitProfileId;
            if (isPublishLimitProfileId(configuredDefaultProfile))
                publishingProfileId = configuredDefaultProfile;

            if (isPublishLimitProfileId(article.publishingProfileId))
                publishingProfileId = article.publishingProfileId;

            await workspace.create({
                title: translation.title ?? article.title,
                content: translationResult.value.content,
                language: getTargetLanguageId(translationResult.value.metadata.targetLanguage),
                publishingProfileId,
                sourceArticleId: article.id,
                sourceRevisionId: translationResult.baseRevisionId,
                provenance: { kind: "accepted-translation", targetLanguage: translation.targetLanguage, ...(translationResult.value.editorialArtifactId ? { editorialArtifactId: translationResult.value.editorialArtifactId } : {}) },
            });
        } catch (error) {
            notifyError(error, { fallbackMessage: intl.formatMessage({ id: target ? "views.translationRefreshFailed" : "workspace.createTranslationFailed" }) });
            throw error;
        }
    }, [client, intl, notifyError, translations, workspace]);

    const rejectTranslation = useCallback(async (resultId: string) => {
        const article = workspace.selectedArticle;
        const translationResult = translations.find((result) => (result.value.resultId ?? result.value.editorialArtifactId) === resultId);
        if (!article || !translationResult?.value.editorialArtifactId)
            return;

        await client.rejectTranslation(article.id, translationResult.value.editorialArtifactId);
        setTranslationResults((current) => current.filter((result) => result !== translationResult));
    }, [client, translations, workspace.selectedArticle]);

    return {
        translation: translations.at(-1)?.value.metadata,
        translations: translations.map((result) => ({ ...result.value, baseRevisionId: result.baseRevisionId })),
        translationStale, createTranslation,
        rejectTranslation,
        retainTranslation,
        replaceTranslations
    };
}


function translationStillCurrent(workspace: ArticleWorkspaceState, results: readonly TranslationResult[], result: TranslationResult): boolean {
    return workspace.selectedArticle?.id === result.articleId
        && workspace.selectedArticle.currentRevisionId === result.baseRevisionId
        && workspace.content === workspace.selectedArticle.currentRevision.content
        && results.some((item) => item.articleId === result.articleId && item.value.resultId === result.value.resultId && item.value.editorialArtifactId === result.value.editorialArtifactId);
}


export function useEditorialResults(client: EditorialWorkspaceClient, workspace: ArticleWorkspaceState) {
    const [styleReviewResult, setStyleReviewResult] = useState<EditorialResult<StyleReview>>();
    const { setFactCheck, ...factChecks } = useFactCheckResults(client, workspace);
    const { retainTranslation, ...translationResults } = useTranslationResults(client, workspace);
    const selectedArticleId = workspace.selectedArticle?.id;
    const styleReview = styleReviewResult && styleReviewResult.articleId === selectedArticleId ? styleReviewResult.value : undefined;
    const styleReviewStale = Boolean(styleReviewResult && styleReviewResult.articleId === selectedArticleId && styleReviewResult.baseRevisionId !== workspace.selectedArticle?.currentRevisionId);

    const applyResult = useCallback((articleId: string, baseRevisionId: string, result: AssistantEditorialResult, editorialArtifactId?: string) => {
        if (result.factCheck)
            setFactCheck({ articleId, baseRevisionId, value: result.factCheck });

        if (result.styleReview)
            setStyleReviewResult({ articleId, baseRevisionId, value: result.styleReview });

        if (result.translation)
            retainTranslation({ articleId, baseRevisionId, value: { ...result.translation, editorialArtifactId } });
    }, [retainTranslation, setFactCheck]);

    return {
        ...factChecks,
        ...translationResults,
        styleReview,
        styleReviewStale,
        applyResult,
        setFactCheck: (articleId: string, baseRevisionId: string, value: FactCheck) => setFactCheck({ articleId, baseRevisionId, value }),
        setStyleReview: (articleId: string, baseRevisionId: string, value: StyleReview) => setStyleReviewResult({ articleId, baseRevisionId, value }),
        retainTranslation,
    };
}
