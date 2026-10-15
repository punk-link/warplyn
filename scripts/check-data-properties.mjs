import { execFileSync } from "node:child_process";
import { ESLint } from "eslint";
import { readFileSync } from "node:fs";
import { relative, resolve, sep } from "node:path";
import tseslint from "typescript-eslint";

import projectStyle from "../eslint-rules/project-style.mjs";


const root = process.cwd();
const allMode = process.argv.includes("--all");
const argumentsWithoutMode = process.argv.slice(2).filter((argument) => argument !== "--all");
const [baseArgument, headArgument] = argumentsWithoutMode;
const base = baseArgument ?? process.env.BASE_SHA;
const head = headArgument ?? process.env.HEAD_SHA;
const revision = base && head ? `${base}...${head}` : "HEAD";
const sourcePattern = "packages/*/src/**/*.{ts,tsx}";
const hunkPattern = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/u;
const lineBreakPattern = /\r?\n/u;
const typescriptPathPattern = /\.tsx?$/u;
const nullCharacter = String.fromCharCode(0);
const changedLines = allMode ? undefined : getChangedLines();


function runGit(args) {
    return execFileSync("git", args, { cwd: root, encoding: "utf8" });
}


function getChangedLines() {
    const diff = runGit(["diff", "--no-ext-diff", "--unified=0", revision, "--", "packages"]);
    const linesByPath = new Map();
    let path = "";
    let currentLine = 0;


    function addRange(start, count) {
        const lines = linesByPath.get(path) ?? new Set();
        const firstLine = Math.max(1, start);
        const lastLine = Math.max(firstLine, start + count - 1);
        for (let line = firstLine; line <= lastLine; line++)
            lines.add(line);

        linesByPath.set(path, lines);
    }


    for (const line of diff.split(lineBreakPattern)) {
        if (line.startsWith("+++ b/")) {
            path = line.slice(6).replaceAll("/", sep);
            continue;
        }

        const hunk = hunkPattern.exec(line);
        if (hunk) {
            currentLine = Number(hunk[1]);
            const count = Number(hunk[2] ?? 1);
            if (count === 0)
                addRange(currentLine, 0);

            continue;
        }

        if (line.startsWith("+") && !line.startsWith("+++")) {
            addRange(currentLine, 1);
            currentLine++;
            continue;
        }

        if (!line.startsWith("-"))
            currentLine++;
    }

    for (const untrackedPath of runGit(["ls-files", "--others", "--exclude-standard", "-z"]).split(nullCharacter).filter(Boolean)) {
        if (!untrackedPath.startsWith("packages/") || !typescriptPathPattern.test(untrackedPath))
            continue;

        const path = untrackedPath.replaceAll("/", sep);
        const lines = readFileSync(resolve(root, path), "utf8").split(lineBreakPattern).length;
        const changed = linesByPath.get(path) ?? new Set();
        for (let line = 1; line <= lines; line++)
            changed.add(line);

        linesByPath.set(path, changed);
    }

    return linesByPath;
}


function declarationWasChanged(path, message) {
    const changed = changedLines?.get(path);
    if (!changed)
        return false;

    const firstLine = message.line ?? 1;
    const lastLine = message.endLine ?? firstLine;
    for (let line = firstLine; line <= lastLine; line++) {
        if (changed.has(line))
            return true;
    }

    return false;
}


async function findChangedViolations() {
    const eslint = new ESLint({
        overrideConfig: [{
            files: [sourcePattern],
            languageOptions: {
                parser: tseslint.parser,
                parserOptions: {
                    projectService: true,
                    tsconfigRootDir: root,
                },
            },
            plugins: { "project-style": projectStyle },
            rules: { "project-style/max-data-properties": "error" },
        }],
    });
    const results = await eslint.lintFiles([sourcePattern]);
    const violations = [];

    for (const result of results) {
        const path = relative(root, result.filePath).replaceAll("/", sep);
        for (const message of result.messages) {
            if (message.ruleId !== "project-style/max-data-properties" || !allMode && !declarationWasChanged(path, message))
                continue;

            violations.push({ path, line: message.line, message: message.message });
        }
    }

    return violations;
}


const violations = await findChangedViolations();
if (violations.length > 0) {
    const scope = allMode ? "TypeScript data shapes" : "Changed TypeScript data shapes";
    console.error(`${scope} must have fewer than 10 properties; split coherent responsibilities.`);
    for (const violation of violations)
        console.error(`${violation.path}:${violation.line} ${violation.message}`);

    process.exitCode = 1;
} else {
    const scope = allMode ? "All" : "Changed";
    console.log(`${scope} TypeScript data shapes meet the 9-property limit.`);
}
