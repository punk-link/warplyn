import { useCallback, useRef, useState, type Dispatch, type MutableRefObject, type SetStateAction } from "react";
import type { IntlShape } from "react-intl";
import { APPLICATION_ERROR, ASSISTANT_EVENT, ApplicationClientError, BUILT_IN_SKILL, type ArticleRevision, type AssistantCapabilityActivity, type AssistantEvent, type AssistantMessage, type FactCheckClaimPreview } from "@skladno/shared";
import type { EditorialWorkspaceClient } from "../../application/client.js";
import { getErrorMessageId } from "../../i18n/errors.js";
import type { ArticleWorkspaceState } from "./article-workspace-state.js";
import { getProviderLanguageName } from "./editorial-language.js";
import { fingerprintArticleContent, requestedTranslationLanguages, type AssistantSelectionScope } from "./assistant-selection.js";
import type { StreamBuffer, StreamedAssistantMessage } from "./assistant-streaming.js";
import { runTranslationBatch } from "./translation-request-batch.js";


export type ProposalState = "idle" | "streaming" | "error";


type Setter<T> = Dispatch<SetStateAction<T>>;


export interface AssistantRequestStore {
    messagesByArticle: Record<string, AssistantMessage[]>;
    setMessagesByArticle: Setter<Record<string, AssistantMessage[]>>;
    stateByArticle: Record<string, ProposalState>;
    setStateByArticle: Setter<Record<string, ProposalState>>;
    messageByArticle: Record<string, string>;
    setMessageByArticle: Setter<Record<string, string>>;
    errorDetailsByArticle: Record<string, string>;
    setErrorDetailsByArticle: Setter<Record<string, string>>;
    aiConnectionUnavailableByArticle: Record<string, boolean>;
    setAiConnectionUnavailableByArticle: Setter<Record<string, boolean>>;
    factCheckClaimsByArticle: Record<string, FactCheckClaimPreview[]>;
    setFactCheckClaimsByArticle: Setter<Record<string, FactCheckClaimPreview[]>>;
    activeRequestIdByArticle: Record<string, string>;
    setActiveRequestIdByArticle: Setter<Record<string, string>>;
    activityByArticle: Record<string, AssistantCapabilityActivity>;
    setActivityByArticle: Setter<Record<string, AssistantCapabilityActivity>>;
    streamedMessagesByArticle: Record<string, StreamedAssistantMessage>;
    setStreamedMessagesByArticle: Setter<Record<string, StreamedAssistantMessage>>;
    controllers: MutableRefObject<Map<string, AbortController>>;
    streamBuffers: MutableRefObject<Record<string, StreamBuffer>>;
}


export function useAssistantRequestStore(): AssistantRequestStore {
    const [messagesByArticle, setMessagesByArticle] = useState<Record<string, AssistantMessage[]>>({});
    const [stateByArticle, setStateByArticle] = useState<Record<string, ProposalState>>({});
    const [messageByArticle, setMessageByArticle] = useState<Record<string, string>>({});
    const [errorDetailsByArticle, setErrorDetailsByArticle] = useState<Record<string, string>>({});
    const [aiConnectionUnavailableByArticle, setAiConnectionUnavailableByArticle] = useState<Record<string, boolean>>({});
    const [factCheckClaimsByArticle, setFactCheckClaimsByArticle] = useState<Record<string, FactCheckClaimPreview[]>>({});
    const [activeRequestIdByArticle, setActiveRequestIdByArticle] = useState<Record<string, string>>({});
    const [activityByArticle, setActivityByArticle] = useState<Record<string, AssistantCapabilityActivity>>({});
    const [streamedMessagesByArticle, setStreamedMessagesByArticle] = useState<Record<string, StreamedAssistantMessage>>({});
    const controllers = useRef(new Map<string, AbortController>());
    const streamBuffers = useRef<Record<string, StreamBuffer>>({});

    return {
        messagesByArticle, setMessagesByArticle, stateByArticle, setStateByArticle,
        messageByArticle, setMessageByArticle, errorDetailsByArticle, setErrorDetailsByArticle,
        aiConnectionUnavailableByArticle, setAiConnectionUnavailableByArticle,
        factCheckClaimsByArticle, setFactCheckClaimsByArticle, activeRequestIdByArticle, setActiveRequestIdByArticle, activityByArticle, setActivityByArticle,
        streamedMessagesByArticle, setStreamedMessagesByArticle, controllers, streamBuffers,
    };
}


function isAiConnectionUnavailable(error: unknown): boolean {
    return error instanceof ApplicationClientError && (error.code === APPLICATION_ERROR.ACTIVE_CONNECTION_REQUIRED
        || error.code === APPLICATION_ERROR.AI_CONNECTION_NOT_FOUND
        || error.code === APPLICATION_ERROR.EDITORIAL_CONFIGURATION_MISSING);
}


