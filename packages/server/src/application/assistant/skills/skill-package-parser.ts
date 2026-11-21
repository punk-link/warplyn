import { failure } from "@skladno/shared";
import { parseDocument } from "yaml";

import { createSkillPackage } from "./create-skill-package.js";
import { normalizeSkillName } from "./normalize-skill-name.js";
import { parseSkillBehavior } from "./skill-package-metadata.js";
import type { SkillPackageIssue } from "./skill-package-issue.js";
import type { SkillPackageParseResult } from "./skill-package-parse-result.js";


const maximumInstructionsBytes = 64 * 1024;
const maximumReferenceCount = 8;
const skillId = /^[a-z][a-z0-9_-]{2,63}$/;
const supportedMetadata = new Set(["id", "name", "description", "version", "references", "execution", "scopes", "presentation"]);
const messageIds: Record<SkillPackageIssue["code"], SkillPackageIssue["messageId"]> = {
    invalid_frontmatter: "skills.validation.invalid_frontmatter",
    invalid_metadata: "skills.validation.invalid_metadata",
    invalid_instructions: "skills.validation.invalid_instructions",
    invalid_reference: "skills.validation.invalid_reference",
    unsafe_package: "skills.validation.unsafe_package",
    package_too_large: "skills.validation.package_too_large",
};


interface ParsedSkillMetadata {
    behavior: NonNullable<ReturnType<typeof parseSkillBehavior>>;
    id: string;
    name: string;
    description: string;
    version: string;
    instructions: string;
    references: string[];
}


function issue(code: SkillPackageIssue["code"]): SkillPackageParseResult {
    return failure({ issues: [{ code, messageId: messageIds[code] }] });
}


function utf8Length(value: string): number {
    return Buffer.byteLength(value, "utf8");
}


function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}


function splitFrontmatter(text: string): { frontmatter: string; instructions: string } | undefined {
    const lineBreakPattern = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]+)$/;
    const match = lineBreakPattern.exec(text);
    return match ? { frontmatter: match[1]!, instructions: match[2]!.trim() } : undefined;
}


function readMetadata(frontmatter: string): Record<string, unknown> | undefined {
    const document = parseDocument(frontmatter, { schema: "core", strict: true, uniqueKeys: true });
    if (document.errors.length > 0)
        return undefined;

    const value = document.toJSON();
    return isRecord(value) ? value : undefined;
}


function isSafeReferencePath(value: string): boolean {
    return value.startsWith("references/") &&
        value.endsWith(".md") &&
        !value.includes("\\") &&
        !value.split("/").some((part) => part === "" || part === "." || part === "..");
}


function readInstructions(text: string): { frontmatter: string; instructions: string } | SkillPackageParseResult {
    const parts = splitFrontmatter(text);
    if (!parts)
        return issue("invalid_frontmatter");

    if (utf8Length(parts.instructions) > maximumInstructionsBytes || !parts.instructions.trim())
        return issue("invalid_instructions");

    return parts;
}


function validateSkillIdentity(input: { reservedIds?: readonly string[]; reservedNames?: readonly string[] }, metadata: Record<string, unknown>): { id: string; name: string; description: string; version: string } | SkillPackageParseResult {
    const { id, name, description, version } = metadata;
    const versionText = typeof version === "string" || typeof version === "number" ? String(version) : undefined;
    const numberPattern = /^\d+(?:\.\d+){0,2}$/;
    if (typeof id !== "string" || !skillId.test(id) || typeof name !== "string" || !name.trim() || name.length > 80 ||
        typeof description !== "string" || !description.trim() || description.length > 280 || !versionText || !numberPattern.test(versionText))
        return issue("invalid_metadata");

    if ((input.reservedIds ?? []).includes(id) || (input.reservedNames ?? []).some((candidate) => normalizeSkillName(candidate) === normalizeSkillName(name)))
        return issue("invalid_metadata");

    return { id, name: name.trim(), description: description.trim(), version: versionText };
}


function validateSkillReferences(references: unknown): references is string[] {
    return Array.isArray(references) && references.length <= maximumReferenceCount &&
        references.every((reference) => typeof reference === "string" && isSafeReferencePath(reference));
}


function readSkillMetadata(frontmatter: string, instructions: string, input: { reservedIds?: readonly string[]; reservedNames?: readonly string[] }): ParsedSkillMetadata | SkillPackageParseResult {
    let metadata: Record<string, unknown> | undefined;
    try {
        metadata = readMetadata(frontmatter);
    } catch {
        return issue("invalid_frontmatter");
    }

    if (!metadata || Object.keys(metadata).some((key) => !supportedMetadata.has(key)))
        return issue("invalid_metadata");

    const identity = validateSkillIdentity(input, metadata);
    if ("ok" in identity)
        return identity;

    const references = metadata.references ?? [];
    if (!validateSkillReferences(references))
        return issue("invalid_reference");

    const behavior = parseSkillBehavior(metadata);
    return behavior ? { ...identity, instructions, references, behavior } : issue("invalid_metadata");
}


/** Parses skill content; the source owns safe reference loading. */
export function parseSkillPackage(input: {
    text: string;
    source: string;
    reservedIds?: readonly string[];
    reservedNames?: readonly string[];
    readReferences: (references: readonly string[]) => string[] | SkillPackageParseResult;
}): SkillPackageParseResult {
    const instructions = readInstructions(input.text);
    if ("ok" in instructions)
        return instructions;

    const metadata = readSkillMetadata(instructions.frontmatter, instructions.instructions, input);
    if ("ok" in metadata)
        return metadata;

    const loadedReferences = input.readReferences(metadata.references);
    if (!Array.isArray(loadedReferences))
        return loadedReferences;

    return {
        ok: true,
        skillPackage: createSkillPackage({
            reference: { source: input.source, id: metadata.id, version: metadata.version },
            name: metadata.name,
            description: metadata.description,
            ...metadata.behavior,
            instructions: metadata.instructions,
            references: loadedReferences
        })
    };
}
