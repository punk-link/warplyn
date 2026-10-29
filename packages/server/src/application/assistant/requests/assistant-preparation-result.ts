import type { Result } from "@skladno/shared";
import type { PreparedAssistantRequest } from "./prepared-assistant-request.js";


export type AssistantPreparationResult<T = PreparedAssistantRequest> = Result<T, { code:
        | "article_not_found"
        | "assistant_retry_invalid"
        | "revision_conflict"
        | "assistant_skill_unsupported"
        | "assistant_selection_invalid"
        | "assistant_skill_scope_incompatible"
        | "editorial_configuration_missing"
        | "target_language_required"
        | "style_corpus_required"
        | "typography_rules_invalid";
parameters?: Record<string, string | number> }>;
