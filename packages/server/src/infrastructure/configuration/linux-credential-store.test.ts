import assert from "node:assert/strict";
import test from "node:test";
import { randomUUID } from "node:crypto";
import { Entry } from "@napi-rs/keyring";

import { APPLICATION_ERROR } from "@skladno/shared";

import { ApplicationServiceError } from "../../application/errors/application-service-error.js";
import { LinuxCredentialStore } from "./linux-credential-store.js";


test("native Linux credentials remain isolated from Skladno", { skip: process.platform !== "linux" || process.env.WARPLYN_NATIVE_CREDENTIAL_TEST !== "true" }, () => {
    const id = `migration-test-${randomUUID()}`;
    const legacy = new Entry("io.github.kirillta.skladno", id);
    const store = new LinuxCredentialStore();
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


test("Linux Secret Service stores credentials across adapter recreation", () => {
    const credentials = new Map<string, string>();
    const createEntry = (connectionId: string) => ({
        getPassword: () => credentials.get(connectionId) ?? null,
        setPassword: (value: string) => {
            credentials.set(connectionId, value);
            return true;
        },
        deleteCredential: () => {
            credentials.delete(connectionId);
            return true;
        },
    });
    const store = new LinuxCredentialStore(createEntry, "linux");

    store.set("connection", "secret");
    assert.equal(new LinuxCredentialStore(createEntry, "linux").get("connection"), "secret");
    store.delete("connection");
    assert.equal(store.get("connection"), undefined);
});


test("Linux Secret Service failures stay renderer-safe", () => {
    const store = new LinuxCredentialStore(() => ({
        getPassword: () => {
            throw new Error("D-Bus unavailable");
        },
        setPassword: () => {
            throw new Error("D-Bus unavailable");
        },
        deleteCredential: () => {
            throw new Error("D-Bus unavailable");
        },
    }), "linux");

    for (const operation of [() => store.get("connection"), () => store.set("connection", "secret"), () => store.delete("connection")])
        assert.throws(
            operation,
            (error: unknown) => error instanceof ApplicationServiceError && error.code === APPLICATION_ERROR.MANAGED_CREDENTIALS_UNAVAILABLE,
        );
});
