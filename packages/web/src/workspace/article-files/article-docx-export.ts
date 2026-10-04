import { Document, ExternalHyperlink, HeadingLevel, LevelFormat, Packer, Paragraph, TextRun, type ILevelsOptions, type IRunOptions } from "docx";
import { createSafeArticleHtml } from "./article-html.js";


function inlineRuns(node: Node, formatting: IRunOptions = {}): (TextRun | ExternalHyperlink)[] {
    if (node.nodeType === Node.TEXT_NODE)
        return (node.textContent ?? "").split("\n").map((text, index) => new TextRun({ ...formatting, text, break: index > 0 ? 1 : undefined }));

    if (!(node instanceof HTMLElement))
        return [];

    const tag = node.tagName.toLowerCase();
    if (tag === "br")
        return [new TextRun({ ...formatting, break: 1 })];

    const marks = { ...formatting };
    if (["b", "strong"].includes(tag) || node.style.fontWeight === "700")
        marks.bold = true;

    if (["i", "em"].includes(tag) || node.style.fontStyle === "italic")
        marks.italics = true;

    if (["s", "strike", "del"].includes(tag) || node.style.textDecoration === "line-through")
        marks.strike = true;

    if (tag === "code") {
        marks.font = "Courier New";
        marks.style = "InlineCode";
    }

    const children = [...node.childNodes].flatMap((child) => inlineRuns(child, marks));
    const href = node.getAttribute("href");
    if (tag === "a" && href)
        return [new ExternalHyperlink({ link: href, children })];

    return children;
}


export async function exportArticleDocx(html: string, title: string): Promise<Uint8Array<ArrayBuffer>> {
    const safe = createSafeArticleHtml(html);
    const paragraphs: Paragraph[] = [];
    const numbering: { reference: string; levels: ILevelsOptions[] }[] = [];
    const headings: Record<string, typeof HeadingLevel[keyof typeof HeadingLevel]> = {
        h1: HeadingLevel.HEADING_1, h2: HeadingLevel.HEADING_2, h3: HeadingLevel.HEADING_3,
        h4: HeadingLevel.HEADING_4, h5: HeadingLevel.HEADING_5, h6: HeadingLevel.HEADING_6,
    };


    function render(element: HTMLElement, level = 0, reference?: string): void {
        const tag = element.tagName.toLowerCase();
        if (tag === "ul" || tag === "ol") {
            const listReference = `article-list-${numbering.length}`;
            const ordered = tag === "ol";
            const start = Number(element.getAttribute("start") ?? "1");

            numbering.push({ reference: listReference, levels: Array.from({ length: 9 }, (_, depth) => ({
                level: depth, format: ordered ? LevelFormat.DECIMAL : LevelFormat.BULLET,
                text: ordered ? `%${depth + 1}.` : "•", start,
                style: { paragraph: { indent: { left: 720 * (depth + 1), hanging: 360 } } },
            })) });

            [...element.children].forEach((child) => {
                if (child instanceof HTMLElement)
                    render(child, level, listReference);
            });

            return;
        }

        const children = [...element.childNodes].filter((node) => !(node instanceof HTMLElement) || !["UL", "OL"].includes(node.tagName));
        const runs = children.flatMap((node) => inlineRuns(node, tag === "pre" ? { font: "Courier New" } : {}));
        const paragraphNumbering = reference ? { reference, level: Math.min(8, level) } : undefined;
        let style: string | undefined;

        if (tag === "pre")
            style = "Code";
        else if (tag === "blockquote")
            style = "Quote";

        paragraphs.push(new Paragraph({ children: runs, heading: headings[tag], style, numbering: paragraphNumbering }));
        [...element.children].forEach((child) => {
            if (child instanceof HTMLElement && ["UL", "OL"].includes(child.tagName))
                render(child, level + 1);
        });
    }


    [...safe.body.children].forEach((element) => {
        if (element instanceof HTMLElement)
            render(element);
    });

    const article = new Document({
        title, creator: "Warplyn", numbering: { config: numbering },
        styles: {
            paragraphStyles: [
                { id: "Quote", name: "Quote", basedOn: "Normal", paragraph: { indent: { left: 720 } } },
                { id: "Code", name: "Code", basedOn: "Normal", run: { font: "Courier New" } },
            ],
            characterStyles: [{ id: "InlineCode", name: "InlineCode", run: { font: "Courier New" } }],
        },
        sections: [{ children: paragraphs }],
    });
    
    return new Uint8Array(await Packer.toArrayBuffer(article));
}
