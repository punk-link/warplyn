import type { AssistantCapabilityActivity } from "@skladno/shared";
import type { AssistantActivity } from "./assistant-activity.js";


export function appendAssistantActivity(previous: AssistantActivity | undefined, activity: AssistantCapabilityActivity): AssistantActivity {
    const steps = [...(previous?.steps ?? [])];
    const startedIndex = steps.findIndex((step) => step.status === "started" && step.id === activity.id);
    if (activity.status === "completed" && startedIndex !== -1)
        steps[startedIndex] = activity;
    else
        steps.push(activity);

    const active = steps.find((step) => step.status === "started");
    return { ...(active ?? activity), steps };
}
