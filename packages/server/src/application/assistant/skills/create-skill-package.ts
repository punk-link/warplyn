import { createHash } from "node:crypto";
import { defaultSkillExecution } from "@skladno/shared";

import type { AssistantSkillPackage } from "./assistant-skill-package.js";


export function createSkillPackage(input: Omit<AssistantSkillPackage, "contentHash">): AssistantSkillPackage {
    const behavior = JSON.stringify([input.execution ?? defaultSkillExecution, input.scopes ?? ["article", "selection"], input.presentation]);
    const legacyBehavior = JSON.stringify([defaultSkillExecution, ["article", "selection"], undefined]);
    const metadata = behavior === legacyBehavior ? [] : [behavior];
    const content = [input.reference.id, input.reference.version, input.name, input.description, input.instructions, ...(input.references ?? []), ...metadata].join("\n");

    return { ...input, contentHash: createHash("sha256").update(content).digest("hex") };
}
