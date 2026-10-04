import { readRtfContent, parseRtfListNumId } from "rtf-codec";
import { ApplicationClientError, articleMarkdownByteLimit } from "@skladno/shared";


type WordArticle = Extract<ReturnType<typeof readRtfContent>["document"], { kind: "wordprocessing" }>;
type ArticleBlock = WordArticle["sections"][number]["blocks"][number];
type ArticleParagraph = Extract<ArticleBlock, { kind: "paragraph" }>;


function escape(value: string): string {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}


function paragraphHtml(block: ArticleParagraph): string {
    return block.runs.map((run) => {
        let text = escape(run.text).replace(/\n/g, "<br>");
        if (run.bold)
            text = `<strong>${text}</strong>`;

        if (run.italic)
            text = `<em>${text}</em>`;

        if (run.strike)
            text = `<s>${text}</s>`;

        if (/courier|monospace|consolas/i.test(run.fontFamily ?? ""))
            text = `<code>${text}</code>`;

        if (run.hyperlink)
            text = `<a href="${escape(run.hyperlink)}">${text}</a>`;

        return text;
    }).join("");
}


function standaloneParagraph(block: ArticleParagraph): string {
    let tag = "p";
    if (block.headingLevel)
        tag = `h${Math.min(6, block.headingLevel)}`;
    else if (block.styleId === "Quote")
        tag = "blockquote";
    else if (block.styleId === "Code")
        tag = "pre";

    const text = tag === "pre" ? escape(block.runs.map((run) => run.text).join("")) : paragraphHtml(block);
    return `<${tag}>${text}</${tag}>`;
}


function createListWriter() {
    const output: string[] = [];
    const lists: { tag: "ol" | "ul"; id: string | undefined }[] = [];


    function closeLists(depth: number): void {
        while (lists.length > depth) {
            const list = lists.pop();
            output.push(`</li></${list?.tag}>`);
        }
    }


    function append(block: ArticleParagraph, list: NonNullable<ArticleParagraph["list"]>): void {
        const info = parseRtfListNumId(list.numId ?? "");
        const tag = info?.type === "ordered" || list.format === "decimal" ? "ol" : "ul";
        const depth = Math.min(8, list.level) + 1;
        closeLists(depth);
        if (lists.length === depth && (lists.at(-1)?.tag !== tag || lists.at(-1)?.id !== list.numId))
            closeLists(depth - 1);

        if (lists.length === depth)
            output.push("</li><li>");

        while (lists.length < depth) {
            lists.push({ tag, id: list.numId });
            const start = tag === "ol" && info?.start ? ` start="${info.start}"` : "";
            output.push(`<${tag}${start}><li>`);
        }

        output.push(paragraphHtml(block));
    }


    return { output, append, close: () => closeLists(0) };
}


function blocksHtml(blocks: ArticleBlock[]): string {
    const writer = createListWriter();
    for (const block of blocks) {
        if (block.kind === "paragraph" && block.list) {
            writer.append(block, block.list);
            continue;
        }

        writer.close();
        if (block.kind === "paragraph")
            writer.output.push(standaloneParagraph(block));
        else if (block.kind === "table")
            writer.output.push(block.rows.map((row) => row.cells.map((cell) => blocksHtml(cell.blocks)).join("")).join(""));
    }

    writer.close();
    return writer.output.join("");
}


export function importArticleRtf(bytes: Uint8Array): string {
    const { document: article } = readRtfContent(bytes, { maxInputBytes: articleMarkdownByteLimit, maxGroupDepth: 256 });
    if (article.kind !== "wordprocessing")
        throw new ApplicationClientError("article_file_invalid", undefined, 400);

    const html = article.sections.map((section) => blocksHtml(section.blocks)).join("");
    if (html.length > articleMarkdownByteLimit)
        throw new ApplicationClientError("article_file_too_large", undefined, 413);

    return html;
}
