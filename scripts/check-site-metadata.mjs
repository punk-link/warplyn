import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";


const siteRoot = new URL("../site/", import.meta.url);
const guideNames = readdirSync(new URL("user-docs/", siteRoot))
    .filter((name) => name.endsWith(".md"));
const pagePaths = ["", "plans.html", ...guideNames.map((name) => `docs/${name.replace(/\.md$/, ".html")}`)];
const sitemap = readFileSync(new URL("dist/sitemap.xml", siteRoot), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedUrls = pagePaths.map((path) => `https://warplyn.com/${path}`);
const guideDescriptions = new Set();

assert.deepEqual(sitemapUrls.sort(), expectedUrls.sort(), "Sitemap must list every public page exactly once");

for (const path of pagePaths) {
    const html = readFileSync(new URL(`dist/${path || "index.html"}`, siteRoot), "utf8");
    const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1];

    assert.ok(head, `Missing head in ${path}`);
    assert.equal([...head.matchAll(/<link rel="canonical" href="([^"]+)"/g)].length, 1);
    assert.ok(head.includes(`href="https://warplyn.com/${path}"`), `Incorrect canonical in ${path}`);
    assert.ok(head.includes('content="max-image-preview:large"'), `Missing preview permission in ${path}`);
    assert.ok(head.includes('name="msvalidate.01"'), `Missing Bing verification in ${path}`);
    assert.equal([...head.matchAll(/src="https:\/\/www.googletagmanager.com\/gtag\/js\?id=G-QWD5DZEQZG"/g)].length, 1);
    assert.ok(head.includes('name="twitter:card" content="summary_large_image"'), `Missing social card in ${path}`);

    const imagePath = head.match(/property="og:image" content="https:\/\/warplyn.com\/([^"]+)"/)?.[1];

    assert.ok(imagePath, `Missing social image in ${path}`);
    assert.ok(existsSync(new URL(`dist/${imagePath}`, siteRoot)), `Missing social image asset in ${path}`);

    if (path.startsWith("docs/")) {
        const description = head.match(/name="description" content="([^"]+)"/)?.[1];

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
