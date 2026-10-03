import assert from "node:assert/strict";
import { test } from "node:test";
import { articleMarkdownByteLimit, decodeArticleMarkdown, encodeArticleMarkdown, getArticleMarkdownFileName, getImportedArticleTitle, isArticleFilesRequest } from "./files/article-files.js";


test("Markdown file rules preserve Unicode and content while validating input", () => {
    const content = "# café 🙂\n\n[URL](https://example.com/a_(b))\n\n```ts\nconst value = 34;\n```";
    assert.equal(decodeArticleMarkdown(encodeArticleMarkdown(content)), content);
    assert.equal(decodeArticleMarkdown(new TextEncoder().encode("\uFEFF# Title\r\n\rLine")), "# Title\n\nLine");
    assert.equal(decodeArticleMarkdown(new Uint8Array()), "");
    assert.throws(() => decodeArticleMarkdown(Uint8Array.of(0xff)), { code: "article_file_invalid" });
    assert.throws(() => encodeArticleMarkdown("\0"), { code: "article_file_invalid" });
    assert.throws(() => encodeArticleMarkdown("é".repeat(articleMarkdownByteLimit / 2 + 1)), { code: "article_file_too_large" });
});


test("file names and title fallback are deterministic and safe", () => {
    assert.equal(getArticleMarkdownFileName("../CON"), ".._CON.md");
    assert.equal(getArticleMarkdownFileName("CON.md"), "Article_CON.md");
    assert.equal(getArticleMarkdownFileName("café 🙂.md"), "café 🙂.md");
    assert.equal(getImportedArticleTitle({ fileName: "file.md", content: "\n# Article title ###\nBody" }, "Default"), "Article title");
    assert.equal(getImportedArticleTitle({ fileName: "file.md", content: "```\n# Code\n```" }, "Default"), "file");
    assert.equal(getImportedArticleTitle({ fileName: ".md", content: "" }, "Default"), "Default");
    assert.equal(isArticleFilesRequest({ method: "loadMarkdown", path: "secret.md" }), false);
    assert.equal(isArticleFilesRequest({ method: "saveMarkdown", file: { fileName: "file.md", content: "body", path: "secret" } }), false);
    assert.equal(isArticleFilesRequest({ method: "saveMarkdown", file: { fileName: "file.md", content: "body" } }), true);
});
