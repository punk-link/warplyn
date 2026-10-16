import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { startWebsiteAnalytics } from "../site/website-analytics.mjs";


function browserFixture(t, preferences = {}) {
    const listeners = new Map();
    const originals = new Map();
    for (const [name, value] of Object.entries({
        navigator: preferences,
        document: { addEventListener: (name, listener) => listeners.set(name, listener) },
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

    const events = [];
    const registrations = [];
    let configuration;
    const analytics = {
        init: (key, config) => {
            configuration = { key, config };
            config.loaded(analytics);
        },
        register: (properties) => registrations.push(properties),
        capture: (...args) => events.push(args),
    };

    return { analytics, listeners, events, registrations, configuration: () => configuration };
}


test("website analytics captures pageviews and explicit download clicks without profiles or replay", (t) => {
    const fixture = browserFixture(t);
    startWebsiteAnalytics(fixture.analytics, "public-test-key");
    const { key, config } = fixture.configuration();
    assert.equal(key, "public-test-key");
    assert.equal(config.cookieless_mode, "always");
    assert.equal(config.person_profiles, "never");
    assert.equal(config.autocapture, false);
    assert.equal(config.capture_pageview, false);
    assert.equal(config.capture_pageleave, false);
    assert.equal(config.disable_session_recording, true);
    assert.equal(config.disable_external_dependency_loading, true);
    assert.deepEqual(fixture.registrations, [{ analyticsSource: "website" }]);
    assert.deepEqual(fixture.events, [["$pageview"]]);

    const click = fixture.listeners.get("click");
    const link = {
        href: "https://github.com/punk-link/warplyn/releases/latest",
        closest: () => ({ classList: ["hero"] }),
    };
    click({ target: { closest: () => link } });
    assert.deepEqual(fixture.events[1], [
        "download_clicked", { buttonLocation: "hero" }, { transport: "sendBeacon", send_instantly: true },
    ]);
    click({ target: { closest: () => ({ href: "https://github.com/punk-link/warplyn" }) } });
    click({ target: {} });
    assert.equal(fixture.events.length, 2);
});


for (const preferences of [{ doNotTrack: "1" }, { globalPrivacyControl: true }]) {
    test(`website analytics respects ${Object.keys(preferences)[0]}`, (t) => {
        const fixture = browserFixture(t, preferences);
        startWebsiteAnalytics(fixture.analytics, "public-test-key");
        assert.equal(fixture.configuration(), undefined);
        assert.equal(fixture.listeners.size, 0);
    });
}


test("missing delivery key leaves website analytics disabled", (t) => {
    const fixture = browserFixture(t);
    startWebsiteAnalytics(fixture.analytics, undefined);
    assert.equal(fixture.configuration(), undefined);
    assert.equal(fixture.listeners.size, 0);
});


test("both public landing pages load analytics and link to the disclosure", () => {
    for (const page of ["index.html", "plans.html"]) {
        const html = readFileSync(new URL(`../site/${page}`, import.meta.url), "utf8");
        assert.ok(html.includes('type="module" src="/analytics.mjs"'));
        assert.ok(html.includes('href="/docs/telemetry.html#website-analytics"'));
    }
});
