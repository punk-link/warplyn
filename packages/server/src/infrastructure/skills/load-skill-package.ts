import { lstatSync, readdirSync, readFileSync, realpathSync, statSync } from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";
import { failure } from "@skladno/shared";
import { parseSkillPackage } from "../../application/assistant/skills/skill-package-parser.js";
import type { SkillPackageParseResult } from "../../application/assistant/skills/skill-package-parse-result.js";
import type { SkillPackageIssue } from "../../application/assistant/skills/skill-package-issue.js";

const maximumPackageBytes = 96 * 1024;
const maximumReferenceBytes = 16 * 1024;


function issue(code: SkillPackageIssue["code"]): SkillPackageParseResult {
    return failure({ issues: [{ code, messageId: `skills.validation.${code}` }] });
}


function utf8Length(value: string): number {
    return Buffer.byteLength(value, "utf8");
}


function isInside(root: string, candidate: string): boolean {
    const path = relative(root, candidate);
    return path !== "" && !path.startsWith(`..${sep}`) && path !== "..";
}


function listFiles(root: string): string[] {
    const files: string[] = [];
    for (const entry of readdirSync(root, { withFileTypes: true })) {
        const path = resolve(root, entry.name);
        if (entry.isSymbolicLink())
            throw new Error("unsafe_package");

        if (entry.isDirectory()) {
            files.push(...listFiles(path));
            continue;
        }

        if (!entry.isFile())
            throw new Error("unsafe_package");

        files.push(path);
    }

    return files;
}


function readSkillFile(root: string, skillPath: string): string | SkillPackageParseResult {
    try {
        if (!lstatSync(root).isDirectory() || lstatSync(skillPath).isSymbolicLink() || !lstatSync(skillPath).isFile())
            return issue("unsafe_package");

        if (realpathSync(root) !== root || !isInside(root, realpathSync(skillPath)))
            return issue("unsafe_package");
    } catch {
        return issue("unsafe_package");
    }

    try {
        if (statSync(skillPath).size > maximumPackageBytes)
            return issue("package_too_large");

        const text = readFileSync(skillPath, "utf8");
        return utf8Length(text) > maximumPackageBytes ? issue("package_too_large") : text;
    } catch {
        return issue("unsafe_package");
    }
}


function readSkillReference(root: string, reference: string): string | SkillPackageParseResult {
    const path = resolve(root, reference);
    try {
        if (!isInside(root, path) || !lstatSync(path).isFile() || lstatSync(path).isSymbolicLink() || dirname(path) !== resolve(root, "references"))
            return issue("unsafe_package");

        if (statSync(path).size > maximumReferenceBytes)
            return issue("invalid_reference");

        return readFileSync(path, "utf8");
    } catch {
        return issue("invalid_reference");
    }
}


function readSkillReferences(root: string, skillPath: string, text: string, references: readonly string[]): string[] | SkillPackageParseResult {
    let packageFiles: string[];
    try {
        packageFiles = listFiles(root);
    } catch {
        return issue("unsafe_package");
    }

    const expected = new Set([skillPath, ...references.map((reference) => resolve(root, reference))]);
    if (packageFiles.some((path) => !expected.has(path)))
        return issue("unsafe_package");

    const loadedReferences: string[] = [];
    let totalBytes = utf8Length(text);
    for (const reference of references) {
        const content = readSkillReference(root, reference);
        if (typeof content !== "string")
            return content;

        totalBytes += Buffer.byteLength(content, "utf8");
        loadedReferences.push(content);
    }

    if (totalBytes > maximumPackageBytes)
        return issue("package_too_large");

    return loadedReferences;
}


export function loadSkillPackage(input: {
    root: string;
    source: string;
    reservedIds?: readonly string[];
    reservedNames?: readonly string[];
}): SkillPackageParseResult {
    const root = resolve(input.root);
    const skillPath = resolve(root, "SKILL.md");
    const text = readSkillFile(root, skillPath);
    if (typeof text !== "string")
        return text;

    return parseSkillPackage({
        text,
        source: input.source,
        reservedIds: input.reservedIds,
        reservedNames: input.reservedNames,
        readReferences: (references) => readSkillReferences(root, skillPath, text, references),
    });
}
