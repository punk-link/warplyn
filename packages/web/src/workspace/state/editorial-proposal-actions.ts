import { useCallback, type Dispatch, type SetStateAction } from "react";
import type { IntlShape } from "react-intl";
import {
    applyProposalChanges,
    ArticleRevisionConflictError,
    createTextProposal,
    REVISION_PROVENANCE_KIND,
    type AssistantEditorialResult,
    type AssistantMessage,
    type Article,
    type EditorialOperation,
    type FactCheck,
    type TextProposal,
} from "@skladno/shared";
import { ApplicationClientError } from "@skladno/shared";
import type { EditorialWorkspaceClient } from "../../application/client.js";
import { getErrorMessageId } from "../../i18n/errors.js";
import { useNotifications } from "../../notifications/NotificationProvider.js";
import { getDesktopTelemetryClient } from "../../application/desktop-client.js";
import { beginBestEffortTelemetryCapture, captureBestEffortTelemetry } from "../telemetry.js";
import type { ArticleWorkspaceState } from "./article-workspace-state.js";
import { getProviderLanguageName } from "./editorial-language.js";
import { handleEditorialEvent, isProposalOperation, type ProposalBase, type ProposalState } from "./editorial-proposal-helpers.js";
import type { useEditorialResults } from "./editorial-results-state.js";

type EditorialResultsState = ReturnType<typeof useEditorialResults>;


function correctionSelection(revisionId: string, occurrenceIds?: string[]) {
    return occurrenceIds?.length ? { expectedRevisionId: revisionId, occurrenceIds } : undefined;
}


export type ProposalDecision = "pending" | "accepted" | "rejected";


interface ProposalSetters {
    setProposal: Dispatch<SetStateAction<string>>;
    setBase: Dispatch<SetStateAction<ProposalBase | undefined>>;
    setDecisions: Dispatch<SetStateAction<Record<string, ProposalDecision>>>;
    setState: Dispatch<SetStateAction<ProposalState>>;
    setMessage: Dispatch<SetStateAction<string>>;
}


type ProposalActionsInput = ProposalSetters & {
    client: EditorialWorkspaceClient;
    workspace: ArticleWorkspaceState;
    intl: IntlShape;
    proposal: {
        base: ProposalBase | undefined;
        review: TextProposal | undefined;
        accepted: boolean;
        stale: boolean;
        decisions: Record<string, ProposalDecision>;
    };
    summaries: {
        setProposalSummaries: Dispatch<SetStateAction<Record<string, string>>>;
        setProposalSummaryLocale: Dispatch<SetStateAction<string | undefined>>;
    };
    results: Pick<EditorialResultsState, "applyResult" | "loadFactChecks" | "resolveFactCheck" | "createTranslation" | "rejectTranslation" | "setFactCheck" | "setStyleReview" | "retainTranslation" | "replaceTranslations">;
    restoredArticleIds: { current: Set<string> };
    controller: { current: AbortController | undefined };
};


function restoredAcceptance(article: Article, message: AssistantMessage, review: TextProposal): Record<string, ProposalDecision> | undefined {
    if (message.proposalAcceptance?.kind === "whole")
        return Object.fromEntries(review.changes.map((change) => [change.id, "accepted"]));

    if (message.proposalAcceptance?.kind === "changes") {
        const acceptedChangeIds = new Set(message.proposalAcceptance.acceptedChangeIds);
        return Object.fromEntries(review.changes.map((change) => [change.id, acceptedChangeIds.has(change.id) ? "accepted" : "rejected"]));
    }

    return restoredRevisionAcceptance(article, message, review);
}


function restoredRevisionAcceptance(article: Article, message: AssistantMessage, review: TextProposal): Record<string, ProposalDecision> | undefined {
    const provenance = article.currentRevision.provenance;
    if (provenance.kind !== REVISION_PROVENANCE_KIND.ACCEPTED_PROPOSAL || provenance.baseRevisionId !== message.baseRevisionId)
        return undefined;

    const wholeProposal = provenance.wholeProposal === true;
    const acceptedChangeIds = restoredChangeIds(provenance.acceptedChangeIds);
    const artifactMatches = matchingProposalArtifact(provenance.editorialArtifactId, message.editorialArtifactId);
    if (wholeProposal && (artifactMatches || article.currentRevision.content === review.proposedContent))
        return Object.fromEntries(review.changes.map((change) => [change.id, "accepted"]));

    if (wholeProposal || !acceptedChangeIds)
        return undefined;

    const acceptedContent = applyProposalChanges(review, acceptedChangeIds);
    const acceptedContentWithBlankLines = applyProposalChanges(review, acceptedChangeIds, true);
    if (!artifactMatches && article.currentRevision.content !== acceptedContent && article.currentRevision.content !== acceptedContentWithBlankLines)
        return undefined;

    return Object.fromEntries(review.changes.map((change) => [change.id, acceptedChangeIds.has(change.id) ? "accepted" : "rejected"]));
}


