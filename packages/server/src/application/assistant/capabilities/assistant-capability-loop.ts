import { APPLICATION_ERROR, defaultSkillExecution, HTTP_STATUS } from "@skladno/shared";
import { randomUUID } from "node:crypto";

import { ApplicationServiceError } from "../../errors/application-service-error.js";
import { EDITORIAL_ENGINE_EVENT } from "../../editorial/engine/editorial-engine-events.js";
import { EDITORIAL_ENGINE_ERROR } from "../../editorial/engine/editorial-engine-errors.js";
import { EditorialEngineError } from "../../editorial/engine/editorial-engine-error.js";
import type { EditorialEngineEvent } from "../../editorial/engine/editorial-engine-event.js";
import type { EditorialAssistantTool } from "../../editorial/engine/editorial-assistant-tool.js";
import {
    EDITORIAL_CAPABILITY, isValidatedEditorialCapabilityCall, type EditorialCapabilityCatalog, type EditorialCapabilityDefinition,
} from "./editorial-capability-catalog.js";
import type { ActionCapability } from "./action-capability.js";
import type { CompletionEvent } from "../completion/completion-event.js";
import type { PreparedAssistantRequest } from "../requests/prepared-assistant-request.js";
import type { ReadCapability } from "./read-capability.js";
import type { AssistantStore } from "../assistant-store.js";
import type { EditorialEngineResolver } from "../../editorial/engine/editorial-engine-resolver.js";
import type { ConversationHistory } from "../requests/conversation-history.js";
import { AssistantSkillCatalog } from "../skills/assistant-skill-catalog.js";
import { AssistantToolProgress } from "./assistant-tool-progress.js";
import { captureArtifactProgress } from "./assistant-artifact-progress.js";
import type { AuthorSkillService } from "../skills/author-skill-service.js";
import { AuthorSkillChatActions } from "../skills/author-skill-chat-actions.js";
import type { CommittedAuthorSkillChange } from "../skills/committed-author-skill-change.js";
import { AssistantArtifactExecution } from "./assistant-artifact-execution.js";
import { getExactCharacterReplacement } from "./assistant-character-replacement.js";
import { resolveRequestSkill } from "../skills/resolve-request-skill.js";
import { getSkillCapabilities, getSkillOrchestrationInstructions } from "../skills/skill-execution.js";
import { createAssistantStreamContext } from "./assistant-stream-context.js";
import { getAssistantArticleExcerpt } from "../assistant-engine-request.js";
import { formatSelectionContext, getSelectionContext } from "../../editorial/selection-context.js";


function isTransientReadFailure(error: unknown): boolean {
    return error instanceof ApplicationServiceError && error.code === APPLICATION_ERROR.EDITORIAL_PROVIDER_FAILED;
}


export class AssistantCapabilityLoop {
    private readonly authorSkillActions?: AuthorSkillChatActions;


    constructor(private readonly dependencies: {
        assistant: Pick<AssistantStore, "setExecution" | "resolveRequest">;
        engines: Pick<EditorialEngineResolver, "resolveAssistantActionIntentVerifier">;
        capabilities?: Pick<EditorialCapabilityCatalog, "getDefinitions" | "discover" | "read" | "executeAction" | "stream">;
        authorSkills?: AuthorSkillService;
        skills: AssistantSkillCatalog;
        conversationHistory: (articleId: string, limit?: number) => ConversationHistory;
    }) {
        if (dependencies.authorSkills)
            this.authorSkillActions = new AuthorSkillChatActions(dependencies.authorSkills, dependencies.engines);
    }


    async qualifiesReplacement(request: PreparedAssistantRequest, replacement: string, signal: AbortSignal): Promise<boolean> {
        const verifier = this.dependencies.engines.resolveAssistantActionIntentVerifier?.();
        try {
            const source = request.scope.kind === "selection"
                ? request.article.content.slice(request.scope.startOffset, request.scope.endOffset)
                : request.article.content;
            if (replacement === getExactCharacterReplacement(request, source))
                return true;

            if (!verifier?.verifyReplacement)
                return false;

            return await verifier.verifyReplacement(request.authorMessage, source, replacement, request.scope.kind, signal);
        } catch {
            signal.throwIfAborted();
            return false;
        }
    }


