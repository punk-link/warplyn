import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { BUILT_IN_SKILL, ELECTRON_LIFECYCLE_EVENT, KEY_BINDING_COMMAND, type AssistantSkillSummary, type KeyBindingOverrides } from "@skladno/shared";
import type { EditorialWorkspaceClient } from "../../application/client.js";
import { useNotifications } from "../../notifications/NotificationProvider.js";
import type { KeyBindingDispatcher } from "../../key-bindings/dispatcher.js";
import { useArticleAttention } from "./use-article-attention.js";
import { useWorkspaceLayout, type WorkspaceLayoutState } from "./useWorkspaceLayout.js";
import { useWorkspaceGeneralSettings } from "./useWorkspaceGeneralSettings.js";
import { useUsableAiConnection } from "./useUsableAiConnection.js";
import { useArticleWorkspace, type ArticleWorkspaceState } from "./article-workspace-state.js";
import { useArticleRevisions } from "./article-revisions-state.js";
import { useEditorialProposal, type EditorialProposalState } from "./editorial-proposal-state.js";
import { useStyleCorpus } from "./style-corpus-state.js";
import { getAssistantSelectionScope, useAssistantMessages, type AssistantMessagesState, type AssistantSelectionScope } from "./assistant-messages-state.js";
import type { AssistantSelectionSnapshot } from "../editor/ArticleEditorPlugins.js";
import { usePublishing } from "./publishing-state.js";
import { createRendererArticleFilesClient } from "../../application/article-files-client.js";
import { useArticleFiles } from "./article-files-state.js";
import { createArticleWithDefaults } from "./article-creation.js";


interface EditorialWorkspaceNavigation {
    openStyleProfile: () => void;
    openSettings: () => void;
    openModelSettings: () => void;
}


interface EditorialWorkspaceBindings {
    dispatcher: KeyBindingDispatcher;
    keyBindingOverrides: KeyBindingOverrides;
}


function useAssistantSelection(workspace: ArticleWorkspaceState) {
    const [assistantSelection, setAssistantSelection] = useState<AssistantSelectionScope>();
    const assistantSelectionVersion = useRef(0);

    useEffect(() => {
        assistantSelectionVersion.current += 1;
        setAssistantSelection(undefined);
    }, [workspace.content, workspace.selectedArticleId]);

    const onSelectionChange = useCallback((snapshot: AssistantSelectionSnapshot | undefined) => {
        const version = ++assistantSelectionVersion.current;
        if (!snapshot || !workspace.selectedArticle) {
            setAssistantSelection(undefined);
            return;
        }

        void getAssistantSelectionScope(workspace.selectedArticle.id, snapshot).then((selection) => {
            if (version === assistantSelectionVersion.current)
                setAssistantSelection(selection);
        });
    }, [workspace]);

    const clearAssistantSelection = useCallback(() => {
        assistantSelectionVersion.current += 1;
        setAssistantSelection(undefined);
    }, []);

    return { assistantSelection, onSelectionChange, clearAssistantSelection };
}


function useAuthorSkills(client: EditorialWorkspaceClient) {
    const intl = useIntl();
    const { notifyError } = useNotifications();
    const [authorSkills, setAuthorSkills] = useState<readonly AssistantSkillSummary[]>([]);
    const loadAuthorSkills = useCallback(async function loadCatalog() {
        try {
            setAuthorSkills(await client.listAssistantSkills());
        } catch (error) {
            notifyError(error, {
                fallbackMessage: intl.formatMessage({ id: "skills.loadFailed" }),
                action: { label: intl.formatMessage({ id: "assistant.retry" }), onAction: () => void loadCatalog() },
            });
        }
    }, [client, intl, notifyError]);
    useEffect(() => {
        void loadAuthorSkills();
    }, [loadAuthorSkills]);

    return { authorSkills, loadAuthorSkills };
}


function useWorkspaceActions({ client, intl, notifyError, workspace, layout, assistant, openSettings }: {
    client: EditorialWorkspaceClient;
    intl: ReturnType<typeof useIntl>;
    notifyError: ReturnType<typeof useNotifications>["notifyError"];
    workspace: ArticleWorkspaceState;
    layout: WorkspaceLayoutState;
    assistant: AssistantMessagesState;
    openSettings: () => void;
}) {
    const createBlank = useCallback(async () => {
        try {
            return await createArticleWithDefaults(client, workspace.create, {
                title: "",
                content: "",
            });
        } catch (error) {
            notifyError(error, { fallbackMessage: intl.formatMessage({ id: "workspace.createArticleFailed" }) });
        }
    }, [client, intl, notifyError, workspace]);

    const enterSettings = useCallback(() => {
        void workspace.flushSelected().catch(() => undefined);
        openSettings();
    }, [openSettings, workspace]);

    const runFactCheck = useCallback(() => {
        layout.setAssistantCollapsed(false);
        void assistant.request("", BUILT_IN_SKILL.FACT_CHECKING);
    }, [assistant, layout]);

    const runTranslation = useCallback((languages: readonly string[]) => {
        if (!languages.length)
            return;

        void assistant.request("", BUILT_IN_SKILL.TRANSLATION, languages, undefined, true);
    }, [assistant]);

    return { createBlank, enterSettings, runFactCheck, runTranslation };
}


