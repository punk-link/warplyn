export async function readEditorClipboard(): Promise<ClipboardEvent> {
    const data = new DataTransfer();
    if (navigator.clipboard.read) {
        const items = await navigator.clipboard.read();
        for (const item of items) {
            for (const type of ["text/plain", "text/html"]) {
                if (item.types.includes(type))
                    data.setData(type, await (await item.getType(type)).text());
            }
        }
    } else {
        data.setData("text/plain", await navigator.clipboard.readText());
    }

    return new ClipboardEvent("paste", { clipboardData: data });
}
