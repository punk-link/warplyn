import { join } from "node:path";
import type { ApplicationSkillServices } from "./application/application-skill-services.js";
import { AssistantSkillCatalog } from "./application/assistant/skills/assistant-skill-catalog.js";
import { AuthorSkillService } from "./application/assistant/skills/author-skill-service.js";
import { createBuiltInSkillSource } from "./infrastructure/skills/create-built-in-skill-source.js";
import { FileAssistantSkillSource } from "./infrastructure/skills/file-assistant-skill-source.js";
import { SkillChangeJournal } from "./infrastructure/skills/skill-change-journal.js";
import { SkillRevisionStore } from "./infrastructure/skills/skill-revision-store.js";


export function createLocalSkills(dataDirectory: string, builtInRoot?: string): ApplicationSkillServices {
    const builtIns = createBuiltInSkillSource(builtInRoot);
    const authorSource = new FileAssistantSkillSource("author", join(dataDirectory, "skills"), () => {
        const summaries = builtIns.summaries();
        return { ids: summaries.map((skill) => skill.reference.id), names: summaries.map((skill) => skill.name) };
    });
    return {
        catalog: new AssistantSkillCatalog([builtIns, authorSource]),
        authorSkills: new AuthorSkillService(authorSource, new SkillRevisionStore(dataDirectory), new SkillChangeJournal(dataDirectory)),
    };
}
