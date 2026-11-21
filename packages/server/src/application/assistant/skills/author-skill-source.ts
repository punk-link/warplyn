import type { AssistantSkillPackage } from "./assistant-skill-package.js";
import type { AssistantSkillSource } from "./assistant-skill-source.js";
import type { SkillWriteResult } from "./skill-write-result.js";


export interface AuthorSkillSource extends AssistantSkillSource {
    get(id: string): AssistantSkillPackage | undefined;
    directoryPath(id: string): string | undefined;
    readFiles(directory: string): Readonly<Record<string, string>> | undefined;
    validateInstallResult(input: { directory: string; files: Readonly<Record<string, string>> }): SkillWriteResult<void>;
    validateReplaceResult(input: {
        directory: string;
        files: Readonly<Record<string, string>>;
        expectedHash: string;
    }): SkillWriteResult<void>;
    install(input: { directory: string; files: Readonly<Record<string, string>> }): AssistantSkillPackage;
    replace(input: {
        directory: string;
        files: Readonly<Record<string, string>>;
        expectedHash: string;
    }): AssistantSkillPackage;
    delete(input: { directory: string; expectedHash: string }): void;
    recoverPending(directory: string, previousFiles?: Readonly<Record<string, string>>, nextFiles?: Readonly<Record<string, string>>): void;
}
