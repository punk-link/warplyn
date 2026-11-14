import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { restartAppImage } from "./restart-appimage.js";


test("restart releases the instance lock before launching and exits only after process creation", async () => {
    const root = await mkdtemp(join(tmpdir(), "warplyn-restart-"));
    const marker = join(root, "started");
    const events: string[] = [];
    const application = {
        releaseSingleInstanceLock: () => {
            events.push("unlock");
        },
        requestSingleInstanceLock: () => {
            events.push("lock");
            return true;
        },
        exit: () => {
            events.push("exit");
        },
    };
    try {
        await restartAppImage(process.execPath, application,
            ["-e", "require('node:fs').writeFileSync(process.argv[1], 'started')", marker]);
        assert.deepEqual(events, ["unlock", "exit"]);
        for (let attempt = 0; attempt < 100; attempt += 1) {
            if (await readFile(marker, "utf8").catch(() => "") === "started")
                break;

            await new Promise(resolve => setTimeout(resolve, 20));
        }

        assert.equal(await readFile(marker, "utf8"), "started");
        events.length = 0;
        await assert.rejects(restartAppImage(join(root, "missing"), application, []));
        assert.deepEqual(events, ["unlock", "lock"]);
    } finally {
        await rm(root, { recursive: true, force: true });
    }
});
