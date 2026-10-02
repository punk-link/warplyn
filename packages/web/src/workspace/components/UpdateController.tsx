import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import type { IntlShape } from "react-intl";
import type { DesktopUpdateState } from "@skladno/shared";
import { getDesktopUpdateClient } from "../../application/desktop-client.js";
import { UpdateIcon } from "../../ui/icons.js";


export function UpdateController({ className = "" }: { className?: string }) {
    const intl = useIntl();
    const client = getDesktopUpdateClient();
    const [state, setState] = useState<DesktopUpdateState>();

    useEffect(() => {
        if (!client)
            return;

        void client.getState().then(setState).catch(() => undefined);
        return client.subscribe(setState);
    }, [client]);

    if (!state || state.kind === "unsupported" || state.kind === "current" || state.kind === "checking")
        return null;

    const label = updateLabel(state, intl);
    const warning = state.kind !== "failed" && state.security;
    return <button className={`${className} grid size-9 place-items-center rounded-control border border-transparent transition-colors hover:bg-brand-soft hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${warning || state.kind === "failed" ? "text-warning" : "text-brand"}`} type="button" aria-label={label} title={label} aria-busy={state.kind === "downloading" || undefined} onClick={() => window.dispatchEvent(new Event("skladno:open-updates"))}>
        <UpdateIcon className={`size-3 ${state.kind === "downloading" ? "motion-safe:animate-pulse" : ""}`} />
    </button>;
}


function updateLabel(state: DesktopUpdateState, intl: IntlShape): string {
    switch (state.kind) {
        case "failed":
            return intl.formatMessage({ id: "status.updateFailed" });
        case "ready":
            return intl.formatMessage({ id: "status.updateReady" });
        case "downloading":
            return intl.formatMessage({ id: "status.updateDownloading" });
        case "available":
            return intl.formatMessage({ id: "status.updateAvailable" }, { version: state.version });
        default:
            return "";
    }
}