function matchingProposalArtifact(stored: unknown, artifactId: string | undefined): boolean {
    return typeof stored === "string" && stored === artifactId;
}


function restoredChangeIds(value: unknown): Set<string> | undefined {
    return Array.isArray(value) && value.every((id) => typeof id === "string") ? new Set(value) : undefined;
}


function restoredProposalBase(article: Article, message: AssistantMessage, accepted: boolean): ProposalBase {
    return { articleId: article.id, content: message.baseRevisionContent!, revisionId: message.baseRevisionId!, ...(message.editorialArtifactId ? { editorialArtifactId: message.editorialArtifactId } : {}), ...(accepted ? { accepted: true } : {}) };
}


function acceptanceProvenance(base: ProposalBase, ids: ReadonlySet<string>, whole: boolean) {
    return {
        kind: REVISION_PROVENANCE_KIND.ACCEPTED_PROPOSAL,
        baseRevisionId: base.revisionId,
        ...(base.editorialArtifactId ? { editorialArtifactId: base.editorialArtifactId } : {}),
        ...(whole ? { wholeProposal: true } : { acceptedChangeIds: [...ids] }),
    };
}


function acceptedProposalContent(base: ProposalBase, review: TextProposal, ids: ReadonlySet<string>, whole: boolean, acceptWhole: boolean): string {
    if (base.correctedFindingIds?.length) {
        const selected = acceptWhole ? new Set(review.changes.map((change) => change.id)) : ids;
        return applyProposalChanges(review, selected, true);
    }

    return whole ? review.proposedContent : applyProposalChanges(review, ids);
}


function findLatestRestorableProposal(messages: AssistantMessage[] | undefined): AssistantMessage | undefined {
    const items = messages ?? [];
    for (let index = items.length - 1; index >= 0; index -= 1) {
        const message = items[index];
        if (message.responseKind !== "translation_proposal_prepared" && message.proposalContent && message.baseRevisionId && message.baseRevisionContent)
            return message;
    }
}


