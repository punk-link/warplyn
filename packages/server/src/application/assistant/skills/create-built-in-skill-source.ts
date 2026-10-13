import { loadBuiltInSkillPackages } from "./built-in-skill-packages.js";
import type { AssistantSkillSource } from "./assistant-skill-source.js";


export function createBuiltInSkillSource(root?: string): AssistantSkillSource {
    const packages = () => loadBuiltInSkillPackages(root);
    return {
        id: "built-in",
        summaries: () => packages().map(({ reference, name, description, execution, scopes, presentation }) => ({ reference, name, description, execution, scopes, presentation })),
        load: (reference) => packages()
            .find((skillPackage) => skillPackage.reference.source === reference.source
                && skillPackage.reference.id === reference.id
                && skillPackage.reference.version === reference.version
            ),
    };
}