function useWorkspaceLifecycle(
    workspace: ArticleWorkspaceState, assistant: AssistantMessagesState,
    restoreAssistantProposal: EditorialProposalState["restoreAssistantProposal"],
) {
    useEffect(() => {
        restoreAssistantProposal(assistant.messages);
    }, [assistant.messages, restoreAssistantProposal]);

    const flushSelectedRef = useRef(workspace.flushSelected);
    flushSelectedRef.current = workspace.flushSelected;

    useEffect(() => {
        const prepareClose = (event: Event) => {
            if (!(event instanceof CustomEvent) || typeof event.detail !== "string")
                return;

            const requestId = event.detail;
            void flushSelectedRef.current().then(
                () => window.dispatchEvent(new CustomEvent(ELECTRON_LIFECYCLE_EVENT.checkpointResult, { detail: JSON.stringify({ requestId, ok: true }) })),
                () => window.dispatchEvent(new CustomEvent(ELECTRON_LIFECYCLE_EVENT.checkpointResult, { detail: JSON.stringify({ requestId, ok: false }) })),
            );
        };

        window.addEventListener(ELECTRON_LIFECYCLE_EVENT.prepareClose, prepareClose);
        return () => window.removeEventListener(ELECTRON_LIFECYCLE_EVENT.prepareClose, prepareClose);
    }, []);
}


function useWorkspaceShortcuts({ dispatcher, active, actions, layout, save, openStyleProfile }: {
    openStyleProfile: () => void;
    dispatcher: KeyBindingDispatcher;
    active: boolean;
    actions: ReturnType<typeof useWorkspaceActions>;
    layout: WorkspaceLayoutState;
    save: ArticleWorkspaceState["save"];
}) {
    const shortcutActions = useRef({
        createBlank: actions.createBlank,
        openStyleProfile,
        save,
        enterSettings: actions.enterSettings,
        setFocusMode: layout.setFocusMode,
        libraryCollapsed: layout.libraryCollapsed,
        setLibraryCollapsed: layout.setLibraryCollapsed,
        assistantCollapsed: layout.assistantCollapsed,
        setAssistantCollapsed: layout.setAssistantCollapsed,
        setView: layout.setView,
    });
    shortcutActions.current = {
        openStyleProfile,
        createBlank: actions.createBlank,
        save,
        enterSettings: actions.enterSettings,
        setFocusMode: layout.setFocusMode,
        libraryCollapsed: layout.libraryCollapsed,
        setLibraryCollapsed: layout.setLibraryCollapsed,
        assistantCollapsed: layout.assistantCollapsed,
        setAssistantCollapsed: layout.setAssistantCollapsed,
        setView: layout.setView,
    };

    useLayoutEffect(() => {
        if (!active)
            return;


        function toggleFocusMode() {
            const activeElement = document.activeElement;
            const focusWillBeLost = !(activeElement instanceof HTMLElement) ||
                activeElement === document.body ||
                Boolean(activeElement.closest("[data-workspace-panel]"));

            if (focusWillBeLost)
                document.querySelector<HTMLElement>("[data-article-workspace]")?.focus({ preventScroll: true });

            shortcutActions.current.setFocusMode((current) => !current);
        }


        const unregister = [
            dispatcher.register(KEY_BINDING_COMMAND.NEW_ARTICLE, () => void shortcutActions.current.createBlank()),
            dispatcher.register(KEY_BINDING_COMMAND.EDITOR_NOTES, () => {
                document.querySelector<HTMLButtonElement>('button[data-editor-command="note"]')?.click();
            }),
            dispatcher.register(KEY_BINDING_COMMAND.SAVE_REVISION, () => void shortcutActions.current.save().catch(() => undefined)),
            dispatcher.register(KEY_BINDING_COMMAND.OPEN_SETTINGS, () => shortcutActions.current.enterSettings()),
            dispatcher.register(KEY_BINDING_COMMAND.TOGGLE_FOCUS_MODE, toggleFocusMode),
            dispatcher.register(KEY_BINDING_COMMAND.TOGGLE_ARTICLE_LIBRARY, () =>
                shortcutActions.current.setLibraryCollapsed(!shortcutActions.current.libraryCollapsed)),
            dispatcher.register(KEY_BINDING_COMMAND.TOGGLE_EDITORIAL_ASSISTANT, () =>
                shortcutActions.current.setAssistantCollapsed(!shortcutActions.current.assistantCollapsed)),
            dispatcher.register(KEY_BINDING_COMMAND.VIEW_WRITE, () => shortcutActions.current.setView("write")),
            dispatcher.register(KEY_BINDING_COMMAND.VIEW_PROPOSAL, () => shortcutActions.current.setView("proposal")),
            dispatcher.register(KEY_BINDING_COMMAND.VIEW_REVISIONS, () => shortcutActions.current.setView("revisions")),
            dispatcher.register(KEY_BINDING_COMMAND.VIEW_FACT_CHECK, () => shortcutActions.current.setView("fact-check")),
            dispatcher.register(KEY_BINDING_COMMAND.VIEW_STYLE_PROFILE, () => shortcutActions.current.openStyleProfile()),
            dispatcher.register(KEY_BINDING_COMMAND.VIEW_TRANSLATIONS, () => shortcutActions.current.setView("translations")),
        ];

        return () => unregister.forEach((remove) => remove());
    }, [dispatcher, active]);
}