export function useProposalActions({ client, workspace, intl, proposal: { base, review, accepted, stale, decisions }, summaries: { setProposalSummaries, setProposalSummaryLocale }, results, restoredArticleIds, controller, ...setters }: ProposalActionsInput) {
    const { notifyError } = useNotifications();
    const telemetry = getDesktopTelemetryClient();
    const { setProposal, setBase, setDecisions, setState, setMessage } = setters;
    const { applyResult, loadFactChecks, resolveFactCheck, createTranslation, rejectTranslation, setFactCheck, setStyleReview, retainTranslation, replaceTranslations } = results;


    function startProposal(operation: EditorialOperation, nextBase: ProposalBase): void {
        if (!isProposalOperation(operation))
            return;

        setBase(nextBase);
        setProposal("");
        setDecisions({});
        setProposalSummaries({});
        setProposalSummaryLocale(undefined);
    }


    function reportRequestFailure(error: unknown): void {
        if (error instanceof DOMException && error.name === "AbortError")
            return;

        setState("error");
        setMessage(error instanceof ApplicationClientError
            ? intl.formatMessage({ id: getErrorMessageId(error.code) }, error.parameters)
            : intl.formatMessage({ id: "errors.editorialRequestFailed" }));
    }


    async function request(operation: EditorialOperation, authorContext: string, targetLanguage?: string, correctedFindingIds?: string[]) {
        const article = workspace.selectedArticle;
        if (!article)
            return;

        try {
            const saved = await workspace.save(article.id);
            const revisionId = saved?.id ?? article.currentRevisionId;
            const content = saved?.content ?? workspace.content;

            startProposal(operation, { articleId: article.id, content, revisionId, ...(correctedFindingIds?.length ? { correctedFindingIds } : {}) });

            setMessage("");
            setState("streaming");

            const requestController = new AbortController();
            controller.current = requestController;
            await client.streamEditorial(article.id, { requestId: crypto.randomUUID(), operation, authorContext, ...(targetLanguage ? { targetLanguage: getProviderLanguageName(targetLanguage) } : {}), correctionSelection: correctionSelection(revisionId, correctedFindingIds) }, (event) => handleEditorialEvent({ event, articleId: article.id, content, revisionId, operation, correctedFindingIds, setProposal, setBase, setState, setMessage, setFactCheck, loadFactChecks, setStyleReview, retainTranslation, intl }), requestController.signal);
        } catch (error) {
            reportRequestFailure(error);
        }
    }


    async function accept(acceptedChangeIds: ReadonlySet<string>, wholeProposal = false) {
        const article = workspace.selectedArticle;
        if (!article || !base || !review || stale || accepted)
            return;

        const completeCorrection = Boolean(base.correctedFindingIds?.length && acceptedChangeIds.size === review.changes.length);
        const acceptWhole = wholeProposal || completeCorrection;

        const telemetryGeneration = await beginBestEffortTelemetryCapture(telemetry);
        const content = acceptedProposalContent(base, review, acceptedChangeIds, wholeProposal, acceptWhole);
        try {
            const revision = await client.acceptProposal(article.id, {
                baseRevisionId: base.revisionId,
                content,
                interfaceLocale: intl.locale,
                provenance: acceptanceProvenance(base, acceptedChangeIds, acceptWhole),
            });

            workspace.updateRevision(article.id, revision);
            workspace.setContent(content);
            captureBestEffortTelemetry(telemetry, { kind: "proposal_reviewed", decision: "accepted" }, telemetryGeneration);
            if (base.correctedFindingIds?.length)
                await loadFactChecks();

            setBase({ ...base, accepted: true });
            setDecisions(Object.fromEntries(review.changes.map((change) => [change.id, wholeProposal || acceptedChangeIds.has(change.id) ? "accepted" : "rejected"])));
        } catch (error) {
            if (error instanceof ArticleRevisionConflictError) {
                workspace.updateRevision(article.id, error.article.currentRevision);
                return;
            }

            notifyError(error, { fallbackMessage: intl.formatMessage({ id: "workspace.acceptProposalFailed" }) });
        }
    }


    const applyAssistantResult = useCallback((articleId: string, baseRevisionId: string, result: AssistantEditorialResult, editorialArtifactId?: string) => {
        const article = workspace.articles.find((item) => item.id === articleId);
        if (!article)
            return;

        if (result.proposal) {
            restoredArticleIds.current.delete(articleId);
            setBase({ articleId, content: workspace.content, revisionId: baseRevisionId, ...(editorialArtifactId ? { editorialArtifactId } : {}) });
            setProposal(result.proposal);
            setProposalSummaries({});
            setProposalSummaryLocale(undefined);
            setDecisions({});
        }

        applyResult(articleId, baseRevisionId, result, editorialArtifactId);
    }, [applyResult, restoredArticleIds, setBase, setDecisions, setProposal, setProposalSummaries, setProposalSummaryLocale, workspace.articles, workspace.content]);

    const restoreAssistantProposal = useCallback((messages: AssistantMessage[] | undefined) => {
        const article = workspace.selectedArticle;
        if (!article)
            return;

        replaceTranslations(article.id, messages);
        if (restoredArticleIds.current.has(article.id))
            return;

        const message = findLatestRestorableProposal(messages);
        if (!message && !(messages ?? []).some((item) => item.status === "completed" && item.translation && item.baseRevisionId))
            return;

        restoredArticleIds.current.add(article.id);
        if (!message)
            return;

        const restoredReview = createTextProposal(message.baseRevisionContent!, message.proposalContent!);
        const acceptance = restoredAcceptance(article, message, restoredReview);
        setBase(restoredProposalBase(article, message, Boolean(acceptance)));
        setProposal(message.proposalContent!);
        setProposalSummaries(Object.fromEntries((message.proposalSummaries ?? []).map((summary) => [summary.changeId, summary.summary])));
        setProposalSummaryLocale(message.proposalSummaryLocale);
        setDecisions(acceptance ?? {});

    }, [replaceTranslations, restoredArticleIds, setBase, setDecisions, setProposal, setProposalSummaries, setProposalSummaryLocale, workspace.selectedArticle]);

    const setDecision = (id: string, decision: ProposalDecision) => setDecisions((current) => ({ ...current, [id]: decision }));
    const acceptAll = () => accept(new Set(review ? review.changes.map((change) => change.id) : []), true);
    const applyAccepted = () => accept(new Set(Object.entries(decisions).filter(([, decision]) => decision === "accepted").map(([id]) => id)), false);
    const rejectAll = () => {
        setDecisions(Object.fromEntries((review?.changes ?? []).map((change) => [change.id, "rejected"])));
        void beginBestEffortTelemetryCapture(telemetry).then((generation) => captureBestEffortTelemetry(telemetry, { kind: "proposal_reviewed", decision: "rejected" }, generation));
    };
    const dismissProposal = () => {
        if (base)
            restoredArticleIds.current.add(base.articleId);

        setProposal("");
        setBase(undefined);
        setDecisions({});
    };
    const proposeFactCorrections = (findings: FactCheck["findings"]) => {
        const authorContext = intl.formatMessage({ id: "assistant.factCheckCorrectionPrompt" }, { findings: findings.map((finding) => `- ${finding.claim}\n  ${finding.rationale}`).join("\n") });
        const correctedFindingIds = findings.flatMap((finding) => finding.occurrenceId ? [finding.occurrenceId] : []);
        return request("flow_revision", authorContext, undefined, correctedFindingIds);
    };

    return {
        setDecision,
        request,
        acceptAll,
        applyAccepted,
        rejectAll,
        dismissProposal,
        cancel: () => controller.current?.abort(),
        loadFactChecks,
        resolveFactCheck,
        proposeFactCorrections,
        createTranslation,
        rejectTranslation,
        applyAssistantResult,
        restoreAssistantProposal,
    };
}
