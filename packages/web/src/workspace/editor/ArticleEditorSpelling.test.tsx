import { cleanup, render, waitFor } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { messages } from "../../i18n/messages.js";
import { afterEach, expect, it, vi } from "vitest";
import { renderLocalized } from "../EditorialWorkspace.test-utils.js";
import { NotificationProvider } from "../../notifications/NotificationProvider.js";
import { ArticleRichEditor } from "./ArticleRichEditor.js";

afterEach(() => {
    cleanup();
    window.warplynSpelling = undefined;
});

// Product scenario: workspace.editor.spelling
it("updates spelling language without replacing the editor or changing Markdown", async () => {
    const setArticleLanguage = vi.fn();
    window.warplynSpelling = { setArticleLanguage, request: vi.fn() };
    const setContent = vi.fn();
    const content = "Text `gRPC` [https://example.test](https://example.test) [Readable label](https://example.test)\n\n```\ncodeword\n```";
    const element = (language?: string) => <IntlProvider locale="en" messages={messages}><NotificationProvider><ArticleRichEditor articleId="one" content={content} setContent={setContent} language={language} /></NotificationProvider></IntlProvider>;
    const view = render(element("en"));
    const root = view.getByRole("textbox", { name: "Article draft" });
    expect(root.getAttribute("spellcheck")).toBe("true");
    expect(root.getAttribute("lang")).toBe("en");
    await waitFor(() => expect(root.querySelector("a")?.getAttribute("spellcheck")).toBe("false"));
    expect(root.querySelectorAll("a")[1]?.hasAttribute("spellcheck")).toBe(false);
    expect(root.querySelectorAll("code").length).toBeGreaterThan(0);
    for (const code of root.querySelectorAll("code"))
        expect(code.getAttribute("spellcheck")).toBe("false");

    view.rerender(element("es"));
    expect(view.getByRole("textbox", { name: "Article draft" })).toBe(root);
    expect(root.getAttribute("lang")).toBe("es");
    expect(setArticleLanguage).toHaveBeenLastCalledWith("es");
    expect(setContent).not.toHaveBeenCalled();
    view.unmount();
    expect(setArticleLanguage).toHaveBeenLastCalledWith(null);
});

it("works without a desktop bridge and omits invalid language metadata", async () => {
    const view = renderLocalized(<NotificationProvider><ArticleRichEditor articleId="one" content="Prose" setContent={vi.fn()} language="not a language" /></NotificationProvider>);
    const root = view.getByRole("textbox", { name: "Article draft" });
    await waitFor(() => expect(root.textContent).toContain("Prose"));
    expect(root.hasAttribute("lang")).toBe(false);
    expect(root.getAttribute("spellcheck")).toBe("true");
});
