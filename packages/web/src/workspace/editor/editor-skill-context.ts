import { createContext } from "react";
import type { AssistantSkillSummary } from "@skladno/shared";

export const EditorSkillContext = createContext<{
    skills: readonly AssistantSkillSummary[];
    refresh: () => Promise<void>;
    prepare: (skill: AssistantSkillSummary) => void;
    consume?: () => void;
    prepared?: AssistantSkillSummary;
} | undefined>(undefined);
