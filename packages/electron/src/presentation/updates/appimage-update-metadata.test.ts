import assert from "node:assert/strict";
import test from "node:test";
import { readAppImageUpdateMetadata } from "./appimage-update-metadata.js";

test("AppImage metadata binds version, architecture, filename, size and digest", () => {
    const valid = { version: "0.9.0", architecture: "x64", file: "Warplyn-0.9.0-linux-x64.AppImage", size: 100, sha256: "a".repeat(64) };
    assert.equal(readAppImageUpdateMetadata(valid, "0.9.0").size, 100);
    for (const invalid of [null, {}, { ...valid, version: "0.8.0" }, { ...valid, architecture: "arm64" },
        { ...valid, file: "../image" }, { ...valid, size: -1 }, { ...valid, size: Infinity }, { ...valid, sha256: "x".repeat(64) }])
        assert.throws(() => readAppImageUpdateMetadata(invalid, "0.9.0"));
});
