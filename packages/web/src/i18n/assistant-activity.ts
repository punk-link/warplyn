import type { AssistantActivityId } from "@skladno/shared";
import type { IntlShape } from "react-intl";


export function formatAssistantActivity(activityId: AssistantActivityId, intl: IntlShape): string {
    return intl.formatMessage({ id: `assistant.activity.${activityId}` });
}
