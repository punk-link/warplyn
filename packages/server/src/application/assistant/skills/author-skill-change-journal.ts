import type { AuthorSkillJournalEntry } from "./author-skill-journal-entry.js";


export interface PendingSkillChange {
    requestId: string;
    skillId: string;
    previousFiles?: Readonly<Record<string, string>>;
    nextFiles?: Readonly<Record<string, string>>;
}


export interface AuthorSkillChangeJournal {
    begin(change: PendingSkillChange): void;
    list(): readonly AuthorSkillJournalEntry[];
    remove(requestId: string): void;
}
