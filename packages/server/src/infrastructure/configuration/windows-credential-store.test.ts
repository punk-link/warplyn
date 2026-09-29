import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import test from "node:test";
import { Entry } from "@napi-rs/keyring";
import { WindowsCredentialStore } from "./windows-credential-store.js";


test("imported connection IDs cannot read or delete legacy Windows credentials", { skip: process.platform !== "win32" }, () => {
    const id = `migration-test-${randomUUID()}`;
    const legacy = new Entry("io.github.kirillta.skladno", id);
    const store = new WindowsCredentialStore();
    legacy.setPassword("disposable-legacy-key");
    try {
        assert.equal(store.get(id), undefined);
        store.set(id, "disposable-warplyn-key");
        assert.equal(store.get(id), "disposable-warplyn-key");
        store.delete(id);
        assert.equal(legacy.getPassword(), "disposable-legacy-key");
    } finally {
        new Entry("com.warplyn.desktop", id).deleteCredential();
        legacy.deleteCredential();
    }
});
