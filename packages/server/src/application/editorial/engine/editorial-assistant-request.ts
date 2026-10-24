import { EditorialAssistantTool } from "./editorial-assistant-tool.js";


export interface EditorialAssistantRequest {
    message: string;
    interfaceLocale?: string;
    article: string;
    selectionContext?: import("../selection-context.js").SelectionContext;
    scope: "article" | "selection";
    instructions: readonly string[];
    history: readonly { role: "author" | "assistant"; content: string }[];
    skills: readonly { id: string; name: string; description: string; instructions: string; capabilities?: readonly string[] }[];
    tools: readonly EditorialAssistantTool[];
    initialActiveCapabilities?: readonly string[];
    onSkillLoaded?: (id: string) => void;
}
