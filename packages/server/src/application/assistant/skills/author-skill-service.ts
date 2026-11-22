import type { AssistantSkillReference, AssistantSkillRecoveryStatus } from "@skladno/shared";
import type { AssistantSkillSource } from "./assistant-skill-source.js";
import { AuthorSkillRecoveryManager } from "./author-skill-recovery-manager.js";
import { withNextSkillVersion, withSkillVersionAfterHistory } from "./author-skill-versioning.js";
import type { AssistantSkillPackage } from "./assistant-skill-package.js";
import type { AuthorSkillRevisionStore } from "./author-skill-revision-store.js";
import type { AuthorSkillRevision } from "./author-skill-revision.js";
import type { AuthorSkillChange } from "./author-skill-change.js";
import type { CommittedAuthorSkillChange } from "./committed-author-skill-change.js";
import type { AuthorSkillChangeJournal } from "./author-skill-change-journal.js";
import type { AuthorSkillSource } from "./author-skill-source.js";
import { success } from "../../errors/application-result.js";
import { skillWriteFailure, unwrapSkillWrite, type SkillWriteResult } from "./skill-write-result.js";


export class AuthorSkillService implements AssistantSkillSource {
    private readonly recovery: AuthorSkillRecoveryManager;


    constructor(
        private readonly source: AuthorSkillSource,
        private readonly revisions: AuthorSkillRevisionStore,
        private readonly journal?: AuthorSkillChangeJournal,
    ) {
        this.recovery = new AuthorSkillRecoveryManager(source, revisions, journal);
    }


    get id(): string {
        return this.source.id;
    }


    summaries() {
        const status = this.recovery.status();
        if (status.kind === "blocked" && status.allAuthorSkills)
            return [];

        return this.source.summaries().filter((skill) => this.recovery.available(skill.reference.id));
    }


    load(reference: AssistantSkillReference): AssistantSkillPackage | undefined {
        return this.recovery.available(reference.id) ? this.source.load(reference) : undefined;
    }


    recoveryStatus(): AssistantSkillRecoveryStatus {
        return this.recovery.status();
    }


    retryRecovery(isCompleted: (requestId: string) => boolean): AssistantSkillRecoveryStatus {
        return this.recovery.recover(isCompleted, true);
    }


    validateCreate(input: { skillId: string; files: Readonly<Record<string, string>> }): void {
        this.recovery.requireAvailable(input.skillId);
        unwrapSkillWrite(this.source.validateInstallResult({ directory: input.skillId, files: input.files }));
    }


    readCurrent(skillId: string): { contentHash: string; files: Readonly<Record<string, string>> } | undefined {
        if (!this.recovery.available(skillId))
            return undefined;

        const skillPackage = this.source.get(skillId);
        const files = this.source.readFiles(skillId);
        return skillPackage?.contentHash && files ? { contentHash: skillPackage.contentHash, files } : undefined;
    }


    readRevision(skillId: string, revisionId: string): Readonly<Record<string, string>> | undefined {
        return this.revisions.readFiles({ skillId, revisionId });
    }


    validateChange(change: AuthorSkillChange): void {
        unwrapSkillWrite(this.validateChangeResult(change));
    }


    validateChangeResult(change: AuthorSkillChange): SkillWriteResult<void> {
        if (!this.recovery.available(change.skillId))
            return skillWriteFailure("skill_recovery_required");

        if (change.kind === "create")
            return this.source.validateInstallResult({ directory: change.skillId, files: { "SKILL.md": change.skillMarkdown } });

        const current = this.readCurrent(change.skillId);
        if (current ? current.contentHash !== change.expectedHash : change.kind !== "restore" || change.expectedHash !== "")
            return skillWriteFailure("skill_package_conflict");

        if (change.kind === "delete")
            return success(undefined);

        if (change.kind === "update") {
            if (!current)
                return skillWriteFailure("skill_package_conflict");

            return this.source.validateReplaceResult({ directory: change.skillId, expectedHash: change.expectedHash,
                files: withNextSkillVersion(this.source, change.skillId, { ...current.files, "SKILL.md": change.skillMarkdown }) });
        }

        return this.validateRestore(change, current);
    }


