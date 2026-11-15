import assert from "node:assert/strict";
import test from "node:test";
import { INTERFACE_LOCALE } from "@skladno/shared";
import { normalizeGeneralSettings } from "./application-settings-normalizers.js";

test("General Settings preserve every installed interface locale and fall back for unknown locales", () => {
    for (const interfaceLocale of Object.values(INTERFACE_LOCALE))
        assert.equal(normalizeGeneralSettings({ interfaceLocale }).interfaceLocale, interfaceLocale);

    assert.equal(normalizeGeneralSettings({ interfaceLocale: "unknown" }).interfaceLocale, "en");
});
