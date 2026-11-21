import { readdirSync } from "node:fs";
import { resolve } from "node:path";

import type { AssistantSkillPackage } from "../../application/assistant/skills/assistant-skill-package.js";
import { loadSkillPackage } from "./load-skill-package.js";


export function loadBuiltInSkillPackages(
    root = process.env.WARPLYN_BUILT_IN_SKILLS_DIR ?? resolve(import.meta.dirname, "../../application/assistant/skills/built-in"),
): readonly AssistantSkillPackage[] {
    const packages: AssistantSkillPackage[] = [];
    for (const entry of readdirSync(root, { withFileTypes: true })) {
        if (!entry.isDirectory())
            throw new Error("invalid_builtin_skill_package");

        const parsed = loadSkillPackage({ root: resolve(root, entry.name), source: "built-in" });
        if (!parsed.ok)
            throw new Error(`invalid_builtin_skill_package:${parsed.issues[0]!.code}`);

        packages.push(parsed.skillPackage);
    }

    if (new Set(packages.map((skill) => skill.reference.id)).size !== packages.length)
        throw new Error("invalid_builtin_skill_package");

    return packages.sort((left, right) =>
        (left.presentation?.order ?? 0) - (right.presentation?.order ?? 0) || left.reference.id.localeCompare(right.reference.id));
}