interface AssistantRequestActionsOptions {
    client: EditorialWorkspaceClient;
    workspace: ArticleWorkspaceState;
    selection: AssistantSelectionScope | undefined;
    intl: IntlShape;
    store: AssistantRequestStore;
    reload: (articleId: string) => Promise<void>;
    clearStream: (articleId: string) => void;
    handleAssistantEvent: (event: AssistantEvent, articleId: string, revisionId: string, streamedId: string) => void;
}


function removeArticleValue<T>(setValue: Setter<Record<string, T>>, articleId: string) {
    setValue((current) => {
        const next = { ...current };
        delete next[articleId];
        return next;
    });
}


export function clearAssistantRequestFeedback(store: AssistantRequestStore, articleId: string) {
    removeArticleValue(store.setMessageByArticle, articleId);
    removeArticleValue(store.setErrorDetailsByArticle, articleId);
    removeArticleValue(store.setAiConnectionUnavailableByArticle, articleId);
    removeArticleValue(store.setActivityByArticle, articleId);
}


function clearRetryFeedback(store: AssistantRequestStore, articleId: string) {
    store.setMessageByArticle((messages) => ({ ...messages, [articleId]: "" }));
    removeArticleValue(store.setErrorDetailsByArticle, articleId);
    removeArticleValue(store.setAiConnectionUnavailableByArticle, articleId);
}


async function finishRequest({ articleId, store, reload, clearStream }: Pick<AssistantRequestActionsOptions, "store" | "reload" | "clearStream"> & { articleId: string }) {
    await reload(articleId);
    clearStream(articleId);
    store.setStateByArticle((states) => ({ ...states, [articleId]: "idle" }));
}


async function recoverRequest({ articleId, error, intl, store, reload, clearStream }: Pick<AssistantRequestActionsOptions, "intl" | "store" | "reload" | "clearStream"> & { articleId: string; error: unknown }) {
    if (error instanceof DOMException && error.name === "AbortError") {
        await reload(articleId).catch(() => undefined);
        clearStream(articleId);
        store.setStateByArticle((states) => ({ ...states, [articleId]: "idle" }));

        return;
    }

    store.setStateByArticle((states) => ({ ...states, [articleId]: "error" }));
    store.setMessageByArticle((messages) => ({ ...messages, [articleId]: intl.formatMessage({ id: "assistant.requestStartFailed" }) }));
    store.setErrorDetailsByArticle((details) => ({
        ...details,
        [articleId]: error instanceof ApplicationClientError
            ? intl.formatMessage({ id: getErrorMessageId(error.code) }, error.parameters)
            : intl.formatMessage({ id: "errors.editorialRequestFailed" }),
    }));

    store.setAiConnectionUnavailableByArticle((connections) => ({ ...connections, [articleId]: isAiConnectionUnavailable(error) }));
    await reload(articleId).catch(() => undefined);
    clearStream(articleId);
}


async function runRequest({ articleId, perform, ...options }: AssistantRequestActionsOptions & { articleId: string; perform: () => Promise<void> }) {
    try {
        await perform();
        await finishRequest({ articleId, ...options });
    } catch (error) {
        await recoverRequest({ articleId, error, ...options });
    }
}


type SelectedArticle = NonNullable<ArticleWorkspaceState["selectedArticle"]>;


async function performNewAssistantRequest({ options, article, authorMessage, explicitSkillId, targetLanguage, skillOffset, batch }: {
    options: AssistantRequestActionsOptions;
    article: SelectedArticle;
    authorMessage: string;
    explicitSkillId: string | undefined;
    targetLanguage: string | undefined;
    skillOffset: number | undefined;
    batch?: { revision: ArticleRevision; controller: AbortController };
}) {
    const creatorRequest = explicitSkillId === BUILT_IN_SKILL.SKILL_CREATOR;
    const saved = creatorRequest || batch ? undefined : await options.workspace.save(article.id);
    const revision = batch?.revision ?? saved ?? article.currentRevision;
    clearAssistantRequestFeedback(options.store, article.id);
    options.store.setStateByArticle((states) => ({ ...states, [article.id]: "streaming" }));
    options.store.setFactCheckClaimsByArticle((claims) => ({ ...claims, [article.id]: [] }));
    const controller = batch?.controller ?? options.store.controllers.current.get(article.id) ?? new AbortController();
    options.store.controllers.current.set(article.id, controller);
    const matchingSelection = await validateRequestSelection(creatorRequest, options.selection, article.id, revision.content);
    const requestId = crypto.randomUUID();
    const streamedId = `streaming-${crypto.randomUUID()}`;

    appendPendingMessage({ store: options.store, articleId: article.id, requestId, authorMessage, explicitSkillId, skillOffset, selection: matchingSelection });

    await options.client.streamAssistantRequest(article.id, {
        kind: "new", requestId, authorMessage,
        interfaceLocale: options.intl.locale,
        scope: matchingSelection
            ? { kind: "selection", baseRevisionId: revision.id, startOffset: matchingSelection.startOffset, endOffset: matchingSelection.endOffset }
            : { kind: "article", baseRevisionId: revision.id },
        ...(explicitSkillId ? { explicitSkillId } : {}),
        ...(skillOffset === undefined ? {} : { skillOffset }),
        ...(targetLanguage ? { targetLanguage: getProviderLanguageName(targetLanguage) } : {}),
    }, (event) => {
        const shouldHandleEventOutsideParallelReviewStream = !batch || event.type !== ASSISTANT_EVENT.TEXT_DELTA;
        if (shouldHandleEventOutsideParallelReviewStream)
            options.handleAssistantEvent(event, article.id, revision.id, streamedId);
    }, controller.signal);
}


