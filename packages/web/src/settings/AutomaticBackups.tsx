import { useEffect } from "react";
import { useIntl } from "react-intl";
import type { EditorialWorkspaceClient } from "../application/client.js";
import { getDesktopSettingsClient } from "../application/desktop-client.js";
import { useNotifications } from "../notifications/NotificationProvider.js";
import { saveScheduledWebBackup } from "./web-backups.js";


export function AutomaticBackups({ client }: { client: EditorialWorkspaceClient }) {
    const intl = useIntl();
    const { notify } = useNotifications();

    useEffect(() => {
        const reportFailure = () => notify({ tone: "error", title: intl.formatMessage({ id: "settings.automaticBackupFailed" }) });
        if (getDesktopSettingsClient()) {
            window.addEventListener("warplyn:automatic-backup-failed", reportFailure);
            window.dispatchEvent(new Event("warplyn:automatic-backup-listener-ready"));
            return () => window.removeEventListener("warplyn:automatic-backup-failed", reportFailure);
        }

        let stopped = false;
        let timer: ReturnType<typeof setTimeout>;


        async function run() {
            const startedAt = Date.now();
            try {
                const { backupPolicy } = await client.getApplicationSettings();
                if (!stopped)
                    await saveScheduledWebBackup(client, backupPolicy);
            } catch {
                if (!stopped)
                    reportFailure();
            } finally {
                if (!stopped)
                    timer = setTimeout(run, Math.max(0, 86_400_000 - (Date.now() - startedAt)));
            }
        }


        timer = setTimeout(run, 5_000);
        return () => {
            stopped = true;
            clearTimeout(timer);
        };
    }, [client, intl, notify]);

    return null;
}