    async authorizesArticleEditIntent(request: PreparedAssistantRequest, signal: AbortSignal): Promise<boolean> {
        const verifier = this.dependencies.engines.resolveAssistantActionIntentVerifier?.();
        if (!verifier)
            return false;

        try {
            return await verifier.verify(request.authorMessage, "apply_article_edit", { target: request.scope.kind }, signal);
        } catch {
            signal.throwIfAborted();
            return false;
        }
    }


    async *stream(request: PreparedAssistantRequest, signal: AbortSignal): AsyncIterable<EditorialEngineEvent> {
        if (!request.execution.engine.streamAssistant || !this.dependencies.capabilities)
            throw new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT, EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT);

        const excerpt = getAssistantArticleExcerpt(request);
        const summaries = this.dependencies.skills.discover();
        const skills = this.dependencies.skills.load(summaries.map((skill) => skill.reference)).map((skill) => request.resolvedSkill?.reference.id === skill.reference.id ? request.resolvedSkill : skill);
        request.resolvedSkill ??= skills.find((skill) => skill.reference.id === request.resolvedSkillId);
        if (request.resolvedSkillId && !request.resolvedSkill)
            throw new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT, EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT);

        const selectedSkills = request.resolvedSkill ? [request.resolvedSkill] : [];
        request.loadedSkills ??= [...selectedSkills];
        const initialActiveCapabilities = await this.getRequestCapabilities(request, signal);

        const authorContext = request.authorMessage;
        let primary: CompletionEvent | undefined;
        const progress = new AssistantToolProgress();
        const tools = this.createCapabilityTools(request, excerpt, authorContext, () => primary, (event) => {
            primary = event;
        }, (event) => progress.push(event));

        const editorialRequest = {
            message: request.authorMessage,
            interfaceLocale: request.interfaceLocale,
            article: "",
            scope: request.scope.kind,
            instructions: [...selectedSkills.map(getSkillOrchestrationInstructions), ...(request.targetLanguage ? [`Target translation language: ${request.targetLanguage}`] : [])],
            history: this.dependencies.conversationHistory(request.articleId, 12),
            skills: skills.filter((skill) => (skill.scopes ?? ["article", "selection"]).includes(request.scope.kind)).map((skill) => ({ id: skill.reference.id, name: skill.name, description: skill.description, instructions: getSkillOrchestrationInstructions(skill), capabilities: getSkillCapabilities(skill, request.scope.kind) })),
            onSkillLoaded: (id: string) => {
                const skill = skills.find((candidate) => candidate.reference.id === id);
                if (skill)
                    resolveRequestSkill(request, skill, this.dependencies.assistant);
            },
            tools,
            ...(initialActiveCapabilities ? { initialActiveCapabilities } : {}),
        };

        yield* progress.stream(request.execution.engine.streamAssistant(editorialRequest, signal), (event) => this.resolveStreamEvent(request, event, primary));
    }


    private async getRequestCapabilities(request: PreparedAssistantRequest, signal: AbortSignal): Promise<readonly string[] | undefined> {
        if (request.resolvedSkill)
            return getSkillCapabilities(request.resolvedSkill, request.scope.kind);

        request.editIntentAuthorized = await this.authorizesArticleEditIntent(request, signal);
        return request.editIntentAuthorized ? [EDITORIAL_CAPABILITY.GENERATE_PROPOSAL] : undefined;
    }


    private resolveStreamEvent(request: PreparedAssistantRequest, event: EditorialEngineEvent, primary?: CompletionEvent): EditorialEngineEvent | undefined {
        if (event.type === EDITORIAL_ENGINE_EVENT.TEXT_DELTA && (primary || request.editIntentAuthorized))
            return undefined;

        if (event.type !== EDITORIAL_ENGINE_EVENT.COMPLETED)
            return event;

        if (primary)
            return primary;

        if (request.execution.operation || (request.resolvedSkill && (request.resolvedSkill.execution ?? defaultSkillExecution).capability !== "manage_skills"))
            throw new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT, EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT);

        return event;
    }


    private createCapabilityTools(request: PreparedAssistantRequest, excerpt: string, authorContext: string, primary: () => CompletionEvent | undefined, setPrimary: (event: CompletionEvent) => void, onProgress: (event: EditorialEngineEvent) => void): EditorialAssistantTool[] {
        if (!this.dependencies.capabilities)
            return [];

        const definitions = request.scope.kind === "selection"
            ? this.dependencies.capabilities.getDefinitions().filter((definition) => definition.execution === "artifact" && definition.selectionCompatible)
            : this.dependencies.capabilities.getDefinitions();
        const artifact = new AssistantArtifactExecution();
        const tools: EditorialAssistantTool[] = definitions.map((definition) => ({
            capability: definition.id,
            description: definition.activity,
            input: definition.input,
            execution: definition.execution,
            execute: (input, signal) => {
                const scopedInput = definition.id === EDITORIAL_CAPABILITY.TRANSLATE && request.targetLanguage
                    ? { ...input, targetLanguage: request.targetLanguage }
                    : input;
                const run = () => this.executeCapability(request, excerpt, authorContext, definition, scopedInput, signal, primary, setPrimary, onProgress);
                return definition.execution === "artifact" ? artifact.execute(definition.id, scopedInput, run) : run();
            },
        }));

        tools.push({
            capability: "find_capabilities",
            description: "Find only classified Warplyn Editorial capabilities, Workspace handoffs, or exclusions for the requested outcome.",
            input: "capability-query",
            execute: async (input) => this.dependencies.capabilities!.discover(input.query ?? "", request.scope.kind),
        });

        if (this.authorSkillActions)
            tools.push(...this.authorSkillActions.tools(request));

        if (request.scope.kind === "selection" && request.resolvedSkill?.execution?.capability !== "manage_skills") {
            const scope = request.scope;
            tools.push({
                capability: "read_selection",
                description: "Read the selected source and bounded read-only neighboring context only when answering requires Article text. " +
                    "Never use for greetings, general advice, or Skill management. No other Article text is available in selection scope.",
                input: "none",
                execute: async (_input, signal) => {
                    signal.throwIfAborted();

                    this.dependencies.capabilities!.read({
                        capability: EDITORIAL_CAPABILITY.INSPECT_ARTICLE,
                        context: { articleId: request.articleId, baseRevisionId: scope.baseRevisionId },
                    });

                    return {
                        selectedSource: excerpt,
                        readOnlyContext: formatSelectionContext(getSelectionContext(request.article.content, scope.startOffset, scope.endOffset)),
                    };
                },
            });
        }

        return tools;
    }


    commitPendingSkill(request: PreparedAssistantRequest): CommittedAuthorSkillChange | undefined {
        return this.authorSkillActions?.commit(request);
    }


    rollbackCreatedSkill(change: CommittedAuthorSkillChange): void {
        this.authorSkillActions?.rollback(change);
    }


    finishPendingSkillBestEffort(requestId: string): void {
        try {
            this.dependencies.authorSkills?.finishChange(requestId);
        } catch {
            // Best-effort cleanup must not replace the Assistant operation's result.
        }
    }


    private async executeCapability(request: PreparedAssistantRequest, excerpt: string, authorContext: string, definition: EditorialCapabilityDefinition, input: Readonly<Record<string, string>>, signal: AbortSignal, primary: () => CompletionEvent | undefined, setPrimary: (event: CompletionEvent) => void, onProgress: (event: EditorialEngineEvent) => void): Promise<unknown> {
        signal.throwIfAborted();
        if (!isValidatedEditorialCapabilityCall(definition.id, input))
            throw new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT, EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT);

        request.execution.capabilityActivities.push({ summary: definition.activity, status: "started" });
        this.dependencies.assistant.setExecution(request.requestId, definition.id);

        if (definition.execution === "read")
            return this.executeReadCapability(request, definition, input);

        if (definition.execution === "action")
            return this.stageAction(request, definition, input, signal);

        return this.streamArtifactCapability(request, excerpt, authorContext, definition, input, signal, primary, setPrimary, onProgress);
    }


    private executeReadCapability(request: PreparedAssistantRequest, definition: EditorialCapabilityDefinition, input: Readonly<Record<string, string>>): unknown {
        const read = () => this.dependencies.capabilities!.read({
            capability: definition.id as ReadCapability,
            context: { articleId: request.articleId, baseRevisionId: request.scope.baseRevisionId },
            input,
        });

        let result: unknown;
        try {
            result = read();
        } catch (error) {
            if (definition.retry !== "transient-read" || !isTransientReadFailure(error))
                throw error;

            result = read();
        }

        this.completeCapability(request, definition);
        return result;
    }


    private async stageAction(request: PreparedAssistantRequest, definition: EditorialCapabilityDefinition, input: Readonly<Record<string, string>>, signal: AbortSignal): Promise<{ status: "staged" }> {
        const action = definition.id as ActionCapability;
        const verifier = this.dependencies.engines.resolveAssistantActionIntentVerifier?.();
        if (!verifier || !await verifier.verify(request.authorMessage, action, input, signal))
            throw new ApplicationServiceError(APPLICATION_ERROR.INVALID_REQUEST, HTTP_STATUS.BAD_REQUEST);

        signal.throwIfAborted();
        request.execution.authorizedActions = [...request.execution.authorizedActions, action];
        request.execution.pendingActions.push({ capability: action, input });
        this.completeCapability(request, definition);

        return { status: "staged" };
    }


    private async streamArtifactCapability(request: PreparedAssistantRequest, excerpt: string, authorContext: string, definition: EditorialCapabilityDefinition, input: Readonly<Record<string, string>>, signal: AbortSignal, primary: () => CompletionEvent | undefined, setPrimary: (event: CompletionEvent) => void, onProgress: (event: EditorialEngineEvent) => void): Promise<{ status: "prepared" }> {
        const execution = request.resolvedSkill?.execution ?? defaultSkillExecution;
        if (request.resolvedSkill && (execution.capability !== definition.id || (execution.capability === "generate_proposal" && execution.operation !== input.operation)))
            throw new ApplicationServiceError(APPLICATION_ERROR.INVALID_REQUEST, HTTP_STATUS.BAD_REQUEST);

        const exactReplacement = definition.id === EDITORIAL_CAPABILITY.GENERATE_PROPOSAL ? getExactCharacterReplacement(request, excerpt) : undefined;
        if (exactReplacement) {
            request.execution.completedCapability = definition.id;
            setPrimary({ type: EDITORIAL_ENGINE_EVENT.COMPLETED, responseId: randomUUID(), text: exactReplacement });
            this.completeCapability(request, definition);

            return { status: "prepared" };
        }

        const context = createAssistantStreamContext(request, excerpt, authorContext, definition, input);
        const stream = this.dependencies.capabilities!.stream(context, signal, true);
        for await (const event of stream) {
            signal.throwIfAborted();
            if (event.type !== EDITORIAL_ENGINE_EVENT.COMPLETED) {
                captureArtifactProgress(request, definition, event, onProgress);
                continue;
            }

            if (primary())
                throw new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT, EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT);

            this.recordCompletedArtifact(request, definition, event);
            setPrimary(event);
        }

        signal.throwIfAborted();
        if (!primary())
            throw new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INCOMPLETE_STREAM, EDITORIAL_ENGINE_ERROR.INCOMPLETE_STREAM);

        this.completeCapability(request, definition);
        return { status: "prepared" };
    }


    private recordCompletedArtifact(request: PreparedAssistantRequest, definition: EditorialCapabilityDefinition, event: CompletionEvent): void {
        if (definition.id === EDITORIAL_CAPABILITY.FACT_CHECK && event.factCheck)
            request.execution.partialFactCheck = event.factCheck;

        request.execution.completedCapability = definition.id;
    }


    private completeCapability(request: PreparedAssistantRequest, definition: EditorialCapabilityDefinition): void {
        request.execution.capabilityActivities.push({ summary: definition.activity, status: "completed" });
        this.dependencies.assistant.setExecution(request.requestId, definition.id, "completed");
    }
}
