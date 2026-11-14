import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { getDesktopUpdateClient } from "../application/desktop-client.js";
import { NetworkPermissionDialog } from "./components/NetworkPermissionDialog.js";

const completionKey = "skladno.update-permission.v1";


export function FirstRunUpdatePermission({ ready }: { ready: boolean }) {
    const intl = useIntl();
    const client = getDesktopUpdateClient();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!ready || !client || localStorage.getItem(completionKey) !== null)
            return;

        let active = true;
        void client.getState().then((state) => {
            if (active && state.kind !== "unsupported" && !state.networkAccess)
                setOpen(true);
        }).catch(() => undefined);
        return () => {
            active = false;
        };
    }, [client, ready]);

    if (!client || !ready)
        return null;

    return <NetworkPermissionDialog
        client={client}
        open={open}
        intl={intl}
        onState={() => undefined}
        onClose={() => {
            localStorage.setItem(completionKey, "complete");
            setOpen(false);
        }} />;
}
