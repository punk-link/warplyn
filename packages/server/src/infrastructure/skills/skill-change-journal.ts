import { createHash, randomUUID } from "node:crypto";
import { existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AuthorSkillChangeJournal, PendingSkillChange } from "../../application/assistant/skills/author-skill-change-journal.js";
import type { AuthorSkillJournalEntry } from "../../application/assistant/skills/author-skill-journal-entry.js";
import { parseSkillPackage } from "../../application/assistant/skills/skill-package-parser.js";


const maximumJournalBytes = 2 * 1024 * 1024;


function parsePending(value: unknown): PendingSkillChange {
    if (typeof value !== "object" || value === null || Array.isArray(value))
        throw new Error("invalid_skill_journal");

    const change = value as Record<string, unknown>;
    const lowercaseIdentifierPattern = /^[a-z][a-z0-9_-]{2,63}$/;
    if (typeof change.requestId !== "string" || !change.requestId || typeof change.skillId !== "string" || !lowercaseIdentifierPattern.test(change.skillId))
        throw new Error("invalid_skill_journal");

    if (change.previousFiles === undefined && change.nextFiles === undefined)
        throw new Error("invalid_skill_journal");

    validatePendingFiles(change.previousFiles, change.skillId);
    validatePendingFiles(change.nextFiles, change.skillId);

    return {
        requestId: change.requestId,
        skillId: change.skillId,
        ...(change.previousFiles ? { previousFiles: change.previousFiles as Record<string, string> } : {}),
        ...(change.nextFiles ? { nextFiles: change.nextFiles as Record<string, string> } : {}),
    };
}


function validatePendingFiles(files: unknown, skillId: string): void {
    if (files === undefined)
        return;

    const markdownExtensionPattern = /^references\/[A-Za-z0-9_-]+\.md$/;
    if (typeof files !== "object" || files === null || Array.isArray(files) ||
        !("SKILL.md" in files) || typeof files["SKILL.md"] !== "string" ||
        Object.entries(files).some(([path, content]) => (path !== "SKILL.md" && !markdownExtensionPattern.test(path)) || typeof content !== "string"))
        throw new Error("invalid_skill_journal");

    const snapshot = files as Record<string, string>;
    const result = parseSkillPackage({
        text: snapshot["SKILL.md"]!, source: "author",
        readReferences: (references) => {
            const expected = new Set(["SKILL.md", ...references]);
            const valid = Object.keys(snapshot).every((path) => expected.has(path)) &&
                references.every((path) => typeof snapshot[path] === "string" && Buffer.byteLength(snapshot[path]!, "utf8") <= 16 * 1024);
            const contents = references.map((path) => snapshot[path]!);
            const total = [snapshot["SKILL.md"]!, ...contents].reduce((sum, content) => sum + Buffer.byteLength(content ?? "", "utf8"), 0);
            if (!valid || total > 96 * 1024)
                return { ok: false, issues: [{ code: "unsafe_package", messageId: "skills.validation.unsafe_package" }] };

            return contents;
        },
    });
    if (!result.ok || result.skillPackage.reference.id !== skillId)
        throw new Error("invalid_skill_journal");
}


export class SkillChangeJournal implements AuthorSkillChangeJournal {
    private readonly root: string;


    constructor(dataRoot: string) {
        this.root = join(dataRoot, "skill-staging");
    }


    begin(change: PendingSkillChange): void {
        mkdirSync(this.root, { recursive: true });
        const path = this.path(change.requestId);
        if (existsSync(path))
            throw new Error("skill_package_conflict");

        const staged = `${path}.${randomUUID()}.staged`;
        const content = JSON.stringify(change);
        if (Buffer.byteLength(content, "utf8") > maximumJournalBytes)
            throw new Error("invalid_skill_journal");

        writeFileSync(staged, content, { encoding: "utf8", mode: 0o600, flag: "wx" });
        renameSync(staged, path);
    }


    list(): readonly AuthorSkillJournalEntry[] {
        let names: string[];
        try {
            names = readdirSync(this.root);
        } catch (error) {
            if (error instanceof Error && "code" in error && error.code === "ENOENT")
                return [];

            throw error;
        }

        return names
            .filter((name) => name.endsWith(".json"))
            .map((name) => this.readEntry(name));
    }


    private readEntry(name: string): AuthorSkillJournalEntry {
        try {
            const path = join(this.root, name);
            const stat = lstatSync(path);
            if (!stat.isFile() || stat.isSymbolicLink() || stat.size > maximumJournalBytes)
                return { kind: "unreadable" };

            const content = readFileSync(path, "utf8");
            if (Buffer.byteLength(content, "utf8") > maximumJournalBytes)
                return { kind: "unreadable" };

            const change = parsePending(JSON.parse(content));
            return this.path(change.requestId) === path ? { kind: "pending", change } : { kind: "unreadable" };
        } catch {
            return { kind: "unreadable" };
        }
    }


    remove(requestId: string): void {
        rmSync(this.path(requestId), { force: true });
    }


    private path(requestId: string): string {
        const name = createHash("sha256").update(requestId).digest("hex");
        return join(this.root, `${name}.json`);
    }
}
