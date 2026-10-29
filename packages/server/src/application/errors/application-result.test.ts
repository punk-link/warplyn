import assert from "node:assert/strict";
import test from "node:test";
import { APPLICATION_ERROR, HTTP_STATUS } from "@skladno/shared";
import { failure, success } from "./application-result.js";
import { ApplicationServiceError } from "./application-service-error.js";
import { unwrapApplicationResult } from "./unwrap-application-result.js";
import { prepareEnvironmentVariableName, prepareGeneralSettings, prepareKeyBindingOverrides } from "../settings/application-settings-normalizers.js";
import { PublishingService } from "../publishing/publishing-service.js";


test("result compatibility preserves semantic status and safe error parameters", () => {
    assert.equal(unwrapApplicationResult(success(42)), 42);
    const cases = [
        ["invalid", HTTP_STATUS.BAD_REQUEST], ["conflict", HTTP_STATUS.CONFLICT],
        ["not-found", HTTP_STATUS.NOT_FOUND], ["unavailable", HTTP_STATUS.INTERNAL_SERVER_ERROR],
    ] as const;
    for (const [kind, status] of cases)
        assert.throws(() => unwrapApplicationResult(failure(APPLICATION_ERROR.INVALID_REQUEST, kind, { count: 2 })),
            (error: unknown) => error instanceof ApplicationServiceError && error.status === status &&
                error.code === APPLICATION_ERROR.INVALID_REQUEST && error.parameters?.count === 2);
});


test("Settings validation returns failures before persistence and retains tolerant reads", () => {
    assert.equal(prepareEnvironmentVariableName("not-valid").ok, false);
    assert.equal(prepareGeneralSettings({ theme: "unknown" }).ok, false);
    assert.equal(prepareGeneralSettings({ theme: "unknown" }, false).ok, true);
    assert.equal(prepareKeyBindingOverrides({ unsupported: "Ctrl+X" }).ok, false);
    const records = new Map<string, unknown>();
    const service = new PublishingService({ getSetting: () => undefined, saveSetting: (key, value) => {
        records.set(key, value);
        return { key, value, updatedAt: "now" };
    } });
    assert.throws(() => service.setSettings({ defaultProfileId: "invalid", customProfiles: [] }),
        (error: unknown) => error instanceof ApplicationServiceError && error.code === APPLICATION_ERROR.UNSUPPORTED_PUBLISHING_PROFILE);
    assert.equal(records.size, 0);
});
