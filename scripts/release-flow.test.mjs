import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { release } from "./release.mjs";
import { reviewReleaseNotes } from "./release-notes-review.mjs";
import { git, resolveCommit } from "./release-notes-range.mjs";
import { readTaggedNotes, validateReleaseRecord } from "./release-notes-record.mjs";


function repository(t) {
    const cwd = mkdtempSync(join(tmpdir(), "warplyn-release-flow-"));
    t.after(() => rmSync(cwd, { recursive: true, force: true }));
    git(["init", "--initial-branch=main"], cwd);
    git(["config", "user.name", "Release test"], cwd);
    git(["config", "user.email", "release@example.test"], cwd);
    git(["config", "commit.gpgsign", "false"], cwd);
    mkdirSync(join(cwd, "packages/electron"), { recursive: true });
    mkdirSync(join(cwd, "scripts"));
    for (const path of ["package.json", "packages/electron/package.json", "package-lock.json"])
        writeFileSync(join(cwd, path), JSON.stringify({ version: "0.5.5" }));

    writeFileSync(join(cwd, "scripts/check-electron-release-tag.mjs"),
        readFileSync(new URL("./check-electron-release-tag.mjs", import.meta.url), "utf8"));
    git(["add", "."], cwd);
    git(["commit", "-m", "Baseline"], cwd);
    git(["tag", "v0.5.5"], cwd);
    writeFileSync(join(cwd, "feature.txt"), "Article import fix");
    git(["add", "."], cwd);
    git(["commit", "-m", "Fix Article import"], cwd);
    return cwd;
}


function generation(cwd, security = false) {
    const commit = resolveCommit("HEAD", cwd);
    return { maintenanceOnly: false, entries: [{ text: "Fix an Article import vulnerability.", commits: [commit] }],
        security, securityReason: security ? "Fixes an Article import vulnerability." : "", securityCommits: security ? [commit] : [] };
}


function releaseProcesses(cwd, events) {
    return {
        runCommand(command, args, options) {
            if (command === "git" && ["fetch", "push"].includes(args[0])) {
                events.push(args.join(" "));
                return "";
            }

            return execFileSync(command, args, { ...options, encoding: "utf8", stdio: "pipe" });
        },
        npm(args) {
            events.push(args.join(" "));
            if (args[0] === "pkg") {
                const path = args.includes("--workspace") ? "packages/electron/package.json" : "package.json";
                writeFileSync(join(cwd, path), JSON.stringify({ version: args[2].slice("version=".length) }));
            } else if (args[0] === "install") {
                writeFileSync(join(cwd, "package-lock.json"), readFileSync(join(cwd, "package.json")));
            }
        },
    };
}


test("both release commands generate, review, verify, and commit notes before tagging and pushing", async (t) => {
    for (const [mode, security] of [["stable", false], ["stable", true], ["preview", true]]) {
        const cwd = repository(t);
        const events = [];
        const expected = mode === "preview" ? "0.5.6-preview.1.security" : "0.5.6";
        const messages = [];
        await release([mode, "--previous-tag", "v0.5.5"], { cwd, ...releaseProcesses(cwd, events),
            reviewNotes: (options) => reviewReleaseNotes(options, { releases: () => [], print: (message) => messages.push(message),
                reviewTests: async () => events.push("review tests"),
                generate: async () => {
                    events.push("generate");
                    return generation(cwd, security);
                },
                approve: async () => {
                    assert.equal(messages.some((message) => message.includes("Security update warning:")), security && mode === "stable");
                    events.push("approve");
                    return true;
                } }) });
        assert.deepEqual(events.slice(1, 6), ["generate", "review tests", "approve", "run verify:core", "run verify:browser"]);
        assert.equal(events.at(-1), `push --atomic origin HEAD:refs/heads/main refs/tags/v${expected}`);
        const record = readTaggedNotes(expected, `v${expected}`, cwd);
        assert.equal(record.reviewed, true);
        assert.equal(record.security, security);
        const heading = security && mode === "stable" ? "## Security release\n\n" : "";
        assert.equal(validateReleaseRecord(record, expected, `v${expected}`, cwd), `${heading}- Fix an Article import vulnerability.`);
        assert.equal(git(["status", "--porcelain"], cwd), "");
    }
});


test("an existing release tag stops before review or package changes", async (t) => {
    const cwd = repository(t);
    git(["tag", "v0.5.6"], cwd);
    const source = resolveCommit("HEAD", cwd);
    const events = [];
    const existingTagPattern = /Release tag v0\.5\.6 already exists/;
    await assert.rejects(() => release(["stable"], { cwd, ...releaseProcesses(cwd, events),
        reviewNotes: () => assert.fail("Existing tags must stop before review") }), existingTagPattern);
    assert.equal(resolveCommit("HEAD", cwd), source);
    assert.equal(resolveCommit("v0.5.6", cwd), source);
    assert.equal(git(["status", "--porcelain"], cwd), "");
    assert.deepEqual(events, ["fetch origin --tags --quiet"]);
});


