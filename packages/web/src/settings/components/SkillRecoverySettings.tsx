import { useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import type { useSkillRecovery } from "../use-skill-recovery.js";
import { Banner, Button } from "../../ui/primitives.js";


export function SkillRecoverySettings({ recovery, openBackups }: {
    recovery: ReturnType<typeof useSkillRecovery>;
    openBackups: () => void;
}) {
    const intl = useIntl();
    const ready = useRef<HTMLParagraphElement>(null);
    const wasBlocked = useRef(false);
    useEffect(() => {
        if (wasBlocked.current && recovery.status?.kind === "ready")
            ready.current?.focus();

        wasBlocked.current = recovery.status?.kind === "blocked";
    }, [recovery.status]);

    if (!recovery.status)
        return null;

    return <section className="mb-6 space-y-3" aria-labelledby="skill-recovery-title">
        <h2 id="skill-recovery-title" className="text-sm font-semibold">{intl.formatMessage({ id: "skills.recovery.title" })}</h2>
        {recovery.status.kind === "ready"
            ? (
                <p
                    ref={ready}
                    tabIndex={-1}
                    role="status"
                    className="text-sm text-muted">
                    {intl.formatMessage({ id: "skills.recovery.ready" })}
                </p>
            )
            : <>
                <Banner tone="warning">{intl.formatMessage({ id: "skills.recovery.message" })}</Banner>
                {recovery.status.skillIds.length > 0 && (
                    <ul className="list-inside list-disc text-sm">
                        {recovery.status.skillIds.map((skillId) => <li key={skillId} className="break-words">{skillId}</li>)}
                    </ul>
                )}
                <div className="flex flex-wrap gap-2">
                    <Button disabled={recovery.retrying} onClick={() => void recovery.retry()}>
                        {intl.formatMessage({ id: "skills.recovery.retry" })}
                    </Button>
                    <Button variant="secondary" onClick={openBackups}>{intl.formatMessage({ id: "settings.dataBackups" })}</Button>
                </div>
            </>}
    </section>;
}
