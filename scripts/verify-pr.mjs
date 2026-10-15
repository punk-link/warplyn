import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { runVerificationCheck } from "./verification-checklist.mjs";
import { getSourceChangeComparison } from "./source-change-comparison.mjs";


function git(...args) {
    return execFileSync("git", args, { encoding: "utf8" }).trim();
}


function readPullRequest(number) {
    const args = ["pr", "view", ...number ? [number] : [], "--json", "url,baseRefOid,headRefName"];
    return JSON.parse(execFileSync("gh", args, { encoding: "utf8" }));
}


export function getPullRequestVerificationSteps(desktop, platform = process.platform, executable = process.env.WARPLYN_ELECTRON_EXECUTABLE) {
    const npmStep = (name) => ({ name, args: [process.env.npm_execpath, "run", name] });
    const steps = [npmStep("verify:core"), npmStep("verify:browser")];
    if (!desktop)
        return steps;

    if (platform === "win32")
        steps.push(npmStep("package:electron"));
    else if (!executable)
        throw new Error("Package and install the Linux app, then set WARPLYN_ELECTRON_EXECUTABLE before using --desktop.");

    steps.push(npmStep("verify:desktop"));
    return steps;
}


function verifyPullRequest() {
    if (!process.env.npm_execpath)
        throw new Error("Run this gate through npm run verify:pr.");

    const args = process.argv.slice(2);
    const desktop = args.includes("--desktop");
    const positional = args.filter((argument) => argument !== "--desktop");
    const numberPattern = /^\d+$/u;
    if (positional.length > 1 || positional.length === 1 && !numberPattern.test(positional[0]))
        throw new Error("Usage: npm run verify:pr -- [PR number] [--desktop]");

    const pr = readPullRequest(positional[0]);
    if (git("branch", "--show-current") !== pr.headRefName)
        throw new Error(`Check out PR branch ${pr.headRefName} before verifying ${pr.url}.`);

    try {
        git("cat-file", "-e", `${pr.baseRefOid}^{commit}`);
    } catch {
        git("fetch", "origin", pr.baseRefOid);
    }

    const env = { ...process.env, BASE_SHA: pr.baseRefOid, HEAD_SHA: "" };
    const comparison = getSourceChangeComparison(pr.baseRefOid, "");
    const head = git("rev-parse", "HEAD");
    const dirty = Boolean(git("status", "--porcelain"));
    console.log(`Verifying ${pr.url}\nCandidate HEAD: ${head}\nComparison: ${comparison.description}`);
    console.log(dirty
        ? "Working-tree verification includes uncommitted changes. Rerun after the final commit before pushing."
        : "Clean committed candidate. Push this commit after verification; rerun if it changes.");

    for (const step of getPullRequestVerificationSteps(desktop)) {
        if (!runVerificationCheck(step, env))
            return false;
    }

    console.log(`\nPR verification passed for ${dirty ? "the working tree based on" : "committed candidate"} ${head}.`);
    return true;
}


function runPullRequestVerification() {
    try {
        process.exitCode = verifyPullRequest() ? 0 : 1;
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    }
}


if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url)
    runPullRequestVerification();
