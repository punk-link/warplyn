import { Unzip, UnzipInflate, zipSync } from "fflate";
import mammoth from "mammoth/mammoth.browser.js";
import { ApplicationClientError, articleMarkdownByteLimit } from "@skladno/shared";
import { createDocxListStyles } from "./article-docx-list-styles.js";


function validateZipDirectory(bytes: Uint8Array): void {
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    let end = bytes.length - 22;
    while (end >= Math.max(0, bytes.length - 65557) && view.getUint32(end, true) !== 0x06054b50)
        end--;

    if (end < 0 || view.getUint32(end, true) !== 0x06054b50)
        throw new Error("Invalid archive");

    const entries = view.getUint16(end + 10, true);
    if (entries > 1000 || view.getUint16(end + 4, true) || view.getUint16(end + 6, true))
        throw new ApplicationClientError("article_file_too_large", undefined, 413);

    let offset = view.getUint32(end + 16, true);
    for (let index = 0; index < entries; index++) {
        if (view.getUint32(offset, true) !== 0x02014b50 || (view.getUint16(offset + 8, true) & 1))
            throw new Error("Unsupported archive");

        offset += 46 + view.getUint16(offset + 28, true) + view.getUint16(offset + 30, true) + view.getUint16(offset + 32, true);
        if (offset > end)
            throw new Error("Invalid archive");
    }
}


/** Check actual inflated bytes and pass only XML to the converter; no embedded media or objects. */
function boundedDocx(bytes: Uint8Array): Record<string, Uint8Array> {
    validateZipDirectory(bytes);
    const parts: Record<string, Uint8Array> = {};
    const names = new Set<string>();
    let total = 0;
    let completed = 0;

    const unzip = new Unzip((file) => {
        if (names.size >= 1000 || names.has(file.name) || file.name.includes("..") || file.name.startsWith("/") || file.name.includes("\\"))
            throw new Error("Invalid archive entries");

        names.add(file.name);
        let size = 0;
        const chunks: Uint8Array[] = [];

        file.ondata = (error, chunk, final) => {
            if (error)
                throw error;

            size += chunk.length;
            total += chunk.length;
            if (size > articleMarkdownByteLimit || total > 4 * articleMarkdownByteLimit)
                throw new ApplicationClientError("article_file_too_large", undefined, 413);

            if (/\.(xml|rels)$/i.test(file.name))
                chunks.push(chunk);

            if (final) {
                completed++;
                if (chunks.length) {
                    const part = new Uint8Array(size);
                    let offset = 0;
                    for (const chunk of chunks) {
                        part.set(chunk, offset);
                        offset += chunk.length;
                    }

                    if (/<!DOCTYPE|<!ENTITY/i.test(new TextDecoder().decode(part)))
                        throw new Error("Unsupported XML");

                    parts[file.name] = part;
                }
            }
        };

        file.start();
    });

    unzip.register(UnzipInflate);
    for (let offset = 0; offset < bytes.length; offset += 1024)
        unzip.push(bytes.subarray(offset, offset + 1024), offset + 1024 >= bytes.length);

    if (completed !== names.size || !parts["word/document.xml"] || !parts["[Content_Types].xml"])
        throw new Error("Incomplete Article file");

    return parts;
}


export async function importArticleDocx(bytes: Uint8Array): Promise<string> {
    const parts = boundedDocx(bytes);
    const bounded = new Uint8Array(zipSync(parts, { level: 0 }));
    const lists = createDocxListStyles(parts);
    const result = await mammoth.convertToHtml({ arrayBuffer: bounded.buffer }, {
        externalFileAccess: false, includeEmbeddedStyleMap: false, ignoreEmptyParagraphs: false,
        convertImage: mammoth.images.imgElement(async () => ({ src: "" })),
        transformDocument: lists.transform,
        styleMap: lists.styleMap.concat(["p[style-name='Quote'] => blockquote:fresh", "p[style-name='Code'] => pre:fresh", "r[style-name='InlineCode'] => code"]),
    });

    if (result.value.length > articleMarkdownByteLimit)
        throw new ApplicationClientError("article_file_too_large", undefined, 413);

    return result.value;
}
