import type { AssistantEvent, StartAssistantRequest } from "../../assistant/assistant.js";
import type { Article } from "../../articles/article/article.js";
import type { ArticleDraft } from "../../articles/draft/draft.js";
import type { ApplicationErrorPayload } from "../../cross-cutting/errors.js";
import type { EditorialEvent, StartEditorialRequest } from "../../editorial/editorial.js";
import type { EditorialWorkspaceClient } from "../client.js";


export const ELECTRON_IPC_CHANNEL = {
    invoke: "skladno:application:invoke",
    stream: "skladno:application:stream",
    streamEvent: "skladno:application:stream-event",
    cancel: "skladno:application:cancel",
} as const;


export const ELECTRON_APPLICATION_METHOD = {
    listArticleSummaries: "listArticleSummaries",
    getArticle: "getArticle",
    listArticleRevisionSummaries: "listArticleRevisionSummaries",
    getArticleRevision: "getArticleRevision",
    getHealth: "getHealth",
    getApplicationSettings: "getApplicationSettings",
    updateGeneralSettings: "updateGeneralSettings",
    updateBackupPolicy: "updateBackupPolicy",
    updateKeyBindingOverrides: "updateKeyBindingOverrides",
    addAiConnection: "addAiConnection",
    updateAiConnection: "updateAiConnection",
    removeAiConnection: "removeAiConnection",
    setAiConnectionActive: "setAiConnectionActive",
    testAiConnection: "testAiConnection",
    refreshAiModels: "refreshAiModels",
    updateModelPreferences: "updateModelPreferences",
    updateAppModel: "updateAppModel",
    listArticles: "listArticles",
    createArticle: "createArticle",
    updateArticle: "updateArticle",
    deleteArticle: "deleteArticle",
    setArticleArchived: "setArticleArchived",
    setArticlePinned: "setArticlePinned",
    reorderPinnedArticles: "reorderPinnedArticles",
    saveArticleDraft: "saveArticleDraft",
    discardArticleDraft: "discardArticleDraft",
    saveArticleRevision: "saveArticleRevision",
    listArticleRevisions: "listArticleRevisions",
    acceptProposal: "acceptProposal",
    summarizeProposal: "summarizeProposal",
    restoreRevision: "restoreRevision",
    listAssistantSkills: "listAssistantSkills",
    listAssistantMessageHistory: "listAssistantMessageHistory",
    listAssistantMessages: "listAssistantMessages",
    setAssistantClaimSelected: "setAssistantClaimSelected",
    getAssistantEditMode: "getAssistantEditMode",
    setAssistantEditMode: "setAssistantEditMode",
    applyAssistantEdit: "applyAssistantEdit",
    rejectTranslation: "rejectTranslation",
    previewAssistantCheckpoint: "previewAssistantCheckpoint",
    restoreAssistantCheckpoint: "restoreAssistantCheckpoint",
    listFactChecks: "listFactChecks",
    resolveFactCheckFinding: "resolveFactCheckFinding",
    getStyleCorpus: "getStyleCorpus",
    addStyleCorpusItem: "addStyleCorpusItem",
    setStyleCorpusItemIncluded: "setStyleCorpusItemIncluded",
    setStyleCorpusRules: "setStyleCorpusRules",
    setTypographyRules: "setTypographyRules",
    setTypographyConfiguration: "setTypographyConfiguration",
    getArticleTypography: "getArticleTypography",
    getTypographyReview: "getTypographyReview",
    rebuildStyleCorpus: "rebuildStyleCorpus",
    getArticleStyleRules: "getArticleStyleRules",
    setArticleStyleRules: "setArticleStyleRules",
    addArticleRevisionStyleCorpusItem: "addArticleRevisionStyleCorpusItem",
    removeStyleCorpusItem: "removeStyleCorpusItem",
    getPublishingSettings: "getPublishingSettings",
    setPublishingSettings: "setPublishingSettings",
} as const satisfies Partial<{ [Method in keyof EditorialWorkspaceClient]: Method }>;


export type ElectronApplicationMethod = keyof typeof ELECTRON_APPLICATION_METHOD;

export type ElectronApplicationArguments<Method extends ElectronApplicationMethod> = [...Parameters<NonNullable<EditorialWorkspaceClient[Method]>>];

export type ElectronApplicationResult<Method extends ElectronApplicationMethod> = Awaited<ReturnType<NonNullable<EditorialWorkspaceClient[Method]>>>;

export type ElectronInvokeRequest = {
    [Method in ElectronApplicationMethod]: {
        method: Method;
        args: ElectronApplicationArguments<Method>;
    };
}[ElectronApplicationMethod];

export type ElectronInvokeResult<Method extends ElectronApplicationMethod = ElectronApplicationMethod> = {
    [Key in Method]:
        | { ok: true; value: ElectronApplicationResult<Key> }
        | { ok: false; error: ElectronIpcError };
}[Method];


export interface ElectronIpcError extends ApplicationErrorPayload {
    status: number;
    article?: Article;
    draft?: ArticleDraft;
}


export type ElectronStreamRequest =
    | {
        streamId: string;
        kind: "assistant";
        articleId: string;
        input: StartAssistantRequest;
    }
    | {
        streamId: string;
        kind: "editorial";
        articleId: string;
        input: StartEditorialRequest;
    };


export type ElectronStreamEvent =
    | {
        streamId: string;
        kind: "assistant";
        event: AssistantEvent;
    }
    | {
        streamId: string;
        kind: "editorial";
        event: EditorialEvent;
    };


export interface ElectronCancelRequest {
    streamId: string;
}


export type ElectronApplicationBridge = Omit<EditorialWorkspaceClient, "streamAssistantRequest" | "streamEditorial"> & {
    streamAssistantRequest(streamId: string, articleId: string, input: StartAssistantRequest, onEvent: (event: AssistantEvent) => void): Promise<void>;
    streamEditorial(streamId: string, articleId: string, input: StartEditorialRequest, onEvent: (event: EditorialEvent) => void): Promise<void>;
    cancelStream(streamId: string): void;
};


export function isElectronApplicationMethod(value: unknown): value is ElectronApplicationMethod {
    return typeof value === "string" && Object.values(ELECTRON_APPLICATION_METHOD).includes(value as ElectronApplicationMethod);
}
