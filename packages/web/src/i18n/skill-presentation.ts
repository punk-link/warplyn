import type { AssistantSkillSummary } from "@skladno/shared";
import type { IntlShape } from "react-intl";
import { messages, type MessageId } from "./messages.js";


function isMessageId(value: string | undefined): value is MessageId {
    return value !== undefined && Object.hasOwn(messages, value);
}


export function getSkillPresentation(skill: AssistantSkillSummary, intl: IntlShape) {
    const presentation = skill.reference.source === "built-in" ? skill.presentation : undefined;
    return {
        id: skill.reference.id,
        source: skill.reference.source,
        name: isMessageId(presentation?.label) ? intl.formatMessage({ id: presentation.label }) : skill.name,
        description: isMessageId(presentation?.hint) ? intl.formatMessage({ id: presentation.hint }) : skill.description,
        speedHint: isMessageId(presentation?.speedHint) ? intl.formatMessage({ id: presentation.speedHint }) : undefined,
    };
}
