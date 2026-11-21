import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { checkLocaleTopology } from "./check-locale-topology.mjs";


test("locale topology checks files and keys while allowing translated values", () => {
    const root = mkdtempSync(join(tmpdir(), "locale-topology-"));
    try {
        for (const locale of ["en", "ru"])
            mkdirSync(join(root, locale));

        writeFileSync(join(root, "en/index.ts"), 'export const en = { "title": "Title" };');
        writeFileSync(join(root, "ru/index.ts"), 'export const ru = { "title": "Название" };');
        assert.deepEqual(checkLocaleTopology(root), []);
        writeFileSync(join(root, "ru/index.ts"), 'export const ru = { "other": "Название" };');
        const keyStructureDiffersPattern = /key structure differs/;
        assert.match(checkLocaleTopology(root).join("\n"), keyStructureDiffersPattern);
        writeFileSync(join(root, "ru/notes.ts"), "export const notes = {};");
        const unexpectedFilePattern = /unexpected file/;
        assert.match(checkLocaleTopology(root).join("\n"), unexpectedFilePattern);
        rmSync(join(root, "ru/index.ts"));
        const missingFilePattern = /missing file/;
        assert.match(checkLocaleTopology(root).join("\n"), missingFilePattern);
    } finally {
        rmSync(root, { recursive: true, force: true });
    }
});
