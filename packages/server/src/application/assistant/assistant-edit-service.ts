import {
    APPLICATION_ERROR, type ArticleRevision, type AssistantCheckpointDraftMode, type AssistantCheckpointPreview,
    type AssistantEditMode, type RestoreAssistantCheckpointResult,
} from "@skladno/shared";

import type { ArticleService } from "../articles/article-service.js";
import { failure, success, type ApplicationResult } from "../errors/application-result.js";
import { unwrapApplicationResult } from "../errors/unwrap-application-result.js";
import { normalizeGeneralSettings } from "../settings/application-settings-normalizers.js";
import type { SettingsStore } from "../settings/settings-store.js";
import { AssistantCheckpointError, AssistantEditError, type AssistantStore } from "./assistant-store.js";


export class AssistantEditService {
    constructor(private readonly assistant: AssistantStore, private readonly settings: SettingsStore, private readonly articles: Pick<ArticleService, "describeContentChange" | "completeRevisionPromotion" | "getArticle">) { }


    getEditMode(articleId: string): AssistantEditMode {
        const defaultMode = normalizeGeneralSettings(this.settings.getSetting("application-general")?.value).defaultAssistantEditMode;
        return this.assistant.getEditMode(articleId, defaultMode);
    }


    setEditMode(articleId: string, mode: AssistantEditMode): AssistantEditMode {
        return this.assistant.setEditMode(articleId, mode);
    }


    async applyEdit(articleId: string, messageId: string): Promise<ArticleRevision> {
        return unwrapApplicationResult(await this.applyPreparedEdit(articleId, messageId));
    }


    private async applyPreparedEdit(articleId: string, messageId: string): Promise<ApplicationResult<ArticleRevision>> {
        const preview = this.runEditOperation(() => this.assistant.previewEdit(articleId, messageId));
        if (!preview.ok)
            return preview;

        const locale = normalizeGeneralSettings(this.settings.getSetting("application-general")?.value).interfaceLocale;
        const description = preview.value
            ? await this.articles.describeContentChange(preview.value.previousContent, preview.value.content, locale, new AbortController().signal)
            : undefined;

        const revision = this.runEditOperation(() => this.assistant.applyEdit(articleId, messageId, description));
        if (!revision.ok)
            return revision;

        return success(await this.articles.completeRevisionPromotion(revision.value, new AbortController().signal));
    }


    rejectTranslation(articleId: string, editorialArtifactId: string): void {
        this.assistant.rejectTranslation(articleId, editorialArtifactId);
    }


    previewCheckpoint(articleId: string, messageId: string): AssistantCheckpointPreview {
        return this.runCheckpoint(() => this.assistant.previewCheckpoint(articleId, messageId));
    }


    async restoreCheckpoint(articleId: string, messageId: string, tailToken: string, draftMode?: AssistantCheckpointDraftMode): Promise<RestoreAssistantCheckpointResult> {
        return unwrapApplicationResult(await this.restorePreparedCheckpoint(articleId, messageId, tailToken, draftMode));
    }


    private async restorePreparedCheckpoint(
        articleId: string, messageId: string, tailToken: string, draftMode?: AssistantCheckpointDraftMode,
    ): Promise<ApplicationResult<RestoreAssistantCheckpointResult>> {
        const previousRevisionId = this.articles.getArticle(articleId)?.currentRevisionId;
        const restored = this.runCheckpointOperation(() => this.assistant.restoreCheckpoint(articleId, messageId, tailToken, draftMode));
        if (!restored.ok)
            return restored;

        const result = restored.value;
        if (result.article.currentRevisionId !== previousRevisionId) {
            const revision = await this.articles.completeRevisionPromotion(result.article.currentRevision, new AbortController().signal);
            const article = this.articles.getArticle(articleId) ?? result.article;
            result.article = article.currentRevisionId === revision.id ? { ...article, currentRevision: revision } : article;
        }

        return success(result);
    }


    private runCheckpoint<T>(operation: () => T): T {
        return unwrapApplicationResult(this.runCheckpointOperation(operation));
    }


    private runCheckpointOperation<T>(operation: () => T): ApplicationResult<T> {
        try {
            return success(operation());
        } catch (error) {
            if (error instanceof AssistantCheckpointError) {
                const errorCode = error.kind === "conflict"
                    ? APPLICATION_ERROR.ASSISTANT_CHECKPOINT_CONFLICT
                    : APPLICATION_ERROR.ASSISTANT_CHECKPOINT_INVALID;
                return failure(errorCode, error.kind);
            }

            throw error;
        }
    }


    private runEditOperation<T>(operation: () => T): ApplicationResult<T> {
        try {
            return success(operation());
        } catch (error) {
            if (!(error instanceof AssistantEditError))
                throw error;

            const code = error.kind === "conflict" ? APPLICATION_ERROR.ASSISTANT_EDIT_CONFLICT : APPLICATION_ERROR.ASSISTANT_EDIT_INVALID;
            return failure(code, error.kind);
        }
    }
}