export function useEditorialWorkspace({ client, active, navigation, bindings }: {
    client: EditorialWorkspaceClient;
    active: boolean;
    navigation: EditorialWorkspaceNavigation;
    bindings: EditorialWorkspaceBindings;
}) {
    const { openSettings, openStyleProfile, openModelSettings } = navigation;
    const { dispatcher, keyBindingOverrides } = bindings;
    const intl = useIntl();
    const { notifyError } = useNotifications();
    const layout = useWorkspaceLayout();
    const workspace = useArticleWorkspace(client, layout.selectedArticleId, layout.setSelectedArticleId, intl.locale);
    const generalSettings = useWorkspaceGeneralSettings(client, active);
    const hasUsableAiConnection = useUsableAiConnection(client, active);
    const revisions = useArticleRevisions(client, workspace.selectedArticle, workspace.updateRevision, workspace.save, workspace.discardDraft);
    const editorial = useEditorialProposal(client, workspace, () => layout.setView("write"));
    const [profileRebuilt, setProfileRebuilt] = useState<{ articleId: string; count: number; token: number }>();
    const corpus = useStyleCorpus(client, (count) => {
        if (workspace.selectedArticle)
            setProfileRebuilt({ articleId: workspace.selectedArticle.id, count, token: Date.now() });
    });
    const selection = useAssistantSelection(workspace);
    const authorSkills = useAuthorSkills(client);
    const applyAssistantResult = useCallback((
        articleId: string, baseRevisionId: string, result: import("@skladno/shared").AssistantEditorialResult, editorialArtifactId?: string,
    ) => {
        editorial.applyAssistantResult(articleId, baseRevisionId, result, editorialArtifactId);
    }, [editorial]);
    const assistant = useAssistantMessages(client, workspace, selection.assistantSelection, applyAssistantResult, profileRebuilt);
    const attention = useArticleAttention(client, workspace.articles, assistant.libraryActivity);
    const rejectTranslation = useCallback(async (targetLanguage: string) => {
        await editorial.rejectTranslation(targetLanguage);
        if (workspace.selectedArticle)
            await assistant.reload(workspace.selectedArticle.id);
    }, [assistant, editorial, workspace.selectedArticle]);
    const publishing = usePublishing(client, workspace.selectedArticle, workspace.content, workspace.updateArticle);
    const [fileClient] = useState(createRendererArticleFilesClient);
    const articleFiles = useArticleFiles(fileClient, client, workspace, () => layout.setView("write"));
    const actions = useWorkspaceActions({ client, intl, notifyError, workspace, layout, assistant, openSettings });
    useWorkspaceLifecycle(workspace, assistant, editorial.restoreAssistantProposal);
    const enterStyleProfile = () => {
        void workspace.flushSelected().catch(() => undefined);
        openStyleProfile();
    };
    useWorkspaceShortcuts({ dispatcher, active, actions, layout, save: workspace.save, openStyleProfile: enterStyleProfile });

    return {
        content: { layout, workspace, assistant, editorial, revisions, publishing, articleFiles, generalSettings,
            authorSkills: authorSkills.authorSkills, attention: attention.byArticle },
        corpus,
        actions: { ...actions, rejectTranslation, openSettings: actions.enterSettings, openStyleProfile: enterStyleProfile, openModelSettings },
        environment: { dispatcher, shortcutOverrides: keyBindingOverrides, hasUsableAiConnection, loadAuthorSkills: authorSkills.loadAuthorSkills },
        selection,
        markResponseSeen: attention.markSeen,
    };
}
