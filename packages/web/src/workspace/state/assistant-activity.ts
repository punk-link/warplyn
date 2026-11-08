import type { AssistantCapabilityActivity } from "@skladno/shared";


export interface AssistantActivity extends AssistantCapabilityActivity {
    steps?: AssistantCapabilityActivity[];
}
