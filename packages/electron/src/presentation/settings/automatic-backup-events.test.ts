import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import test from "node:test";
import { registerAutomaticBackupEvents } from "./automatic-backup-events.js";


test("backup failures wait for the renderer listener and then arrive immediately", () => {
    const ipc = new EventEmitter();
    const target = new EventTarget();
    registerAutomaticBackupEvents(ipc, target);
    ipc.emit("warplyn:automatic-backup-failed");
    ipc.emit("warplyn:automatic-backup-failed");
    let failures = 0;
    target.addEventListener("warplyn:automatic-backup-failed", () => failures++);
    target.dispatchEvent(new Event("warplyn:automatic-backup-listener-ready"));
    assert.equal(failures, 1);
    target.dispatchEvent(new Event("warplyn:automatic-backup-listener-ready"));
    assert.equal(failures, 1);
    ipc.emit("warplyn:automatic-backup-failed");
    assert.equal(failures, 2);
});
