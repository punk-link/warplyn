import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { afterEach, expect, it, vi } from "vitest";
import type { Article } from "@skladno/shared";
import { messages } from "../../i18n/messages.js";
import { TranslationBody } from "./TranslationBody.js";
import "@testing-library/jest-dom/vitest";
import { splitTranslationParagraphs } from "./translation-paragraphs.js";


// Product scenarios: workspace.translations.protected-content
afterEach(cleanup);

const values = ["https://example.com/" + "long-path/".repeat(30), "API-v2", "42", '"Quoted value"', "call(x + 1);", "42", "const result = call();\n\nreturn result;"];
const text = values.join("\n");
const source: Article = {
    id: "source", title: "Source", currentRevisionId: "revision", createdAt: "2026-01-01", updatedAt: "2026-01-01",
    currentRevision: { id: "revision", articleId: "source", content: text, provenance: { kind: "initial" }, createdAt: "2026-01-01" }
};


function comparison(protectedSpans = values, displayMode: "aligned" | "side-by-side" = "side-by-side", warnings: string[] = []) {
    return <IntlProvider locale="en" messages={messages}><TranslationBody source={source} translatedContent={text} targetLanguage="Spanish"
        sourceParagraphs={splitTranslationParagraphs(text, protectedSpans)} translatedParagraphs={splitTranslationParagraphs(text, protectedSpans)} paragraphCount={splitTranslationParagraphs(text, protectedSpans).length}
        translation={{ content: text, baseRevisionId: "revision", metadata: { targetLanguage: "Spanish", protectedSpans } }} protectedSpanWarnings={warnings}
        displayMode={displayMode} visibleText="source" setVisibleText={vi.fn()} /></IntlProvider>;
}


it.each(["side-by-side", "aligned"] as const)("attaches accessible explanations to exact protected values in %s without changing the text", async (mode) => {
    const user = userEvent.setup();
    const { container } = render(comparison(values, mode));
    const buttons = screen.getAllByRole("button", { name: /^Validated protected content:/ });
    expect(buttons).toHaveLength(values.length * 2);
    expect(screen.queryByRole("status")).toBeNull();
    const repeated = screen.getAllByRole("button", { name: "Validated protected content: 42" });
    expect(repeated).toHaveLength(4);
    expect(repeated[0]).toHaveAccessibleDescription(/All 2 expected occurrences are present unchanged/);
    expect(buttons[0]).toHaveAttribute("title", expect.stringContaining("Marked for exact preservation"));
    await user.click(buttons[0]!);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById(buttons[0]!.getAttribute("aria-controls")!)?.className).not.toContain("sr-only");
    await user.keyboard("{Escape}");
    expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
    await user.keyboard("{Enter}");
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
    await user.keyboard(" ");
    expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
    for (const pre of container.querySelectorAll("pre")) {
        const copy = pre.cloneNode(true);
        if (copy instanceof HTMLElement) {
            copy.querySelectorAll("span[id]").forEach((help) => help.remove());
            expect(copy.textContent).toBe(text);
        }
    }

    expect(source.currentRevision.content).toBe(text);
});

it("keeps changed-value warnings and annotates only validated values", () => {
    render(comparison(values, "side-by-side", ["42"]));
    expect(screen.getByRole("alert")).toHaveTextContent("Protected content changed or missing: 42");
    expect(screen.queryByRole("button", { name: "Validated protected content: 42" })).toBeNull();
    expect(screen.getAllByRole("button", { name: "Validated protected content: API-v2" })).toHaveLength(2);
});

it("renders plain text with no annotations or success notice when no protected content exists", () => {
    const { container } = render(comparison([]));
    expect(screen.queryByRole("button", { name: /^Validated protected content:/ })).toBeNull();
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.queryByRole("alert")).toBeNull();
    expect(container.querySelectorAll("pre")[0]?.textContent).toBe(text);
    expect(within(container).getByLabelText(/^Translation comparison/)).toHaveAttribute("data-focus-area-entry");
});
