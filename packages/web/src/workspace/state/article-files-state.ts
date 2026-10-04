import { useRef, useState } from "react";
import { useIntl } from "react-intl";
import { getArticleFileFormat, getImportedArticleTitle, type ArticleFilesClient, type ArticleMarkdownFile, type ArticleRevision, type EditorialWorkspaceClient } from "@skladno/shared";
import { useNotifications } from "../../notifications/NotificationProvider.js";
import type { ArticleWorkspaceState } from "./article-workspace-state.js";
import { createArticleWithDefaults } from "./article-creation.js";
import { exportArticleFile, importArticleFile } from "../article-files/article-file-codecs.js";
import { useArticleFileDialogs } from "../article-files/article-file-dialog-state.js";


export function useArticleFiles(files: ArticleFilesClient, client: EditorialWorkspaceClient, workspace: ArticleWorkspaceState, openWrite: () => void) {
    const intl = useIntl();
    const { notify, notifyError } = useNotifications();
    const [pending, setPending] = useState(false);
    const busy = useRef(false);
    const dialogs = useArticleFileDialogs();
    const latestWorkspace = useRef(workspace);
    latestWorkspace.current = workspace;


    async function save(createFile: () => Promise<ArticleMarkdownFile>) {
        if (busy.current)
            return;

        busy.current = true;
        setPending(true);
        try {
            const file = await createFile();
            const format = files.runtime === "browser" ? await dialogs.chooseFormat() : undefined;
            if (format === null)
                return;

            const target = await files.chooseSaveTarget(file.fileName, format);
            if (!target)
                return;

            let result: import("@skladno/shared").ArticleMarkdownSaveResult;
            try {
                const bytes = await exportArticleFile(file.content, file.fileName, target.format);
                result = await files.saveFile(target, bytes);
            } catch (error) {
                await files.releaseSaveTarget(target.ticket).catch(() => undefined);
                throw error;
            }

            if (result !== "cancelled")
                notify({ tone: "success", title: intl.formatMessage({ id: result === "saved" ? "articleFiles.saved" : "articleFiles.downloadStarted" }) });
        } catch (error) {
            notifyError(error, { fallbackMessage: intl.formatMessage({ id: "articleFiles.saveFailed" }) });
        } finally {
            busy.current = false;
            setPending(false);
        }
    }


    async function loadArticle(): Promise<boolean> {
        if (busy.current)
            return false;

        busy.current = true;
        setPending(true);
        try {
            const source = await files.loadFile();
            if (!source)
                return false;

            const file = { fileName: source.fileName, content: await importArticleFile(source) };
            if (getArticleFileFormat(source.fileName) !== "markdown" && !await dialogs.review(file))
                return false;

            await latestWorkspace.current.flushSelected();
            await createArticleWithDefaults(client, latestWorkspace.current.create, {
                title: getImportedArticleTitle(file, intl.formatMessage({ id: "article.defaultTitle" })),
                content: file.content,
            });

            openWrite();
            requestAnimationFrame(() => document.querySelector<HTMLElement>("[data-focus-area='article-editor'] [contenteditable='true']")?.focus());
            notify({ tone: "success", title: intl.formatMessage({ id: "articleFiles.loaded" }) });

            return true;
        } catch (error) {
            notifyError(error, { fallbackMessage: intl.formatMessage({ id: "articleFiles.loadFailed" }) });
            return false;
        } finally {
            busy.current = false;
            setPending(false);
        }
    }


    return {
        pending,
        dialogs,
        loadArticle,
        saveArticle: async (article: import("@skladno/shared").ArticleSummary | undefined = workspace.selectedArticle) => save(async () => ({ fileName: article?.title ?? "Article", content: article ? await workspace.getArticleContent(article) : workspace.content })),
        saveRevision: (revision: ArticleRevision, number: number) => save(async () => ({ fileName: `${workspace.selectedArticle?.title ?? "Article"} - Revision ${number}`, content: revision.content })),
    };
}


export type ArticleFilesState = ReturnType<typeof useArticleFiles>;
