import type { AssistantSkillCatalog } from "./assistant/skills/assistant-skill-catalog.js";
import type { AuthorSkillService } from "./assistant/skills/author-skill-service.js";


export interface ApplicationSkillServices {
    catalog: AssistantSkillCatalog;
    authorSkills?: AuthorSkillService;
}
