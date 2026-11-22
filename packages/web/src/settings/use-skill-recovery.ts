import { useCallback, useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import type { AssistantSkillRecoveryStatus } from "@skladno/shared";
import type { EditorialWorkspaceClient } from "../application/client.js";
import { useNotifications } from "../notifications/NotificationProvider.js";


export function useSkillRecovery(client: EditorialWorkspaceClient, review: () => void, refreshSkills: () => Promise<void>) {
    const intl = useIntl();
    const { notify } = useNotifications();
    const [status, setStatus] = useState<AssistantSkillRecoveryStatus>();
    const [retrying, setRetrying] = useState(false);
    const generation = useRef(0);
    const reviewRef = useRef(review);
    reviewRef.current = review;
    const refreshRef = useRef(refreshSkills);
    refreshRef.current = refreshSkills;

    useEffect(() => {
        const current = ++generation.current;
        setStatus(undefined);
        setRetrying(false);
        void client.getAssistantSkillRecovery().then((loaded) => {
            if (generation.current === current)
                setStatus(loaded);
        }).catch(() => {
            if (generation.current === current)
                notify({ tone: "error", title: intl.formatMessage({ id: "skills.recovery.loadFailed" }) });
        });
        return () => {
            generation.current = current + 1;
        };
    }, [client, intl, notify]);

    useEffect(() => {
        if (status?.kind !== "blocked")
            return;

        const notification = notify({
            tone: "warning",
            title: intl.formatMessage({ id: "skills.recovery.title" }),
            message: intl.formatMessage({ id: "skills.recovery.message" }),
            action: { label: intl.formatMessage({ id: "skills.recovery.review" }), onAction: () => reviewRef.current() },
        });
        return notification.dismiss;
    }, [intl, notify, status]);

    const retry = useCallback(async () => {
        const current = generation.current;
        setRetrying(true);
        try {
            const result = await client.retryAssistantSkillRecovery();
            if (generation.current === current) {
                setStatus(result);
                if (result.kind === "ready")
                    await refreshRef.current();
            }
        } catch {
            if (generation.current === current)
                notify({ tone: "error", title: intl.formatMessage({ id: "skills.recovery.retryFailed" }) });
        } finally {
            if (generation.current === current)
                setRetrying(false);
        }
    }, [client, intl, notify]);

    return { status, retrying, retry };
}
