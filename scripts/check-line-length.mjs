import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { extname, join } from "node:path";
import { getSourceChangeComparison } from "./source-change-comparison.mjs";


const [base, head] = process.argv.slice(2);
const comparison = getSourceChangeComparison(base, head);
console.log(`Line-length comparison: ${comparison.description}`);
const lineLimit = 160;
const sourceExtensions = new Set([".cjs", ".js", ".mjs", ".ts", ".tsx"]);
const lineBreakPattern = /\r?\n/u;
const diffHunkPattern = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/u;
const nullCharacter = "\0";


function getChangedLines() {
    return execFileSync("git", ["diff", "--no-ext-diff", "--unified=0", comparison.revision, "--"], {
        encoding: "utf8",
    });
}


function findLongChangedLines(diff) {
    const violations = [];
    let path = "";
    let lineNumber = 0;

    for (const line of diff.split(lineBreakPattern)) {
        if (line.startsWith("+++ b/")) {
            path = line.slice(6);
            continue;
        }

        const hunk = diffHunkPattern.exec(line);
        if (hunk) {
            lineNumber = Number(hunk[1]);
            continue;
        }

        if (line.startsWith("+") && !line.startsWith("+++")) {
            const sourceLine = line.slice(1);
            addViolation(violations, path, lineNumber, sourceLine);

            lineNumber++;
            continue;
        }

        if (!line.startsWith("-"))
            lineNumber++;
    }

    return violations;
}


function addViolation(violations, path, lineNumber, sourceLine) {
    const length = Array.from(sourceLine).length;
    if (sourceExtensions.has(extname(path)) && length > lineLimit)
        violations.push({ path, lineNumber, length });
}


function findLongUntrackedLines() {
    const files = execFileSync("git", ["ls-files", "--others", "--exclude-standard", "-z"], {
        encoding: "utf8",
    }).split(nullCharacter).filter(Boolean);
    const violations = [];

    for (const path of files) {
        if (!sourceExtensions.has(extname(path)))
            continue;

        const lines = readFileSync(join(process.cwd(), path), "utf8").split(lineBreakPattern);
        lines.forEach((line, index) => addViolation(violations, path, index + 1, line));
    }

    return violations;
}


const violations = [...findLongChangedLines(getChangedLines()), ...findLongUntrackedLines()];
if (violations.length > 0) {
    console.error(`Changed source lines must be ${lineLimit} characters or fewer. Break JSX by tag or attribute, and chains at each method call.`);
    for (const violation of violations)
        console.error(`${violation.path}:${violation.lineNumber} (${violation.length} characters)`);

    process.exitCode = 1;
} else {
    console.log(`Changed source lines meet the ${lineLimit}-character limit.`);
}
