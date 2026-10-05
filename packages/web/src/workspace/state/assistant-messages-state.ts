import { useIntl } from "react-intl";
import { useCallback, useState } from "react";
import type { AssistantCheckpointDraftMode, AssistantCheckpointPreview, AssistantEditorialResult, RestoreAssistantCheckpointResult } from "@skladno/shared";
import type { EditorialWorkspaceClient } from "../../application/client.js";
import type { ArticleWorkspaceState } from "./article-workspace-state.js";
import { type AssistantSelectionScope } from "./assistant-selection.js";
import { useAssistantMessageHistory } from "./assistant-message-history-state.js";
import { clearAssistantRequestFeedback, useAssistantRequestActions, useAssistantRequestStore } from "./assistant-request-state.js";
import { useAssistantStreamEvents } from "./assistant-stream-events-state.js";
import { useNotifications } from "../../notifications/NotificationProvider.js";
import { useAssistantEdits } from "./assistant-edit-state.js";

export { getAssistantSelectionScope, requestedTranslationLanguages, type AssistantSelectionScope } from "./assistant-selection.js";
export type { StreamedAssistantMessage } from "./assistant-streaming.js";


export function useAssistantMessages(client: EditorialWorkspaceClient, workspace: ArticleWorkspaceState, selection: AssistantSelectionScope | undefined, onResult: (articleId: string, baseRevisionId: string, result: AssistantEditorialResult, editorialArtifactId?: string) => void, profileRebuilt?: { articleId: string; count: number; token: number }) {
    const intl = useIntl();
    const { notifyError } = useNotifications();
    const store = useAssistantRequestStore();
    const article = workspace.selectedArticle;
    const { reload } = useAssistantMessageHistory({ client, articleId: article?.id, profileRebuilt, store });
    const { clearStream, handleAssistantEvent } = useAssistantStreamEvents({ articleId: article?.id, workspace, store, onResult });
    const { request, retry } = useAssistantRequestActions({ client, workspace, selection, intl, store, reload, clearStream, handleAssistantEvent });
    const [checkpointPreview, setCheckpointPreview] = useState<AssistantCheckpointPreview>();
    const [restoredComposer, setRestoredComposer] = useState<RestoreAssistantCheckpointResult["composer"]>();
    const edits = useAssistantEdits(client, workspace, article?.id, reload);
    const setClaimSelected = useCallback(async (claim: string, selected: boolean) => {
        if (!article)
            return;

        const requestId = store.activeRequestIdByArticle[article.id];
        if (!requestId)
            return;

        try {
            await client.setAssistantClaimSelected(article.id, requestId, claim, selected);
        } catch (error) {
            notifyError(error, { fallbackMessage: intl.formatMessage({ id: "assistant.changeClaimSelectionFailed" }) });
            throw error;
        }
    }, [article, client, intl, notifyError, store.activeRequestIdByArticle]);
    const previewCheckpoint = useCallback(async (messageId: string) => {
        if (!article || store.stateByArticle[article.id] === "streaming")
            return;

        try {
            setCheckpointPreview(await client.previewAssistantCheckpoint(article.id, messageId));
        } catch (error) {
            notifyError(error, { fallbackMessage: intl.formatMessage({ id: "errors.assistantCheckpointInvalid" }) });
        }
    }, [article, client, intl, notifyError, store.stateByArticle]);
    const restoreCheckpoint = useCallback(async (draftMode?: AssistantCheckpointDraftMode) => {
        if (!article || !checkpointPreview)
            return;

        try {
            const result = await client.restoreAssistantCheckpoint(article.id, checkpointPreview.messageId, { tailToken: checkpointPreview.tailToken, ...(draftMode ? { draftMode } : {}) });
            store.setMessagesByArticle((current) => ({ ...current, [article.id]: result.messages }));
            clearStream(article.id);
            clearAssistantRequestFeedback(store, article.id);
            store.setStateByArticle((current) => ({ ...current, [article.id]: "idle" }));

            workspace.applyPersistedArticle(result.article);
            setRestoredComposer(result.composer);
            setCheckpointPreview(undefined);

            return result;
        } catch (error) {
            notifyError(error, { fallbackMessage: intl.formatMessage({ id: "errors.assistantCheckpointInvalid" }) });
            throw error;
        }
    }, [article, checkpointPreview, clearStream, client, intl, notifyError, store, workspace]);

    return {
        ...selectedMessageState(store, article?.id),
        setClaimSelected,
        request, retry, checkpointPreview, previewCheckpoint, restoreCheckpoint, closeCheckpoint: () => setCheckpointPreview(undefined), restoredComposer,
        ...edits,
        reload,
        cancel: () => article && store.controllers.current.get(article.id)?.abort(),
    };
}


function selectedMessageState(store: ReturnType<typeof useAssistantRequestStore>, articleId: string | undefined) {
    if (!articleId)
        return { messages: undefined, state: "idle" as const, message: "", errorDetails: undefined, hasUnavailableAiConnection: false, activity: undefined, streamedMessage: undefined, factCheckClaims: undefined, activeRequestId: undefined, translatingLanguages: undefined };

    return {
        translatingLanguages: store.translationLanguagesByArticle[articleId],
        messages: store.messagesByArticle[articleId],
        state: store.stateByArticle[articleId] ?? "idle",
        message: store.messageByArticle[articleId] ?? "",
        errorDetails: store.errorDetailsByArticle[articleId],
        hasUnavailableAiConnection: store.aiConnectionUnavailableByArticle[articleId] ?? false,
        activity: store.activityByArticle[articleId],
        streamedMessage: store.streamedMessagesByArticle[articleId],
        factCheckClaims: store.factCheckClaimsByArticle[articleId],
        activeRequestId: store.activeRequestIdByArticle[articleId],
    };
}


export type AssistantMessagesState = ReturnType<typeof useAssistantMessages>;
