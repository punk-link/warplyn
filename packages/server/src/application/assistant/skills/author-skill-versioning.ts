import type { AuthorSkillSource } from "./author-skill-source.js";
import type { AuthorSkillRevisionStore } from "./author-skill-revision-store.js";


export function withNextSkillVersion(
    source: AuthorSkillSource, skillId: string, files: Readonly<Record<string, string>>,
): Readonly<Record<string, string>> {
    const current = source.get(skillId);
    if (!current)
        throw new Error("skill_package_conflict");

    return withVersionAfter(current.reference.version, files);
}


export function withSkillVersionAfterHistory(
    revisions: AuthorSkillRevisionStore, skillId: string, files: Readonly<Record<string, string>>,
): Readonly<Record<string, string>> {
    const latest = revisions.list(skillId).at(-1);
    const markdown = latest && revisions.readFiles({ skillId, revisionId: latest.id })?.["SKILL.md"];
    const versionPattern = /^version:\s*["']?(\d+(?:\.\d+){0,2})["']?\s*$/m;
    const version = markdown && versionPattern.exec(markdown)?.[1];
    if (!version)
        throw new Error("invalid_skill_revision");

    return withVersionAfter(version, files);
}


function withVersionAfter(version: string, files: Readonly<Record<string, string>>): Readonly<Record<string, string>> {
    const parts = version.split(".");
    const last = parts.at(-1);
    if (!last)
        throw new Error("invalid_skill_package");

    parts[parts.length - 1] = String(Number(last) + 1);
    const markdown = files["SKILL.md"];
    if (!markdown)
        throw new Error("invalid_skill_package");

    const versionPattern = /^(version:\s*)(?:"[^"]+"|'[^']+'|\d+(?:\.\d+){0,2})\s*$/m;
    return { ...files, "SKILL.md": markdown.replace(versionPattern, `$1${parts.join(".")}`) };
}
