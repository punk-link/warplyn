import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ApplicationClientError, type ArticleFilesClient, type Article, type CreateArticleInput } from "@skladno/shared";
import { App } from "../App.js";
import { createArticleFixture, createFakeClient, resetWorkspaceTestEnvironment } from "./EditorialWorkspace.test-utils.js";


// Product scenarios: history-and-publishing.article-files-import, history-and-publishing.article-files-export

afterEach(() => {
    resetWorkspaceTestEnvironment();
    delete window.skladnoArticleFiles;
});


async function runFileAction(name: string) {
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name }));
}


describe("Article file actions", () => {
    it("exports the right-clicked Article's Draft without changing the open Article and keeps Copy separate", async () => {
        const client = createFakeClient();
        const first = createArticleFixture("one", "First Article");
        const second = createArticleFixture("two", "Second Article");
        second.draft = { articleId: second.id, content: "Whole recoverable second Draft", baseRevisionId: second.currentRevisionId, version: 1, updatedAt: second.updatedAt };
        client.listArticles = vi.fn().mockResolvedValue([first, second]);
        const files: ArticleFilesClient = { loadMarkdown: vi.fn().mockResolvedValue(null), saveMarkdown: vi.fn().mockResolvedValue("saved") };
        window.skladnoArticleFiles = files;
        render(<App client={client} />);
        await screen.findByRole("textbox", { name: "Article draft" });
        const row = screen.getByRole("button", { name: /^Second Article/ });
        fireEvent.contextMenu(row);
        const menu = screen.getByRole("menu", { name: "Second Article" });
        expect(within(menu).getAllByRole("menuitem").map((item) => item.textContent)).toEqual(["Save to file…", "Load from file…", "Pin", "Archive", "Delete"]);
        expect(within(menu).getByRole("separator")).toBeTruthy();
        await userEvent.click(screen.getByRole("menuitem", { name: "Save to file…" }));
        await waitFor(() => expect(files.saveMarkdown).toHaveBeenCalledWith({ fileName: "Second Article", content: "Whole recoverable second Draft" }));
        expect(screen.getByRole("textbox", { name: "Article draft" }).textContent).toBe("Draft");
        await waitFor(() => expect(document.activeElement).toBe(row));
        fireEvent.keyDown(row, { key: "F10", shiftKey: true });
        await userEvent.click(screen.getByRole("menuitem", { name: "Load from file…" }));
        await waitFor(() => expect(document.activeElement).toBe(row));
        expect(client.createArticle).not.toHaveBeenCalled();
        await userEvent.click(screen.getByRole("button", { name: "Copy options" }));
        expect(within(screen.getByRole("menu", { name: "Copy options" })).getAllByRole("menuitem").map((item) => item.textContent)).toEqual(["Copy Markdown", "Copy plain text"]);
    });


    it("captures export content and disables duplicate file actions while a save is pending", async () => {
        let finish: () => void = () => undefined;
        const files: ArticleFilesClient = {
            loadMarkdown: vi.fn(),
            saveMarkdown: vi.fn(() => new Promise<"cancelled">((resolve) => {
                finish = () => resolve("cancelled");
            })),
        };
        window.skladnoArticleFiles = files;
        render(<App client={createFakeClient()} />);
        await screen.findByRole("textbox", { name: "Article draft" });
        await runFileAction("Save to file");
        expect(screen.getByRole("button", { name: "Save to file" }).hasAttribute("disabled")).toBe(true);
        expect(screen.getByRole("button", { name: "Load from file" }).hasAttribute("disabled")).toBe(true);
        fireEvent.contextMenu(screen.getByRole("button", { name: /^First Article/ }));
        expect(screen.getByRole("menuitem", { name: "Save to file…" }).hasAttribute("disabled")).toBe(true);
        expect(screen.getByRole("menuitem", { name: "Load from file…" }).hasAttribute("disabled")).toBe(true);
        expect(files.saveMarkdown).toHaveBeenCalledExactlyOnceWith({ fileName: "First Article", content: "Draft" });
        await act(async () => finish());
        await waitFor(() => expect(screen.getByRole("button", { name: "Load from file" }).hasAttribute("disabled")).toBe(false));
    });


    it("leaves the current Article intact when imported Article creation fails", async () => {
        const client = createFakeClient();
        client.createArticle = vi.fn().mockRejectedValue(new Error("private database detail"));
        window.skladnoArticleFiles = { loadMarkdown: vi.fn().mockResolvedValue({ fileName: "filename.md", content: "Imported body" }), saveMarkdown: vi.fn() };
        render(<App client={client} />);
        await screen.findByRole("textbox", { name: "Article draft" });
        await runFileAction("Load from file");
        await waitFor(() => expect(client.createArticle).toHaveBeenCalledWith(expect.objectContaining({ title: "filename", content: "Imported body" })));
        expect(screen.getByRole("textbox", { name: "Article draft" }).textContent).toBe("Draft");
        expect(screen.queryByText("private database detail")).toBeNull();
    });


    it("exports the whole visible Draft despite highlighted text, without creating a Revision", async () => {
        const client = createFakeClient();
        const files: ArticleFilesClient = { loadMarkdown: vi.fn(), saveMarkdown: vi.fn().mockResolvedValue("saved") };
        window.skladnoArticleFiles = files;
        render(<App client={client} />);
        const editor = await screen.findByRole("textbox", { name: "Article draft" });
        const range = document.createRange();
        range.selectNodeContents(editor);
        window.getSelection()?.addRange(range);
        await runFileAction("Save to file");
        await waitFor(() => expect(files.saveMarkdown).toHaveBeenCalledWith({ fileName: "First Article", content: "Draft" }));
        expect(client.saveArticleRevision).not.toHaveBeenCalled();
        expect(client.createArticle).not.toHaveBeenCalled();
        expect(screen.getByText("Article saved to file")).toBeTruthy();
        await waitFor(() => expect(document.activeElement).toBe(screen.getByRole("button", { name: "Save to file" })));
    });

    it("imports through Article creation, retains the original Draft, and recovers both after reload", async () => {
        const client = createFakeClient();
        const original = createArticleFixture("one", "First Article");
        original.draft = { articleId: "one", content: "Recoverable Draft", baseRevisionId: original.currentRevisionId, version: 1, updatedAt: original.updatedAt };
        const articles: Article[] = [original];
        client.listArticles = vi.fn(async () => articles);
        client.saveArticleDraft = vi.fn(async () => original.draft!);
        client.createArticle = vi.fn(async (input: CreateArticleInput) => {
            const article = createArticleFixture("imported", input.title);
            article.currentRevision.content = input.content;
            article.language = input.language;
            articles.push(article);
            return article;
        });
        const content = "# café 🙂\n\n[docs](https://example.com)\n\n```ts\nconst value = 34;\n```";
        window.skladnoArticleFiles = { loadMarkdown: vi.fn().mockResolvedValue({ fileName: "file.md", content }), saveMarkdown: vi.fn() };
        const view = render(<App client={client} />);
        await screen.findByRole("textbox", { name: "Article draft" });
        await runFileAction("Load from file");
        await waitFor(() => expect(client.createArticle).toHaveBeenCalledWith(expect.objectContaining({ title: "café 🙂", content, language: "en" })));
        await waitFor(() => expect(screen.getByRole("textbox", { name: "Article draft" }).textContent).toContain("café 🙂"));
        expect(original.currentRevision.content).toBe("Draft");
        expect(original.draft.content).toBe("Recoverable Draft");
        expect(client.saveArticleRevision).not.toHaveBeenCalled();
        view.unmount();
        render(<App client={client} />);
        await waitFor(() => expect(screen.getByRole("textbox", { name: "Article draft" }).textContent).toContain("café 🙂"));
        expect(articles.find((article) => article.id === "one")?.draft?.content).toBe("Recoverable Draft");
    });

    it("treats cancel as a no-op and reports read/write errors without private details", async () => {
        const client = createFakeClient();
        const load = vi.fn().mockResolvedValueOnce(null).mockRejectedValueOnce(new ApplicationClientError("article_file_load_failed", undefined, 500));
        window.skladnoArticleFiles = { loadMarkdown: load, saveMarkdown: vi.fn().mockResolvedValueOnce("cancelled").mockRejectedValueOnce(new ApplicationClientError("article_file_save_failed", undefined, 500)) };
        render(<App client={client} />);
        await screen.findByRole("textbox", { name: "Article draft" });
        await runFileAction("Load from file");
        await runFileAction("Save to file");
        expect(screen.queryByText("Article loaded from file")).toBeNull();
        expect(screen.queryByText("Article saved to file")).toBeNull();
        await runFileAction("Load from file");
        expect(await screen.findByText(/Choose a readable Markdown file/)).toBeTruthy();
        await runFileAction("Save to file");
        expect(await screen.findByText(/Choose a writable location/)).toBeTruthy();
        expect(client.createArticle).not.toHaveBeenCalled();
        expect(client.saveArticleRevision).not.toHaveBeenCalled();
    });

    it("does not create an imported Article when the current Draft cannot be checkpointed", async () => {
        const client = createFakeClient();
        const original = createArticleFixture("one", "First Article");
        original.draft = { articleId: "one", content: "Retained text", baseRevisionId: original.currentRevisionId, version: 1, updatedAt: original.updatedAt };
        client.listArticles = vi.fn().mockResolvedValue([original]);
        client.saveArticleDraft = vi.fn().mockRejectedValue(new Error("private raw error"));
        window.skladnoArticleFiles = { loadMarkdown: vi.fn().mockResolvedValue({ fileName: "import.md", content: "Imported" }), saveMarkdown: vi.fn() };
        render(<App client={client} />);
        await screen.findByRole("textbox", { name: "Article draft" });
        await runFileAction("Load from file");
        await waitFor(() => expect(client.saveArticleDraft).toHaveBeenCalled());
        expect(client.createArticle).not.toHaveBeenCalled();
        expect(screen.getByRole("textbox", { name: "Article draft" }).textContent).toBe("Retained text");
        expect(screen.queryByText("private raw error")).toBeNull();
    });
});
