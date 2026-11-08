import { useIntl } from "react-intl";
import type { AssistantActivity } from "../../state/assistant-activity.js";
import { formatAssistantActivity } from "../../../i18n/assistant-activity.js";
import { ChevronRightIcon, StatusIcon } from "../../../ui/icons.js";
import { ActivityIndicator } from "../../../ui/primitives.js";


export function AssistantActivityTrail({ activity, running, onToggle }: {
    activity: AssistantActivity; running: boolean; onToggle: () => void;
}) {
    const intl = useIntl();
    const steps = activity.steps ?? [];
    const currentIndex = activity.status === "started"
        ? steps.findIndex((step) => step.status === "started" && step.id === activity.id) : steps.length - 1;
    const earlier = steps.filter((_, index) => index !== currentIndex);
    const interrupted = !running && activity.status === "started";

    return <details className="group text-xs leading-5 text-muted" onToggle={onToggle}>
        <summary className="flex min-h-9 w-fit cursor-pointer list-none items-center gap-1 hover:text-ink [&::-webkit-details-marker]:hidden">
            <ChevronRightIcon className="size-3 shrink-0 transition-transform group-open:rotate-90" aria-hidden="true" />
            <span className="flex items-center gap-2" role="status">
                {running && activity.status === "started" && <ActivityIndicator />}
                {formatAssistantActivity(activity.id, intl)}
            </span>
        </summary>
        <ol className="ml-1.5 space-y-1 border-l border-border py-1 pl-3">
            {earlier.map((step, index) => (
                <li key={index} className="flex items-start gap-2">
                    {step.status === "completed" && <StatusIcon tone="success" className="mt-1 size-3 shrink-0" aria-hidden="true" />}
                    <span>
                        {step.status === "completed" && <span className="sr-only">{intl.formatMessage({ id: "assistant.status.completed" })} </span>}
                        {formatAssistantActivity(step.id, intl)}
                    </span>
                </li>
            ))}
        </ol>
        {interrupted && (
            <p className="ml-5 mt-1">
                {intl.formatMessage({ id: "assistant.activityInterrupted" }, { activity: formatAssistantActivity(activity.id, intl) })}
            </p>
        )}
    </details>;
}
