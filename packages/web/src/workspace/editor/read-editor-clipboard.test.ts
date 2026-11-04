import { afterEach, expect, it, vi } from "vitest";
import { readEditorClipboard } from "./read-editor-clipboard.js";

afterEach(() => vi.unstubAllGlobals());

it("preserves supported rich and plain clipboard data for the existing paste command", async () => {
    vi.stubGlobal("DataTransfer", class {
        private values = new Map<string, string>();


        setData(type: string, value: string) {
            this.values.set(type, value);
        }


        getData(type: string) {
            return this.values.get(type) ?? "";
        }
    });
    vi.stubGlobal("ClipboardEvent", class {
        readonly clipboardData: DataTransfer;


        constructor(_type: string, init: { clipboardData: DataTransfer }) {
            this.clipboardData = init.clipboardData;
        }
    });
    vi.stubGlobal("navigator", { clipboard: { read: async () => [{
        types: ["text/plain", "text/html", "image/png"],
        getType: async (type: string) => ({ text: async () => type === "text/html" ? "<b>Words</b>" : "Words" }),
    }] } });
    const event = await readEditorClipboard();
    expect(event.clipboardData?.getData("text/plain")).toBe("Words");
    expect(event.clipboardData?.getData("text/html")).toBe("<b>Words</b>");
    expect(event.clipboardData?.getData("image/png")).toBe("");
});
