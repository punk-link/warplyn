import assert from "node:assert/strict";
import test from "node:test";
import { getPullRequestVerificationSteps } from "./verify-pr.mjs";


test("PR gates run browser and desktop sequentially, packaging Windows before desktop", () => {
    const names = (steps) => steps.map((step) => step.name);
    assert.deepEqual(names(getPullRequestVerificationSteps(false)), ["verify:core", "verify:browser"]);
    assert.deepEqual(names(getPullRequestVerificationSteps(true, "win32")), [
        "verify:core", "verify:browser", "package:electron", "verify:desktop",
    ]);
    assert.deepEqual(names(getPullRequestVerificationSteps(true, "linux", "/usr/lib/warplyn/Warplyn")), [
        "verify:core", "verify:browser", "verify:desktop",
    ]);
    const missingExecutablePattern = /WARPLYN_ELECTRON_EXECUTABLE/u;
    assert.throws(() => getPullRequestVerificationSteps(true, "linux", ""), missingExecutablePattern);
});
