import { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import type { IntlShape } from "react-intl";
import type { DesktopUpdateClient, DesktopUpdateState } from "@skladno/shared";
import { getDesktopUpdateClient } from "../../application/desktop-client.js";
import { Icon, UpdateIcon } from "../../ui/icons.js";
import { ActivityIndicator } from "../../ui/primitives.js";
import { useNotifications } from "../../notifications/NotificationProvider.js";


export function UpdateController({ className = "" }: { className?: string }) {
    const client = getDesktopUpdateClient();
    return client ? <DesktopUpdateControl client={client} className={className} /> : null;
}


function DesktopUpdateControl({ client, className }: { client: DesktopUpdateClient; className: string }) {
    const intl = useIntl();
    const { notifyError } = useNotifications();
    const [state, setState] = useState<DesktopUpdateState>();
    const busy = useRef(false);
    const [pending, setPending] = useState(false);


    async function activate() {
        if (!client || !state || busy.current)
            return;

        busy.current = true;
        setPending(true);
        try {
            if (state.kind === "available" && state.downloadable)
                setState(await client.download());
            else if (state.kind === "available")
                await client.openReleaseNotes();
            else if (state.kind === "ready")
                await client.restartAndUpdate();
            else if (state.kind === "failed")
                setState(await client.checkNow());
        } catch (error) {
            const message = state.kind === "ready" ? "settings.updatesError.apply_failed" : "settings.updatesError.download_failed";
            notifyError(error, { fallbackMessage: intl.formatMessage({ id: message }) });
        } finally {
            busy.current = false;
            setPending(false);
        }
    }


    useEffect(() => {
        if (!client)
            return;

        void client.getState().then(setState).catch(() => undefined);
        return client.subscribe(setState);
    }, [client]);

    if (!state || state.kind === "unsupported" || state.kind === "current")
        return null;

    const label = updateLabel(state, intl);
    const warning = "security" in state && state.security;
    return <button
        className={[
            className,
            "relative grid size-9 place-items-center rounded-control border border-transparent transition-colors hover:bg-brand-soft ",
            "hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ",
            warning || state.kind === "failed" ? "text-warning" : "text-brand",
        ].join(" ")}
        type="button"
        aria-label={label}
        title={label}
        disabled={pending || state.kind === "checking" || state.kind === "downloading"}
        aria-busy={pending || state.kind === "checking" || state.kind === "downloading" || undefined}
        onClick={() => void activate()}>
        {state.kind === "checking" || state.kind === "downloading" ? <ActivityIndicator size="small" /> : <UpdateStageIcon state={state} />}
    </button>;
}


function updateLabel(state: DesktopUpdateState, intl: IntlShape): string {
    switch (state.kind) {
        case "checking":
            return intl.formatMessage({ id: "settings.updatesChecking" });
        case "failed":
            return intl.formatMessage({ id: `settings.updatesError.${state.error}` });
        case "ready":
            return intl.formatMessage({ id: state.installsOnNextLaunch ? "status.windowsUpdateReady" : "status.updateReady" });
        case "downloading":
            return intl.formatMessage({ id: "status.updateDownloading" });
        case "available":
            return intl.formatMessage({ id: state.installsOnNextLaunch ? "status.windowsUpdateAvailable" : "status.updateAvailable" }, { version: state.version });
        default:
            return "";
    }
}


function UpdateStageIcon({ state }: { state: DesktopUpdateState }) {
    if (state.kind === "ready")
        return <UpdateIcon className="size-3" />;

    if (state.kind === "failed")
        return <Icon className="size-3"><path d="m12 3 10 18H2L12 3ZM12 9v5M12 17h.01" /></Icon>;

    return <Icon className="size-3"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" /></Icon>;
}