test("detached releases stop before review, version changes, or tagging", async (t) => {
    const cwd = repository(t);
    git(["checkout", "--detach"], cwd);
    const events = [];
    const detachedPattern = /checked-out branch/;
    await assert.rejects(() => release(["stable"], { cwd, ...releaseProcesses(cwd, events),
        reviewNotes: () => assert.fail("Detached releases must not review notes") }), detachedPattern);
    assert.deepEqual(events, ["fetch origin --tags --quiet"]);
    assert.equal(git(["tag", "--list"], cwd), "v0.5.5");
    assert.equal(git(["status", "--porcelain"], cwd), "");
});


test("declining retains an unreviewed draft and rerunning reuses it without another API call", async (t) => {
    const cwd = repository(t);
    const events = [];
    let generations = 0;
    const run = (approved) => release(["stable", "--previous-tag", "v0.5.5"], { cwd, ...releaseProcesses(cwd, events),
        reviewNotes: (options) => reviewReleaseNotes(options, { releases: () => [], print: () => undefined,
            generate: async () => {
                generations += 1;
                return generation(cwd);
            }, approve: async () => approved }) });
    const cancelledPattern = /Release cancelled/;
    await assert.rejects(() => run(false), cancelledPattern);
    assert.equal(JSON.parse(readFileSync(join(cwd, "release-notes/0.5.6.json"))).reviewed, false);
    assert.equal(events.length, 1);
    assert.equal(JSON.parse(readFileSync(join(cwd, "package.json"))).version, "0.5.5");
    await run(true);
    assert.equal(generations, 1);
    assert(events.at(-1).startsWith("push --atomic"));
});


test("generation and verification failures cannot version, tag, or push a release", async (t) => {
    for (const stage of ["generation", "verification"]) {
        const cwd = repository(t);
        const events = [];
        const processes = releaseProcesses(cwd, events);
        const failedPattern = /Failed/;
        await assert.rejects(() => release(["stable", "--previous-tag", "v0.5.5"], { cwd, ...processes,
            npm: () => {
                throw new Error("Failed verification");
            },
            reviewNotes: (options) => reviewReleaseNotes(options, { releases: () => [], print: () => undefined, approve: async () => true,
                generate: async () => {
                    if (stage === "generation")
                        throw new Error("Failed generation");

                    return generation(cwd);
                } }) }), failedPattern);
        assert.equal(JSON.parse(readFileSync(join(cwd, "package.json"))).version, "0.5.5");
        assert.equal(git(["tag", "--list", "v0.5.6"], cwd), "");
        assert(!events.some((event) => event.startsWith("push")));
        assert.equal(existsSync(join(cwd, "release-notes/0.5.6.json")), stage === "verification");
    }
});


test("invalid drafts can be corrected and reloaded in the same console review without regeneration", async (t) => {
    for (const invalid of ["{", JSON.stringify({ version: "0.5.6", security: true })]) {
        const cwd = repository(t);
        const path = join(cwd, "release-notes/0.5.6.json");
        const options = { cwd, version: "0.5.6", previousTag: "v0.5.5" };
        await assert.rejects(() => reviewReleaseNotes(options, { releases: () => [], print: () => undefined,
            reviewTests: async () => undefined, generate: async () => generation(cwd), approve: async () => false }));
        const valid = JSON.parse(readFileSync(path));
        writeFileSync(path, invalid);
        const prompts = [];
        const printed = [];
        const record = await reviewReleaseNotes(options, { print: (message) => printed.push(message),
            reviewTests: async () => undefined, generate: () => assert.fail("Must reuse the saved draft"),
            approve: async (question) => {
                prompts.push(question);
                if (prompts.length === 1)
                    writeFileSync(path, JSON.stringify(valid));

                return true;
            } });
        assert.equal(prompts.length, 2);
        assert(printed[0].includes("need correction"));
        assert.equal(record.reviewed, true);
        assert.equal(JSON.parse(readFileSync(join(cwd, "package.json"))).version, "0.5.5");
    }
});


test("console edit reloads the draft and requires fresh approval of its security classification", async (t) => {
    const cwd = repository(t);
    const path = join(cwd, "release-notes/0.5.6.json");
    const printed = [];
    const answers = ["edit", true, true];
    const record = await reviewReleaseNotes({ cwd, version: "0.5.6", previousTag: "v0.5.5" }, {
        releases: () => [], print: (message) => printed.push(message), reviewTests: async () => undefined,
        generate: async () => generation(cwd), approve: async () => {
            const answer = answers.shift();
            if (answers.length === 1) {
                const draft = JSON.parse(readFileSync(path));
                writeFileSync(path, JSON.stringify({ ...draft, ...generation(cwd, true) }));
            }

            return answer;
        } });
    assert.equal(answers.length, 0);
    assert.equal(record.security, true);
    assert.equal(record.reviewed, true);
    assert(printed.some((message) => message.includes("## Security release")));
});


