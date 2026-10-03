/* eslint-disable project-style/no-production-intl-provider -- This is a test-only render helper. */
import { cleanup, render } from "@testing-library/react";
import { summarizeArticle, defaultGeneralSettings, defaultPublishingSettings, type Article, type ArticleRevision, type AssistantCapabilityActivity, type AssistantMessage, type AssistantSkillSummary, type FactCheckClaimPreview, type GeneralSettings, type KeyBindingOverrides } from "@skladno/shared";
import { IntlProvider } from "react-intl";
import type { ReactElement } from "react";
import { vi } from "vitest";

import type { EditorialWorkspaceClient } from "../application/client.js";
import { messages } from "../i18n/messages.js";
import { EditorialAssistantPanel } from "./components/EditorialAssistantPanel.js";
import type { AssistantSelectionScope, StreamedAssistantMessage } from "./state/assistant-messages-state.js";
import type { KeyBindingDispatcher } from "../key-bindings/dispatcher.js";


export function TestEditorialAssistantPanel(props: {
    articleId?: string;
    state: "idle" | "streaming" | "error";
    message: string;
    errorDetails?: string;
    activity?: AssistantCapabilityActivity;
    factCheckClaims?: FactCheckClaimPreview[];
    onRequest: (authorMessage: string, skillId?: string, language?: string | readonly string[], skillOffset?: number) => Promise<void>;
    authorSkills?: readonly AssistantSkillSummary[];
    loadAuthorSkills?: () => Promise<void>;
    onCancel: () => void;
    onRetry?: (requestId: string) => void;
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
    translationLanguages?: readonly string[];
    assistantMessages?: AssistantMessage[];
    streamedMessage?: StreamedAssistantMessage;
    dispatcher?: KeyBindingDispatcher;
    shortcutOverrides?: KeyBindingOverrides;
    openView?: (view: "proposal" | "fact-check" | "style-profile" | "translations") => void;
    selection?: AssistantSelectionScope;
    clearSelection?: () => void;
    generalSettings?: GeneralSettings;
    hasUnavailableAiConnection?: boolean;
    openSettings?: () => void;
    language?: string;
    article?: Article;
    updateArticle?: (articleId: string, input: unknown) => Promise<unknown>;
}) {
    const { articleId, state, message, errorDetails, activity, factCheckClaims, onRequest, onCancel, onRetry, collapsed, setCollapsed, translationLanguages, assistantMessages, streamedMessage, dispatcher, shortcutOverrides, openView, selection, clearSelection, generalSettings, hasUnavailableAiConnection, openSettings, authorSkills, loadAuthorSkills } = props;
    return <EditorialAssistantPanel
        data={{ articleId, state, message, errorDetails, activity, factCheckClaims, translationLanguages, assistantMessages, streamedMessage, selection, generalSettings, hasUnavailableAiConnection, authorSkills }}
        actions={{ onRequest, onCancel, onRetry, loadAuthorSkills, dispatcher, shortcutOverrides, openView, clearSelection, openSettings }}
        layout={{ collapsed, setCollapsed }} />;
}


export function createArticleFixture(id: string, title: string): Article {
    const revision: ArticleRevision = { id: `${id}-revision`, articleId: id, content: "Draft", createdAt: "2026-01-01T00:00:00.000Z", provenance: { kind: "initial" } };
    return { id, title, createdAt: revision.createdAt, updatedAt: revision.createdAt, currentRevisionId: revision.id, currentRevision: revision };
}


export function renderLocalized(element: ReactElement) {
    return render(<IntlProvider locale="en" messages={messages}>{element}</IntlProvider>);
}


export function createFakeClient(): EditorialWorkspaceClient {
    const created = createArticleFixture("new", "New Article");
    const client = {
        getHealth: vi.fn(),
        listArticles: vi.fn().mockResolvedValue([createArticleFixture("one", "First Article")]),
        createArticle: vi.fn().mockResolvedValue(created),
        updateArticle: vi.fn(),
        deleteArticle: vi.fn(),
        saveArticleDraft: vi.fn(),
        discardArticleDraft: vi.fn(),
        saveArticleRevision: vi.fn(),
        listArticleRevisions: vi.fn().mockResolvedValue([]),
        listAssistantSkills: vi.fn().mockResolvedValue([]),
        listAssistantMessages: vi.fn().mockResolvedValue([]),
        getAssistantEditMode: vi.fn().mockResolvedValue("review"),
        setAssistantEditMode: vi.fn().mockResolvedValue("direct"),
        applyAssistantEdit: vi.fn(),
        streamAssistantRequest: vi.fn(),
        acceptProposal: vi.fn(),
        summarizeProposal: vi.fn().mockResolvedValue([]),
        restoreRevision: vi.fn(),
        streamEditorial: vi.fn(),
        getStyleCorpus: vi.fn().mockResolvedValue({ items: [], rules: "", status: "empty" }),
        addStyleCorpusItem: vi.fn(),
        removeStyleCorpusItem: vi.fn(),
        setStyleCorpusItemIncluded: vi.fn(),
        setStyleCorpusRules: vi.fn(),
        rebuildStyleCorpus: vi.fn(),
        getArticleStyleRules: vi.fn().mockResolvedValue(""),
        setArticleStyleRules: vi.fn(),
        getPublishingSettings: vi.fn().mockResolvedValue(defaultPublishingSettings),
        setPublishingSettings: vi.fn(),
        getApplicationSettings: vi.fn().mockResolvedValue({
            general: defaultGeneralSettings,
            connections: [],
            modelPreferences: {
                defaultModel: "", skillOverrides: {}
            },
            backupPolicy: {
                schedule: "off",
                retention: { mode: "count", count: 7 }
            }, keyBindingOverrides: {}
        }),
        updateGeneralSettings: vi.fn(),
        updateBackupPolicy: vi.fn(),
        updateKeyBindingOverrides: vi.fn(),
        addAiConnection: vi.fn(),
        updateAiConnection: vi.fn(),
        removeAiConnection: vi.fn(),
        setAiConnectionActive: vi.fn(),
        testAiConnection: vi.fn(),
        refreshAiModels: vi.fn(),
        updateModelPreferences: vi.fn(),
    } as unknown as EditorialWorkspaceClient;
    client.listArticleSummaries = vi.fn(async () => (await client.listArticles()).map(summarizeArticle));
    client.getArticle = vi.fn(async (id: string) => {
        const article = (await client.listArticles()).find((item) => item.id === id);
        if (!article)
            throw new Error("Article missing in fixture");

        return article;
    });
    client.listArticleRevisionSummaries = vi.fn(async (id: string) => (await client.listArticleRevisions(id)).map(({ content, ...revision }) => ({ ...revision, characterCount: Array.from(content).length })));
    client.getArticleRevision = vi.fn(async (id: string, revisionId: string) => {
        const revision = (await client.listArticleRevisions(id)).find((item) => item.id === revisionId);
        if (!revision)
            throw new Error("Revision missing in fixture");

        return revision;
    });

    client.listAssistantMessageHistory = vi.fn(async (id: string) => ({ messages: await client.listAssistantMessages(id), revisionContents: {} }));
    return client;
}


export function resetWorkspaceTestEnvironment() {
    cleanup();
    localStorage.clear();
    window.skladnoShell = undefined;
    window.skladnoUpdates = undefined;
}