async function validateRequestSelection(creatorRequest: boolean, selection: AssistantRequestActionsOptions["selection"], articleId: string, content: string) {
    if (creatorRequest || !selection)
        return undefined;

    if (selection.articleId !== articleId || selection.fingerprint !== await fingerprintArticleContent(content))
        throw new ApplicationClientError("assistant_selection_invalid", undefined, 400);

    return selection;
}


async function performRetryAssistantRequest(options: AssistantRequestActionsOptions & { article: SelectedArticle; retryOfRequestId: string }) {
    const { article } = options;
    clearRetryFeedback(options.store, article.id);
    options.store.setStateByArticle((states) => ({ ...states, [article.id]: "streaming" }));
    const controller = new AbortController();
    options.store.controllers.current.set(article.id, controller);
    const streamedId = `streaming-${crypto.randomUUID()}`;
    await options.client.streamAssistantRequest(article.id, {
        kind: "retry", requestId: crypto.randomUUID(), retryOfRequestId: options.retryOfRequestId, interfaceLocale: options.intl.locale,
    }, (event) => options.handleAssistantEvent(event, article.id, article.currentRevisionId, streamedId), controller.signal);
}


function appendPendingMessage({ store, articleId, requestId, authorMessage, explicitSkillId, skillOffset, selection }: {
    store: AssistantRequestStore;
    articleId: string;
    requestId: string;
    authorMessage: string;
    explicitSkillId: string | undefined;
    skillOffset: number | undefined;
    selection: AssistantSelectionScope | undefined;
}) {
    const timestamp = new Date().toISOString();
    store.setMessagesByArticle((messages) => ({
        ...messages,
        [articleId]: [...(messages[articleId] ?? []), {
            id: `pending-${requestId}`, articleId, requestId, role: "author", kind: "message", status: "completed", content: authorMessage,
            ...(explicitSkillId ? { skillId: explicitSkillId } : {}),
            ...(skillOffset === undefined ? {} : { skillOffset }),
            ...(selection ? { selectionText: selection.preview } : {}),
            createdAt: timestamp, updatedAt: timestamp,
        }],
    }));
}


async function requestAssistant(options: AssistantRequestActionsOptions & { authorMessage: string; explicitSkillId?: string; targetLanguage?: string | readonly string[]; skillOffset?: number }): Promise<void> {
    const { workspace, targetLanguage, authorMessage, explicitSkillId, skillOffset } = options;
    const article = workspace.selectedArticle;
    if (!article || options.store.controllers.current.has(article.id))
        return;

    const controller = new AbortController();
    options.store.controllers.current.set(article.id, controller);
    options.store.setStateByArticle((states) => ({ ...states, [article.id]: "streaming" }));
    const perform = async () => {
        if (targetLanguage && typeof targetLanguage !== "string") {
            const revision = await workspace.save(article.id) ?? article.currentRevision;
            await runTranslationBatch(requestedTranslationLanguages(authorMessage, targetLanguage), controller.signal, (language) =>
                performNewAssistantRequest({ options, article, authorMessage, explicitSkillId, targetLanguage: language, skillOffset, batch: { revision, controller } }));
            return;
        }

        await performNewAssistantRequest({ options, article, authorMessage, explicitSkillId, targetLanguage, skillOffset });
    };
    try {
        await runRequest({ ...options, articleId: article.id, perform });
    } finally {
        if (options.store.controllers.current.get(article.id) === controller)
            options.store.controllers.current.delete(article.id);
    }
}


async function retryAssistant(options: AssistantRequestActionsOptions & { retryOfRequestId: string }): Promise<void> {
    const article = options.workspace.selectedArticle;
    if (!article || options.store.controllers.current.has(article.id))
        return;

    const perform = () => performRetryAssistantRequest({ ...options, article });
    try {
        await runRequest({ ...options, articleId: article.id, perform });
    } finally {
        options.store.controllers.current.delete(article.id);
    }
}


export function useAssistantRequestActions(options: AssistantRequestActionsOptions) {
    const request = useCallback((authorMessage: string, explicitSkillId?: string, targetLanguage?: string | readonly string[], skillOffset?: number) => requestAssistant({ ...options, authorMessage, explicitSkillId, targetLanguage, skillOffset }), [options]);
    const retry = useCallback((retryOfRequestId: string) => retryAssistant({ ...options, retryOfRequestId }), [options]);
    return { request, retry };
}
