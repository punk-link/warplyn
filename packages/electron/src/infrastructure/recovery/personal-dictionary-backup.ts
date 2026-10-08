import { existsSync, lstatSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Session } from "electron";
import { isPersonalSpellingWord } from "@skladno/shared";


type PersonalDictionary = Pick<Session, "listWordsInSpellCheckerDictionary" | "addWordToSpellCheckerDictionary" | "removeWordFromSpellCheckerDictionary">;


export function readPersonalDictionaryFile(path: string): string[] | undefined {
    if (!existsSync(path))
        return undefined;

    const stat = lstatSync(path);
    if (!stat.isFile() || stat.size > 16_777_216)
        throw new Error("personal_dictionary_backup_invalid");

    const words: unknown = JSON.parse(readFileSync(path, "utf8"));
    if (!Array.isArray(words) || !words.every(isPersonalSpellingWord))
        throw new Error("personal_dictionary_backup_invalid");

    return [...new Set<string>(words)];
}


export async function restorePersonalDictionary(bundleDirectory: string, journalPath: string, dictionary: PersonalDictionary): Promise<void> {
    const words = readPersonalDictionaryFile(join(bundleDirectory, "personal-dictionary.json"));
    if (!words)
        return;

    const existing = new Set(await dictionary.listWordsInSpellCheckerDictionary());
    const additions = words.filter((word) => !existing.has(word));
    const journal = readPersonalDictionaryFile(journalPath) ?? [];

    if (additions.length) {
        writeFileSync(`${journalPath}.tmp`, JSON.stringify([...new Set([...journal, ...additions])]), { mode: 0o600 });
        renameSync(`${journalPath}.tmp`, journalPath);
    }

    for (const word of additions) {
        if (!dictionary.addWordToSpellCheckerDictionary(word))
            throw new Error("personal_dictionary_restore_failed");
    }
}


export async function rollbackPersonalDictionary(journalPath: string, dictionary: PersonalDictionary): Promise<void> {
    const additions = readPersonalDictionaryFile(journalPath);
    if (!additions)
        return;

    const existing = new Set(await dictionary.listWordsInSpellCheckerDictionary());
    for (const word of additions) {
        if (existing.has(word) && !dictionary.removeWordFromSpellCheckerDictionary(word))
            throw new Error("personal_dictionary_rollback_failed");
    }

    rmSync(journalPath, { force: true });
}
