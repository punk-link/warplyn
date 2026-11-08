import { describe, expect, it } from "vitest";
import { appendAssistantActivity } from "./append-assistant-activity.js";

describe("Assistant execution activity", () => {
    it("preserves repeated actions and completes only the matching current step", () => {
        const started = { id: "claims", status: "started" } as const;
        const completed = { ...started, status: "completed" } as const;
        let activity = appendAssistantActivity(undefined, started);
        activity = appendAssistantActivity(activity, completed);
        activity = appendAssistantActivity(activity, started);
        expect(activity.steps).toEqual([completed, started]);
        activity = appendAssistantActivity(activity, completed);
        expect(activity.steps).toEqual([completed, completed]);
    });

    it("keeps an overlapping action active when another action completes", () => {
        let activity = appendAssistantActivity(undefined, { id: "article", status: "started" });
        activity = appendAssistantActivity(activity, { id: "claims", status: "started" });
        activity = appendAssistantActivity(activity, { id: "article", status: "completed" });
        expect(activity.id).toBe("claims");
        expect(activity.status).toBe("started");
        expect(activity.steps?.map((step) => step.status)).toEqual(["completed", "started"]);
    });
});
