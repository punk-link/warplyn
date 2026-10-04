import { ApplicationClientError, articleMarkdownByteLimit } from "@skladno/shared";


export function runArticleFileWorker(format: "docx" | "rtf", bytes: Uint8Array<ArrayBuffer>): Promise<string> {
    return new Promise((resolve, reject) => {
        const worker = new Worker(new URL("./article-file-worker.ts", import.meta.url), { type: "module" });
        const timeout = setTimeout(() => {
            worker.terminate();
            reject(new ApplicationClientError("article_file_load_failed", undefined, 408));
        }, 15_000);


        function finish(): void {
            clearTimeout(timeout);
            worker.terminate();
        }


        worker.onmessage = ({ data }: MessageEvent<unknown>) => {
            finish();
            if (data && typeof data === "object" && "html" in data && typeof data.html === "string" && data.html.length <= articleMarkdownByteLimit) {
                resolve(data.html);
                return;
            }

            const code = data && typeof data === "object" && "error" in data && data.error === "article_file_too_large" ? "article_file_too_large" : "article_file_invalid";
            reject(new ApplicationClientError(code, undefined, 400));
        };
        worker.onerror = () => {
            finish();
            reject(new ApplicationClientError("article_file_load_failed", undefined, 500));
        };
        try {
            worker.postMessage({ format, bytes });
        } catch {
            finish();
            reject(new ApplicationClientError("article_file_load_failed", undefined, 500));
        }
    });
}
