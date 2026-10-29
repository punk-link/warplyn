import assert from "node:assert/strict";
import test from "node:test";
import { success, failure, type Result } from "./result.js";


test("result constructors retain success values and typed failure details", () => {
    const value = { content: "Article" };
    assert.equal(success(value).value, value);
    assert.deepEqual(success(undefined), { ok: true, value: undefined });
    const error = new Error("conflict");
    const result: Result<never, { code: "conflict"; error: Error }> = failure({ code: "conflict", error });
    assert.equal(result.ok, false);
    assert.equal(result.error, error);
    assert.equal(result.code, "conflict");
});
