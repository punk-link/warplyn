import { createSafeArticleHtml } from "./article-html.js";


function escape(value: string): string {
    let output = "";
    for (let index = 0; index < value.length; index++) {
        const code = value.charCodeAt(index);
        const character = value[index];

        if (character === "\\" || character === "{" || character === "}")
            output += `\\${character}`;
        else if (character === "\n")
            output += "\\line ";
        else if (code > 126 || code < 32)
            output += `\\u${code > 32767 ? code - 65536 : code}?`;
        else
            output += character;
    }

    return output;
}


function inline(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE)
        return escape(node.textContent ?? "");

    if (!(node instanceof HTMLElement))
        return "";

    const content = [...node.childNodes].map(inline).join("");
    switch (node.tagName.toLowerCase()) {
        case "b":
        case "strong":
            return `{\\b ${content}}`;
        case "i":
        case "em":
            return `{\\i ${content}}`;
        case "s":
        case "del":
        case "strike":
            return `{\\strike ${content}}`;
        case "code":
            return `{\\f1 ${content}}`;
        case "br":
            return "\\line ";
        case "a":
            return `{\\field{\\*\\fldinst HYPERLINK "${escape((node.getAttribute("href") ?? "").replace(/"/g, "%22"))}"}{\\fldrslt ${content}}}`;
        default:
            return content;
    }
}


export function exportArticleRtf(html: string): Uint8Array<ArrayBuffer> {
    const document = createSafeArticleHtml(html);
    const definitions: string[] = [];
    let id = 0;


    function render(element: HTMLElement, level = 0, listId?: number): string {
        const tag = element.tagName.toLowerCase();
        if (tag === "ul" || tag === "ol") {
            const current = ++id;
            const ordered = tag === "ol";
            const levels = Array.from({ length: 9 }, () => `{\\listlevel\\levelnfc${ordered ? 0 : 23}\\leveljc0\\levelstartat${element.getAttribute("start") ?? "1"}{\\leveltext\\'01${ordered ? "\\'00" : "\\u8226?"};}{\\levelnumbers${ordered ? "\\'01" : ""};}\\fi-360\\li720}`).join("");
            definitions.push(`{\\list\\listtemplateid${current}${levels}\\listid${current}}`);

            return [...element.children].filter((child): child is HTMLElement => child instanceof HTMLElement).map((child) => render(child, level, current)).join("");
        }

        const children = [...element.childNodes].filter((child) => !(child instanceof HTMLElement) || !["UL", "OL"].includes(child.tagName));
        const text = children.map(inline).join("");
        const heading = /^h([1-6])$/.exec(tag)?.[1];
        let controls = "\\pard ";
        if (listId)
            controls += `\\ls${listId}\\ilvl${Math.min(8, level)}\\li${720 * (level + 1)} `;

        if (heading)
            controls += `\\outlinelevel${Number(heading) - 1}\\fs${40 - Number(heading) * 2} `;

        if (tag === "pre")
            controls += "\\s2\\f1 ";

        if (tag === "blockquote")
            controls += "\\s1\\li720 ";

        const paragraph = `{${controls}${text}\\par}\n`;
        const nested = [...element.children].filter((child): child is HTMLElement => child instanceof HTMLElement && ["UL", "OL"].includes(child.tagName));

        return paragraph + nested.map((child) => render(child, level + 1)).join("");
    }


    const body = [...document.body.children].filter((child): child is HTMLElement => child instanceof HTMLElement).map((child) => render(child)).join("");
    const overrides = Array.from({ length: id }, (_, index) => `{\\listoverride\\listid${index + 1}\\listoverridecount0\\ls${index + 1}}`).join("");

    return new TextEncoder().encode(`{\\rtf1\\ansi\\ansicpg1252\\uc1{\\fonttbl{\\f0 Arial;}{\\f1 Courier New;}}{\\stylesheet{\\s0 Normal;}{\\s1 Quote;}{\\s2 Code;}}{\\*\\listtable${definitions.join("")}}{\\*\\listoverridetable${overrides}}\\f0\\fs24\n${body}}`);
}
