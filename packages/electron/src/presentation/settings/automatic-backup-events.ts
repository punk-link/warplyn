import type { EventEmitter } from "node:events";


export function registerAutomaticBackupEvents(ipcRenderer: Pick<EventEmitter, "on">, target: Pick<Window, "addEventListener" | "dispatchEvent">): void {
    let ready = false;
    let pending = false;
    const reportFailure = () => target.dispatchEvent(new Event("warplyn:automatic-backup-failed"));
    target.addEventListener("warplyn:automatic-backup-listener-ready", () => {
        ready = true;
        if (pending) {
            pending = false;
            reportFailure();
        }
    });
    ipcRenderer.on("warplyn:automatic-backup-failed", () => {
        if (ready)
            reportFailure();
        else
            pending = true;
    });
}
