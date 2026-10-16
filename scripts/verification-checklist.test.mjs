import assert from "node:assert/strict";
import test from "node:test";
import { runVerificationChecklist } from "./verification-checklist.mjs";


test("all static failures are collected before tests are skipped", () => {
    const attempted = [];
    const checks = ["line length", "ESLint", "data properties", "typecheck"].map((name) => ({ name }));
    const passed = runVerificationChecklist(checks, [{ name: "tests" }], (step) => {
        attempted.push(step.name);
        return step.name === "typecheck";
    });
    assert.equal(passed, false);
    assert.deepEqual(attempted, checks.map((step) => step.name));
});


test("tests run only after static checks pass and a test failure fails verification", () => {
    const attempted = [];
    const run = (step) => {
        attempted.push(step.name);
        return step.name !== "tests";
    };
    assert.equal(runVerificationChecklist([{ name: "lint" }], [{ name: "tests" }], run), false);
    assert.deepEqual(attempted, ["lint", "tests"]);
    assert.equal(runVerificationChecklist([{ name: "lint" }], [{ name: "tests" }], () => true), true);
});
