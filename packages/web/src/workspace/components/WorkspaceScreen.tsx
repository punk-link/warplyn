import type { AssistantSkillSummary, GeneralSettings, KeyBindingOverrides } from "@skladno/shared";
import type { ReactNode } from "react";

import type { KeyBindingDispatcher } from "../../key-bindings/dispatcher.js";
import type { AssistantSelectionSnapshot } from "../editor/ArticleEditorPlugins.js";
import type { ArticleRevisionsState } from "../state/article-revisions-state.js";
import type { ArticleWorkspaceState } from "../state/article-workspace-state.js";
import type { AssistantMessagesState, AssistantSelectionScope } from "../state/assistant-messages-state.js";
import type { EditorialProposalState } from "../state/editorial-proposal-state.js";
import type { PublishingState } from "../state/publishing-state.js";
import type { ArticleFilesState } from "../state/article-files-state.js";
import type { WorkspaceLayoutState } from "../state/useWorkspaceLayout.js";
import { ArticleLibraryPanel } from "./ArticleLibraryPanel.js";
import { ArticleWorkspace } from "./ArticleWorkspace.js";
import { EditorialAssistantPanel } from "./EditorialAssistantPanel.js";
import { WorkspaceShell } from "./WorkspaceShell.js";
import { TelemetryInvitation } from "./TelemetryInvitation.js";
import { useNotifications } from "../../notifications/NotificationProvider.js";
import { getDesktopSettingsClient } from "../../application/desktop-client.js";


interface WorkspaceScreenContent {
    layout: WorkspaceLayoutState;
    workspace: ArticleWorkspaceState;
    assistant: AssistantMessagesState;
    editorial: EditorialProposalState;
    revisions: ArticleRevisionsState;
    publishing: PublishingState;
    articleFiles: ArticleFilesState;
    generalSettings: GeneralSettings;
    authorSkills: readonly AssistantSkillSummary[];
}


interface WorkspaceScreenActions {
    openStyleProfile: () => void;
    createBlank: () => Promise<unknown>;
    runFactCheck: () => void;
    runTranslation: (languages: readonly string[]) => void;
    rejectTranslation: (targetLanguage: string) => Promise<void>;
    openSettings: () => void;
    openModelSettings: () => void;
}


interface WorkspaceScreenEnvironment {
    dispatcher: KeyBindingDispatcher;
    shortcutOverrides: KeyBindingOverrides;
    hasUsableAiConnection: boolean | undefined;
    loadAuthorSkills: () => Promise<void>;
    overlays: ReactNode;
}


interface WorkspaceScreenSelection {
    assistantSelection: AssistantSelectionScope | undefined;
    onSelectionChange: (snapshot: AssistantSelectionSnapshot | undefined) => void;
    clearAssistantSelection: () => void;
}


export function WorkspaceScreen({ content, actions, environment, selection }: {
    content: WorkspaceScreenContent;
    actions: WorkspaceScreenActions;
    environment: WorkspaceScreenEnvironment;
    selection: WorkspaceScreenSelection;
}) {
    const { layout, workspace, assistant, editorial, revisions, publishing, articleFiles, generalSettings, authorSkills } = content;
    const { createBlank, runFactCheck, runTranslation, rejectTranslation, openSettings, openStyleProfile, openModelSettings } = actions;
    const { dispatcher, shortcutOverrides, hasUsableAiConnection, loadAuthorSkills, overlays } = environment;
    const { assistantSelection, onSelectionChange, clearAssistantSelection } = selection;
    const { notifyError } = useNotifications();
    const desktop = getDesktopSettingsClient();
    return <WorkspaceShell
        layout={{
            focusMode: layout.focusMode,
            libraryCollapsed: layout.libraryCollapsed,
            setLibraryCollapsed: layout.setLibraryCollapsed,
            assistantCollapsed: layout.assistantCollapsed,
            setAssistantCollapsed: layout.setAssistantCollapsed,
            assistantOpenRequest: layout.assistantOpenRequest,
            libraryWidth: layout.libraryWidth,
            setLibraryWidth: layout.setLibraryWidth,
            assistantWidth: layout.assistantWidth,
            setAssistantWidth: layout.setAssistantWidth,
        }}
        content={{
            library: <ArticleLibraryPanel
                files={articleFiles}
                data={{ articles: workspace.articles, selectedArticleId: workspace.selectedArticleId, collapsed: layout.libraryCollapsed, language: workspace.selectedArticle?.language }}
                navigation={{ selectArticle: workspace.selectArticle, setCollapsed: layout.setLibraryCollapsed,
                    createBlank, openStyleProfile, openSettings, dispatcher, shortcutOverrides }}
                mutations={{ remove: workspace.remove, setArchived: workspace.setArchived, setPinned: workspace.setPinned, reorderPinned: workspace.reorderPinned, notifyError }} />,
            assistant: <EditorialAssistantPanel
                key={workspace.selectedArticle?.id}
                data={{
                    articleId: workspace.selectedArticle?.id,
                    state: assistant.state,
                    message: assistant.message,
                    errorDetails: assistant.errorDetails,
                    hasUnavailableAiConnection: assistant.hasUnavailableAiConnection,
                    hasUsableAiConnection,
                    streamedMessage: assistant.streamedMessage,
                    activity: assistant.activity,
                    factCheckClaims: assistant.factCheckClaims ?? editorial.factCheck?.findings.map(({ claim }) => ({ claim, checked: true })),
                    activeRequestId: assistant.activeRequestId,
                    translationLanguages: generalSettings.defaultTranslationLanguages.filter((language) => language !== workspace.selectedArticle?.language),
                    assistantMessages: assistant.messages,
                    selection: assistantSelection,
                    generalSettings,
                    editMode: assistant.editMode,
                    checkpointPreview: assistant.checkpointPreview,
                    restoredComposer: assistant.restoredComposer,
                    authorSkills,
                }}
                actions={{
                    onRequest: assistant.request,
                    onCancel: assistant.cancel,
                    onRetry: assistant.retry,
                    setClaimSelected: assistant.setClaimSelected,
                    setEditMode: assistant.setEditMode,
                    applyEdit: assistant.applyEdit,
                    loadAuthorSkills,
                    dispatcher,
                    shortcutOverrides,
                    openView: (view) => {
                        if (view === "style-profile")
                            openStyleProfile();
                        else
                            layout.setView(view);
                    },
                    openSkillFolder: desktop?.revealCreatedSkillDirectory ? (requestId) => void desktop.revealCreatedSkillDirectory?.(requestId) : undefined,
                    openSettings: openModelSettings,
                    clearSelection: clearAssistantSelection,
                    previewCheckpoint: assistant.previewCheckpoint,
                    restoreCheckpoint: assistant.restoreCheckpoint,
                    closeCheckpoint: assistant.closeCheckpoint
                }}
                layout={{ collapsed: layout.assistantCollapsed, setCollapsed: layout.setAssistantCollapsed }} />,
            children: <>
                <TelemetryInvitation />
                <ArticleWorkspace state={{
                    workspace, layout, editorial, revisions, publishing, articleFiles, generalSettings,
                    requestActive: assistant.state === "streaming",
                    translationGeneration: assistant.translatingLanguages && { languages: assistant.translatingLanguages },
                    checkingClaimCount: assistant.state === "streaming" ? assistant.factCheckClaims?.length : undefined,
                }} actions={{
                    createBlank, runFactCheck, runTranslation, rejectTranslation, shortcutOverrides,
                    onSelectionChange, assistantSelection: assistantSelection?.preview,
                }} />
                {overlays}
            </>,
        }}
    />;
}
