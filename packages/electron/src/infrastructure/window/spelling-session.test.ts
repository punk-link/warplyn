import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { isDesktopSpellingRequest, isDesktopSpellingResult, isPersonalSpellingWord } from "@skladno/shared";
import { readRuntimeSettings, updateRuntimeSettings } from "../runtime/runtime-settings.js";
import { SpellingSession } from "./spelling-session.js";


class TestSpellingSession extends EventEmitter {
    availableSpellCheckerLanguages = ["en-US", "en-GB", "es-ES", "es", "pt-BR", "pt-PT", "de"];


    active: string[] = [];


    enabled = false;


    setSpellCheckerEnabled(enabled: boolean) {
        this.enabled = enabled;
    }


    words = new Set<string>();


    setSpellCheckerLanguages(languages: string[]) {
        this.active = languages;
    }


    async listWordsInSpellCheckerDictionary() {
        return [...this.words];
    }


    addWordToSpellCheckerDictionary(word: string) {
        if (word === "failedterm")
            return false;

        this.words.add(word);
        return true;
    }


    removeWordFromSpellCheckerDictionary(word: string) {
        return this.words.delete(word);
    }
}


// Product scenarios: settings.spelling-dictionaries, settings.spelling-personal-words
test("preparation restores Article language, reports native readiness, and preserves runtime settings", async (t) => {
    const root = mkdtempSync(join(tmpdir(), "warplyn-spelling-"));
    t.after(() => rmSync(root, { recursive: true, force: true }));
    const path = join(root, "runtime-settings.json");
    updateRuntimeSettings(path, () => ({ updateNetworkAccess: false, spelling: { preloadLanguages: ["es-ES"] } }));
    const native = new TestSpellingSession();
    const spelling = new SpellingSession(native, path, "win32", ["en-GB"]);
    t.after(() => spelling.dispose());
    assert.deepEqual(native.active, ["en-GB"]);
    assert.equal(native.enabled, true);
    assert.deepEqual((await spelling.snapshot()).dictionaries.requested, ["es-ES"]);
    assert.equal((await spelling.snapshot()).dictionaries.states["es-ES"], undefined);
    spelling.prepare(["pt-BR", "es-ES", "pt-BR"]);
    assert.deepEqual(native.active, ["pt-BR", "es-ES"]);
    native.emit("spellcheck-dictionary-download-success", {}, "pt-BR");
    assert.equal((await spelling.snapshot()).dictionaries.states["pt-BR"], "preparing");
    native.emit("spellcheck-dictionary-initialized", {}, "pt-BR");
    assert.equal((await spelling.snapshot()).dictionaries.states["pt-BR"], "ready");
    spelling.setArticleLanguage("es");
    assert.deepEqual(native.active, ["es"]);
    assert.equal((await spelling.snapshot()).dictionaries.states["es-ES"], "failed");
    assert.throws(() => spelling.prepare(["en-US"]));
    spelling.setArticleLanguage("pt");
    assert.deepEqual(native.active, ["pt-BR"]);
    spelling.setArticleLanguage("unknown");
    assert.deepEqual(native.active, ["en-GB"]);
    spelling.setArticleLanguage(null);
    assert.throws(() => spelling.prepare(["zz-ZZ"]));
    assert.equal(readRuntimeSettings(path).updateNetworkAccess, false);
    assert.deepEqual(readRuntimeSettings(path).spelling?.preloadLanguages, ["pt-BR", "es-ES"]);
    const restarted = new SpellingSession(native, path, "win32", ["en-GB"]);
    assert.equal((await restarted.snapshot()).dictionaries.states["pt-BR"], undefined);
    restarted.dispose();
    spelling.dispose();
    assert.equal(native.listenerCount("spellcheck-dictionary-initialized"), 0);
});

test("dictionary preparation times out without claiming readiness and can be retried", async (t) => {
    const root = mkdtempSync(join(tmpdir(), "warplyn-spelling-timeout-"));
    t.after(() => rmSync(root, { recursive: true, force: true }));
    t.mock.timers.enable({ apis: ["setTimeout"] });
    const native = new TestSpellingSession();
    const spelling = new SpellingSession(native, join(root, "runtime.json"), "win32", ["en-US"]);
    t.after(() => spelling.dispose());
    spelling.prepare(["es"]);
    t.mock.timers.tick(30_000);
    assert.equal((await spelling.snapshot()).dictionaries.states.es, "failed");
    spelling.prepare(["es"]);
    native.emit("spellcheck-dictionary-initialized", {}, "es");
    assert.equal((await spelling.snapshot()).dictionaries.states.es, "ready");
});

