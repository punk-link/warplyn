import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { classifiedReleaseVersion, validateReleaseRecord } from "./release-notes-record.mjs";
import { assertReleaseWorktree, reviewReleaseNotes } from "./release-notes-review.mjs";
import { previewComparison } from "./release-notes.mjs";
import { runReleaseStep } from "./release-progress.mjs";


const STABLE_VERSION = /^(\d+)\.(\d+)\.(\d+)$/;
const PREVIEW_VERSION = /^(\d+)\.(\d+)\.(\d+)-preview\.(\d+)(?:\.security)?$/;


export function nextReleaseVersion(currentVersion, preview, requestedVersion, existingVersions = []) {
    const current = currentVersion.match(PREVIEW_VERSION) ?? currentVersion.match(STABLE_VERSION);
    assert(current, `Current version ${currentVersion} is not a supported SemVer.`);

    if (!preview) {
        if (requestedVersion) {
            assert.match(requestedVersion, STABLE_VERSION, "Expected an x.y.z version.");
            return requestedVersion;
        }

        return current[4] === undefined
            ? `${current[1]}.${current[2]}.${Number(current[3]) + 1}`
            : `${current[1]}.${current[2]}.${current[3]}`;
    }

    const baseVersion = requestedVersion ?? (current[4] === undefined
        ? `${current[1]}.${current[2]}.${Number(current[3]) + 1}`
        : `${current[1]}.${current[2]}.${current[3]}`);
    assert.match(baseVersion, STABLE_VERSION, "Expected an x.y.z version.");
    const previewNumbers = existingVersions
        .map((version) => version.match(PREVIEW_VERSION))
        .filter((match) => match && `${match[1]}.${match[2]}.${match[3]}` === baseVersion)
        .map((match) => Number(match[4]));

    if (currentVersion.startsWith(`${baseVersion}-preview.`))
        previewNumbers.push(Number(current[4]));

    return `${baseVersion}-preview.${Math.max(0, ...previewNumbers) + 1}`;
}


function run(command, args, options = {}) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, { stdio: "inherit", ...options });
        let output = "";
        let errors = "";
        child.stdout?.setEncoding("utf8").on("data", (chunk) => {
            output += chunk;
        });
        child.stderr?.setEncoding("utf8").on("data", (chunk) => {
            errors += chunk;
        });
        child.on("error", reject);
        child.on("close", (code, signal) => {
            if (code === 0)
                resolve(output);
            else
                reject(new Error(`${command} failed (${signal ?? code}). ${errors.trim()}`));
        });
    });
}


export function runNpm(args, options = {}) {
    return run("npm", args, { shell: process.platform === "win32", ...options });
}


export async function release(args = process.argv.slice(2), { cwd = process.cwd(), runCommand = run, npm = runNpm,
    reviewNotes = reviewReleaseNotes, compareNotes = previewComparison } = {}) {
    const { positionals, values } = parseArgs({ args, allowPositionals: true,
        options: { "previous-tag": { type: "string" }, compare: { type: "string" }, manual: { type: "boolean" } } });
    const [mode, requestedVersion] = positionals;
    assert(positionals.length <= 2 && ["stable", "preview"].includes(mode),
        "Use npm run release or npm run release:preview with an optional base version.");
    assert(!values.compare || (!values.manual && !values["previous-tag"]), "Comparison mode cannot use --manual or --previous-tag.");
    const execute = (command, commandArgs, options = {}) => runCommand(command, commandArgs, { cwd, ...options });
    await runReleaseStep("Fetching release tags", () => execute("git", ["fetch", "origin", "--tags", "--quiet"]));

    const { version: currentVersion } = JSON.parse(readFileSync(join(cwd, "package.json"), "utf8"));
    const lineBreakPattern = /\r?\n/;
    const tags = (await execute("git", ["tag", "--list", "v*"], { stdio: "pipe" }))
        .trim()
        .split(lineBreakPattern)
        .filter(Boolean)
        .map((tag) => tag.slice(1));
    const draftVersion = nextReleaseVersion(currentVersion, mode === "preview", requestedVersion, tags);
    if (values.compare) {
        await runReleaseStep("Generating release comparison", () => compareNotes(draftVersion, values.compare, cwd));
        return;
    }

    const record = await reviewNotes({ version: draftVersion, previousTag: values["previous-tag"], manual: values.manual, cwd });
    const version = classifiedReleaseVersion(record);
    const tag = `v${version}`;
    assert.equal(record.version, draftVersion, "Release notes version does not match the intended release.");
    validateReleaseRecord(record, version, "HEAD", cwd);
    const source = (await execute("git", ["rev-parse", "HEAD"], { stdio: "pipe" })).trim();
    await runReleaseStep("Running core verification", () => npm(["run", "verify:core"], { cwd }));
    await runReleaseStep("Running browser verification", () => npm(["run", "verify:browser"], { cwd }));
    assert.equal((await execute("git", ["rev-parse", "HEAD"], { stdio: "pipe" })).trim(), source,
        "Source changed during verification. Rerun release.");
    assertReleaseWorktree(draftVersion, cwd);
    const notesPath = `release-notes/${draftVersion}.json`;
    assert.deepEqual(JSON.parse(readFileSync(join(cwd, notesPath), "utf8")), record, "Notes changed during verification. Review them again.");

    await npm(["pkg", "set", `version=${version}`], { cwd });
    await npm(["pkg", "set", `version=${version}`, "--workspace", "@skladno/electron"], { cwd });
    await runReleaseStep("Updating the package lockfile", () => npm(["install", "--package-lock-only", "--ignore-scripts"], { cwd }));
    await execute("node", ["scripts/check-electron-release-tag.mjs", tag]);
    await execute("git", ["add", notesPath, "package.json", "package-lock.json", "packages/electron/package.json"]);
    await runReleaseStep("Committing reviewed release", () => execute("git", ["commit", "-m", `Release ${tag}`]));
    await execute("git", ["tag", tag]);
    await runReleaseStep("Pushing the release commit and tag", () => execute("git", ["push", "--atomic", "origin", "HEAD", tag]));
}


if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url)
    release().catch((error) => {
        console.error(error.message);
        process.exitCode = 1;
    });