    private validateRestore(
        change: Extract<AuthorSkillChange, { kind: "restore" }>, current: ReturnType<AuthorSkillService["readCurrent"]>,
    ): SkillWriteResult<void> {
        const files = this.readRevision(change.skillId, change.revisionId);
        if (!files)
            return skillWriteFailure("skill_revision_not_found");

        const replacement = current
            ? withNextSkillVersion(this.source, change.skillId, files)
            : withSkillVersionAfterHistory(this.revisions, change.skillId, files);
        if (current)
            return this.source.validateReplaceResult({ directory: change.skillId, expectedHash: change.expectedHash, files: replacement });
        else
            return this.source.validateInstallResult({ directory: change.skillId, files: replacement });
    }


    commitChange(change: AuthorSkillChange, requestId: string): CommittedAuthorSkillChange {
        unwrapSkillWrite(this.validateChangeResult(change));
        const previousFiles = this.readCurrent(change.skillId)?.files;
        const nextFiles = this.filesForChange(change, previousFiles);
        const pending = { requestId, skillId: change.skillId, ...(previousFiles ? { previousFiles } : {}), ...(nextFiles ? { nextFiles } : {}) };
        this.journal?.begin(pending);
        try {
            return this.commitValidatedChange(change, requestId);
        } catch (error) {
            if (this.journal)
                this.recovery.recoverRequest(pending);

            throw error;
        }
    }


    private commitValidatedChange(change: AuthorSkillChange, requestId: string): CommittedAuthorSkillChange {
        if (change.kind === "create")
            return { kind: "create", revision: this.create({ skillId: change.skillId, files: { "SKILL.md": change.skillMarkdown }, requestId }) };

        const previousFiles = this.readCurrent(change.skillId)?.files;
        if (change.kind === "delete") {
            if (!previousFiles)
                throw new Error("skill_package_conflict");

            this.delete(change);
            return { kind: "delete", skillId: change.skillId, previousFiles };
        }

        let revision: AuthorSkillRevision;
        if (change.kind === "update") {
            if (!previousFiles)
                throw new Error("skill_package_conflict");

            revision = this.update({ skillId: change.skillId, files: { ...previousFiles, "SKILL.md": change.skillMarkdown }, expectedHash: change.expectedHash, requestId });
        } else {
            revision = this.restore({ skillId: change.skillId, revisionId: change.revisionId, expectedHash: change.expectedHash, requestId });
        }

        return { kind: change.kind, revision, ...(previousFiles ? { previousFiles } : {}) };
    }


    finishChange(requestId: string): void {
        this.journal?.remove(requestId);
    }


    recoverIncompleteChanges(isCompleted: (requestId: string) => boolean): AssistantSkillRecoveryStatus {
        return this.recovery.recover(isCompleted);
    }


    private filesForChange(change: AuthorSkillChange, previousFiles?: Readonly<Record<string, string>>): Readonly<Record<string, string>> | undefined {
        if (change.kind === "create")
            return { "SKILL.md": change.skillMarkdown };

        if (change.kind === "delete")
            return undefined;

        if (change.kind === "update")
            return withNextSkillVersion(this.source, change.skillId, { ...previousFiles, "SKILL.md": change.skillMarkdown });

        const files = this.readRevision(change.skillId, change.revisionId);
        if (!files)
            throw new Error("skill_revision_not_found");

        return previousFiles ? withNextSkillVersion(this.source, change.skillId, files) : withSkillVersionAfterHistory(this.revisions, change.skillId, files);
    }


    rollbackChange(change: CommittedAuthorSkillChange): void {
        if (change.kind === "create") {
            this.rollbackCreate(change.revision);
            return;
        }

        if (change.kind === "delete") {
            this.source.install({ directory: change.skillId, files: change.previousFiles });
            return;
        }

        if (!change.previousFiles) {
            this.rollbackCreate(change.revision);
            return;
        }

        this.source.replace({ directory: change.revision.skillId, files: change.previousFiles, expectedHash: change.revision.contentHash });
        this.revisions.removeCreated(change.revision);
    }


    rollbackCreate(revision: AuthorSkillRevision): void {
        this.source.delete({ directory: revision.skillId, expectedHash: revision.contentHash });
        this.revisions.removeCreated(revision);
    }


