import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { afterEach, expect, it, vi } from "vitest";
import type { Article } from "@skladno/shared";
import { messages } from "../../i18n/messages.js";
import { ArticleHeader } from "./ArticleHeader.js";


const article: Article = {
    id: "article",
    title: "Draft",
    currentRevisionId: "revision",
    currentRevision: { id: "revision", articleId: "article", content: "", provenance: { kind: "initial" }, createdAt: "2026-01-01T00:00:00.000Z" },
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
};

afterEach(cleanup);

it("shows archive status beside the title and removes it after unarchiving", () => {
    const header = (archived: boolean) => <IntlProvider locale="en" messages={messages}><ArticleHeader article={{ ...article, archived }} updateArticle={vi.fn()} save={vi.fn()} remove={vi.fn()} focusMode={false} setFocusMode={vi.fn()} /></IntlProvider>;
    const { rerender } = render(header(true));
    expect(screen.getByText("Archived")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Unarchive Article" })).toBeTruthy();
    rerender(header(false));
    expect(screen.queryByText("Archived")).toBeNull();
});


it("moves across Article Header controls with Left and Right", () => {
    render(<IntlProvider locale="en" messages={messages}><ArticleHeader article={article} updateArticle={vi.fn().mockResolvedValue(undefined)} save={vi.fn().mockResolvedValue(undefined)} remove={vi.fn().mockResolvedValue(undefined)} focusMode={false} setFocusMode={vi.fn()} /></IntlProvider>);

    const title = screen.getByRole("button", { name: "Rename article: Draft" });
    expect(title.className).toContain("focus-visible:ring-brand");
    title.focus();
    fireEvent.keyDown(title, { key: "ArrowRight" });
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Save revision" }));
});
