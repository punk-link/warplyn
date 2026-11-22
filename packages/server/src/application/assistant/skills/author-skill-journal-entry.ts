import type { PendingSkillChange } from "./author-skill-change-journal.js";


export type AuthorSkillJournalEntry =
    | { kind: "pending"; change: PendingSkillChange }
    | { kind: "unreadable" };
