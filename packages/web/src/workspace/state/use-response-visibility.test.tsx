import { act, cleanup, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import type { AssistantMessage } from "@skladno/shared";
import { ArticleResponseSeenContext } from "./article-response-seen-context.js";
import { useResponseVisibility } from "./use-response-visibility.js";


function Response({ message }: { message?: AssistantMessage }) {
    const ref = useResponseVisibility(message);
    return <article ref={ref} />;
}


afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
});


it("marks completed responses seen only after they enter the visible timeline", () => {
    let show: ((ratio: number) => void) | undefined;
    vi.stubGlobal("IntersectionObserver", class {
        constructor(callback: (entries: { isIntersecting: boolean; intersectionRatio: number }[]) => void) {
            show = (ratio) => callback([{ isIntersecting: true, intersectionRatio: ratio }]);
        }


        observe() {
            return undefined;
        }


        disconnect() {
            return undefined;
        }
    });
    const seen = vi.fn();
    const message: AssistantMessage = { id: "reply", articleId: "one", role: "assistant", kind: "response", status: "completed",
        createdAt: "2026", updatedAt: "2026" };
    render(<ArticleResponseSeenContext.Provider value={seen}><Response message={message} /></ArticleResponseSeenContext.Provider>);
    expect(seen).not.toHaveBeenCalled();
    act(() => show?.(0));
    expect(seen).not.toHaveBeenCalled();
    act(() => show?.(0.5));
    expect(seen).toHaveBeenCalledWith("one", "2026:reply");
});


it("ignores transient streamed output without a persisted message", () => {
    const observer = vi.fn();
    vi.stubGlobal("IntersectionObserver", observer);
    render(<Response />);
    expect(observer).not.toHaveBeenCalled();
});
