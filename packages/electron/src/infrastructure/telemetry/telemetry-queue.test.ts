import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { createTelemetryDelivery } from "./telemetry-delivery.js";
import { createTelemetryOwner } from "./telemetry-owner.js";
import { createTelemetryQueueStore } from "./telemetry-queue-store.js";


async function until(predicate: () => boolean): Promise<void> {
    for (let attempt = 0; attempt < 500; attempt += 1) {
        if (predicate())
            return;

        await new Promise((resolve) => setTimeout(resolve, 10));
    }

    assert.fail("Expected telemetry queue state was not reached");
}


test("pending events survive restart and opt-out deletes the bounded queue", async () => {
    const root = mkdtempSync(join(tmpdir(), "warplyn-queue-"));
    const runtimePath = join(root, "runtime.json");
    const queuePath = join(root, "queue.json");
    let scheduled: (() => void) | undefined;
    let online = false;
    const bodies: string[] = [];


    function runScheduled(): void {
        assert.ok(scheduled);
        const task = scheduled;
        scheduled = undefined;
        task();
    }


    const makeOwner = (appVersion: string) => createTelemetryOwner({ runtimePath, delivery: createTelemetryDelivery({
        packaged: true, appVersion, queuePath,
        delivery: { endpoint: "https://us.i.posthog.com/batch", projectKey: "test" },
        environment: {
            fetch: async (_input, init) => {
                bodies.push(String(init?.body));
                if (!online)
                    throw new Error("offline");

                return new Response(null, { status: 200 });
            },
            scheduleTimeout: (callback) => {
                scheduled = callback;
                return 1 as unknown as ReturnType<typeof setTimeout>;
            },
            clearScheduledTimeout: () => {
                scheduled = undefined;
            },
        },
    }) });
    writeFileSync(runtimePath, JSON.stringify({ telemetry: { consent: "granted", installationId: "11111111-1111-4111-8111-111111111111" } }));
    const first = makeOwner("0.1.0");
    try {
        const event = { kind: "ai_operation_finished", operation: "assistant", outcome: "failed", elapsedMs: 42, failure: "provider" } as const;
        first.capture(event);
        Object.assign(event, { prompt: "private mutation" });
        first.capture({ kind: "app_session_started" });
        await until(() => existsSync(queuePath) && readFileSync(queuePath, "utf8").includes("app_session_started"));
        assert.equal(readFileSync(queuePath, "utf8").includes("private mutation"), false);
        await until(() => Boolean(scheduled));
        runScheduled();
        await until(() => bodies.length === 1 && Boolean(scheduled));
        first.dispose();
        online = true;
        const second = makeOwner("0.2.0");
        try {
            await until(() => Boolean(scheduled));
            runScheduled();
            await until(() => bodies.length === 2);
            assert.equal(JSON.parse(bodies[1]!).batch[0].properties.failure, "provider");
            assert.equal(JSON.parse(bodies[1]!).batch[0].properties.appVersion, "0.1.0");
            const original = JSON.parse(bodies[0]!).batch;
            const restored = JSON.parse(bodies[1]!).batch;
            const eventUuidPattern = /^[0-9a-f-]{36}$/;
            assert.match(original[0].uuid, eventUuidPattern);
            assert.notEqual(original[0].uuid, original[1].uuid);
            assert.equal(restored[0].uuid, original[0].uuid);
            assert.equal(restored[0].properties.timestamp, original[0].properties.timestamp);
            second.capture({ kind: "app_session_started" });
            await until(() => existsSync(queuePath) && readFileSync(queuePath, "utf8").includes("app_session_started"));
            second.setConsent(false);
            await until(() => !existsSync(queuePath));
        } finally {
            second.dispose();
        }
    } finally {
        first.dispose();
        rmSync(root, { recursive: true, force: true });
    }
});


test("malformed persisted events are not delivered", async () => {
    const root = mkdtempSync(join(tmpdir(), "warplyn-queue-invalid-"));
    const path = join(root, "queue.json");
    const id = "6f5592a1-831d-4d66-aad0-21f31f104732";
    writeFileSync(path, JSON.stringify({ installationId: id, entries: [{ event: { kind: "app_session_started", prompt: "private" }, queuedAt: Date.now() }] }));
    try {
        const store = createTelemetryQueueStore(path);
        assert.deepEqual(await store.load(id, Date.now(), 24 * 60 * 60_000), []);
    } finally {
        rmSync(root, { recursive: true, force: true });
    }
});


test("recovery rejects another installation and expired events", async () => {
    const root = mkdtempSync(join(tmpdir(), "warplyn-queue-expiry-"));
    const path = join(root, "queue.json");
    const store = createTelemetryQueueStore(path);
    const id = "6f5592a1-831d-4d66-aad0-21f31f104732";
    try {
        store.save(id, [{ event: { kind: "app_session_started" }, queuedAt: 100 }]);
        await store.settled();
        assert.equal((await store.load("another-installation", 200, 150)).length, 0);
        assert.equal((await store.load(id, 300, 150)).length, 0);
        assert.equal((await store.load(id, 200, 150)).length, 1);
    } finally {
        rmSync(root, { recursive: true, force: true });
    }
});


for (const action of ["opt-out", "shutdown"] as const) {
    test(`${action} preserves its queue policy while a delivery is in flight`, async () => {
        const root = mkdtempSync(join(tmpdir(), "warplyn-queue-optout-"));
        const queuePath = join(root, "queue.json");
        let scheduled: (() => void) | undefined;
        let started = false;
        let finish: ((response: Response) => void) | undefined;
        const owner = createTelemetryOwner({ runtimePath: join(root, "runtime.json"), delivery: createTelemetryDelivery({
            packaged: true, appVersion: "0.1.0", queuePath,
            delivery: { endpoint: "https://us.i.posthog.com/batch", projectKey: "test" },
            environment: {
                fetch: async () => {
                    started = true;
                    return new Promise((resolve) => {
                        finish = resolve;
                    });
                },
                scheduleTimeout: (callback) => {
                    scheduled = callback;
                    return 1 as unknown as ReturnType<typeof setTimeout>;
                },
                clearScheduledTimeout: () => {
                    scheduled = undefined;
                },
            },
        }) });
        try {
            owner.setConsent(true);
            owner.capture({ kind: "app_session_started" });
            await until(() => existsSync(queuePath) && Boolean(scheduled));
            scheduled?.();
            await until(() => started);
            const installationId = owner.getConsent().installationId!;
            if (action === "opt-out")
                owner.setConsent(false);
            else
                owner.dispose();

            finish?.(new Response(null, { status: 503 }));
            if (action === "opt-out") {
                await until(() => !existsSync(queuePath));
                assert.equal(owner.getConsent().enabled, false);
            } else {
                await new Promise((resolve) => setTimeout(resolve, 50));
                const stored = await createTelemetryQueueStore(queuePath).load(installationId, Date.now(), 24 * 60 * 60_000);
                assert.equal(stored.length, 1);
            }
        } finally {
            owner.dispose();
            rmSync(root, { recursive: true, force: true });
        }
    });
}
