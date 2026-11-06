import assert from "node:assert/strict";
import test from "node:test";
import { getEditorMenuEntries } from "./desktop-editor-menu.js";

test("native menu validates renderer metadata and preserves Skill ordering and compatibility", async () => {
    const scripts: string[] = [];
    const entries = await getEditorMenuEntries({ webContents: { executeJavaScript: async (script) => {
        scripts.push(script);
        return {
            label: "Skills", owner: "editor-one",
            groups: [{ id: "text", name: "Formatting" }, { id: "paragraph", name: "Paragraph style" },
                { id: "lists", name: "Lists" }, { id: "link", name: "Link…" }, { id: "editLink", name: "Edit link…" }],
            formats: [{ id: "bold", name: "Bold", checked: true }, { id: "italic", name: "Italic" },
                { id: "link", name: "Link", checked: true }, { id: "code", name: "Inline code" },
                { id: "bullet", name: "Bulleted list", checked: true }],
            blocks: [{ id: "paragraph", name: "Paragraph", checked: true }, { id: "h1", name: "Heading 1" }], skills: [
                { id: "z", name: "Zulu", source: "author", enabled: true },
                { id: "b", name: "Built in", source: "built-in", enabled: true },
                { id: "translation", name: "Translate text", source: "built-in", enabled: false },
                { id: "a", name: "Alpha", source: "author", enabled: false },
            ],
        };
    } } }, true);
    assert.deepEqual(entries.map((entry) => entry.label ?? entry.type), ["separator", "Formatting",
        "Edit link…", "Paragraph style", "Lists", "separator", "Skills"]);
    assert.ok(entries.every((entry) => entry.type !== "checkbox" && entry.type !== "radio"));
    assert.equal(entries[2]?.accelerator, "CmdOrCtrl+K");
    const formatting = entries[1]?.submenu;
    assert.ok(Array.isArray(formatting));
    assert.deepEqual(formatting.map((entry) => entry.label), ["Bold", "Italic", "Inline code"]);
    assert.equal(formatting[0]?.type, "checkbox");
    assert.equal(formatting[0]?.checked, true);
    assert.equal(formatting[0]?.accelerator, "CmdOrCtrl+B");
    assert.equal(formatting[1]?.accelerator, "CmdOrCtrl+I");
    const paragraphs = entries[3]?.submenu;
    assert.ok(Array.isArray(paragraphs));
    assert.equal(paragraphs[0]?.type, "radio");
    assert.equal(paragraphs[0]?.checked, true);
    const submenu = entries.at(-1)?.submenu;
    assert.ok(Array.isArray(submenu));
    assert.deepEqual(submenu.map((entry) => entry.label ?? entry.type), ["Built in", "separator", "Zulu"]);
    assert.equal(scripts.length, 1);
    const chooseSkill = submenu[2]?.click;
    assert.equal(typeof chooseSkill, "function");
    if (chooseSkill)
        Reflect.apply(chooseSkill, undefined, [undefined, undefined, { ctrlKey: true }]);

    assert.equal(scripts.length, 2);
    assert.ok(scripts[1]?.includes('"kind":"skill","id":"z"'));
    assert.ok(scripts[1]?.includes('"ctrlKey":true'));
    assert.ok(scripts[1]?.includes('"editor-one"'));
    assert.deepEqual(await getEditorMenuEntries({ webContents: { executeJavaScript: async () => null } }, true), []);
});
