import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "yaml";
import type { AssistantSkillSummary } from "@skladno/shared";

const root = resolve(process.cwd(), "../server/src/application/assistant/skills/built-in");


export const skillCatalogFixture: AssistantSkillSummary[] = readdirSync(root).map((directory) => {
    const markdown = readFileSync(resolve(root, directory, "SKILL.md"), "utf8");
    const metadata = parse(markdown.split(/^---\s*$/m)[1]!) as AssistantSkillSummary & { id: string; version: number };

    return {
        reference: { source: "built-in", id: metadata.id, version: String(metadata.version) },
        name: metadata.name,
        description: metadata.description,
        execution: metadata.execution,
        scopes: metadata.scopes,
        presentation: metadata.presentation
    };
}).sort((left, right) => (left.presentation?.order ?? 0) - (right.presentation?.order ?? 0));
