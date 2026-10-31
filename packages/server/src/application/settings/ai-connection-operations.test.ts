import assert from "node:assert/strict";
import test from "node:test";
import { APPLICATION_ERROR, type TelemetryEvent } from "@skladno/shared";
import { ApplicationServiceError } from "../errors/application-service-error.js";
import { ApplicationSettingsService } from "./application-settings-service.js";
import { AiConnectionOperations } from "./ai-connection-operations.js";


function fixture() {
    const events: TelemetryEvent[] = [];
    let enabled = true;
    const telemetry = { beginCapture: () => {
        const consent = enabled;
        return (event: TelemetryEvent) => {
            if (consent && enabled)
                events.push(event);
        };
    } };
    const records = new Map<string, unknown>();
    const calls = { saves: 0, ids: 0, models: 0, credentialWrites: 0, credentialDeletes: 0 };
    const settings = {
        getSetting: (key: string) => records.has(key) ? { key, value: records.get(key), updatedAt: "now" } : undefined,
        saveSetting: (key: string, value: unknown) => {
            calls.saves++;
            records.set(key, value);
            return { key, value, updatedAt: "now" };
        },
    };
    const models = { list: async () => {
        calls.models++;
        return [];
    } };
    const createId = () => {
        calls.ids++;
        return "connection";
    };
    const credentials = {
        available: () => true, get: () => undefined,
        set: () => {
            calls.credentialWrites++;
        }, delete: () => {
            calls.credentialDeletes++;
        },
    };
    return { records, calls, settings, events, models, disableTelemetry: () => {
        enabled = false;
    },
    operations: new AiConnectionOperations(settings, models, createId, credentials, telemetry),
    service: new ApplicationSettingsService(settings, { read: async () => ({}) }, models, createId, undefined, credentials) };
}


test("connection verification records only persisted outcomes and respects captured consent", async () => {
    const { operations, events, models, disableTelemetry } = fixture();
    operations.create({ environmentVariableName: "VALID_KEY" });
    await operations.test("connection");
    models.list = async () => {
        throw new Error("private provider response");
    };
    await operations.test("connection");
    assert.deepEqual(events, [
        { kind: "connection_verification_finished", outcome: "completed" },
        { kind: "connection_verification_finished", outcome: "failed" },
    ]);
    models.list = async () => {
        disableTelemetry();
        return [];
    };
    await operations.test("connection");
    assert.equal(events.length, 2);
});


test("connection result prerequisites preserve precedence and stop dependent effects", async () => {
    const { operations, calls } = fixture();
    assert.deepEqual(operations.create({ provider: "invalid", environmentVariableName: "invalid-name" }),
        { ok: false, code: APPLICATION_ERROR.INVALID_ENVIRONMENT_VARIABLE_NAME, kind: "invalid" });
    assert.deepEqual(operations.create({ provider: "invalid", environmentVariableName: "VALID_KEY" }),
        { ok: false, code: APPLICATION_ERROR.INVALID_REQUEST, kind: "invalid" });
    for (const result of [operations.update("missing", { environmentVariableName: "invalid-name" }),
        operations.setActive("missing", false), operations.delete("missing"), operations.renameManaged("missing", "Name"),
        await operations.test("missing")])
        assert.deepEqual(result, { ok: false, code: APPLICATION_ERROR.AI_CONNECTION_NOT_FOUND, kind: "not-found" });

    assert.deepEqual(calls, { saves: 0, ids: 0, models: 0, credentialWrites: 0, credentialDeletes: 0 });
});


test("managed verification records success after persistence and failures without private context", async () => {
    const { operations, events, models, settings } = fixture();
    await operations.createManaged({ apiKey: "synthetic-key" });
    assert.deepEqual(events, [{ kind: "connection_verification_finished", outcome: "completed" }]);
    models.list = async () => {
        throw new Error("private provider response");
    };
    await operations.createManaged({ apiKey: "synthetic-key" });
    assert.deepEqual(events.at(-1), { kind: "connection_verification_finished", outcome: "failed" });
    models.list = async () => [];
    settings.saveSetting = () => {
        throw new Error("persistence fault");
    };
    await assert.rejects(operations.createManaged({ apiKey: "synthetic-key" }));
    assert.equal(events.length, 2);
});


test("public connection errors retain status and failed updates preserve saved state", () => {
    const { service, records, calls } = fixture();
    const connection = service.createAiConnection({ environmentVariableName: "VALID_KEY" });
    const before = JSON.stringify(records.get("application-ai-connections"));
    assert.throws(() => service.updateAiConnection(connection.id, { environmentVariableName: "invalid-name" }),
        (error: unknown) => error instanceof ApplicationServiceError && error.status === 400 &&
            error.code === APPLICATION_ERROR.INVALID_ENVIRONMENT_VARIABLE_NAME);
    assert.throws(() => service.updateAiConnection("missing", { environmentVariableName: "invalid-name" }),
        (error: unknown) => error instanceof ApplicationServiceError && error.status === 404 &&
            error.code === APPLICATION_ERROR.AI_CONNECTION_NOT_FOUND);
    assert.equal(JSON.stringify(records.get("application-ai-connections")), before);
    assert.equal(calls.saves, 1);
});


test("unexpected connection persistence faults escape unchanged", () => {
    const { operations, settings } = fixture();
    const unexpected = new Error("persistence fault");
    settings.saveSetting = () => {
        throw unexpected;
    };
    assert.throws(() => operations.create({ environmentVariableName: "VALID_KEY" }), (actual) => actual === unexpected);
});