test("unloading removes preload choices, suppresses late readiness, and writing enables spelling again", async (t) => {
    const root = mkdtempSync(join(tmpdir(), "warplyn-spelling-unload-"));
    t.after(() => rmSync(root, { recursive: true, force: true }));
    const path = join(root, "runtime.json");
    const native = new TestSpellingSession();
    const spelling = new SpellingSession(native, path, "win32", ["en-US"]);
    t.after(() => spelling.dispose());
    spelling.prepare(["es", "pt-BR"]);
    native.emit("spellcheck-dictionary-initialized", {}, "es");
    native.emit("spellcheck-dictionary-initialized", {}, "pt-BR");
    spelling.unload("es");
    assert.deepEqual(native.active, ["pt-BR"]);
    assert.deepEqual(readRuntimeSettings(path).spelling?.preloadLanguages, ["pt-BR"]);
    native.emit("spellcheck-dictionary-initialized", {}, "es");
    assert.equal((await spelling.snapshot()).dictionaries.states.es, "unloaded");
    assert.equal(isDesktopSpellingResult({ ok: true, value: await spelling.snapshot() }), true);
    spelling.unload("pt-BR");
    assert.equal(native.enabled, false);
    spelling.setArticleLanguage("es");
    assert.equal(native.enabled, true);
    assert.deepEqual(native.active, ["es"]);
    assert.throws(() => spelling.unload("es"));
    spelling.setArticleLanguage(null);
    assert.throws(() => spelling.unload("../../private"));
});

test("personal words preserve punctuation and case and report partial native failure", async (t) => {
    const root = mkdtempSync(join(tmpdir(), "warplyn-spelling-"));
    t.after(() => rmSync(root, { recursive: true, force: true }));
    const native = new TestSpellingSession();
    const spelling = new SpellingSession(native, join(root, "runtime.json"), "win32", ["en-US"]);
    t.after(() => spelling.dispose());
    const failed = await spelling.addWords([" gRPC ", "PostgreSQL", "gRPC", "café", "foo::bar", "failedterm", "bad\u0000word", "x".repeat(129)]);
    assert.deepEqual(failed, ["failedterm", "bad\u0000word", "x".repeat(129)]);
    const snapshot = await spelling.snapshot(failed);
    assert.deepEqual(snapshot.personal.words, ["PostgreSQL", "café", "foo::bar", "gRPC"]);
    assert.equal(snapshot.personal.affectsSystem, true);
    assert.equal(isDesktopSpellingResult({ ok: true, value: snapshot }), true);
    spelling.removeWord("gRPC");
    assert.equal(native.words.has("gRPC"), false);
    assert.throws(() => spelling.removeWord("absent"));
});

test("spelling IPC validation rejects paths, unsupported shapes, and oversized batches", () => {
    assert.equal(isDesktopSpellingRequest({ method: "prepare", languages: ["../../private"] }), false);
    assert.equal(isDesktopSpellingRequest({ method: "unload", language: "../../private" }), false);
    assert.equal(isDesktopSpellingRequest({ method: "unload", language: "es" }), true);
    assert.equal(isDesktopSpellingRequest({ method: "addWords", words: Array(501).fill("word") }), false);
    assert.equal(isDesktopSpellingRequest({ method: "addWords", words: [42] }), false);
    assert.equal(isDesktopSpellingRequest({ method: "removeWord", word: "bad\nword" }), false);
    assert.equal(isDesktopSpellingRequest({ method: "addWords", words: ["gRPC"] }), true);
    assert.equal(isPersonalSpellingWord("🙂".repeat(128)), true);
    assert.equal(isPersonalSpellingWord("🙂".repeat(129)), false);
    assert.equal(isDesktopSpellingResult({ ok: true, value: {} }), false);
    assert.equal(isDesktopSpellingResult({ ok: false, error: "private raw error" }), true);
});
