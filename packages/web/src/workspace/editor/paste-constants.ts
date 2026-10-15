export const ARTICLE_LINK_PROTOCOL = {
    HTTP: "http:",
    HTTPS: "https:",
    MAILTO: "mailto:",
} as const;


const supportedArticleLinkProtocols = new Set<string>(Object.values(ARTICLE_LINK_PROTOCOL));


export function isSupportedArticleLink(value: string): boolean {
    try {
        return supportedArticleLinkProtocols.has(new URL(value.trim()).protocol);
    } catch {
        return false;
    }
}


const msoListPattern = /mso-list/i;
const msoListIgnorePattern = /mso-list\s*:\s*ignore/i;
const bulletMarkerPrefixPattern = /^\s*(?:[·•‣▪◦])\s*/;
const numberedMarkerPrefixPattern = /^\s*\d+[.)]\s*/;
export const WORD_PASTE = {
    blockElementNames: new Set(["p", "div", "li", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6"]),
    listCandidateElementNames: new Set(["p", "div"]),
    listCandidateSelector: "p, div",
    listMetadataPattern: msoListPattern,
    listMarkerIgnorePattern: msoListIgnorePattern,
    bulletMarkerPattern: bulletMarkerPrefixPattern,
    numberMarkerPattern: numberedMarkerPrefixPattern,
} as const;


export const PASTE_SEMANTICS = {
    anchorTagName: "a",
    boldKeyword: "bold",
    boldMinimumWeight: 600,
    lexicalBoldWeight: "700",
    italicStyle: "italic",
    lineThroughStyle: "line-through",
    lineBreakTagName: "br",
    orderedListTagName: "ol",
    unorderedListTagName: "ul",
    unsafeElementSelector: "script, style, link, svg, img, video, audio, object, embed, iframe, canvas",
} as const;
