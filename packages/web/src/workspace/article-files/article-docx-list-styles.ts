import { DOMParser, type Element } from "@xmldom/xmldom";


const wordNamespace = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";


function readXml(bytes: Uint8Array | undefined) {
    return new DOMParser().parseFromString(new TextDecoder().decode(bytes ?? new Uint8Array()), "application/xml");
}


function attribute(element: Element | null | undefined, name: string): string {
    return element?.getAttributeNS(wordNamespace, name) ?? "";
}


function child(element: Element, name: string): Element | undefined {
    return Array.from(element.getElementsByTagNameNS(wordNamespace, name))[0];
}


function boundedNumber(value: string, fallback: number, maximum: number): number {
    const number = Number(value);
    return value && Number.isSafeInteger(number) && number >= 0 && number <= maximum ? number : fallback;
}


function readListStarts(parts: Record<string, Uint8Array>) {
    const starts = new Map<string, { tag: "ol" | "ul"; start: number }>();
    if (!parts["word/numbering.xml"])
        return starts;

    const numbering = readXml(parts["word/numbering.xml"]);
    const abstracts = new Map<string, Element>();
    Array.from(numbering.getElementsByTagNameNS(wordNamespace, "abstractNum")).forEach((element) => abstracts.set(attribute(element, "abstractNumId"), element));
    for (const num of Array.from(numbering.getElementsByTagNameNS(wordNamespace, "num"))) {
        const id = attribute(num, "numId");
        const abstract = abstracts.get(attribute(child(num, "abstractNumId"), "val"));
        if (!abstract)
            continue;

        for (const level of Array.from(abstract.getElementsByTagNameNS(wordNamespace, "lvl"))) {
            const index = attribute(level, "ilvl");
            const override = Array.from(num.getElementsByTagNameNS(wordNamespace, "lvlOverride")).find((candidate) => attribute(candidate, "ilvl") === index);
            const start = boundedNumber(attribute(override && child(override, "startOverride"), "val") || attribute(child(level, "start"), "val"), 1, 1_000_000);
            starts.set(`${id}:${index}`, { tag: attribute(child(level, "numFmt"), "val") === "bullet" ? "ul" : "ol", start });
        }
    }

    return starts;
}


function paragraphListPaths(parts: Record<string, Uint8Array>): (string | undefined)[] {
    const starts = readListStarts(parts);
    const paths: (string | undefined)[] = [];
    const ancestors: string[] = [];
    const ancestorIds: string[] = [];
    let sequence = 0;
    const source = readXml(parts["word/document.xml"]);
    for (const paragraph of Array.from(source.getElementsByTagNameNS(wordNamespace, "p"))) {
        const numPr = child(paragraph, "numPr");
        if (!numPr) {
            paths.push(undefined);
            ancestors.length = 0;
            ancestorIds.length = 0;

            continue;
        }

        const id = attribute(child(numPr, "numId"), "val");
        const level = boundedNumber(attribute(child(numPr, "ilvl"), "val"), 0, 8);
        const info = starts.get(`${id}:${level}`);
        if (!info) {
            paths.push(undefined);
            continue;
        }

        if (ancestorIds[level] !== id || !ancestors[level]) {
            sequence++;
            const start = info.tag === "ol" ? `[start='${info.start}']` : "";
            ancestors[level] = `${info.tag}[data-list='${sequence}']${start}`;
            ancestorIds[level] = id;
        }

        ancestors.length = level + 1;
        ancestorIds.length = level + 1;
        paths.push(ancestors.map((path) => `${path || "ul"} > li`).join(" > ") + ":fresh");
    }

    return paths;
}


/** Mammoth omits list starts and merges list identities; supply explicit semantic list paths. */
export function createDocxListStyles(parts: Record<string, Uint8Array>) {
    const paths = paragraphListPaths(parts);
    const styleMap = paths.flatMap((path, index) => path ? [`p[style-name='ArticleList${index + 1}'] => ${path}`] : []);
    let paragraphIndex = 0;


    function transform(value: unknown): unknown {
        if (!value || typeof value !== "object" || !("type" in value))
            return value;

        if (value.type === "paragraph") {
            const path = paths[paragraphIndex++];
            if (path && "styleName" in value) {
                const styleName = `ArticleList${paragraphIndex}`;
                value.styleName = styleName;
            }
        }

        if ("children" in value && Array.isArray(value.children))
            value.children.forEach(transform);

        return value;
    }


    return { styleMap, transform };
}
