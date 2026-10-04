import { ApplicationClientError, articleMarkdownByteLimit, isArticleFileBytesArray } from "@skladno/shared";
import { importArticleDocx } from "./article-docx-import.js";
import { importArticleRtf } from "./article-rtf-import.js";


self.onmessage = async ({ data }: MessageEvent<unknown>) => {
    if (!data || typeof data !== "object" || !("format" in data) || (data.format !== "docx" && data.format !== "rtf") || !("bytes" in data) || !isArticleFileBytesArray(data.bytes)) {
        self.postMessage({ error: "article_file_invalid" });
        return;
    }

    try {
        const html = data.format === "docx" ? await importArticleDocx(data.bytes) : importArticleRtf(data.bytes);
        if (html.length > articleMarkdownByteLimit)
            throw new ApplicationClientError("article_file_too_large", undefined, 413);

        self.postMessage({ html });
    } catch (error) {
        self.postMessage({ error: error instanceof ApplicationClientError ? error.code : "article_file_invalid" });
    }
};
