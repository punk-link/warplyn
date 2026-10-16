import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { startGoogleAnalytics } from "../site/google-analytics.mjs";


function browserFixture(t, preferences = {}) {
    const scripts = [];
    const browserWindow = {};
    const originals = new Map();
    for (const [name, value] of Object.entries({
        navigator: preferences,
        window: browserWindow,
        document: {
            getElementById: (id) => scripts.find((script) => script.id === id),
            createElement: () => ({}),
            head: { append: (script) => scripts.push(script) },
        },
    })) {
        originals.set(name, Object.getOwnPropertyDescriptor(globalThis, name));
        Object.defineProperty(globalThis, name, { value, configurable: true });
    }

    t.after(() => {
        for (const [name, descriptor] of originals) {
            if (descriptor)
                Object.defineProperty(globalThis, name, descriptor);
            else
                delete globalThis[name];
        }
    });

    return { scripts, browserWindow };
}


test("Google Analytics initializes the existing property exactly once", (t) => {
    const { scripts, browserWindow } = browserFixture(t);
    startGoogleAnalytics();
    startGoogleAnalytics();
    assert.equal(scripts.length, 1);
    assert.equal(scripts[0].src, "https://www.googletagmanager.com/gtag/js?id=G-QWD5DZEQZG");
    assert.equal(scripts[0].async, true);
    const commands = browserWindow.dataLayer.map((command) => Array.from(command));
    assert.equal(commands.length, 2);
    assert.equal(commands[0][0], "js");
    assert.ok(commands[0][1] instanceof Date);
    assert.deepEqual(commands[1], ["config", "G-QWD5DZEQZG"]);
});


for (const preferences of [{ doNotTrack: "1" }, { globalPrivacyControl: true }]) {
    test(`Google Analytics respects ${Object.keys(preferences)[0]} without loading or queueing`, (t) => {
        const { scripts, browserWindow } = browserFixture(t, preferences);
        startGoogleAnalytics();
        assert.equal(scripts.length, 0);
        assert.equal(browserWindow.dataLayer, undefined);
        assert.equal(browserWindow.gtag, undefined);
    });
}


test("landing pages and docs use the shared initializer without inline counters", () => {
    for (const page of ["index.html", "plans.html", "user-docs/.vitepress/config.mts"]) {
        const source = readFileSync(new URL(`../site/${page}`, import.meta.url), "utf8");
        assert.ok(!source.includes("googletagmanager.com"));
        assert.ok(!source.includes("gtag("));
    }

    for (const entry of ["analytics.mjs", "user-docs/.vitepress/theme/index.ts"]) {
        const source = readFileSync(new URL(`../site/${entry}`, import.meta.url), "utf8");
        assert.ok(source.includes("startGoogleAnalytics()"));
        assert.ok(source.includes("import.meta.env.PROD"));
    }
});