    create(input: { skillId: string; files: Readonly<Record<string, string>>; requestId?: string }): AuthorSkillRevision {
        this.recovery.requireAvailable(input.skillId);
        const skillPackage = this.source.install({ directory: input.skillId, files: input.files });
        try {
            return this.record({ skillPackage, files: input.files, requestId: input.requestId });
        } catch (error) {
            this.source.delete({ directory: input.skillId, expectedHash: skillPackage.contentHash ?? "" });
            throw error;
        }
    }


    update(input: { skillId: string; files: Readonly<Record<string, string>>; expectedHash: string; requestId?: string }): AuthorSkillRevision {
        this.recovery.requireAvailable(input.skillId);
        const previous = this.snapshotCurrent(input.skillId);
        const files = withNextSkillVersion(this.source, input.skillId, input.files);
        const skillPackage = this.source.replace({ directory: input.skillId, files, expectedHash: input.expectedHash });
        try {
            return this.record({ skillPackage, files, requestId: input.requestId });
        } catch (error) {
            this.source.replace({ directory: input.skillId, files: previous.files, expectedHash: skillPackage.contentHash ?? "" });
            throw error;
        }
    }


    restore(input: { skillId: string; revisionId: string; expectedHash: string; requestId?: string }): AuthorSkillRevision {
        this.recovery.requireAvailable(input.skillId);
        const files = this.revisions.readFiles({ skillId: input.skillId, revisionId: input.revisionId });
        if (!files)
            throw new Error("skill_revision_not_found");

        const current = this.source.get(input.skillId);
        if (!current && input.expectedHash !== "")
            throw new Error("skill_package_conflict");

        const previous = current ? this.snapshotCurrent(input.skillId) : undefined;
        const replacement = current
            ? withNextSkillVersion(this.source, input.skillId, files)
            : withSkillVersionAfterHistory(this.revisions, input.skillId, files);
        const skillPackage = current
            ? this.source.replace({ directory: input.skillId, files: replacement, expectedHash: input.expectedHash })
            : this.source.install({ directory: input.skillId, files: replacement });
        try {
            return this.record({ skillPackage, files: replacement, requestId: input.requestId, restoredFromId: input.revisionId });
        } catch (error) {
            this.recoverRestore(input.skillId, skillPackage, previous);
            throw error;
        }
    }


    private recoverRestore(skillId: string, skillPackage: AssistantSkillPackage, previous: { files: Readonly<Record<string, string>> } | undefined): void {
        if (previous)
            this.source.replace({ directory: skillId, files: previous.files, expectedHash: skillPackage.contentHash ?? "" });
        else
            this.source.delete({ directory: skillId, expectedHash: skillPackage.contentHash ?? "" });
    }


    delete(input: { skillId: string; expectedHash: string }): void {
        this.recovery.requireAvailable(input.skillId);
        this.snapshotCurrent(input.skillId);
        this.source.delete({ directory: input.skillId, expectedHash: input.expectedHash });
    }


    listRevisions(skillId: string): readonly AuthorSkillRevision[] {
        return this.revisions.list(skillId);
    }


    createdSkillDirectory(requestId: string): string | undefined {
        for (const skill of this.summaries()) {
            if (this.revisions.list(skill.reference.id).some((revision) => revision.requestId === requestId))
                return this.source.directoryPath(skill.reference.id);
        }

        return undefined;
    }


    private record(input: { skillPackage: AssistantSkillPackage; files: Readonly<Record<string, string>>; requestId?: string; restoredFromId?: string }): AuthorSkillRevision {
        if (!input.skillPackage.contentHash)
            throw new Error("invalid_skill_package");

        const latest = this.revisions.list(input.skillPackage.reference.id).at(-1);
        return this.revisions.create({
            skillId: input.skillPackage.reference.id,
            contentHash: input.skillPackage.contentHash,
            files: input.files,
            ...(latest ? { parentId: latest.id } : {}),
            ...(input.restoredFromId ? { restoredFromId: input.restoredFromId } : {}),
            ...(input.requestId ? { requestId: input.requestId } : {}),
        });
    }


    private snapshotCurrent(skillId: string): { files: Readonly<Record<string, string>> } {
        const skillPackage = this.source.get(skillId);
        const files = this.source.readFiles(skillId);
        if (!skillPackage || !files || !skillPackage.contentHash)
            throw new Error("skill_package_conflict");

        if (!this.revisions.list(skillId).some((revision) => revision.contentHash === skillPackage.contentHash))
            this.record({ skillPackage, files });

        return { files };
    }
}
