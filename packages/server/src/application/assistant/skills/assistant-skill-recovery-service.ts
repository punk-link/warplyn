import type { AssistantSkillRecoveryStatus } from "@skladno/shared";
import type { AssistantStore } from "../assistant-store.js";
import type { AuthorSkillService } from "./author-skill-service.js";


export class AssistantSkillRecoveryService {
    constructor(
        private readonly authorSkills: AuthorSkillService | undefined,
        private readonly requests: Pick<AssistantStore, "getRequest">,
    ) { }


    status(): AssistantSkillRecoveryStatus {
        return this.authorSkills?.recoveryStatus() ?? { kind: "ready" };
    }


    retry(): AssistantSkillRecoveryStatus {
        return this.authorSkills?.retryRecovery((requestId) => this.requests.getRequest(requestId)?.status === "completed") ?? { kind: "ready" };
    }
}
