import { APPLICATION_ERROR, type AssistantCheckpointDraftMode, type AssistantCheckpointPreview, type AssistantEditCandidate, type AssistantEditMode, type AssistantMessage, type AssistantRequest, type AssistantRequestScope, type AssistantResponseKind, type AssistantSkillSource, type ArticleRevision, type RestoreAssistantCheckpointResult } from "@skladno/shared";


export class AssistantCheckpointError extends Error {
    readonly code: typeof APPLICATION_ERROR.ASSISTANT_CHECKPOINT_INVALID | typeof APPLICATION_ERROR.ASSISTANT_CHECKPOINT_CONFLICT;


    constructor(readonly kind: "invalid" | "conflict") {
        super(kind);
        this.code = kind === "invalid" ? APPLICATION_ERROR.ASSISTANT_CHECKPOINT_INVALID : APPLICATION_ERROR.ASSISTANT_CHECKPOINT_CONFLICT;
    }
}


export class AssistantEditError extends Error {
    readonly code: typeof APPLICATION_ERROR.ASSISTANT_EDIT_INVALID | typeof APPLICATION_ERROR.ASSISTANT_EDIT_CONFLICT;


    constructor(readonly kind: "invalid" | "conflict") {
        super(kind);
        this.code = kind === "invalid" ? APPLICATION_ERROR.ASSISTANT_EDIT_INVALID : APPLICATION_ERROR.ASSISTANT_EDIT_CONFLICT;
    }
}


export interface AssistantStore {
    ensureGreeting(articleId: string): void;
    listMessageHistory(articleId: string): import("@skladno/shared").AssistantMessageHistory;
    listConversationHistory(articleId: string, limit?: number): import("./requests/conversation-history.js").ConversationHistory;
    listMessages(articleId: string): AssistantMessage[];
    getEditMode(articleId: string, defaultMode: AssistantEditMode): AssistantEditMode;
    setEditMode(articleId: string, mode: AssistantEditMode): AssistantEditMode;
    previewEdit(articleId: string, messageId: string): { previousContent: string; content: string } | undefined;
    applyEdit(articleId: string, messageId: string, description?: string): ArticleRevision;
    getRequest(requestId: string): AssistantRequest | undefined;
    createRequest(input: { id: string; articleId: string; authorMessage?: string; scope: AssistantRequestScope; explicitSkillId?: string; skillOffset?: number; targetLanguage?: string; retryOfRequestId?: string }): AssistantRequest;
    setAuthorMessage(requestId: string, content: string): void;
    resolveRequest(requestId: string, skillId: string | undefined, source: AssistantSkillSource | undefined): void;
    setExecution(requestId: string, capability: string, status?: "started" | "completed" | "failed" | "cancelled"): void;
    completeRun<T>(run: () => T): T;
    completeRequest(input: { requestId: string; articleId: string; skillId?: string; responseKind: AssistantResponseKind; content: string; proposalContent?: string; editorialArtifactId?: string; editCandidate?: AssistantEditCandidate; directEdit?: boolean; editDescription?: string }): AssistantMessage;
    rejectTranslation(articleId: string, editorialArtifactId: string): boolean;
    failRequest(requestId: string, status: "failed" | "cancelled", errorCode: string): void;
    previewCheckpoint(articleId: string, messageId: string): AssistantCheckpointPreview;
    restoreCheckpoint(articleId: string, messageId: string, tailToken: string, draftMode?: AssistantCheckpointDraftMode): RestoreAssistantCheckpointResult;
}