test("comparison is available through both release commands without approval or publication", async (t) => {
    const cwd = repository(t);
    for (const mode of ["stable", "preview"]) {
        const events = [];
        await release([mode, "--compare", "v0.5.5"], { cwd, ...releaseProcesses(cwd, events),
            reviewNotes: () => assert.fail("Comparison cannot prepare a publishable release"),
            compareNotes: async (version, tag) => {
                events.push(`compare ${version} ${tag}`);
            } });
        assert.equal(events.length, 2);
        assert.equal(events[1], `compare ${mode === "stable" ? "0.5.6" : "0.5.6-preview.1"} v0.5.5`);
    }

    const scripts = JSON.parse(readFileSync(new URL("../package.json", import.meta.url))).scripts;
    assert.deepEqual(Object.keys(scripts).filter((name) => name.startsWith("release")), ["release", "release:preview"]);
});


test("edits during approval require fresh review and source changes still stop the run", async (t) => {
    for (const change of ["draft", "source"]) {
        const cwd = repository(t);
        const path = join(cwd, "release-notes/0.5.6.json");
        let approvals = 0;
        const reviewing = reviewReleaseNotes({ cwd, version: "0.5.6", previousTag: "v0.5.5" }, {
            releases: () => [], print: () => undefined, reviewTests: async () => undefined,
            generate: async () => generation(cwd), approve: async () => {
                approvals += 1;
                if (approvals === 1 && change === "draft") {
                    const draft = JSON.parse(readFileSync(path));
                    writeFileSync(path, JSON.stringify({ ...draft, ...generation(cwd, true) }));
                }

                if (change === "source") {
                    writeFileSync(join(cwd, "feature.txt"), "Changed source");
                    git(["add", "feature.txt"], cwd);
                    git(["commit", "-m", "Change source during review"], cwd);
                }

                return true;
            } });
        if (change === "draft") {
            assert.equal((await reviewing).security, true);
            assert.equal(approvals, 2);
        } else {
            const changedSourcePattern = /source changed/;
            await assert.rejects(reviewing, changedSourcePattern);
            assert.equal(JSON.parse(readFileSync(path)).reviewed, false);
        }
    }
});


test("unrelated changes block generation and edits during verification block versioning", async (t) => {
    for (const stage of ["before", "during", "notes"]) {
        const cwd = repository(t);
        const events = [];
        const processes = releaseProcesses(cwd, events);
        if (stage === "before")
            writeFileSync(join(cwd, "unrelated.txt"), "Keep this work");

        let generations = 0;
        await assert.rejects(() => release(["stable", "--previous-tag", "v0.5.5"], { cwd, ...processes,
            npm: (args) => {
                assert.equal(args[0], "run");
                if (stage === "during")
                    writeFileSync(join(cwd, "feature.txt"), "Changed while verifying");
                else
                    writeFileSync(join(cwd, "release-notes/0.5.6.json"), "{}");
            },
            reviewNotes: (options) => reviewReleaseNotes(options, { releases: () => [], print: () => undefined, approve: async () => true,
                generate: async () => {
                    generations += 1;
                    return generation(cwd);
                } }) }));
        assert.equal(generations, stage === "before" ? 0 : 1);
        assert.equal(JSON.parse(readFileSync(join(cwd, "package.json"))).version, "0.5.5");
        assert.equal(git(["tag", "--list", "v0.5.6"], cwd), "");
        assert(!events.some((event) => event.startsWith("push")));
    }
});


test("manual drafts and noninteractive review stop before granting approval", async (t) => {
    const cwd = repository(t);
    const options = { cwd, version: "0.5.6", previousTag: "v0.5.5", manual: true };
    const dependencies = { releases: () => [], print: () => undefined, generate: () => assert.fail("Manual mode must not generate") };
    const cancelledPattern = /Release cancelled/;
    await assert.rejects(() => reviewReleaseNotes(options, { ...dependencies, approve: async () => false }), cancelledPattern);
    const path = join(cwd, "release-notes/0.5.6.json");
    const record = { ...JSON.parse(readFileSync(path)), ...generation(cwd) };
    writeFileSync(path, JSON.stringify(record));
    if (!process.stdin.isTTY || !process.stdout.isTTY) {
        const interactivePattern = /interactive terminal/;
        await assert.rejects(() => reviewReleaseNotes(options, dependencies), interactivePattern);
        assert.equal(JSON.parse(readFileSync(path)).reviewed, false);
    }

    writeFileSync(path, JSON.stringify({ ...record, reviewed: true }));
    const reviewed = await reviewReleaseNotes(options, { ...dependencies, approve: () => assert.fail("Already reviewed") });
    assert.equal(reviewed.reviewed, true);
});
