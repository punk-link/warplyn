import assert from "node:assert/strict";
import test from "node:test";
import { runReleaseStep } from "./release-progress.mjs";


test("long steps show elapsed progress and stop reporting before returning", async (t) => {
    t.mock.timers.enable({ apis: ["setInterval", "Date"] });
    const messages = [];
    let finish;
    const running = runReleaseStep("Generating notes", () => new Promise((resolve) => {
        finish = resolve;
    }),
    (message) => messages.push(message));
    t.mock.timers.tick(10_000);
    assert(messages.at(-1).includes("still working (10s)"));
    finish("notes");
    assert.equal(await running, "notes");
    assert(messages.at(-1).includes("done (10s)"));
    const count = messages.length;
    t.mock.timers.tick(20_000);
    assert.equal(messages.length, count);
});


test("failed steps preserve the failure and clear their progress timer", async (t) => {
    t.mock.timers.enable({ apis: ["setInterval"] });
    const messages = [];
    const failure = new Error("Verification failed");
    await assert.rejects(runReleaseStep("Verifying", () => {
        throw failure;
    }, (message) => messages.push(message)),
    (error) => error === failure);
    assert(messages.at(-1).includes("stopped"));
    const count = messages.length;
    t.mock.timers.tick(20_000);
    assert.equal(messages.length, count);
});
