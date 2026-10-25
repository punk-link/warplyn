import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { readSiteModuleGraph } from "./site-module-graph.mjs";


const siteRoot = new URL("../site/", import.meta.url);
const userDocsRoot = fileURLToPath(new URL("user-docs/", siteRoot));
const guideNames = findGuidePages(userDocsRoot);
const markdownExtensionPattern = /\.md$/;
const pagePaths = ["", "plans.html", ...guideNames.map((name) => `docs/${name.replace(markdownExtensionPattern, ".html")}`)];
const sitemap = readFileSync(new URL("dist/sitemap.xml", siteRoot), "utf8");
const locPattern = /<loc>([^<]+)<\/loc>/g;
const sitemapUrls = [...sitemap.matchAll(locPattern)].map((match) => match[1]);
const expectedUrls = pagePaths.map((path) => `https://warplyn.com/${path}`);
const guideDescriptions = new Set();

assert.deepEqual(sitemapUrls.sort(), expectedUrls.sort(), "Sitemap must list every public page exactly once");

for (const path of pagePaths) {
    const html = readFileSync(new URL(`dist/${path || "index.html"}`, siteRoot), "utf8");
    const headPattern = /<head>([\s\S]*?)<\/head>/;
    const head = html.match(headPattern)?.[1];

    assert.ok(head, `Missing head in ${path}`);
    const linkRelCanonicalPattern = /<link rel="canonical" href="([^"]+)"/g;
    assert.equal([...head.matchAll(linkRelCanonicalPattern)].length, 1);
    assert.ok(head.includes(`href="https://warplyn.com/${path}"`), `Incorrect canonical in ${path}`);
    assert.ok(head.includes('content="max-image-preview:large"'), `Missing preview permission in ${path}`);
    assert.ok(head.includes('name="msvalidate.01"'), `Missing Bing verification in ${path}`);
    const moduleScriptPattern = /<script\b[^>]*\btype="module"[^>]*\bsrc="([^"]+)"[^>]*>/g;
    const moduleScripts = [...head.matchAll(moduleScriptPattern)];
    assert.equal(moduleScripts.length, 1, `Expected one analytics-capable module entry in ${path}`);
    const entry = new URL(`dist${moduleScripts[0][1]}`, siteRoot);
    const moduleSource = readSiteModuleGraph(entry);
    assert.ok(moduleSource.includes("G-QWD5DZEQZG"), `Missing Google Analytics measurement ID in ${path}'s module graph`);
    assert.ok(moduleSource.includes("www.googletagmanager.com/gtag/js"), `Missing Google Analytics loader in ${path}'s module graph`);
    assert.ok(!head.includes("googletagmanager.com"), `Duplicate inline Google Analytics loader in ${path}`);
    assert.ok(head.includes('name="twitter:card" content="summary_large_image"'), `Missing social card in ${path}`);

    const propertyImageContentPattern = /property="og:image" content="https:\/\/warplyn.com\/([^"]+)"/;
    const imagePath = head.match(propertyImageContentPattern)?.[1];

    assert.ok(imagePath, `Missing social image in ${path}`);
    assert.ok(existsSync(new URL(`dist/${imagePath}`, siteRoot)), `Missing social image asset in ${path}`);

    if (path.startsWith("docs/")) {
        const nameDescriptionContentPattern = /name="description" content="([^"]+)"/;
        const description = head.match(nameDescriptionContentPattern)?.[1];

        assert.ok(description, `Missing description in ${path}`);
        assert.ok(!guideDescriptions.has(description), `Duplicate guide description in ${path}`);
        guideDescriptions.add(description);
    }
}

assert.equal(
    readFileSync(new URL("dist/yandex_9523c30c5c012173.html", siteRoot), "utf8"),
    readFileSync(new URL("public/yandex_9523c30c5c012173.html", siteRoot), "utf8"),
    "Yandex verification file must remain unchanged",
);

console.log(`Verified metadata, sitemap, and social images for ${pagePaths.length} pages in ${fileURLToPath(siteRoot)}dist.`);

function findGuidePages(directory, prefix = "") {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const relativePath = `${prefix}${entry.name}`;

        if (entry.isDirectory()) {
            return findGuidePages(join(directory, entry.name), `${relativePath}/`);
        }

        return entry.isFile() && relativePath.endsWith(".md") ? [relativePath] : [];
    });
}
