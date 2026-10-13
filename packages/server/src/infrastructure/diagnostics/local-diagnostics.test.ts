import assert from "node:assert/strict";
import test from "node:test";

import { createLocalDiagnostics } from "./local-diagnostics.js";


// product: cross-cutting.private-diagnostics
test("local diagnostics redact private values and ignore writer failures", () => {
    const lines: string[] = [];
    const diagnostics = createLocalDiagnostics({
        stdout: (line) => {
            lines.push(line);
        },
        stderr: (line) => {
            lines.push(line);
        },
        environment: { WARPLYN_AI_API_KEY: "secret-key", CUSTOM_KEY: "custom-secret" },
    });

    diagnostics.write("service.started", {
        apiKey: "secret-key",
        article: { content: "private Article body" },
        response: { model: "private model body" },
        detail: "custom-secret",
        status: 200,
    });
    diagnostics.write("request.failed", { body: "private request" }, Object.assign(new Error("private error"), { code: "EFAIL" }));

    const started = JSON.parse(lines[0]!) as { timestamp: string };
    assert.deepEqual(started, {
        timestamp: started.timestamp,
        event: "service.started",
        apiKey: "[REDACTED]",
        article: "[REDACTED]",
        response: "[REDACTED]",
        detail: "[REDACTED]",
        status: 200,
    });
    const secretKeyCustomPattern = /secret-key|custom-secret|private Article body|private model body/;
    assert.doesNotMatch(lines[0]!, secretKeyCustomPattern);

    const eventRequestFailedPattern = /"event":"request.failed"/;
    assert.match(lines[1]!, eventRequestFailedPattern);
    const errornameErrorPattern = /"errorName":"Error"/;
    assert.match(lines[1]!, errornameErrorPattern);
    const errorcodeEfailPattern = /"errorCode":"EFAIL"/;
    assert.match(lines[1]!, errorcodeEfailPattern);
    const privateRequestErrorPattern = /private request|private error/;
    assert.doesNotMatch(lines[1]!, privateRequestErrorPattern);

    const loadedAfterStartup: NodeJS.ProcessEnv = {};
    const delayedLines: string[] = [];
    const delayedDiagnostics = createLocalDiagnostics({
        stdout: (line) => {
            delayedLines.push(line);
        },
        environment: loadedAfterStartup,
    });
    loadedAfterStartup.CUSTOM_KEY = "loaded-secret";
    delayedDiagnostics.write("service.started", { detail: "loaded-secret" });
    const loadedSecretPattern = /loaded-secret/;
    assert.doesNotMatch(delayedLines[0]!, loadedSecretPattern);

    createLocalDiagnostics({ stdout: () => {
        throw new Error("unavailable stream");
    } }).write("service.started");
});
