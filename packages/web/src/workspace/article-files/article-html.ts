import { parse, type DefaultTreeAdapterMap } from "parse5";
import { $getRoot, createEditor } from "lexical";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { ApplicationClientError, encodeArticleMarkdown } from "@skladno/shared";
import { articleEditorNodes } from "../editor/article-editor-config.js";
import { exportArticleMarkdown, importArticleMarkdown } from "../editor/markdown.js";
import { isSupportedArticleLink } from "../editor/paste-constants.js";


const removedElements = new Set(["script", "style", "link", "meta", "base", "svg", "math", "img", "video", "audio", "object", "embed", "iframe", "canvas", "template", "input", "button", "select", "textarea"]);
const supportedElements = new Set(["p", "br", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "blockquote", "pre", "code", "strong", "b", "em", "i", "s", "strike", "del", "a", "span"]);


export function escapeArticleHtml(value: string): string {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}


function applySafeAttributes(element: HTMLElement, source: DefaultTreeAdapterMap["element"]): void {
    const attributes = new Map(source.attrs.map(({ name, value }) => [name, value]));
    const href = attributes.get("href");
    if (source.tagName === "a" && href && isSupportedArticleLink(href))
        element.setAttribute("href", href);

    if (source.tagName === "ol" && /^\d{1,6}$/.test(attributes.get("start") ?? ""))
        element.setAttribute("start", attributes.get("start") ?? "1");

    const style = attributes.get("style") ?? "";
    if (/font-weight\s*:\s*(bold|[7-9]00)/i.test(style))
        element.style.fontWeight = "700";

    if (/font-style\s*:\s*italic/i.test(style))
        element.style.fontStyle = "italic";

    if (/text-decoration(?:-line)?\s*:[^;]*line-through/i.test(style))
        element.style.textDecoration = "line-through";
}


/** Builds only safe nodes from an inert parser; untrusted resources never enter a browser parser. */
export function createSafeArticleHtml(html: string): Document {
    encodeArticleMarkdown(html);
    const source = parse(html);
    const result = document.implementation.createHTMLDocument("");
    let count = 0;


    function append(node: DefaultTreeAdapterMap["node"], parent: Node, depth: number): void {
        if (++count > 100_000 || depth > 256)
            throw new ApplicationClientError("article_file_too_large", undefined, 413);

        if ("value" in node) {
            parent.appendChild(result.createTextNode(node.value));
            return;
        }

        if (!("childNodes" in node))
            return;

        if (!("tagName" in node)) {
            node.childNodes.forEach((child) => append(child, parent, depth + 1));
            return;
        }

        if (removedElements.has(node.tagName) || node.tagName === "head")
            return;

        if (node.tagName === "html" || node.tagName === "body") {
            node.childNodes.forEach((child) => append(child, parent, depth + 1));
            return;
        }

        const tag = supportedElements.has(node.tagName) ? node.tagName : "div";
        const element = result.createElement(tag);
        applySafeAttributes(element, node);
        parent.appendChild(element);
        node.childNodes.forEach((child) => append(child, element, depth + 1));
    }


    append(source, result.body, 0);
    return result;
}


function createConversionEditor() {
    return createEditor({ namespace: "article-file-conversion", nodes: articleEditorNodes, onError: (error) => {
        throw error;
    } });
}


export function articleMarkdownToHtml(content: string): string {
    const editor = createConversionEditor();
    editor.update(() => importArticleMarkdown(content), { discrete: true });

    return editor.getEditorState().read(() => createSafeArticleHtml($generateHtmlFromNodes(editor, null)).body.innerHTML);
}


export function articleHtmlToMarkdown(html: string): string {
    const safe = createSafeArticleHtml(html);
    const editor = createConversionEditor();
    editor.update(() => {
        $getRoot().append(...$generateNodesFromDOM(editor, safe));
    }, { discrete: true });

    const content = editor.getEditorState().read(() => exportArticleMarkdown());
    encodeArticleMarkdown(content);

    if (html.trim() && !content.trim() && safe.body.textContent?.trim())
        throw new ApplicationClientError("article_file_invalid", undefined, 400);

    return content;
}
