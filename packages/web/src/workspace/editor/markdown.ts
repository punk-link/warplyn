import {
    $convertFromMarkdownString,
    $convertToMarkdownString,
    BOLD_ITALIC_STAR,
    BOLD_STAR,
    CODE,
    HEADING,
    INLINE_CODE,
    ITALIC_STAR,
    LINK,
    ORDERED_LIST,
    QUOTE,
    STRIKETHROUGH,
    UNORDERED_LIST,
    type Transformer,
} from "@lexical/markdown";


/** The complete persisted Article Markdown contract. Markdown shortcuts are intentionally not registered. */
export const articleMarkdownTransformers: Transformer[] = [
    HEADING,
    QUOTE,
    UNORDERED_LIST,
    ORDERED_LIST,
    CODE,
    INLINE_CODE,
    BOLD_ITALIC_STAR,
    BOLD_STAR,
    ITALIC_STAR,
    STRIKETHROUGH,
    LINK,
];


export function importArticleMarkdown(content: string): void {
    $convertFromMarkdownString(encodeLinkDestinationParentheses(content), articleMarkdownTransformers, undefined, true);
}


export function exportArticleMarkdown(transformers = articleMarkdownTransformers): string {
    return encodeLinkDestinationParentheses($convertToMarkdownString(transformers, undefined, true));
}


function encodeLinkDestinationParentheses(markdown: string): string {
    if (!markdown.includes("]("))
        return markdown;

    let fenced = false;
    return markdown.split("\n").map((line) => {
        const trimmed = line.trimStart();
        if (trimmed.startsWith("```") || trimmed.startsWith("~~~")) {
            fenced = !fenced;
            return line;
        }

        return fenced ? line : encodeMarkdownLine(line);
    }).join("\n");
}


function encodeMarkdownLine(line: string): string {
    if (!line.includes("]("))
        return line;

    let result = "";
    let inlineCode = false;
    for (let index = 0; index < line.length; index++) {
        const character = line[index];
        if (character === "`")
            inlineCode = !inlineCode;

        if (!inlineCode && character === "]" && line[index + 1] === "(" && line.lastIndexOf("[", index) >= 0) {
            const destination = encodeDestination(line, index + 2);
            if (destination) {
                result += `](${destination.value}`;
                index = destination.end - 1;

                continue;
            }
        }

        result += character;
    }

    return result;
}


function encodeDestination(line: string, start: number): { value: string; end: number } | undefined {
    let depth = 0;
    let value = "";

    for (let index = start; index < line.length; index++) {
        const character = line[index];
        switch (character) {
            case "(":
                depth++;
                value += "%28";
                break;
            case ")":
                if (depth === 0)
                    return { value: `${value})`, end: index + 1 };

                depth--;
                value += "%29";
                break;
            case " ":
            case "\t": return undefined;
            default: value += character;
        }
    }

    return undefined;
}
