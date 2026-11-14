import { spawn } from "node:child_process";
import { once } from "node:events";
import { dirname } from "node:path";


export async function restartAppImage(installed: string, application: {
    releaseSingleInstanceLock(): void;
    requestSingleInstanceLock(): boolean;
    exit(code: number): void;
}, args = process.argv.slice(1)): Promise<void> {
    application.releaseSingleInstanceLock();
    try {
        const child = spawn(installed, args, { detached: true, stdio: "ignore", cwd: dirname(installed) });
        await once(child, "spawn");
        child.unref();
    } catch (error) {
        application.requestSingleInstanceLock();
        throw error;
    }

    application.exit(0);
}
