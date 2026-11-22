import type { AssistantSkillRecoveryStatus } from "@skladno/shared";
import type { AuthorSkillSource } from "./author-skill-source.js";
import type { AuthorSkillRevisionStore } from "./author-skill-revision-store.js";
import type { AuthorSkillChangeJournal, PendingSkillChange } from "./author-skill-change-journal.js";
import { unwrapSkillWrite, skillWriteFailure } from "./skill-write-result.js";


export class AuthorSkillRecoveryManager {
    private blocked = new Set<string>();


    private allBlocked = false;


    constructor(
        private readonly source: AuthorSkillSource,
        private readonly revisions: AuthorSkillRevisionStore,
        private readonly journal?: AuthorSkillChangeJournal,
    ) { }


    status(): AssistantSkillRecoveryStatus {
        return this.allBlocked || this.blocked.size
            ? { kind: "blocked", skillIds: [...this.blocked].sort(), allAuthorSkills: this.allBlocked }
            : { kind: "ready" };
    }


    available(skillId: string): boolean {
        return !this.allBlocked && !this.blocked.has(skillId);
    }


    requireAvailable(skillId: string): void {
        if (!this.available(skillId))
            unwrapSkillWrite(skillWriteFailure("skill_recovery_required"));
    }


    recover(isCompleted: (requestId: string) => boolean, retry = false): AssistantSkillRecoveryStatus {
        const previous = this.blocked;
        const retryAll = this.allBlocked;
        this.blocked = new Set();
        this.allBlocked = false;
        try {
            const entries = this.journal?.list() ?? [];
            if (entries.some((entry) => entry.kind === "unreadable")) {
                this.allBlocked = true;
                return this.status();
            }

            for (const entry of entries) {
                if (entry.kind !== "pending" || this.blocked.has(entry.change.skillId) ||
                    (retry && !retryAll && !previous.has(entry.change.skillId)))
                    continue;

                this.recoverChange(entry.change, isCompleted);
            }
        } catch {
            this.allBlocked = true;
        }

        return this.status();
    }


    private recoverChange(change: PendingSkillChange, isCompleted: (requestId: string) => boolean): void {
        try {
            if (isCompleted(change.requestId))
                this.journal?.remove(change.requestId);
            else
                this.recoverRequest(change);
        } catch {
            this.blocked.add(change.skillId);
        }
    }


    recoverRequest(pending: PendingSkillChange): void {
        try {
            this.source.recoverPending(pending.skillId, pending.previousFiles, pending.nextFiles);
            this.revisions.removeForRequest(pending.skillId, pending.requestId);
            this.journal?.remove(pending.requestId);
        } catch (error) {
            this.blocked.add(pending.skillId);
            throw error;
        }
    }
}
