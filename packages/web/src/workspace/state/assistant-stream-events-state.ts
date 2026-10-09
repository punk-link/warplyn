import { useCallback, useEffect } from "react";
import { ASSISTANT_EVENT, type AssistantEditorialResult, type AssistantEvent } from "@skladno/shared";
import type { ArticleWorkspaceState } from "./article-workspace-state.js";
import type { AssistantRequestStore } from "./assistant-request-state.js";
import { updateStreamedMessage } from "./assistant-streaming.js";
import { messages } from "../../i18n/messages.js";
import { useIntl } from "react-intl";
import { useNotifications } from "../../notifications/NotificationProvider.js";
import { notifyTitleGeneration } from "./article-title-notification.js";


interface AssistantStreamEventsOptions {
    articleId: string | undefined;
    workspace: ArticleWorkspaceState;
    store: AssistantRequestStore;
    onResult: (articleId: string, baseRevisionId: string, result: AssistantEditorialResult, editorialArtifactId?: string) => void;
}


export function useAssistantStreamEvents({ articleId, workspace, store, onResult }: AssistantStreamEventsOptions) {
    const intl = useIntl();
    const { notify } = useNotifications();
    const { streamBuffers, setActivityByArticle, setFactCheckClaimsByArticle, setActiveRequestIdByArticle, setStreamedMessagesByArticle } = store;
    const clearStream = useCallback((id: string) => {
        delete streamBuffers.current[id];
        setStreamedMessagesByArticle((current) => {
            const next = { ...current };
            delete next[id];

            return next;
        });
    }, [setStreamedMessagesByArticle, streamBuffers]);

    useEffect(() => {
        streamBuffers.current = {};
        setStreamedMessagesByArticle({});
    }, [articleId, setStreamedMessagesByArticle, streamBuffers]);

    const handleAssistantEvent = useCallback((event: AssistantEvent, id: string, revisionId: string, streamedId: string) => {
        switch (event.type) {
            case ASSISTANT_EVENT.ACCEPTED:
                setActiveRequestIdByArticle((current) => ({ ...current, [id]: event.requestId }));
                break;
            case ASSISTANT_EVENT.CAPABILITY_ACTIVITY:
                setActivityByArticle((current) => ({ ...current, [id]: event.activity }));
                break;
            case ASSISTANT_EVENT.TOOL_STATUS: {
                if (!event.claims)
                    break;

                const { claims } = event;
                setFactCheckClaimsByArticle((current) => ({ ...current, [id]: claims }));
                setActivityByArticle((current) => ({ ...current, [id]: { summary: messages["assistant.checkingClaims"], status: "started" } }));
                break;
            }
            case ASSISTANT_EVENT.COMPLETED: {
                if (!event.result)
                    break;

                const result = event.result;
                applyCompletedResult({ workspace, onResult }, id, revisionId, result, event.editorialArtifactId);
                notifyTitleGeneration(result.titleGeneration, intl, notify);

                if (result.factCheck) {
                    const { factCheck } = result;
                    setFactCheckClaimsByArticle((claims) => ({ ...claims, [id]: factCheck.findings.map(({ claim }) => ({ claim, checked: true })) }));
                }

                break;
            }
        }

        updateStreamedMessage({
            event, articleId: id, streamedId, buffers: streamBuffers.current,
            update: (next) => setStreamedMessagesByArticle((current) => ({ ...current, [id]: { ...next, createdAt: current[id]?.createdAt ?? next.createdAt } })),
        });
    }, [intl, notify, onResult, setActivityByArticle, setFactCheckClaimsByArticle, setActiveRequestIdByArticle, setStreamedMessagesByArticle, streamBuffers, workspace]);


    return { clearStream, handleAssistantEvent };
}


function applyCompletedResult({ workspace, onResult }: Pick<AssistantStreamEventsOptions, "workspace" | "onResult">, id: string, revisionId: string, result: AssistantEditorialResult, artifactId: string | undefined): void {
    onResult(id, revisionId, result, artifactId);
    if (result.metadataChanged || result.articleChanged)
        void workspace.refreshArticle(id, Boolean(result.articleChanged)).catch(() => undefined);
}
