import { describe, expect, it } from "vitest";
import { unzipSync, zipSync } from "fflate";
import { articleHtmlToMarkdown, articleMarkdownToHtml, createSafeArticleHtml } from "./article-html.js";
import { exportArticleFile } from "./article-file-codecs.js";
import { importArticleDocx } from "./article-docx-import.js";
import { importArticleRtf } from "./article-rtf-import.js";


const fixture = "# Title café 🙂\n\nA **bold** and *italic* with ~~strike~~, `inline`, [URL](https://example.com/a_(b)).\n\nSecond paragraph.\n\n- First\n    - Nested\n- Last\n\n3. Three\n4. Four\n\n> Quote\n\n```ts\nconst value = 34;\nnext();\n```";


describe("Article format conversion", () => {
    // Product scenarios: history-and-publishing.article-files-format-conversion
    it("imports independent OOXML list starts, nesting and inline marks", async () => {
        const namespace = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
        const paragraph = (text: string, level: number) => `<w:p><w:pPr><w:numPr><w:ilvl w:val="${level}"/><w:numId w:val="7"/></w:numPr></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>${text}</w:t></w:r></w:p>`;
        const bytes = zipSync({
            "[Content_Types].xml": new TextEncoder().encode('<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>'),
            "word/document.xml": new TextEncoder().encode(`<w:document xmlns:w="${namespace}"><w:body>${paragraph("Three", 0)}${paragraph("Nested", 1)}${paragraph("Four", 0)}</w:body></w:document>`),
            "word/numbering.xml": new TextEncoder().encode(`<w:numbering xmlns:w="${namespace}"><w:abstractNum w:abstractNumId="1"><w:lvl w:ilvl="0"><w:start w:val="3"/><w:numFmt w:val="decimal"/><w:lvlText w:val="%1."/></w:lvl><w:lvl w:ilvl="1"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="•"/></w:lvl></w:abstractNum><w:num w:numId="7"><w:abstractNumId w:val="1"/></w:num></w:numbering>`),
            "word/_rels/document.xml.rels": new TextEncoder().encode('<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="r1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/></Relationships>'),
        });
        const html = await importArticleDocx(bytes);
        const markdown = articleHtmlToMarkdown(html);
        expect(markdown).toContain("3. **Three**");
        expect(markdown).toContain("4. **Four**");
        expect(createSafeArticleHtml(html).querySelectorAll("ol ul")).toHaveLength(1);
    });

    it("preserves paragraphs, lists, inline marks and code through semantic HTML", () => {
        const html = articleMarkdownToHtml(fixture);
        expect(html).toContain("<pre");
        const markdown = articleHtmlToMarkdown(html);
        expect(markdown).toMatch(/# (?:\*\*)?Title café 🙂/);
        expect(markdown).toContain("**bold**");
        expect(markdown).toContain("*italic*");
        expect(markdown).toContain("~~strike~~");
        expect(markdown).toContain("Second paragraph.");
        expect(markdown).toContain("- Nested");
        expect(markdown).toContain("3. Three");
        expect(markdown).toContain("const value = 34;");
        expect(createSafeArticleHtml(html).querySelectorAll("ul ul")).toHaveLength(1);
    });

    it("retains external HTML formatting and table text while removing executable/resource markup", () => {
        const html = '<head><base href="https://private.test"><style>bad</style></head><p>First <span style="font-weight:bold;font-style:italic">both</span></p><ul><li>One<ul><li>Nested</li></ul></li></ul><p>Second</p><table><tr><td>A</td><td>B</td></tr></table><script>private</script><img src="https://private.test"><a href="javascript:alert(1)" onclick="private()">safe text</a>';
        const safe = createSafeArticleHtml(html);
        expect(safe.querySelector("img,script,style,base,[onclick],[src]" )).toBeNull();
        expect(safe.querySelector("a")?.hasAttribute("href")).toBe(false);
        const markdown = articleHtmlToMarkdown(html);
        expect(markdown).toContain("***both***");
        expect(markdown).toContain("- Nested");
        expect(markdown).toContain("Second");
        expect(markdown).toContain("A");
        expect(markdown).toContain("B");
        expect(markdown).not.toContain("private");
    });

    it("exports valid DOCX structure and retains supported content on import", async () => {
        const bytes = await exportArticleFile(fixture, "Title", "docx");
        const parts = unzipSync(bytes);
        const xml = new TextDecoder().decode(parts["word/document.xml"]);
        expect(xml).toContain("<w:numPr>");
        expect(xml).toContain("<w:b/>");
        expect(xml).toContain("const value = 34;");
        const importedHtml = await importArticleDocx(bytes);
        expect(importedHtml).toContain("<pre");
        const markdown = articleHtmlToMarkdown(importedHtml);
        expect(markdown).toContain("# Title café 🙂");
        expect(markdown).toContain("**bold**");
        expect(markdown).toContain("- Nested");
        expect(markdown).toContain("3. Three");
        expect(markdown).toContain("const value = 34;");
        expect(markdown).toContain("[URL](https://example.com/a_%28b%29)");
    });

    it("preserves RTF nested lists, paragraph boundaries, formatting and Unicode", async () => {
        const bytes = await exportArticleFile(fixture, "Title", "rtf");
        const markdown = articleHtmlToMarkdown(importArticleRtf(bytes));
        expect(markdown).toContain("# Title café 🙂");
        expect(markdown).toContain("**bold**");
        expect(markdown).toContain("*italic*");
        expect(markdown).toContain("~~strike~~");
        expect(markdown).toContain("- Nested");
        expect(markdown).toContain("3. Three");
        expect(markdown).toContain("Second paragraph.");
        expect(markdown).toContain("const value = 34;");
        expect(markdown).toContain("[URL](https://example.com/a_%28b%29)");
    });

    it("decodes external RTF code pages and Unicode fallbacks with strict nesting bounds", () => {
        const bytes = new TextEncoder().encode("{\\rtf1\\ansi\\ansicpg1252\\uc1 First caf\\'e9 \\b bold\\b0\\par Second \\u945?\\par}");
        const markdown = articleHtmlToMarkdown(importArticleRtf(bytes));
        expect(markdown).toContain("café **bold**");
        expect(markdown).toContain("Second α");
        expect(() => importArticleRtf(new TextEncoder().encode("{\\rtf1 " + "{".repeat(260) + "x" + "}".repeat(261)))).toThrow();
        expect(() => importArticleRtf(new TextEncoder().encode("not RTF"))).toThrow();
    });

    it("imports independently authored RTF list levels and ignores embedded destinations", () => {
        const rtf = String.raw`{\rtf1\ansi{\*\listtable{\list\listtemplateid1{\listlevel\levelnfc0\levelstartat3{\leveltext\'02\'00.;}{\levelnumbers\'01;}}{\listlevel\levelnfc23\levelstartat1{\leveltext\'01\u8226?;}{\levelnumbers;}}\listid1}}{\*\listoverridetable{\listoverride\listid1\listoverridecount0\ls1}}\pard\ls1\ilvl0 Three\par\pard\ls1\ilvl1 Nested\par\pard\ls1\ilvl0 Four\par{\object\objdata 001122}{\pict\pngblip 001122}}`;
        const html = importArticleRtf(new TextEncoder().encode(rtf));
        const markdown = articleHtmlToMarkdown(html);
        expect(markdown).toContain("3. Three");
        expect(markdown).toContain("4. Four");
        expect(createSafeArticleHtml(html).querySelectorAll("ol ul")).toHaveLength(1);
        expect(markdown).not.toContain("001122");
    });

    it("rejects malformed archives and actual oversized inflated XML", async () => {
        await expect(importArticleDocx(Uint8Array.of(0, 255))).rejects.toThrow();
        const oversized = zipSync({ "word/document.xml": new TextEncoder().encode("a".repeat(10 * 1024 * 1024 + 1)), "[Content_Types].xml": new Uint8Array() });
        await expect(importArticleDocx(oversized)).rejects.toMatchObject({ code: "article_file_too_large" });
    });

    it("retains genuinely empty Articles in each export format", async () => {
        expect(articleHtmlToMarkdown(new TextDecoder().decode(await exportArticleFile("", "Empty", "html")))).toBe("");
        expect(articleHtmlToMarkdown(await importArticleDocx(await exportArticleFile("", "Empty", "docx")))).toBe("");
        expect(articleHtmlToMarkdown(importArticleRtf(await exportArticleFile("", "Empty", "rtf")))).toBe("");
    });
});
