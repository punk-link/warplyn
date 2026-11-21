import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";


const checker = fileURLToPath(new URL("./web-import-boundaries.mjs", import.meta.url));


function checkFixture(files) {
    const root = mkdtempSync(join(tmpdir(), "warplyn-import-boundaries-"));
    assert.equal(dirname(resolve(root)), resolve(tmpdir()));
    try {
        const source = join(root, "packages", "web", "src");
        mkdirSync(source, { recursive: true });
        for (const [name, content] of Object.entries(files)) {
            const file = join(source, name);
            mkdirSync(dirname(file), { recursive: true });
            writeFileSync(file, content);
        }

        return spawnSync(process.execPath, [checker], { cwd: root, encoding: "utf8" });
    } finally {
        rmSync(root, { recursive: true, force: true });
    }
}


test("application clients and nested HTTP adapters cannot import features or shell components", () => {
    const result = checkFixture({
        "application/client.ts": 'import type { State } from "../workspace/state/state.js";',
        "application/desktop-client.ts": 'export { Settings } from "../settings/settings.js";',
        "application/article-files-client.ts": 'import "../workspace/files.js";',
        "application/browser-article-files.ts": 'const load = () => import("../workspace/files.js");',
        "application/http/articles.ts": 'export * from "../../workspace/state/state.js";',
        "application/http/settings.ts": 'type Settings = import("../../settings/settings.js").Settings;',
        "application/http/legacy.ts": 'import Workspace = require("../../workspace/state/state.js");',
        "application/future-client.tsx": "const load = () => import(`../settings/settings.js`);",
        "application/shell.ts": 'import "../ApplicationScreens.js";',
        "application/start.ts": 'export * from "../QuickStartDialog.js";',
        "application/app.ts": 'import "../App.js";',
        "application-client.ts": 'import "./workspace/state/state.js";',
    });
    assert.equal(result.status, 1, result.stdout + result.stderr);
    for (const name of ["client", "desktop-client", "article-files-client", "browser-article-files", "shell", "start", "app"])
        assert.ok(result.stderr.includes(`application/${name}.ts:1`), result.stderr);

    for (const name of ["articles", "settings", "legacy"])
        assert.ok(result.stderr.includes(`application/http/${name}.ts:1`), result.stderr);

    assert.ok(result.stderr.includes("application/future-client.tsx:1"), result.stderr);
    assert.ok(result.stderr.includes("application-client.ts:1"), result.stderr);
});


test("clients can share adapters while application UI and test fixtures can import features", () => {
    const result = checkFixture({
        "application/client.ts": 'export { fetchArticles } from "./http/articles.js";',
        "application/http/articles.ts": 'import type { Article } from "@skladno/shared";',
        "ApplicationScreens.tsx": 'import "./workspace/EditorialWorkspace.js"; import "./settings/ApplicationSettings.js";',
        "QuickStartDialog.tsx": 'import "./ui/primitives.js";',
        "application/client.test.ts": 'import "../workspace/test-fixture.js";',
        "application/client.test.tsx": 'import "../settings/test-fixture.js";',
        "application/comments.ts": [
            '// import "../workspace/comment.js";',
            'const example = "import \\"../settings/example.js\\"";',
            'const load = () => import("./http/articles.js");',
        ].join("\n"),
    });
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.equal(result.stderr, "");
    const checkedModules = /Checked 5 web modules against 6 import boundaries/;
    assert.match(result.stdout, checkedModules);
});


test("existing feature boundaries still reject multiline and dynamic imports with useful line numbers", () => {
    const result = checkFixture({
        "settings/control.ts": '// heading\nexport {\n    Workspace,\n} from "../workspace/state.js";',
        "ui/primitives.tsx": 'const load = () => import("../ApplicationScreens.js");',
        "workspace/state/state.ts": 'import "../components/Article.js";',
        "workspace/components/Article.tsx": 'import "../EditorialWorkspace.js";',
        "workspace/views/Article.tsx": 'export * from "../EditorialWorkspace.js";',
    });
    assert.equal(result.status, 1, result.stdout + result.stderr);
    assert.ok(result.stderr.includes("settings/control.ts:4 -> workspace/state"), result.stderr);
    assert.ok(result.stderr.includes("ui/primitives.tsx:1 -> ApplicationScreens"), result.stderr);
    assert.ok(result.stderr.includes("workspace/state/state.ts:1 -> workspace/components/Article"), result.stderr);
    assert.ok(result.stderr.includes("workspace/components/Article.tsx:1 -> workspace/EditorialWorkspace"), result.stderr);
    assert.ok(result.stderr.includes("workspace/views/Article.tsx:1 -> workspace/EditorialWorkspace"), result.stderr);
});
