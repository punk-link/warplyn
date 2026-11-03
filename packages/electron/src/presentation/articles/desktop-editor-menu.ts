import type { BrowserWindow, MenuItemConstructorOptions } from "electron";


export async function getEditorMenuEntries(window: { webContents: Pick<BrowserWindow["webContents"], "executeJavaScript"> },
    selected: boolean): Promise<MenuItemConstructorOptions[]> {
    const metadata: unknown = await window.webContents.executeJavaScript(`(() => {
        const root = document.activeElement;
        if (!root?.matches('[data-article-spelling]')) return null;
        const shell = root.closest('[data-article-editor-shell]');
        return { skills: JSON.parse(root.dataset.editorSkills || '[]'), label: root.dataset.editorSkillsLabel, owner: root.dataset.editorMenuOwner,
            groups: JSON.parse(root.dataset.editorMenuGroups || '[]'),
            formats: [...shell.querySelectorAll('[data-editor-command]')].map(button => ({
                id: button.dataset.editorCommand, name: button.getAttribute('aria-label'), checked: button.getAttribute('aria-pressed') === 'true' })),
            blocks: [...shell.querySelectorAll('[data-editor-block-style] option')].map(option => ({
                id: option.value, name: option.textContent, checked: option.selected })) };
    })()`);

    if (typeof metadata !== "object" || metadata === null || !("skills" in metadata) || !("label" in metadata) ||
        typeof metadata.label !== "string" || !("formats" in metadata) || !("blocks" in metadata) ||
        !("owner" in metadata) || typeof metadata.owner !== "string")
        return [];

    const dispatch = (kind: string, id: string) => {
        const detail = JSON.stringify({ kind, id });
        const owner = JSON.stringify(metadata.owner);
        void window.webContents.executeJavaScript(`(() => {
            const root = document.querySelector('[data-article-spelling]');
            if (root?.dataset.editorMenuOwner === ${owner})
                root.dispatchEvent(new CustomEvent('warplyn:editor-menu', { detail: ${detail} }));
        })()`).catch(() => undefined);
    };

    const skills = readEntries(metadata.skills).filter((skill) => skill.enabled);
    const builtIn = skills.filter((skill) => skill.source === "built-in");
    const author = skills.filter((skill) => skill.source !== "built-in").sort((a, b) => a.name.localeCompare(b.name) || a.id.localeCompare(b.id));
    const skillItems: MenuItemConstructorOptions[] = builtIn.map((skill) => ({
        label: skill.name, enabled: selected && skill.enabled,
        click: () => dispatch("skill", skill.id)
    }));

    if (builtIn.length && author.length)
        skillItems.push({ type: "separator" });

    skillItems.push(...author.map((skill) => ({ label: skill.name, enabled: selected && skill.enabled, click: () => dispatch("skill", skill.id) })));
    const groups = readEntries("groups" in metadata ? metadata.groups : []);
    const label = (id: string) => groups.find((group) => group.id === id)?.name ?? "";
    const formats = readEntries(metadata.formats);
    const formatItem = (format: typeof formats[number]): MenuItemConstructorOptions => {
        if (format.id === "link")
            return {
                label: label(format.checked ? "editLink" : "link"), accelerator: "CmdOrCtrl+K", registerAccelerator: false,
                click: () => dispatch("format", format.id)
            };

        const accelerator = format.id === "bold" ? "CmdOrCtrl+B" : undefined;

        return {
            label: format.name, type: "checkbox", checked: format.checked,
            accelerator: format.id === "italic" ? "CmdOrCtrl+I" : accelerator, registerAccelerator: false,
            click: () => dispatch("format", format.id)
        };
    };

    const blocks: MenuItemConstructorOptions[] = readEntries(metadata.blocks).map((block) => ({
        label: block.name, type: "radio", checked: block.checked, click: () => dispatch("block", block.id),
    }));

    return [
        { type: "separator" }, ...formats.filter((format) => format.id === "link").map(formatItem),
        { label: label("text"), submenu: formats.filter((format) => ["bold", "italic", "strikethrough", "code"].includes(format.id)).map(formatItem) },
        { label: label("paragraph"), submenu: blocks },
        { label: label("lists"), submenu: formats.filter((format) => ["bullet", "number"].includes(format.id)).map(formatItem) },
        { type: "separator" }, { label: metadata.label, submenu: skillItems }
    ];
}


function readEntries(value: unknown): { id: string; name: string; source: string; enabled: boolean; checked: boolean }[] {
    if (!Array.isArray(value))
        return [];

    return value.flatMap((entry: unknown) => {
        if (typeof entry !== "object" || entry === null || !("id" in entry) || typeof entry.id !== "string" ||
            !("name" in entry) || typeof entry.name !== "string")
            return [];

        return [{
            id: entry.id, name: entry.name, source: "source" in entry && typeof entry.source === "string" ? entry.source : "",
            enabled: "enabled" in entry && entry.enabled === true, checked: "checked" in entry && entry.checked === true
        }];
    });
}
